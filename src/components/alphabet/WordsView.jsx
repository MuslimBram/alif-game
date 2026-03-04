import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, Timer, CheckCircle, XCircle, Star, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Words by level for each language with emoji "images"
const WORDS_DATA = {
  shqip: {
    fillestar: [
      { word: "BU-KË", meaning: "bukë", translation: "bread", emoji: "🍞", missing: "U" },
      { word: "MA-MÄ", meaning: "mamë", translation: "mom", emoji: "👩", missing: "A" },
      { word: "BA-BÄ", meaning: "babë", translation: "dad", emoji: "👨", missing: "B" },
      { word: "CA-JO", meaning: "cajo", translation: "ball", emoji: "⚽", missing: "C" },
      { word: "DI-ELL", meaning: "diell", translation: "sun", emoji: "☀️", missing: "D" },
      { word: "E-MÄR", meaning: "emër", translation: "name", emoji: "🏷️", missing: "E" },
      { word: "FE-MIJ-Ë", meaning: "fëmijë", translation: "child", emoji: "👶", missing: "F" },
      { word: "GUR", meaning: "gur", translation: "stone", emoji: "🪨", missing: "G" },
      { word: "HÄN-Ä", meaning: "hënë", translation: "moon", emoji: "🌙", missing: "H" },
      { word: "LI-BËR", meaning: "libër", translation: "book", emoji: "📚", missing: "L" },
      { word: "MA-KI-NÄ", meaning: "makinë", translation: "car", emoji: "🚗", missing: "M" },
      { word: "NA-TÄ", meaning: "natë", translation: "night", emoji: "🌃", missing: "N" },
      { word: "PA-TÄ", meaning: "patë", translation: "duck", emoji: "🦆", missing: "P" },
      { word: "RA-DI-O", meaning: "radio", translation: "radio", emoji: "📻", missing: "R" },
      { word: "SHTE-PI", meaning: "shtëpi", translation: "house", emoji: "🏠", missing: "SH" },
      { word: "TOP", meaning: "top", translation: "ball", emoji: "🎾", missing: "T" },
      { word: "U-JÄ", meaning: "ujë", translation: "water", emoji: "💧", missing: "U" },
      { word: "VE-ZÄ", meaning: "vezë", translation: "egg", emoji: "🥚", missing: "V" },
      { word: "ZO-GU", meaning: "zogu", translation: "bird", emoji: "🐦", missing: "Z" },
      { word: "KA-LË", meaning: "kalë", translation: "horse", emoji: "🐎", missing: "K" },
      { word: "A-RU-SHA", meaning: "arusha", translation: "bear", emoji: "🐻", missing: "A" },
      { word: "BISH-TÄ", meaning: "bishtë", translation: "tail", emoji: "🦊", missing: "B" },
      { word: "ÇIÇA", meaning: "çiça", translation: "chicken", emoji: "🐔", missing: "Ç" },
      { word: "DE-TI", meaning: "deti", translation: "sea", emoji: "🌊", missing: "D" },
      { word: "ELL-BI", meaning: "elbën", translation: "elbow", emoji: "💪", missing: "E" },
      { word: "FJA-LÄ", meaning: "fjalë", translation: "word", emoji: "💬", missing: "F" },
      { word: "GJE-THI", meaning: "gjeth", translation: "leaf", emoji: "🍃", missing: "GJ" },
      { word: "HIJ-Ë", meaning: "hijë", translation: "shadow", emoji: "🌑", missing: "H" },
      { word: "I-KE", meaning: "ike", translation: "go away", emoji: "🏃", missing: "I" },
      { word: "JA-V-Ë", meaning: "javë", translation: "week", emoji: "📅", missing: "J" },
      { word: "KA-FÄ", meaning: "kafë", translation: "coffee", emoji: "☕", missing: "K" },
      { word: "LU-MÄ", meaning: "lumë", translation: "river", emoji: "🏞️", missing: "L" },
      { word: "MI-ELL", meaning: "miell", translation: "flour", emoji: "🌾", missing: "M" },
      { word: "NÄN-Ä", meaning: "nënë", translation: "mother", emoji: "👩‍👧", missing: "N" },
      { word: "O-KÄ", meaning: "okë", translation: "old measure", emoji: "⚖️", missing: "O" },
      { word: "PE-MÄ", meaning: "pemë", translation: "tree", emoji: "🌳", missing: "P" },
      { word: "QEN", meaning: "qen", translation: "dog", emoji: "🐶", missing: "Q" },
      { word: "RRÄ-NJÄ", meaning: "rrënjë", translation: "root", emoji: "🌱", missing: "R" },
      { word: "SY", meaning: "sy", translation: "eye", emoji: "👁️", missing: "S" },
      { word: "THI-KÄ", meaning: "thikë", translation: "knife", emoji: "🔪", missing: "TH" },
      { word: "U-RÄ", meaning: "urë", translation: "bridge", emoji: "🌉", missing: "U" },
      { word: "VE-RA", meaning: "vera", translation: "summer", emoji: "☀️", missing: "V" },
      { word: "XHA-MI", meaning: "xhami", translation: "glass/mosque", emoji: "🕌", missing: "XH" },
      { word: "YLL", meaning: "yll", translation: "star", emoji: "⭐", missing: "Y" },
      { word: "ZJA-RR", meaning: "zjarr", translation: "fire", emoji: "🔥", missing: "Z" },
      { word: "DI-TÄ", meaning: "ditë", translation: "day", emoji: "🌤️", missing: "D" },
      { word: "MU-GU-LL", meaning: "mugull", translation: "bud", emoji: "🌷", missing: "M" },
      { word: "PLO-TÄ", meaning: "plotë", translation: "full", emoji: "🥗", missing: "PL" },
      { word: "SHI", meaning: "shi", translation: "rain", emoji: "🌧️", missing: "SH" },
      { word: "TRE-TA", meaning: "treta", translation: "third", emoji: "3️⃣", missing: "T" },
    ],
    mesatar: [
      { word: "BI-BLI-OTE-KÄ", meaning: "bibliotekë", translation: "library", emoji: "📖", missing: "B" },
      { word: "FJA-LOR", meaning: "fjalor", translation: "dictionary", emoji: "📕", missing: "F" },
      { word: "GJU-HÄ", meaning: "gjuhë", translation: "language", emoji: "👅", missing: "GJ" },
      { word: "KRAH", meaning: "krah", translation: "arm/wing", emoji: "💪", missing: "K" },
      { word: "LU-LE", meaning: "lule", translation: "flower", emoji: "🌸", missing: "L" },
      { word: "MJE-TE", meaning: "mjete", translation: "tools", emoji: "🔧", missing: "M" },
      { word: "NXÄ-NÄS", meaning: "nxënës", translation: "pupil/student", emoji: "🧑‍🎓", missing: "NX" },
      { word: "PE-MÄ", meaning: "pemë", translation: "tree", emoji: "🌳", missing: "P" },
      { word: "QY-TET", meaning: "qytet", translation: "city", emoji: "🏙️", missing: "Q" },
      { word: "SHKO-LLÄ", meaning: "shkollë", translation: "school", emoji: "🏫", missing: "SH" },
      { word: "TRE-GU", meaning: "tregu", translation: "market", emoji: "🛒", missing: "TR" },
      { word: "USH-TRI-ME", meaning: "ushtrime", translation: "exercises", emoji: "📝", missing: "U" },
      { word: "VEND-LIN-DJA", meaning: "vendlindja", translation: "birthplace", emoji: "🗺️", missing: "V" },
      { word: "XHA-MI-A", meaning: "xhamia", translation: "mosque", emoji: "🕌", missing: "XH" },
      { word: "ZEM-RÄ", meaning: "zemrë", translation: "heart", emoji: "❤️", missing: "Z" },
      { word: "HA-PÄ-SI-RÄ", meaning: "hapësirë", translation: "space/room", emoji: "🌌", missing: "H" },
      { word: "KAL-TÄR", meaning: "kaltër", translation: "blue", emoji: "💙", missing: "K" },
      { word: "PAS-DI-TE", meaning: "pasdite", translation: "afternoon", emoji: "🌇", missing: "P" },
      { word: "NDÄ-RTIM", meaning: "ndërtim", translation: "construction", emoji: "🏗️", missing: "ND" },
      { word: "OQE-AN", meaning: "oqean", translation: "ocean", emoji: "🌊", missing: "O" },
      { word: "SI-GU-RI", meaning: "siguri", translation: "safety/certainty", emoji: "✅", missing: "S" },
      { word: "RRU-GÄ", meaning: "rrugë", translation: "street/road", emoji: "🛣️", missing: "R" },
      { word: "SHÄ-NI", meaning: "shëni", translation: "note/sign", emoji: "📋", missing: "SH" },
      { word: "TRU-RI", meaning: "truri", translation: "brain", emoji: "🧠", missing: "T" },
      { word: "AJ-RO-PORT", meaning: "aeroport", translation: "airport", emoji: "✈️", missing: "A" },
      { word: "BANK-Ä", meaning: "bankë", translation: "bank/bench", emoji: "🏦", missing: "B" },
      { word: "CIP-Ä", meaning: "cipë", translation: "membrane/skin", emoji: "🫧", missing: "C" },
      { word: "DI-TU-RI", meaning: "dituri", translation: "knowledge", emoji: "💡", missing: "D" },
      { word: "E-MÄR-TIM", meaning: "emërtim", translation: "naming", emoji: "🏷️", missing: "E" },
      { word: "FE-SÄ", meaning: "fesë", translation: "engagement", emoji: "💍", missing: "F" },
      { word: "GÄ-ZIM", meaning: "gëzim", translation: "joy", emoji: "😊", missing: "G" },
      { word: "HE-ROJ", meaning: "heroj", translation: "hero", emoji: "🦸", missing: "H" },
      { word: "IN-STI-TUT", meaning: "institut", translation: "institute", emoji: "🏛️", missing: "I" },
      { word: "JETO-JMÄ", meaning: "jetojmë", translation: "we live", emoji: "🌍", missing: "J" },
      { word: "KU-JTIM", meaning: "kujtim", translation: "memory", emoji: "🧠", missing: "K" },
      { word: "LI-RÄ", meaning: "lirë", translation: "free/cheap", emoji: "🕊️", missing: "L" },
      { word: "MALËSOR", meaning: "malësor", translation: "highlander", emoji: "⛰️", missing: "M" },
      { word: "NÄ-NÄ-DHEU", meaning: "nënëdheu", translation: "homeland", emoji: "🏡", missing: "N" },
      { word: "O-RARI", meaning: "orari", translation: "schedule/timetable", emoji: "📆", missing: "O" },
      { word: "PU-NÄ", meaning: "punë", translation: "work/job", emoji: "💼", missing: "P" },
      { word: "QÄ-LLIM", meaning: "qëllim", translation: "aim/purpose", emoji: "🎯", missing: "Q" },
      { word: "RE-GJI-STRIM", meaning: "regjistrim", translation: "registration", emoji: "📝", missing: "R" },
      { word: "SHÄ-NDO-SHA", meaning: "shëndosha", translation: "healthy", emoji: "💪", missing: "SH" },
      { word: "TRASHËGIMI", meaning: "trashëgimi", translation: "heritage", emoji: "🏺", missing: "T" },
      { word: "U-RAVE", meaning: "urave", translation: "I wished", emoji: "⭐", missing: "U" },
      { word: "VJE-SH-TÄ", meaning: "vjeshtë", translation: "autumn", emoji: "🍂", missing: "V" },
      { word: "XHU-NGÄ-LL", meaning: "xhungëll", translation: "jungle", emoji: "🌴", missing: "XH" },
      { word: "YLLI-NATE-ROR", meaning: "yllinateror", translation: "meteor/falling star", emoji: "🌠", missing: "Y" },
      { word: "ZÄ-RDHIM", meaning: "zëdhim", translation: "voice/statement", emoji: "🗣️", missing: "Z" },
      { word: "ÇMIM", meaning: "çmim", translation: "price/award", emoji: "🏆", missing: "Ç" },
    ],
    avancuar: [
      { word: "PER-GJE-GJËSI", meaning: "përgjegjësi", translation: "responsibility", emoji: "⚖️", missing: "P" },
      { word: "KUAL-I-FI-KIM", meaning: "kualifikim", translation: "qualification", emoji: "🎓", missing: "K" },
      { word: "ZH-VILLIM", meaning: "zhvillim", translation: "development", emoji: "📈", missing: "ZH" },
      { word: "BASH-KÄ-PU-NUM", meaning: "bashkëpunum", translation: "cooperation", emoji: "🤝", missing: "B" },
      { word: "AR-SIM", meaning: "arsim", translation: "education", emoji: "🏛️", missing: "A" },
      { word: "KOM-BÄ-TAR", meaning: "kombëtar", translation: "national", emoji: "🏳️", missing: "K" },
      { word: "SHKEN-CÄ", meaning: "shkencë", translation: "science", emoji: "🔬", missing: "SH" },
      { word: "I-DE-O-LO-GJI", meaning: "ideologji", translation: "ideology", emoji: "💡", missing: "I" },
      { word: "DE-MO-KRA-CI", meaning: "demokraci", translation: "democracy", emoji: "🗳️", missing: "D" },
      { word: "IN-STI-TU-CI-ON", meaning: "institucion", translation: "institution", emoji: "🏢", missing: "I" },
      { word: "SHO-QÄ-RI", meaning: "shoqëri", translation: "society", emoji: "👥", missing: "SH" },
      { word: "E-KO-NO-MI", meaning: "ekonomi", translation: "economy", emoji: "💰", missing: "E" },
      { word: "PO-LI-TI-KÄ", meaning: "politikë", translation: "politics", emoji: "🏛️", missing: "P" },
      { word: "TRA-DI-TÄ", meaning: "traditë", translation: "tradition", emoji: "🏺", missing: "T" },
      { word: "CIV-I-LI-ZIM", meaning: "civilizim", translation: "civilization", emoji: "🌍", missing: "C" },
      { word: "PA-VA-RÄ-SI", meaning: "pavarësi", translation: "independence", emoji: "🗽", missing: "P" },
      { word: "KON-STI-TU-TÄ", meaning: "kushtetutë", translation: "constitution", emoji: "📜", missing: "K" },
      { word: "MJE-KÄ-SI", meaning: "mjekësi", translation: "medicine", emoji: "⚕️", missing: "M" },
      { word: "IN-XHIN-I-ERI", meaning: "inxhinieri", translation: "engineering", emoji: "⚙️", missing: "I" },
      { word: "PSI-KO-LO-GJI", meaning: "psikologji", translation: "psychology", emoji: "🧠", missing: "PS" },
    ],
    profesionist: [
      { word: "SO-VRA-NI-TET", meaning: "sovranitet", translation: "sovereignty", emoji: "👑", missing: "S" },
      { word: "EPI-STE-MO-LO-GJI", meaning: "epistemologji", translation: "epistemology", emoji: "🧩", missing: "E" },
      { word: "ME-TA-FI-ZI-KÄ", meaning: "metafizikë", translation: "metaphysics", emoji: "🌌", missing: "M" },
      { word: "DI-A-LEK-TI-KÄ", meaning: "dialektikë", translation: "dialectics", emoji: "⚖️", missing: "D" },
      { word: "FI-LO-ZO-FI", meaning: "filozofi", translation: "philosophy", emoji: "🏛️", missing: "F" },
      { word: "TE-O-LO-GJI", meaning: "teologji", translation: "theology", emoji: "📜", missing: "T" },
      { word: "HER-ME-NEU-TI-KÄ", meaning: "hermeneutikë", translation: "hermeneutics", emoji: "📖", missing: "H" },
      { word: "OR-TO-GRA-FI", meaning: "ortografi", translation: "orthography", emoji: "✍️", missing: "O" },
      { word: "AN-TRO-PO-LO-GJI", meaning: "antropologji", translation: "anthropology", emoji: "🦴", missing: "A" },
      { word: "SO-CI-O-LO-GJI", meaning: "sociologji", translation: "sociology", emoji: "👨‍👩‍👧‍👦", missing: "S" },
      { word: "KOS-MO-LO-GJI", meaning: "kozmologji", translation: "cosmology", emoji: "🌌", missing: "K" },
      { word: "ESH-TE-TI-KÄ", meaning: "estetikë", translation: "aesthetics", emoji: "🎨", missing: "E" },
      { word: "ON-TO-LO-GJI", meaning: "ontologji", translation: "ontology", emoji: "♾️", missing: "O" },
      { word: "PRAKS-E-O-LO-GJI", meaning: "prakseologji", translation: "praxeology", emoji: "🔄", missing: "P" },
      { word: "AK-SI-O-LO-GJI", meaning: "aksiologji", translation: "axiology", emoji: "💎", missing: "A" },
      { word: "FE-NO-ME-NO-LO-GJI", meaning: "fenomenologji", translation: "phenomenology", emoji: "🔍", missing: "F" },
    ],
  },
  anglisht: {
    fillestar: [
      { word: "ANT", meaning: "ant", translation: "milingonë", emoji: "🐜", missing: "A" },
      { word: "APPLE", meaning: "apple", translation: "mollë", emoji: "🍎", missing: "PP" },
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
      { word: "FOX", meaning: "fox", translation: "dhelpër", emoji: "🦊", missing: "F" },
      { word: "YELLOW", meaning: "yellow", translation: "e verdhë", emoji: "💛", missing: "Y" },
      { word: "ZEBRA", meaning: "zebra", translation: "zebër", emoji: "🦓", missing: "Z" },
      { word: "BOOK", meaning: "book", translation: "libër", emoji: "📚", missing: "B" },
      { word: "CHAIR", meaning: "chair", translation: "karrige", emoji: "🪑", missing: "CH" },
      { word: "DOOR", meaning: "door", translation: "derë", emoji: "🚪", missing: "D" },
      { word: "ELEPHANT", meaning: "elephant", translation: "elefant", emoji: "🐘", missing: "E" },
      { word: "FROG", meaning: "frog", translation: "bretkosë", emoji: "🐸", missing: "FR" },
      { word: "GRAPE", meaning: "grape", translation: "rrush", emoji: "🍇", missing: "G" },
      { word: "HEART", meaning: "heart", translation: "zemër", emoji: "❤️", missing: "H" },
      { word: "INSECT", meaning: "insect", translation: "insekt", emoji: "🐛", missing: "I" },
      { word: "JUG", meaning: "jug", translation: "ibrik", emoji: "🫖", missing: "J" },
      { word: "KEY", meaning: "key", translation: "çelës", emoji: "🗝️", missing: "K" },
      { word: "LEAF", meaning: "leaf", translation: "gjethe", emoji: "🍃", missing: "L" },
      { word: "MAP", meaning: "map", translation: "hartë", emoji: "🗺️", missing: "M" },
      { word: "NET", meaning: "net", translation: "rrjetë", emoji: "🎣", missing: "N" },
      { word: "OAK", meaning: "oak", translation: "lis", emoji: "🌳", missing: "O" },
      { word: "PEN", meaning: "pen", translation: "stilolaps", emoji: "🖊️", missing: "P" },
      { word: "ROSE", meaning: "rose", translation: "trëndafil", emoji: "🌹", missing: "R" },
      { word: "STAR", meaning: "star", translation: "yll", emoji: "⭐", missing: "ST" },
      { word: "TABLE", meaning: "table", translation: "tryezë", emoji: "🪑", missing: "T" },
      { word: "VAN", meaning: "van", translation: "furgon", emoji: "🚐", missing: "V" },
      { word: "WOLF", meaning: "wolf", translation: "ujk", emoji: "🐺", missing: "W" },
      { word: "YAK", meaning: "yak", translation: "jak", emoji: "🐃", missing: "Y" },
      { word: "BEAR", meaning: "bear", translation: "ari", emoji: "🐻", missing: "B" },
      { word: "CAKE", meaning: "cake", translation: "tortë", emoji: "🎂", missing: "C" },
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
      { word: "AIRPORT", meaning: "airport", translation: "aeroport", emoji: "✈️", missing: "A" },
      { word: "BRIDGE", meaning: "bridge", translation: "urë", emoji: "🌉", missing: "BR" },
      { word: "CITY", meaning: "city", translation: "qytet", emoji: "🏙️", missing: "C" },
      { word: "DOCTOR", meaning: "doctor", translation: "mjek", emoji: "👨‍⚕️", missing: "D" },
      { word: "ENERGY", meaning: "energy", translation: "energji", emoji: "⚡", missing: "E" },
      { word: "FOREST", meaning: "forest", translation: "pyll", emoji: "🌲", missing: "F" },
      { word: "HOSPITAL", meaning: "hospital", translation: "spital", emoji: "🏥", missing: "H" },
      { word: "ISLAND", meaning: "island", translation: "ishull", emoji: "🏝️", missing: "I" },
      { word: "JOURNEY", meaning: "journey", translation: "udhëtim", emoji: "🗺️", missing: "J" },
      { word: "LANGUAGE", meaning: "language", translation: "gjuhë", emoji: "💬", missing: "L" },
      { word: "MARKET", meaning: "market", translation: "treg", emoji: "🛒", missing: "M" },
      { word: "NEIGHBOR", meaning: "neighbor", translation: "fqinj", emoji: "🏘️", missing: "N" },
      { word: "OCEAN", meaning: "ocean", translation: "oqean", emoji: "🌊", missing: "O" },
      { word: "PASSPORT", meaning: "passport", translation: "pasaportë", emoji: "📘", missing: "P" },
      { word: "QUESTION", meaning: "question", translation: "pyetje", emoji: "❓", missing: "Q" },
      { word: "ANSWER", meaning: "answer", translation: "përgjigje", emoji: "💡", missing: "A" },
      { word: "BEDROOM", meaning: "bedroom", translation: "dhomë gjumi", emoji: "🛏️", missing: "B" },
      { word: "CLOUD", meaning: "cloud", translation: "re", emoji: "☁️", missing: "C" },
      { word: "DESERT", meaning: "desert", translation: "shkretëtirë", emoji: "🏜️", missing: "D" },
      { word: "EVENING", meaning: "evening", translation: "mbrëmje", emoji: "🌆", missing: "E" },
      { word: "FEVER", meaning: "fever", translation: "temperaturë", emoji: "🤒", missing: "F" },
      { word: "GOVERNMENT", meaning: "government", translation: "qeveri", emoji: "🏛️", missing: "G" },
      { word: "HISTORY", meaning: "history", translation: "histori", emoji: "📜", missing: "H" },
      { word: "INDUSTRY", meaning: "industry", translation: "industri", emoji: "🏭", missing: "I" },
      { word: "JUNGLE", meaning: "jungle", translation: "xhungël", emoji: "🌴", missing: "J" },
      { word: "KEYBOARD", meaning: "keyboard", translation: "tastierë", emoji: "⌨️", missing: "K" },
      { word: "LUGGAGE", meaning: "luggage", translation: "bagazh", emoji: "🧳", missing: "L" },
      { word: "MIRROR", meaning: "mirror", translation: "pasqyrë", emoji: "🪞", missing: "M" },
      { word: "NOTEBOOK", meaning: "notebook", translation: "fletore", emoji: "📓", missing: "N" },
      { word: "OFFICE", meaning: "office", translation: "zyrë", emoji: "🏢", missing: "O" },
      { word: "PICNIC", meaning: "picnic", translation: "piknik", emoji: "🧺", missing: "P" },
      { word: "RAINBOW", meaning: "rainbow", translation: "ylber", emoji: "🌈", missing: "R" },
      { word: "SEASON", meaning: "season", translation: "stinë", emoji: "🍂", missing: "S" },
      { word: "TICKET", meaning: "ticket", translation: "biletë", emoji: "🎟️", missing: "T" },
      { word: "UNIVERSE", meaning: "universe", translation: "univers", emoji: "🌌", missing: "U" },
      { word: "VILLAGE", meaning: "village", translation: "fshat", emoji: "🏡", missing: "V" },
      { word: "WEATHER", meaning: "weather", translation: "mot", emoji: "🌦️", missing: "W" },
      { word: "YESTERDAY", meaning: "yesterday", translation: "dje", emoji: "📅", missing: "Y" },
      { word: "ZERO", meaning: "zero", translation: "zero", emoji: "0️⃣", missing: "Z" },
      { word: "ALPHABET", meaning: "alphabet", translation: "alfabet", emoji: "🔤", missing: "A" },
      { word: "BREAKFAST", meaning: "breakfast", translation: "mëngjes", emoji: "🍳", missing: "BR" },
      { word: "CALENDAR", meaning: "calendar", translation: "kalendar", emoji: "📅", missing: "C" },
      { word: "DINNER", meaning: "dinner", translation: "darkë", emoji: "🍽️", missing: "D" },
      { word: "ELECTION", meaning: "election", translation: "zgjedhje", emoji: "🗳️", missing: "E" },
      { word: "FOOTBALL", meaning: "football", translation: "futboll", emoji: "⚽", missing: "F" },
      { word: "GRAMMAR", meaning: "grammar", translation: "gramatikë", emoji: "📖", missing: "G" },
      { word: "HOLIDAY", meaning: "holiday", translation: "pushime", emoji: "🏖️", missing: "H" },
      { word: "INTERNET", meaning: "internet", translation: "internet", emoji: "🌐", missing: "I" },
      { word: "JACKET", meaning: "jacket", translation: "xhaketë", emoji: "🧥", missing: "J" },
      { word: "KITCHEN", meaning: "kitchen", translation: "kuzhinë", emoji: "🍳", missing: "K" },
      { word: "LEMON", meaning: "lemon", translation: "limon", emoji: "🍋", missing: "L" },
      { word: "MEDICINE", meaning: "medicine", translation: "ilaç", emoji: "💊", missing: "M" },
      { word: "NOODLE", meaning: "noodle", translation: "makarona", emoji: "🍜", missing: "N" },
      { word: "OPINION", meaning: "opinion", translation: "mendim", emoji: "💭", missing: "O" },
      { word: "PROBLEM", meaning: "problem", translation: "problem", emoji: "❗", missing: "PR" },
      { word: "RECIPE", meaning: "recipe", translation: "recetë", emoji: "📋", missing: "R" },
      { word: "SALARY", meaning: "salary", translation: "pagë", emoji: "💵", missing: "S" },
      { word: "TRAFFIC", meaning: "traffic", translation: "trafik", emoji: "🚦", missing: "TR" },
      { word: "UNIFORM", meaning: "uniform", translation: "uniformë", emoji: "👔", missing: "U" },
      { word: "VACATION", meaning: "vacation", translation: "vakancë", emoji: "🌴", missing: "V" },
      { word: "WORKOUT", meaning: "workout", translation: "stërvitje", emoji: "🏋️", missing: "W" },
      { word: "XYLOPHONE", meaning: "xylophone", translation: "ksilofon", emoji: "🎼", missing: "X" },
      { word: "YOGURT", meaning: "yogurt", translation: "kos", emoji: "🫙", missing: "Y" },
      { word: "ZIPPER", meaning: "zipper", translation: "zinxhir", emoji: "🤐", missing: "Z" },
      { word: "ADVENTURE", meaning: "adventure", translation: "aventurë", emoji: "🗺️", missing: "A" },
      { word: "BICYCLE", meaning: "bicycle", translation: "biçikletë", emoji: "🚲", missing: "B" },
      { word: "CAMERA", meaning: "camera", translation: "kamerë", emoji: "📷", missing: "C" },
      { word: "DIAMOND", meaning: "diamond", translation: "diamant", emoji: "💎", missing: "D" },
      { word: "EXCHANGE", meaning: "exchange", translation: "shkëmbim", emoji: "🔄", missing: "E" },
      { word: "FREEDOM", meaning: "freedom", translation: "liri", emoji: "🕊️", missing: "FR" },
      { word: "GALLERY", meaning: "gallery", translation: "galeri", emoji: "🖼️", missing: "G" },
      { word: "HARBOUR", meaning: "harbour", translation: "port", emoji: "⚓", missing: "H" },
      { word: "INCOME", meaning: "income", translation: "të ardhura", emoji: "💰", missing: "I" },
      { word: "JUSTICE", meaning: "justice", translation: "drejtësi", emoji: "⚖️", missing: "J" },
      { word: "KINGDOM", meaning: "kingdom", translation: "mbretëri", emoji: "👑", missing: "K" },
      { word: "LEATHER", meaning: "leather", translation: "lëkurë", emoji: "🧣", missing: "L" },
      { word: "MILLION", meaning: "million", translation: "milion", emoji: "💯", missing: "M" },
      { word: "NUCLEAR", meaning: "nuclear", translation: "bërthamor", emoji: "⚛️", missing: "N" },
      { word: "OPTICAL", meaning: "optical", translation: "optik", emoji: "👁️", missing: "O" },
      { word: "PENSION", meaning: "pension", translation: "pension", emoji: "🏦", missing: "P" },
      { word: "QUARTER", meaning: "quarter", translation: "çerek", emoji: "🕒", missing: "Q" },
      { word: "REFUGEE", meaning: "refugee", translation: "refugjat", emoji: "🏕️", missing: "R" },
      { word: "SOCIETY", meaning: "society", translation: "shoqëri", emoji: "👥", missing: "S" },
      { word: "TONIGHT", meaning: "tonight", translation: "sonte", emoji: "🌃", missing: "T" },
      { word: "UPGRADE", meaning: "upgrade", translation: "përmirësim", emoji: "⬆️", missing: "U" },
      { word: "VOLCANO", meaning: "volcano", translation: "vullkan", emoji: "🌋", missing: "V" },
      { word: "WELFARE", meaning: "welfare", translation: "mirëqenie", emoji: "🌟", missing: "W" },
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
      { word: "SUSTAINABILITY", meaning: "sustainability", translation: "qëndrueshmëri", emoji: "♻️", missing: "S" },
      { word: "GLOBALIZATION", meaning: "globalization", translation: "globalizim", emoji: "🌐", missing: "G" },
      { word: "INNOVATION", meaning: "innovation", translation: "inovacion", emoji: "💡", missing: "I" },
      { word: "DEMOCRACY", meaning: "democracy", translation: "demokraci", emoji: "🗳️", missing: "D" },
      { word: "ENVIRONMENT", meaning: "environment", translation: "mjedis", emoji: "🌱", missing: "E" },
      { word: "INFRASTRUCTURE", meaning: "infrastructure", translation: "infrastrukturë", emoji: "🏗️", missing: "I" },
      { word: "LEGISLATION", meaning: "legislation", translation: "legjislacion", emoji: "⚖️", missing: "L" },
      { word: "NEGOTIATION", meaning: "negotiation", translation: "negocim", emoji: "🤝", missing: "N" },
      { word: "PERSECUTION", meaning: "persecution", translation: "persekutim", emoji: "😔", missing: "P" },
      { word: "RECONCILIATION", meaning: "reconciliation", translation: "pajtim", emoji: "🕊️", missing: "R" },
      { word: "TRANSFORMATION", meaning: "transformation", translation: "transformim", emoji: "🦋", missing: "T" },
      { word: "UNDERSTANDING", meaning: "understanding", translation: "kuptim", emoji: "💭", missing: "U" },
      { word: "ACCELERATION", meaning: "acceleration", translation: "nxitim", emoji: "🚀", missing: "A" },
      { word: "BUREAUCRACY", meaning: "bureaucracy", translation: "burokraci", emoji: "📋", missing: "B" },
      { word: "CATASTROPHE", meaning: "catastrophe", translation: "katastrofë", emoji: "💥", missing: "C" },
      { word: "DIPLOMACY", meaning: "diplomacy", translation: "diplomaci", emoji: "🤝", missing: "D" },
      { word: "EXPLOITATION", meaning: "exploitation", translation: "shfrytëzim", emoji: "⛏️", missing: "E" },
      { word: "FUNDAMENTAL", meaning: "fundamental", translation: "themelor", emoji: "🏗️", missing: "F" },
      { word: "GENERATION", meaning: "generation", translation: "brez", emoji: "👨‍👩‍👧‍👦", missing: "G" },
      { word: "HYPOTHESIS", meaning: "hypothesis", translation: "hipotezë", emoji: "🔬", missing: "H" },
      { word: "IMMIGRATION", meaning: "immigration", translation: "emigrim", emoji: "✈️", missing: "I" },
      { word: "JURISDICTION", meaning: "jurisdiction", translation: "juridiksion", emoji: "⚖️", missing: "J" },
      { word: "LEGITIMACY", meaning: "legitimacy", translation: "legjitimitet", emoji: "✅", missing: "L" },
      { word: "MANIPULATION", meaning: "manipulation", translation: "manipulim", emoji: "🎭", missing: "M" },
      { word: "NATIONALISM", meaning: "nationalism", translation: "nacionalizëm", emoji: "🏳️", missing: "N" },
      { word: "OPPOSITION", meaning: "opposition", translation: "opozitë", emoji: "⚡", missing: "O" },
      { word: "POLARIZATION", meaning: "polarization", translation: "polarizim", emoji: "🔀", missing: "P" },
      { word: "QUALIFICATION", meaning: "qualification", translation: "kualifikim", emoji: "🎓", missing: "Q" },
      { word: "RADICALIZATION", meaning: "radicalization", translation: "radikalizim", emoji: "🔥", missing: "R" },
      { word: "SOVEREIGNTY", meaning: "sovereignty", translation: "sovranitet", emoji: "👑", missing: "S" },
      { word: "TOTALITARIANISM", meaning: "totalitarianism", translation: "totalitarizëm", emoji: "🏴", missing: "T" },
      { word: "URBANIZATION", meaning: "urbanization", translation: "urbanizim", emoji: "🏙️", missing: "U" },
      { word: "VULNERABILITY", meaning: "vulnerability", translation: "cënueshmëri", emoji: "🛡️", missing: "V" },
      { word: "WORLDVIEW", meaning: "worldview", translation: "botëkuptim", emoji: "🌍", missing: "W" },
      { word: "ACCELERATION", meaning: "acceleration", translation: "nxitim", emoji: "🚀", missing: "AC" },
      { word: "BIODIVERSITY", meaning: "biodiversity", translation: "biodiversitet", emoji: "🌿", missing: "B" },
      { word: "COLONIZATION", meaning: "colonization", translation: "kolonizim", emoji: "🗺️", missing: "C" },
      { word: "DEFORESTATION", meaning: "deforestation", translation: "shpyllëzim", emoji: "🌳", missing: "D" },
      { word: "EMPOWERMENT", meaning: "empowerment", translation: "fuqizim", emoji: "💪", missing: "E" },
      { word: "FRAGMENTATION", meaning: "fragmentation", translation: "fragmentim", emoji: "🧩", missing: "F" },
      { word: "GLOBALISM", meaning: "globalism", translation: "globalizëm", emoji: "🌐", missing: "G" },
      { word: "HUMANITARIAN", meaning: "humanitarian", translation: "humanitar", emoji: "❤️", missing: "H" },
      { word: "IMPERIALISM", meaning: "imperialism", translation: "imperializëm", emoji: "🏴", missing: "I" },
      { word: "JURISPRUDENCE", meaning: "jurisprudence", translation: "jurisprudencë", emoji: "📜", missing: "J" },
      { word: "KLEPTOCRACY", meaning: "kleptocracy", translation: "klepto-qeveri", emoji: "🦹", missing: "K" },
      { word: "LIBERALISM", meaning: "liberalism", translation: "liberalizëm", emoji: "🕊️", missing: "L" },
      { word: "MERITOCRACY", meaning: "meritocracy", translation: "meritokraci", emoji: "🏆", missing: "M" },
      { word: "NEOLIBERALISM", meaning: "neoliberalism", translation: "neoliberalizëm", emoji: "📊", missing: "N" },
      { word: "OLIGARCHY", meaning: "oligarchy", translation: "oligarki", emoji: "💰", missing: "O" },
      { word: "PROPAGANDA", meaning: "propaganda", translation: "propagandë", emoji: "📢", missing: "P" },
      { word: "RELATIVISM", meaning: "relativism", translation: "relativizëm", emoji: "🔄", missing: "R" },
      { word: "SECULARISM", meaning: "secularism", translation: "laicizëm", emoji: "🏛️", missing: "S" },
      { word: "THEOCRACY", meaning: "theocracy", translation: "teokraci", emoji: "☪️", missing: "T" },
      { word: "UTILITARIANISM", meaning: "utilitarianism", translation: "utilitarizëm", emoji: "⚖️", missing: "U" },
      { word: "VOLUNTEERISM", meaning: "volunteerism", translation: "vullnetarizëm", emoji: "🙋", missing: "V" },
      { word: "XENOPHOBIA", meaning: "xenophobia", translation: "ksenofobi", emoji: "😨", missing: "X" },
      { word: "YOUTHFULNESS", meaning: "youthfulness", translation: "rini", emoji: "👶", missing: "Y" },
      { word: "ZEALOUSNESS", meaning: "zealousness", translation: "zell", emoji: "🔥", missing: "Z" },
      { word: "ABSTRACTION", meaning: "abstraction", translation: "abstraksion", emoji: "🎨", missing: "A" },
      { word: "BUREAUCRAT", meaning: "bureaucrat", translation: "burokrat", emoji: "👔", missing: "B" },
      { word: "CONSCRIPTION", meaning: "conscription", translation: "shërbim ushtarak", emoji: "🪖", missing: "C" },
      { word: "DEMAGOGY", meaning: "demagogy", translation: "demagogji", emoji: "📢", missing: "D" },
      { word: "EMANCIPATION", meaning: "emancipation", translation: "emancipim", emoji: "🕊️", missing: "E" },
      { word: "FEDERALISM", meaning: "federalism", translation: "federalizëm", emoji: "🏛️", missing: "F" },
      { word: "GEOSTRATEGY", meaning: "geostrategy", translation: "gjeostratgji", emoji: "🗺️", missing: "G" },
      { word: "HEGEMONY", meaning: "hegemony", translation: "hegjemoni", emoji: "👑", missing: "H" },
      { word: "IDEOLOGY", meaning: "ideology", translation: "ideologji", emoji: "💡", missing: "I" },
      { word: "JUDICIARY", meaning: "judiciary", translation: "gjyqësor", emoji: "⚖️", missing: "J" },
      { word: "KINSHIP", meaning: "kinship", translation: "farefisnì", emoji: "👨‍👩‍👧", missing: "K" },
      { word: "LAISSEZ-FAIRE", meaning: "laissez-faire", translation: "lëre të shkojë", emoji: "🤲", missing: "L" },
      { word: "MULTICULTURALISM", meaning: "multiculturalism", translation: "multikulturalizëm", emoji: "🌍", missing: "M" },
      { word: "NORMALIZATION", meaning: "normalization", translation: "normalizim", emoji: "✅", missing: "N" },
      { word: "OPPRESSION", meaning: "oppression", translation: "shtypje", emoji: "😤", missing: "O" },
      { word: "PARADIGM", meaning: "paradigm", translation: "paradigmë", emoji: "🔭", missing: "P" },
      { word: "RACISM", meaning: "racism", translation: "racizëm", emoji: "✊", missing: "R" },
      { word: "SEPARATISM", meaning: "separatism", translation: "separatizëm", emoji: "✂️", missing: "S" },
      { word: "TECHNOCRACY", meaning: "technocracy", translation: "teknokraci", emoji: "⚙️", missing: "T" },
      { word: "UNILATERALISM", meaning: "unilateralism", translation: "unilateralizëm", emoji: "1️⃣", missing: "U" },
      { word: "VIGILANCE", meaning: "vigilance", translation: "vigjilencë", emoji: "👀", missing: "V" },
      { word: "WHISTLEBLOWER", meaning: "whistleblower", translation: "sinjalizues", emoji: "📣", missing: "W" },
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
      { word: "ANTHROPOLOGY", meaning: "anthropology", translation: "antropologji", emoji: "🦴", missing: "A" },
      { word: "BIOTECHNOLOGY", meaning: "biotechnology", translation: "bioteknologji", emoji: "🧬", missing: "B" },
      { word: "CONSTITUTIONALISM", meaning: "constitutionalism", translation: "kushtetutshmëri", emoji: "📜", missing: "C" },
      { word: "DECENTRALIZATION", meaning: "decentralization", translation: "decentralizim", emoji: "🔀", missing: "D" },
      { word: "ENLIGHTENMENT", meaning: "enlightenment", translation: "iluminizëm", emoji: "💡", missing: "E" },
      { word: "FUNDAMENTALISM", meaning: "fundamentalism", translation: "fundamentalizëm", emoji: "🏛️", missing: "F" },
      { word: "GEOPOLITICS", meaning: "geopolitics", translation: "gjeopolitikë", emoji: "🗺️", missing: "G" },
      { word: "HISTORIOGRAPHY", meaning: "historiography", translation: "historiografi", emoji: "📚", missing: "H" },
      { word: "INSTRUMENTALISM", meaning: "instrumentalism", translation: "instrumentalizëm", emoji: "🎷", missing: "I" },
      { word: "JURISTIC", meaning: "juristic", translation: "juridik", emoji: "⚖️", missing: "J" },
      { word: "KAIROTICS", meaning: "kairotics", translation: "shkencë e kohës", emoji: "⏰", missing: "K" },
      { word: "LIBERTARIANISM", meaning: "libertarianism", translation: "libertarianizëm", emoji: "🗽", missing: "L" },
      { word: "MARXISM", meaning: "marxism", translation: "marksizëm", emoji: "📕", missing: "M" },
      { word: "NIHILISM", meaning: "nihilism", translation: "nihilizëm", emoji: "∅", missing: "N" },
      { word: "ONTOLOGY", meaning: "ontology", translation: "ontologji", emoji: "♾️", missing: "O" },
      { word: "PHENOMENOLOGY", meaning: "phenomenology", translation: "fenomenologji", emoji: "🔍", missing: "PH" },
      { word: "QUALIA", meaning: "qualia", translation: "qualia (ndjesitë subjektive)", emoji: "🧠", missing: "Q" },
      { word: "RATIONALISM", meaning: "rationalism", translation: "racionalizëm", emoji: "🔬", missing: "R" },
      { word: "SCHOLASTICISM", meaning: "scholasticism", translation: "sholasticizëm", emoji: "📖", missing: "S" },
      { word: "TELEOLOGY", meaning: "teleology", translation: "teleologji", emoji: "🎯", missing: "T" },
      { word: "UNIVERSALISM", meaning: "universalism", translation: "universalizëm", emoji: "🌍", missing: "U" },
      { word: "VITALISM", meaning: "vitalism", translation: "vitalizëm", emoji: "🌱", missing: "V" },
      { word: "WELTANSCHAUUNG", meaning: "weltanschauung", translation: "botëkuptim gjermanisht", emoji: "🌐", missing: "W" },
      { word: "AXIOLOGY", meaning: "axiology", translation: "aksiologji", emoji: "💎", missing: "A" },
      { word: "BIOETHICS", meaning: "bioethics", translation: "bioeticë", emoji: "🧬", missing: "B" },
      { word: "COGNITIVISM", meaning: "cognitivism", translation: "kognitivizëm", emoji: "🧠", missing: "C" },
      { word: "DETERMINISM", meaning: "determinism", translation: "determinizëm", emoji: "⛓️", missing: "D" },
      { word: "EMPIRICISM", meaning: "empiricism", translation: "empirizëm", emoji: "🔬", missing: "E" },
      { word: "FORMALISM", meaning: "formalism", translation: "formalizëm", emoji: "📐", missing: "F" },
      { word: "GNOSEOLOGY", meaning: "gnoseology", translation: "gnoseologji", emoji: "🧩", missing: "G" },
      { word: "HEURISTICS", meaning: "heuristics", translation: "heuristikë", emoji: "💡", missing: "H" },
      { word: "IDEALISM", meaning: "idealism", translation: "idealizëm", emoji: "✨", missing: "I" },
      { word: "JUSPOSITIVISM", meaning: "juspositivism", translation: "pozitivizëm juridik", emoji: "📜", missing: "J" },
      { word: "KANTIANISM", meaning: "kantianism", translation: "kantianizëm", emoji: "📚", missing: "K" },
      { word: "LOGOCENTRISM", meaning: "logocentrism", translation: "logocentrizëm", emoji: "📝", missing: "L" },
      { word: "MATERIALISM", meaning: "materialism", translation: "materializëm", emoji: "⚙️", missing: "M" },
      { word: "NATURALISM", meaning: "naturalism", translation: "naturalizëm", emoji: "🌿", missing: "N" },
      { word: "OBJECTIVISM", meaning: "objectivism", translation: "objektivizëm", emoji: "🎯", missing: "O" },
      { word: "PRAGMATISM", meaning: "pragmatism", translation: "pragmatizëm", emoji: "🔧", missing: "P" },
      { word: "REDUCTIONISM", meaning: "reductionism", translation: "reduksionizëm", emoji: "🔽", missing: "R" },
      { word: "STOICISM", meaning: "stoicism", translation: "stoicizëm", emoji: "🏛️", missing: "S" },
      { word: "TRANSHUMANISM", meaning: "transhumanism", translation: "transhumanizëm", emoji: "🤖", missing: "T" },
      { word: "UTILITARIANISM", meaning: "utilitarianism", translation: "utilitarizëm", emoji: "⚖️", missing: "U" },
      { word: "VOLUNTARISM", meaning: "voluntarism", translation: "vullnetarizëm", emoji: "💪", missing: "V" },
      { word: "WITTGENSTEINIAN", meaning: "wittgensteinian", translation: "wittgensteiniane", emoji: "🔤", missing: "W" },
      { word: "XENOCENTRISM", meaning: "xenocentrism", translation: "xenocentrizëm", emoji: "🌍", missing: "X" },
      { word: "ZIONISM", meaning: "zionism", translation: "sionizëm", emoji: "✡️", missing: "Z" },
      { word: "AGNOSTICISM", meaning: "agnosticism", translation: "agnosticizëm", emoji: "❓", missing: "A" },
      { word: "BEHAVIOURISM", meaning: "behaviourism", translation: "behaviorizëm", emoji: "🐀", missing: "B" },
      { word: "COMPATIBILISM", meaning: "compatibilism", translation: "kompatibilizëm", emoji: "🔗", missing: "C" },
      { word: "DUALISM", meaning: "dualism", translation: "dualizëm", emoji: "☯️", missing: "D" },
      { word: "EGOISM", meaning: "egoism", translation: "egoizëm", emoji: "😤", missing: "E" },
      { word: "FATALISM", meaning: "fatalism", translation: "fatalizëm", emoji: "🌠", missing: "F" },
      { word: "GNOSTICISM", meaning: "gnosticism", translation: "gnosticizëm", emoji: "👁️", missing: "G" },
      { word: "HUMANISM", meaning: "humanism", translation: "humanizëm", emoji: "🤝", missing: "H" },
      { word: "INTUITIONISM", meaning: "intuitionism", translation: "intuicionizëm", emoji: "💫", missing: "I" },
      { word: "JINGOISM", meaning: "jingoism", translation: "shovinizëm", emoji: "🏳️", missing: "J" },
      { word: "KINETICALISM", meaning: "kineticalism", translation: "kinetikalizëm", emoji: "🔄", missing: "K" },
      { word: "LOGICISM", meaning: "logicism", translation: "logicizëm", emoji: "∞", missing: "L" },
      { word: "MONISM", meaning: "monism", translation: "monizëm", emoji: "1️⃣", missing: "M" },
      { word: "NEOPLATONISM", meaning: "neoplatonism", translation: "neoplatonizëm", emoji: "🏛️", missing: "N" },
      { word: "OCCASIONALISM", meaning: "occasionalism", translation: "okasionalizëm", emoji: "🎲", missing: "O" },
      { word: "PANENTHEISM", meaning: "panentheism", translation: "panenteizëm", emoji: "🌌", missing: "P" },
      { word: "QUIETISM", meaning: "quietism", translation: "kietizëm", emoji: "🕊️", missing: "Q" },
      { word: "REALISM", meaning: "realism", translation: "realizëm", emoji: "🌍", missing: "R" },
      { word: "SOPHISM", meaning: "sophism", translation: "sofizëm", emoji: "🎭", missing: "S" },
      { word: "THEISM", meaning: "theism", translation: "teizëm", emoji: "✨", missing: "T" },
      { word: "UTOPIANISM", meaning: "utopianism", translation: "utopizëm", emoji: "🌈", missing: "U" },
      { word: "VERIFICATIONISM", meaning: "verificationism", translation: "verifikacionizëm", emoji: "✅", missing: "V" },
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
      { word: "كَلْب", meaning: "كلب", translation: "qen / dog", emoji: "🐶", missing: "ك", transliteration: "kalb" },
      { word: "قِطَّة", meaning: "قطة", translation: "mace / cat", emoji: "🐱", missing: "ق", transliteration: "qiṭṭa" },
      { word: "طَيْر", meaning: "طير", translation: "zog / bird", emoji: "🐦", missing: "ط", transliteration: "ṭayr" },
      { word: "بَيْضَة", meaning: "بيضة", translation: "vezë / egg", emoji: "🥚", missing: "ب", transliteration: "bayḍa" },
      { word: "خُبْز", meaning: "خبز", translation: "bukë / bread", emoji: "🍞", missing: "خ", transliteration: "khubz" },
      { word: "أُمّ", meaning: "أم", translation: "nënë / mother", emoji: "👩‍👧", missing: "أ", transliteration: "umm" },
      { word: "أَب", meaning: "أب", translation: "baba / father", emoji: "👨", missing: "أ", transliteration: "ab" },
      { word: "وَلَد", meaning: "ولد", translation: "djalë / boy", emoji: "👦", missing: "و", transliteration: "walad" },
      { word: "بِنْت", meaning: "بنت", translation: "vajzë / girl", emoji: "👧", missing: "ب", transliteration: "bint" },
      { word: "رَأْس", meaning: "رأس", translation: "kokë / head", emoji: "🗣️", missing: "ر", transliteration: "ra's" },
      { word: "قَدَم", meaning: "قدم", translation: "këmbë / foot", emoji: "🦶", missing: "ق", transliteration: "qadam" },
      { word: "أَنْف", meaning: "أنف", translation: "hundë / nose", emoji: "👃", missing: "أ", transliteration: "anf" },
      { word: "فَم", meaning: "فم", translation: "gojë / mouth", emoji: "👄", missing: "ف", transliteration: "fam" },
      { word: "أُذُن", meaning: "أذن", translation: "vesh / ear", emoji: "👂", missing: "أ", transliteration: "udhun" },
      { word: "شَجَرَة", meaning: "شجرة", translation: "pemë / tree", emoji: "🌳", missing: "ش", transliteration: "shajara" },
      { word: "زَهْرَة", meaning: "زهرة", translation: "lule / flower", emoji: "🌸", missing: "ز", transliteration: "zahra" },
      { word: "تُرَاب", meaning: "تراب", translation: "dhe / soil/dust", emoji: "🌍", missing: "ت", transliteration: "turāb" },
      { word: "نَار", meaning: "نار", translation: "zjarr / fire", emoji: "🔥", missing: "ن", transliteration: "nār" },
      { word: "جَبَل", meaning: "جبل", translation: "mal / mountain", emoji: "⛰️", missing: "ج", transliteration: "jabal" },
      { word: "بَحْر", meaning: "بحر", translation: "det / sea", emoji: "🌊", missing: "ب", transliteration: "baḥr" },
      { word: "طَعَام", meaning: "طعام", translation: "ushqim / food", emoji: "🍽️", missing: "ط", transliteration: "ṭa'ām" },
      { word: "قَلَم", meaning: "قلم", translation: "laps / pen", emoji: "✏️", missing: "ق", transliteration: "qalam" },
      { word: "بَاب", meaning: "باب", translation: "derë / door", emoji: "🚪", missing: "ب", transliteration: "bāb" },
      { word: "نَافِذَة", meaning: "نافذة", translation: "dritare / window", emoji: "🪟", missing: "ن", transliteration: "nāfidha" },
      { word: "سَرِير", meaning: "سرير", translation: "krevat / bed", emoji: "🛏️", missing: "س", transliteration: "sarīr" },
      { word: "كُرْسِي", meaning: "كرسي", translation: "karrige / chair", emoji: "🪑", missing: "ك", transliteration: "kursī" },
      { word: "طَاوِلَة", meaning: "طاولة", translation: "tryezë / table", emoji: "🪞", missing: "ط", transliteration: "ṭāwila" },
      { word: "مِفْتَاح", meaning: "مفتاح", translation: "çelës / key", emoji: "🗝️", missing: "م", transliteration: "miftāḥ" },
      { word: "سَمَاء", meaning: "سماء", translation: "qiell / sky", emoji: "🌤️", missing: "س", transliteration: "samā'" },
      { word: "أَرْض", meaning: "أرض", translation: "tokë / earth/ground", emoji: "🌍", missing: "أ", transliteration: "arḍ" },
      { word: "رِيح", meaning: "ريح", translation: "erë / wind", emoji: "💨", missing: "ر", transliteration: "rīḥ" },
      { word: "مَطَر", meaning: "مطر", translation: "shi / rain", emoji: "🌧️", missing: "م", transliteration: "maṭar" },
      { word: "ثَلْج", meaning: "ثلج", translation: "borë / snow", emoji: "❄️", missing: "ث", transliteration: "thalj" },
      { word: "لَيْل", meaning: "ليل", translation: "natë / night", emoji: "🌃", missing: "ل", transliteration: "layl" },
      { word: "نَهَار", meaning: "نهار", translation: "ditë / day", emoji: "🌤️", missing: "ن", transliteration: "nahār" },
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
      { word: "سَيَّارَة", meaning: "سيارة", translation: "makinë / car", emoji: "🚗", missing: "س", transliteration: "sayyāra" },
      { word: "طَعَام", meaning: "طعام", translation: "ushqim / food", emoji: "🍽️", missing: "ط", transliteration: "ṭa'ām" },
      { word: "كُرْسِي", meaning: "كرسي", translation: "karrige / chair", emoji: "🪑", missing: "ك", transliteration: "kursī" },
      { word: "بَابٌ", meaning: "باب", translation: "derë / door", emoji: "🚪", missing: "ب", transliteration: "bāb" },
      { word: "شَارِع", meaning: "شارع", translation: "rrugë / street", emoji: "🛣️", missing: "ش", transliteration: "shāri'" },
      { word: "مَطَار", meaning: "مطار", translation: "aeroport / airport", emoji: "✈️", missing: "م", transliteration: "maṭār" },
      { word: "طَبِيب", meaning: "طبيب", translation: "mjek / doctor", emoji: "👨‍⚕️", missing: "ط", transliteration: "ṭabīb" },
      { word: "مُسْتَشْفَى", meaning: "مستشفى", translation: "spital / hospital", emoji: "🏥", missing: "م", transliteration: "mustashfā" },
      { word: "سُوق", meaning: "سوق", translation: "treg / market", emoji: "🛒", missing: "س", transliteration: "sūq" },
      { word: "لُغَة", meaning: "لغة", translation: "gjuhë / language", emoji: "💬", missing: "ل", transliteration: "lugha" },
      { word: "مَدِينَة", meaning: "مدينة", translation: "qytet / city", emoji: "🏙️", missing: "م", transliteration: "madīna" },
      { word: "نَهْر", meaning: "نهر", translation: "lumë / river", emoji: "🏞️", missing: "ن", transliteration: "nahr" },
      { word: "جَبَل", meaning: "جبل", translation: "mal / mountain", emoji: "⛰️", missing: "ج", transliteration: "jabal" },
      { word: "صَحْرَاء", meaning: "صحراء", translation: "shkretëtirë / desert", emoji: "🏜️", missing: "ص", transliteration: "ṣaḥrā'" },
      { word: "غَابَة", meaning: "غابة", translation: "pyll / forest", emoji: "🌲", missing: "غ", transliteration: "ghāba" },
      { word: "بُحَيْرَة", meaning: "بحيرة", translation: "liqen / lake", emoji: "🏞️", missing: "ب", transliteration: "buḥayra" },
      { word: "جَزِيرَة", meaning: "جزيرة", translation: "ishull / island", emoji: "🏝️", missing: "ج", transliteration: "jazīra" },
      { word: "قَرْيَة", meaning: "قرية", translation: "fshat / village", emoji: "🏡", missing: "ق", transliteration: "qarya" },
      { word: "مَزْرَعَة", meaning: "مزرعة", translation: "fermë / farm", emoji: "🚜", missing: "م", transliteration: "mazra'a" },
      { word: "مَكْتَبَة", meaning: "مكتبة", translation: "bibliotekë / library", emoji: "📚", missing: "م", transliteration: "maktaba" },
      { word: "حَاسُوب", meaning: "حاسوب", translation: "kompjuter / computer", emoji: "💻", missing: "ح", transliteration: "ḥāsūb" },
      { word: "هَاتِف", meaning: "هاتف", translation: "telefon / phone", emoji: "📱", missing: "ه", transliteration: "hātif" },
      { word: "بَرِيد", meaning: "بريد", translation: "postë / mail", emoji: "📬", missing: "ب", transliteration: "barīd" },
      { word: "مَطْبَخ", meaning: "مطبخ", translation: "kuzhinë / kitchen", emoji: "🍳", missing: "م", transliteration: "maṭbakh" },
      { word: "حَمَّام", meaning: "حمام", translation: "banjë / bathroom", emoji: "🛁", missing: "ح", transliteration: "ḥammām" },
      { word: "غُرْفَة", meaning: "غرفة", translation: "dhomë / room", emoji: "🚪", missing: "غ", transliteration: "ghurfa" },
      { word: "مَلْعَب", meaning: "ملعب", translation: "fushë loje / playground", emoji: "⚽", missing: "م", transliteration: "mal'ab" },
      { word: "مَكْتَب", meaning: "مكتب", translation: "zyrë / office", emoji: "🏢", missing: "م", transliteration: "maktab" },
      { word: "مَحَطَّة", meaning: "محطة", translation: "stacion / station", emoji: "🚉", missing: "م", transliteration: "maḥaṭṭa" },
      { word: "جِسْر", meaning: "جسر", translation: "urë / bridge", emoji: "🌉", missing: "ج", transliteration: "jisr" },
      { word: "فُنْدُق", meaning: "فندق", translation: "hotel", emoji: "🏨", missing: "ف", transliteration: "funduq" },
      { word: "مَطْعَم", meaning: "مطعم", translation: "restorant / restaurant", emoji: "🍴", missing: "م", transliteration: "maṭ'am" },
      { word: "بَنْك", meaning: "بنك", translation: "bankë / bank", emoji: "🏦", missing: "ب", transliteration: "bank" },
      { word: "صَيْدَلِيَّة", meaning: "صيدلية", translation: "farmaci / pharmacy", emoji: "💊", missing: "ص", transliteration: "ṣaydaliyya" },
      { word: "سُوبَرْمَارْكِت", meaning: "سوبرماركت", translation: "supermarket", emoji: "🛒", missing: "س", transliteration: "sūbarmārkit" },
      { word: "مَلَابِس", meaning: "ملابس", translation: "rroba / clothes", emoji: "👗", missing: "م", transliteration: "malābis" },
      { word: "حِذَاء", meaning: "حذاء", translation: "këpucë / shoe", emoji: "👟", missing: "ح", transliteration: "ḥidhā'" },
      { word: "قَمِيص", meaning: "قميص", translation: "këmishë / shirt", emoji: "👕", missing: "ق", transliteration: "qamīṣ" },
      { word: "سَاعَة", meaning: "ساعة", translation: "orë / hour/watch", emoji: "⌚", missing: "س", transliteration: "sā'a" },
      { word: "نَقُود", meaning: "نقود", translation: "para / money", emoji: "💵", missing: "ن", transliteration: "nuqūd" },
      { word: "تَذْكِرَة", meaning: "تذكرة", translation: "biletë / ticket", emoji: "🎟️", missing: "ت", transliteration: "tadhkira" },
    ],
    avancuar: [
      { word: "مَسْؤُولِيَّة", meaning: "مسؤولية", translation: "përgjegjësi / responsibility", emoji: "⚖️", missing: "م", transliteration: "mas'ūliyya" },
      { word: "اِجْتِهَاد", meaning: "اجتهاد", translation: "përpjekje / ijtihad", emoji: "💪", missing: "ا", transliteration: "ijtihād" },
      { word: "حَضَارَة", meaning: "حضارة", translation: "qytetërim / civilization", emoji: "🏛️", missing: "ح", transliteration: "ḥaḍāra" },
      { word: "تَعَاوُن", meaning: "تعاون", translation: "bashkëpunim / cooperation", emoji: "🤝", missing: "ت", transliteration: "ta'āwun" },
      { word: "عِلْم", meaning: "علم", translation: "dituri / knowledge", emoji: "🧠", missing: "ع", transliteration: "'ilm" },
      { word: "فِقْه", meaning: "فقه", translation: "jurisprudencë islame", emoji: "📜", missing: "ف", transliteration: "fiqh" },
      { word: "تَوْحِيد", meaning: "توحيد", translation: "monoteizëm / tawheed", emoji: "☝️", missing: "ت", transliteration: "tawḥīd" },
      { word: "أَخْلَاق", meaning: "أخلاق", translation: "moral / ethics", emoji: "⭐", missing: "أ", transliteration: "akhlāq" },
      { word: "حُكُومَة", meaning: "حكومة", translation: "qeveri / government", emoji: "🏛️", missing: "ح", transliteration: "ḥukūma" },
      { word: "مُجْتَمَع", meaning: "مجتمع", translation: "shoqëri / society", emoji: "👥", missing: "م", transliteration: "mujtama'" },
      { word: "اِقْتِصَاد", meaning: "اقتصاد", translation: "ekonomi / economy", emoji: "💰", missing: "ا", transliteration: "iqtiṣād" },
      { word: "سِيَاسَة", meaning: "سياسة", translation: "politikë / politics", emoji: "🗳️", missing: "س", transliteration: "siyāsa" },
      { word: "ثَقَافَة", meaning: "ثقافة", translation: "kulturë / culture", emoji: "🎭", missing: "ث", transliteration: "thaqāfa" },
      { word: "إِبْدَاع", meaning: "إبداع", translation: "kreativitet / creativity", emoji: "🎨", missing: "إ", transliteration: "ibdā'" },
      { word: "اِسْتِقْلَال", meaning: "استقلال", translation: "pavarësi / independence", emoji: "🗽", missing: "ا", transliteration: "istiqlāl" },
      { word: "تَطَوُّر", meaning: "تطور", translation: "zhvillim / development", emoji: "📈", missing: "ت", transliteration: "taṭawwur" },
      { word: "دِيمُقْرَاطِيَّة", meaning: "ديمقراطية", translation: "demokraci / democracy", emoji: "🗳️", missing: "د", transliteration: "dīmuqrāṭiyya" },
      { word: "قَانُون", meaning: "قانون", translation: "ligj / law", emoji: "⚖️", missing: "ق", transliteration: "qānūn" },
      { word: "عَدَالَة", meaning: "عدالة", translation: "drejtësi / justice", emoji: "⚖️", missing: "ع", transliteration: "'adāla" },
      { word: "حُرِّيَّة", meaning: "حرية", translation: "liri / freedom", emoji: "🕊️", missing: "ح", transliteration: "ḥurriyya" },
      { word: "أَمَان", meaning: "أمان", translation: "siguri / security", emoji: "🔒", missing: "أ", transliteration: "amān" },
      { word: "تَنْمِيَة", meaning: "تنمية", translation: "zhvillim njerëzor / development", emoji: "🌱", missing: "ت", transliteration: "tanmiya" },
      { word: "بِيئَة", meaning: "بيئة", translation: "mjedis / environment", emoji: "🌿", missing: "ب", transliteration: "bī'a" },
      { word: "تَعْلِيم", meaning: "تعليم", translation: "arsim / education", emoji: "🏫", missing: "ت", transliteration: "ta'līm" },
      { word: "صِحَّة", meaning: "صحة", translation: "shëndet / health", emoji: "💚", missing: "ص", transliteration: "ṣiḥḥa" },
      { word: "فَقْر", meaning: "فقر", translation: "varfëri / poverty", emoji: "😔", missing: "ف", transliteration: "faqr" },
      { word: "غِنَى", meaning: "غنى", translation: "pasuri / wealth", emoji: "💰", missing: "غ", transliteration: "ghinā" },
      { word: "سُلْطَة", meaning: "سلطة", translation: "pushtet / authority", emoji: "👑", missing: "س", transliteration: "sulṭa" },
      { word: "مُعَارَضَة", meaning: "معارضة", translation: "opozitë / opposition", emoji: "⚡", missing: "م", transliteration: "mu'āraḍa" },
      { word: "اِنْتِخَابَات", meaning: "انتخابات", translation: "zgjedhje / elections", emoji: "🗳️", missing: "ا", transliteration: "intikhābāt" },
      { word: "وَطَن", meaning: "وطن", translation: "atdhe / homeland", emoji: "🏡", missing: "و", transliteration: "waṭan" },
      { word: "شَعْب", meaning: "شعب", translation: "popull / people/nation", emoji: "👥", missing: "ش", transliteration: "sha'b" },
      { word: "لَغَة", meaning: "لغة", translation: "gjuhë / language", emoji: "💬", missing: "ل", transliteration: "lugha" },
      { word: "تَارِيخ", meaning: "تاريخ", translation: "histori / history", emoji: "📜", missing: "ت", transliteration: "tārīkh" },
      { word: "جُغْرَافِيَا", meaning: "جغرافيا", translation: "gjeografi / geography", emoji: "🗺️", missing: "ج", transliteration: "jughrāfiyā" },
      { word: "فَلَك", meaning: "فلك", translation: "astronomi / astronomy", emoji: "🌠", missing: "ف", transliteration: "falak" },
      { word: "كِيمِيَاء", meaning: "كيمياء", translation: "kimi / chemistry", emoji: "🧪", missing: "ك", transliteration: "kīmiyā'" },
      { word: "فِيزِيَاء", meaning: "فيزياء", translation: "fizikë / physics", emoji: "⚛️", missing: "ف", transliteration: "fīziyā'" },
      { word: "رِيَاضِيَّات", meaning: "رياضيات", translation: "matematikë / mathematics", emoji: "🔢", missing: "ر", transliteration: "riyāḍiyyāt" },
      { word: "طِب", meaning: "طب", translation: "mjekësi / medicine", emoji: "⚕️", missing: "ط", transliteration: "ṭibb" },
      { word: "هَنْدَسَة", meaning: "هندسة", translation: "inxhinieri / engineering", emoji: "⚙️", missing: "ه", transliteration: "handasa" },
      { word: "زِرَاعَة", meaning: "زراعة", translation: "bujqësi / agriculture", emoji: "🌾", missing: "ز", transliteration: "zirā'a" },
      { word: "صِنَاعَة", meaning: "صناعة", translation: "industri / industry", emoji: "🏭", missing: "ص", transliteration: "ṣinā'a" },
      { word: "تِجَارَة", meaning: "تجارة", translation: "tregti / commerce", emoji: "🤝", missing: "ت", transliteration: "tijāra" },
      { word: "اِسْتِثْمَار", meaning: "استثمار", translation: "investim / investment", emoji: "📊", missing: "ا", transliteration: "istithmār" },
      { word: "بَنْك", meaning: "بنك", translation: "bankë / bank", emoji: "🏦", missing: "ب", transliteration: "bank" },
      { word: "تَضَخُّم", meaning: "تضخم", translation: "inflacion / inflation", emoji: "📈", missing: "ت", transliteration: "taḍakhkhum" },
      { word: "بِطَالَة", meaning: "بطالة", translation: "papunësi / unemployment", emoji: "😔", missing: "ب", transliteration: "biṭāla" },
      { word: "ضَرِيبَة", meaning: "ضريبة", translation: "taksë / tax", emoji: "💵", missing: "ض", transliteration: "ḍarība" },
      { word: "مُوَاطِن", meaning: "مواطن", translation: "qytetar / citizen", emoji: "🪪", missing: "م", transliteration: "muwāṭin" },
      { word: "هِجْرَة", meaning: "هجرة", translation: "migrim / migration", emoji: "✈️", missing: "ه", transliteration: "hijra" },
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
      { word: "اِبْسِتِيمُولُوجِيَا", meaning: "ابستيمولوجيا", translation: "epistemologji", emoji: "🧩", missing: "ا", transliteration: "ibistīmūlūjiyā" },
      { word: "أُنْطُولُوجِيَا", meaning: "أنطولوجيا", translation: "ontologji / ontology", emoji: "♾️", missing: "أ", transliteration: "unṭūlūjiyā" },
      { word: "هِيرْمِينُوطِيقَا", meaning: "هيرمينوطيقا", translation: "hermeneutikë", emoji: "📖", missing: "ه", transliteration: "hīrmīnūṭīqā" },
      { word: "أَنْثْرُوبُولُوجِيَا", meaning: "أنثروبولوجيا", translation: "antropologji", emoji: "🦴", missing: "أ", transliteration: "anthrūbūlūjiyā" },
      { word: "مَابَعْدَ الطَّبِيعَة", meaning: "ما بعد الطبيعة", translation: "metafizikë / metaphysics", emoji: "🌌", missing: "م", transliteration: "mā ba'd al-ṭabī'a" },
      { word: "عِلْمُ الْكَلَام", meaning: "علم الكلام", translation: "teologji islame", emoji: "📿", missing: "ع", transliteration: "'ilm al-kalām" },
      { word: "اِبْنُ خَلْدُون", meaning: "ابن خلدون", translation: "Ibn Khaldun (historiani)", emoji: "📚", missing: "ا", transliteration: "ibn khaldūn" },
      { word: "مَقَاصِدُ الشَّرِيعَة", meaning: "مقاصد الشريعة", translation: "qëllimet e sheriatit", emoji: "⚖️", missing: "م", transliteration: "maqāṣid al-sharī'a" },
      { word: "أُصُولُ الْفِقْه", meaning: "أصول الفقه", translation: "bazat e jurisprudencës", emoji: "📜", missing: "أ", transliteration: "uṣūl al-fiqh" },
      { word: "عِلْمُ الْحَدِيث", meaning: "علم الحديث", translation: "shkenca e hadithit", emoji: "📖", missing: "ع", transliteration: "'ilm al-ḥadīth" },
      { word: "تَجْدِيد", meaning: "تجديد", translation: "rinovim / renewal", emoji: "🔄", missing: "ت", transliteration: "tajdīd" },
      { word: "إِصْلَاح", meaning: "إصلاح", translation: "reformë / reform", emoji: "🔧", missing: "إ", transliteration: "iṣlāḥ" },
      { word: "اِعْتِدَال", meaning: "اعتدال", translation: "moderim / moderation", emoji: "⚖️", missing: "ا", transliteration: "i'tidāl" },
      { word: "مُقَارَنَة", meaning: "مقارنة", translation: "krahasim / comparison", emoji: "🔍", missing: "م", transliteration: "muqārana" },
      { word: "اِسْتِشْهَاد", meaning: "استشهاد", translation: "dëshmi / citation", emoji: "📋", missing: "ا", transliteration: "istishhād" },
      { word: "تَدَبُّر", meaning: "تدبر", translation: "meditim / contemplation", emoji: "🤔", missing: "ت", transliteration: "tadabbur" },
      { word: "نَقْد", meaning: "نقد", translation: "kritikë / critique", emoji: "📝", missing: "ن", transliteration: "naqd" },
      { word: "تَحْلِيل", meaning: "تحليل", translation: "analizë / analysis", emoji: "🔬", missing: "ت", transliteration: "taḥlīl" },
      { word: "تَرْكِيب", meaning: "تركيب", translation: "sintezë / synthesis", emoji: "🧩", missing: "ت", transliteration: "tarkīb" },
      { word: "اِسْتِنْتَاج", meaning: "استنتاج", translation: "konkluzion / conclusion", emoji: "✅", missing: "ا", transliteration: "istintāj" },
      { word: "مَنْطِق", meaning: "منطق", translation: "logjikë / logic", emoji: "🔗", missing: "م", transliteration: "manṭiq" },
      { word: "بَلَاغَة", meaning: "بلاغة", translation: "retorikë / rhetoric", emoji: "🗣️", missing: "ب", transliteration: "balāgha" },
      { word: "نَحْو", meaning: "نحو", translation: "gramatikë / grammar", emoji: "📖", missing: "ن", transliteration: "naḥw" },
      { word: "صَرْف", meaning: "صرف", translation: "morfologji / morphology", emoji: "📝", missing: "ص", transliteration: "ṣarf" },
      { word: "عَرُوض", meaning: "عروض", translation: "metrikë / prosody", emoji: "🎶", missing: "ع", transliteration: "'arūḍ" },
      { word: "بَيَان", meaning: "بيان", translation: "qartësi / elucidation", emoji: "💡", missing: "ب", transliteration: "bayān" },
      { word: "دِلَالَة", meaning: "دلالة", translation: "semiotikë / semiotics", emoji: "🔤", missing: "د", transliteration: "dilāla" },
      { word: "تَأْوِيل", meaning: "تأويل", translation: "interpretim / interpretation", emoji: "🔍", missing: "ت", transliteration: "ta'wīl" },
      { word: "إِجْمَاع", meaning: "إجماع", translation: "konsensus / consensus", emoji: "🤝", missing: "إ", transliteration: "ijmā'" },
      { word: "قِيَاس", meaning: "قياس", translation: "analogji / analogy", emoji: "⚖️", missing: "ق", transliteration: "qiyās" },
      { word: "نَسْخ", meaning: "نسخ", translation: "abrogim / abrogation", emoji: "✂️", missing: "ن", transliteration: "naskh" },
      { word: "اِجْتِمَاع", meaning: "اجتماع", translation: "sociologji / sociology", emoji: "👥", missing: "ا", transliteration: "ijtimā'" },
      { word: "نَفْس", meaning: "نفس", translation: "psikologji / psychology", emoji: "🧠", missing: "ن", transliteration: "nafs" },
      { word: "مُعَامَلَة", meaning: "معاملة", translation: "trajtim / treatment", emoji: "🤲", missing: "م", transliteration: "mu'āmala" },
      { word: "عِبَادَة", meaning: "عبادة", translation: "adhurim / worship", emoji: "🙏", missing: "ع", transliteration: "'ibāda" },
      { word: "خِلَافَة", meaning: "خلافة", translation: "kalifi / caliphate", emoji: "☪️", missing: "خ", transliteration: "khilāfa" },
      { word: "إِمَامَة", meaning: "إمامة", translation: "imamat / imamate", emoji: "🕌", missing: "إ", transliteration: "imāma" },
      { word: "فِتْنَة", meaning: "فتنة", translation: "trazirë / strife", emoji: "⚡", missing: "ف", transliteration: "fitna" },
      { word: "تَقِيَّة", meaning: "تقية", translation: "kujdes / precaution", emoji: "🛡️", missing: "ت", transliteration: "taqiyya" },
      { word: "سُنَّة", meaning: "سنة", translation: "sunnet / Sunnah", emoji: "📖", missing: "س", transliteration: "sunna" },
      { word: "إِجَازَة", meaning: "إجازة", translation: "autorizim / license", emoji: "📜", missing: "إ", transliteration: "ijāza" },
      { word: "سَنَد", meaning: "سند", translation: "zinxhir transmetimi", emoji: "🔗", missing: "س", transliteration: "sanad" },
      { word: "مَتْن", meaning: "متن", translation: "tekst / text", emoji: "📝", missing: "م", transliteration: "matn" },
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
            { v: "fillestar", label: "🌱 Fillestar" },
            { v: "mesatar",   label: "🌿 Mesatar" },
            { v: "avancuar",  label: "🌲 Avancuar" },
            { v: "profesionist", label: "🏆 Profesionist" },
          ].map(l => {
            const count = WORDS_DATA[language]?.[l.v]?.length || 0;
            return (
            <button key={l.v} onClick={() => setLevel(l.v)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex flex-col items-center ${level === l.v ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              <span>{l.label}</span>
              <span className={`text-xs ${level === l.v ? "text-emerald-100" : "text-gray-400"}`}>{count} fjalë</span>
            </button>
            );
          })}
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