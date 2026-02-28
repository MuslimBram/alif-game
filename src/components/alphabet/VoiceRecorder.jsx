import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, CheckCircle, Loader2, Star } from "lucide-react";
import { base44 } from "@/api/base44Client";

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

  // Text-to-speech using browser SpeechSynthesis
  const speakLetter = () => {
    if (!window.speechSynthesis) return;
    setPlayingTTS(true);
    const utterance = new SpeechSynthesisUtterance(letter?.letter || "");
    // Try Albanian or default
    utterance.lang = letter?.language === "arabisht" ? "ar" : letter?.language === "anglisht" ? "en" : "sq";
    utterance.rate = 0.7;
    utterance.pitch = 1;
    utterance.onend = () => setPlayingTTS(false);
    window.speechSynthesis.speak(utterance);
  };

  const startRecording = async () => {
    setError(null);
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        audioBlobRef.current = blob;
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (e) {
      setError("Nuk mund të aksesohet mikrofoni. Lejoni aksesin në browser.");
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

    // Upload audio for AI evaluation
    const file = new File([audioBlobRef.current], "recording.webm", { type: "audio/webm" });
    const { file_url } = await base44.integrations.Core.UploadFile({ file });

    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `You are evaluating a student's pronunciation of the letter "${letter?.letter}" (${letter?.language} language, pronunciation guide: "${letter?.pronunciation}").
      
      Listen to the audio recording and evaluate:
      1. Does it sound like the correct pronunciation of "${letter?.letter}"?
      2. Clarity of the sound
      3. Overall quality
      
      Give a score 0-100. Be encouraging.
      If there's mostly silence or background noise, give 10-30.
      If there's speech but unclear, give 40-65.
      If it sounds correct, give 70-100.
      
      Respond in Albanian language.`,
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

    const score = res.score || 50;
    const passed = score >= 60;
    setResult({ score, feedback: res.feedback, tips: res.tips, passed });
    onResult && onResult({ score, passed });
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Mic className="w-4 h-4 text-teal-500" />
        <span className="text-sm font-semibold text-gray-700">Regjistro Zërin</span>
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
          : <><Volume2 className="w-4 h-4 mr-2" /> Dëgjo Shqiptimin</>
        }
      </Button>

      {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

      <div className="bg-teal-50 rounded-xl p-4 flex flex-col items-center gap-3 min-h-[90px] justify-center">
        {recording ? (
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex gap-1 items-end h-8">
              {[1,2,3,4,5].map(i => (
                <div
                  key={i}
                  className="w-1.5 bg-red-400 rounded-full animate-pulse"
                  style={{ height: `${Math.random() * 20 + 10}px`, animationDelay: `${i*0.1}s` }}
                />
              ))}
            </div>
            <p className="text-xs text-red-500 font-medium">Duke regjistruar...</p>
            <Button size="sm" onClick={stopRecording} className="bg-red-500 hover:bg-red-600 text-white rounded-xl">
              <MicOff className="w-4 h-4 mr-1.5" /> Ndalo
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            onClick={startRecording}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
          >
            <Mic className="w-4 h-4 mr-1.5" />
            {audioUrl ? "Regjistro Sërish" : "Fillo Regjistrimin"}
          </Button>
        )}
      </div>

      {audioUrl && !recording && (
        <div className="mt-3 space-y-2">
          <audio src={audioUrl} controls className="w-full h-8" />
          <Button
            size="sm"
            onClick={evaluatePronunciation}
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
          >
            {loading
              ? <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Duke vlerësuar...</>
              : "Kontrollo Shqiptimin"
            }
          </Button>
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
            <span className="text-sm text-gray-600">{result.passed ? "Shumë mirë!" : "Provo sërish!"}</span>
          </div>
          {result.feedback && <p className="text-sm text-gray-700 mb-1">{result.feedback}</p>}
          {result.tips && <p className="text-xs text-gray-500 italic">{result.tips}</p>}
        </div>
      )}
    </div>
  );
}