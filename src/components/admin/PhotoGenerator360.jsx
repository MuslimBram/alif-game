import React, { useState, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Wand2, Download, RotateCcw, ImagePlus, Eye } from "lucide-react";
import VR360Viewer from "./VR360Viewer";

const PLACES = [
  { id: "kaabe", name: "Qabeja (Mesxhidul Haram)", prompt: "A stunning ultra-wide 360-degree panoramic photo of the Kaaba (Masjid al-Haram) in Mecca, Saudi Arabia, surrounded by thousands of pilgrims in white ihram clothing performing tawaf, magnificent mosque architecture with golden minarets, dramatic lighting, photorealistic, 8K quality" },
  { id: "safa_merva", name: "Safa dhe Merva", prompt: "360-degree panoramic view inside Masjid al-Haram showing the Safa-Marwa corridor, marble floors, thousands of pilgrims walking sa'i between the two hills, bright indoor lighting, architectural grandeur, photorealistic" },
  { id: "arafat", name: "Arafati", prompt: "360-degree panoramic view of the plain of Arafat during Hajj, massive crowds of pilgrims in white ihram under the sun, Mount of Mercy (Jabal al-Rahmah) in the background, golden hour light, desert landscape, photorealistic, 8K" },
  { id: "mina", name: "Mina (Qyteti i Çadrave)", prompt: "360-degree panoramic aerial view of Mina tent city during Hajj, thousands of white tents stretching to the horizon in a valley near Mecca, Saudi Arabia, pilgrims in white ihram, mountains surrounding, photorealistic" },
  { id: "muzdalifa", name: "Muzdelifa (Natën)", prompt: "360-degree panoramic nighttime view of Muzdalifa open plains during Hajj, millions of pilgrims sleeping under the stars, campfires, starry sky, mountains silhouette, serene atmosphere, photorealistic night photography" },
  { id: "zemzem", name: "Burimi Zamzam", prompt: "360-degree panoramic interior view of the Zamzam well area inside Masjid al-Haram, pilgrims drinking Zamzam water from dispensers, marble architecture, bright lighting, photorealistic" },
  { id: "xhemrat", name: "Xhemraja (Gurët)", prompt: "360-degree panoramic view of the Jamarat bridge in Mina during Hajj, massive crowds of pilgrims throwing pebbles at the large stone pillar representing stoning of the devil, multilevel bridge structure, Saudi Arabia, photorealistic" },
  { id: "rawdha", name: "Raudha (Mesxhid Nebevi)", prompt: "360-degree panoramic interior view of Rawdah (the garden between Prophet's mosque and his pulpit) in Al-Madinah, green carpet, ornate Ottoman architecture, golden columns, soft lighting, pilgrims praying, photorealistic" },
  { id: "medine", name: "Mesxhid Nebevi (Medina)", prompt: "360-degree panoramic view of Masjid an-Nabawi in Medina, Saudi Arabia, the famous retractable umbrellas open in the courtyard, green dome visible, marble plaza with thousands of worshippers, golden sunset, photorealistic" },
];

export default function PhotoGenerator360() {
  const [selectedPlace, setSelectedPlace] = useState(PLACES[0]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [error, setError] = useState(null);
  const fileInputRef = useRef();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedImage(ev.target.result);
      reader.readAsDataURL(file);
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setUploadedUrl(file_url);
    } catch (e) {
      setError("Gabim gjatë ngarkimit të fotos: " + e.message);
    }
    setUploading(false);
  };

  const generate = async () => {
    setGenerating(true);
    setError(null);
    try {
      const finalPrompt = customPrompt.trim()
        ? customPrompt
        : selectedPlace.prompt;

      const result = await base44.integrations.Core.GenerateImage({
        prompt: finalPrompt,
        existing_image_urls: uploadedUrl ? [uploadedUrl] : undefined,
      });

      setGeneratedImages(prev => [{
        url: result.url,
        place: selectedPlace.name,
        prompt: finalPrompt,
        timestamp: new Date().toLocaleTimeString(),
      }, ...prev]);
    } catch (e) {
      setError("Gabim gjatë gjenerimit: " + e.message);
    }
    setGenerating(false);
  };

  const reset = () => {
    setUploadedImage(null);
    setUploadedUrl(null);
    setCustomPrompt("");
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      {/* Place selector */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-bold text-gray-800 mb-3">📍 Zgjidh Vendin e Shenjtë</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PLACES.map(p => (
            <button
              key={p.id}
              onClick={() => { setSelectedPlace(p); setCustomPrompt(""); }}
              className={`text-left px-3 py-2.5 rounded-xl border-2 text-xs font-semibold transition-all ${
                selectedPlace.id === p.id
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                  : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Upload + Prompt */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-bold text-gray-800 mb-4">🎨 Gjenero Foton 360°</h3>

        {/* Upload area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all mb-4"
        >
          {uploadedImage ? (
            <div className="relative">
              <img src={uploadedImage} alt="Ngarkuar" className="max-h-48 mx-auto rounded-xl object-cover" />
              <p className="text-xs text-emerald-600 font-semibold mt-2">✅ Foto u ngarkua — AI do ta përdorë si referencë</p>
            </div>
          ) : (
            <div className="text-gray-400">
              <ImagePlus className="w-10 h-10 mx-auto mb-2 text-gray-300" />
              <p className="font-semibold text-sm">Kliko për të ngarkuar një foto (opsionale)</p>
              <p className="text-xs mt-1">AI do ta përdorë si referencë stilistike</p>
            </div>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
        </div>

        {uploading && (
          <p className="text-center text-sm text-amber-600 animate-pulse mb-3">⏳ Po ngarkon foton...</p>
        )}

        {/* Prompt display / custom */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-600 mb-1">📝 Prompt (mund ta personalizosh)</label>
          <textarea
            value={customPrompt || selectedPlace.prompt}
            onChange={e => setCustomPrompt(e.target.value)}
            rows={4}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-emerald-400 resize-none"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-700">❌ {error}</div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={generate}
            disabled={generating || uploading}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2"
          >
            {generating ? (
              <><span className="animate-spin">⏳</span> Po gjeneron (~10s)...</>
            ) : (
              <><Wand2 className="w-4 h-4" /> Gjenero Foton</>
            )}
          </Button>
          {(uploadedImage || customPrompt) && (
            <Button variant="outline" onClick={reset} className="rounded-xl gap-2 border-gray-200">
              <RotateCcw className="w-4 h-4" /> Reset
            </Button>
          )}
        </div>
      </div>

      {/* Generated images gallery */}
      {generatedImages.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-800 mb-4">🖼️ Fotot e Gjeneruara ({generatedImages.length})</h3>
          <div className="space-y-5">
            {generatedImages.map((img, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
                <img src={img.url} alt={img.place} className="w-full object-cover max-h-72" />
                <div className="p-3 bg-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-800">{img.place}</p>
                    <p className="text-xs text-gray-400">{img.timestamp}</p>
                  </div>
                  <a
                    href={img.url}
                    download={`${img.place}_360.jpg`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-xl transition-all"
                  >
                    <Download className="w-3.5 h-3.5" /> Shkarko
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}