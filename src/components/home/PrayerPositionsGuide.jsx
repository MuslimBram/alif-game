import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const PRAYER_POSITIONS = [
{
  name: "Istanding (Qiyam)",
  description: "Qëndrim në këmbë",
  figure: "🧍",
  hadith: "Nafi transmeton: Kjo është gjendje bazë e namazit.",
  quran: "Kur'an 2:238",
  details: "Qëndrime në këmbë në respekt të Allahut, me duart përpara vetes ose të palosura sipas shkollës."
},
{
  name: "Ruku (Përkulje)",
  description: "Përkulje në bel me 90°",
  figure: "🙇",
  hadith: "Abu Hurayra transmeton: Profeti (PBUH) tha 'Është e pamundur të kesh namaz të plotë nëse nuk përkundeshe deri sa të rreshtohet shpina'.",
  quran: "Kur'an 4:102",
  details: "Përkulja në bel, duart në gunjat e këmbëve, shpia e drejtë, fytyrë paralele me tokën."
},
{
  name: "Julus (Ulur)",
  description: "Ulur mes dy prostracionesh",
  figure: "🧎",
  hadith: "Ibn Abbas transmeton: Ky moment është për dhënien e shëndeti dhe kujtesë të Allahut.",
  quran: "Kur'an 22:77",
  details: "Ulur mes dy prostracionesh, shpina e drejtë, duart në gunjat ose në rrip."
},
{
  name: "Sujud (Prosternacion)",
  description: "Prosternacion (7 pjesë në tokë)",
  figure: "🤲",
  hadith: "Abu Malik Al-Ash'ari transmeton: Profeti (PBUH) tha 'Në Sujud jemi më afër Allahut, prandaj shumezohet dua në këtë gjendje'.",
  quran: "Kur'an 96:19",
  details: "7 pjesë të trupit në tokë: fytyrë, të dy palmët, të dy gjunjat, të dy këmbët. Kjo është pozicioni më i nënshtruar."
},
{
  name: "At-Tashahhud",
  description: "Ulur përfundimtar dhe dua",
  figure: "🙏",
  hadith: "Abdullah bin Mas'ud transmeton: Profeti (PBUH) e mësoi ne at-tashahhud përpara mbylljes në namaz.",
  quran: "Kur'an 33:56",
  details: "Ulur në gunjat, tillja e gishtit të parë të këmbës së djathtë, dua për Profet (PBUH) dhe shëlbesim mbi të."
}];


export default function PrayerPositionsGuide() {
  const [expanded, setExpanded] = useState(null);

  return null;






































































}