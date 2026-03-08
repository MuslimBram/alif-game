import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timer, Trophy, CheckCircle, XCircle, RotateCcw } from "lucide-react";

const FIKH_QUESTIONS = [
  // Akide
  { q: "Cilat janë 3 Parimet e Islamit?", opts: ["Allah, Engjëjt, Kur'ani", "Allahu, Feja, Profeti ﷺ", "Islami, Imani, Ihsani", "5 Shtyllat"], correct: "Allahu, Feja, Profeti ﷺ" },
  { q: "Cilat janë 5 Shtyllat e Islamit?", opts: ["Namaz, Zekat, Haxh, Saum, Dua", "Shehadet, Namaz, Zekat, Saum, Haxh", "Shehadet, Namaz, Sadaka, Umre, Haxh", "Besim, Namaz, Zekat, Haxh, Saum"], correct: "Shehadet, Namaz, Zekat, Saum, Haxh" },
  { q: "Cilat janë 6 Kushtet e Imanit?", opts: ["Allah, Engjëjt, Librat, Profetët, Kijameti, Kaderi", "Allah, Njeriu, Xhenneti, Xhehennemi, Kijameti, Kaderi", "Islam, Iman, Ihsan, Taqva, Sabr, Shukr", "6 Parimet e Kur'anit"], correct: "Allah, Engjëjt, Librat, Profetët, Kijameti, Kaderi" },
  { q: "Çfarë do të thotë 'Tevhid'?", opts: ["Besim në engjëjt", "Besim në profetët", "Njëshmëria e Allahut — Ai është Një", "Besim në Kader"], correct: "Njëshmëria e Allahut — Ai është Një" },
  { q: "Cili Kur'an ajet flet për 5 Shtyllat?", opts: ["Kur'an 2:183", "Kur'an 3:97 (Haxhi), 2:43 (Namazi), 9:103 (Zekati), 2:183 (Agjërimi), 47:19 (Shehadeti)", "Kur'an 1:1-7", "Kur'an 112:1-4"], correct: "Kur'an 3:97 (Haxhi), 2:43 (Namazi), 9:103 (Zekati), 2:183 (Agjërimi), 47:19 (Shehadeti)" },
  { q: "Ihsani sipas Hadithit të Xhibrilit?", opts: ["Të bësh mirë", "Të adhurosh Allahun sikur ta shohësh Atë", "Të lexosh Kur'an", "Të japësh zekat"], correct: "Të adhurosh Allahun sikur ta shohësh Atë" },
  { q: "Vula e Profetëve është:", opts: ["Musa ﷺ", "Isa ﷺ", "Ibrahim ﷺ", "Muhammedi ﷺ"], correct: "Muhammedi ﷺ" },
  { q: "Misra dhe Miraxhi ndodhi:", opts: ["Viti 1 H", "Viti 5 H", "Viti 10 ose 12 të profetësisë", "Pas Hixhretit"], correct: "Viti 10 ose 12 të profetësisë" },
  { q: "Gjatë Mi'raxhit, namazi fillimisht u obligua sa herë?", opts: ["5 herë", "10 herë", "50 herë", "3 herë"], correct: "50 herë" },
  { q: "Pse u reduktua namazi nga 50 në 5?", opts: ["Musa ﷺ këshilloi kthimin disa herë derisa u bënë 5", "Allahu e vendosi 5", "Profeti ﷺ i zgjodhi", "Sahabët e zgjodhën"], correct: "Musa ﷺ këshilloi kthimin disa herë derisa u bënë 5" },
  // Pastërtia
  { q: "Cilat janë 4 Farzet e Abdestit?", opts: ["Duart, koka, fytyra, këmbët", "Fytyra, duart deri bërryla, koka (mes'h), këmbët deri nyja", "Fytyra, koka, qafa, këmbët", "Nijet, fytyrë, duar, këmbë"], correct: "Fytyra, duart deri bërryla, koka (mes'h), këmbët deri nyja" },
  { q: "Cili lloj uji pastron?", opts: ["Çdo ujë", "Vetëm uji i shiut", "Ujë i pastër (Mutlak — natyrsor, i pandryshuar)", "Vetëm uji i detit"], correct: "Ujë i pastër (Mutlak — natyrsor, i pandryshuar)" },
  { q: "Sa gjëra e prishin abdestit?", opts: ["3", "4", "5 kryesore (gazra, gjumë, humbja mendjes...)", "7"], correct: "5 kryesore (gazra, gjumë, humbja mendjes...)" },
  { q: "Gusuli është i detyrueshëm pas:", opts: ["Abdestit", "Namazi farzit", "Marrëdhënieve intime dhe derdhjes së spermës", "Çdo ditë"], correct: "Marrëdhënieve intime dhe derdhjes së spermës" },
  { q: "Çfarë është Tejemmumi?", opts: ["Larje me ujë", "Gusul me ujë të ngrohtë", "Pastrimi me dhe (rërë) kur nuk ka ujë", "Lloji i abdestit"], correct: "Pastrimi me dhe (rërë) kur nuk ka ujë" },
  // Namazi
  { q: "Sa namaze janë të obliguara (farz) në ditë?", opts: ["3", "4", "6", "5"], correct: "5" },
  { q: "Cilat janë 5 namazet e detyruara?", opts: ["Sabahu, Dreka, Ikindia, Akshami, Jacia", "Sabahu, Duhaja, Dreka, Ikindia, Jacia", "Sabahu, Dreka, Ikindia, Akshami, Teravihu", "Fajri, Duhaja, Dhuhri, Asri, Isha"], correct: "Sabahu, Dreka, Ikindia, Akshami, Jacia" },
  { q: "Sa rekat ka namazi i Sabahut?", opts: ["2 sunnet + 2 farz", "2 sunnet + 4 farz", "4 sunnet + 2 farz", "2 farz vetëm"], correct: "2 sunnet + 2 farz" },
  { q: "Sa rekat ka namazi i Drekes gjithsej (me sunnet)?", opts: ["8", "10", "12", "6"], correct: "12" },
  { q: "Cili kusht i namazit ka lidhje me drejtimin?", opts: ["Tahara", "Kibla", "Auret", "Nijet"], correct: "Kibla" },
  { q: "Çfarë e prish namazin?", opts: ["Qarja", "Ecja pak", "Të folurit me qëllim dhe qeshja me zë", "Lëvizja e vogël"], correct: "Të folurit me qëllim dhe qeshja me zë" },
  { q: "Cila ajet Kur'ani obligon namazin?", opts: ["Kur'an 5:6", "Kur'an 2:183", "Kur'an 2:43 — 'Falni namazin, jepni zekatin...'", "Kur'an 9:103"], correct: "Kur'an 2:43 — 'Falni namazin, jepni zekatin...'" },
  { q: "Sa rekat ka namazi i Ikindisë (farz)?", opts: ["2", "3", "6", "4"], correct: "4" },
  { q: "Sa rekat ka namazi i Akshamin (farz)?", opts: ["2", "4", "5", "3"], correct: "3" },
  { q: "Sa rekat ka namazi i Jacisë (farz)?", opts: ["2", "3", "5", "4"], correct: "4" },
  // Agjërimi
  { q: "Cili muaj është muaji i agjërimit?", opts: ["Sheval", "Muharrem", "Dhul-Hixhe", "Ramazan"], correct: "Ramazan" },
  { q: "Çfarë është Sehuri?", opts: ["Vakti i iftarit", "Namazi i natës", "Vakt vakti para agimit (vakti i ngrënies para agjërimit)", "Namazi i Fajrit"], correct: "Vakt vakti para agimit (vakti i ngrënies para agjërimit)" },
  { q: "Çfarë është Iftari?", opts: ["Nijet i agjërimit", "Hapja e agjërimit në perëndim të diellit", "Namaz pas agjërimit", "Sadaka e Ramazanit"], correct: "Hapja e agjërimit në perëndim të diellit" },
  { q: "Çfarë e prish agjërimin?", opts: ["Injeksioni mjekësor", "Ngrënia e qëllimshme dhe pirja", "Shikimi i gabuar", "Mendimi i keq"], correct: "Ngrënia e qëllimshme dhe pirja" },
  { q: "Cila ajet Kur'ani obligon agjërimin?", opts: ["Kur'an 5:6", "Kur'an 9:60", "Kur'an 3:97", "Kur'an 2:183 — 'O ju që besuat, ju është bërë detyrë agjërimi...'"], correct: "Kur'an 2:183 — 'O ju që besuat, ju është bërë detyrë agjërimi...'" },
  { q: "Qëllimi (nijeti) i agjërimit bëhet:", opts: ["Gjatë iftarit", "Në çdo çast të ditës", "Kur fillon Ramazani (1 herë)", "Para agimit (çdo natë sipas shumicës)"], correct: "Para agimit (çdo natë sipas shumicës)" },
  // Zekati
  { q: "Cila pasuri i nënshtrohet Zekatit?", opts: ["Çdo pasuri", "Vetëm ari", "Ari, argjendi, paratë, tregtia, bagëtia, bujqësia", "Vetëm shtëpia"], correct: "Ari, argjendi, paratë, tregtia, bagëtia, bujqësia" },
  { q: "Nisabi i arit (kufiri minimal) është:", opts: ["50 gram ar", "100 gram ar", "200 gram ar", "85 gram ar (20 mithkal)"], correct: "85 gram ar (20 mithkal)" },
  { q: "Havlan el-Havl do të thotë:", opts: ["Mbledhja e zekatit", "Shpërndarja e zekatit", "Kalimi i 1 viti mbi pasurinë (kushti i zekatit)", "Llogaritja e nisabit"], correct: "Kalimi i 1 viti mbi pasurinë (kushti i zekatit)" },
  { q: "Zekat i argjendisë është sa % e vlerës?", opts: ["5%", "10%", "2.5%", "1%"], correct: "2.5%" },
  { q: "Cila ajet obligon Zekatin?", opts: ["Kur'an 2:183", "Kur'an 2:43 — '...jepni zekatin...'", "Kur'an 5:6", "Kur'an 9:60"], correct: "Kur'an 2:43 — '...jepni zekatin...'" },
  { q: "Sadakatu'l-Fitr jepet:", opts: ["Çdo muaj", "Fund Haxhi", "Para namazit të Bajramit Fitër", "Fund Ramazani (çdo kohë)"], correct: "Para namazit të Bajramit Fitër" },
  { q: "1 Sa' (Sadakatu'l-Fitr) = ?", opts: ["1 kg ushqim", "5 kg ushqim", "2.5 - 3 kg ushqim bazë", "500g ushqim"], correct: "2.5 - 3 kg ushqim bazë" },
  { q: "Sadaka Xharije do të thotë:", opts: ["Sadaka e detyrueshme", "Sadaka sezonale", "Sadaka e vazhdueshme (pus, xhami, libër i dobishëm)", "Zekat vjetor"], correct: "Sadaka e vazhdueshme (pus, xhami, libër i dobishëm)" },
  { q: "Hadith: 'Kur vdes njeriu, veprat ndërpriten veç nga tri...' — e treta?", opts: ["Zekat", "Namaz", "Fëmija i mirë që lutet", "Agjërim"], correct: "Fëmija i mirë që lutet" },
  { q: "Kur'an 9:60 — Zekati jepet 8 kategorive. Cila e para?", opts: ["Udhëtarët", "Robërit", "Borxhlinjtë", "Të varfrit (Fuqara)"], correct: "Të varfrit (Fuqara)" },
  // Abdesi
  { q: "Si quhet lënia e vendit të thatë pa ujë gjatë abdesit?", opts: ["Mustehab", "Gabim i madh (e prish abdestit)", "Sunet", "Vaxhib"], correct: "Gabim i madh (e prish abdestit)" },
  { q: "Cili organ lahet i pari në abdest sipas Sunnetit?", opts: ["Fytyra", "Duart deri kyçit", "Goja", "Hunda"], correct: "Duart deri kyçit" },
  { q: "Cila është dua e parë e obliguar në abdest?", opts: ["Bismillah", "Allahu Ekber", "Subhanallah", "Astagfirullah"], correct: "Bismillah" },
  { q: "Mes'hi i kokës gjatë abdesit — sa herë?", opts: ["3 herë", "2 herë", "1 herë e plotë", "Sipas dëshirës"], correct: "1 herë e plotë" },
  { q: "A lejohet Tejemmumi kur ka ujë të mjaftueshëm?", opts: ["Po, gjithmonë", "Jo, Tejemmumi lejohet vetëm pa ujë ose kur ujë dëmton shëndetin", "Po, nëse je i zënë", "Po, për grua"], correct: "Jo, Tejemmumi lejohet vetëm pa ujë ose kur ujë dëmton shëndetin" },
  // Namaz i thellë
  { q: "Cila është shtyllë (Rukn) e namazit?", opts: ["Tekbiri fillestar, Fatiha, Rukuja, Sexhdja, Selami", "Vetëm Tekbiri fillestar", "Fatiha dhe Selami", "Teshehudi dhe Selami"], correct: "Tekbiri fillestar, Fatiha, Rukuja, Sexhdja, Selami" },
  { q: "Cila është pozita e qorrët gjatë sexhdes (Sujuud)?", opts: ["7 gjymtyrë prekin tokën", "5 gjymtyrë prekin tokën", "Vetëm balli dhe gjunjët", "Gishtat dhe gjunjët"], correct: "7 gjymtyrë prekin tokën" },
  { q: "Çfarë thuhet gjatë Rukusë?", opts: ["Subhana rabbijel ala", "Subhana rabbijel adhim", "Allahu Ekber", "Semia Allahu"], correct: "Subhana rabbijel adhim" },
  { q: "Çfarë thuhet gjatë Sexhdes?", opts: ["Subhana rabbijel adhim", "Subhana rabbijel ala", "Allahu Ekber", "Semia Allahu"], correct: "Subhana rabbijel ala" },
  { q: "Kur urdhërohet fëmija të fillojë namazin?", opts: ["Nga 5 vjeç", "Nga 7 vjeç", "Nga 10 vjeç", "Vetëm kur bëhet baligh"], correct: "Nga 7 vjeç" },
  { q: "Sa rekate ka namazi Vaxhib gjithsej i Drekes?", opts: ["4", "6", "8", "12"], correct: "4" },
  { q: "Cila frazë thuhet kur ngrihesh nga Rukuja?", opts: ["Subhana rabbijel adhim", "Semia Allahu limen hamideh", "Allahu Ekber", "Rabbi igfirli"], correct: "Semia Allahu limen hamideh" },
  { q: "Cili kusht për namazin lidhet me rrobat?", opts: ["Nijet", "Kibla", "Auret (Mbulimi i trupit)", "Tahara"], correct: "Auret (Mbulimi i trupit)" },
  { q: "Çfarë do të thotë Tuma'ninah (qëndrimi i qetë)?", opts: ["Leximi i shpejtë i Fatihasë", "Qëndrimi i qetë dhe plotë në çdo pozicion të namazit", "Gjatësia e sexhdes", "Kthimi i shpejtë nga rukuja"], correct: "Qëndrimi i qetë dhe plotë në çdo pozicion të namazit" },
  // Isra & Mi'raxh
  { q: "Sa qiej ka kaluar Profeti ﷺ gjatë Mi'raxhit?", opts: ["3 qiej", "5 qiej", "7 qiej", "10 qiej"], correct: "7 qiej" },
  { q: "Cilin Profet takoi Profeti ﷺ në qiellin e 6-të?", opts: ["Ademi ﷺ", "Ibrahimi ﷺ", "Musa ﷺ", "Isa ﷺ"], correct: "Musa ﷺ" },
  { q: "Çfarë është Sidretul Munteha?", opts: ["Emri i Xhennetit", "Pema e kufirit të fundit të dijes krijuese", "Mali ku zbret shpallja", "Emri i një sure"], correct: "Pema e kufirit të fundit të dijes krijuese" },
  { q: "Çfarë zgjodhi Profeti ﷺ: qumështin apo verën?", opts: ["Verën", "Qumështin — fitran (natyrën e pastër)", "Ujin", "Të dyja"], correct: "Qumështin — fitran (natyrën e pastër)" },
  // Duatë
  { q: "Cila dua thuhet para gjumit sipas Sunnetit?", opts: ["Subhanallah 33 herë", "Bismikallahume emute ve ahja", "Allahu Ekber 34 herë", "La ilahe illallah"], correct: "Bismikallahume emute ve ahja" },
  { q: "Cila dua thuhet kur del nga shtëpia?", opts: ["Bismillah tewekkeltu alallah", "Allahu Ekber", "Subhanallah", "Asteghfirullah"], correct: "Bismillah tewekkeltu alallah" },
  { q: "Dua e Junusit ﷺ kur ishte në bark të balenës?", opts: ["Rabbi igfirli", "La ilahe illa ente subhaneke inni kuntu mined-dhalimin", "Hasbunallah ue ni'mel uekil", "Allahu Ekber"], correct: "La ilahe illa ente subhaneke inni kuntu mined-dhalimin" },
  // Gusul
  { q: "Sa gjëra e obligojnë Guslin?", opts: ["3 gjëra kryesore", "5 gjëra", "7 gjëra", "Vetëm marrëdhëniet"], correct: "7 gjëra" },
  { q: "Cili është farzi i parë i Gusulit?", opts: ["Larja e kokës", "Nijeti", "Shpëlarja e gojës", "Larja e duarve"], correct: "Nijeti" },
  { q: "Gusuli i Xhumasë (e Premtes) është:", opts: ["Farz i sigurt", "Haram", "Sunet Muekked (i fortë)", "Vaxhib"], correct: "Sunet Muekked (i fortë)" },
];

export default function FikhQuiz() {
  const [started, setStarted] = useState(false);
  const [questions] = useState(() => [...FIKH_QUESTIONS].sort(() => Math.random() - 0.5));
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(20);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!started || finished) return;
    if (timer <= 0) { handleAnswer(null); return; }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, started, finished, idx]);

  const handleAnswer = (opt) => {
    if (answered !== null) return;
    const isCorrect = opt === questions[idx].correct;
    setAnswered({ selected: opt, correct: questions[idx].correct, isCorrect });
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (idx + 1 >= questions.length) { setFinished(true); return; }
      setIdx(i => i + 1); setTimer(20); setAnswered(null);
    }, 1500);
  };

  const restart = () => { setStarted(false); setFinished(false); setIdx(0); setScore(0); setTimer(20); setAnswered(null); };
  const pct = Math.round((score / questions.length) * 100);

  if (!started) return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
      <div className="text-5xl mb-4">🕌</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Kuiz Fikh Elementar</h3>
      <p className="text-gray-500 mb-1">{questions.length} pyetje · 20 sekonda secila</p>
      <p className="text-sm text-teal-600 mb-6">Akide, Pastërtia, Namazi, Agjërimi, Zekati</p>
      <button onClick={() => setStarted(true)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8 py-3 font-bold transition-all">
        🚀 Fillo Kuizin
      </button>
    </div>
  );

  if (finished) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
      <Trophy className="w-14 h-14 text-amber-400 mx-auto mb-3" />
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Mbaroi!</h3>
      <p className={`text-5xl font-bold mb-3 ${pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : "text-red-500"}`}>
        {score}/{questions.length}
      </p>
      <p className="text-gray-500 mb-2 font-medium">
        {pct >= 85 ? "🏆 Mashallah! Fikh-un zotëron!" : pct >= 60 ? "👍 Mirë! Vazhdo të mësosh!" : "📚 Rishiko mësimet dhe provo sërish!"}
      </p>
      <p className="text-sm text-gray-400 mb-6">{pct}% saktësi</p>
      <button onClick={restart}
        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8 py-3 font-bold flex items-center gap-2 mx-auto">
        <RotateCcw className="w-4 h-4" /> Provo Sërish
      </button>
    </motion.div>
  );

  const q = questions[idx];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-600">Pyetja {idx + 1}/{questions.length}</span>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${timer <= 5 ? "bg-red-100 text-red-600 animate-pulse" : "bg-emerald-100 text-emerald-700"}`}>
          <Timer className="w-4 h-4" /> {timer}s
        </div>
        <span className="text-sm font-semibold text-emerald-600">✓ {score}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
        <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${(idx / questions.length) * 100}%` }} />
      </div>
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-center mb-4">
        <p className="text-base font-bold text-gray-800 leading-relaxed">{q.q}</p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {q.opts.map((opt) => {
          let cls = "border-gray-200 bg-white text-gray-800 hover:border-teal-300 hover:bg-teal-50";
          if (answered) {
            if (opt === answered.correct) cls = "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold";
            else if (opt === answered.selected && !answered.isCorrect) cls = "border-red-400 bg-red-50 text-red-700";
            else cls = "border-gray-100 bg-gray-50 text-gray-400";
          }
          return (
            <button key={opt} disabled={!!answered} onClick={() => handleAnswer(opt)}
              className={`border-2 rounded-2xl p-3 text-sm text-left transition-all ${cls}`}>
              {opt}
              {answered && opt === answered.correct && <CheckCircle className="w-4 h-4 inline ml-1 text-emerald-600" />}
              {answered && opt === answered.selected && !answered.isCorrect && <XCircle className="w-4 h-4 inline ml-1 text-red-500" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}