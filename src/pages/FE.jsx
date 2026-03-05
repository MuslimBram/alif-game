import React, { useState } from "react";
import { ChevronDown, ChevronRight, BookOpen, Droplets, Star, Shield, Heart } from "lucide-react";

const Section = ({ title, icon, color, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border-2 ${color} mb-4 overflow-hidden shadow-sm`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-gray-800 hover:bg-gray-50 transition-all"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-base">{title}</span>
        </div>
        {open ? <ChevronDown className="w-5 h-5 text-gray-500" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
      </button>
      {open && <div className="px-5 pb-5 pt-1">{children}</div>}
    </div>
  );
};

const Item = ({ num, title, text, dalil }) => (
  <div className="mb-4 bg-white rounded-xl p-4 border border-gray-100 shadow-xs">
    {num && <span className="inline-block bg-emerald-600 text-white text-xs font-bold rounded-full w-6 h-6 text-center leading-6 mr-2">{num}</span>}
    {title && <span className="font-bold text-gray-800">{title}</span>}
    {text && <p className="text-gray-700 mt-1 text-sm leading-relaxed">{text}</p>}
    {dalil && (
      <div className="mt-2 bg-emerald-50 rounded-lg p-2 border-l-4 border-emerald-500">
        <p className="text-emerald-800 text-sm italic">📖 {dalil}</p>
      </div>
    )}
  </div>
);

const HadithBox = ({ title, arabic, text, tefsir }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
    {title && <h3 className="font-bold text-gray-800 mb-2">{title}</h3>}
    {arabic && (
      <p className="text-right text-xl font-bold text-emerald-800 mb-3 leading-loose font-arabic" dir="rtl">
        {arabic}
      </p>
    )}
    {text && <p className="text-gray-700 text-sm leading-relaxed mb-2">{text}</p>}
    {tefsir && (
      <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-3 mt-2">
        <p className="text-amber-900 text-sm font-semibold mb-1">📝 Tefsir:</p>
        <p className="text-amber-800 text-sm leading-relaxed">{tefsir}</p>
      </div>
    )}
  </div>
);

export default function FE() {
  const [mainTab, setMainTab] = useState("akide");

  const tabs = [
    { id: "akide", label: "🕌 Akide" },
    { id: "pastresia", label: "💧 Pastërtia" },
    { id: "namazi", label: "🤲 Namazi" },
    { id: "agjrimi", label: "🌙 Agjërimi" },
    { id: "zekati", label: "💰 Zekati" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-700 to-teal-600 rounded-3xl p-6 text-white mb-8 text-center shadow-lg">
        <h1 className="text-3xl font-extrabold mb-1">📚 Fikh Elementar (FE)</h1>
        <p className="text-emerald-100 text-sm">Bazat e Islamit me argumente nga Kur'ani dhe Sunneti</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap mb-6 bg-gray-100 p-1.5 rounded-2xl">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setMainTab(t.id)}
            className={`flex-1 min-w-[80px] py-2 rounded-xl text-xs font-bold transition-all ${mainTab === t.id ? "bg-white shadow text-emerald-700" : "text-gray-500 hover:text-gray-700"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ===== AKIDE ===== */}
      {mainTab === "akide" && (
        <div>
          {/* 3 Parimet */}
          <Section title="3 Parimet e Islamit" icon={<Star className="w-5 h-5 text-yellow-500" />} color="border-yellow-300">
            <p className="text-sm text-gray-600 mb-4">Çdo musliman duhet të dijë përgjigjet e tre pyetjeve themelore:</p>
            <Item num="1" title="Kush është Zoti yt?" text="Zoti im është Allahu i Lartësuar. Ai është i vetmi që e adhuroj dhe tek i cili drejtohem. Ai është Krijuesi i çdo gjëje." dalil="Kur'an 6:102 – 'Kjo është Allahu, Zoti juaj, nuk ka zot tjetër pos Tij, Krijuesi i çdo gjëje, prandaj adhuroni Atë.'" />
            <Item num="2" title="Cila është feja jote?" text="Feja ime është Islami. Islam do të thotë nënshtrim ndaj Allahut me dashuri, frikë dhe shpresë." dalil="Kur'an 3:19 – 'Feja e vërtetë tek Allahu është Islami.' | Kur'an 3:85 – 'Kush kërkon fe tjetër pos Islamit, nuk i pranohet.'" />
            <Item num="3" title="Kush është Profeti yt?" text="Profeti im është Muhammedi ﷺ, i dërguar i Allahut për njerëzit dhe xhindet, vula e profetëve." dalil="Kur'an 33:40 – 'Muhammedi nuk është baba i asnjërit prej burrave tuaj, por është i Dërguar i Allahut dhe vula e profetëve.'" />
          </Section>

          {/* 6 Bazat */}
          <Section title="6 Bazat e Islamit" icon={<Shield className="w-5 h-5 text-blue-500" />} color="border-blue-300">
            {[
              { n: 1, t: "Njohja e vetvetes", d: "Njeriu është krijuar për të adhuruar Allahun. (Kur'an 51:56)" },
              { n: 2, t: "Njohja e fesë", d: "Islami është feja e Allahut. (Kur'an 3:19)" },
              { n: 3, t: "Njohja e Profetit ﷺ", d: "Muhammedi ﷺ është i Dërguari i fundit. (Kur'an 33:40)" },
              { n: 4, t: "Njohja e synnetit", d: "Sunneti shpjegon Kur'anin. (Kur'an 59:7)" },
              { n: 5, t: "Njohja e Sahabëve", d: "Sahabët janë modeli i zbatimit të fesë. (Kur'an 9:100)" },
              { n: 6, t: "Njohja e Tevhidit", d: "Allahu është Një pa shok, pa shëmbëlltyrë. (Kur'an 112:1-4)" },
            ].map(b => <Item key={b.n} num={b.n} title={b.t} dalil={b.d} />)}
          </Section>

          {/* 5 Shtylla */}
          <Section title="5 Shtyllat e Islamit" icon={<BookOpen className="w-5 h-5 text-emerald-600" />} color="border-emerald-300">
            <HadithBox
              arabic="بُنِيَ الإِسْلامُ عَلَى خَمْسٍ"
              text="'Islami është ndërtuar mbi pesë (shtylla)...' – Transmetuar nga Buhariu dhe Muslimi."
              tefsir="Hadith-i tregon se Islami ka pesë shtylla themelore pa të cilat njeriu nuk mund të quhet musliman i plotë."
            />
            {[
              { n: 1, t: "Shehadeti", d: "Kur'an 47:19 – 'Dije se nuk ka zot tjetër pos Allahut.'" },
              { n: 2, t: "Namazi (5 herë në ditë)", d: "Kur'an 2:43 – 'Falni namazin, jepni zekatin dhe bëhuni me ata që i bëjnë rukune Allahut.'" },
              { n: 3, t: "Zekati", d: "Kur'an 9:103 – 'Merr nga pasuria e tyre lëmoshë (zekat) me të cilën i pastroni dhe i lartësoni.'" },
              { n: 4, t: "Agjërimi i Ramazanit", d: "Kur'an 2:183 – 'O ju që besuat, ju është bërë detyrë agjërimi, ashtu siç u ishte bërë detyrë atyre para jush.'" },
              { n: 5, t: "Haxhi (për të aftët)", d: "Kur'an 3:97 – 'Haxhi i shtëpisë (Qabes) është obligim ndaj Allahut për ata që kanë mundësi.'" },
            ].map(s => <Item key={s.n} num={s.n} title={s.t} dalil={s.d} />)}
          </Section>

          {/* 6 Kushtet e Besimit */}
          <Section title="6 Kushtet e Besimit (Imanit)" icon={<Heart className="w-5 h-5 text-red-500" />} color="border-red-300">
            <HadithBox
              arabic="أَنْ تُؤْمِنَ بِاللَّهِ وَمَلائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الآخِرِ وَبِالْقَدَرِ"
              text="Hadithi i Xhibrilit – Muslimi: 'Besimi është: të besosh në Allah, engjëjt e Tij, librat e Tij, të dërguarit e Tij, Ditën e Fundit dhe Kaderin - të mirën dhe të keqen e tij.'"
            />
            {[
              { n: 1, t: "Besimi në Allah", d: "Kur'an 2:255 (Ajeti Kursi) – 'Allahu, nuk ka zot tjetër pos Tij, të Gjallën, Mbajtësin e gjithçkaje.'" },
              { n: 2, t: "Besimi në Engjëjt", d: "Kur'an 2:285 – 'Çdonjëri prej tyre besoi në Allah, engjëjt e Tij, librat e Tij dhe të dërguarit e Tij.'" },
              { n: 3, t: "Besimi në Librat e Zotit", d: "Kur'an 4:136 – '...besoni në Allah, të Dërguarin e Tij, Librin që i zbriti të Dërguarit Tij dhe Librin që zbriti para.'" },
              { n: 4, t: "Besimi në Profetët", d: "Kur'an 2:285 – 'Nuk bëjmë dallim midis asnjërit nga të dërguarit e Tij.'" },
              { n: 5, t: "Besimi në Ditën e Fundit", d: "Kur'an 2:177 – 'Mirësia nuk është të kthesh fytyrën nga lindja e as perëndimi... por mirësia është... besimi në Ditën e Fundit.'" },
              { n: 6, t: "Besimi në Kader (Caktimin e Allahut)", d: "Kur'an 54:49 – 'Ne çdo send e kemi krijuar me masë (kader).'" },
            ].map(k => <Item key={k.n} num={k.n} title={k.t} dalil={k.d} />)}
          </Section>

          {/* Hadithi i Xhibrilit */}
          <Section title="Hadithi i Xhibrilit (me Tefsir)" icon={<BookOpen className="w-5 h-5 text-purple-600" />} color="border-purple-300">
            <HadithBox
              title="Konteksti"
              text="Njëherë, ndërkohë që ishim ulur me të Dërguarin e Allahut ﷺ, papritur erdhi një njeri me rroba shumë të bardha, flokë shumë të zinj, pa shenjë udhëtimi mbi të, dhe asnjëri nga ne nuk e njihte. U ul pranë Profetit ﷺ, vendosi gjunjët e tij mbi gjunjët e tij dhe tha..."
            />
            <HadithBox
              title="Pyetja për Islamin"
              arabic="مَا الإِسْلامُ؟"
              text="'Çfarë është Islami?' – Profeti ﷺ iu përgjigj: 'Islami është të dëshmosh se nuk ka zot tjetër pos Allahut dhe se Muhammedi është i Dërguari i Allahut, të falësh namazin, të japësh zekatin, të agjërosh Ramazanin dhe të bësh Haxhin nëse ke mundësi.'"
              tefsir="Islami ka dimensionin e jashtëm (veprimet) – 5 shtyllat. Ato janë dëshmi e dukshme e besimit."
            />
            <HadithBox
              title="Pyetja për Imanin"
              arabic="مَا الإِيمَانُ؟"
              text="'Çfarë është Imani?' – Profeti ﷺ: 'Të besosh në Allah, engjëjt, librat, profetët, Ditën e Fundit dhe Kaderin.'"
              tefsir="Imani ka dimensionin e brendshëm (besimi i zemrës). Besimi pa vepra është i mangët."
            />
            <HadithBox
              title="Pyetja për Ihsanin"
              arabic="مَا الإِحْسَانُ؟"
              text="'Çfarë është Ihsani?' – Profeti ﷺ: 'Të adhurosh Allahun sikur ta shohësh Atë, nëse nuk e sheh, Ai të sheh.'"
              tefsir="Ihsani është kulmi i Islamit – të jesh i ndërgjegjshëm se Allahu të sheh në çdo çast. Kjo ndikon drejtpërsëdrejti në cilësinë e adhurimeve."
            />
            <HadithBox
              title="Pyetja për Kijametin"
              text="'Kur do të jetë Kijameti?' – Profeti ﷺ: 'Ai që pyetet nuk di më shumë se ai që pyet.' (Domethënë asnjë krijesë nuk e di.)"
              tefsir="Profeti ﷺ tregoi se njohja e Kijametit i takon vetëm Allahut. Por dha shenjat e saj. Në fund Profeti ﷺ tha: 'Ky ishte Xhibrili, erdhi t'ju mësojë fenë tuaj.' (Muslimi)"
            />
          </Section>

          {/* Isra dhe Miraxh */}
          <Section title="Hadithi i Isra & Mi'raxhit" icon={<Star className="w-5 h-5 text-indigo-500" />} color="border-indigo-300">
            <HadithBox
              arabic="سُبْحَانَ الَّذِي أَسْرَى بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى"
              text="Kur'an 17:1 – 'I Lartësuar është Ai që e çoi robin e Vet natën nga Mesxhidi Haram në Mesxhidi Aksa...'"
              tefsir="Isra është udhëtimi i natës me trup dhe shpirt nga Mekka në Kuds (Jeruzalem). Ndodhi vitin e 10-të ose 12-të të profetësisë."
            />
            <Item title="Mi'raxhi (Ngjitja në qiej)" text="Nga Mesxhidi Aksa, Profeti ﷺ u ngrit me Xhibrilin nëpër shtatë qiejt dhe u ndesh me profetët: Adem (qielli i parë), Isa & Jahja (i dyti), Jusuf (i treti), Idris (i katërti), Harun (i pesti), Musa (i gjashti), Ibrahim (i shtati). Pastaj kaloi Sidretul Muntehën dhe arriti afri Allahut." dalil="Kur'an 53:13-18 – 'E pa atë edhe herën tjetër, pranë Sidretul Muntes... Syri i tij nuk u shmang e as nuk e kaloi kufirin.'" />
            <Item title="Obligimi i Namazit" text="Fillimisht Allahu obligoi 50 namaze. Musa ﷺ i tha Profetit ﷺ: 'Kthehu, umeti yt nuk mban dot.' U kthye disa herë derisa u bënë 5 namaze por me shpërblimin e 50-ve." dalil="Transmeton Buhariu dhe Muslimi nga Enesi." />
          </Section>
        </div>
      )}

      {/* ===== PASTËRTIA ===== */}
      {mainTab === "pastresia" && (
        <div>
          {/* Pastërtia Shpirtërore */}
          <Section title="Pastërtia e Shpirtit dhe Trupit" icon={<Heart className="w-5 h-5 text-pink-500" />} color="border-pink-300">
            <Item title="Pastërtia shpirtërore (Tezkijja)" text="Pastrimi i zemrës nga gjynahet, zilia, krenaria dhe hipokrizia. Kjo arrihet me Tevbe (pendim), Dhikr (kujtim të Allahut) dhe vepra të mira." dalil="Kur'an 91:9-10 – 'Ka shpëtuar ai që e pastroi shpirtin. Dhe ka dështuar ai që e mbyti shpirtin.'" />
            <Item title="Pastërtia trupore (Tahare)" text="Largimi nga papastërtia fizike (Nexhasa) dhe papastërtia rituale (Hades). Kjo bëhet me abdest, gusl ose tejemmum." dalil="Kur'an 2:222 – 'Vërtet Allahu i do ata që pendohen dhe i do ata që pastrohen.'" />
          </Section>

          {/* Uji i Pastër */}
          <Section title="Llojet e Ujit — Cili Pastron?" icon={<Droplets className="w-5 h-5 text-blue-500" />} color="border-blue-300">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="border border-blue-200 p-2 text-left">Lloji</th>
                    <th className="border border-blue-200 p-2">Pastron?</th>
                    <th className="border border-blue-200 p-2">Shembull</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Ujë i pastër (Mutlak)", "✅ Po", "Shi, lumë, burim, det, borë"],
                    ["Ujë i pastër por i ndryshuar (Muzaaf)", "❌ Jo", "Ujë lëngjesh, çaji, supës"],
                    ["Ujë i prishur (Nexhis)", "❌ Jo", "Ujë ku ka rënë urinë, gjak"],
                    ["Ujë pak i ndryshuar ngjyrë/shije/erë nga diçka e pastër", "✅ Po", "Ujë me gjethe peme të rëna"],
                  ].map(([l, p, s], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-200 p-2 font-medium">{l}</td>
                      <td className="border border-gray-200 p-2 text-center">{p}</td>
                      <td className="border border-gray-200 p-2 text-gray-600">{s}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
              <p className="text-blue-800 text-sm">📖 Kur'an 25:48 – <em>'Dhe Ne i zbritëm nga qielli ujë të pastër.'</em> | Hadith: <em>'Uji i detit është i pastër, dhe kafshët e tij të ngordhura janë të lejuara.'</em> (Ebu Davudi, Tirmidhiu)</p>
            </div>
          </Section>

          {/* Kushtet e Abdestit */}
          <Section title="Kushtet e Abdestit" icon={<Droplets className="w-5 h-5 text-cyan-500" />} color="border-cyan-300">
            <p className="text-sm font-semibold text-gray-600 mb-3">📌 Farzet e Abdestit (4 Farzet):</p>
            {[
              { n: 1, t: "Larja e fytyrës", d: "Kur'an 5:6 – 'Lani fytyrat tuaja...'" },
              { n: 2, t: "Larja e duarve deri në bërryla", d: "Kur'an 5:6 – '...dhe duart tuaja deri te bërrylat.'" },
              { n: 3, t: "Fërkimi i kokës (mes'h)", d: "Kur'an 5:6 – '...dhe fërkoni kokat tuaja.'" },
              { n: 4, t: "Larja e këmbëve deri në nyja", d: "Kur'an 5:6 – '...dhe këmbët tuaja deri te nyjet.'" },
            ].map(f => <Item key={f.n} num={f.n} title={f.t} dalil={f.d} />)}

            <p className="text-sm font-semibold text-gray-600 mb-3 mt-4">📌 Kushtet e Abdestit (para se të fillojë):</p>
            {[
              "Islam (musliman të jetë)",
              "Nijet (qëllim në zemër)",
              "Hyrja e kohës (për namaz)",
              "Ujë i pastër dhe i mjaftueshëm",
              "Largimi i pengesave (llaqit, bojës mbi lëkurë)",
            ].map((k, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 bg-cyan-600 text-white text-xs rounded-full flex items-center justify-center font-bold">{i + 1}</span>
                <span className="text-sm text-gray-700">{k}</span>
              </div>
            ))}
          </Section>

          {/* Çfarë e Prish Abdestit */}
          <Section title="Çfarë e Prish Abdestit" icon={<Shield className="w-5 h-5 text-red-500" />} color="border-red-300">
            {[
              { n: 1, t: "Çdo gjë që del nga dy vendet (penis/vaginë dhe anusi)", d: "Kur'an 5:6 – 'Ose ka ardhur ndonjëri nga ju nga banjoja...' | Hadith Buhariu: 'Allahu nuk pranon namazin pa abdest.'" },
              { n: 2, t: "Gjumi i thellë (kur humbet ndërgjegjja)", d: "Hadith Ebu Davudi: 'Syri është vula e ndërgjegjës, kush fle humbet abdestit.'" },
              { n: 3, t: "Humbja e mendjes (çmenduria, dehja)", d: "Analogji me gjumin – nëse gjumi e prish, humbja e plotë e ndërgjegjjes më fort." },
              { n: 4, t: "Prekja e organit gjenital me dorë pa perde", d: "Hadith Ebu Davudi (1166): 'Kush prek organin e tij, le të marrë abdest.'" },
              { n: 5, t: "Lëngjet e papastra (urina, gjaku, etj.)", d: "Kur'an 5:6 – 'Ose i ka prekur gratë...' Shumica e dijetarëve e numërojnë si prishës." },
            ].map(p => <Item key={p.n} num={p.n} title={p.t} dalil={p.d} />)}
          </Section>

          {/* Kushtet e Gusulit */}
          <Section title="Kushtet e Gusulit (Larja e Plotë)" icon={<Droplets className="w-5 h-5 text-teal-500" />} color="border-teal-300">
            <p className="text-sm text-gray-600 mb-3">Gusuli është i obligueshëm (farz) pas këtyre rasteve:</p>
            {[
              { t: "Marrëdhëniet intime (edhe pa derdhje)", d: "Kur'an 4:43 – 'Ose keni qenë xhunub (papastër), atëherë pastrohuni.'" },
              { t: "Derdhja e spermës (me ose pa marrëdhënie)", d: "Hadith Muslimi: 'Uji (gusuli) vjen nga uji (sperma).'" },
              { t: "Menstruacionet (Hajdi)", d: "Kur'an 2:222 – '...kur të pastrohen, afrohuni atyre siç ju urdhëroi Allahu.'" },
              { t: "Lehonia (Nifasi – gjaku pas lindjes)", d: "Analogji me Hajdin – te gjithë juristët islamë pajtohen." },
              { t: "Vdekja (larja e të vdekurit)", d: "Hadith Buhariu: 'Laheni të vdekurit.' (Farz kifaje)" },
              { t: "Islami i ri (kur dikush bëhet musliman)", d: "Hadith – Profeti ﷺ urdhëroi disa të rinj sahabi të lahen kur pranuan Islamin." },
            ].map((g, i) => <Item key={i} num={i + 1} title={g.t} dalil={g.d} />)}

            <p className="text-sm font-semibold text-gray-600 mb-3 mt-4">📌 Mënyra e Gusulit (Sunneti):</p>
            <div className="bg-teal-50 rounded-xl p-4 text-sm text-teal-900 leading-relaxed">
              1. Nijet (qëllim) → 2. Bism'Allah → 3. Laj duart 3 herë → 4. Pastro vendet intime → 5. Merr abdest të plotë → 6. Derdh ujë mbi kokë 3 herë → 7. Laj anën e djathtë → 8. Laj anën e majtë → 9. Mos harro nyjet dhe lëkurën pas veshëve.
            </div>
          </Section>
        </div>
      )}

      {/* ===== NAMAZI ===== */}
      {mainTab === "namazi" && (
        <div>
          <Section title="Kushtet e Namazit" icon={<BookOpen className="w-5 h-5 text-emerald-600" />} color="border-emerald-300">
            <p className="text-sm font-semibold text-gray-600 mb-3">📌 Kushtet para Namazit (Shart):</p>
            {[
              { n: 1, t: "Islam", d: "Kur'an 98:5 – 'Dhe nuk u urdhëruan ndryshe veçse të adhurojnë Allahun, duke qenë të sinqertë ndaj Tij në fe.'" },
              { n: 2, t: "Mendja (akli)", d: "I çmenduri nuk obligohet. Hadith: 'Lapsi ngrihet nga tri persona – i çmenduri, fëmija, i fjeturi.'" },
              { n: 3, t: "Mosha (pubertet)", d: "Hadith Ebu Davudi: 'Urdhëroni fëmijët të falin namaz në 7 vjeç.'" },
              { n: 4, t: "Abdest (Tahare nga Hadesi)", d: "Kur'an 5:6 – 'O ju që besuat, kur të ngriheni për namaz, lani fytyrat tuaja...'" },
              { n: 5, t: "Pastërtia e trupit, rrobave dhe vendit", d: "Kur'an 74:4 – 'Dhe rrobat e tua pastro!' | Hadith Buhariu: 'Pastrohuni nga urina.'" },
              { n: 6, t: "Mbulimi i Auretit", d: "Kur'an 7:31 – 'O bijtë e Ademit, vishuni bukur (mbuloni auratin) për çdo namaz.'" },
              { n: 7, t: "Drejtimi nga Kibla", d: "Kur'an 2:144 – 'Kthehu fytyrën nga Mesxhidul Haram.' | Kur'an 2:150" },
              { n: 8, t: "Hyrja e kohës", d: "Kur'an 4:103 – 'Namazi është i obligueshëm për besimtarët në kohë të caktuara.'" },
              { n: 9, t: "Nijeti (qëllimi)", d: "Hadith Buhariu: 'Veprat janë sipas qëllimeve.'" },
            ].map(k => <Item key={k.n} num={k.n} title={k.t} dalil={k.d} />)}
          </Section>

          <Section title="Çfarë e Prish Namazin" icon={<Shield className="w-5 h-5 text-red-500" />} color="border-red-300">
            {[
              { n: 1, t: "Të flasësh me qëllim", d: "Hadith Muslimi: 'Namazi nuk lejon të folurit e njerëzve.'" },
              { n: 2, t: "Qeshja me zë", d: "Konsensus i dijetarëve – qeshja me zë e prish namazin." },
              { n: 3, t: "Ngrënia dhe pirja", d: "Konsensus – e prish namazin." },
              { n: 4, t: "Lëvizja e tepërt (tri veprime radhazi)", d: "Hadith – Lëvizja e shumtë pa arsye e prish namazin." },
              { n: 5, t: "Prishja e abdestit", d: "Hadith Buhariu: 'Allahu nuk pranon namazin pa abdest.'" },
              { n: 6, t: "Kthimi i shpinës nga Kibla pa arsye", d: "Kur'an 2:144 – Detyrimi i drejtimit nga Kibla." },
              { n: 7, t: "Humbja e Nijetit ose ndryshimi i qëllimit", d: "Hadith: 'Veprat janë sipas qëllimeve.' (Buhariu)" },
              { n: 8, t: "Ngrënia e diçkaje mes dhëmbëve (nëse është e madhe)", d: "Konsensus juristësh." },
            ].map(p => <Item key={p.n} num={p.n} title={p.t} dalil={p.d} />)}
          </Section>
        </div>
      )}

      {/* ===== AGJËRIMI ===== */}
      {mainTab === "agjrimi" && (
        <div>
          <Section title="Kushtet e Agjërimit" icon={<Star className="w-5 h-5 text-amber-500" />} color="border-amber-300">
            <HadithBox
              arabic="يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ"
              text="Kur'an 2:183 – 'O ju që besuat, ju është bërë detyrë agjërimi, ashtu siç u ishte bërë detyrë atyre para jush, që të bëheni të devotshëm.'"
            />
            {[
              { n: 1, t: "Islam", d: "Kafiri nuk obligohet me agjërim." },
              { n: 2, t: "Pubertet (Baligh)", d: "Fëmija nuk obligohet, por mësohet." },
              { n: 3, t: "Mendja (Akl)", d: "I çmenduri nuk obligohet." },
              { n: 4, t: "Shëndeti (të jetë i shëndetshëm)", d: "Kur'an 2:184 – 'Ai që është i sëmurë ose në udhëtim, le të agjërojë aq ditë nga ditët tjera.'" },
              { n: 5, t: "Banues (jo udhëtar)", d: "Kur'an 2:185 – 'Kush është prezent (jo udhëtar) le të agjërojë muajin.'" },
              { n: 6, t: "Pastërtia nga Hajdi dhe Nifasi (për gratë)", d: "Hadith Buhariu: 'A nuk e lë namazi dhe agjërimi kur i vijnë menstruacionet?'" },
              { n: 7, t: "Nijeti (qëllimi) – bëhet natën", d: "Hadith Nesai: 'Kush nuk e bën nijetin e agjërimit para agimit, nuk ka agjërim.'" },
            ].map(k => <Item key={k.n} num={k.n} title={k.t} dalil={k.d} />)}
          </Section>

          <Section title="Çfarë e Prish Agjërimin" icon={<Shield className="w-5 h-5 text-red-500" />} color="border-red-300">
            {[
              { n: 1, t: "Ngrënia dhe pirja me qëllim", d: "Kur'an 2:187 – '...hani dhe pini derisa të dallohet fija e bardhë nga fija e zezë e agimit, pastaj plotësoni agjërimin deri natën.'" },
              { n: 2, t: "Marrëdhëniet intime", d: "Kur'an 2:187 – 'Tani afrohuni me to (gratë)...' – tregon se ditën është i ndaluar." },
              { n: 3, t: "Nxjerrja e qëllimshme e të vjellit", d: "Hadith Ebu Davudi: 'Kush e kthen (vjell) padashur, nuk ka Kaza, e kush e nxjerr me qëllim, le të bëjë Kaza.'" },
              { n: 4, t: "Menstruacionet ose Lehonia", d: "Hadith Buhariu – Profeti ﷺ e konfirmoi se ato e prishin agjërimin." },
              { n: 5, t: "Injeksioni me ushqim (jo ai mjekësor sipas shumicës)", d: "Analogji me ngrënien – diçka hyn në trup." },
              { n: 6, t: "Humbja e mendjes (çmenduria e plotë gjatë ditës)", d: "Konsensus juristësh." },
              { n: 7, t: "Ridda (largimi nga Islami)", d: "Vepra e bëhet e pavlefshme (Kur'an 39:65)." },
            ].map(p => <Item key={p.n} num={p.n} title={p.t} dalil={p.d} />)}
          </Section>
        </div>
      )}

      {/* ===== ZEKATI ===== */}
      {mainTab === "zekati" && (
        <div>
          <Section title="Kushtet e Zekatit" icon={<Star className="w-5 h-5 text-yellow-500" />} color="border-yellow-300">
            <HadithBox
              arabic="خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا"
              text="Kur'an 9:103 – 'Merr nga pasuria e tyre lëmoshë (zekat) me të cilën i pastroni dhe i lartësoni ata.'"
            />
            {[
              { n: 1, t: "Islam", d: "Kafiri nuk jep zekat." },
              { n: 2, t: "Pronësia e Nisabit (kufiri minimal i pasurisë)", d: "Hadith – Nisabi i arit: 20 mithkal (85g ar). Nisabi i argjendit: 200 dirhem (595g argjend)." },
              { n: 3, t: "Kalimi i vitit (Havlan el-Havl)", d: "Hadith Ebu Davudi: 'Nuk ka zekat në pasuri derisa të kalojë viti.'" },
              { n: 4, t: "Pronësia e plotë (Milk Tamm)", d: "Pasuria duhet të jetë nën pronësi të plotë, jo borxh." },
              { n: 5, t: "Pasuria të jetë e llojeve të zekatit", d: "Ari, argjendi, paratë, tregtia, blegëtoria, bujqësia." },
            ].map(k => <Item key={k.n} num={k.n} title={k.t} dalil={k.d} />)}
          </Section>

          <Section title="Sadakaja" icon={<Heart className="w-5 h-5 text-pink-500" />} color="border-pink-300">
            <Item title="Çfarë është Sadakaja?" text="Sadakaja është çdo bamirësi e vullnetshme për hir të Allahut. Mund të jetë me para, ushqim, fjalë të mirë, buzëqeshje, ose punë." dalil="Kur'an 2:261 – 'Shembulli i atyre që shpenzojnë pasurinë e tyre në rrugën e Allahut është si shembulli i një farës që mbin shtatë kallinj, me nga njëqind kokrra çdo kalli. Allahu ia shton kujt të dojë.'" />
            <Item title="Llojet e Sadakasë" text="1. Sadaka e vullnetshme (Nafile) – në çdo kohë. 2. Sadaka Xharije – vepra e vazhdueshme (pus, xhami, libër i dobishëm). 3. Sadaka Fitrit – obligim para Fitër Bajramit." dalil="Hadith Muslimi: 'Kur vdes njeriu, veprat e tij ndërpriten veç nga tri: sadakaja e vazhdueshme, dituria e dobishme, ose fëmija i mirë që lutet për të.'" />
          </Section>

          <Section title="Sadakaja e Fitrit" icon={<Star className="w-5 h-5 text-green-500" />} color="border-green-300">
            <HadithBox
              text="Ibni Omeri transmeton: 'I Dërguari i Allahut ﷺ e obligoi Sadakatu-l-Fitrin – një Sa' hurma ose elb – mbi çdo musliman, të lirë a skllav, mashkull a femër, të vogël a të madh.' (Buhariu dhe Muslimi)"
              tefsir="1 Sa' = afërsisht 2.5 - 3 kg ushqim bazë (grurë, oriz, etj.). Ose vlera e tij në para."
            />
            {[
              { n: 1, t: "Kushti: Islam", d: "Vetëm muslimanët e japin Fitrin." },
              { n: 2, t: "Kushti: Të kesh tepricë ushqimi për atë ditë", d: "Hadith – Njeriu jep edhe për familjen e vet." },
              { n: 3, t: "Koha e dhënies: Para namazit të Bajramit", d: "Hadith Ibni Abasi: 'Kush e jep para namazit është Zekat i pranuar, e kush e jep pas namazit është lëmoshë e zakonshme.'" },
              { n: 4, t: "Kujt i jepet: 8 kategorive si Zekati", d: "Kur'an 9:60 – 'Zeqatat janë vetëm për të varfrit, të mjerit...'" },
            ].map(k => <Item key={k.n} num={k.n} title={k.t} dalil={k.d} />)}
          </Section>
        </div>
      )}
    </div>
  );
}