import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Languages, 
  Volume2, 
  Copy, 
  Check, 
  Sparkles, 
  RefreshCw, 
  BookOpen, 
  History, 
  Trash2, 
  Share2, 
  ArrowRightLeft,
  Search,
  MessageCircle
} from "lucide-react";

interface AITranslatorProps {
  speakWord: (text: string) => void;
}

interface TranslationHistoryItem {
  id: string;
  sourceText: string;
  translatedText: string;
  direction: "auto" | "en-uz" | "uz-en";
  timestamp: string;
}

export const AITranslator: React.FC<AITranslatorProps> = ({ speakWord }) => {
  const [sourceText, setSourceText] = useState<string>("");
  const [translatedResult, setTranslatedResult] = useState<string>("");
  const [direction, setDirection] = useState<"auto" | "en-uz" | "uz-en">("auto");
  const [translating, setTranslating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [historyList, setHistoryList] = useState<TranslationHistoryItem[]>([]);

  // Suggested shortcuts based on Oxford textbook lessons
  const SUGGESTED_SHORTCUTS = [
    { text: "Mammals have warm blood and complex brains.", label: "Hayvonlar (U1)" },
    { text: "Water turns into solid ice when it freezes.", label: "Modda holati (U3)" },
    { text: "Long ago, people did not have modern computers.", label: "Tarix (U5)" },
    { text: "If we water the seeds, they will grow into healthy plants.", label: "Ekolgiya (U16)" },
    { text: "Musiqa chalish inson dillarini quvnoq qiladi.", label: "O'zbekchadan (Music)" }
  ];

  // Load history from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("oxford_translator_history");
      if (stored) {
        setHistoryList(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not read translation history", e);
    }
  }, []);

  // Save history helper
  const saveHistory = (newItem: TranslationHistoryItem) => {
    const updated = [newItem, ...historyList.filter(item => item.sourceText.trim().toLowerCase() !== newItem.sourceText.trim().toLowerCase())].slice(0, 10);
    setHistoryList(updated);
    try {
      localStorage.setItem("oxford_translator_history", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearHistory = () => {
    setHistoryList([]);
    try {
      localStorage.removeItem("oxford_translator_history");
    } catch (e) {
      console.error(e);
    }
  };

  const handleTranslate = async (forcedText?: string) => {
    const textToTranslate = (forcedText !== undefined ? forcedText : sourceText).trim();
    if (!textToTranslate) {
      setErrorMsg("Iltimos, avval tarjima qilmoqchi bo'lgan so'z yoki gapni yozing!");
      return;
    }

    setErrorMsg("");
    setTranslating(true);
    setTranslatedResult("");

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToTranslate,
          direction: direction
        })
      });

      if (!response.ok) {
        throw new Error("Tarjima serverida xatolik yuz berdi!");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const translationOutput = data.result;
      setTranslatedResult(translationOutput);

      // Save to history list
      const newItem: TranslationHistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        sourceText: textToTranslate,
        translatedText: translationOutput,
        direction: direction,
        timestamp: new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })
      };
      saveHistory(newItem);

    } catch (err: any) {
      console.error("AI translation error:", err);
      setErrorMsg(err.message || "Ulanishda xatolik! API kalit o'rnatilganligini tekshiring.");
    } finally {
      setTranslating(false);
    }
  };

  const handleCopyToClipboard = (textToCopy: string) => {
    if (!textToCopy) return;
    // Prepare text (remove markdown markers if desired, or keep as is)
    const clean = textToCopy.replace(/[*#`>]/g, "").trim();
    navigator.clipboard.writeText(clean).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleSpeakText = (text: string) => {
    if (!text) return;
    // Strip markdown annotations before TTS pronunciation
    const clean = text
      .split("\n")
      .filter(line => !line.trim().startsWith("#") && !line.trim().toLowerCase().includes("tahlili")) // skip title/analysis headers
      .join(" ")
      .replace(/[*#`>]/g, "")
      .trim();
    speakWord(clean);
  };

  const swapLanguages = () => {
    if (direction === "en-uz") {
      setDirection("uz-en");
    } else if (direction === "uz-en") {
      setDirection("en-uz");
    } else {
      setDirection("en-uz"); // Fallback from auto
    }
    // Also swap fields if possible
    if (sourceText && translatedResult) {
      // Extract translation raw text from blockquote or first lines
      const lines = translatedResult.split("\n");
      const translationLine = lines.find(l => l.includes("**Tarjima**") || l.startsWith(">") || l.trim().startsWith("*"));
      const cleanedTranslation = translationLine 
        ? translationLine.replace(/[\*#>_]/g, "").replace("Tarjima (Translation):", "").replace("Tarjima:", "").trim() 
        : lines[0]?.replace(/[\*#>_]/g, "").trim() || "";

      setSourceText(cleanedTranslation);
      setTranslatedResult("");
    }
  };

  // Helper to parse basic markdown lists, headlines, and blockquotes cleanly for visual aesthetics
  const renderFormattedResult = (mdText: string) => {
    if (!mdText) return null;
    const lines = mdText.split("\n");

    return (
      <div className="space-y-3 text-slate-800 dark:text-slate-100 text-sm leading-relaxed" id="renderer-markup-layout">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-2" />;
          }

          // Headers
          if (trimmed.startsWith("###")) {
            return (
              <h4 key={idx} className="text-sm font-bold text-oxford-crimson dark:text-red-400 mt-4 mb-2 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-1">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                {trimmed.replace("###", "").trim()}
              </h4>
            );
          }
          if (trimmed.startsWith("##")) {
            return (
              <h3 key={idx} className="text-base font-extrabold text-[#002147] dark:text-sky-400 mt-4 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4.5 h-4.5 text-blue-500" />
                {trimmed.replace("##", "").trim()}
              </h3>
            );
          }
          if (trimmed.startsWith("#")) {
            return (
              <h2 key={idx} className="text-lg font-black text-[#002147] dark:text-teal-400 mt-3 mb-2 flex items-center gap-2">
                <Languages className="w-5 h-5 text-indigo-500" />
                {trimmed.replace("#", "").trim()}
              </h2>
            );
          }

          // Blockquote translation result banner
          if (trimmed.startsWith(">") || trimmed.includes("**Tarjima")) {
            const displayClean = trimmed.replace(/^>\s*/, "").replace(/\*\*/g, "").trim();
            return (
              <div key={idx} className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border-l-4 border-emerald-500 rounded-r-xl my-3 shadow-sm">
                <p className="text-xs uppercase tracking-widest font-black text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1">
                  ❇️ TO'G'RI TARJIMA:
                </p>
                <p className="text-base font-extrabold text-[#002147] dark:text-emerald-100 italic">
                  {displayClean.replace("Tarjima (Translation):", "").replace("Tarjima:", "").trim()}
                </p>
              </div>
            );
          }

          // Bullet points
          if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
            // Highlight terms inside stars
            const content = trimmed.substring(1).trim();
            return (
              <ul key={idx} className="list-disc pl-5 space-y-1">
                <li className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {renderTextWithBold(content)}
                </li>
              </ul>
            );
          }

          // Number lists like 1. 2.
          const isNum = /^\d+\.\s/.test(trimmed);
          if (isNum) {
            const listContent = trimmed.replace(/^\d+\.\s/, "").trim();
            // Checking if first part is Tarjima to style it exceptionally
            if (trimmed.toLowerCase().includes("tarjima")) {
              return (
                <div key={idx} className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border-l-4 border-emerald-500 rounded-r-xl my-3 shadow-sm">
                  <p className="text-xs uppercase tracking-widest font-black text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1">
                    ❇️ O'XFORD AI TARJIMA:
                  </p>
                  <p className="text-base font-extrabold text-[#002147] dark:text-emerald-100 leading-normal">
                    {renderTextWithBold(listContent)}
                  </p>
                </div>
              );
            }
            return (
              <div key={idx} className="flex gap-2.5 my-1 bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-xl border border-slate-200/40 dark:border-slate-800">
                <span className="inline-flex items-center justify-center font-black text-xs text-oxford-crimson dark:text-red-400 bg-red-100 dark:bg-red-950/60 rounded-lg w-6 h-6 shrink-0 select-none">
                  {trimmed.match(/^\d+/)?.[0]}
                </span>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 self-center leading-relaxed">
                  {renderTextWithBold(listContent)}
                </div>
              </div>
            );
          }

          // Standard paragraph lines
          return (
            <p key={idx} className="text-xs font-semibold text-slate-700 dark:text-slate-300 antialiased">
              {renderTextWithBold(trimmed)}
            </p>
          );
        })}
      </div>
    );
  };

  // Inline styling for bold terms (**text**)
  const renderTextWithBold = (txt: string) => {
    const parts = txt.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="text-oxford-blue dark:text-amber-400 font-extrabold">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-5xl mx-auto space-y-6"
      id="ai-translator-root-layout"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        /* Force bright light-mode theme inside AITranslator regardless of dark mode */
        #ai-translator-root-layout {
          background-color: transparent !important;
        }
        
        #ai-translator-root-layout .bg-white,
        .dark #ai-translator-root-layout .bg-white {
          background-color: #ffffff !important;
          color: #0f172a !important;
          border-color: #e2e8f0 !important;
        }

        #ai-translator-root-layout .bg-slate-50,
        .dark #ai-translator-root-layout .bg-slate-50 {
          background-color: #f8fafc !important;
          color: #0f172a !important;
        }

        #ai-translator-root-layout .bg-stone-50\\/40,
        .dark #ai-translator-root-layout .bg-stone-50\\/40 {
          background-color: #fafbfc !important;
          color: #0f172a !important;
        }

        #ai-translator-root-layout .bg-slate-100,
        .dark #ai-translator-root-layout .bg-slate-100 {
          background-color: #f1f5f9 !important;
          color: #0f172a !important;
        }

        #ai-translator-root-layout .bg-slate-200,
        .dark #ai-translator-root-layout .bg-slate-200 {
          background-color: #e2e8f0 !important;
          color: #0f172a !important;
        }

        #ai-translator-root-layout .bg-slate-850,
        .dark #ai-translator-root-layout .bg-slate-850 {
          background-color: #f8fafc !important;
          color: #0f172a !important;
        }

        #ai-translator-root-layout .border-slate-800,
        .dark #ai-translator-root-layout .border-slate-800 {
          border-color: #e2e8f0 !important;
        }

        #ai-translator-root-layout .divide-slate-800 > *,
        .dark #ai-translator-root-layout .divide-slate-800 > * {
          border-color: #e2e8f0 !important;
        }

        #ai-translator-root-layout .text-slate-800,
        .dark #ai-translator-root-layout .text-slate-800,
        #ai-translator-root-layout .text-slate-700,
        .dark #ai-translator-root-layout .text-slate-700,
        #ai-translator-root-layout .text-slate-600,
        .dark #ai-translator-root-layout .text-slate-600,
        #ai-translator-root-layout p,
        .dark #ai-translator-root-layout p,
        #ai-translator-root-layout li,
        .dark #ai-translator-root-layout li,
        #ai-translator-root-layout h3,
        .dark #ai-translator-root-layout h3,
        #ai-translator-root-layout h4,
        .dark #ai-translator-root-layout h4,
        #ai-translator-root-layout span,
        .dark #ai-translator-root-layout span,
        #ai-translator-root-layout textarea,
        .dark #ai-translator-root-layout textarea,
        #ai-translator-root-layout input,
        .dark #ai-translator-root-layout input,
        #ai-translator-root-layout strong,
        .dark #ai-translator-root-layout strong {
          color: #000000 !important;
        }

        #ai-translator-root-layout .text-slate-400,
        .dark #ai-translator-root-layout .text-slate-400,
        #ai-translator-root-layout .text-slate-500,
        .dark #ai-translator-root-layout .text-slate-500 {
          color: #000000 !important;
        }

        #ai-translator-root-layout .text-oxford-crimson,
        .dark #ai-translator-root-layout .text-oxford-crimson {
          color: #B8001F !important;
        }

        #ai-translator-root-layout .bg-gradient-to-r p,
        .dark #ai-translator-root-layout .bg-gradient-to-r p,
        #ai-translator-root-layout .bg-gradient-to-r h2,
        .dark #ai-translator-root-layout .bg-gradient-to-r h2,
        #ai-translator-root-layout .bg-gradient-to-r span,
        .dark #ai-translator-root-layout .bg-gradient-to-r span {
          color: #ffffff !important;
        }

        /* Keep CTA button texts white */
        #ai-translator-root-layout button.bg-oxford-crimson,
        .dark #ai-translator-root-layout button.bg-oxford-crimson,
        #ai-translator-root-layout button.bg-\\[\\#002147\\],
        .dark #ai-translator-root-layout button.bg-\\[\\#002147\\] {
          color: #ffffff !important;
        }

        #ai-translator-root-layout .font-extrabold {
          color: #002147 !important;
        }

        #ai-translator-root-layout .hover\\:bg-slate-50:hover,
        .dark #ai-translator-root-layout .hover\\:bg-slate-50:hover {
          background-color: #f1f5f9 !important;
          color: #0f172a !important;
        }

         #ai-translator-root-layout .from-emerald-50,
         .dark #ai-translator-root-layout .from-emerald-50 {
           background-color: #ecfdf5 !important;
           background-image: none !important;
         }

         #ai-translator-root-layout .text-emerald-600,
         .dark #ai-translator-root-layout .text-emerald-600 {
           color: #059669 !important;
         }

         #ai-translator-root-layout .bg-red-100,
         .dark #ai-translator-root-layout .bg-red-100 {
           background-color: #fee2e2 !important;
           color: #991b1b !important;
         }

         #ai-translator-root-layout .border-slate-150\\/60,
         .dark #ai-translator-root-layout .border-slate-150\\/60,
         #ai-translator-root-layout .border-slate-200\\/80,
         .dark #ai-translator-root-layout .border-slate-200\\/80 {
           border-color: #e2e8f0 !important;
         }
      ` }} />
      {/* Upper header promo item */}
      <div className="bg-gradient-to-r from-[#002147] to-[#122e54] dark:from-[#0b1329] dark:to-[#172554] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden border border-white/10">
        <div className="absolute right-0 top-0 opacity-15 transform translate-x-5 -translate-y-5 select-none text-[150px] font-black">
          🌐
        </div>
        <div className="relative z-10 max-w-xl space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-oxford-crimson text-white text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-full shadow-md animate-pulse">
            <Sparkles className="w-3.5 h-3.5" /> Dynamic AI Portal
          </div>
          <h2 className="text-2xl font-black tracking-tight font-sans">
            Oxford Discover AI Tarjimon
          </h2>
          <p className="text-xs text-slate-200 leading-normal font-semibold">
            Inglizcha va O'zbekcha gaplarni super sun'iy intellekt yordamida o'zbekcha sharhlari, sinonimlari va gap ichidagi grammatik qoidalari bilan birga tarjima qiling!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left main section - translation workspace */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-md overflow-hidden">
            
            {/* Header controls inside the translator */}
            <div className="bg-slate-50 dark:bg-slate-900 px-5 py-4 flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 gap-3">
              <div className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-oxford-crimson" />
                <span className="text-xs font-black text-slate-800 dark:text-slate-150 uppercase tracking-widest">
                  Yo'nalishni tanlang:
                </span>
              </div>
              
              <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-300/40 dark:border-slate-800 shrink-0">
                <button
                  onClick={() => setDirection("auto")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    direction === "auto" 
                      ? "bg-oxford-crimson text-white shadow-sm" 
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                  title="Avtomatik ravishda tilni aniqlab tarjima qiladi"
                >
                  Avto (Detect)
                </button>
                <button
                  onClick={() => setDirection("en-uz")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    direction === "en-uz" 
                      ? "bg-oxford-crimson text-white shadow-sm" 
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  EN ➡️ UZ
                </button>
                
                <button
                  onClick={swapLanguages}
                  className="p-1 px-1.5 text-slate-500 hover:text-oxford-crimson dark:hover:text-red-400 rounded-lg hover:bg-slate-200/50 dark:hover:bg-white/5 transition-all text-sm font-semibold cursor-pointer"
                  title="Tillar o'rnini almashtirish"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setDirection("uz-en")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    direction === "uz-en" 
                      ? "bg-oxford-crimson text-white shadow-sm" 
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  UZ ➡️ EN
                </button>
              </div>
            </div>

            {/* Editing grid - input text / translated view */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 dark:divide-slate-800">
              
              {/* Source column */}
              <div className="p-5 flex flex-col space-y-3 min-h-[220px]">
                <div className="flex justify-between items-center select-none text-[10px] font-black tracking-widest uppercase text-slate-600 dark:text-slate-400">
                  <span>MATNNI KIRITING</span>
                  <span>{sourceText.length}/1000</span>
                </div>
                
                <textarea
                  className="flex-1 w-full bg-transparent text-xs font-bold text-slate-800 dark:text-slate-150 outline-none resize-none leading-relaxed placeholder-slate-400 border-0 p-0 focus:ring-0"
                  rows={7}
                  placeholder="Kiritish maydoni. Inglizcha yoki o'zbekcha istalgan gapni yozing va pastdagi ko'k tugmani bosing..."
                  maxLength={1000}
                  value={sourceText}
                  onChange={(e) => {
                    setSourceText(e.target.value);
                    if (e.target.value === "") {
                      setTranslatedResult("");
                    }
                  }}
                  id="translation-input-box"
                />

                <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  {sourceText.trim() && (
                    <button
                      onClick={() => handleSpeakText(sourceText)}
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-lg transition-colors cursor-pointer"
                      title="Talaffuzni eshitish"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                  
                  <div className="ml-auto">
                    <button
                      onClick={() => handleTranslate()}
                      disabled={translating || !sourceText.trim()}
                      className="px-5 py-2 hover:opacity-90 bg-[#002147] dark:bg-indigo-650 hover:bg-[#001733] text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                    >
                      {translating ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Ishlanmoqda...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          AI Tarjima
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Translation output column */}
              <div className="p-5 bg-stone-50/40 dark:bg-slate-900/40 flex flex-col min-h-[220px]">
                <div className="flex justify-between items-center select-none text-[10px] font-black tracking-widest uppercase text-slate-600 dark:text-slate-400 mb-3">
                  <span>AI SHARH VA TARJIMA</span>
                  {translatedResult && (
                    <span className="text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded text-[9px]">
                      Tayyor!
                    </span>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto max-h-[300px] scrollbar-thin">
                  {translating ? (
                    <div className="h-full flex flex-col items-center justify-center p-8 space-y-3">
                      <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-oxford-crimson animate-spin" />
                      <p className="text-[11px] font-black text-slate-500 animate-pulse">
                        Super AI dars qoidalariga rioya qilib tayyorlamoqda...
                      </p>
                    </div>
                  ) : errorMsg ? (
                    <div className="p-4 bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900 rounded-xl">
                      <p className="text-xs font-black text-red-700 dark:text-red-300 leading-normal">
                        ⚠️ Xatolik yuz berdi: {errorMsg}
                      </p>
                    </div>
                  ) : translatedResult ? (
                    renderFormattedResult(translatedResult)
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-8 space-y-2 text-center text-slate-400 select-none">
                      <Languages className="w-9 h-9 stroke-1 text-slate-300 dark:text-slate-700 animate-bounce" />
                      <p className="text-xs font-semibold">
                        Kutilmoqda... Gaplaringiz mukammal grammatika, talaffuz hamda o'zbekcha tarjimalar bilan shu yerda tahlil qilinadi.
                      </p>
                    </div>
                  )}
                </div>

                {translatedResult && !translating && (
                  <div className="flex justify-end items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 ml-auto w-full">
                    <button
                      onClick={() => handleSpeakText(translatedResult)}
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-lg transition-colors cursor-pointer"
                      title="Talaffuzni tinglash"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleCopyToClipboard(translatedResult)}
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-lg transition-colors cursor-pointer flex items-center"
                      title="Natijani buferga nusxalash"
                    >
                      {copySuccess ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                )}

              </div>
            </div>

          </div>

          {/* Quick study shortcuts */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-black text-[#002147] dark:text-sky-400 uppercase tracking-widest pl-1">
              💡 Oxford Discover Darslari Mavzularidan namunalar:
            </h4>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_SHORTCUTS.map((sc, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSourceText(sc.text);
                    handleTranslate(sc.text);
                  }}
                  className="px-3.5 py-2 text-[10px] filter hover:brightness-105 active:scale-95 bg-slate-100 dark:bg-slate-850 border border-slate-250/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all shadow-sm hover:border-oxford-crimson cursor-pointer"
                >
                  <span className="text-oxford-crimson dark:text-red-400 font-black mr-1">[{sc.label}]</span>
                  {sc.text}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Recent history & dynamic stats */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* History log block */}
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-md p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-black text-[#002147] dark:text-slate-200 uppercase tracking-widest flex items-center gap-2">
                <History className="w-4 h-4 text-oxford-crimson" />
                Oxirgi qidiruvlar ({historyList.length})
              </span>
              {historyList.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="p-1 px-2 hover:bg-red-50 hover:text-red-650 dark:hover:bg-red-950/20 text-slate-400 dark:text-slate-500 rounded-lg text-[10px] font-black transition-colors flex items-center gap-1 cursor-pointer"
                  title="Tarixni tozalash"
                >
                  <Trash2 className="w-3 h-3" />
                  Tozalash
                </button>
              )}
            </div>

            <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
              {historyList.length === 0 ? (
                <div className="text-center py-8 text-slate-400 dark:text-slate-600 space-y-1">
                  <p className="text-xs font-black">Tarix bo'sh!</p>
                  <p className="text-[10px] font-semibold leading-normal">
                    Hech qanday so'zni qidirmadingiz. Qidirgan so'zlaringiz shu yerda ro'yxatda saqlanadi.
                  </p>
                </div>
              ) : (
                historyList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSourceText(item.sourceText);
                      setTranslatedResult(item.translatedText);
                    }}
                    className="p-3 hover:bg-slate-50 dark:hover:bg-slate-900/60 border border-slate-150/60 dark:border-slate-800 rounded-xl transition-all cursor-pointer space-y-1.5 hover:border-slate-350 dark:hover:border-slate-700 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded uppercase">
                        {item.direction === "en-uz" ? "EN ➡️ UZ" : item.direction === "uz-en" ? "UZ ➡️ EN" : "Avto"}
                      </span>
                      <span className="text-[9px] text-slate-400 font-bold">{item.timestamp}</span>
                    </div>
                    <p className="text-xs font-black text-slate-800 dark:text-slate-150 truncate">
                      {item.sourceText}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Educational tips side promo card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-indigo-950/20 dark:to-slate-950/10 border border-amber-200/50 dark:border-indigo-900/20 rounded-2xl p-5 space-y-3">
            <h5 className="text-xs font-black text-amber-800 dark:text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Oxford Discover usuli:
            </h5>
            <ol className="list-decimal pl-4 space-y-1.5 text-[11px] font-semibold leading-relaxed text-amber-900/90 dark:text-slate-300">
              <li>Mavzuning matnini o'qiyotganingizda, murakkab terminlarni darhol shu yerga yozib tahlil qiling.</li>
              <li>Aytilishini (Pronunciation) to'g'ri o'rganish uchun audio belgisini bosing.</li>
              <li>AI tomonidan taqdim etilgan sinonimlarni hamda dars tushuntirishlarini o'rganing.</li>
            </ol>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
