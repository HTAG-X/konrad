"use client";

import { useState, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, X, GripVertical, Star } from "lucide-react";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  mainImage: string;
  onMainImageChange: (url: string) => void;
  bucket: string;
  folder: string;
}

export function ImageUploader({
  images,
  onChange,
  mainImage,
  onMainImageChange,
  bucket,
  folder,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      setUploading(true);
      const newUrls: string[] = [];

      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        if (file.size > 10 * 1024 * 1024) {
          alert(`Soubor ${file.name} je příliš velký (max 10 MB)`);
          continue;
        }

        const ext = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const path = `${folder}/${fileName}`;

        const { error } = await supabase.storage
          .from(bucket)
          .upload(path, file, { cacheControl: "31536000", upsert: false });

        if (error) {
          console.error("Upload error:", error.message);
          continue;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from(bucket).getPublicUrl(path);

        newUrls.push(publicUrl);
      }

      if (newUrls.length > 0) {
        const updated = [...images, ...newUrls];
        onChange(updated);
        if (!mainImage && newUrls[0]) {
          onMainImageChange(newUrls[0]);
        }
      }

      setUploading(false);
    },
    [images, mainImage, onChange, onMainImageChange, bucket, folder, supabase]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        uploadFiles(e.dataTransfer.files);
      }
    },
    [uploadFiles]
  );

  const removeImage = async (index: number) => {
    const url = images[index];
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);

    if (url === mainImage) {
      onMainImageChange(updated[0] || "");
    }

    // Try to delete from storage
    try {
      const path = url.split(`/storage/v1/object/public/${bucket}/`)[1];
      if (path) {
        await supabase.storage.from(bucket).remove([path]);
      }
    } catch {}
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;

    const updated = [...images];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);
    onChange(updated);
    setDragIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  return (
    <div>
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors mb-4 ${
          dragOver
            ? "border-[#8B7340] bg-[#8B7340]/5"
            : "border-[rgba(139,115,64,0.3)] hover:border-[#8B7340]"
        }`}
      >
        <Upload className="mx-auto mb-3 text-[#8A8A8A]" size={32} />
        {uploading ? (
          <p className="text-[#8B7340] font-semibold">Nahrávám...</p>
        ) : (
          <>
            <p className="text-[#3D3D3D] font-medium">
              Přetáhněte fotky sem nebo klikněte pro výběr
            </p>
            <p className="text-[#8A8A8A] text-sm mt-1">
              JPG, PNG, WebP. Max 10 MB na soubor.
            </p>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) uploadFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {/* Image grid */}
      {images.length > 0 && (
        <>
          <p className="text-xs text-[#8A8A8A] mb-3">
            Klikněte na hvězdu pro nastavení hlavní fotky. Přetáhněte pro změnu pořadí.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((url, index) => (
              <div
                key={url}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`relative group aspect-square bg-[#F7F5F0] overflow-hidden border-2 transition-colors ${
                  url === mainImage
                    ? "border-[#8B7340]"
                    : "border-transparent hover:border-[rgba(139,115,64,0.3)]"
                } ${dragIndex === index ? "opacity-50" : ""}`}
              >
                <img
                  src={url}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Overlay controls */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => onMainImageChange(url)}
                    className={`p-2 rounded-full transition-colors ${
                      url === mainImage
                        ? "bg-[#8B7340] text-white"
                        : "bg-white/90 text-[#8A8A8A] hover:text-[#8B7340]"
                    }`}
                    title="Nastavit jako hlavní"
                  >
                    <Star size={16} fill={url === mainImage ? "currentColor" : "none"} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-2 rounded-full bg-white/90 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                    title="Smazat"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Drag handle */}
                <div className="absolute top-1 left-1 text-white/60 cursor-grab opacity-0 group-hover:opacity-100">
                  <GripVertical size={16} />
                </div>

                {/* Main badge */}
                {url === mainImage && (
                  <div className="absolute bottom-0 left-0 right-0 bg-[#8B7340] text-white text-xs text-center py-1 font-semibold">
                    Hlavní foto
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
