import React, { useState } from "react";
import { Volume2, ChevronDown } from "lucide-react";

// ─── SHQIP VERBS ───────────────────────────────────────────────────────────────
const SHQIP_VERBS = [
  {
    verb: "jam", meaning: "to be", arabic: "كَانَ",
    conjugation: {
      present:     { une: "jam",       ti_m: "je",       ti_f: "je",       ai: "është",     ajo: "është",    ne: "jemi",      ju_m: "jeni",    ju_f: "jeni",    ata: "janë",    ato: "janë"  },
      past:        { une: "isha",      ti_m: "ishe",     ti_f: "ishe",     ai: "ishte",     ajo: "ishte",    ne: "ishim",     ju_m: "ishit",   ju_f: "ishit",   ata: "ishin",   ato: "ishin" },
      future:      { une: "do të jem", ti_m: "do të jesh", ti_f: "do të jesh", ai: "do të jetë", ajo: "do të jetë", ne: "do të jemi", ju_m: "do të jeni", ju_f: "do të jeni", ata: "do të jenë", ato: "do të jenë" },
      subjunctive: { une: "të jem",   ti_m: "të jesh",  ti_f: "të jesh",  ai: "të jetë",   ajo: "të jetë",  ne: "të jemi",   ju_m: "të jeni", ju_f: "të jeni", ata: "të jenë", ato: "të jenë" },
      imperative:  { une: "-",        ti_m: "ji",       ti_f: "ji",       ai: "-",         ajo: "-",        ne: "jemi",      ju_m: "jini",    ju_f: "jini",    ata: "-",       ato: "-"     },
    }
  },
  {
    verb: "kam", meaning: "to have", arabic: "مَلَكَ",
    conjugation: {
      present:     { une: "kam",      ti_m: "ke",      ti_f: "ke",      ai: "ka",       ajo: "ka",      ne: "kemi",     ju_m: "keni",    ju_f: "keni",    ata: "kanë",    ato: "kanë"   },
      past:        { une: "pata",     ti_m: "pate",    ti_f: "pate",    ai: "pati",     ajo: "pati",    ne: "patëm",    ju_m: "patët",   ju_f: "patët",   ata: "patën",   ato: "patën"  },
      future:      { une: "do të kem", ti_m: "do të kesh", ti_f: "do të kesh", ai: "do të ketë", ajo: "do të ketë", ne: "do të kemi", ju_m: "do të keni", ju_f: "do të keni", ata: "do të kenë", ato: "do të kenë" },
      subjunctive: { une: "të kem",   ti_m: "të kesh", ti_f: "të kesh", ai: "të ketë",  ajo: "të ketë", ne: "të kemi",  ju_m: "të keni", ju_f: "të keni", ata: "të kenë", ato: "të kenë" },
      imperative:  { une: "-",        ti_m: "ki",      ti_f: "ki",      ai: "-",        ajo: "-",       ne: "kemi",     ju_m: "kini",    ju_f: "kini",    ata: "-",       ato: "-"      },
    }
  },
  {
    verb: "shkoj", meaning: "to go", arabic: "ذَهَبَ",
    conjugation: {
      present:     { une: "shkoj",    ti_m: "shkon",   ti_f: "shkon",   ai: "shkon",    ajo: "shkon",   ne: "shkojmë",  ju_m: "shkoni",  ju_f: "shkoni",  ata: "shkojnë", ato: "shkojnë" },
      past:        { une: "shkova",   ti_m: "shkove",  ti_f: "shkove",  ai: "shkoi",    ajo: "shkoi",   ne: "shkuam",   ju_m: "shkuat",  ju_f: "shkuat",  ata: "shkuan",  ato: "shkuan"  },
      future:      { une: "do të shkoj", ti_m: "do të shkosh", ti_f: "do të shkosh", ai: "do të shkojë", ajo: "do të shkojë", ne: "do të shkojmë", ju_m: "do të shkoni", ju_f: "do të shkoni", ata: "do të shkojnë", ato: "do të shkojnë" },
      subjunctive: { une: "të shkoj", ti_m: "të shkosh", ti_f: "të shkosh", ai: "të shkojë", ajo: "të shkojë", ne: "të shkojmë", ju_m: "të shkoni", ju_f: "të shkoni", ata: "të shkojnë", ato: "të shkojnë" },
      imperative:  { une: "-",        ti_m: "shko",    ti_f: "shko",    ai: "-",        ajo: "-",       ne: "shkojmë",  ju_m: "shkoni",  ju_f: "shkoni",  ata: "-",       ato: "-"       },
    }
  },
  {
    verb: "flas", meaning: "to speak", arabic: "تَكَلَّمَ",
    conjugation: {
      present:     { une: "flas",     ti_m: "flet",    ti_f: "flet",    ai: "flet",     ajo: "flet",    ne: "flasim",   ju_m: "flisni",  ju_f: "flisni",  ata: "flasin",  ato: "flasin"  },
      past:        { une: "fola",     ti_m: "fole",    ti_f: "fole",    ai: "foli",     ajo: "foli",    ne: "folëm",    ju_m: "folët",   ju_f: "folët",   ata: "folën",   ato: "folën"   },
      future:      { une: "do të flas", ti_m: "do të flasësh", ti_f: "do të flasësh", ai: "do të flasë", ajo: "do të flasë", ne: "do të flasim", ju_m: "do të flisni", ju_f: "do të flisni", ata: "do të flasin", ato: "do të flasin" },
      subjunctive: { une: "të flas",  ti_m: "të flasësh", ti_f: "të flasësh", ai: "të flasë", ajo: "të flasë", ne: "të flasim", ju_m: "të flisni", ju_f: "të flisni", ata: "të flasin", ato: "të flasin" },
      imperative:  { une: "-",        ti_m: "flit",    ti_f: "flit",    ai: "-",        ajo: "-",       ne: "flasim",   ju_m: "flisni",  ju_f: "flisni",  ata: "-",       ato: "-"       },
    }
  },
  {
    verb: "lexoj", meaning: "to read", arabic: "قَرَأَ",
    conjugation: {
      present:     { une: "lexoj",    ti_m: "lexon",   ti_f: "lexon",   ai: "lexon",    ajo: "lexon",   ne: "lexojmë",  ju_m: "lexoni",  ju_f: "lexoni",  ata: "lexojnë", ato: "lexojnë" },
      past:        { une: "lexova",   ti_m: "lexove",  ti_f: "lexove",  ai: "lexoi",    ajo: "lexoi",   ne: "lexuam",   ju_m: "lexuat",  ju_f: "lexuat",  ata: "lexuan",  ato: "lexuan"  },
      future:      { une: "do të lexoj", ti_m: "do të lexosh", ti_f: "do të lexosh", ai: "do të lexojë", ajo: "do të lexojë", ne: "do të lexojmë", ju_m: "do të lexoni", ju_f: "do të lexoni", ata: "do të lexojnë", ato: "do të lexojnë" },
      subjunctive: { une: "të lexoj", ti_m: "të lexosh", ti_f: "të lexosh", ai: "të lexojë", ajo: "të lexojë", ne: "të lexojmë", ju_m: "të lexoni", ju_f: "të lexoni", ata: "të lexojnë", ato: "të lexojnë" },
      imperative:  { une: "-",        ti_m: "lexo",    ti_f: "lexo",    ai: "-",        ajo: "-",       ne: "lexojmë",  ju_m: "lexoni",  ju_f: "lexoni",  ata: "-",       ato: "-"       },
    }
  },
  {
    verb: "bëj", meaning: "to do/make", arabic: "فَعَلَ",
    conjugation: {
      present:     { une: "bëj",      ti_m: "bën",     ti_f: "bën",     ai: "bën",      ajo: "bën",     ne: "bëjmë",    ju_m: "bëni",    ju_f: "bëni",    ata: "bëjnë",   ato: "bëjnë"  },
      past:        { une: "bëra",     ti_m: "bëre",    ti_f: "bëre",    ai: "bëri",     ajo: "bëri",    ne: "bëmë",     ju_m: "bëtë",    ju_f: "bëtë",    ata: "bënë",    ato: "bënë"   },
      future:      { une: "do të bëj", ti_m: "do të bësh", ti_f: "do të bësh", ai: "do të bëjë", ajo: "do të bëjë", ne: "do të bëjmë", ju_m: "do të bëni", ju_f: "do të bëni", ata: "do të bëjnë", ato: "do të bëjnë" },
      subjunctive: { une: "të bëj",   ti_m: "të bësh", ti_f: "të bësh", ai: "të bëjë",  ajo: "të bëjë", ne: "të bëjmë", ju_m: "të bëni", ju_f: "të bëni", ata: "të bëjnë", ato: "të bëjnë" },
      imperative:  { une: "-",        ti_m: "bëj",     ti_f: "bëj",     ai: "-",        ajo: "-",       ne: "bëjmë",    ju_m: "bëni",    ju_f: "bëni",    ata: "-",       ato: "-"      },
    }
  },
];

// ─── ENGLISH VERBS ─────────────────────────────────────────────────────────────
const ENGLISH_VERBS = [
  {
    verb: "to be", meaning: "jam (shqip)", arabic: "يَكُونُ",
    conjugation: {
      present:     { i: "am",      you_sg: "are",    he: "is",    she: "is",   we: "are",   you_pl: "are",   they: "are"  },
      past:        { i: "was",     you_sg: "were",   he: "was",   she: "was",  we: "were",  you_pl: "were",  they: "were" },
      future:      { i: "will be", you_sg: "will be", he: "will be", she: "will be", we: "will be", you_pl: "will be", they: "will be" },
      present_perf:{ i: "have been", you_sg: "have been", he: "has been", she: "has been", we: "have been", you_pl: "have been", they: "have been" },
      conditional: { i: "would be", you_sg: "would be", he: "would be", she: "would be", we: "would be", you_pl: "would be", they: "would be" },
    }
  },
  {
    verb: "to have", meaning: "kam (shqip)", arabic: "يَمْلِكُ",
    conjugation: {
      present:     { i: "have",     you_sg: "have",    he: "has",    she: "has",   we: "have",    you_pl: "have",   they: "have"   },
      past:        { i: "had",      you_sg: "had",     he: "had",    she: "had",   we: "had",     you_pl: "had",    they: "had"    },
      future:      { i: "will have", you_sg: "will have", he: "will have", she: "will have", we: "will have", you_pl: "will have", they: "will have" },
      present_perf:{ i: "have had", you_sg: "have had", he: "has had", she: "has had", we: "have had", you_pl: "have had", they: "have had" },
      conditional: { i: "would have", you_sg: "would have", he: "would have", she: "would have", we: "would have", you_pl: "would have", they: "would have" },
    }
  },
  {
    verb: "to go", meaning: "shkoj (shqip)", arabic: "يَذْهَبُ",
    conjugation: {
      present:     { i: "go",       you_sg: "go",      he: "goes",   she: "goes",  we: "go",      you_pl: "go",     they: "go"     },
      past:        { i: "went",     you_sg: "went",    he: "went",   she: "went",  we: "went",    you_pl: "went",   they: "went"   },
      future:      { i: "will go",  you_sg: "will go", he: "will go", she: "will go", we: "will go", you_pl: "will go", they: "will go" },
      present_perf:{ i: "have gone", you_sg: "have gone", he: "has gone", she: "has gone", we: "have gone", you_pl: "have gone", they: "have gone" },
      conditional: { i: "would go", you_sg: "would go", he: "would go", she: "would go", we: "would go", you_pl: "would go", they: "would go" },
    }
  },
  {
    verb: "to speak", meaning: "flas (shqip)", arabic: "يَتَكَلَّمُ",
    conjugation: {
      present:     { i: "speak",    you_sg: "speak",   he: "speaks", she: "speaks", we: "speak",  you_pl: "speak",  they: "speak"  },
      past:        { i: "spoke",    you_sg: "spoke",   he: "spoke",  she: "spoke",  we: "spoke",  you_pl: "spoke",  they: "spoke"  },
      future:      { i: "will speak", you_sg: "will speak", he: "will speak", she: "will speak", we: "will speak", you_pl: "will speak", they: "will speak" },
      present_perf:{ i: "have spoken", you_sg: "have spoken", he: "has spoken", she: "has spoken", we: "have spoken", you_pl: "have spoken", they: "have spoken" },
      conditional: { i: "would speak", you_sg: "would speak", he: "would speak", she: "would speak", we: "would speak", you_pl: "would speak", they: "would speak" },
    }
  },
  {
    verb: "to read", meaning: "lexoj (shqip)", arabic: "يَقْرَأُ",
    conjugation: {
      present:     { i: "read",     you_sg: "read",    he: "reads",  she: "reads",  we: "read",   you_pl: "read",   they: "read"   },
      past:        { i: "read",     you_sg: "read",    he: "read",   she: "read",   we: "read",   you_pl: "read",   they: "read"   },
      future:      { i: "will read", you_sg: "will read", he: "will read", she: "will read", we: "will read", you_pl: "will read", they: "will read" },
      present_perf:{ i: "have read", you_sg: "have read", he: "has read", she: "has read", we: "have read", you_pl: "have read", they: "have read" },
      conditional: { i: "would read", you_sg: "would read", he: "would read", she: "would read", we: "would read", you_pl: "would read", they: "would read" },
    }
  },
];

// ─── ARABIC VERBS ──────────────────────────────────────────────────────────────
const ARABIC_VERBS = [
  {
    verb: "ذَهَبَ", meaning: "shkoj / to go", transliteration: "dhahaba",
    conjugation: {
      past: {
        ana: "ذَهَبْتُ",   nahnu: "ذَهَبْنَا",
        anta: "ذَهَبْتَ",  anti: "ذَهَبْتِ",   antuma: "ذَهَبْتُمَا",
        antum: "ذَهَبْتُمْ", antunna: "ذَهَبْتُنَّ",
        hua: "ذَهَبَ",    hia: "ذَهَبَتْ",   huma_m: "ذَهَبَا",
        huma_f: "ذَهَبَتَا", hum: "ذَهَبُوا", hunna: "ذَهَبْنَ",
      },
      present: {
        ana: "أَذْهَبُ",   nahnu: "نَذْهَبُ",
        anta: "تَذْهَبُ",  anti: "تَذْهَبِينَ", antuma: "تَذْهَبَانِ",
        antum: "تَذْهَبُونَ", antunna: "تَذْهَبْنَ",
        hua: "يَذْهَبُ",  hia: "تَذْهَبُ",   huma_m: "يَذْهَبَانِ",
        huma_f: "تَذْهَبَانِ", hum: "يَذْهَبُونَ", hunna: "يَذْهَبْنَ",
      },
      subjunctive: {
        ana: "أَذْهَبَ",   nahnu: "نَذْهَبَ",
        anta: "تَذْهَبَ",  anti: "تَذْهَبِي",  antuma: "تَذْهَبَا",
        antum: "تَذْهَبُوا", antunna: "تَذْهَبْنَ",
        hua: "يَذْهَبَ",  hia: "تَذْهَبَ",   huma_m: "يَذْهَبَا",
        huma_f: "تَذْهَبَا", hum: "يَذْهَبُوا", hunna: "يَذْهَبْنَ",
      },
      jussive: {
        ana: "أَذْهَبْ",   nahnu: "نَذْهَبْ",
        anta: "تَذْهَبْ",  anti: "تَذْهَبِي",  antuma: "تَذْهَبَا",
        antum: "تَذْهَبُوا", antunna: "تَذْهَبْنَ",
        hua: "يَذْهَبْ",  hia: "تَذْهَبْ",   huma_m: "يَذْهَبَا",
        huma_f: "تَذْهَبَا", hum: "يَذْهَبُوا", hunna: "يَذْهَبْنَ",
      },
      imperative: {
        ana: "-",          nahnu: "-",
        anta: "اِذْهَبْ",  anti: "اِذْهَبِي",  antuma: "اِذْهَبَا",
        antum: "اِذْهَبُوا", antunna: "اِذْهَبْنَ",
        hua: "-",         hia: "-",           huma_m: "-",
        huma_f: "-",       hum: "-",           hunna: "-",
      },
    }
  },
  {
    verb: "كَتَبَ", meaning: "shkruaj / to write", transliteration: "kataba",
    conjugation: {
      past: {
        ana: "كَتَبْتُ",   nahnu: "كَتَبْنَا",
        anta: "كَتَبْتَ",  anti: "كَتَبْتِ",   antuma: "كَتَبْتُمَا",
        antum: "كَتَبْتُمْ", antunna: "كَتَبْتُنَّ",
        hua: "كَتَبَ",    hia: "كَتَبَتْ",   huma_m: "كَتَبَا",
        huma_f: "كَتَبَتَا", hum: "كَتَبُوا", hunna: "كَتَبْنَ",
      },
      present: {
        ana: "أَكْتُبُ",   nahnu: "نَكْتُبُ",
        anta: "تَكْتُبُ",  anti: "تَكْتُبِينَ", antuma: "تَكْتُبَانِ",
        antum: "تَكْتُبُونَ", antunna: "تَكْتُبْنَ",
        hua: "يَكْتُبُ",  hia: "تَكْتُبُ",   huma_m: "يَكْتُبَانِ",
        huma_f: "تَكْتُبَانِ", hum: "يَكْتُبُونَ", hunna: "يَكْتُبْنَ",
      },
      subjunctive: {
        ana: "أَكْتُبَ",   nahnu: "نَكْتُبَ",
        anta: "تَكْتُبَ",  anti: "تَكْتُبِي",  antuma: "تَكْتُبَا",
        antum: "تَكْتُبُوا", antunna: "تَكْتُبْنَ",
        hua: "يَكْتُبَ",  hia: "تَكْتُبَ",   huma_m: "يَكْتُبَا",
        huma_f: "تَكْتُبَا", hum: "يَكْتُبُوا", hunna: "يَكْتُبْنَ",
      },
      jussive: {
        ana: "أَكْتُبْ",   nahnu: "نَكْتُبْ",
        anta: "تَكْتُبْ",  anti: "تَكْتُبِي",  antuma: "تَكْتُبَا",
        antum: "تَكْتُبُوا", antunna: "تَكْتُبْنَ",
        hua: "يَكْتُبْ",  hia: "تَكْتُبْ",   huma_m: "يَكْتُبَا",
        huma_f: "تَكْتُبَا", hum: "يَكْتُبُوا", hunna: "يَكْتُبْنَ",
      },
      imperative: {
        ana: "-",          nahnu: "-",
        anta: "اُكْتُبْ",  anti: "اُكْتُبِي",  antuma: "اُكْتُبَا",
        antum: "اُكْتُبُوا", antunna: "اُكْتُبْنَ",
        hua: "-",         hia: "-",           huma_m: "-",
        huma_f: "-",       hum: "-",           hunna: "-",
      },
    }
  },
  {
    verb: "قَرَأَ", meaning: "lexoj / to read", transliteration: "qara'a",
    conjugation: {
      past: {
        ana: "قَرَأْتُ",   nahnu: "قَرَأْنَا",
        anta: "قَرَأْتَ",  anti: "قَرَأْتِ",   antuma: "قَرَأْتُمَا",
        antum: "قَرَأْتُمْ", antunna: "قَرَأْتُنَّ",
        hua: "قَرَأَ",    hia: "قَرَأَتْ",   huma_m: "قَرَأَا",
        huma_f: "قَرَأَتَا", hum: "قَرَءُوا", hunna: "قَرَأْنَ",
      },
      present: {
        ana: "أَقْرَأُ",   nahnu: "نَقْرَأُ",
        anta: "تَقْرَأُ",  anti: "تَقْرَئِينَ", antuma: "تَقْرَآنِ",
        antum: "تَقْرَءُونَ", antunna: "تَقْرَأْنَ",
        hua: "يَقْرَأُ",  hia: "تَقْرَأُ",   huma_m: "يَقْرَآنِ",
        huma_f: "تَقْرَآنِ", hum: "يَقْرَءُونَ", hunna: "يَقْرَأْنَ",
      },
      subjunctive: {
        ana: "أَقْرَأَ",   nahnu: "نَقْرَأَ",
        anta: "تَقْرَأَ",  anti: "تَقْرَئِي",  antuma: "تَقْرَآ",
        antum: "تَقْرَءُوا", antunna: "تَقْرَأْنَ",
        hua: "يَقْرَأَ",  hia: "تَقْرَأَ",   huma_m: "يَقْرَآ",
        huma_f: "تَقْرَآ", hum: "يَقْرَءُوا", hunna: "يَقْرَأْنَ",
      },
      jussive: {
        ana: "أَقْرَأْ",   nahnu: "نَقْرَأْ",
        anta: "تَقْرَأْ",  anti: "تَقْرَئِي",  antuma: "تَقْرَآ",
        antum: "تَقْرَءُوا", antunna: "تَقْرَأْنَ",
        hua: "يَقْرَأْ",  hia: "تَقْرَأْ",   huma_m: "يَقْرَآ",
        huma_f: "تَقْرَآ", hum: "يَقْرَءُوا", hunna: "يَقْرَأْنَ",
      },
      imperative: {
        ana: "-",          nahnu: "-",
        anta: "اِقْرَأْ",  anti: "اِقْرَئِي",  antuma: "اِقْرَآ",
        antum: "اِقْرَءُوا", antunna: "اِقْرَأْنَ",
        hua: "-",         hia: "-",           huma_m: "-",
        huma_f: "-",       hum: "-",           hunna: "-",
      },
    }
  },
];

// ─── ROW DEFINITIONS ───────────────────────────────────────────────────────────
const SQ_ROWS = [
  { key: "une",   label: "Unë",    sub: "1 njëjës" },
  { key: "ti_m",  label: "Ti m.",  sub: "2 njëjës m." },
  { key: "ti_f",  label: "Ti f.",  sub: "2 njëjës f." },
  { key: "ai",    label: "Ai",     sub: "3 njëjës m." },
  { key: "ajo",   label: "Ajo",    sub: "3 njëjës f." },
  { key: "ne",    label: "Ne",     sub: "1 shumës" },
  { key: "ju_m",  label: "Ju m.",  sub: "2 shumës m." },
  { key: "ju_f",  label: "Ju f.",  sub: "2 shumës f." },
  { key: "ata",   label: "Ata",    sub: "3 shumës m." },
  { key: "ato",   label: "Ato",    sub: "3 shumës f." },
];
const SQ_TENSES = [
  { key: "present",     label: "E tashmja",   color: "bg-emerald-100 text-emerald-800" },
  { key: "past",        label: "E kryera",    color: "bg-amber-100 text-amber-800" },
  { key: "future",      label: "E ardhmja",   color: "bg-blue-100 text-blue-800" },
  { key: "subjunctive", label: "Lidhore",     color: "bg-purple-100 text-purple-800" },
  { key: "imperative",  label: "Urdhërorja",  color: "bg-red-100 text-red-800" },
];
const EN_ROWS = [
  { key: "i",       label: "I",       sub: "1st sg." },
  { key: "you_sg",  label: "You sg.", sub: "2nd sg." },
  { key: "he",      label: "He",      sub: "3rd sg. m." },
  { key: "she",     label: "She",     sub: "3rd sg. f." },
  { key: "we",      label: "We",      sub: "1st pl." },
  { key: "you_pl",  label: "You pl.", sub: "2nd pl." },
  { key: "they",    label: "They",    sub: "3rd pl." },
];
const EN_TENSES = [
  { key: "present",      label: "Simple Present", color: "bg-emerald-100 text-emerald-800" },
  { key: "past",         label: "Simple Past",    color: "bg-amber-100 text-amber-800" },
  { key: "future",       label: "Future",         color: "bg-blue-100 text-blue-800" },
  { key: "present_perf", label: "Present Perfect",color: "bg-purple-100 text-purple-800" },
  { key: "conditional",  label: "Conditional",    color: "bg-rose-100 text-rose-800" },
];
const AR_ROWS = [
  { key: "ana",      label: "أنا",      sub: "unë" },
  { key: "nahnu",    label: "نحن",      sub: "ne" },
  { key: "anta",     label: "أنتَ",     sub: "ti m." },
  { key: "anti",     label: "أنتِ",     sub: "ti f." },
  { key: "antuma",   label: "أنتما",    sub: "ju dy" },
  { key: "antum",    label: "أنتم",     sub: "ju m." },
  { key: "antunna",  label: "أنتنَّ",   sub: "ju f." },
  { key: "hua",      label: "هو",       sub: "ai" },
  { key: "hia",      label: "هي",       sub: "ajo" },
  { key: "huma_m",   label: "هما / م",  sub: "ata dy m." },
  { key: "huma_f",   label: "هما / م.ؤ",sub: "ato dy f." },
  { key: "hum",      label: "هم",       sub: "ata" },
  { key: "hunna",    label: "هنَّ",      sub: "ato" },
];
const AR_TENSES = [
  { key: "past",        label: "الماضي",           sub: "e kryera",    color: "bg-amber-100 text-amber-800" },
  { key: "present",     label: "المضارع",           sub: "e tashmja",   color: "bg-emerald-100 text-emerald-800" },
  { key: "subjunctive", label: "المضارع المنصوب",    sub: "lidhorja",    color: "bg-purple-100 text-purple-800" },
  { key: "jussive",     label: "المضارع المجزوم",    sub: "jusivi",      color: "bg-blue-100 text-blue-800" },
  { key: "imperative",  label: "الأمر",             sub: "urdhërorja",  color: "bg-red-100 text-red-800" },
];

function speak(text, lang = "sq-AL") {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.75;
  window.speechSynthesis.speak(u);
}

// ─── SHQIP TABLE ──────────────────────────────────────────────────────────────
function ShqipTable({ verb }) {
  const [activeTense, setActiveTense] = useState("present");
  const tense = verb.conjugation[activeTense];

  return (
    <div>
      {/* Tense selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {SQ_TENSES.map(t => (
          <button key={t.key} onClick={() => setActiveTense(t.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border-2 ${activeTense === t.key ? "border-emerald-500 bg-emerald-600 text-white" : "border-gray-200 bg-white text-gray-600 hover:border-emerald-300"}`}>
            {t.label}
          </button>
        ))}
      </div>
      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider">Përemrat Vetorë</th>
              <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider">Veta</th>
              <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider">{SQ_TENSES.find(t => t.key === activeTense)?.label}</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {SQ_ROWS.map((row, i) => (
              <tr key={row.key} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                <td className="px-4 py-3 font-bold text-gray-800">{row.label}</td>
                <td className="px-4 py-3 text-xs text-gray-400">{row.sub}</td>
                <td className="px-4 py-3 font-bold text-emerald-700 text-base">{tense?.[row.key] || "-"}</td>
                <td className="px-4 py-3">
                  {tense?.[row.key] && tense[row.key] !== "-" && (
                    <button onClick={() => speak(tense[row.key], "sq-AL")}
                      className="w-7 h-7 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center justify-center transition-all">
                      <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── ENGLISH TABLE ─────────────────────────────────────────────────────────────
function EnglishTable({ verb }) {
  const [activeTense, setActiveTense] = useState("present");
  const tense = verb.conjugation[activeTense];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {EN_TENSES.map(t => (
          <button key={t.key} onClick={() => setActiveTense(t.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border-2 ${activeTense === t.key ? "border-blue-500 bg-blue-600 text-white" : "border-gray-200 bg-white text-gray-600 hover:border-blue-300"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider">Pronouns</th>
              <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider">Person</th>
              <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider">{EN_TENSES.find(t => t.key === activeTense)?.label}</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {EN_ROWS.map((row, i) => (
              <tr key={row.key} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                <td className="px-4 py-3 font-bold text-gray-800">{row.label}</td>
                <td className="px-4 py-3 text-xs text-gray-400">{row.sub}</td>
                <td className="px-4 py-3 font-bold text-blue-700 text-base">{tense?.[row.key] || "-"}</td>
                <td className="px-4 py-3">
                  {tense?.[row.key] && (
                    <button onClick={() => speak(tense[row.key], "en-GB")}
                      className="w-7 h-7 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center transition-all">
                      <Volume2 className="w-3.5 h-3.5 text-blue-700" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── ARABIC TABLE ──────────────────────────────────────────────────────────────
function ArabicTable({ verb }) {
  const [activeTense, setActiveTense] = useState("past");
  const tense = verb.conjugation[activeTense];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {AR_TENSES.map(t => (
          <button key={t.key} onClick={() => setActiveTense(t.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border-2 ${activeTense === t.key ? "border-amber-500 bg-amber-600 text-white" : "border-gray-200 bg-white text-gray-600 hover:border-amber-300"}`}>
            <span className="arabic-text text-sm">{t.label}</span>
            <span className="ml-1 text-gray-400 font-normal">({t.sub})</span>
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
              <th className="px-4 py-3 text-right font-bold text-xs arabic-text">الضمائر</th>
              <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider">Shqip</th>
              <th className="px-4 py-3 text-right font-bold text-base arabic-text">{AR_TENSES.find(t => t.key === activeTense)?.label}</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {AR_ROWS.map((row, i) => (
              <tr key={row.key} className={i % 2 === 0 ? "bg-white" : "bg-amber-50/40"}>
                <td className="px-4 py-3 font-bold text-gray-800 text-right arabic-text text-lg">{row.label}</td>
                <td className="px-4 py-3 text-xs text-gray-400">{row.sub}</td>
                <td className="px-4 py-3 font-bold text-amber-800 text-xl text-right arabic-text">{tense?.[row.key] || "-"}</td>
                <td className="px-4 py-3">
                  {tense?.[row.key] && tense[row.key] !== "-" && (
                    <button onClick={() => speak(tense[row.key], "ar-SA")}
                      className="w-7 h-7 bg-amber-100 hover:bg-amber-200 rounded-lg flex items-center justify-center transition-all">
                      <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── QUIZ ──────────────────────────────────────────────────────────────────────
function QuizSection({ lang }) {
  const verbs = lang === "sq" ? SHQIP_VERBS : lang === "en" ? ENGLISH_VERBS : ARABIC_VERBS;
  const rows  = lang === "sq" ? SQ_ROWS  : lang === "en" ? EN_ROWS  : AR_ROWS;
  const tenses= lang === "sq" ? SQ_TENSES: lang === "en" ? EN_TENSES: AR_TENSES;

  const [quizQ, setQuizQ] = useState(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ ok: 0, total: 0 });

  const gen = () => {
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const tense = tenses[Math.floor(Math.random() * tenses.length)];
    const row = rows[Math.floor(Math.random() * rows.length)];
    const correct = verb.conjugation[tense.key]?.[row.key];
    if (!correct || correct === "-") { gen(); return; }
    setQuizQ({ verb, tense, row, correct });
    setAnswer(""); setResult(null);
  };

  const check = () => {
    const ok = answer.trim() === quizQ.correct.trim();
    setResult({ ok, correct: quizQ.correct });
    setScore(s => ({ ok: s.ok + (ok ? 1 : 0), total: s.total + 1 }));
  };

  if (!quizQ) {
    return (
      <button onClick={gen}
        className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 text-white rounded-2xl font-bold text-sm shadow-md transition-all">
        🎯 Fillo Kuizin e Zgjedhimit
      </button>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">🎯 Kuizi i Zgjedhimit</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-emerald-600">✓ {score.ok}/{score.total}</span>
          <button onClick={() => setQuizQ(null)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
        </div>
      </div>
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 mb-4 text-center border border-amber-100">
        <p className="text-xs text-gray-500 mb-1">Zgjedho foljen:</p>
        <p className={`text-2xl font-extrabold text-amber-700 ${lang === "ar" ? "arabic-text" : ""}`}>
          {quizQ.verb.verb}
        </p>
        <p className="text-xs text-gray-500 mt-1 italic">{quizQ.verb.meaning}</p>
        <p className="text-sm text-gray-600 mt-2">
          Koha: <strong>{quizQ.tense.label}</strong> · Veta: <strong className={lang === "ar" ? "arabic-text" : ""}>{quizQ.row.label}</strong> ({quizQ.row.sub})
        </p>
      </div>
      <div className="flex gap-2 mb-3">
        <input type="text" value={answer} onChange={e => setAnswer(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !result && answer.trim() && check()}
          placeholder="Shkruaj formën e saktë..."
          className={`flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 ${lang === "ar" ? "arabic-text text-right text-base" : ""}`}
          disabled={!!result} dir={lang === "ar" ? "rtl" : "ltr"} />
        {!result ? (
          <button onClick={check} disabled={!answer.trim()}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold disabled:opacity-40 transition-all">
            ✓
          </button>
        ) : (
          <button onClick={gen} className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold">
            →
          </button>
        )}
      </div>
      {result && (
        <div className={`rounded-xl p-3 text-sm font-semibold ${result.ok ? "bg-emerald-50 border border-emerald-200 text-emerald-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
          {result.ok ? "✅ Saktë! Bravo!" : <span>❌ Gabim. E sakta: <span className={lang === "ar" ? "arabic-text text-base" : ""}>{result.correct}</span></span>}
          <button onClick={() => speak(result.correct, lang === "sq" ? "sq-AL" : lang === "en" ? "en-GB" : "ar-SA")}
            className="ml-2 inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
            <Volume2 className="w-3 h-3" /> Dëgjo
          </button>
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function VerbConjugationView() {
  const [activeLang, setActiveLang] = useState("sq");
  const [sqVerb, setSqVerb] = useState(SHQIP_VERBS[0]);
  const [enVerb, setEnVerb] = useState(ENGLISH_VERBS[0]);
  const [arVerb, setArVerb] = useState(ARABIC_VERBS[0]);
  const [showQuiz, setShowQuiz] = useState(false);

  const langs = [
    { key: "sq", label: "🇦🇱 Shqip",    color: "bg-emerald-600" },
    { key: "en", label: "🇬🇧 Anglisht",  color: "bg-blue-600" },
    { key: "ar", label: "🇸🇦 Arabisht",  color: "bg-amber-600" },
  ];

  const currentVerbs = activeLang === "sq" ? SHQIP_VERBS : activeLang === "en" ? ENGLISH_VERBS : ARABIC_VERBS;
  const currentVerb  = activeLang === "sq" ? sqVerb       : activeLang === "en" ? enVerb        : arVerb;
  const setVerb      = activeLang === "sq" ? setSqVerb    : activeLang === "en" ? setEnVerb      : setArVerb;

  return (
    <div className="space-y-5">
      {/* Header card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h2 className="text-lg font-extrabold text-gray-900 mb-1">📚 Zgjedhimi i Foljeve</h2>
        <p className="text-sm text-gray-500 mb-5">Tabela e plotë e zgjedhimit në të tri gjuhët — Shqip, Anglisht, Arabisht</p>

        {/* Language tabs */}
        <div className="flex gap-2 mb-5 bg-gray-100 rounded-2xl p-1">
          {langs.map(l => (
            <button key={l.key} onClick={() => { setActiveLang(l.key); setShowQuiz(false); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${activeLang === l.key ? `${l.color} text-white shadow-md` : "text-gray-500 hover:text-gray-700"}`}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Verb selector */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-2">Zgjidhni foljen:</p>
          <div className="flex flex-wrap gap-2">
            {currentVerbs.map(v => (
              <button key={v.verb} onClick={() => setVerb(v)}
                className={`px-3 py-1.5 rounded-xl text-sm font-bold transition-all border-2 ${currentVerb.verb === v.verb
                  ? "border-emerald-500 bg-emerald-600 text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"}`}>
                <span className={activeLang === "ar" ? "arabic-text text-base" : ""}>{v.verb}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Verb info */}
        <div className={`rounded-xl p-4 mb-5 flex items-center justify-between ${activeLang === "sq" ? "bg-emerald-50 border border-emerald-100" : activeLang === "en" ? "bg-blue-50 border border-blue-100" : "bg-amber-50 border border-amber-100"}`}>
          <div>
            <p className={`text-2xl font-extrabold ${activeLang === "sq" ? "text-emerald-800" : activeLang === "en" ? "text-blue-800" : "text-amber-800 arabic-text"}`}>
              {currentVerb.verb}
            </p>
            <p className="text-sm text-gray-600 mt-0.5">{currentVerb.meaning}</p>
            {activeLang !== "ar" && <p className="text-xs text-gray-400 mt-0.5 arabic-text">{currentVerb.arabic}</p>}
            {activeLang === "ar" && <p className="text-xs text-gray-400 mt-0.5 italic">{currentVerb.transliteration}</p>}
          </div>
          <button onClick={() => speak(currentVerb.verb, activeLang === "sq" ? "sq-AL" : activeLang === "en" ? "en-GB" : "ar-SA")}
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${activeLang === "sq" ? "bg-emerald-100 hover:bg-emerald-200" : activeLang === "en" ? "bg-blue-100 hover:bg-blue-200" : "bg-amber-100 hover:bg-amber-200"}`}>
            <Volume2 className={`w-5 h-5 ${activeLang === "sq" ? "text-emerald-700" : activeLang === "en" ? "text-blue-700" : "text-amber-700"}`} />
          </button>
        </div>

        {/* Table */}
        {activeLang === "sq" && <ShqipTable verb={sqVerb} />}
        {activeLang === "en" && <EnglishTable verb={enVerb} />}
        {activeLang === "ar" && <ArabicTable verb={arVerb} />}

        {/* Quiz toggle */}
        <button onClick={() => setShowQuiz(q => !q)}
          className="mt-5 w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 text-white rounded-2xl font-bold text-sm shadow-md transition-all">
          🎯 {showQuiz ? "Mbyll Kuizin" : "Fillo Kuizin e Zgjedhimit"}
        </button>
      </div>

      {showQuiz && <QuizSection lang={activeLang} />}
    </div>
  );
}