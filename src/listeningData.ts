export interface ListeningQuestion {
  id: string;
  questionEn: string;
  questionUz: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GrammarGap {
  id: string;
  sentencePre: string;
  sentencePost: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface MatchingPair {
  id: string;
  enStart: string;
  enEnd: string;
  uzStart: string;
  uzEnd: string;
}

export interface ListeningPayload {
  unitNumber: number;
  title: string;
  listeningTheme: string;
  audioTextEn: string;
  audioTextUz: string;
  speakerA: string;
  speakerB: string;
  sentences: {
    id: string;
    speaker: string;
    en: string;
    uz: string;
  }[];
  questions: ListeningQuestion[];
  grammarGaps: GrammarGap[];
  matchingPairs: MatchingPair[];
}

const listeningDataMap: Record<number, ListeningPayload> = {
  1: {
    unitNumber: 1,
    title: "Amazing Animals",
    listeningTheme: "Animal Body Parts",
    speakerA: "Teacher",
    speakerB: "Student",
    audioTextEn: "Teacher: Look at this bird! Its head has a small eye and a sharp ear. Its leg is very strong and its body is full of feathers. Student: Birds have wings to fly, right? Teacher: Yes! They have wings and they lay soft eggs with shells. Gills help fish breathe, and they have scales all over. Student: These body parts are amazing. They help them survive!",
    audioTextUz: "O'qituvchi: Mana bu qushga qara! Uning boshida kichkina ko'z va o'tkir quloq bor. Uning oyog'i juda baquvvat va tanasi patlar bilan to'la. O'quvchi: Qushlarning uchish uchun qanotlari bor, to'g'rimi? O'qituvchi: Ha! Ularning qanotlari bor va ular qobiqli yumshoq tuxum qo'yadilar. Jabralar baliqlarga nafas olishga yordam beradi, va ularda tangachalar qoplangan. O'quvchi: Bu tana a'zolari hayratlanarli. Ular ularga yashab qolishga yordam beradi!",
    sentences: [
      { id: "u1_s1", speaker: "Teacher", en: "Look at this bird! Its head has a small eye and a sharp ear.", uz: "Mana bu qushga qara! Uning boshida kichkina ko'z va o'tkir quloq bor." },
      { id: "u1_s2", speaker: "Teacher", en: "Its leg is very strong and its body is full of feathers.", uz: "Uning oyog'i juda baquvvat va tanasi patlar bilan to'la." },
      { id: "u1_s3", speaker: "Student", en: "Birds have wings to fly, right?", uz: "Qushlarning uchish uchun qanotlari bor, to'g'rimi?" },
      { id: "u1_s4", speaker: "Teacher", en: "Yes! They have wings and they lay soft eggs with shells. Gills help fish breathe, and they have scales all over.", uz: "Ha! Ularning qanotlari bor va ular qobiqli yumshoq tuxum qo'yadilar. Jabralar baliqlarga nafas olishga yordam beradi, va ularda tangachalar qoplangan." },
      { id: "u1_s5", speaker: "Student", en: "These body parts are amazing. They help them survive!", uz: "Bu tana a'zolari hayratlanarli. Ular ularga yashab qolishga yordam beradi!" }
    ],
    questions: [
      {
        id: "u1_lq1",
        questionEn: "What covers the bird's body?",
        questionUz: "Qushning tanasini nima qoplagan?",
        options: ["Scales", "Fur", "Feathers"],
        correctIndex: 2,
        explanation: "Audioda qushning tanasi patlar bilan qoplanganligi aytiladi (its body is full of feathers)."
      },
      {
        id: "u1_lq2",
        questionEn: "What helps fish to breathe in water?",
        questionUz: "Suv ostida baliqqa nafas olish uchun nima yordam beradi?",
        options: ["Wings", "Gills", "Legs"],
        correctIndex: 1,
        explanation: "Jabralar baliqlarga suv ostida nafas olishga ko'maklashadi (Gills help fish breathe)."
      }
    ],
    grammarGaps: [
      {
        id: "u1_g1",
        sentencePre: "Fish have gills. ",
        sentencePost: " help them breathe in water.",
        options: ["He", "They", "It"],
        correctAnswer: "They",
        explanation: "Multiple (ko'plikda) bo'lgan otdan keyin Subject Pronoun sifatida 'They' ishlatiladi."
      },
      {
        id: "u1_g2",
        sentencePre: "Gills help ",
        sentencePost: " survive in the river.",
        options: ["them", "they", "us"],
        correctAnswer: "them",
        explanation: "Fe'ldan keyin keladigan Object Pronoun sifatida 'them' (ularni) to'g'ri ishlatiladi."
      }
    ],
    matchingPairs: [
      { id: "u1_m1", enStart: "Birds have two wings", enEnd: "to fly high.", uzStart: "Qushlarda ikkita qanot bor", uzEnd: "baland uchish uchun." },
      { id: "u1_m2", enStart: "Fish have gills", enEnd: "to breathe in water.", uzStart: "Baliqlarda jabralar bor", uzEnd: "suvda nafas olish uchun." },
      { id: "u1_m3", enStart: "Gills help them", enEnd: "breathe and live.", uzStart: "Jabralar ularga yordam beradi", uzEnd: "nafas olish va yashashda." }
    ]
  },
  2: {
    unitNumber: 2,
    title: "Leo and Lily's Adventure",
    listeningTheme: "Describing Animals",
    speakerA: "Leo the Lion",
    speakerB: "Lily the Bunny",
    audioTextEn: "Leo: Lily, I am a strong and fierce animal, but I am usually gentle with you. Lily: Thank you, Leo. I am smart and always calm. I sometimes escape when danger is near, but I am very patient. Leo: Yes, a patient rabbit is very quiet. Let's creep silently in the forest!",
    audioTextUz: "Leo: Lili, men kuchli va shafqatsiz hayvonman, lekin senga odatda muloyimman. Lili: Rahmat, Leo. Men aqlliman va doim xotirjamman. Xavf yaqinlashganda ba'zida qochib qutulaman, lekin men juda sabrliman. Leo: Ha, sabrli quyoncha juda sokin bo'ladi. Keling, o'rmonda jimgina sudralaylik/emaklaylik!",
    sentences: [
      { id: "u2_s1", speaker: "Leo the Lion", en: "Lily, I am a strong and fierce animal, but I am usually gentle with you.", uz: "Lili, men kuchli va shafqatsiz hayvonman, lekin senga odatda muloyimman." },
      { id: "u2_s2", speaker: "Lily the Bunny", en: "Thank you, Leo. I am smart and always calm.", uz: "Rahmat, Leo. Men aqlliman va doim xotirjamman." },
      { id: "u2_s3", speaker: "Lily the Bunny", en: "I sometimes escape when danger is near, but I am very patient.", uz: "Xavf yaqinlashganda ba'zida qochib qutulaman, lekin men juda sabrliman." },
      { id: "u2_s4", speaker: "Leo the Lion", en: "Yes, a patient rabbit is very quiet. Let's creep silently in the forest!", uz: "Ha, sabrli quyoncha juda sokin bo'ladi. Keling, o'rmonda jimgina sudralaylik/emaklaylik!" }
    ],
    questions: [
      {
        id: "u2_lq1",
        questionEn: "How does Lily describe herself?",
        questionUz: "Lili o'zini qanday tasvirlaydi?",
        options: ["Fierce and loud", "Smart and always calm", "Strong and angry"],
        correctIndex: 1,
        explanation: "Lili aytdi: 'I am smart and always calm' - men aqlli va har doim tinch/xotirjamman."
      },
      {
        id: "u2_lq2",
        questionEn: "How often does Leo react gently with Lily?",
        questionUz: "Leo quyonchaga nisbatan qanchalik tez-tez muloyim bo'ladi?",
        options: ["Never", "Usually", "Sometimes"],
        correctIndex: 1,
        explanation: "Leo: 'I am usually gentle with you' - senga odatda yumshoq munosabatdaman."
      }
    ],
    grammarGaps: [
      {
        id: "u2_g1",
        sentencePre: "Lily ",
        sentencePost: " escapes from danger.",
        options: ["always", "never", "sometimes"],
        correctAnswer: "always",
        explanation: "Lily doim qochib qutulishga odatlangan, shuning uchun 'always' mos qoida hisoblanadi."
      },
      {
        id: "u2_g2",
        sentencePre: "Leo ",
        sentencePost: " tries to catch Lily because they are friends.",
        options: ["sometimes", "never", "usually"],
        correctAnswer: "never",
        explanation: "Ular do'st bo'lganligi sababli Leo Lilingi 'hech qachon' tutishga urinmaydi (never)."
      }
    ],
    matchingPairs: [
      { id: "u2_m1", enStart: "Lily always", enEnd: "escapes from danger.", uzStart: "Lili doimo", uzEnd: "xavfdan qochib qutuladi." },
      { id: "u2_m2", enStart: "Lily is usually", enEnd: "very nervous.", uzStart: "Lili odatda", uzEnd: "juda hayajonli/asabiy bo'ladi." },
      { id: "u2_m3", enStart: "Leo sometimes", enEnd: "tries to catch Lily.", uzStart: "Leo ba'zan", uzEnd: "Lilini tutib olishga harakat qiladi." }
    ]
  },
  3: {
    unitNumber: 3,
    title: "What Is Our World Made Of?",
    listeningTheme: "How Things Change",
    speakerA: "Mom Anora",
    speakerB: "Son Davron",
    audioTextEn: "Mom Anora: Look at this ice pop! It was a liquid before. Now it is a solid. Davron: Oh! When we heat it, it melts and turns into a liquid again. Mom Anora: Yes! If we use a kettle, the water boils and turns into steam. Steam is a gas. Davron: Wow, we can freeze water into solid ice!",
    audioTextUz: "Anora Ona: Mana bu muzqaymoqqa (muz pips) qara! U oldin suyuqlik edi. Hozir u qattiq jism. Davron: Oh! Biz uni isitganimizda, u eriydi va yana suyuqlikka aylanadi. Anora Ona: Ha! Agar biz choynak ishlatsak, suv qaynaydi va bug'ga aylanadi. Bug' - bu gazdir. Davron: Voy, biz suvni muzlatib qattiq muzga aylantira olamiz!",
    sentences: [
      { id: "u3_s1", speaker: "Mom Anora", en: "Look at this ice pop! It was a liquid before. Now it is a solid.", uz: "Mana bu muzqaymoqqa (muz pips) qara! U oldin suyuqlik edi. Hozir u qattiq jism." },
      { id: "u3_s2", speaker: "Son Davron", en: "Oh! When we heat it, it melts and turns into a liquid again.", uz: "Oh! Biz uni isitganimizda, u eriydi va yana suyuqlikka aylanadi." },
      { id: "u3_s3", speaker: "Mom Anora", en: "Yes! If we use a kettle, the water boils and turns into steam. Steam is a gas.", uz: "Ha! Agar biz choynak ishlatsak, suv qaynaydi va bug'ga aylanadi. Bug' - bu gazdir." },
      { id: "u3_s4", speaker: "Son Davron", en: "Wow, we can freeze water into solid ice!", uz: "Voy, biz suvni muzlatib qattiq muzga aylantira olamiz!" }
    ],
    questions: [
      {
        id: "u3_lq1",
        questionEn: "What state of matter is steam?",
        questionUz: "Bug' moddaning qaysi holatiga kiradi?",
        options: ["Solid", "Liquid", "Gas"],
        correctIndex: 2,
        explanation: "Steam is a gas - bug' bu gazdir."
      },
      {
        id: "u3_lq2",
        questionEn: "What happens when you freeze water?",
        questionUz: "Suvni muzlatganda nima sodir bo'ladi?",
        options: ["It melts", "It becomes solid ice", "It boils and becomes steam"],
        correctIndex: 1,
        explanation: "Suv muzlatilganda qattiq muzga (solid ice) aylanadi."
      }
    ],
    grammarGaps: [
      {
        id: "u3_g1",
        sentencePre: "It ",
        sentencePost: " a liquid before, but now it is a solid ice.",
        options: ["was", "were", "is"],
        correctAnswer: "was",
        explanation: "Birlikdagi ega 'It' uchun o'tgan zamonda 'was' ishlatiladi."
      },
      {
        id: "u3_g2",
        sentencePre: "The ice pops ",
        sentencePost: " hard earlier. Now they are soft.",
        options: ["was", "were", "are"],
        correctAnswer: "were",
        explanation: "Ko'plikdagi ega 'ice pops' uchun o'tgan zamonda 'were' ishlatiladi."
      }
    ],
    matchingPairs: [
      { id: "u3_m1", enStart: "It was a liquid", enEnd: "but now it is gas.", uzStart: "U suyuqlik edi,", uzEnd: "ammo hozir gaz." },
      { id: "u3_m2", enStart: "They were hard", enEnd: "now they are soft.", uzStart: "Ular qattiq edi,", uzEnd: "hozir esa yumshoq." },
      { id: "u3_m3", enStart: "Water boils inside", enEnd: "the hot kettle.", uzStart: "Suv qaynaydi", uzEnd: "issiq choynak ichida." }
    ]
  },
  4: {
    unitNumber: 4,
    title: "Let's Make Ice Cream!",
    listeningTheme: "Creating Mixtures",
    speakerA: "Grandma Fatima",
    speakerB: "Granddaughter Madina",
    audioTextEn: "Madina: Grandma, was the freezer door open? The ice cream is soft! Grandma Fatima: Oh yes, it was open. Let's make some fresh mixture. We need cream, sugar, and salt. Madina: Were the students happy yesterday when they made this mixture in plastic bags? Grandma Fatima: Yes, they were very happy! Here is your cold tea and pasta.",
    audioTextUz: "Madina: Buvijon, muzlatgich eshigi ochiqmidi? Muzqaymoq erib yumshoq bo'lib qolibdi! Fatima Buvi: Oh ha, ochiq edi. Keling, yangi aralashma qilamiz. Bizga qaymoq, shakar va tuz kerak. Madina: Kecha o'quvchilar bu aralashmani polietilen paketlarda yasashganda xursand bo'lishdimi? Fatima Buvi: Ha, ular juda xursand bo'lishdi! Mana senga sovuq choy va makaron.",
    sentences: [
      { id: "u4_s1", speaker: "Granddaughter Madina", en: "Grandma, was the freezer door open? The ice cream is soft!", uz: "Buvijon, muzlatgich eshigi ochiqmidi? Muzqaymoq erib yumshoq bo'lib qolibdi!" },
      { id: "u4_s2", speaker: "Grandma Fatima", en: "Oh yes, it was open. Let's make some fresh mixture. We need cream, sugar, and salt.", uz: "Oh ha, ochiq edi. Keling, yangi aralashma qilamiz. Bizga qaymoq, shakar va tuz kerak." },
      { id: "u4_s3", speaker: "Granddaughter Madina", en: "Were the students happy yesterday when they made this mixture in plastic bags?", uz: "Kecha o'quvchilar bu aralashmani polietilen paketlarda yasashganda xursand bo'lishdimi?" },
      { id: "u4_s4", speaker: "Grandma Fatima", en: "Yes, they were very happy! Here is your cold tea and pasta.", uz: "Ha, ular juda xursand bo'lishdi! Mana senga sovuq choy va makaron." }
    ],
    questions: [
      {
        id: "u4_lq1",
        questionEn: "What ingredients are needed for the ice cream mixture?",
        questionUz: "Muzqaymoq aralashmasi uchun qaysi masalliqlar kerak?",
        options: ["Cream, sugar, and salt", "Coffee, pasta, and tea", "Salad and vegetables"],
        correctIndex: 0,
        explanation: "Fatima buvi: 'We need cream, sugar, and salt' dedi."
      },
      {
        id: "u4_lq2",
        questionEn: "Why is the old ice cream soft?",
        questionUz: "Nima uchun eski muzqaymoq yumshoq bo'lib qolgan?",
        options: ["Because the freezer was closed", "Because the freezer door was open", "Because of too much salt"],
        correctIndex: 1,
        explanation: "Muzlatgich eshigi ochiq qolganligi sababli muzqaymoq erib ketgan."
      }
    ],
    grammarGaps: [
      {
        id: "u4_g1",
        sentencePre: "Was the freezer door open? Yes, it ",
        sentencePost: ".",
        options: ["was", "wasn't", "were"],
        correctAnswer: "was",
        explanation: "Ha deb tasdiq javobi berilgandan so'ng 'it was' shakli qo'yiladi."
      },
      {
        id: "u4_g2",
        sentencePre: "Were the students happy? No, they ",
        sentencePost: ".",
        options: ["were", "weren't", "wasn't"],
        correctAnswer: "weren't",
        explanation: "Inkor short answer sifatida 'No, they weren't' ishlatiladi."
      }
    ],
    matchingPairs: [
      { id: "u4_m1", enStart: "Was the freezer", enEnd: "door open yesterday?", uzStart: "Muzlatgich eshigi", uzEnd: "kecha ochiq turganmidi?" },
      { id: "u4_m2", enStart: "Yes, the door", enEnd: "was open.", uzStart: "Ha, eshik", uzEnd: "ochiq edi." },
      { id: "u4_m3", enStart: "Were the students happy?", enEnd: "No, they weren't.", uzStart: "Talabalar xursandmidi?", uzEnd: "Yo'q, xursand emasdilar." }
    ]
  },
  5: {
    unitNumber: 5,
    title: "Then and Now",
    listeningTheme: "Life Then and Now",
    speakerA: "Grandma Lola",
    speakerB: "Grandson Shokir",
    audioTextEn: "Grandson Shokir: Grandma, how did people travel long ago? Grandma Lola: People traveled by horse or boat back then. We didn't have airplanes or text messages. Shokir: Did you listen to music on the internet? Grandma Lola: No! We listened to the news and music on the radio. Times changed so much!",
    audioTextUz: "Shokir: Buvijon, odamlar uzoq vaqt oldin qanday sayohat qilishgan? Lola Buvi: Odamlar u otda yoki qayiqda sayohat qilishgan. Bizda samolyotlar yoki sms xabarlar bo'lmagan. Shokir: Musiqani internetda tinglarmidingiz? Lola Buvi: Yo'q! Biz yangiliklar va musiqani radioda eshitganmiz. Zamonlar juda o'zgardi!",
    sentences: [
      { id: "u5_s1", speaker: "Grandson Shokir", en: "Grandma, how did people travel long ago?", uz: "Buvijon, odamlar uzoq vaqt oldin qanday sayohat qilishgan?" },
      { id: "u5_s2", speaker: "Grandma Lola", en: "People traveled by horse or boat back then. We didn't have airplanes or text messages.", uz: "Odamlar u otda yoki qayiqda sayohat qilishgan. Bizda samolyotlar yoki sms xabarlar bo'lmagan." },
      { id: "u5_s3", speaker: "Grandson Shokir", en: "Did you listen to music on the internet?", uz: "Musiqani internetda tinglarmidingiz?" },
      { id: "u5_s4", speaker: "Grandma Lola", en: "No! We listened to the news and music on the radio. Times changed so much!", uz: "Yo'q! Biz yangiliklar va musiqani radioda eshitganmiz. Zamonlar juda o'zgardi!" }
    ],
    questions: [
      {
        id: "u5_lq1",
        questionEn: "How did people travel in Grandma Lola's youth?",
        questionUz: "Lola buvining yoshligida odamlar qanday sayohat qilishgan?",
        options: ["By airplane and truck", "By cable car and bus", "By horse or boat"],
        correctIndex: 2,
        explanation: "Lola buvi: 'People traveled by horse or boat back then' deb ta'kidladi."
      },
      {
        id: "u5_lq2",
        questionEn: "Where did Lola listen to the news and music?",
        questionUz: "Lola yangiliklar va musiqani qayerda eshitgan?",
        options: ["On the radio", "On the internet", "On television"],
        correctIndex: 0,
        explanation: "Buvijon radiodan yangiliklar va musiqa tinglaganliklarini aytdi ('on the radio')."
      }
    ],
    grammarGaps: [
      {
        id: "u5_g1",
        sentencePre: "People ",
        sentencePost: " to the radio many years ago.",
        options: ["listen", "listened", "listeneds"],
        correctAnswer: "listened",
        explanation: "Muntazam ravishda o'tgan zamondagi fe'llarga '-ed' qo'shiladi (listened)."
      },
      {
        id: "u5_g2",
        sentencePre: "They ",
        sentencePost: " watch movies on the internet back then.",
        options: ["don't", "didn't", "doesn't"],
        correctAnswer: "didn't",
        explanation: "O'tgan zamonda inkor gap tuzish uchun 'didn't' yordamchi fe'lidan foydalaniladi."
      }
    ],
    matchingPairs: [
      { id: "u5_m1", enStart: "People listened", enEnd: "to the radio stations.", uzStart: "Odamlar radio stansiyalarini", uzEnd: "tinglashgan." },
      { id: "u5_m2", enStart: "They didn't watch", enEnd: "the news on TV.", uzStart: "Ular televizorda yangiliklarni", uzEnd: "ko'rishmagan." },
      { id: "u5_m3", enStart: "They traveled by horse", enEnd: "or on boats.", uzStart: "Ular otda yoki qayiqda", uzEnd: "sayohat qilishgan." }
    ]
  },
  6: {
    unitNumber: 6,
    title: "Tell Me a Story, Grandpa",
    listeningTheme: "In a Museum",
    speakerA: "Grandpa Sobir",
    speakerB: "Granddaughter Zumrad",
    audioTextEn: "Grandpa Sobir: When I visited the museum yesterday, I saw an ancient couch, a wooden chair, and an old lamp. Zumrad: Did they have a modern bathtub or sink? Grandpa Sobir: No, they didn't! Life was very simple back then. People arrived at libraries to read and clerks worked hard.",
    audioTextUz: "Sobir Bobo: Kecha men muzeyga borganimda, qadimiy divan, yog'och stul va eski chiroqni ko'rdim. Zumrad: Ularda zamonaviy vanna yoki rakovina bormidi? Sobir Bobo: Yo'q, bo'lmagan! U paytlarda hayot juda oddiy bo'lgan. Odamlar o'qish uchun kutubxonalarga kelishgan va xizmatchilar qattiq ishlashgan.",
    sentences: [
      { id: "u6_s1", speaker: "Grandpa Sobir", en: "When I visited the museum yesterday, I saw an ancient couch, a wooden chair, and an old lamp.", uz: "Kecha men muzeyga borganimda, qadimiy divan, yog'och stul va eski chiroqni ko'rdim." },
      { id: "u6_s2", speaker: "Granddaughter Zumrad", en: "Did they have a modern bathtub or sink?", uz: "Ularda zamonaviy vanna yoki rakovina bormidi?" },
      { id: "u6_s3", speaker: "Grandpa Sobir", en: "No, they didn't! Life was very simple back then. People arrived at libraries to read and clerks worked hard.", uz: "Yo'q, bo'lmagan! U paytlarda hayot juda oddiy bo'lgan. Odamlar o'qish uchun kutubxonalarga kelishgan va xizmatchilar qattiq ishlashgan." }
    ],
    questions: [
      {
        id: "u6_lq1",
        questionEn: "What did Grandpa Sobir see in the museum?",
        questionUz: "Sobir bobo muzeyda nimalarni ko'rdi?",
        options: ["A computer and headphones", "A couch, chair, and lamp", "A modern sink and bathtub"],
        correctIndex: 1,
        explanation: "Bobo Sobir qadimiy divan, stul va chiroqni ko'rganligini aytdi (couch, chair, lamp)."
      },
      {
        id: "u6_lq2",
        questionEn: "Did they have a modern bathtub or sink long ago?",
        questionUz: "Uzoq vaqt oldin ularda zamonaviy vanna yoki rakovina bo'lganmi?",
        options: ["Yes, they did", "No, they didn't", "Sometimes they used television"],
        correctIndex: 1,
        explanation: "Grandpa Sobir javob berdi: 'No, they didn't!'"
      }
    ],
    grammarGaps: [
      {
        id: "u6_g1",
        sentencePre: "Did they ",
        sentencePost: " by ship to the other country?",
        options: ["travel", "traveled", "travels"],
        correctAnswer: "travel",
        explanation: "O'tgan zamondagi so'roq gapda 'Did' ishlatilgandan so'ng fe'lning asosi (travel) ishlatiladi."
      },
      {
        id: "u6_g2",
        sentencePre: "Yes, they ",
        sentencePost: ". It took them two weeks.",
        options: ["did", "didn't", "do"],
        correctAnswer: "did",
        explanation: "Tasdiq javobida 'Yes, they did' deb qisqa javob qaytariladi."
      }
    ],
    matchingPairs: [
      { id: "u6_m1", enStart: "Did they travel", enEnd: "by ship or train?", uzStart: "Ular kema yoki poyezdda", uzEnd: "sayohat qilishdimi?" },
      { id: "u6_m2", enStart: "Yes, they", enEnd: "did.", uzStart: "Ha, shunday", uzEnd: "qilishdi." },
      { id: "u6_m3", enStart: "Did they arrive", enEnd: "in two days? No.", uzStart: "Ular ikki kunda", uzEnd: "yetib kelishdimi? Yo'q." }
    ]
  },
  7: {
    unitNumber: 7,
    title: "Subtraction",
    listeningTheme: "Subtraction Problems",
    speakerA: "Abubakir",
    speakerB: "Sitora",
    audioTextEn: "Abubakir: I am so tired and hungry, let's solve some subtraction word problems! Sitora: Sure! I had a clean box with twenty stickers. I gave my sister eight. Now I have twelve left. Abubakir: Excellent! I bought ten apples because I was thirsty and hungry. I ate three, so seven are left in my dirty bag.",
    audioTextUz: "Abubakir: Men juda charchadim va qornim ochdi, keling, ayirish amali matnli masalalarini yechamiz! Sitora: Albatta! Menda yigirmata stikerli toza quti bor edi. Men singlimga sakkiztasini berdim. Hozir menda o'n ikkitasi qoldi. Abubakir: Juda yaxshi! Chanqaganim va qornim ochgani uchun o'nta olma sotib oldim. Uchtasini yedim, shuning uchun iflos sumkamda yettitasi qoldi.",
    sentences: [
      { id: "u7_s1", speaker: "Abubakir", en: "I am so tired and hungry, let's solve some subtraction word problems!", uz: "Men juda charchadim va qornim ochdi, keling, ayirish amali matnli masalalarini yechamiz!" },
      { id: "u7_s2", speaker: "Sitora", en: "Sure! I had a clean box with twenty stickers. I gave my sister eight. Now I have twelve left.", uz: "Albatta! Menda yigirmata stikerli toza quti bor edi. Men singlimga sakkiztasini berdim. Hozir menda o'n ikkitasi qoldi." },
      { id: "u7_s3", speaker: "Abubakir", en: "Excellent! I bought ten apples because I was thirsty and hungry. I ate three, so seven are left in my dirty bag.", uz: "Juda yaxshi! Chanqaganim va qornim ochgani uchun o'nta olma sotib oldim. Uchtasini yedim, shuning uchun iflos sumkamda yettitasi qoldi." }
    ],
    questions: [
      {
        id: "u7_lq1",
        questionEn: "How many stickers does Sitora have left?",
        questionUz: "Sitorada nechta stiker qoldi?",
        options: ["Eight stickers", "Twelve stickers", "Twenty stickers"],
        correctIndex: 1,
        explanation: "Sitorada 20 stiker bor edi, 8 Tasini berib yuborgach, 'twelve left' (12 ta) qoldi."
      },
      {
        id: "u7_lq2",
        questionEn: "Why did Abubakir buy ten apples?",
        questionUz: "Nima uchun Abubakir 10 ta olma sotib oldi?",
        options: ["Because he was tired and dirty", "Because he was thirsty and hungry", "Because he liked clean rows"],
        correctIndex: 1,
        explanation: "U shunday dedi: 'because I was thirsty and hungry'."
      }
    ],
    grammarGaps: [
      {
        id: "u7_g1",
        sentencePre: "Alma ",
        sentencePost: " five cookies yesterday.",
        options: ["buy", "bought", "boughted"],
        correctAnswer: "bought",
        explanation: "'Buy' noto'g'ri fe'lining o'tgan zamon shakli 'bought' hisoblanadi."
      },
      {
        id: "u7_g2",
        sentencePre: "She didn't ",
        sentencePost: " four cookies.",
        options: ["buy", "bought", "buys"],
        correctAnswer: "buy",
        explanation: "' didn't ' inkor yordamchi fe'lidan keyin fe'lning boshlang'ich shakli 'buy' qaytadi."
      }
    ],
    matchingPairs: [
      { id: "u7_m1", enStart: "Alma bought five", enEnd: "tasty cookies.", uzStart: "Alma beshta mazali", uzEnd: "pechenye sotib oldi." },
      { id: "u7_m2", enStart: "She didn't buy", enEnd: "four of them.", uzStart: "U ulardan to'rttasini", uzEnd: "sotib olmadi." },
      { id: "u7_m3", enStart: "Olivia gave her sister", enEnd: "twenty cute stickers.", uzStart: "Oliviya singlisiga berdi", uzEnd: "yigirmata chiroyli stiker." }
    ]
  },
  8: {
    unitNumber: 8,
    title: "Bandar, the Greedy Monkey",
    listeningTheme: "Number Problems",
    speakerA: "Grandpa Leo",
    speakerB: "Sardor",
    audioTextEn: "Grandpa Leo: Let me read you a math problem! Bandar the greedy monkey put his arm and hand inside a jar to steal sweet corn. Sardor: Did he let go of the corn? Grandpa Leo: No, he didn't! That is why his hand was stuck. He fell and hurt his knee and foot.",
    audioTextUz: "Leo Bobo: Senga bitta matematik masalani o'qib beray! Bandar ismli ochko'z maymun shirin makkajo'xori o'g'irlash uchun qo'li va panjasini ko'zaga soldi. Sardor: U makkajo'xoringi qo'yib yubordimi? Leo Bobo: Yo'q, qo'ymadi! Shuning uchun uning qo'li tiqilib qoldi. U yiqilib oldi va tizzasi bilan oyog'ini jarohatladi.",
    sentences: [
      { id: "u8_s1", speaker: "Grandpa Leo", en: "Let me read you a math problem! Bandar the greedy monkey put his arm and hand inside a jar to steal sweet corn.", uz: "Senga bitta matematik masalani o'qib beray! Bandar ismli ochko'z maymun shirin makkajo'xori o'g'irlash uchun qo'li va panjasini ko'zaga soldi." },
      { id: "u8_s2", speaker: "Sardor", en: "Did he let go of the corn?", uz: "U makkajo'xoringi qo'yib yubordimi?" },
      { id: "u8_s3", speaker: "Grandpa Leo", en: "No, he didn't! That is why his hand was stuck. He fell and hurt his knee and foot.", uz: "Yo'q, qo'ymadi! Shuning uchun uning qo'li tiqilib qoldi. U yiqilib oldi va tizzasi bilan oyog'ini jarohatladi." }
    ],
    questions: [
      {
        id: "u8_lq1",
        questionEn: "Why did Bandar put his hand inside the jar?",
        questionUz: "Nima uchun Bandar qo'lini ko'zaga soldi?",
        options: ["To play with his knee", "To steal sweet corn", "To wash his hand"],
        correctIndex: 1,
        explanation: "Bandar ochko'z bo'lgani uchun ko'zadan makkajo'xori o'g'irlamoqchi bo'ldi (steal sweet corn)."
      },
      {
        id: "u8_lq2",
        questionEn: "Which body parts did the monkey hurt when he fell?",
        questionUz: "Maymun yiqilganda qaysi tana a'zolarini jarohatladi?",
        options: ["His knee and foot", "His arm and face", "His nose and knee"],
        correctIndex: 0,
        explanation: "Bobo Leo: 'He fell and hurt his knee and foot' deb tasvirladi."
      }
    ],
    grammarGaps: [
      {
        id: "u8_g1",
        sentencePre: "Did Bandar ",
        sentencePost: " to the candy store?",
        options: ["go", "went", "goes"],
        correctAnswer: "go",
        explanation: "'Did' yordamchi fe'li o'tgan zamon so'rog'ida ishlatilganda asosiy fe'l o'z shakliga ('go') qaytadi."
      },
      {
        id: "u8_g2",
        sentencePre: "No, he ",
        sentencePost: ". He went to find a jar of corn.",
        options: ["did", "didn't", "don't"],
        correctAnswer: "didn't",
        explanation: "Inkor short answer sifatida 'didn't' kiritilishi to'g'ri."
      }
    ],
    matchingPairs: [
      { id: "u8_m1", enStart: "Did Bandar go", enEnd: "to the candy store?", uzStart: "Bandar konfetlar", uzEnd: "do'koniga bordimi?" },
      { id: "u8_m2", enStart: "No, he didn't", enEnd: "go there.", uzStart: "Yo'q, u u yerga", uzEnd: "bormadi." },
      { id: "u8_m3", enStart: "Did he let go", enEnd: "of the sweet candy?", uzStart: "U shirin konfetlarni", uzEnd: "qo'yib yubordimi?" }
    ]
  },
  9: {
    unitNumber: 9,
    title: "Following Rules",
    listeningTheme: "Rules in Different Places",
    speakerA: "Librarian Malika",
    speakerB: "Student Jasur",
    audioTextEn: "Librarian Malika: Jasur, welcome to our library. Please clean up your desk and do not litter! Jasur: Of course! This book on the table... is it yours? Librarian Malika: No, that is not mine. It is hers. Please take turns to cross the crosswalk safely on your way home.",
    audioTextUz: "Kutubxonachi Malika: Jasur, kutubxonamizga xush kelibsiz. Iltimos, partangizni tozalang va axlat tashlamang! Jasur: Albatta! Stul ustidagi bu kitob... siznikimi? Kutubxonachi Malika: Yo'q, bu meniki emas. U uniki (qiz bolaga nisbatan). Iltimos, uyga ketayotganda chorrahani / piyodalar yo'lagini navbat bilan xavfsiz kesib o'ting.",
    sentences: [
      { id: "u9_s1", speaker: "Librarian Malika", en: "Jasur, welcome to our library. Please clean up your desk and do not litter!", uz: "Jasur, kutubxonamizga xush kelibsiz. Iltimos, partangizni tozalang va axlat tashlamang!" },
      { id: "u9_s2", speaker: "Student Jasur", en: "Of course! This book on the table... is it yours?", uz: "Albatta! Stul ustidagi bu kitob... siznikimi?" },
      { id: "u9_s3", speaker: "Librarian Malika", en: "No, that is not mine. It is hers. Please take turns to cross the crosswalk safely on your way home.", uz: "Yo'q, bu meniki emas. U uniki (qiz bolaga nisbatan). Iltimos, uyga ketayotganda chorrahani / piyodalar yo'lagini navbat bilan xavfsiz kesib o'ting." }
    ],
    questions: [
      {
        id: "u9_lq1",
        questionEn: "What rules does Malika give Jasur inside the library?",
        questionUz: "Malika kutubxonada Jasurga qanday qoidalarni beradi?",
        options: ["To jump and shout", "To clean up the desk and not litter", "To run in the swimming pool"],
        correctIndex: 1,
        explanation: "Kutubxonachi unga tozalab, axlat tashlamaslikni buyuradi (clean up and do not litter)."
      },
      {
        id: "u9_lq2",
        questionEn: "What is mentioned about the crosswalk?",
        questionUz: "Piyodalar yo'lagi (crosswalk) haqida nima aytilgan?",
        options: ["To take turns and cross safely", "To do homework on it", "To play with a basketball"],
        correctIndex: 0,
        explanation: "Yo'ldan piyodalar yo'lagida navbat bilan xavfsiz o'tish aytiladi ('take turns to cross safely')."
      }
    ],
    grammarGaps: [
      {
        id: "u9_g1",
        sentencePre: "These are your books. These books are ",
        sentencePost: ".",
        options: ["your", "yours", "you"],
        correctAnswer: "yours",
        explanation: "Otdan keyin keladigan egalik olmoshi 'yours' (sizniki) shaklida qo'yiladi."
      },
      {
        id: "u9_g2",
        sentencePre: "Whose textbook is this? It is ",
        sentencePost: "(belonging to her).",
        options: ["her", "hers", "she"],
        correctAnswer: "hers",
        explanation: "Qiz bolaga tegishli egalikni ifodalovchi mustaqil egalik olmoshi 'hers' (uniki) hisoblanadi."
      }
    ],
    matchingPairs: [
      { id: "u9_m1", enStart: "Those are your things.", enEnd: "Those things are yours.", uzStart: "Anavilar sizning narsalaringiz.", uzEnd: "U narsalar sizniki." },
      { id: "u9_m2", enStart: "Whose book is this?", enEnd: "It is hers.", uzStart: "Bu kimning kitobi?", uzEnd: "Bu uniki (qiz bolaniki)." },
      { id: "u9_m3", enStart: "This classroom on the right", enEnd: "is ours.", uzStart: "O'ng tomondagi bu sinfxona", uzEnd: "bizniki." }
    ]
  },
  10: {
    unitNumber: 10,
    title: "The Please and Thank You Book of Poems",
    listeningTheme: "Polite or Rude?",
    speakerA: "Teacher Gulnoza",
    speakerB: "Student Elyor",
    audioTextEn: "Teacher Gulnoza: Elyor, using headphones at a loud level in high volume is rude. Please put away your laptop. Elyor: May I ask a question, teacher? Can we share this tablet and camera during the test? Teacher Gulnoza: Yes, you can. Sharing is very thoughtful!",
    audioTextUz: "Gulnoza Ustoz: Elyor, yuqori ovozda naushniklardan foydalanish qo'pollikdir. Iltimos noutbokingizni olib qo'ying. Elyor: Savol so'rasam maylimi, ustoz? Test davomida ushbu planshet va kamerani bo'lishsak bo'ladimi? Gulnoza Ustoz: Ha, bo'lishishingiz mumkin. Bo'lishish juda e'tiborlidir / yaxshidir!",
    sentences: [
      { id: "u10_s1", speaker: "Teacher Gulnoza", en: "Elyor, using headphones at a loud level in high volume is rude. Please put away your laptop.", uz: "Elyor, yuqori ovozda naushniklardan foydalanish qo'pollikdir. Iltimos noutbokingizni olib qo'ying." },
      { id: "u10_s2", speaker: "Student Elyor", en: "May I ask a question, teacher? Can we share this tablet and camera during the test?", uz: "Savol so'rasam maylimi, ustoz? Test davomida ushbu planshet va kamerani bo'lishsak bo'ladimi?" },
      { id: "u10_s3", speaker: "Teacher Gulnoza", en: "Yes, you can. Sharing is very thoughtful!", uz: "Ha, bo'lishishingiz mumkin. Bo'lishish juda e'tiborlidir!" }
    ],
    questions: [
      {
        id: "u10_lq1",
        questionEn: "Why does Teacher Gulnoza ask Elyor to put away his laptop?",
        questionUz: "Nima uchun Gulnoza ustoz Elyordan noutbukini olib qo'yishni so'raydi?",
        options: ["Because using high volume headphones is rude", "Because he must clean up his camera", "Because she wants to play on it"],
        correctIndex: 0,
        explanation: "Gulnoza ustoz baland ovozda naushnik kiyish odobsizlik ekanligini aytdi (headphones at a loud level is rude)."
      },
      {
        id: "u10_lq2",
        questionEn: "What does Elyor ask permission for?",
        questionUz: "Elyor nima qilish uchun ruxsat so'raydi?",
        options: ["To stream to a TV", "To share the tablet and camera during the test", "To go home early"],
        correctIndex: 1,
        explanation: "Elyor planshet va kamerani testda birgalikda ishlatish (share tablet and camera) haqida so'radi."
      }
    ],
    grammarGaps: [
      {
        id: "u10_g1",
        sentencePre: "Can I play the game? Yes, you ",
        sentencePost: ".",
        options: ["can", "may", "can't"],
        correctAnswer: "can",
        explanation: "'Can I' savoliga ruxsat berishda 'Yes, you can' deb javob beriladi."
      },
      {
        id: "u10_g2",
        sentencePre: "May I come in? No, you may ",
        sentencePost: ".",
        options: ["not", "cannot", "no"],
        correctAnswer: "not",
        explanation: "Rasmiy 'May I' inkor javobida 'No, you may not' (Yo'q, mumkin emas) jumlasi ishlatiladi."
      }
    ],
    matchingPairs: [
      { id: "u10_m1", enStart: "Can I play with you?", enEnd: "Yes, you can.", uzStart: "Siz bilan o'ynasam bo'ladimi?", uzEnd: "Ha, o'ynashingiz mumkin." },
      { id: "u10_m2", enStart: "May I come in, sir?", enEnd: "No, you may not.", uzStart: "Kirsam maylimi, janob?", uzEnd: "Yo'q, kirish mumkin emas." },
      { id: "u10_m3", enStart: "Please put away", enEnd: "your mobile cellphone.", uzStart: "Iltimos, uyali telefoningizni", uzEnd: "olib qo'ying." }
    ]
  },
  11: {
    unitNumber: 11,
    title: "Natural Resources",
    listeningTheme: "Clean or Polluted?",
    speakerA: "Ranger Mansur",
    speakerB: "Camper Nilufar",
    audioTextEn: "Ranger Mansur: Hello Nilufar! Welcome to the camp. Our land is clean, but some smoke and trash can pollute the environment. Nilufar: Oh! We want to hike above the hill and ride a horse. Mansur: Have fun! But remember to keep things clean. There is a green trash can behind the big tree, and the cabin is across from the river.",
    audioTextUz: "Mansur Reyndjer: Salom Nilufar! Lagerga xush kelibsiz. Bizning yerimiz toza, ammo ba'zi tutunlar va axlatlar atrof-muhitni ifloslantirishi mumkin. Nilufar: Oh! Biz tepalik ustida sayohat qilishni (hike) va ot minishni xohlaymiz. Mansur: Yaxshi hordiq oling! Lekin hamma narsani toza saqlashni unutmang. Katta daraxt orqasida (behind) yashil axlat qutisi bor, va kulba daryoning qarshisida (across from) joylashgan.",
    sentences: [
      { id: "u11_s1", speaker: "Ranger Mansur", en: "Hello Nilufar! Welcome to the camp. Our land is clean, but some smoke and trash can pollute the environment.", uz: "Salom Nilufar! Lagerga xush kelibsiz. Bizning yerimiz toza, ammo ba'zi tutunlar va axlatlar atrof-muhitni ifloslantirishi mumkin." },
      { id: "u11_s2", speaker: "Camper Nilufar", en: "Oh! We want to hike above the hill and ride a horse.", uz: "Oh! Biz tepalik ustida sayohat qilishni (hike) va ot minishni xohlaymiz." },
      { id: "u11_s3", speaker: "Ranger Mansur", en: "Have fun! But remember to keep things clean. There is a green trash can behind the big tree, and the cabin is across from the river.", uz: "Yaxshi hordiq oling! Lekin hamma narsani toza saqlashni unutmang. Katta daraxt orqasida (behind) yashil axlat qutisi bor, va kulba daryoning qarshisida (across from) joylashgan." }
    ],
    questions: [
      {
        id: "u11_lq1",
        questionEn: "What activities does Nilufar plan to do at the camp?",
        questionUz: "Nilufar lagerda qanday mashg'ulotlarni bajarishni rejalashtirmoqda?",
        options: ["Hike above the hill and ride a horse", "Fish and ski in winter", "Clean the landfill and wood"],
        correctIndex: 0,
        explanation: "Nilufar: 'We want to hike above the hill and ride a horse' deb o'z rejalarini aytadi."
      },
      {
        id: "u11_lq2",
        questionEn: "Where is the green trash can located?",
        questionUz: "Yashil axlat qutisi qayerda joylashgan?",
        options: ["Across from the landfill", "Behind the big tree", "In front of the river"],
        correctIndex: 1,
        explanation: "Mansur uni katta daraxtning orqasida (behind the big tree) deb ko'rsatdi."
      }
    ],
    grammarGaps: [
      {
        id: "u11_g1",
        sentencePre: "There is some smoky air ",
        sentencePost: " the mountains.",
        options: ["above", "behind", "across"],
        correctAnswer: "above",
        explanation: "Tepada, havodagi tutunlarni ifodalash uchun 'above' (tepasida / yuqorida) predlogi to'g'ri keladi."
      },
      {
        id: "u11_g2",
        sentencePre: "The beautiful waterfall is ",
        sentencePost: " the forest park.",
        options: ["across from", "behind", "in front of"],
        correctAnswer: "across from",
        explanation: "Bog'ning to'g'risida, ro'parasida ma'nosida 'across from' prepozitsiyasi mos keladi."
      }
    ],
    matchingPairs: [
      { id: "u11_m1", enStart: "There is smoke in air", enEnd: "above the city skyline.", uzStart: "Havoda tutun bor", uzEnd: "shahar ufqidan yuqorida/tepasida." },
      { id: "u11_m2", enStart: "The landfill is", enEnd: "across from the park.", uzStart: "Chiqindi poligoni joylashgan", uzEnd: "bog'ning ro'parasida." },
      { id: "u11_m3", enStart: "The trash can is", enEnd: "behind the tree.", uzStart: "Axlat qutisi turibdi", uzEnd: "daraxtning orqasida." }
    ]
  },
  12: {
    unitNumber: 12,
    title: "A Juice Carton's Diary",
    listeningTheme: "Earth Awareness Week",
    speakerA: "Teacher Nigora",
    speakerB: "Student Doniyor",
    audioTextEn: "Teacher Nigora: Welcome to Earth Awareness Week. Look at this recycle machine! Doniyor: Teacher, where is the recycling bin? Is there a trash can behind the stationery store? Teacher Nigora: Yes, there is. At nine o'clock and nine-thirty, we will rescue old cartons and paper. Let's start!",
    audioTextUz: "Nigora Ustoz: Yer sayyorasini asrash haftaligiga xush kelibsiz. Mana bu qayta ishlash mashinasiga qarang! Doniyor: Ustoz, qayta ishlash qutisi qayerda? Kanselyariya do'koni orqasida axlat qutisi bormi? Nigora Ustoz: Ha, bor. Soat to'qqiz va to'qqiz yarimda biz eski qutilarni (cartons) va qog'ozlarni qutqaramiz/to'playmiz. Keling, boshlaymiz!",
    sentences: [
      { id: "u12_s1", speaker: "Teacher Nigora", en: "Welcome to Earth Awareness Week. Look at this recycle machine!", uz: "Yer sayyorasini asrash haftaligiga xush kelibsiz. Qayta ishlash mashinasiga qarang!" },
      { id: "u12_s2", speaker: "Student Doniyor", en: "Teacher, where is the recycling bin? Is there a trash can behind the stationery store?", uz: "Ustoz, qayta ishlash qutisi qayerda? Kanselyariya do'koni orqasida axlat qutisi bormi?" },
      { id: "u12_s3", speaker: "Teacher Nigora", en: "Yes, there is. At nine o'clock and nine-thirty, we will rescue old cartons and paper. Let's start!", uz: "Ha, bor. Soat to'qqiz va to'qqiz yarimda biz eski qutilarni va qog'ozlarni qutqaramiz/to'playmiz. Boshlaylik!" }
    ],
    questions: [
      {
        id: "u12_lq1",
        questionEn: "What times are mentioned for collecting materials?",
        questionUz: "Materiallarni yig'ish uchin qaysi vaqtlar aytildi?",
        options: ["Nine o'clock and nine-thirty", "Nine-fifteen and nine-forty-five", "Ten-thirty"],
        correctIndex: 0,
        explanation: "Nigora ustoz: 'At nine o'clock and nine-thirty' deb aytib o'tdi."
      },
      {
        id: "u12_lq2",
        questionEn: "What items will the students rescue?",
        questionUz: "O'quvchilar qaysi buyumlarni qutqarib/to'plab qolishadi?",
        options: ["Cartons and paper", "Iron machines", "Diary and stationery stores"],
        correctIndex: 0,
        explanation: "Ular qutilar (carton) va qog'ozlarni (paper) to'plab qayta ishlashadi."
      }
    ],
    grammarGaps: [
      {
        id: "u12_g1",
        sentencePre: "Where ",
        sentencePost: " the drinking fountain?",
        options: ["is", "are", "am"],
        correctAnswer: "is",
        explanation: "Birlikdagi ot 'drinking fountain' uchun so'roq gapda 'is' ishlatiladi."
      },
      {
        id: "u12_g2",
        sentencePre: "Is there a trash can behind the tree? Yes, there ",
        sentencePost: ".",
        options: ["is", "are", "isn't"],
        correctAnswer: "is",
        explanation: "Tasdiqlovchi qisqa javob sifatida 'Yes, there is' to'g'ri kiritiladi."
      }
    ],
    matchingPairs: [
      { id: "u12_m1", enStart: "Where is the", enEnd: "drinking fountain located?", uzStart: "Ichimlik favvorasi qayerda", uzEnd: "joylashgan?" },
      { id: "u12_m2", enStart: "It is across from", enEnd: "the bronze statue.", uzStart: "U bronza haykalning", uzEnd: "ro'parasida." },
      { id: "u12_m3", enStart: "Is there a trash can", enEnd: "behind the school? Yes.", uzStart: "Maktab orqasida axlat qutisi", uzEnd: "bormi? Ha." }
    ]
  },
  13: {
    unitNumber: 13,
    title: "How Music Makes us Feel",
    listeningTheme: "The School Concert",
    speakerA: "Aida",
    speakerB: "Sardor",
    audioTextEn: "Aida: I feel so proud! During our school concert in the morning, my trumpet sounded high. Sardor: Wow, Aida! I had a big smile but I was also nervous. It made me yawn because I was excited and sleepy. Aida: Me too! I wanted to cry of joy at night. Music matches all feelings!",
    audioTextUz: "Aida: Men juda faxrlanyapman! Ertalabki maktab konsertimizda mening trubam (musiqa asbobi) baland va ravshan yangradi. Sardor: Voy, Aida! Men mamnuniyat bilan jilmaydim (smile), lekin hayajonlandim ham (nervous). Bu meni esnatib yubordi, chunki men ham hayajonda, ham uyqusiragan edim. Aida: Men ham! Kechasi quvonchdan yig'lagim (cry) keldi. Musiqa barcha tuyg'ularga mos keladi!",
    sentences: [
      { id: "u13_s1", speaker: "Aida", en: "I feel so proud! During our school concert in the morning, my trumpet sounded high.", uz: "Men juda faxrlanyapman! Ertalabki maktab konsertimizda mening trubam baland yangradi." },
      { id: "u13_s2", speaker: "Sardor", en: "Wow, Aida! I had a big smile but I was also nervous. It made me yawn because I was excited and sleepy.", uz: "Voy, Aida! Men mamnuniyat bilan jilmaydim, lekin hayajonlandim ham. Bu meni esnatib yubordi, chunki men ham hayajonda, ham uyqusiragan edim." },
      { id: "u13_s3", speaker: "Aida", en: "Me too! I wanted to cry of joy at night. Music matches all feelings!", uz: "Men ham! Kechasi quvonchdan yig'lagim keldi. Musiqa barcha tuyg'ularga mos keladi!" }
    ],
    questions: [
      {
        id: "u13_lq1",
        questionEn: "Why did Sardor yawn during the experience?",
        questionUz: "Nima uchun Sardor jarayon davomida esnadi (yawn)?",
        options: ["Because he was excited and sleepy", "Because he was crying of unhappy feelings", "Because he hated the school concert"],
        correctIndex: 0,
        explanation: "Sardor hayajon va uyqusi kelgani uchun esnaganligini aytdi (excited and sleepy)."
      },
      {
        id: "u13_lq2",
        questionEn: "Which musical instrument did Aida play?",
        questionUz: "Aida qaysi musiqa asbobini chaldi?",
        options: ["Pianoforte", "Trumpet", "Drums"],
        correctIndex: 1,
        explanation: "Aida o'zining trubasini high tarzda yangratdi ('my trumpet sounded high')."
      }
    ],
    grammarGaps: [
      {
        id: "u13_g1",
        sentencePre: "Pedro listens to slow music ",
        sentencePost: " night.",
        options: ["at", "in", "on"],
        correctAnswer: "at",
        explanation: "Tungi vaqtni ifodalash uchun 'at night' iborasi to'g'ri bog'lovchidir."
      },
      {
        id: "u13_g2",
        sentencePre: "Amanda always listens to jazz music ",
        sentencePost: " the morning.",
        options: ["in", "at", "on"],
        correctAnswer: "in",
        explanation: "Kun qismlarini (morning, afternoon, evening) ifodalash uchun 'in' ishlatiladi ('in the morning')."
      }
    ],
    matchingPairs: [
      { id: "u13_m1", enStart: "Pedro listens to music", enEnd: "at night in his bed.", uzStart: "Pedro kechasi yotganida", uzEnd: "musiqa tinglaydi." },
      { id: "u13_m2", enStart: "They listen to songs", enEnd: "in the morning.", uzStart: "Ular qo'shiqlarni", uzEnd: "ertalab eshitishadi." },
      { id: "u13_m3", enStart: "She does homework", enEnd: "in the afternoon.", uzStart: "U uy vazifalarini", uzEnd: "tushdan keyin bajaradi." }
    ]
  },
  14: {
    unitNumber: 14,
    title: "Olga's Flute",
    listeningTheme: "Interview with a Pop Star",
    speakerA: "Reporter Bobur",
    speakerB: "Pop Star Mark",
    audioTextEn: "Reporter Bobur: Behind the scene, let's do an interview! Did you make a mistake on stage, Mark? Mark: No, this morning I was worried because of the flu, but the music solo went perfect. Bobur: Great! The fans are waiting to sign an autograph and talk. Let's have lunch later!",
    audioTextUz: "Bobur Jurnalist: Sahnadan tashqarida keling bitta intervyu qilamiz! Sahnada xatoga yo'l qo'ydingizmi, Mark? Mark: Yo'q, bugun ertalab gripp tufayli xavotirda edim, lekin yakkaxon musiqiy chiqish (solo) mukammal o'tdi. Bobur: Zo'r! Muxlislar avtograf olishingizni va muloqot qilishingizni kutyapti. Keyinroq tushlik qilamiz!",
    sentences: [
      { id: "u14_s1", speaker: "Reporter Bobur", en: "Behind the scene, let's do an interview! Did you make a mistake on stage, Mark?", uz: "Sahnadan tashqarida keling bitta intervyu qilamiz! Sahnada xatoga yo'l qo'ydingizmi, Mark?" },
      { id: "u14_s2", speaker: "Pop Star Mark", en: "No, this morning I was worried because of the flu, but the music solo went perfect.", uz: "Yo'q, bugun ertalab gripp tufayli xavotirda edim, lekin yakkaxon musiqiy chiqish (solo) mukammal o'tdi." },
      { id: "u14_s3", speaker: "Reporter Bobur", en: "Great! The fans are waiting to sign an autograph and talk. Let's have lunch later!", uz: "Zo'r! Muxlislar avtograf olishingizni va muloqot qilishingizni kutyapti. Keyinroq tushlik qilamiz!" }
    ],
    questions: [
      {
        id: "u14_lq1",
        questionEn: "Why was Mark worried this morning?",
        questionUz: "Mark bugun ertalab nima uchun xavotirda edi?",
        options: ["Because of the flu", "Because he made a mistake in solo", "Because he lost his autograph book"],
        correctIndex: 0,
        explanation: "Mark shamollab / gripp bo'lib qolgani sababli xavotirda edi (worried because of the flu)."
      },
      {
        id: "u14_lq2",
        questionEn: "What are the fans waiting for right now?",
        questionUz: "Muxlislar ayni damda nimani kutyaptilar?",
        options: ["To have lunch together", "To sign an autograph and talk", "To hear a flute solo"],
        correctIndex: 1,
        explanation: "Muxlislar dastxat olish va u bilan suhbatlashishni xohlashadi (sign an autograph and talk)."
      }
    ],
    grammarGaps: [
      {
        id: "u14_g1",
        sentencePre: "Olga goes to music school early ",
        sentencePost: " for practice.",
        options: ["this morning", "yesterday morning", "tomorrow morning"],
        correctAnswer: "this morning",
        explanation: "Hozirgi zamondagi xabarni ifodalash uchun 'this morning' (shu tongda) ishlatilishi to'g'ri."
      },
      {
        id: "u14_g2",
        sentencePre: "Mark went to the clinic ",
        sentencePost: " because he had the flu.",
        options: ["this morning", "yesterday morning", "now"],
        correctAnswer: "yesterday morning",
        explanation: "'Went' o'tgan zamonda bo'lgani sababli vaqt ravishi 'yesterday morning' bo'ladi."
      }
    ],
    matchingPairs: [
      { id: "u14_m1", enStart: "Olga goes to school early", enEnd: "this morning.", uzStart: "Olga maktabga barvaqt boradi", uzEnd: "bugun ertalab." },
      { id: "u14_m2", enStart: "Mark went to music class", enEnd: "yesterday morning.", uzStart: "Mark musiqa darsiga bordi", uzEnd: "kecha ertalab." },
      { id: "u14_m3", enStart: "They will do an interview", enEnd: "in the evening.", uzStart: "Ular intervyu qilishadi", uzEnd: "kechqurun." }
    ]
  },
  15: {
    unitNumber: 15,
    title: "Forces and Movement",
    listeningTheme: "Things We Push and Pull",
    speakerA: "Prof. Temur",
    speakerB: "Assistant Noila",
    sentences: [
      { id: "u15_s1", speaker: "Prof. Temur", en: "In physically studying movement, we throw or pull things on the ground.", uz: "Harakatlarni fizik o'rganishda, biz yerda narsalarni otamiz yoki tortamiz." },
      { id: "u15_s2", speaker: "Assistant Noila", en: "Yes! A suitcase is heavy, so we pull it. But a computer mouse is light and easy to push.", uz: "Ha! Chamodon og'ir, shuning uchun uni tortamiz. Lekin kompyuter sichqonchasi yengil va itarish oson." },
      { id: "u15_s3", speaker: "Prof. Temur", en: "That is correct! A stapler or desk drawer requires some speed to open. Science is beautiful!", uz: "Juda to'g'ri! Stepler yoki stol tortmasini ochish biroz tezlikni talab qiladi. Fan juda go'zal!" }
    ],
    audioTextEn: "Prof. Temur: In physically studying movement, we throw or pull things on the ground. Noila: Yes! A suitcase is heavy, so we pull it. But a computer mouse is light and easy to push. Prof. Temur: That is correct! A stapler or desk drawer requires some speed to open. Science is beautiful!",
    audioTextUz: "Temur Professor: Harakatlarni fizik o'rganishda, biz yerda narsalarni otamiz yoki tortamiz. Noila: Ha! Chamodon og'ir, shuning uchun uni tortamiz. Lekin kompyuter sichqonchasi yengil va uni itarish oson. Temur Professor: Juda to'g'ri! Stepler yoki stol tortmasini ochish biroz tezlikni talab qiladi. Fan juda go'zal!",
    questions: [
      {
        id: "u15_lq1",
        questionEn: "Why do we pull a suitcase instead of pushing it?",
        questionUz: "Nima uchun biz chamodonni itarish o'rniga tortamiz?",
        options: ["Because it is heavy", "Because it is light and easy", "Because it is on a desk drawer"],
        correctIndex: 0,
        explanation: "Noila og'ir bo'lgani uchun chamodonni tortishlarini aytdi (suitcase is heavy, so we pull it)."
      },
      {
        id: "u15_lq2",
        questionEn: "Which item is described as light and easy to push?",
        questionUz: "Qaysi buyum yengil va itarish oson deb ta'riflandi?",
        options: ["A stapler", "A computer mouse", "A heavy broom"],
        correctIndex: 1,
        explanation: "Kompyuter sichqonchasi (computer mouse) juda yengil va oson itariladi."
      }
    ],
    grammarGaps: [
      {
        id: "u15_g1",
        sentencePre: "A basketball is ",
        sentencePost: " than a giant desk.",
        options: ["light", "lighter", "lightest"],
        correctAnswer: "lighter",
        explanation: "Ikki narsani taqqoslashda Comparative form sifatida '-er' qo'shimchasi qo'shiladi (lighter)."
      },
      {
        id: "u15_g2",
        sentencePre: "Is a heavy suitcase ",
        sentencePost: " than a tiny computer mouse?",
        options: ["heavyer", "heavier", "heavy"],
        correctAnswer: "heavier",
        explanation: "'y' bilan tugaydigan heavy fe'li 'i-er' bo'lib o'zgaradi va solishtirish hosil qiladi."
      }
    ],
    matchingPairs: [
      { id: "u15_m1", enStart: "A ball is lighter", enEnd: "than a wooden desk.", uzStart: "Koptok yog'och stuldan", uzEnd: "yengilroqdir." },
      { id: "u15_m2", enStart: "Is a desk heavier", enEnd: "than a tiny ball? Yes.", uzStart: "Yozuv stoli koptokdan", uzEnd: "og'irroqmi? Ha." },
      { id: "u15_m3", enStart: "A train is slower", enEnd: "than a jet airplane.", uzStart: "Poyezd reaktiv samolyotdan", uzEnd: "sekinroqdir." }
    ]
  },
  16: {
    unitNumber: 16,
    title: "Two Stubborn Little Goats",
    listeningTheme: "Sport and Movement",
    speakerA: "Coah Alisher",
    speakerB: "Player Kamron",
    audioTextEn: "Coach Alisher: Kamron, look! Playing soccer, basketball, or tennis is very wet and forward. We must not be angry but stubborn and smart. Kamron: Yes, Coach! Running makes me strong. Look, they are also playing hockey and golf over there on the grass. Coach Alisher: Brilliant, regular exercises keep you healthy!",
    audioTextUz: "Alisher Murabbiy: Kamron, qara! Futbol, basketbol yoki tennis o'ynash ho'l va doimiy faollikni talab qiladi. Biz jahldor emas, balki qaysar (g'alabaga o'ch) va aqlli bo'lishimiz kerak. Kamron: Ha, murabbiy! Yugurish meni baquvvat qiladi. Qarang, anavi yerda maysada xokkey va golf ham o'ynashyapti. Alisher Murabbiy: Ajoyib, doimiy mashqlar seni sog'lom tutadi!",
    sentences: [
      { id: "u16_s1", speaker: "Coach Alisher", en: "Kamron, look! Playing soccer, basketball, or tennis is very wet and forward. We must not be angry but stubborn and smart.", uz: "Kamron, qara! Futbol, basketbol yoki tennis o'ynash nam va doimiy faollikni talab qiladi. Biz jahldor emas, balki qaysar (g'alabaga o'ch) va aqlli bo'lishimiz kerak." },
      { id: "u16_s2", speaker: "Player Kamron", en: "Yes, Coach! Running makes me strong. Look, they are also playing hockey and golf over there on the grass.", uz: "Ha, murabbiy! Yugurish meni baquvvat qiladi. Qarang, anavi yerda maysada xokkey va golf ham o'ynashyapti." },
      { id: "u16_s3", speaker: "Coach Alisher", en: "Brilliant, regular exercises keep you healthy!", uz: "Ajoyib, doimiy mashqlar seni sog'lom tutadi!" }
    ],
    questions: [
      {
        id: "u16_lq1",
        questionEn: "What sport games are mentioned by Kamron?",
        questionUz: "Kamron qaysi sport o'yinlarini sanab o'tdi?",
        options: ["Hockey and golf", "Baseball and soccer", "Tennis and ski"],
        correctIndex: 0,
        explanation: "Kamron maysada xokkey va golf o'ynashayotganini ko'rganini aytdi (hockey and golf)."
      },
      {
        id: "u16_lq2",
        questionEn: "How does the coach advise the player to behave?",
        questionUz: "Murabbiy o'yinchiga o'zini qanday tutishni maslahat berdi?",
        options: ["To be angry and slow", "Not to be angry but stubborn and smart", "To look forward and sleep"],
        correctIndex: 1,
        explanation: "Murabbiy: 'We must not be angry but stubborn and smart' dedi."
      }
    ],
    grammarGaps: [
      {
        id: "u16_g1",
        sentencePre: "I am the ",
        sentencePost: " person in my football team.",
        options: ["young", "younger", "youngest"],
        correctAnswer: "youngest",
        explanation: "Eng kuchli darajani ko'rsatish (Superlative form) uchun 'the' artilki bilan '-est' qo'shimchasi qo'llaniladi (youngest)."
      },
      {
        id: "u16_g2",
        sentencePre: "Is the ",
        sentencePost: " grass on East Mountain?",
        options: ["juicy", "juicier", "juiciest"],
        correctAnswer: "juiciest",
        explanation: "Eng sersuv o't (the juiciest grass) deganda eng yuqori daraja ('the' oldida kelsa) 'juiciest' to'g'ri."
      }
    ],
    matchingPairs: [
      { id: "u16_m1", enStart: "I am the youngest", enEnd: "person in my cozy family.", uzStart: "Men o'zimning shinam oilamda", uzEnd: "eng yoshiman." },
      { id: "u16_m2", enStart: "Is the juiciest grass", enEnd: "on East Mountain? Yes.", uzStart: "Eng sersuv maysa sharqiy", uzEnd: "tog'dami? Ha." },
      { id: "u16_m3", enStart: "He is the smartest", enEnd: "student in the class.", uzStart: "U sinfdagi", uzEnd: "eng aqlli o'quvchidir." }
    ]
  },
  17: {
    unitNumber: 17,
    title: "Shapes in Art",
    listeningTheme: "Art Class",
    speakerA: "Art Teacher Guli",
    speakerB: "Student Sardor",
    audioTextEn: "Teacher Guli: Welcome to art class! Look at this mosaic and oil painting. There are a lot of shapes like spirals or stars. Sardor: I see them! And here is a photograph of beautiful nature drawings. Guli: Correct! Let's make a beautiful straight line collage on this mobile sculpture.",
    audioTextUz: "Guli Rassomchilik Ustoz: Tasviriy san'at darsiga xush kelibsiz! Mana bu mozaika va moybo'yoqli rasmga qarang. Bu yerda spirallar yoki yulduzlar kabi ko'plab shakllar (shapes) bor. Sardor: Men ularni ko'ryapman! Bu yerda esa chiroyli tabiat rasmlarining fotosurati bor. Guli Rassomchilik Ustoz: To'g'ri! Keling, ushbu mobil haykalda chiroyli to'g'ri chiziqli kollaj qilamiz.",
    sentences: [
      { id: "u17_s1", speaker: "Art Teacher Guli", en: "Welcome to art class! Look at this mosaic and oil painting. There are a lot of shapes like spirals or stars.", uz: "Tasviriy san'at darsiga xush kelibsiz! Mozaika va moybo'yoqli rasmga qarang. Shakllar juda ko'p." },
      { id: "u17_s2", speaker: "Student Sardor", en: "I see them! And here is a photograph of beautiful nature drawings.", uz: "Men ularni ko'ryapman! Bu yerda esa ajoyib tabiat rasmlarining fotosurati bor." },
      { id: "u17_s3", speaker: "Art Teacher Guli", en: "Correct! Let's make a beautiful straight line collage on this mobile sculpture.", uz: "To'g'ri! Iltimos, ushbu mobil haykalda chiroyli to'g'ri chiziqli kollaj qilaylik." }
    ],
    questions: [
      {
        id: "u17_lq1",
        questionEn: "What art styles are described in Guli's classroom?",
        questionUz: "Guli sinfida qanday badiiy uslublar tasvirlangan?",
        options: ["Mosaic and oil painting", "Origami and sculpture tool", "Markers and scissors"],
        correctIndex: 0,
        explanation: "Ustoz Guli mozaika va moybo'yoq ranglar haqida gapirdi ('mosaic and oil painting')."
      },
      {
        id: "u17_lq2",
        questionEn: "Which shapes are explicitly mentioned in the classroom art?",
        questionUz: "Sinfdagi shakllardan qaysilari aniq aytildi?",
        options: ["Crescent and straight lines", "Spirals and stars", "Oval and circles"],
        correctIndex: 1,
        explanation: "U spirals va stars mavjudligini aytib o'tdi."
      }
    ],
    grammarGaps: [
      {
        id: "u17_g1",
        sentencePre: "There are ",
        sentencePost: " different beautiful shapes in our class.",
        options: ["a lot of", "any", "is"],
        correctAnswer: "a lot of",
        explanation: "Ko'p narsalarni tasdiq gapda ifodalash uchun 'a lot of' (ko'plab) quantifier ishlatiladi."
      },
      {
        id: "u17_g2",
        sentencePre: "There aren't ",
        sentencePost: " triangles in this clean painting.",
        options: ["some", "any", "a lot of"],
        correctAnswer: "any",
        explanation: "Inkor gapda ko'plikdagi otlar kelsa 'any' (hech qanday) ishlatilishi shart."
      }
    ],
    matchingPairs: [
      { id: "u17_m1", enStart: "There are a lot of", enEnd: "creative shapes in art.", uzStart: "San'atda ko'plab", uzEnd: "ijodiy shakllar mavjud." },
      { id: "u17_m2", enStart: "There aren't any", enEnd: "triangles on this table.", uzStart: "Ushbu stolda hech qanday", uzEnd: "uchburchak yo'q." },
      { id: "u17_m3", enStart: "There isn't any", enEnd: "red paint leftover.", uzStart: "Hech qanday qizil", uzEnd: "bo'yoq qolmadi." }
    ]
  },
  18: {
    unitNumber: 18,
    title: "Origami",
    listeningTheme: "Making Art",
    speakerA: "Instructor Rustam",
    speakerB: "Student Laylo",
    audioTextEn: "Instructor Rustam: Laylo, let's use colors and glue to fold a golden paper crane! Laylo: Wow! I have scissors, watercolor, markers, and colored pencils in my box. Do we need chalk? Instructor Rustam: We do not need chalk today. Be careful to fold the sharp edge of this paper shiny!",
    audioTextUz: "Rustam Yo'riqchi: Laylo, keling, oltin rangli qog'oz turnasini (crane) buklash uchun ranglar va yelimdan foydalanamiz! Laylo: Voy! Menda qutimda qaychi (scissors), akvarel (watercolor), markerlar va rangli qalamlar bor. Bizga bo'r (chalk) kerakmi? Rustam Yo'riqchi: Bizga bugun bo'r kerak emas. Qog'ozning o'tkir chetini (edge) chiroyli buklashda ehtiyot bo'ling!",
    sentences: [
      { id: "u18_s1", speaker: "Instructor Rustam", en: "Laylo, let's use colors and glue to fold a golden paper crane!", uz: "Laylo, oltin rangli qog'oz turnasini buklash uchun bo'yoqlar va yelimdan foydalanamiz!" },
      { id: "u18_s2", speaker: "Student Laylo", en: "Wow! I have scissors, watercolor, markers, and colored pencils in my box. Do we need chalk?", uz: "Voy! Qutimda qaychi, akvarel, markerlar va rangli qalamlar bor. Bizga bo'r kerakmi?" },
      { id: "u18_s3", speaker: "Instructor Rustam", en: "We do not need chalk today. Be careful to fold the sharp edge of this paper shiny!", uz: "Bizga bugun bo'r kerak emas. Qog'ozning o'tkir qirrasini (edge) tekis buklashda ehtiyot bo'l!" }
    ],
    questions: [
      {
        id: "u18_lq1",
        questionEn: "What origami shape does Rustam want to fold?",
        questionUz: "Rustam qanday origami shaklini buklamoqchi?",
        options: ["A golden paper crane", "A shiny monkey seal", "A colorful paper box"],
        correctIndex: 0,
        explanation: "U qog'ozli turna yasashni taklif etdi ('fold a golden paper crane')."
      },
      {
        id: "u18_lq2",
        questionEn: "Which tool did Rustam say they do NOT need today?",
        questionUz: "Rustam bugun qaysi asbob ularga kerak emasligini aytdi?",
        options: ["Colored pencils", "Chalk", "Watercolors"],
        correctIndex: 1,
        explanation: "U uchrashuvda bo'r kerak emasligi aytdi (do not need chalk today)."
      }
    ],
    grammarGaps: [
      {
        id: "u18_g1",
        sentencePre: "Did Maki have ",
        sentencePost: " pencils in her school bag?",
        options: ["any", "one", "a lot of"],
        correctAnswer: "any",
        explanation: "O'tgan zamondagi so'roq gaplarda 'any' so'zi ishlatiladi."
      },
      {
        id: "u18_g2",
        sentencePre: "How ",
        sentencePost: " seals were there in the warm ocean?",
        options: ["many", "much", "any"],
        correctAnswer: "many",
        explanation: "Sanaladigan otlar ko'plikda kelsa 'How many' so'raladi (seals)."
      }
    ],
    matchingPairs: [
      { id: "u18_m1", enStart: "Did Maki have any", enEnd: "pencils in her bag? No.", uzStart: "Makida biron qalam", uzEnd: "bormidi? Yo'q." },
      { id: "u18_m2", enStart: "How many seals", enEnd: "were on the beach?", uzStart: "Sohilda nechta tyulen", uzEnd: "bor edi?" },
      { id: "u18_m3", enStart: "How much paper", enEnd: "was leftover? A lot.", uzStart: "Qancha qog'oz", uzEnd: "ortib qoldi? Ko'p." }
    ]
  }
};

export const getListeningDataForUnit = (unitNo: number): ListeningPayload => {
  return listeningDataMap[unitNo] || listeningDataMap[1];
};
