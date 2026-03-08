import React, { useState } from "react";
import { ChevronDown, ChevronRight, BookOpen, Droplets, Star, Shield, Heart } from "lucide-react";
import FikhQuiz from "@/components/fikh/FikhQuiz";
import ZekatiCalculator from "@/components/fikh/ZekatiCalculator";
import PrayerGuide from "@/components/fikh/PrayerGuide";

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
    { id: "duate", label: "🌿 Duatë" },
    { id: "kuiz", label: "🎯 Kuiz" },
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
          <Section title="Hadithi i Isra & Mi'raxhit — me Argumente të Plota" icon={<Star className="w-5 h-5 text-indigo-500" />} color="border-indigo-300">
            <HadithBox
              title="1. Isra — Udhëtimi i Natës (nga Mekka në Jeruzalem)"
              arabic="سُبْحَانَ الَّذِي أَسْرَى بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى الَّذِي بَارَكْنَا حَوْلَهُ"
              text="Kur'an 17:1 – 'I Lartësuar është Ai që e çoi robin e Vet natën nga Mesxhidi Haram (Mekka) në Mesxhidi Aksa (Jeruzalem) — të cilin Ne e kemi bekuar rrethinën e tij — për t'i treguar atij nga shenjat Tona. Vërtet Ai është Dëgjuesi, Shikuesi.'"
              tefsir="'Isra' në arabisht do të thotë 'udhëtim nate'. Ndodhi vitin e 10-të ose 12-të të profetësisë — 'Viti i Pikëllimit' kur vdiqën Hatixheja dhe Ebu Talibi. Allahu ia ngriti shpirtin Profetit ﷺ me këtë mrekulli si ngushëllim hyjnor. Udhëtimi u bë me trup dhe shpirt, jo vetëm shpirtërisht — kjo e bën atë mrekulli të vërtetë dhe jo ëndërr."
            />
            <HadithBox
              title="Hadithi Detajues i Isra & Mi'raxhit"
              arabic="أُتِيتُ بِالْبُرَاقِ وَهُوَ دَابَّةٌ أَبْيَضُ طَوِيلٌ فَوْقَ الْحِمَارِ وَدُونَ الْبَغْلِ"
              text="Hadith Muslimi (162) — Enesi transmeton nga Profeti ﷺ: 'Më u soll Buraku — kafshë e bardhë, e gjatë, mbi gomarr dhe nën mushkë — vendos thundrat ku i shkon syri...' Profeti ﷺ u ngjit dhe arriti Bejtul Makdes, ku lidhi Burakun te unaza ku lidhnin profetët. Hyri dhe u fal dy rekat. Pastaj Xhibrili i solli dy kupa: një me qumësht, një me verë. Profeti ﷺ zgjodhi qumështin. Xhibrili tha: 'Zgjodhe natyrën (Fitran) e pastër.'"
              tefsir="Buraku është kafsha hyjnore e transportit. Zgjedhja e qumështit mbi verën simbolizon zgjedhjen e natyrës së pastër njerëzore dhe Islamit."
            />
            <HadithBox
              title="2. Mi'raxhi — Ngjitja nëpër 7 Qiej dhe Takimet me Profetët"
              arabic="ثُمَّ عُرِجَ بِي حَتَّى ظَهَرْتُ لِمُسْتَوًى أَسْمَعُ فِيهِ صَرِيفَ الأَقْلامِ"
              text="Hadith Buhariu (3887) — Profeti ﷺ: 'Pastaj u ngrita (nëpër qiej) deri sa arrita në nivel ku dëgjohet gërvima e penave (kur shkruhen caktimet hyjnore).'"
              tefsir="Mi'raxhi është ngjitja fizike dhe shpirtërore nëpër shtatë qiejt deri tek Allahu i Madhërishëm. Kjo mrekulli nuk ndodhi vetëm shpirtërisht — Kur'ani dhe Hadithi konfirmojnë se Profeti ﷺ udhëtoi me trup. Mushrikët e Mekës dyshuan pikërisht sepse ishte me trup."
            />
            {[
              { qiell: "Qielli i 1-rë", profet: "Ademi ﷺ", detail: "Profeti ﷺ e pa Ademin me shpirtra djathtas (banorë të Xhennetit) dhe majtas (banorë të Xhehenemit). Ademi ﷺ qante nga ata të majtë.", dalil: "Buhariu 3887, Muslimi 162" },
              { qiell: "Qielli i 2-të", profet: "Isa & Jahja ﷺ", detail: "I pa dy kushërinjtë — Isa bin Merjemi dhe Jahjaja. Të dy ishin me fytyrë të bukur dhe të ngjashëm.", dalil: "Muslimi 162" },
              { qiell: "Qielli i 3-të", profet: "Jusufi ﷺ", detail: "Profeti ﷺ e pa Jusufin — i kishte dhënë gjysëm të bukurisë (sipas hadithit). Fytyrën e tij si hëna e plotë.", dalil: "Muslimi 162" },
              { qiell: "Qielli i 4-të", profet: "Idrisi ﷺ", detail: "Allahu e lartësoi Idrisin në vend të lartë. (Kur'an 19:57 — 'Ne e lartësuam atë në vend të lartë.')", dalil: "Muslimi 162, Kur'an 19:57" },
              { qiell: "Qielli i 5-të", profet: "Haruni ﷺ", detail: "I ka ballin të gjatë dhe mjekrën të gjerë, të bardhë. I dashur nga populli i tij.", dalil: "Muslimi 162" },
              { qiell: "Qielli i 6-të", profet: "Musa ﷺ", detail: "Musa ﷺ qau pas ngjitjes. Pyetën: 'Pse qan?' Tha: 'Ky djalosh (Muhammedi ﷺ) që erdhi pas meje, do të hyjë në Xhennet me umet më të madh se imi.'", dalil: "Buhariu 3887, Muslimi 162" },
              { qiell: "Qielli i 7-të", profet: "Ibrahimi ﷺ", detail: "Ibrahimi ﷺ ishte mbështetur te Bejtul Mamur (Qabeja e qiellit) — çdo ditë hyjnë 70,000 engjëj dhe nuk kthehen më. Ibrahimi tha Profetit ﷺ: 'Transmeto selamin tim umetit tënd dhe tregoju se Xhenneti ka tokë të mirë, ujë të ëmbël e fushë të gjerë — farzet e tij janë: Subhanallah, Alhamdulilah, La ilahe ilallah, Allahu Ekber.'", dalil: "Buhariu 3887, Tirmidhiu 3462" },
            ].map((s, i) => (
              <div key={i} className="mb-3 bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-indigo-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <span className="font-bold text-indigo-900">{s.qiell} — {s.profet}</span>
                </div>
                <p className="text-sm text-gray-700 mb-2 ml-8">{s.detail}</p>
                <div className="ml-8 bg-indigo-100 rounded-lg px-3 py-1.5">
                  <p className="text-xs text-indigo-700 italic">📖 {s.dalil}</p>
                </div>
              </div>
            ))}
            <HadithBox
              title="3. Sidretul Munteha — Kufiri i Fundit"
              arabic="عِندَ سِدْرَةِ الْمُنتَهَىٰ ۝ عِندَهَا جَنَّةُ الْمَأْوَىٰ ۝ إِذْ يَغْشَى السِّدْرَةَ مَا يَغْشَىٰ"
              text="Kur'an 53:14-16 – 'Pranë Sidretul Muntes. Pranë saj është Xhenneti i Qëndrimit. Kur mbulonte Sidren ajo që e mbulon (drita hyjnore e engjëjve).'"
              tefsir="Sidretul Munteha është pema e fundit ku arrin dija e krijesave — asnjë engjëll apo profet nuk ka kaluar tej kësaj pike. Xhibrili qëndroi aty. Vetëm Profeti Muhammed ﷺ kaloi tej dhe iu afrua Allahut. Engjëjt e mbuloshin si flutura të artë."
            />
            <HadithBox
              title="4. Obligimi i Namazit — Dhurata e Isra & Mi'raxhit"
              arabic="فَفَرَضَ اللَّهُ عَلَى أُمَّتِي خَمْسِينَ صَلاَةً"
              text="Hadith Buhariu (3887) — Allahu obligoi fillimisht 50 namaze. Musa ﷺ i tha: 'Kthehu, umeti yt nuk mund t'i mbajë!' Profeti ﷺ u kthye vazhdimisht tek Allahu duke kërkuar lehtësim — derisa u bënë 5 namaze. Musa ﷺ sërish tha: 'Kthehu!' Por Profeti ﷺ tha: 'Jam turpëruar nga Zoti im, pranoj.' Allahu tha: 'Ke shpërblimin e 50-ve — Fjala Ime nuk ndryshon.'"
              tefsir="Namazi është dhurata e vetme nga Isra & Mi'raxhi — çdo obligim tjetër zbrit me Xhibrilin në tokë, por namazi u dha personalisht Profetit ﷺ mbi qiej. Ky është shkaku i madhështisë unike të namazit në Islam. | Kur'an 17:1 — Isra shpie direkt te kapitulli 17 'Beni Israil' ku trajtohen temat e namazit."
            />
            <HadithBox
              title="5. Çfarë Pa Profeti ﷺ gjatë Mi'raxhit (vizionet)"
              text="Hadith Buhariu (1386, 6519) — Profeti ﷺ pa: ata që hanin kamata (Riba) — duke notuar në lumë gjaku; ata që nuk i jepnin zekat — u rrëzoheshin gurë në gojë; zinaqarët — hanin mish të kalbur; ata që ndalnin namazin — i rriheshin kokat me gurë; ata që bënin backbiting (ghibet) — gërvishtnin fytyrat e tyre me thonj bakri; etj."
              tefsir="Allahu i tregoi Profetit ﷺ dënimet e veprave të këqija si paralajmërim — dhe Profeti ﷺ i transmetoi ato tek umeti për ta mbrojtur. Çdo dënim korrespondon me gjynahun specifik."
            />
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
          <Section title="Kushtet e Gusulit (Larja e Plotë) — Kur Obligohet?" icon={<Droplets className="w-5 h-5 text-teal-500" />} color="border-teal-300">
            <HadithBox
              arabic="وَإِن كُنتُمْ جُنُبًا فَاطَّهَّرُوا"
              text="Kur'an 5:6 – 'Dhe nëse jeni xhunub (papastër ritualisht), atëherë pastrohuni (me gusl).'"
              tefsir="Ky ajet është argumenti kryesor Kur'anor për obligimin e Gusulit. 'Xhunub' nënkupton gjendjen e papastërtisë rituale që kërkon larim të plotë të trupit."
            />
            <HadithBox
              arabic="إِذَا الْتَقَى الْخِتَانَانِ وَجَبَ الْغُسْلُ"
              text="Hadith Muslimi (349) – Profeti ﷺ tha: 'Kur takohen dy synetllarjet (kryhet martedhënia), bëhet obligim Gusuli — edhe pa derdhje.'"
              tefsir="Ky hadith sqaron se marrëdhënia intime, edhe pa ejakulim, e obligon Guslin. Ishte keqkuptim i hershëm mes sahabëve dhe ky hadith e sqaroi çështjen."
            />
            <p className="text-sm font-bold text-teal-800 mb-3 mt-2">📌 Rastet kur Gusuli bëhet Farz (i obliguar):</p>
            {[
              {
                t: "1. Marrëdhëniet intime (edhe pa derdhje spermë)",
                d: "Kur'an 4:43 – 'Ose keni qenë xhunub (papastër), atëherë pastrohuni.' | Hadith Muslimi: 'Kur takohen dy synetllarjet, Gusuli bëhet obligim.'",
              },
              {
                t: "2. Derdhja e spermës (ihtilam — ëndërr e lagur, ose me vetëdije)",
                d: "Hadith Muslimi (343): Profeteshja e Allahut (s.a.s) pyeti Profetin ﷺ: 'A obligohet gruaja me Gusl kur sheh ëndërr?' Tha: 'Po, nëse sheh ujë (lëng).' | Kur'an 5:6 — 'Nëse jeni xhunub, pastrohuni.'",
              },
              {
                t: "3. Menstruacionet (Hajdi)",
                d: "Kur'an 2:222 – 'Ato pyesin ty për menstruacionet. Thuaj: Është papastërti, qëndroni larg grave gjatë menstruacioneve dhe afrohuni atyre kur të pastrohen (Gusul kryejnë).' | Hadith Buhariu: Profeti ﷺ i tha Fatimes bint Ebi Hubejsh: 'Kur të vijë hajdi, le të lëre namazin, e kur të iket, le të lahet (gusl) dhe të falë namaz.'",
              },
              {
                t: "4. Lehonia — Nifasi (gjaku pas lindjes)",
                d: "Konsensus i dijetarëve (Ixhma) — Nifasi trajtohet si Hajdi në çdo aspekt. | Ibni Kudama (Al-Mughni): 'Nifasi ka të njëjtat dispozita si Hajdi në obligimin e Gusulit, ndalimin e namazit dhe agjërimit.'",
              },
              {
                t: "5. Pranimi i Islamit (kur dikush bëhet musliman i ri)",
                d: "Hadith i saktë: Kejs ibn Asim r.a. kur pranoi Islamin, Profeti ﷺ e urdhëroi të lahej me ujë dhe Sidr (gjethe lote). (Transmeton Ebu Davudi 355, Nesai 188 — Albani e vlerësoi sahih). | Mendimi më i fortë: Gusuli është mustehab (i rekomanduar) për të riun musliman — por shumë dijetarë e konsiderojnë obligim nëse ka qenë xhunub apo kishte menstruacione para pranimit.",
              },
              {
                t: "6. Vdekja — Larja e të vdekurit (Farz Kifaje)",
                d: "Hadith Buhariu (1254): Profeti ﷺ, kur ra djali i tij nga kali, tha: 'Laheni atë me ujë dhe Sidr.' | Kur'an (analogji): Pastërtia është e detyrueshme — dhe dijetarët e nxorën nga Sunneti obligimin e larjes së të vdekurit musliman.",
              },
              {
                t: "7. Namazi i Xhumasë (Gusul — Mustehab/Sunet i fortë)",
                d: "Hadith Buhariu (877): Profeti ﷺ tha: 'Gusuli i Xhumasë është obligim (hakk) mbi çdo të rritur (baligh).' | Shumica e dijetarëve: është Sunet Muekked (sunet i fortë), jo farz. Ibni Hazmi dhe disa dijetarë tjerë e konsiderojnë Farz.",
              },
            ].map((g, i) => <Item key={i} title={g.t} dalil={g.d} />)}

            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-xl p-4 mt-4 mb-3">
              <p className="text-amber-900 text-sm font-bold mb-2">⚠️ Shënim i rëndësishëm për Islamin e ri:</p>
              <p className="text-amber-800 text-sm leading-relaxed">
                Dijetarët kanë dy mendime: <strong>(1) Shafiu dhe Hambeliu:</strong> Gusuli është obligim për të riun musliman. <strong>(2) Hanefiu dhe Malikiu:</strong> është Mustehab (i rekomanduar). Argument shtesë: Thumame ibn Uthal r.a. kur pranoi Islamin, shkoi e u la vetë pa u urdhëruar nga Profeti ﷺ (Muslimi).
              </p>
            </div>

            <p className="text-sm font-semibold text-gray-600 mb-3 mt-4">📌 Farzet e Gusulit (minimumi i obligueshëm — 3 gjëra):</p>
            {[
              { n: 1, t: "Nijeti", d: "Kur'an 98:5 — 'Dhe nuk u urdhëruan ndryshe veçse të adhurojnë Allahun, duke i kushtuar atij sinqerisht fenë.' | Hadith Buhariu: 'Veprat janë sipas qëllimeve.'" },
              { n: 2, t: "Shpëlarja e gojës dhe hundës", d: "Hadith — shumica e dijetarëve e konsiderojnë farz. Hanefiu: farz. Shafiu: sunet." },
              { n: 3, t: "Larja e të gjithë trupit me ujë", d: "Kur'an 5:6 – 'Pastrohuni (launi të gjithë trupin).' | Hadith Muslimi: Profeti ﷺ hidhte ujë mbi kokën e tij tre herë, pastaj lante të gjithë trupin." },
            ].map(f => <Item key={f.n} num={f.n} title={f.t} dalil={f.d} />)}

            <p className="text-sm font-semibold text-gray-600 mb-3 mt-4">📌 Mënyra e Gusulit sipas Sunnetit (e plotë):</p>
            <div className="bg-teal-50 rounded-xl p-4 text-sm text-teal-900 leading-relaxed space-y-2">
              <p><strong>1.</strong> Nijet (qëllim i sinqertë në zemër)</p>
              <p><strong>2.</strong> Bism'Allah — "Me emrin e Allahut"</p>
              <p><strong>3.</strong> Laj duart 3 herë</p>
              <p><strong>4.</strong> Pastro vendet intime me dorën e majtë</p>
              <p><strong>5.</strong> Merr abdest të plotë (si namazi) — shpëlarë gojën dhe hundën</p>
              <p><strong>6.</strong> Derdh ujë mbi kokë 3 herë — sigurohu që arrin rrënjën e flokëve</p>
              <p><strong>7.</strong> Laj anën e djathtë të plotë</p>
              <p><strong>8.</strong> Laj anën e majtë të plotë</p>
              <p><strong>9.</strong> Mos harro: pas veshëve, nën sqetullat, mes gishtave, nën gjunjët</p>
              <div className="bg-teal-100 rounded-lg p-3 mt-2 border-l-4 border-teal-600">
                <p className="text-xs text-teal-800">📖 <strong>Hadith Buhariu (248):</strong> Aishja r.a. përshkroi Guslin e Profetit ﷺ: "Ai fillonte duke larë duart, pastaj merrte abdest si namazi, pastaj futte gishtat në ujë dhe fërkonte rrënjën e flokëve, pastaj hidhte tre grushta ujë mbi kokë, pastaj lante të gjithë lëkurën."</p>
              </div>
            </div>
          </Section>
        </div>
      )}

      {/* ===== NAMAZI ===== */}
      {mainTab === "namazi" && (
        <div>
          <Section title="Kohët e 5 Namazeve" icon={<BookOpen className="w-5 h-5 text-emerald-600" />} color="border-emerald-300">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-emerald-50">
                  <th className="border border-emerald-200 p-2 text-left">Namazi</th>
                  <th className="border border-emerald-200 p-2">Rekat (Sunnet+Farz+Sunnet)</th>
                  <th className="border border-emerald-200 p-2">Koha</th>
                </tr></thead>
                <tbody>
                  {[
                    ["🌅 Sabahu (Fajri)", "2s + 2f", "Nga agimi deri para lindjes së diellit"],
                    ["☀️ Dreka (Dhuhri)", "4s + 4f + 2s + 2s witr", "Nga mesditja deri sa hija = objekti"],
                    ["🌤️ Ikindia (Asri)", "4s + 4f", "Nga hija=2×objekt deri perëndim"],
                    ["🌇 Akshami (Magribi)", "3f + 2s", "Sapo perëndon dielli"],
                    ["🌙 Jacia (Isha)", "4s + 4f + 2s + 3 witr", "Nga zi e errët deri agim"],
                  ].map(([n, r, k], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-200 p-2 font-semibold">{n}</td>
                      <td className="border border-gray-200 p-2 text-center text-xs">{r}</td>
                      <td className="border border-gray-200 p-2 text-gray-600 text-xs">{k}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2 italic">s = sunnet, f = farz | Kur'an 4:103 — Namazi është i obligueshëm në kohë të caktuara.</p>
          </Section>

          <Section title="Hapat e Namazit — Mënyra e Faljes" icon={<Star className="w-5 h-5 text-emerald-500" />} color="border-emerald-300">
            <p className="text-xs text-gray-500 mb-3">Mënyra e faljes sipas Sunnetit të Profetit ﷺ (Buhariu, Muslimi)</p>
            {[
              {
                n: 1, t: "Nijeti (Qëllimi)", text: "Bëj nijetin me zemër (jo me gojë sipas shumicës) për namazin specifik.",
                arabic: "", translit: "", sq: ""
              },
              {
                n: 2, t: "Tekbiri Fillestar (Allahu Ekber)", text: "Ngri duart deri te veshët ose supet dhe thuaj:",
                arabic: "اللَّهُ أَكْبَرُ", translit: "Allāhu akbar", sq: "Allahu është më i Madhi"
              },
              {
                n: 3, t: "Duaja Fillestare (Iftitah)", text: "Pas Tekbirit, thuaj kësaj duaje (sunet):",
                arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
                translit: "Subhānaka Allāhumma wa bi-ḥamdika wa tabāraka smuka wa taʿālā jadduka wa lā ilāha ghayruk",
                sq: "I pastër je Ti, o Allah, lavdia të takon, i bekuar është emri Yt, i Lartë madhështia Jote dhe nuk ka zot tjetër pos Teje."
              },
              {
                n: 4, t: "El-Fatiha", text: "Lexo suren El-Fatiha — detyrë (farz) në çdo rekat:",
                arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ...",
                translit: "Bismillāhi r-raḥmāni r-raḥīm. Al-ḥamdu lillāhi rabbi l-ʿālamīn...",
                sq: "Me emrin e Allahut, të Gjithëmëshirshmit, Mëshirëplotit. Lavdërimi i takon Allahut..."
              },
              {
                n: 5, t: "Sure ose Ajete shtesë", text: "Pas Fatihës, lexo sure ose ajete (sunet në 2 rekatet e para të Farzit):",
                arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ...", translit: "Qul huwa-llāhu aḥad...",
                sq: "Mund të lexosh Al-Ikhlas, Al-Falaq, An-Nas ose çdo sure tjetër."
              },
              {
                n: 6, t: "Rukuja (Përkulja)", text: "Perkulj trupin horizontalisht — shpina e drejtë, duart te gjunjët:",
                arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ", translit: "Subḥāna rabbiya l-ʿaẓīm",
                sq: "I pastër je Ti, Zoti im, i Madhi! — Përsërit 3 herë"
              },
              {
                n: 7, t: "Ngritja nga Rukuja", text: "Ngrihu duke thënë:",
                arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ", translit: "Samiʿa-llāhu li-man ḥamidah",
                sq: "Allahu dëgjon atë që Atë lavdëron! — pastaj: Rabbenā wa laka l-ḥamd."
              },
              {
                n: 8, t: "Sexhdeja e Parë", text: "Bie me gjunjë, duart, ballë dhe hundë tokës — 7 gjymtyrë:",
                arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى", translit: "Subḥāna rabbiya l-aʿlā",
                sq: "I pastër je Ti, Zoti im, i Larti! — Përsërit 3 herë"
              },
              {
                n: 9, t: "Qëndrimi mes dy Sexhdeve", text: "Ngrihu mes dy sexhdeve dhe thuaj:",
                arabic: "رَبِّ اغْفِرْ لِي", translit: "Rabb-ighfir lī",
                sq: "Zoti im, më fal! — Thuhet 3 herë"
              },
              {
                n: 10, t: "Sexhdeja e Dytë", text: "Bie sërish në sexhde dhe thuaj si sexhden e parë.",
                arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى", translit: "Subḥāna rabbiya l-aʿlā",
                sq: "I pastër je Ti, Zoti im, i Larti! — 3 herë. Kjo mbyll rekatin e parë."
              },
              {
                n: 11, t: "Et-Tehijjat (Ulja e Fundit)", text: "Pas dy rekateve, ulu dhe lexo Et-Tehijjat:",
                arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ السَّلامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ السَّلامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
                translit: "At-taḥiyyātu lillāhi wa-ṣ-ṣalawātu wa-ṭ-ṭayyibāt...",
                sq: "Përshëndetjet janë për Allahun, lutjet dhe veprat e mira. Selami mbi ty, o Profet, dhe mëshira e Allahut e bereqeti i Tij..."
              },
              {
                n: 12, t: "Salavati (Durud Ibrahim)", text: "Pas Tehijjatit, lexo Salavatët:",
                arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
                translit: "Allāhumma ṣalli ʿalā Muḥammadin wa ʿalā āli Muḥammadin kamā ṣallayta ʿalā Ibrāhīma...",
                sq: "O Allah, bekoje Muhamedin dhe familjen e Muhamedit, ashtu siç bekove Ibrahimin dhe familjen e tij."
              },
              {
                n: 13, t: "Selami i Fundit (Tesvim)", text: "Kthehu djathtas pastaj majtas duke thënë:",
                arabic: "السَّلامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ", translit: "As-salāmu ʿalaykum wa raḥmatu-llāh",
                sq: "Paqja dhe mëshira e Allahut qofshin mbi ju! — Kjo mbyll namazin."
              },
            ].map((step, i) => (
              <div key={i} className="mb-3 bg-white rounded-xl p-4 border border-gray-100 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block bg-emerald-600 text-white text-xs font-bold rounded-full w-6 h-6 text-center leading-6 flex-shrink-0">{step.n}</span>
                  <span className="font-bold text-gray-800">{step.t}</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{step.text}</p>
                {step.arabic && (
                  <>
                    <p className="text-right text-lg font-bold text-gray-900 leading-loose mb-1" style={{ fontFamily: "Amiri, serif", direction: "rtl" }}>{step.arabic}</p>
                    <p className="text-xs text-teal-700 italic mb-1">{step.translit}</p>
                    <p className="text-xs text-gray-600">"{step.sq}"</p>
                  </>
                )}
              </div>
            ))}
          </Section>

          <Section title="Kushtet e Namazit" icon={<BookOpen className="w-5 h-5 text-blue-600" />} color="border-blue-300">
            <p className="text-sm font-semibold text-gray-600 mb-3">📌 Kushtet para Namazit (Shart):</p>
            {[
              { n: 1, t: "Islam", d: "Kur'an 98:5 – 'Dhe nuk u urdhëruan ndryshe veçse të adhurojnë Allahun...'" },
              { n: 2, t: "Mendja (akli)", d: "I çmenduri nuk obligohet. Hadith: 'Lapsi ngrihet nga tri persona.'" },
              { n: 3, t: "Mosha (pubertet)", d: "Hadith Ebu Davudi: 'Urdhëroni fëmijët të falin namaz në 7 vjeç.'" },
              { n: 4, t: "Abdest (Tahare nga Hadesi)", d: "Kur'an 5:6 – 'O ju që besuat, kur të ngriheni për namaz, lani fytyrat tuaja...'" },
              { n: 5, t: "Pastërtia e trupit, rrobave dhe vendit", d: "Kur'an 74:4 – 'Dhe rrobat e tua pastro!'" },
              { n: 6, t: "Mbulimi i Auretit", d: "Kur'an 7:31 – 'vishuni bukur (mbuloni auratin) për çdo namaz.'" },
              { n: 7, t: "Drejtimi nga Kibla", d: "Kur'an 2:144 – 'Kthehu fytyrën nga Mesxhidul Haram.'" },
              { n: 8, t: "Hyrja e kohës", d: "Kur'an 4:103 – 'Namazi është i obligueshëm në kohë të caktuara.'" },
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
              { n: 7, t: "Humbja e Nijetit ose ndryshimi i qëllimit", d: "Hadith: 'Veprat janë sipas qëllimeve.'" },
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

      {/* ===== DUATË ===== */}
      {mainTab === "duate" && (
        <div className="space-y-4">
          {[
            {
              title: "Dua para gjumit", arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
              translit: "Bismikal-lāhumma amūtu wa-aḥyā",
              sq: "Me emrin Tënd, o Allah, vdes dhe jetoj (fle dhe zgjoj).",
              source: "Buhariu"
            },
            {
              title: "Dua pas zgjimit", arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
              translit: "Al-ḥamdu lillāhi lladhī aḥyānā baʿda mā amātanā wa-ilayhi n-nushūr",
              sq: "Falënderimet i takojnë Allahut që na dha jetë pas vdekjes (gjumit) dhe tek Ai është ringjallja.",
              source: "Buhariu"
            },
            {
              title: "Dua para ngrënies", arabic: "بِسْمِ اللَّهِ",
              translit: "Bismillāh",
              sq: "Me emrin e Allahut.",
              source: "Ebu Davudi — nëse harron shto: بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ"
            },
            {
              title: "Dua pas ngrënies", arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
              translit: "Al-ḥamdu lillāhi lladhī aṭʿamanā wa-saqānā wa-jaʿalanā muslimīn",
              sq: "Falënderimet i takojnë Allahut që na ushqeu, na dha të pijë dhe na bëri muslimanë.",
              source: "Ebu Davudi, Tirmidhiu"
            },
            {
              title: "Dua kur hyn në shtëpi", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلَجِ وَخَيْرَ الْمَخْرَجِ",
              translit: "Allāhumma innī asaluka khayra l-mawlaji wa-khayra l-makhraj",
              sq: "O Allah, kërkoj prej Teje mirën e hyrjes dhe mirën e daljes.",
              source: "Ebu Davudi"
            },
            {
              title: "Dua kur del nga shtëpia", arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
              translit: "Bismillāhi tawakkaltu ʿala-llāhi lā ḥawla wa-lā quwwata illā billāh",
              sq: "Me emrin e Allahut, i mbështetem Allahut, nuk ka fuqi dhe pushtet veçse me Allahun.",
              source: "Ebu Davudi, Tirmidhiu"
            },
            {
              title: "Dua para abdestit", arabic: "بِسْمِ اللَّهِ",
              translit: "Bismillāh",
              sq: "Me emrin e Allahut.",
              source: "Ebu Davudi — obligative sipas shumë dijetarëve"
            },
            {
              title: "Dua pas abdestit (Shehadeti)", arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
              translit: "Ashhadu an lā ilāha illā-llāhu wa-ashhadu anna Muḥammadan ʿabduhu wa-rasūluh",
              sq: "Dëshmoj se nuk ka zot tjetër pos Allahut dhe dëshmoj se Muhammedi është robi dhe i dërguri i Tij.",
              source: "Muslimi — hapen 8 dyert e Xhennetit"
            },
            {
              title: "Istigfar — Kërkim faljeje", arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
              translit: "Astaghfiru-llāha l-ʿaẓīma lladhī lā ilāha illā huwa l-ḥayyu l-qayyūmu wa-atūbu ilayh",
              sq: "Kërkoj falje nga Allahu i Madhërishëm, i Cili nuk ka zot tjetër pos Tij, i Gjallë, i Qëndrueshëm, dhe pendohem tek Ai.",
              source: "Ebu Davudi, Tirmidhiu — Sejjid'ul-Istigfar"
            },
            {
              title: "Dua kur ndjej pikëllim", arabic: "لَا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
              translit: "Lā ilāha illā anta subḥānaka innī kuntu mina ẓ-ẓālimīn",
              sq: "Nuk ka zot tjetër pos Teje, i Lartësuar je Ti, unë isha nga zullumqarët.",
              source: "Kur'an 21:87 — Dua e Junusit ﷺ kur ishte në barku të balenës"
            },
          ].map((dua, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h3 className="font-bold text-gray-800 text-sm mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                {dua.title}
              </h3>
              <p className="text-right text-xl font-bold text-gray-900 mb-2 leading-loose" style={{ fontFamily: "Amiri, serif", direction: "rtl" }}>
                {dua.arabic}
              </p>
              <p className="text-sm text-teal-700 italic mb-1">{dua.translit}</p>
              <p className="text-sm text-gray-700 leading-relaxed">"{dua.sq}"</p>
              <p className="text-xs text-emerald-600 font-semibold mt-2">— {dua.source}</p>
            </div>
          ))}
        </div>
      )}

      {/* ===== KUIZ ===== */}
      {mainTab === "kuiz" && (
        <div>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4 mb-4 text-center">
            <p className="text-sm text-emerald-700 font-medium">
              📚 Kuiz nga të gjitha temat: Akide, Pastërtia, Namazi, Agjërimi, Zekati
            </p>
          </div>
          <FikhQuiz />
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

          <div className="mb-4"><ZekatiCalculator /></div>

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