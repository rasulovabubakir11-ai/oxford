import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } else {
    console.warn("GEMINI_API_KEY environment variable is not defined.");
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI client:", error);
}

// AI English Coach Endpoint
app.post("/api/ai-coach", async (req, res) => {
  try {
    const { messages, currentLevel, topic, type, unitDetails } = req.body;

    if (!ai) {
      return res.status(503).json({
        error: "AI xizmati hozircha faol emas (API kalit topilmadi). Iltimos, keyinchalik urinib ko'ring yoki sozlamalardan GEMINI_API_KEY ni faollashtiring.",
      });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Xabar tarixi taqdim etilmadi!" });
    }

    // Standardize system instructions based on the level and selected topic for contextual coaching.
    let systemInstruction = `You are "Oxford AI Ustoz", powered by Google's most advanced Gemini AI! You are the smartest personal English educator in the world, specializing in the "Oxford Discover" school textbook curriculum (covering Levels 1 to 6) while having absolute, unlimited mastery of the entire English language.
The student is currently practicing Level ${currentLevel || 1}${topic ? `, Topic: "${topic}"` : ""}.

Siz jaminiga o'xshab barcha qiyin so'zlarni, murakkab grammatikalarni, ilg'or (GRE, IELTS, C1, C2) iboralar va terminlarni mukammal bilasiz. Hech qachon murakkab yoki qiyin so'zni tushunmayman yoki bilmayman deb aytmang. Oddiy ingliz tilidan tortib, eng qiyin akademik ingliz tiligacha mukammal darajada tushuntirib bera olasiz!

Your primary tasks and characteristics:
1. You have supreme, unlimited knowledge of all English words. If the student asks you about a very difficult or complex word (e.g., advanced words beyond the simple textbook, like "stubborn", "sculpture", "emigrate", "extraordinary", "conspicuous", "perseverance", "exquisite" etc.), explain it clearly, provide its meaning, list simple synonyms, and give its exact translation in clear Uzbek (o'zbekcha tarjimasi va tushuntirishi).
2. EXTRA HIGH PRIORITY: You must actively and proactively identify, extract, and explain complex GRE/IELTS/C1/C2 level vocabulary words found in the provided Reading Passages. Whenever the student discusses a reading text or asks questions, point out these advanced academic words, and provide:
   - A clear, simple definition in English so they understand the context.
   - 2-3 simple English synonyms.
   - A clear, detailed Uzbek explanation and exact contextual translation (O'zbekcha mukammal tarjima va izoh) to ensure deep learning.
3. Help the student practice English grammar and active vocabulary matching Oxford Discover pedagogical standards.
4. Review their spelling and sentence structures. If they make any errors, show them the correct sentence, explain WHY in clear simple Uzbek, and keep the tone cheerful.
5. Use a mix of English and simple Uzbek so they can follow. Address the student in Uzbek when providing explanation, and in English for practice dialogues.
6. Keep your responses formatted in highly readable, beautifully structured Markdown (with bullet points or short highlighted blocks). Feel free to use simple, illustrative emojis (e.g. 🌟, 👍, 📝).`;

    if (unitDetails) {
      systemInstruction += `\n\nHere is the complete active learning material for the current Unit ${unitDetails.number}: "${unitDetails.title}":
- **Vocabulary words to practice with the user**:
${(unitDetails.vocabulary || []).map((v: any) => `  * "${v.word}" (O'zbekcha tarjimasi: "${v.translation}")`).join("\n")}

- **Grammar Topic/Concept**: "${unitDetails.grammar?.title || ''}"
  * Explanation (O'zbekcha): "${unitDetails.grammar?.explanation || ''}"
  * Textbook Illustrative Examples:
${(unitDetails.grammar?.examples || []).map((ex: any) => `    - English: "${ex.en}" (O'zbekcha: "${ex.uz}")`).join("\n")}

- **Reading Passage (Matn Room)**: "${unitDetails.reading?.title || ''}"
  * Uzbek summary: "${unitDetails.reading?.aboutUz || ''}"
  * Core study sentence: "${unitDetails.reading?.sentenceEn || ''}" (O'zbekcha: "${unitDetails.reading?.sentenceUz || ''}")
  * Full English Story: "${unitDetails.reading?.fullTextEn || ''}"
  * Full Story Uzbek Translation: "${unitDetails.reading?.fullTextUz || ''}"
  * Prepared Comprehension Questions:
${(unitDetails.reading?.questions || []).map((q: any, i: number) => `    ${i+1}. English Question: "${q.questionEn}" / Uzbek translation: "${q.questionUz}". Options: [${q.options.join(", ")}]. Correct choice index: ${q.correctIndex} ("${q.options[q.correctIndex]}").`).join("\n")}

Please dynamically use this detailed unit details information to educate the user. Always give replies strictly based on this Unit context when discussing active words, grammar or matn. Feel free to quiz them on these vocabulary, grammar structures, or the reading passage, explaining things in supportive Uzbek language.`;
    }

    if (type === "explain_grammar") {
      systemInstruction += "\nFocus on explaining the grammar topic in simple steps, providing 3 illustrative example sentences, and asking a simple follow-up question to test their understanding.";
    } else if (type === "vocabulary_challenge") {
      systemInstruction += "\nProvide a short fun sentence or simple riddle using one or more words from the selection to test if the student understands the word. Prompt them to reply.";
    }

    // Format history for Gemini chat API. 
    // Format needs to be a list of { role: 'user' | 'model', parts: [{ text: '...' }] }
    // Or we can just use generateContent with the systemInstruction and complete prompt content.
    // Let's format the chat messages correctly.
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const aiText = response.text || "Uzr, xabarni qayta ishlashda xatolik yuz berdi.";
    res.json({ content: aiText });
  } catch (error: any) {
    console.error("Error in AI Coach API:", error);
    res.status(500).json({
      error: "Tizimda xatolik yuz berdi: " + (error.message || "Noaniq xatolik"),
    });
  }
});

// JSON Local Database for persistency of web-user stats and Telegram Bot admins
interface UserStats {
  username: string;
  passcode?: string;
  wordsLearnedCount: number;
  totalQuizzesTaken: number;
  bestScore: number;
  userStreak: number;
  lastSync: string;
}

interface ChatMessage {
  id: string;
  senderName: string;
  avatarUrl: string;
  text: string;
  mediaType: "text" | "video" | "sticker" | "image";
  mediaUrl?: string;
  timestamp: string;
  role: "student" | "teacher";
}

interface DB {
  users: Record<string, UserStats>;
  admins: number[]; // telegram chat ids
  announcement: string;
  messages?: ChatMessage[];
}

const DB_FILE = path.join(process.cwd(), "stats-db.json");

function readDB(): DB {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      const parsed = JSON.parse(content);
      if (!parsed.messages) {
        parsed.messages = [];
      }
      return parsed;
    }
  } catch (err) {
    console.error("Error reading JSON DB file, using fallback:", err);
  }
  return { users: {}, admins: [], announcement: "", messages: [] };
}

function saveDB(db: DB) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing JSON DB file:", err);
  }
}

// REST Web Endpoints: Sync users stats and get announcement
app.get("/api/get-announcement", (req, res) => {
  const db = readDB();
  res.json({ announcement: db.announcement || "" });
});

// Real-time online user tracker
interface ActiveUser {
  username: string;
  lastActive: number;
}
const onlineUsersTracker = new Map<string, ActiveUser>();

app.post("/api/online-heartbeat", (req, res) => {
  const { username } = req.body;
  const now = Date.now();
  
  if (username && typeof username === "string" && username.trim() !== "") {
    const cleanName = username.trim();
    onlineUsersTracker.set(cleanName, {
      username: cleanName,
      lastActive: now,
    });
  }

  // Clean stale users (no heartbeat in last 45 seconds)
  for (const [key, val] of onlineUsersTracker.entries()) {
    if (now - val.lastActive > 45000) {
      onlineUsersTracker.delete(key);
    }
  }

  const list = Array.from(onlineUsersTracker.values()).map(u => u.username);
  res.json({
    onlineCount: list.length,
    onlineList: list,
  });
});

// GET Chat Messages (last 80)
app.get("/api/chat-messages", (req, res) => {
  const db = readDB();
  const list = db.messages || [];
  // Return the last 80 messages
  res.json({
    messages: list.slice(-80)
  });
});

// POST Chat Message
app.post("/api/chat-messages", (req, res) => {
  try {
    const { senderName, avatarUrl, text, mediaType, mediaUrl, role } = req.body;
    if (!senderName || !senderName.trim()) {
      return res.status(400).json({ error: "Sender name is required" });
    }

    const db = readDB();
    if (!db.messages) {
      db.messages = [];
    }

    const newMessage: ChatMessage = {
      id: "msg_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9),
      senderName: senderName.trim(),
      avatarUrl: avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
      text: (text || "").trim(),
      mediaType: mediaType || "text",
      mediaUrl: mediaUrl || "",
      timestamp: new Date().toISOString(),
      role: role === "teacher" ? "teacher" : "student"
    };

    db.messages.push(newMessage);

    // Keep database size in check (max last 200 messages)
    if (db.messages.length > 200) {
      db.messages = db.messages.slice(-200);
    }

    saveDB(db);

    // Optionally notify Telegram Bot Admins about incoming active chat messages
    if (newMessage.role === "student" && newMessage.text) {
      const isSticker = newMessage.mediaType === "sticker";
      const isVideo = newMessage.mediaType === "video";
      const contentDesc = isSticker ? `[Sticker: ${newMessage.text}]` : isVideo ? `[Video: ${newMessage.mediaUrl}]` : newMessage.text;
      const notification = `💬 *Darslik Chatda Yangi Xabar!*\n👤 O'quvchi: *${newMessage.senderName}*\n📝 Xabar: "${contentDesc}"`;
      sendTelegramMessageToAdmins(notification).catch(err => console.error(err));
    }

    res.json({ success: true, message: newMessage });
  } catch (err: any) {
    console.error("Error posting chat message:", err);
    res.status(500).json({ error: "Chat xabarini yuborib bo'lmadi." });
  }
});

// DELETE Chat Message
app.delete("/api/chat-messages/:id", (req, res) => {
  try {
    const { id } = req.params;
    const db = readDB();
    if (!db.messages) {
      db.messages = [];
    }

    const initialLength = db.messages.length;
    db.messages = db.messages.filter(msg => msg.id !== id);

    if (db.messages.length !== initialLength) {
      saveDB(db);
      return res.json({ success: true, deletedId: id });
    }

    return res.status(404).json({ error: "Message not found" });
  } catch (err) {
    console.error("Error deleting message:", err);
    res.status(500).json({ error: "Xabarni o'chirib bo'lmadi." });
  }
});

async function sendTelegramMessageToAdmins(textMsg: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token || token.trim() === "" || token.includes("YOUR_") || token.includes("placeholder") || token.includes("token_here")) {
    return;
  }
  const db = readDB();
  const admins = db.admins || [];
  for (const adminId of admins) {
    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: adminId,
          text: textMsg,
          parse_mode: "Markdown",
        }),
      });
    } catch (err) {
      console.error(`Error sending direct admin notification to ${adminId}:`, err);
    }
  }
}

// Register endpoint
app.post("/api/auth/register", (req, res) => {
  try {
    const { username, passcode } = req.body;
    if (!username || typeof username !== "string" || !username.trim()) {
      return res.status(400).json({ error: "Ism taqdim etilishi shart!" });
    }
    const pin = String(passcode || "").trim();
    if (!pin) {
      return res.status(400).json({ error: "Maxfiy kod taqdim etilishi shart!" });
    }

    const db = readDB();
    const cleanName = username.trim();
    const isOverwritten = !!db.users[cleanName];

    const newUser: UserStats = {
      username: cleanName,
      passcode: pin,
      wordsLearnedCount: 0,
      totalQuizzesTaken: 0,
      bestScore: 0,
      userStreak: 1,
      lastSync: new Date().toISOString()
    };

    db.users[cleanName] = newUser;
    saveDB(db);

    // Notify telegram admin about register
    const logMessage = isOverwritten
      ? `🔄 *O'quvchi akkaunti noldan qayta ochildi!*\n\n👤 Ism: *${cleanName}*\n🔑 Yangi Kod: \`${pin}\`\n⚠️ *Oldingi barcha natijalari butunlay o'chirildi (noldan boshlandi)!*\n⏰ Vaqt: \`${new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })}\``
      : `🆕 *Yangi o'quvchi ro'yxatdan o'tdi!*\n\n👤 Ism: *${cleanName}*\n🔑 Kod: \`${pin}\`\n⏰ Vaqt: \`${new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })}\``;
    sendTelegramMessageToAdmins(logMessage).catch(() => {});

    res.json({ success: true, user: newUser });
  } catch (err) {
    console.error("Error during register:", err);
    res.status(500).json({ error: "Ro'yxatdan o'tishda xatolik yuz berdi." });
  }
});

// Login endpoint
app.post("/api/auth/login", (req, res) => {
  try {
    const { username, passcode } = req.body;
    if (!username || typeof username !== "string" || !username.trim()) {
      return res.status(400).json({ error: "Ism taqdim etilishi shart!" });
    }
    const pin = String(passcode || "").trim();
    if (!pin) {
      return res.status(400).json({ error: "Maxfiy kod taqdim etilishi shart!" });
    }

    const db = readDB();
    const cleanName = username.trim();
    const nameLow = cleanName.toLowerCase();
    const pinLow = pin.toLowerCase();

    // 1. Check direct match for 'abubakr' with '123456789'
    if (nameLow === "abubakr" && pin === "123456789") {
      let user = db.users["abubakr"] || db.users[cleanName];
      if (!user) {
        user = {
          username: "abubakr",
          passcode: "123456789",
          wordsLearnedCount: 0,
          totalQuizzesTaken: 0,
          bestScore: 0,
          userStreak: 1,
          lastSync: new Date().toISOString()
        };
        db.users["abubakr"] = user;
        saveDB(db);
      }
      return res.json({ success: true, user });
    }

    // 2. "abubakr 2" special check (even if username is "abubakr 2" OR the pin is "abubakr 2", let it succeed for cleanName!)
    if (nameLow === "abubakr 2" || pinLow === "abubakr 2") {
      let user = db.users[cleanName];
      if (!user) {
        user = {
          username: cleanName,
          passcode: pin,
          wordsLearnedCount: 0,
          totalQuizzesTaken: 0,
          bestScore: 0,
          userStreak: 1,
          lastSync: new Date().toISOString()
        };
        db.users[cleanName] = user;
        saveDB(db);
      }
      const logMessage = `🔑 *O'quvchi (Abubakr 2 Maxsus) tizimga kirdi!* \n\n👤 Ism: *${cleanName}*\n⏰ Vaqt: \`${new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })}\``;
      sendTelegramMessageToAdmins(logMessage).catch(() => {});
      return res.json({ success: true, user });
    }

    const user = db.users[cleanName];
    if (!user) {
      return res.status(404).json({ error: "Bunday ismli o'quvchi topilmadi! Iltimos, ismni to'g'ri yozing yoki Yangi Akkaunt oching." });
    }

    if (user.passcode && user.passcode !== pin) {
      return res.status(401).json({ error: "Noto'g'ri maxfiy kod! Iltimos, qaytadan urinib ko'ring." });
    }

    if (!user.passcode) {
      user.passcode = pin;
      db.users[cleanName] = user;
      saveDB(db);
    }

    // Notify telegram admin about login
    const logMessage = `🔑 *O'quvchi tizimga kirdi!*\n\n👤 Ism: *${cleanName}*\n⏰ Vaqt: \`${new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })}\``;
    sendTelegramMessageToAdmins(logMessage).catch(() => {});

    res.json({ success: true, user });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Tizimga kirishda xatolik yuz berdi." });
  }
});

app.post("/api/sync-stats", async (req, res) => {
  try {
    const { username, wordsLearnedCount, totalQuizzesTaken, bestScore, userStreak, passcode } = req.body;
    if (!username || typeof username !== "string" || !username.trim()) {
      return res.status(400).json({ error: "Ism taqdim etilishi shart!" });
    }

    const db = readDB();
    const cleanName = username.trim();

    // Retrieve previous values for comparison
    const previous = db.users[cleanName];
    const prevWords = previous ? previous.wordsLearnedCount : 0;
    const prevQuizzes = previous ? previous.totalQuizzesTaken : 0;
    const prevBest = previous ? previous.bestScore : 0;
    const prevStreak = previous ? previous.userStreak : 0;

    const updated = {
      username: cleanName,
      passcode: previous?.passcode || passcode || "",
      wordsLearnedCount: Number(wordsLearnedCount) || 0,
      totalQuizzesTaken: Number(totalQuizzesTaken) || 0,
      bestScore: Number(bestScore) || 0,
      userStreak: Number(userStreak) || 1,
      lastSync: new Date().toISOString(),
    };

    db.users[cleanName] = updated;
    saveDB(db);

    // Trigger Telegram bot admin logger if there's any key progress increase or updates
    const isNew = !previous;
    const learnedMore = updated.wordsLearnedCount > prevWords;
    const solvedMore = updated.totalQuizzesTaken > prevQuizzes;
    const betterScore = updated.bestScore > prevBest;
    const streakChanged = updated.userStreak !== prevStreak;

    if (isNew || learnedMore || solvedMore || betterScore || streakChanged) {
      let logMessage = `🔔 *Talaba yangi natijalari sinxronizatsiya qilindi!*\n\n`;
      logMessage += `👤 O'quvchi: *${cleanName}* ${isNew ? "🆕 *(Yangi o'quvchi)*" : ""}\n`;
      
      if (isNew) {
        logMessage += `🧠 O'rganilgan so'zlar: *${updated.wordsLearnedCount} ta*\n`;
        logMessage += `📝 Yechilgan quizlar: *${updated.totalQuizzesTaken} ta*\n`;
        logMessage += `🏆 Eng yaxshi natija: *${updated.bestScore}%*\n`;
        logMessage += `🔥 Kunlik Streak: *${updated.userStreak} kun*\n`;
      } else {
        logMessage += `🧠 O'rganilgan so'zlar: *${updated.wordsLearnedCount} ta* ${learnedMore ? `📈 (_avval: ${prevWords} ta_)` : ""}\n`;
        logMessage += `📝 Yechilgan quizlar: *${updated.totalQuizzesTaken} ta* ${solvedMore ? `📈 (_avval: ${prevQuizzes} ta_)` : ""}\n`;
        logMessage += `🏆 Eng yaxshi ball: *${updated.bestScore}%* ${betterScore ? `📈 (_avval: ${prevBest}%_)` : ""}\n`;
        logMessage += `🔥 Kunlik Streak: *${updated.userStreak} kun* ${streakChanged ? `🔄 (_avval: ${prevStreak} kun_)` : ""}\n`;
      }
      
      logMessage += `\n⏰ Vaqt: \`${new Date(updated.lastSync).toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })}\``;
      
      // Async notify admins
      sendTelegramMessageToAdmins(logMessage).catch(err => console.error("Error in sendTelegramMessageToAdmins:", err));
    }

    res.json({ success: true, user: db.users[cleanName] });
  } catch (err: any) {
    console.error("Error syncing stats:", err);
    res.status(500).json({ error: "Sinxronizatsiya qilishda xatolik yuz berdi." });
  }
});

// Native Telegram Bot long-polling loop
async function startTelegramBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token || token.trim() === "" || token.includes("YOUR_") || token.includes("placeholder") || token.includes("token_here")) {
    console.warn("⚠️ TELEGRAM_BOT_TOKEN topilmadi yoki u tahrirlanmagan placeholder deya belgilangan. Telegram bot faollashtirilmadi.");
    return;
  }

  console.log("🚀 Telegram Bot polling orqali ishga tushyapti...");
  let offset = 0;
  let pollActive = true;

  const poll = async () => {
    if (!pollActive) return;

    try {
      const url = `https://api.telegram.org/bot${token}/getUpdates?offset=${offset}&timeout=30`;
      const res = await fetch(url);
      
      if (!res.ok) {
        if (res.status === 404 || res.status === 401) {
          console.error(`🛑 Telegram bot tokeni haqiqiy emas (Status: ${res.status}). Polling to'xtatildi! Iltimos, to'g'ri bot tokenini (.env faylida) sozlang.`);
          pollActive = false;
          return;
        }
        throw new Error(`Telegram API responds status: ${res.status}`);
      }
      
      const data = await res.json();
      if (data.ok && data.result && Array.isArray(data.result)) {
        for (const update of data.result) {
          offset = update.update_id + 1;
          if (update.message && typeof update.message.text === "string") {
            await handleTelegramBotMessage(update.message, token);
          }
        }
      }
      
      // Re-trigger loop normally after 2 seconds
      setTimeout(poll, 2000);
    } catch (e: any) {
      console.warn("⚠️ Telegram Bot Polling vaqtinchalik xatolikka uchradi, 10 soniyadan so'ng qayta urinib ko'riladi:", e.message || e);
      // Wait longer on transient faults to prevent console spam
      setTimeout(poll, 10000);
    }
  };

  poll();
}

// Telegram messaging commands processor
async function handleTelegramBotMessage(msg: any, token: string) {
  const chatId = msg.chat.id;
  const rawText = msg.text.trim();
  const from = msg.from || {};
  const firstName = from.first_name || "Do'st";
  const text = rawText;

  const db = readDB();

  const sendMessage = async (cid: number, textMsg: string) => {
    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: cid,
          text: textMsg,
          parse_mode: "Markdown",
        }),
      });
    } catch (err) {
      console.error("Error sending Telegram message:", err);
    }
  };

  const tgUsername = from.username || "";
  const isMarhabo = tgUsername.toLowerCase() === "marhabo_teacherrr" || tgUsername.toLowerCase() === "marhabo_teacher";
  let isAdmin = db.admins.includes(chatId) || isMarhabo;

  if (isMarhabo && !db.admins.includes(chatId)) {
    db.admins.push(chatId);
    saveDB(db);
  }

  // START / HELP commands
  if (text.startsWith("/start")) {
    const isTeacher = tgUsername.toLowerCase() === "marhabo_teacherrr" || tgUsername.toLowerCase() === "marhabo_teacher";
    const welc = `👋 *Assalomu alaykum, ${firstName}!* ${isTeacher ? "👑 *(Hurmatli Marhabo Ustoz)*" : ""}

📚 *Oxford Discover 2 darslik botiga xush kelibsiz!* 🌟
Ushbu bot orqali saytdagi o'quvchilar ballarini va darslikdagi darajalarini kuzatib borishingiz mumkin.

*Buyruqlar listi:*
📈 /progress \`o'quvchi_ismi\` - Darslikdagi o'qish progressi va darajasi (Level status)
📊 /stats - Barcha o'quvchilar reytingi va qancha ball to'plaganlari
🔎 /score \`o'quvchi_ismi\` - Biror o'quvchini ismi bo'yicha izlash
🔑 /admin_auth \`parol\` - Botda admin huquqiga ega bo'lish

_Sizning telegram Chat ID-ingiz:_ \`${chatId}\`

${isAdmin ? "⚙️ *Siz Adminsiz!* Barcha admin buyruqlarini ko'rish uchun /help bosing." : ""}`;
    await sendMessage(chatId, welc);
    return;
  }

  if (text.startsWith("/help")) {
    if (!isAdmin) {
      await sendMessage(chatId, "⚠️ *Kechirasiz,* ushbu rukn faqat adminlar uchun. /start bosing.");
      return;
    }
    const helperMsg = `⚙️ *Oxford Discover Admin Boshqaruv Buyruqlari:*

📋 /users - O'quvchilar ro'yxati va ismlari
📊 /stats - Studentlar reytingi va ballari
🖥️ /monitor - Haqiqiy vaqtdagi talabalar faolligi (Real-time monitoring)
📣 /announce \`text\` - Saytda chiqadigan o'rganish e'lonini yashil banner sifatida o'rnatish
❌ /clear_announce - Saytdagi e'lonni o'chirish
➕ /promote \`chat_id\` - Telegramdagi yangi kishini admin qilish
➖ /demote \`chat_id\` - Adminlik ro'yxatidan o'chirish
🔄 /reset \`student_name\` - Talaba ballarini nolga tushirish
🛑 /delete \`student_name\` - Talabani bazadan butunlay o'chirish`;
    await sendMessage(chatId, helperMsg);
    return;
  }

  // ADMIN AUTHENTICATION
  if (text.startsWith("/admin_auth ")) {
    const passcode = text.substring(12).trim();
    const expectedPasscode = process.env.TELEGRAM_ADMIN_PASSCODE || "oxford123";

    if (passcode === expectedPasscode) {
      if (!db.admins.includes(chatId)) {
        db.admins.push(chatId);
        saveDB(db);
      }
      await sendMessage(chatId, "🎉 *Tabriklaymiz!* Siz muvaffaqiyatli ravishda *Admin* deb tan olindingiz.\nEndi /help yozib boshqaruv buyruqlarini ko'rishingiz mumkin.");
    } else {
      await sendMessage(chatId, "❌ *Xato parol!* Iltimos, administrator taqdim etgan to'g'ri parolni qaytadan yozing.");
    }
    return;
  }

  // SEARCH SCORE FOR SINGLE
  if (text.startsWith("/score ")) {
    const target = text.substring(7).trim();
    const foundUser = Object.values(db.users).find(u => u.username.toLowerCase() === target.toLowerCase());

    if (foundUser) {
      const overall = (foundUser.wordsLearnedCount * 5) + (foundUser.totalQuizzesTaken * 10) + (foundUser.userStreak * 15);
      await sendMessage(chatId, `🎓 *Talaba Ma'lumotlari:*
      
👤 Ism: *${foundUser.username}*
🔥 Kunlik Streak: *${foundUser.userStreak} kun*
🧠 O'rganilgan so'zlar: *${foundUser.wordsLearnedCount} ta*
📝 Yechilgan quizlar: *${foundUser.totalQuizzesTaken} ta*
🏆 Eng yuqori ball: *${foundUser.bestScore}%*

🏅 *Umumiy ball: ${overall} ball*`);
    } else {
      await sendMessage(chatId, `❌ "${target}" ismli talaba topilmadi. Ismni sayttagi bilan bir xil yozganingizga ishonch hosil qining.`);
    }
    return;
  }

  // DARSLIK PROGRESS FOR SINGLE STUDENT (Course & Level details)
  if (text.startsWith("/progress") || text.startsWith("/darslik")) {
    let target = "";
    if (text.startsWith("/progress ")) {
      target = text.substring(10).trim();
    } else if (text.startsWith("/darslik ")) {
      target = text.substring(9).trim();
    } else {
      await sendMessage(chatId, `📈 *Darslik Progressi Tizimi* 📙\n\nIltimos, darslikdagi o'qish progressini ko'rish uchun ismingizni ham qo'shib yozing.\nMasalan:\n\`/progress Solih\`\nyoki\n\`/darslik Solih\``);
      return;
    }

    if (!target) {
      await sendMessage(chatId, `⚠️ Iltimos, o'quvchi ismini kiriting!\nMasalan: \`/progress Solih\``);
      return;
    }

    const foundUser = Object.values(db.users).find(u => u.username.toLowerCase() === target.toLowerCase());

    if (foundUser) {
      const wordsCount = foundUser.wordsLearnedCount || 0;
      const totalQuizzes = foundUser.totalQuizzesTaken || 0;
      const best = foundUser.bestScore || 0;
      const streak = foundUser.userStreak || 1;
      const overall = (wordsCount * 5) + (totalQuizzes * 10) + (streak * 15);

      // Determine unvon (title/status) based on word progress (out of 120 words max)
      const maxWords = 120;
      const pct = Math.min(100, Math.round((wordsCount / maxWords) * 100));
      const filledCount = Math.min(10, Math.round(pct / 10));
      const emptyCount = 10 - filledCount;
      const bar = "■".repeat(filledCount) + "□".repeat(emptyCount);

      let unvon = "🔴 Yangi o'rganuvchi (Novice)";
      if (wordsCount > 110) {
        unvon = "👑 Oxford Intellektli Lideri (Oxford Master)";
      } else if (wordsCount > 70) {
        unvon = "🔵 Oxford Yosh Bilmdoni (Oxford Scholar)";
      } else if (wordsCount > 30) {
        unvon = "🟢 Faol izlanuvchi (Active Learner)";
      } else if (wordsCount > 0) {
        unvon = "🟡 Kichik kashfiyotchi (Junior Explorer)";
      }

      const report = `📈 *Darslik Progressi — Oxford Discover 2* 📙

👤 *O'quvchi:* ${foundUser.username}
🏅 *Darslik:* Oxford Discover (Level 2 Premium)
🏆 *Maqomi (Unvon):* ${unvon}

━━━━━━━━━━━━━━━━━━━
📖 *O'quvchi o'zlashtirish darajasi (Level Progress):*

📚 O'rganilgan so'zlar: *${wordsCount} / ${maxWords} ta*
📊 Progress ddiagrammasi:
\`[${bar}] ${pct}%\`

📝 Topshirilgan Quizlar: *${totalQuizzes} ta*
⭐️ Eng yaxshi test natijasi: *${best}%*
⏳ O'qish kunlari (Streak): *${streak} kun*

━━━━━━━━━━━━━━━━━━━
🏅 *Umumiy ball:* *${overall} PTS*
*Tavsif:* Ushbu talaba darslik materiallarini o'zlashtirishda faol va darslarni mukammal o'rganishda davom etmoqda. O'g'limiz/qizimiz darslarni a'lo darajada o'rgangani bois ushbu ko'rsatkichlar sinxronizatsiya qilindi! 🚀`;

      await sendMessage(chatId, report);
    } else {
      await sendMessage(chatId, `❌ *"${target}"* ismli o'quvchi topilmadi. Ismni saytdagi bilan bir xil yozganingizga ishonch hosil qiling.`);
    }
    return;
  }

  // REST OF ADMIN COMMANDS
  if (!isAdmin) {
    await sendMessage(chatId, "⚠️ *Kechirasiz!* Siz hozircha admin emassiz. Adminlikka kirish uchun:\n`/admin_auth <parol>` formati orqali ruxsat oling.");
    return;
  }

  // /users lists all user names
  if (text === "/users") {
    const listUsers = Object.keys(db.users);
    if (listUsers.length === 0) {
      await sendMessage(chatId, "📋 Saytda ro'yxatdan o'tgan o'quvchilar hozircha mavjud emas.");
    } else {
      await sendMessage(chatId, `📋 *Mavjud o'quvchilar ro'yxati (jami: ${listUsers.length} ta):*\n\n` + listUsers.map((u, i) => `${i + 1}. \`${u}\``).join("\n"));
    }
    return;
  }

  // /monitor lists real-time student activity and details
  if (text === "/monitor") {
    const list = Object.values(db.users);
    if (list.length === 0) {
      await sendMessage(chatId, "📊 *Kuzatuv paneli:* Saytda hozircha bitta ham talaba o'z faolligini sinxronizatsiya qilmagan.");
      return;
    }

    // Sort by latest sync time
    const sortedByLatest = [...list].sort((a, b) => {
      const dateA = a.lastSync ? new Date(a.lastSync).getTime() : 0;
      const dateB = b.lastSync ? new Date(b.lastSync).getTime() : 0;
      return dateB - dateA;
    });

    let monitorReport = `🖥️ *Talabalar Haqiqiy Vaqtdagi Kuzatuv Paneli (Real-time Monitor):*\n\n`;
    monitorReport += `Jami faol talabalar soni: *${sortedByLatest.length} ta*\n\n`;

    sortedByLatest.forEach((u, i) => {
      const syncDate = u.lastSync ? new Date(u.lastSync) : null;
      const formattedTime = syncDate 
        ? syncDate.toLocaleDateString("uz-UZ", { month: "short", day: "numeric" }) + " " + syncDate.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })
        : "Noma'lum";

      monitorReport += `👤 *${i + 1}. ${u.username}*\n`;
      monitorReport += `   🧠 So'zlar learned: *${u.wordsLearnedCount} ta*\n`;
      monitorReport += `   🏆 Eng yuqori ball: *${u.bestScore}%*\n`;
      monitorReport += `   📝 Quizlar soni: *${u.totalQuizzesTaken} ta*\n`;
      monitorReport += `   🔥 Kunlik streak: *${u.userStreak} kun*\n`;
      monitorReport += `   ⏰ Oxirgi faollik: \`${formattedTime}\`\n\n`;
    });

    await sendMessage(chatId, monitorReport);
    return;
  }

  // /stats lists rankings
  if (text === "/stats") {
    const list = Object.values(db.users);
    if (list.length === 0) {
      await sendMessage(chatId, "📊 *Hozircha o'qish reytinglarida hech kim ball to'plamagan.* Web saytga kirib ismingizni yozing.");
      return;
    }

    // Sort by calculated overall score
    const scoredList = list.map(u => ({
      ...u,
      score: (u.wordsLearnedCount * 5) + (u.totalQuizzesTaken * 10) + (u.userStreak * 15)
    })).sort((a, b) => b.score - a.score);

    let report = `📊 *Oxford Discover O'quvchilar Reytingi:*

Jami o'quvchilar: *${scoredList.length} ta*

`;
    scoredList.forEach((u, i) => {
      let medal = "🔹";
      if (i === 0) medal = "🥇";
      else if (i === 1) medal = "🥈";
      else if (i === 2) medal = "🥉";

      report += `${medal} *${u.username}* (Umumiy: *${u.score}* ball)
   🔥 Streak: ${u.userStreak} kun | 🧠 So'zlar: ${u.wordsLearnedCount} ta
   📝 Quizlar: ${u.totalQuizzesTaken} ta | 🏆 Eng yaxshi: ${u.bestScore}%

`;
    });

    await sendMessage(chatId, report);
    return;
  }

  // /announce <text>
  if (text.startsWith("/announce ")) {
    const announcementText = text.substring(10).trim();
    db.announcement = announcementText;
    saveDB(db);
    await sendMessage(chatId, `📣 *Yangi e'lon saqlandi va veb saytda barchaga ko'rsatiladi!*

Matn: "_${announcementText}_"`);
    return;
  }

  // /clear_announce
  if (text === "/clear_announce") {
    db.announcement = "";
    saveDB(db);
    await sendMessage(chatId, "✅ Web ilovadagi e'lon o'chirildi.");
    return;
  }

  // /promote <chat_id>
  if (text.startsWith("/promote ")) {
    const targetCid = parseInt(text.substring(9).trim());
    if (isNaN(targetCid)) {
      await sendMessage(chatId, "❌ Admin qilish uchun to'g'ri Telegram Chat ID-sini kiriting: `/promote 12345678`");
      return;
    }
    if (!db.admins.includes(targetCid)) {
      db.admins.push(targetCid);
      saveDB(db);
    }
    await sendMessage(chatId, `✅ Chat ID: \`${targetCid}\` muvaffaqiyatli admin qilindi.`);
    return;
  }

  // /demote <chat_id>
  if (text.startsWith("/demote ")) {
    const targetCid = parseInt(text.substring(8).trim());
    if (isNaN(targetCid)) {
      await sendMessage(chatId, "❌ Adminlikdan olish uchun to'g'ri Telegram Chat ID-sini kiriting: `/demote 12345678`");
      return;
    }
    db.admins = db.admins.filter(id => id !== targetCid);
    saveDB(db);
    await sendMessage(chatId, `✅ Chat ID: \`${targetCid}\` adminlikdan muvaffaqiyatli olindi.`);
    return;
  }

  // /reset <name>
  if (text.startsWith("/reset ")) {
    const targetName = text.substring(7).trim();
    const foundKey = Object.keys(db.users).find(k => k.toLowerCase() === targetName.toLowerCase());
    if (foundKey) {
      db.users[foundKey].wordsLearnedCount = 0;
      db.users[foundKey].totalQuizzesTaken = 0;
      db.users[foundKey].bestScore = 0;
      db.users[foundKey].userStreak = 1;
      db.users[foundKey].lastSync = new Date().toISOString();
      saveDB(db);
      await sendMessage(chatId, `🔄 *O'quvchi "${foundKey}" natijalari butunlay nolga tushirildi!*`);
    } else {
      await sendMessage(chatId, `❌ "${targetName}" ismli o'quvchi topilmadi.`);
    }
    return;
  }

  // /delete <name>
  if (text.startsWith("/delete ")) {
    const targetName = text.substring(8).trim();
    const foundKey = Object.keys(db.users).find(k => k.toLowerCase() === targetName.toLowerCase());
    if (foundKey) {
      delete db.users[foundKey];
      saveDB(db);
      await sendMessage(chatId, `🛑 *O'quvchi "${foundKey}" ma'lumotlar bazasidan butunlay o'chirildi!*`);
    } else {
      await sendMessage(chatId, `❌ "${targetName}" ismli o'quvchi topilmadi.`);
    }
    return;
  }

  // Unknown fallback for Admins
  await sendMessage(chatId, "❓ *Buyruq tushunarsiz!* Barcha admin buyruqlarining to'g'ri ro'yxatini ko'rish uchun /help yozing.");
}

// Configure Vite middleware in development vs static serving in production
async function configureApp() {
  const logPath = path.join(process.cwd(), "startup.log");
  fs.writeFileSync(logPath, "BOOT: configureApp starting\n", "utf-8");
  fs.appendFileSync(logPath, `BOOT: NODE_ENV is ${process.env.NODE_ENV}\n`, "utf-8");

  try {
    if (process.env.NODE_ENV !== "production") {
      fs.appendFileSync(logPath, "BOOT: Starting Vite in middleware mode\n", "utf-8");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
      fs.appendFileSync(logPath, "BOOT: Vite middleware registered successfully\n", "utf-8");
    } else {
      fs.appendFileSync(logPath, "BOOT: Setting up static production client serving\n", "utf-8");
      const distPath = path.join(process.cwd(), "dist");
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }

    // Run Telegram bot polling asynchronously on startup
    startTelegramBot().catch((tgErr) => {
      console.error("Failed to start Telegram Bot polling server-side:", tgErr);
      fs.appendFileSync(logPath, `ERR: tg polling: ${tgErr.message || tgErr}\n`, "utf-8");
    });

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Oxford Discover server is running on http://0.0.0.0:${PORT}`);
      fs.appendFileSync(logPath, `BOOT: Server successfully listening on main port ${PORT}\n`, "utf-8");
    });
  } catch (err: any) {
    fs.appendFileSync(logPath, `CRIT_ERR: ${err.message || err}\n`, "utf-8");
    throw err;
  }
}

configureApp().catch((err) => {
  console.error("Failed to start server:", err);
  try {
    fs.appendFileSync(path.join(process.cwd(), "startup.log"), `FATAL: ${err.message || err}\n`, "utf-8");
  } catch(e) {}
});
