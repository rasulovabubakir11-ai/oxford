import { OxfordUnit, BigQuestion, QuizQuestion } from "./types";

export const BIG_QUESTIONS: BigQuestion[] = [
  { number: 1, text: "How are animals different from one another?", units: [1, 2] },
  { number: 2, text: "How do things change?", units: [3, 4] },
  { number: 3, text: "How are things different now from long ago?", units: [5, 6] },
  { number: 4, text: "When do we use subtraction?", units: [7, 8] },
  { number: 5, text: "Who makes you happy?", units: [9, 10] },
  { number: 6, text: "Where do paper and plastic come from?", units: [11, 12] },
  { number: 7, text: "Why do we make music?", units: [13, 14] },
  { number: 8, text: "How do we get our food?", units: [15, 16] },
  { number: 9, text: "What shapes do we see in art?", units: [17, 18] },
];

export const OXFORD_UNITS: OxfordUnit[] = [
  // --- UNIT 1 ---
  {
    number: 1,
    title: "Amazing Animals",
    bigQuestionNumber: 1,
    vocabulary: [
      { id: "u1_1", word: "Skin", translation: "Teri" },
      { id: "u1_2", word: "Mammals", translation: "Emizuvchilar" },
      { id: "u1_3", word: "Eggs", translation: "Tuxumlar" },
      { id: "u1_4", word: "Amphibians", translation: "Suvda ham quruqlikda yashovchilar" },
      { id: "u1_5", word: "Scales", translation: "Tangachalar" },
      { id: "u1_6", word: "Gills", translation: "Jabralar" },
      { id: "u1_7", word: "Feathers", translation: "Patlar" },
      { id: "u1_8", word: "Wings", translation: "Qanotlar" },
      { id: "u1_9", word: "Fur", translation: "Jun / Moʻyna" },
      { id: "u1_10", word: "Head", translation: "Bosh" },
      { id: "u1_11", word: "Eye", translation: "Koʻz" },
      { id: "u1_12", word: "Ear", translation: "Quloq" },
      { id: "u1_13", word: "Mouth", translation: "Ogʻiz" },
      { id: "u1_14", word: "Leg", translation: "Oyoq" },
      { id: "u1_15", word: "Body", translation: "Tana" },
    ],
    grammar: {
      unitNumber: 1,
      title: "Subject and Object Pronouns",
      explanation: "Ega olmoshlari (Masalan: They) gapda harakatni bajaruvchini, to'ldiruvchi (obyekt) olmoshlari (Masalan: Them) esa harakat qaratilgan ob'ektni ifodalaydi. Masalan: 'Fish' (baliqlar) ko'plikda bo'lganligi sababli, ular uchun ega o'rnida 'They', to'ldiruvchi o'rnida esa 'them' olmoshlari ishlatiladi.",
      examples: [
        { en: "Fish have gills. They have gills.", uz: "Baliqlarning jabralari bor. Ularning jabralari bor." },
        { en: "Gills help them breathe.", uz: "Jabralar ularga nafas olishda yordam beradi." }
      ]
    },
    reading: {
      unitNumber: 1,
      title: "Amazing Animals",
      aboutUz: "Hayvonlar qanday qilib sutemizuvchilar, qushlar, baliqlar va suvda ham quruqlikda yashovchilarga bo'linishi hamda ularning farqlari haqida.",
      sentenceEn: "All animals can breathe and move, but they’re different in many amazing ways.",
      sentenceUz: "Hamma hayvonlar nafas olishi va harakatlanishi mumkin, ammo ular ko'p ajoyib jihatlari bilan farqlanadi.",
      fullTextEn: "Amazing Animals\nAll animals can breathe and move, but they’re different in many amazing ways. Here we look at how they are the same and how they are different. This helps us put them into groups.\n\nBirds\nAll birds have two legs, two wings, and feathers, and most birds can fly. The wings and feathers help them fly and the feathers help keep them warm. Birds lay eggs with hard shells. They keep the baby birds inside safe from animals that want to eat them.\n\nFish\nFish have gills to help them breathe in water. Scales all over their bodies help keep them safe from dangerous fish that want to bite them. They don’t have legs, but their fins and tails help them swim. Fish lay their eggs in water, and their eggs are soft.\n\nAmphibians\nAmphibians are very interesting because they can live on land and in water. Amphibians need to have wet skin, so they live in wet places. They lay their soft eggs in water. They have gills when they’re young and the gills help them breathe in water. Most amphibians, like frogs, have legs that help them walk and jump on land.\n\nMammals\nSome mammals live on land and some live in water. Whales are water mammals, and cats, rabbits, and lions are land mammals. Hair or fur covers most land mammals’ bodies and this helps keep them warm. People are mammals too! Mammals don’t lay eggs. Their babies drink milk from their mothers.",
      fullTextUz: "Ajoyib Hayvonlar\nHamma hayvonlar nafas olishi va harakatlanishi mumkin, ammo ular bir-biridan ko'p jihatdan farq qiladi. Bu yerda biz ularning o'xshash va farqli tomonlarini ko'rib chiqamiz. Bu bizga ularni guruhlarga ajratishda yordam beradi.\n\nQushlar\nHamma qushlarning ikkita oyog'i, ikkita qanoti va patlari bor, ko'pchilik qushlar ucha oladi. Qanotlar va patlar ularga uchishga yordam beradi, patlar esa ularni issiq saqlashga yordam beradi. Qushlar qattiq qobiqli tuxum qo'yadilar. Ular tuxum ichidagi qush bolalarini ularni yeyishni istaydigan hayvonlardan himoya qiladi.\n\nBaliqlar\nBaliqlarda suv ostida nafas olish uchun jabralar bor. Ularning butun tana a'zolari ustidagi tangachalar ularni tishlamoqchi bo'lgan xavfli baliqlardan himoya qiladi. Ularning oyoqlari yo'q, lekin suzgichlari va dumlari suzishlariga yordam beradi. Baliqlar tuxumlarini suvga qo’yadi va ularning tuxumlari yumshoq bo’ladi.\n\nSuvda ham quruqlikda yashovchilar (Amfibiyalar)\nSuvda ham quruqlikda yashovchilar juda qiziqarli, chunki ular ham quruqlikda, ham suvda yashay oladi. Amfibiyalarning terisi nam bo'lishi kerak, shuning uchun ular nam joylarda yashaydilar. Ular yumshoq tuxumlarini suvga qo'yadilar. Ular kichkinaligida jabralarga ega bo'lishadi va jabralari ularga suvda nafas olishga yordam beradi. Qurbaqalar kabi ko'pgina amfibiyalarning quruqlikda yurishi va sakrashiga yordam beradigan oyoqlari bor.\n\nSutemizuvchilar\nBa'zi sutemizuvchilar quruqlikda yashaydi, ba'zilari esa suvda yashaydi. Kitlar - suv sutemizuvchilari, mushuklar, quyonlar va arslonlar esa quruqlik sutemizuvchilaridir. Jun yoki mo'yna ko'pchilik quruqlik sutemizuvchilarining tanasini qoplaydi va bu ularni issiq ushlab turishga yordam beradi. Odamlar ham sutemizuvchilar! Sutemizuvchilar tuxum qo'ymaydi. Ularning bolalari onalari suti bilan oziqlanadi.",
      questions: [
        {
          id: "r1_q1",
          questionEn: "Why do bird feathers keep them warm?",
          questionUz: "Nima uchun qushlarning patlari ularni issiq saqlaydi?",
          options: ["Because they use them to swim", "Because they cover their bodies and help retain heat", "Because they live under wet water", "Because they lay hard eggs outside"],
          correctIndex: 1,
          explanation: "Matnda aytilishicha patlar ularni issiq saqlashga yordam beradi (the feathers help keep them warm)."
        },
        {
          id: "r1_q2",
          questionEn: "How are amphibian eggs different from bird eggs?",
          questionUz: "Amfibiya tuxumlari qush tuxumlaridan qanday farq qiladi?",
          options: ["Amphibian eggs are hard", "Amphibian eggs are soft and laid in water", "Amphibian eggs are very large", "Amphibians do not lay eggs"],
          correctIndex: 1,
          explanation: "Amfibiyalar yumshoq tuxumlarini suvga qo'yadi, qushlar esa qattiq qobiqli tuxum qo'yadi (Amphibians lay soft eggs in water)."
        },
        {
          id: "r1_q3",
          questionEn: "What helps land mammals stay warm in cold weather?",
          questionUz: "Sovuq havoda quruqlik sutemizuvchilariga nima issiq saqlashga yordam beradi?",
          options: ["Gills and wet skin", "Soft shells and wings", "Hair or fur covering their bodies", "Mother's soft milk"],
          correctIndex: 2,
          explanation: "Jun yoki mo'yna ko'pchilik quruqlik sutemizuvchilarini issiq ushlab turadi (Hair or fur covers most land mammals' bodies and helps keep them warm)."
        }
      ]
    }
  },

  // --- UNIT 2 ---
  {
    number: 2,
    title: "Leo and Lily's Adventure",
    bigQuestionNumber: 1,
    vocabulary: [
      { id: "u2_1", word: "Worm", translation: "Chuvalchang" },
      { id: "u2_2", word: "Berries", translation: "Rezavor mevalar" },
      { id: "u2_3", word: "Hunt", translation: "Ov qilmoq" },
      { id: "u2_4", word: "Escape", translation: "Qochib qutulmoq" },
      { id: "u2_5", word: "Creep", translation: "Emaklamoq / Sudralmoq" },
      { id: "u2_6", word: "Fight", translation: "Urishmoq / Kurashmoq" },
      { id: "u2_7", word: "Peck", translation: "Choʻqilamoq" },
      { id: "u2_8", word: "Pinecone", translation: "Qaragʻay qubbasi" },
      { id: "u2_9", word: "Squawk", translation: "Baqirmoq (qushlardek)" },
      { id: "u2_10", word: "Strong", translation: "Kuchli" },
      { id: "u2_11", word: "Gentle", translation: "Muloyim" },
      { id: "u2_12", word: "Patient", translation: "Sabrli" },
      { id: "u2_13", word: "Smart", translation: "Aqlli" },
      { id: "u2_14", word: "Calm", translation: "Xotirjam" },
      { id: "u2_15", word: "Fierce", translation: "Shafqatsiz" },
    ],
    grammar: {
      unitNumber: 2,
      title: "Adverbs of Frequency",
      explanation: "Always (doimo), usually (odatda), sometimes (ba'zida) kabi chastota ravishlari gapda qanchalik tez sodir bo'lishini bildiradi va fe'ldan oldin yoki to be fe'lidan keyin keladi.",
      examples: [
        { en: "Lily always escapes. Lily is usually very nervous.", uz: "Lili doimo qochib qutuladi. Lili odatda juda hayajonli bo'ladi." },
        { en: "Leo sometimes tries to catch Lily.", uz: "Leo ba'zan Lilini tutib olishga harakat qiladi." }
      ]
    },
    reading: {
      unitNumber: 2,
      title: "Leo and Lily's Adventure",
      aboutUz: "Leo ismli mushuk va Lili ismli qushchaning o'rmondagi sarguzashtlari, yovvoyi tulkidan qochishlari hamda do'st bo'lishlari haqida.",
      sentenceEn: "Leo sometimes tries to catch Lily, but Lily always escapes because Lily can fly.",
      sentenceUz: "Leo ba'zan Lilini tutishga harakat qiladi, lekin Lili har doim qochib qutuladi, chunki u ucha oladi.",
      fullTextEn: "Leo and Lily’s Adventure\nLeo and Lily live in a big garden near a forest. Lily is red and yellow. She’s friendly, but she is usually very nervous. Lily flies from tree to tree in the garden and she hops in the grass. She eats worms, nuts, and berries.\n\nLeo is black and white. He is very fast and very clever. He’s brave, too. He climbs trees in the garden and he hunts for mice ... and birds! Leo sometimes tries to catch Lily, but Lily always escapes. Leo can run fast, but Lily can fly. This makes Leo angry!\n\nOne day, Leo sees Lily in the garden. Leo wants to catch Lily. He creeps through the garden very slowly and quietly. But Lily sees Leo and she flies away into the forest. Leo chases Lily. Lily flies and flies and Leo runs and runs. Soon they are a long way from the garden and they don’t know the way home. It’s dark in the forest. Leo and Lily are scared.\n\nLeo and Lily hear a noise. It’s a fox! The fox is hungry. It wants some dinner. It wants to eat Leo! Leo tries to fight the fox, but the fox is very big.\n\nLily is in a tree. She pecks a pinecone. The pinecone falls and hits the fox on the head! Leo escapes and climbs up the tree. The fox is angry. It can’t climb trees.\n\nLeo and Lily wait in the tree for a long time. At last, the fox goes away. Leo and Lily are safe, but they want to go home now. Lily flies up very high. She sees the garden! She squawks happily. Lily shows Leo the way home. But Lily is small and her wings are tired. She sits on Leo’s back and Leo carries Lily home.\n\nLeo and Lily are safe at home in their garden again. They’re friends now. Lily flies around the garden and Leo never tries to catch her ... Well, hardly ever!",
      fullTextUz: "Leo va Lilining Sarguzashtlari\nLeo va Lili o'rmon yaqinidagi katta bog'da yashashadi. Lili qizil va sariq rangda. U samimiy, lekin odatda juda xavotirda (sarosimada) bo'ladi. Lili bog'dagi daraxtdan daraxtga uchib yuradi va o'tlarda sakraydi. U chuvalchanglar, yong'oqlar va rezavor mevalarni yeydi.\n\nLeo qora va oq rangda. U juda tezkor va juda aqlli. U jasur ham. U bog'dagi daraxtlarga ko'tariladi va sichqonlarni ... hamda qushlarni ovlaydi! Leo ba'zida Lilini tutishga harakat qiladi, lekin Lili har doim qochib qutuladi. Leo tez yugura oladi, lekin Lili ucha oladi. Bu Leoning g’azabini keltiradi!\n\nBir kuni Leo bog'da Lilini ko'rib qoldi. Leo Lilini tutib olmoqchi bo’ladi. U bog' bo'ylab juda sekin va jimgina emaklaydi. Ammo Lili Leoning kelayotganini ko'radi va o'rmonga uchib ketadi. Leo Lilining ortidan quvadi. Lili uchaveradi, uchaveradi, Leo esa yuguraveradi, yuguraveradi. Tez orada ular bog'dan juda uzoqqa ketib qolishadi va uyga qaytish yo'lini bilishmaydi. O'rmon qorong'i. Leo va Lili qo'rqib ketishdi.\n\nLeo va Lili qandaydir shovqin eshitishdi. Bu tulki edi! Tulki och edi. U kechki ovqat tanovul qilmoqchi. U Leoni yemoqchi! Leo tulki bilan kurashishga harakat qiladi, lekin tulki juda katta.\n\nLili daraxtda edi. U qarag'ay g'uddasini cho'qiydi. Qarag'ay g'uddasi yiqilib, tulkining boshiga tegadi! Leo qochib qutulib, daraxtga chiqib oladi. Tulki g'azablangan, chunki u daraxtga chiqa olmaydi.\n\nLeo va Lili daraxtda uzoq vaqt kutishdi. Nihoyat, tulki ketdi. Leo va Lili xavfsiz holatda, lekin endi ular uyga ketishni xohlashadi. Lili juda baland uchdi. U uzoqdan o'zlarining bog'ini ko'rib qoldi! U xursandchilikdan baqirdi. Lili Leoga uy yo'lini ko'rsatdi. Ammo Lili kichkina va qanotlari charchagan edi. U Leoning orqasiga o'tirdi va Leo Lilini ko'tarib uyga olib keldi.\n\nLeo va Lili yana bog'larida xavfsiz uyda qolishdi. Ular endi do'st bo'lishdi. Lili bog'da uchib yuradi va Leo hech qachon uni tutishga urinmaydi ... Xo'sh, deyarli hech qachon!",
      questions: [
        {
          id: "r2_q1",
          questionEn: "What does Lily the bird usually eat in the garden?",
          questionUz: "Lili bog'da odatda nima yeydi?",
          options: ["Mice and other small birds", "Worms, nuts, and berries", "Grass and green leaves", "Hard tree bark"],
          correctIndex: 1,
          explanation: "Matnda aytilganidek: 'She eats worms, nuts, and berries.'"
        },
        {
          id: "r2_q2",
          questionEn: "How does Lily save Leo from the hungry, big fox?",
          questionUz: "Lili Leoni och va ulkan tulkidan qanday qutqaradi?",
          options: ["She fights the fox with her wings", "She pecks a pinecone so it hits the fox on the head", "She calls other cats for help", "She flies away and leaves Leo behind"],
          correctIndex: 1,
          explanation: "Lili qarag'ay g'uddasini cho'qiydi va u tulkining boshiga tushadi ('She pecks a pinecone. The pinecone falls and hits the fox on the head!')."
        },
        {
          id: "r2_q3",
          questionEn: "How does Lily get safely back home when her wings are tired?",
          questionUz: "Qanotlari charchab qolganda Lili uyga qanday qaytadi?",
          options: ["She walks slowly behind Leo", "She sleeps in the dark forest", "She sits on Leo's back and Leo carries her", "She flies high up in the blue sky"],
          correctIndex: 2,
          explanation: "Lili charchaganida Leoning orqasiga o'tiradi va Leo uni ko'tarib keladi ('She sits on Leo’s back and Leo carries Lily home')."
        }
      ]
    }
  },

  // --- UNIT 3 ---
  {
    number: 3,
    title: "What Is Our World Made Of?",
    bigQuestionNumber: 2,
    vocabulary: [
      { id: "u3_1", word: "Flow", translation: "Oqmoq" },
      { id: "u3_2", word: "Solid", translation: "Qattiq jism" },
      { id: "u3_3", word: "Liquid", translation: "Suyuqlik" },
      { id: "u3_4", word: "Gas", translation: "Gaz" },
      { id: "u3_5", word: "Heat", translation: "Issiqlik" },
      { id: "u3_6", word: "Steam", translation: "Bugʻ" },
      { id: "u3_7", word: "Ice", translation: "Muz" },
      { id: "u3_8", word: "Freeze", translation: "Muzlamoq" },
      { id: "u3_9", word: "Melt", translation: "Erimoq" },
      { id: "u3_10", word: "Ice pop", translation: "Muzqaymoq" },
      { id: "u3_11", word: "Balloon", translation: "Shar" },
      { id: "u3_12", word: "Kettle", translation: "Choynak" },
      { id: "u3_13", word: "Popcorn", translation: "Popkorn" },
      { id: "u3_14", word: "Icicle", translation: "Muzvalak" },
      { id: "u3_15", word: "Candle", translation: "Sham" },
    ],
    grammar: {
      unitNumber: 3,
      title: "Simple Past of Verb To Be",
      explanation: "O'tgan zamonda holatni tasvirlash uchun was (birlik uchun) va were (ko'plik uchun) ko'makchi fe'llari ishlatiladi.",
      examples: [
        { en: "It was a liquid. Now it's a gas.", uz: "U suyuqlik edi. Hozir esa u gazdir." },
        { en: "They were hard. Now they're soft.", uz: "Ular qattiq edi. Hozir esa ular yumshoqdir." }
      ]
    },
    reading: {
      unitNumber: 3,
      title: "Solids, Liquids, and Gases",
      aboutUz: "Atrofimizdagi hamma narsa uchta holatda (qattiq, suyuq, gaz) boʻlishi va harorat ta'sirida holatlar qanday o'zgarishi haqida tushuncha.",
      sentenceEn: "Everything in our world comes in three different states: solid, liquid, or gas.",
      sentenceUz: "Dunyomizdagi hamma narsa uch xil holatda bo'ladi: qattiq, suyuq yoki gaz.",
      fullTextEn: "What Is Our World Made Of?\nEverything in our world comes in three different states: solid, liquid, or gas.\n\nSolids\nWe can see and feel solids. Some solids are hard, and some solids are soft. Trees and feathers are solids. You’re a solid, too!\n\nLiquids\nA liquid is a thing that can flow. Some liquids are thick, and some liquids are thin. Juice and milkshakes are liquids. Can you think of other kinds of liquid?\n\nGases\nThe air that you breathe is a gas. We can’t usually see a gas but sometimes we can feel it when it moves. On a windy day, we can feel the wind on our bodies.\n\nThings can change from one state to another when we make them hot or cold.\nWhen we make water very cold, it freezes and changes to ice. When ice or snow heats up, it melts and changes back to water. When we heat water, it boils and changes to steam. Look at these three pictures of things changing from one state to another. The snow was a solid and now it's a liquid. The water was a liquid and now it's a solid. The water was a liquid and now it's a gas.",
      fullTextUz: "Dunyomiz nimadan tashkil topgan?\nDunyomizdagi hamma narsa uch xil holatda bo'ladi: qattiq, suyuq yoki gaz.\n\nQattiq jismlar (Solids)\nBiz qattiq jismlarni ko'ra olamiz va his qila olamiz. Ba'zi qattiq jismlar qattiq bo'ladi, ba'zilari esa yumshoq. Daraxtlar va patlar qattiq jismdir. Siz ham qattiq jismiz!\n\nSuyuqliklar (Liquids)\nSuyuqlik bu oqishi mumkin bo'lgan narsa. Ba'zi suyuqliklar quyuq bo'ladi, ba'zilari esa suyuk. Sharbat va muzqaymoqli kokteyllar (milkshake) suyuqlikdir. Boshqa turdagi suyuqliklarni o'ylay olasizmi?\n\nGazlar (Gases)\nSiz nafas olayotgan havo gazdir. Biz odatda gazni ko'ra olmaymiz, lekin ba'zida uning harakatini his qila olamiz. Shamolli kunda tanamizda shamolni sezishimiz mumkin.\n\nBiz narsalarni issiq yoki sovuq qilganda ular bir holatdan ikkinchisiga o'zgarishi mumkin.\nSuvni juda sovuq qilsak, u muzlaydi va muzga aylanadi. Muz yoki qor qizib ketganda, u eriydi va yana suvga aylanadi. Suvni qizdirganda, u qaynaydi va bugʻga aylanadi. Narsalarning bir holatdan ikkinchisiga o'zgarishini ko'rsatuvchi uchta rasmga qarang. Qor qattiq jism edi va hozir u suyuqlik. Suv suyuqlik edi va hozir u qattiq jism. Suv suyuqlik edi va hozir u gaz.",
      questions: [
        {
          id: "r3_q1",
          questionEn: "What are the three different states of matter?",
          questionUz: "Moddaning uch xil holati qaysilar?",
          options: ["Ice, snow, and winter", "Solid, liquid, and gas", "Thick, thin, and hard", "Hot, cold, and warm"],
          correctIndex: 1,
          explanation: "Matn boshida aytilgan: 'Everything in our world comes in three different states: solid, liquid, or gas.'"
        },
        {
          id: "r3_q2",
          questionEn: "What happens to ice or snow when it heats up?",
          questionUz: "Muz yoki qor qizib ketganda nima sodir bo'ladi?",
          options: ["It remains a solid", "It melts and changes back to water", "It freezes even more", "It turns into a hard stone"],
          correctIndex: 1,
          explanation: "Muz qizganda eriydi va suvga aylanadi ('When ice or snow heats up, it melts and changes back to water')."
        },
        {
          id: "r3_q3",
          questionEn: "Why can't we usually see a gas?",
          questionUz: "Nima uchun biz odatda gazni ko'ra olmaymiz?",
          options: ["Because it is very thick", "Because gas is invisible air, but we can feel it when it moves", "Because it is inside a freezer", "Because it flows like a chocolate milkshake"],
          correctIndex: 1,
          explanation: "Gaz ko'rinmaydigan havodir, lekin shamolda harakatini his qilamiz ('We can’t usually see a gas but sometimes we can feel it when it moves')."
        }
      ]
    }
  },

  // --- UNIT 4 ---
  {
    number: 4,
    title: "Let's Make Ice Cream!",
    bigQuestionNumber: 2,
    vocabulary: [
      { id: "u4_1", word: "Cream", translation: "Qaymoq" },
      { id: "u4_2", word: "Sugar", translation: "Shakar" },
      { id: "u4_3", word: "Salt", translation: "Tuz" },
      { id: "u4_4", word: "Pour", translation: "Quymoq" },
      { id: "u4_5", word: "Plastic bags", translation: "Plastik paketlar" },
      { id: "u4_6", word: "Mixture", translation: "Aralashma" },
      { id: "u4_7", word: "Open", translation: "Ochiq" },
      { id: "u4_8", word: "Closed", translation: "Yopiq" },
      { id: "u4_9", word: "Freezer", translation: "Muzlatkich" },
      { id: "u4_10", word: "Coffee", translation: "Kofe" },
      { id: "u4_11", word: "Tea", translation: "Choy" },
      { id: "u4_12", word: "Salad", translation: "Salat" },
      { id: "u4_13", word: "Fruit", translation: "Meva" },
      { id: "u4_14", word: "Vegetables", translation: "Sabzavotlar" },
      { id: "u4_15", word: "Pasta", translation: "Makaron" },
    ],
    grammar: {
      unitNumber: 4,
      title: "Simple Past of Verb To Be (Questions)",
      explanation: "Was va Were ko'makchi fe'llarini gap boshiga chiqarish orqali to be ning o'tgan zamonidagi so'roq gaplari yasaladi hamda yes/no qisqa javoblari beriladi.",
      examples: [
        { en: "Was the freezer door open? Yes, it was.", uz: "Muzlatgich eshigi ochiqmidi? Ha, ochiq edi." },
        { en: "Were the students happy? No, they weren't.", uz: "Talabalar xursandmidi? Yo'q, xursand emasdilar." }
      ]
    },
    reading: {
      unitNumber: 4,
      title: "Let's Make Ice Cream!",
      aboutUz: "Muzlatgich eshigi ochiq qolib, muzqaymoqlar erib ketgach, bolalar tuz, muz va paketlar yordamida o'zlari muzqaymoq yasashni o'rganishgani haqida darslik suhbati.",
      sentenceEn: "Mix the sugar and vanilla and cream. Now shake, shake, shake!",
      sentenceUz: "Shakar, vanilin va qaymoqni aralashtiring. Endi silkiting, silkiting, silkiting!",
      fullTextEn: "Let’s Make Ice Cream!\nMs. Woods: Today is our school party. Let’s go to the cafeteria and get the ice cream you bought yesterday. It’s in the freezer.\nStudents: Oh, no! It’s liquid!\nLuis: Yuck!\nJudy: That was our ice cream!\nMark: Was the freezer door open?\nMs. Woods: Yes, it was. It was open all night. Now there’s no ice cream for the party.\nMr. Jenkins: What’s wrong? Why’s everyone so sad?\nMs. Woods: It was our job to bring the ice cream for the party, but it melted. Now we can’t have ice cream.\nMr. Jenkins: Sure you can! You can make ice cream. I can teach you!\nStudents: Yippee!\nMr. Jenkins: OK, kids. Get big and small plastic bags, cream, sugar, vanilla, and salt. Then come to my classroom.\nStudents: Ready, Mr. Jenkins!\nMr. Jenkins: My freezer was closed all night, so I have ice. Now, let’s make ice cream.\n\nStudents: Yes! Let's make ice cream!\nMr. Jenkins: Mix the sugar and vanilla and cream.\nStudents: Mix the sugar and vanilla and cream. Done!\nMr. Jenkins: Pour the cream, sugar, and vanilla mixture into the small bag.\nStudents: Pour the cream, sugar, and vanilla mixture into the small bag. Done!\nMr. Jenkins: Put the salt and the ice cubes into the big bag.\nStudents: Put the salt and the ice cubes into the big bag. Done!\nMr. Jenkins: Now put the small bag in the big bag.\nStudents: Put the small bag in the big bag. Done!\nMr. Jenkins: Now shake, shake, shake! What do you have?\nLuis: Hey! Look! We have ice cream! And we didn't use a freezer!\nStudents: How is the ice cream, Mr. Jenkins?\nMr. Jenkins: It’s great! Can I have some more?",
      fullTextUz: "Keling, Muzqaymoq Tayyorlaymiz!\nMs. Woods (O'qituvchi): Bugun bizning maktab tadbiri. Keling kafeteriyaga borib, kecha sotib olgan muzqaymoqingizni olamiz. U muzlatgichda turibdi.\nO'quvchilar: Oh yo'q! U suyuq bo'lib qolibdi!\nLuis: Voy sho'rim!\nJudi: U bizning muzqaymoq edi!\nMark: Muzlatgichning eshigi ochiq qolganmidi?\nMs. Woods: Ha, shunday edi. U butun tun davomida ochiq edi. Endi ziyofat uchun muzqaymoq yo'q.\nMr. Jenkins: Nima bo'ldi? Nega hamma xafa?\nMs. Woods: Ziyofat uchun muzqaymoq olib kelish bizning vazifamiz edi, ammo u erib ketdi. Endi bizda muzqaymoq yo'q.\nMr. Jenkins: Albatta hozir qila olasiz! Siz o'zingiz ham muzqaymoq tayyorlay olasiz. Men sizga o'rgataman!\nO'quvchilar: Standard!\nMr. Jenkins: Yaxshi, bolalar. Katta va kichik plastik paketlar, qaymoq, shakar, vanilin va tuz oling. Keyin mening xonamga keling.\nO'quvchilar: Tayyormiz, Mr. Jenkins!\nMr. Jenkins: Mening muzlatgichim butun tun yopiq edi, shuning uchun menda muz bor. Endi keling, muzqaymoq qila boshlaymiz.\n\nO'quvchilar: Ha! Keling, muzqaymoq tayyorlaymiz!\nMr. Jenkins: Shakar, vanilin va qaymoqni aralashtiring.\nO'quvchilar: Shakar, vanilin va qaymoqni aralashtiring. Bajarildi!\nMr. Jenkins: Qaymoq, shakar va vanilin aralashmasini kichik paketga quying.\nO'quvchilar: Qaymoq, shakar va vanilin aralashmasini kichik paketga quying. Bajarildi!\nMr. Jenkins: Katta paketga tuz va muz bo'laklarini soling.\nO'quvchilar: Katta paketga tuz va muz bo'laklarini soling. Bajarildi!\nMr. Jenkins: Endi kichik paketni katta paketning ichiga soling.\nO'quvchilar: Kichik paketni katta paketning ichiga soling. Bajarildi!\nMr. Jenkins: Endi silkiting, silkiting, silkiting! Sizda nima bor?\nLuis: Voy, qaranglar! Bizda muzqaymoq bor! Va biz muzlatgichdan ham foydalanmadik!\nO'quvchilar: Muzqaymoq qanday ekan, janob Jenkins?\nMr. Jenkins: Bu juda ajoyib! Yana ozgina olsam bo'ladimi?",
      questions: [
        {
          id: "r4_q1",
          questionEn: "Why did the purchased ice cream melt?",
          questionUz: "Nima sababdan sotib olingan muzqaymoq erib ketdi?",
          options: ["Because the cafeteria had no electricity", "Because the freezer door was open all night", "Because someone added warm hot water", "Because the school party was outdoors"],
          correctIndex: 1,
          explanation: "Muzqaymoq erishiga muzlatgich eshigi butun tun ochiq qolgani sabab bo'lgan ('It was open all night. Now there’s no ice cream for the party')."
        },
        {
          id: "r4_q2",
          questionEn: "What items does Mr. Jenkins tell the students to bring?",
          questionUz: "Janob Jenkins o'quvchilarga qaysi narsalarni olib kelishni aytdi?",
          options: ["Mpoons, bowls, warm milk, and plates", "Big and small plastic bags, cream, sugar, vanilla, and salt", "Fruits, chocolate chips, microwave, and water", "Only ice and a mixer machine"],
          correctIndex: 1,
          explanation: "Kids brought plastic bags, cream, sugar, vanilla, and salt to create ice cream manually."
        },
        {
          id: "r4_q3",
          questionEn: "How are the ice cubes and salt prepared?",
          questionUz: "Muz bo'laklari va tuz qanday tayyorlanadi?",
          options: ["They are mixed inside the small bag", "They are put into the big bag together", "They are heated in a kettle", "They are left out open all night"],
          correctIndex: 1,
          explanation: "Muz va tuz katta paketga solinadi ('Put the salt and the ice cubes into the big bag')."
        }
      ]
    }
  },

  // --- UNIT 5 ---
  {
    number: 5,
    title: "Then and Now",
    bigQuestionNumber: 3,
    vocabulary: [
      { id: "u5_1", word: "Travel", translation: "Sayohat qilmoq" },
      { id: "u5_2", word: "Communication", translation: "Muloqot / Aloqa" },
      { id: "u5_3", word: "Airplane", translation: "Samolyot" },
      { id: "u5_4", word: "News", translation: "Yangiliklar" },
      { id: "u5_5", word: "Letter", translation: "Xat" },
      { id: "u5_6", word: "Text message", translation: "SMS xabar" },
      { id: "u5_7", word: "E-mail", translation: "Elektron pochta" },
      { id: "u5_8", word: "Radio", translation: "Radio" },
      { id: "u5_9", word: "Internet", translation: "Internet" },
      { id: "u5_10", word: "Boat", translation: "Kema" },
      { id: "u5_11", word: "Bus", translation: "Avtobus" },
      { id: "u5_12", word: "Motorcycle", translation: "Mototsikl" },
      { id: "u5_13", word: "Cable car", translation: "Kanat yoʻli (funitulyor)" },
      { id: "u5_14", word: "Truck", translation: "Yuk mashinasi" },
      { id: "u5_15", word: "Horse", translation: "Ot" },
    ],
    grammar: {
      unitNumber: 5,
      title: "Simple Past Regular Verbs",
      explanation: "O'tgan zamonda sodir bo'lgan va yakunlangan harakatlarni to'g'ri fe'llar yordamida ifodalashda fe'l oxiriga -ed qo'shimchasi qo'shiladi. Inkor shakli didn't + fe'l asosiy shakli bilan yasaladi.",
      examples: [
        { en: "People listened to the news on the radio.", uz: "Odamlar deyarli har doim radiodan yangilik eshitishgan." },
        { en: "They didn't watch the news on TV.", uz: "Ular televizorda yangiliklarni tomosha qilishmagan." }
      ]
    },
    reading: {
      unitNumber: 5,
      title: "Then and Now",
      aboutUz: "Tarixda muloqot, yangilik tarqalishi va sayohat juda sekin hamda qiyin bo'lgani, bugun esa barchasi nihoyatda tezkorligi haqida.",
      sentenceEn: "Long ago, people used letters to communicate, but today letters are carried by airplane and we use e-mail.",
      sentenceUz: "Uzoq vaqt oldin odamlar muloqot qilish uchun xatlardan foydalanishgan, bugun esa xatlar samolyotda tashiladi va biz elektron pochtadan foydalanamiz.",
      fullTextEn: "Then and Now\nToday, communication and travel are fast, and it's easy to get news. But a long time ago, things were very different.\n\nCommunication\nLong ago, people used letters to communicate. They mailed letters to friends and families. Letters were carried by horse and cart, and later by train or boat. Today, communication is different and letters are carried by airplane. We can use e-mail, text messages, or phone calls to communicate quickly with friends and family all over the world.\n\nNews\nBefore newspapers, people talked to each other to get news. Then people printed the news on paper and newspapers started. Later they listened to the radio for news. Today we can get news any time we want. We watch the news on TV and read it on the Internet anytime we want.\n\nTravel\nPeople long ago walked from place to place or traveled by horse and cart. When they traveled long distances they went by train or ship. It was slow and difficult. Today we can travel in cars, fast trains, buses, or airplanes to go to places that are far away. We can travel to places across the ocean or across the world in a day. Travel is fast and easy now.",
      fullTextUz: "Avval va Hozir\nBugungi kunda aloqa va sayohat tezkor, yangiliklar olish esa oson. Ammo uzoq vaqt oldin narsalar butunlay boshqacha edi.\n\nAloqa\nUzoq vaqt oldin odamlar muloqot qilish uchun xatlardan foydalanishgan. Ular do'stlari va oilalariga xat yuborganlar. Xatlarni ot va aravada, keyinchalik esa poyezd yoki kemada tashishgan. Bugun esa aloqa butunlay boshqacha bo'lib, xatlar samolyotda tashiladi. Butun dunyodagi do'stlarimiz va oilamiz bilan tez muloqot qilish uchun elektron pochta (e-mail), SMS yoki telefon qo'ng'iroqlaridan foydalanishimiz mumkin.\n\nYangiliklar\nGazetalar yaratilishidan oldin, odamlar yangilik olish uchun bir-biri bilan gaplashishgan. Keyinchalik odamlar yangiliklarni qog'ozga chop eta boshlashdi va gazetalar davri boshlandi. Keyinchalik yangiliklarni radiodan tingladilar. Bugun biz xohlagan vaqtimizda yangiliklarni olishimiz mumkin. Biz yangiliklarni televizorda ko’rishimiz va istalgan vaqtda internetda o'qishimiz mumkin.\n\nSayohat\nUzoq vaqt oldin odamlar bir joydan ikkinchi joyga piyoda yurishgan yoki ot va aravada sayohat qilishgan. Uzoq masofalarga sayohat qilishda esa poyezd yoki kemada yurishgan. Bu juda sekin va qiyin edi. Bugun biz uzoq masofalardagi joylarga borish uchun mashinalarda, tezyurar poyezdlarda, avtobuslarda yoki samolyotlarda sayohat qila olamiz. Biz bir kunda okean ortidagi yoki dunyoning boshqa chekkasidagi joylarga borishimiz mumkin. Endi sayohat tez va juda oson.",
      questions: [
        {
          id: "r5_q1",
          questionEn: "How were letters carried long ago before airplanes?",
          questionUz: "Samolyotlardan oldin uzoq vaqt ilgari xatlar qanday yetkazilgan?",
          options: ["By e-mail and text messages", "By horse and cart, and later by train or boat", "By internet signals through cables", "They were never sent"],
          correctIndex: 1,
          explanation: "Letters were carried by horse and cart, train, or boat in the old days ('Letters were carried by horse and cart, and later by train or boat')."
        },
        {
          id: "r5_q2",
          questionEn: "How did people first get news before newspapers existed?",
          questionUz: "Gazeta mavjud bo'lmasdan oldin odamlar yangiliklarni birinchi bo'lib qanday olishgan?",
          options: ["By listening to the radio all day", "By talking to each other", "By searching on Google", "By sending e-mails"],
          correctIndex: 1,
          explanation: "Gazetadan oldin odamlar bir-biri bilan uchrashib gaplashishgan ('Before newspapers, people talked to each other to get news')."
        },
        {
          id: "r5_q3",
          questionEn: "In modern times, what can carry letters and travel across oceans in a day?",
          questionUz: "Hozirgi davrda nima xatlarni tashiydi va bir kunda okeanlarni kesib o'ta oladi?",
          options: ["By horse and carts", "By trains and cargo ships", "By airplane", "By walking slowly place to place"],
          correctIndex: 2,
          explanation: "Today, communication is different and letters are carried by airplane across oceans swiftly."
        }
      ]
    }
  },

  // --- UNIT 6 ---
  {
    number: 6,
    title: "Tell Me a Story, Grandpa",
    bigQuestionNumber: 3,
    vocabulary: [
      { id: "u6_1", word: "Couch", translation: "Divan" },
      { id: "u6_2", word: "Chair", translation: "Stul" },
      { id: "u6_3", word: "Lamp", translation: "Lampa" },
      { id: "u6_4", word: "Clock", translation: "Soat" },
      { id: "u6_5", word: "Bathtub", translation: "Vanna" },
      { id: "u6_6", word: "Sink", translation: "Rakovina" },
      { id: "u6_7", word: "Clean", translation: "Toza" },
      { id: "u6_8", word: "Dirty", translation: "Kir" },
      { id: "u6_9", word: "Tired", translation: "Charchagan" },
      { id: "u6_10", word: "Hungry", translation: "Och" },
      { id: "u6_11", word: "Thirsty", translation: "Chanqagan" },
      { id: "u6_12", word: "Full", translation: "Toʻq" },
    ],
    grammar: {
      unitNumber: 6,
      title: "Simple Past Regular Verbs (Questions)",
      explanation: "Did yordamchi fe'lini ega oldiga chiqarish orqali o'tgan zamon so'roq gaplari hosil qilinadi va fe'lning asosi o'zgartirilmaydi. Qisqa javoblarda did/didn't ishlatiladi.",
      examples: [
        { en: "Did they travel by ship? Yes, they did.", uz: "Ular kemada sayohat qilishdimi? Ha, shunday qilishdi." },
        { en: "Did they arrive in two days? No, they didn't.", uz: "Ular ikki kunda yetib kelishdimi? Yo'q, yetib kelishmadi." }
      ]
    },
    reading: {
      unitNumber: 6,
      title: "Tell Me a Story, Grandpa",
      aboutUz: "Karlo boboning 1910-yilda uzoq Italiyadan Amerikaga kemada kelgan og'ir va qiziqarli sayohati, uning qiyinchiliklari va hozirgi davrdagi o'zgarishlar haqida suhbat.",
      sentenceEn: "Carlo and his family lived in Italy, and they traveled to the United States for a better life.",
      sentenceUz: "Karlo va uning oilasi Italiyada yashardilar va yaxshiroq hayot ilinjida Amerika Qo'shma Shtatlariga sayohat qilishdi.",
      fullTextEn: "“Tell me a story Grandpa!”\n\n“Okay,” says Grandpa. “I’ll tell you a story about my grandfather, Carlo. In 1910, Carlo was ten years old. He and his family lived in Italy. They were very poor, so they came to the United States for a better life. This was the first time that Carlo traveled to a place far away.”\n\n“Really? I’m ten, too,” says Henry, “And Mom, Dad, and I visit a different country every summer!”\n\n“Yes, Henry. Things are different now,” says Grandpa.\n\n“How did they travel here?” asks Henry.\n\n“They traveled by ship,” says Grandpa. “It wasn’t an easy trip because the ship was crowded and dirty. There wasn’t much food and many people got sick. Carlo was sick too. They arrived at Ellis Island in New York after ten days.”\n\n“Wow! That’s slow!” says Henry. “Now it only takes about nine hours in an airplane.”\n\n“I know,” says Grandpa. “It’s very different today.”\n\n“What happened at Ellis Island?” asks Henry.\n\n“Doctors checked everyone, and Carlo was very scared,” says Grandpa.\n\n“Why was he scared, Grandpa? Doctors help people,” says Henry.\n\n“Yes. But people who weren't healthy couldn't enter New York,” says Grandpa. “The clerks asked them many questions.”\n\n“What questions, Grandpa?” asks Henry.\n\n“Where are you from? Are you healthy or are you sick?” says Grandpa. “Luckily, Carlo was feeling better so they let him in. And that’s why we live here today and not in Italy.”\n\n“That was a cool story, Grandpa!” says Henry. “I have an idea. Let’s take a trip to Italy.”\n\n“That’s a good idea, Henry,” says Grandpa. “Let’s go next summer.”\n\n“Awesome, Grandpa! But let’s take an airplane, not a ship!”",
      fullTextUz: "“Menga bir hikoya aytib bering, bobo!”\n\n“Xo'p,” deydi bobo. “Men senga bobom Karlo haqida hikoya qilib beraman. 1910-yilda Karlo o'n yoshda edi. U va uning oilasi Italiyada yashashgan. Ular juda kambag'al edilar, shuning uchun yaxshiroq hayot ilinjida Amerika Qo'shma Shtatlariga kelishgan. Bu Karloning uzoq joyga birinchi marta sayohat qilishi edi.”\n\n“Rostdanmi? Men ham o'n yoshdaman,” deydi Genri, “Ona, ota va men har yozda boshqa-boshqa davlatlarga sayohat qilamiz!”\n\n“Ha, Genri. Endi hamma narsa butunlay boshqacha,” deydi bobosi.\n\n“Ular bu yerga qanday sayohat qilishgan?” so'raydi Genri.\n\n“Ular kemada sayohat qilishgan,” deydi bobo. “Bu oson safar bo'lmadi, chunki kema juda tirband (gavjum) va kir edi. Oziq-ovqat ko'p emas edi va ko'plab odamlar kasal bo'lib qolishdi. Karlo ham kasallandi. Ular o'n kundan keyin Nyu-Yorkdagi Ellis oroliga yetib kelishdi.”\n\n“Voy! Bu juda sekin-ku!” deydi Genri. “Hozir samolyotda atigi to'qqiz soatcha vaqt ketadi.”\n\n“Bilaman,” deydi bobosi. “Bugungi kunda juda katta farq bor.”\n\n“Ellis orolida nima sodir bo'ldi?” so'raydi Genri.\n\n“Sog'liqni saqlash xodimlari hammani tekshirishdi va Karlo nihoyatda qo'rqib ketdi,” deydi bobo.\n\n“Nega u qo'rqdi, bobo? Axir shifokorlar odamlarga yordam berishadi-ku,” deydi Genri.\n\n“To'g'ri. Ammo sog'lom bo'lmagan odamlar Nyu-Yorkka kira olmasdilar,” deydi bobo. “Xizmatchilar ularga ko'plab savollar berishdi.”\n\n“Qanday savollar, bobo?” so'raydi Genri.\n\n“Qayerdansiz? Sog'lommisiz yoki kasalmisiz?” deydi bobo. “Baxtimizga, Karlo o'zini yaxshi his qila boshladi, shuning uchun uni kiritishdi. Va mana shu sababli biz bugun Italiyada emas, shu yerda yashayapmiz.”\n\n“Bu juda ajoyib hikoya ekan, bobo!” deydi Genri. “Menda ajoyib fikr bor. Keling, Italiyaga sayohat qilamiz.”\n\n“Bu yaxshi fikr, Genri,” deydi bobosi. “Kelasi yozda boramiz.”\n\n“Daxshat, bobo! Lekin kema emas, samolyotda ketsak yaxshi bo'lardi!”",
      questions: [
        {
          id: "r6_q1",
          questionEn: "Why did Carlo and his family leave Italy for the USA in 1910?",
          questionUz: "Nima uchun Karlo va uning oilasi 1910-yilda Italiyani tark etib, AQShga kelishgan?",
          options: ["Because they found an airplane ticket", "Because they were very poor and wanted a better life", "To meet Henry and play games", "Because they liked crowded ships"],
          correctIndex: 1,
          explanation: "Matnda tushuntirilishicha: 'They were very poor, so they came to the United States for a better life.'"
        },
        {
          id: "r6_q2",
          questionEn: "How long did it take Carlo to travel to Ellis Island by ship?",
          questionUz: "Karlo kemada Ellis oroliga yetib borishi uchun necha kun kerak bo'ldi?",
          options: ["Nine hours", "Ten days", "One month", "Three weeks"],
          correctIndex: 1,
          explanation: "Kema orqali kelish o'n kun davom etgan ('They arrived at Ellis Island in New York after ten days')."
        },
        {
          id: "r6_q3",
          questionEn: "Why was Carlo scared of the doctors at Ellis Island?",
          questionUz: "Nima uchun Karlo Ellis orolidagi shifokorlardan juda qo'rqdi?",
          options: ["Because people who weren't healthy couldn't enter New York", "Because doctors had big cameras", "Because they wanted to steal his food", "Because his grandpa told him to be scared"],
          correctIndex: 0,
          explanation: "Nyu-Yorkka kirish uchun to'liq sog'lom bo'lish shart bo'lgan, aks holda ruxsat berishmasdi."
        },
        {
          id: "r6_q4",
          questionEn: "How long does a trip to USA take in modern times using an airplane?",
          questionUz: "Hozirgi davrda samolyot orqali sayohat qilish taxminan qancha vaqt oladi?",
          options: ["About nine hours", "Ten days and nights", "Exactly two years", "Only twenty minutes"],
          correctIndex: 0,
          explanation: "Hozirgi samolyot tezligi darslikda ko'rsatilganidek to'g'iz soat vaqt oladi ('Now it only takes about nine hours in an airplane')."
        },
        {
          id: "r6_q5",
          questionEn: "What questions did the clerks ask the travelers at Ellis Island?",
          questionUz: "Ellis orolidagi xizmatchilar sayohatchilarga qanday savollar berishdi?",
          options: ["What is your favorite book?", "Are you hungry or thirsty?", "Where are you from? Are you healthy or are you sick?", "Can you play tennis on the ship?"],
          correctIndex: 2,
          explanation: "Xizmatchilar ularning qayerdanligi va sog'lomligini so'rashgan ('Where are you from? Are you healthy or are you sick?')."
        }
      ]
    }
  },

  // --- UNIT 7 ---
  {
    number: 7,
    title: "Subtraction",
    bigQuestionNumber: 4,
    vocabulary: [
      { id: "u7_1", word: "Minus sign", translation: "Minus belgisi" },
      { id: "u7_2", word: "Subtraction", translation: "Ayirish" },
      { id: "u7_3", word: "Take away", translation: "Olib tashlamoq" },
      { id: "u7_4", word: "Column", translation: "Ustun" },
      { id: "u7_5", word: "Row", translation: "Qator" },
      { id: "u7_6", word: "Test score", translation: "Imtihon bali" },
      { id: "u7_7", word: "Single-digit number", translation: "Bir xonali son" },
      { id: "u7_8", word: "Double-digit number", translation: "Ikki xonali son" },
      { id: "u7_9", word: "Left", translation: "Qolgan (qoldiq)" },
    ],
    grammar: {
      unitNumber: 7,
      title: "Simple Past Irregular Verbs",
      explanation: "O'tgan zamonda noto'g'ri fe'llar (Irregular Verbs) o'tgan zamon shakliga butunlay o'zgaradi (masalan: buy -> bought, give -> gave). Inkor shaklida didn't so'zidan keyin fe'l o'z holiga qaytadi.",
      examples: [
        { en: "Alma bought five cookies. She didn't buy four.", uz: "Alma beshta pechenye sotib oldi. U to'rtta sotib olmadi." },
        { en: "Olivia gave her sister twenty stickers. She didn't give her twenty-six.", uz: "Oliviya singlisiga yigirmata stiker berdi. U yigirma oltita bermadi." }
      ]
    },
    reading: {
      unitNumber: 7,
      title: "Subtraction",
      aboutUz: "Ayirish amali (subtraction) nimaligi, orqaga sanash usuli, minus belgisi, qator va ustunli hisob-kitoblar hamda matnli masalalar haqida matematika darsligi.",
      sentenceEn: "When we subtract things, we take them away from other things, and then we see how many are left.",
      sentenceUz: "Narsalarni ayirganimizda, biz ularni boshqalaridan olib tashlaymiz va keyin qancha qolganini ko'ramiz.",
      fullTextEn: "What is subtraction?\n\nWhen we add things, we join them together. When we subtract things, we take them away from other things. Then we can see how many things are left. Look at the apples. There are 3 apples left.\n\nSubtracting in Groups\n\nWhen we count backward, we’re subtracting 1 each time. Count backward from 50 to 1. Now count backward by fives, subtracting 5 each time. Now count backward by tens. How much are you subtracting each time now?\n\n[50] [45] [40] [35] [30] [25] [20] [15] [10] [5] [0]\n\nSubtraction Math Problems\n\nAll subtraction math problems have a minus sign.\n\nThis is the minus sign (-). The minus sign tells us to subtract 4 from 9. This is the answer. It tells how many are left.\nWe write: 9 - 4 = 5\nWe say: “Nine minus four equals five.”\n\nSubtraction Math Problems in Rows and Columns\n\nWe usually write subtraction math problems for single-digit numbers in a row and we usually write subtraction problems for double-digit numbers in a column.\nRow style: 5 - 2 = 3\nColumn style: 50 - 20 = 30\n\nSubtraction Word Problems\n\nLet’s use subtraction to solve these problems.\n- Alma bought five cookies. Her friends ate three. How many cookies were left? (5 - 3 = 2 cookies left)\n- Olivia had thirty-five grapes. She gave twenty grapes to her little sister. How many grapes were left? (35 - 20 = 15 grapes left)\n\nNow think of some things that people subtract every day.\n“My teacher subtracts numbers from 100 for my test score!”",
      fullTextUz: "Ayirish nima?\n\nBiz narsalarni qo'shganda, ularni birlashtiramiz. Narsalarni ayirganda esa, biz ularni boshqa narsalardan olib tashlaymiz (ayiramiz). Shundan so'ng, qancha narsa qolganini aniqlay olamiz. Olmalarga qarang. Bor-yo'g'i 3 ta olma qoldi.\n\nGuruhlar bo'yicha ayirish\n\nOrqaga sanaganimizda, biz har safar 1 ni ayiramiz. 50 dan 1 gacha teskari sanang. Endi har safar beshtadan ayirib, orqaga sanang. Endi o'ntadan orqaga sanang. Hozir har safar qanchadan ayiryapsiz?\n\n[50] [45] [40] [35] [30] [25] [20] [15] [10] [5] [0]\n\nAyirish amali misollari\n\nBarcha ayirish matematik misollarida minus belgisi bo'ladi.\n\nBu minus belgisi (-). Minus belgisi bizga 9 dan 4 ni ayirish kerakligini bildiradi. Bu tenglikdan keyingi javobdir. U qancha qolganini tushuntiradi.\nYozilishi: 9 - 4 = 5\nO'qilishi: “To'qqiz minus to'rt teng besh.”\n\nQatorlar va ustunlar shaklidagi ayirish misollari\n\nOdatda biz bir xonali sonlar uchun ayirish misollarini bitta qatorga yozamiz. Ikki xonali sonlar uchun esa ayirish misollarini bitta ustunda pastga qaratib yozamiz.\nQator shakli: 5 - 2 = 3\nUstun shakli: 50 - 20 = 30\n\nMatnli matematik masalalar\n\nKeling, ayirish amali yordamida quyidagi masalalarni yechamiz:\n- Alma beshta pechenye sotib oldi. Uning do'stlari uchtasini yeyishdi. Qancha pechenye qoldi? (5 - 3 = 2 pechenye qoldi)\n- Oliviya o'ttiz beshta uzumga ega edi. U kichkina singlisiga o'nta berdi. Qancha uzum qoldi? (35 - 20 = 15 uzum qoldi)\n\nEndi odamlar har kuni ayiradigan boshqa narsalar haqida o'ylab ko'ring.\n“Mening o'qituvchim imtihon baholarimni topish uchun 100 balldan xatolarimni ayirib tashlaydi!”",
      questions: [
        {
          id: "r7_q1",
          questionEn: "What does the minus sign tell us to do in a subtraction problem?",
          questionUz: "Ayirish misolida minus belgisi (-) nimani bajarishni buyuradi?",
          options: ["It tells us to add things together", "It tells us to take away/subtract numbers", "It tells us to count from 1 to 50", "It has no meaning in subtraction"],
          correctIndex: 1,
          explanation: "Minus belgisi bizga ayirishni uqtiradi ('The minus sign tells us to subtract numbers')."
        },
        {
          id: "r7_q2",
          questionEn: "How do we usually write subtraction problems for double-digit numbers?",
          questionUz: "Ikki xonali sonlar uchun ayirish misollarini odatda qanday yozamiz?",
          options: ["In a column", "In a row", "In a circle", "We don't write them"],
          correctIndex: 0,
          explanation: "Ikki xonali sonlarni ustun (column) shaklida yozish qulayroq ('...double-digit numbers in a column')."
        },
        {
          id: "r7_q3",
          questionEn: "If Olivia has thirty-five grapes and gives twenty to her sister, how many are left?",
          questionUz: "Agar Oliviya o'ttiz beshta uzumidan yigirmatasini singlisiga bersa, unda qancha uzum qoladi?",
          options: ["Thirty grapes", "Fifteen grapes", "Five grapes", "No grapes left"],
          correctIndex: 1,
          explanation: "Ayirish amali: 35 - 20 = 15 uzum qoladi."
        },
        {
          id: "r7_q4",
          questionEn: "What happens when we count backward in math?",
          questionUz: "Matematikada orqaga sanaganimizda har safar nima sodir bo'ladi?",
          options: ["We are subtracting 1 each time", "We are adding 5 each time", "We stay at number 50", "We are copying teacher score"],
          correctIndex: 0,
          explanation: "Orqaga sanashda har doim bittadan ayirib boramiz ('When we count backward, we’re subtracting 1 each time')."
        },
        {
          id: "r7_q5",
          questionEn: "How is a single-digit subtraction problem usually written according to the text?",
          questionUz: "Bir xonali sonli ayirish misoli odatda qanday shaklda yoziladi?",
          options: ["In a column", "In a row", "In a thick cookbook", "We count dynamically by tens"],
          correctIndex: 1,
          explanation: "Bir xonali sonlar qatorda yoziladi ('...single-digit numbers in a row')."
        }
      ]
    }
  },

  // --- UNIT 8 ---
  {
    number: 8,
    title: "Bandar, the Greedy Monkey",
    bigQuestionNumber: 4,
    vocabulary: [
      { id: "u8_1", word: "Let go", translation: "Qoʻyib yubormoq" },
      { id: "u8_2", word: "Steal", translation: "Oʻgʻirlamoq" },
      { id: "u8_3", word: "Dig up", translation: "Kavlab olmoq" },
      { id: "u8_4", word: "Hide", translation: "Yashirmoq" },
      { id: "u8_5", word: "Jar", translation: "Bonka" },
      { id: "u8_6", word: "Greedy", translation: "Ochkoʻz" },
      { id: "u8_7", word: "Bored", translation: "Zerikkan" },
      { id: "u8_8", word: "Baker", translation: "Nonvoy" },
      { id: "u8_9", word: "Cook", translation: "Oshpaz" },
      { id: "u8_10", word: "Knee", translation: "Tizza" },
      { id: "u8_11", word: "Nose", translation: "Burun" },
      { id: "u8_12", word: "Foot", translation: "Oyoq panjasi" },
      { id: "u8_13", word: "Arm", translation: "Qoʻl (yelkadan bilakgacha)" },
      { id: "u8_14", word: "Face", translation: "Yuz" },
      { id: "u8_15", word: "Hand", translation: "Qoʻl panjasi" },
    ],
    grammar: {
      unitNumber: 8,
      title: "Simple Past Irregular Verbs (Questions)",
      explanation: "Did yordamchi fe'li yordamida o'tgan zamondagi noto'g'ri fe'llarga so'roq gap tuziladi. Savolda asosiy fe'l o'zining hozirgi zamon (V1) shakliga qaytadi.",
      examples: [
        { en: "Did Bandar go to a candy store? Yes, he did.", uz: "Bandar konfet do'koniga bordimi? Ha, bordi." },
        { en: "Did he let go of the candy? No, he didn't.", uz: "U konfetni qo'yib yubordimi? Yo'q, yubormadi." }
      ]
    },
    reading: {
      unitNumber: 8,
      title: "Bandar, the Greedy Monkey",
      aboutUz: "Shahar do'konlaridan pechenye, sabzi va sosiskalarni o'g'irlagan, oxiri ochko'zligi sababli konfet bonkasiga qo'li siqilib ushlangan maymun haqida qiziqarli tarbiyaviy hikoya.",
      sentenceEn: "The greedy monkey put his hand into the jar to grab twenty pieces of candy but couldn’t get them out.",
      sentenceUz: "Ochko'z maymun yigirmata konfetni olish uchun qo'lini bonkaga tiqdi, lekin uni qaytarib chiqara olmadi.",
      fullTextEn: "A monkey called Bandar lived in the woods near a small town. One day, Bandar was bored and decided to go into the town.\n\nBandar went to a bakery and saw thirty beautiful cookies. He stole a cookie and ate it. It was good! He ate more and more cookies!\n\nThe baker saw Bandar and chased him. “You greedy little monkey!” he cried. “Now there are only fifteen cookies!”\n\nBandar ran up a tree and hid in the leaves. When he looked down, he saw sixty small carrots in a garden. When the gardener wasn’t looking, Bandar ran down the tree, dug up a carrot, and ate it. It was good! He ate more and more carrots!\n\nThe gardener saw Bandar and chased him. “You greedy little monkey! Now there are only forty-four carrots!”\n\nBandar went to a restaurant and saw forty-two sausages. He stole a sausage and ate it. It was good! He ate more and more sausages!\n\nThe cook saw Bandar and chased him. “You greedy little monkey! Now there are only thirty sausages!”\n\nBandar stole food all over the town. Everyone was angry. They tried to catch Bandar, but he was too fast. Then the candy maker had an idea.\n\nThe next day, Bandar went to the candy store. He saw two big jars of candy in every color, and it all looked good! Bandar put his hands in the jars and grabbed twenty pieces of candy. But he couldn’t get the candy out of the jars.\n\nThe candy maker ran in. “You greedy little monkey! Let go of the candy and you can run away!”\n\nDid Bandar let go of the candy?\nNo, he didn’t, and the candy maker caught him. He took him back to the woods and told him never to come to town again.",
      fullTextUz: "Bandar ismli maymun kichik bir shaharcha yaqinidagi o'rmonda yashar edi. Bir kuni Bandarning zerikdi va shaharga borishga ahd qildi.\n\nBandar nonvoyxonaga borib, o'ttizta ajoyib pechenyeni ko'rdi. U bitta pechenyeni o'g'irlab yedi. Juda shirin edi! Keyin u to'xtamay yanada ko'proq pechenyelarni yeb tashladi!\n\nNonvoy Bandarni ko'rib qolib, uni quva boshladi. “Seni ochko'z kichkina maymun-ey!” deb baqirdi u. “Hozir bor-yo'g'i o'n beshta pechenye qoldi xolos!”\n\nBandar daraxtga ko'tarilib, barglar orasiga yashirindi. Pastga qaraganida, u bog'da oltmishta kichik sabzilarni ko'rdi. Bog'bon qaramayotgan paytda, Bandar daraxtdan pastga tushib, bitta sabzini kavlab olib yedi. Mazali edi! U ko'proq sabzi yeyishda davom etdi!\n\nBog'bon Bandarni ko'rdi va uning ortidan quvdi. “Seni ochko'z mittivoy! Endi bog'da bor-yo'g'i qirq to'rtta sabzi qoldi!”\n\nBandar restoranga borib, qirq ikkita sosiskani ko'rdi. U sosiskani o'g'irladi va yedi. Juda yaxshi edi! U yanada ko'proq sosiska yedi!\n\nOshpaz Bandarni ko'rdi va quvdi. “Seni ochko'z maymun! Endi restoranda bor-yo'g'i o'ttizta sosiska qoldi!”\n\nBandar butun shahar bo'ylab oziq-ovqatlarni o'g'irladi. Hamma g'azablangan edi. Odamlar uni tutishga harakat qilishdi, lekin u juda tez yugurardi. Shunda shirinlikchi (konfet ustasi) ajoyib reja o'ylab topdi.\n\nErtasi kuni Bandar konfet do'koniga bordi. U har xil rangdagi barcha narsasi ajoyib ko'rinadigan ikkita ulkan konfet idishini (bonkani) ko'rdi. Bandar qo'llarini bonka ichiga tiqdi va birdaniga yigirmata konfetni g'ijimladi. Ammo u musht qilingan qo'lini bonkadan chiqara olmadi.\n\nKonfet ustasi yugurib kirdi. “Seni ochko'z maymun! Konfetlarni qo'yib yubor (qo'lingni och) va qochib ketishing mumkin!”\n\nBandar konfetlarni qo'yib yubordimi?\nYo'q, u qo'llarini ochmadi, shuning uchun konfet ustasi uni tutib oldi. U maymunni yana o'rmonga olib borib tashladi va shaharga boshqa hech qachon kelmasligini aytdi.",
      questions: [
        {
          id: "r8_q1",
          questionEn: "When Bandar stole cookies from the bakery, how many cookies were left in total?",
          questionUz: "Bandar nonvoyxonadan o'g'irlaganidan keyin nonvoyda jami qancha pechenye qoldi?",
          options: ["Thirty cookies", "Fifteen cookies", "Sixty carrots", "No cookies left"],
          correctIndex: 1,
          explanation: "30 pechenyedan bir qismini yeganidan keyin 15 ta qoldi ('Now there are only fifteen cookies')."
        },
        {
          id: "r8_q2",
          questionEn: "What happened when Bandar tried to steal candies from the jars?",
          questionUz: "Bandar konfetlarni bonkadan o'g'irlamoqchi bo'lganida nima sodir bo'ldi?",
          options: ["He grabbed too much candy and couldn't get his hands out", "The jar broke immediately", "He ate them all very fast", "The cook gave them as a present"],
          correctIndex: 0,
          explanation: "U birdaniga yigirmata konfetni g'ijimladi, musht qilgani uchun qo'li chiqmay qoldi ('But he couldn’t get the candy out of the jars')."
        },
        {
          id: "r8_q3",
          questionEn: "Did Bandar let go of the candy to run away?",
          questionUz: "Bandar qochib ketish uchun konfetlarni qo'yib yubordimi?",
          options: ["Yes, he let go", "No, he didn't, and the candy maker caught him", "He shared them with the baker", "He hid them in his knee"],
          correctIndex: 1,
          explanation: "Ochko'zligi uchun qo'yib yubormadi va ushlandi ('No, he didn’t, and the candy maker caught him')."
        },
        {
          id: "r8_q4",
          questionEn: "Where did Bandar hide when the baker chased him?",
          questionUz: "Nonvoy Bandarni quvlaganida u qayerga borib yashirindi?",
          options: ["He ran up a tree and hid in the leaves", "He hid behind a double-digit column", "He entered the restaurant kitchen", "Inside a large glass bathtub"],
          correctIndex: 0,
          explanation: "U bargli daraxt tepasiga chiqib yashiringan ('Bandar ran up a tree and hid in the leaves')."
        },
        {
          id: "r8_q5",
          questionEn: "What did the candy maker tell Bandar to do in order to run away?",
          questionUz: "Konfet ustasi Bandarga qutulib qolishi uchun qaysi ishni bajarishni buyurdi?",
          options: ["To let go of the candy", "To buy double-digit carrots", "To climb a lamp", "To clean up the restaurant table"],
          correctIndex: 0,
          explanation: "Unga konfetlarni qo'yib yuborishni taklif qilgan ('Let go of the candy and you can run away!')."
        }
      ]
    }
  },

  // --- UNIT 9 ---
  {
    number: 9,
    title: "Following Rules",
    bigQuestionNumber: 5,
    vocabulary: [
      { id: "u9_1", word: "Traffic light", translation: "Svetofor" },
      { id: "u9_2", word: "Take turns", translation: "Navbat bilan qilmoq" },
      { id: "u9_3", word: "Polite", translation: "Odobli" },
      { id: "u9_4", word: "Clean up", translation: "Tozalash" },
      { id: "u9_5", word: "Litter", translation: "Axlat tashlamoq" },
      { id: "u9_6", word: "Librarian", translation: "Kutubxonachi" },
      { id: "u9_7", word: "Crossing guard", translation: "Yoʻl nazoratchisi" },
      { id: "u9_8", word: "Principal", translation: "Maktab direktori" },
      { id: "u9_9", word: "Lifeguard", translation: "Qutqaruvchi" },
      { id: "u9_10", word: "Kitchen", translation: "Oshxona" },
      { id: "u9_11", word: "Living room", translation: "Mehmonxona" },
      { id: "u9_12", word: "Cafeteria", translation: "Oshxona (maktabniki)" },
      { id: "u9_13", word: "Classroom", translation: "Sinfxona" },
      { id: "u9_14", word: "Swimming pool", translation: "Basseyn" },
      { id: "u9_15", word: "Crosswalk", translation: "Piyodalar yoʻlagi" },
    ],
    grammar: {
      unitNumber: 9,
      title: "Possessive Pronouns",
      explanation: "Egalik olmoshlari (yours, hers, mine, ours, theirs) otdan keyin qo'llanilib, jismning kimga tegishli ekanligini mustaqil ravishda bildiradi.",
      examples: [
        { en: "Those are your things. Those things are yours.", uz: "Bular sizning narsalaringiz. Bu narsalar sizniki." },
        { en: "Whose book is this? It's hers.", uz: "Bu kimning kitobi? Bu uniki (qiz bolaniki)." }
      ]
    },
    reading: {
      unitNumber: 9,
      title: "Following Rules",
      aboutUz: "Uyda, maktabda, kutubxonada, hayvonot bog'ida va basseynlarda rioya qilinishi shart bo'lgan qoidalar hamda ularning hayotimizdagi muhim o'rni haqida.",
      sentenceEn: "Rules tell us what we should and shouldn't do, and they help keep us safe, happy, and healthy.",
      sentenceUz: "Qoidalar bizga nima qilishimiz va nima qilmasligimiz kerakligini aytadi va bizni xavfsiz, baxtli hamda sog'lom saqlashga yordam beradi.",
      fullTextEn: "We follow rules every day. There are rules for things we do at home, at school, and in a lot of other places.\n\nThink about rules at home. Parents usually make these rules, and they make sure we follow them. Parents can ask us to wash our hands and clean up. They make other rules about eating unhealthy food, watching TV, or bedtime. What rules do you follow at home?\n\nThere are rules at school, too. Teachers and the principal make the school rules. We should always be polite and take turns when we play games. Librarians help us follow the rules in the school library. We can’t eat, drink, or be noisy there. Outside school, the crossing guard helps us cross the road safely, and we should pay attention to the traffic light. These rules help keep us happy and safe. Can you think of more rules at school?\n\nZoos and other fun places have rules, too. At the zoo, you can’t touch or feed the animals. You should never throw things at the animals.\n\nSwimming pools are fun places, too. These rules help make it safe for everyone there. You shouldn’t run near the water and you can’t eat, drink, or litter near the pool. You must always listen to the lifeguards because lifeguards make sure we follow the rules and that we are safe in and near the water.\n\nRules tell us what we should and shouldn’t do, and they help keep us safe, happy, and healthy. What rules do you think are important?",
      fullTextUz: "Biz har kuni ko'plab qoidalarga amal qilamiz. Uyda, maktabda va boshqa turli joylarda bajaradigan amallarimiz bo'yicha qoidalar mavjud.\n\nUy qoidalari haqida o'ylab ko'ring. Odatda ota-onalar bu qoidalarni tuzishadi va ularga rioya qilishimizni nazorat qiladilar. Ular bizdan qo'llarimizni yuvishni hamda xonalarni tozalashni (clean up) buyurishi mumkin. Shuningdek, ular zararli taomlarni yemaslik, TV ko'rish va uxlash vaqtlari bo'yicha qat'iy tartiblar belgilaydilar. Sizchi, uyda qaysi qoidalarga amal qilasiz?\n\nMaktabda ham qoidalar mavjud. O'qituvchilar va direktor maktab nizomlarini ishlab chiqadilar. Biz doim odobli bo'lishimiz va o'yinlar o'ynaganimizda navbat bilan (take turns) o'ynashimiz shart. Kutubxonachilar kutubxonadagi tinchlik qoidalariga rioya qilishimizga yordam beradi; u yerda ovqatlanish, ichish yoki shovqin qilish mumkin emas. Maktabdan tashqarida esa, yo'l nazoratchisi ko'chani xavfsiz kesib o'tishimizga mutassadi bo'ladi va biz doim svetoforga qarab yurishimiz darkor. Bu qoidalar bizning xavfsizligimizni ta'minlaydi.\n\nHayvonot bog'lari va boshqa hordiq maskanlarida ham tartiblar mavjud. Hayvonot bog'ida hayvonlarni ushlash va ruxsatsiz boqish taqiqlanadi. Ularga qarata tosh yoki axlat uloqtirish aslo mumkin emas.\n\nBasseynlar ham qiziqarli joylar sirasiga kiradi. Basseyn qoidalari hammaning salomatligi uchun ishlab chiqilgan. Suvga yaqin joylarda chopqillash yaramaydi, hovuz atrofida ovqat yeyish yoki axlat tashlash (litter) qat'iyan taqiqlanadi. Siz har doim qutqaruvchilarga (lifeguards) quloq solishingiz kerak, chunki ular barcha xavfsiz joylarda ekanligimizga mas'uldirlar.\n\nQoidalar bizga nima qilish va nima qilmaslik lozimligini eslatadi hamda bizni xursand va sog'lom tutishda ko'maklashadi. Sizningcha, qaysi qoidalar eng zaruri?",
      questions: [
        {
          id: "r9_q1",
          questionEn: "Who makes the rules at school according to the text?",
          questionUz: "Darslikka muvofiq, maktab qoidalarini kim ishlab chiqadi?",
          options: ["Teachers and the principal", "Librarians and crossing guards", "Only school students", "The pool lifeguards"],
          correctIndex: 0,
          explanation: "Maktab qoidalarini o'qituvchilar va direktor belgilaydi ('Teachers and the principal make the school rules')."
        },
        {
          id: "r9_q2",
          questionEn: "What are the rules inside the school library?",
          questionUz: "Maktab kutubxonasi ichida amal qilinishi lozim bo'lgan qoidalar qaysilar?",
          options: ["You can't eat, drink, or be noisy there", "You must run fast around bookshelves", "You can listen to loud music", "You must feed wild animals there"],
          correctIndex: 0,
          explanation: "Kutubxonada ovqatlanish, ichish va shovqin qilish taqiqlangan ('We can’t eat, drink, or be noisy there')."
        },
        {
          id: "r9_q3",
          questionEn: "Why must we always listen to lifeguards at the swimming pool?",
          questionUz: "Nima uchun basseynda har doim qutqaruvchilarni (lifeguards) tinglashimiz shart?",
          options: ["Because they teach us how to draw clocks", "Because they make sure we follow the rules and stay safe", "Because they sell vanilla ice creams", "Because they want us to litter the pool"],
          correctIndex: 1,
          explanation: "Qutqaruvchi suvda va hovuz atrofida xavfsiz bo'lishimizni kafolatlaydi."
        },
        {
          id: "r9_q4",
          questionEn: "Who helps students cross the road safely outside school?",
          questionUz: "Maktab tashqarasida jamoat yo'lini xavfsiz kesib o'tishda o'quvchilarga kim ko'maklashadi?",
          options: ["The crossing guard", "The librarian", "The principal", "The greedy baker"],
          correctIndex: 0,
          explanation: "Yo'l nazoratchisi (crossing guard) bolalarga yordam beradi ('...the crossing guard helps us cross the road safely')."
        },
        {
          id: "r9_q5",
          questionEn: "What are some of the rule categories that parents make at home?",
          questionUz: "Ota-onalar uyda belgilaydigan ba'zi qoidalar ro'yxatiga nimalar kiradi?",
          options: ["Bedtime, watching TV, and washing hands", "Feeding giraffes at the city zoo", "How to use minus signs and columns", "Running near the swimming pool"],
          correctIndex: 0,
          explanation: "Uxlash vaqti, televizor ko'rish, qo'lni yuvish kabi umumiy uy qoidalari."
        }
      ]
    }
  },

  // --- UNIT 10 ---
  {
    number: 10,
    title: "The Please and Thank You Book of Poems",
    bigQuestionNumber: 5,
    vocabulary: [
      { id: "u10_1", word: "Knock", translation: "Taqqillatmoq" },
      { id: "u10_2", word: "Thoughtful", translation: "Gʻamxoʻr / E'tiborli" },
      { id: "u10_3", word: "Rude", translation: "Qoʻpol" },
      { id: "u10_4", word: "Grab", translation: "Yulib/Yulqib olmoq" },
      { id: "u10_5", word: "Pass", translation: "Uzatmoq" },
      { id: "u10_6", word: "Put away", translation: "Joyiga qoʻymoq" },
      { id: "u10_7", word: "Invite", translation: "Taklif qilmoq" },
      { id: "u10_8", word: "Wash", translation: "Yuvmoq" },
      { id: "u10_9", word: "Share", translation: "Boʻlishmoq" },
      { id: "u10_10", word: "Camp", translation: "Lager" },
      { id: "u10_11", word: "Hike", translation: "Piyoda sayr" },
      { id: "u10_12", word: "Ride a horse", translation: "Ot minish" },
      { id: "u10_13", word: "Surf", translation: "Syorfing" },
      { id: "u10_14", word: "Fish", translation: "Baliq ovlash" },
      { id: "u10_15", word: "Ski", translation: "Changʻi uchish" },
    ],
    grammar: {
      unitNumber: 10,
      title: "Can and May",
      explanation: "Ruxsat so'rash uchun ko'proq 'Can' (norasmiy, yaqinlar bilan) yoki 'May' (rasmiy, ustoz va kattalar bilan) modal fe'llari ishlatiladi.",
      examples: [
        { en: "Can I play? Yes, you can.", uz: "O'ynasam bo'ladimi? Ha, o'ynashingiz mumkin." },
        { en: "May I come in? No, you may not.", uz: "Kirsam maylimi? Yo'q, kirishingiz mumkin emas." }
      ]
    },
    reading: {
      unitNumber: 10,
      title: "The Please and Thank You Book of Poems",
      aboutUz: "Riki Rakun, Ochko'z Gorilla, E'tiborli Ho'kiz va Hamkor Ayiqlar obrazlari orqali yozilgan, odob-axloq va ulashish haqidagi to'rtta chiroyli va qiziqarli she'r.",
      sentenceEn: "Bears always share their toys and honey, while thoughtful animals always knock before opening a door.",
      sentenceUz: "Ayiqlar har doim o'yinchoqlari va asallarini ulashadilar, e'tiborli hayvonlar esa eshikni ochishdan oldin doim uni taqillatadilar.",
      fullTextEn: "Welcome, Ricky Raccoon\n\nWhen Ricky Raccoon comes over to play,\nHe helps put all of the toys away.\nHe asks his friend what he’d like to do\nAnd is always careful with scissors and glue.\nHe washes before he comes to the table\nAnd helps his host whenever he’s able.\nThat’s why almost every day\nSomeone invites Ricky over to play.\n\nDon’t be Grabby, Gorilla\n\nGorillas are rude. They grab their food.\nThey never say, “Please pass the peach.”\nThey’re so anxious, they just reach.\nThey upset others by all they do.\nAnd sometimes... they upset the table, too.\n\nThe Ox Always Knocks\n\nThe ox always knocks before opening a door.\nBecause someone behind it might be sleeping.\nOr wrapping a present, or sad or weeping.\nThen he always asks, “May I come in?”\nAnd everyone says, “How thoughtful of him!”\n\nBears Always Share\n\nBears share their toys. Bears share their honey.\nBears share a joke they think is funny.\nWhatever they do, whatever they wear,\nThey always share it with another bear.",
      fullTextUz: "Xush kelibsan, Riki Rakun (Ricky Raccoon)\n\nRiki Rakun uyga o'ynashga kelgan chog'da,\nO'yinchoqlarni yig'ishtirib (put away) qo'yar tezda.\nDo'stidan so'raydi: “Nimalar o'ynaylik bugun?”\nEhtiyotkor ishlatar qaychi va yelimni u.\nDasturxonga kelishdan avval qo'lini yuvadi (wash),\nQo'lidan kelgancha mezbonga yordam qiladi.\nShu sabab, xursand bo'lib deyarli har kun,\nTaklif qilishar Rikini o'ynash uchun.\n\nOchko'z bo'lma, ey Gorilla! (Grabby Gorilla)\n\nGorillalar ancha qo'poldir (rude) aslida.\nHammasini yulqib olar (grab) ovqat vaqtida.\nSira aytolmas: “Iltimos, shaftolini uzat.”\nShoshilib, qo'l cho'zib pampasni buzadi.\nXatti-harakati bilan hammaga to'g'irlar ziyon.\nBa'zan stolni ham ag'darib qo'yar noayon.\n\nHo'kiz Doim Eshik Quqadi (Ox Always Knocks)\n\nEshikni ochishdan avval ho'kiz taqillatar doim,\nChunki eshik ortida kimdir uxlashi mumkin.\nYoki sovg'alar o'rayotgandir u beun,\nYoki xafa bo'lib yig'layotgandir u ma'yus.\nKeyin u muloyim so'raydi: “Maylimi kirsam?”\n“Naqadar e'tiborli (thoughtful)-a!” deydi ko'rgan har odam.\n\nAyiqlar Hamisha Ulashishadi (Bears Always Share)\n\nAyiqlar o'yinchoqlarini doim bo'lishishar (share),\nO'zaro asallarini ulashib ko'rishar.\nHazillashsa, birgalikda kulishib quvnashar,\nNima qilmasin, qanday kiyim kiymasin barobar,\nBoshqa ayiqlar bilan birga uchinchi tilda bo'lishar.",
      questions: [
        {
          id: "u10_q1",
          questionEn: "Why is Ricky Raccoon invited over to play almost every day?",
          questionUz: "Nima uchun Riki Rakun deyarli har kuni o'yinga taklif qilinadi?",
          options: ["Because he is polite, helps put toys away, and washes hands", "Because he tells scary tales about gorilllas", "Because he is very lazy", "Because he steals sausages from restaurants"],
          correctIndex: 0,
          explanation: "Riki juda odobli (polite), o'yinchoqlarni yig'ishtiradi va mezbonga yordam beradi."
        },
        {
          id: "u10_q2",
          questionEn: "What rude behavior does the Grabby Gorilla show at the table?",
          questionUz: "Ochko'z Gorilla stol atrofida qanday qo'pol (rude) munosabat ko'rsatadi?",
          options: ["He knocks on the door carefully", "He grabs food and never says please", "He shares honey with other bears", "He washes his hands before coming to the table"],
          correctIndex: 1,
          explanation: "Gorilla qo'polligi sababli iltimos qilmasdan ovqatni yulqib tashlaydi ('They never say, Please pass the peach. They’re so anxious, they just reach')."
        },
        {
          id: "u10_q3",
          questionEn: "Why does the Ox always knock before opening a door according to the poem?",
          questionUz: "Nima uchun Ho'kiz eshikni ochishdan oldin har doim taqillatadi?",
          options: ["Because someone behind it might be sleeping, wrapping a present, or weeping", "Because he wants to break the wooden door", "Because he forgot his key inside the kitchen", "Because he is hungry and wants chicken"],
          correctIndex: 0,
          explanation: "Sog'lom odobga ko'ra, xonada uxlayotgan yoki dardu hasratda bo'lgan odamga xalal bermaslik uchun taqillatadi."
        },
        {
          id: "u10_q4",
          questionEn: "According to the poem, what do bears always share with each other?",
          questionUz: "She'rga ko'ra, ayiqlar o'zaro bir-biri bilan nimalarni baham ko'radilar (ulashadilar)?",
          options: ["Their toys, honey, and funny jokes", "Their scissors, glue, and dirty clothes", "Their sausages, carrots, and couches", "Their high test scores from teachers"],
          correctIndex: 0,
          explanation: "Ayiqlar asali, o'yinchoqlari va kulgili hazillarini bir-birlari bilan doim bo'lishadilar ('Bears share their toys. Bears share their honey. Bears share a joke...')."
        },
        {
          id: "u10_q5",
          questionEn: "What is the main message of 'The Please and Thank You Book of Poems'?",
          questionUz: "Ushbu she'rlar to'plamining bosh g'oyasi yoki asosiy sabog'i nima?",
          options: ["How to prepare ice cream on snowy days", "Polite manners, sharing, and thoughtfulness make everyone happy and welcomed", "That gorillas are faster than fast trains", "That wild animals must live in dirty places"],
          correctIndex: 1,
          explanation: "O'zaro e'tibor, odob va yaxshi xulq barchaga do'stlashishda va hurmat topishda yordam beradi."
        }
      ]
    }
  },

  // --- UNIT 11 ---
  {
    number: 11,
    title: "From Trees to Paper",
    bigQuestionNumber: 6,
    vocabulary: [
      { id: "u11_1", word: "Carton", translation: "Karton quti", emoji: "🧃" },
      { id: "u11_2", word: "Diary", translation: "Kundalik", emoji: "📔" },
      { id: "u11_3", word: "Paper", translation: "Qogʻoz", emoji: "📄" },
      { id: "u11_4", word: "Blow", translation: "Puflamoq / Uchib ketmoq", emoji: "💨" },
      { id: "u11_5", word: "Shelf", translation: "Javon", emoji: "🗄️" },
      { id: "u11_6", word: "Recycling plant", translation: "Qayta ishlash zavodi", emoji: "♻️" },
      { id: "u11_7", word: "Machine", translation: "Mashina / Mexanizm", emoji: "⚙️" },
      { id: "u11_8", word: "Stationery store", translation: "Kanselyariya doʻkoni", emoji: "🏪" },
      { id: "u11_9", word: "Rescue", translation: "Qutqarmoq", emoji: "🛶" },
      { id: "u11_10", word: "Time", translation: "Vaqt", emoji: "⏰" },
      { id: "u11_11", word: "Week", translation: "Hafta", emoji: "📅" },
      { id: "u11_12", word: "Nine o'clock", translation: "Soat 9", emoji: "🕘" },
      { id: "u11_13", word: "Nine-fifteen", translation: "9:15", emoji: "🕘" },
      { id: "u11_14", word: "Nine-thirty", translation: "9:30", emoji: "🕤" },
      { id: "u11_15", word: "Nine-forty-five", translation: "9:45", emoji: "🕟" },
    ],
    grammar: {
      unitNumber: 11,
      title: "Prepositions of Place",
      explanation: "Above (tepasida), across from (ro'parasida), behind (orqasida), in front of (oldida) kabi o'rin-joy predloglari jism yoki hodisalarning qayerda joylashganini ko'rsatadi.",
      examples: [
        { en: "There's smoke in the air above the city.", uz: "Shahar tepasidagi havoda tutun bor." },
        { en: "The landfill is across from the park.", uz: "Chiqindi poligoni bog'ning ro'parasida joylashgan." },
        { en: "The trash can is behind the tree, and the tree is in front of the trash can.", uz: "Axlat qutisi daraxt orqasida, daraxt esa axlat qutisining oldida turibdi." }
      ]
    },
    reading: {
      unitNumber: 11,
      title: "A Juice Carton's Diary",
      aboutUz: "Apelsin sharbati qutisi qanday qilib chiqindi sifatida ko'lga tushib qolgani, u yerdan qutqarilib, qayta ishlash zavodida ajoyib bloknot daftarga aylangani haqidagi sarguzashtli va tarbiyaviy hikoya.",
      sentenceEn: "At the recycling plant, a big machine turns old box paper into clean paper.",
      sentenceUz: "Qayta ishlash zavodida katta mashina eski qog'oz qutilarni toza qog'ozga aylantiradi.",
      emoji: "🧃",
      fullTextEn: "January 15\nDear Diary, I'm sitting on a shelf in a big store! I can see many wonderful things. The little carton in front of me has a picture of an orange on it. I think I know what I am. I'm an orange juice carton! I'm made of hard paper.\n\nJanuary 16\nDear Diary, This morning something great happened. A little girl looked at my shelf for a long time, and then she chose me! She's taking me to a picnic by the lake so I hope she's very thirsty.\n\nJanuary 17\nDear Diary, I'm in a lake! The little girl drank the juice, but she left me in front of the lake. The wind blew me into the water. I don't like it here. There was a trash can behind the tree. Why didn't the little girl put me in it?\n\nJanuary 18\nDear Diary, I saw a man taking litter out of the lake with a net. He saw my bright orange carton, and he rescued me! He caught me and a plastic bottle in his net. Now we're in the boat, and we aren't trash anymore! We're happy.\n\nJanuary 19\nDear Diary, I'm at the recycling plant! It's a little scary here because there are large machines that make loud noises. Where's my plastic bottle friend? He's across from me. He's in a bin with other plastic bottles. I think this is a good place.\n\nJanuary 20\nDear Diary, I'm sitting on a shelf in a stationery store! Everything here is made of paper! Yes, they recycled me into a notebook! I'm very happy and excited, and I really want to see the recycling plant again. Maybe next time I'll be a comic book!",
      fullTextUz: "15-yanvar\nAziz kundaligim, men katta bir do'kondagi javonomda o'tiribman! Men ko'plab ajoyib narsalarni ko'ra olyapman. To'g'rimdagi kichik qutining ustida apelsin rasmi bor. O'ylaymanki, men nimaligimni bilaman. Men apelsin sharbati qutisiman! Men qattiq qog'ozdan tayyorlanganman.\n\n16-yanvar\nAziz kundaligim, bugun ertalab ajoyib voqea yuz berdi. Bir kichkina qizaloq ancha vaqt javonimga qarab turdi va nihoyat meni tanladi! U meni ko'l bo'yidagi piknikka olib ketyapti, umid qilamanki, u juda chanqagan.\n\n17-yanvar\nAziz kundaligim, men ko'ldaman! Kichkina qizaloq sharbatni ichdi, lekin meni ko'l bo'yida qoldirib ketdi. Shamol meni suvga puflab tushirib yuborishiga sabab bo'ldi (uchirdi). Menga bu yer umuman yoqmayapti. Daraxt orqasida chiqindi qutisi bor edi. Nega qizaloq meni unga tashlamadi?\n\n18-yanvar\nAziz kundaligim, men bir kishining to'r bilan ko'ldan chiqindilarni tozalayotganini ko'rdim. U mening yorqin to'q sariq qutimni ko'rib qoldi va meni qutqardi! U meni va bir plastik shishani to'riga ilintirib oldi. Hozir biz qayiqdamiz, endi biz chiqindi emasmiz! Biz juda baxtlimiz.\n\n19-yanvar\nAziz kundaligim, men qayta ishlash zavodidaman! Bu yer biroz qo'rqinchli, chunki u yerda baland shovqin chiqaradigan ulkan mashinalar bor. Mening plastik shisha do'stim qayerda ekan? U ro'paramda, boshqa plastik idishlar bilan birga savat ichida turibdi. Menimcha, bu yaxshi joy.\n\n20-yanvar\nAziz kundaligim, men kanselyariya do'konidagi javonda o'tiribman! Bu yerdagi hamma narsa qog'ozdan qilingan! Ha, ular meni qayta ishlab, daftarga aylantirishibdi! Men juda baxtliman va hayajondaman, qayta ishlash zavodini yana bir bor ko'rishni juda xohlayman. Balki keyingi safar men komikslar kitobi bo'larman!",
      questions: [
        {
          id: "r11_q1",
          questionEn: "What material is the juice carton made of?",
          questionUz: "Sharbat qutisi qanday materialdan tayyorlangan?",
          options: ["Hard paper", "Shiny plastic", "Thin metal", "Thick wood"],
          correctIndex: 0,
          explanation: "15-yanvardagi yozuvga ko'ra, quti qattiq qog'ozdan tayorlangan ('I'm made of hard paper')."
        },
        {
          id: "r11_q2",
          questionEn: "How did the juice carton end up in the lake on January 17?",
          questionUz: "17-yanvarda sharbat qutisi qanday qilib ko'lga tushib qoldi?",
          options: ["The little girl threw it in on purpose", "The wind blew it into the water", "A dog dragged it into the lake", "The man dropped it from his boat"],
          correctIndex: 1,
          explanation: "Shamal uni ko'lga uchirib yuborgan ('The wind blew me into the water')."
        },
        {
          id: "r11_q3",
          questionEn: "Who rescued the juice carton from the water?",
          questionUz: "Sharbat qutisini suvdan kim qutqarib oldi?",
          options: ["A little girl with a big dog", "A man taking litter out of the lake with a net", "The owner of the stationery store", "A big red machine"],
          correctIndex: 1,
          explanation: "Suvdan chiqindilarni to'r bilan tozalayotgan kishi uni qutqargan ('A man taking litter out of the lake with a net... rescued me!')."
        },
        {
          id: "r11_q4",
          questionEn: "What did the recycling plant turn the juice carton into?",
          questionUz: "Qayta ishlash zavodi sharbat qutisini nimaga aylantirdi?",
          options: ["A new plastic bottle", "A bright orange toy trumpet", "A notebook in a stationery store", "A trash can behind a tree"],
          correctIndex: 2,
          explanation: "Ular uni daftarga aylantirib, kanselyariya do'koniga qo'yishgan ('recycled me into a notebook!')."
        },
        {
          id: "r11_q5",
          questionEn: "What does the carton hope to become next time it gets recycled?",
          questionUz: "Quti keyingi safar qayta ishlanganda nima bo'lishni umid qiladi?",
          options: ["A comic book", "An orange juice carton again", "A big scary machine", "A wooden shelf"],
          correctIndex: 0,
          explanation: "U kelajakda komikslar kitobi bo'lishni xohlamoqda ('Maybe next time I'll be a comic book!')."
        }
      ]
    }
  },

  // --- UNIT 12 ---
  {
    number: 12,
    title: "Plastic Fantastic?",
    bigQuestionNumber: 6,
    vocabulary: [
      { id: "u12_1", word: "High / Low", translation: "Baland / Past", emoji: "🔊" },
      { id: "u12_2", word: "Excited", translation: "Hayajonlangan / Hursand", emoji: "🤩" },
      { id: "u12_3", word: "Sleepy", translation: "Uyqusiragan", emoji: "😴" },
      { id: "u12_4", word: "Wolf", translation: "Boʻri", emoji: "🐺" },
      { id: "u12_5", word: "Feelings", translation: "Tuygʻular", emoji: "❤️" },
      { id: "u12_6", word: "Right / Wrong", translation: "Toʻgʻri / Notoʻgʻri", emoji: "✅" },
      { id: "u12_7", word: "Trumpet", translation: "Truba (musiqa asbobi)", emoji: "🎺" },
      { id: "u12_8", word: "Proud", translation: "Faxrlanadigan", emoji: "😎" },
      { id: "u12_9", word: "Smile", translation: "Jilmayish", emoji: "😊" },
      { id: "u12_10", word: "Nervous", translation: "Asabiy / Hayajonlangan", emoji: "😰" },
      { id: "u12_11", word: "Yawn", translation: "Esnamoq", emoji: "🥱" },
      { id: "u12_12", word: "Unhappy", translation: "Baxtsiz / Xafa", emoji: "😢" },
      { id: "u12_13", word: "Cry", translation: "Yigʻlamoq", emoji: "😭" },
    ],
    grammar: {
      unitNumber: 12,
      title: "Prepositions of Place (Questions)",
      explanation: "Where's the... (qayerda) va Is there a... (bormi) so'roq shakllari yordamida o'rin-joy predloglari bilan birga so'roq gap tuziladi.",
      examples: [
        { en: "Where's the fountain? It's across from the statue.", uz: "Favvora qayerda? U haykalning ro'parasida." },
        { en: "Is there a trash can behind the tree? Yes, there is.", uz: "Daraxt orqasida axlat qutisi bormi? Ha, bor." }
      ]
    },
    reading: {
      unitNumber: 12,
      title: "How Music Makes Us Feel",
      aboutUz: "Musiqa qanday qilib kayfiyatimizga ta'sir qilishi, turli ovozlar va asboblar bizda qanday hissiyotlar hamda tasavvurlar uyg'otishi haqida tushuntiruvchi darslik matni.",
      sentenceEn: "Slow music can make us feel sleepy, and fast music can make us feel excited.",
      sentenceUz: "Sekin musiqa bizni uyqusirayotgandek his qildirishi, tez musiqa esa xursand qilishi mumkin.",
      emoji: "🎵",
      fullTextEn: "People all around the world enjoy music. Some music is fast, and some music is slow. Some music is high, and some music is low. Listen to this piano music. What can you say about it? Is it fast or slow, high or low?\n\nMusic and Feelings\nWhen we listen to music, we feel different things. Slow music can make us feel sleepy, and fast music can make us feel excited. The same music can make one person feel sad and another person feel happy. There are no right or wrong feelings about music.\n\nListen to this flute music. How does it make you feel? Mothers play this music for their babies at night because it helps the babies sleep. Now listen to this trumpet music. How does it make you feel?\n\nMusic and Imagination\nMusic can help us imagine things, like animals. When the music is fast, we can imagine an animal running. When it's slow, we can imagine an animal sleeping. When it's low and slow, we can imagine an animal that is in danger. Listen. What animal does this sound like, a duck or a wolf? What do you imagine the animals are doing?\n\nListen to this music. What did you hear, thunder or rain? Now listen again. What did you hear this time?\n\nNext time you listen to music, draw a picture of what you imagine. Look at it a week later. Does it help you to remember the music?",
      fullTextUz: "Butun dunyo bo'ylab odamlar musiqadan bahramand bo'lishadi. Ba'zi musiqalar tez, ba'zilari esa sekin. Ba'zi musiqalar yuqori (baland ohangda), ba'zilari esa past ohangda bo'ladi. Ushbu fortepiano musiqasini tinglang. Bu haqda nima deya olasiz? U tezmi yoki sekin, balandmi yoki past?\n\nMusiqa va Tuyg'ular\nMusiqa tinglaganimizda, biz turli xil narsalarni his qilamiz. Sekin musiqa bizni uyqusiragan (uyquchan) his qilishga majbur qilishi mumkin, tez musiqa esa bizni hayajonlangan (xursand) qilishi mumkin. Bir xil musiqaning o'zi bir odamni xafa qilsa, boshqa bir kishini xursand qilishi mumkin. Musiqa borasida to'g'ri yoki noto'g'ri tuyg'ular mavjud emas.\n\nUshbu fleyta musiqasini tinglang. U sizga qanday ta'sir qilyapti? Onalar kechasi chaqaloqlariga bu musiqani chalishadi, chunki u chaqaloqlarning uxlashiga yordam beradi. Endi esa ushbu truba musiqasini tinglang. U sizga qanday tuyg'u beryapti?\n\nMusiqa va Tasavvur (Xayol)\nMusiqa bizga hayvonlar kabi narsalarni tasavvur qilishimizga yordam beradi. Musiqa tez bo'lganda, biz yugurayotgan hayvonni tasavvur qilishimiz mumkin. Sekin bo'lganda, uxlashayotgan hayvonni tasavvur qilamiz. Past va sekin bo'lganda, xavf ostida qolgan hayvonni tasavvur qila olamiz. Tinglang. Bu ovoz qaysi hayvonga o'xshaydi, o'rdakmi yoki bo'rimi? Hayvonlar nima qilayotganini tasavvur qilyapsiz?\n\nUshbu musiqani tinglang. Nima eshitdingiz, momaqaldiroqmi yoki yomg'irmi? Endi esa yana tinglang. Bu safar nima eshitdingiz?\n\nKeyingi safar musiqa tinglaganingizda, tasavvur qilayotgan narsangizning rasmini chizing. Bir hafta o'tgach, unga qarang. Bu sizga musiqani eslab qolishga yordam beradimi?",
      questions: [
        {
          id: "r12_q1",
          questionEn: "How can slow music make us feel according to the text?",
          questionUz: "Matnga ko'ra, sekin musiqa bizni qanday his qildirishi mumkin?",
          options: ["Sleepy", "Excited", "Nervous and proud", "Ready to jump"],
          correctIndex: 0,
          explanation: "Sekin musiqa bizga uyquchanlik va osoyishtalik keltiradi ('Slow music can make us feel sleepy')."
        },
        {
          id: "r12_q2",
          questionEn: "Are there right or wrong feelings about music?",
          questionUz: "Musiqa haqida to'g'ri yoki noto'g'ri tuyg'ular bormi?",
          options: ["Yes, only happy feelings are correct", "No right or wrong feelings about music", "Yes, crying is always wrong", "Yes, trumpet music is incorrect"],
          correctIndex: 1,
          explanation: "Musiqani har kim xohlagancha qabul qiladi, unda to'g'ri yoki noto'g'ri ko'rsatkichlar yo'q ('There are no right or wrong feelings about music')."
        },
        {
          id: "r12_q3",
          questionEn: "Why do mothers play flute music for their babies at night?",
          questionUz: "Nima uchun onalar tunda chaqaloqlari uchun fleyta musiqasini chalib berishadi?",
          options: ["To teach them how to play the trumpet", "Because it helps the babies sleep", "To make them dance together", "To make them cry"],
          correctIndex: 1,
          explanation: "Bu musiqa chaqaloqlarni uxlashiga yordam borgani uchun chalishadi ('because it helps the babies sleep')."
        },
        {
          id: "r12_q4",
          questionEn: "What kind of animal do we imagine when the music is low and slow?",
          questionUz: "Musiqa past va sekin bo'lganda qanday hayvonni tasavvur qilamiz?",
          options: ["An animal that is running", "An animal that is in danger", "A happy bird", "A dancing dolphin"],
          correctIndex: 1,
          explanation: "Osonlikcha xatar ostidagi hayvon ko'z oldimizga keladi ('When it's low and slow, we can imagine an animal that is in danger')."
        },
        {
          id: "r12_q5",
          questionEn: "What does the author suggest doing to remember the music better?",
          questionUz: "Muallif musiqani yaxshi eslab qolish uchun nima qilishni taklif qilmoqda?",
          options: ["Draw a picture of what you imagine", "Listen to a loud wolf howl", "Buy a new plastic trumpet", "Sleep during the play"],
          correctIndex: 0,
          explanation: "U tasavvur qilayotgan narsangizning rasmini chizishingizni tavsiya qilgan ('draw a picture of what you imagine')."
        }
      ]
    }
  },

  // --- UNIT 13 ---
  {
    number: 13,
    title: "Making Music",
    bigQuestionNumber: 7,
    vocabulary: [
      { id: "u13_1", word: "Notes", translation: "Notalar", emoji: "🎶" },
      { id: "u13_2", word: "Wait", translation: "Mutqish / Kutmoq", emoji: "⏳" },
      { id: "u13_3", word: "Worried", translation: "Xavotirlangan", emoji: "😟" },
      { id: "u13_4", word: "The flu", translation: "Gripp", emoji: "🤒" },
      { id: "u13_5", word: "Tears", translation: "Koʻz yoshlar", emoji: "😢" },
      { id: "u13_6", word: "Solo", translation: "Yakkaxon (solo ijro)", emoji: "👤" },
      { id: "u13_7", word: "Hummingbird", translation: "Kolibri qushi", emoji: "🐦" },
      { id: "u13_8", word: "Record", translation: "Yozib olmoq", emoji: "🎙️" },
      { id: "u13_9", word: "Musician", translation: "Musiqachi", emoji: "🧑‍🎤" },
      { id: "u13_10", word: "Have lunch", translation: "Tushlik qilmoq", emoji: "🍽️" },
      { id: "u13_11", word: "Give a concert", translation: "Konsert bermoq", emoji: "🎤" },
      { id: "u13_12", word: "Make a mistake", translation: "Xato qilmoq", emoji: "❌" },
      { id: "u13_13", word: "Sign an autograph", translation: "Avtograf qoʻymoq", emoji: "✍️" },
      { id: "u13_14", word: "Talk to fans", translation: "Muxlislar bilan gaplashmoq", emoji: "💬" },
      { id: "u13_15", word: "Do an interview", translation: "Intervyu bermoq", emoji: "📰" },
    ],
    grammar: {
      unitNumber: 13,
      title: "Prepositions of Time",
      explanation: "Vaqtni aniq ko'rsatish uchun 'at' (masalan: at night) va 'in' (masalan: in the morning / in the evening) kabi prepozitsiyalar qo'llaniladi.",
      examples: [
        { en: "Pedro listens to slow music at night.", uz: "Pedro kechqurun sokin musiqa tinglaydi." },
        { en: "When does Amanda listen to slow music? She listens in the morning.", uz: "Amanda sokin musiqani qachon eshitadi? U uni ertalab eshitadi." }
      ]
    },
    reading: {
      unitNumber: 13,
      title: "Olga's Flute",
      aboutUz: "O'zining ijrosiga ishonmagan va hayajonlangan qizaloq Olga hamda uning fleytada chalgan ajoyib musiqasini yashirincha yozib olgan o'qituvchisi janob Perez haqidagi qiziqarli hikoya.",
      sentenceEn: "The nervous musician practice every day to play a beautiful flute solo.",
      sentenceUz: "Hayajonlangan musiqachi ajoyib fleyta solosini chalish uchun har kuni mashq qiladi.",
      emoji: "🎶",
      fullTextEn: "When Olga plays her flute she feels many things. High and slow notes make her feel happy and the low long notes can make her feel sleepy. When Olga plays a fast tune, she feels like she is flying.\n\nOlga's school is having a big concert tonight. Olga plays second flute, so if the first flute player gets sick, Olga can play his or her part.\n\nToday Olga goes to school early for extra practice. Her music teacher is waiting for her.\n\n“Alonso has the flu,” Mr. Perez tells Olga. “You must play his part tonight.”\n\nOlga is very worried. “Alonso is the best flute player in the school,” she says. “I'm not good enough.”\n\nMr. Perez smiles. “You practice every day, Olga,” he tells her. “Alonso plays well, but so do you. Please try, Olga.”\n\nShe closes her eyes and begins to play, but this morning she feels nervous. The high notes are hard to reach and the fast notes are difficult to play. The quiet part seems too loud. When Olga finishes, her eyes fill with tears.\n\n“I wish I could play like Alonso,” she says.\n\nMr. Perez pushes a button on his computer and Olga hears music. She thinks it is Alonso's flute solo. She imagines butterflies on the high notes. The fast notes sound like hummingbirds or rain. The low, quiet notes are like snow falling. “That's beautiful. I wish I played liked that!” Olga says.\n\nMr. Perez smiles. “Olga, I recorded you just now. That's you playing!”\n\nOlga is amazed. “Do I really sound like that?” she asks. Mr. Perez laughs. “You should listen when you play.”\n\n“I do listen, but I'm often too nervous!” Olga says.\n\n“Don't worry tonight,” Mr. Perez tells her. “You work hard and you play well, but never forget to have fun and enjoy the music. You're a great musician!”",
      fullTextUz: "Olga o'z fleytasini chalganida ko'p narsalarni his qiladi. Yuqori va sekin notalar uni baxtli qiladi, past va uzun notalar esa uni uyqusiratadi. Olga tez ohangda chalganida, u o'zini uchayotgandek his qiladi.\n\nOlganing maktabida bugun kechqurun katta konsert bo'ladi. Olga ikkinchi fleytada chaladi, shuning uchun agar birinchi fleytachi kasal bo'lib qolsa, Olga uning qismini ijro etishi mumkin.\n\nBugun Olga qo'shimcha mashq qilish uchun maktabga erta keldi. Uning musiqa o'qituvchisi uni kutib turgan edi.\n\n“Alonso gripp bo'lib qolibdi,” dedi janob Perez Olgaga. “Bugun kechqurun uning o'rniga chalishing kerak.”\n\nOlga juda xavotirda edi. “Alonso maktabdagi eng zo'r fleytachi,” dedi u. “Men yetarli darajada yaxshi emasman.”\n\nJanob Perez jilmaydi. “Siz har kuni mashq qilasiz, Olga,” dedi u unga. “Alonso yaxshi chaladi, lekin siz ham yaxshi chalasiz. Iltimos, harakat qilib ko'ring, Olga.”\n\nU ko'zlarini yumib chalishni boshladi, lekin bugun ertalab u juda hayajonlanib asabiylashayotgan edi. Yuqori notalarga yetish qiyin bo'ldi, tez notalarni chalish esa o'ta og'ir edi. Sokit qismlar juda baland eshitilardi. Olga chalib bo'lganida, ko'zlari yoshga to'ldi.\n\n“Qani edi men ham Alonsoga o'xshab chala olsam,” dedi u.\n\nJanob Perez kompyuteridagi tugmani bosdi va Olga musiqa ovozini eshitdi. U buni Alonsoning fleyta solosi deb o'yladi. U yuqori notalarda kapalaklarni tasavvur qildi. Tez notalar kolibri qushlari yoki yomg'ir tovushidek yangradi. Past, sokin notalar esa qor yog'ishiga o'xshardi. “Bu juda chiroyli. Qani edi men ham shunday chala olsam!” dedi Olga.\n\nJanob Perez jilmaydi. “Olga, men hozirgina sizning chalinganingizni yozib oldim. Bu siz chalayotgan musiqa!”\n\nOlga hayratda qoldi. “Rostdan ham shunday eshitilyapmanmi?” deb so'radi u. Janob Perez kulib yubordi. “Chalayotganingizda o'zingizni tinglashingiz kerak.”\n\n“Men tinglayman, lekin ko'pincha hayajondan asabiy bo'laman!” dedi Olga.\n\n“Bugun kechqurun xavotir olmang,” dedi unga janob Perez. “Siz astoydil harakat qilasiz va juda yaxshi chalasiz, lekin beg'ubor maza qilishni va musiqadan zavqlanishni unutmang. Siz ajoyib musiqachisiz!”",
      questions: [
        {
          id: "r13_q1",
          questionEn: "Why is Olga asked to play Alonso's part in the concert?",
          questionUz: "Nima uchun Olgadan konsertda Alonsoning musiqiy qismini chalish so'raldi?",
          options: ["Because Alonso got sick with the flu", "Because Olga plays the trumpet better", "Because Alonso signed an autograph and left", "Because Mr. Perez dislikes Alonso"],
          correctIndex: 0,
          explanation: "Alonso gripp bilan kasallangani uchun uning o'rniga chalish kerak edi ('Alonso has the flu... You must play his part tonight')."
        },
        {
          id: "r13_q2",
          questionEn: "How does Olga feel when Mr. Perez tells her she must play Alonso's part?",
          questionUz: "Janob Perez Olgaga Alonso o'rniga chalishi kerakligini aytganda u o'zini qanday his qiladi?",
          options: ["Very proud and excited", "Very worried and not good enough", "Happy and sleepy", "Stubborn and angry"],
          correctIndex: 1,
          explanation: "U judayam tashvishlandi va o'ziga ishonmadi ('Olga is very worried... I'm not good enough')."
        },
        {
          id: "r13_q3",
          questionEn: "What did Mr. Perez do while Olga was practicing with her eyes closed?",
          questionUz: "Olga ko'zlarini yumib mashq qilayotganida janob Perez nima qildi?",
          options: ["He recorded her playing without her knowing", "He went out to have lunch with fans", "He wrote in his secret diary", "He called Alonso on the phone"],
          correctIndex: 0,
          explanation: "U Olganing chalishini yozib oldi ('Olga, I recorded you just now. That's you playing!')."
        },
        {
          id: "r13_q4",
          questionEn: "What does the fast notes of her music sound like to Olga on the recording?",
          questionUz: "Yozuvdagi tez notalar Olgaga qanday ovoz bo'lib ko'rinadi?",
          options: ["Like hummingbirds or rain", "Like a big train and a tortoise", "Like a wolf howling in danger", "Like heavy books falling down"],
          correctIndex: 0,
          explanation: "Tez notalar kolibri yoki yomg'irday eshitilgan ('The fast notes sound like hummingbirds or rain')."
        },
        {
          id: "r13_q5",
          questionEn: "What final advice does Mr. Perez give to Olga for the concert?",
          questionUz: "Janob Perez konsert uchun Olgaga qanday oxirgi maslahatni berdi?",
          options: ["To play as slow as a tortoise", "To work hard and never yawn", "To never forget to have fun and enjoy the music", "To ask fans for autographs"],
          correctIndex: 2,
          explanation: "Xursand bo'lib musiqadan maza qilishni buyurdi ('never forget to have fun and enjoy the music')."
        }
      ]
    }
  },

  // --- UNIT 14 ---
  {
    number: 14,
    title: "The Song of the Whale",
    bigQuestionNumber: 7,
    vocabulary: [
      { id: "u14_1", word: "Push", translation: "Itarmoq", emoji: "🫷" },
      { id: "u14_2", word: "Pull", translation: "Tortmoq", emoji: "🫴" },
      { id: "u14_3", word: "Movement", translation: "Harakat", emoji: "🏃" },
      { id: "u14_4", word: "Ground", translation: "Yer", emoji: "🌱" },
      { id: "u14_5", word: "Throw", translation: "Otmoq / Otish", emoji: "☄️" },
      { id: "u14_6", word: "Speed", translation: "Tezlik", emoji: "⚡" },
      { id: "u14_7", word: "Heavy / Light", translation: "Ogʻir / Yengil", emoji: "⚖️" },
      { id: "u14_8", word: "Easy", translation: "Oson", emoji: "👌" },
      { id: "u14_9", word: "Computer mouse", translation: "Kompyuter sichqonchasi", emoji: "🖱️" },
      { id: "u14_10", word: "Stapler", translation: "Stepler", emoji: "📎" },
      { id: "u14_11", word: "Suitcase", translation: "Chamadon", emoji: "🧳" },
      { id: "u14_12", word: "Broom", translation: "Supurgi", emoji: "🧹" },
      { id: "u14_13", word: "Door", translation: "Eshik", emoji: "🚪" },
      { id: "u14_14", word: "Desk drawer", translation: "Gʻaladon", emoji: "📥" },
    ],
    grammar: {
      unitNumber: 14,
      title: "Adverbs of Time",
      explanation: "This morning (bugun ertalab) va yesterday morning (kecha ertalab) vaqt ravishlari harakatning qachon sodir bo'lganligini o'tmish yoki hozirgi zamonda aniq ko'rsatadi.",
      examples: [
        { en: "This morning, Olga goes to school early for extra practice.", uz: "Bugun ertalab, Olga qo'chimcha mashg'ulot uchun maktabga vaqtli boradi." },
        { en: "When did Mark go to music class? He went yesterday morning.", uz: "Mark musiqa darsiga qachon bordi? U kecha ertalab bordi." }
      ]
    },
    reading: {
      unitNumber: 14,
      title: "Forces and Movement",
      aboutUz: "Bizni qurshagan tabiatda kuch nimaligi, push (itarish) va pull (tortish) kabi kuchlarning jism harakati hamda tezligiga qanday ta'sir qilishi haqida ilmiy-ommabop dars matni.",
      sentenceEn: "A force makes something move. A push is a force, and a pull is a force, too!",
      sentenceUz: "Kuch jismni harakatlantiradi. Itarish ham bir kuch, tortish ham bir kuchdir!",
      emoji: "⚙️",
      fullTextEn: "We see things move every day. We see people walking, birds flying, and leaves falling to the ground on a windy day. Things move in many ways. They move up and down, right and left, and over and under things. Look around your classroom. What things are moving?\n\nForce\nA force makes something move. A push is a force, and it moves something away from you. We push people on swings. A pull is a force, too, and it moves something toward you. We pull things in wagons. Can you name something you push and something you pull?\n\nMovement\nA small force causes a small movement and a big force causes a big movement. When we use a small force to throw a ball, it doesn't go far. When we use a big force to throw the same ball, it goes a long way.\n\nIt is easier to move a light thing than a heavy thing. We can move a toy car with a small force because it's light. We need a big force to move a real car because it's heavy.\n\nSpeed\nSpeed is how fast things move. Some things, like a train, move fast and some things, like a tortoise, move slowly. Can you name some things that move fast?\n\nA force can change the speed of things. When you push a door with a small force, it opens slowly, but when you push a door with a big force, it opens quickly.\n\nThe next time you see something moving, ask yourself, “What force is moving it, a push or a pull? Is the force small or big?”",
      fullTextUz: "Biz har kuni narsalarning harakatlanishini ko'ramiz. Biz odamlarning yurishini, qushlarning uchishini va shamolli kunda barglarning yerga tushishini ko'ramiz. Narsalar ko'p jihatdan harakat qiladi. Ular tepaga va pastga, o'ngga va chapga, hamda narsalarning ustidan va ostidan o'tib harakatlanadilar. Sinfxonangizga qarang. Qanday narsalar harakatlanyapti?\n\nKuch\nKuch biror narsani harakatga keltiradi. Itarish (push) ham bir kuch bo'lib, u biron bir narsani sizdan uzoqlashtiradi. Biz odamlarni arg'imchoqlarda itaramiz. Tortish (pull) ham bir kuchdir va u narsalarni sizga yaqinlashtiradi. Biz narsalarni vagonchalarda tortamiz. Siz itaradigan va tortadigan biron bir narsani ayta olasizmi?\n\nHarakat\nKichik kuch kichik harakatga sabab bo'ladi va katta kuch katta harakatga sabab bo'ladi. To'pni otishda kichik kuch ishlatganimizda, u uzoqqa bormaydi. Xuddi o'sha to'pni otishda katta kuch ishlatganimizda esam, u juda uzoq masofaga boradi.\n\nYengil narsani harakatlantirish og'ir narsadan ko'ra osonroqdir. Biz o'yinchoq mashinani ozgina (kichik) kuch bilan harakatlantirishimiz mumkin, chunki u yengil. Haqiqiy mashinani harakatlantirish uchun esa bizga katta kuch kerak bo'ladi, chunki u og'ir.\n\nTezlik\nTezlik - bu narsalarning qanchalik tez harakatlanishidir. Poyezd kabi ba'zi narsalar tez harakatlanadi, toshbaqa kabi ba'zi narsalar esa sekin harakatlanadi. Tez harakatlanadigan narsalarni ayta olasizmi?\n\nKuch narsalarning tezligini o'zgartirishi mumkin. Eshikni kichik kuch bilan itarganingizda u sekin ochiladi, lekin eshikni katta kuch bilan itarganingizda u juda tez (tezkor) ochiladi.\n\nKeyingi safar biror narsani harakatlanayotganini ko'rsangiz, o'zingizdan so'rang: “Uni qaysi kuch harakatlantiryapti, itarishmi yoki tortish? Bu kuch kichikmi yoki kattami?”",
      questions: [
        {
          id: "r14_q1",
          questionEn: "What are the two main types of forces mentioned in the force section?",
          questionUz: "Bo'limda kuchning qaysi ikkita asosiy turi keltirilgan?",
          options: ["Push and pull", "Float and sink", "Heavy and light", "Up and down"],
          correctIndex: 0,
          explanation: "Matnda itarish va tortish kuch turlari ekanligi keltirilgan ('A push is a force... A pull is a force, too')."
        },
        {
          id: "r14_q2",
          questionEn: "What kind of force moves something away from you?",
          questionUz: "Qaysi kuch turli biror jismni sizdan uzoqlashtiradi?",
          options: ["A push", "A pull", "A small movement", "A low music note"],
          correctIndex: 0,
          explanation: "Itarish kuchi jismni sizdan uzoqlashtiradi ('A push is a force, and it moves something away from you')."
        },
        {
          id: "r14_q3",
          questionEn: "What is the difference between throwing a ball with a small force versus a big force?",
          questionUz: "Kichik kuch bilan otilgan to'p va katta kuch bilan otilgan to'p farqi nimada?",
          options: ["A small force doesn't go far, but a big force goes a long way", "A small force goes much further than a big force", "The balls change to computer mice", "Nothing, they fly at the exact same speed"],
          correctIndex: 0,
          explanation: "Katta kuch uni uzoqroqqa olib boradi ('When we use a small force to throw a ball, it doesn't go far... big force... goes a long way')."
        },
        {
          id: "r14_q4",
          questionEn: "Is it easier to move a light thing or a heavy thing?",
          questionUz: "Yengil jismni harakatlantirish osonmi yoki og'ir jismnimi?",
          options: ["It is easier to move a light thing", "It is easier to move a heavy thing", "Both are always easy to throw on the ground", "Neither requires any force"],
          correctIndex: 0,
          explanation: "Yengil jismlarni siljitish har doim osonroq kechadi ('It is easier to move a light thing than a heavy thing')."
        },
        {
          id: "r14_q5",
          questionEn: "What happens when you push a door with a big force?",
          questionUz: "Eshikni katta kuch bilan itarganingizda nima sodir bo'ladi?",
          options: ["It opens quickly", "It opens slowly", "It turns into a stapler", "It doesn't make any movement"],
          correctIndex: 0,
          explanation: "Katta kuch eshikni tez ochilishiga sabab bo'ladi ('when you push a door with a big force, it opens quickly')."
        }
      ]
    }
  },

  // --- UNIT 15 ---
  {
    number: 15,
    title: "From Farm to Table",
    bigQuestionNumber: 8,
    vocabulary: [
      { id: "u15_1", word: "Stubborn", translation: "Qaysar", emoji: "🐐" },
      { id: "u15_2", word: "Angry", translation: "Jahli chiqqan", emoji: "😡" },
      { id: "u15_3", word: "Goat", translation: "Echki", emoji: "🐐" },
      { id: "u15_4", word: "Mountain", translation: "Togʻ", emoji: "🏔️" },
      { id: "u15_5", word: "West / East", translation: "Gʻarb / Sharq", emoji: "🧭" },
      { id: "u15_6", word: "Forward", translation: "Oldinga", emoji: "➡️" },
      { id: "u15_7", word: "Horns", translation: "Shoxlar", emoji: "🦬" },
      { id: "u15_8", word: "Wet", translation: "Hoʻl / Nam", emoji: "💦" },
    ],
    grammar: {
      unitNumber: 15,
      title: "Comparative Adjectives",
      explanation: "Ikki yoki undan ortiq jismlarni o'zaro solishtirishda qisqa sifatlarga '-er' qo'shimchasi va 'than' qo'llaniladi (masalan: lighter than, heavier than, slower than).",
      examples: [
        { en: "A ball is lighter than a desk.", uz: "Koptok stoldan ko'ra yengilroqdir." },
        { en: "Is a desk heavier than a ball? Yes, it is.", uz: "Stol koptokdan ko'ra og'irroqmi? Ha, og'irroq." },
        { en: "A train is slower than an airplane.", uz: "Poyezd samolyotdan sekinroqdir." }
      ]
    },
    reading: {
      unitNumber: 15,
      title: "The Two Stubborn Goats",
      aboutUz: "Tog' so'qmog'ining o'rtasida uchrashgan, bir-biriga yo'l bermay qaysarlik va g'azab qilgan ikki echki hamda ularning daryoga quyilib tushganidan olgan saboqlari haqidagi o'git hikoya.",
      sentenceEn: "The stubborn goat did not want to walk forward on the mountain path.",
      sentenceUz: "Qaysar echki togʻ yoʻlagidan oldinga qarab yurishni xohlamadi.",
      emoji: "🐐",
      fullTextEn: "Once upon a time, two stubborn goats lived in a beautiful mountain range. One goat lived on the east side, and the other lived on the west side. One day, they both walked along a narrow mountain path. The path was very high and there was a wet river far below.\n\nThe two goats met in the middle of the narrow path. Only one goat could cross at a time, but they were both very stubborn. Neither goat wanted to step back to let the other pass.\n\n“Let me cross first!” said the west goat, shaking its sharp horns.\n\n“No! I was here first!” said the east goat, getting very angry.\n\nThey decided to walk forward and push each other. They locked their strong horns and began to fight on the dangerous ledge.\n\nSuddenly, both goats lost their balance and fell from the high mountain path down into the wet, cold river below!\n\nAs they swam with difficulty to the shore, they felt very wet and silly. They learned that being stubborn and angry only brings trouble, and it is always better to cooperate and share the path.",
      fullTextUz: "Qadim zamonlarda go'zal tog' tizmasida ikkita qaysar echki yashar edi. Bitta echki sharqiy tomonda, ikkinchisi esa g'arbiy tomonda hayor kechirardi. Bir kuni, har ikkalasi ham tor tog' so'qmog'i (yo'lakchasi) bo'ylab yo'lga tushishdi. Yo'l juda balandda edi va uning pastida yomg'irli, ho'l sovuq daryo oqardi.\n\nIkki echki tor yo'lakning qo'q o'rtasida to'qnash kelishdi. Bir vaqtning o'zida faqat bitta echki o'ta olardi, lekin ikkala echki ham o'ta qaysar edi. Hech biri ikkinchisiga yo'l berish uchun orqaga qadam tashlashni xohlamadi.\n\n“Meni birinchi o'tkazib yubor!” dedi o'zining o'tkir shoxlarini silkitib g'arbiy tomondan kelgan echki.\n\n“Yo'q! Men bu yerga birinchi kelganman!” dedi g'azabi qaynab jahl bilan baqirgan sharqiy echki.\n\nUlar bir-birlarini orqaga itarib, oldinga yurishga harakat qilishdi. Xavfli jarlik chetida o'zlarining baquvvat shoxlarini bir-biriga urib, kurash boshladilar.\n\nTo'satdan, ikkala echki ham muvozanatni yo'qotib, baland tog' yo'lidan pastdagi sovuq, ho'l daryoga uchib tushishdi!\n\nSuvdan zo'rg'a suzib, qirg'oqqa omon chiqib olgach, butunlay ho'l bo'lib ketgan edilar va o'zlarining bu ishlaridan juda uyalishdi. Ular qaysarlik va g'azab faqatgina kulfat keltirishini, yo'lni bo'lishish va hamkorlik qilish har doim yaxshiroq ekanligini anglab yetdilar.",
      questions: [
        {
          id: "r15_q1",
          questionEn: "Where did the two goats live?",
          questionUz: "Ikkala echki qayerda yashashgan edi?",
          options: ["In a beautiful mountain range", "At the recycling plant", "Inside a quiet stationery store", "Near a lake behind a tree"],
          correctIndex: 0,
          explanation: "Echkilar go'zal tog' tizmasida istiqomat qilishgan ('lived in a beautiful mountain range')."
        },
        {
          id: "r15_q2",
          questionEn: "Why couldn't the two goats pass each other easily?",
          questionUz: "Nima uchun ikki echki bir-birining yonidan osonlikcha o'tib keta olishmadi?",
          options: ["Because the mountain path was narrow and they were stubborn", "Because the river was too high", "Because a man with a net caught them", "Because they were sleeping during the day"],
          correctIndex: 0,
          explanation: "Yo'l tor va har ikkalasi o'ta qaysarligi uchun ('The path was narrow... and they were both very stubborn')."
        },
        {
          id: "r15_q3",
          questionEn: "How did the east goat react to the west goat?",
          questionUz: "Sharqiy echki g'arbiy echkiga nisbatan qanday munosabatda bo'ldi?",
          options: ["It smiled happily", "It got very angry", "It offered some fresh grass", "It ran away down the mountain"],
          correctIndex: 1,
          explanation: "Juda qattiq jahli chiqib, baqira boshladi ('getting very angry')."
        },
        {
          id: "r15_q4",
          questionEn: "What happened when they shook horns and started fighting?",
          questionUz: "Ular shoxlarini urishtirib urusha boshlaganlarida nima yuz berdi?",
          options: ["They both lost balance and fell into the wet river below", "They shared the path and smiled together", "The mountain path suddenly turned to paper", "They safely flew into the sky"],
          correctIndex: 0,
          explanation: "Muvozanatni yo'qotib, pastdagi sovuq daryoga qulashgan ('lost their balance and fell... into the wet, cold river below')."
        },
        {
          id: "r15_q5",
          questionEn: "What did the stubborn goats learn from this experience?",
          questionUz: "Qaysar echkilar bu voqeadan qanday saboq olishdi?",
          options: ["Being stubborn and angry only brings trouble; cooperation is better", "Fighting on mountain paths is easier of purpose", "Watering the soil helps plants grow", "To run fast like a train across the bridge"],
          correctIndex: 0,
          explanation: "Qaysarlik fojia keltirishini va har doim kelishib yo'l berish yaxshi ekanini tushunishgan ('stubborn and angry only brings trouble, and it is always better to cooperate')."
        }
      ]
    }
  },

  // --- UNIT 16 ---
  {
    number: 16,
    title: "The Vegetable Garden",
    bigQuestionNumber: 8,
    vocabulary: [
      { id: "u16_1", word: "Plant", translation: "Ekmoq / Oʻsimlik" },
      { id: "u16_2", word: "Water", translation: "Sugʻormoq" },
      { id: "u16_3", word: "Weed", translation: "Begona oʻtlarni yulmoq" },
      { id: "u16_4", word: "Pick", translation: "Termoq / Uzmoq" },
      { id: "u16_5", word: "Soil", translation: "Tuproq" },
      { id: "u16_6", word: "Sunlight", translation: "Quyosh nuri" },
      { id: "u16_7", word: "Row", translation: "Qator" },
      { id: "u16_8", word: "Healthy", translation: "Sogʻlom" },
      { id: "u16_9", word: "Delicious", translation: "Mazali" },
    ],
    grammar: {
      unitNumber: 16,
      title: "Superlative Adjectives",
      explanation: "Eng yuqori darajani (orttirma daraja) tasvirlash uchun qisqa sifatlar oxiriga '-est' qo'shimchasi va sifatdan oldin 'the' qo'llaniladi (masalan: the youngest, the juiciest).",
      examples: [
        { en: "I'm the youngest person in my family.", uz: "Men oilamizdagi eng yosh insonman." },
        { en: "Is the juiciest grass on East Mountain? Yes, it is.", uz: "Eng sersuv o't Sharqiy tog'dami? Ha, shunday." }
      ]
    },
    reading: {
      unitNumber: 16,
      title: "Our Vegetable Garden",
      aboutUz: "Bolaning oʻz hovlisida sabzavotlar ekishi, ularni sugʻorishi va parvarish qilishi haqidagi kundaligi.",
      sentenceEn: "We must water the soil every day so the vegetables can grow healthy.",
      sentenceUz: "Sabzavotlar sogʻlom boʻlib oʻsishi uchun biz har kuni tuproqni sugʻorishimiz kerak."
    }
  },

  // --- UNIT 17 ---
  {
    number: 17,
    title: "Shapes in Art",
    bigQuestionNumber: 9,
    vocabulary: [
      { id: "u17_1", word: "Crescent", translation: "Yarim oy shakli" },
      { id: "u17_2", word: "Star", translation: "Yulduz" },
      { id: "u17_3", word: "Spiral", translation: "Spiral shakli" },
      { id: "u17_4", word: "Oval", translation: "Oval (tuxumsimon)" },
      { id: "u17_5", word: "Straight", translation: "Toʻgʻri (chiziq)" },
      { id: "u17_6", word: "Nature", translation: "Tabiat" },
      { id: "u17_7", word: "Collage", translation: "Kollaj" },
      { id: "u17_8", word: "Sculpture", translation: "Haykal / Skulptura" },
      { id: "u17_9", word: "Pattern", translation: "Naqsh / Nusxa" },
      { id: "u17_10", word: "Photograph", translation: "Fotosurat" },
      { id: "u17_11", word: "Origami", translation: "Origami" },
      { id: "u17_12", word: "Drawing", translation: "Rasm chizish" },
      { id: "u17_13", word: "Mobile", translation: "Mobil" },
      { id: "u17_14", word: "Oil painting", translation: "Moyboʻyoqli rasm" },
      { id: "u17_15", word: "Mosaic", translation: "Mozaika" },
    ],
    grammar: {
      unitNumber: 17,
      title: "Quantifiers",
      explanation: "A lot of (ko'plab) tasdiq gaplarda sanaladigan va sanalmaydigan otlar bilan ishlatiladi. Any (hech qanday) inkor va so'roq gaplarda sanaladigan ko'plik yoki sanalmaydigan otlar bilan ishlatiladi.",
      examples: [
        { en: "There are a lot of shapes. There is a lot of paper.", uz: "U yerda ko'plab shakllar bor. U yerda ko'plab qog'oz bor." },
        { en: "There aren't any triangles. There isn't any red paint.", uz: "U yerda hech qanday uchburchaklar yo'q. Hech qanday qizil bo'yoq yo'q." }
      ]
    },
    reading: {
      unitNumber: 17,
      title: "Shapes and Patterns in Art",
      aboutUz: "Rassomlar oʻz asarlarida (kollaj, haykal, rasm) tabiatdagi spiral, yarim oy va yulduz shakllaridan qanday foydalanishi.",
      sentenceEn: "The artist made a beautiful collage using shapes like a crescent and a star.",
      sentenceUz: "Rassom yarim oy va yulduz kabi shakllardan foydalanib goʻzal kollaj yaratdi."
    }
  },

  // --- UNIT 18 ---
  {
    number: 18,
    title: "Origami Panel Story",
    bigQuestionNumber: 9,
    vocabulary: [
      { id: "u18_1", word: "Shiny", translation: "Yaltiroq" },
      { id: "u18_2", word: "Fold", translation: "Buklamoq" },
      { id: "u18_3", word: "Edge", translation: "Chekka / Qirra" },
      { id: "u18_4", word: "Crane", translation: "Turna" },
      { id: "u18_5", word: "Seal", translation: "Tyulen" },
      { id: "u18_6", word: "Crumple", translation: "Gʻijimlamoq" },
      { id: "u18_7", word: "Waves", translation: "Toʻlqinlar" },
      { id: "u18_8", word: "Climb", translation: "Tirmashib chiqmoq" },
      { id: "u18_9", word: "Golden", translation: "Oltinrang" },
      { id: "u18_10", word: "Markers", translation: "Markerlar" },
      { id: "u18_11", word: "Scissors", translation: "Qaychi" },
      { id: "u18_12", word: "Glue", translation: "Yelim" },
      { id: "u18_13", word: "Watercolors", translation: "Akvarel" },
      { id: "u18_14", word: "Chalk", translation: "Boʻr" },
      { id: "u18_15", word: "Colored pencils", translation: "Rangli qalamlar" },
    ],
    grammar: {
      unitNumber: 18,
      title: "Quantifiers (Questions)",
      explanation: "Did ... have any so'rog'iga ruxsat/rad javoblari beriladi. Sanaladigan otlar sonini so'rash uchun 'How many' va sanalmaydigan narsalar miqdorini so'rash uchun 'How much' ishlatiladi.",
      examples: [
        { en: "Did Maki have any pencils? No, she didn't.", uz: "Makining biror qalami bormidi? Yo'q, unda yo'q edi." },
        { en: "How many seals were there? There was one seal.", uz: "U yerda nechta tyulen bor edi? U yerda bitta tyulen bor edi." },
        { en: "How much paper was there? There was a lot of paper.", uz: "U yerda qancha qog'oz bor edi? U yerda ko'plab qog'oz bor edi." }
      ]
    },
    reading: {
      unitNumber: 18,
      title: "The Origami Crane",
      aboutUz: "Qogʻozni buklash orqali turli hayvonlar (turna, tyulen) yasash san'ati haqida rasmli hikoya.",
      sentenceEn: "Fold the edge of the paper carefully to make a beautiful golden crane.",
      sentenceUz: "Chiroyli oltinrang turna yasash uchun qogʻozning chetini ehtiyotkorlik bilan buklang."
    }
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Unit 1
  {
    id: "q_u1_1",
    unitNumber: 1,
    question: "Mammals _____ warm-blooded, but amphibians lay eggs near water.",
    options: ["am", "is", "are", "be"],
    correctIndex: 2,
    explanation: "'Mammals' ko'plikdagi ot bo'lgani uchun 'are' ishlatiladi.",
  },
  {
    id: "q_u1_2",
    unitNumber: 1,
    question: "Fish use _____ to breathe under water.",
    options: ["fur", "wings", "gills", "feathers"],
    correctIndex: 2,
    explanation: "Baliqlar suv ostida nafas olishi uchun jabra (gills) ishlashadi.",
  },
  // Unit 2
  {
    id: "q_u2_1",
    unitNumber: 2,
    question: "The fierce animal always ________ for tasty food in the forest.",
    options: ["hunt", "hunts", "hunting", "hunted"],
    correctIndex: 1,
    explanation: "Present simpleda uchinchi shaxs birlik uchun '-s' qo'shilib 'hunts' bo'ladi.",
  },
  // Unit 3
  {
    id: "q_u3_1",
    unitNumber: 3,
    question: "Which of these is a liquid state of matter?",
    options: ["ice", "steam", "liquid juice", "balloon"],
    correctIndex: 2,
    explanation: "Fruit juice suyuqlik (liquid) holatidagi jism hisoblanadi.",
  },
  // Unit 4
  {
    id: "q_u4_1",
    unitNumber: 4,
    question: "We don't have ________ salt left in the kitchen bag.",
    options: ["some", "any", "many", "a"],
    correctIndex: 1,
    explanation: "Inkor gaplarda 'any' ishlatiladi.",
  },
  // Unit 5
  {
    id: "q_u5_1",
    unitNumber: 5,
    question: "Long ago, letters ________ very slow to arrive across the country.",
    options: ["was", "were", "are", "is"],
    correctIndex: 1,
    explanation: "'Letters' ko'plikda va o'tgan zamonda bo'lgani uchun 'were' bo'ladi.",
  },
  // Unit 6
  {
    id: "q_u6_1",
    unitNumber: 6,
    question: "Yesterday they ________ along the dirt path instead of driving.",
    options: ["travel", "travels", "traveled", "traveling"],
    correctIndex: 2,
    explanation: "'Yesterday' o'tgan zamon bo'lgani uchun to'g'ri fe'lga '-ed' qo'shuvchi 'traveled' bo'ladi.",
  },
  // Unit 7
  {
    id: "q_u7_1",
    unitNumber: 7,
    question: "The greedy monkey ________ all the nuts yesterday.",
    options: ["take", "takes", "took", "taking"],
    correctIndex: 2,
    explanation: "O'tgan zamonda 'take' noto'g'ri fe'li 'took' ga o'zgaradi.",
  },
  // Unit 8
  {
    id: "q_u8_1",
    unitNumber: 8,
    question: "________ the clever bird manage to escape from the fierce cat?",
    options: ["Do", "Does", "Did", "Was"],
    correctIndex: 2,
    explanation: "O'tgan zamonda savol berish uchun 'Did' yordamchi fe'li ishlatiladi.",
  },
  // Unit 9
  {
    id: "q_u9_1",
    unitNumber: 9,
    question: "We ________ throw plastic litters on the public crosswalk.",
    options: ["must", "must not", "are", "do"],
    correctIndex: 1,
    explanation: "Axlat tashlash taqiqlangan qoida bo'lgani uchun 'must not' to'g'ri.",
  },
  // Unit 10
  {
    id: "q_u10_1",
    unitNumber: 10,
    question: "The polite boy knocked on the door, and I invited ________ inside.",
    options: ["him", "he", "his", "them"],
    correctIndex: 0,
    explanation: "O'g'il bolaga nisbatan ob'ekt olmoshi 'him' bo'ladi.",
  },
  // Unit 11
  {
    id: "q_u11_1",
    unitNumber: 11,
    question: "We ________ the smart paper factory next Thursday morning.",
    options: [" visit", "are visiting", "visited", "visits"],
    correctIndex: 1,
    explanation: "Rejalashtirilgan kelajak uchun kelishilgan 'are visiting' munosib.",
  },
  // Unit 12
  {
    id: "q_u12_1",
    unitNumber: 12,
    question: "The excited young sister enjoys ________ new toys from old boxes.",
    options: ["make", "making", "to make", "made"],
    correctIndex: 1,
    explanation: "'Enjoy' fe'lidan keyin gerund (fe'l+ing) kelib 'making' bo'ladi.",
  },
  // Unit 13
  {
    id: "q_u13_1",
    unitNumber: 13,
    question: "The popular musician went on stage ________ a dynamic live concert.",
    options: ["give", "to give", "giving", "gave"],
    correctIndex: 1,
    explanation: "Harakat maqsadini bildirish uchun (Infinitive of purpose) 'to give' qo'llaniladi.",
  },
  // Unit 14
  {
    id: "q_u14_1",
    unitNumber: 14,
    question: "A heavy suitcase is much ________ than a light stapler.",
    options: ["heavy", "heavier", "heaviest", "more heavy"],
    correctIndex: 1,
    explanation: "Sifatning qiyosiy darajasi 'heavier than' dir.",
  },
  // Unit 15
  {
    id: "q_u15_1",
    unitNumber: 15,
    question: "Mount Everest is the ________ mountain in the entire world.",
    options: ["high", "higher", "highest", "most high"],
    correctIndex: 2,
    explanation: "Orttirma darajada 'the highest' ishlatiladi.",
  },
  // Unit 16
  {
    id: "q_u16_1",
    unitNumber: 16,
    question: "If you keep watering the soil properly, the plants ________ very healthy.",
    options: ["grow", "grows", "will grow", "grown"],
    correctIndex: 2,
    explanation: "First Conditional shaklida 'If + Present Simple, will + verb' shakli ishlatiladi.",
  },
  // Unit 17
  {
    id: "q_u17_1",
    unitNumber: 17,
    question: "The cute children carefully poured green paint ________ the glass jar.",
    options: ["into", "through", "over", "around"],
    correctIndex: 0,
    explanation: "Ichkariga solish yoki quyish harakati uchun 'into' ko'makchisi to'g'ri.",
  },
  // Unit 18
  {
    id: "q_u18_1",
    unitNumber: 18,
    question: "Please fold the edges of the golden crane paperwork ________.",
    options: ["careful", "carefully", "more careful", "carefulness"],
    correctIndex: 1,
    explanation: "Harakatning qay tarzda bajarilishini bildiruvchi ravish (adverb of manner) 'carefully' dir.",
  }
];

export const UNIT_SONGS: Record<number, any> = {
  1: {
    title: "We Love Animals!",
    trackInfo: "1-04",
    lines: [
      { en: "Fish have gills to help them breathe.", uz: "Baliqlarning nafas olishga yordam beradigan jabralari bor.", pronunciation: "Fish xev gilz tu xelp zem briz." },
      { en: "They have gills to play in the sea!", uz: "Ularda dengizda o'ynash uchun jabralar bor!", pronunciation: "Zey xev gilz tu pley in ze si!" },
      { en: "Birds have wings to help them fly.", uz: "Qushlarning uchishiga yordam beradigan qanotlari bor.", pronunciation: "Berds xev uingz tu xelp zem flay." },
      { en: "They have wings to play in the sky!", uz: "Ularda osmonda o'ynash uchun qanotlar bor!", pronunciation: "Zey xev uingz tu pley in ze skay!" },
      { en: "Animals! Animals! We love animals!", uz: "Hayvonlar! Hayvonlar! Biz hayvonlarni yaxshi ko'ramiz!", pronunciation: "Enimals! Enimals! Ui lav enimals!" },
      { en: "How do mammals keep warm?", uz: "Sutemizuvchilar qanday qilib issiqlikni saqlashadi?", pronunciation: "Xau du memalz kip uorm?" },
      { en: "Do you know?", uz: "Siz bilasizmi?", pronunciation: "Du yu nou?" },
      { en: "They have fur to play in the snow!", uz: "Ularda qorda o'ynash uchun junlar bor!", pronunciation: "Zey xev fer tu pley in ze snou!" },
      { en: "How do amphibians breathe when they swim?", uz: "Ikki suvda yashovchilar suzishganda qanday nafas olishadi?", pronunciation: "Xau du emfibianz briz uen zey suim?" },
      { en: "Believe it or not, they use their skin!", uz: "Ishonasizmi yoki yo'q, ular terisidan foydalanishadi!", pronunciation: "Biliv it or not, zey yuz zeir skin!" },
      { en: "Animals! Animals! We love animals!", uz: "Hayvonlar! Hayvonlar! Biz hayvonlarni yaxshi ko'ramiz!", pronunciation: "Enimals! Enimals! Ui lav enimals!" }
    ]
  },
  2: {
    title: "Cats and Birds",
    trackInfo: "1-11",
    lines: [
      { en: "Meow! Squawk! Meow! Squawk!", uz: "Miyov! Baqir-chaqir! Miyov! Baqir-chaqir!", pronunciation: "Miyau! Skuok! Miyau! Skuok!" },
      { en: "My cat and bird always fight.", uz: "Mening mushugim va qushim har doim urishadi.", pronunciation: "May ket end berd olueyz fayt." },
      { en: "They never get along together.", uz: "Ular hech qachon birga kelisha olishmaydi.", pronunciation: "Zey never get elong togizer." },
      { en: "And fighting isn't right.", uz: "Va urishish ham noto'g'ri.", pronunciation: "End fayting iznt rayt." },
      { en: "Meow! Squawk! Meow! Squawk!", uz: "Miyov! Baqir-chaqir! Miyov! Baqir-chaqir!", pronunciation: "Miyau! Skuok! Miyau! Skuok!" },
      { en: "I hardly ever sleep at night.", uz: "Men tunda deyarli uxlay olmayman.", pronunciation: "Ay xardli ever slip et nayt." },
      { en: "Why can't my cat and bird be friends", uz: "Nega mushugim bilan qushim do'st bo'la olmaydi", pronunciation: "Uay kent may ket end berd bi frendz" },
      { en: "And treat each other right?", uz: "Va bir-biriga yaxshi munosabatda bo'lishmaydi?", pronunciation: "End trit ich azer rayt?" },
      { en: "Meow! Squawk! Meow! Squawk!", uz: "Miyov! Baqir-chaqir! Miyov! Baqir-chaqir!", pronunciation: "Miyau! Skuok! Miyau! Skuok!" },
      { en: "I usually have to shout.", uz: "Men odatda baqirishga majbur bo'laman.", pronunciation: "Ay yujuali xev tu shaut." },
      { en: "I sometimes say they must be friends", uz: "Men ba'zan ular do'st bo'lishlari kerakligini aytaman", pronunciation: "Ay samtaymz sey zey mast bi frendz" },
      { en: "Or I won't let them out!", uz: "Aks holda ularni tashqariga chiqarmayman!", pronunciation: "Or ay uont let zem aut!" }
    ]
  },
  3: {
    title: "The Snowman",
    trackInfo: "1-19",
    lines: [
      { en: "This was my snowman.", uz: "Bu mening qorbolam edi.", pronunciation: "Zis uoz may snoumen." },
      { en: "My wonderful snowman.", uz: "Mening ajoyib qorbolam.", pronunciation: "May uanderful snoumen." },
      { en: "But now he's melting away!", uz: "Lekin hozir u erib ketmoqda!", pronunciation: "Bat nau xiz melting euey!" },
      { en: "His name was Joe, my man of snow,", uz: "Uning ismi Jo edi, mening qor odamim,", pronunciation: "Xiz neym uoz Jou, may men of snou," },
      { en: "And now he's melting away!", uz: "Va endi u erib ketmoqda!", pronunciation: "End nau xiz melting euey!" },
      { en: "Those were his black eyes,", uz: "Anavilar uning qora ko'zlari edi,", pronunciation: "Zouz uer xiz blek ayz," },
      { en: "And that was his red nose,", uz: "Va anavi uning qizil burni edi,", pronunciation: "End zet uoz xiz red nouz," },
      { en: "But now he's melting away!", uz: "Lekin hozir u erib ketmoqda!", pronunciation: "Bat nau xiz melting euey!" },
      { en: "He wasn't small, he was very tall,", uz: "U kichkina emas, u juda baland edi,", pronunciation: "Xi uoznt smol, xi uoz veri tol," },
      { en: "And now he's melting away!", uz: "Va endi u erib ketmoqda!", pronunciation: "End nau xiz melting euey!" }
    ]
  },
  4: {
    title: "Making Ice Cream",
    trackInfo: "1-26",
    lines: [
      { en: "Where were you yesterday?", uz: "Kecha qayerda edingiz?", pronunciation: "Uer uer yu yesterdey?" },
      { en: "We were at a party.", uz: "Biz bazmda edik.", pronunciation: "Ui uer et e parti." },
      { en: "It was fun to make ice cream", uz: "Muzqaymoq tayyorlash juda qiziqarli bo'ldi", pronunciation: "It uoz fan tu meyk ays krim" },
      { en: "With all our friends!", uz: "Barcha do'stlarimiz bilan!", pronunciation: "Uiz ol aur frendz!" },
      { en: "Was the ice cream in the freezer?", uz: "Muzqaymoq muzlatkichda edimi?", pronunciation: "Uoz ze ays krim in ze frizer?" },
      { en: "No! It was quick to make.", uz: "Yo'q! Uni tayyorlash tez bo'ldi.", pronunciation: "Nou! It uoz kuik tu meyk." },
      { en: "Was the ice cream in a bag?", uz: "Muzqaymoq paketda / xaltachada edimi?", pronunciation: "Uoz ze ays krim in e beg?" },
      { en: "Yes! Shake, shake, shake!", uz: "Ha! Silkiting, silkiting, silkiting!", pronunciation: "Yes! Sheyk, sheyk, sheyk!" },
      { en: "Where were you yesterday?", uz: "Kecha qayerda edingiz?", pronunciation: "Uer uer yu yesterdey?" },
      { en: "We were at a party.", uz: "Biz bazmda edik.", pronunciation: "Ui uer et e parti." },
      { en: "It was fun to make ice cream", uz: "Muzqaymoq tayyorlash juda qiziqarli bo'ldi", pronunciation: "It uoz fan tu meyk ays krim" },
      { en: "With all our friends!", uz: "Barcha do'stlarimiz bilan!", pronunciation: "Uiz ol aur frendz!" }
    ]
  },
  5: {
    title: "Great Grandma",
    trackInfo: "1-34",
    lines: [
      { en: "Great Grandma traveled on a ship,", uz: "Katta buvim kemada sayohat qilar edilar,", pronunciation: "Greyt Grenma treveld on e ship," },
      { en: "The trip was long and slow.", uz: "Sayohat uzoq va sekin edi.", pronunciation: "Ze trip uoz long end slou." },
      { en: "She moved here from a different land,", uz: "U kiyin boshqa mamlakatdan bu yerga ko'chib kelgan,", pronunciation: "Shi muvd xier from e diferent lend," },
      { en: "Many years ago.", uz: "Ko'p yillar oldin.", pronunciation: "Meni yierz egou." },
      { en: "Great Grandma walked from place to place,", uz: "Katta buvim piyoda yurar edilar bir joydan boshqasiga,", pronunciation: "Greyt Grenma uokt from pleys tu pleys," },
      { en: "In sun or rain or snow.", uz: "Quyoshda, yomg'irda yoki qorda.", pronunciation: "In san or reyn or snou." },
      { en: "She didn't use a car or bus,", uz: "Avtomobil yoki avtobusdan foydalanmasdilar,", pronunciation: "Shi didnt yuz e kar or bas," },
      { en: "Many years ago.", uz: "Ko'p yillar oldin.", pronunciation: "Meni yierz egou." },
      { en: "Great Grandma listened to the news,", uz: "Katta buvim yangiliklarni tinglar edilar,", pronunciation: "Greyt Grenma lisnd tu ze nyuz," },
      { en: "On her old radio.", uz: "Uning eski radiosida.", pronunciation: "On xer old reydiou." },
      { en: "People didn't watch TV,", uz: "Odamlar televizor ko'rishmas edi,", pronunciation: "Pipl didnt uoch tivi," },
      { en: "Many years ago.", uz: "Ko'p yillar oldin.", pronunciation: "Meni yierz egou." }
    ]
  },
  6: {
    title: "What Did You Do Yesterday?",
    trackInfo: "1-41",
    lines: [
      { en: "What did you do yesterday?", uz: "Kecha nima qildingiz?", pronunciation: "Uot did yu du yesterdey?" },
      { en: "Did you visit May? Yes, I did.", uz: "Meyning uyiga bordingizmi? Ha, bordim.", pronunciation: "Did yu vizit Mey? Yes, ay did." },
      { en: "Did you walk there in the rain?", uz: "Yomg'ir ostida u yerga piyoda bordingizmi?", pronunciation: "Did yu uok zer in ze reyn?" },
      { en: "Did you travel there by train?", uz: "U yerga poyezdda sayohat qildingizmi?", pronunciation: "Did yu trevel zer bay treyn?" },
      { en: "What did you do yesterday?", uz: "Kecha nima qildingiz?", pronunciation: "Uot did yu du yesterdey?" },
      { en: "What did you do yesterday?", uz: "Kecha nima qildingiz?", pronunciation: "Uot did yu du yesterdey?" },
      { en: "Did you travel far? No, I didn't.", uz: "Uzoqqa sayohat qildingizmi? Yo'q, qilmadim.", pronunciation: "Did yu trevel far? Nou, ay didnt." },
      { en: "Did you climb up a tree?", uz: "Daraxtga tirmashib chiqdingizmi?", pronunciation: "Did yu klaym ap e tri?" },
      { en: "Did you watch shows on TV?", uz: "Televizorda ko'rsatuvlar ko'rdingizmi?", pronunciation: "Did yu uoch shouz on tivi?" },
      { en: "What did you do yesterday?", uz: "Kecha nima qildingiz?", pronunciation: "Uot did yu du yesterdey?" }
    ]
  },
  7: {
    title: "Cookies!",
    trackInfo: "1-49",
    lines: [
      { en: "Yesterday, Billy bought cookies at the store.", uz: "Kecha Billi do'kondan pechenye sotib oldi.", pronunciation: "Yesterdey, Bili bot kukiz et ze stor." },
      { en: "He bought sixteen cookies, but his sister ate four.", uz: "U o'n oltita pechenye sotib oldi, lekin singlisi to'rttasini yedi.", pronunciation: "Xi bot sikstin kukiz, bat xiz sister eyt for." },
      { en: "His mother ate three, and his brother had eight.", uz: "Onasi uchtasini yedi, akasi esa sakkizta oldi.", pronunciation: "Xiz mazer eyt zri, end xiz brazer xed eyt." },
      { en: "How many cookies were left on Billy's plate?", uz: "Billining likobchasida nechta pechenye qoldi?", pronunciation: "Xau meni kukiz uer left on Biliz pleyt?" },
      { en: "Today, Billy didn't buy cookies at the store.", uz: "Bugun Billi do'kondan pechenye sotib olmadi.", pronunciation: "Tudey, Bili didnt bay kukiz et ze stor." },
      { en: "But his mother bought three and his sister bought four.", uz: "Lekin onasi uchtasini va singlisi to'rttasini sotib oldi.", pronunciation: "Bat xiz mazer bot zri end xiz sister bot for." },
      { en: "His brother bought sixteen but he only had eight.", uz: "Akasi o'n oltita sotib oldi, lekin unda faqat sakkiztasi qoldi.", pronunciation: "Xiz brazer bot sikstin bat xi onli xed eyt." },
      { en: "How many cookies were left on Billy's plate?", uz: "Billining likobchasida nechta pechenye qoldi?", pronunciation: "Xau meni kukiz uer left on Biliz pleyt?" }
    ]
  },
  8: {
    title: "My Brother",
    trackInfo: "2-04",
    lines: [
      { en: "Where's my kite, and where's my ball?", uz: "Mening varragim qayerda, mening koptogim qayerda?", pronunciation: "Uerz may kayt, end uerz may bol?" },
      { en: "Did I leave them in the hall?", uz: "Ularni dahlizda qoldirdimmi?", pronunciation: "Did ay liv zem in ze xol?" },
      { en: "What did I do with my toy train?", uz: "O'yinchoq poyezdimni nima qildim?", pronunciation: "Uot did ay du uiz may toy treyn?" },
      { en: "Did I leave it out again?", uz: "Uni yana tashqarida qoldirdimmi?", pronunciation: "Did ay liv it aut egyn?" },
      { en: "Where's my robot? Where's my car?", uz: "Mening robotim qayerda? Mashinam qayerda?", pronunciation: "Uerz may roubot? Uerz may kar?" },
      { en: "I don't know where my toys are.", uz: "O'yinchoqlarim qayerdaligini bilmayman.", pronunciation: "Ay dont nou uer may toyz ar." },
      { en: "Did I have them yesterday?", uz: "Ular kecha mendamidi?", pronunciation: "Did ay xev zem yesterdey?" },
      { en: "Did I put them all away?", uz: "Hammasini joy-joyiga olib qo'ydimmi?", pronunciation: "Did ay put zem ol euey?" },
      { en: "Here's my kite, and here's my ball!", uz: "Mana mening varragim, mana mening koptogim!", pronunciation: "Xierz may kayt, end xierz may bol!" },
      { en: "I didn't lose them after all!", uz: "Nihoyat, hech qaysisini yo'qotmabman!", pronunciation: "Ay didnt luz zem efter ol!" },
      { en: "Mom put all my toys away!", uz: "Oying barcha o'yinchoqlarimni yig'ishtirib qo'yibdi!", pronunciation: "Mom put ol may toyz euey!" },
      { en: "Here they are! It's time to play!", uz: "Mana ular! O'ynash vaqti keldi!", pronunciation: "Xier zey ar! Its taym tu pley!" }
    ]
  },
  9: {
    title: "Whose Shoes Are These?",
    trackInfo: "2-12",
    lines: [
      { en: "Oh dear, whose shoes are these?", uz: "Voy xudoyim, bular kimning poyabzallari?", pronunciation: "Ou dier, xuz shuz ar ziz?" },
      { en: "Help me clean up, please.", uz: "Iltimos, menga tozalashga yordam bering.", pronunciation: "Xelp mi klin ap, pliz." },
      { en: "These are mine and those are yours.", uz: "Bular meniki, anavilar esa sizniki.", pronunciation: "Ziz ar mayn end zouz ar yurz." },
      { en: "Are these Layla's? Yes, of course.", uz: "Bular Laylanikimi? Ha, albatta.", pronunciation: "Ar ziz Laylaz? Yes, of kors." },
      { en: "They are Layla's shoes.", uz: "Ular Laylaning poyabzallari.", pronunciation: "Zey ar Laylaz shuz." },
      { en: "No, no, that isn't right,", uz: "Yo'q, yo'q, bu noto'g'ri,", pronunciation: "Nou, nou, zet iznt rayt," },
      { en: "No, no hers are white.", uz: "Yo'q, yo'q, uniki oq rangda edi.", pronunciation: "Nou, nou xerz ar uayt." },
      { en: "These are mine and those are yours.", uz: "Bular meniki, anavilar esa sizniki.", pronunciation: "Ziz ar mayn end zouz ar yurz." },
      { en: "Are these Layla's? Yes, of course.", uz: "Bular Laylanikimi? Ha, albatta.", pronunciation: "Ar ziz Laylaz? Yes, of kors." },
      { en: "They are Layla's shoes.", uz: "Ular Laylaning poyabzallari.", pronunciation: "Zey ar Laylaz shuz." }
    ]
  },
  10: {
    title: "May I Come In?",
    trackInfo: "2-19",
    lines: [
      { en: "May I come in?", uz: "Kirsam bo'ladimi?", pronunciation: "Mey ay kam in?" },
      { en: "Yes, you may. Thank you for knocking.", uz: "Ha, kirishingiz mumkin. Taqillatganingiz uchun rahmat.", pronunciation: "Yes, yu mey. Zenk yu for noking." },
      { en: "Come in and play!", uz: "Kiring va o'ynang!", pronunciation: "Kam in end pley!" },
      { en: "Can you please pass that game to me?", uz: "Iltimos, o'sha o'yinni menga uzatib yubora olasizmi?", pronunciation: "Ken yu pliz pes zet geym tu mi?" },
      { en: "Here you go. We're friendly!", uz: "Marhamat, oling. Biz juda ahilmiz/do'stonamiz!", pronunciation: "Xier yu gou. Uier frendli!" },
      { en: "Don't be rude. Please share your toys.", uz: "Qo'pol bo'lmang. Iltimos o'yinchoqlaringizni bo'lishing.", pronunciation: "Dont bi rud. Pliz sheir yor toyz." },
      { en: "Be thoughtful of other girls and boys!", uz: "Boshqa qizlar va o'g'il bolalarga nisbatan e'tiborli bo'ling!", pronunciation: "Bi zotful of azer gerlz end boyz!" }
    ]
  },
  11: {
    title: "The Tree",
    trackInfo: "2-27",
    lines: [
      { en: "Behind the house there is a tree.", uz: "Uyning orqasida bitta daraxt bor.", pronunciation: "Bixaynd ze xaus zer iz e tri." },
      { en: "It grows peaches just for me.", uz: "U faqat men uchun shaftolilar yetishtiradi.", pronunciation: "It grouz pichiz jast for mi." },
      { en: "Between the flowers there's a bee.", uz: "Gullar orasida ari bor.", pronunciation: "Bituiyn ze flauerz zerz e bi." },
      { en: "It flies around in front of me.", uz: "U mening oldimda aylanib uchadi.", pronunciation: "It flayz eraund in frant of mi." },
      { en: "Across from me, the eagles fly,", uz: "Mening ro'paramda burgutlar uchadi,", pronunciation: "Ekros rom mi, di iglz flay," },
      { en: "Above the ground, into the sky.", uz: "Yerdan balandroqda, osmon bag'riga.", pronunciation: "Ebav ze graund, intu ze skay." }
    ]
  },
  12: {
    title: "Where is Charlie?",
    trackInfo: "2-34",
    lines: [
      { en: "I'm looking for my cat Charlie.", uz: "Mening mushugim Charli qani, uni qidiryapman.", pronunciation: "Ay m luking for may ket Charli." },
      { en: "He ran away from me.", uz: "U mendan qochib ketdi.", pronunciation: "Xi ren euey from mi." },
      { en: "Where is my cat Charlie?", uz: "Mening mushugim Charli qayerda?", pronunciation: "Uer iz may ket Charli?" },
      { en: "Come and look with me.", uz: "Keling va men bilan birga qidiring (qarang).", pronunciation: "Kam end luk uiz mi." },
      { en: "Is he under the trash can,", uz: "U axlat qutisining tagidami,", pronunciation: "Iz xi ander ze tresh ken," },
      { en: "Between the bench and the tree?", uz: "O'rindiq va daraxtning orasidami?", pronunciation: "Bituiyn ze bench end ze tri?" },
      { en: "No, he isn't. He isn't there.", uz: "Yo'q, u yerda emas. U u yerda emas.", pronunciation: "Nou, xi iznt. Xi iznt zer." },
      { en: "Oh, where can Charlie be?", uz: "Oh, Charli qayerda bo'lishi mumkin?", pronunciation: "Ou, uer ken Charli bi?" },
      { en: "Is he over there in the fountain,", uz: "Anavi yerda fantandami,", pronunciation: "Iz xi ouver zer in ze fauntin," },
      { en: "Across from the big statue?", uz: "Katta haykalning ro'parasidami?", pronunciation: "Ekros from ze big stetyu?" },
      { en: "Yes, he is! Poor Charlie!", uz: "Ha, o'sha yerda! Bechora Charli!", pronunciation: "Yes, xi iz! Pur Charli!" },
      { en: "I'm here to rescue you!", uz: "Seni qutqarish uchun keldim!", pronunciation: "Aym xier tu reskyu yu!" }
    ]
  },
  13: {
    title: "Music Day!",
    trackInfo: "2-42",
    lines: [
      { en: "In the morning when Gus gets ready for school,", uz: "Ertalab, Gus maktabga tayyorlanayotganda,", pronunciation: "In ze morning uen Gas gets redi for skul," },
      { en: "He likes fast music... it's so cool!", uz: "U tezkor musiqani yaxshi ko'radi, bu juda zo'r!", pronunciation: "Its so kul!" },
      { en: "He likes guitars and drums the best,", uz: "U gitaralar va barabanlarni eng ko'p yaxshi ko'radi,", pronunciation: "Xi layks gitarz end dramz ze best," },
      { en: "While he brushes his teeth and gets dressed!", uz: "Tishlarini yuvib, kiyinayotgan vaqtida!", pronunciation: "Uayl xi brashiz xiz tiz end gets drest!" },
      { en: "On Monday he goes to school with friends.", uz: "Dushanba kuni u do'stlari bilan maktabga boradi.", pronunciation: "On Mandey xi gouz tu skul uiz frendz." },
      { en: "In music class, he plays instruments.", uz: "Musiqa darsida, u cholg'u asboblarini chaladi.", pronunciation: "In myuzik kles, xi pleyz instruments." },
      { en: "The high flute notes sound like birds in a tree,", uz: "Fleytaning baland notalari daraxtdagi qushlar kabi eshitiladi,", pronunciation: "Ze xay flut nouts saund layk berdz in e tri," },
      { en: "The low trombone, like whales in the sea!", uz: "Trombonning past ovozi esa dengizdagi kitlar kabi!", pronunciation: "Ze lou trombone, layk ueylz in ze si!" },
      { en: "He doesn't listen to loud music at night.", uz: "U tunda baland musiqani tinglamaydi.", pronunciation: "Xi daznt lisn tu laud myuzik et nayt." },
      { en: "He listens to music that's soft and light,", uz: "U mayin va mayda musiqani tinglaydi,", pronunciation: "Xi lisnz tu myuzik zets soft end layt," },
      { en: "Like the violin, when he rests his head,", uz: "Xuddi skripka kabi - u charchaganida va,", pronunciation: "Layk ze vaiolin, uen xi rests xiz xed," },
      { en: "Closes his eyes and goes to bed.", uz: "Ko'zlarini yumib uxlashga yotganda.", pronunciation: "Klousiz xiz ayz end gouz tu bed." }
    ]
  },
  14: {
    title: "The Concert",
    trackInfo: "3-04",
    lines: [
      { en: "Gus plays lots of instruments.", uz: "Gus juda ko'p cholg'u asboblarini chaladi.", pronunciation: "Gas pleyz lots of instruments." },
      { en: "He practices each day.", uz: "U har kuni mashq qiladi.", pronunciation: "Xi prektisiz ich dey." },
      { en: "He makes amazing music.", uz: "U ajoyib musiqa yaratadi.", pronunciation: "Xi meyks emeyzing myuzik." },
      { en: "It's great to hear him play!", uz: "Uning chalishini eshitish naqadar ajoyib!", pronunciation: "Its greyt tu xier xim pley!" },
      { en: "Last week Gus played the cymbals.", uz: "O'tgan hafta Gus likobchalarni chaldi.", pronunciation: "Lest uik Gas pleyd ze simbalz." },
      { en: "And then played the guitar.", uz: "Va keyin gitara chaldi.", pronunciation: "End zen pleyd ze gitar." },
      { en: "Yesterday he played the trumpet.", uz: "Kecha u trubani chaldi.", pronunciation: "Yesterdey xi pleyd ze trampet." },
      { en: "His friends think he's a star.", uz: "Do'stlari uni yulduz deb hisoblaydilar.", pronunciation: "Xiz frendz zink xiz e star." },
      { en: "Last night he played the piano.", uz: "Kecha tunda u pianino chaldi.", pronunciation: "Lest nayt xi pleyd ze piano." },
      { en: "And then played the drum.", uz: "Va keyin baraban chaldi.", pronunciation: "End zen pleyd ze dram." },
      { en: "This morning he played the tambourine.", uz: "Bugun ertalab u tamburin chaldi.", pronunciation: "Zis morning xi pleyd ze temburin." },
      { en: "He had a lot of fun.", uz: "U juda ko'p xursand bo'ldi.", pronunciation: "Xi xed e lot of fan." }
    ]
  },
  15: {
    title: "The Horse, the Tortoise, and Me",
    trackInfo: "3-12",
    lines: [
      { en: "A horse is faster than a tortoise,", uz: "Ot toshbaqadan ko'ra tezroqdir,", pronunciation: "E xors iz fester zen e tortos," },
      { en: "And a horse is faster than me.", uz: "Va ot mendan ko'ra tezroqdir.", pronunciation: "End e xors iz fester zen mi." },
      { en: "I'm slower than a horse,", uz: "Men otdan ko'ra sekinroqman,", pronunciation: "Aym slouer zen e xors," },
      { en: "So what is slower than me?", uz: "Mendan ko'ra sekinroq nima bor?", pronunciation: "Sou uot iz slouer zen mi?" },
      { en: "A horse is bigger than a tortoise,", uz: "Ot toshbaqadan ko'ra kattaroqdir,", pronunciation: "E xors iz biger zen e tortos," },
      { en: "And a horse is bigger than me.", uz: "Va ot mendan ko'ra kattaroqdir.", pronunciation: "End e xors iz biger zen mi." },
      { en: "I'm smaller than a horse,", uz: "Men otdan ko'ra kichikroqman,", pronunciation: "Aym smoler zen e xors," },
      { en: "So, what is smaller than me?", uz: "Mendan ko'ra kichikroq nima bor?", pronunciation: "Sou, uot iz smoler zen mi?" },
      { en: "A horse is heavier than a tortoise,", uz: "Ot toshbaqadan ko'ra og'irroqdir,", pronunciation: "E xors iz xevier zen e tortos," },
      { en: "And a horse is heavier than me.", uz: "Va ot mendan ko'ra og'irroqdir.", pronunciation: "End e xors iz xevier zen mi." },
      { en: "I'm lighter than a horse,", uz: "Men otdan ko'ra yengilroqman,", pronunciation: "Aym layter zen e xors," },
      { en: "So what is lighter than me?", uz: "Mendan ko'ra yengilroq nima bor?", pronunciation: "Sou uot iz layter zen mi?" }
    ]
  },
  16: {
    title: "Two Brother Goats",
    trackInfo: "3-19",
    lines: [
      { en: "Two brother goats lived high in the mountains.", uz: "Ikki aka-uka echki tog'larda balandda yashashar edi.", pronunciation: "Tu brazer gouts livd xay in ze mauntinz." },
      { en: "Whose voice was the best?", uz: "Kimning ovozi eng zo'r edi?", pronunciation: "Xuz voys uoz ze best?" },
      { en: "Each goat tried to shout the loudest,", uz: "Har bir echki eng baland ovozda baqirishga harakat qilardi,", pronunciation: "Ich gout trayd tu shaut ze laudest," },
      { en: "Louder than all the rest.", uz: "Qolgan barchadan ko'ra balandroq.", pronunciation: "Lauder zen ol ze rest." },
      { en: "Yo da lay hee hoo, yo da lay hey hoo!", uz: "Yo da ley xi xu, yo da ley xey xu!", pronunciation: "Yo da ley xi xu, yo da ley xey xu!" },
      { en: "Shouted one brother.", uz: "Baqirdi bir aka.", pronunciation: "Shauted uan brazer." },
      { en: "Yo da lay hee hoo, yo da lay hey hoo!", uz: "Yo da ley xi xu, yo da ley xey xu!", pronunciation: "Yo da ley xi xu, yo da ley xey xu!" },
      { en: "Shouted the other.", uz: "Baqirdi ikkinchisi.", pronunciation: "Shauted zi azer." },
      { en: "You're the quietest goat! I'm the loudest goat!", uz: "Sen eng jimtaloq echkisan! Men eng baland ovozli echkiman!", pronunciation: "Yur ze kuayetest gout! Aym ze laudest gout!" },
      { en: "Shouted one brother.", uz: "Baqirdi bir aka.", pronunciation: "Shauted uan brazer." },
      { en: "I'm the loudest goat! You're the quietest goat!", uz: "Men eng baland ovozli echkiman! Sen eng jimtaloq echkisan!", pronunciation: "Aym ze laudest gout! Yur ze kuayetest gout!" },
      { en: "Shouted the other.", uz: "Baqirdi ikkinchisi.", pronunciation: "Shauted zi azer." }
    ]
  },
  17: {
    title: "Triangles",
    trackInfo: "3-27",
    lines: [
      { en: "Your collage has green triangles,", uz: "Sening kollajingda yashil uchburchaklar bor,", pronunciation: "Yor kolaj xez grin trayenglz," },
      { en: "And yellow, orange, and blue.", uz: "Va sariq, olovrang hamda ko'k ranglar.", pronunciation: "End yelou, orinj, end blu." },
      { en: "It has a pattern like a star,", uz: "Unda yulduzsimon naqsh bor,", pronunciation: "It xez e petern layk e star," },
      { en: "And it has some stickers too.", uz: "Va unda bir qancha stikerlar ham bor.", pronunciation: "End it xez sam stikerz tu." },
      { en: "There is a lot of pasta,", uz: "U yerda makaron (pasta) ko'p,", pronunciation: "Zer iz e lot of pasta," },
      { en: "And a lot of paper there.", uz: "Va u yerda qog'oz ham juda bisyor.", pronunciation: "End e lot of peyper zer." },
      { en: "But there aren't any spirals,", uz: "Lekin hech qanday spirallar yo'q,", pronunciation: "Bat zer arnt eni spiralz," },
      { en: "Not a crescent, not a square.", uz: "Yarim oy ham, kvadrat ham yo'q.", pronunciation: "Not e kresent, not e skuayer." },
      { en: "The triangles in your art work", uz: "Sening san'at asaringdagi uchburchaklar", pronunciation: "Ze trayenglz in yor art uerk" },
      { en: "Are big and tall and small.", uz: "Katta, baland va kichkinadir.", pronunciation: "Ar big end tol end smol." },
      { en: "But don't look for any ovals,", uz: "Lekin ovallarni qidirmang,", pronunciation: "Bat dont luk for eni ouvalz," },
      { en: "That shape isn't there at all!", uz: "U yerda bu shakl umuman yo'qdir!", pronunciation: "Zet sheyp iznt zer et ol!" }
    ]
  },
  18: {
    title: "The Golden Crane",
    trackInfo: "3-35",
    lines: [
      { en: "Take some shiny golden paper,", uz: "Yaltiroq tillarang qog'oz oling,", pronunciation: "Teyk sam shayni golden peyper," },
      { en: "Fold the corners very carefully.", uz: "Burchaklarini juda ehtiyotlik bilan buklang.", pronunciation: "Fold ze kornerz veri kerfuli." },
      { en: "Crumple up the paper waves,", uz: "Qog'oz to'lqinlarni g'ijimlang,", pronunciation: "Krampl ap ze peyper ueyvz," },
      { en: "Watch them splash so beautifully.", uz: "Ularning go'zal sachrashini tomosha qiling.", pronunciation: "Uoch zem splesh sou byutifuli." },
      { en: "Make a crane and quiet seal,", uz: "Turna va tinch tyulenni yasang,", pronunciation: "Meyk e kreyn end kuayet sil." },
      { en: "Press the edges down so easily.", uz: "Qirralarini osongina bosing.", pronunciation: "Pres ze edjiz daun sou izili." },
      { en: "Climb the mountains of your art,", uz: "San'atingiz tog'lariga tirmashing,", pronunciation: "Klaym ze mauntinz of yor art," },
      { en: "Play together very happily!", uz: "Birgalikda juda baxtiyor o'ynang!", pronunciation: "Pley togizer veri xepili!" }
    ]
  }
};

// Decorate the existing units with their respective songs dynamically
OXFORD_UNITS.forEach((unit) => {
  if (UNIT_SONGS[unit.number]) {
    unit.song = UNIT_SONGS[unit.number];
  }
});

