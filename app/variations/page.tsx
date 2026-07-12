"use client";

import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  PanInfo,
  animate,
  MotionValue,
} from "framer-motion";
import {
  Loader2,
  Sparkles,
  Waves,
  Zap,
  Smartphone,
  Monitor,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
const useAlbums = (genre = "scifi") => {
  const [covers, setCovers] = useState<CoverFlowItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCovers = async () => {
      setLoading(true);
      try {
        // Diversify content
        const query =
          genre === "random"
            ? ["daft punk", "pink floyd", "radiohead"][
                Math.floor(Math.random() * 3)
              ]
            : genre;
        const res = await fetch(
          `https://itunes.apple.com/search?term=${query}&entity=album&limit=25`,
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
    // Helix
    helixRadius: isMobile ? 240 : 450,
    helixSpacing: isMobile ? 150 : 140,
  };
};

// --- Page Component ---
export default function VariationsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize theme from local storage or system preference
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (saved === "dark" || (!saved && prefersDark)) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode, mounted]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-cyan-500/30 flex flex-col">
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />

      <main className="flex-grow pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-neutral-600 mb-6 tracking-tight animate-fade-in">
            Next-Gen Interface
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto animate-slide-up flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Experimental 3D Interactions</span>
          </p>
        </div>

        <Section
          title="Horizontal Helix"
          description="Keyboard Controlled. No Drag."
          icon={<Waves className="w-5 h-5" />}
        >
          <HelixFlow />
        </Section>
      </main>
      <Footer />
    </div>
  );
}

const Section = ({
  children,
  title,
  description,
  icon,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <section className="mb-40 relative group px-2 md:px-0">
    <div className="max-w-7xl mx-auto mb-6 flex flex-col md:flex-row md:items-end justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.15)] group-hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-all duration-500">
          {icon}
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-neutral-500 text-sm mt-1">{description}</p>
        </div>
      </div>

      <div className="hidden md:flex gap-2 text-xs text-neutral-600 font-mono uppercase tracking-wider">
        <span className="border border-white/10 px-2 py-1 rounded">
          Arrow Keys
        </span>
      </div>
    </div>

    <div className="relative w-full h-[500px] md:h-[700px] bg-neutral-900/40 border-y border-white/5 overflow-hidden backdrop-blur-sm">
      {/* Back Button - Positioned Top Right to match Trigger */}
      <button
        // onClick={onBack} // Assuming onBack will be passed as a prop or handled internally
        className="absolute top-4 right-4 z-[100] group relative flex items-center gap-2 px-5 py-2.5 bg-white/30 dark:bg-black/30 backdrop-blur-md rounded-full border border-white/20 dark:border-white/10 transition-all duration-300 hover:bg-white/50 dark:hover:bg-white/10 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
      >
        <div className="relative flex items-center justify-center w-5 h-5">
          <Waves className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
        </div>
        <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
          Standard View
        </span>
      </button>

      {/* Title Overlay (Bottom for Mobile/Desktop Uniformity or Top Left) */}
      <div className="absolute top-4 left-4 z-40 flex items-center gap-2 text-neutral-500 dark:text-neutral-400 opacity-60">
        <Waves className="w-4 h-4" />
        <span className="text-xs font-mono uppercase tracking-widest">
          Helix Mode
        </span>
      </div>
      {children}
    </div>
  </section>
);

// --- 1. Horizontal Helix (Locked Down) ---
const HelixFlow = () => {
  const { covers } = useAlbums("electronic");
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

  const onDragStart = () => setIsDragging(true);

  const onDrag = (event: any, info: PanInfo) => {
    // 1:1 drag mapping
    const delta = -info.delta.x / (params.helixSpacing * 0.8);
    x.set(x.get() + delta);
  };

  const onDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false);
    const current = x.get();
    const velocity = info.velocity.x;

    // Momentum
    const momentum = -velocity * 0.0005;
    const projected = current + momentum;

    const target = Math.round(projected);
    const clamped = Math.min(Math.max(target, 0), covers.length - 1);

    updateIndex(clamped);
  };

  if (covers.length === 0) return null;

  return (
    <div className="w-full h-full flex items-center justify-center perspective-1000 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/30 via-black to-black">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

      <motion.div
        className="relative w-full h-full flex items-center justify-center touch-none select-none cursor-grab active:cursor-grabbing"
        style={{ perspective: 1000, transformStyle: "preserve-3d" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        dragMomentum={false}
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
        <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 truncate">
          {covers[activeIndex]?.title}
        </h3>
        <p className="text-xs md:text-sm text-cyan-400 font-mono mt-1">
          {covers[activeIndex]?.subtitle}
        </p>
      </div>
    </div>
  );
};

const HelixItem = ({
  item,
  index,
  scrollX,
  isActive,
  onClick,
  params,
}: any) => {
  const { helixRadius, helixSpacing } = params;
  const angleStep = 25; // Degrees per item

  const position = useTransform(scrollX, (value: number) => index - value);

  const t = useTransform(position, (val) => {
    // Horizontal position based on index
    const x = val * helixSpacing;

    // Spiral calculation
    // `val` is distance from center.
    // val = 0 -> active, angle 0.
    const angle = val * angleStep;
    const rad = (angle * Math.PI) / 180;

    // Y and Z based on angle
    const y = Math.sin(rad) * (helixRadius * 0.4);
    const z = Math.cos(rad) * helixRadius - helixRadius;

    // Rotation: Twist it so it looks like a DNA strand
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
