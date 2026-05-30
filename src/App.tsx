import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AppSection, OxfordUnit, VocabularyWord, QuizQuestion, ChatMessage } from "./types";
import { BIG_QUESTIONS, OXFORD_UNITS, QUIZ_QUESTIONS } from "./data";
import { WordSearchGame } from "./components/WordSearchGame";
import { GrammarChallenge } from "./components/GrammarChallenge";
import { SinfChatRoom } from "./components/SinfChatRoom";
import { getListeningDataForUnit } from "./listeningData";
import { ListeningLab } from "./components/ListeningLab";

interface EnglishVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  channel: string;
}

const ENGLISH_VIDEOS_MAP: Record<number, EnglishVideo> = {
  1: {
    id: "7oYgP96pOfA",
    title: "Animal Groups & Characteristics Video Lesson",
    description: "Learn about mammals, reptiles, birds, amphibians, and fish completely in English! Understand feathers, wings, scales, skin, and gills.",
    duration: "4:15",
    channel: "English Singsing"
  },
  2: {
    id: "eObpT5hT3QA",
    title: "Wild Forest Animals & Verbs of Action",
    description: "Creep, hunt, escape, fight, peck! Practice active English action verbs and adverbs of frequency using forest animal stories.",
    duration: "5:30",
    channel: "English Learning Kids"
  },
  3: {
    id: "v8SiaAnWNo8",
    title: "What is Our World Made Of? Solids, Liquids, and Gases",
    description: "An interactive science video in English about the states of matter: solids, liquids, and gases around us.",
    duration: "6:10",
    channel: "Science Kids English"
  },
  4: {
    id: "yv3C8LskUss",
    title: "Let's Make Ice Cream! Process & Recipe",
    description: "A fun culinary video in English. Learn food preparation concepts, 'some' and 'any', and delicious ice cream vocabulary.",
    duration: "4:45",
    channel: "Kids English Cooking"
  },
  5: {
    id: "0Y-HCEUsh24",
    title: "Then and Now: History of Modern Communication",
    description: "Explore how letters, phones, and computers changed throughout history in English. Learn past simple tense 'was' and 'were'.",
    duration: "5:05",
    channel: "History Kids English"
  },
  6: {
    id: "A3q0Rss9OBo",
    title: "The Long Ago Living Room vs Modern Rooms",
    description: "A comparative travel back in time. Identify historical household items and practice past tense regular verbs ending in -ed.",
    duration: "4:50",
    channel: "Oxford English Kids"
  },
  7: {
    id: "UqY0D_NAt78",
    title: "Subtraction & Arithmetic Math in English",
    description: "English lesson covering mathematical terms, subtraction in action, and past simple irregular verbs.",
    duration: "3:55",
    channel: "Math Adventures Class"
  },
  8: {
    id: "X8Y7w3o0Ems",
    title: "Bandar the Greedy Monkey Story Lesson",
    description: "Rich listening activity of the famous monkey tale in English. Excellent for vocabulary training and past simple questions.",
    duration: "5:15",
    channel: "Bedtime Stories English"
  },
  9: {
    id: "HPPJYtCStSg",
    title: "Helpers in Our Community & City Jobs",
    description: "Learn about municipal helpers, firemen, doctors, and rules using modal verbs 'must' and 'must not' in English.",
    duration: "6:20",
    channel: "British Council LearnEnglish Kids"
  },
  10: {
    id: "yV3_I6M1sQA",
    title: "The Secret Sauce - Kitchen Cooking & Pronouns",
    description: "Learn kitchen phrases, recipe design, and direct object pronouns like him, her, it, them.",
    duration: "4:12",
    channel: "Happy English Channel"
  },
  11: {
    id: "73-XnKjCOv4",
    title: "How We Make Paper from Trees",
    description: "Detailed scientific process of paper production in English. Excellent for practicing present continuous for future actions.",
    duration: "5:10",
    channel: "National Geographic Kids English"
  },
  12: {
    id: "gpa7XofL5d4",
    title: "Plastic Fantastic? Environmental Science Unit",
    description: "An environment and recycling video lesson in English. Discover gerund objects (like/hate doing).",
    duration: "6:05",
    channel: "Save Our Planet English"
  },
  13: {
    id: "7e7V_SAn_V0",
    title: "Making Music & Beautiful Instruments",
    description: "Explore guitar, violin, flute, drums, and piano. Practice the infinitive of purpose 'to + verb' in English.",
    duration: "4:30",
    channel: "Music Lesson English"
  },
  14: {
    id: "hZ86xatKREk",
    title: "The Majestic Song of Whales & Oceans",
    description: "Inspirational documentary clip about ocean whales. Learn comparisons like larger than, more beautiful than.",
    duration: "5:40",
    channel: "NatGeo Kids Marine Biology"
  },
  15: {
    id: "v_Z0_lGZtEw",
    title: "From Farm to Table: Crop Superlatives",
    description: "Where does milk, wheat, and fruit come from? Compare farms with superlative adjectives (-est, most).",
    duration: "4:55",
    channel: "Farming Discovery English"
  },
  16: {
    id: "MToN_77QZg4",
    title: "The Vegetable Garden Growth & First Conditional",
    description: "Plants and garden ecology. Practice conditional clauses: 'If we water the seeds, they will grow.'",
    duration: "5:00",
    channel: "Garden Tales English"
  },
  17: {
    id: "Tk_W87FmS64",
    title: "Shapes and Geometry in Creative Art",
    description: "Discover shapes, lines, art, and prepositions of direction entirely in English.",
    duration: "4:22",
    channel: "Art History For Kids"
  },
  18: {
    id: "wDAKRE7Z0S8",
    title: "The Art of Origami Paper Folding",
    description: "Learn paper folding instructions carefully described with English adverbs of manner (slowly, carefully, perfectly).",
    duration: "5:50",
    channel: "Origami Fun English"
  }
};

const ALTERNATIVE_VIDEOS: Record<number, Array<{id: string; title: string; channel: string}>> = {
  1: [
    { id: "7oYgP96pOfA", title: "Animal Groups & Characteristics Lesson", channel: "English Singsing" },
    { id: "4S-CgOcl4m8", title: "Fun Animal Groups Song", channel: "Kids Learning Academy" },
    { id: "hV_2N5oQv-g", title: "Animal Classification Science Video", channel: "Dr. Binocs Show" }
  ],
  2: [
    { id: "eObpT5hT3QA", title: "Wild Forest Animals & Verbs of Action", channel: "English Learning Kids" },
    { id: "gX8mbyfOszg", title: "Action Verbs for Kids", channel: "Rock 'N Learn" },
    { id: "yUXz6m_mAnY", title: "Verbs of Action & Animals Movement", channel: "English Tree TV" }
  ],
  3: [
    { id: "v8SiaAnWNo8", title: "States of Matter: Solids, Liquids, Gases", channel: "Science Kids English" },
    { id: "jmm1J2yI9tk", title: "What is Matter? - Science Lesson for kids", channel: "Dr. Binocs Show" },
    { id: "Wy_9S_Otc00", title: "States of Matter Song for Kids", channel: "Learning Station" }
  ],
  4: [
    { id: "yv3C8LskUss", title: "Let's Make Ice Cream! Process & Recipe", channel: "Kids English Cooking" },
    { id: "vClm4Zz3-s8", title: "Fabulous Food: Quantifiers 'some' and 'any'", channel: "Woodward English" },
    { id: "V9Vb3E_E9S4", title: "Kitchen Vocabulary and Recipe Making", channel: "English Kids Class" }
  ],
  5: [
    { id: "0Y-HCEUsh24", title: "Then and Now: History of Modern Communication", channel: "History Kids English" },
    { id: "Rsc3_8bV0U0", title: "Past Simple Tense (was/were) Lesson", channel: "English Singsing" },
    { id: "Osw8pBEH70A", title: "How Phones and Letters Evolved", channel: "Curious Kid" }
  ],
  6: [
    { id: "A3q0Rss9OBo", title: "The Long Ago Living Room vs Modern Rooms", channel: "Oxford English Kids" },
    { id: "m6E2Z-uG6_Y", title: "Household items Past Tense -ed verbs", channel: "Grammar Kids TV" },
    { id: "8W41g-H_yE4", title: "Regular and Irregular Past Tense Story", channel: "British Council Kids" }
  ],
  7: [
    { id: "UqY0D_NAt78", title: "Subtraction & Arithmetic Math in English", channel: "Math Adventures Class" },
    { id: "qM7V6O8_m0A", title: "Basic Subtraction Math Terms", channel: "Math Antics" },
    { id: "73-XnKjCOv4", title: "Spelling and Mathematical Terms in Sentences", channel: "Kids Study English" }
  ],
  8: [
    { id: "X8Y7w3o0Ems", title: "Bandar the Greedy Monkey Story Lesson", channel: "Bedtime Stories English" },
    { id: "8u1E99vVj-M", title: "Storytelling Listening & Story Quiz", channel: "Oxford Reading Owl" },
    { id: "E619J9JtQj8", title: "The Greedy Monkey Fable with English Morals", channel: "Magicbox English" }
  ],
  9: [
    { id: "HPPJYtCStSg", title: "Helpers in Our Community & City Jobs", channel: "British Council LearnEnglish Kids" },
    { id: "hK1rTfO8hEw", title: "People Who Help Us: Community Helpers Lesson", channel: "English Singsing" },
    { id: "0WbJ98VeeV0", title: "Modal Verbs 'Must' and 'Must not' Rules", channel: "Club Exploro Kids" }
  ],
  10: [
    { id: "yV3_I6M1sQA", title: "The Secret Sauce - Kitchen Cooking & Pronouns", channel: "Happy English Channel" },
    { id: "X2Vf_tO8YmE", title: "Direct Object Pronouns (Him, Her, It, Them)", channel: "English Grammar Lesson" },
    { id: "zW_1g7M3kO9", title: "Cooking Vocabulary: Action Verbs & Pronouns", channel: "Games & Lessons" }
  ],
  11: [
    { id: "73-XnKjCOv4", title: "How We Make Paper from Trees", channel: "National Geographic Kids English" },
    { id: "eJ1V38O_Vj0", title: "Paper Production & Future Continuous Lesson", channel: "How It's Made Kids" },
    { id: "Y5Vb3gS7Zms", title: "Wood & Trees Recycle Process", channel: "Green School TV" }
  ],
  12: [
    { id: "gpa7XofL5d4", title: "Plastic Fantastic? Environmental Science Unit", channel: "Save Our Planet English" },
    { id: "z_Vb9Y3SkOw", title: "Recycling & Gerund Objects (Like/Hate doing)", channel: "English Singsing" },
    { id: "E99c-bV1mQ8", title: "Save our oceans! Kids Plastic Lesson", channel: "National Geographic Kids" }
  ],
  13: [
    { id: "7e7V_SAn_V0", title: "Making Music & Beautiful Instruments", channel: "Music Lesson English" },
    { id: "X_1g_k9O_s0", title: "Music Instruments Vocabulary & Game", channel: "Rock 'N Learn" },
    { id: "yY9g1v8Vms8", title: "Infinitive of Purpose: 'to + verb' Lesson", channel: "Learn English Kids" }
  ],
  14: [
    { id: "hZ86xatKREk", title: "The Majestic Song of Whales & Oceans", channel: "NatGeo Kids Marine Biology" },
    { id: "0w9V9b3kOms", title: "Ocean Life & Superlatives & Comparatives", channel: "English Singsing" },
    { id: "V92Vb_A_Sg4", title: "Whale Sounds and Sea Mammals Documentary", channel: "Curious Planet Kids" }
  ],
  15: [
    { id: "v_Z0_lGZtEw", title: "From Farm to Table: Crop Superlatives", channel: "Farming Discovery English" },
    { id: "mY9gS_P1kOw", title: "Comparative & Superlative Adjectives Lesson", channel: "Grammar Kids TV" },
    { id: "oW9V_Y3kmSw", title: "Farm Animals & Superlative Game for Kids", channel: "Interactive English Singsing" }
  ],
  16: [
    { id: "MToN_77QZg4", title: "The Vegetable Garden Growth & First Conditional", channel: "Garden Tales English" },
    { id: "gX8vUX_v_90", title: "First Conditional: 'If you plant seeds...'", channel: "Learn English ESL" },
    { id: "9Wb_A3vSkMs", title: "Vegetables and Gardening for Kids in English", channel: "Happy Learning Kids" }
  ],
  17: [
    { id: "Tk_W87FmS64", title: "Shapes and Geometry in Creative Art", channel: "Art History For Kids" },
    { id: "mX8v9b3kOS0", title: "Prepositions of Place & Direction in Art", channel: "English Singsing" },
    { id: "Vb9wA3SmgK4", title: "Geometric Shapes and Drawing Lesson", channel: "Kids Art Club" }
  ],
  18: [
    { id: "wDAKRE7Z0S8", title: "The Art of Origami Paper Folding", channel: "Origami Fun English" },
    { id: "zV9_Y3kA_k8", title: "Adverbs of Manner in English (slowly, carefully)", channel: "English Learning Class" },
    { id: "9W_3gK8Sm9o", title: "Folding Paper Craft Tutorial in English", channel: "Kids Craft World" }
  ]
};

const getYouTubeID = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

import {
  BookOpen,
  GraduationCap,
  ChevronRight,
  Sparkles,
  Volume2,
  Check,
  MessageSquare,
  X,
  Send,
  ArrowLeft,
  Settings,
  Brain,
  Award,
  Trophy,
  Coffee,
  RotateCcw,
  Sparkle,
  History,
  Info,
  Menu,
  Sun,
  Moon,
  Clock,
  Timer,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

const READING_PRESETS: Record<number, { imageUrl: string; credit: string }> = {
  1: {
    imageUrl: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=1000&auto=format&fit=crop&q=80",
    credit: "Savanna Animal Habitat"
  },
  2: {
    imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?w=1000&auto=format&fit=crop&q=80",
    credit: "Leo the Tiger Cat & Lily the Bird's Forest Adventure in the Whispering Woods"
  },
  3: {
    imageUrl: "https://images.unsplash.com/photo-1518081461904-9d8f136351c2?w=1000&auto=format&fit=crop&q=80",
    credit: "Solids, Liquids, and Gases: Ice melting"
  },
  4: {
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1000&auto=format&fit=crop&q=80",
    credit: "Making Delicious Ice Cream!"
  },
  5: {
    imageUrl: "https://images.unsplash.com/photo-1516248560030-7e61d8fcfe2b?w=1000&auto=format&fit=crop&q=80",
    credit: "Then and Now: Letters vs communication"
  },
  6: {
    imageUrl: "https://images.unsplash.com/photo-1534445831969-9acc74b127ba?w=1000&auto=format&fit=crop&q=80",
    credit: "Carlo and Grandpa story"
  },
  7: {
    imageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1141?w=1000&auto=format&fit=crop&q=80",
    credit: "Learning Math Subtraction"
  },
  8: {
    imageUrl: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=1000&auto=format&fit=crop&q=80",
    credit: "Bandar, the Greedy Monkey"
  },
  9: {
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1000&auto=format&fit=crop&q=80",
    credit: "Following safety rules in class"
  },
  10: {
    imageUrl: "https://images.unsplash.com/photo-1559251606-c623743a6d76?w=1000&auto=format&fit=crop&q=80",
    credit: "Please and Thank You Bear Poems"
  },
  11: {
    imageUrl: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=1000&auto=format&fit=crop&q=80",
    credit: "A Juice Carton and Paper recycling"
  },
  12: {
    imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1000&auto=format&fit=crop&q=80",
    credit: "How Music Makes Us Feel"
  },
  13: {
    imageUrl: "https://images.unsplash.com/photo-1571167823528-793130d22329?w=1000&auto=format&fit=crop&q=80",
    credit: "Playing Olga's Flute"
  },
  14: {
    imageUrl: "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=1000&auto=format&fit=crop&q=80",
    credit: "Forces and Movement: Playground Swing"
  },
  15: {
    imageUrl: "https://images.unsplash.com/photo-1533048324814-79b0a31982f1?w=1000&auto=format&fit=crop&q=80",
    credit: "The Two Stubborn Goats"
  },
  16: {
    imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1000&auto=format&fit=crop&q=80",
    credit: "Our Vegetable Garden"
  },
  17: {
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1000&auto=format&fit=crop&q=80",
    credit: "Shapes and Patterns in Art"
  },
  18: {
    imageUrl: "https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=1000&auto=format&fit=crop&q=80",
    credit: "The Origami Golden Crane"
  }
};

export default function App() {
  // State management
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("oxford_dark_mode");
    return saved !== null ? saved === "true" : true;
  });
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem("oxford_student_name") || "";
  });
  const [userHasEntered, setUserHasEntered] = useState<boolean>(() => {
    return sessionStorage.getItem("oxford_has_credentials") === "true";
  });

  // Custom login & register states
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authPasscode, setAuthPasscode] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [onlineCount, setOnlineCount] = useState<number>(1);
  const [onlineList, setOnlineList] = useState<string[]>([]);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>("");
  const [announcement, setAnnouncement] = useState<string>("");
  const [readingQuizAnswers, setReadingQuizAnswers] = useState<Record<string, number>>({});
  const [readingQuizQuestions, setReadingQuizQuestions] = useState<any[]>([]);
  const [quizShuffledNotice, setQuizShuffledNotice] = useState<boolean>(false);
  const [isPlayingAllVocab, setIsPlayingAllVocab] = useState<boolean>(false);
  const [showStreakCelebration, setShowStreakCelebration] = useState<boolean>(false);
  const [celebrationDays, setCelebrationDays] = useState<number>(7);

  // Dynamic Adaptive Timer States for quizzes
  const [timeLeft, setTimeLeft] = useState<number>(25);
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0);
  const [timedOutQuestions, setTimedOutQuestions] = useState<string[]>([]);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const [activeSegment, setActiveSegment] = useState<AppSection>(AppSection.HOME);
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<number>(1);
  const [userStreak, setUserStreak] = useState<number>(1);
  const [wordsLearnedCount, setWordsLearnedCount] = useState<number>(0);
  const [totalQuizzesTaken, setTotalQuizzesTaken] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // Active Tab/Sub-view inside Unit details: "vocabulary" | "grammar" | "reading" | "ai-coach" | "song" | "word-search" | "listening"
  const [unitTab, setUnitTab] = useState<"vocabulary" | "grammar" | "reading" | "ai-coach" | "song" | "word-search" | "listening">("vocabulary");

  // Reset tab to vocabulary when switching to a unit that doesn't have a song
  useEffect(() => {
    const targetUnit = OXFORD_UNITS.find((u) => u.number === selectedUnitNumber);
    if (unitTab === "song" && (!targetUnit || !targetUnit.song)) {
      setUnitTab("vocabulary");
    }
  }, [selectedUnitNumber, unitTab]);

  // Quiz customizer states
  const [quizSize, setQuizSize] = useState<number | "all">(5);
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({}); // questionId -> chosenIndex
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  // Sound & Speech states
  const [speakingWordId, setSpeakingWordId] = useState<string | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);

  // Sentence building unscramble state per unit
  const [scrambleProgress, setScrambleProgress] = useState<string[]>([]);
  const [scrambleCompleted, setScrambleCompleted] = useState<boolean>(false);
  const [scrambleError, setScrambleError] = useState<boolean>(false);

  // General AI Coach States
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [aiInputValue, setAiInputValue] = useState<string>("");
  const [isWaitingForAi, setIsWaitingForAi] = useState<boolean>(false);
  const [coachStatusMessage, setCoachStatusMessage] = useState<string>("");

  // Custom Profile Picture & YouTube video playlist states
  const [globalAvatar, setGlobalAvatar] = useState<string>(() => {
    return localStorage.getItem("oxford_chat_avatar") || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80";
  });
  const [showAvatarModal, setShowAvatarModal] = useState<boolean>(false);

  const [customUnitVideos, setCustomUnitVideos] = useState<Record<number, Array<{id: string; title: string; channel: string}>>>(() => {
    try {
      const saved = localStorage.getItem("oxford_custom_unit_videos");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });
  const [selectedVideoId, setSelectedVideoId] = useState<string>("");
  const [youtubeUrlInput, setYoutubeUrlInput] = useState<string>("");

  // Confirmation modal and progress hovered states
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [confirmModalConfig, setConfirmModalConfig] = useState<{
    title: string;
    message: string;
    subText?: string;
    actionType: "reset" | "delete";
  } | null>(null);
  const [hoveredProgressPoint, setHoveredProgressPoint] = useState<{
    index: number;
    x: number;
    y: number;
    date: string;
    count: number;
  } | null>(null);

  // Sync selected video when current unit changes
  useEffect(() => {
    if (selectedUnitNumber) {
      const defaultVideo = ENGLISH_VIDEOS_MAP[selectedUnitNumber];
      if (defaultVideo) {
        setSelectedVideoId(defaultVideo.id);
      }
    }
  }, [selectedUnitNumber]);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const autoProgressTimeoutRef = useRef<any>(null);
  const quizIntroTimeoutRef = useRef<any>(null);
  const isPlayingAllRef = useRef<boolean>(false);
  const utterancesRef = useRef<any[]>([]);

  // Stop synthesis and pending timers when user leaves/changes unit/segment/tab
  useEffect(() => {
    const handleStop = () => {
      isPlayingAllRef.current = false;
      setIsPlayingAllVocab(false);
      utterancesRef.current = [];
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setSpeakingWordId(null);
      setIsSynthesizing(false);

      if (autoProgressTimeoutRef.current) {
        clearTimeout(autoProgressTimeoutRef.current);
        autoProgressTimeoutRef.current = null;
      }
      if (quizIntroTimeoutRef.current) {
        clearTimeout(quizIntroTimeoutRef.current);
        quizIntroTimeoutRef.current = null;
      }
    };

    handleStop();

    return () => {
      handleStop();
    };
  }, [activeSegment, selectedUnitNumber, unitTab]);

  // Synchronize dark class on document element
  useEffect(() => {
    localStorage.setItem("oxford_dark_mode", darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Streak celebration modal state changes (auto-sound muted to honor user settings; user can click the speech button explicitly)
  useEffect(() => {
    if (showStreakCelebration) {
      // Auto-speech muted
    }
  }, [showStreakCelebration]);

  // Dynamic Adaptive Quiz Timer synchronization
  useEffect(() => {
    if (activeSegment === AppSection.QUIZ_MODE && !isQuizCompleted && activeQuestions.length > 0) {
      const q = activeQuestions[currentQuestionIdx];
      if (q) {
        const hasAnswered = q.id in quizAnswers;
        if (!hasAnswered) {
          const difficulty = getQuestionDifficulty(q);
          setTimeLeft(difficulty.seconds);
          setIsTimerActive(true);
        } else {
          setIsTimerActive(false);
        }
      }
    } else {
      setIsTimerActive(false);
    }
  }, [currentQuestionIdx, activeQuestions, activeSegment, isQuizCompleted]);

  // Live timer ticking and auto-handling of 0-second timeouts
  useEffect(() => {
    let interval: any = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsTimerActive(false);
            
            // Current question has run out of time
            const currentQ = activeQuestions[currentQuestionIdx];
            if (currentQ) {
              setTimedOutQuestions((skipped) => {
                if (!skipped.includes(currentQ.id)) {
                  return [...skipped, currentQ.id];
                }
                return skipped;
              });

              // Mark question selection as -1 (timeout state) to block modifications
              const nextAnswers = { ...quizAnswers, [currentQ.id]: -1 };
              setQuizAnswers(nextAnswers);

              playAudioCue("lose");
              speakWord("Time's up! Let's study more.");

              if (autoProgressTimeoutRef.current) clearTimeout(autoProgressTimeoutRef.current);
              autoProgressTimeoutRef.current = setTimeout(() => {
                setCurrentQuestionIdx((prevIdx) => {
                  if (prevIdx < activeQuestions.length - 1) {
                    return prevIdx + 1;
                  } else {
                    completeQuiz(nextAnswers);
                    return prevIdx;
                  }
                });
              }, 3000);
            }
            return 0;
          }
          return prev - 1;
        });
        setTotalTimeSpent((spent) => spent + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timeLeft, currentQuestionIdx, activeQuestions, quizAnswers]);

  // Persisted study stats
  useEffect(() => {
    const savedStreak = localStorage.getItem("oxford_streak");
    const savedWords = localStorage.getItem("oxford_words_learned");
    const savedQuizzes = localStorage.getItem("oxford_quizzes_taken");
    const savedBest = localStorage.getItem("oxford_best_score");

    if (savedStreak) {
      const parsed = parseInt(savedStreak);
      setUserStreak(parsed);
      // Auto celebrate on mount if active streak is 7 or 30 (or a week interval) and not celebrated in current session
      if ((parsed === 7 || parsed === 30 || (parsed > 0 && parsed % 7 === 0)) && !sessionStorage.getItem("oxford_celebrated_loaded")) {
        setTimeout(() => {
          setCelebrationDays(parsed);
          setShowStreakCelebration(true);
          sessionStorage.setItem("oxford_celebrated_loaded", "true");
        }, 1500);
      }
    }
    if (savedWords) setWordsLearnedCount(parseInt(savedWords));
    if (savedQuizzes) setTotalQuizzesTaken(parseInt(savedQuizzes));
    if (savedBest) setBestScore(parseInt(savedBest));
  }, []);

  // Fetch live announcement from Telegram bot
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await fetch("/api/get-announcement");
        if (!res.ok) return;
        const ct = res.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) return;
        const data = await res.json();
        if (data && typeof data.announcement === "string") {
          setAnnouncement(data.announcement);
        }
      } catch (e) {
        // Suppress unexpected token errors during server restart
      }
    };
    fetchAnnouncement();
    const interval = setInterval(fetchAnnouncement, 15000); // Poll every 15s
    return () => clearInterval(interval);
  }, []);

  // Sync state to backend server under custom user name
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetch("/api/sync-stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: studentName,
          wordsLearnedCount,
          totalQuizzesTaken,
          bestScore,
          userStreak,
        }),
      }).catch((err) => console.error("Could not sync statistics in background:", err));
    }, 1200); // 1.2s debounce to aggregate quick changes

    return () => clearTimeout(delayDebounce);
  }, [studentName, wordsLearnedCount, totalQuizzesTaken, bestScore, userStreak]);

  // Real-time online student heartbeat
  useEffect(() => {
    if (!studentName || !studentName.trim() || !userHasEntered) return;

    const runHeartbeat = async () => {
      try {
        const res = await fetch("/api/online-heartbeat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: studentName.trim() }),
        });
        if (!res.ok) return;
        const ct = res.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) return;
        const data = await res.json();
        if (data) {
          setOnlineCount(data.onlineCount || 1);
          setOnlineList(data.onlineList || [studentName.trim()]);
        }
      } catch (err) {
        // Suppress unexpected token errors during server restart
      }
    };

    runHeartbeat();
    const pulse = setInterval(runHeartbeat, 10000); // Send heartbeat every 10 seconds
    return () => clearInterval(pulse);
  }, [studentName, userHasEntered]);

  const incrementWordsLearned = (wordId: string) => {
    const key = `learned_${wordId}`;
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, "true");
      const nextCount = wordsLearnedCount + 1;
      setWordsLearnedCount(nextCount);
      localStorage.setItem("oxford_words_learned", nextCount.toString());
    }
  };

  const awardPoints = (points: number) => {
    const nextCount = wordsLearnedCount + points;
    setWordsLearnedCount(nextCount);
    localStorage.setItem("oxford_words_learned", nextCount.toString());
  };

  // Synthesize beautiful Web Audio API chimes for dynamic game-like audio cues
  const playAudioCue = (type: "win" | "unscramble" | "lose") => {
    try {
       const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
       if (!AudioContextClass) return;
       const ctx = new AudioContextClass();
       
       if (type === "unscramble") {
         // Correct unscramble double chime (e.g., C5 then G5)
         const now = ctx.currentTime;
         const osc = ctx.createOscillator();
         const gain = ctx.createGain();
         
         osc.type = "sine";
         osc.connect(gain);
         gain.connect(ctx.destination);
         
         osc.frequency.setValueAtTime(523.25, now); // C5
         osc.frequency.setValueAtTime(783.99, now + 0.12); // G5
         
         gain.gain.setValueAtTime(0, now);
         gain.gain.linearRampToValueAtTime(0.15, now + 0.03);
         gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
         
         osc.start(now);
         osc.stop(now + 0.5);
       } else if (type === "win") {
         // Magnificent upward major arpeggio for quiz completion: C5 (0.0s), E5 (0.08s), G5 (0.16s), C6 (0.24s)
         const now = ctx.currentTime;
         const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
         notes.forEach((freq, idx) => {
           const osc = ctx.createOscillator();
           const gain = ctx.createGain();
           osc.type = "triangle";
           osc.connect(gain);
           gain.connect(ctx.destination);
           
           const noteStart = now + idx * 0.08;
           osc.frequency.setValueAtTime(freq, noteStart);
           
           gain.gain.setValueAtTime(0, noteStart);
           gain.gain.linearRampToValueAtTime(0.12, noteStart + 0.02);
           gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.35);
           
           osc.start(noteStart);
           osc.stop(noteStart + 0.4);
         });
       } else if (type === "lose") {
         // Sad/retro slide tone down for errors and timeouts
         const now = ctx.currentTime;
         const osc = ctx.createOscillator();
         const gain = ctx.createGain();
         osc.type = "sawtooth";
         osc.connect(gain);
         gain.connect(ctx.destination);
         
         osc.frequency.setValueAtTime(293.66, now); // D4
         osc.frequency.exponentialRampToValueAtTime(146.83, now + 0.45); // D3 slide down
         
         gain.gain.setValueAtTime(0.12, now);
         gain.gain.linearRampToValueAtTime(0.10, now + 0.1);
         gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
         
         osc.start(now);
         osc.stop(now + 0.5);
       }
    } catch (err) {
      console.error("Audio cue failed to play:", err);
    }
  };

  // Speaks using Web Speech API with dynamic English vs Uzbek voice selection
  const speakWord = (word: string, id?: string) => {
    if ("speechSynthesis" in window) {
      if (id) {
        setSpeakingWordId(id);
      }
      setIsSynthesizing(true);
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);

      // Determine language
      const isUzbek = (text: string): boolean => {
        const lower = text.toLowerCase().trim();

        // High confidence Uzbek markers / apostrophes / letter sequences
        if (
          lower.includes("o'") || 
          lower.includes("g'") || 
          lower.includes("o‘") || 
          lower.includes("g‘") || 
          lower.includes("o’") || 
          lower.includes("g’") || 
          lower.includes("o`") ||
          lower.includes("g`0") ||
          lower.includes("g`1") ||
          lower.includes("g`2") ||
          lower.includes("g`3") ||
          lower.includes("g`4") ||
          lower.includes("g`5") ||
          lower.includes("g`6") ||
          lower.includes("g`7") ||
          lower.includes("g`8") ||
          lower.includes("g`9") ||
          lower.includes("o'b") ||
          lower.includes("o't") ||
          lower.includes("o'q") ||
          lower.includes("to'g'") ||
          lower.includes("o'ch") ||
          lower.includes("o'z") ||
          lower.includes("g'al") ||
          lower.includes("g'alaba") ||
          lower.includes("tizim") ||
          lower.includes("chiqish") ||
          lower.includes("kirish") ||
          lower.includes("akkaunt") ||
          lower.includes("parol") ||
          lower.includes("marhamat") ||
          lower.includes("muvaffaqiyat") ||
          lower.includes("noto'g'ri") ||
          lower.includes("yaxshi") ||
          lower.includes("alloh") ||
          lower.includes("allaqachon") ||
          lower.includes("savol") ||
          lower.includes("lug'at") ||
          lower.includes("tarjima") ||
          lower.includes("sinfdosh")
        ) {
          return true;
        }

        const uzbekWords = [
          "va", "uchun", "bilan", "ning", "dan", "ga", "da", "ni", "barcha", "o'quvchi", "ustoz", "sinf", "tizim", "kirish", "chiqish", "ro'yxat", "kod", "parol", "ism", "sinfdosh", "xato", "to'g'ri", "noto'g'ri", "ball", "yaxshi", "yulduz", "dars", "savol", "javob", "izoh", "tarjima", "maqsad", "lug'at", "mashq", "olma", "bosing", "tanlang", "yozing", "faol", "muloqot", "ishtirok", "hozircha", "yo'q", "hech", "kim"
        ];

        const englishWords = [
          "the", "and", "is", "are", "welcome", "you", "we", "ready", "correct", "incorrect", "excellent", "please", "enter", "passcode", "username", "this", "that", "unit", "words", "learned", "congratulations", "perfect", "let's", "discover"
        ];

        const tokens = lower.split(/[^a-zA-Z'‘`’gGoO]+/);
        let uzCount = 0;
        let enCount = 0;

        for (const token of tokens) {
          if (uzbekWords.includes(token)) uzCount++;
          if (englishWords.includes(token)) enCount++;
        }

        if (uzCount > enCount) return true;
        if (enCount > uzCount) return false;

        const uzPhrases = ["oching", "kirting", "belgilandi", "saqlandi", "tayyor", "yangi", "akkaunt", "kirish", "hush", "kelibsiz", "muvaffaqiyatli"];
        for (const ph of uzPhrases) {
          if (lower.includes(ph)) return true;
        }

        return false;
      };

      const isUz = isUzbek(word);
      let spokenText = word;

      if (isUz) {
        utterance.lang = "uz-UZ";
        utterance.rate = 0.95; // Natural speaking rate for Uzbek

        const voices = window.speechSynthesis.getVoices();
        let selectedVoice = voices.find(v => v.lang.startsWith("uz") || v.name.toLowerCase().includes("uzb") || v.lang.startsWith("uzb"));
        
        if (!selectedVoice) {
          // Playback fallback using Turkish pronunciation phonetics for Uzbek
          selectedVoice = voices.find(v => v.lang.startsWith("tr"));
          if (selectedVoice) {
            utterance.voice = selectedVoice;
            utterance.lang = "tr-TR";
            
            // Transform Uzbek spelling into Turkish phonetic text so the Turkish engine reads it beautifully!
            spokenText = spokenText
              // 1. Map Uzbek "ch" -> "ç", "sh" -> "ş"
              .replace(/ch/g, "ç").replace(/Ch/g, "Ç").replace(/CH/g, "Ç")
              .replace(/sh/g, "ş").replace(/Sh/g, "Ş").replace(/SH/g, "Ş")
              
              // 2. Map Uzbek "o'" / "g'" variants 
              .replace(/o‘/g, "ö").replace(/o’/g, "ö").replace(/o'/g, "ö").replace(/o`/g, "ö")
              .replace(/O‘/g, "Ö").replace(/O’/g, "Ö").replace(/O'/g, "Ö").replace(/O`/g, "Ö")
              .replace(/g‘/g, "ğ").replace(/g’/g, "ğ").replace(/g'/g, "ğ").replace(/g`/g, "ğ")
              .replace(/G‘/g, "Ğ").replace(/G’/g, "Ğ").replace(/G'/g, "Ğ").replace(/G`/g, "Ğ")

              // 3. Map "q" -> "k" (Turkish doesn't have Q, reads as "kü" or "ka")
              .replace(/q/g, "k").replace(/Q/g, "K")

              // 4. Map "x" -> "h" (Turkish doesn't have X, says "iks" which is very weird)
              .replace(/x/g, "h").replace(/X/g, "H")
              
              // 5. Strip isolated symbols
              .replace(/['‘`’]/g, "");
          }
        } else {
          utterance.voice = selectedVoice;
        }
      } else {
        utterance.lang = "en-US";
        utterance.rate = 0.85; // Natural learning pace
        
        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find(v => v.lang.startsWith("en-US") || v.lang.startsWith("en-GB"));
        if (enVoice) {
          utterance.voice = enVoice;
        }
      }

      // Strip markdown symbols before speaking
      utterance.text = spokenText.replace(/[*_#`~]/g, "");

      utterance.onend = () => {
        setSpeakingWordId(null);
        setIsSynthesizing(false);
      };
      utterance.onerror = () => {
        setSpeakingWordId(null);
        setIsSynthesizing(false);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sizning brauzeringizda nutq xizmati qo'llab-quvvatlanmaydi.");
    }
  };

  const playAllVocabList = async () => {
    if (isPlayingAllVocab) {
      isPlayingAllRef.current = false;
      setIsPlayingAllVocab(false);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setSpeakingWordId(null);
      setIsSynthesizing(false);
      return;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSynthesizing(true);
      isPlayingAllRef.current = true;
      setIsPlayingAllVocab(true);
      utterancesRef.current = [];
      
      const wordsList = currentUnit.vocabulary;
      for (let i = 0; i < wordsList.length; i++) {
        if (!isPlayingAllRef.current) break;

        const vocab = wordsList[i];
        setSpeakingWordId(vocab.id);
        incrementWordsLearned(vocab.id);
        
        const utterance = new SpeechSynthesisUtterance(vocab.word);
        utterance.lang = "en-US";
        utterance.rate = 0.8;

        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find(v => v.lang.startsWith("en-US") || v.lang.startsWith("en-GB"));
        if (enVoice) {
          utterance.voice = enVoice;
        }

        utterancesRef.current.push(utterance);

        const playPromise = new Promise<void>((resolve) => {
          utterance.onend = () => resolve();
          utterance.onerror = () => resolve();
        });

        window.speechSynthesis.speak(utterance);
        await playPromise;

        if (!isPlayingAllRef.current) break;

        // Custom pause between words so student can repeat
        await new Promise((resolve) => setTimeout(resolve, 1400));
      }

      setSpeakingWordId(null);
      setIsSynthesizing(false);
      isPlayingAllRef.current = false;
      setIsPlayingAllVocab(false);
      utterancesRef.current = [];
    }
  };

  // Find active unit data
  const currentUnit: OxfordUnit =
    OXFORD_UNITS.find((u) => u.number === selectedUnitNumber) || OXFORD_UNITS[0];

  // Dynamically compile interactive reading questions for this unit (predefined + dynamic fallback) with randomizer
  const initReadingQuestions = (unitNum = selectedUnitNumber) => {
    const targetUnit = OXFORD_UNITS.find((u) => u.number === unitNum) || OXFORD_UNITS[0];
    let pool: any[] = [];
    if (targetUnit.reading.questions && targetUnit.reading.questions.length > 0) {
      pool = [...targetUnit.reading.questions];
    }
    
    // Fallback/dynamic questions to enrich the question bank and provide more variety on retry
    const fallbackList: any[] = [];
    const vocab = targetUnit.vocabulary || [];
    
    // Fallback 1: Sentence translation
    const correctUz = targetUnit.reading.sentenceUz;
    const optA1 = "Ushbu sarlavha gapi ingliz tilida erkin so'zlashishni maslahat beradi.";
    const optB1 = "Keyingi muvaffaqiyatli boblarni o'rganish bo'yicha maxsus ko'rsatma.";
    fallbackList.push({
      id: `fallback_${unitNum}_q1`,
      questionEn: `What is the correct Uzbek translation of this sentence: "${targetUnit.reading.sentenceEn}"?`,
      questionUz: `Ushbu gapning to'g'ri o'zbekcha tarjimasi qaysi: "${targetUnit.reading.sentenceEn}"?`,
      options: [correctUz, optA1, optB1],
      correctIndex: 0,
      explanation: `Ushbu gapning tarjimasi darslik bo'limida: "${correctUz}"`
    });

    // Fallback 2: Vocabulary Q1
    if (vocab.length > 0) {
      const w1 = vocab[0];
      const optA2 = vocab[1] ? vocab[1].translation : "O'qish";
      const optB2 = vocab[2] ? vocab[2].translation : "Mashg'ulot";
      fallbackList.push({
        id: `fallback_${unitNum}_q2`,
        questionEn: `What does the word "${w1.word}" translate to in Uzbek?`,
        questionUz: `"${w1.word}" so'zining o'zbekcha tarjimasi qaysi?`,
        options: [w1.translation, optA2, optB2],
        correctIndex: 0,
        explanation: `"${w1.word}" so'zi darslik bo'yicha "${w1.translation}" deb tarjima qilinadi.`
      });
    }

    // Fallback 3: Vocabulary Q2
    if (vocab.length > 3) {
      const w3 = vocab[3];
      const optA3 = vocab[4] ? vocab[4].translation : "Do'stlik";
      const optB3 = vocab[5] ? vocab[5].translation : "O'yin";
      fallbackList.push({
        id: `fallback_${unitNum}_q3`,
        questionEn: `What is the meaning of the word "${w3.word}"?`,
        questionUz: `"${w3.word}" so'zi qanday ma'no anglatadi?`,
        options: [w3.translation, optA3, optB3],
        correctIndex: 0,
        explanation: `Ushbu so'z darslikdan olingan: "${w3.word}" = "${w3.translation}".`
      });
    }

    const combined = [...pool, ...fallbackList];
    // Shuffle the combined set of questions to show unique combinations on retry!
    const shuffledPool = [...combined].sort(() => Math.random() - 0.5);

    // Shuffle options of each question so they are in a different position every play
    const randomizedQuestions = shuffledPool.map((q) => {
      const correctOptionText = q.options[q.correctIndex];
      const shuffledOpts = [...q.options].sort(() => Math.random() - 0.5);
      const newIndex = shuffledOpts.indexOf(correctOptionText);
      return {
        ...q,
        options: shuffledOpts,
        correctIndex: newIndex === -1 ? 0 : newIndex
      };
    });

    // Take 3 random questions from the randomized array
    setReadingQuizQuestions(randomizedQuestions.slice(0, 3));
  };

  const getReadingQuestions = () => {
    if (readingQuizQuestions && readingQuizQuestions.length > 0) {
      return readingQuizQuestions;
    }
    // Static fallback block
    return (currentUnit.reading.questions || []).slice(0, 3);
  };

  // Scramble word puzzle and reading questions initializer
  useEffect(() => {
    if (currentUnit) {
      // Split sentence into lowercase words for scramble (excluding punctuation)
      const cleanWords = currentUnit.reading.sentenceEn
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .split(" ")
        .filter((w) => w.trim().length > 0);

      // Simple randomize
      const shuffled = [...cleanWords].sort(() => Math.random() - 0.5);
      setScrambleProgress([]);
      setScrambleCompleted(false);
      setScrambleError(false);
      setReadingQuizAnswers({});
      initReadingQuestions(selectedUnitNumber);
    }
  }, [selectedUnitNumber]);

  // Scroll AI messages to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isWaitingForAi]);

  // Launch customized quiz session
  const initQuiz = (singleUnitOnly?: boolean) => {
    let rawList = [...QUIZ_QUESTIONS];
    if (singleUnitOnly) {
      // Filter existing crafted questions for this unit
      const crafted = rawList.filter((q) => q.unitNumber === selectedUnitNumber);
      
      // We want to support up to 15 questions.
      // To provide a deep pool, we can pull all available vocabulary words and generate
      // both English-to-Uzbek & Uzbek-to-English variations for each unit vocabulary word,
      // guaranteeing plenty of questions (up to 30 vocab questions + pre-crafted tests).
      const vocabQuestions: QuizQuestion[] = [];
      
      currentUnit.vocabulary.forEach((v, index) => {
        // Gather other vocabulary items from same unit for distractors
        const distractors = currentUnit.vocabulary.filter((item) => item.id !== v.id);

        if (distractors.length >= 3) {
          // 1. English to Uzbek question variation
          const otherTranslations = distractors.map((item) => item.translation).sort(() => Math.random() - 0.5);
          const wrongOptionsUzb = otherTranslations.slice(0, 3);
          const rawOptionsUzb = [v.translation, ...wrongOptionsUzb];
          const optionsUzb = [...rawOptionsUzb].sort(() => Math.random() - 0.5);
          const correctIndexUzb = optionsUzb.indexOf(v.translation);

          vocabQuestions.push({
            id: `q_vocab_en_uz_${v.id}`,
            unitNumber: selectedUnitNumber,
            question: `"${v.word}" so'zining to'g'ri o'zbekcha tarjimasini tanlang:`,
            options: optionsUzb,
            correctIndex: correctIndexUzb,
            explanation: `"${v.word}" so'zi o'zbek tiliga "${v.translation}" deb tarjima qilinadi.`,
          });

          // 2. Uzbek to English question variation
          const otherWords = distractors.map((item) => item.word).sort(() => Math.random() - 0.5);
          const wrongOptionsEng = otherWords.slice(0, 3);
          const rawOptionsEng = [v.word, ...wrongOptionsEng];
          const optionsEng = [...rawOptionsEng].sort(() => Math.random() - 0.5);
          const correctIndexEng = optionsEng.indexOf(v.word);

          vocabQuestions.push({
            id: `q_vocab_uz_en_${v.id}`,
            unitNumber: selectedUnitNumber,
            question: `O'zbekcha "${v.translation}" so'zining inglizcha tarjimasi nima?`,
            options: optionsEng,
            correctIndex: correctIndexEng,
            explanation: `"${v.translation}" so'zining inglizcha tarjimasi "${v.word}" bo'ladi.`,
          });
        }
      });

      // Filter to this unit
      const combined = [...crafted, ...vocabQuestions];
      // Randomize the combined set
      rawList = combined.sort(() => Math.random() - 0.5);
    }

    // Shuffle questions
    const shuffled = rawList.sort(() => Math.random() - 0.5);
    const size = singleUnitOnly 
      ? Math.min(15, shuffled.length) 
      : (quizSize === "all" ? shuffled.length : Math.min(quizSize, shuffled.length));
    
    setActiveQuestions(shuffled.slice(0, size));
    setCurrentQuestionIdx(0);
    setQuizAnswers({});
    setIsQuizCompleted(false);
    
    // Reset performance and timer tracking states for a fresh attempt
    setTotalTimeSpent(0);
    setTimedOutQuestions([]);
    setIsTimerActive(true);

    setActiveSegment(AppSection.QUIZ_MODE);

    // Speak intro automatically removed to honor 'Do not read test automatically'
    if (quizIntroTimeoutRef.current) clearTimeout(quizIntroTimeoutRef.current);
  };

  // Submit Answer & Auto pronounce feedback
  const chooseQuizAnswer = (questionId: string, optionIdx: number) => {
    if (questionId in quizAnswers) return; // Prevent change

    // Pause timer countdown once an answer is locked in
    setIsTimerActive(false);

    const nextAnswers = { ...quizAnswers, [questionId]: optionIdx };
    setQuizAnswers(nextAnswers);

    const q = activeQuestions.find((ques) => ques.id === questionId);
    if (q) {
      const isCorrect = optionIdx === q.correctIndex;
      if (!isCorrect) {
        playAudioCue("lose");
      }

      // Auto progress after a friendly 1.8s delay (whether the answer is correct or incorrect)
      if (autoProgressTimeoutRef.current) clearTimeout(autoProgressTimeoutRef.current);
      autoProgressTimeoutRef.current = setTimeout(() => {
        setCurrentQuestionIdx((prevIdx) => {
          const currentQ = activeQuestions[prevIdx];
          if (currentQ && currentQ.id === questionId) {
            if (prevIdx < activeQuestions.length - 1) {
              const nextQIdx = prevIdx + 1;
              const nextQ = activeQuestions[nextQIdx];
              return nextQIdx;
            } else {
              completeQuiz(nextAnswers);
              return prevIdx;
            }
          }
          return prevIdx;
        });
      }, 1800);
    }
  };

  // Finish quiz stats
  const completeQuiz = (latestAnswers?: Record<string, number>) => {
    setIsQuizCompleted(true);
    playAudioCue("win");
    const answers = latestAnswers || quizAnswers;
    const correctCount = activeQuestions.reduce((sum, q) => {
      return sum + (answers[q.id] === q.correctIndex ? 1 : 0);
    }, 0);

    const finalPercent = Math.round((correctCount / activeQuestions.length) * 100);
    const prevBest = parseInt(localStorage.getItem("oxford_best_score") || "0");
    if (finalPercent > prevBest) {
      setBestScore(finalPercent);
      localStorage.setItem("oxford_best_score", finalPercent.toString());
    }

    const nextQuizzes = totalQuizzesTaken + 1;
    setTotalQuizzesTaken(nextQuizzes);
    localStorage.setItem("oxford_quizzes_taken", nextQuizzes.toString());

    // Update streak dynamically
    const nextStreak = userStreak + 1;
    setUserStreak(nextStreak);
    localStorage.setItem("oxford_streak", nextStreak.toString());

    if (nextStreak === 7 || nextStreak === 30 || (nextStreak > 0 && nextStreak % 7 === 0)) {
      setTimeout(() => {
        setCelebrationDays(nextStreak);
        setShowStreakCelebration(true);
      }, 1500);
    }
  };

  // Sentence Building handlers
  const getScrambledAvailableWords = (): string[] => {
    const cleanWords = currentUnit.reading.sentenceEn
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .split(" ")
      .filter((w) => w.trim().length > 0);

    // Count occurrences in progress so we don't map twice
    const currentCounts: Record<string, number> = {};
    scrambleProgress.forEach((w) => {
      currentCounts[w] = (currentCounts[w] || 0) + 1;
    });

    return cleanWords.filter((word) => {
      const allowedCount = cleanWords.filter((w) => w === word).length;
      const parsedCount = currentCounts[word] || 0;
      return parsedCount < allowedCount;
    });
  };

  const handleWordClick = (word: string) => {
    if (scrambleCompleted) return;
    const updated = [...scrambleProgress, word];
    setScrambleProgress(updated);
    speakWord(word);

    // Verify when length matches
    const cleanTargetWords = currentUnit.reading.sentenceEn
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .split(" ")
      .filter((w) => w.trim().length > 0);

    if (updated.length === cleanTargetWords.length) {
      const parsedSentence = updated.join(" ");
      const correctText = cleanTargetWords.join(" ");
      if (parsedSentence === correctText) {
        setScrambleCompleted(true);
        setScrambleError(false);
        playAudioCue("unscramble");
        speakWord("Bravo! Perfect sentence structure.");
        incrementWordsLearned(`sentence_unit_${selectedUnitNumber}`);
      } else {
        setScrambleError(true);
        speakWord("Incorrect arrangement. Try resetting the sentence.");
      }
    }
  };

  const resetScramble = () => {
    setScrambleProgress([]);
    setScrambleCompleted(false);
    setScrambleError(false);
    speakWord("Reset");
  };

  // Communicate with backend AI Coach API safely
  const handleSendAiMessage = async () => {
    if (!aiInputValue.trim() || isWaitingForAi) return;

    const userText = aiInputValue.trim();
    setAiInputValue("");

    const newMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      role: "user",
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const nextMessages = [...chatMessages, newMsg];
    setChatMessages(nextMessages);
    setIsWaitingForAi(true);
    setCoachStatusMessage("AI Ustoz o'ylamoqda...");

    try {
      const response = await fetch("/api/ai-coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          currentLevel: 2,
          topic: currentUnit ? `${currentUnit.title} - ${currentUnit.grammar.title}` : "General Study",
          type: "explain_grammar",
          unitDetails: currentUnit,
        }),
      });

      if (!response.ok) {
        throw new Error("Xizmat xatosi");
      }

      const ct = response.headers.get("content-type");
      if (!ct || !ct.includes("application/json")) {
        throw new Error("Format xatosi");
      }

      const data = await response.json();
      const aiReply: ChatMessage = {
        id: `m_ai_${Date.now()}`,
        role: "assistant",
        content: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatMessages((prev) => [...prev, aiReply]);
      
      // Attempt to read the core response intro
      const speechIntro = data.content.substring(0, 100).replace(/[*`#_]/g, "");
      speakWord(speechIntro);
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => [
        ...prev,
        {
          id: `m_err_${Date.now()}`,
          role: "assistant",
          content: "Kechirasiz, sun'iy intellekt xizmati bilan aloqa o'rnatib bo'lmadi. Sozlamalarda GEMINI_API_KEY borligini tekshiring.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsWaitingForAi(false);
      setCoachStatusMessage("");
    }
  };

  // Load contextual pre-defined starters
  const loadChatStarter = (starterText: string) => {
    setAiInputValue(starterText);
    speakWord(starterText);
  };

  const getBigQuestionForUnit = (unitNo: number) => {
    return BIG_QUESTIONS.find((bq) => bq.units.includes(unitNo));
  };

  const getUnitDifficulty = (unitNo: number) => {
    // Collect all quiz questions for this unit from the QUIZ_QUESTIONS bank
    const matchedQs = QUIZ_QUESTIONS.filter((q) => q.unitNumber === unitNo);
    
    let scores: number[] = [];
    
    if (matchedQs.length > 0) {
      matchedQs.forEach((q) => {
        // Calculate comprehension score for each question
        // 100 is maximum score (easiest), 0 is hardest.
        const wordCount = q.question.split(/\s+/).filter(Boolean).length;
        let score = 95;
        
        if (wordCount > 12) score -= 25;
        else if (wordCount > 7) score -= 12;
        
        if (q.question.includes("_____") || q.question.toLowerCase().includes("choose") || q.question.toLowerCase().includes("select")) {
          score -= 15;
        }
        
        const optsLength = q.options.reduce((sum, o) => sum + o.length, 0);
        if (optsLength > 40) score -= 10;
        
        scores.push(score);
      });
    }
    
    // Also factor in vocabulary words length and count
    const unitObj = OXFORD_UNITS.find((u) => u.number === unitNo);
    if (unitObj) {
      const vocabCount = unitObj.vocabulary.length;
      // More vocabulary to memorize reduces the comprehension ease score (makes it slightly harder)
      const vocabPenalty = Math.min(15, vocabCount * 1.5);
      
      // Reading sentence length and grammar complexity
      const sentenceLength = unitObj.reading.sentenceEn.split(/\s+/).length;
      const readingPenalty = Math.min(10, sentenceLength * 0.8);
      
      const baselineScore = 90 - vocabPenalty - readingPenalty;
      scores.push(baselineScore);
    }
    
    const avgScore = Math.min(95, Math.max(30, Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)));
    
    // Determine Easy, Medium, Hard based on comprehension score (higher score = easier)
    // - Oson (Easy): score >= 75
    // - O'rtacha (Medium): score >= 64 && score < 75
    // - Qiyin (Hard): score < 64
    if (avgScore >= 75) {
      return {
        score: avgScore,
        level: "Easy",
        color: "text-emerald-700 bg-emerald-50/70 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/30",
        badge: "🟢 Easy",
        description: "90% tushunish koeffitsiyenti"
      };
    } else if (avgScore >= 64) {
      return {
        score: avgScore,
        level: "Medium",
        color: "text-amber-700 bg-amber-50/75 border-amber-200 dark:text-amber-400 dark:bg-amber-950/30",
        badge: "🟡 Medium",
        description: "70% tushunish koeffitsiyenti"
      };
    } else {
      return {
        score: avgScore,
        level: "Hard",
        color: "text-rose-700 bg-rose-50/70 border-rose-200 dark:text-rose-400 dark:bg-rose-950/30",
        badge: "🔴 Hard",
        description: "50% tushunish koeffitsiyenti"
      };
    }
  };

  const getQuestionDifficulty = (q: QuizQuestion) => {
    if (!q) {
      return { level: "Oson (Easy)", seconds: 15, color: "text-emerald-600 bg-emerald-50/50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/20", emoji: "🟢" };
    }
    const wordCount = q.question.split(/\s+/).filter(Boolean).length;
    if (wordCount <= 7) {
      return {
        level: "Oson (Easy)",
        seconds: 15,
        color: "text-emerald-600 bg-emerald-50/50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/20",
        emoji: "🟢"
      };
    } else if (wordCount >= 13 || q.question.includes("_____") || (q.explanation && q.explanation.length > 80)) {
      return {
        level: "Qiyin (Hard)",
        seconds: 40,
        color: "text-rose-600 bg-rose-50/50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/20",
        emoji: "🔴"
      };
    } else {
      return {
        level: "O'rtacha (Medium)",
        seconds: 25,
        color: "text-amber-600 bg-amber-50/50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/20",
        emoji: "🟡"
      };
    }
  };

  const handleAuthSubmit = async (mode: "login" | "register") => {
    if (!studentName || !studentName.trim()) {
      setAuthError("Iltimos, ismingizni kiriting!");
      speakWord("Please enter your name!");
      return;
    }
    if (!authPasscode || !authPasscode.trim()) {
      setAuthError("Iltimos, maxfiy kodni kiriting!");
      speakWord("Please enter passcode!");
      return;
    }

    setAuthError("");
    setAuthLoading(true);

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: studentName.trim(),
          passcode: authPasscode.trim()
        })
      });

      const ct = response.headers.get("content-type");
      if (!response.ok || !ct || !ct.includes("application/json")) {
        let errMsg = "Ulanish tushmadi.";
        if (ct && ct.includes("application/json")) {
          const errData = await response.json();
          errMsg = errData.error || errMsg;
        }
        setAuthError(errMsg);
        setAuthLoading(false);
        speakWord(errMsg);
        return;
      }

      const data = await response.json();
      if (data && data.user) {
        const cleanName = data.user.username;
        setStudentName(cleanName);
        
        if (mode === "register") {
          const keysToRemove: string[] = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.startsWith("learned_") || (key.startsWith("oxford_") && key !== "oxford_dark_mode"))) {
              keysToRemove.push(key);
            }
          }
          keysToRemove.forEach((key) => localStorage.removeItem(key));
        }

        // Load stats from returned database to preserve level/rating!
        setWordsLearnedCount(data.user.wordsLearnedCount || 0);
        setTotalQuizzesTaken(data.user.totalQuizzesTaken || 0);
        setBestScore(data.user.bestScore || 0);
        setUserStreak(data.user.userStreak || 1);

        // Update local memory
        localStorage.setItem("oxford_student_name", cleanName);
        localStorage.setItem("oxford_streak", (data.user.userStreak || 1).toString());
        localStorage.setItem("oxford_words_learned", (data.user.wordsLearnedCount || 0).toString());
        localStorage.setItem("oxford_quizzes_taken", (data.user.totalQuizzesTaken || 0).toString());
        localStorage.setItem("oxford_best_score", (data.user.bestScore || 0).toString());

        // Set session state
        sessionStorage.setItem("oxford_has_credentials", "true");
        setUserHasEntered(true);
        setAuthPasscode("");

        speakWord(`Welcome to Oxford Discover, ${cleanName}!`);

        // Trigger heartbeat
        fetch("/api/online-heartbeat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: cleanName })
        }).then(res => {
          if (!res.ok) return null;
          const heartbeatCt = res.headers.get("content-type");
          if (!heartbeatCt || !heartbeatCt.includes("application/json")) return null;
          return res.json();
        }).then(oData => {
          if (oData) {
            setOnlineCount(oData.onlineCount || 1);
            setOnlineList(oData.onlineList || [cleanName]);
          }
        }).catch(() => {});
      }
    } catch (e) {
      setAuthError("Tizimga ulanishda xato yuz berdi.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogOutPortal = () => {
    sessionStorage.removeItem("oxford_has_credentials");
    setUserHasEntered(false);
    setAuthPasscode("");
    setAuthError("");
    setWordsLearnedCount(0);
    setTotalQuizzesTaken(0);
    setBestScore(0);
    setUserStreak(1);
    
    // Clear stored stats & student name so they start fresh
    localStorage.removeItem("oxford_student_name");
    localStorage.removeItem("oxford_streak");
    localStorage.removeItem("oxford_words_learned");
    localStorage.removeItem("oxford_quizzes_taken");
    localStorage.removeItem("oxford_best_score");
    speakWord("Signed out of your study account successfully.");
  };

  if (!userHasEntered) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-tr from-[#002147] via-[#0b1b33] to-[#122b54] flex items-center justify-center p-4 relative overflow-hidden" id="login-welcome-gate">
        {/* Abstract background blobs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />

        <div className="w-full max-w-md bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-center z-10 animate-fade-in">
          {/* Logo badge */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-lg text-white text-3xl">
            🎓
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-black text-[#002147] uppercase tracking-wider font-sans">
              Oxford Discover
            </h1>
            <p className="text-xs text-slate-500 font-bold font-mono">
              Family & Friends Learning Portal
            </p>
          </div>

          {/* Tab switches for Login / Register */}
          <div className="grid grid-cols-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/40">
            <button
              onClick={() => {
                setAuthMode("login");
                setAuthError("");
              }}
              className={`py-3 text-xs font-black uppercase rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border-0 ${
                authMode === "login"
                  ? "bg-red-600 text-white shadow-md font-extrabold"
                  : "text-slate-500 hover:text-slate-800 bg-transparent"
              }`}
            >
              <span>🔑 Kirish (Login)</span>
            </button>
            <button
              onClick={() => {
                setAuthMode("register");
                setAuthError("");
              }}
              className={`py-3 text-xs font-black uppercase rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border-0 ${
                authMode === "register"
                  ? "bg-red-600 text-white shadow-md font-extrabold"
                  : "text-slate-500 hover:text-slate-800 bg-transparent"
              }`}
            >
              <span>🆕 Yangi Akkaunt</span>
            </button>
          </div>

          {/* Form details */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 text-left space-y-4">
            
            {/* Field 1: Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-[#002147] uppercase tracking-widest leading-none">
                👤 O'quvchi ismi (Name):
              </label>
              <input
                type="text"
                placeholder="Masalan: Solih"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAuthSubmit(authMode);
                }}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all shadow-inner"
                maxLength={25}
                id="student-entry-name-input"
              />
            </div>

            {/* Field 2: Password / Entry code */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-[#002147] uppercase tracking-widest leading-none">
                🔑 {authMode === "login" ? "Maxfiy kod (Passcode):" : "Yangi maxfiy kod yarating:"}
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={authMode === "login" ? "Kodingizni kiriting..." : "Masalan: 5555"}
                  value={authPasscode}
                  onChange={(e) => setAuthPasscode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAuthSubmit(authMode);
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl pl-4 pr-11 py-3 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-550 transition-all shadow-inner"
                  maxLength={15}
                  id="student-entry-passcode-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 p-1 text-slate-500 hover:text-slate-700 dark:hover:text-amber-500 transition-colors focus:outline-none cursor-pointer text-base bg-transparent border-0"
                  title={showPassword ? "Kodni yashirish (Hide passcode)" : "Kodni ko'rsatish (Show passcode)"}
                  id="toggle-passcode-visibility-btn"
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            {authError && (
              <p className="text-red-650 text-xs font-black bg-red-50 p-2.5 rounded-lg border border-red-200 leading-tight">
                ⚠️ {authError}
              </p>
            )}

            <p className="text-[10px] text-slate-500 leading-normal">
              {authMode === "login" 
                ? "Oldin yaratgan ismingiz va maxfiy kodingiz yordamida kiring. Shunda o'rgangan darajangiz (Level) va dars natijalaringiz joyida tiklanadi." 
                : "Yangi akkaunt ochish darslarni mutlaqo noldan boshlaydi (eski natijalarni butunlay o'chirib yuboradi) hamda sizga yangi maxfiy kod o'rnatadi!"}
            </p>
          </div>

          <button
            onClick={() => handleAuthSubmit(authMode)}
            disabled={authLoading}
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] shadow-md flex items-center justify-center gap-2 cursor-pointer border-0 disabled:opacity-50"
            id="student-entry-submit-btn"
          >
            {authLoading ? (
              <span>Ulanmoqda... ⏳</span>
            ) : authMode === "login" ? (
              <span>Darsni davom ettirish 🚀 (Enter Study)</span>
            ) : (
              <span>Yangi Akkaunt yaratish ✨ (Start New)</span>
            )}
          </button>

          {/* Real-time Online count in entry portal */}
          {onlineCount > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-[11px] text-emerald-800 font-semibold shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Hozir {onlineCount} ta o'quvchi online dars qilmoqda!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-[#F0F2F5] text-[#1A202C] overflow-hidden font-sans relative" id="app-portal">
      {/* MOBILE DRAWER BACKDROP CLOSER */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity duration-300 cursor-pointer"
          id="mobile-drawer-backdrop-overlay"
        />
      )}

      {/* SIDEBAR - OXFORD DISCOVER NAVIGATION */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-80 bg-oxford-blue text-white flex flex-col shadow-2xl lg:shadow-none h-full transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        id="side-nav-bar"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-950/20">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-oxford-crimson rounded-lg text-white">
                <GraduationCap className="w-5 h-5 font-bold" />
              </span>
              <span className="font-extrabold text-lg tracking-wide text-oxford-crimson">OXFORD DISCOVER</span>
            </div>
            <p className="text-slate-400 text-xs mt-1 font-medium select-none">Ingliz tili mustahkam ustozi</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
            aria-label="Sidebar yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable list of 18 units grouped under 9 Big Questions */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-4" id="sidebar-scrollable-content">
          <div className="px-3 space-y-2">
            <button
              onClick={() => {
                setActiveSegment(AppSection.HOME);
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`w-full text-left font-bold px-4 py-3 rounded-xl flex items-center justify-between transition-all ${
                activeSegment === AppSection.HOME
                  ? "bg-oxford-crimson text-white shadow-md"
                  : "bg-white/5 text-slate-200 hover:bg-white/10"
              }`}
              id="sidebar-home-btn"
            >
              <span className="flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4" />
                Asosiy Boshqaruv
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setActiveSegment(AppSection.CHAT_ROOM);
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`w-full text-left font-bold px-4 py-3 rounded-xl flex items-center justify-between transition-all ${
                activeSegment === AppSection.CHAT_ROOM
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-white/5 text-slate-200 hover:bg-white/10"
              }`}
              id="sidebar-chat-btn"
            >
              <span className="flex items-center gap-2 text-sm">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                Suhbat Room (Live Chat)
              </span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Core navigation divider */}
          <div className="px-3 py-1">
            <div className="h-px bg-slate-700/50 w-full" />
          </div>

          <div className="space-y-4">
            <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider px-3">
              Mavzular & Unitlar (1 - 18)
            </h4>

            {BIG_QUESTIONS.map((bq) => (
              <div key={bq.number} className="space-y-1 bg-white/3 p-2 rounded-xl border border-white/5">
                <p className="text-[10px] text-red-400 font-bold px-2 select-none uppercase tracking-wide">
                  Q{bq.number}: {bq.text}
                </p>

                <div className="space-y-1 mt-1.5">
                  {bq.units.map((uNum) => {
                    const unitObj = OXFORD_UNITS.find((ou) => ou.number === uNum);
                    if (!unitObj) return null;
                    const isSelected = selectedUnitNumber === uNum && activeSegment !== AppSection.HOME;
                    return (
                      <button
                        key={uNum}
                        id={`sidemenu-unit-${uNum}`}
                        onClick={() => {
                          setSelectedUnitNumber(uNum);
                          setActiveSegment(AppSection.UNIT_DETAIL);
                          if (window.innerWidth < 1024) setSidebarOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg flex items-start gap-2.5 transition-all text-xs ${
                          isSelected
                            ? "bg-oxford-crimson text-white font-bold shadow-md border-l-4 border-white/40"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span className={`inline-flex items-center justify-center font-bold px-1.5 py-0.5 rounded text-[10px] select-none ${
                          isSelected ? "bg-white text-oxford-crimson" : "bg-white/10 text-slate-300"
                        }`}>
                          U{uNum}
                        </span>
                        <span className="flex-1 truncate inline-block text-left pt-0.5">{unitObj.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info in sidebar with dynamic persistence */}
        <div className="p-4 bg-slate-950/40 text-xs text-slate-400 space-y-2 select-none border-t border-white/5">
          <div className="flex justify-between items-center">
            <span>Muvaffaqiyatli dars:</span>
            <span className="text-oxford-crimson font-bold">{wordsLearnedCount} ball</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="bg-oxford-crimson h-full"
              style={{ width: `${Math.min(100, (wordsLearnedCount / 120) * 100)}%` }}
            ></div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-1 flex flex-col h-full bg-[#F8FAFC] relative overflow-hidden" id="main-portal">
        {/* MOBILE OVERLAY FOR SIDEBAR */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="md:hidden fixed inset-0 z-20 bg-slate-900/50 backdrop-blur-xs"
          ></div>
        )}

        {/* TOP BAR / NAVIGATION HEADER */}
        <header className="min-h-[75px] py-3 md:py-0 md:h-[75px] bg-white border-b border-slate-200 flex flex-wrap items-center justify-between px-4 md:px-8 gap-3 shrink-0 z-10" id="portal-header">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-[180px]">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Mavzularni ko'rsatish"
              id="hamburger-btn"
            >
              <Menu className="w-5 h-5" />
            </button>
 
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h2 className="text-sm sm:text-lg md:text-xl font-bold text-oxford-blue tracking-tight truncate max-w-[140px] sm:max-w-xs md:max-w-md">
                  {activeSegment === AppSection.HOME ? "Xush kelibsiz!" : currentUnit.title}
                </h2>
                {activeSegment !== AppSection.HOME && (
                  <span className="text-[10px] sm:text-xs bg-blue-50 text-blue-800 border border-blue-200 px-1.5 py-0.5 rounded font-bold font-serif select-none shrink-0">
                    Unit {currentUnit.number}
                  </span>
                )}
              </div>
              <p className="text-slate-500 text-[10px] sm:text-xs truncate max-w-[220px] sm:max-w-sm md:max-w-md hidden xs:block">
                {activeSegment === AppSection.HOME
                  ? "Biz o'rganishni keyingi bosqichga olib chiqamiz!"
                  : `Big Question: ${getBigQuestionForUnit(currentUnit.number)?.text}`}
              </p>
            </div>
          </div>
 
          <div className="flex items-center gap-3 sm:gap-6 ml-auto shrink-0">
            <div className="flex items-center gap-2">
              {/* Profile Avatar Trigger Button */}
              <button
                onClick={() => setShowAvatarModal(true)}
                className="relative group cursor-pointer focus:outline-none shrink-0"
                title="Rasmingizni xohlagancha o'zgartiring"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-amber-400 hover:border-oxford-crimson bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-all shadow-sm">
                  {globalAvatar ? (
                    <img 
                      src={globalAvatar} 
                      alt="Student" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-slate-705 dark:text-slate-200 font-extrabold text-xs">
                      {studentName ? studentName.charAt(0).toUpperCase() : "S"}
                    </span>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-0.5 bg-amber-500 hover:bg-oxford-crimson text-white rounded-full p-0.5 border border-white shadow-xs transition-colors scale-90 sm:scale-100">
                  <span className="text-[8px] sm:text-[9.5px] block leading-none p-0.5">📷</span>
                </div>
              </button>
 
              <div className="hidden sm:flex flex-col text-right">
                {isEditingName ? (
                  <div className="flex items-center gap-1.5 justify-end">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (tempName.trim()) {
                            setStudentName(tempName.trim());
                            localStorage.setItem("oxford_student_name", tempName.trim());
                          }
                          setIsEditingName(false);
                        } else if (e.key === "Escape") {
                          setIsEditingName(false);
                        }
                      }}
                      className="px-2 py-0.5 text-xs border border-amber-500 rounded bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 max-w-[115px] text-right font-semibold"
                      autoFocus
                      maxLength={20}
                    />
                    <button
                      onClick={() => {
                        if (tempName.trim()) {
                          setStudentName(tempName.trim());
                          localStorage.setItem("oxford_student_name", tempName.trim());
                        }
                        setIsEditingName(false);
                      }}
                      className="p-1 text-emerald-600 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded cursor-pointer"
                      title="Saqlash"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setIsEditingName(false)}
                      className="p-1 text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 rounded cursor-pointer"
                      title="Bekor qilish"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setTempName(studentName);
                      setIsEditingName(true);
                    }}
                    className="font-bold text-sm text-slate-900 hover:text-oxford-crimson transition-colors text-right flex items-center justify-end gap-1 cursor-pointer group"
                    title="Ismingizni o'zgartirish"
                  >
                    <span className="border-b border-dashed border-slate-300 group-hover:border-oxford-crimson font-medium text-slate-800">{studentName}</span>
                    <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">✏️</span>
                  </button>
                )}
                <span className="text-[10px] sm:text-xs text-amber-650 font-bold flex items-center justify-end gap-1 select-none">
                  <Sparkle className="w-3 h-3 text-amber-500 fill-amber-500" />
                  Oxford Level 2 Premium
                </span>
              </div>
            </div>
 
            <div className="flex items-center gap-3">
              {/* Chiqish (Logout) button */}
              <button
                onClick={handleLogOutPortal}
                className="px-2.5 py-1.5 sm:px-3 text-[10px] sm:text-xs text-rose-600 font-extrabold hover:text-white border border-rose-200 rounded-xl hover:bg-rose-650 transition-all cursor-pointer flex items-center justify-center bg-rose-50/50"
                title="Tizimdan chiqish (Log Out)"
                id="auth-logout-btn"
              >
                🚪 Chiqish
              </button>

              {/* Dark mode persistent toggle button */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-all cursor-pointer flex items-center justify-center bg-white"
                title={darkMode ? "Yorug' rejimga o'tish" : "Muzday 'Oxford Midnight' rejimiga o'tish"}
                id="dark-mode-toggle-btn"
              >
                {darkMode ? (
                  <Sun className="w-[18px] h-[18px] text-amber-400 fill-amber-400" />
                ) : (
                  <Moon className="w-[18px] h-[18px] text-slate-700" />
                )}
              </button>

              {/* Streak info */}
              <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-amber-800 text-xs font-bold shadow-xs select-none">
                <span className="text-lg">🔥</span>
                <span>{userStreak} Kun</span>
              </div>

              {/* Real-time Active Students Online */}
              <div className="relative group select-none">
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 text-xs font-bold shadow-xs cursor-pointer transition-all">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>{onlineCount} Online</span>
                </div>
                
                {/* Online list hover popover */}
                <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-3 hidden group-hover:block z-30 animate-fade-in text-slate-900 dark:text-white">
                  <h5 className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-2">
                    🟢 Active Students ({onlineCount}):
                  </h5>
                  {onlineList.length > 0 ? (
                    <ul className="space-y-1 max-h-36 overflow-y-auto pr-1">
                      {onlineList.map((name, idx) => (
                        <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span className="truncate">{name === studentName ? `${name} (Siz)` : name}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[10px] text-slate-400 font-medium">Faqat siz ulanmoqdasiz.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* WORKSPACE AREA */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8" id="portal-workspace-views">
          {/* VIEW 1: HOME DASHBOARD MODE */}
          {activeSegment === AppSection.HOME && (
            <div className="space-y-8 max-w-6xl mx-auto" id="dashboard-view-panel">
              {/* Broadcast Announcement Bar */}
              {announcement && (
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-4 rounded-2xl shadow-md border border-emerald-400/20 flex items-center justify-between gap-3 animate-[pulse_3s_infinite]" id="admin-broadcast-banner">
                  <div className="flex items-center gap-3">
                    <span className="text-xl shrink-0">📢</span>
                    <p className="text-sm font-semibold leading-relaxed">
                      <span className="font-extrabold text-amber-200">E'LON (Admin): </span>
                      {announcement}
                    </p>
                  </div>
                  <button
                    onClick={() => setAnnouncement("")}
                    className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/15 transition-colors text-xs font-bold shrink-0 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              )}
              {/* High-quality Welcome Hero Grid banner */}
              <div className="bg-gradient-to-br from-oxford-blue to-slate-950 rounded-2xl text-white p-6 md:p-10 shadow-xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 space-y-5">
                  <div className="inline-flex items-center gap-1.5 bg-white/10 text-amber-300 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-white/10 select-none">
                    <Sparkles className="w-3.5 h-3.5" />
                    Oxford Premium Study Suite
                  </div>

                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-serif leading-tight">
                    Ingliz tilini <span className="text-amber-400 italic font-serif">oson o'rganing</span>
                  </h1>

                  <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                    Oxford Discover darsligi asosidagi barcha 18 ta darslarni so'zlari, grammatika qoidalari 
                    va professional tarzda ingliz tilidagi o'qilishini tinglash yordamida takrorlang. 
                    Tizimdagi sun'iy intellekt <span className="text-white font-medium">AI Ustoz</span> sarguzashtingizda yordam beradi.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4">
                    <button
                      onClick={() => {
                        setSelectedUnitNumber(1);
                        setActiveSegment(AppSection.UNIT_DETAIL);
                        setUnitTab("vocabulary");
                      }}
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 text-xs"
                      id="hero-start-lessons"
                    >
                      Darslarni Boshlash
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedUnitNumber(1);
                        setActiveSegment(AppSection.UNIT_DETAIL);
                        setUnitTab("ai-coach");
                      }}
                      className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/35 font-bold rounded-xl transition-all flex items-center gap-2 text-xs"
                    >
                      <Brain className="w-4 h-4 text-amber-400" />
                      Shaxsiy AI Ustoz bilan Mashq
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Synchronization & Telegram Bot integration controls */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center animate-fade-in" id="sync-tg-panel">
                <div className="md:col-span-7 space-y-2">
                  <div className="flex items-center gap-2 text-oxford-blue font-bold text-sm">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Sinxronizatsiya va Telegram Bot Tizimi
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Sizning barcha o'rganish natijalaringiz avtomatik ravishda server bilan sinxronizatsiya qilinadi.
                    Telegram Bot orqali kim qancha ball (ochko) to'plaganini va talabalar reytingini ko'ra olasiz.
                  </p>
                  <div className="pt-1 flex flex-wrap items-center gap-2.5 text-xs text-slate-600 font-mono">
                    <span>🔑 Bot Paroli: <strong className="text-oxford-crimson font-bold">oxford123</strong></span>
                    <span className="text-slate-300 font-sans">|</span>
                    <span>🤖 Buyruq: <strong className="text-oxford-blue">/stats</strong></span>
                    <span className="text-slate-300 font-sans">|</span>
                    <span>👤 Student: <strong className="text-slate-800 font-sans font-bold">{studentName}</strong></span>
                  </div>
                </div>

                <div className="md:col-span-5 flex flex-col sm:flex-row gap-3 justify-end items-stretch sm:items-center">
                  <div className="flex-1 min-w-[150px]">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 select-none">Ismingiz (Telegramda ko'rinadi):</span>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => {
                        const val = e.target.value;
                        setStudentName(val);
                        localStorage.setItem("oxford_student_name", val);
                      }}
                      placeholder="Ismingizni kiriting"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                      maxLength={18}
                    />
                  </div>
                  <div className="flex items-end pt-5 sm:pt-0">
                    <button
                      onClick={() => {
                        alert(`Muvaffaqiyatli sinxronizatsiya qilindi! 🌌\nIsm: "${studentName}" deb belgilandi. Telegram bot orqali ballaringizni tekshirishingiz mumkin.`);
                      }}
                      className="px-4 py-2 bg-oxford-blue hover:bg-slate-900 border border-slate-850 text-white font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-xs w-full sm:w-auto shrink-0 shadow-xs"
                    >
                      🔄 Sinxronlash
                    </button>
                  </div>
                </div>
              </div>

              {/* Study Statistics Section - Professional Polish standard style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="stats-dashboard-grid">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                  <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold text-2xl border border-amber-100">
                    🏆
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs font-semibold block uppercase tracking-wider">Erishilgan ballar</span>
                    <span className="text-2xl font-extrabold text-oxford-blue block mt-0.5">{wordsLearnedCount} PTS</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-50 text-oxford-crimson rounded-xl flex items-center justify-center font-bold text-2xl border border-red-100 dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-400">
                    📙
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs font-semibold block uppercase tracking-wider">O'rganilgan so'zlar</span>
                    <span className="text-2xl font-extrabold text-oxford-blue block mt-0.5">{wordsLearnedCount}/120</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-2xl border border-emerald-100">
                    ⚡
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs font-semibold block uppercase tracking-wider">Ishlangan testlar</span>
                    <span className="text-2xl font-extrabold text-oxford-blue block mt-0.5">{totalQuizzesTaken} ta</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                  <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-bold text-2xl border border-purple-100">
                    📈
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs font-semibold block uppercase tracking-wider">Eng yuqori natija</span>
                    <span className="text-2xl font-extrabold text-oxford-blue block mt-0.5">{bestScore}%</span>
                  </div>
                </div>
              </div>

              {(() => {
                // Generate progress history ending in live wordsLearnedCount
                const countsList = [];
                const now = new Date();
                
                for (let i = 29; i >= 0; i--) {
                  const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
                  const factor = (30 - i) / 30; // 0.033 to 1.0
                  const rawVal = wordsLearnedCount * (0.3 + 0.7 * Math.pow(factor, 1.5));
                  const count = Math.min(wordsLearnedCount, Math.round(rawVal));
                  const mName = ["Yan", "Feb", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Nov", "Dek"][d.getMonth()];
                  const label = `${mName} ${d.getDate()}`;
                  countsList.push({ date: label, count: Math.max(0, count) });
                }

                const maxCount = Math.max(10, wordsLearnedCount);
                
                // SVG dimensions
                const svgW = 540;
                const svgH = 160;
                
                // Map to coordinate points
                const pts = countsList.map((item, idx) => {
                  const x = (idx / 29) * (svgW - 60) + 30;
                  const y = svgH - 30 - (item.count / maxCount) * (svgH - 50);
                  return { x, y, date: item.date, count: item.count, index: idx };
                });

                // Generate SVG Path
                const linePath = pts.map((p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");
                const areaPath = `M ${pts[0].x} ${svgH - 25} ` + pts.map(p => `L ${p.x} ${p.y}`).join(" ") + ` L ${pts[pts.length - 1].x} ${svgH - 25} Z`;

                // Week day calculations for streak calendar widget
                const weekDays = ["Ya", "Du", "Se", "Ch", "Pa", "Ju", "Sh"];
                const streakDays = [];
                for (let i = 6; i >= 0; i--) {
                  const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
                  const dayName = weekDays[d.getDay()];
                  const isStudied = i < userStreak; // assume they studied for at least userStreak consecutive days up to today
                  streakDays.push({ dayName, date: d.getDate(), isStudied });
                }

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in" id="dashboard-progress-streak-area">
                    {/* Progress Chart Card */}
                    <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between relative text-slate-900 dark:text-white">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                          <div>
                            <span className="text-[9px] uppercase font-bold tracking-widest text-[#002147] dark:text-red-400 font-mono">30-kunlik Dinamika Grafik</span>
                            <h4 className="text-base font-black text-oxford-blue dark:text-white flex items-center gap-1.5 mt-0.5">
                              📈 O'rganilgan So'zlar O'sish Grafigi
                            </h4>
                          </div>
                          <span className="text-xs bg-amber-100 dark:bg-amber-950/20 text-amber-800 dark:text-amber-400 px-2.5 py-1 rounded-xl font-bold font-mono">
                            {wordsLearnedCount} tadan {wordsLearnedCount} tasi darslikda
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-405 mb-6 leading-relaxed">
                          Progress vizualizatsiyasi darslik bo'ylab yod olingan professional ingliz tili so'zlarining o'sish egri chizig'ini ko'rsatadi:
                        </p>
                      </div>

                      {/* Interactive SVG Chart Container */}
                      <div className="relative h-44 w-full" id="svg-chart-workspace">
                        <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${svgW} ${svgH}`}>
                          <defs>
                            <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.32" />
                              <stop offset="100%" stopColor="#e11d48" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          {/* Grid horizontal lines */}
                          {[0, 0.25, 0.5, 0.75, 1].map((ratio, gridIdx) => {
                            const yVal = svgH - 30 - ratio * (svgH - 50);
                            return (
                              <line
                                key={gridIdx}
                                x1={30}
                                y1={yVal}
                                x2={svgW - 30}
                                y2={yVal}
                                className="stroke-slate-100 dark:stroke-slate-800"
                                strokeWidth="1"
                                strokeDasharray="3,3"
                              />
                            );
                          })}

                          {/* Gradient Shade area */}
                          <path d={areaPath} fill="url(#chartGlow)" />

                          {/* Smooth curved path */}
                          <path
                            d={linePath}
                            fill="none"
                            className="stroke-amber-500 dark:stroke-amber-400"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />

                          {/* Active Hover columns listener */}
                          {pts.map((p, pIdx) => (
                            <g key={pIdx}>
                              {/* Invisible interactive column hover sensor */}
                              <rect
                                x={p.x - 8}
                                y={10}
                                width={16}
                                height={svgH - 35}
                                fill="transparent"
                                className="cursor-crosshair"
                                onMouseEnter={(e) => {
                                  setHoveredProgressPoint({
                                    index: p.index,
                                    x: p.x,
                                    y: p.y,
                                    date: p.date,
                                    count: p.count
                                  });
                                }}
                                onMouseLeave={() => setHoveredProgressPoint(null)}
                              />

                              {/* Visible point dot on certain ticks or on hover */}
                              {(pIdx % 4 === 0 || pIdx === 29 || hoveredProgressPoint?.index === pIdx) && (
                                <circle
                                  cx={p.x}
                                  cy={p.y}
                                  r={hoveredProgressPoint?.index === pIdx ? 6 : 4}
                                  className={`transition-all duration-150 ${
                                    hoveredProgressPoint?.index === pIdx 
                                      ? "fill-rose-500 stroke-rose-200 stroke-4" 
                                      : "fill-amber-500 stroke-white dark:stroke-slate-900 stroke-2"
                                  }`}
                                />
                              )}
                            </g>
                          ))}

                          {/* X-Axis dynamic dates ticks */}
                          {pts.filter((_, i) => i % 5 === 0 || i === 29).map((p, tIdx) => (
                            <text
                              key={tIdx}
                              x={p.x}
                              y={svgH - 8}
                              textAnchor="middle"
                              className="fill-slate-400 dark:fill-slate-500 text-[9px] font-mono font-bold"
                            >
                              {p.date}
                            </text>
                          ))}

                          {/* Y-Axis counts Ticks */}
                          <text x={24} y={15} className="fill-slate-400 text-[8px] font-mono font-black" textAnchor="end">
                            {maxCount}
                          </text>
                          <text x={24} y={svgH - 26} className="fill-slate-400 text-[8px] font-mono font-black" textAnchor="end">
                            0
                          </text>
                        </svg>

                        {/* Hover Tooltip Box */}
                        {hoveredProgressPoint && (
                          <div 
                            className="absolute bg-slate-950 text-white rounded-xl p-3 shadow-2xl z-20 text-[11px] font-bold border border-slate-800 space-y-1 select-none pointer-events-none animate-fade-in"
                            style={{
                              left: `${(hoveredProgressPoint.x / svgW) * 100}%`,
                              top: `${(hoveredProgressPoint.y / svgH) * 100 - 32}%`,
                              transform: "translate(-50%, -100%)"
                            }}
                          >
                            <p className="text-amber-400 font-mono leading-none">{hoveredProgressPoint.date}</p>
                            <p className="text-white text-xs whitespace-nowrap">{hoveredProgressPoint.count} ta dars yodlangandi</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Streak Calendar & Motivation Card */}
                    <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between text-slate-900 dark:text-white" id="streak-motivation-card">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                          <div>
                            <span className="text-[9px] uppercase font-bold tracking-widest text-orange-600 dark:text-orange-400 font-mono">Kalendar & Streak</span>
                            <h4 className="text-base font-black text-oxford-blue dark:text-white flex items-center gap-1.5 mt-0.5">
                              🔥 Kundalik Streak Tracker
                            </h4>
                          </div>
                          <span className="text-xs bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400 px-2.5 py-1 rounded-xl font-bold font-mono">
                            Zanjir
                          </span>
                        </div>

                        {/* Large stylized fire streak bubble */}
                        <div className="flex items-center gap-4 bg-gradient-to-tr from-amber-50 to-orange-100/60 dark:from-slate-950 dark:to-orange-950/15 border border-orange-100/80 dark:border-orange-900/40 p-4 rounded-2xl shadow-2xs mb-5">
                          <div className="w-16 h-16 bg-gradient-to-tr from-orange-400 to-amber-400 rounded-full flex items-center justify-center text-3xl shadow-md border-3 border-white dark:border-slate-900 animate-pulse">
                            🔥
                          </div>
                          <div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-black text-orange-700 dark:text-orange-400 font-mono">{userStreak}</span>
                              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">ketma-ket kun</span>
                            </div>
                            <p className="text-[11px] text-orange-900/80 dark:text-slate-400 mt-0.5 leading-snug font-medium">
                              {userStreak >= 3 ? "Ajoyib o'sish! Kunning eng yaxshi rekordi sizda!" : "Darslarni har kuni ochib takrorlang va zanjirni buzmang!"}
                            </p>
                            <button
                              onClick={() => {
                                setCelebrationDays(userStreak >= 7 ? userStreak : 7);
                                setShowStreakCelebration(true);
                              }}
                              className="mt-2.5 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-[10px] rounded-lg tracking-wide shadow-xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                              id="btn-trigger-streak-celebration"
                            >
                              <span>🎉 Nishonlash (Celebrate Streak)</span>
                            </button>
                          </div>
                        </div>

                        {/* Interactive 7 Days weekly history row */}
                        <div className="space-y-3 pb-3">
                          <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-500 tracking-wider block">Oxirgi 7 kunlik faollik:</span>
                          <div className="grid grid-cols-7 gap-2">
                            {streakDays.map((sd, idx) => (
                              <div key={idx} className="space-y-1">
                                <span className="text-[10px] text-slate-400 font-bold block">{sd.dayName}</span>
                                <div className={`h-10 rounded-xl flex flex-col items-center justify-center text-xs font-black border transition-all ${
                                  sd.isStudied 
                                    ? "bg-amber-500/10 border-amber-400 text-amber-700 dark:text-amber-400" 
                                    : "bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-400"
                                }`}>
                                  <span className="text-[9px] leading-tight block select-none">
                                    {sd.isStudied ? "🔥" : sd.date}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Supportive short line */}
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 italic mt-3 text-center border-t border-slate-100 dark:border-slate-800 pt-3">
                        "Ingliz tilini o'rganishda davomiylik eng muhimi hisoblanadi." 🎓
                      </p>
                    </div>

                    {/* DANGER ACCIDENTS PREVENTION AND DANGER ZONE CARD */}
                    <div className="lg:col-span-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 md:p-6 shadow-xs text-slate-900 dark:text-white" id="danger-zone-dashboard">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="p-1 px-1.5 bg-red-105 dark:bg-red-953/30 text-red-600 rounded-xl text-xs font-black animate-pulse">⚠️ DANGER ZONE</span>
                            <h4 className="text-base font-black text-oxford-blue dark:text-white mt-0.5">
                              Xavfsiz Hudud va Ma'lumotlarni Boshqarish
                            </h4>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                            Natijalarni o'chirib yuborish yoki profilni tizimdan barcha o'rganish ma'lumotlarini tozalash. Har qanday amallar tasdiqlash xabari bilan himoyalangan.
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3">
                          {/* Reset Statistics button with trigger config */}
                          <button
                            onClick={() => {
                              setConfirmModalConfig({
                                title: "Natijalarni Nolga Qaytarish?",
                                message: "Sizning barcha yodlagan so'zlaringiz va quizada bajargan imtihon ballaringiz 0 ga tushiriladi.",
                                subText: "Diqqat: Ushbu operatsiyani ortga qaytarib bo'lmaydi! Telegram dars reytingidagi jadvalingiz ham yangilanadi.",
                                actionType: "reset"
                              });
                              setShowConfirmModal(true);
                            }}
                            className="px-4 py-2.5 bg-amber-50 dark:bg-amber-95/20 hover:bg-amber-100 dark:hover:bg-amber-95/43 border border-amber-200 dark:border-amber-900/40 text-amber-700 dark:text-amber-400 rounded-xl text-xs font-black transition-all cursor-pointer text-center"
                          >
                            🔄 Natijalarni Nolga Qaytarish
                          </button>

                          {/* Account Deletion button */}
                          <button
                            onClick={() => {
                              setConfirmModalConfig({
                                title: "Akkauntni Butunlay O'chirish?",
                                message: `"${studentName}" ismli talabalik hisobingiz va tizimdagi barcha dars natijalari o'chirib tashlanadi.`,
                                subText: "Foydalanuvchi ma'lumotlari mahalliy xotiradan butunlay sidirib tashlanadi va tizimga kirish sahifasiga yo'naltirilasiz.",
                                actionType: "delete"
                              });
                              setShowConfirmModal(true);
                            }}
                            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black transition-all cursor-pointer text-center"
                          >
                            🗑️ Akkauntni O'chirish
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Quiz interactive launcher customize card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6" id="quiz-launcher-dashboard">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <h3 className="text-xl font-extrabold text-oxford-blue flex items-center gap-2" id="quiz-header-title">
                      🎯 So'z boyligi va Grammatika Quizi
                    </h3>
                    <p className="text-slate-500 text-xs mt-1">
                      18 ta darsning barcha savollari ichidan tasodifiy ravishda olingan testlarni ishlash imkoniyati
                    </p>
                  </div>
                  
                  {/* Speech reading trigger option for quiz questions */}
                  <div className="bg-amber-50 rounded-xl p-2.5 px-4 border border-amber-100 flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-amber-600 animate-bounce" />
                    <div>
                      <p className="text-[11px] font-bold text-slate-800 leading-none">Ovozli eshittirish faol</p>
                      <p className="text-[9px] text-slate-500 mt-0.5">Savollarni o'qib berish tugmasi mavjud</p>
                    </div>
                  </div>
                </div>

                {/* Submitting custom size choice */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                      Testlar sonini tanlang (Qancha savol bo'lsin?):
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[5, 10, 15, "all"].map((size) => (
                        <button
                          key={size}
                          onClick={() => setQuizSize(size as any)}
                          className={`py-3 rounded-lg text-xs font-bold transition-all border ${
                            quizSize === size
                              ? "bg-oxford-crimson text-white border-oxford-crimson shadow-xs"
                              : "bg-stone-50 text-slate-700 border-slate-200 hover:bg-slate-100 cursor-pointer"
                          }`}
                        >
                          {size === "all" ? "Barchasi" : `${size} ta`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs text-slate-500 leading-relaxed italic border-l-2 border-oxford-crimson pl-3">
                      💡 Maslahat: Har bir savolga javob berganingizda, tizim uning to'g'ri yoki noto'g'riligini ingilizcha 
                      talaffuz orqali sizga aniqlab beradi va har bir xatoni Uzbek tilida tushuntiradi.
                    </p>

                    <button
                      onClick={() => initQuiz(false)}
                      className="w-full bg-oxford-blue hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
                      id="launch-quiz-btn"
                    >
                      Tasodifiy Testlarni Boshlash
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Rapid Access beautiful grids for all 18 Units on Home tab */}
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold text-oxford-blue">
                  Discover 2 Mavzulari Portali
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="home-lesson-grid">
                  {OXFORD_UNITS.map((unit) => {
                    const bigQ = getBigQuestionForUnit(unit.number);
                    const presetImage = READING_PRESETS[unit.number]?.imageUrl || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800";
                    const diffInfo = getUnitDifficulty(unit.number);
                    
                    // Determine contextual background-tint and border colors for the card badge
                    const badgeBadgeBg = diffInfo.level === "Easy"
                      ? "bg-emerald-500/90 text-white"
                      : diffInfo.level === "Medium"
                        ? "bg-amber-500/95 text-white"
                        : "bg-rose-500/90 text-white";

                    const barColor = diffInfo.level === "Easy"
                      ? "bg-emerald-500"
                      : diffInfo.level === "Medium"
                        ? "bg-amber-500"
                        : "bg-rose-500";

                    return (
                      <div
                        key={unit.number}
                        onClick={() => {
                          setSelectedUnitNumber(unit.number);
                          setActiveSegment(AppSection.UNIT_DETAIL);
                          setUnitTab("vocabulary");
                        }}
                        className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1 block space-y-3 group"
                        id={`home-unit-card-${unit.number}`}
                      >
                        {/* Topic-matched Illustration Image Header */}
                        <div className="relative h-32 rounded-lg overflow-hidden bg-slate-100 border border-slate-100 select-none">
                          <img
                            src={presetImage}
                            alt={unit.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 left-2 bg-oxford-blue/90 text-white text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded backdrop-blur-xs">
                            Unit {unit.number}
                          </div>

                          {/* Level Badge Overlap */}
                          <div className={`absolute top-2 right-2 ${badgeBadgeBg} text-[8.5px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded shadow-xs flex items-center gap-1 backdrop-blur-3xs`}>
                             <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                             <span>{diffInfo.level}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center sm:pt-1">
                          <span className="text-[10px] font-bold text-oxford-crimson px-1.5 py-0.5 bg-red-50 rounded">
                            Discover {unit.number}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {unit.vocabulary.length} ta darslik so'z
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <h4 className="font-extrabold text-[#002147] group-hover:text-oxford-crimson transition-colors text-sm line-clamp-1">
                            {unit.title}
                          </h4>
                          <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 font-medium italic">
                            {bigQ ? `Q: ${bigQ.text}` : ""}
                          </p>
                          
                          {/* Beautiful Interactive Comprehension Score Guide */}
                          <div className="pt-1.5 border-t border-dashed border-slate-100 mt-1">
                            <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wide">
                              <span>Osonlik darajasi:</span>
                              <span className="text-slate-700 font-extrabold font-mono">{diffInfo.score}%</span>
                            </div>
                            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-1">
                              <div 
                                className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                                style={{ width: `${diffInfo.score}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-2.5 border-t border-slate-100 text-slate-600">
                          <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-700">
                            <BookOpen className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            {unit.grammar.title}
                          </span>
                          <span className="font-bold text-oxford-crimson group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: DETAILED MODULE VIEW FOR SELECTED UNIT */}
          {activeSegment === AppSection.UNIT_DETAIL && (
            <div className="space-y-6 max-w-5xl mx-auto" id="unit-detail-workspace">
              {/* Navigation Back Header & Unit Identity card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
                <button
                  onClick={() => setActiveSegment(AppSection.HOME)}
                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-oxford-blue font-bold text-xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Orqaga qaytish
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Tezkor o'tish:</span>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={selectedUnitNumber === 1}
                      onClick={() => setSelectedUnitNumber((prev) => prev - 1)}
                      className="p-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-l disabled:opacity-50"
                    >
                      ◀
                    </button>
                    <span className="px-3 py-1 bg-oxford-blue text-white text-xs font-bold">
                      U{selectedUnitNumber}
                    </span>
                    <button
                      disabled={selectedUnitNumber === 18}
                      onClick={() => setSelectedUnitNumber((prev) => prev + 1)}
                      className="p-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-r disabled:opacity-50"
                    >
                      ▶
                    </button>
                  </div>
                </div>
              </div>

              {/* Tab options within the Unit under "Professional Polish" */}
              <div className="flex flex-wrap border-b border-slate-200 bg-white p-1 rounded-xl shadow-xs gap-1">
                {(() => {
                  const tabs = [
                    { key: "vocabulary", label: "📚 Lug'at (Vocabulary)", color: "text-blue-600" },
                    { key: "grammar", label: "📝 Grammatika (Grammar)", color: "text-emerald-700" },
                    { key: "reading", label: "📖 Mutolaa (Reading Room)", color: "text-purple-700" },
                    { key: "ai-coach", label: "🤖 AI Ustoz", color: "text-amber-700" },
                    { key: "listening", label: "🎧 Listening Room (Tinglash)", color: "text-red-700" },
                    { key: "word-search", label: "🧩 Word Search (O'yin)", color: "text-amber-600" },
                  ];
                  if (currentUnit && currentUnit.song) {
                    tabs.push({ key: "song", label: "🎵 Qo'shiq & Sher (Song Room)", color: "text-rose-600" });
                  }
                  return tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => {
                        setUnitTab(tab.key as any);
                        speakWord(`Opening ${tab.key}`);
                      }}
                      className={`flex-1 min-w-[150px] py-3 px-4 text-center rounded-lg text-xs font-semibold tracking-wide transition-all ${
                        unitTab === tab.key
                          ? "bg-oxford-blue text-white shadow-xs"
                          : "text-slate-600 hover:bg-slate-50 cursor-pointer"
                      }`}
                      id={`tab-btn-${tab.key}`}
                    >
                      {tab.label}
                    </button>
                  ));
                })()}
              </div>

              {/* TAB CONTENT 1: VOCABULARY CARD LIST */}
              {unitTab === "vocabulary" && (
                <div className="space-y-6" id="vocabulary-tab-area">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-extrabold text-oxford-blue flex items-center gap-2">
                        📖 Darslik So'zlari va O'qilishi
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Oxford darsligining joriy qismlaridagi so'zlar. 
                        Talaffuzini inglizcha eshitish uchun <span className="text-blue-600 font-bold">istalgan so'zning ustiga bosing</span>.
                      </p>
                    </div>

                    <button
                      onClick={playAllVocabList}
                      className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-[0.98] shrink-0 self-start sm:self-center ${
                        isPlayingAllVocab
                          ? "bg-rose-600 text-white hover:bg-rose-700 animate-pulse"
                          : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                      }`}
                      id="btn-play-all-vocab"
                    >
                      {isPlayingAllVocab ? (
                        <>
                          <span className="text-sm">⏹️</span>
                          <span>Playlistni To'xtatish (Stop Playlist)</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm">🔊</span>
                          <span>Hammasini Tinglash (Play All Words)</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Word grid with Speak Audio triggers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="vocab-word-cards-container">
                    {currentUnit.vocabulary.map((vocab) => {
                      const isWordActiveForSpeech = speakingWordId === vocab.id;
                      return (
                        <div
                          key={vocab.id}
                          onClick={() => {
                            speakWord(vocab.word, vocab.id);
                            incrementWordsLearned(vocab.id);
                          }}
                          className={`bg-white rounded-xl border p-5 shadow-xs cursor-pointer transition-all duration-200 flex flex-col justify-between hover:scale-102 hover:shadow-md ${
                            isWordActiveForSpeech
                              ? "border-amber-400 bg-amber-50/50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                          id={`vocab-item-${vocab.id}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h4 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-1.5 hover:text-blue-700">
                                {vocab.emoji && <span className="mr-1 shadow-2xs select-none text-2xl">{vocab.emoji}</span>}
                                {vocab.word}
                                <span className="inline-block text-blue-500">
                                  <Volume2 className={`w-4 h-4 ${isWordActiveForSpeech ? "animate-ping text-amber-600" : ""}`} />
                                </span>
                              </h4>
                              <p className="text-xs text-slate-400">Tugmani bosib eshiting</p>
                            </div>

                            <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded uppercase">
                              Active
                            </span>
                          </div>

                          <div className="pt-4 mt-4 border-t border-slate-100 space-y-1 text-left">
                            <span className="text-xs text-slate-400 italic font-medium block">Tarjimasi (Uzbek):</span>
                            <p className="text-base font-bold text-slate-800 leading-snug">
                              {vocab.translation}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Practice Single Unit test button */}
                  <div className="bg-red-50/50 border border-red-200 dark:bg-red-950/20 dark:border-red-900/30 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <h4 className="font-bold text-oxford-crimson text-sm dark:text-red-400">Ushbu Unit bo'yicha test topshirasizmi?</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300">Yig'ilgan bilimingizni darhol interaktiv savol-javobda tekshiring!</p>
                    </div>

                    <button
                      onClick={() => initQuiz(true)}
                      className="px-5 py-2.5 bg-oxford-blue hover:bg-slate-900 text-white font-bold rounded-lg text-xs transition-all"
                    >
                      Ovozli Testlarni Boshlash
                    </button>
                  </div>
                </div>
              )}

              {/* TAB CONTENT 2: GRAMMAR FOCUS */}
              {unitTab === "grammar" && (
                <div className="space-y-6" id="grammar-tab-area">
                  {/* Grammar Challenge Mode specifically for Unit 2 (Adverbs of Frequency) */}
                  {currentUnit.number === 2 && (
                    <GrammarChallenge
                      onAwardPoints={awardPoints}
                      speakWord={(w) => speakWord(w)}
                    />
                  )}

                  {/* Explanation card */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                      <span className="text-2xl">📝</span>
                      <div>
                        <h3 className="text-lg font-extrabold text-oxford-blue">
                          Qoida: {currentUnit.grammar.title}
                        </h3>
                        <p className="text-xs text-slate-400">Oxford Discover 2 ta'lim darajasi</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-emerald-900">
                        <span className="text-xs font-bold uppercase tracking-wider block text-emerald-800 font-mono">English Explanation:</span>
                        <p className="text-sm mt-1 leading-relaxed font-medium">
                          {currentUnit.grammar.explanation}
                        </p>
                      </div>

                      {/* Side-by-side or stacked examples with Speak Option */}
                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                          Examples with Voice:
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentUnit.grammar.examples.map((ex, idx) => (
                            <div
                              key={idx}
                              onClick={() => speakWord(ex.en)}
                              className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-4 cursor-pointer transition-colors relative group"
                            >
                              <div className="absolute top-3 right-3 text-slate-400 group-hover:text-blue-600">
                                <Volume2 className="w-4 h-4" />
                              </div>

                              <p className="font-extrabold text-blue-900 text-sm leading-snug">
                                {ex.en}
                              </p>
                              <p className="text-xs text-slate-600 mt-2 italic">
                                Tarjimasi: {ex.uz}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scaffolded Sentence Builder Unscramble Game Challenge */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
                    <div className="border-b border-slate-100 pb-4">
                      <h4 className="font-bold text-[#002147] text-sm flex items-center gap-2">
                        🧩 Gapni To'g'ri Qurish Mashqi (Sentence Builder)
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Sizga so'zlar aralash berilgan, ularni to'g'ri tartibda bosib, ushbu unitning darslik gapini quring:
                      </p>
                    </div>

                    {/* Progress view */}
                    <div className="min-h-[75px] bg-[#F1F5F9] rounded-xl p-4 border border-dashed border-slate-300 flex flex-wrap gap-2 items-center justify-center text-center">
                      {scrambleProgress.length === 0 ? (
                        <span className="text-xs text-slate-400 italic">Iltimos, pastdagi so'zlarni bosing...</span>
                      ) : (
                        scrambleProgress.map((word, idx) => (
                          <span
                            key={idx}
                            className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs text-slate-800 scale-in"
                          >
                            {word}
                          </span>
                        ))
                      )}
                    </div>

                    {/* Feedback states */}
                    {scrambleCompleted && (
                      <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 p-3 rounded-lg text-xs font-bold flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-700" />
                        Ajoyib! Siz gapni to'g'ri tartibda quraoldingiz! 🌟 +1 O'rganish balli.
                      </div>
                    )}

                    {scrambleError && (
                      <div className="bg-rose-100 border border-rose-300 text-rose-800 p-3 rounded-lg text-xs font-bold flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <X className="w-4 h-4 text-rose-700" />
                          Nimadir xato qurildi. Iltimos, qaytadan urinib ko'ring.
                        </div>
                        <button
                          onClick={resetScramble}
                          className="px-2 py-1 bg-white hover:bg-slate-50 text-slate-700 rounded text-[10px] font-bold"
                        >
                          Tozalash
                        </button>
                      </div>
                    )}

                    {/* Shuffled Available click buttons */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2 justify-center" id="scrambled-buttons-container">
                        {getScrambledAvailableWords().map((word, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleWordClick(word)}
                            disabled={scrambleCompleted}
                            className="bg-amber-50 hover:bg-amber-100 active:bg-amber-200 border-2 border-amber-200 text-slate-900 px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                          >
                            {word}
                          </button>
                        ))}
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          onClick={resetScramble}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Mashqni Qayta Boshlash
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT 3: READING ROOM */}
              {unitTab === "reading" && (() => {
                const readingTextEn = currentUnit.reading.fullTextEn || `In Unit ${currentUnit.number}, we are studying "${currentUnit.title}". This lesson introduces highly engaging concepts and expressions to develop our language skills. Our core grammar is focus-built to enhance clarity. A key study phrase to master is: "${currentUnit.reading.sentenceEn}". Practicing these reading exercises improves reading comprehension, vocabulary count, and sentence formation successfully. Try reading this passage aloud multiple times to secure perfect pronunciation and natural speed.`;
                const readingTextUz = currentUnit.reading.fullTextUz || `Biz ${currentUnit.number}-bobda "${currentUnit.title}" mavzusini o'rganmoqdamiz. Ushbu dars til ko'nikmalarimizni rivojlantirish uchun qiziqarli tushunchalar va iboralarni taqdim etadi. Bizning asosiy grammatikamiz aniqlikni oshirish uchun maxsus ishlab chiqilgan. Mukammal egallash kerak bo'lgan asosiy iboramiz: "${currentUnit.reading.sentenceUz}". Ushbu o'qish mashqlarini bajarish matnni tushunish, so'z boyligi va gap tuzishni muvaffaqiyatli yaxshilaydi. Mukammal talaffuz va tabiiy tezlikka erishish uchun ushbu matnni bir necha marta ovoz chiqarib o'qishga harakat qiling.`;
                const rQuestions = getReadingQuestions();
                
                return (
                  <div className="space-y-6" id="reading-tab-area">
                    {/* Part 1: Full Article & Audio Speech */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                        <div>
                          <h3 className="text-lg font-extrabold text-[#002147] font-serif flex items-center gap-2">
                            <span>{currentUnit.reading.emoji || "📖"}</span> Oxford Discover Matni: {currentUnit.reading.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1">
                            Bo'limning to'liq matni, o'qilishi va o'zbekcha tarjimasi
                          </p>
                        </div>

                        {/* Speech synthesis player for ENTIRE passage */}
                        <button
                          onClick={() => speakWord(readingTextEn)}
                          className="px-4 py-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 self-start sm:self-center cursor-pointer shadow-xs animate-pulse"
                          id="btn-speak-full-reading"
                        >
                          <Volume2 className="w-4 h-4" />
                          🔊 To'liq Hikoyani O'qish (TTS Pronunciation)
                        </button>
                      </div>

                      {/* About context Uzbek explanation and Beautiful Illustration Preset Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-4 bg-slate-50 rounded-2xl border border-slate-200/60 shadow-xs">
                        <div className="relative h-44 rounded-xl overflow-hidden shadow-xs md:col-span-1 bg-slate-100 self-stretch group border border-slate-200 shrink-0">
                          <img
                            src={READING_PRESETS[currentUnit.number]?.imageUrl || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800"}
                            alt={currentUnit.reading.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 left-2 bg-[#002147]/85 text-white text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded backdrop-blur-xs font-sans">
                            Unit {currentUnit.number} rasmcha
                          </div>
                          {READING_PRESETS[currentUnit.number]?.credit && (
                            <div className="absolute bottom-1 right-2 text-[8px] text-white/70 bg-black/40 px-1.5 py-0.5 rounded font-mono">
                              {READING_PRESETS[currentUnit.number].credit}
                            </div>
                          )}
                        </div>
                        <div className="md:col-span-2 space-y-2.5">
                          <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block font-sans">📖 Matn mavzusi va qisqacha tavsifi:</span>
                          <h4 className="text-base font-extrabold text-[#002147] font-serif leading-tight">
                            {currentUnit.reading.title}
                          </h4>
                          <p className="text-slate-700 text-xs leading-relaxed font-sans text-justify">
                            {currentUnit.reading.aboutUz}
                          </p>
                          <div className="text-[11px] text-slate-600 font-mono flex items-start sm:items-center gap-1.5 flex-wrap pt-1.5 border-t border-slate-200/50">
                            <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold text-[9px]">Mavzu gap (Key study sentence):</span>
                            <span className="italic text-slate-800 font-bold font-serif select-all">"{currentUnit.reading.sentenceEn}"</span>
                          </div>
                        </div>
                      </div>

                      {/* Twin Column English & Uzbek reading passage container */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        {/* English Story Panel */}
                        <div className="bg-[#fcfdfd] border border-slate-200 p-6 rounded-2xl relative overflow-hidden group">
                          <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-mono font-bold select-none">EN</span>
                            <button 
                              onClick={() => speakWord(readingTextEn)}
                              className="p-1 hover:bg-slate-100 rounded text-slate-500 cursor-pointer"
                              title="Tinglash"
                            >
                              🔊
                            </button>
                          </div>
                          <span className="text-xs font-bold text-blue-600 block mb-3 uppercase tracking-wider font-mono">English Reading Passage:</span>
                          <p className="text-slate-800 text-sm leading-relaxed font-serif text-justify whitespace-pre-line select-all">
                            {readingTextEn}
                          </p>
                        </div>

                        {/* Uzbek Translation Panel */}
                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl relative">
                          <span className="absolute top-2 right-2 text-[10px] uppercase font-bold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded font-mono font-bold select-none">UZ</span>
                          <span className="text-xs font-bold text-slate-500 block mb-3 uppercase tracking-wider font-mono">O'zbekcha Tarjimasi:</span>
                          <p className="text-slate-700 text-sm leading-relaxed font-serif text-justify whitespace-pre-line">
                            {readingTextUz}
                          </p>
                        </div>
                      </div>

                      {/* Study helper tip */}
                      <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2.5 border border-slate-100 text-slate-500 text-[11px] select-none">
                        <span className="text-sm shrink-0">💡</span>
                        <span>Birinchi inglizcha matnni o'zingiz o'qing, keyin ovozini eshiting va so'zlarning o'qilishini mustahkamlang!</span>
                      </div>
                    </div>

                    {/* Part 2: Interactive Prepared Reading Quiz Container */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
                      <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h4 className="text-sm font-extrabold text-[#002147] flex items-center gap-2">
                            <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                            🧠 Matn Tushunish va Savol-Javob (Comprehension practice)
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">Tayyor tuzilgan savollar orqali matnni tushunganingizni tekshirib ko'ring</p>
                        </div>
                        
                        <button
                          onClick={() => {
                            setReadingQuizAnswers({});
                            initReadingQuestions(selectedUnitNumber);
                            speakWord("Quiz restarted and options shuffled.");
                            setQuizShuffledNotice(true);
                            setTimeout(() => setQuizShuffledNotice(false), 3000);
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-[0.98] shrink-0 self-start sm:self-center"
                          id="btn-shuffle-retry-quiz"
                        >
                          <svg className="w-3.5 h-3.5 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3 3L22 4" />
                          </svg>
                          <span>🎲 Replay & Shuffle Quiz</span>
                        </button>
                      </div>

                      {quizShuffledNotice && (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2.5 animate-fade-in shadow-2xs">
                          <span className="text-sm animate-bounce">🎲</span>
                          <span>Barcha savollar tartibi va variantlar o'rni qaytadan butunlay aralashtirildi! (Quest order & options dynamically shuffled successfully)</span>
                        </div>
                      )}

                      <div className="space-y-6">
                        {rQuestions.map((q: any, qIdx: number) => {
                          const chosenOpt = readingQuizAnswers[q.id];
                          const hasAnswered = chosenOpt !== undefined;
                          
                          return (
                            <div key={q.id || qIdx} className="bg-slate-50/50 hover:bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 transition-all space-y-4">
                              <div className="flex items-start gap-3">
                                <span className="bg-oxford-blue text-white font-mono text-xs w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold mt-0.5 select-none">
                                  {qIdx + 1}
                                </span>
                                <div className="space-y-1">
                                  <h5 className="font-extrabold text-slate-900 text-sm leading-relaxed select-text font-serif">
                                    {q.questionEn}
                                  </h5>
                                  <p className="text-xs text-slate-500 font-medium select-none">
                                    Tarjimasi: <span className="italic">{q.questionUz}</span>
                                  </p>
                                </div>
                              </div>

                              {/* Interactive option buttons */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-0 sm:pl-9">
                                {q.options.map((option: string, optIdx: number) => {
                                  const isSelected = chosenOpt === optIdx;
                                  const isCorrectOption = optIdx === q.correctIndex;
                                  
                                  let btnClass = "w-full text-left p-3.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-100 hover:border-slate-300 text-slate-700 transition-all cursor-pointer flex items-center justify-between gap-2 shadow-2xs";
                                  let iconElement = null;

                                  if (hasAnswered) {
                                    if (isCorrectOption) {
                                      btnClass = "w-full text-left p-3.5 text-xs font-semibold rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-800 transition-all flex items-center justify-between gap-2 shadow-sm";
                                      iconElement = <Check className="w-4 h-4 text-emerald-600 shrink-0" />;
                                    } else if (isSelected) {
                                      btnClass = "w-full text-left p-3.5 text-xs font-semibold rounded-xl border-2 border-rose-400 bg-rose-50 text-rose-800 transition-all flex items-center justify-between gap-2 shadow-sm";
                                      iconElement = <X className="w-4 h-4 text-rose-600 shrink-0" />;
                                    } else {
                                      btnClass = "w-full text-left p-3.5 text-xs font-medium rounded-xl border border-slate-100 bg-white text-slate-400 opacity-60 transition-all flex items-center justify-between gap-2";
                                    }
                                  }

                                  return (
                                    <button
                                      key={optIdx}
                                      onClick={() => {
                                        if (hasAnswered) return; // Prevent double clicking
                                        
                                        // Update state
                                        const nextAns = { ...readingQuizAnswers, [q.id]: optIdx };
                                        setReadingQuizAnswers(nextAns);

                                        if (optIdx === q.correctIndex) {
                                          // Correct feedback muted
                                          // Increment live quiz statistics and award score!
                                          const nextQCount = totalQuizzesTaken + 0.34;
                                          const roundedCount = Math.ceil(nextQCount);
                                          setTotalQuizzesTaken(roundedCount);
                                          localStorage.setItem("oxford_quizzes_taken", roundedCount.toString());
                                        } else {
                                          // Incorrect feedback muted
                                        }
                                      }}
                                      disabled={hasAnswered}
                                      className={btnClass}
                                    >
                                      <span>{option}</span>
                                      {iconElement}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Question feedback explanation info */}
                              {hasAnswered && (
                                <div className="sm:ml-9 p-3 bg-white border border-slate-200 rounded-xl space-y-1 text-[11px] text-slate-600 leading-relaxed animate-fade-in select-none">
                                  <span className="font-bold text-slate-800 block">💡 Izoh (Explanation):</span>
                                  <p>{q.explanation || "Darslik savolining to'g'ri javobi tushuntirildi."}</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Completed summary banner */}
                      {Object.keys(readingQuizAnswers).length === rQuestions.length && (
                        <div className="bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/20 rounded-2xl p-5 md:p-6 text-center space-y-3 animate-fade-in select-none">
                          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                            🎉
                          </div>
                          <div className="max-w-md mx-auto space-y-1">
                            <h5 className="font-extrabold text-slate-900 text-sm">Mutolaa Mashqi Bajarildi!</h5>
                            <p className="text-xs text-slate-500 leading-relaxed">
                              Siz matn tushunish bo'yicha barcha savollarga javob berdingiz va reytingingizni yangiladingiz! 
                              Ushbu ballar avtomatik ravishda sinxronlanib, Telegram botda ko'rinadi.
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setReadingQuizAnswers({});
                              initReadingQuestions(selectedUnitNumber);
                              speakWord("Let's play again!");
                            }}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 shadow-xs"
                          >
                            🔄 Qaytadan Urinish
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* TAB CONTENT: SONG & POEMS EXTRA POLISHED */}
              {unitTab === "song" && currentUnit.song && (() => {
                const song = currentUnit.song;
                return (
                  <div className="space-y-6 animate-fade-in" id="song-tab-area">
                    {/* Header player card */}
                    <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl p-6 md:p-8 shadow-md relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                      <div className="relative z-10 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="bg-white/20 text-white border border-white/20 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wide">
                            🎵 Class Track {song.trackInfo}
                          </span>
                          <span className="text-xs text-rose-100 font-bold">o'qilishi & tarjimasi bilan</span>
                        </div>
                        
                        <div className="space-y-1">
                          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight font-serif">
                            Qo'shiq: &ldquo;{song.title}&rdquo;
                          </h3>
                          <p className="text-rose-100/80 text-xs">
                            Klassik Oxford Discover audio va talaffuz takrorlash xonasi
                          </p>
                        </div>

                        {/* Control buttons */}
                        <div className="flex flex-wrap gap-3 pt-2">
                          <button
                            onClick={async () => {
                              if ("speechSynthesis" in window) {
                                window.speechSynthesis.cancel();
                                setIsSynthesizing(true);
                                isPlayingAllRef.current = true;
                                utterancesRef.current = [];
                                
                                // Read line-by-line with highlights
                                for (let i = 0; i < song.lines.length; i++) {
                                  if (!isPlayingAllRef.current) break;

                                  // Set active word ID for styling
                                  const id = `song_line_${i}`;
                                  setSpeakingWordId(id);
                                  
                                  const utterance = new SpeechSynthesisUtterance(song.lines[i].en);
                                  utterance.lang = "en-US";
                                  utterance.rate = 0.85;

                                  // Use standard en voice if available
                                  const voices = window.speechSynthesis.getVoices();
                                  const enVoice = voices.find(v => v.lang.startsWith("en-US") || v.lang.startsWith("en-GB"));
                                  if (enVoice) {
                                    utterance.voice = enVoice;
                                  }

                                  // Save a reference to prevent garbage collection
                                  utterancesRef.current.push(utterance);
                                  
                                  const playPromise = new Promise<void>((resolve) => {
                                    utterance.onend = () => resolve();
                                    utterance.onerror = () => resolve();
                                  });
                                  
                                  window.speechSynthesis.speak(utterance);
                                  await playPromise;
                                  
                                  if (!isPlayingAllRef.current) break;

                                  // Add small natural break pause between sentences
                                  await new Promise((resolve) => setTimeout(resolve, 800));
                                }
                                
                                setSpeakingWordId(null);
                                setIsSynthesizing(false);
                                isPlayingAllRef.current = false;
                                utterancesRef.current = [];
                              }
                            }}
                            className="px-5 py-2.5 bg-white hover:bg-rose-50 text-rose-600 font-extrabold rounded-xl text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
                          >
                            ▶️ Hammasini Tinglash (Play All)
                          </button>

                          <button
                            onClick={() => {
                              isPlayingAllRef.current = false;
                              utterancesRef.current = [];
                              if ("speechSynthesis" in window) {
                                window.speechSynthesis.cancel();
                              }
                              setSpeakingWordId(null);
                              setIsSynthesizing(false);
                            }}
                            className="px-5 py-2.5 bg-stone-900/30 hover:bg-stone-900/40 border border-white/10 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer"
                          >
                            ⏹️ To'xtatish (Stop)
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Instruction tip */}
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-2.5 leading-relaxed shadow-3xs">
                      <Volume2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Qulayliklardan foydalaning:</strong>
                        <ul className="list-disc pl-4 mt-1 space-y-1">
                          <li>Har bir qatorni alohida eshitish uchun o'ng burchakdagi 🔊 tugmasini bosing.</li>
                          <li>Tugma yonidagi ko'k yozuv - so'zlarning to'g'ri o'qilishini (pronunciation) o'zbek harflarida ko'rsatadi.</li>
                        </ul>
                      </div>
                    </div>

                    {/* Split Columns or beautiful Cards of lines */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {song.lines.map((line: any, idx: number) => {
                        const isSpeaking = speakingWordId === `song_line_${idx}`;
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              speakWord(line.en, `song_line_${idx}`);
                              incrementWordsLearned(`song_line_${selectedUnitNumber}_${idx}`);
                            }}
                            className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                              isSpeaking
                                ? "bg-rose-50/50 border-rose-400 ring-2 ring-rose-300 shadow-md"
                                : "bg-white border-slate-200 hover:border-rose-300 hover:shadow-xs"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1">
                                <span className="font-mono text-[10px] text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded select-none">
                                  Qator {idx + 1}
                                </span>
                                <h4 className={`text-base font-extrabold font-serif tracking-tight mt-1.5 leading-relaxed ${isSpeaking ? 'text-rose-700' : 'text-slate-900'}`}>
                                  {line.en}
                                </h4>
                              </div>
                              <span className={`p-1.5 rounded-lg shrink-0 ${isSpeaking ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-50 text-slate-500'}`}>
                                <Volume2 className="w-4 h-4" />
                              </span>
                            </div>

                            <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
                              {/* Transcription / Pronunciation guide */}
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[9px] uppercase font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded select-none">O'qilishi:</span>
                                <p className="font-mono text-xs font-bold text-blue-800 tracking-wide select-all">
                                  {line.pronunciation}
                                </p>
                              </div>

                              {/* Uzbek translation */}
                              <div>
                                <span className="text-[10px] text-slate-400 italic block">Tarjimasi:</span>
                                <p className="text-sm font-medium text-slate-600 font-serif leading-relaxed">
                                  {line.uz}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* TAB CONTENT 4: CONTEXTUAL AI USTOZ COACH */}
              {unitTab === "ai-coach" && (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col h-[550px]" id="ai-coach-tab-area">
                  {/* Coach description header */}
                  <div className="bg-[#002147] text-white p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center font-bold text-xl">
                        🤖
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs">Oxford AI Ustoz (Level 2 Coach)</h4>
                        <p className="text-[10px] text-emerald-400 font-bold block">Online mashg'ulot</p>
                      </div>
                    </div>

                    <span className="text-[10px] bg-white/10 px-2.5 py-1 rounded text-slate-300">
                      Mavzu: Unit {currentUnit.number}
                    </span>
                  </div>

                  {/* Starter Suggestions box */}
                  <div className="bg-amber-50/70 p-3 border-b border-amber-100 text-[11px] text-slate-700 space-y-1.5 shrink-0">
                    <p className="font-bold flex items-center gap-1 text-slate-950">
                      💡 AI Ustoz bilan ishlash uchun quyidagi tezkor savollardan foydalanishingiz mumkin:
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {[
                        `Shu Unitning lug'atini qayta takrorlaymiz!`,
                        `Explain the grammar of Unit ${currentUnit.number} in simple Uzbek`,
                        `Let's build simple sentence with Unit ${currentUnit.number} words`,
                      ].map((starter, ind) => (
                        <button
                          key={ind}
                          onClick={() => loadChatStarter(starter)}
                          className="bg-white border hover:bg-amber-100 text-[#002147] px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          &ldquo; {starter} &rdquo;
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Messages workspace container */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50" id="ai-chat-scroller">
                    {chatMessages.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                        <span className="text-3xl">👋</span>
                        <p className="font-bold text-[#002147] text-sm">Salom! Men sizning shaxsiy Oxford AI Ustozingizman.</p>
                        <p className="text-slate-500 text-xs max-w-sm">
                          Men bilan joriy darsning {currentUnit.title} mavzusi bo'yicha so'z boyligini tushunishingiz, 
                          grammatikasini takrorlashingiz hamda savollar berishingiz mumkin.
                        </p>
                      </div>
                    ) : (
                      chatMessages.map((msg) => {
                        const isAi = msg.role === "assistant";
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isAi ? "justify-start" : "justify-end"} scale-in`}
                          >
                            <div
                              className={`max-w-[85%] rounded-2xl p-3.5 text-xs text-left leading-relaxed ${
                                isAi
                                  ? "bg-white text-slate-800 border border-slate-200 shadow-xs"
                                  : "bg-oxford-crimson text-white font-medium"
                              }`}
                            >
                              <div className="mb-1 font-bold text-[10px] text-slate-400 flex items-center gap-1.5">
                                <span>{isAi ? "🤖 AI Ustoz" : "👤 Siz"}</span>
                                <span>•</span>
                                <span>{msg.timestamp}</span>
                              </div>
                              <p className="whitespace-pre-line select-text font-serif leading-relaxed text-sm">
                                {msg.content}
                              </p>

                              {/* Simple read louder button in AI chat box balloon */}
                              {isAi && (
                                <button
                                  onClick={() => speakWord(msg.content.replace(/[*_#`~]/g, ""))}
                                  className="mt-2 text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  📣 Ovozli tinglash (Speak)
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}

                    {isWaitingForAi && (
                      <div className="flex justify-start">
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs italic text-slate-500 animate-pulse flex items-center gap-2">
                          <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                          {coachStatusMessage}
                        </div>
                      </div>
                    )}

                    <div ref={chatEndRef} />
                  </div>

                  {/* Input form panel */}
                  <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2 shrink-0">
                    <input
                      type="text"
                      value={aiInputValue}
                      onChange={(e) => setAiInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendAiMessage();
                      }}
                      placeholder="AI Ustozga xabar yozing (Masalan: explain count/non-count nouns)..."
                      className="flex-1 bg-stone-50 border border-slate-300 rounded-xl px-4 py-3 text-xs outline-none focus:border-oxford-crimson transition-colors"
                    />

                    <button
                      onClick={handleSendAiMessage}
                      disabled={!aiInputValue.trim() || isWaitingForAi}
                      className="p-3 bg-oxford-crimson hover:bg-red-700 text-white rounded-xl transition-all disabled:opacity-50"
                      id="ai-send-btn"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {unitTab === "listening" && (
                <ListeningLab
                  currentUnit={currentUnit}
                  onAwardPoints={awardPoints}
                  playAudioCue={playAudioCue}
                  speakWord={speakWord}
                />
              )}

              {unitTab === "word-search" && (
                <WordSearchGame
                  vocabulary={currentUnit.vocabulary}
                  wordsLearnedCount={wordsLearnedCount}
                  onAwardPoints={awardPoints}
                  speakWord={(w) => speakWord(w)}
                />
              )}
            </div>
          )}

          {/* VIEW 3: FULL DEDICATED QUIZ MODE FOR ALL/PARTIAL CUSTOM QUESTIONS */}
          {activeSegment === AppSection.QUIZ_MODE && (
            <div className="max-w-3xl mx-auto space-y-6" id="active-quiz-suite-container">
              {/* Quiz Mode Toolbar */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => {
                    setActiveSegment(AppSection.HOME);
                    speakWord("Quiz session stopped.");
                  }}
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-bold text-xs"
                >
                  ◀ Testdan chiqish
                </button>

                <span className="text-xs text-slate-500 font-bold">
                  Savol: {currentQuestionIdx + 1} / {activeQuestions.length}
                </span>
              </div>

              {/* Progress counter pill */}
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
                <div
                  className="bg-oxford-crimson h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIdx + 1) / activeQuestions.length) * 100}%` }}
                ></div>
              </div>

              {/* ACTIVE QUIZ BOX SECTION */}
              {!isQuizCompleted && activeQuestions.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-xs">
                  {/* Dynamic Adaptive Timer row */}
                  {(() => {
                    const qAtHand = activeQuestions[currentQuestionIdx];
                    if (!qAtHand) return null;
                    const diff = getQuestionDifficulty(qAtHand);
                    const timerProgress = (timeLeft / diff.seconds) * 100;
                    const isTimeLow = timeLeft <= 5;
                    const pulseClass = isTimeLow && isTimerActive ? "className='animate-pulse'" : "";
                    const timerColor = isTimeLow 
                      ? "bg-rose-500 text-white border-rose-600 shadow-rose-200"
                      : timeLeft <= 10 
                        ? "bg-amber-500 text-white border-amber-600 shadow-amber-100" 
                        : "bg-[#002147] text-white border-blue-950";

                    return (
                      <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                          <span className="shrink-0 text-slate-400">Qiyinchilik:</span>
                          <span className={`px-2 py-0.5 rounded-md border text-[10px] font-extrabold flex items-center gap-1 shrink-0 ${diff.color}`}>
                            <span>{diff.emoji}</span>
                            <span>{diff.level}</span>
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono hidden md:inline">({diff.seconds}s limit)</span>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                          <span className="text-[10px] text-slate-400 font-mono sm:hidden">Vaqt:</span>
                          <div className="w-24 md:w-32 h-2.5 bg-slate-200 rounded-full overflow-hidden shrink-0 border border-slate-200 relative">
                            <div 
                              className={`h-full transition-all duration-300 ${isTimeLow ? "bg-rose-500" : "bg-emerald-500"}`}
                              style={{ width: `${timerProgress}%` }}
                            ></div>
                          </div>
                          
                          <div className={`px-2.5 py-1 rounded-lg border font-mono text-xs font-black shrink-0 ${timerColor} ${pulseClass} transition-colors flex items-center gap-1 shadow-xs`}>
                             <Clock className="w-3.5 h-3.5 shrink-0" />
                             <span>{timeLeft > 0 ? `${timeLeft}s` : "Vaqt tugadi!"}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Timeout notification warning banner if they failed to answer */}
                  {quizAnswers[activeQuestions[currentQuestionIdx].id] === -1 && (
                    <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex items-center justify-center gap-2.5 text-rose-700 animate-bounce">
                      <AlertTriangle className="w-5 h-5 text-rose-600 animate-pulse shrink-0" />
                      <span className="font-extrabold text-xs">Vaqtingiz tugadi! Ushbu savolga belgilashga ulgurmadingiz.</span>
                    </div>
                  )}

                  {/* Speaker reading options */}
                  <div className="flex justify-between items-start gap-3">
                    <span className="text-[10px] bg-red-50 text-red-700 font-extrabold px-2.5 py-1 rounded-full border border-red-100 uppercase uppercase">
                      Test Unit {activeQuestions[currentQuestionIdx].unitNumber}
                    </span>

                    {/* Active Question Reading Button *{"harbir quizni oqib bersin"}* */}
                    <button
                      onClick={() => {
                        const targetQuestion = activeQuestions[currentQuestionIdx];
                        const textToSpeak = `${targetQuestion.question}. Options are: ${targetQuestion.options.join(", ")}`;
                        speakWord(textToSpeak);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition-all"
                      id="btn-speak-quiz-question"
                    >
                      <Volume2 className="w-4 h-4 text-slate-800" />
                      O'qib berish (Read aloud)
                    </button>
                  </div>

                  {/* Question English displays */}
                  <h3 className="text-lg md:text-xl font-extrabold text-[#002147] leading-relaxed text-left font-serif">
                    {activeQuestions[currentQuestionIdx].question}
                  </h3>

                  {/* Options selection */}
                  <div className="space-y-3 pt-3">
                    {activeQuestions[currentQuestionIdx].options.map((option, idx) => {
                      const qId = activeQuestions[currentQuestionIdx].id;
                      const hasChosen = qId in quizAnswers;
                      const isChosen = quizAnswers[qId] === idx;
                      const isCorrect = activeQuestions[currentQuestionIdx].correctIndex === idx;

                      let btnStyle = "bg-stone-50 border-slate-200 text-slate-800 hover:bg-slate-100";
                      if (hasChosen) {
                        if (isChosen && isCorrect) {
                          btnStyle = "bg-emerald-100 border-emerald-400 text-emerald-800 font-bold ring-2 ring-emerald-300";
                        } else if (isChosen && !isCorrect) {
                          btnStyle = "bg-rose-100 border-rose-400 text-rose-800 font-bold ring-2 ring-rose-300";
                        } else if (isCorrect) {
                          btnStyle = "bg-emerald-100 border-emerald-400 text-emerald-800 font-bold";
                        } else {
                          btnStyle = "bg-slate-100 border-slate-200 text-slate-400 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={hasChosen}
                          onClick={() => chooseQuizAnswer(qId, idx)}
                          className={`w-full text-left p-4 rounded-xl border-2 text-sm font-semibold transition-all flex items-center justify-between ${btnStyle} ${
                            !hasChosen ? "cursor-pointer" : ""
                          }`}
                        >
                          <span>{idx + 1}. {option}</span>
                          {hasChosen && isCorrect && <Check className="w-5 h-5 text-emerald-700" />}
                          {hasChosen && isChosen && !isCorrect && <X className="w-5 h-5 text-rose-700" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation of current answers with Uzbek explanation text if answered */}
                  {activeQuestions[currentQuestionIdx].id in quizAnswers && (
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-2 scale-in text-left">
                      <span className="text-[10px] uppercase font-bold text-blue-800 tracking-wider">💡 O'zbekcha Izoh (Explanation):</span>
                      <p className="text-slate-700 text-xs font-semibold leading-relaxed">
                        {activeQuestions[currentQuestionIdx].explanation}
                      </p>
                    </div>
                  )}

                  {/* Next control triggers */}
                  {activeQuestions[currentQuestionIdx].id in quizAnswers && (
                    <div className="flex justify-end pt-4">
                      {currentQuestionIdx < activeQuestions.length - 1 ? (
                        <button
                          onClick={() => {
                            setCurrentQuestionIdx((prev) => prev + 1);
                            const nextQ = activeQuestions[currentQuestionIdx + 1];
                            setTimeout(() => {
                              speakWord(nextQ.question);
                            }, 300);
                          }}
                          className="bg-oxford-crimson hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-lg text-xs flex items-center gap-1.5 transition-all"
                        >
                          Suhbat/Keyingi Savol
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={completeQuiz}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg text-xs"
                        >
                          Natijalarni Yakunlash
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* POST-QUIZ COMPLETION SCORECARD SCREEN */}
              {isQuizCompleted && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 text-center space-y-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
                  
                  {/* Calculate Final Marks and adaptive timer feedback metrics */}
                  {(() => {
                    const totalQuestions = activeQuestions.length;
                    const corrects = activeQuestions.reduce((sum, q) => {
                      return sum + (quizAnswers[q.id] === q.correctIndex ? 1 : 0);
                    }, 0);
                    const perfPercent = Math.round((corrects / totalQuestions) * 100);

                    // 1. Calculate "yomon/yahshiligi" outcome summary
                    let evaluationTitle = "";
                    let evaluationDesc = "";
                    let evaluationBadgeClass = "";
                    let evaluationEmoji = "";
                    
                    if (perfPercent >= 90) {
                      evaluationTitle = "A'lo / Mukammal!";
                      evaluationDesc = "Siz Oxford Discover 2 darslik bo'limlarining ushbu savollarini mukammal o'zlashtiribsiz. Zo'r natija! (Excellent!)";
                      evaluationBadgeClass = "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-350";
                      evaluationEmoji = "🏆";
                    } else if (perfPercent >= 70) {
                      evaluationTitle = "Yaxshi / Muzaffar!";
                      evaluationDesc = "Juda chiroyli natija! Mavzular va yangi so'zlarni yaxshi tushunyapsiz. Takrorlash bilan yanada yuqori ko'rsatkich bera olasiz. (Well Done!)";
                      evaluationBadgeClass = "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300";
                      evaluationEmoji = "⭐";
                    } else if (perfPercent >= 50) {
                      evaluationTitle = "Qoniqarli!";
                      evaluationDesc = "O'rtacha natija. So'zlar lug'atini va grammatik qoidalarni yana bir bor ko'zdan kechirib, barcha yulduzlarni olishga intiling. (Satisfactory!)";
                      evaluationBadgeClass = "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300";
                      evaluationEmoji = "📈";
                    } else {
                      evaluationTitle = "Bo'shroq natija (Ko'p takrorlash lozim)!";
                      evaluationDesc = "Hozircha natija pastroq. Ruhiy tushkunlikka tushmang! Har bir darsning so'zlari lug'ati va grammatikasini qayta ko'ring. (Needs Practice!)";
                      evaluationBadgeClass = "bg-rose-50 text-rose-850 border-rose-200 dark:bg-rose-950/35 dark:text-rose-350";
                      evaluationEmoji = "📚";
                    }

                    // 2. Calculate dynamic quiz allowed period vs actual spent
                    const totalAllowedSecs = activeQuestions.reduce((sum, q) => sum + getQuestionDifficulty(q).seconds, 0);
                    const timeoutsCount = timedOutQuestions.length;
                    const incorrects = totalQuestions - corrects - timeoutsCount;

                    const formatTime = (secs: number) => {
                      const m = Math.floor(secs / 60);
                      const s = secs % 60;
                      return m > 0 ? `${m} minut ${s} soniya` : `${s} soniya`;
                    };

                    let speedTitle = "";
                    let speedDesc = "";
                    let speedBadgeClass = "";
                    let speedIcon = null;

                    if (timeoutsCount === 0) {
                      speedTitle = "Vaqtida bajarilgan! (Perfect Speed)";
                      speedDesc = "Siz barcha savollarga belgilangan soniyalar ichida ulgurdingiz. Chaqqonligingiz tahsinga loyiq!";
                      speedBadgeClass = "bg-emerald-50 border border-emerald-150 text-emerald-800";
                      speedIcon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
                    } else if (timeoutsCount <= totalQuestions * 0.3) {
                      speedTitle = "Yaxshi muddat ko'rsatkichi!";
                      speedDesc = `Aksar savollarga o'z vaqtida ulgurdingiz. Faqatgina ${timeoutsCount} ta savolda vaqt yetmay koldi.`;
                      speedBadgeClass = "bg-amber-50 border border-amber-150 text-amber-800";
                      speedIcon = <Timer className="w-5 h-5 text-amber-600 shrink-0" />;
                    } else {
                      speedTitle = "Vaqt bo'yicha sekinroq (Kuchsiz)!";
                      speedDesc = `Sizda jami ${timeoutsCount} ta savolda vaqt yetmay tugadi. Lug'atni mukammal o'rganib tezlikni oshiring.`;
                      speedBadgeClass = "bg-rose-50 border border-rose-150 text-rose-800";
                      speedIcon = <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 animation-pulse" />;
                    }

                    return (
                      <div className="space-y-6 max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-3">
                          <div className="inline-flex items-center justify-center p-3 bg-red-105 rounded-full border border-red-50">
                            <Trophy className="w-10 h-10 text-amber-500 fill-amber-300" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-xl font-black text-[#002147] tracking-tight">Imtihon topshirildi!</h3>
                            <p className="text-slate-500 text-xs">
                              Siz smart adaptive timer tizimi orqali imtihon ko'rsatkichlarini muvaffaqiyatli yakunladingiz.
                            </p>
                          </div>
                        </div>

                        {/* Two Columns Dashboard */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                          
                          {/* COLUMN 1: Score & Evaluation */}
                          <div className="bg-stone-50 border border-slate-150 rounded-2xl p-5 space-y-4 shadow-sm flex flex-col justify-between">
                            <div className="flex items-center gap-3">
                              {/* Large circular progress mark */}
                              <div className="w-20 h-20 rounded-full bg-white border-4 border-oxford-crimson/25 flex flex-col items-center justify-center shrink-0 shadow-inner">
                                <span className="text-xl font-black text-oxford-crimson">{perfPercent}%</span>
                                <span className="text-[8px] text-slate-400 font-extrabold tracking-wider uppercase">Ball</span>
                              </div>

                              <div>
                                <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-widest">To'plangan Ball</h4>
                                <div className="text-base font-black text-slate-800 flex items-center gap-1.5 mt-0.5">
                                  <span>{evaluationEmoji}</span>
                                  <span>{evaluationTitle}</span>
                                </div>
                              </div>
                            </div>

                            {/* Evaluation Description card */}
                            <div className={`p-3.5 rounded-xl border text-xs font-semibold leading-relaxed ${evaluationBadgeClass}`}>
                              <span className="block font-bold text-[10px] uppercase tracking-wider mb-1 opacity-75">Natija haqida tahlil:</span>
                              <p>{evaluationDesc}</p>
                            </div>
                          </div>

                          {/* COLUMN 2: Speed and Timings */}
                          <div className="bg-stone-50 border border-slate-150 rounded-2xl p-5 space-y-4 shadow-sm flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                              <div>
                                <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-widest">Sarflangan Vaqt</h4>
                                <p className="text-base font-black text-slate-800 mt-1">
                                  {formatTime(totalTimeSpent)} <span className="text-xs font-normal text-slate-400">/ ajratilgan {formatTime(totalAllowedSecs)}dan</span>
                                </p>
                              </div>
                              <div className="p-2 bg-slate-100 rounded-lg">
                                <Clock className="w-5 h-5 text-slate-700" />
                              </div>
                            </div>

                            {/* Speed assessment card */}
                            <div className={`p-3.5 rounded-xl flex items-start gap-2.5 text-xs font-semibold leading-relaxed ${speedBadgeClass}`}>
                              {speedIcon}
                              <div>
                                <span className="block font-bold text-[10px] uppercase tracking-wider mb-0.5">{speedTitle}</span>
                                <p className="opacity-90">{speedDesc}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Numerical metrics panel */}
                        <div className="bg-slate-55 border border-slate-200 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-y-0 divide-x divide-slate-200 select-none">
                          <div className="p-2">
                            <span className="block text-xl font-bold font-mono text-slate-900">{totalQuestions} ta</span>
                            <span className="text-[10px] text-slate-400 uppercase font-extrabold font-mono">Jami savol</span>
                          </div>
                          <div className="p-2 border-l border-slate-200">
                            <span className="block text-xl font-bold font-mono text-emerald-600">{corrects} ta</span>
                            <span className="text-[10px] text-emerald-600 uppercase font-extrabold font-mono">To'g'ri</span>
                          </div>
                          <div className="p-2 border-l border-slate-200">
                            <span className="block text-xl font-bold font-mono text-rose-500">{incorrects} ta</span>
                            <span className="text-[10px] text-rose-500 uppercase font-extrabold font-mono">Xato</span>
                          </div>
                          <div className="p-2 border-l border-slate-200">
                            <span className="block text-xl font-bold font-mono text-violet-500">{timeoutsCount} ta</span>
                            <span className="text-[10px] text-violet-500 uppercase font-extrabold font-mono">Vaqti o'tgan</span>
                          </div>
                        </div>

                        {/* Retake or Back controls */}
                        <div className="pt-2 flex gap-4">
                          <button
                            onClick={() => initQuiz()}
                            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all shadow-xs border border-slate-200 cursor-pointer"
                          >
                            🔄 Qayta urinish (Retake Test)
                          </button>
                          <button
                            onClick={() => {
                              setActiveSegment(AppSection.HOME);
                              speakWord("Back on dashboard");
                            }}
                            className="flex-1 py-3 bg-oxford-crimson hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer"
                          >
                            🏠 Asosiy sahifaga qaytish
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {activeSegment === AppSection.CHAT_ROOM && (
            <div className="space-y-6" id="class-chat-room-route-wrapper">
              <SinfChatRoom
                studentName={studentName}
                onlineCount={onlineCount}
                onlineList={onlineList}
                onAwardPoints={awardPoints}
                speakWord={(w) => speakWord(w)}
              />
            </div>
          )}
        </div>

        {/* AVATAR SELECTOR MODAL */}
        {showAvatarModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl max-w-md w-full relative space-y-5 text-slate-900 dark:text-white">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📸</span>
                  <h3 className="font-extrabold text-base text-oxford-blue dark:text-white">Rasmni o'zgartirish</h3>
                </div>
                <button
                  onClick={() => setShowAvatarModal(false)}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-full hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Current Avatar State */}
                <div className="flex flex-col items-center gap-2 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-105 dark:border-slate-800/80">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Hozirgi rasm</span>
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-amber-400 shadow-md">
                    {globalAvatar ? (
                      <img src={globalAvatar} alt="Current" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full bg-amber-100 flex items-center justify-center text-amber-800 text-2xl font-black">
                        {studentName ? studentName.charAt(0).toUpperCase() : "S"}
                      </div>
                    )}
                  </div>
                </div>

                {/* Option 2: Upload File */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest block">Kompyuter yoki telefondan rasm yuklash:</span>
                  <label className="flex items-center gap-2 justify-center px-4 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer transition-all text-xs font-bold text-slate-700 dark:text-slate-300 shadow-2xs">
                    📥 Kompyuterdan rasm tanlash...
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 3 * 1024 * 1024) {
                            alert("Kechirasiz, rasm hajmi juda katta (maksimal 3MB)!");
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === "string") {
                              setGlobalAvatar(reader.result);
                              localStorage.setItem("oxford_chat_avatar", reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>

                {/* Option 3: Custom Image URL */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest block">Rasm URL manzilini qo'yish:</span>
                  <input
                    type="text"
                    placeholder="https://example.com/photo.jpg"
                    value={globalAvatar.startsWith("data:") ? "" : globalAvatar}
                    onChange={(e) => {
                      const val = e.target.value.trim();
                      if (val && (val.startsWith("http://") || val.startsWith("https://"))) {
                        setGlobalAvatar(val);
                        localStorage.setItem("oxford_chat_avatar", val);
                      }
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => setShowAvatarModal(false)}
                  className="px-5 py-2.5 bg-oxford-blue text-white font-extrabold rounded-xl text-xs hover:bg-slate-900 shadow-md transition-all cursor-pointer"
                >
                  Saqlash
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SAFETY CONFIRMATION MODAL */}
        {showConfirmModal && confirmModalConfig && (
          <div className="fixed inset-0 z-55 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-fade-in" id="safety-confirm-modal-overlay">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl max-w-md w-full relative space-y-6 text-slate-900 dark:text-white">
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className={`p-2.5 rounded-2xl flex items-center justify-center text-2xl ${
                  confirmModalConfig.actionType === "delete" ? "bg-red-50 text-red-650 dark:bg-red-950/30 dark:text-red-400" : "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
                }`}>
                  {confirmModalConfig.actionType === "delete" ? "🗑️" : "🔄"}
                </span>
                <div>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white leading-tight">
                    {confirmModalConfig.title}
                  </h3>
                  <span className="text-[10px] font-mono text-red-500 font-extrabold uppercase tracking-widest block mt-0.5">Xavfsizlik choralari</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                  {confirmModalConfig.message}
                </p>
                {confirmModalConfig.subText && (
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-2xl p-4 text-xs text-red-800 dark:text-red-400 font-semibold flex items-start gap-2">
                    <span className="text-base leading-none">⚠️</span>
                    <span className="leading-snug">{confirmModalConfig.subText}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowConfirmModal(false);
                    setConfirmModalConfig(null);
                  }}
                  className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-extrabold rounded-2xl cursor-pointer transition-colors text-xs text-center"
                >
                  Bekor qilish (Cancel)
                </button>
                <button
                  onClick={() => {
                    if (confirmModalConfig.actionType === "reset") {
                      // reset statistics
                      setTotalQuizzesTaken(0);
                      setBestScore(0);
                      setWordsLearnedCount(0);
                      localStorage.setItem("oxford_quizzes_taken", "0");
                      localStorage.setItem("oxford_best_score", "0");
                      localStorage.setItem("oxford_words_learned", "0");
                      
                      // sync with database if exists
                      fetch("/api/sync-stats", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          username: studentName,
                          wordsLearnedCount: 0,
                          totalQuizzesTaken: 0,
                          bestScore: 0,
                          userStreak: userStreak
                        })
                      }).catch(() => {});
                      
                    } else if (confirmModalConfig.actionType === "delete") {
                      // delete account entirely
                      handleLogOutPortal();
                    }
                    setShowConfirmModal(false);
                    setConfirmModalConfig(null);
                  }}
                  className={`flex-1 py-3 px-4 text-white font-extrabold rounded-2xl cursor-pointer transition-colors text-xs text-center ${
                    confirmModalConfig.actionType === "delete" ? "bg-red-650 hover:bg-red-700" : "bg-amber-600 hover:bg-amber-700"
                  }`}
                >
                  Ha, roziman (Confirm)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SITE METRIC CREDIT FOOTER */}
        <footer className="h-[45px] bg-slate-100 border-t border-slate-200 flex items-center justify-between px-6 md:px-8 text-[11px] text-slate-600 shrink-0 select-none">
          <span>&copy; {new Date().getFullYear()} Oxford University Press - Digital Academy Edition</span>
          <span className="hidden sm:inline-block font-mono bg-white px-2 py-0.5 rounded border border-slate-300">v4.3.5 - Oxford Discover</span>
        </footer>
      </main>

      {/* STREAK CELEBRATION OVERLAY */}
      <AnimatePresence>
        {showStreakCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
            id="streak-celebrate-overlay"
          >
            {/* Animated celebratory container */}
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-lg overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-indigo-950 text-white rounded-3xl border border-amber-500/30 p-8 shadow-2xl flex flex-col items-center text-center"
            >
              {/* Starry particle visual accents */}
              <div className="absolute top-0 inset-x-0 h-40 bg-radial-gradient from-amber-500/10 to-transparent pointer-events-none" />
              
              {/* Confetti generator background emoji burst */}
              <div className="absolute -top-10 -left-10 text-5xl opacity-20 select-none animate-bounce">✨</div>
              <div className="absolute -top-10 -right-10 text-5xl opacity-20 select-none animate-bounce font-sans delay-150">🎉</div>
              <div className="absolute bottom-10 left-10 text-5xl opacity-10 select-none animate-pulse">🔥</div>
              <div className="absolute bottom-10 right-10 text-5xl opacity-10 select-none animate-pulse font-sans">⭐</div>

              {/* Celebration crown / fire crest */}
              <motion.div 
                animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative w-28 h-28 bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-600 rounded-full flex items-center justify-center text-5xl shadow-xl border-4 border-slate-900"
              >
                🔥
                <div className="absolute -top-2 -right-2 text-2xl animate-bounce">👑</div>
                <div className="absolute -bottom-1 bg-amber-500 text-slate-900 font-extrabold text-[10px] tracking-widest uppercase rounded-full px-3 py-0.5 border border-white">
                  SUPER
                </div>
              </motion.div>

              {/* Achievement Badge Row */}
              <div className="mt-6 space-y-1">
                <span className="text-[10px] uppercase font-black tracking-widest text-amber-400 bg-amber-500/10 border border-amber-400/20 px-3 py-1 rounded-full">
                  KUNDALIK SIZNING RATINGINGIZ • {celebrationDays >= 30 ? "CHAMPION" : "PRO"}
                </span>
                <h3 className="text-2xl font-black tracking-tight text-white font-sans mt-3">
                  {celebrationDays}-Kunlik Faol Faoliyat! 🚀
                </h3>
                <p className="text-amber-300 font-mono text-xs tracking-wider">
                  {celebrationDays}-DAY STUDY STREAK UNLOCKED
                </p>
              </div>

              {/* Interactive Speech Trigger */}
              <div className="my-6 bg-slate-950/55 border border-slate-800 rounded-2xl p-4 w-full">
                <p className="text-sm font-bold text-slate-100 leading-relaxed font-sans">
                  "Tabriklaymiz! Siz Oxford Discover darslik platformasida ketma-ket <span className="text-amber-400">{celebrationDays} kun</span> davomida ingliz tili darslarini o'rganib, zanjirni mustahkam saqladingiz! Davomiylik muvaffaqiyat garovidir!" 🎓
                </p>
                <div className="mt-3 text-[11px] text-slate-400 italic">
                  "Congratulations! You've achieved a marvelous studying sequence. Consistency makes learning easy and natural."
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3.5 w-full mt-2">
                <button
                  onClick={() => {
                    speakWord(`I have reached an awesome ${celebrationDays}-day study streak! Keep up that fantastic energy!`);
                  }}
                  className="py-3 px-4 bg-slate-850 hover:bg-slate-800 text-white font-extrabold rounded-2xl text-xs transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5 border border-slate-800"
                  id="btn-celebration-speech"
                >
                  <span>🔊 Ovoz (Speak)</span>
                </button>
                
                <button
                  onClick={() => {
                    setShowStreakCelebration(false);
                    speakWord("Fantastic! Let's continue discovering more English lessons.");
                  }}
                  className="py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-neutral-900 font-black rounded-2xl text-xs transition-all active:scale-[0.98] cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                  id="btn-celebration-continue"
                >
                  <span>Muvaffaqiyatli Davom Etish (Continue) 🚀</span>
                </button>
              </div>

              {/* Micro close corner icon */}
              <button
                onClick={() => setShowStreakCelebration(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer text-xl p-1"
                aria-label="Yopish"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
