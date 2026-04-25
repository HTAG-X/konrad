"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: { src: string; alt: string }[];
  startIndex?: number;
  onClose: () => void;
}

export function Lightbox({ images, startIndex = 0, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }, [images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, prev, next]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
        aria-label="Zavřít"
      >
        <X size={32} />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 text-white/50 text-sm">
        {current + 1} / {images.length}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
          aria-label="Předchozí"
        >
          <ChevronLeft size={40} />
        </button>
      )}

      {/* Image */}
      <div className="max-w-[90vw] max-h-[85vh] flex items-center justify-center px-16">
        <img
          src={images[current].src}
          alt={images[current].alt}
          className="max-w-full max-h-[85vh] object-contain"
        />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
          aria-label="Další"
        >
          <ChevronRight size={40} />
        </button>
      )}
    </div>
  );
}
