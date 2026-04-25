"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Send, CheckCircle } from "lucide-react";

interface ContactFormData {
  jmeno: string;
  prijmeni: string;
  email: string;
  telefon: string;
  adresa: string;
  predmet: string;
  zprava: string;
  recaptcha: boolean;
  website: string;
  captchaAnswer: string;
}

interface ContactFormProps {
  projekt?: string;
}

export function ContactForm({ projekt }: ContactFormProps = {}) {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<ContactFormData>({
    defaultValues: {
      jmeno: "",
      prijmeni: "",
      email: "",
      telefon: "",
      adresa: "",
      predmet: projekt ? "Mám zájem o dům z nabídky" : "Mám zájem o dům z nabídky",
      zprava: projekt ? `Mám zájem o: ${projekt}` : "",
      recaptcha: false,
      website: "",
      captchaAnswer: "",
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [rateLimitError, setRateLimitError] = useState(false);
  const [captcha, setCaptcha] = useState<{ num1: number; num2: number } | null>(null);

  useEffect(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ num1, num2 });
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    if (data.website && data.website.trim()) {
      console.warn("Honeypot triggered - bot detected");
      return;
    }

    if (submissionCount >= 3) {
      setRateLimitError(true);
      return;
    }

    if (captcha) {
      const expectedAnswer = captcha.num1 + captcha.num2;
      const userAnswer = parseInt(data.captchaAnswer, 10);
      if (isNaN(userAnswer) || userAnswer !== expectedAnswer) {
        return;
      }
    }

    console.log("Form submitted:", data);

    const newCount = submissionCount + 1;
    setSubmissionCount(newCount);

    setSubmitted(true);
    reset();

    if (captcha) {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      setCaptcha({ num1, num2 });
    }

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 border bg-white text-[#3D3D3D] focus:outline-none focus:border-[#8B7340] transition-colors ${
      hasError ? "border-red-500" : "border-[rgba(139,115,64,0.3)]"
    }`;

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-[#F7F5F0] border-t-2 border-[#8B7340]">
        <CheckCircle className="w-16 h-16 text-[#6BA73D] mb-4" />
        <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-2">Děkujeme!</h3>
        <p className="text-[#3D3D3D] text-center">
          Vaše poptávka byla přijata. Odpovíme vám do 24 hodin.
        </p>
      </div>
    );
  }

  return (
    <>
      {rateLimitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200">
          <p className="text-red-700 text-sm">
            Příliš mnoho pokusů. Zkuste to prosím později.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Jméno + Příjmení */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="jmeno" className="block text-[0.8rem] font-semibold text-[#3D3D3D] mb-2 tracking-[0.05em] uppercase">
              Jméno
            </label>
            <input
              {...register("jmeno", { required: "Jméno je povinné" })}
              type="text"
              id="jmeno"
              className={inputClass(!!errors.jmeno)}
              placeholder="Vaše jméno"
            />
            {errors.jmeno && (
              <p className="text-red-500 text-sm mt-1">{errors.jmeno.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="prijmeni" className="block text-[0.8rem] font-semibold text-[#3D3D3D] mb-2 tracking-[0.05em] uppercase">
              Příjmení
            </label>
            <input
              {...register("prijmeni", { required: "Příjmení je povinné" })}
              type="text"
              id="prijmeni"
              className={inputClass(!!errors.prijmeni)}
              placeholder="Vaše příjmení"
            />
            {errors.prijmeni && (
              <p className="text-red-500 text-sm mt-1">{errors.prijmeni.message}</p>
            )}
          </div>
        </div>

        {/* Email + Telefon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className="block text-[0.8rem] font-semibold text-[#3D3D3D] mb-2 tracking-[0.05em] uppercase">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email je povinný",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Zadejte platný email",
                },
              })}
              type="email"
              id="email"
              className={inputClass(!!errors.email)}
              placeholder="Váš email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="telefon" className="block text-[0.8rem] font-semibold text-[#3D3D3D] mb-2 tracking-[0.05em] uppercase">
              Telefon
            </label>
            <input
              {...register("telefon", { required: "Telefon je povinný" })}
              type="tel"
              id="telefon"
              className={inputClass(!!errors.telefon)}
              placeholder="Váš telefon"
            />
            {errors.telefon && (
              <p className="text-red-500 text-sm mt-1">{errors.telefon.message}</p>
            )}
          </div>
        </div>

        {/* Adresa */}
        <div>
          <label htmlFor="adresa" className="block text-[0.8rem] font-semibold text-[#3D3D3D] mb-2 tracking-[0.05em] uppercase">
            Adresa
          </label>
          <input
            {...register("adresa")}
            type="text"
            id="adresa"
            className={inputClass(false)}
            placeholder="Vaše adresa (nepovinné)"
          />
        </div>

        {/* Předmět */}
        <div>
          <label htmlFor="predmet" className="block text-[0.8rem] font-semibold text-[#3D3D3D] mb-2 tracking-[0.05em] uppercase">
            Předmět
          </label>
          <select
            {...register("predmet", { required: "Vyberte předmět" })}
            id="predmet"
            className={inputClass(!!errors.predmet)}
          >
            <option value="Mám zájem o dům z nabídky">Mám zájem o dům z nabídky</option>
            <option value="Dřevostavba na klíč">Dřevostavba na klíč</option>
            <option value="Chci konzultaci">Chci konzultaci</option>
            <option value="Jiné">Jiné</option>
          </select>
          {errors.predmet && (
            <p className="text-red-500 text-sm mt-1">{errors.predmet.message}</p>
          )}
        </div>

        {/* Zpráva */}
        <div>
          <label htmlFor="zprava" className="block text-[0.8rem] font-semibold text-[#3D3D3D] mb-2 tracking-[0.05em] uppercase">
            Zpráva
          </label>
          <textarea
            {...register("zprava", { required: "Zpráva je povinná" })}
            id="zprava"
            rows={5}
            className={`${inputClass(!!errors.zprava)} resize-none`}
            placeholder="Vaše zpráva"
          />
          {errors.zprava && (
            <p className="text-red-500 text-sm mt-1">{errors.zprava.message}</p>
          )}
        </div>

        {/* Honeypot */}
        <div style={{ position: "absolute", left: "-9999px" }}>
          <label htmlFor="website">Website</label>
          <input
            {...register("website")}
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
        </div>

        {/* Math CAPTCHA */}
        {captcha && (
          <div>
            <label htmlFor="captchaAnswer" className="block text-[0.8rem] font-semibold text-[#3D3D3D] mb-2 tracking-[0.05em] uppercase">
              Bezpečnostní ověření: Kolik je {captcha.num1} + {captcha.num2}?
            </label>
            <input
              {...register("captchaAnswer", {
                required: "Odpověď je povinná",
                validate: (value) => {
                  const answer = parseInt(value, 10);
                  const expected = captcha.num1 + captcha.num2;
                  return answer === expected || "Nesprávná odpověď. Zkuste to prosím znovu.";
                },
              })}
              type="text"
              id="captchaAnswer"
              inputMode="numeric"
              className={inputClass(!!errors.captchaAnswer)}
              placeholder="Vaše odpověď"
            />
            {errors.captchaAnswer && (
              <p className="text-red-500 text-sm mt-1">{errors.captchaAnswer.message}</p>
            )}
          </div>
        )}

        {/* GDPR souhlas */}
        <div className="flex items-start gap-3 p-4 border border-[rgba(139,115,64,0.2)] bg-[#F7F5F0]">
          <input
            {...register("recaptcha", { required: "Musíte potvrdit souhlas" })}
            type="checkbox"
            id="recaptcha"
            className="w-5 h-5 mt-0.5 accent-[#8B7340]"
          />
          <div>
            <label htmlFor="recaptcha" className="text-sm font-medium text-[#3D3D3D]">
              Souhlas se zpracováním údajů
            </label>
            <p className="text-xs text-[#8A8A8A] mt-1">
              Souhlasím se zpracováním osobních údajů dle zásad ochrany osobních údajů.
            </p>
          </div>
        </div>
        {errors.recaptcha && (
          <p className="text-red-500 text-sm mt-1">{errors.recaptcha.message}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#8B7340] text-white py-4 font-semibold text-[0.85rem] tracking-[0.1em] uppercase transition-all duration-400 hover:bg-[#B89B5E] flex items-center justify-center gap-3"
        >
          <Send size={18} />
          Odeslat poptávku
        </button>

        <p className="text-xs text-[#8A8A8A] text-center">
          Odpovíme vám do 24 hodin
        </p>
      </form>
    </>
  );
}
