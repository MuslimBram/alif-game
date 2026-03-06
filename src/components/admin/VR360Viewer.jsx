import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { X, Move, ZoomIn, ZoomOut, Maximize2, Minimize2, RotateCcw } from "lucide-react";

export default function VR360Viewer({ imageUrl, placeName, onClose }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || !imageUrl) return;

    // Wait for container to have real dimensions
    let w = container.clientWidth;
    let h = container.clientHeight;
    if (w === 0 || h === 0) return;

    // Renderer — failsafe context options
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "default", failIfMajorPerformanceCaveat: false });
    } catch (e) {
      console.warn("WebGL not available:", e);
      return;
    }
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

    // Scene & Camera inside sphere (FOV 75 for VR feel)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.set(0, 0, 0.1);

    // 360 sphere — inverted normals so image shows inside
    const sphereGeo = new THREE.SphereGeometry(500, 60, 40);
    sphereGeo.scale(-1, 1, 1); // flip normals inward

    const texture = new THREE.TextureLoader().load(imageUrl);
    texture.colorSpace = THREE.SRGBColorSpace;
    const sphereMat = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // Camera angles
    let lon = 0, lat = 0;
    let targetLon = 0, targetLat = 0;

    // Mouse / touch drag
    let isPointerDown = false;
    let startX = 0, startY = 0;
    let lastLon = 0, lastLat = 0;
    let velocity = { x: 0, y: 0 };
    let lastDx = 0, lastDy = 0;

    const onPointerDown = (e) => {
      isPointerDown = true;
      const src = e.touches ? e.touches[0] : e;
      startX = src.clientX; startY = src.clientY;
      lastLon = targetLon; lastLat = targetLat;
      velocity = { x: 0, y: 0 };
      container.style.cursor = "grabbing";
    };
    const onPointerMove = (e) => {
      if (!isPointerDown) return;
      const src = e.touches ? e.touches[0] : e;
      lastDx = src.clientX - startX;
      lastDy = src.clientY - startY;
      targetLon = lastLon - lastDx * 0.15;
      targetLat = lastLat + lastDy * 0.1;
      targetLat = Math.max(-85, Math.min(85, targetLat));
    };
    const onPointerUp = () => {
      isPointerDown = false;
      velocity = { x: lastDx * 0.05, y: lastDy * 0.02 };
      container.style.cursor = "grab";
    };

    // Scroll / pinch zoom
    let fov = 75;
    const onWheel = (e) => {
      fov = Math.max(30, Math.min(100, fov + e.deltaY * 0.05));
      camera.fov = fov;
      camera.updateProjectionMatrix();
    };

    // Keyboard WASD / arrow navigation
    const keys = {};
    const onKeyDown = (e) => { keys[e.key] = true; };
    const onKeyUp = (e) => { keys[e.key] = false; };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // Gyroscope (mobile)
    let gyroEnabled = false;
    const onDeviceOrientation = (e) => {
      if (!e.beta && !e.gamma) return;
      gyroEnabled = true;
      if (isPointerDown) return;
      targetLat = Math.max(-85, Math.min(85, -(e.beta - 90) * 0.8));
      targetLon = e.gamma * 1.2;
    };
    window.addEventListener("deviceorientation", onDeviceOrientation);

    container.addEventListener("mousedown", onPointerDown);
    container.addEventListener("mousemove", onPointerMove);
    container.addEventListener("mouseup", onPointerUp);
    container.addEventListener("mouseleave", onPointerUp);
    container.addEventListener("touchstart", onPointerDown, { passive: true });
    container.addEventListener("touchmove", onPointerMove, { passive: true });
    container.addEventListener("touchend", onPointerUp);
    container.addEventListener("wheel", onWheel, { passive: true });
    container.style.cursor = "grab";

    // Auto-rotate when idle
    let idleTimer = null;
    let autoRotating = true;
    const resetIdle = () => {
      autoRotating = false;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { autoRotating = true; }, 4000);
    };
    container.addEventListener("mousedown", resetIdle);
    container.addEventListener("touchstart", resetIdle, { passive: true });
    container.addEventListener("keydown", resetIdle);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Keyboard
      const speed = 0.8;
      if (keys["ArrowLeft"] || keys["a"] || keys["A"]) { targetLon -= speed; resetIdle(); }
      if (keys["ArrowRight"] || keys["d"] || keys["D"]) { targetLon += speed; resetIdle(); }
      if (keys["ArrowUp"] || keys["w"] || keys["W"]) { targetLat = Math.min(85, targetLat + speed * 0.5); resetIdle(); }
      if (keys["ArrowDown"] || keys["s"] || keys["S"]) { targetLat = Math.max(-85, targetLat - speed * 0.5); resetIdle(); }
      if (keys["+"] || keys["="]) { fov = Math.max(30, fov - 1); camera.fov = fov; camera.updateProjectionMatrix(); resetIdle(); }
      if (keys["-"]) { fov = Math.min(100, fov + 1); camera.fov = fov; camera.updateProjectionMatrix(); resetIdle(); }

      // Momentum after drag release
      if (!isPointerDown && !gyroEnabled) {
        if (Math.abs(velocity.x) > 0.1) {
          targetLon -= velocity.x * 0.05;
          velocity.x *= 0.94;
        }
      }

      // Auto-rotate
      if (autoRotating && !isPointerDown) {
        targetLon += 0.04;
      }

      // Smooth lerp
      lon += (targetLon - lon) * 0.08;
      lat += (targetLat - lat) * 0.08;

      const phi = THREE.MathUtils.degToRad(90 - lat);
      const theta = THREE.MathUtils.degToRad(lon);
      camera.target = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta)
      );
      camera.lookAt(camera.target);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      renderer.setSize(nw, nh);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    sceneRef.current = { renderer, scene, camera };

    // Hide hint after 3s
    const hintTimer = setTimeout(() => setHint(false), 3500);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(idleTimer);
      clearTimeout(hintTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
      container.removeEventListener("mousedown", onPointerDown);
      container.removeEventListener("mousemove", onPointerMove);
      container.removeEventListener("mouseup", onPointerUp);
      container.removeEventListener("mouseleave", onPointerUp);
      container.removeEventListener("touchstart", onPointerDown);
      container.removeEventListener("touchmove", onPointerMove);
      container.removeEventListener("touchend", onPointerUp);
      container.removeEventListener("wheel", onWheel);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [imageUrl]);

  const resetView = () => {
    // Reload the component by remounting — simplest reset
    if (sceneRef.current) {
      sceneRef.current.camera.fov = 75;
      sceneRef.current.camera.updateProjectionMatrix();
    }
  };

  return (
    <div className={`fixed z-50 bg-black flex flex-col ${isFullscreen ? "inset-0" : "inset-4 rounded-3xl overflow-hidden shadow-2xl"}`}>
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-3 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <h2 className="text-white font-bold text-base drop-shadow">🕌 {placeName}</h2>
          <p className="text-white/50 text-xs">Eksplorim 360° VR</p>
        </div>
        <div className="flex gap-2 pointer-events-auto">
          <button onClick={resetView} title="Reset" className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all">
            <RotateCcw className="w-4 h-4 text-white" />
          </button>
          <button onClick={() => setIsFullscreen(f => !f)} className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all">
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-white" /> : <Maximize2 className="w-4 h-4 text-white" />}
          </button>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/10 hover:bg-red-500/70 flex items-center justify-center transition-all">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Three.js mount */}
      <div ref={mountRef} className="w-full h-full" style={{ minHeight: 400 }} />

      {/* Controls hint */}
      {hint && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 bg-black/70 backdrop-blur-sm rounded-2xl px-5 py-3 text-white/80 text-xs animate-pulse pointer-events-none">
          <span className="flex items-center gap-1.5"><Move className="w-3.5 h-3.5" /> Zvarrit / Prekë</span>
          <span className="w-px h-4 bg-white/20" />
          <span className="flex items-center gap-1.5"><ZoomIn className="w-3.5 h-3.5" /> Scroll / Pinch</span>
          <span className="w-px h-4 bg-white/20" />
          <span>WASD / ↑↓←→</span>
        </div>
      )}

      {/* Compass / orientation indicator */}
      <div className="absolute bottom-6 right-5 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center">
        <span className="text-white text-xs font-bold select-none">360</span>
      </div>
    </div>
  );
}