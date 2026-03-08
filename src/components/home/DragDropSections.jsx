import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical, Save, RotateCcw, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminCardOverlay from "@/components/admin/AdminCardOverlay";
import TimeHeaderWidget from "@/components/home/TimeHeaderWidget";
import DailyVerse from "@/components/home/DailyVerse";
import PrayerTimesWidget from "@/components/home/PrayerTimesWidget";
import PrayerPositionsGuide from "@/components/home/PrayerPositionsGuide";
import QuickStats from "@/components/home/QuickStats";
import TriLanguageTranslator from "@/components/home/TriLanguageTranslator";
import VisitorOpinions from "@/components/home/VisitorOpinions";

const INITIAL_SECTIONS = [
{ id: "timeheader", name: "🕐 Ora & Kalendari", component: TimeHeaderWidget },
{ id: "dailyverse", name: "📖 Ajeti i Ditës", component: DailyVerse },
{ id: "prayertimes", name: "🕌 Oraret e Namazit", component: PrayerTimesWidget },
{ id: "prayerpositions", name: "🙏 Pozicionet e Namazit", component: PrayerPositionsGuide },
{ id: "quickstats", name: "⚡ Lidhje të Shpejta", component: QuickStats },
{ id: "translator", name: "🌐 Përkthyesi 3-Gjuhësor", component: TriLanguageTranslator },
{ id: "opinions", name: "💬 Opinione Vizitorësh", component: VisitorOpinions }];


export default function DragDropSections({ adminEditMode, isAdmin, prayerTimes, onPrayerTimesUpdate }) {
  const [sections, setSections] = useState([]);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("homeSectionsOrder");
    if (saved) {
      try {
        const savedIds = JSON.parse(saved).map((s) => s.id);
        const rebuilt = savedIds.
        map((id) => INITIAL_SECTIONS.find((s) => s.id === id)).
        filter(Boolean);
        // Add any new sections not in saved order
        INITIAL_SECTIONS.forEach((s) => {
          if (!rebuilt.find((r) => r.id === s.id)) rebuilt.push(s);
        });
        setSections(rebuilt);
      } catch {
        setSections(INITIAL_SECTIONS);
      }
    } else {
      setSections(INITIAL_SECTIONS);
    }
  }, []);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const newSections = Array.from(sections);
    const [removed] = newSections.splice(source.index, 1);
    newSections.splice(destination.index, 0, removed);

    setSections(newSections);
    setIsDirty(true);
  };

  const handleSave = () => {
    localStorage.setItem("homeSectionsOrder", JSON.stringify(sections.map((s) => ({ id: s.id, name: s.name }))));
    setIsDirty(false);
  };

  const handleReset = () => {
    setSections(INITIAL_SECTIONS);
    localStorage.removeItem("homeSectionsOrder");
    setIsDirty(false);
  };

  if (!adminEditMode) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {sections.map((section) => {
          const Component = section.component;
          return (
            <div key={section.id}>
              <Component prayerTimes={prayerTimes} onPrayerTimesUpdate={onPrayerTimesUpdate} adminEditMode={adminEditMode} />
            </div>);

        })}
      </div>);

  }

  // Admin edit mode - show drag handles and edit buttons on each section

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-amber-900 mb-1">✏️ Rëndisni Seksionet</p>
            <p className="text-xs text-amber-800">Tërhiqni dhe lëshoni për të ndryshuar rendin</p>
          </div>
          <div className="flex gap-2">
            {isDirty &&
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">

                <Save className="w-4 h-4" /> Ruaj
              </Button>
            }
            <Button
              size="sm"
              onClick={handleReset}
              variant="outline"
              className="gap-2">

              <RotateCcw className="w-4 h-4" /> Rivendos
            </Button>
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided, snapshot) =>
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-4 ${snapshot.isDraggingOver ? "bg-blue-50 rounded-xl p-4" : ""}`}>

              {sections.map((section, index) => {
              const Component = section.component;
              return (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                    {(provided, snapshot) =>
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`relative group bg-white rounded-xl border-2 overflow-hidden transition-all ${
                    snapshot.isDragging ?
                    "border-amber-500 shadow-lg scale-105 rotate-2" :
                    "border-gray-200 hover:border-amber-400"}`
                    }>

                        {/* Drag handle - top left */}
                        <div
                      {...provided.dragHandleProps}
                      className="absolute top-2 left-2 z-20 bg-amber-500 text-white rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing shadow-lg"
                      title="Tërhiq për të rirenditur">

                          <GripVertical className="w-4 h-4" />
                        </div>
                        {/* Section label */}
                        


                        {/* Edit button - top right */}
                        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="bg-amber-500 text-white rounded-lg px-2 py-1.5 text-xs font-semibold flex items-center gap-1 shadow-lg">
                            <Pencil className="w-3.5 h-3.5" /> Edit
                          </span>
                        </div>
                        <div className="p-4 opacity-60 pointer-events-none">
                          <Component prayerTimes={prayerTimes} onPrayerTimesUpdate={onPrayerTimesUpdate} adminEditMode={false} />
                        </div>
                      </div>
                  }
                  </Draggable>);

            })}
              {provided.placeholder}
            </div>
          }
        </Droppable>
      </DragDropContext>
    </div>);

}