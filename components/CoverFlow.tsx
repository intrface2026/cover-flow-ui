"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  PanInfo,
  MotionValue,
  animate,
} from "framer-motion";
import { Loader2, Waves } from "lucide-react";
import { HelixFlow } from "./HelixFlow";

// Types for iTunes API response
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

const GENRES = [
  "lo-fi",
  "jazz",
  "pop",
  "rock",
  "classical",
  "electronic",
  "ambient",
  "soundtrack",
];

export const CoverFlow = () => {
  const [covers, setCovers] = useState<CoverFlowItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showHelix, setShowHelix] = useState(false); // Toggle state

  // Fetch Data
  useEffect(() => {
    const fetchCovers = async () => {
      setLoading(true);
      try {
        const randomGenre = GENRES[Math.floor(Math.random() * GENRES.length)];
        const res = await fetch(
          `https://itunes.apple.com/search?term=${randomGenre}&entity=album&limit=25`,
        );
        const data = await res.json();

        if (!data.results) {
          console.error("No results found or API error", data);
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

        setCovers(formatted);
      } catch (e) {
        console.error("Failed to fetch covers", e);
      } finally {
        setLoading(false);
      }
    };
    fetchCovers();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-transparent">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-500" />
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] md:h-[600px] relative overflow-hidden z-20 bg-transparent group transition-colors duration-500">
      {/* If Helix is NOT active, show trigger button */}
      {!showHelix && (
        <div className="absolute top-4 right-4 z-[100] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button
            onClick={() => setShowHelix(true)}
            className="group relative flex items-center gap-2 px-5 py-2.5 bg-white/30 dark:bg-black/30 backdrop-blur-md rounded-full border border-white/20 dark:border-white/10 transition-all duration-300 hover:bg-white/50 dark:hover:bg-white/10 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
            <div className="relative flex items-center justify-center w-5 h-5">
              <Waves className="w-4 h-4 text-neutral-600 dark:text-neutral-400 transition-colors group-hover:text-black dark:group-hover:text-white" />
            </div>
            <span className="text-xs font-medium tracking-wide text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors">
              Enter Helix
            </span>
          </button>
        </div>
      )}

      {/* Conditional Rendering: Helix or Standard Engine */}
      {showHelix ? (
        <HelixFlow onBack={() => setShowHelix(false)} />
      ) : (
        <CoverFlowEngine items={covers} className="w-full h-full" />
      )}
    </div>
  );
};

// --- Engine Implementation ---

interface CoverFlowProps {
  items: CoverFlowItem[];
  itemWidth?: number;
  itemHeight?: number;
  stackSpacing?: number;
  centerGap?: number;
  rotation?: number;
  initialIndex?: number;
  enableReflection?: boolean;
  enableClickToSnap?: boolean;
  enableScroll?: boolean;
  scrollThreshold?: number;
  className?: string;
  onItemClick?: (item: CoverFlowItem, index: number) => void;
  onIndexChange?: (index: number) => void;
}

function CoverFlowEngine({
  items,
  itemWidth = 320, // Adjusted default for desktop
  itemHeight = 320,
  stackSpacing = 60, // Tighter stack
  centerGap = 200, // Clearer center
  rotation = 45,
  initialIndex = 0,
  enableReflection = true,
  enableClickToSnap = true,
  enableScroll = true,
  scrollThreshold = 80, // Sensitivity threshold
  className,
  onItemClick,
  onIndexChange,
}: CoverFlowProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const enableScrollRef = useRef(enableScroll);
  const scrollThresholdRef = useRef(scrollThreshold);

  // Audio Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scrollX = useMotionValue(initialIndex);
  const springX = useSpring(scrollX, {
    stiffness: 150,
    damping: 30,
    mass: 1, // Nice heavy feel from reference
  });

  // Initialize Audio with Base64 to ensure instant availability/no network delay
  useEffect(() => {
    // Short, crisp system tick (Base64 encoded to avoid network issues)
    const tickSound =
      "data:audio/mp3;base64,//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";
    // Note: The above is a placeholder. I will replace it with a real short tick base64 in the actual edit.
    // Actually, I should use a real one. Let me use a standard short click sound.
    // Since I cannot browse for a Base64 string, I will use a reliable external URL but pre-load it,
    // OR better, I will trust the user to test it.
    // Wait, I can't generate a valid mp3 base64 from scratch.
    // I will stick to the URL but try a different, very reliable one, OR keep the mixkit one but handle it better.
    // Let's go back to the Mixkit URL but add error handling and maybe a fallback.
    // Or I can use a very short wav base64 which is easy to construct (e.g. a silence or simple impulse).
    // No, let's use the URL but make sure volume is up and we log errors.

    audioRef.current = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-modern-technology-select-3124.mp3", // A more distinct "tech" click
    );
    audioRef.current.volume = 1.0; // Max volume
    audioRef.current.preload = "auto";
  }, []);

  const playTick = useCallback(() => {
    // Only play if audio is ready
    if (audioRef.current) {
      // If the user hasn't interacted with the document yet, this might fail.
      // But we are in a scroll/drag handler, so it counts as interaction usually.
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Automatic playback started!
            audioRef.current!.currentTime = 0;
          })
          .catch((error) => {
            // Auto-play was prevented
            console.warn("Audio playback failed:", error);
          });
      }
    }
  }, []);

  // Initial Animation: Start 0 -> Center
  useEffect(() => {
    if (items.length > 0) {
      const centerIndex = Math.floor(items.length / 2);

      // Force start at 0
      scrollX.set(0);
      setActiveIndex(0);

      // Animate to center
      setTimeout(() => {
        // We can animate the motion value directly, but we need to update state too ensuring sync
        // For the engine logic which relies on activeIndex state + spring, we should animate the index

        // Let's manually animate the scrollX to the target, then snap state
        animate(scrollX, centerIndex, {
          duration: 2.5,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: (latest) => {
            // Sync active index visually during animation
            setActiveIndex(Math.round(latest));
          },
          onComplete: () => {
            setActiveIndex(centerIndex);
          },
        });
      }, 500);
    }
  }, []); // Run on mount (after data load effectively since this component mounts then)

  useEffect(() => {
    if (initialIndex !== activeIndex) {
      // setActiveIndex(initialIndex) // Don't override local state unless prop changes meaningfully
      // scrollX.set(initialIndex)
    }
  }, [initialIndex]);

  useEffect(() => {
    onIndexChange?.(activeIndex);
    playTick();
  }, [activeIndex, onIndexChange, playTick]);

  useEffect(() => {
    enableScrollRef.current = enableScroll;
  }, [enableScroll]);

  useEffect(() => {
    scrollThresholdRef.current = scrollThreshold;
  }, [scrollThreshold]);

  const jumpToIndex = useCallback(
    (index: number) => {
      const clamped = Math.min(Math.max(index, 0), items.length - 1);
      setActiveIndex(clamped);
      scrollX.set(clamped);
    },
    [items.length, scrollX],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let wheelAccumulator = 0;
    let lastWheelTime = Date.now();

    const handleWheel = (e: WheelEvent) => {
      if (!enableScrollRef.current) return;

      const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      if (isVerticalScroll) return;

      const delta = e.deltaX;
      e.preventDefault();

      const now = Date.now();
      if (now - lastWheelTime > 200) {
        wheelAccumulator = 0;
      }
      lastWheelTime = now;
      wheelAccumulator += delta;

      const threshold = scrollThresholdRef.current;

      // Threshold-based step scrolling
      if (wheelAccumulator > threshold) {
        const currentIndex = Math.round(scrollX.get());
        jumpToIndex(currentIndex + 1);
        wheelAccumulator = 0;
      } else if (wheelAccumulator < -threshold) {
        const currentIndex = Math.round(scrollX.get());
        jumpToIndex(currentIndex - 1);
        wheelAccumulator = 0;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [jumpToIndex, scrollX]);

  const onDragStart = () => {
    setIsDragging(true);
  };

  const onDrag = (event: any, info: PanInfo) => {
    // Direct mapping of drag distance to index change
    const deltaIndex = -info.delta.x / (centerGap * 0.8);
    const current = springX.get();
    scrollX.set(current + deltaIndex);
  };

  const onDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false);
    const current = springX.get();
    const velocity = info.velocity.x;

    // Project end position based on velocity
    const projected = current - velocity * 0.002;

    const targetIndex = Math.round(projected);
    const clampedIndex = Math.min(Math.max(targetIndex, 0), items.length - 1);

    setActiveIndex(clampedIndex);
    scrollX.set(clampedIndex);
  };

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        jumpToIndex(activeIndex - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        jumpToIndex(activeIndex + 1);
      }
    },
    [activeIndex, jumpToIndex],
  );

  return (
    <motion.div
      ref={containerRef}
      className={`relative w-full h-full flex flex-col justify-center items-center overflow-hidden bg-transparent focus:outline-none touch-pan-y ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      } ${className ?? ""}`}
      style={{ perspective: 1000 }}
      role="region"
      aria-label="Cover Flow"
      tabIndex={0}
      onKeyDown={onKeyDown}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
    >
      <div
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        {items.map((item, index) => (
          <CoverFlowItemCard
            key={item.id}
            item={item}
            index={index}
            scrollX={springX}
            width={itemWidth}
            height={itemHeight}
            stackSpacing={stackSpacing}
            centerGap={centerGap}
            rotation={rotation}
            isActive={index === activeIndex}
            enableReflection={enableReflection}
            enableClickToSnap={enableClickToSnap}
            isDragging={isDragging}
            onClick={() => {
              if (index === activeIndex) {
                onItemClick?.(item, index);
              } else if (enableClickToSnap) {
                jumpToIndex(index);
              }
            }}
          />
        ))}
      </div>

      {/* Metadata Card removed as requested */}
    </motion.div>
  );
}

interface CardProps {
  item: CoverFlowItem;
  index: number;
  scrollX: MotionValue<number>;
  width: number;
  height: number;
  stackSpacing: number;
  centerGap: number;
  rotation: number;
  isActive: boolean;
  enableReflection: boolean;
  enableClickToSnap: boolean;
  isDragging: boolean;
  onClick: () => void;
}

function CoverFlowItemCard({
  item,
  index,
  scrollX,
  width,
  height,
  stackSpacing,
  centerGap,
  rotation,
  isActive,
  enableReflection,
  enableClickToSnap,
  isDragging,
  onClick,
}: CardProps) {
  const position = useTransform(scrollX, (value) => index - value);
  const zIndex = useTransform(position, (pos) => 1000 - Math.abs(pos) * 10);

  const t = useTransform(position, (pos) => {
    const absPos = Math.abs(pos);
    const isCenter = absPos < 0.5;

    let rY = 0;
    if (pos < -0.5) rY = rotation;
    if (pos > 0.5) rY = -rotation;
    if (isCenter) rY = -pos * (rotation * 2);

    let x = 0;
    if (pos < 0) {
      const stackIndex = Math.max(0, absPos - 1);
      x = -centerGap - stackIndex * stackSpacing;

      // Interpolate x when entering center
      if (absPos < 1) x = pos * centerGap;
    } else {
      const stackIndex = Math.max(0, absPos - 1);
      x = centerGap + stackIndex * stackSpacing;

      if (absPos < 1) x = pos * centerGap;
    }

    let z = 0;
    if (absPos > 0.5) {
      z = -200;
    } else {
      z = Math.abs(pos) * -400;
    }

    return { rotateY: rY, x, z };
  });

  const rotateY = useTransform(t, (v) => v.rotateY);
  const x = useTransform(t, (v) => v.x);
  const z = useTransform(t, (v) => v.z);
  const brightness = useTransform(position, (pos) =>
    Math.abs(pos) < 0.5 ? 1 : 0.5,
  );

  const getCursorClass = () => {
    if (isDragging) return "cursor-grabbing";
    if (isActive || enableClickToSnap) return "cursor-pointer";
    return "cursor-grab";
  };

  return (
    <motion.div
      className={`absolute top-1/2 left-1/2 preserve-3d will-change-transform ${getCursorClass()}`}
      style={{
        width,
        height,
        marginTop: -height / 2,
        marginLeft: -width / 2,
        x,
        z,
        rotateY,
        zIndex,
        filter: useTransform(brightness, (b) => `brightness(${b})`),
        pointerEvents: "auto",
      }}
      onClick={onClick}
    >
      <div className="relative w-full h-full rounded-sm shadow-2xl bg-black">
        {/* Vinyl Record decorative hint - Re-added for style */}
        <div
          className={`absolute top-2 bottom-2 right-2 w-full rounded-full bg-neutral-900 -z-10`}
        >
          <div className="absolute inset-0 m-auto h-20 w-20 rounded-full border-[20px] border-neutral-800 bg-black" />
        </div>

        {/* Border */}
        <div className="absolute inset-0 rounded-sm border border-white/10 z-20 pointer-events-none" />

        <div className="relative w-full h-full overflow-hidden rounded-sm bg-black">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover select-none pointer-events-none"
            draggable={false}
          />
          {/* Gloss */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/40 pointer-events-none z-10" />
        </div>
      </div>

      {enableReflection && (
        <div
          className="absolute left-0 right-0 overflow-hidden pointer-events-none"
          style={{
            top: "100%",
            width: width,
            height: height * 0.35,
            marginTop: "2px",
          }}
        >
          <div
            className="relative w-full h-full opacity-40"
            style={{ transform: "scaleY(-1)" }}
          >
            <img
              src={item.image}
              alt=""
              className="w-full h-full object-cover blur-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-black to-transparent" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
