import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Trophy, CheckCircle, XCircle, RotateCcw, Star, Zap } from "lucide-react";

// All quiz questions by module — 60+ per module
const QUIZ_DATA = {
  alphabeti_shqip: {
    title: "Kuiz Alfabeti Shqip", emoji: "🇦🇱", timePerQ: 15,
    questions: [
      { q: "Sa shkronja ka alfabeti shqip?", opts: ["32", "36", "28", "30"], correct: "36" },
      { q: "Sa zanore ka alfabeti shqip?", opts: ["5", "6", "7", "8"], correct: "7" },
      { q: "Sa bashkëtingëllore ka shqipja?", opts: ["25", "29", "27", "23"], correct: "29" },
      { q: "Sa digrafë (shkronja dyshe) ka shqipja?", opts: ["7", "8", "9", "10"], correct: "9" },
      { q: "Cila shkronjë shqipe nuk ekziston në anglisht?", opts: ["A", "B", "Ë", "C"], correct: "Ë" },
      { q: "Cila fjalë fillon me shkronjën 'Ë'?", opts: ["Emër", "Erë", "Ëmbël", "Enë"], correct: "Ëmbël" },
      { q: "Cila shkronjë vjen pas 'Z' në alfabetin shqip?", opts: ["Xh", "Zh", "Sh", "Th"], correct: "Zh" },
      { q: "Cila shkronjë paraqet tingullin 'L të trashë'?", opts: ["L", "Ll", "Lj", "Lh"], correct: "Ll" },
      { q: "Cila shkronjë paraqet tingullin si 'ch' anglisht?", opts: ["C", "Ç", "Xh", "Sh"], correct: "Ç" },
      { q: "'Y' shqip është:", opts: ["Zanore", "Bashkëtingëllore", "Digraff", "Shkronjë angleze"], correct: "Zanore" },
      { q: "Cila fjalë ka dy zanore radhazi?", opts: ["Shtëpi", "Libër", "Ia", "Dritë"], correct: "Ia" },
      { q: "Zanorja 'Ë' quhet:", opts: ["Schwa", "Epsilon", "Eta", "Omega"], correct: "Schwa" },
      { q: "Cili digraff tingëllon si 'j' angleze?", opts: ["Gj", "Xh", "Zh", "Dh"], correct: "Xh" },
      { q: "Cili digraff shqip tingëllon si 'dh' angleze (this)?", opts: ["Th", "Dh", "Gj", "Nj"], correct: "Dh" },
      { q: "Cili tingull ka 'Rr' (dallim nga R)?", opts: ["R e double", "R e zgjatur", "R e fortë (vibrim i dyfishtë)", "R e heshtur"], correct: "R e fortë (vibrim i dyfishtë)" },
      { q: "Sa rrokje ka fjala 'bukuri'?", opts: ["2", "3", "4", "1"], correct: "3" },
      { q: "Ndaj rrokjet e 'bardha'?", opts: ["bar-dha", "ba-rdha", "bard-ha", "b-ardha"], correct: "bar-dha" },
      { q: "Ndaj rrokjet e 'shkollë'?", opts: ["shkol-lë", "shko-llë", "sh-kollë", "shkoll-ë"], correct: "shko-llë" },
      { q: "Rregulla V-BT-V: bashkëtingëllorja i takon:", opts: ["Rrokjes paraardhëse", "Rrokjes pasardhëse", "Nuk ndahet", "Qendrit"], correct: "Rrokjes pasardhëse" },
      { q: "Rregulla V-BT-BT-V: bashkëtingëlloret:", opts: ["Të gjitha shkojnë djathtas", "Ndahen mes tyre", "Të gjitha shkojnë majtas", "Nuk ndahen"], correct: "Ndahen mes tyre" },
      { q: "Nyja e emrit mashkullor shqip është:", opts: ["-a / -ja", "-i / -u", "-ë", "-e"], correct: "-i / -u" },
      { q: "Nyja e emrit femëror shqip është:", opts: ["-i / -u", "-a / -ja", "-ë", "-o"], correct: "-a / -ja" },
      { q: "'Vajzë e bukur' — mbiemri 'e bukur' është:", opts: ["Mashkullor", "Femëror", "Asnjanës", "Shumës"], correct: "Femëror" },
      { q: "'Mal i lartë' — mbiemri 'i lartë' është:", opts: ["Femëror", "Mashkullor", "Asnjanës", "Njëjës"], correct: "Mashkullor" },
      { q: "Shumësi i emrit 'libër' është:", opts: ["libri", "librë", "libra", "libret"], correct: "libra" },
      { q: "Rasa emërore tregon:", opts: ["Kryefjalën e fjalisë", "Përkatësinë", "Marrësin", "Objektin"], correct: "Kryefjalën e fjalisë" },
      { q: "Rasa gjinore tregon:", opts: ["Kryefjalën", "Përkatësinë (i kujt)", "Marrësin", "Mjetin"], correct: "Përkatësinë (i kujt)" },
      { q: "E ardhme shqip formohet me:", opts: ["do + folja", "kam + folja", "do të + folja", "jam + folja"], correct: "do të + folja" },
      { q: "'Lexova' — kjo është kohë:", opts: ["E tashme", "E ardhme", "E shkuar e thjeshtë", "Urdhërorja"], correct: "E shkuar e thjeshtë" },
      { q: "Forma e saktë e urdhërorës së 'shkoj'?", opts: ["shko!", "shkoj!", "do të shkoj!", "shkova!"], correct: "shko!" },
      { q: "Mohimi i drejtë para foljes?", opts: ["s'", "jo", "nuk", "mos"], correct: "nuk" },
      { q: "Kur përdoret 'mos'?", opts: ["Para foljes pohore", "Para emrit", "Para foljes urdhërore mohuese", "Para mbiemrit"], correct: "Para foljes urdhërore mohuese" },
      { q: "Llojet e ligjëratës janë gjithsej:", opts: ["6", "7", "8", "10"], correct: "8" },
      { q: "Folja tregon:", opts: ["Cilësi", "Veprim ose gjendje", "Sasi", "Marrëdhënie"], correct: "Veprim ose gjendje" },
      { q: "Ndajfolja cilëson:", opts: ["Emrin", "Foljen ose mbiemrin", "Numërorin", "Lidhëzën"], correct: "Foljen ose mbiemrin" },
      { q: "Lidhëza lidh:", opts: ["Emra", "Folje", "Fjali ose pjesë të fjalisë", "Mbiemra"], correct: "Fjali ose pjesë të fjalisë" },
      { q: "Kush shkroi 'Lahuta e Malcis'?", opts: ["Naim Frashëri", "Migjeni", "Gjergj Fishta", "Fan Noli"], correct: "Gjergj Fishta" },
      { q: "Naim Frashëri i takon periudhës:", opts: ["Romantizmit Italian", "Rilindjes Kombëtare", "Modernizmit", "Mes luftërave"], correct: "Rilindjes Kombëtare" },
      { q: "Kush shkroi 'Vargjet e Lira'?", opts: ["Fan Noli", "Kadare", "Naim Frashëri", "Migjeni"], correct: "Migjeni" },
      { q: "Ismail Kadare njihet si:", opts: ["Poet i Rilindjes", "Romancier ndërkombëtar", "Dramaturg klasik", "Shkrimtar mesjetar"], correct: "Romancier ndërkombëtar" },
      { q: "Shqipja shkruhet:", opts: ["Djathtas-majtas", "Majtas-djathtas", "Poshtë-lart", "Çfarëdo drejtimt"], correct: "Majtas-djathtas" },
      { q: "'Njerëz' — bashkëtingëllorja e parë është:", opts: ["N", "Nj", "Nj (digraff)", "Ny"], correct: "Nj (digraff)" },
      { q: "Fjala 'yll' ka sa zanore?", opts: ["0", "1 (Y)", "2", "3"], correct: "1 (Y)" },
      { q: "Shkronja Ç ndryshon nga C sepse:", opts: ["Ç = 'ch', C = 'ts'", "C = 'ch', Ç = 'ts'", "Janë identike", "Ç nuk ekziston"], correct: "Ç = 'ch', C = 'ts'" },
      { q: "Sa rrokje ka fjala 'shtëpi'?", opts: ["2", "3", "4", "1"], correct: "3" },
      { q: "Ç'kuptim ka fjala 'drejtshkrim'?", opts: ["Shkrim i drejtë / i saktë", "Shkrim i shpejtë", "Shkrim i bukur", "Shkrim arab"], correct: "Shkrim i drejtë / i saktë" },
      { q: "Emrat e përveçëm shkruhen:", opts: ["Me shkronjë të vogël", "Me shkronjë të madhe", "Me italic", "Pa rregull"], correct: "Me shkronjë të madhe" },
      { q: "Folja 'lexon' — personi dhe numri?", opts: ["1. njëjës", "2. njëjës", "3. njëjës", "1. shumës"], correct: "3. njëjës" },
      { q: "Forma e saktë: 'ne lexo___'?", opts: ["lexojm", "lexojmë", "lexoni", "lexojnë"], correct: "lexojmë" },
      { q: "Cilido emër femëror zakonisht mbaron me:", opts: ["-i", "-ë / -a", "-u", "-o"], correct: "-ë / -a" },
      { q: "Gjinia e emrit 'shtëpi'?", opts: ["Mashkullore", "Femërorja", "Asnjanëse", "Nuk ka gjini"], correct: "Femërorja" },
      { q: "Gjinia e emrit 'mal'?", opts: ["Femërorja", "Asnjanëse", "Mashkullore", "Nuk ka gjini"], correct: "Mashkullore" },
      { q: "'Çdo rrokje ka të paktën...'?", opts: ["1 bashkëtingëllore", "1 zanore", "2 shkronja", "1 digraff"], correct: "1 zanore" },
      { q: "Digrafi nuk ndahet kurrë sepse:", opts: ["Është i gjatë", "Paraqet 1 tingull të vetëm", "Është zanore", "Është rrallë"], correct: "Paraqet 1 tingull të vetëm" },
      { q: "Rasa dhanore tregon:", opts: ["Kryefjalën", "Përkatësinë", "Marrësin e veprimit", "Objektin direkt"], correct: "Marrësin e veprimit" },
      { q: "Rasa kallëzore tregon:", opts: ["Kryefjalën", "Marrësin", "Objektin direkt", "Origjinën"], correct: "Objektin direkt" },
      { q: "'Shoh djalin' — 'djalin' është rasë:", opts: ["Emërore", "Gjinore", "Dhanore", "Kallëzore"], correct: "Kallëzore" },
      { q: "Rasat e emrit shqip janë:", opts: ["3", "4", "5", "6"], correct: "5" },
      { q: "Shkronja 'Gj' tingëllon si:", opts: ["G e zakonshme", "Gy (si 'gy' hungareze)", "Gj (si 'dj' frëngjisht)", "Gj si J italiane"], correct: "Gj (si 'dj' frëngjisht)" },
      { q: "Kush shkroi 'Bagëti e Bujqësi'?", opts: ["Gjergj Fishta", "Fan Noli", "Naim Frashëri", "Migjeni"], correct: "Naim Frashëri" },
      { q: "Fjalia ka gjithmonë:", opts: ["Emër", "Folje", "Mbiemër", "Ndajfolje"], correct: "Folje" },
      { q: "Çfarë është periudha e Rilindjes Kombëtare?", opts: ["1700-1780", "1835-1912", "1920-1945", "1945-1990"], correct: "1835-1912" },
    ]
  },

  alfabeti_anglisht: {
    title: "Kuiz Alfabeti Anglisht", emoji: "🇬🇧", timePerQ: 15,
    questions: [
      { q: "Sa shkronja ka alfabeti anglez?", opts: ["24", "25", "26", "27"], correct: "26" },
      { q: "Sa zanore ka anglishtja?", opts: ["4", "5", "6", "7"], correct: "5" },
      { q: "Cila shkronjë vjen pas 'M'?", opts: ["L", "N", "O", "K"], correct: "N" },
      { q: "Shkronja e fundit e alfabetit anglez?", opts: ["Y", "X", "Z", "W"], correct: "Z" },
      { q: "Cila shkronjë quhet 'double-you'?", opts: ["U", "V", "W", "X"], correct: "W" },
      { q: "Silent letter në 'knife'?", opts: ["I", "N", "K", "E"], correct: "K" },
      { q: "Silent letter në 'write'?", opts: ["R", "I", "W", "T"], correct: "W" },
      { q: "Silent letter në 'hour'?", opts: ["O", "U", "R", "H"], correct: "H" },
      { q: "Silent letter në 'lamb'?", opts: ["L", "A", "M", "B"], correct: "B" },
      { q: "Silent letter në 'island'?", opts: ["I", "S", "L", "D"], correct: "S" },
      { q: "TH në 'the/this/that' tingëllon si:", opts: ["θ (pa zë)", "ð (me zë)", "T", "D"], correct: "ð (me zë)" },
      { q: "TH në 'think/three' tingëllon si:", opts: ["ð (me zë)", "θ (pa zë)", "T", "S"], correct: "θ (pa zë)" },
      { q: "TH në 'mother/father' është:", opts: ["θ (i fortë)", "ð (i butë)", "T", "D"], correct: "ð (i butë)" },
      { q: "Shumësi i 'child'?", opts: ["childs", "childes", "children", "childies"], correct: "children" },
      { q: "Shumësi i 'city'?", opts: ["citys", "cityes", "citees", "cities"], correct: "cities" },
      { q: "Shumësi i 'box'?", opts: ["boxs", "boxies", "boxes", "boxen"], correct: "boxes" },
      { q: "Shumësi i 'sheep'?", opts: ["sheeps", "sheepes", "sheepen", "sheep"], correct: "sheep" },
      { q: "Shumësi i 'man'?", opts: ["mans", "manes", "men", "menies"], correct: "men" },
      { q: "Shumësi i 'tooth'?", opts: ["tooths", "toothes", "teeths", "teeth"], correct: "teeth" },
      { q: "Shumësi i 'mouse'?", opts: ["mouses", "mooses", "mice", "moose"], correct: "mice" },
      { q: "Shumësi i 'baby'?", opts: ["babys", "babyies", "babyes", "babies"], correct: "babies" },
      { q: "Past simple i 'go'?", opts: ["goed", "gone", "goes", "went"], correct: "went" },
      { q: "Past simple i 'eat'?", opts: ["eated", "eaten", "eats", "ate"], correct: "ate" },
      { q: "Past simple i 'play' (rregullt)?", opts: ["plaid", "plaied", "plays", "played"], correct: "played" },
      { q: "Past simple i 'see'?", opts: ["seed", "seen", "sees", "saw"], correct: "saw" },
      { q: "Past simple i 'come'?", opts: ["comed", "came", "comes", "comen"], correct: "came" },
      { q: "Forma 'She goes' është kohë:", opts: ["Past Simple", "Future", "Present Continuous", "Present Simple"], correct: "Present Simple" },
      { q: "'I am going' është kohë:", opts: ["Present Simple", "Past Simple", "Future", "Present Continuous"], correct: "Present Continuous" },
      { q: "Future simple: I will go — 'will' + ___?", opts: ["folja+s", "folja+ing", "folja bazë", "folja+ed"], correct: "folja bazë" },
      { q: "Nyja para 'apple'?", opts: ["a", "the", "an", "pa nyje"], correct: "an" },
      { q: "Nyja para 'university'?", opts: ["an", "the", "a", "pa nyje"], correct: "a" },
      { q: "Nyja para 'hour'?", opts: ["a", "the", "an", "pa nyje"], correct: "an" },
      { q: "'___ sun rises in the east':", opts: ["A", "An", "The", "pa nyje"], correct: "The" },
      { q: "Para emrave abstrakt (love, music)?", opts: ["a", "an", "the", "pa nyje"], correct: "pa nyje" },
      { q: "'A' në 'cake' tingëllon si:", opts: ["æ (cat)", "ɑː (car)", "ə (about)", "eɪ (ay)"], correct: "eɪ (ay)" },
      { q: "'A' në 'cat' tingëllon si:", opts: ["eɪ (cake)", "ɑː (car)", "æ (e shkurtër)", "ə"], correct: "æ (e shkurtër)" },
      { q: "'OO' në 'book' tingëllon si:", opts: ["uː (food)", "ʊ (e shkurtër)", "oʊ", "ɔː"], correct: "ʊ (e shkurtër)" },
      { q: "'OO' në 'food' tingëllon si:", opts: ["ʊ (book)", "oʊ", "uː (e gjatë)", "ɔː"], correct: "uː (e gjatë)" },
      { q: "Kush shkroi 'Romeo and Juliet'?", opts: ["Dickens", "Tolkien", "Orwell", "Shakespeare"], correct: "Shakespeare" },
      { q: "Kush shkroi 'Harry Potter'?", opts: ["Tolkien", "C.S. Lewis", "Dahl", "J.K. Rowling"], correct: "J.K. Rowling" },
      { q: "Kush shkroi '1984' dhe 'Animal Farm'?", opts: ["Dickens", "Woolf", "Hardy", "George Orwell"], correct: "George Orwell" },
      { q: "Kush shkroi 'The Lord of the Rings'?", opts: ["C.S. Lewis", "Rowling", "Dahl", "J.R.R. Tolkien"], correct: "J.R.R. Tolkien" },
      { q: "Kush shkroi 'Oliver Twist'?", opts: ["Shakespeare", "Hardy", "Orwell", "Charles Dickens"], correct: "Charles Dickens" },
      { q: "Kush shkroi 'Alice in Wonderland'?", opts: ["Dickens", "Tolkien", "Lewis Carroll", "Shakespeare"], correct: "Lewis Carroll" },
      { q: "Parafjala 'in' tregon:", opts: ["Sipërfaqen", "Brendësinë", "Pikën e saktë", "Kohën"], correct: "Brendësinë" },
      { q: "Parafjala 'on' tregon:", opts: ["Brendësinë", "Pikën e saktë", "Sipërfaqen", "Origjinën"], correct: "Sipërfaqen" },
      { q: "Parafjala 'at' tregon:", opts: ["Brendësinë", "Sipërfaqen", "Pikën e saktë", "Shtrirjen"], correct: "Pikën e saktë" },
      { q: "Rregulla +es: cilat shkronja?", opts: ["x, s, sh, ch", "x, z, j, q", "l, r, n, m", "a, e, i, o"], correct: "x, s, sh, ch" },
      { q: "Rregulla y→ies: kur?", opts: ["Çdoherë me y", "Kur y vjen pas zanore", "Kur y vjen pas konsonant", "Kurrë"], correct: "Kur y vjen pas konsonant" },
      { q: "Anglishtja ka sa tinguj vokalikë?", opts: ["5", "10", "15", "20+"], correct: "20+" },
      { q: "'ER' në 'her' tingëllon si:", opts: ["ɑː", "ɔː", "ɜː", "æ"], correct: "ɜː" },
      { q: "Past simple i 'buy'?", opts: ["buyed", "buied", "buys", "bought"], correct: "bought" },
      { q: "Past simple i 'think'?", opts: ["thinked", "thinks", "thought", "thinkt"], correct: "thought" },
      { q: "Shumësi i 'ox'?", opts: ["oxes", "oxes", "oxies", "oxen"], correct: "oxen" },
      { q: "Kush shkroi 'Animal Farm'?", opts: ["Huxley", "Woolf", "Joyce", "George Orwell"], correct: "George Orwell" },
      { q: "TH rregull i thjeshtë: mes zanoreve = ?", opts: ["θ (i fortë)", "T", "D", "ð (i butë)"], correct: "ð (i butë)" },
      { q: "'KN' në fillim të fjalës: K = ?", opts: ["Lexohet K", "Nuk lexohet (heshtur)", "Lexohet si G", "Lexohet si N"], correct: "Nuk lexohet (heshtur)" },
      { q: "Forma '3rd person singular' e 'go'?", opts: ["go", "gos", "goe", "goes"], correct: "goes" },
      { q: "Forma negative Present Simple me 'He'?", opts: ["He don't go", "He doesn't goes", "He doesn't go", "He no go"], correct: "He doesn't go" },
      { q: "Pyetje Present Simple: '___ she go?'", opts: ["Do", "Does", "Is", "Are"], correct: "Does" },
      { q: "Past simple i 'have'?", opts: ["haved", "haves", "has", "had"], correct: "had" },
    ]
  },

  alfabeti_arab: {
    title: "Kuiz Alfabeti Arab", emoji: "🕌", timePerQ: 20,
    questions: [
      { q: "Sa shkronja ka alfabeti arab?", opts: ["26", "28", "30", "32"], correct: "28" },
      { q: "Arabishtja shkruhet:", opts: ["Majtas-djathtas", "Djathtas-majtas", "Poshtë-lart", "Lart-poshtë"], correct: "Djathtas-majtas" },
      { q: "Cila shkronjë quhet 'Elif'?", opts: ["ب", "ا", "ت", "ث"], correct: "ا" },
      { q: "Cila shkronjë është 'Ba'?", opts: ["ا", "ت", "ث", "ب"], correct: "ب" },
      { q: "Cila shkronjë është 'Ta'?", opts: ["ب", "ث", "ت", "ا"], correct: "ت" },
      { q: "Cila shkronjë arabe është 'Mim'?", opts: ["ن", "و", "ي", "م"], correct: "م" },
      { q: "Shkronja 'Nun' shkruhet?", opts: ["م", "و", "ه", "ن"], correct: "ن" },
      { q: "Cila është 'Waw'?", opts: ["ي", "ه", "ن", "و"], correct: "و" },
      { q: "Shkronja 'Ya' arabe?", opts: ["و", "ه", "ن", "ي"], correct: "ي" },
      { q: "Cila shkronjë ka pikë sipër (Tha)?", opts: ["ب", "ت", "ن", "ث"], correct: "ث" },
      { q: "Cila quhet 'Alef Lam Mim'?", opts: ["الله", "بسم", "رحم", "الم"], correct: "الم" },
      { q: "Hareket 'Fatha' jep tingull:", opts: ["U", "I", "A", "E"], correct: "A" },
      { q: "Hareket 'Damma' jep tingull:", opts: ["A", "I", "U", "E"], correct: "U" },
      { q: "Hareket 'Kasra' jep tingull:", opts: ["A", "U", "E", "I"], correct: "I" },
      { q: "Sukun tregon:", opts: ["Zanore A", "Zanore U", "Heshtje (konsonant i thjeshtë)", "Zanore I"], correct: "Heshtje (konsonant i thjeshtë)" },
      { q: "Shadda (Tashdid) tregon:", opts: ["Zanore të gjatë", "Shkronjë të double-zuar", "Heshtje", "Fund fjalie"], correct: "Shkronjë të double-zuar" },
      { q: "Sa forma ka çdo shkronjë arabe (maks)?", opts: ["2", "3", "4", "5"], correct: "4" },
      { q: "4 format e shkronjës arabe janë:", opts: ["E madhe, e vogël, bold, italic", "E izoluar, fillestare, mesme, fundore", "Madhore, vogëlore, shkrim, shtypje", "Drejtim, lartësi, gjerësi, stil"], correct: "E izoluar, fillestare, mesme, fundore" },
      { q: "Shkronja 'Lam-Elif' (لا) është:", opts: ["Dy shkronja të ndara", "Lidhje speciale Lam+Elif", "Një shkronjë e re", "Shkronjë shtesë"], correct: "Lidhje speciale Lam+Elif" },
      { q: "'Bismillah' fillon me shkronjën:", opts: ["Elif (ا)", "Ba (ب)", "Mim (م)", "Ha (ه)"], correct: "Ba (ب)" },
      { q: "Shkronja 'Qaf' (ق) shqiptohet:", opts: ["Nga gjuha (frontal)", "Nga buzët", "Nga fundi i fytit (uvular)", "Nga hunda"], correct: "Nga fundi i fytit (uvular)" },
      { q: "Shkronja 'Ayn' (ع) shqiptohet:", opts: ["Nga gjuha", "Nga buzët", "Nga fyta (laryngeal)", "Nga dhëmbët"], correct: "Nga fyta (laryngeal)" },
      { q: "Cila shkronjë është 'Jim'?", opts: ["ح", "خ", "ج", "ع"], correct: "ج" },
      { q: "Cila shkronjë është 'Ha' (e fortë)?", opts: ["ج", "خ", "ع", "ح"], correct: "ح" },
      { q: "Cila shkronjë është 'Kha'?", opts: ["ح", "ج", "ع", "خ"], correct: "خ" },
      { q: "Cila shkronjë është 'Ra'?", opts: ["ز", "و", "ر", "ن"], correct: "ر" },
      { q: "Cila shkronjë është 'Zayn'?", opts: ["ر", "و", "ن", "ز"], correct: "ز" },
      { q: "Cila shkronjë është 'Sin'?", opts: ["ش", "ص", "ض", "س"], correct: "س" },
      { q: "Cila shkronjë është 'Shin'?", opts: ["س", "ص", "ض", "ش"], correct: "ش" },
      { q: "Cila shkronjë është 'Dad' (ض)?", opts: ["ص", "ط", "ظ", "ض"], correct: "ض" },
      { q: "Cila shkronjë është 'Ta' (ط — e fortë)?", opts: ["ض", "ظ", "ت", "ط"], correct: "ط" },
      { q: "Cila shkronjë është 'Za' (ظ — e fortë)?", opts: ["ط", "ض", "ص", "ظ"], correct: "ظ" },
      { q: "Cila shkronjë është 'Fa'?", opts: ["ق", "ك", "ل", "ف"], correct: "ف" },
      { q: "Cila shkronjë është 'Kaf'?", opts: ["ف", "ق", "ل", "ك"], correct: "ك" },
      { q: "Cila shkronjë është 'Lam'?", opts: ["ك", "م", "ن", "ل"], correct: "ل" },
      { q: "Cila shkronjë është 'Ghain' (غ)?", opts: ["ع", "خ", "ح", "غ"], correct: "غ" },
      { q: "Cila shkronjë është 'Fa' (ف)?", opts: ["ق", "و", "ل", "ف"], correct: "ف" },
      { q: "Cila shkronjë është 'Ha' e fundit (ه)?", opts: ["ح", "خ", "ع", "ه"], correct: "ه" },
      { q: "Zanorja e gjatë 'Aa' në arabisht formohet me:", opts: ["Fatha + Waw", "Fatha + Elif", "Damma + Elif", "Kasra + Ya"], correct: "Fatha + Elif" },
      { q: "Zanorja e gjatë 'Uu' formohet me:", opts: ["Fatha + Elif", "Kasra + Ya", "Damma + Waw", "Shadda"], correct: "Damma + Waw" },
      { q: "Zanorja e gjatë 'Ii' formohet me:", opts: ["Kasra + Ya", "Fatha + Elif", "Damma + Waw", "Sukun"], correct: "Kasra + Ya" },
      { q: "Rregulla Shams dhe Qamar ka lidhje me:", opts: ["Hareket", "Nyjen 'Al' + shkronja", "Format e shkronjave", "Sukun"], correct: "Nyjen 'Al' + shkronja" },
      { q: "Shkronja Shamsijje (diell) + Al = ?", opts: ["Al shqiptohet", "L e Al asimilohet", "Nuk ndryshon", "Hiqet Al"], correct: "L e Al asimilohet" },
      { q: "Shkronja Qamarijje (hënë) + Al = ?", opts: ["L asimilohet", "Al shqiptohet plotësisht", "Al hiqet", "Ndryshon forma"], correct: "Al shqiptohet plotësisht" },
      { q: "Sa shkronja janë Shamsijje?", opts: ["10", "12", "14", "16"], correct: "14" },
      { q: "Sa shkronja janë Qamarijje?", opts: ["14", "12", "10", "16"], correct: "14" },
      { q: "Cila shkronjë është NDALUAR të lidhë me shkronjën pasardhëse?", opts: ["Ba (ب)", "Ta (ت)", "Elif (ا)", "Sin (س)"], correct: "Elif (ا)" },
      { q: "Tanwin (nunazion) tregon:", opts: ["Shadda", "Zanore të fundme + N (an, un, in)", "Sukun", "Hatim"], correct: "Zanore të fundme + N (an, un, in)" },
      { q: "Emri arab tipik ka fund:", opts: ["-at", "-un (Tanwin Damm)", "-in", "-al"], correct: "-un (Tanwin Damm)" },
      { q: "'الله' — sa shkronja ka?", opts: ["3", "4", "5", "6"], correct: "4" },
      { q: "Cila rrokje arabe quhet 'e hapur'?", opts: ["BT + zanore + BT", "Zanore + BT", "BT + zanore (CV)", "Zanore e vetme"], correct: "BT + zanore (CV)" },
      { q: "Shkronja 'Sad' (ص) quhet:", opts: ["E butë", "E emphatike (e fortë)", "E hundore", "E qiellzore"], correct: "E emphatike (e fortë)" },
      { q: "Tasjil (Tas-hil) do të thotë:", opts: ["Zgjatje", "Lehtësim i Elif", "Heshtje", "Bashkim"], correct: "Lehtësim i Elif" },
      { q: "Imala do të thotë:", opts: ["Zgjatje e Alifit", "Anisim i Alifit drejt 'E'", "Heshtje", "Bashkim"], correct: "Anisim i Alifit drejt 'E'" },
      { q: "Cila shkronjë vjen e 10-ta në alfabet?", opts: ["ر", "د", "ذ", "ي"], correct: "ي" },
      { q: "'بِسْمِ اللَّهِ' — shkronja e parë ka:", opts: ["Fatha", "Damma", "Sukun", "Kasra"] , correct: "Kasra" },
      { q: "Cila shkronjë ka pikë poshtë (Ba ب)?", opts: ["1 pikë sipër", "2 pikë sipër", "3 pikë sipër", "1 pikë poshtë"], correct: "1 pikë poshtë" },
      { q: "Cila shkronjë ka 3 pika sipër (Tha ث)?", opts: ["1 pikë poshtë", "2 pikë sipër", "1 pikë sipër", "3 pika sipër"], correct: "3 pika sipër" },
      { q: "Sa pika ka shkronja 'Ta' (ت)?", opts: ["1 sipër", "1 poshtë", "2 sipër", "3 sipër"], correct: "2 sipër" },
    ]
  },

  texhuidi: {
    title: "Kuiz Texhuidi", emoji: "📖", timePerQ: 20,
    questions: [
      { q: "Çfarë është 'Izhar'?", opts: ["Fshehje", "Bashkim", "Vibrim", "Shqiptim i qartë"], correct: "Shqiptim i qartë" },
      { q: "Çfarë është 'Idgham'?", opts: ["Shqiptim i qartë", "Fshehje", "Bashkim i dy tingujve", "Kthim"], correct: "Bashkim i dy tingujve" },
      { q: "Çfarë është 'Ikhfa'?", opts: ["Shqiptim i qartë", "Bashkim", "Fshehje e pjesshme", "Vibrim"], correct: "Fshehje e pjesshme" },
      { q: "Çfarë është 'Iqlab'?", opts: ["Shqiptim i qartë", "Zgjatje", "Bashkim", "Kthim i Nunës në Mim"], correct: "Kthim i Nunës në Mim" },
      { q: "Çfarë është 'Qalqalah'?", opts: ["Zgjatje e zërit", "Shqiptim i qartë", "Fshehje", "Vibrim / jehonë"], correct: "Vibrim / jehonë" },
      { q: "Çfarë do të thotë 'Madd'?", opts: ["Bashkim", "Fshehje", "Shkurtim", "Zgjatje e zërit"], correct: "Zgjatje e zërit" },
      { q: "Çfarë është 'Ghunnah'?", opts: ["Zë gjuhësor", "Zë hundor", "Vibrim", "Fshehje"], correct: "Zë hundor" },
      { q: "Shkronjat e Qalqalah janë:", opts: ["ق ط ب ج د", "ن م ل ر", "ب ت ث ج", "ه و ي ا"], correct: "ق ط ب ج د" },
      { q: "Çfarë është 'Waqf'?", opts: ["Fillim leximi", "Zgjatje", "Bashkim", "Ndalim gjatë leximit"], correct: "Ndalim gjatë leximit" },
      { q: "Sa lloje kryesore ka Madd-i?", opts: ["3", "4", "5", "2"], correct: "2" },
      { q: "Madd Tabii (natyror) zgjat:", opts: ["1 hareke", "3 harekë", "4-6 harekë", "2 harekë"], correct: "2 harekë" },
      { q: "Madd Lazim zgjat:", opts: ["2 harekë", "4 harekë", "6 harekë", "8 harekë"], correct: "6 harekë" },
      { q: "Idgham ka sa kategori?", opts: ["2 (me Ghunnah, pa Ghunnah)", "3", "4", "1"], correct: "2 (me Ghunnah, pa Ghunnah)" },
      { q: "Shkronjat e Idgham me Ghunnah?", opts: ["ل ر", "ن م و ي", "ق ط ب ج د", "ب ت ث"], correct: "ن م و ي" },
      { q: "Shkronjat e Idgham pa Ghunnah?", opts: ["ن م و ي", "ق ط ب ج د", "ل ر", "ب ت ث"], correct: "ل ر" },
      { q: "Izhar Halqi ka sa shkronja?", opts: ["4", "5", "6", "7"], correct: "6" },
      { q: "Shkronjat e Izhar Halqi janë:", opts: ["ق ط ب ج د", "ن م ل ر", "ء ه ع ح غ خ", "ب ت ث ج"], correct: "ء ه ع ح غ خ" },
      { q: "Ikhfa ka sa shkronja?", opts: ["10", "12", "15", "18"], correct: "15" },
      { q: "Iqlab ndodh kur pas Nun Sakinah vjen:", opts: ["أ ه ع ح غ خ", "ل ر", "ن م و ي", "ب"], correct: "ب" },
      { q: "Ghunnah e plotë ndodh gjatë:", opts: ["Izharit", "Idgham dhe Ikhfa", "Waqfit", "Madd Tabiit"], correct: "Idgham dhe Ikhfa" },
      { q: "Madd Muttasil ndodh kur:", opts: ["Shkronja Madd + Hamze janë në dy fjalë", "Shkronja Madd + Hamze janë në të njëjtën fjalë", "Pas Sukunit", "Para Shaddes"], correct: "Shkronja Madd + Hamze janë në të njëjtën fjalë" },
      { q: "Madd Munfasil ndodh kur:", opts: ["Shkronja Madd + Hamze janë në të njëjtën fjalë", "Madd + Hamze janë në dy fjalë të ndara", "Pas Shaddes", "Para Sukunit"], correct: "Madd + Hamze janë në dy fjalë të ndara" },
      { q: "Texhuid do të thotë:", opts: ["Memorim", "Bukërosje dhe përsosje e leximit", "Shqiptim i shpejtë", "Hezitim"], correct: "Bukërosje dhe përsosje e leximit" },
      { q: "Qalqalah shqiptohet vetëm kur shkronja është:", opts: ["Me Fatha", "Me Damma", "Me Kasra", "Me Sukun ose në fund"], correct: "Me Sukun ose në fund" },
      { q: "Makhraj do të thotë:", opts: ["Rregull leximi", "Vendi i shqiptimit (goja, fyta etj.)", "Zgjatje", "Ndalim"], correct: "Vendi i shqiptimit (goja, fyta etj.)" },
      { q: "Sa makhraj (vende shqiptimi) ka arabishtja?", opts: ["10", "14", "17", "21"], correct: "17" },
      { q: "Shkronjat emphatike (Mufakhkham) janë:", opts: ["ب ت ث ج", "ء ه ع ح", "خ ص ض ط ظ غ ق", "ن م ل ر"], correct: "خ ص ض ط ظ غ ق" },
      { q: "Tafkhim do të thotë:", opts: ["Hollim i zërit", "Trashërim / emphatizim", "Ndalim", "Bashkim"], correct: "Trashërim / emphatizim" },
      { q: "Tarqiq do të thotë:", opts: ["Trashërim", "Vibrim", "Hollim i zërit", "Zgjatje"], correct: "Hollim i zërit" },
      { q: "Shkronja 'Ra' lexohet e trashë kur:", opts: ["Çdoherë", "Vetëm me Kasra", "Me Fatha ose Damma, ose Sukun pas zanore të plotë", "Kurrë"], correct: "Me Fatha ose Damma, ose Sukun pas zanore të plotë" },
      { q: "Madd Arid Lis-Sukun ndodh kur:", opts: ["Para Hamzes", "Gjatë Waqfit (ndalimit)", "Pas Shaddes", "Fillim sureje"], correct: "Gjatë Waqfit (ndalimit)" },
      { q: "Madd Lin — shkronjat e Madd Lin janë:", opts: ["ا و ي me zanore sipër/poshtë", "ي و pa zanore (Fatha para tyre)", "ن م ل", "ق ط ب"], correct: "ي و pa zanore (Fatha para tyre)" },
      { q: "Ibtida do të thotë:", opts: ["Ndalim", "Fillesë e leximit", "Vazhdim", "Hezitim"], correct: "Fillesë e leximit" },
      { q: "Kur sheh ـۚ (Waqf Jaiz), mund të:", opts: ["Ndahesh vetëm aty", "Ndahesh ose vazhdon, por ndalja preferohet", "Ndahesh ose vazhdon, por vazhdimi preferohet", "Nuk mund të ndahesh kurrë"], correct: "Ndahesh ose vazhdon, por ndalja preferohet" },
      { q: "Kur sheh ـۛ (Waqf La Taqif), duhet:", opts: ["Ndalhesh domosdoshmërisht", "Nuk ndalhesh ose ndalesh, por jo midis dy simboleve", "Vazhdon gjithmonë", "Ndalhesh vetëm njëherë"], correct: "Nuk ndalhesh ose ndalesh, por jo midis dy simboleve" },
      { q: "Nun Sakinah është Nun me:", opts: ["Fatha", "Damma", "Kasra", "Sukun ose Tanwin"], correct: "Sukun ose Tanwin" },
      { q: "Meem Sakinah — Ikhfa Shafawi ndodh para:", opts: ["Çdo shkronjës", "ب", "م", "ن"], correct: "ب" },
      { q: "Meem Sakinah — Idgham Shafawi ndodh para:", opts: ["ب", "Çdo shkronjës", "ن", "م"], correct: "م" },
      { q: "Meem Sakinah — Izhar Shafawi ndodh para:", opts: ["ب", "م", "Të gjitha shkronjat tjera", "ن"], correct: "Të gjitha shkronjat tjera" },
      { q: "Hamzat Wasl (ٱ) lexohet:", opts: ["Gjithmonë", "Vetëm kur fillon fjalia", "Kurrë", "Vetëm me Fatha"], correct: "Vetëm kur fillon fjalia" },
      { q: "Hamzat Qat' (أ إ ؤ ئ) lexohet:", opts: ["Vetëm kur fillon fjalia", "Gjithmonë", "Kurrë", "Vetëm me Kasra"], correct: "Gjithmonë" },
      { q: "Shifra '°' mbi shkronjë (Sifr Mustadir) tregon:", opts: ["Zanore e gjatë shtese", "Shkronjë shtesë që nuk lexohet (grafike)", "Vibrim", "Ndalim"], correct: "Shkronjë shtesë që nuk lexohet (grafike)" },
      { q: "Txhuid mësohet me:", opts: ["Vetëm lexim individual", "Dëgjim dhe imitim të Shaihut të kualifikuar", "Vetëm libra", "Vetëm audio"], correct: "Dëgjim dhe imitim të Shaihut të kualifikuar" },
      { q: "Sa rregulla kryesore ka Nun Sakinah + Tanwin?", opts: ["3", "4", "5", "2"], correct: "4" },
      { q: "Cila rregull ka sinjal (◌ۙ) mbi Nun?", opts: ["Idgham", "Ikhfa", "Iqlab", "Izhar"], correct: "Ikhfa" },
      { q: "Shkronja 'Lam' e 'Al' te emri 'Allah' lexohet:", opts: ["Hollë (Tarqiq)", "Trashë (Tafkhim)", "Heshtur", "Dyfishuar"], correct: "Trashë (Tafkhim)" },
      { q: "Cila cilësi (Sifa) ka shkronja 'Qaf'?", opts: ["Hams (heshtje)", "Jahr (zë)", "Shiddah + Jahr + Isti'la", "Tarqiq"], correct: "Shiddah + Jahr + Isti'la" },
      { q: "Waqf Lazim (ـ۩) do të thotë:", opts: ["Ndalja e rekomanduar", "Ndalja e detyrueshme", "Ndalja e lejuar", "Ndalja e ndaluar"], correct: "Ndalja e detyrueshme" },
      { q: "Sifet 'Hams' (frymëmarrje) ka shkronjat:", opts: ["ق ط ب ج د", "ف ح ث ه ش خ ص س ك ت", "ن م ل ر", "ع غ"], correct: "ف ح ث ه ش خ ص س ك ت" },
      { q: "Madd Badal ndodh kur:", opts: ["Hamze vjen para shkronjës Madd", "Shkronja Madd vjen para Hamzes", "Para Waqfit", "Pas Shaddes"], correct: "Hamze vjen para shkronjës Madd" },
      { q: "Libri bazë i Texhuidit quhet:", opts: ["Manzumat Shatibi", "Muqaddimat Al-Jazariyya", "Kenz Al-Maani", "Tayyibat An-Nashr"], correct: "Muqaddimat Al-Jazariyya" },
      { q: "Idgham me Ghunnah ndodh kur Nun Sakinah/Tanwin + ي و ن م pa:", opts: ["Zanore sipër tyre", "Sukun", "Hamze", "Shadde"], correct: "Zanore sipër tyre" },
      { q: "Sifat 'Jahr' (zë) do të thotë:", opts: ["Frymëmarrja rrjedh lirshëm", "Frymëmarrja pengohet gjatë shqiptimit", "Vibrim", "Ndalim"], correct: "Frymëmarrja pengohet gjatë shqiptimit" },
      { q: "Qalqalah ka 2 nivele: Qalqalah e madhe ndodh:", opts: ["Gjatë vazhdimit të leximit", "Gjatë Waqfit (ndalimit)", "Fillim fjalie", "Para Shaddes"], correct: "Gjatë Waqfit (ndalimit)" },
      { q: "Cila shkronjë NUK bën Qalqalah?", opts: ["ق", "ط", "ب", "ن"], correct: "ن" },
      { q: "Madd Silah Kubra zgjat:", opts: ["2 harekë", "4 harekë", "6 harekë", "Sipas leximit"], correct: "4-5 harekë" },
      { q: "Tanwin Fath shkruhet me:", opts: ["Vizë sipër", "Dy viza sipër (◌ً)", "Vizë poshtë", "Pa shenjë"], correct: "Dy viza sipër (◌ً)" },
      { q: "Tanwin Damm shkruhet me:", opts: ["Dy viza sipër", "Dy viza poshtë", "Dy damme (◌ٌ)", "Pa shenjë"], correct: "Dy damme (◌ٌ)" },
      { q: "Tanwin Kasr shkruhet me:", opts: ["Dy viza sipër", "Dy kasra (◌ٍ)", "Dy viza poshtë", "Pa shenjë"], correct: "Dy kasra (◌ٍ)" },
    ]
  },

  kurani: {
    title: "Kuiz Kur'ani", emoji: "📚", timePerQ: 20,
    questions: [
      { q: "Sa sure ka Kur'ani?", opts: ["100", "110", "120", "114"], correct: "114" },
      { q: "Sure Al-Fatiha ka sa ajete?", opts: ["5", "6", "8", "7"], correct: "7" },
      { q: "Sureja e parë e Kur'anit?", opts: ["Al-Baqarah", "Al-Ikhlas", "Al-Nasr", "Al-Fatiha"], correct: "Al-Fatiha" },
      { q: "Cila sure ka 286 ajete?", opts: ["Al-Fatiha", "Ali Imran", "An-Nisa", "Al-Baqarah"], correct: "Al-Baqarah" },
      { q: "Revelata e parë e Kur'anit?", opts: ["Al-Fatiha", "Al-Baqarah", "Al-Ikhlas", "Al-Alaq"], correct: "Al-Alaq" },
      { q: "Sa xhuz ka Kur'ani?", opts: ["20", "25", "114", "30"], correct: "30" },
      { q: "Cila sure quhet 'Zemra e Kur'anit'?", opts: ["Al-Fatiha", "Al-Baqarah", "Al-Mulk", "Ya-Sin"], correct: "Ya-Sin" },
      { q: "Sure Al-Ikhlas ka sa ajete?", opts: ["3", "5", "6", "4"], correct: "4" },
      { q: "Sa ajete ka Kur'ani gjithsej (afërsisht)?", opts: ["5000", "7000", "8000", "6236"], correct: "6236" },
      { q: "Kur u kompletua shpallja e Kur'anit?", opts: ["5 AH", "10 AH", "30 vjet", "23 vjet"], correct: "23 vjet" },
      { q: "Cila sure quhet 'Umm Al-Quran'?", opts: ["Al-Baqarah", "Ya-Sin", "Al-Ikhlas", "Al-Fatiha"], correct: "Al-Fatiha" },
      { q: "Ku ndodhet Ajetu'l-Kursi?", opts: ["Al-Fatiha", "Al-Ikhlas", "Al-Mulk", "Al-Baqarah 255"], correct: "Al-Baqarah 255" },
      { q: "Sure Al-Mulk ka sa ajete?", opts: ["25", "28", "32", "30"], correct: "30" },
      { q: "Sureja e fundit kronologjikisht?", opts: ["An-Nas", "Al-Ikhlas", "Al-Ma'idah", "An-Nasr"], correct: "An-Nasr" },
      { q: "Sure Al-Kahf ka sa ajete?", opts: ["100", "120", "108", "110"], correct: "110" },
      { q: "Sure Ar-Rahman ka sa ajete?", opts: ["60", "70", "85", "78"], correct: "78" },
      { q: "Sure Al-Baqarah dhe Al-Fatiha bashkë kanë:", opts: ["289 ajete", "291 ajete", "295 ajete", "293 ajete"], correct: "293 ajete" },
      { q: "Cila sure ka vetëm 3 ajete?", opts: ["Al-Ikhlas", "An-Nasr", "Al-Kawthar", "Al-Falaq"], correct: "Al-Kawthar" },
      { q: "Sure An-Nas ka sa ajete?", opts: ["4", "5", "7", "6"], correct: "6" },
      { q: "Sure Al-Falaq ka sa ajete?", opts: ["4", "6", "7", "5"], correct: "5" },
      { q: "Sure Al-'Asr ka sa ajete?", opts: ["2", "4", "5", "3"], correct: "3" },
      { q: "Sure Al-Qadr ka sa ajete?", opts: ["4", "6", "7", "5"], correct: "5" },
      { q: "Cila sure i kushtohet profetit Jusufit?", opts: ["Sure Yunus", "Sure Ibrahim", "Sure Hud", "Sure Yusuf"], correct: "Sure Yusuf" },
      { q: "Cila sure quhet 'Mbrojtëse nga syhakësia'?", opts: ["Al-Fatiha", "Al-Ikhlas", "Al-Baqarah", "Al-Falaq dhe An-Nas"], correct: "Al-Falaq dhe An-Nas" },
      { q: "Sure Ash-Shu'ara ka sa ajete?", opts: ["200", "210", "220", "227"], correct: "227" },
      { q: "Sure Al-Qiyamah ka sa ajete?", opts: ["35", "38", "42", "40"], correct: "40" },
      { q: "Cila sure quhet 'Sura e Shpellës'?", opts: ["Al-Fatiha", "Al-Baqarah", "Al-Kahf", "Ya-Sin"], correct: "Al-Kahf" },
      { q: "Sa sure Mekase ka Kur'ani (afërsisht)?", opts: ["Rreth 86", "Rreth 100", "Rreth 50", "Rreth 60"], correct: "Rreth 86" },
      { q: "Sureja 'An-Naba' kupton:", opts: ["Hëna", "Ylli", "Tërmeti", "Lajmi / Xhabri"], correct: "Lajmi / Xhabri" },
      { q: "Sure An-Naba ka sa ajete?", opts: ["35", "50", "46", "40"], correct: "40" },
      { q: "Sure Al-Insan (Njeriu) ka sa ajete?", opts: ["25", "28", "35", "31"], correct: "31" },
      { q: "Cila sure ka ajetet ذَٰلِكَ الْكِتَابُ (Ky është Libri)?", opts: ["Al-Fatiha", "Al-Kahf", "Ya-Sin", "Al-Baqarah"], correct: "Al-Baqarah" },
      { q: "Sure Al-Hajj ka sa ajete?", opts: ["60", "70", "80", "78"], correct: "78" },
      { q: "Cila sure quhet 'Zemra e Kur'anit' (tjetër emër)?", opts: ["Al-Fatiha", "Ya-Sin", "Al-Baqarah", "Al-Ikhlas"], correct: "Ya-Sin" },
      { q: "Sure Muhammad ka sa ajete?", opts: ["30", "35", "40", "38"], correct: "38" },
      { q: "Sure Al-Fath ka sa ajete?", opts: ["25", "28", "32", "29"], correct: "29" },
      { q: "Sure Al-Hujurat ka sa ajete?", opts: ["15", "18", "20", "22"], correct: "18" },
      { q: "Cila sure ka temën e Tevhidit (monoteizmit) si qendër?", opts: ["Al-Fatiha", "Al-Baqarah", "Al-Kafirun", "Al-Ikhlas"], correct: "Al-Ikhlas" },
      { q: "Sure Al-Buruj ka sa ajete?", opts: ["18", "20", "22", "25"], correct: "22" },
      { q: "Sureja Al-Tariq ka sa ajete?", opts: ["13", "15", "17", "20"], correct: "17" },
      { q: "Sure Al-A'la ka sa ajete?", opts: ["15", "17", "19", "21"], correct: "19" },
      { q: "Cila sure ka ajetin 'Allahu Akbar' si temë qendrore?", opts: ["Al-Fatiha", "Al-Kafirun", "Al-Baqarah", "Al-Ghashiyah"], correct: "Al-Ghashiyah" },
      { q: "Cila sure ka ajetet 'Kull an-Nafsin dha'iqatul-mawt'?", opts: ["Al-Baqarah", "Al-Kahf", "Al-Imran", "Al-Ankabut"], correct: "Al-Imran" },
      { q: "Sa sure fillojnë me 'Qul' (thuaj)?", opts: ["2", "3", "4", "5"], correct: "4" },
      { q: "Suret 'Muawwidhatain' (mbrojtëset) janë:", opts: ["Al-Fatiha + Al-Ikhlas", "Al-Ikhlas + Al-Falaq", "Al-Falaq + An-Nas", "An-Nas + Al-Ikhlas"], correct: "Al-Falaq + An-Nas" },
      { q: "Sure Al-Ahzab ka sa ajete?", opts: ["60", "70", "75", "73"], correct: "73" },
      { q: "Sure An-Nisa ka sa ajete?", opts: ["150", "160", "170", "176"], correct: "176" },
      { q: "Sure Ali Imran ka sa ajete?", opts: ["180", "190", "200", "210"], correct: "200" },
      { q: "Sure Ash-Shams ka sa ajete?", opts: ["12", "14", "16", "15"], correct: "15" },
      { q: "Sure Al-Layl ka sa ajete?", opts: ["18", "20", "22", "21"], correct: "21" },
      { q: "Sure Ad-Duha ka sa ajete?", opts: ["9", "11", "13", "15"], correct: "11" },
      { q: "Sure Ash-Sharh ka sa ajete?", opts: ["6", "7", "8", "9"], correct: "8" },
      { q: "Sure At-Tin ka sa ajete?", opts: ["6", "7", "8", "9"], correct: "8" },
      { q: "Sure Al-Alaq ka sa ajete?", opts: ["15", "17", "19", "21"], correct: "19" },
      { q: "Cila sure quhet 'Mbreti i Kur'anit'?", opts: ["Al-Fatiha", "Al-Ikhlas", "Al-Mulk", "Ya-Sin"], correct: "Al-Mulk" },
      { q: "Profeti Isa (Isai) përmendet shumë në suren:", opts: ["Al-Baqarah", "An-Nisa", "Al-Ma'idah", "Maryam"], correct: "Maryam" },
      { q: "Sure Al-Jumu'ah ka sa ajete?", opts: ["8", "9", "10", "11"], correct: "11" },
      { q: "Sure Al-Munafiqun ka sa ajete?", opts: ["9", "10", "11", "12"], correct: "11" },
      { q: "Ajet As-Sajdah (ajet sexhdeje) — sa gjithsej?", opts: ["10", "12", "14", "15"], correct: "14" },
      { q: "Cila sure ka ajetet e 'Shtatë të Dyfishtave' (Saba Mathani)?", opts: ["Al-Baqarah", "Ya-Sin", "Al-Fatiha", "Al-Ikhlas"], correct: "Al-Fatiha" },
      { q: "Sure Al-Fil ka sa ajete?", opts: ["3", "4", "5", "6"], correct: "5" },
      { q: "Sure Quraysh ka sa ajete?", opts: ["3", "4", "5", "6"], correct: "4" },
    ]
  },

  lojera_numra: {
    title: "Kuiz Numrat & Matematika", emoji: "🔢", timePerQ: 15,
    questions: [
      { q: "Si shkruhet numri 1 shqip?", opts: ["dy", "tre", "katër", "një"], correct: "një" },
      { q: "Si shkruhet numri 2 anglisht?", opts: ["one", "three", "four", "two"], correct: "two" },
      { q: "Numri arab 'واحد' është?", opts: ["2", "3", "4", "1"], correct: "1" },
      { q: "Sa është 5 + 3?", opts: ["7", "9", "6", "8"], correct: "8" },
      { q: "Sa është 7 + 4?", opts: ["10", "12", "9", "11"], correct: "11" },
      { q: "Si quhet numri rreshtor i 1-it shqip?", opts: ["i dytë", "i tretë", "i katërt", "i parë"], correct: "i parë" },
      { q: "Si quhet numri rreshtor i 1-it anglisht?", opts: ["second", "third", "fourth", "first"], correct: "first" },
      { q: "Numri arab 'عَشَرَة' është?", opts: ["5", "8", "20", "10"], correct: "10" },
      { q: "Sa është 9 + 9?", opts: ["16", "17", "19", "18"], correct: "18" },
      { q: "Si shkruhet 100 shqip?", opts: ["njëzet", "dhjetë", "dyqind", "njëqind"], correct: "njëqind" },
      { q: "Sa është 12 × 3?", opts: ["34", "38", "40", "36"], correct: "36" },
      { q: "Sa është 100 ÷ 4?", opts: ["20", "30", "10", "25"], correct: "25" },
      { q: "Sa është 15 - 7?", opts: ["6", "9", "10", "8"], correct: "8" },
      { q: "Sa është 6 × 6?", opts: ["30", "42", "32", "36"], correct: "36" },
      { q: "Sa është 48 ÷ 6?", opts: ["6", "9", "10", "8"], correct: "8" },
      { q: "Sa është 25 + 37?", opts: ["52", "60", "72", "62"], correct: "62" },
      { q: "Sa është 100 - 33?", opts: ["57", "77", "87", "67"], correct: "67" },
      { q: "Numri 'fifteen' anglisht = ?", opts: ["14", "16", "17", "15"], correct: "15" },
      { q: "Numri 'twenty' anglisht = ?", opts: ["12", "22", "10", "20"], correct: "20" },
      { q: "Numri arab 'خَمْسَةَ عَشَرَ' = ?", opts: ["14", "16", "17", "15"], correct: "15" },
      { q: "Sa është 7 × 8?", opts: ["48", "54", "60", "56"], correct: "56" },
      { q: "Sa është 9 × 9?", opts: ["72", "80", "82", "81"], correct: "81" },
      { q: "Sa është 144 ÷ 12?", opts: ["11", "13", "14", "12"], correct: "12" },
      { q: "Sa është 3² + 4² (shuma e katrorëve)?", opts: ["20", "24", "28", "25"], correct: "25" },
      { q: "Numri i fundit para 100?", opts: ["98", "100", "101", "99"], correct: "99" },
      { q: "Sa është 1000 - 1?", opts: ["900", "998", "1001", "999"], correct: "999" },
      { q: "Sa është gjysma e 80?", opts: ["20", "60", "45", "40"], correct: "40" },
      { q: "Sa është 1/4 e 100?", opts: ["20", "50", "10", "25"], correct: "25" },
      { q: "Numri çift (even) nga këta?", opts: ["7", "9", "11", "14"], correct: "14" },
      { q: "Numri tek (odd) nga këta?", opts: ["8", "12", "16", "17"], correct: "17" },
      { q: "Sa është 5³ (5 në fuqi 3)?", opts: ["15", "125", "75", "25"], correct: "125" },
      { q: "Numri arab 'أَرْبَعُونَ' = ?", opts: ["14", "24", "30", "40"], correct: "40" },
      { q: "Numri arab 'تِسْعُونَ' = ?", opts: ["19", "80", "70", "90"], correct: "90" },
      { q: "Sa është 11 × 11?", opts: ["111", "112", "122", "121"], correct: "121" },
      { q: "Si shkruhet 1000 shqip?", opts: ["njëqind", "dhjetëmijë", "një milion", "njëmijë"], correct: "njëmijë" },
      { q: "Sa ditë ka viti i thjeshtë?", opts: ["355", "364", "366", "365"], correct: "365" },
      { q: "Sa ditë ka viti i brishtë?", opts: ["365", "365", "364", "366"], correct: "366" },
      { q: "Sa muaj ka viti?", opts: ["10", "11", "13", "12"], correct: "12" },
      { q: "Sa javë ka viti (afërsisht)?", opts: ["48", "50", "54", "52"], correct: "52" },
      { q: "Sa orë ka dita?", opts: ["20", "22", "26", "24"], correct: "24" },
      { q: "Sa minuta ka ora?", opts: ["50", "100", "30", "60"], correct: "60" },
      { q: "Sa sekonda ka minuta?", opts: ["100", "30", "60", "120"], correct: "60" },
      { q: "Sa cm është 1 metër?", opts: ["10", "50", "1000", "100"], correct: "100" },
      { q: "Sa cm është 1 km?", opts: ["1000 m = 100 000 cm", "10 000 cm", "1 000 cm", "100 000 cm"], correct: "100 000 cm" },
      { q: "Sa gram ka 1 kilogram?", opts: ["100", "500", "1 000", "10 000"], correct: "1 000" },
      { q: "Sa është 50% e 200?", opts: ["50", "150", "25", "100"], correct: "100" },
      { q: "Sa është 10% e 350?", opts: ["30", "50", "25", "35"], correct: "35" },
      { q: "Sa është perimetri i katrori me anë 5?", opts: ["10", "15", "25", "20"], correct: "20" },
      { q: "Sa është sipërfaqja e katrori me anë 5?", opts: ["10", "20", "30", "25"], correct: "25" },
      { q: "Sa është sipërfaqja e drejtkëndëshit 4×6?", opts: ["20", "28", "10", "24"], correct: "24" },
      { q: "Sa ditë ka muaji shkurt (vit i thjeshtë)?", opts: ["28", "29", "30", "31"], correct: "28" },
      { q: "Sa ditë ka muaji janar?", opts: ["28", "29", "30", "31"], correct: "31" },
      { q: "Numri kryesor (prime) nga këta?", opts: ["4", "6", "9", "7"], correct: "7" },
      { q: "Sa është shumëfishi i 7 pas 7×1?", opts: ["7, 14, 21, 28...", "7, 14, 22, 28...", "7, 14, 20, 27...", "7, 13, 21, 28..."], correct: "7, 14, 21, 28..." },
      { q: "Si quhet numri 'zero' arabisht?", opts: ["واحد", "اثنان", "عَشَرَة", "صِفْر"], correct: "صِفْر" },
      { q: "Sa është -5 + 10?", opts: ["15", "-5", "0", "5"], correct: "5" },
      { q: "Sa është -3 - 4?", opts: ["1", "-1", "7", "-7"], correct: "-7" },
      { q: "Cilat numra janë të plotë (integers)?", opts: ["Vetëm pozitivë", "Vetëm negativ", "Vetëm 0", "Pozitivë, negativë dhe 0"], correct: "Pozitivë, negativë dhe 0" },
      { q: "Sa është √25?", opts: ["5", "6", "15", "125"], correct: "5" },
      { q: "Sa është √144?", opts: ["10", "14", "13", "12"], correct: "12" },
      { q: "Sa është 2⁸ (2 në fuqi 8)?", opts: ["64", "128", "512", "256"], correct: "256" },
    ]
  },

  umra_haxh: {
    title: "Kuiz Umra & Haxhi", emoji: "🕋", timePerQ: 20,
    questions: [
      { q: "Sa hapa ka Umra?", opts: ["3", "4", "6", "5"], correct: "5" },
      { q: "Shtylla kryesore e Haxhit?", opts: ["Tavafi", "Sa'ji", "Ihrami", "Qëndrimi në Arafat"], correct: "Qëndrimi në Arafat" },
      { q: "Sa herë rrotullohet Qabeja (Tavafi)?", opts: ["5", "6", "8", "7"], correct: "7" },
      { q: "Cila ditë është 'Dita e Arafatit'?", opts: ["7 Dhul-Hixhe", "8 Dhul-Hixhe", "10 Dhul-Hixhe", "9 Dhul-Hixhe"], correct: "9 Dhul-Hixhe" },
      { q: "Sa ecje ka Sa'ji?", opts: ["5", "6", "8", "7"], correct: "7" },
      { q: "Ku mblidhen gurët për Xhemrat?", opts: ["Mina", "Arafat", "Meka", "Muzdelifa"], correct: "Muzdelifa" },
      { q: "Sa gurë hidhen në Xhemrat e Akabe (ditën e pare Bajramit)?", opts: ["3", "5", "10", "7"], correct: "7" },
      { q: "Nga fillon Sa'ji?", opts: ["Merva", "Qabeja", "Makam Ibrahimi", "Safa"], correct: "Safa" },
      { q: "Ku mbaron Sa'ji?", opts: ["Safa", "Qabeja", "Merva", "Makam Ibrahimi"], correct: "Merva" },
      { q: "Si quhet Tavafi i fundit para largimit?", opts: ["Tavafi i Kudum", "Tavafi i Ifadës", "Tavafi i Rritjes", "Tavafi i Vedas"], correct: "Tavafi i Vedas" },
      { q: "Ihrama hyjnë nga:", opts: ["Qabeja", "Safa", "Miqati", "Arafati"], correct: "Miqati" },
      { q: "Çfarë ndalohet gjatë Ihramit?", opts: ["Namazi", "Udhëtimi", "Therja e kafshëve", "Prerja e thonjëve dhe flokëve"], correct: "Prerja e thonjëve dhe flokëve" },
      { q: "Cila sure lexohet te Makam Ibrahimi?", opts: ["Fatiha + Bakara", "Jasin + Mulk", "Nas + Felak", "Kafirun + Ihlas"], correct: "Kafirun + Ihlas" },
      { q: "Sa nate ndalohen haxhilerët në Mina?", opts: ["1 natë", "2 netë", "4 netë", "3 netë"], correct: "3 netë" },
      { q: "Ditët e Tashriq janë:", opts: ["7, 8, 9 Dhul-Hixhe", "9, 10, 11 Dhul-Hixhe", "11, 12, 13 Dhul-Hixhe", "10, 11, 12 Dhul-Hixhe"], correct: "11, 12, 13 Dhul-Hixhe" },
      { q: "Cila ditë është 'Ditë e Therjes' (Bajrami)?", opts: ["8 Dhul-Hixhe", "9 Dhul-Hixhe", "11 Dhul-Hixhe", "10 Dhul-Hixhe"], correct: "10 Dhul-Hixhe" },
      { q: "Qabeja ndodhet në:", opts: ["Medine", "Arafat", "Mina", "Meke"], correct: "Meke" },
      { q: "Makam Ibrahimi është:", opts: ["Guri ku ka qëndruar Ismaili", "Guri ku ka qëndruar Ibrahimi gjatë ndërtimit të Kabes", "Këndi i Kabes", "Derë e Kabes"], correct: "Guri ku ka qëndruar Ibrahimi gjatë ndërtimit të Kabes" },
      { q: "Çfarë është Hatimi (Hijri Ismail)?", opts: ["Gurë i Zezë", "Derë e Kabes", "Hapja e vogël rrethore afër Kabes", "Stërvitja e Ibrahimit"], correct: "Hapja e vogël rrethore afër Kabes" },
      { q: "Guri i Zezë (Haxharul Esved) ndodhet:", opts: ["Këndi Jemenitas", "Këndi Irakas", "Këndi Sirianas", "Këndi Irakis (Aswad)"], correct: "Këndi Irakis (Aswad)" },
      { q: "Sa xhemra (shtylca gurësh) ka Mina?", opts: ["2", "4", "5", "3"], correct: "3" },
      { q: "Xhemrat quhen:", opts: ["Sugra, Vusta, Ulma", "Safa, Merva, Mina", "Sugra, Vusta, Akabe (Kubra)", "Xhemra 1, 2, 3"], correct: "Sugra, Vusta, Akabe (Kubra)" },
      { q: "Tavafi i Ifadës (Ziyarah) bëhet:", opts: ["Para Arafatit", "Natën e Muzdelifës", "Ditën e 10 Dhul-Hixhe ose pas", "Ditën e 8 Dhul-Hixhe"], correct: "Ditën e 10 Dhul-Hixhe ose pas" },
      { q: "Leshimi i kokës (Halq/Taqsir) bëhet:", opts: ["Fillim Haxhi", "Pas Sa'jit të Umrës ose Haxhit", "Para Tavafi Kudum", "Pas Arafatit — pika e parë e daljes nga Ihram"], correct: "Pas Arafatit — pika e parë e daljes nga Ihram" },
      { q: "Cila kafshë mund të theret si Hadji?", opts: ["Lopë vetëm", "Dele ose dhi (1/1), lopë ose deve (1/7)", "Pula", "Çfarëdo kafshe"], correct: "Dele ose dhi (1/1), lopë ose deve (1/7)" },
      { q: "Ifrad do të thotë:", opts: ["Haxh + Umre bashkë", "Vetëm Umre", "Vetëm Haxh", "Haxh + Umre me ndërprerje"], correct: "Vetëm Haxh" },
      { q: "Tamattu' do të thotë:", opts: ["Vetëm Haxh", "Vetëm Umre", "Haxh + Umre pa ndalesë — Umre fillimisht, pastaj Haxh", "Haxh + Umre bashkë gjithmonë"], correct: "Haxh + Umre pa ndalesë — Umre fillimisht, pastaj Haxh" },
      { q: "Qiran do të thotë:", opts: ["Vetëm Haxh", "Vetëm Umre", "Umra + Haxh bashkë me 1 Ihram", "Umra pa Haxh"], correct: "Umra + Haxh bashkë me 1 Ihram" },
      { q: "Mesxhidi Haram ndodhet në:", opts: ["Medine", "Mina", "Muzdelifa", "Meke"], correct: "Meke" },
      { q: "Mesxhidi Nabawi ndodhet në:", opts: ["Meke", "Arafat", "Mina", "Medine"], correct: "Medine" },
      { q: "Mesxhidi Aksa ndodhet në:", opts: ["Meke", "Medine", "Egjypt", "Kuds (Jerusalem)"], correct: "Kuds (Jerusalem)" },
      { q: "Safwan — lufta e cila?", opts: ["Bedr", "Uhud", "Badr + Uhud", "Khandaq"], correct: "Khandaq" },
      { q: "Cila duà lexohet duke filluar Tavafin?", opts: ["Bismillah", "Allahu Akbar + Lailahe illallah", "Subhanallah", "Alhamdulillah"], correct: "Allahu Akbar + Lailahe illallah" },
      { q: "Duaja e Safa-Mervas (Sa'ji):", opts: ["Fatiha", "Alhamdulillah", "Sadakallahal Adhim", "Inne Safa wal Marwata min sha'airil'llah"], correct: "Inne Safa wal Marwata min sha'airil'llah" },
      { q: "Sa Miqate (stacione Ihrami) ka gjithsej?", opts: ["3", "4", "6", "5"], correct: "5" },
      { q: "Miqati i shqiptarëve dhe europianëve (duke ardhur nga Egjypt)?", opts: ["Yalamlam", "Zat Irq", "Qarn al-Manazil", "Rabigh / Juhfa"], correct: "Rabigh / Juhfa" },
      { q: "Cila ditë Haxhilerët qëndrojnë në Muzdelifa?", opts: ["7-8 Dhul-Hixhe", "8-9 Dhul-Hixhe", "10-11 Dhul-Hixhe", "Natën e 9-10 Dhul-Hixhe"], correct: "Natën e 9-10 Dhul-Hixhe" },
      { q: "Cili hap i Umrës bëhet i pari?", opts: ["Sa'ji", "Leshimi", "Tavafi", "Ihrami"], correct: "Ihrami" },
      { q: "Cili është hapi i fundit i Umrës?", opts: ["Ihrami", "Tavafi", "Sa'ji", "Leshimi i flokëve"], correct: "Leshimi i flokëve" },
      { q: "Sa herë muslimani duhet bërë Haxhin gjatë jetës?", opts: ["Çdo vit", "5 herë", "Kurrë", "1 herë (kur të ket mundësi)"], correct: "1 herë (kur të ket mundësi)" },
      { q: "Umra është:", opts: ["Farz si Haxhi", "Sunnet Muakkedeh (e fortë)", "Haram", "Mubah"], correct: "Sunnet Muakkedeh (e fortë)" },
      { q: "Pse Haxhi quhet 'shtyllë e Islamit'?", opts: ["Kur'an 3:97 — është obligim për të aftët", "Hadith vetëm", "Konsensus shkollash", "S'ka argument"], correct: "Kur'an 3:97 — është obligim për të aftët" },
      { q: "Çfarë ndodh kur dikush lë Arafatin pa qëndruar?", opts: ["Haxhi është i kufizuar", "Haxhi është i vlefshëm", "Haxhi është i vlefshëm por me Keffareh", "Haxhi anullohet"], correct: "Haxhi anullohet" },
      { q: "Ihram i gruas ndryshon nga i burrit si:", opts: ["Gjithnjë me çarçaf", "Nuk mban qeleshe", "Fytyrën dhe duart mund t'i mbajë të hapura", "Nuk i lejohet Tavafi"], correct: "Fytyrën dhe duart mund t'i mbajë të hapura" },
      { q: "Talbia lexohet:", opts: ["Vetëm fillim Haxhi", "Nga Ihrami deri në hedhjen e gurëve te Akabe", "Vetëm Muzdelifa", "Vetëm Arafat"], correct: "Nga Ihrami deri në hedhjen e gurëve te Akabe" },
      { q: "Talbia fillon me:", opts: ["Allahu Akbar", "Bismillah", "Subhanallah", "Lebbejk Allahumme Lebbejk"], correct: "Lebbejk Allahumme Lebbejk" },
      { q: "'Reml' do të thotë:", opts: ["Ecje e ngadaltë", "Ecje e shpejtë me lëkundje shpatullash (3 rrethet e para Tavafi)", "Vrapim", "Qëndrim"], correct: "Ecje e shpejtë me lëkundje shpatullash (3 rrethet e para Tavafi)" },
      { q: "'Idhtiba' do të thotë:", opts: ["Mbuloj tërë trupin", "Nxjerr krahun e djathtë nga Ihrama", "Vesh rroba speciale", "Hiq Ihramën"], correct: "Nxjerr krahun e djathtë nga Ihrama" },
      { q: "Cili vend quhet 'Urdhi Mash'ar'?", opts: ["Arafat", "Mina", "Muzdelifa", "Safa-Merva"], correct: "Muzdelifa" },
      { q: "Haxhilerët hidhen gurë çdo ditë në:", opts: ["Arafat", "Safa dhe Merva", "Xhemrat e Minës", "Mesxhidul Haram"], correct: "Xhemrat e Minës" },
      { q: "Sa gurë hidhen gjithsej gjatë Haxhit (4 ditë)?", opts: ["49", "60", "42", "70"], correct: "49" },
      { q: "Cili Miqat është i muslimanëve që vijnë nga Iraku?", opts: ["Yalamlam", "Qarn al-Manazil", "Zat Irq", "Juhfa"], correct: "Zat Irq" },
      { q: "Cili Miqat është i Medinasve?", opts: ["Yalamlam", "Qarn al-Manazil", "Zat Irq", "Dhul-Hulayfah (Abyar Ali)"], correct: "Dhul-Hulayfah (Abyar Ali)" },
      { q: "Haxhi bëhet cila muaj?", opts: ["Ramazan", "Shevval", "Muharrem", "Dhul-Hixhe"], correct: "Dhul-Hixhe" },
      { q: "Haxhi fillon ditën:", opts: ["1 Dhul-Hixhe", "5 Dhul-Hixhe", "10 Dhul-Hixhe", "8 Dhul-Hixhe"], correct: "8 Dhul-Hixhe" },
      { q: "Guri i Zezë është i shenjtë sepse:", opts: ["Është gur i veçantë kimik", "Ka ngjyrë të zezë", "Ka prejardhje nga Xhenneti (sipas hadithit)", "Është ndërtuar nga Ibrahimi"], correct: "Ka prejardhje nga Xhenneti (sipas hadithit)" },
      { q: "Profetit ﷺ i thuhet: Haxhin e bëri vetëm:", opts: ["2 herë", "3 herë", "5 herë", "1 herë (Haxhul Veda — 632 AD)"], correct: "1 herë (Haxhul Veda — 632 AD)" },
      { q: "Haxhul Veda (Lamtumira) ndodhi vitin:", opts: ["620 AD", "625 AD", "630 AD", "632 AD"], correct: "632 AD" },
    ]
  }
};

function awardPoints(pts, module, note) {
  // No-op: points system not connected here
}

export default function QuizGame({ gameId, quizKey: quizKeyProp, onClose }) {
  const quizKey = quizKeyProp || {
    8: "alphabeti_shqip", 9: "alfabeti_anglisht", 10: "alfabeti_arab",
    13: "texhuidi", 14: "texhuidi", 19: "texhuidi",
    15: "kurani", 16: "kurani", 20: "kurani",
    17: "umra_haxh", 18: "umra_haxh", 21: "umra_haxh", 22: "umra_haxh", 28: "umra_haxh",
    2: "lojera_numra", 7: "lojera_numra", 25: "lojera_numra",
  }[gameId] || "kurani";

  const data = QUIZ_DATA[quizKey] || QUIZ_DATA["kurani"];
  const [questions] = useState(() => [...data.questions].sort(() => Math.random() - 0.5));

  const [phase, setPhase] = useState("start");
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timer, setTimer] = useState(data.timePerQ);
  const [totalTime, setTotalTime] = useState(0);
  const stateRef = useRef({ answered: null, idx: 0, phase: "start", questions });
  stateRef.current = { answered, idx, phase, questions };

  useEffect(() => {
    if (phase !== "playing") return;
    setTimer(data.timePerQ);
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          // Time's up — answer null if not already answered
          if (stateRef.current.answered === null && stateRef.current.phase === "playing") {
            const q = stateRef.current.questions[stateRef.current.idx];
            const result = { selected: null, correct: q.correct, isCorrect: false };
            setAnswered(result);
            setStreak(0);
            setTimeout(() => {
              const nextIdx = stateRef.current.idx + 1;
              if (nextIdx >= stateRef.current.questions.length) { setPhase("done"); return; }
              setIdx(nextIdx);
              setTimer(data.timePerQ);
              setAnswered(null);
            }, 1200);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, idx]);

  useEffect(() => {
    if (phase !== "playing") return;
    const t = setInterval(() => setTotalTime(p => p + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const handleAnswer = useCallback((opt) => {
    if (stateRef.current.answered !== null) return;
    const q = stateRef.current.questions[stateRef.current.idx];
    const isCorrect = opt === q.correct;
    const result = { selected: opt, correct: q.correct, isCorrect };
    setAnswered(result);
    if (isCorrect) {
      setScore(s => s + 1);
      setStreak(s => { const ns = s + 1; setMaxStreak(m => Math.max(m, ns)); return ns; });
    } else {
      setStreak(0);
    }
    setTimeout(() => {
      const nextIdx = stateRef.current.idx + 1;
      if (nextIdx >= stateRef.current.questions.length) { setPhase("done"); return; }
      setIdx(nextIdx);
      setTimer(data.timePerQ);
      setAnswered(null);
    }, 1200);
  }, [data.timePerQ]);

  const restart = () => {
    setAnswered(null); setIdx(0); setScore(0);
    setStreak(0); setMaxStreak(0); setTimer(data.timePerQ);
    setTotalTime(0); setPhase("start");
  };

  const pct = Math.round((score / questions.length) * 100);
  const timerPct = (timer / data.timePerQ) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-t-3xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div><p className="text-2xl">{data.emoji}</p><h2 className="font-bold text-lg">{data.title}</h2></div>
            <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold">✕</button>
          </div>
        </div>

        {phase === "start" && (
          <div className="p-8 text-center space-y-4">
            <div className="text-6xl mb-2">{data.emoji}</div>
            <h3 className="text-xl font-bold text-gray-900">{data.title}</h3>
            <div className="grid grid-cols-3 gap-3 my-4">
              {[
                { label: "Pyetje", val: questions.length, icon: "❓" },
                { label: "Kohë/Pyetje", val: `${data.timePerQ}s`, icon: "⏱️" },
                { label: "Niveli", val: "Kuiz", icon: "🎯" },
              ].map(s => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xl">{s.icon}</p>
                  <p className="font-bold text-gray-900">{s.val}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
            <button onClick={() => { setPhase("playing"); setTimer(data.timePerQ); }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg">
              🚀 Fillo Kuizin
            </button>
          </div>
        )}

        {phase === "playing" && (
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-600">{idx + 1}/{questions.length}</span>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold ${timer <= 5 ? "bg-red-100 text-red-600 animate-pulse" : timer <= 10 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                <Timer className="w-4 h-4" /> {timer}s
              </div>
              <div className="flex items-center gap-1 text-amber-600 font-bold">
                <Zap className="w-4 h-4" /> {streak}x
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="h-2 rounded-full transition-all duration-1000"
                style={{ width: `${timerPct}%`, background: timer <= 5 ? "#ef4444" : timer <= 10 ? "#f59e0b" : "#10b981" }} />
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${(idx / questions.length) * 100}%` }} />
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
                <p className="font-bold text-gray-900 text-lg text-center leading-relaxed">{questions[idx].q}</p>
              </motion.div>
            </AnimatePresence>
            <div className="grid grid-cols-1 gap-2">
              {questions[idx].opts.map((opt) => {
                let cls = "border-2 border-gray-200 bg-white hover:border-emerald-400 hover:bg-emerald-50 text-gray-800";
                if (answered) {
                  if (opt === answered.correct) cls = "border-2 border-emerald-500 bg-emerald-50 text-emerald-800";
                  else if (opt === answered.selected && !answered.isCorrect) cls = "border-2 border-red-400 bg-red-50 text-red-700";
                  else cls = "border-2 border-gray-100 bg-gray-50 text-gray-400";
                }
                return (
                  <button key={opt} onClick={() => handleAnswer(opt)} disabled={!!answered}
                    className={`p-3.5 rounded-xl text-left font-semibold text-sm transition-all flex items-center justify-between ${cls}`}>
                    {opt}
                    {answered && opt === answered.correct && <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />}
                    {answered && opt === answered.selected && !answered.isCorrect && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span>✓ {score} të sakta</span>
              <span>•</span>
              <span>⏱️ {Math.floor(totalTime / 60)}:{String(totalTime % 60).padStart(2, "0")}</span>
            </div>
          </div>
        )}

        {phase === "done" && (
          <div className="p-8 text-center space-y-4">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
              <Trophy className="w-16 h-16 text-amber-400 mx-auto" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900">Kuizi Mbaroi!</h3>
            <div className={`text-6xl font-extrabold ${pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : "text-red-500"}`}>{pct}%</div>
            <p className="text-gray-600">{score} nga {questions.length} të sakta</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Pikë", val: score * 10, icon: "⭐" },
                { label: "Stria Max", val: maxStreak, icon: "⚡" },
                { label: "Koha", val: `${Math.floor(totalTime / 60)}:${String(totalTime % 60).padStart(2, "0")}`, icon: "⏱️" },
              ].map(s => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xl">{s.icon}</p>
                  <p className="font-bold text-gray-900">{s.val}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700">
                {pct >= 90 ? "🏆 Shkëlqyeshëm! Ekspert i vërtetë!" :
                 pct >= 70 ? "👍 Shumë mirë! Vazhdo kështu!" :
                 pct >= 50 ? "💪 Mirë! Mund ta bësh edhe më mirë!" :
                 "📚 Studjoi edhe pak dhe provo sërish!"}
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={restart} className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700">
                🔄 Provo Sërish
              </button>
              <button onClick={onClose} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50">
                ✕ Mbyll
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}