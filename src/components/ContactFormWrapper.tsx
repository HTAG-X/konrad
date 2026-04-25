"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ContactForm } from "./ContactForm";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const projekt = searchParams.get("projekt") || undefined;

  return <ContactForm projekt={projekt} />;
}

export function ContactFormWrapper() {
  return (
    <Suspense fallback={<ContactForm />}>
      <ContactFormInner />
    </Suspense>
  );
}
