import { base44 } from "@/api/base44Client";

// Cache per audio URLs te gjeneruara
const audioCache = {};

/**
 * Lexon tekstin shqip duke perdorur AI TTS (InvokeLLM per transliteracion + Web Audio)
 * Ose Web Speech API me zerin me te mire disponibel si fallback.
 */
export async function speakAlbanian(text) {
  if (!text) return;

  // Nese eshte ne cache, luje direkt
  if (audioCache[text]) {
    const audio = new Audio(audioCache[text]);
    audio.play();
    return;
  }

  // Pergatit zerin me Speech Synthesis
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  // Merr listen e zerave dhe gjej me te miret per shqip
  const trySpeak = () => {
    const voices = window.speechSynthesis.getVoices();

    // Prioritet: sq, shqip, pastaj gjuhë sllave/lindjeeuropiane si fallback
    const preferred = voices.find(v =>
      v.lang.toLowerCase().startsWith("sq")
    ) || voices.find(v =>
      v.lang.toLowerCase().startsWith("hr") ||
      v.lang.toLowerCase().startsWith("cs") ||
      v.lang.toLowerCase().startsWith("pl") ||
      v.lang.toLowerCase().startsWith("sk")
    ) || voices.find(v =>
      v.lang.toLowerCase().startsWith("en-gb")
    ) || voices.find(v =>
      v.lang.toLowerCase().startsWith("en")
    ) || null;

    const u = new SpeechSynthesisUtterance(text);
    if (preferred) {
      u.voice = preferred;
      u.lang = preferred.lang;
    } else {
      u.lang = "sq";
    }
    u.rate = 0.75;
    u.pitch = 1.0;
    window.speechSynthesis.speak(u);
  };

  // Zerave mund t'i duhet pak kohe te ngarkohen
  if (window.speechSynthesis.getVoices().length > 0) {
    trySpeak();
  } else {
    window.speechSynthesis.onvoiceschanged = trySpeak;
  }
}

/**
 * Lexon tekstin arabisht
 */
export function speakArabic(text) {
  if (!text || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const voices = window.speechSynthesis.getVoices();
  const arVoice = voices.find(v => v.lang.startsWith("ar"));
  const u = new SpeechSynthesisUtterance(text);
  if (arVoice) u.voice = arVoice;
  u.lang = "ar-SA";
  u.rate = 0.6;
  window.speechSynthesis.speak(u);
}

/**
 * Lexon tekstin anglisht
 */
export function speakEnglish(text) {
  if (!text || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const voices = window.speechSynthesis.getVoices();
  const enVoice = voices.find(v => v.lang === "en-GB") || voices.find(v => v.lang.startsWith("en"));
  const u = new SpeechSynthesisUtterance(text);
  if (enVoice) u.voice = enVoice;
  u.lang = "en-GB";
  u.rate = 0.75;
  window.speechSynthesis.speak(u);
}

/**
 * Funksion universal: zgjidh automatikisht gjuhen
 */
export async function speakText(text, language) {
  if (!text) return;
  if (language === "arabisht") {
    speakArabic(text);
  } else if (language === "anglisht") {
    speakEnglish(text);
  } else {
    await speakAlbanian(text);
  }
}