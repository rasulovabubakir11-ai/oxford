import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Smile, 
  Video, 
  Users, 
  Volume2, 
  VolumeX,
  Trash2, 
  Sparkles, 
  Heart, 
  Trophy, 
  User, 
  Globe, 
  HelpCircle,
  Play,
  Settings,
  Check,
  CheckCheck,
  Palette,
  Volume1,
  UserCheck,
  ShieldAlert,
  Search,
  BookOpen
} from "lucide-react";

// Preset Unsplash profile images (student avatars)
const PRESET_AVATARS = [
  { name: "Panda Student", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80" },
  { name: "Owl Scholar", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80" },
  { name: "Explorer Boy", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80" },
  { name: "Smart Girl", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80" },
  { name: "Cat Reader", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80" },
  { name: "Koala Bear", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80" }
];

// Presets for kid-friendly Telegram-like stickers
const STICKERS = [
  { emoji: "🎉", text: "Malades! 🎉", color: "from-amber-400 to-orange-500" },
  { emoji: "👍", text: "Super! 👍", color: "from-blue-400 to-indigo-505" },
  { emoji: "📚", text: "O'qish vaqti! 📚", color: "from-emerald-400 to-teal-505" },
  { emoji: "💡", text: "Ajoyib fikr! 💡", color: "from-yellow-300 to-amber-500" },
  { emoji: "📝", text: "A'lo topshiriq! 📝", color: "from-purple-400 to-pink-500" },
  { emoji: "🌟", text: "Yulduzli javob! 🌟", color: "from-red-400 to-rose-500" },
  { emoji: "🎓", text: "Kelajak olimi! 🎓", color: "from-indigo-400 to-purple-600" },
  { emoji: "🦁", text: "Jasur o'quvchi! 🦁", color: "from-orange-400 to-amber-600" }
];

// Education-focused Youtube references
const SHORTCUT_VIDEOS = [
  { title: "English Alphabet Song", id: "75p-N9YKqNo" },
  { title: "Animal Groups Song", id: "4S-CgOcl4m8" },
  { title: "Present Simple Lesson", id: "L9AWrJnhsRI" }
];

// Telegram-like wallpapers with theme specifics
const TELEGRAM_WALLPAPERS = [
  { 
    id: "telegram-classic", 
    name: "Classic Blue 🧊", 
    bgClass: "bg-[#DFECE6] dark:bg-[#0E1621] border-slate-200 dark:border-slate-800", 
    bubbleMine: "bg-[#E2F7CB] dark:bg-[#2B5278] text-slate-800 dark:text-white border-b border-emerald-200/40 dark:border-[#386ca0]", 
    bubbleOther: "bg-white dark:bg-[#182533] text-slate-800 dark:text-slate-100 border-b border-slate-200/50 dark:border-[#131f2b]"
  },
  { 
    id: "arctic-blue", 
    name: "Arctic Blue ❄️", 
    bgClass: "bg-[#D2E2EC] dark:bg-[#0A0D14]", 
    bubbleMine: "bg-[#BFE2FF] dark:bg-[#1D3247] text-slate-900 dark:text-gray-100", 
    bubbleOther: "bg-white dark:bg-[#18202F] text-slate-800 dark:text-slate-100" 
  },
  { 
    id: "graphite-dark", 
    name: "Graphite Charcoal 🕷️", 
    bgClass: "bg-[#212121] dark:bg-[#121212]", 
    bubbleMine: "bg-[#333333] text-white border-0", 
    bubbleOther: "bg-[#2b2b2b] text-white border-0" 
  },
  { 
    id: "spring-mint", 
    name: "Spring Mint 🌱", 
    bgClass: "bg-[#E4EDE7] dark:bg-[#080E0B]", 
    bubbleMine: "bg-[#CBEBD1] dark:bg-[#1C3A27] text-slate-900 dark:text-slate-100", 
    bubbleOther: "bg-white dark:bg-[#121915] text-slate-800 dark:text-slate-100" 
  },
  { 
    id: "sunset-coral", 
    name: "Cozy Sunset 🌇", 
    bgClass: "bg-[#F7EBE1] dark:bg-[#1C1613]", 
    bubbleMine: "bg-[#FBCFC5] dark:bg-[#432521] text-slate-900 dark:text-slate-100", 
    bubbleOther: "bg-white dark:bg-[#201B18] text-slate-800 dark:text-slate-100" 
  }
];

export interface LiveMessage {
  id: string;
  senderName: string;
  avatarUrl: string;
  text: string;
  mediaType: "text" | "video" | "sticker" | "image";
  mediaUrl?: string;
  timestamp: string;
  role: "student" | "teacher";
}

interface SinfChatRoomProps {
  studentName: string;
  onlineCount: number;
  onlineList: string[];
  onAwardPoints: (pts: number) => void;
  speakWord: (txt: string) => void;
}

export function SinfChatRoom({
  studentName,
  onlineCount,
  onlineList,
  onAwardPoints,
  speakWord
}: SinfChatRoomProps) {
  const [messages, setMessages] = useState<LiveMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    return localStorage.getItem("oxford_chat_avatar") || PRESET_AVATARS[0].url;
  });

  // Telegram Custom Options
  const [overrideName, setOverrideName] = useState(() => {
    return localStorage.getItem("telegram_override_username") || "";
  });
  const [selectedWallpaper, setSelectedWallpaper] = useState(() => {
    return localStorage.getItem("telegram_chat_wallpaper") || "telegram-classic";
  });
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem("telegram_chat_sounds") !== "false";
  });
  const [searchQuery, setSearchQuery] = useState("");

  // UI Dialog States
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [showVideoSender, setShowVideoSender] = useState(false);
  const [videoUrlInput, setVideoUrlInput] = useState("");
  
  // Settings Tab/Drawer Switcher
  const [sidebarTab, setSidebarTab] = useState<"users" | "settings">("users");

  const feedEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play lovely retro Telegram chat sound effect on incoming/outgoing
  const playSfx = (type: "sent" | "received" | "delete") => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === "sent") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, now); // D5 note
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5 note
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === "received") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(392.00, now); // G4 note
        osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.08); // C5 note
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.13);
      } else {
        // delete tone
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(110, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.24);
      }
    } catch (e) {
      // Audio fallback catch
    }
  };

  // Derive active username
  const activeName = (overrideName.trim() || studentName || "O'quvchi").trim();

  // Load backend message feed
  const fetchMessages = async (triggerSfx = false) => {
    try {
      const res = await fetch("/api/chat-messages");
      if (!res.ok) return;
      const ct = res.headers.get("content-type");
      if (!ct || !ct.includes("application/json")) return;
      const data = await res.json();
      if (data && data.messages) {
        // Check if there are newly added messages
        const prevLength = messages.length;
        setMessages(data.messages);
        
        if (triggerSfx && prevLength > 0 && data.messages.length > prevLength) {
          // Play received tone if the last message wasn't ours
          const lastMsg = data.messages[data.messages.length - 1];
          if (lastMsg && lastMsg.senderName !== activeName) {
            playSfx("received");
          }
        }
      }
    } catch (err) {
      // Quiet fail during server reboot
    }
  };

  // Poll chat messages
  useEffect(() => {
    fetchMessages(false);
    const timer = setInterval(() => fetchMessages(true), 3000);
    return () => clearInterval(timer);
  }, [activeName, messages.length]);

  // Handle auto-scroll down
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // Update selection wallpaper
  const changeWallpaper = (id: string) => {
    setSelectedWallpaper(id);
    localStorage.setItem("telegram_chat_wallpaper", id);
    playSfx("received");
  };

  // Select Avatar URL helper
  const handleSelectAvatar = (url: string) => {
    setSelectedAvatar(url);
    localStorage.setItem("oxford_chat_avatar", url);
    setShowAvatarPicker(false);
    playSfx("sent");
    speakWord("Avatar changed!");
  };

  // Handle text-to-speech playing
  const playTextToSpeech = (text: string) => {
    speakWord(text);
  };

  // Extract YouTube ID helper
  const extractYoutubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // POST newly created messages
  const handleSendMessage = async (
    textMsg: string, 
    type: "text" | "video" | "sticker" = "text",
    urlValue?: string
  ) => {
    const trimmed = textMsg.trim();
    if (type === "text" && !trimmed) return;

    // Trigger local audio effect instantly
    playSfx("sent");

    // Temp optimistic message id
    const tempId = "temp_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5);
    const optimisticMessage: LiveMessage = {
      id: tempId,
      senderName: activeName,
      avatarUrl: selectedAvatar,
      text: type === "text" ? trimmed : textMsg,
      mediaType: type,
      mediaUrl: urlValue || "",
      timestamp: new Date().toISOString(),
      role: "student"
    };

    setMessages(prev => [...prev.filter(m => m.id !== tempId), optimisticMessage]);
    setInputText("");

    try {
      const res = await fetch("/api/chat-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName: activeName,
          avatarUrl: selectedAvatar,
          text: type === "text" ? trimmed : textMsg,
          mediaType: type,
          mediaUrl: urlValue || "",
          role: "student"
        })
      });

      if (res.ok) {
        const ct = res.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) return;
        const data = await res.json();
        if (data && data.message) {
          // Replace optimistic ID with official system database ID
          setMessages(prev => prev.map(m => m.id === tempId ? data.message : m));
          onAwardPoints(1); // Gain Oxford study score credit
        }
      }
    } catch (err) {
      console.error("Could not sync sent message with Cloud Container:", err);
    }
  };

  // Delete message handler
  const handleDeleteMessage = async (msgId: string) => {
    playSfx("delete");
    // Optimistic removal
    setMessages(prev => prev.filter(m => m.id !== msgId));
    try {
      await fetch(`/api/chat-messages/${msgId}`, {
        method: "DELETE"
      });
      onAwardPoints(-1); // Deduct the reward point since they deleted it
    } catch (err) {
      console.error("Could not complete delete action on storage:", err);
    }
  };

  const sendSticker = (sticker: typeof STICKERS[0]) => {
    handleSendMessage(`${sticker.emoji} ${sticker.text}`, "sticker", sticker.emoji);
    setShowStickerPicker(false);
    onAwardPoints(2);
  };

  const sendVideoLink = () => {
    let yid = extractYoutubeId(videoUrlInput);
    if (!yid) {
      if (videoUrlInput.trim().length === 11) {
        yid = videoUrlInput.trim();
      }
    }

    if (!yid) {
      alert("Iltimos, video uchun to'g'ri YouTube manzilini kiriting!");
      return;
    }

    handleSendMessage("Ingliz tili dars videosi!", "video", yid);
    setVideoUrlInput("");
    setShowVideoSender(false);
    onAwardPoints(3); 
  };

  const sendShortcutVideo = (vid: typeof SHORTCUT_VIDEOS[0]) => {
    handleSendMessage(`Video dars: ${vid.title}`, "video", vid.id);
    setShowVideoSender(false);
    onAwardPoints(3);
  };

  // Get selected wallpaper config
  const wallpaperConfig = TELEGRAM_WALLPAPERS.find(w => w.id === selectedWallpaper) || TELEGRAM_WALLPAPERS[0];

  // Filtering list by search bar
  const filteredMessages = messages.filter(msg => {
    if (!searchQuery.trim()) return true;
    const txtMatch = msg.text.toLowerCase().includes(searchQuery.toLowerCase());
    const nameMatch = msg.senderName.toLowerCase().includes(searchQuery.toLowerCase());
    return txtMatch || nameMatch;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#EDF3F7] dark:bg-slate-950 p-2 sm:p-4 rounded-3xl" id="tg-chat-app-container">
      
      {/* LEFT PORTAL COMPONENT: ACTIVE MEMBERS & SETTINGS INSIDE CHAT COLD PANEL (4 columns on lg) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        
        {/* Telegram Tab Controller Buttons */}
        <div className="flex bg-slate-200/80 dark:bg-slate-900 p-1 rounded-2xl gap-1">
          <button
            onClick={() => setSidebarTab("users")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              sidebarTab === "users"
                ? "bg-white dark:bg-slate-800 text-[#002147] dark:text-amber-400 shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            <Users className="w-4 h-4 shrink-0 text-sky-500" />
            O'quvchilar ({onlineCount})
          </button>
          <button
            onClick={() => setSidebarTab("settings")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              sidebarTab === "settings"
                ? "bg-white dark:bg-slate-800 text-[#002147] dark:text-amber-400 shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
            id="tg-settings-switcher-tab"
          >
            <Settings className="w-4 h-4 shrink-0 text-amber-500" />
            Sozlamalar ⚙️
          </button>
        </div>

        {/* TAB 1: ACTIVE LIVE CLASSMATES ONLINE */}
        {sidebarTab === "users" && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-3xl shadow-xs space-y-4 flex flex-col flex-1 min-h-[420px]">
            
            {/* Logged User Info */}
            <div className="p-3.5 bg-sky-50/50 dark:bg-slate-950/40 rounded-2xl border border-sky-100/60 dark:border-slate-850/80 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="relative shrink-0">
                  <img 
                    src={selectedAvatar} 
                    alt="Active User Round Portrait" 
                    className="w-11 h-11 rounded-full border-2 border-sky-500 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                    className="absolute -bottom-1 -right-1 bg-slate-950 text-white border border-white p-0.5 rounded-full text-[9px] cursor-pointer"
                    title="Avatar rasmini o'zgartirish"
                  >
                    ✏️
                  </button>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-black uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                    Siz (Online)
                  </span>
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 truncate mt-0.5">
                    {activeName}
                  </h4>
                </div>
              </div>

              {/* Instant Avatar picker wrapper */}
              <AnimatePresence>
                {showAvatarPicker && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden border-t border-slate-200/50 pt-2.5"
                  >
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Profil rasmini tanlang:</p>
                    <div className="grid grid-cols-6 gap-1.5">
                      {PRESET_AVATARS.map((av, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectAvatar(av.url)}
                          className={`w-8 h-8 rounded-full overflow-hidden border transition-all ${
                            selectedAvatar === av.url ? "border-sky-500 scale-105" : "border-slate-200"
                          }`}
                        >
                          <img src={av.url} alt={av.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="pb-1 border-b border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#002147] dark:text-slate-200">
                Online Sinfdoshlar listi
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Faol muloqotdagi o'quvchilar ishtiroki
              </p>
            </div>

            {/* List scrollbar */}
            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[300px] lg:max-h-none pr-1">
              {onlineList.length > 0 ? (
                onlineList.map((usrName, idx) => {
                  const isYou = usrName === studentName || usrName === activeName;
                  const stableImg = `https://images.unsplash.com/photo-${1500000000000 + (idx * 163456)}?auto=format&fit=crop&w=120&h=120&q=80`;
                  
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                        isYou 
                          ? "bg-slate-50 dark:bg-slate-900 border-sky-300/40" 
                          : "bg-transparent border-slate-100 dark:border-slate-800"
                      }`}
                    >
                      <div className="relative shrink-0">
                        <img 
                          src={isYou ? selectedAvatar : stableImg} 
                          alt={usrName} 
                          className="w-7 h-7 rounded-full object-cover border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-slate-800 dark:text-slate-200 truncate">
                          {usrName} {isYou && <span className="text-sky-500 text-[10px]">(Siz)</span>}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs font-medium">
                  Hozircha hech kim yo'q...
                </div>
              )}
            </div>

            {/* Total metric stats info */}
            <div className="p-3 bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/50 rounded-2xl text-[10.5px] text-[#002147]/80 dark:text-amber-300 flex items-start gap-1.5 leading-relaxed">
              <span>🎁</span>
              <span>
                Chatda faollik ko'rsatib, fikrlash va yulduzchalarni qo'lga kiritishingiz mumkin!
              </span>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE TELEGRAM CUSTOM SETTINGS CONTAINER */}
        {sidebarTab === "settings" && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-3xl shadow-xs space-y-5 flex flex-col flex-1 min-h-[420px]" id="tg-settings-sub-panel">
            
            <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
              <h4 className="text-xs font-black uppercase text-[#002147] dark:text-amber-400 flex items-center gap-1.5">
                <Settings className="w-4 h-4 text-emerald-500" />
                Telegram Interaktiv Sozlamalari
              </h4>
              <p className="text-[10px] text-slate-400">
                Suhbat interfeysini xohishingizga ko'ra o'zgartiring!
              </p>
            </div>

            {/* Interactive User Nickname override for Telegram */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold uppercase text-slate-500 tracking-wider block">
                ✍️ Telegram Tahallusingiz (Nickname):
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={overrideName}
                  onChange={(e) => {
                    const val = e.target.value.substring(0, 18);
                    setOverrideName(val);
                    localStorage.setItem("telegram_override_username", val);
                  }}
                  placeholder={studentName || "Sizning ismingiz"}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 p-2 text-xs font-black rounded-xl outline-none focus:ring-2 focus:ring-sky-505 dark:text-white"
                />
              </div>
              <p className="text-[9px] text-slate-400 font-medium">
                Nikni o'zgartirish orqali chat suhbatidagi ismingiz mustaqil yangilanadi!
              </p>
            </div>

            {/* Sound options inside Telegram */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-150 dark:border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[11px] font-black text-slate-800 dark:text-slate-250 block">🔊 Retro Chat ovozlari</span>
                <span className="text-[9.5px] text-slate-400 block">Suhbat yozishgan paytdagi yoqimli SFX</span>
              </div>
              <button
                onClick={() => {
                  const nextSound = !soundEnabled;
                  setSoundEnabled(nextSound);
                  localStorage.setItem("telegram_chat_sounds", String(nextSound));
                  playSfx("sent");
                }}
                className={`w-12 h-6.5 rounded-full p-0.5 transition-colors cursor-pointer border-0 ${
                  soundEnabled ? "bg-emerald-555 flex justify-end" : "bg-slate-300 flex justify-start"
                }`}
              >
                <span className="w-5.5 h-5.5 bg-white rounded-full shadow-xs block" />
              </button>
            </div>

            {/* Choose Wallpapers */}
            <div className="space-y-2">
              <span className="text-[11px] font-extrabold uppercase text-slate-500 tracking-wider block">
                🎨 Chat fonini o'zgartirish (Wallpapers):
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {TELEGRAM_WALLPAPERS.map((wp) => (
                  <button
                    key={wp.id}
                    onClick={() => changeWallpaper(wp.id)}
                    className={`p-2.5 rounded-xl border text-xs font-black flex items-center justify-between transition-all cursor-pointer ${
                      selectedWallpaper === wp.id
                        ? "bg-sky-50 border-sky-400 text-sky-700 dark:bg-slate-800 dark:border-sky-500 dark:text-sky-300"
                        : "bg-slate-50/50 border-slate-200 hover:bg-slate-100 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-350"
                    }`}
                  >
                    <span>{wp.name}</span>
                    <span className={`w-3.5 h-3.5 rounded-full ${wp.id === "telegram-classic" ? "bg-[#DFECE6]" : wp.id === "arctic-blue" ? "bg-[#D2E2EC]" : wp.id === "graphite-dark" ? "bg-[#212121]" : wp.id === "spring-mint" ? "bg-[#E4EDE7]" : "bg-[#F7EBE1]"}`} />
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* RIGHT PORTAL COLUMN: HIGH FIDELITY TELEGRAM MESSAGE CHANNEL PANEL (8 columns on lg) */}
      <div className="lg:col-span-8 flex flex-col h-[610px] bg-white dark:bg-[#182533] border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg relative">
        
        {/* TELEGRAM HEADER CONTAINER (Top level details matching TG aesthetics) */}
        <div className="bg-white dark:bg-[#18202F] border-b border-slate-150 dark:border-slate-800/80 p-3.5 md:p-4 shrink-0 flex items-center justify-between z-10 relative">
          <div className="flex items-center gap-3 min-w-0">
            {/* Round group profile picture */}
            <div className="relative shrink-0 select-none">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 text-white font-black text-sm flex items-center justify-center shadow-inner tracking-wider">
                OD
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
            </div>

            <div className="min-w-0">
              <h3 className="text-xs md:text-sm font-black text-slate-800 dark:text-slate-100 truncate">
                Interactive Oxford Discover Chat 🎓
              </h3>
              <p className="text-[10px] text-sky-500 dark:text-sky-400 font-bold flex items-center gap-1.5 mt-0.5">
                <span>{onlineCount} active sinfdoshlar online</span>
                <span>·</span>
                <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 px-1 py-0.2 rounded-sm text-[8px] font-black uppercase">
                  Telegram mode
                </span>
              </p>
            </div>
          </div>

          {/* Inline message search option */}
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Xabarlarni qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-100 dark:bg-slate-900 border-0 rounded-2xl pl-8 pr-3 py-1.5 text-[10.5px] font-bold outline-none placeholder-slate-400 text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-sky-500 w-36 md:w-44 transition-all"
              />
            </div>

            <button
              onClick={() => fetchMessages(true)}
              className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-colors"
              title="Yangilash (Refresh)"
            >
              🔄
            </button>
          </div>
        </div>

        {/* MESSAGES WALLPAPER FEED PANEL (Includes dynamic selector themes matching TG) */}
        <div 
          className={`flex-1 overflow-y-auto p-4 space-y-3.5 transition-all scroll-smooth ${wallpaperConfig.bgClass}`}
          id="telegram-channel-wall-scroll"
        >
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => {
              const isMine = msg.senderName === activeName;
              const isSticker = msg.mediaType === "sticker";
              const isVideo = msg.mediaType === "video";
              const isTeacher = msg.role === "teacher";

              // Check if actual DB saved ID or temp optimistic ID
              const isTemp = msg.id.startsWith("temp_");

              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  key={msg.id}
                  className={`flex items-end gap-2 max-w-[85%] ${isMine ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                >
                  {/* Avatar left/right */}
                  <img
                    src={msg.avatarUrl}
                    alt={msg.senderName}
                    className={`w-8.5 h-8.5 rounded-full object-cover shrink-0 select-none shadow-sm ${
                      isTeacher 
                        ? "ring-2 ring-red-400" 
                        : isMine 
                          ? "ring-2 ring-sky-305" 
                          : "ring-1 ring-slate-300"
                    }`}
                    referrerPolicy="no-referrer"
                  />

                  {/* Bubble wrapper */}
                  <div className="flex flex-col space-y-0.5">
                    
                    {/* Header credentials */}
                    {!isMine && (
                      <span className={`text-[10px] font-black uppercase tracking-wide px-1.5 ${
                        isTeacher ? "text-red-650 dark:text-rose-400" : "text-sky-700 dark:text-sky-400"
                      }`}>
                        {msg.senderName} {isTeacher && "👨‍🏫 Ustoz"}
                      </span>
                    )}

                    {/* Chat Bubble card with typical Telegram tail corners */}
                    <div 
                      className={`p-2.5 md:p-3 relative shadow-xs group transition-all duration-150 ${
                        isSticker 
                          ? "bg-transparent shadow-none"
                          : isTeacher
                            ? "bg-red-50 text-red-950 rounded-2xl rounded-tl-none border border-red-100 dark:bg-rose-950/30 dark:text-rose-100 dark:border-rose-900/40"
                            : isMine
                              ? `${wallpaperConfig.bubbleMine} rounded-2xl rounded-tr-none`
                              : `${wallpaperConfig.bubbleOther} rounded-2xl rounded-tl-none`
                      }`}
                    >
                      
                      {/* Interactive deletion action hovering badge inside telegram */}
                      {isMine && !isTemp && (
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="absolute -top-2.5 -left-2.5 bg-red-100 hover:bg-red-500 hover:text-white dark:bg-red-950 dark:hover:bg-red-600 text-red-700 dark:text-red-300 p-1 rounded-full text-[9px] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity border border-red-200 dark:border-red-900 shadow"
                          title="Xabarni o'chirish"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                        </button>
                      )}

                      {/* Video embed element */}
                      {isVideo && msg.mediaUrl ? (
                        <div className="space-y-1.5 text-left max-w-xs">
                          <p className="text-xs font-bold leading-normal italic text-slate-700 dark:text-slate-200">
                            {msg.text}
                          </p>
                          <div className="relative aspect-video w-64 md:w-72 rounded-xl overflow-hidden bg-black shadow border border-slate-205 dark:border-slate-800">
                            <iframe
                              src={`https://www.youtube.com/embed/${msg.mediaUrl}?autoplay=0&rel=0`}
                              title="Youtube video clip link"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute top-0 left-0 w-full h-full border-0"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                      ) : isSticker ? (
                        /* Beautiful Sticker Element */
                        <div className="flex flex-col items-center select-none transform hover:scale-110 active:scale-95 transition-transform">
                          <span className="text-5xl filter drop-shadow hover:animate-bounce inline-block">
                            {msg.mediaUrl}
                          </span>
                          <span className="text-[9px] font-black uppercase bg-slate-100/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 px-1.5 py-0.5 rounded shadow mt-1">
                            {msg.text.split(" ").slice(1).join(" ")}
                          </span>
                          {/* Sticker delete options */}
                          {isMine && (
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="text-[9.5px] font-extrabold uppercase tracking-widest text-red-500 hover:text-red-700 mt-1"
                            >
                              O'chirish 🗑️
                            </button>
                          )}
                        </div>
                      ) : (
                        /* Standard Text body with Translation speech buttons */
                        <div className="space-y-1.5 text-left max-w-[280px] md:max-w-md">
                          <p className="text-xs md:text-sm font-semibold tracking-wide leading-relaxed break-words whitespace-pre-wrap">
                            {msg.text}
                          </p>
                          
                          {/* Row tools: speech read buttons */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => playTextToSpeech(msg.text)}
                              className="p-1 rounded bg-slate-100/50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-[9px] text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-black cursor-pointer flex items-center gap-1 border-0"
                              title="Inglizcha talaffuz"
                            >
                              <Volume1 className="w-3 h-3" />
                              Eshitish (Listen)
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Timestamp & read receipts double checks similar to Telegram app */}
                      {!isSticker && (
                        <div className="flex items-center justify-end gap-1.5 mt-1.5 text-[8.5px] font-mono font-medium opacity-65 dark:text-slate-300">
                          <span>
                            {new Date(msg.timestamp).toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          {isMine && (
                            <span className="text-sky-555">
                              {isTemp ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <CheckCheck className="w-3 h-3 text-emerald-650" />
                              )}
                            </span>
                          )}
                        </div>
                      )}

                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-slate-400 space-y-3.5 select-none font-medium">
              <span className="text-6xl text-sky-500">📥</span>
              <p className="text-base font-black text-slate-800 dark:text-slate-200">Xabarlar topilmadi</p>
              <p className="text-xs text-slate-400 max-w-xs text-center">
                Mavzuga tegishli savollar, lug'at so'zlarini yoki stikerlarni birinchi bo'lib yuboring!
              </p>
            </div>
          )}
          <div ref={feedEndRef} />
        </div>

        {/* POPUP SUB SHELVES FOR ATTACHING VIDEOS & STICKERS */}
        <div className="absolute bottom-20 left-4 right-4 z-40">
          
          {/* Telegram Stickers Drawer shelf */}
          <AnimatePresence>
            {showStickerPicker && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="bg-white dark:bg-[#18202F] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xl space-y-3.5 text-slate-900"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase text-[#002147] dark:text-sky-400 tracking-wider flex items-center gap-1.5">
                    <Smile className="w-4 h-4 text-amber-500" /> Telegram Stiker Javoni (Stickers Panel):
                  </span>
                  <button 
                    onClick={() => setShowStickerPicker(false)}
                    className="text-slate-400 hover:text-slate-600 font-extrabold text-xs"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3">
                  {STICKERS.map((st, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendSticker(st)}
                      className={`bg-gradient-to-br ${st.color} hover:scale-105 active:scale-95 transition-transform p-3 rounded-2xl text-center cursor-pointer flex flex-col items-center justify-center text-white border-0 shadow-sm`}
                      title={st.text}
                    >
                      <span className="text-3xl filter drop-shadow-sm mb-1">{st.emoji}</span>
                      <span className="text-[8px] font-black uppercase tracking-normal opacity-90 truncate w-full block">
                        {st.text}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Educational Youtube share overlay */}
          <AnimatePresence>
            {showVideoSender && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="bg-white dark:bg-[#18202F] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xl space-y-4 text-slate-900 dark:text-white"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <Video className="w-4 h-4" /> English Video Share (Klip qo'shish)
                  </span>
                  <button 
                    onClick={() => setShowVideoSender(false)}
                    className="text-slate-400 hover:text-slate-600 font-extrabold text-xs"
                  >
                    ×
                  </button>
                </div>

                <p className="text-[10.5px] text-slate-400 leading-normal">
                  Ingliz tiliga oid va ma'naviy Youtube o'quv videosining manzilini kiriting:
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="URL yoki Youtube video ID yozing..."
                    value={videoUrlInput}
                    onChange={(e) => setVideoUrlInput(e.target.value)}
                    className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold outline-none text-slate-900 dark:text-white"
                  />
                  <button
                    onClick={sendVideoLink}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs uppercase rounded-xl transition-all border-0 cursor-pointer"
                  >
                    Jo'natish 🚀
                  </button>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    🎁 Tayyor dars klip videolari:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {SHORTCUT_VIDEOS.map((sv, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendShortcutVideo(sv)}
                        className="p-2 border border-slate-100 hover:border-rose-400 dark:border-slate-800 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-all flex items-center gap-1.5"
                      >
                        <span className="p-1 bg-rose-100 dark:bg-rose-950/40 text-rose-600 rounded text-xs shrink-0">🎥</span>
                        <span className="text-[10.5px] font-black text-slate-700 dark:text-slate-350 truncate">{sv.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* SENDER BAR CONTROLS ELEMENT (Bottom message write station) */}
        <div className="p-3 bg-white dark:bg-[#18202F] border-t border-slate-150 dark:border-slate-800/80 shrink-0 select-none z-10 relative">
          <div className="flex items-center gap-2">
            
            {/* Sticker toggle buttons */}
            <button
              onClick={() => {
                setShowStickerPicker(!showStickerPicker);
                setShowVideoSender(false);
              }}
              className={`p-2.5 rounded-xl hover:scale-105 transition-all flex items-center justify-center cursor-pointer border ${
                showStickerPicker 
                  ? "bg-amber-100 border-amber-300 text-amber-700 dark:bg-amber-950 dark:border-amber-900" 
                  : "bg-slate-100 dark:bg-slate-800 border-transparent text-slate-500 hover:text-slate-705 dark:hover:text-slate-205"
              }`}
              title="Emoji va stickerlar"
            >
              <Smile className="w-5 h-5" />
            </button>

            {/* Video attachment dialog */}
            <button
              onClick={() => {
                setShowVideoSender(!showVideoSender);
                setShowStickerPicker(false);
              }}
              className={`p-2.5 rounded-xl hover:scale-105 transition-all flex items-center justify-center cursor-pointer border ${
                showVideoSender 
                  ? "bg-rose-100 border-rose-300 text-rose-700 dark:bg-rose-950 dark:border-rose-900" 
                  : "bg-slate-100 dark:bg-slate-800 border-transparent text-slate-500 hover:text-slate-705"
              }`}
              title="Video qo'shish"
            >
              <Video className="w-5 h-5" />
            </button>

            {/* Main write station input */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Xabaringizni yozing..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage(inputText, "text");
                  }
                }}
                className="w-full bg-slate-100 dark:bg-slate-900 border-0 rounded-xl px-3.5 py-3 text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-100 outline-none focus:ring-1 focus:ring-sky-500 transition-all placeholder-slate-400"
                maxLength={180}
              />
            </div>

            {/* Action Send buttons */}
            <button
              onClick={() => handleSendMessage(inputText, "text")}
              className="py-3 px-4.5 bg-sky-505 hover:bg-sky-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border-0"
              title="Yuborish"
            >
              <span className="hidden sm:inline">Yuborish</span>
              <Send className="w-3.5 h-3.5" />
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}
