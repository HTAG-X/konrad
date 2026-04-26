import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PropertyForm } from "@/app/admin/components/PropertyForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjektPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: projekt, error } = await supabase
    .from("projekty")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !projekt) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-8">
        Upravit: {projekt.nazev}
      </h1>
      <PropertyForm initialData={projekt} />
    </div>
  );
}
