"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { MapPin, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

/*
 * Pin positions as percentages of the map image.
 * Equirectangular projection:
 *   xPct = (longitude + 180) / 360 * 100
 *   yPct = (90 - latitude)  / 180 * 100
 */
const locations = [
  { name: "Urrugne, France (Head Office)", xPct: 49.8, yPct: 26, lon: -1.7, lat: 43.4 },
  { name: "Bangkok, Thailand (Sourcing Office)", xPct: 78.2, yPct: 42, lon: 100.5, lat: 13.7 },
];

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.3;

export default function Locations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<string | null>(null);

  /* ---- zoom & pan state ---- */
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);

  /** Clamp pan so map edges don't leave the viewport */
  const clampPan = useCallback(
    (x: number, y: number, s: number) => {
      const el = mapContainerRef.current;
      if (!el) return { x, y };
      const rect = el.getBoundingClientRect();
      const maxX = ((s - 1) * rect.width) / 2;
      const maxY = ((s - 1) * rect.height) / 2;
      return {
        x: Math.max(-maxX, Math.min(maxX, x)),
        y: Math.max(-maxY, Math.min(maxY, y)),
      };
    },
    [],
  );

  /** Zoom centred on a point inside the container */
  const zoomAt = useCallback(
    (clientX: number, clientY: number, newZoom: number) => {
      const el = mapContainerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // cursor position relative to container centre
      const cx = clientX - rect.left - rect.width / 2;
      const cy = clientY - rect.top - rect.height / 2;
      const factor = newZoom / zoom;
      const nx = cx - factor * (cx - pan.x);
      const ny = cy - factor * (cy - pan.y);
      const clamped = clampPan(nx, ny, newZoom);
      setZoom(newZoom);
      setPan(clamped);
    },
    [zoom, pan, clampPan],
  );

  /** Mouse-wheel zoom */
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      const direction = e.deltaY < 0 ? 1 : -1;
      const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom + direction * ZOOM_STEP));
      if (next === zoom) return;
      zoomAt(e.clientX, e.clientY, next);
    },
    [zoom, zoomAt],
  );

  /** Button zoom (centred) */
  const handleZoomBtn = useCallback(
    (direction: 1 | -1) => {
      const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom + direction * ZOOM_STEP));
      const clamped = clampPan(pan.x * (next / zoom), pan.y * (next / zoom), next);
      setZoom(next);
      setPan(clamped);
    },
    [zoom, pan, clampPan],
  );

  const handleReset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  /* ---- pointer tracking for drag + pinch ---- */
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStartDist = useRef(0);
  const pinchStartZoom = useRef(1);
  const pinchStartPan = useRef({ x: 0, y: 0 });

  const getDistance = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    Math.hypot(a.x - b.x, a.y - b.y);

  const getMidpoint = (a: { x: number; y: number }, b: { x: number; y: number }) => ({
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  });

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointersRef.current.size === 2) {
        // Start pinch
        const [a, b] = Array.from(pointersRef.current.values());
        pinchStartDist.current = getDistance(a, b);
        pinchStartZoom.current = zoom;
        pinchStartPan.current = { x: pan.x, y: pan.y };
        setDragging(false); // cancel any single-finger drag
      } else if (pointersRef.current.size === 1 && zoom > 1) {
        // Start drag (only when zoomed in)
        setDragging(true);
        dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
      }

      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [zoom, pan],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointersRef.current.size === 2) {
        // Pinch zoom
        const [a, b] = Array.from(pointersRef.current.values());
        const dist = getDistance(a, b);
        if (pinchStartDist.current === 0) return;
        const scale = dist / pinchStartDist.current;
        const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, pinchStartZoom.current * scale));

        // Pan to keep the midpoint stable
        const el = mapContainerRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const mid = getMidpoint(a, b);
          const cx = mid.x - rect.left - rect.width / 2;
          const cy = mid.y - rect.top - rect.height / 2;
          const factor = next / pinchStartZoom.current;
          const nx = cx - factor * (cx - pinchStartPan.current.x);
          const ny = cy - factor * (cy - pinchStartPan.current.y);
          setPan(clampPan(nx, ny, next));
        }

        setZoom(next);
        return;
      }

      if (dragging) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        setPan(clampPan(dragStart.current.panX + dx, dragStart.current.panY + dy, zoom));
      }
    },
    [dragging, zoom, clampPan],
  );

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) {
      pinchStartDist.current = 0;
    }
    if (pointersRef.current.size === 0) {
      setDragging(false);
    }
  }, []);

  /* prevent native scroll/zoom when interacting with the map */
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;
  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;
    const preventWheel = (e: WheelEvent) => {
      if (zoomRef.current > 1) e.preventDefault();
    };
    const preventTouch = (e: TouchEvent) => {
      // Block native gestures when pinching (2+ fingers) or when zoomed in
      if (e.touches.length >= 2 || zoomRef.current > 1) e.preventDefault();
    };
    el.addEventListener("wheel", preventWheel, { passive: false });
    el.addEventListener("touchmove", preventTouch, { passive: false });
    return () => {
      el.removeEventListener("wheel", preventWheel);
      el.removeEventListener("touchmove", preventTouch);
    };
  }, []);

  return (
    <section
      id="locations"
      className="py-24 lg:py-32 bg-white overflow-hidden"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold tracking-[0.2em] uppercase text-xs mb-4">
            Global Presence
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
            Our Locations
          </h2>
          <div className="w-16 h-[2px] bg-accent mx-auto mt-6" />
        </motion.div>

        {/* Map + sidebar */}
        <div className="grid lg:grid-cols-[1fr_260px] gap-8 items-start">
          {/* Map container — real world map image + dot overlays */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden select-none border border-border"
            ref={mapContainerRef}
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{ cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "default", touchAction: "pan-x pan-y" }}
          >
            {/* Zoom controls */}
            <div className="absolute top-3 right-3 z-30 flex flex-col gap-1.5">
              <button
                onClick={() => handleZoomBtn(1)}
                disabled={zoom >= MAX_ZOOM}
                className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur border border-border flex items-center justify-center text-navy hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                aria-label="Zoom in"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={() => handleZoomBtn(-1)}
                disabled={zoom <= MIN_ZOOM}
                className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur border border-border flex items-center justify-center text-navy hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                aria-label="Zoom out"
              >
                <ZoomOut size={16} />
              </button>
              {zoom > 1 && (
                <button
                  onClick={handleReset}
                  className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur border border-border flex items-center justify-center text-navy hover:bg-white transition shadow-sm"
                  aria-label="Reset zoom"
                >
                  <RotateCcw size={14} />
                </button>
              )}
            </div>

            {/* Zoomable / pannable inner wrapper */}
            <div
              className="relative transition-transform duration-200 ease-out"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: "center center",
                ...(dragging ? { transitionDuration: "0ms" } : {}),
              }}
            >
              {/* Real world map generated from GeoJSON country boundaries */}
              <Image
                src="/world-map.svg"
                alt="World map"
                width={1000}
                height={500}
                className="w-full h-auto block pointer-events-none"
                priority
                draggable={false}
              />

              {/* Location pins overlaid on the map */}
              {locations.map((loc, i) => {
                const isActive = hovered === loc.name;
                return (
                  <motion.div
                    key={loc.name}
                    className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                    style={{
                      left: `${loc.xPct}%`,
                      top: `${loc.yPct}%`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      delay: 0.6 + i * 0.12,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    onMouseEnter={() => setHovered(loc.name)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Pulse ring */}
                    <span
                      className={`absolute rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-8 h-8 bg-accent/20"
                          : "w-6 h-6 bg-navy/10"
                      }`}
                    />
                    {/* Dot */}
                    <span
                      className={`relative rounded-full transition-all duration-300 z-10 ${
                        isActive
                          ? "w-3.5 h-3.5 bg-accent shadow-lg shadow-accent/40"
                          : "w-2.5 h-2.5 bg-navy"
                      }`}
                    />
                    {/* Tooltip */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-full mb-2 px-3 py-1.5 bg-navy/95 text-white text-xs font-semibold rounded-md whitespace-nowrap z-20 shadow-lg"
                      >
                        {loc.name}
                        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-navy/95" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Location sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-3"
          >
            {/* Locations badge */}
            <div className="bg-gradient-to-r from-steel-blue to-navy rounded-xl px-6 py-4 text-white font-bold tracking-[0.15em] uppercase text-sm text-center">
              Locations
            </div>

            {locations.map((loc, i) => (
              <motion.button
                key={loc.name}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.08 }}
                onMouseEnter={() => setHovered(loc.name)}
                onMouseLeave={() => setHovered(null)}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-xl border text-sm font-semibold tracking-wide transition-all duration-200 text-left ${
                  hovered === loc.name
                    ? "bg-navy text-white border-navy shadow-lg"
                    : "bg-white text-navy border-border hover:border-accent/40"
                }`}
              >
                <MapPin
                  size={16}
                  className={
                    hovered === loc.name ? "text-accent" : "text-slate"
                  }
                />
                {loc.name.toUpperCase()}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
