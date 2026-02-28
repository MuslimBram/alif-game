import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Play, CheckCircle } from "lucide-react";

export default function VoiceRecorder({ onRecorded }) {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    setError(null);
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
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((t) => t.stop());
        onRecorded && onRecorded(url);
      };
      mediaRecorder.start();
      setRecording(true);
    } catch (e) {
      setError("Nuk mund të aksesohet mikrofoni. Lejoni aksesin.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Mic className="w-4 h-4 text-teal-500" />
        <span className="text-sm font-semibold text-gray-700">Regjistro Zërin</span>
      </div>
      <p className="text-xs text-teal-600 mb-3">Tani të Regjistro zërin tënd dhe merr vlerësimin!</p>

      <div className="bg-teal-50 rounded-xl p-4 flex flex-col items-center gap-3 min-h-[100px] justify-center">
        {error && <p className="text-xs text-red-500">{error}</p>}

        {audioUrl && !recording && (
          <div className="flex items-center gap-2 mb-2 w-full justify-center">
            <CheckCircle className="w-4 h-4 text-teal-600" />
            <audio src={audioUrl} controls className="h-8 w-full" />
          </div>
        )}

        {recording ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
              <MicOff className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-xs text-red-500 font-medium">Duke regjistruar...</p>
            <Button
              size="sm"
              onClick={stopRecording}
              className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
            >
              Ndalo Regjistrimin
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
    </div>
  );
}