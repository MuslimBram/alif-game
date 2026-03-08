import React, { useState, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Wand2, Download, RotateCcw, ImagePlus } from "lucide-react";

const SIZES = [
  { id: "icon_sm", label: "Ikonë e vogël", w: 64, h: 64, desc: "64×64px — Ikona menuje" },
  { id: "icon_md", label: "Ikonë normale", w: 128, h: 128, desc: "128×128px — Butona/karta" },
  { id: "icon_lg", label: "Ikonë e madhe", w: 256, h: 256, desc: "256×256px — Hero/Thumbnail" },
  { id: "banner_wide", label: "Banner gjerësor", w: 800, h: 200, desc: "800×200px — Header banner" },
  { id: "banner_sq", label: "Banner katror", w: 400, h: 400, desc: "400×400px — Card cover" },
  { id: "banner_tall", label: "Banner vertikal", w: 300, h: 500, desc: "300×500px — Sidebar" },
  { id: "full_hd", label: "Full HD", w: 1280, h: 720, desc: "1280×720px — Background" },
  { id: "custom", label: "Madhësi e personalizuar", w: null, h: null, desc: "Cakto vetë" },
];

const SHAPES = [
  { id: "circle", label: "⭕ Rreth", prompt: "circular icon design, perfectly round shape" },
  { id: "rounded", label: "🔲 Kënde të rrumbullakëta", prompt: "rounded rectangle icon, smooth corners" },
  { id: "square", label: "⬛ Katror", prompt: "square icon with sharp corners" },
  { id: "hexagon", label: "⬡ Hexagon", prompt: "hexagonal shape icon design" },
  { id: "star", label: "⭐ Yll", prompt: "star shape icon design" },
  { id: "shield", label: "🛡️ Mburojë", prompt: "shield shape icon design" },
];

const STYLES = [
  { id: "flat", label: "Flat / Modern", prompt: "flat design, modern minimal style, clean vector look" },
  { id: "gradient", label: "Gradient", prompt: "vibrant gradient colors, smooth color transitions, glossy" },
  { id: "3d", label: "3D / Realist", prompt: "3D rendered, realistic material, depth and shadow" },
  { id: "emoji", label: "Emoji / Cartoon", prompt: "emoji style, cartoon, playful, colorful, bold outlines" },
  { id: "islamic", label: "Islamik / Arabesk", prompt: "Islamic art style, geometric arabesque patterns, gold and green colors, ornate" },
  { id: "watercolor", label: "Ujëcolor / Artisitik", prompt: "watercolor painting style, soft colors, artistic brushstrokes" },
];

const PRESET_ICONS = [
  { id: "mosque", label: "🕌 Xhami", prompt: "mosque icon, Islamic architecture, minaret, dome, emerald green color" },
  { id: "quran", label: "📖 Kur'an", prompt: "Quran book icon, Arabic calligraphy, ornate cover, gold and green" },
  { id: "star_crescent", label: "☪️ Yll e Hënë", prompt: "star and crescent moon symbol, Islamic icon, gold color" },
  { id: "prayer", label: "🤲 Namaz/Dua", prompt: "praying hands icon, Islamic prayer, peaceful, warm tones" },
  { id: "kaaba", label: "🕋 Qabeja", prompt: "Kaaba icon, black cube with golden band, Islamic holy site" },
  { id: "alphabet", label: "أ Alfabeti", prompt: "Arabic alphabet letter alef, calligraphy, golden ink on parchment" },
  { id: "learn", label: "📚 Mësim", prompt: "education icon, books and knowledge, Islamic learning theme" },
  { id: "trophy", label: "🏆 Trofe", prompt: "trophy cup icon, achievement, gold medal, winner" },
  { id: "quiz", label: "🎯 Kuiz", prompt: "quiz game icon, target arrow bullseye, challenge, competitive" },
  { id: "games", label: "🎮 Lojëra", prompt: "educational game icon, fun learning, colorful game controller" },
  { id: "progress", label: "📊 Progres", prompt: "progress bar chart icon, growth statistics, achievement tracker" },
  { id: "custom", label: "✏️ I personalizuar", prompt: "" },
];

export default function IconImageGenerator() {
  const [selectedSize, setSelectedSize] = useState(SIZES[1]);
  const [selectedShape, setSelectedShape] = useState(SHAPES[0]);
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]);
  const [selectedPreset, setSelectedPreset] = useState(PRESET_ICONS[0]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [customW, setCustomW] = useState(200);
  const [customH, setCustomH] = useState(200);
  const [bgColor, setBgColor] = useState("transparent");
  const [generating, setGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [error, setError] = useState(null);
  const [refUploadedUrl, setRefUploadedUrl] = useState(null);
  const [refPreview, setRefPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

  const handleRefUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (ev) => setRefPreview(ev.target.result);
      reader.readAsDataURL(file);
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setRefUploadedUrl(file_url);
    } catch (e) {
      setError("Gabim ngarkimi: " + e.message);
    }
    setUploading(false);
  };

  const buildPrompt = () => {
    if (selectedPreset.id === "custom" && customPrompt.trim()) return customPrompt;
    const basePrompt = selectedPreset.id !== "custom" ? selectedPreset.prompt : customPrompt;
    const w = selectedSize.id === "custom" ? customW : selectedSize.w;
    const h = selectedSize.id === "custom" ? customH : selectedSize.h;
    const bgNote = bgColor === "transparent" ? "transparent background, no background" : `${bgColor} background color`;
    return `${basePrompt}, ${selectedShape.prompt}, ${selectedStyle.prompt}, ${bgNote}, high quality, crisp edges, suitable for ${w}x${h}px display, professional app icon`;
  };

  const generate = async () => {
    if (selectedPreset.id === "custom" && !customPrompt.trim()) {
      setError("Shkruaj një përshkrim për imazhin!");
      return;
    }
    setGenerating(true);
    setError(null);
    try {
      const prompt = buildPrompt();
      const result = await base44.integrations.Core.GenerateImage({
        prompt,
        existing_image_urls: refUploadedUrl ? [refUploadedUrl] : undefined,
      });
      const w = selectedSize.id === "custom" ? customW : selectedSize.w;
      const h = selectedSize.id === "custom" ? customH : selectedSize.h;
      setGeneratedImages(prev => [{
        url: result.url,
        label: selectedPreset.label,
        size: `${w}×${h}`,
        shape: selectedShape.label,
        style: selectedStyle.label,
        time: new Date().toLocaleTimeString(),
      }, ...prev]);
    } catch (e) {
      setError("Gabim: " + e.message);
    }
    setGenerating(false);
  };

  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl p-4">
        <h2 className="text-lg font-bold">🎨 Gjenerator i Imazheve & Ikonave</h2>
        <p className="text-purple-200 text-sm">Krijo ikona dhe imazhe me madhësi dhe forma të ndryshme për çdo element të programit</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left column: settings */}
        <div className="space-y-4">
          {/* Preset icons */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <h3 className="font-bold text-gray-800 text-sm mb-3">🎯 Lloji i Imazhit</h3>
            <div className="grid grid-cols-3 gap-1.5">
              {PRESET_ICONS.map(p => (
                <button key={p.id} onClick={() => setSelectedPreset(p)}
                  className={`px-2 py-2 rounded-xl text-xs font-semibold border-2 transition-all text-center ${selectedPreset.id === p.id ? "border-violet-500 bg-violet-50 text-violet-800" : "border-gray-200 text-gray-700 hover:border-gray-300"}`}>
                  {p.label}
                </button>
              ))}
            </div>
            {selectedPreset.id === "custom" && (
              <textarea
                value={customPrompt}
                onChange={e => setCustomPrompt(e.target.value)}
                placeholder="Përshkruaj imazhin që dëshiron..."
                rows={3}
                className="w-full mt-3 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-violet-400 resize-none"
              />
            )}
          </div>

          {/* Shape */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <h3 className="font-bold text-gray-800 text-sm mb-3">🔷 Forma</h3>
            <div className="grid grid-cols-3 gap-1.5">
              {SHAPES.map(s => (
                <button key={s.id} onClick={() => setSelectedShape(s)}
                  className={`px-2 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${selectedShape.id === s.id ? "border-blue-500 bg-blue-50 text-blue-800" : "border-gray-200 text-gray-700 hover:border-gray-300"}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <h3 className="font-bold text-gray-800 text-sm mb-3">🎨 Stili</h3>
            <div className="grid grid-cols-2 gap-1.5">
              {STYLES.map(s => (
                <button key={s.id} onClick={() => setSelectedStyle(s)}
                  className={`px-2 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${selectedStyle.id === s.id ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-gray-200 text-gray-700 hover:border-gray-300"}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: size, bg, reference */}
        <div className="space-y-4">
          {/* Size */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <h3 className="font-bold text-gray-800 text-sm mb-3">📐 Madhësia</h3>
            <div className="space-y-1.5">
              {SIZES.map(s => (
                <button key={s.id} onClick={() => setSelectedSize(s)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs border-2 transition-all ${selectedSize.id === s.id ? "border-amber-500 bg-amber-50 text-amber-900" : "border-gray-200 text-gray-700 hover:border-gray-300"}`}>
                  <span className="font-semibold">{s.label}</span>
                  <span className="text-gray-400">{s.desc}</span>
                </button>
              ))}
            </div>
            {selectedSize.id === "custom" && (
              <div className="flex gap-3 mt-3">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 block mb-1">Gjerësi (px)</label>
                  <input type="number" value={customW} onChange={e => setCustomW(+e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-amber-400" />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 block mb-1">Lartësi (px)</label>
                  <input type="number" value={customH} onChange={e => setCustomH(+e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-amber-400" />
                </div>
              </div>
            )}
          </div>

          {/* Background */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <h3 className="font-bold text-gray-800 text-sm mb-3">🎭 Sfondi</h3>
            <div className="grid grid-cols-4 gap-1.5">
              {["transparent", "white", "black", "#0d7c3e", "#1e3a5f", "#d4a017", "#f3f4f6", "custom"].map(c => (
                <button key={c} onClick={() => setBgColor(c)}
                  className={`py-2 rounded-xl text-xs font-semibold border-2 transition-all ${bgColor === c ? "border-violet-500" : "border-gray-200"}`}
                  style={{ backgroundColor: c === "transparent" || c === "custom" ? "" : c, color: ["white","#f3f4f6","transparent","custom"].includes(c) ? "#374151" : "white" }}>
                  {c === "transparent" ? "Pa sfond" : c === "white" ? "Bardhë" : c === "black" ? "Zi" : c === "custom" ? "Tjetër" : c}
                </button>
              ))}
            </div>
            {bgColor === "custom" && (
              <input type="color" className="mt-2 w-full h-10 rounded-xl cursor-pointer border border-gray-200"
                onChange={e => setBgColor(e.target.value)} />
            )}
          </div>

          {/* Reference image */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <h3 className="font-bold text-gray-800 text-sm mb-3">🖼️ Referencë (opsionale)</h3>
            <div onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-3 text-center cursor-pointer hover:border-violet-400 hover:bg-violet-50 transition-all">
              {refPreview ? (
                <img src={refPreview} alt="ref" className="max-h-20 mx-auto rounded-lg object-cover" />
              ) : (
                <div className="text-gray-400">
                  <ImagePlus className="w-6 h-6 mx-auto mb-1 text-gray-300" />
                  <p className="text-xs">Ngarko imazh referimi</p>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleRefUpload} />
            </div>
            {uploading && <p className="text-xs text-amber-600 animate-pulse mt-2 text-center">⏳ Po ngarkon...</p>}
            {refPreview && (
              <button onClick={() => { setRefPreview(null); setRefUploadedUrl(null); }}
                className="mt-2 w-full text-xs text-red-500 hover:text-red-700 font-semibold">
                ✕ Hiq referencën
              </button>
            )}
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">❌ {error}</div>}

      <Button onClick={generate} disabled={generating || uploading}
        className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:opacity-90 text-white rounded-2xl font-bold text-base gap-2">
        {generating ? <><span className="animate-spin inline-block">⏳</span> Po gjeneron (~10s)...</> : <><Wand2 className="w-5 h-5" /> Gjenero Imazhin</>}
      </Button>

      {/* Gallery */}
      {generatedImages.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-800 mb-4">🖼️ Imazhet e Gjeneruara ({generatedImages.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {generatedImages.map((img, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
                <div className="bg-gray-50 p-4 flex items-center justify-center min-h-[120px]"
                  style={{ backgroundImage: "repeating-conic-gradient(#e5e7eb 0% 25%, white 0% 50%)", backgroundSize: "16px 16px" }}>
                  <img src={img.url} alt={img.label} className="max-h-40 max-w-full object-contain rounded-xl shadow-md" />
                </div>
                <div className="p-3 bg-white">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-gray-800">{img.label}</p>
                    <p className="text-xs text-gray-400">{img.time}</p>
                  </div>
                  <p className="text-xs text-gray-500">{img.size}px · {img.shape} · {img.style}</p>
                  <div className="flex gap-2 mt-2">
                    <a href={img.url} download={`icon_${i}.png`} target="_blank" rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 px-3 py-1.5 rounded-xl transition-all">
                      <Download className="w-3.5 h-3.5" /> Shkarko
                    </a>
                    <button onClick={() => navigator.clipboard.writeText(img.url)}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-violet-700 bg-violet-100 hover:bg-violet-200 px-3 py-1.5 rounded-xl transition-all">
                      📋 Kopjo URL
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}