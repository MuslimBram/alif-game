import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { X, Move, ZoomIn, ZoomOut, RotateCcw, Info, Volume2, Maximize } from "lucide-react";

const SITES = [
  {
    id: "kaaba",
    name: "Qabeja",
    arabic: "الكعبة المشرفة",
    emoji: "🕋",
    color: 0x1a1a1a,
    description: "Qabeja është shtëpia e Allahut dhe kibla e çdo muslimani. Ndërtuar nga Ibrahimi dhe Ismaili (a.s.), ajo është qendra e Tawaf-it.",
    ritual: "Tawaf — Rretho 7 herë në drejtim kundërorën e akrepave",
    position: [0, 0, 0],
  },
  {
    id: "safa_marwa",
    name: "Safa dhe Merve",
    arabic: "الصفا والمروة",
    emoji: "⛰️",
    color: 0xc2a064,
    description: "Dy kodra historike midis të cilave Haxhere (a.s.) vrapoi 7 herë duke kërkuar ujë për birin e saj Ismailin.",
    ritual: "Sa'i — Ec 7 herë midis Safas dhe Merves",
    position: [15, 0, 5],
  },
  {
    id: "zamzam",
    name: "Burimi Zamzam",
    arabic: "بئر زمزم",
    emoji: "💧",
    color: 0x1a6eb5,
    description: "Burimi i shenjtë i shfaqur nga Allahu për Ismaili (a.s.). Uji i tij konsiderohet i bekuar.",
    ritual: "Pi ujë Zamzam dhe lute Allahun",
    position: [3, 0, 8],
  },
  {
    id: "mina",
    name: "Mina",
    arabic: "منى",
    emoji: "⛺",
    color: 0xe8c97a,
    description: "Fushë e gjerë pranë Mekës ku haxhilerët kalojnë natën e 8 dhe 9 Dhulhixhes. Quhet edhe 'Qyteti i çadrave'.",
    ritual: "Kaloni natën dhe hidhni gurë te Xhemratet",
    position: [-20, 0, -15],
  },
  {
    id: "arafat",
    name: "Arafati",
    arabic: "عرفات",
    emoji: "🏔️",
    color: 0xd4a017,
    description: "Mali ku Profeti Muhamed (s.a.w.) mbajti hytben e fundit. Qëndrimi (Wuquf) këtu është rukni kryesor i Haxhit.",
    ritual: "Wuquf — Qëndroni nga dreka deri pas akshamit",
    position: [-35, 5, -30],
  },
  {
    id: "muzdalifa",
    name: "Muzdalifa",
    arabic: "المزدلفة",
    emoji: "🌙",
    color: 0x2c4a8c,
    description: "Vend midis Arafatit dhe Minës ku haxhilerët mbledhin gurë për hedhjen te Xhemratet.",
    ritual: "Faloni Aksham dhe Jaci bashkë, mbledhni 49-70 gurë",
    position: [-28, 2, -20],
  },
];

function buildScene(container, onSiteClick) {
  const w = container.clientWidth || 800;
  const h = container.clientHeight || 600;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "default", failIfMajorPerformanceCaveat: false });
  } catch (e) {
    console.warn("WebGL not supported:", e);
    return () => {};
  }
  const canvas = renderer.domElement;
  container.appendChild(canvas);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(w, h);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a1628);
  scene.fog = new THREE.FogExp2(0x0a1628, 0.008);

  // Camera
  const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 500);
  camera.position.set(0, 30, 60);
  camera.lookAt(0, 0, 0);

  // Lighting
  const ambient = new THREE.AmbientLight(0xfff4e0, 0.5);
  scene.add(ambient);
  const sun = new THREE.DirectionalLight(0xffd080, 1.5);
  sun.position.set(50, 80, 30);
  sun.castShadow = true;
  sun.shadow.mapSize.width = 2048;
  sun.shadow.mapSize.height = 2048;
  scene.add(sun);

  // Moon light (soft blue night atmosphere)
  const moon = new THREE.DirectionalLight(0x8899cc, 0.3);
  moon.position.set(-30, 40, -20);
  scene.add(moon);

  // Ground — sandy desert
  const groundGeo = new THREE.PlaneGeometry(200, 200, 32, 32);
  const groundMat = new THREE.MeshLambertMaterial({ color: 0xc8a86b });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Stars
  const starsGeo = new THREE.BufferGeometry();
  const starPositions = [];
  for (let i = 0; i < 2000; i++) {
    starPositions.push((Math.random() - 0.5) * 400, Math.random() * 100 + 20, (Math.random() - 0.5) * 400);
  }
  starsGeo.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
  const starsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3 });
  scene.add(new THREE.Points(starsGeo, starsMat));

  const siteMeshes = [];

  SITES.forEach((site) => {
    let mesh;
    if (site.id === "kaaba") {
      // Kaaba — black cube with golden band
      const group = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(8, 12, 8), new THREE.MeshLambertMaterial({ color: 0x111111 }));
      body.castShadow = true;
      group.add(body);
      // Golden kiswa band
      const bandGeo = new THREE.BoxGeometry(8.05, 1.5, 8.05);
      const bandMat = new THREE.MeshLambertMaterial({ color: 0xd4a017 });
      const band = new THREE.Mesh(bandGeo, bandMat);
      band.position.y = 2;
      group.add(band);
      // Door
      const doorMat = new THREE.MeshLambertMaterial({ color: 0xb8860b });
      const door = new THREE.Mesh(new THREE.BoxGeometry(1.5, 3, 0.2), doorMat);
      door.position.set(0, -3, 4.1);
      group.add(door);
      // White marble floor
      const floor = new THREE.Mesh(new THREE.CylinderGeometry(14, 14, 0.3, 8), new THREE.MeshLambertMaterial({ color: 0xf0ece0 }));
      floor.position.y = -6;
      group.add(floor);
      group.position.set(...site.position);
      group.position.y = 6;
      group.userData = { siteId: site.id };
      scene.add(group);
      siteMeshes.push({ mesh: group, site });
    } else if (site.id === "arafat") {
      // Mountain
      const group = new THREE.Group();
      const mtn = new THREE.Mesh(new THREE.ConeGeometry(10, 18, 8), new THREE.MeshLambertMaterial({ color: 0x8b7355 }));
      mtn.castShadow = true;
      group.add(mtn);
      // Jabal Rahma pillar on top
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 4), new THREE.MeshLambertMaterial({ color: 0xeeeeee }));
      pillar.position.y = 11;
      group.add(pillar);
      group.position.set(...site.position);
      group.position.y = 9;
      group.userData = { siteId: site.id };
      scene.add(group);
      siteMeshes.push({ mesh: group, site });
    } else if (site.id === "zamzam") {
      // Well
      const group = new THREE.Group();
      const well = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 3, 16), new THREE.MeshLambertMaterial({ color: 0x888888 }));
      well.castShadow = true;
      group.add(well);
      // Water glow
      const water = new THREE.Mesh(new THREE.CircleGeometry(1.4, 16), new THREE.MeshLambertMaterial({ color: 0x3399ff, transparent: true, opacity: 0.7 }));
      water.rotation.x = -Math.PI / 2;
      water.position.y = 1.6;
      group.add(water);
      group.position.set(...site.position);
      group.position.y = 1.5;
      group.userData = { siteId: site.id };
      scene.add(group);
      siteMeshes.push({ mesh: group, site });
    } else if (site.id === "mina") {
      // Tent city
      const group = new THREE.Group();
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 4; c++) {
          const tent = new THREE.Mesh(new THREE.ConeGeometry(1.5, 3, 4), new THREE.MeshLambertMaterial({ color: 0xf0f0f0 }));
          tent.position.set(c * 4 - 6, 1.5, r * 4 - 4);
          group.add(tent);
        }
      }
      group.position.set(...site.position);
      group.position.y = 0;
      group.userData = { siteId: site.id };
      scene.add(group);
      siteMeshes.push({ mesh: group, site });
    } else if (site.id === "safa_marwa") {
      // Two hills connected by a corridor
      const group = new THREE.Group();
      const hill1 = new THREE.Mesh(new THREE.SphereGeometry(3, 8, 6), new THREE.MeshLambertMaterial({ color: 0xc2a064 }));
      hill1.scale.y = 0.4;
      hill1.position.set(-5, 0, 0);
      group.add(hill1);
      const hill2 = new THREE.Mesh(new THREE.SphereGeometry(3, 8, 6), new THREE.MeshLambertMaterial({ color: 0xc2a064 }));
      hill2.scale.y = 0.4;
      hill2.position.set(5, 0, 0);
      group.add(hill2);
      // Corridor between them
      const corridor = new THREE.Mesh(new THREE.BoxGeometry(10, 0.5, 4), new THREE.MeshLambertMaterial({ color: 0xe8d8b0 }));
      group.add(corridor);
      group.position.set(...site.position);
      group.position.y = 1;
      group.userData = { siteId: site.id };
      scene.add(group);
      siteMeshes.push({ mesh: group, site });
    } else if (site.id === "muzdalifa") {
      // Open area with campfires
      const group = new THREE.Group();
      for (let i = 0; i < 5; i++) {
        const fire = new THREE.Mesh(new THREE.SphereGeometry(0.4, 6, 4), new THREE.MeshLambertMaterial({ color: 0xff6600, transparent: true, opacity: 0.8 }));
        fire.position.set((Math.random() - 0.5) * 10, 0.4, (Math.random() - 0.5) * 10);
        group.add(fire);
      }
      const area = new THREE.Mesh(new THREE.PlaneGeometry(15, 15), new THREE.MeshLambertMaterial({ color: 0xb8a880 }));
      area.rotation.x = -Math.PI / 2;
      group.add(area);
      group.position.set(...site.position);
      group.userData = { siteId: site.id };
      scene.add(group);
      siteMeshes.push({ mesh: group, site });
    }

    // Label floating above site
    const labelGeo = new THREE.SphereGeometry(0.8, 8, 8);
    const labelMat = new THREE.MeshLambertMaterial({ color: site.color, emissive: new THREE.Color(site.color), emissiveIntensity: 0.3 });
    const label = new THREE.Mesh(labelGeo, labelMat);
    label.position.set(site.position[0], 20, site.position[2]);
    label.userData = { siteId: site.id };
    scene.add(label);
  });

  // Path between sites (haxh route)
  const pathPoints = SITES.map(s => new THREE.Vector3(s.position[0], 0.2, s.position[2]));
  const pathCurve = new THREE.CatmullRomCurve3(pathPoints);
  const pathGeo = new THREE.TubeGeometry(pathCurve, 100, 0.3, 6, false);
  const pathMat = new THREE.MeshLambertMaterial({ color: 0xd4a017, transparent: true, opacity: 0.4 });
  scene.add(new THREE.Mesh(pathGeo, pathMat));

  // Mouse / touch interaction
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const handleClick = (e) => {
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    mouse.x = ((src.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((src.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    for (const hit of intersects) {
      let obj = hit.object;
      while (obj && !obj.userData.siteId) obj = obj.parent;
      if (obj && obj.userData.siteId) {
        const site = SITES.find(s => s.id === obj.userData.siteId);
        if (site) onSiteClick(site);
        break;
      }
    }
  };
  canvas.addEventListener("click", handleClick);
  canvas.addEventListener("touchend", handleClick);

  // Orbit-like drag controls
  let isDragging = false, prevMouse = { x: 0, y: 0 };
  let spherical = { theta: 0, phi: Math.PI / 4, radius: 70 };

  const updateCamera = () => {
    camera.position.x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
    camera.position.y = spherical.radius * Math.cos(spherical.phi);
    camera.position.z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
    camera.lookAt(0, 5, 0);
  };
  updateCamera();

  const onMouseDown = (e) => { isDragging = true; prevMouse = { x: e.clientX, y: e.clientY }; };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    const dx = (e.clientX - prevMouse.x) * 0.005;
    const dy = (e.clientY - prevMouse.y) * 0.005;
    spherical.theta -= dx;
    spherical.phi = Math.max(0.1, Math.min(Math.PI / 2.5, spherical.phi + dy));
    updateCamera();
    prevMouse = { x: e.clientX, y: e.clientY };
  };
  const onMouseUp = () => { isDragging = false; };
  const onWheel = (e) => {
    spherical.radius = Math.max(20, Math.min(120, spherical.radius + e.deltaY * 0.05));
    updateCamera();
  };

  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("wheel", onWheel);

  let animId;
  const animate = () => {
    animId = requestAnimationFrame(animate);
    // Gentle auto-rotation
    if (!isDragging) {
      spherical.theta += 0.001;
      updateCamera();
    }
    // Pulse label spheres
    const t = Date.now() * 0.001;
    scene.children.forEach(obj => {
      if (obj.userData.siteId && obj.geometry?.type === "SphereGeometry" && obj.geometry?.parameters?.radius === 0.8) {
        obj.position.y = 20 + Math.sin(t * 2 + SITES.findIndex(s => s.id === obj.userData.siteId)) * 0.5;
        obj.scale.setScalar(0.9 + Math.sin(t * 3) * 0.1);
      }
    });
    renderer.render(scene, camera);
  };
  animate();

  const resize = () => {
    if (!canvas) return;
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", resize);

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener("resize", resize);
    canvas.removeEventListener("click", handleClick);
    canvas.removeEventListener("touchend", handleClick);
    canvas.removeEventListener("mousedown", onMouseDown);
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("mouseup", onMouseUp);
    canvas.removeEventListener("wheel", onWheel);
    renderer.dispose();
    if (container.contains(canvas)) container.removeChild(canvas);
  };
}

export default function VR3DExperience({ onClose }) {
  const canvasRef = useRef(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const goToSite = (index) => {
    const idx = (index + SITES.length) % SITES.length;
    setCurrentIndex(idx);
    setSelectedSite(SITES[idx]);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const cleanup = buildScene(canvasRef.current, setSelectedSite);
    return cleanup;
  }, []);

  const speakDescription = (site) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(site.name + ". " + site.description + " " + site.ritual);
    u.lang = "sq"; u.rate = 0.85;
    window.speechSynthesis.speak(u);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black flex flex-col ${isFullscreen ? "" : ""}`}>
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <h2 className="text-white font-bold text-lg">🕌 Eksplorimi 3D i Vendeve të Shenjta</h2>
          <p className="text-white/60 text-xs">Kliko mbi objekte për informacion · Zvarrit për të rrotulluar · Scroll për zoom</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsFullscreen(f => !f)} className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center">
            <Maximize className="w-4 h-4 text-white" />
          </button>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/10 hover:bg-red-500/70 flex items-center justify-center">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />

      {/* Site list overlay */}
      <div className="absolute left-4 bottom-24 flex flex-col gap-1.5 z-10">
        {SITES.map((site, idx) => (
          <button key={site.id} onClick={() => goToSite(idx)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all backdrop-blur-sm ${selectedSite?.id === site.id ? "bg-amber-500 text-white" : "bg-black/50 text-white/80 hover:bg-black/70"}`}>
            <span>{site.emoji}</span> {site.name}
          </button>
        ))}
      </div>

      {/* Info panel */}
      <AnimatePresence>
        {selectedSite && (
          <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }}
            className="absolute right-4 top-20 bottom-4 w-72 bg-black/80 backdrop-blur-md rounded-2xl p-5 overflow-y-auto z-10 border border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-4xl">{selectedSite.emoji}</span>
                <h3 className="text-white font-bold text-lg mt-2">{selectedSite.name}</h3>
                <p className="text-amber-400 text-sm" style={{ fontFamily: "serif", direction: "rtl" }}>{selectedSite.arabic}</p>
              </div>
              <button onClick={() => setSelectedSite(null)} className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <X className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4">{selectedSite.description}</p>
            <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-3 mb-4">
              <p className="text-amber-300 text-xs font-bold mb-1">🕌 Rituali:</p>
              <p className="text-white/90 text-sm">{selectedSite.ritual}</p>
            </div>
            <button onClick={() => speakDescription(selectedSite)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition-all mb-3">
              <Volume2 className="w-4 h-4" /> Dëgjo Shpjegimin
            </button>

            {/* Navigation arrows */}
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => goToSite((currentIndex ?? SITES.findIndex(s => s.id === selectedSite.id)) - 1)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all border border-white/10">
                ← E mëparshme
              </button>
              <span className="text-white/40 text-xs">
                {(currentIndex ?? SITES.findIndex(s => s.id === selectedSite.id)) + 1}/{SITES.length}
              </span>
              <button
                onClick={() => goToSite((currentIndex ?? SITES.findIndex(s => s.id === selectedSite.id)) + 1)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all border border-white/10">
                E ardhshme →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-sm rounded-2xl px-5 py-2.5 z-10">
        <div className="flex items-center gap-1.5 text-white/70 text-xs">
          <Move className="w-3.5 h-3.5" /> Zvarrit për lëvizje
        </div>
        <div className="w-px h-4 bg-white/20" />
        <div className="flex items-center gap-1.5 text-white/70 text-xs">
          <ZoomIn className="w-3.5 h-3.5" /> Scroll për zoom
        </div>
        <div className="w-px h-4 bg-white/20" />
        <div className="flex items-center gap-1.5 text-white/70 text-xs">
          <Info className="w-3.5 h-3.5" /> Kliko objekte
        </div>
      </div>
    </div>
  );
}