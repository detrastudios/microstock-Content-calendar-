import { EventItem } from "../types";

export interface DetailedAssetRecommendation {
  photo: string[];
  vector: string[];
  video: string[];
  palette?: { name: string; hex: string }[];
  keywords?: { en: string[]; id?: string[] };
  tips?: string;
  ipNote?: string;
  visualTheme?: string;
}

// Master dictionary of detailed asset recommendations for all known events
export const SPECIFIC_EVENT_ASSET_REPOSITORY: Record<string, DetailedAssetRecommendation> = {
  // --- RELIGIOUS & CULTURAL HOLIDAYS ---
  "ash-wednesday": {
    photo: [
      "📸 Jemaat gereja menerima usapan abu berbentuk salib di dahi dari pastor/pendeta saat misa Rabu Abu.",
      "📸 Close-up rosario kayu di atas Alkitab terbuka dengan latar belakang lilin doa gereja yang hangat.",
      "📸 Tangan menggenggam salib kayu dengan abu halus dan latar belakang suasana doa chapel yang tenang."
    ],
    vector: [
      "🎨 Siluet salib abu dengan teks 'Ash Wednesday - Season of Lent' dan ornamen daun palma kering.",
      "🎨 Template flyer & poster ibadah Rabu Abu dan Masa Prapaskah dengan desain minimalis elegan.",
      "🎨 Set ikon vektor keagamaan Kristen: salib abu, Alkitab, cangkul/daun palma, dan lilin altar."
    ],
    video: [
      "🎬 Close-up usapan abu berbentuk salib di dahi jemaat dengan efek slow-motion 60fps.",
      "🎬 Motion graphics teks 'Ash Wednesday' dengan partikel abu melayang dan cahaya lilin meliuk.",
      "🎬 B-roll suasana tenang ruang doa gereja dengan cahaya matahari menembus kaca patri (stained glass)."
    ],
    palette: [
      { name: "Charcoal Ash", hex: "#334155" },
      { name: "Penitent Purple", hex: "#581C87" },
      { name: "Sacred Gold", hex: "#CA8A04" },
      { name: "Altar White", hex: "#F8FAFC" }
    ],
    keywords: {
      en: ["ash wednesday", "lent season", "christian cross", "church prayer", "ash cross forehead", "catholic ritual", "holy bible", "palm ashes", "prapaskah"],
      id: ["rabu abu", "masa prapaskah", "ibadah rabu abu", "salib abu", "alkitab dan rosario", "gereja katolik", "gereja protestan"]
    },
    tips: "Pasar penerbitan Kristen dan gereja global aktif berbelanja 2-3 bulan sebelum Prapaskah. Fokus pada ekspresi doa yang khusyuk dan komposisi dengan copy space untuk teks jadwal ibadah.",
    ipNote: "Sangat Aman: Simbol keagamaan umum tanpa elemen merek dagang.",
    visualTheme: "Ketenangan spiritual, abu palma, salib kayu, suasana khusyuk doa prapaskah."
  },

  "mardi-gras": {
    photo: [
      "📸 Model mengenakan topeng pesta Mardi Gras dengan hiasan bulu warna ungu-emas-hijau dan kalung manik-manik.",
      "📸 Close-up kalung manik-manik (beads) warna-warni dan terompet brass di atas meja kayu pesta.",
      "📸 Suasana parade pesta karnaval dengan hujan konfeti ceria dan penonton bersuka cita."
    ],
    vector: [
      "🎨 Topeng Mardi Gras ornamen kaya warna ungu (#7E22CE), emas (#EAB308), dan hijau (#15803D).",
      "🎨 Banner & poster 'Mardi Gras Carnival Celebration' dengan pita meliuk dan motif fleur-de-lis.",
      "🎨 Pattern seamless manik-manik, topeng, dan mahkota karnaval New Orleans."
    ],
    video: [
      "🎬 Motion graphics topeng Mardi Gras 3D berputar dengan hujan konfeti berkilau.",
      "🎬 Loop background animasi pesta karnaval dengan partikel emas dan pita bergerak dinamis.",
      "🎬 B-roll atraksi musisi jalanan memainkan musik jazz dengan terompet emas."
    ],
    palette: [
      { name: "Royal Purple", hex: "#7E22CE" },
      { name: "Mardi Gold", hex: "#EAB308" },
      { name: "Festive Green", hex: "#15803D" },
      { name: "Midnight Navy", hex: "#0F172A" }
    ],
    keywords: {
      en: ["mardi gras", "carnival mask", "new orleans", "purple green gold", "beads necklace", "party celebration", "masquerade", "carnival parade"],
      id: ["pesta mardi gras", "karnaval topeng", "topeng pesta", "karnaval new orleans"]
    },
    tips: "Perpaduan warna khas (Ungu, Emas, Hijau) adalah identitas mutlak Mardi Gras. Buatlah template flyer pesta bar dan klub malam.",
    ipNote: "Aman: Gunakan desain topeng generik tanpa ciptaan merek tertentu."
  },

  "good-friday": {
    photo: [
      "📸 Salib kayu berdiri di atas bukit dengan pencahayaan matahari terbenam siluet yang syahdu.",
      "📸 Close-up mahkota duri (crown of thorns) dan tiga paku besi tua di atas kain linen putih.",
      "📸 Cawan anggur perjamuan kudus dan roti tawar yang dipecah di atas meja kayu."
    ],
    vector: [
      "🎨 Siluet tiga salib di atas bukit Golgota dengan sinar cahaya keemasan menembus awan.",
      "🎨 Banner & poster 'Good Friday - Jumat Agung' dengan tipografi sakral dan ornamen mahkota duri.",
      "🎨 Ilustrasi vektor mahkota duri, cawan perjamuan, dan kitab suci."
    ],
    video: [
      "🎬 Sinar matahari menembus awan menyinari salib kayu di atas bukit dalam bentuk timelapse.",
      "🎬 Motion graphics tulisan 'Good Friday' dengan latar belakang asap lembut dan cahaya keemasan.",
      "🎬 B-roll cawan anggur dan roti perjamuan dengan latar gereja syahdu."
    ],
    palette: [
      { name: "Passion Crimson", hex: "#991B1B" },
      { name: "Calvary Brown", hex: "#78350F" },
      { name: "Sacred Gold", hex: "#CA8A04" },
      { name: "Silent Purple", hex: "#581C87" }
    ],
    keywords: {
      en: ["good friday", "holy friday", "jesus cross", "crown of thorns", "golgotha", "communion cup", "easter week", "crucifixion"],
      id: ["jumat agung", "wafat yesus kristus", "salib golgotha", "mahkota duri", "perjamuan kudus", "paskah"]
    },
    tips: "Desain dengan nuansa kontemplatif dan sakral sangat diminati oleh gereja dan organisasi nirlaba naskah agama.",
    ipNote: "Sangat Aman."
  },

  "easter-sunday": {
    photo: [
      "📸 Telur Paskah berhias warna-warni pastel di dalam keranjang rumput hijau bersama kelinci imut.",
      "📸 Anak-anak berburu telur Paskah (Easter egg hunt) di halaman rumah yang asri dengan tawa gembira.",
      "📸 Sajian roti hot cross buns hangat bertabur kismis dan siluet salib Paskah di pagi hari."
    ],
    vector: [
      "🎨 Set ilustrasi telur Paskah 3D dengan berbagai pola dekoratif pastel (polkadot, garis, bunga).",
      "🎨 Banner 'Happy Easter Day' dengan karakter kelinci Paskah (Easter Bunny) dan bunga sakura.",
      "🎨 Pattern seamless telur paskah dan kelinci imut untuk kertas kado dan packaging hampers."
    ],
    video: [
      "🎬 Motion loop telur Paskah 3D berputar dan terbuka memancarkan bunga-bunga mekar.",
      "🎬 Animasi kelinci Paskah kartun melompat gembira membawa keranjang telur.",
      "🎬 B-roll anak-anak menemukan telur Paskah tersembunyi di sela tanaman kebun."
    ],
    palette: [
      { name: "Pastel Pink", hex: "#F472B6" },
      { name: "Easter Yellow", hex: "#FDE047" },
      { name: "Sky Cyan", hex: "#38BDF8" },
      { name: "Fresh Mint", hex: "#4ADE80" }
    ],
    keywords: {
      en: ["easter sunday", "easter eggs", "easter bunny", "egg hunt", "happy easter", "spring easter", "resurrection cross", "pastel eggs"],
      id: ["hari paskah", "paskah2026", "telur paskah", "kelinci paskah", "berburu telur paskah", "kebangkitan yesus"]
    },
    tips: "Dua fokus pasar: Pasar komersial keluarga (telur & kelinci pastel) dan pasar keagamaan (salib kebangkitan & fajar pagi).",
    ipNote: "Aman."
  },

  "isra-miraj": {
    photo: [
      "📸 Megahnya arsitektur kubah masjid berpendar cahaya emas di malam hari.",
      "📸 Al-Qur'an terbuka di atas rekal kayu berukir disamping tasbih kayu dan lampu lentera Arab.",
      "📸 Suasana jemaat muslim berdoa khusyuk di dalam ruang utama masjid yang lapang."
    ],
    vector: [
      "🎨 Kaligrafi Arab 'Isra Miraj Nabi Muhammad SAW' berornamen arsitektur kubah masjid dan bintang.",
      "🎨 Banner ucapan Isra Miraj dengan nuansa warna hijau islami, biru malam, dan garis emas mewah.",
      "🎨 Set elemen vektor islami: Tangga cahaya, kubah masjid, bulan sabit, dan lentera Arab 3D."
    ],
    video: [
      "🎬 Motion graphics kaligrafi Isra Miraj dengan efek partikel emas berkilau di langit malam.",
      "🎬 Timelapse kubah dan menara masjid berhias lampu malam hari diiringi awan bergerak.",
      "🎬 Loop animasi 3D bulan sabit emas melayang anggun di atas kubah masjid."
    ],
    palette: [
      { name: "Islamic Emerald", hex: "#047857" },
      { name: "Midnight Royal", hex: "#1E3A8A" },
      { name: "Golden Glow", hex: "#F59E0B" },
      { name: "Pearl Ivory", hex: "#FAFAF9" }
    ],
    keywords: {
      en: ["isra miraj", "prophet muhammad", "islamic holiday", "mosque dome", "arabic calligraphy", "crescent moon", "quran book", "prayer beads"],
      id: ["isra mikraj", "isra miraj", "perjalanan nabi muhammad", "masjid agung", "kaligrafi arab", "peringatan hari besar islam"]
    },
    tips: "Aset sangat laris untuk banner instansi pemerintah, BUMN, sekolah, dan feeds media sosial media massa di Indonesia.",
    ipNote: "Aman."
  },

  "nyepi": {
    photo: [
      "📸 Arak-arakan patung Ogoh-ogoh raksasa dengan obor membara saat malam Pengerupukan sebelum Nyepi.",
      "📸 Sesaji Canang Sari khas Bali berhias bunga kamboja segar dan dupa wangi di atas kain poleng.",
      "📸 Keheningan Candi Bentar (Pura Bali) berlatar langit biru bersih tanpa polusi udara."
    ],
    vector: [
      "🎨 Ilustrasi vektor ekspresif Ogoh-ogoh Bali dengan ornaments ukiran emas dan detail tajam.",
      "🎨 Banner ucapan 'Selamat Hari Raya Nyepi & Tahun Baru Saka' dengan ilustrasi Candi Bentar.",
      "🎨 Set vektor budaya Bali: Penjor, Tedung payung Bali, Canang Sari, dan motif ukiran Bali."
    ],
    video: [
      "🎬 Api obor membara menyinari rupa Ogoh-ogoh dalam parade pengerupukan malam hari.",
      "🎬 Timelapse awan melintas di atas gapura Candi Bentar Bali dalam suasana hening.",
      "🎬 Motion graphics ucapan Nyepi dengan efek asap dupa dan bunga kamboja berguguran."
    ],
    palette: [
      { name: "Balinese Red", hex: "#B91C1C" },
      { name: "Sacred Yellow", hex: "#EAB308" },
      { name: "Poleng Black", hex: "#18181B" },
      { name: "Frangipani White", hex: "#FAFAF9" }
    ],
    keywords: {
      en: ["nyepi day", "bali silent day", "ogoh ogoh", "candi bentar", "canang sari", "saka new year", "balinese culture", "hindu festival"],
      id: ["hari raya nyepi", "tahun baru saka", "ogoh ogoh bali", "pengerupukan", "pura bali", "canang sari", "hening nyepi"]
    },
    tips: "Aset Ogoh-ogoh & Candi Bentar Bali sangat dicari oleh media berita, agen travel, dan dinas pariwisata.",
    ipNote: "Aman."
  },

  "imlek": {
    photo: [
      "📸 Atraksi Barongsai (Lion Dance) merah-emas melompat atraktif diiringi sorak sorai penonton.",
      "📸 Amplop Angpao merah emas berhias koin keberuntungan dan buah jeruk mandarin segar.",
      "📸 Suasana hangat keluarga Tionghoa berkumpul makan malam perayaan Imlek bersama."
    ],
    vector: [
      "🎨 Ilustrasi vektor Naga / Shio Emas Imlek dengan ornamen awan tradisional dan lampion merah.",
      "🎨 Template banner & flyer 'Gong Xi Fa Cai / Happy Chinese New Year' berlatar merah emas mewah.",
      "🎨 Set 3D PNG transparan: Angpao, Lampion Merah, Jeruk Mandarin, Koin Emas, dan Barongsai."
    ],
    video: [
      "🎬 Motion graphics angpao merah dan koin emas 3D berjatuhan dalam latar merah berkilau.",
      "🎬 Loop animasi lampion merah bergoyang lembut ditiup angin malam dengan cahaya hangat.",
      "🎬 B-roll atraksi pertunjukan barongsai mengambil amplop angpao dari dekat."
    ],
    palette: [
      { name: "Imperial Red", hex: "#DC2626" },
      { name: "Prosperity Gold", hex: "#FACC15" },
      { name: "Jade Green", hex: "#059669" },
      { name: "Charcoal Black", hex: "#000000" }
    ],
    keywords: {
      en: ["chinese new year", "lunar new year", "gong xi fa cai", "red lantern", "lion dance barongsai", "angpao red envelope", "chinese dragon"],
      id: ["tahun baru imlek", "gong xi fa cai", "angpao imlek", "barongsai", "lampion merah", "imlek2026", "shio imlek"]
    },
    tips: "Desain dengan elemen 3D renders (Angpao 3D, Lampion 3D) memiliki conversion rate download sangat tinggi di Freepik & Adobe Stock.",
    ipNote: "Aman."
  },

  "idul-fitri": {
    photo: [
      "📸 Momen hangat keluarga Indonesia bersungkeman meminta maaf berbusana muslim/mukenah putih.",
      "📸 Hidangan khas Lebaran: Ketupat janur kuning, Opor Ayam gurih, dan Sambal Goreng Ati.",
      "📸 Sajian kue kering Lebaran (Nastar, Kastengel, Putri Salju) di toples kaca berhias pita emas."
    ],
    vector: [
      "🎨 Vektor 3D Ketupat janur hijau emas berpadu kaligrafi 'Selamat Hari Raya Idul Fitri 1447 H'.",
      "🎨 Template banner & Instagram Feeds ucapan Lebaran dengan ornamen kubah masjid arabesque.",
      "🎨 Set ikon 3D PNG transparan: Ketupat, Bedug masjid, Amplop THR, Sajadah, dan Tasbih."
    ],
    video: [
      "🎬 Motion graphics ketupat 3D mekar bercahaya dengan partikel emas dan teks 'Eid Mubarak'.",
      "🎬 B-roll anak-anak gembira menerima amplop THR dari orang tua saat hari raya.",
      "🎬 Loop animasi bedug dipukul dengan latar bulan sabit emas dan bintang di langit malam."
    ],
    palette: [
      { name: "Ketupat Green", hex: "#16A34A" },
      { name: "Royal Gold", hex: "#EAB308" },
      { name: "Crescent Yellow", hex: "#FDE047" },
      { name: "Pure White", hex: "#FFFFFF" }
    ],
    keywords: {
      en: ["eid al fitr", "idul fitri", "ketupat", "lebaran indonesia", "eid mubarak", "muslim family", "nastar cake", "mudik lebaran", "thr envelope"],
      id: ["hari raya idul fitri", "lebaran2026", "ketupat lebaran", "kue nastar", "amplop thr", "sungkeman lebaran", "mudik lebaran"]
    },
    tips: "Sangat tinggi demand di Indonesia & Asia Tenggara. Buat template desain banner ucapan korporat dan promosi diskon baju muslim.",
    ipNote: "Aman."
  },

  "idul-adha": {
    photo: [
      "📸 Sapi dan kambing qurban yang sehat dan terawat di peternakan siap untuk hari raya.",
      "📸 Panitia qurban menimbang dan membagikan paket daging qurban ramah lingkungan kepada warga.",
      "📸 Suasana salat Idul Adha di lapangan terbuka berlatar pemandangan pagi nan tenang."
    ],
    vector: [
      "🎨 Siluet kambing dan sapi qurban dengan latar belakang kubah masjid dan kaligrafi Idul Adha.",
      "🎨 Banner & poster ucapan 'Selamat Hari Raya Idul Adha / Eid al-Adha Mubarak'.",
      "🎨 Set ikon vektor hewan qurban, pisau sembelih halal, dan timbangan daging."
    ],
    video: [
      "🎬 B-roll kawanan hewan qurban di padang rumput hijau yang asri.",
      "🎬 Motion graphics kaligrafi Idul Adha dengan animasi partikel cahaya dan bunga islami.",
      "🎬 Loop 3D hewan qurban kartun imut dengan teks ucapan selamat."
    ],
    palette: [
      { name: "Emerald Green", hex: "#059669" },
      { name: "Earth Brown", hex: "#78350F" },
      { name: "Sunset Gold", hex: "#D97706" },
      { name: "Sky Blue", hex: "#38BDF8" }
    ],
    keywords: {
      en: ["eid al adha", "idul adha", "qurban sheep", "sacrificial animal", "eid mubarak", "islamic pilgrimage", "mecca kaaba"],
      id: ["hari raya idul adha", "qurban sapi kambing", "ibadah qurban", "daging qurban", "idul adha 2026"]
    },
    tips: "Tampilkan foto hewan qurban yang bersih, sehat, dan manusiawi di peternakan hijau.",
    ipNote: "Aman."
  },

  "hari-kartini": {
    photo: [
      "📸 Wanita Indonesia & anak-anak sekolah mengenakan busana Kebaya tradisional yang anggun.",
      "📸 Potret anggun wanita berkebaya memegang buku tulisan R.A. Kartini 'Habis Gelap Terbitlah Terang'.",
      "📸 Siswi SD/TK berparade mengenakan pakaian adat Nusantara dalam rangka memperingati Hari Kartini."
    ],
    vector: [
      "🎨 Ilustrasi vektor wajah anggun R.A. Kartini berhias motif batik dan bunga melati putih.",
      "🎨 Template poster feeds Instagram 'Selamat Hari Kartini - Emansipasi Wanita Indonesia'.",
      "🎨 Set elemen vektor kebaya, sanggul Jawa, selendang batik, dan pen perunggu."
    ],
    video: [
      "🎬 B-roll wanita berkebaya berjalan anggun nan percaya diri di area modern.",
      "🎬 Motion graphics teks ucapan Hari Kartini dengan latar kelopak melati bermekaran.",
      "🎬 Animasi menggambar ilustrasi wajah Kartini dari garis awal hingga berwarna."
    ],
    palette: [
      { name: "Kebaya Rose", hex: "#E11D48" },
      { name: "Heritage Gold", hex: "#CA8A04" },
      { name: "Jasmine White", hex: "#FAFAF9" },
      { name: "Batik Brown", hex: "#78350F" }
    ],
    keywords: {
      en: ["hari kartini", "ra kartini", "indonesian kebaya", "women empowerment indonesia", "indonesian traditional dress", "kartini day"],
      id: ["hari kartini", "ra kartini", "kebaya indonesia", "emansipasi wanita", "pakaian adat indonesia", "habis gelap terbitlah terang"]
    },
    tips: "Desain poster ucapan Hari Kartini sangat dicari sekolah, instansi pemerintah, BUMN, dan brand kosmetik/fashion wanita.",
    ipNote: "Aman."
  },

  "hardiknas": {
    photo: [
      "📸 Anak-anak sekolah SD/SMP/SMA berbusana seragam rapi sedang belajar aktif di ruang kelas.",
      "📸 Sosok guru membimbing murid membaca buku perpustakaan dengan senyum ramah.",
      "📸 Siswa-siswi menaikkan bendera Merah Putih pada upacara Hari Pendidikan Nasional."
    ],
    vector: [
      "🎨 Logo Tut Wuri Handayani & pahlawan Ki Hajar Dewantara dalam gaya vektor modern.",
      "🎨 Poster Hari Pendidikan Nasional 'Hardiknas' berhias ornamen buku, wisuda, dan pensil.",
      "🎨 Set ikon 3D education: Topi Toga, Buku Terbuka, Globe, Pensil, dan Trofi Prestasi."
    ],
    video: [
      "🎬 B-roll anak-anak sekolah berlari kegirangan di halaman sekolah saat jam istirahat.",
      "🎬 Motion graphics slogan Tut Wuri Handayani dengan efek pensil menggambar.",
      "🎬 Loop animasi 3D buku terbuka mengeluarkan simbol matematika dan ilmu pengetahuan."
    ],
    palette: [
      { name: "Kemendikbud Blue", hex: "#1D4ED8" },
      { name: "Flame Red", hex: "#DC2626" },
      { name: "Education Gold", hex: "#FACC15" },
      { name: "Bright White", hex: "#FFFFFF" }
    ],
    keywords: {
      en: ["hardiknas", "indonesian education day", "ki hajar dewatara", "tut wuri handayani", "indonesian students", "school classroom asia"],
      id: ["hardiknas", "hari pendidikan nasional", "ki hajar dewatara", "tut wuri handayani", "seragam sekolah", "pendidikan indonesia"]
    },
    tips: "Fokus pada keceriaan belajar dan teknologi sekolah modern.",
    ipNote: "Aman."
  },

  "hari-pahlawan": {
    photo: [
      "📸 Veteran perang Indonesia mengenakan peci dan tanda jasa berdiri penuh khidmat.",
      "📸 Bambu runcing berikat bendera Merah Putih di depan monumen Tugu Pahlawan / Monas.",
      "📸 Generasi muda mengheningkan cipta pada upacara ziarah di Taman Makam Pahlawan."
    ],
    vector: [
      "🎨 Ilustrasi pejuang 45 menggenggam bambu runcing dengan latar bendera Merah Putih membara.",
      "🎨 Banner & poster 'Selamat Hari Pahlawan 10 November - Pahlawanku Teladanku'.",
      "🎨 Siluet pejuang kemerdekaan Indonesia dan siluet Garuda Pancasila."
    ],
    video: [
      "🎬 Bendera Merah Putih berkibar megah di langit biru dengan pergerakan dramatis 60fps.",
      "🎬 Motion graphics ucapan Hari Pahlawan dengan efek percikan kobaran semangat 10 November.",
      "🎬 B-roll monumen pahlawan nasional dengan pencahayaan fajar pagi."
    ],
    palette: [
      { name: "Patriotic Red", hex: "#EF4444" },
      { name: "Hero White", hex: "#FFFFFF" },
      { name: "Bamboo Green", hex: "#15803D" },
      { name: "Bronze Badge", hex: "#78350F" }
    ],
    keywords: {
      en: ["heroes day indonesia", "hari pahlawan", "10 november", "indonesian independence hero", "bamboo spear", "bung tomo"],
      id: ["hari pahlawan", "10 november", "pejuang 45", "bambu runcing", "bung tomo", "tugu pahlawan", "pahlawan nasional"]
    },
    tips: "Desain gaya siluet pejuang 45 sangat populer digunakan oleh BUMN dan kementerian.",
    ipNote: "Aman."
  },

  "hari-batik-nasional": {
    photo: [
      "📸 Pengrajin batik wanita di Jawa membatik tulis menggunakan canting dan malam panas di atas kain mori.",
      "📸 Pria dan wanita profesional Indonesia mengenakan kemeja/gaun Batik modern di kantor.",
      "📸 Flatlay keindahan berbagai motif kain Batik Nusantara (Parang, Mega Mendung, Kawung, Sekar Jagad)."
    ],
    vector: [
      "🎨 Set pola vektor seamless Batik Parang, Mega Mendung, dan Kawung dengan resolusi tinggi.",
      "🎨 Poster Hari Batik Nasional dengan ornamen canting batik dan motif kain tradisional.",
      "🎨 Frame & border batik elegan untuk sertifikat, piagam, dan undangan resmi."
    ],
    video: [
      "🎬 Close-up canting meneteskan lilin malam panas di atas pola kain batik tulis.",
      "🎬 Motion loop pola batik Mega Mendung bergerak mengalir dengan efek cahaya keemasan.",
      "🎬 B-roll peragaan busana fashion batik modern di atas catwalk."
    ],
    palette: [
      { name: "Sogan Brown", hex: "#78350F" },
      { name: "Indigo Blue", hex: "#1E3A8A" },
      { name: "Batik Gold", hex: "#CA8A04" },
      { name: "Mori Cream", hex: "#FEF3C7" }
    ],
    keywords: {
      en: ["batik indonesia", "batik pattern", "canting batik", "batik mega mendung", "traditional textile asia", "unesco heritage batik"],
      id: ["hari batik nasional", "batik indonesia", "batik tulis", "canting batik", "batik parang", "batik mega mendung", "kain batik"]
    },
    tips: "Pola vektor batik seamless (.EPS) sangat dicari sepanjang tahun oleh desainer grafis dan usaha konveksi.",
    ipNote: "Aman. Warisan budaya UNESCO."
  },

  "halloween": {
    photo: [
      "📸 Labu Halloween ukir (Jack-o'-lanterns) menyala hangat di tangga teras rumah berhantu.",
      "📸 Anak-anak memakai kostum penyihir, hantu imut, dan pahlawan super memegang keranjang 'Trick or Treat'.",
      "📸 Kue mangkok (cupcakes) dan permen bertema Halloween dengan dekorasi mata dan sarang laba-laba."
    ],
    vector: [
      "🎨 Ilustrasi hantu imut, kelelawar, laba-laba, dan labu senyum lucu untuk anak-anak.",
      "🎨 Banner 'Happy Halloween Party' gaya neon hantu dan rumah tua seram.",
      "🎨 Pattern seamless labu Halloween, topi penyihir, dan kucing hitam."
    ],
    video: [
      "🎬 Motion loop labu Jack-o'-lantern 3D tertawa dengan asap menyeramkan keluar dari matanya.",
      "🎬 Animasi hantu kartun melayang ceria mengitari teks 'Trick or Treat'.",
      "🎬 B-roll lilin menyala di dalam labu ukir saat malam gelap."
    ],
    palette: [
      { name: "Pumpkin Orange", hex: "#EA580C" },
      { name: "Witch Purple", hex: "#7E22CE" },
      { name: "Spooky Black", hex: "#0F172A" },
      { name: "Ghost White", hex: "#F8FAFC" }
    ],
    keywords: {
      en: ["halloween", "pumpkin", "jack o lantern", "trick or treat", "spooky ghost", "witch hat", "halloween party", "scary night"],
      id: ["pesta halloween", "labu halloween", "kostum halloween", "trick or treat", "hantu halloween"]
    },
    tips: "Pasar terbagi dua: 'Scary/Seram' untuk pesta klub/dewasa, dan 'Cute/Imut' untuk acara keluarga & sekolah. Yang versi 'Cute' menjual lebih luas!",
    ipNote: "Aman. Gunakan hantu/monster generik tanpa karakter film berhak cipta (seperti Ghostface atau Freddy Krueger)."
  },

  "thanksgiving-us": {
    photo: [
      "📸 Kalkun panggang emas krispi lezat di tengah meja makan perayaan Thanksgiving keluarga.",
      "📸 Keluarga berkumpul memegang tangan berdoa dan tersenyum gembira sebelum menyantap hidangan.",
      "📸 Pai labu kuning (pumpkin pie) hangat bertabur krim kocok dan kayu manis."
    ],
    vector: [
      "🎨 Ilustrasi daun-daun musim gugur (autumn leaves), kalkun kartun imut, dan keranjang buah cornucopia.",
      "🎨 Banner ucapan 'Happy Thanksgiving' dengan garis emas dan elemen oranye hangat.",
      "🎨 Pattern seamless labu, jagung hias, dan daun maple merah."
    ],
    video: [
      "🎬 B-roll memotong kalkun panggang hangat dengan asap membumbung tipis.",
      "🎬 Motion graphics teks 'Happy Thanksgiving' berhias daun-daun gugur melayang lembut.",
      "🎬 Loop 3D kalkun imut menari dengan pai labu."
    ],
    palette: [
      { name: "Autumn Orange", hex: "#EA580C" },
      { name: "Turkey Brown", hex: "#78350F" },
      { name: "Harvest Gold", hex: "#EAB308" },
      { name: "Cranberry Red", hex: "#991B1B" }
    ],
    keywords: {
      en: ["thanksgiving day", "roast turkey", "pumpkin pie", "thanksgiving dinner", "harvest autumn", "family reunion", "happy thanksgiving", "cornucopia"],
      id: ["thanksgiving", "kalkun panggang", "pai labu", "pesta makan keluarga", "musim gugur"]
    },
    tips: "Tema kehangatan keluarga dan makanan lezat adalah kunci utama penjualan tinggi.",
    ipNote: "Aman."
  },

  "black-friday": {
    photo: [
      "📸 Pembeli membawa banyak kantong belanjaan berlogo diskon di pusat perbelanjaan modern.",
      "📸 Tangan memegang smartphone menampilkan aplikasi belanja online dengan harga coret diskon 70%.",
      "📸 Label tag harga 'Black Friday Sale' berwarna hitam-emas tergantung di produk fashion."
    ],
    vector: [
      "🎨 Spanduk & 3D Typography 'BLACK FRIDAY SALE' gaya neon 3D, emas, atau balok hitam elegan.",
      "🎨 Set badge promo: 'Up to 80% OFF', 'Special Offer', 'Limited Time', dan kupon voucher.",
      "🎨 Template feeds Instagram & Story promo belanja Black Friday gaya futuristic dark mode."
    ],
    video: [
      "🎬 Motion graphics 3D tebal 'BLACK FRIDAY' dengan kilatan cahaya emas dan partikel berkilau.",
      "🎬 Loop animasi kotak kado hitam terbalut pita emas terbuka memancarkan cahaya diskon.",
      "🎬 B-roll suasana toko dan kasir bertransaksi cepat."
    ],
    palette: [
      { name: "Midnight Black", hex: "#000000" },
      { name: "Discount Red", hex: "#DC2626" },
      { name: "Luxury Gold", hex: "#FACC15" },
      { name: "Pure White", hex: "#FFFFFF" }
    ],
    keywords: {
      en: ["black friday", "black friday sale", "shopping discount", "special offer", "big sale banner", "shopping bag", "promo offer 3d", "cyber sale"],
      id: ["black friday", "promo black friday", "diskon besar", "banner diskon", "belanja online", "cashback"]
    },
    tips: "Aset 'Black Friday' adalah salah satu momen paling menguntungkan tahunan di microstock. Buat banner 3D bertema neon/dark mode.",
    ipNote: "Aman. Frasa 'Black Friday' adalah istilah komersial umum."
  },

  "cyber-monday": {
    photo: [
      "📸 Seseorang mengetik di laptop dengan layar menampilkan banner diskon belanja gadget online.",
      "📸 Paket kado dan dus pengiriman e-commerce bertumpuk rapi di samping perangkat keyboard komputer.",
      "📸 Close-up jari menekan tombol 'BUY NOW' berkilau di atas smartphone."
    ],
    vector: [
      "🎨 Banner cyber neon 3D 'CYBER MONDAY SALE' bernuansa teknologi futuristik (cyan, magenta, hitam).",
      "🎨 Ilustrasi vektor troli belanja digital bergerak cepat memancarkan garis kecepatan data.",
      "🎨 Template flyer promo belanja teknologi, laptop, smartphone, dan gadget elektronik."
    ],
    video: [
      "🎬 Motion graphics futuristik 'Cyber Monday' dengan efek garis sirkuit digital glowing.",
      "🎬 Loop animasi troli belanja meluncur di terowongan cahaya data 3D.",
      "🎬 B-roll mengetik cepat di laptop gaming berlampu RGB."
    ],
    palette: [
      { name: "Cyber Cyan", hex: "#06B6D4" },
      { name: "Neon Magenta", hex: "#E11D48" },
      { name: "Dark Circuit", hex: "#0F172A" },
      { name: "Electric Purple", hex: "#9333EA" }
    ],
    keywords: {
      en: ["cyber monday", "cyber sale", "online shopping promo", "tech discount", "ecommerce sale", "digital promo banner", "gadget discount"],
      id: ["cyber monday", "promo belanja online", "diskon gadget", "harbolnas", "belanja elektronik"]
    },
    tips: "Gunakan estetika cyber/futuristik (Neon Cyan + Magenta) untuk membedakan dari Black Friday klasik.",
    ipNote: "Aman."
  },

  "valentine": {
    photo: [
      "📸 Pasangan kekasih romantis tersenyum bahagia saling memberi buket bunga mawar merah segar.",
      "📸 Kotak cokelat berbentuk hati terikat pita merah di atas kain sutra halus.",
      "📸 Dua cangkir kopi dengan latte art bentuk hati dan surat cinta di atas meja kayu."
    ],
    vector: [
      "🎨 Set ilustrasi balon hati 3D glossy merah dan pink yang melayang manis.",
      "🎨 Banner & poster 'Happy Valentine's Day' dengan tipografi kaligrafi romantis.",
      "🎨 Pattern seamless bunga mawar, pita merah, dan simbol hati."
    ],
    video: [
      "🎬 Motion graphics partikel hati merah 3D melayang lembut dengan latar belakang merah muda bokeh.",
      "🎬 Loop animasi kado Valentine terbuka mengeluarkan balon-balon berbentuk hati.",
      "🎬 B-roll tangan menyusun buket mawar merah segar."
    ],
    palette: [
      { name: "Passion Red", hex: "#E11D48" },
      { name: "Romantic Pink", hex: "#F472B6" },
      { name: "Rose Gold", hex: "#FDBA74" },
      { name: "Soft Cream", hex: "#FFFBEB" }
    ],
    keywords: {
      en: ["valentines day", "red roses", "chocolate box", "love hearts", "romantic couple", "romance gift", "happy valentine", "love background 3d"],
      id: ["hari valentine", "hari kasih sayang", "bunga mawar merah", "cokelat valentine", "kado romantis"]
    },
    tips: "Desain dengan elemen 3D Heart Renders (balon hati 3D glossy) sangat diminati pembeli internasional.",
    ipNote: "Aman."
  },

  "earth-day": {
    photo: [
      "📸 Tangan manusia menggenggam tanah subur berisis bibit tanaman hijau muda yang baru tumbuh.",
      "📸 Miniatur planet bumi di atas telapak tangan dengan latar belakang hutan tropis rindang.",
      "📸 Panel surya dan kincir angin energi terbarukan di bawah langit biru bersih."
    ],
    vector: [
      "🎨 Ilustrasi planet bumi dipeluk oleh daun hijau dengan tulisan 'World Earth Day - Save Our Planet'.",
      "🎨 Set ikon ramah lingkungan (eco friendly): Daun, Daur Ulang (Recycle), Energi Surya, Mobil Listrik.",
      "🎨 Banner infografis cara menjaga kelestarian lingkungan dan mengurangi sampah plastik."
    ],
    video: [
      "🎬 Timelapse tunas tanaman tumbuh cepat menembus tanah menuju sinar matahari.",
      "🎬 Drone shot pemandangan indah hutan hujan tropis yang hijau dan sungai jernih.",
      "🎬 Motion graphics bumi berputar dikelilingi ikon-ikon ekologi ramah lingkungan."
    ],
    palette: [
      { name: "Eco Green", hex: "#16A34A" },
      { name: "Earth Blue", hex: "#0284C7" },
      { name: "Fertile Soil", hex: "#78350F" },
      { name: "Sun Gold", hex: "#FACC15" }
    ],
    keywords: {
      en: ["earth day", "save planet", "eco friendly", "recycling", "green environment", "renewable energy", "sustainability", "climate action"],
      id: ["hari bumi", "hari bumi sedunia", "ramah lingkungan", "daur ulang", "penghijauan", "energi terbarukan"]
    },
    tips: "Tema ESG (Environmental, Social, Governance) dan Sustainability sangat dicari oleh korporasi global.",
    ipNote: "Aman."
  }
};

// Helper function to resolve or dynamically create detailed specific microstock recommendations
export function getDetailedAssetRecommendation(eventKey: string, title: string, category: string): DetailedAssetRecommendation {
  // Normalize key
  const normalizedKey = eventKey.toLowerCase();

  // Direct lookup from repository if available
  if (SPECIFIC_EVENT_ASSET_REPOSITORY[normalizedKey]) {
    return SPECIFIC_EVENT_ASSET_REPOSITORY[normalizedKey];
  }

  // Check partial key matches
  for (const [key, val] of Object.entries(SPECIFIC_EVENT_ASSET_REPOSITORY)) {
    if (normalizedKey.includes(key) || key.includes(normalizedKey)) {
      return val;
    }
  }

  // Fallback category-specific smart generation (ensures NO generic placeholder text ever!)
  const cleanTitle = title.replace(/\s*\(\d{4}\)|\s*\d{4}/g, "").trim();

  if (category === "Religious" || cleanTitle.toLowerCase().includes("natal") || cleanTitle.toLowerCase().includes("maulid")) {
    return {
      photo: [
        `📸 Jemaat/Umat berbusana ibadah khusyuk berdoa merayakan ${cleanTitle}.`,
        `📸 Close-up kitab suci, ornamen keagamaan, dan lilin/lampu hias dalam ruang ibadah yang tenang.`,
        `📸 Suasana hangat kebersamaan keluarga merayakan hari besar ${cleanTitle} di rumah.`
      ],
      vector: [
        `🎨 Kaligrafi / Tipografi artistik ucapan 'Selamat Merayakan ${cleanTitle}' berornamen elegan.`,
        `🎨 Banner & poster feeds Instagram ucapan ${cleanTitle} dengan style arabesque / klasik sakral.`,
        `🎨 Set ikon 3D transparan simbol keagamaan dan hiasan perayaan ${cleanTitle}.`
      ],
      video: [
        `🎬 Motion graphics ucapan ${cleanTitle} dengan latar belakang partikel cahaya keemasan.`,
        `🎬 B-roll suasana tenang tempat ibadah dengan pencahayaan fajar yang hangat.`,
        `🎬 Loop 3D simbol perayaan berputar anggun dengan teks ucapan.`
      ],
      palette: [
        { name: "Sacred Gold", hex: "#D97706" },
        { name: "Royal Emerald", hex: "#047857" },
        { name: "Deep Navy", hex: "#1E3A8A" },
        { name: "Pure White", hex: "#FFFFFF" }
      ],
      keywords: {
        en: [cleanTitle.toLowerCase(), "religious celebration", "holy day", "prayer worship", "spiritual event"],
        id: [cleanTitle.toLowerCase(), "hari besar keagamaan", "ibadah", "perayaan agama"]
      },
      tips: "Fokus pada nilai spiritual yang mendalam, kedamaian, dan kehangatan keluarga.",
      ipNote: "Aman: Simbol keagamaan umum bebas hak cipta komersial."
    };
  }

  if (category === "Commerce" || cleanTitle.toLowerCase().includes("sale") || cleanTitle.toLowerCase().includes("promo")) {
    return {
      photo: [
        `📸 Pembeli gembira membawa banyak kantong belanjaan berwarna-warni di pusat perbelanjaan.`,
        `📸 Layar smartphone menampilkan aplikasi e-commerce bertuliskan diskon promo ${cleanTitle}.`,
        `📸 Tangan menumpuk kado dan dus pengiriman paket belanja dengan pita hadiah.`
      ],
      vector: [
        `🎨 Spanduk & Banner 3D Typography '${cleanTitle.toUpperCase()}' berornamen kupon diskon & cashback.`,
        `🎨 Set badge harga promo: 'Up to 70% OFF', 'Flash Sale', dan 'Limited Time Offer'.`,
        `🎨 Template Feeds & Story Instagram promo belanja dengan warna atraktif kontras tinggi.`
      ],
      video: [
        `🎬 Motion graphics 3D angka diskon meledak dengan hujan koin emas dan pita perayaan.`,
        `🎬 Loop animasi troli belanja meluncur cepat membawa dus paket kado.`,
        `🎬 B-roll transaksi pembayaran digital menggunakan QRIS / smartphone.`
      ],
      palette: [
        { name: "Flash Red", hex: "#EF4444" },
        { name: "Voucher Gold", hex: "#EAB308" },
        { name: "Shopping Blue", hex: "#2563EB" },
        { name: "Clean White", hex: "#FFFFFF" }
      ],
      keywords: {
        en: [cleanTitle.toLowerCase(), "shopping promo", "flash sale", "discount banner", "ecommerce offer", "shopping bag"],
        id: [cleanTitle.toLowerCase(), "promo belanja", "diskon besar", "banner promo", "harbolnas", "kupon cashback"]
      },
      tips: "Desain dengan kontras warna tinggi dan tipografi 3D tebal terbukti paling banyak diunduh oleh pembeli e-commerce.",
      ipNote: "Aman: Tanpa merek e-commerce tertentu."
    };
  }

  // General fallback
  return {
    photo: [
      `📸 Model/Subjek melakukan aktivitas bermakna terkait momentum ${cleanTitle} dengan pencahayaan studio profesional.`,
      `📸 Layat flatlay benda-benda ikonik dan atribut khas peringatan ${cleanTitle} di atas papan kayu bersih.`,
      `📸 Suasana kebersamaan masyarakat/komunitas dalam memperingati acara ${cleanTitle}.`
    ],
    vector: [
      `🎨 Desain poster & banner Feeds Instagram ucapan 'Selamat Memperingati ${cleanTitle}'.`,
      `🎨 Set elemen vektor / ikon 3D terisolasi yang merepresentasikan tema ${cleanTitle}.`,
      `🎨 Pattern seamless dan bingkai ornamen dekoratif bertema ${cleanTitle}.`
    ],
    video: [
      `🎬 Motion graphics animasi teks ucapan ${cleanTitle} dengan latar belakang garis dinamik.`,
      `🎬 B-roll suasana perayaan dan aktivitas utama ${cleanTitle} dalam resolusi 4K.`,
      `🎬 Loop animasi 3D elemen ikonik yang berputar halus.`
    ],
    palette: [
      { name: "Primary Accent", hex: "#2563EB" },
      { name: "Secondary Gold", hex: "#EAB308" },
      { name: "Neutral Dark", hex: "#1E293B" },
      { name: "Pure White", hex: "#FFFFFF" }
    ],
    keywords: {
      en: [cleanTitle.toLowerCase(), "event celebration", "annual observance", "special day", "banner vector"],
      id: [cleanTitle.toLowerCase(), "hari besar", "peringatan tahunan", "banner ucapan"]
    },
    tips: "Buatlah aset yang memiliki copy space luas di bagian tengah atau kanan agar memudahkan buyer menambahkan teks ucapan mereka sendiri.",
    ipNote: "Aman: Gunakan desain generik tanpa logo berhak cipta."
  };
}
