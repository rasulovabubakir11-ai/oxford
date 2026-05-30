export enum AppSection {
  HOME = "HOME",
  UNIT_DETAIL = "UNIT_DETAIL",
  VOCABULARY_PRACTICE = "VOCABULARY_PRACTICE",
  GRAMMAR_DRILL = "GRAMMAR_DRILL",
  QUIZ_MODE = "QUIZ_MODE",
  AI_COACH = "AI_COACH",
  READING_PRACTICE = "READING_PRACTICE",
  CHAT_ROOM = "CHAT_ROOM",
  TRANSLATOR = "TRANSLATOR"
}

export interface VocabularyWord {
  id: string;
  word: string;
  translation: string;
  transcription?: string;
  category?: string;
  emoji?: string;
}

export interface GrammarLesson {
  unitNumber: number;
  title: string;
  explanation: string;
  examples: Array<{
    en: string;
    uz: string;
  }>;
}

export interface ReadingQuestion {
  id: string;
  questionEn: string;
  questionUz: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ReadingSection {
  unitNumber: number;
  title: string;
  aboutUz: string; // Matn haqida
  sentenceEn: string; // Gapi
  sentenceUz: string; // Tarjimasi
  fullTextEn?: string; // Toliq inglizcha matn
  fullTextUz?: string; // Toliq o'zbekcha tarjimasi
  questions?: ReadingQuestion[]; // Tayyor savollar
  emoji?: string;
}

export interface QuizQuestion {
  id: string;
  unitNumber: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface BigQuestion {
  number: number;
  text: string;
  units: number[]; // e.g., [1, 2] for Big Question 1
}

export interface SongLine {
  en: string;
  uz: string;
  pronunciation: string;
}

export interface UnitSong {
  title: string;
  trackInfo: string;
  lines: SongLine[];
}

export interface OxfordUnit {
  number: number;
  title: string;
  bigQuestionNumber: number;
  vocabulary: VocabularyWord[];
  grammar: GrammarLesson;
  reading: ReadingSection;
  song?: UnitSong;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
