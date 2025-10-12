import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const location = useLocation();
  const [, setTick] = useState(0);
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    const h = () => setTick((s) => s + 1);
    window.addEventListener("langchange", h);
    return () => window.removeEventListener("langchange", h);
  }, [location.pathname]);

  type Win = Window & { __i18n?: { t: (k: string) => string } };
  const w = window as Win;
  const t = (k: string) => w.__i18n?.t(k) ?? k;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t("404_title")}</h1>
        <p className="mb-4 text-xl text-gray-600">{t("404_message")}</p>
        <a href="/" className="text-blue-500 underline hover:text-blue-700">
          {t("return_home")}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
