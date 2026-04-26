"use client";

import { useState } from "react";
import { Lightbox } from "./Lightbox";

interface ProjectGalleryProps {
  nazev: string;
  hlavniFoto: string;
  fotogalerie: string[];
  pudorys: string;
}

export function ProjectGallery({ nazev, hlavniFoto, fotogalerie = [], pudorys }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showPudorys, setShowPudorys] = useState(false);

  const allImages = fotogalerie.map((src, i) => ({
    src,
    alt: `${nazev}, foto ${i + 1}`,
  }));

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main image */}
        <div
          className="md:col-span-2 h-96 bg-[#F7F5F0] overflow-hidden cursor-pointer"
          onClick={() => setLightboxIndex(0)}
        >
          <img
            src={hlavniFoto}
            alt={nazev}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          {fotogalerie.slice(1, 4).map((foto, index) => (
            <div
              key={index}
              className="h-24 md:h-28 bg-[#F7F5F0] overflow-hidden cursor-pointer"
              onClick={() => setLightboxIndex(index + 1)}
            >
              <img
                src={foto}
                alt={`${nazev}, foto ${index + 2}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
          {fotogalerie.length > 4 && (
            <div
              className="h-24 md:h-28 bg-[#F7F5F0] flex items-center justify-center text-[#8B7340] font-semibold cursor-pointer hover:bg-[#F0EDE6] transition-colors"
              onClick={() => setLightboxIndex(4)}
            >
              +{fotogalerie.length - 4} fotek
            </div>
          )}
        </div>
      </div>


      {/* Lightbox - galerie */}
      {lightboxIndex !== null && (
        <Lightbox
          images={allImages}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* Lightbox - půdorys */}
      {showPudorys && (
        <Lightbox
          images={[{ src: pudorys, alt: `Půdorys ${nazev}` }]}
          startIndex={0}
          onClose={() => setShowPudorys(false)}
        />
      )}
    </>
  );
}
