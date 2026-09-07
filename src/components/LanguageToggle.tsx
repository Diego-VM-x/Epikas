import { useI18n } from "../i18n";

export default function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center text-[11px] font-semibold tracking-wider">
      <button
        onClick={() => setLocale("es")}
        className={`px-1.5 py-0.5 transition ${
          locale === "es"
            ? "text-oro-400"
            : "text-marfil-100/50 hover:text-marfil-100/80"
        }`}
      >
        ES
      </button>
      <span className="text-marfil-100/30">|</span>
      <button
        onClick={() => setLocale("en")}
        className={`px-1.5 py-0.5 transition ${
          locale === "en"
            ? "text-oro-400"
            : "text-marfil-100/50 hover:text-marfil-100/80"
        }`}
      >
        EN
      </button>
    </div>
  );
}
