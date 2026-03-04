import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, Timer, CheckCircle, XCircle, Star, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Words by level for each language with emoji "images"
const WORDS_DATA = {
  shqip: {
    fillestar: [
      { word: "BU-KË", meaning: "bukë", translation: "bread", emoji: "🍞", missing: "U" },
      { word: "MA-MÄ", meaning: "mamä", translation: "mom", emoji: "👩", missing: "A" },
      { word: "BA-BÄ", meaning: "babä", translation: "dad", emoji: "👨", missing: "B" },
      { word: "CA-JO", meaning: "cajo", translation: "ball", emoji: "⚽", missing: "C" },
      { word: "DI-ELL", meaning: "diell", translation: "sun", emoji: "☀️", missing: "D" },
      { word: "E-MÄR", meaning: "emär", translation: "name", emoji: "🏷️", missing: "E" },
      { word: "FE-MIJ-Ë", meaning: "fëmijë", translation: "child", emoji: "👶", missing: "F" },
      { word: "GUR", meaning: "gur", translation: "stone", emoji: "🪨", missing: "G" },
      { word: "HÄN-Ä", meaning: "hënë", translation: "moon", emoji: "🌙", missing: "H" },
      { word: "LIBËR", meaning: "libër", translation: "book", emoji: "📚", missing: "L" },
      { word: "MA-KI-NÄ", meaning: "makinë", translation: "car", emoji: "🚗", missing: "M" },
      { word: "NA-TÄ", meaning: "natë", translation: "night", emoji: "🌃", missing: "N" },
      { word: "PA-TÄ", meaning: "patë", translation: "duck", emoji: "🦆", missing: "P" },
      { word: "RA-DI-O", meaning: "radio", translation: "radio", emoji: "📻", missing: "R" },
      { word: "SH-TE-PI", meaning: "shtëpi", translation: "house", emoji: "🏠", missing: "S" },
      { word: "TO-PÄ", meaning: "topë", translation: "ball", emoji: "🎾", missing: "T" },
      { word: "U-JÄ", meaning: "ujë", translation: "water", emoji: "💧", missing: "U" },
      { word: "VE-ZÄ", meaning: "vezë", translation: "egg", emoji: "🥚", missing: "V" },
      { word: "ZO-GU", meaning: "zogu", translation: "bird", emoji: "🐦", missing: "Z" },
      { word: "KA-LU", meaning: "kalu", translation: "horse", emoji: "🐎", missing: "K" },
    ],
    mesatar: [
      { word: "BI-BLI-OT-E-KÄ", meaning: "bibliotekë", translation: "library", emoji: "📖", missing: "B" },
      { word: "FJA-LOR", meaning: "fjalor", translation: "dictionary", emoji: "📕", missing: "F" },
      { word: "GJU-HÄ", meaning: "gjuhë", translation: "language/tongue", emoji: "👅", missing: "GJ" },
      { word: "KRÄH", meaning: "krah", translation: "arm/wing", emoji: "💪", missing: "R" },
      { word: "LU-LE", meaning: "lule", translation: "flower", emoji: "🌸", missing: "L" },
      { word: "MJE-TE", meaning: "mjete", translation: "tools", emoji: "🔧", missing: "M" },
      { word: "NXEN-ÄS", meaning: "nxënës", translation: "student", emoji: "🧑‍🎓", missing: "NX" },
      { word: "PEM-BÄ", meaning: "pemë", translation: "tree", emoji: "🌳", missing: "P" },
      { word: "QY-TET", meaning: "qytet", translation: "city", emoji: "🏙️", missing: "Q" },
      { word: "SHKO-LLÄ", meaning: "shkollë", translation: "school", emoji: "🏫", missing: "SH" },
      { word: "TRE-GU", meaning: "tregu", translation: "market", emoji: "🛒", missing: "TR" },
      { word: "U-SHTRI-ME", meaning: "ushtrime", translation: "exercises", emoji: "📝", missing: "U" },
      { word: "VEND-LI-NDJ-A", meaning: "vendlindja", translation: "birthplace", emoji: "🗺️", missing: "V" },
      { word: "XHA-MI-A", meaning: "xhamia", translation: "mosque", emoji: "🕌", missing: "XH" },
      { word: "ZEM-RÄ", meaning: "zemrë", translation: "heart", emoji: "❤️", missing: "Z" },
      { word: "HA-PÄ-SI-RÄ", meaning: "hapësirë", translation: "space/room", emoji: "🌌", missing: "H" },
      { word: "KAL-TÄR", meaning: "kaltër", translation: "blue", emoji: "💙", missing: "K" },
      { word: "MES-HA-PÄS", meaning: "meshapas", translation: "afternoon", emoji: "🌇", missing: "M" },
      { word: "NDÄ-RTIM", meaning: "ndërtim", translation: "construction", emoji: "🏗️", missing: "ND" },
      { word: "OQE-AN", meaning: "oqean", translation: "ocean", emoji: "🌊", missing: "O" },
      { word: "PA-TÄ-SI", meaning: "patësi", translation: "certainty", emoji: "✅", missing: "P" },
      { word: "RRUGÄ", meaning: "rrugë", translation: "street/road", emoji: "🛣️", missing: "R" },
      { word: "SI-ÄLL", meaning: "siëll", translation: "bring", emoji: "🎁", missing: "S" },
      { word: "SHÄ-NIT", meaning: "shënit", translation: "note/health", emoji: "📋", missing: "SH" },
      { word: "TRU-RI", meaning: "truri", translation: "brain", emoji: "🧠", missing: "T" },
    ],
    avancuar: [
      { word: "PER-GJE-GJËSI", meaning: "përgjegjësi", translation: "responsibility", emoji: "⚖️", missing: "P" },
      { word: "KUAL-I-FI-KIM", meaning: "kualifikim", translation: "qualification", emoji: "🎓", missing: "K" },
      { word: "ZH-VILLIM", meaning: "zhvillim", translation: "development", emoji: "📈", missing: "ZH" },
      { word: "BA-SHK-ÄP-U-NUM", meaning: "bashkëpunum", translation: "cooperation", emoji: "🤝", missing: "B" },
      { word: "AR-SIM", meaning: "arsim", translation: "education", emoji: "🏛️", missing: "A" },
      { word: "KOM-BÄ-TÄ-RI", meaning: "kombëtar", translation: "national", emoji: "🏳️", missing: "K" },
      { word: "SHK-EN-CÄ", meaning: "shkencë", translation: "science", emoji: "🔬", missing: "SH" },
      { word: "I-DE-O-LO-GJI", meaning: "ideologji", translation: "ideology", emoji: "💡", missing: "I" },
    ],
    profesionist: [
      { word: "SU-VE-REN", meaning: "sovran", translation: "sovereign", emoji: "👑", missing: "S" },
      { word: "EP-IS-TE-MO-LO-GJI", meaning: "epistemologji", translation: "epistemology", emoji: "🧩", missing: "E" },
      { word: "MET-A-FI-ZI-KÄ", meaning: "metafizikë", translation: "metaphysics", emoji: "🌌", missing: "M" },
      { word: "DIA-LEK-TI-KÄ", meaning: "dialektikë", translation: "dialectics", emoji: "⚖️", missing: "D" },
      { word: "FI-LO-SO-FI", meaning: "filozofi", translation: "philosophy", emoji: "🏛️", missing: "F" },
      { word: "TE-OLO-GJI", meaning: "teologji", translation: "theology", emoji: "📜", missing: "T" },
      { word: "HER-ME-NEU-TI-KÄ", meaning: "hermeneutikë", translation: "hermeneutics", emoji: "📖", missing: "H" },
      { word: "OR-TO-GRA-FI", meaning: "ortografi", translation: "orthography", emoji: "✍️", missing: "O" },
    ],
  },
  anglisht: {
    fillestar: [
      { word: "APPLE", meaning: "apple", translation: "mollë", emoji: "🍎", missing: "A" },
      { word: "BALL", meaning: "ball", translation: "top", emoji: "⚽", missing: "B" },
      { word: "CAT", meaning: "cat", translation: "mace", emoji: "🐱", missing: "C" },
      { word: "DOG", meaning: "dog", translation: "qen", emoji: "🐶", missing: "D" },
      { word: "EGG", meaning: "egg", translation: "vezë", emoji: "🥚", missing: "E" },
      { word: "FISH", meaning: "fish", translation: "peshk", emoji: "🐟", missing: "F" },
      { word: "GOAT", meaning: "goat", translation: "dhi", emoji: "🐐", missing: "G" },
      { word: "HOUSE", meaning: "house", translation: "shtëpi", emoji: "🏠", missing: "H" },
      { word: "ICE", meaning: "ice", translation: "akull", emoji: "🧊", missing: "I" },
      { word: "JAR", meaning: "jar", translation: "kavanoz", emoji: "🫙", missing: "J" },
      { word: "KITE", meaning: "kite", translation: "balonë", emoji: "🪁", missing: "K" },
      { word: "LION", meaning: "lion", translation: "luan", emoji: "🦁", missing: "L" },
      { word: "MOON", meaning: "moon", translation: "hënë", emoji: "🌙", missing: "M" },
      { word: "NEST", meaning: "nest", translation: "fole", emoji: "🪺", missing: "N" },
      { word: "OWL", meaning: "owl", translation: "buf", emoji: "🦉", missing: "O" },
      { word: "PIG", meaning: "pig", translation: "derr", emoji: "🐷", missing: "P" },
      { word: "QUEEN", meaning: "queen", translation: "mbretëreshë", emoji: "👑", missing: "Q" },
      { word: "RAIN", meaning: "rain", translation: "shi", emoji: "🌧️", missing: "R" },
      { word: "SUN", meaning: "sun", translation: "diell", emoji: "☀️", missing: "S" },
      { word: "TREE", meaning: "tree", translation: "pemë", emoji: "🌳", missing: "T" },
      { word: "UMBRELLA", meaning: "umbrella", translation: "çadër", emoji: "☂️", missing: "U" },
      { word: "VIOLIN", meaning: "violin", translation: "violinë", emoji: "🎻", missing: "V" },
      { word: "WATER", meaning: "water", translation: "ujë", emoji: "💧", missing: "W" },
      { word: "FOX", meaning: "fox", translation: "dhelpër", emoji: "🦊", missing: "X" },
      { word: "YELLOW", meaning: "yellow", translation: "e verdhë", emoji: "💛", missing: "Y" },
      { word: "ZEBRA", meaning: "zebra", translation: "zebër", emoji: "🦓", missing: "Z" },
      { word: "BOOK", meaning: "book", translation: "libër", emoji: "📚", missing: "B" },
      { word: "CHAIR", meaning: "chair", translation: "karrige", emoji: "🪑", missing: "CH" },
      { word: "DOOR", meaning: "door", translation: "derë", emoji: "🚪", missing: "D" },
      { word: "ELEPHANT", meaning: "elephant", translation: "elefant", emoji: "🐘", missing: "E" },
    ],
    mesatar: [
      { word: "SCHOOL", meaning: "school", translation: "shkollë", emoji: "🏫", missing: "SCH" },
      { word: "FRIEND", meaning: "friend", translation: "mik", emoji: "🤝", missing: "FR" },
      { word: "FAMILY", meaning: "family", translation: "familje", emoji: "👨‍👩‍👧", missing: "F" },
      { word: "FLOWER", meaning: "flower", translation: "lule", emoji: "🌸", missing: "FL" },
      { word: "GARDEN", meaning: "garden", translation: "kopsht", emoji: "🌻", missing: "G" },
      { word: "KITCHEN", meaning: "kitchen", translation: "kuzhinë", emoji: "🍳", missing: "K" },
      { word: "LIBRARY", meaning: "library", translation: "bibliotekë", emoji: "📖", missing: "L" },
      { word: "MOUNTAIN", meaning: "mountain", translation: "mal", emoji: "⛰️", missing: "M" },
      { word: "NATURE", meaning: "nature", translation: "natyrë", emoji: "🌿", missing: "N" },
      { word: "ORANGE", meaning: "orange", translation: "portokall", emoji: "🍊", missing: "O" },
      { word: "PLANET", meaning: "planet", translation: "planet", emoji: "🪐", missing: "PL" },
      { word: "RIVER", meaning: "river", translation: "lumë", emoji: "🏞️", missing: "R" },
      { word: "STUDENT", meaning: "student", translation: "student", emoji: "🎒", missing: "ST" },
      { word: "TEACHER", meaning: "teacher", translation: "mësues", emoji: "👩‍🏫", missing: "T" },
      { word: "WINDOW", meaning: "window", translation: "dritare", emoji: "🪟", missing: "W" },
    ],
    avancuar: [
      { word: "KNOWLEDGE", meaning: "knowledge", translation: "njohuri", emoji: "🧠", missing: "K" },
      { word: "RESPONSIBILITY", meaning: "responsibility", translation: "përgjegjësi", emoji: "⚖️", missing: "R" },
      { word: "ACHIEVEMENT", meaning: "achievement", translation: "arritje", emoji: "🏆", missing: "A" },
      { word: "COMMUNICATION", meaning: "communication", translation: "komunikim", emoji: "💬", missing: "C" },
      { word: "DEVELOPMENT", meaning: "development", translation: "zhvillim", emoji: "📈", missing: "D" },
      { word: "PHILOSOPHY", meaning: "philosophy", translation: "filozofi", emoji: "🏛️", missing: "PH" },
      { word: "CIVILIZATION", meaning: "civilization", translation: "qytetërim", emoji: "🌍", missing: "C" },
      { word: "INDEPENDENCE", meaning: "independence", translation: "pavarësi", emoji: "🗽", missing: "I" },
    ],
    profesionist: [
      { word: "EPISTEMOLOGY", meaning: "epistemology", translation: "epistemologji", emoji: "🧩", missing: "E" },
      { word: "METAPHYSICS", meaning: "metaphysics", translation: "metafizikë", emoji: "🌌", missing: "M" },
      { word: "HERMENEUTICS", meaning: "hermeneutics", translation: "hermeneutikë", emoji: "📖", missing: "H" },
      { word: "JURISPRUDENCE", meaning: "jurisprudence", translation: "jurisprudencë", emoji: "⚖️", missing: "J" },
      { word: "ECCLESIASTICAL", meaning: "ecclesiastical", translation: "kishëtar", emoji: "⛪", missing: "E" },
      { word: "PREDESTINATION", meaning: "predestination", translation: "paracaktim", emoji: "🌠", missing: "P" },
      { word: "OMNIPOTENCE", meaning: "omnipotence", translation: "gjithëpushtet", emoji: "💫", missing: "O" },
      { word: "TRANSCENDENCE", meaning: "transcendence", translation: "tejkalim", emoji: "✨", missing: "T" },
    ],
  },
  arabisht: {
    fillestar: [
      { word: "بَيْت", meaning: "بيت", translation: "shtëpi / house", emoji: "🏠", missing: "ب", transliteration: "bayt" },
      { word: "كِتَاب", meaning: "كتاب", translation: "libër / book", emoji: "📚", missing: "ك", transliteration: "kitāb" },
      { word: "مَاء", meaning: "ماء", translation: "ujë / water", emoji: "💧", missing: "م", transliteration: "mā'" },
      { word: "شَمْس", meaning: "شمس", translation: "diell / sun", emoji: "☀️", missing: "ش", transliteration: "shams" },
      { word: "قَمَر", meaning: "قمر", translation: "hënë / moon", emoji: "🌙", missing: "ق", transliteration: "qamar" },
      { word: "أَسَد", meaning: "أسد", translation: "luan / lion", emoji: "🦁", missing: "أ", transliteration: "asad" },
      { word: "تُفَّاح", meaning: "تفاح", translation: "mollë / apple", emoji: "🍎", missing: "ت", transliteration: "tuffāh" },
      { word: "سَمَك", meaning: "سمك", translation: "peshk / fish", emoji: "🐟", missing: "س", transliteration: "samak" },
      { word: "نَجْم", meaning: "نجم", translation: "yll / star", emoji: "⭐", missing: "ن", transliteration: "najm" },
      { word: "وَرْد", meaning: "ورد", translation: "trëndafil / rose", emoji: "🌹", missing: "و", transliteration: "ward" },
      { word: "عَيْن", meaning: "عين", translation: "sy / eye", emoji: "👁️", missing: "ع", transliteration: "'ayn" },
      { word: "يَد", meaning: "يد", translation: "dorë / hand", emoji: "✋", missing: "ي", transliteration: "yad" },
      { word: "فِيل", meaning: "فيل", translation: "elefant / elephant", emoji: "🐘", missing: "ف", transliteration: "fīl" },
      { word: "لَبَن", meaning: "لبن", translation: "qumësht / milk", emoji: "🥛", missing: "ل", transliteration: "laban" },
      { word: "حِصَان", meaning: "حصان", translation: "kalë / horse", emoji: "🐎", missing: "ح", transliteration: "ḥiṣān" },
    ],
    mesatar: [
      { word: "مَدْرَسَة", meaning: "مدرسة", translation: "shkollë / school", emoji: "🏫", missing: "م", transliteration: "madrasa" },
      { word: "مَسْجِد", meaning: "مسجد", translation: "xhami / mosque", emoji: "🕌", missing: "م", transliteration: "masjid" },
      { word: "قُرْآن", meaning: "قرآن", translation: "Kuran / Quran", emoji: "📖", missing: "ق", transliteration: "Qur'ān" },
      { word: "صَلَاة", meaning: "صلاة", translation: "namaz / prayer", emoji: "🤲", missing: "ص", transliteration: "ṣalāh" },
      { word: "رَمَضَان", meaning: "رمضان", translation: "Ramazan / Ramadan", emoji: "🌙", missing: "ر", transliteration: "Ramaḍān" },
      { word: "مُعَلِّم", meaning: "معلم", translation: "mësues / teacher", emoji: "👨‍🏫", missing: "م", transliteration: "mu'allim" },
      { word: "طَالِب", meaning: "طالب", translation: "student", emoji: "🎒", missing: "ط", transliteration: "ṭālib" },
      { word: "عَائِلَة", meaning: "عائلة", translation: "familje / family", emoji: "👨‍👩‍👧", missing: "ع", transliteration: "'ā'ila" },
      { word: "صَدِيق", meaning: "صديق", translation: "mik / friend", emoji: "🤝", missing: "ص", transliteration: "ṣadīq" },
      { word: "حَدِيقَة", meaning: "حديقة", translation: "kopsht / garden", emoji: "🌺", missing: "ح", transliteration: "ḥadīqa" },
    ],
    avancuar: [
      { word: "مَسْؤُولِيَّة", meaning: "مسؤولية", translation: "përgjegjësi / responsibility", emoji: "⚖️", missing: "م", transliteration: "mas'ūliyya" },
      { word: "اِجْتِهَاد", meaning: "اجتهاد", translation: "përpjekje / effort/ijtihad", emoji: "💪", missing: "ا", transliteration: "ijtihād" },
      { word: "حَضَارَة", meaning: "حضارة", translation: "qytetërim / civilization", emoji: "🏛️", missing: "ح", transliteration: "ḥaḍāra" },
      { word: "تَعَاوُن", meaning: "تعاون", translation: "bashkëpunim / cooperation", emoji: "🤝", missing: "ت", transliteration: "ta'āwun" },
      { word: "عِلْم", meaning: "علم", translation: "dituri / knowledge", emoji: "🧠", missing: "ع", transliteration: "'ilm" },
      { word: "فِقْه", meaning: "فقه", translation: "jurisprudencë islame", emoji: "📜", missing: "ف", transliteration: "fiqh" },
      { word: "تَوْحِيد", meaning: "توحيد", translation: "monoteizëm / tawheed", emoji: "☝️", missing: "ت", transliteration: "tawḥīd" },
      { word: "أَخْلَاق", meaning: "أخلاق", translation: "moral / ethics", emoji: "⭐", missing: "أ", transliteration: "akhlāq" },
    ],
    profesionist: [
      { word: "اِسْتِنْبَاط", meaning: "استنباط", translation: "nxjerrje përfundimesh", emoji: "🧩", missing: "ا", transliteration: "istinbāṭ" },
      { word: "عَقِيدَة", meaning: "عقيدة", translation: "besim / creed", emoji: "🌟", missing: "ع", transliteration: "'aqīda" },
      { word: "مُجْتَهِد", meaning: "مجتهد", translation: "dijetar / scholar", emoji: "📚", missing: "م", transliteration: "mujtahid" },
      { word: "إِسْلَامِيَّة", meaning: "إسلامية", translation: "islamike / Islamic", emoji: "☪️", missing: "إ", transliteration: "islāmiyya" },
      { word: "تَفْسِير", meaning: "تفسير", translation: "komentim / tafseer", emoji: "📖", missing: "ت", transliteration: "tafsīr" },
      { word: "مُصْطَلَح", meaning: "مصطلح", translation: "term / terminology", emoji: "🔤", missing: "م", transliteration: "muṣṭalaḥ" },
      { word: "فَلْسَفَة", meaning: "فلسفة", translation: "filozofi / philosophy", emoji: "🏛️", missing: "ف", transliteration: "falsafa" },
      { word: "مَنْهَجِيَّة", meaning: "منهجية", translation: "metodologji", emoji: "🗂️", missing: "م", transliteration: "manhajiyya" },
    ],
  },
};

const QUIZ_TYPES_WORDS = ["emoji_to_word", "missing_letter", "word_to_translation", "translation_to_word"];

function generateWordQuestion(language, level) {
  const words = WORDS_DATA[language]?.[level] || WORDS_DATA[language]?.fillestar || [];
  if (!words.length) return null;

  const item = words[Math.floor(Math.random() * words.length)];
  const type = QUIZ_TYPES_WORDS[Math.floor(Math.random() * QUIZ_TYPES_WORDS.length)];
  const isArabic = language === "arabisht";

  const getOtherWords = () => words.filter(w => w.word !== item.word).sort(() => Math.random() - 0.5).slice(0, 3);

  if (type === "emoji_to_word") {
    const others = getOtherWords();
    const options = [item, ...others].sort(() => Math.random() - 0.5);
    return {
      question: `Çfarë tregon kjo figurë?`,
      display: item.emoji,
      displayType: "emoji",
      options: options.map(o => o.meaning),
      correct: item.meaning,
      hint: isArabic ? `(${item.transliteration})` : "",
      type
    };
  }

  if (type === "missing_letter") {
    const wordWithBlank = item.word.replace(item.missing, "_".repeat(item.missing.length));
    const allLetters = isArabic
      ? ["ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","و","ه","ي"]
      : language === "anglisht"
        ? ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","XH","Y","Z"];
    const wrongOptions = allLetters.filter(l => l !== item.missing).sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [item.missing, ...wrongOptions].sort(() => Math.random() - 0.5);
    return {
      question: `Cila germë mungon?`,
      display: wordWithBlank,
      subDisplay: item.emoji + " " + item.translation,
      displayType: "word",
      options,
      correct: item.missing,
      isArabic,
      type
    };
  }

  if (type === "word_to_translation") {
    const others = getOtherWords();
    const options = [item, ...others].sort(() => Math.random() - 0.5);
    return {
      question: isArabic ? `Çfarë do të thotë kjo fjalë arabe?` : `Çfarë do të thotë "${item.meaning}"?`,
      display: item.meaning + " " + item.emoji,
      displayType: "word",
      isArabic,
      options: options.map(o => o.translation),
      correct: item.translation,
      type
    };
  }

  // translation_to_word
  const others = getOtherWords();
  const options = [item, ...others].sort(() => Math.random() - 0.5);
  return {
    question: `Si thuhet "${item.translation}" ${isArabic ? "në arabisht" : language === "anglisht" ? "në anglisht" : "në shqip"}?`,
    display: item.emoji,
    displayType: "emoji",
    options: options.map(o => o.meaning),
    correct: item.meaning,
    isArabic,
    type
  };
}

const speak = (text, lang) => {
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "arabisht" ? "ar" : lang === "anglisht" ? "en" : "sq";
  u.rate = 0.7;
  window.speechSynthesis.speak(u);
};

const TOTAL = 10;
const TIME = 25;

export default function WordsView({ language }) {
  const [level, setLevel] = useState("fillestar");
  const [mode, setMode] = useState("browse"); // browse | quiz
  const [question, setQuestion] = useState(null);
  const [answered, setAnswered] = useState(null);
  const [timer, setTimer] = useState(TIME);
  const [score, setScore] = useState(0);
  const [qNum, setQNum] = useState(1);
  const [finished, setFinished] = useState(false);

  const wordList = WORDS_DATA[language]?.[level] || WORDS_DATA[language]?.fillestar || [];
  const isArabic = language === "arabisht";

  const startQuiz = () => {
    const q = generateWordQuestion(language, level);
    setQuestion(q);
    setTimer(TIME);
    setScore(0);
    setQNum(1);
    setAnswered(null);
    setFinished(false);
    setMode("quiz");
  };

  useEffect(() => {
    if (mode !== "quiz" || finished || !question) return;
    if (timer <= 0) { handleAnswer(null); return; }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, mode, finished, question]);

  const handleAnswer = (opt) => {
    if (answered !== null) return;
    const isCorrect = opt === question.correct;
    setAnswered({ selected: opt, correct: question.correct, isCorrect });
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (qNum >= TOTAL) { setFinished(true); return; }
      const q = generateWordQuestion(language, level);
      setQuestion(q);
      setTimer(TIME);
      setQNum(n => n + 1);
      setAnswered(null);
    }, 1300);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-3">
          {isArabic ? "🇸🇦 الكلمات العربية" : language === "anglisht" ? "🇬🇧 English Words" : "🇦🇱 Fjalët Shqipe"}
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { v: "fillestar", label: "🌱 Fillestar", sub: "50+ fjalë" },
            { v: "mesatar",   label: "🌿 Mesatar",   sub: "500+ fjalë" },
            { v: "avancuar",  label: "🌲 Avancuar",  sub: "2000+ fjalë" },
            { v: "profesionist", label: "🏆 Profesionist", sub: "4000+ fjalë" },
          ].map(l => (
            <button key={l.v} onClick={() => setLevel(l.v)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex flex-col items-center ${level === l.v ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              <span>{l.label}</span>
              <span className={`text-xs ${level === l.v ? "text-emerald-100" : "text-gray-400"}`}>{l.sub}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setMode("browse")} variant={mode === "browse" ? "default" : "outline"} className="rounded-xl">
            📚 Shfleto Fjalët
          </Button>
          <Button onClick={startQuiz} className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl">
            🎯 Fillo Ushtrimet
          </Button>
        </div>
      </div>

      {/* Browse mode */}
      {mode === "browse" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-700 mb-4">Fjalë — Nivel {level} ({wordList.length} fjalë)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {wordList.map((w, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => speak(w.meaning, language)}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-indigo-100 rounded-2xl p-4 text-center hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-2">{w.emoji}</div>
                <div
                  className={`font-bold text-gray-800 mb-1 ${isArabic ? "text-xl" : "text-base"}`}
                  style={isArabic ? { fontFamily: "serif", direction: "rtl" } : {}}
                >
                  {w.meaning}
                </div>
                {w.transliteration && <div className="text-xs text-gray-400 italic mb-1">{w.transliteration}</div>}
                <div className="text-xs text-indigo-500">{w.translation}</div>
                <Volume2 className="w-3.5 h-3.5 text-teal-400 mx-auto mt-1" />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Quiz mode */}
      {mode === "quiz" && !finished && question && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-600">Pyetja {qNum}/{TOTAL}</span>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${timer <= 5 ? "bg-red-100 text-red-600 animate-pulse" : "bg-amber-100 text-amber-700"}`}>
              <Timer className="w-4 h-4" /> {timer}s
            </div>
            <span className="text-sm font-semibold text-emerald-600">✓ {score}</span>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 text-center mb-5">
            {question.displayType === "emoji" ? (
              <div className="text-7xl mb-3">{question.display}</div>
            ) : (
              <div
                className={`font-bold text-gray-900 mb-2 ${isArabic ? "text-4xl" : "text-3xl"}`}
                style={isArabic ? { fontFamily: "serif", direction: "rtl" } : {}}
              >
                {question.display}
              </div>
            )}
            {question.subDisplay && <p className="text-sm text-gray-500 mb-1">{question.subDisplay}</p>}
            <p className="text-sm font-semibold text-gray-700">{question.question}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {question.options.map((opt) => {
              let cls = "border-gray-200 bg-white text-gray-800 hover:border-indigo-300 hover:bg-indigo-50";
              if (answered) {
                if (opt === answered.correct) cls = "border-emerald-500 bg-emerald-50 text-emerald-800";
                else if (opt === answered.selected && !answered.isCorrect) cls = "border-red-400 bg-red-50 text-red-700";
                else cls = "border-gray-100 bg-gray-50 text-gray-400";
              }
              return (
                <button
                  key={opt}
                  disabled={!!answered}
                  onClick={() => handleAnswer(opt)}
                  className={`border-2 rounded-2xl p-4 font-semibold text-center transition-all ${cls}`}
                  style={isArabic && question.isArabic ? { fontFamily: "serif", direction: "rtl", fontSize: "1.2rem" } : {}}
                >
                  {opt}
                  {answered && opt === answered.correct && <CheckCircle className="w-4 h-4 inline ml-1 text-emerald-600" />}
                  {answered && opt === answered.selected && !answered.isCorrect && <XCircle className="w-4 h-4 inline ml-1 text-red-500" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {mode === "quiz" && finished && (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <Star className="w-14 h-14 text-amber-400 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Ushtrimet Mbaruan!</h3>
          <p className="text-5xl font-bold text-emerald-600 mb-2">{score}/{TOTAL}</p>
          <p className="text-gray-500 mb-6">{score >= 8 ? "Fantastike! 🎉" : score >= 5 ? "Shumë mirë! 👍" : "Provo sërish! 💪"}</p>
          <Button onClick={startQuiz} className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-8">
            Provo Sërish
          </Button>
        </div>
      )}
    </div>
  );
}