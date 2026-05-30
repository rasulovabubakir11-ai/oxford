import { useState, useEffect } from "react";
import { Play, Square, Volume2, Check, HelpCircle, Award, CheckCircle2, XCircle, ArrowRight, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getListeningDataForUnit, ListeningPayload } from "../listeningData";

interface ListeningLabProps {
  currentUnit: any;
  onAwardPoints: (points: number) => void;
  playAudioCue: (type: "win" | "unscramble" | "lose") => void;
  speakWord: (word: string, id?: string) => void;
}

export const ListeningLab = ({
  currentUnit,
  onAwardPoints,
  playAudioCue,
  speakWord
}: ListeningLabProps) => {
  const [data, setData] = useState<ListeningPayload | null>(null);
  
  // Custom local state resets when unit change
  const [listeningSpeed, setListeningSpeed] = useState<number>(1.0);
  const [translationOn, setTranslationOn] = useState<boolean>(true);
  const [speakingSentenceId, setSpeakingSentenceId] = useState<string>("");
  const [isFullListening, setIsFullListening] = useState<boolean>(false);
  
  // Scoring / Game state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [grammarGapAnswers, setGrammarGapAnswers] = useState<Record<string, string>>({});
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<string>>(new Set());
  
  // Matching GameState
  const [selectedLeftId, setSelectedLeftId] = useState<string>("");
  const [matchedPairIds, setMatchedPairIds] = useState<Set<string>>(new Set());
  const [shuffledRightPairs, setShuffledRightPairs] = useState<any[]>([]);

  // Reload unit specific listening payload
  useEffect(() => {
    const payload = getListeningDataForUnit(currentUnit.number);
    setData(payload);
    
    // Reset all game & review states
    setSpeakingSentenceId("");
    setIsFullListening(false);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    
    setSelectedAnswers({});
    setGrammarGapAnswers({});
    setCompletedQuizzes(new Set());
    setSelectedLeftId("");
    setMatchedPairIds(new Set());
    
    // Shuffle the right-side parts for matching game
    if (payload && payload.matchingPairs) {
      const rightParts = payload.matchingPairs.map(p => ({
        id: p.id,
        textEn: p.enEnd,
        textUz: p.uzEnd
      })).sort(() => Math.random() - 0.5);
      setShuffledRightPairs(rightParts);
    }
  }, [currentUnit.number]);

  // Handle cleanup on unmount
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!data) return null;

  // Speaks using Web Speech API with adjustable rate
  const speakTextCustom = (text: string, id: string) => {
    if ("speechSynthesis" in window) {
      setSpeakingSentenceId(id);
      setIsFullListening(false);
      window.speechSynthesis.cancel();
      
      // Clean clean text for cleaner read
      const cleanText = text.replace(/[*_#`~]/g, "").trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = listeningSpeed;
      utterance.lang = "en-US";
      
      utterance.onend = () => {
        setSpeakingSentenceId("");
      };
      utterance.onerror = () => {
        setSpeakingSentenceId("");
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Kechirasiz, brauzeringizda ovozli eshittirish tizimi ishlamaydi.");
    }
  };

  // Speaks out the complete story
  const speakWholeStory = () => {
    if ("speechSynthesis" in window) {
      setIsFullListening(true);
      setSpeakingSentenceId("full_story");
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(data.audioTextEn);
      utterance.rate = listeningSpeed;
      utterance.lang = "en-US";
      
      utterance.onend = () => {
        setSpeakingSentenceId("");
        setIsFullListening(false);
      };
      utterance.onerror = () => {
        setSpeakingSentenceId("");
        setIsFullListening(false);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingSentenceId("");
    setIsFullListening(false);
  };

  // Handles multiple choice listening answers
  const handleAnswerSelect = (qId: string, optIndex: number, correctIndex: number) => {
    if (completedQuizzes.has(qId)) return; // Already solved
    
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIndex }));
    
    if (optIndex === correctIndex) {
      playAudioCue("win");
      onAwardPoints(5);
      speakWord("Good job! That's correct!");
    } else {
      playAudioCue("lose");
      speakWord("Try again!");
    }
    
    setCompletedQuizzes(prev => {
      const next = new Set(prev);
      next.add(qId);
      return next;
    });
  };

  // Handles Grammar Gap Select
  const handleGapSelect = (gapId: string, chosenWord: string, correctWord: string) => {
    if (grammarGapAnswers[gapId]) return; // Already solved
    
    setGrammarGapAnswers(prev => ({ ...prev, [gapId]: chosenWord }));
    
    if (chosenWord === correctWord) {
      playAudioCue("unscramble");
      onAwardPoints(5);
      speakWord("Brilliant grammar!");
    } else {
      playAudioCue("lose");
      speakWord("Almost! Think about single or plural.");
    }
  };

  // Handles click on Left matching item
  const handleLeftClick = (id: string) => {
    if (matchedPairIds.has(id)) return;
    setSelectedLeftId(id);
    speakWord("Select matching ending");
  };

  // Handles click on Right matching item
  const handleRightClick = (id: string, textEn: string) => {
    if (!selectedLeftId) return;
    if (matchedPairIds.has(id)) return;
    
    if (selectedLeftId === id) {
      // Correct Match!
      playAudioCue("unscramble");
      onAwardPoints(6);
      setMatchedPairIds(prev => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      setSelectedLeftId("");
      speakWord("Matched! Perfect sentence!");
    } else {
      // Incorrect Match
      playAudioCue("lose");
      speakWord("Doesn't match. Try another ending.");
    }
  };

  const totalPointsEarnedInLab = 
    (Object.entries(selectedAnswers).filter(([qId, idx]) => {
      const q = data.questions.find(item => item.id === qId);
      return q && idx === q.correctIndex;
    }).length * 5) +
    (Object.entries(grammarGapAnswers).filter(([gapId, word]) => {
      const gap = data.grammarGaps.find(item => item.id === gapId);
      return gap && word === gap.correctAnswer;
    }).length * 5) +
    (matchedPairIds.size * 6);

  return (
    <div className="space-y-6 animate-fade-in text-slate-900" id="listening-tab-area">
      
      {/* HEADER SECTION WITH ANIMATED WAVEFORM */}
      <div className="bg-gradient-to-r from-teal-500 to-indigo-600 dark:from-teal-600 dark:to-indigo-700 text-white rounded-2xl p-6 md:p-7 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="bg-white/20 text-white border border-white/25 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase font-mono">
              🎧 Listening & Grammar Lab
            </span>
            <h3 className="text-2xl font-black font-sans tracking-tight">
              Tinglash va Grammatika darsi (Unit {currentUnit.number})
            </h3>
            <p className="text-teal-50 flex items-center gap-1.5 text-xs font-semibold">
              <span>Inglizcha audio hikoyalarni tinglang, gaplar tarjimasini o'rganing va interactive darslarni yeching!</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5 bg-black/20 p-2.5 px-4 rounded-xl border border-white/10 select-none self-start shrink-0">
            {isFullListening || speakingSentenceId ? (
              <div className="flex items-end gap-1 h-5 w-6">
                <span className="w-1 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.1s", height: "100%" }}></span>
                <span className="w-1 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s", height: "60%" }}></span>
                <span className="w-1 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s", height: "80%" }}></span>
                <span className="w-1 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.5s", height: "40%" }}></span>
              </div>
            ) : (
              <Volume2 className="w-5 h-5 text-teal-200" />
            )}
            <div className="text-left leading-none">
              <span className="text-[10px] text-teal-150 uppercase font-bold font-mono block">To'plangan ball</span>
              <span className="text-base font-black text-white font-mono">{totalPointsEarnedInLab} pts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* INTERACTIVE AUDIO PLAYER & TEXT READ ALOUD */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-2xs space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
            <div className="space-y-1">
              <h4 className="text-base font-semibold text-oxford-blue flex items-center gap-2">
                📢 Audio Story & Conversation Script
              </h4>
              <p className="text-xs text-slate-500">
                Ovoz balandligini yoqing, butun matnni yoki gaplarni alohida eshiting
              </p>
            </div>

            {/* Speeds & translation selectors */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setTranslationOn(!translationOn)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  translationOn 
                    ? "bg-teal-50 border border-teal-200 text-teal-700" 
                    : "bg-slate-100 border border-slate-200 text-slate-600"
                }`}
              >
                {translationOn ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>Tarjima: {translationOn ? "YONIQ" : "O'CHIQ"}</span>
              </button>
            </div>
          </div>

          {/* PLAYER CONSOLE CARD */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {speakingSentenceId === "full_story" ? (
                <button
                  onClick={stopSpeaking}
                  className="px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
                >
                  <Square className="w-4 h-4 fill-white" />
                  <span>Audio To'xtatish</span>
                </button>
              ) : (
                <button
                  onClick={speakWholeStory}
                  className="px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white text-xs font-black rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Suhbatni Tinglash</span>
                </button>
              )}

              {speakingSentenceId && speakingSentenceId !== "full_story" && (
                <button
                  onClick={stopSpeaking}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  To'xtatish
                </button>
              )}
            </div>

            {/* Audio speed controls (adjustable TTS speed) */}
            <div className="flex items-center gap-1.5 bg-slate-200/50 p-1 rounded-xl">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-500 px-2">Tezlik:</span>
              {[0.8, 1.0, 1.2].map((sp) => (
                <button
                  key={sp}
                  onClick={() => {
                    setListeningSpeed(sp);
                    speakWord(`Speed ${sp}x`);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer leading-tight ${
                    listeningSpeed === sp
                      ? "bg-teal-600 text-white"
                      : "text-slate-600 hover:bg-slate-250"
                  }`}
                >
                  {sp === 0.8 ? "🐢 0.8x" : sp === 1.0 ? "Me'yor 1.0x" : "⚡ 1.2x"}
                </button>
              ))}
            </div>
          </div>

          {/* AUDIO DIALOGUE OR TEXT SCRIPT */}
          <div className="space-y-4">
            {data.sentences.map((sentence) => {
              const isSpeaking = speakingSentenceId === sentence.id;
              return (
                <div
                  key={sentence.id}
                  onClick={() => speakTextCustom(sentence.en, sentence.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSpeaking 
                      ? "bg-amber-50/70 border-amber-300 ring-1 ring-amber-300 shadow-2xs scale-[1.01]" 
                      : "bg-white border-slate-100 hover:bg-slate-50/50 hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                        isSpeaking ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="text-xs font-black uppercase font-mono text-indigo-700">
                        {sentence.speaker}:
                      </div>
                      <p className="text-sm font-semibold text-slate-800 leading-snug">
                        {sentence.en}
                      </p>
                      {translationOn && (
                        <p className="text-xs text-slate-500 italic leading-snug">
                          {sentence.uz}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* GRAMMAR LAB & INTERACTIVE MATCHING SENTENCES */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* INTERACTIVE GRAMMAR BUILDER (COUNT/SINGULAR/PLURAL CONNECTION) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-2xs space-y-5">
            <div>
              <span className="text-[10px] uppercase font-mono font-black tracking-widest text-emerald-600">
                📝 Grammar Lab Exercises
              </span>
              <h4 className="text-lg font-bold text-oxford-blue mt-1">
                Bo'shliqlarni to'ldiring (Gap Fills)
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Ingliz tili grammatika qoidalariga mos variantni tanlang
              </p>
            </div>

            <div className="space-y-4 pt-1">
              {data.grammarGaps.map((gap, gIdx) => {
                const checkedAnswer = grammarGapAnswers[gap.id];
                const isCorrect = checkedAnswer === gap.correctAnswer;
                
                return (
                  <div key={gap.id} className="bg-slate-50/60 border border-slate-200/85 p-4 rounded-xl space-y-3">
                    <div className="text-xs font-black text-slate-600 tracking-wide uppercase">
                      Mashq {gIdx + 1}
                    </div>
                    
                    <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                      {gap.sentencePre}
                      {checkedAnswer ? (
                        <span className={`px-2 py-0.5 mx-1 rounded font-black text-xs ${
                          isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                        }`}>
                          {checkedAnswer}
                        </span>
                      ) : (
                        <span className="px-3.5 py-0.5.x mx-1 bg-white border border-dashed border-slate-300 rounded font-mono text-slate-400">____</span>
                      )}
                      {gap.sentencePost}
                    </p>

                    {/* Option Selection pills */}
                    {!checkedAnswer ? (
                      <div className="flex flex-wrap gap-2 pt-1.5">
                        {gap.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleGapSelect(gap.id, opt, gap.correctAnswer)}
                            className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-3xs hover:scale-102 hover:border-slate-300"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className={`p-2.5 rounded-lg border text-xs font-medium space-y-1 leading-relaxed ${
                        isCorrect ? "bg-emerald-50 text-emerald-800 border-emerald-150" : "bg-rose-50 text-rose-800 border-rose-150"
                      }`}>
                        <div className="flex items-center gap-1.5 font-bold">
                          {isCorrect ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" /> : <XCircle className="w-4 h-4 shrink-0 text-rose-600" />}
                          <span>{isCorrect ? "To'g'ri! Barakalla!" : `Noto'g'ri! To'g'ri javob: "${gap.correctAnswer}"`}</span>
                        </div>
                        <p className="text-[11px] text-slate-600">{gap.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* INTERACTIVE SENTENCE JOINER GAME (SENTENCE STARTER VS COMPLEMENTS) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
            <div>
              <span className="text-[10px] uppercase font-mono font-black tracking-widest text-indigo-600">
                🧩 Sentence Builder Game
              </span>
              <h4 className="text-base font-bold text-oxford-blue mt-1">
                Gap qismlarini birlashtiring (Matcher)
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Chap tarafdagi gapni bosing, keyin unga mos davomini o'ng tarafdan toping!
              </p>
            </div>

            <div className="space-y-3.5 pt-1">
              
              {/* Starters Left side */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider block uppercase">Gap Boshlanishi (Starters):</span>
                {data.matchingPairs.map((pair) => {
                  const isMatched = matchedPairIds.has(pair.id);
                  const isSelected = selectedLeftId === pair.id;
                  
                  return (
                    <button
                      key={pair.id}
                      onClick={() => handleLeftClick(pair.id)}
                      disabled={isMatched}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                        isMatched
                          ? "bg-emerald-50 border-emerald-100 text-emerald-700 opacity-60 pointer-events-none"
                          : isSelected
                            ? "bg-indigo-50 border-indigo-400 text-indigo-800 ring-2 ring-indigo-200"
                            : "bg-white border-slate-200 hover:border-slate-300 text-slate-700 cursor-pointer"
                      }`}
                    >
                      <div className="font-semibold truncate">
                        🇬🇧 {pair.enStart}...
                        <span className="block text-[10px] font-medium text-slate-400 italic">uz: {pair.uzStart}...</span>
                      </div>
                      {isMatched ? (
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Enders Right side */}
              <div className="space-y-2 border-t border-slate-150 pt-3">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider block uppercase">Mos keluvchi davomi (Find Ending):</span>
                <div className="grid grid-cols-1 gap-2">
                  {shuffledRightPairs.map((rPair) => {
                    const isMatched = matchedPairIds.has(rPair.id);
                    const isCandidateSelected = selectedLeftId !== "";
                    
                    return (
                      <button
                        key={rPair.id}
                        onClick={() => handleRightClick(rPair.id, rPair.textEn)}
                        disabled={isMatched || !isCandidateSelected}
                        className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                          isMatched
                            ? "bg-slate-50 border-slate-100 text-slate-400 opacity-55 pointer-events-none"
                            : isCandidateSelected
                              ? "bg-white border-amber-300 hover:border-amber-400 text-slate-800 cursor-pointer hover:bg-amber-50/20"
                              : "bg-white border-slate-200 text-slate-400 opacity-60 hover:none"
                        }`}
                      >
                        <div className="font-semibold">
                          🇬🇧 ...{rPair.textEn}
                          <span className="block text-[10px] font-normal text-slate-400 italic">uz: ...{rPair.textUz}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* LISTENING COMPREHENSION TEST WITH SPEAK QUESTS */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
            <div>
              <span className="text-[10px] uppercase font-mono font-black tracking-widest text-teal-600">
                🎮 Listening Comprehension Quiz
              </span>
              <h4 className="text-base font-bold text-oxford-blue mt-1">
                Tinglab tushunish testi (Quiz)
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Ovoz belgisini bosib savollarni tinglang va javob toping!
              </p>
            </div>

            <div className="space-y-4 pt-1">
              {data.questions.map((q, qIndex) => {
                const answerIndex = selectedAnswers[q.id];
                const hasAnswered = answerIndex !== undefined;
                const isCorrect = answerIndex === q.correctIndex;

                return (
                  <div key={q.id} className="border border-slate-150 rounded-xl p-4 space-y-3.5 bg-slate-50/40">
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="space-y-1">
                        <span className="bg-slate-200/80 text-slate-600 font-mono text-[9px] px-2 py-0.5 rounded font-black">
                          SAVOL {qIndex + 1}
                        </span>
                        <h5 className="text-xs font-black text-[#002147] leading-snug">
                          {q.questionEn}
                        </h5>
                        <p className="text-[11px] text-slate-500 italic leading-snug">
                          {q.questionUz}
                        </p>
                      </div>

                      {/* Text Speeches buttons */}
                      <button
                        onClick={() => speakTextCustom(`${q.questionEn}. ${q.options.join(". ")}`, q.id)}
                        className="w-8 h-8 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100 transition-colors cursor-pointer"
                        title="Savolni tinglash"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quiz choices pills layout */}
                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = answerIndex === oIdx;
                        const isAnswerCorrect = oIdx === q.correctIndex;
                        const isIncorrectSelected = isChosen && !isAnswerCorrect;
                        
                        let optStyle = "bg-white border-slate-200 hover:border-slate-300 text-slate-700 cursor-pointer hover:bg-slate-50/50";
                        if (hasAnswered) {
                          if (isAnswerCorrect) {
                            optStyle = "bg-emerald-500/10 border-emerald-400 text-emerald-800 font-extrabold";
                          } else if (isIncorrectSelected) {
                            optStyle = "bg-rose-500/10 border-rose-450 text-rose-800 font-semibold";
                          } else {
                            optStyle = "bg-white/50 border-slate-150 text-slate-400 opacity-60";
                          }
                        }

                        return (
                          <button
                            key={opt}
                            onClick={() => handleAnswerSelect(q.id, oIdx, q.correctIndex)}
                            disabled={hasAnswered}
                            className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between ${optStyle}`}
                          >
                            <span className="leading-tight">{opt}</span>
                            {hasAnswered && isAnswerCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                            {hasAnswered && isIncorrectSelected && (
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Show explanation details */}
                    {hasAnswered && (
                      <div className={`p-2.5 rounded-lg text-[11px] leading-relaxed ${
                        isCorrect ? "bg-emerald-50 text-emerald-800 border-l-2 border-emerald-500" : "bg-rose-50/80 text-rose-800 border-l-2 border-rose-500"
                      }`}>
                        <div className="font-bold">{isCorrect ? "Barakalla! To'g'ri javob topshirildi: " : "E'tibor bering! "}</div>
                        <div>{q.explanation}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
