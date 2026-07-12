"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  PanInfo,
  MotionValue,
} from "framer-motion";
import { ArrowLeft, Loader2, Waves } from "lucide-react";

// --- Types ---
interface ITunesAlbum {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100: string;
}

interface CoverFlowItem {
  id: string | number;
  image: string;
  title: string;
  subtitle?: string;
}

// --- Shared Data Fetching ---
const useAlbums = (genre = "electronic") => {
  const [covers, setCovers] = useState<CoverFlowItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCovers = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://itunes.apple.com/search?term=${genre}&entity=album&limit=25`,
        );
        const data = await res.json();

        if (!data.results) {
          setLoading(false);
          return;
        }

        const formatted: CoverFlowItem[] = data.results.map(
          (item: ITunesAlbum) => ({
            id: String(item.collectionId),
            title: item.collectionName,
            subtitle: item.artistName,
            image: item.artworkUrl100.replace("100x100bb", "600x600bb"),
          }),
        );
        // Deduplicate
        const unique = formatted.filter(
          (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i,
        );
        setCovers(unique);
      } catch (e) {
        console.error("Failed to fetch", e);
      } finally {
        setLoading(false);
      }
    };
    fetchCovers();
  }, [genre]);

  return { covers, loading };
};

// --- Hook: Keyboard Navigation ---
const useKeyboardNav = (
  activeIndex: number,
  setActiveIndex: (i: number) => void,
  total: number,
  enabled: boolean = true,
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveIndex(Math.max(0, activeIndex - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveIndex(Math.min(total - 1, activeIndex + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, total, enabled, setActiveIndex]);
};

// --- Hook: Responsiveness ---
const useResponsiveParams = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return {
    isMobile,
    helixRadius: isMobile ? 240 : 450,
    helixSpacing: isMobile ? 150 : 140,
  };
};

export const HelixFlow: React.FC = () => {
  const { covers, loading } = useAlbums("electronic");
  const [activeIndex, setActiveIndex] = useState(0);
  const params = useResponsiveParams();
  const [isDragging, setIsDragging] = useState(false);

  // Use a spring that snaps firmly
  const x = useMotionValue(0);
  const springX = useSpring(x, {
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  });

  const updateIndex = useCallback(
    (newIndex: number) => {
      if (covers.length === 0) return;
      const clamped = Math.min(Math.max(newIndex, 0), covers.length - 1);
      setActiveIndex(clamped);
      x.set(clamped);
    },
    [covers.length, x],
  );

  useKeyboardNav(activeIndex, updateIndex, covers.length);

  const onDragStart = () => setIsDragging(true);

  const onDrag = (event: any, info: PanInfo) => {
    // 1:1 drag mapping - adjust sensitivity via divisor
    // helixSpacing is around 140-180. Using a divisor close to that makes it feel 1:1
    const delta = -info.delta.x / (params.helixSpacing * 0.8);
    x.set(x.get() + delta);
  };

  const onDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false);
    const current = x.get();
    const velocity = info.velocity.x; // pixels per second

    // Momentum factor
    const momentum = -velocity * 0.0005;
    const projected = current + momentum;

    const target = Math.round(projected);
    const clamped = Math.min(Math.max(target, 0), covers.length - 1);

    updateIndex(clamped);
  };

  // --- Ref for Container ---
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Scroll/Wheel Handling ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      if (isVerticalScroll) return;
      
      e.preventDefault();
      // Threshold for scroll
      if (Math.abs(e.deltaX) > 10) {
        const direction = e.deltaX > 0 ? 1 : -1;
        updateIndex(activeIndex + direction);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [activeIndex, updateIndex]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-transparent">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (covers.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="w-full h-[400px] md:h-[600px] relative flex items-center justify-center bg-transparent dark:bg-black perspective-1000 overflow-hidden animate-fade-in transition-colors duration-500"
    >
      {/* Background Ambience - Dark Mode Only for Radial */}
      <div className="absolute inset-0 bg-transparent dark:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:from-indigo-950/30 dark:via-black dark:to-black" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

      {/* Title Overlay (Top Right) */}
      {/* Title Overlay (Bottom for Mobile/Desktop Uniformity or Top Left) */}
      <div className="absolute top-4 left-4 z-40 flex items-center gap-2 text-neutral-500 dark:text-neutral-400 opacity-60">
        <Waves className="w-4 h-4" />
        <span className="text-xs font-mono uppercase tracking-widest">
          Helix Mode
        </span>
      </div>

      <motion.div
        className="relative w-full h-full flex items-center justify-center touch-pan-y select-none cursor-grab active:cursor-grabbing"
        style={{ perspective: 1000, transformStyle: "preserve-3d" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        dragMomentum={false} // We handle momentum manually for snapping
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
      >
        <div
          className="relative transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          {covers.map((item, index) => (
            <HelixItem
              key={item.id}
              item={item}
              index={index}
              scrollX={springX}
              isActive={index === activeIndex}
              onClick={() => updateIndex(index)}
              params={params}
            />
          ))}
        </div>
      </motion.div>

      {/* Current Title Overlay */}
      <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none px-4">
        <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-500 dark:from-white dark:to-neutral-400 truncate">
          {covers[activeIndex]?.title}
        </h3>
        <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-mono mt-1">
          {covers[activeIndex]?.subtitle}
        </p>
      </div>
    </div>
  );
};

// --- Helix Item Component ---
interface HelixItemProps {
  item: CoverFlowItem;
  index: number;
  scrollX: MotionValue<number>;
  isActive: boolean;
  onClick: () => void;
  params: {
    helixRadius: number;
    helixSpacing: number;
  };
}

const HelixItem: React.FC<HelixItemProps> = ({
  item,
  index,
  scrollX,
  isActive,
  onClick,
  params,
}) => {
  const { helixRadius, helixSpacing } = params;
  const angleStep = 25; // Degrees per item

  const position = useTransform(scrollX, (value: number) => index - value);

  const t = useTransform(position, (val) => {
    // Horizontal position based on index
    const x = val * helixSpacing;

    // Spiral calculation
    const angle = val * angleStep;
    const rad = (angle * Math.PI) / 180;

    // Y and Z based on angle
    const y = Math.sin(rad) * (helixRadius * 0.4);
    const z = Math.cos(rad) * helixRadius - helixRadius;

    // Rotation
    const rotateX = angle;
    const rotateY = val * -5;

    // Opacity
    const dist = Math.abs(val);
    const opacity = 1 - Math.min(dist * 0.15, 1);
    const scale = 1 - Math.min(dist * 0.05, 0.5);

    return { x, y, z, rotateX, rotateY, opacity, scale };
  });

  return (
    <motion.div
      className="absolute top-0 left-0 w-[200px] h-[200px] md:w-[240px] md:h-[240px] -ml-[100px] -mt-[100px] md:-ml-[120px] md:-mt-[120px] origin-center will-change-transform"
      style={{
        x: useTransform(t, (v) => v.x),
        y: useTransform(t, (v) => v.y),
        z: useTransform(t, (v) => v.z),
        rotateX: useTransform(t, (v) => v.rotateX),
        rotateY: useTransform(t, (v) => v.rotateY),
        opacity: useTransform(t, (v) => v.opacity),
        scale: useTransform(t, (v) => v.scale),
      }}
      onClick={onClick}
    >
      <div
        className={`w-full h-full rounded-sm overflow-hidden shadow-2xl transition-all duration-300 border border-white/10 bg-black ${
          isActive
            ? "ring-1 ring-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] saturate-100 cursor-pointer"
            : "saturate-0 brightness-50"
        }`}
      >
        {/* Vinyl Hint */}
        <div className="absolute top-2 bottom-2 right-2 w-full rounded-full bg-neutral-900 -z-10">
          <div className="absolute inset-0 m-auto h-20 w-20 rounded-full border-[20px] border-neutral-800 bg-black" />
        </div>

        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover relative z-0"
          draggable={false}
        />

        {/* Gloss Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/40 pointer-events-none z-10" />

        {/* Reflection Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none mix-blend-screen z-20" />
      </div>
    </motion.div>
  );
};
