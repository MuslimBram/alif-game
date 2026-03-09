import React, { useState, useRef, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { MessageSquare, Send, Image, X, Star, ThumbsUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function VisitorOpinions() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef();
  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me().then(u => {
      if (u?.full_name) setName(u.full_name);
    }).catch(() => {});
  }, []);

  const { data: opinions = [], isLoading } = useQuery({
    queryKey: ["opinions"],
    queryFn: () => base44.entities.Opinion.list("-created_date", 20),
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      let imageUrl = null;
      if (imageFile) {
        setUploading(true);
        const { file_url } = await base44.integrations.Core.UploadFile({ file: imageFile });
        imageUrl = file_url;
        setUploading(false);
      }
      return base44.entities.Opinion.create({
        name: name.trim() || "Vizitor Anonim",
        text: text.trim(),
        rating,
        image_url: imageUrl,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opinions"] });
      setSubmitted(true);
      setName(""); setText(""); setRating(5); setImageFile(null); setImagePreview(null);
      setTimeout(() => setSubmitted(false), 4000);
    },
    onError: (e) => setError("Gabim: " + e.message),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) { setError("Shkruaj opinionin tënd!"); return; }
    setError(null);
    submitMutation.mutate();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Opinionet e Vizitorëve</h2>
          <p className="text-sm text-gray-500">Ndaj përvojën tënde — me foto nëse dëshiron</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-8">
        <h3 className="font-bold text-gray-800 mb-4 text-lg">✍️ Lë Opinionin Tënd</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 font-semibold block mb-1">Emri yt (opsional)</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="p.sh. Blerim, Fatima..."
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-violet-400 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-semibold block mb-1">Vlerësimi</label>
              <div className="flex gap-1 items-center h-full pt-1">
                {[1,2,3,4,5].map(s => (
                  <button key={s} type="button" onClick={() => setRating(s)}>
                    <Star className={`w-7 h-7 transition-colors ${s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                  </button>
                ))}
                <span className="ml-2 text-sm font-bold text-amber-600">{rating}/5</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 font-semibold block mb-1">Opinioni *</label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Çfarë mendon për platformën? Si po shkon mësimi?..."
              rows={4}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-violet-400 transition-colors resize-none"
            />
          </div>

          {/* Screenshot upload */}
          <div>
            <label className="text-xs text-gray-500 font-semibold block mb-2">📸 Ngarko Screenshot (opsional)</label>
            {imagePreview ? (
              <div className="relative inline-block">
                <img src={imagePreview} alt="preview" className="max-h-40 rounded-2xl border border-gray-200 shadow-sm" />
                <button type="button" onClick={() => { setImageFile(null); setImagePreview(null); }}
                  className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center cursor-pointer hover:border-violet-400 hover:bg-violet-50 transition-all"
              >
                <Image className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Kliko për të ngarkuar screenshot</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG deri 5MB</p>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>

          {error && <p className="text-red-600 text-sm font-medium">❌ {error}</p>}
          {submitted && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
              <p className="text-emerald-700 font-bold">🎉 Faleminderit për opinionin tënd!</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={submitMutation.isPending || uploading}
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:opacity-90 text-white rounded-2xl font-bold text-base gap-2"
          >
            {submitMutation.isPending || uploading
              ? <><Loader2 className="w-5 h-5 animate-spin" /> Po dërgon...</>
              : <><Send className="w-5 h-5" /> Dërgo Opinionin</>}
          </Button>
        </form>
      </div>

      {/* Opinions list */}
      <div>
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <ThumbsUp className="w-5 h-5 text-violet-600" />
          Opinionet e Fundit ({opinions.length})
        </h3>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-violet-300 border-t-violet-600 rounded-full animate-spin" />
          </div>
        ) : opinions.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-200" />
            <p className="text-sm">Ende nuk ka opinione. Ji i pari!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {opinions.map((op) => (
              <div key={op.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center text-violet-600 font-bold text-lg">
                      {op.name?.[0]?.toUpperCase() || "V"}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{op.name || "Vizitor Anonim"}</p>
                      <p className="text-xs text-gray-400">{new Date(op.created_date).toLocaleDateString("sq-AL", { day: "numeric", month: "long", year: "numeric" })}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-4 h-4 ${s <= (op.rating || 5) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{op.text}</p>
                {op.image_url && (
                  <img src={op.image_url} alt="screenshot" className="w-full rounded-2xl border border-gray-100 object-cover max-h-48 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.open(op.image_url, "_blank")} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}