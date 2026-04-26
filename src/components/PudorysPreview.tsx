"use client";

import { useState } from "react";
import { Lightbox } from "./Lightbox";

interface PudorysPreviewProps {
  src: string;
  nazev: string;
}

export function PudorysPreview({ src, nazev }: PudorysPreviewProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-[#F7F5F0] p-6 mb-6">
        <h3 className="font-serif font-bold text-[#1A1A1A] mb-4">Půdorys</h3>
        <div
          className="cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setOpen(true)}
        >
          <img
            src={src}
            alt={`Půdorys ${nazev}`}
            className="w-full h-auto"
          />
        </div>
        <p className="text-xs text-[#8A8A8A] mt-2">Klikněte pro zvětšení</p>
      </div>

      {open && (
        <Lightbox
          images={[{ src, alt: `Půdorys ${nazev}` }]}
          startIndex={0}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
