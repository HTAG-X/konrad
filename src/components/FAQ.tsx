"use client";

import { useState } from "react";

interface FAQItem {
  otazka: string;
  odpoved: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-[rgba(139,115,64,0.15)] bg-white"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between px-8 py-5 text-left"
          >
            <span className="font-semibold text-[#1A1A1A] text-[1rem] pr-4">
              {item.otazka}
            </span>
            <span className="text-[#8B7340] text-2xl flex-shrink-0 leading-none">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>
          {openIndex === index && (
            <div className="px-8 pb-6">
              <p className="text-[#3D3D3D] text-[0.95rem] leading-relaxed">
                {item.odpoved}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
