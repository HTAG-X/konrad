"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { X, Search, Image as ImageIcon } from "lucide-react";

interface ImagePickerProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

interface StorageFile {
  name: string;
  url: string;
  bucket: string;
}

export function ImagePicker({ onSelect, onClose }: ImagePickerProps) {
  const supabase = createClient();
  const [images, setImages] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadAllImages();
  }, []);

  const loadAllImages = async () => {
    setLoading(true);
    const allImages: StorageFile[] = [];

    // Load from both buckets
    for (const bucket of ["projekty-images", "blog-images"]) {
      await loadBucketRecursive(bucket, "", allImages);
    }

    // Also load project images from DB (local paths in public/)
    const { data: projekty } = await supabase
      .from("projekty")
      .select("fotogalerie, hlavni_foto, pudorys")
      .or("deleted.is.null,deleted.eq.false");

    if (projekty) {
      for (const p of projekty) {
        if (p.hlavni_foto && !allImages.some((i) => i.url === p.hlavni_foto)) {
          allImages.push({ name: p.hlavni_foto.split("/").pop() || "", url: p.hlavni_foto, bucket: "local" });
        }
        if (p.pudorys && !allImages.some((i) => i.url === p.pudorys)) {
          allImages.push({ name: p.pudorys.split("/").pop() || "", url: p.pudorys, bucket: "local" });
        }
        if (Array.isArray(p.fotogalerie)) {
          for (const foto of p.fotogalerie) {
            if (!allImages.some((i) => i.url === foto)) {
              allImages.push({ name: foto.split("/").pop() || "", url: foto, bucket: "local" });
            }
          }
        }
      }
    }

    setImages(allImages);
    setLoading(false);
  };

  const loadBucketRecursive = async (bucket: string, path: string, acc: StorageFile[]) => {
    const { data } = await supabase.storage.from(bucket).list(path, { limit: 500 });
    if (!data) return;

    for (const item of data) {
      const fullPath = path ? `${path}/${item.name}` : item.name;
      if (item.id) {
        // It's a file
        if (/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(item.name)) {
          const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fullPath);
          acc.push({ name: item.name, url: publicUrl, bucket });
        }
      } else {
        // It's a folder
        await loadBucketRecursive(bucket, fullPath, acc);
      }
    }
  };

  const filtered = search
    ? images.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.url.toLowerCase().includes(search.toLowerCase()))
    : images;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[900px] max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(139,115,64,0.15)]">
          <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">Vybrat obrázek</h2>
          <button onClick={onClose} className="text-[#8A8A8A] hover:text-[#1A1A1A] transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-[rgba(139,115,64,0.15)]">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A8A]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Hledat obrázek..."
              className="w-full pl-10 pr-4 py-2 border border-[rgba(139,115,64,0.3)] text-sm focus:outline-none focus:border-[#8B7340]"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <p className="text-center text-[#8A8A8A] py-12">Načítám obrázky...</p>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon size={40} className="mx-auto mb-3 text-[#8A8A8A]" />
              <p className="text-[#8A8A8A]">Žádné obrázky nenalezeny</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {filtered.map((img) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => {
                    onSelect(img.url);
                    onClose();
                  }}
                  className="aspect-square bg-[#F7F5F0] overflow-hidden border-2 border-transparent hover:border-[#8B7340] transition-colors group"
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[rgba(139,115,64,0.15)] text-xs text-[#8A8A8A]">
          {filtered.length} obrázků
        </div>
      </div>
    </div>
  );
}
