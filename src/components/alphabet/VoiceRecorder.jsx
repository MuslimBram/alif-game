import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, CheckCircle, Loader2, Star, RotateCcw } from "lucide-react";
import { base44 } from "@/api/base44Client";

// Robust TTS that waits for voices to load
function speakText(text, lang) {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) { resolve(); return; }
    window.speechSynthesis.cancel();

    const doSpeak = () => {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.65;
      u.pitch = 1;
      u.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      // Try to find best matching voice
      const langCode = lang === "arabisht" ? "ar" : lang === "anglisht" ? "en" : "sq";
      const exactVoice = voices.find(v => v.lang.startsWith(langCode));
      const fallbackEn = voices.find(v => v.lang.startsWith("en"));
      if (exactVoice) u.voice = exactVoice;
      else if (lang !== "anglisht" && fallbackEn) u.voice = fallbackEn;

      u.lang = langCode === "sq" ? "sq-AL" : langCode === "ar" ? "ar-SA" : "en-US";
      u.onend = resolve;
      u.onerror = resolve;
      window.speechSynthesis.speak(u);
    };

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      doSpeak();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        doSpeak();
      };
      // Fallback timeout
      setTimeout(doSpeak, 500);
    }
  });
}

export default function VoiceRecorder({ letter, onResult }) {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [playingTTS, setPlayingTTS] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const audioBlobRef = useRef(null);

  // Reset when letter changes
  useEffect(() => {
    setResult(null);
    setAudioUrl(null);
    setError(null);
    audioBlobRef.current = null;
  }, [letter?.letter]);

  const speakLetter = async () => {
    if (playingTTS) return;
    setPlayingTTS(true);
    await speakText(letter?.letter || "", letter?.language || "shqip");
    setPlayingTTS(false);
  };

  const startRecording = async () => {
    setError(null);
    setResult(null);
    setAudioUrl(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Try different mime types for compatibility
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/ogg";

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        audioBlobRef.current = blob;
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (e) {
      setError("Nuk mund të aksesohet mikrofoni. Lejo aksesin në browser.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const evaluatePronunciation = async () => {
    if (!audioBlobRef.current) return;
    setLoading(true);

    const file = new File([audioBlobRef.current], "recording.webm", { type: audioBlobRef.current.type });
    const { file_url } = await base44.integrations.Core.UploadFile({ file });

    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `You are evaluating a student's pronunciation of the letter/sound "${letter?.letter}" in ${letter?.language} language.
      Pronunciation guide: "${letter?.pronunciation || letter?.letter}".
      
      Listen to the audio and evaluate ONLY pronunciation quality:
      1. Does it match the expected sound "${letter?.pronunciation || letter?.letter}"? (60%)
      2. Clarity and confidence of speech (25%)
      3. Duration and timing (15%)
      
      Scoring:
      - 0-20: silence, heavy noise, completely wrong sound
      - 30-55: some speech but incorrect or unclear
      - 60-80: correct sound, minor issues
      - 85-100: clear and correct pronunciation
      
      IMPORTANT: Respond ONLY in Albanian. Be encouraging with specific feedback.`,
      file_urls: [file_url],
      response_json_schema: {
        type: "object",
        properties: {
          score: { type: "number" },
          feedback: { type: "string" },
          tips: { type: "string" }
        }
      }
    });

    const score = typeof res.score === "number" ? res.score : 50;
    const passed = score >= 60;
    setResult({ score, feedback: res.feedback, tips: res.tips, passed });
    onResult && onResult({ score, passed });
    setLoading(false);
  };

  const reset = () => {
    setResult(null);
    setAudioUrl(null);
    audioBlobRef.current = null;
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Mic className="w-4 h-4 text-teal-500" />
        <span className="text-sm font-semibold text-gray-700">Shqiptimi & Regjistrim</span>
      </div>
      <p className="text-xs text-teal-600 mb-3">
        Dëgjo shqiptimin, pastaj regjistro zërin tënd!
      </p>

      {/* Listen button */}
      <Button
        variant="outline"
        size="sm"
        onClick={speakLetter}
        disabled={playingTTS}
        className="w-full mb-3 rounded-xl border-teal-200 text-teal-700 hover:bg-teal-50"
      >
        {playingTTS
          ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Duke luajtur...</>
          : <><Volume2 className="w-4 h-4 mr-2" /> Dëgjo Shqiptimin ({letter?.pronunciation || letter?.letter})</>
        }
      </Button>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-3">
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}

      {/* Recording area */}
      <div className="bg-teal-50 rounded-xl p-4 flex flex-col items-center gap-3 min-h-[90px] justify-center">
        {recording ? (
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex gap-1 items-end h-8">
              {[1,2,3,4,5,6,7].map(i => (
                <div
                  key={i}
                  className="w-1.5 bg-red-400 rounded-full"
                  style={{
                    height: `${12 + (i % 3) * 8}px`,
                    animation: `pulse 0.${i + 5}s ease-in-out infinite alternate`,
                  }}
                />
              ))}
            </div>
            <p className="text-xs text-red-500 font-semibold animate-pulse">🔴 Duke regjistruar...</p>
            <Button size="sm" onClick={stopRecording} className="bg-red-500 hover:bg-red-600 text-white rounded-xl">
              <MicOff className="w-4 h-4 mr-1.5" /> Ndalo Regjistrimin
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            onClick={startRecording}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-6"
          >
            <Mic className="w-4 h-4 mr-1.5" />
            {audioUrl ? "Regjistro Sërish" : "Fillo Regjistrimin"}
          </Button>
        )}
      </div>

      {audioUrl && !recording && (
        <div className="mt-3 space-y-2">
          <audio src={audioUrl} controls className="w-full h-9 rounded-lg" />
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={reset}
              className="rounded-xl border-gray-200 text-gray-500"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Riprovo
            </Button>
            <Button
              size="sm"
              onClick={evaluatePronunciation}
              disabled={loading}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
            >
              {loading
                ? <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Duke vlerësuar...</>
                : "✓ Kontrollo Shqiptimin"
              }
            </Button>
          </div>
        </div>
      )}

      {result && (
        <div className={`mt-3 rounded-xl p-4 border ${result.passed ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
          <div className="flex items-center gap-2 mb-2">
            {result.passed
              ? <CheckCircle className="w-5 h-5 text-emerald-600" />
              : <Star className="w-5 h-5 text-amber-500" />
            }
            <span className={`font-bold text-lg ${result.passed ? "text-emerald-700" : "text-amber-700"}`}>
              {result.score}/100
            </span>
            <span className="text-sm text-gray-600">{result.passed ? "Shumë mirë! 🎉" : "Provo sërish! 💪"}</span>
          </div>
          {result.feedback && <p className="text-sm text-gray-700 mb-1">{result.feedback}</p>}
          {result.tips && <p className="text-xs text-gray-500 italic">{result.tips}</p>}
        </div>
      )}
    </div>
  );
}