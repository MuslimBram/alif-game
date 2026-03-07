import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const INITIAL_TABS = [
  { id: "germat", label: "Germat", icon: "🔤" },
  { id: "rrokjet", label: "Rrokjet", icon: "🎵" },
  { id: "fjalët", label: "Fjalët", icon: "📝" },
  { id: "numrat", label: "Numrat", icon: "🔢" },
  { id: "zgjedhimi", label: "Zgjedhimi", icon: "✏️" },
  { id: "lakimi", label: "Lakimi", icon: "📋" },
  { id: "medine", label: "Arabisht Medinë", icon: "📖" }
];

export default function DragDropTabs({ activeTab, onTabChange, adminEditMode, children }) {
  const [tabs, setTabs] = useState([]);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("alphabetTabsOrder");
    if (saved) {
      setTabs(JSON.parse(saved));
    } else {
      setTabs(INITIAL_TABS);
    }
  }, []);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const newTabs = Array.from(tabs);
    const [removed] = newTabs.splice(source.index, 1);
    newTabs.splice(destination.index, 0, removed);

    setTabs(newTabs);
    setIsDirty(true);
  };

  const handleSave = () => {
    localStorage.setItem("alphabetTabsOrder", JSON.stringify(tabs));
    setIsDirty(false);
  };

  const handleReset = () => {
    setTabs(INITIAL_TABS);
    localStorage.removeItem("alphabetTabsOrder");
    setIsDirty(false);
  };

  const handleToggleTab = (tabId) => {
    const newTabs = tabs.map(tab =>
      tab.id === tabId ? { ...tab, hidden: !tab.hidden } : tab
    );
    setTabs(newTabs);
    setIsDirty(true);
  };

  const visibleTabs = tabs.filter(tab => !tab.hidden);

  if (adminEditMode) {
    return (
      <div className="space-y-4">
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-bold text-amber-900 mb-1">✏️ Rëndisni & Përzgjidhni Fushat</p>
              <p className="text-xs text-amber-800">Tërhiqni për të ndryshuar rendin, klikoni për të fshehur/treguar</p>
            </div>
            <div className="flex gap-2">
              {isDirty && (
                <Button
                  size="sm"
                  onClick={handleSave}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                >
                  <Save className="w-4 h-4" /> Ruaj
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleReset}
                variant="outline"
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Rivendos
              </Button>
            </div>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tabs" direction="horizontal" type="TABS">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`flex flex-wrap gap-2 pb-2 ${snapshot.isDraggingOver ? "bg-blue-100 p-2 rounded-lg" : ""}`}
                >
                  {tabs.map((tab, index) => (
                    <Draggable key={tab.id} draggableId={tab.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all cursor-grab active:cursor-grabbing ${
                            snapshot.isDragging
                              ? "border-amber-500 bg-white shadow-lg"
                              : "border-gray-200 bg-white hover:border-amber-300"
                          } ${tab.hidden ? "opacity-50" : ""}`}
                        >
                          <div {...provided.dragHandleProps}>
                            <GripVertical className="w-4 h-4 text-gray-400" />
                          </div>
                          <button
                            onClick={() => handleToggleTab(tab.id)}
                            className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors"
                            title={tab.hidden ? "I fshehtë - klikoni për të treguar" : "I dukshëm - klikoni për të fshehur"}
                          >
                            {tab.icon} {tab.label}
                            {tab.hidden && " 👁️‍🗨️"}
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* Display tabs normally when editing */}
        <div className="flex flex-wrap gap-2 bg-white p-4 rounded-xl border border-gray-100">
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-400"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {children}
      </div>
    );
  }

  // Normal view without edit mode
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 bg-white p-4 rounded-xl border border-gray-100">
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-400"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}