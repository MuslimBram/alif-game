import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Shield, Plus, Trash2, Save, BookMarked, Languages, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const categoryOptions = [
  "noon_sakinah", "meem_sakinah", "madd", "qalqalah", "ghunnah",
  "idgham", "ikhfa", "iqlab", "izhar", "tjera"
];
const levelOptions = ["fillestar", "mesatar", "avancuar", "profesionist"];
const languageOptions = ["shqip", "anglisht", "arabisht"];

function TajweedForm({ onSave, initial, onCancel }) {
  const [form, setForm] = useState(initial || {
    name_sq: "", name_ar: "", arabic_symbol: "", category: "noon_sakinah",
    level: "fillestar", description_sq: "", example_text: "",
    example_transliteration: "", letters: "", duration: "", order_index: 0
  });

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Emri (Shqip)</Label>
          <Input value={form.name_sq} onChange={e => handleChange("name_sq", e.target.value)} />
        </div>
        <div>
          <Label>Emri (Arabisht)</Label>
          <Input value={form.name_ar} onChange={e => handleChange("name_ar", e.target.value)} dir="rtl" />
        </div>
        <div>
          <Label>Simboli Arab</Label>
          <Input value={form.arabic_symbol} onChange={e => handleChange("arabic_symbol", e.target.value)} dir="rtl" />
        </div>
        <div>
          <Label>Kategoria</Label>
          <Select value={form.category} onValueChange={v => handleChange("category", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {categoryOptions.map(c => <SelectItem key={c} value={c}>{c.replace(/_/g, " ")}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Niveli</Label>
          <Select value={form.level} onValueChange={v => handleChange("level", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {levelOptions.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Kohëzgjatja (diple)</Label>
          <Input value={form.duration} onChange={e => handleChange("duration", e.target.value)} />
        </div>
        <div>
          <Label>Shkronjat</Label>
          <Input value={form.letters} onChange={e => handleChange("letters", e.target.value)} dir="rtl" />
        </div>
        <div>
          <Label>Radhitja</Label>
          <Input type="number" value={form.order_index} onChange={e => handleChange("order_index", parseInt(e.target.value) || 0)} />
        </div>
      </div>
      <div>
        <Label>Përshkrimi (Shqip)</Label>
        <Textarea value={form.description_sq} onChange={e => handleChange("description_sq", e.target.value)} rows={3} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Shembull (Arabisht)</Label>
          <Input value={form.example_text} onChange={e => handleChange("example_text", e.target.value)} dir="rtl" />
        </div>
        <div>
          <Label>Transliterim</Label>
          <Input value={form.example_transliteration} onChange={e => handleChange("example_transliteration", e.target.value)} />
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        {onCancel && <Button variant="outline" onClick={onCancel}>Anulo</Button>}
        <Button onClick={() => onSave(form)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Save className="w-4 h-4 mr-2" /> Ruaj
        </Button>
      </div>
    </div>
  );
}

function LetterForm({ onSave, initial, onCancel }) {
  const [form, setForm] = useState(initial || {
    letter: "", language: "shqip", pronunciation: "", description: "",
    form_uppercase: "", form_lowercase: "", level: "fillestar",
    example_words: [], order_index: 0
  });

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Shkronja</Label>
          <Input value={form.letter} onChange={e => handleChange("letter", e.target.value)} />
        </div>
        <div>
          <Label>Gjuha</Label>
          <Select value={form.language} onValueChange={v => handleChange("language", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {languageOptions.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Niveli</Label>
          <Select value={form.level} onValueChange={v => handleChange("level", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {levelOptions.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Shqiptimi</Label>
          <Input value={form.pronunciation} onChange={e => handleChange("pronunciation", e.target.value)} />
        </div>
        <div>
          <Label>Radhitja</Label>
          <Input type="number" value={form.order_index} onChange={e => handleChange("order_index", parseInt(e.target.value) || 0)} />
        </div>
        <div>
          <Label>Forma e madhe</Label>
          <Input value={form.form_uppercase} onChange={e => handleChange("form_uppercase", e.target.value)} />
        </div>
        <div>
          <Label>Forma e vogël</Label>
          <Input value={form.form_lowercase} onChange={e => handleChange("form_lowercase", e.target.value)} />
        </div>
      </div>
      <div>
        <Label>Përshkrimi</Label>
        <Textarea value={form.description} onChange={e => handleChange("description", e.target.value)} rows={2} />
      </div>
      <div className="flex gap-3 justify-end">
        {onCancel && <Button variant="outline" onClick={onCancel}>Anulo</Button>}
        <Button onClick={() => onSave(form)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Save className="w-4 h-4 mr-2" /> Ruaj
        </Button>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [showTajweedForm, setShowTajweedForm] = useState(false);
  const [showLetterForm, setShowLetterForm] = useState(false);
  const [editingTajweed, setEditingTajweed] = useState(null);
  const [editingLetter, setEditingLetter] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const u = await base44.auth.me();
        setUser(u);
      } catch (e) {}
    };
    loadUser();
  }, []);

  const { data: tajweedRules = [] } = useQuery({
    queryKey: ["admin-tajweed"],
    queryFn: () => base44.entities.TajweedRule.list("order_index", 200),
  });

  const { data: letters = [] } = useQuery({
    queryKey: ["admin-letters"],
    queryFn: () => base44.entities.AlphabetLetter.list("order_index", 200),
  });

  const createTajweed = useMutation({
    mutationFn: (data) => base44.entities.TajweedRule.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tajweed"] });
      setShowTajweedForm(false);
      toast.success("Rregulla u shtua!");
    },
  });

  const updateTajweed = useMutation({
    mutationFn: ({ id, data }) => base44.entities.TajweedRule.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tajweed"] });
      setEditingTajweed(null);
      toast.success("Rregulla u përditësua!");
    },
  });

  const deleteTajweed = useMutation({
    mutationFn: (id) => base44.entities.TajweedRule.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tajweed"] });
      toast.success("Rregulla u fshi!");
    },
  });

  const createLetter = useMutation({
    mutationFn: (data) => base44.entities.AlphabetLetter.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-letters"] });
      setShowLetterForm(false);
      toast.success("Shkronja u shtua!");
    },
  });

  const updateLetter = useMutation({
    mutationFn: ({ id, data }) => base44.entities.AlphabetLetter.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-letters"] });
      setEditingLetter(null);
      toast.success("Shkronja u përditësua!");
    },
  });

  const deleteLetter = useMutation({
    mutationFn: (id) => base44.entities.AlphabetLetter.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-letters"] });
      toast.success("Shkronja u fshi!");
    },
  });

  if (user && user.role !== "admin") {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <Shield className="w-16 h-16 text-red-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Akses i Ndaluar</h2>
        <p className="text-gray-500">Vetëm administratorët kanë akses në këtë panel</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
          <Shield className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Admin Panel</h1>
          <p className="text-sm text-gray-500">Menaxho përmbajtjen e platformës</p>
        </div>
      </div>

      <Tabs defaultValue="tajweed">
        <TabsList className="bg-white border border-gray-200 rounded-xl p-1 mb-6">
          <TabsTrigger value="tajweed" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            <BookMarked className="w-4 h-4 mr-2" /> Texhuidi ({tajweedRules.length})
          </TabsTrigger>
          <TabsTrigger value="alphabet" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            <Languages className="w-4 h-4 mr-2" /> Alfabeti ({letters.length})
          </TabsTrigger>
        </TabsList>

        {/* Tajweed Tab */}
        <TabsContent value="tajweed">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Rregullat e Texhuidit</h2>
            <Button onClick={() => setShowTajweedForm(!showTajweedForm)} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
              <Plus className="w-4 h-4 mr-2" /> Shto Rregullë
            </Button>
          </div>

          {showTajweedForm && (
            <div className="mb-6">
              <TajweedForm
                onSave={(data) => createTajweed.mutate(data)}
                onCancel={() => setShowTajweedForm(false)}
              />
            </div>
          )}

          <div className="space-y-3">
            {tajweedRules.map((rule) => (
              <Card key={rule.id} className="border-gray-100">
                <CardContent className="p-4">
                  {editingTajweed === rule.id ? (
                    <TajweedForm
                      initial={rule}
                      onSave={(data) => updateTajweed.mutate({ id: rule.id, data })}
                      onCancel={() => setEditingTajweed(null)}
                    />
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl arabic-text text-emerald-700">{rule.arabic_symbol}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{rule.name_sq}</p>
                          <p className="text-xs text-gray-500">{rule.category?.replace(/_/g, " ")} • {rule.level}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingTajweed(rule.id)}>
                          Ndrysho
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700" onClick={() => {
                          if (confirm("Jeni i sigurt?")) deleteTajweed.mutate(rule.id);
                        }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Alphabet Tab */}
        <TabsContent value="alphabet">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Shkronjat e Alfabetit</h2>
            <Button onClick={() => setShowLetterForm(!showLetterForm)} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
              <Plus className="w-4 h-4 mr-2" /> Shto Shkronjë
            </Button>
          </div>

          {showLetterForm && (
            <div className="mb-6">
              <LetterForm
                onSave={(data) => createLetter.mutate(data)}
                onCancel={() => setShowLetterForm(false)}
              />
            </div>
          )}

          <div className="space-y-3">
            {letters.map((letter) => (
              <Card key={letter.id} className="border-gray-100">
                <CardContent className="p-4">
                  {editingLetter === letter.id ? (
                    <LetterForm
                      initial={letter}
                      onSave={(data) => updateLetter.mutate({ id: letter.id, data })}
                      onCancel={() => setEditingLetter(null)}
                    />
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-gray-900">{letter.letter}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{letter.pronunciation}</p>
                          <p className="text-xs text-gray-500">{letter.language} • {letter.level}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingLetter(letter.id)}>
                          Ndrysho
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700" onClick={() => {
                          if (confirm("Jeni i sigurt?")) deleteLetter.mutate(letter.id);
                        }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}