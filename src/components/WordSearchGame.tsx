import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Trophy, HelpCircle, RefreshCw, Star, CheckCircle2, ArrowRight, Volume2 } from "lucide-react";

interface WordSearchGameProps {
  vocabulary: { id: string; word: string; translation: string }[];
  wordsLearnedCount: number;
  onAwardPoints: (points: number) => void;
  speakWord: (word: string) => void;
}

interface PlacedWord {
  word: string;         // UPPERCASE cleaned word, e.g. "MAMMALS"
  displayWord: string;  // Original, e.g. "Mammals"
  translation: string;  // Uzbek translation, e.g. "Emizuvchilar"
  start: { r: number; c: number };
  end: { r: number; c: number };
  cells: { r: number; c: number }[];
  found: boolean;
  colorClass: string;   // Dynamic color highlights
}

interface CellCoord {
  r: number;
  c: number;
}

const HIGHLIGHT_COLORS = [
  "bg-emerald-150 text-emerald-900 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
  "bg-sky-150 text-sky-900 border-sky-300 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800",
  "bg-amber-150 text-amber-900 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
  "bg-purple-150 text-purple-900 border-purple-300 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800",
  "bg-rose-150 text-rose-900 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800",
  "bg-indigo-150 text-indigo-900 border-indigo-300 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800",
  "bg-teal-150 text-teal-900 border-teal-300 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800",
  "bg-orange-150 text-orange-900 border-orange-300 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800",
];

export function WordSearchGame({
  vocabulary,
  wordsLearnedCount,
  onAwardPoints,
  speakWord,
}: WordSearchGameProps) {
  const [gridSize, setGridSize] = useState<number>(10);
  const [grid, setGrid] = useState<string[][]>([]);
  const [placedWords, setPlacedWords] = useState<PlacedWord[]>([]);
  
  // Interaction states
  const [dragStart, setDragStart] = useState<CellCoord | null>(null);
  const [dragCurrent, setDragCurrent] = useState<CellCoord | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeSelection, setActiveSelection] = useState<CellCoord[]>([]);
  
  // Click-to-select alternative states (for robust mobile usage)
  const [selectedStart, setSelectedStart] = useState<CellCoord | null>(null);
  
  // Helper settings
  const [showTranslations, setShowTranslations] = useState<boolean>(true);
  const [selectedWordForHint, setSelectedWordForHint] = useState<PlacedWord | null>(null);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [awardedPointsThisRound, setAwardedPointsThisRound] = useState<number>(0);
  const [confettiTrigger, setConfettiTrigger] = useState<boolean>(false);
  
  // Touch scrolling prevention ref to grid element
  const gridRef = useRef<HTMLDivElement>(null);

  // Initialize game when vocabulary changes
  useEffect(() => {
    initGame();
  }, [vocabulary]);

  // Prevent scroll when tracing words on mobile touch
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (isDragging && gridRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };
    document.addEventListener("touchmove", preventDefault, { passive: false });
    return () => {
      document.removeEventListener("touchmove", preventDefault);
    };
  }, [isDragging]);

  const initGame = () => {
    if (!vocabulary || vocabulary.length === 0) return;

    // 1. Clean words (UPPERCASE, remove spaces/symbols, limit to 8 words for a robust playable board)
    const cleaned = vocabulary
      .map((item) => {
        const cleanWord = item.word.replace(/[^A-Za-z]/g, "").toUpperCase();
        return {
          original: item.word,
          clean: cleanWord,
          translation: item.translation,
        };
      })
      .filter((item) => item.clean.length >= 3 && item.clean.length <= 11);

    // Take up to 8 random words from the unit's vocabulary to populate
    const shuffledCleaned = [...cleaned].sort(() => 0.5 - Math.random());
    const selectedWords = shuffledCleaned.slice(0, 8);

    // Sort by length descending to place longest words first
    selectedWords.sort((a, b) => b.clean.length - a.clean.length);

    // Determine grid size dynamically based on max word length (10 or 11)
    const maxLen = selectedWords.length > 0 ? Math.max(...selectedWords.map((w) => w.clean.length)) : 10;
    const calcGridSize = Math.max(10, Math.min(11, maxLen));
    setGridSize(calcGridSize);

    // Build Empty Grid
    const newGrid: string[][] = Array(calcGridSize)
      .fill(null)
      .map(() => Array(calcGridSize).fill(""));

    const newPlacedWords: PlacedWord[] = [];
    const directions = [
      { dr: 0, dc: 1 },   // Horizontal: Left to Right
      { dr: 1, dc: 0 },   // Vertical: Top to Bottom
      { dr: 1, dc: 1 },   // Diagonal: Down-Right
      { dr: -1, dc: 1 },  // Diagonal: Up-Right
    ];

    selectedWords.forEach((item, index) => {
      let placed = false;
      let attempts = 0;
      const wordLen = item.clean.length;
      const colorClass = HIGHLIGHT_COLORS[index % HIGHLIGHT_COLORS.length];

      while (!placed && attempts < 80) {
        attempts++;
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const { dr, dc } = direction;

        let startRow = 0;
        let startCol = 0;

        if (dr === 0) {
          startRow = Math.floor(Math.random() * calcGridSize);
          startCol = Math.floor(Math.random() * (calcGridSize - wordLen + 1));
        } else if (dc === 0) {
          startRow = Math.floor(Math.random() * (calcGridSize - wordLen + 1));
          startCol = Math.floor(Math.random() * calcGridSize);
        } else if (dr === 1 && dc === 1) {
          startRow = Math.floor(Math.random() * (calcGridSize - wordLen + 1));
          startCol = Math.floor(Math.random() * (calcGridSize - wordLen + 1));
        } else if (dr === -1 && dc === 1) {
          startRow = Math.floor(Math.random() * (calcGridSize - wordLen)) + wordLen - 1;
          startCol = Math.floor(Math.random() * (calcGridSize - wordLen + 1));
        }

        // Validate overlapping & fitting
        let fit = true;
        const proposedCells: CellCoord[] = [];
        for (let i = 0; i < wordLen; i++) {
          const r = startRow + dr * i;
          const c = startCol + dc * i;
          if (r < 0 || r >= calcGridSize || c < 0 || c >= calcGridSize) {
            fit = false;
            break;
          }
          const currentChar = newGrid[r][c];
          if (currentChar !== "" && currentChar !== item.clean[i]) {
            fit = false;
            break;
          }
          proposedCells.push({ r, c });
        }

        if (fit) {
          // Commit to newGrid
          for (let i = 0; i < wordLen; i++) {
            const { r, c } = proposedCells[i];
            newGrid[r][c] = item.clean[i];
          }

          newPlacedWords.push({
            word: item.clean,
            displayWord: item.original,
            translation: item.translation,
            start: { r: startRow, c: startCol },
            end: { r: startRow + dr * (wordLen - 1), c: startCol + dc * (wordLen - 1) },
            cells: proposedCells,
            found: false,
            colorClass,
          });
          placed = true;
        }
      }
    });

    // Fill remaining cells with random letters
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let r = 0; r < calcGridSize; r++) {
      for (let c = 0; c < calcGridSize; c++) {
        if (newGrid[r][c] === "") {
          newGrid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }

    setGrid(newGrid);
    setPlacedWords(newPlacedWords);
    setDragStart(null);
    setDragCurrent(null);
    setIsDragging(false);
    setActiveSelection([]);
    setSelectedStart(null);
    setSelectedWordForHint(null);
    setGameFinished(false);
    setAwardedPointsThisRound(0);
    setConfettiTrigger(false);
  };

  // Check if coordinates represent a straight linear set (horizontal, vertical, or true diagonal)
  const getLineCells = (start: CellCoord, end: CellCoord): CellCoord[] => {
    const cells: CellCoord[] = [];
    const dr = end.r - start.r;
    const dc = end.c - start.c;
    const absDr = Math.abs(dr);
    const absDc = Math.abs(dc);

    if (dr === 0 && dc === 0) {
      return [start];
    }

    // Must be either horizontal, vertical, or perfect diagonal (1:1)
    if (dr === 0 || dc === 0 || absDr === absDc) {
      const steps = Math.max(absDr, absDc);
      const stepR = dr === 0 ? 0 : dr / absDr;
      const stepC = dc === 0 ? 0 : dc / absDc;

      for (let i = 0; i <= steps; i++) {
        cells.push({
          r: start.r + stepR * i,
          c: start.c + stepC * i,
        });
      }
    }
    return cells;
  };

  // Convert array of coordinates to uppercase string
  const getSelectionString = (cells: CellCoord[]): string => {
    return cells.map((cell) => grid[cell.r]?.[cell.c] || "").join("");
  };

  // Check if string matches any of our placing words
  const checkSelection = (cells: CellCoord[]) => {
    if (cells.length < 3) return;
    const selectedText = getSelectionString(cells);
    const reversedText = selectedText.split("").reverse().join("");

    // Find if it matches standard or reversed direction
    const matchingWordIdx = placedWords.findIndex(
      (p) => !p.found && (p.word === selectedText || p.word === reversedText)
    );

    if (matchingWordIdx !== -1) {
      const match = placedWords[matchingWordIdx];
      
      // Update found status
      const updated = [...placedWords];
      updated[matchingWordIdx] = { ...match, found: true };
      setPlacedWords(updated);
      
      // Speak the word aloud for high educational feedback
      speakWord(match.displayWord);

      // Award points
      onAwardPoints(10);
      setAwardedPointsThisRound((prev) => prev + 10);

      // Trigger temporary star animation
      setSelectedWordForHint(null);

      // Check if all placed words are found
      const remainingUnfound = updated.filter((p) => !p.found);
      if (remainingUnfound.length === 0) {
        setGameFinished(true);
        setConfettiTrigger(true);
        // Bonus points for fully clearing the game!
        onAwardPoints(20);
        setAwardedPointsThisRound((prev) => prev + 20);
      }
    }
  };

  // Mouse / Touch handlers for dragging
  const handleDragStart = (r: number, c: number) => {
    if (gameFinished) return;
    setDragStart({ r, c });
    setDragCurrent({ r, c });
    setIsDragging(true);
    setActiveSelection([{ r, c }]);
    setSelectedStart(null); // Clear click-to-select indicator if drag starts
  };

  const handleDragMove = (r: number, c: number) => {
    if (!isDragging || !dragStart) return;
    
    // Only update if targeting a different cell
    if (dragCurrent?.r === r && dragCurrent?.c === c) return;
    
    const potentialLine = getLineCells(dragStart, { r, c });
    if (potentialLine.length > 0) {
      setDragCurrent({ r, c });
      setActiveSelection(potentialLine);
    }
  };

  const handleDragTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !dragStart || !gridRef.current) return;
    const touch = e.touches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    
    // Find the touch element with data-row and data-col indices
    const cellEl = elements.find((el) => el.hasAttribute("data-row") && el.hasAttribute("data-col"));
    if (cellEl) {
      const r = parseInt(cellEl.getAttribute("data-row") || "0");
      const c = parseInt(cellEl.getAttribute("data-col") || "0");
      handleDragMove(r, c);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    checkSelection(activeSelection);
    setActiveSelection([]);
    setDragStart(null);
    setDragCurrent(null);
  };

  // Alternative fallback: Cel-by-Cell clicks (super reliable on smartphones within standard iframes)
  const handleCellClick = (r: number, c: number) => {
    if (gameFinished) return;

    if (!selectedStart) {
      // First click: lock start cell
      setSelectedStart({ r, c });
      setActiveSelection([{ r, c }]);
    } else {
      // Second click: complete linear sequence
      const line = getLineCells(selectedStart, { r, c });
      if (line.length > 1) {
        checkSelection(line);
      }
      setSelectedStart(null);
      setActiveSelection([]);
    }
  };

  // Helper utility to colors cells of already discovered words
  const getCellFoundInfo = (r: number, c: number): PlacedWord | null => {
    for (const pw of placedWords) {
      if (pw.found && pw.cells.some((cell) => cell.r === r && cell.c === c)) {
        return pw;
      }
    }
    return null;
  };

  // Is helper cell currently highlighted in the user's active select trace
  const isCellInActiveSelection = (r: number, c: number): boolean => {
    return activeSelection.some((cell) => cell.r === r && cell.c === c);
  };

  // Render puzzle board letters
  const renderGrid = () => {
    return (
      <div 
        ref={gridRef}
        onTouchEnd={handleDragEnd}
        className="touch-none select-none relative bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-2xl grid gap-1.5 shadow-inner"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`
        }}
        id="word-search-game-board"
      >
        {Array(gridSize)
          .fill(null)
          .map((_, r) =>
            Array(gridSize)
              .fill(null)
              .map((_, c) => {
                const letter = grid[r]?.[c] || "";
                const foundWord = getCellFoundInfo(r, c);
                const active = isCellInActiveSelection(r, c);
                const isStart = selectedStart?.r === r && selectedStart?.c === c;

                // Build specific backgrounds
                let cellStyle = "bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-100 dark:border-slate-900/60";
                
                if (foundWord) {
                  cellStyle = foundWord.colorClass + " font-bold scale-98 transition-all duration-300";
                } else if (active) {
                  cellStyle = "bg-amber-400 text-amber-950 font-bold border-amber-500 shadow-xs animate-pulse";
                } else if (isStart) {
                  cellStyle = "bg-amber-300 text-amber-950 font-extrabold border-amber-400 ring-2 ring-amber-500 scale-102";
                }

                // If this is the first grid cells of selectedWordForHint, flash a soft red helper ring
                const firstLetterHint = selectedWordForHint && !selectedWordForHint.found && selectedWordForHint.cells[0].r === r && selectedWordForHint.cells[0].c === c;
                
                return (
                  <div
                    key={`${r}-${c}`}
                    data-row={r}
                    data-col={c}
                    onMouseDown={() => handleDragStart(r, c)}
                    onMouseEnter={() => handleDragMove(r, c)}
                    onMouseUp={handleDragEnd}
                    onTouchStart={() => handleDragStart(r, c)}
                    onTouchMove={handleDragTouchMove}
                    onClick={() => handleCellClick(r, c)}
                    className={`aspect-square sm:w-11 sm:h-11 flex items-center justify-center rounded-xl font-semibold border text-base sm:text-lg transition-all duration-150 cursor-pointer ${cellStyle} ${
                      firstLetterHint ? "ring-3 ring-rose-400 ring-offset-2 dark:ring-offset-slate-950 border-rose-400 animate-bounce" : ""
                    }`}
                  >
                    {letter}
                  </div>
                );
              })
          )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs max-w-5xl mx-auto space-y-6" id="vocabulary-word-search-card">
      
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-100 text-amber-700 rounded-lg text-lg">🧩</span>
            <h3 className="text-xl font-extrabold text-oxford-blue dark:text-sky-400">
              So'z Qidirish (Vocabulary Word Search)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Harflar orasidan berilgan so'zlarni burchakma-burchak yoki to'g'ri chiziqda toping! Har bir topilgan so'z darslik ballingizni oshiradi.
          </p>
        </div>

        {/* Dynamic score container */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl self-start">
          <div className="flex items-center gap-1.5">
            <Star className="w-5 h-5 text-amber-500 animate-spin-slow fill-amber-300" />
            <div>
              <span className="text-xs text-slate-400 block leading-none">Joriy ball:</span>
              <span className="text-sm font-black text-oxford-blue dark:text-amber-400">{wordsLearnedCount} PTS</span>
            </div>
          </div>
          <div className="border-l border-slate-200 dark:border-slate-700 pl-3">
            <span className="text-xs text-slate-400 block leading-none">O'yindagi ball:</span>
            <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">+{awardedPointsThisRound} PTS</span>
          </div>
        </div>
      </div>

      {/* Main Game UI (Grid + Sidebar list) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Playable Grid (left 7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-4">
          
          {/* Active grid display instructions */}
          <div className="w-full text-center py-2 bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs font-semibold text-amber-800 dark:text-amber-300 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            Sichqoncha bilan torting yoxud so'z boshlanishi va tugashidagi harfni bosing!
          </div>

          {renderGrid()}

          {/* Quick controls row inside board area */}
          <div className="w-full flex justify-between items-center py-1 gap-2">
            <button
              onClick={() => {
                setShowTranslations(!showTranslations);
                speakWord("Options toggled");
              }}
              className="px-3.5 py-1.5 text-xs font-bold border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-slate-600 dark:text-slate-300"
            >
              {showTranslations ? "Translation yashirish" : "Tarjimani ko'rsatish"}
            </button>

            <button
              onClick={initGame}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-sky-400 hover:scale-102 transition-all font-extrabold text-xs text-slate-700 rounded-xl"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Yangi Grid (Re-roll Grid)
            </button>
          </div>
        </div>

        {/* Word Targets Sidebar (right 5 cols) */}
        <div className="lg:col-span-12 xl:col-span-5 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 space-y-4 lg:col-span-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h4 className="text-sm font-extrabold text-oxford-blue dark:text-sky-300 uppercase tracking-widest flex items-center gap-1.5">
              <span>🎯 Topish kerak bo'lgan so'zlar</span>
              <span className="bg-slate-100 dark:bg-slate-800 ml-1.5 px-2 py-0.5 rounded-full text-xs text-slate-600 dark:text-slate-300 lowercase">
                {placedWords.filter((p) => p.found).length}/{placedWords.length}
              </span>
            </h4>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-2.5 max-h-[290px] overflow-y-auto pr-1">
            {placedWords.map((pw, i) => (
              <div
                key={pw.word}
                onClick={() => {
                  speakWord(pw.displayWord);
                  setSelectedWordForHint(selectedWordForHint?.word === pw.word ? null : pw);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between items-start leading-tight select-none relative group ${
                  pw.found
                    ? "bg-emerald-50/50 dark:bg-emerald-950/25 border-emerald-300 dark:border-emerald-900/80 scale-98 hover:scale-100"
                    : selectedWordForHint?.word === pw.word
                    ? "bg-amber-50 dark:bg-amber-950/30 border-amber-400 dark:border-amber-800 ring-1 ring-amber-400"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {/* Floating completed indicator */}
                {pw.found && (
                  <span className="absolute top-2 right-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4.5 h-4.5 fill-emerald-100 dark:fill-transparent" />
                  </span>
                )}

                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-sm font-extrabold transition-all ${
                      pw.found
                        ? "line-through text-slate-400 dark:text-slate-600"
                        : "text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400"
                    }`}
                  >
                    {pw.displayWord}
                  </span>
                  
                  {/* Pronunciation click trigger icon */}
                  <Volume2 className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 cursor-pointer hover:text-blue-500" />
                </div>

                {showTranslations && (
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 capitalize leading-none">
                    {pw.translation}
                  </span>
                )}

                {/* Hint link button */}
                {!pw.found && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedWordForHint(selectedWordForHint?.word === pw.word ? null : pw);
                      speakWord("Showing hint");
                    }}
                    className="mt-2 text-[10px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-0.5"
                  >
                    💡 Harf ko'rsatish
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Hint reveal panel */}
          {selectedWordForHint && !selectedWordForHint.found && (
            <div className="bg-amber-50/70 dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 rounded-xl p-3 text-xs text-amber-900 dark:text-amber-200 animate-fadeIn flex flex-col gap-1">
              <span className="font-extrabold text-[11px] uppercase tracking-wider text-amber-800 dark:text-amber-400">
                💡 Maslahat (Hint Helper):
              </span>
              <span>
                <strong>"{selectedWordForHint.displayWord}"</strong> so'zi grid ichida{" "}
                <span className="font-black underline text-rose-500 animate-pulse text-xs">
                  miltillayotgan qizil doira
                </span>
                dan boshlanadi!
              </span>
            </div>
          )}

          {/* Points rule panel */}
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-500 space-y-1">
            <div className="font-bold text-slate-700 dark:text-slate-300">Qoidalar va Ballar (Point System):</div>
            <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
              <li>Har bir yangi topilgan so'z uchun: <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">+10 PTS</span></li>
              <li>Barcha 8 so'zni to'liq topganlik uchun yakuniy bonus: <span className="text-blue-600 dark:text-sky-400 font-extrabold">+20 PTS</span></li>
              <li>Istalgancha Yangi Grid yaratib mashq qilishingiz mumkin (ballar to'planaveradi!)</li>
            </ul>
          </div>
        </div>

      </div>

      {/* Completion Dialog Area */}
      {gameFinished && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg animate-fadeIn"
          id="word-search-match-complete-notification"
        >
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <span className="p-3 bg-white/20 rounded-full text-2xl animate-bounce">
              🏆
            </span>
            <div>
              <h4 className="text-lg font-black tracking-wide">
                Ajoyib Natija! Barcha so'zlarni toptingiz!
              </h4>
              <p className="text-xs text-emerald-100 font-medium">
                Siz ushbu dars bo'yicha so'z boyligingizni oshirdingiz va{" "}
                <span className="font-extrabold text-amber-300 underline">+{awardedPointsThisRound} PTS</span> lik qo'shimcha ballga ega bo'ldingiz!
              </p>
            </div>
          </div>

          <button
            onClick={initGame}
            className="px-5 py-2.5 bg-white text-emerald-800 hover:bg-slate-50 transition-all font-black text-xs rounded-xl shadow-md uppercase tracking-wider flex items-center gap-1 cursor-pointer self-center"
          >
            Yana o'ynash (Next Level Grid)
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
