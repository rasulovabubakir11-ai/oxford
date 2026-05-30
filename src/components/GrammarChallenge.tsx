import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle, AlertTriangle, Play, HelpCircle, RefreshCw, Star, Trophy, ArrowRight, Volume2 } from "lucide-react";

interface GrammarChallengeProps {
  onAwardPoints: (pts: number) => void;
  speakWord: (txt: string) => void;
}

interface SentenceTask {
  id: number;
  prefix: string;
  suffix: string;
  correctAdverb: "always" | "sometimes" | "never";
  uzTranslation: string;
  reason: string;
}

const TASKS: SentenceTask[] = [
  {
    id: 1,
    prefix: "Leo is ",
    suffix: " lazy; he is super active and loves climbing trees!",
    correctAdverb: "never",
    uzTranslation: "Leo hech qachon dangasa emas; u juda faol va daraxtlarga ko'tarilishni yaxshi ko'radi!",
    reason: "Chunki 'never' (hech qachon) kabi payt ravishlari 'to be' (am/is/are) fe'lidan KEYIN keladi."
  },
  {
    id: 2,
    prefix: "Monkeys ",
    suffix: " swing from tree to tree in the wild forest.",
    correctAdverb: "always",
    uzTranslation: "Maymunlar yovvoyi o'rmonda doimo daraxtdan daraxtga uchishadi (sakrashadi).",
    reason: "Oddiy fe'llar (swing, climb, run) kelganda, payt ravishi fe'ldan OLDIN keladi."
  },
  {
    id: 3,
    prefix: "Bears ",
    suffix: " sleep during the day, but they often hunt for salmon.",
    correctAdverb: "sometimes",
    uzTranslation: "Ayiqlar ba'zida kunduzi uxlashadi, lekin ular tez-tez losos balig'ini ovlashadi.",
    reason: "Ba'zida ('sometimes') ma'nosini to'g'ri ifodalash uchun asosiy fe'ldan oldin joylashtiriladi."
  }
];

export function GrammarChallenge({ onAwardPoints, speakWord }: GrammarChallengeProps) {
  // Store user's placements for tasks 1, 2, and 3
  // keys are task index (0, 1, 2), values is selected Adverb or null
  const [placements, setPlacements] = useState<Record<number, "always" | "sometimes" | "never" | null>>({
    0: null,
    1: null,
    2: null
  });

  const [activeSelectedWord, setActiveSelectedWord] = useState<"always" | "sometimes" | "never" | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showsHelp, setShowsHelp] = useState<boolean>(false);
  const [playCount, setPlayCount] = useState<number>(1);

  const adverbs: ("always" | "sometimes" | "never")[] = ["always", "sometimes", "never"];

  // HTML5 Drag operations
  const handleDragStart = (e: React.DragEvent, word: "always" | "sometimes" | "never") => {
    e.dataTransfer.setData("text/plain", word);
    setActiveSelectedWord(word);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // crucial to allow dropping!
  };

  const handleDrop = (e: React.DragEvent, taskIndex: number) => {
    e.preventDefault();
    const word = e.dataTransfer.getData("text/plain") as "always" | "sometimes" | "never";
    if (adverbs.includes(word)) {
      setPlacements(prev => ({
        ...prev,
        [taskIndex]: word
      }));
      speakWord(word);
    }
    setActiveSelectedWord(null);
  };

  // Touch & Click-to-place fallback
  const handleWordSelect = (word: "always" | "sometimes" | "never") => {
    if (isChecked) return;
    if (activeSelectedWord === word) {
      setActiveSelectedWord(null);
    } else {
      setActiveSelectedWord(word);
      speakWord(word);
    }
  };

  const handleSlotClick = (taskIndex: number) => {
    if (isChecked) return;
    if (activeSelectedWord) {
      setPlacements(prev => ({
        ...prev,
        [taskIndex]: activeSelectedWord
      }));
      setActiveSelectedWord(null);
    } else if (placements[taskIndex]) {
      // Clear slot if clicked without selections
      setPlacements(prev => ({
        ...prev,
        [taskIndex]: null
      }));
    }
  };

  const handleCheckAnswers = () => {
    // Check if everything matches target
    const allCorrect = TASKS.every((task, index) => placements[index] === task.correctAdverb);
    setIsChecked(true);
    setIsCorrect(allCorrect);

    if (allCorrect) {
      speakWord("Wow! Perfect score! Excellent work on frequency adverbs!");
      onAwardPoints(15); // Award +15 PTS!
    } else {
      speakWord("Some answers are incorrect. Let's try matching again!");
    }
  };

  const handleReset = () => {
    setPlacements({ 0: null, 1: null, 2: null });
    setActiveSelectedWord(null);
    setIsChecked(false);
    setIsCorrect(false);
    setPlayCount(p => p + 1);
  };

  const speakFullSentence = (index: number) => {
    const task = TASKS[index];
    const word = placements[index] || "____";
    speakWord(`${task.prefix} ${word} ${task.suffix}`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-6 shadow-sm text-slate-900 dark:text-white" id="grammar-challenge-portal">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 rounded-2xl text-2xl flex items-center justify-center shadow-xs">
            🏆
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#002147] dark:text-slate-100">
              Grammar Challenge: Adverbs of Frequency
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-450 mt-0.5">
              Drag and drop frequency adverbs (<span className="text-red-600 font-bold">always, sometimes, never</span>) into correct slots!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowsHelp(!showsHelp)}
            className="p-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-450 border border-slate-200 dark:border-slate-700 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
          >
            <HelpCircle className="w-4 h-4" />
            QM (Rule Help)
          </button>
          
          <button
            onClick={handleReset}
            className="p-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-450 border border-slate-200 dark:border-slate-700 rounded-xl transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
          >
            <RefreshCw className="w-4 h-4" />
            Sinfni tozalash
          </button>
        </div>
      </div>

      {/* Help block toggled */}
      {showsHelp && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/40 rounded-2xl space-y-3 text-orange-900 dark:text-orange-400 text-xs"
        >
          <h4 className="font-extrabold flex items-center gap-1.5 uppercase tracking-wide">
            <AlertTriangle className="w-4 h-4 text-orange-600 shrink-0" />
            Grammatik Qoida (Adverbs of Frequency)
          </h4>
          <p className="leading-relaxed">
            Ingliz tilida <strong>always (doimo)</strong>, <strong>sometimes (ba'zida)</strong> va <strong>never (hech qachon)</strong> so'zlari gapda quyidagi qoidalar asosida joylashadi:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-semibold">
            <li><strong>Mavzu 'to be' fe'li:</strong> Payt ravishi hamma vaqt <em>am / is / are</em> dan keyin qo'yiladi. (Masalan: <code>Leo is always happy.</code>)</li>
            <li><strong>Oddiy fe'llar:</strong> Payt ravishi asosiy fe'ldan oldin keladi. (Masalan: <code>Birds sometimes fly high.</code>)</li>
          </ul>
        </motion.div>
      )}

      {/* Main interactive area */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Adverbs Shelf Container */}
        <div className="xl:col-span-3 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 p-5 rounded-2xl space-y-3.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#002147] dark:text-sky-400 block mb-1">
              🎨 Adverbs Shelf:
            </span>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-normal font-medium">
              So'zlarni sudrab (drag) yashil kataklarga olib boring, yoki avval so'zni, so'ngra katakchani bosing:
            </p>

            <div className="flex xl:flex-col gap-2.5 pt-1">
              {adverbs.map((word) => {
                const isSelected = activeSelectedWord === word;
                return (
                  <div
                    key={word}
                    draggable={!isChecked}
                    onDragStart={(e) => handleDragStart(e, word)}
                    onClick={() => handleWordSelect(word)}
                    className={`px-4 py-3 rounded-xl font-black text-sm uppercase tracking-wider text-center cursor-grab active:cursor-grabbing transition-all border-2 flex items-center justify-between select-none shadow-sm ${
                      isSelected
                        ? "bg-amber-100 border-amber-400 text-amber-800 scale-[1.03]"
                        : "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 hover:scale-[1.02] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800"
                    } ${isChecked ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <span>{word}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); speakWord(word); }}
                      className="text-slate-400 hover:text-blue-500 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Challenge Sentences Board */}
        <div className="xl:col-span-9 space-y-4">
          <div className="space-y-3.5">
            {TASKS.map((task, idx) => {
              const currentPlacement = placements[idx];
              const isCorrectTarget = currentPlacement === task.correctAdverb;
              const hasPlaced = currentPlacement !== null;

              return (
                <div
                  key={task.id}
                  className={`border rounded-2xl p-4 md:p-5 transition-all relative ${
                    isChecked
                      ? isCorrectTarget
                        ? "bg-emerald-50/75 dark:bg-emerald-950/10 border-emerald-300 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-300"
                        : "bg-rose-50/75 dark:bg-rose-950/10 border-rose-300 dark:border-rose-900/40 text-rose-900 dark:text-rose-300"
                      : "bg-slate-50/35 dark:bg-slate-950/10 border-slate-200 dark:border-slate-800"
                  }`}
                >
                  {/* Task number badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-extrabold uppercase bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-350 px-2.5 py-1 rounded-md tracking-wider">
                      Task #{task.id}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => speakFullSentence(idx)}
                        className="p-1 px-2.5 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-lg border border-slate-200 dark:border-slate-850 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Speak
                      </button>
                    </div>
                  </div>

                  {/* Drag drop zone integrated line */}
                  <div className="py-3 text-sm md:text-base font-black tracking-wide leading-relaxed flex flex-wrap items-center gap-x-1.5 gap-y-2.5 text-slate-800 dark:text-slate-100">
                    <span>{task.prefix}</span>
                    
                    {/* DROP SLOT / ZONE */}
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, idx)}
                      onClick={() => handleSlotClick(idx)}
                      className={`min-w-[110px] h-[38px] rounded-xl flex items-center justify-center border-2 border-dashed px-3 text-xs md:text-sm transition-all uppercase tracking-widest cursor-pointer font-bold ${
                        isChecked
                          ? isCorrectTarget
                            ? "bg-emerald-555 border-emerald-500 text-emerald-800 dark:text-emerald-400"
                            : "bg-rose-555 border-rose-500 text-rose-800 dark:text-rose-400 font-extrabold line-through"
                          : hasPlaced
                            ? "bg-amber-100 border-amber-400 text-amber-800 shadow-sm"
                            : "bg-white dark:bg-slate-900 border-emerald-300 hover:border-emerald-500 text-slate-400 hover:text-slate-500 dark:border-emerald-900"
                      }`}
                    >
                      {hasPlaced ? (
                        <span className="flex items-center gap-1.5 animate-scaleUp">
                          ✨ {currentPlacement}
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-550 dark:text-emerald-400 tracking-normal font-sans text-center font-bold px-1.5">
                          Drop / Tap 🎯
                        </span>
                      )}
                    </div>

                    <span>{task.suffix}</span>
                  </div>

                  {/* Translation & Explanation under checking */}
                  <div className="mt-3 pt-3 border-t border-slate-150 dark:border-slate-800 space-y-1">
                    <p className="text-xs text-slate-400 dark:text-slate-450 italic font-medium">
                      🇮🇿 Tarjima: {task.uzTranslation}
                    </p>
                    
                    {isChecked && (
                      <p className={`text-[11px] font-bold ${isCorrectTarget ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        💡 {isCorrectTarget ? "To'g'ri!" : "Xato!"} {task.reason}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action and feedback footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              {isChecked ? (
                isCorrect ? (
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-sm font-black bg-emerald-50 dark:bg-emerald-950/20 px-4 py-2 rounded-xl border border-emerald-250">
                    <Star className="w-5 h-5 text-amber-400 animate-spin shrink-0" />
                    Ajoyib Natija! Barcha darslik savollariga to'g'ri javob berdingiz (+15 PTS)!
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 text-xs font-bold bg-rose-50 dark:bg-rose-950/20 px-3.5 py-2 rounded-xl">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    Hammasi ham to'g'ri emas. Kamchiliklarni tuzatishingiz mumkin.
                  </div>
                )
              ) : (
                <p className="text-[11px] text-slate-400 font-medium">
                  Hamma 3 ta gaplarni to'ldirib bo'lgach &ldquo;Tekshirish&rdquo; tugmasini bosing.
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto">
              {isChecked ? (
                <button
                  onClick={handleReset}
                  className="px-6 py-3.5 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white hover:bg-black font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-1 w-full sm:w-auto cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Qaytadan urinish
                </button>
              ) : (
                <button
                  onClick={handleCheckAnswers}
                  disabled={Object.values(placements).some(v => v === null)}
                  className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white disabled:bg-slate-200 disabled:dark:bg-slate-800 disabled:text-slate-450 disabled:dark:text-slate-600 font-extrabold text-xs tracking-widest uppercase rounded-xl transition-all hover:scale-[1.01] shadow-md flex items-center justify-center gap-1.5 w-full sm:w-auto cursor-pointer"
                >
                  <span>Tekshirish (Check answers)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
