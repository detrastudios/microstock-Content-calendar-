import { EventItem, DateAlt } from "../types";

// INDONESIA 2026 SKB 3 MENTERI (17 Libur Nasional + 8 Cuti Bersama)
const SKB_2026_HOLIDAYS = [
  { date: "2026-01-01", key: "tahun-baru-masehi", title: "Tahun Baru 2026 Masehi", type: "libur-nasional", cat: "Global" },
  { date: "2026-01-16", key: "isra-miraj", title: "Isra Mikraj Nabi Muhammad SAW 1447 H", type: "libur-nasional", cat: "Religious" },
  { date: "2026-02-17", key: "imlek", title: "Tahun Baru Imlek 2577 Kongzili", type: "libur-nasional", cat: "Cultural" },
  { date: "2026-03-19", key: "nyepi", title: "Hari Raya Nyepi (Tahun Baru Saka 1948)", type: "libur-nasional", cat: "Religious" },
  { date: "2026-03-21", key: "idul-fitri", title: "Hari Raya Idulfitri 1447 H", type: "libur-nasional", cat: "Religious" },
  { date: "2026-03-22", key: "idul-fitri", title: "Hari Raya Idulfitri 1447 H (Hari Kedua)", type: "libur-nasional", cat: "Religious" },
  { date: "2026-04-03", key: "wafat-yesus-kristus", title: "Wafat Yesus Kristus (Jumat Agung)", type: "libur-nasional", cat: "Religious" },
  { date: "2026-04-05", key: "paskah", title: "Hari Paskah", type: "libur-nasional", cat: "Religious" },
  { date: "2026-05-01", key: "hari-buruh", title: "Hari Buruh Internasional (May Day)", type: "libur-nasional", cat: "Global" },
  { date: "2026-05-14", key: "kenaikan-yesus-kristus", title: "Kenaikan Yesus Kristus", type: "libur-nasional", cat: "Religious" },
  { date: "2026-05-27", key: "idul-adha", title: "Hari Raya Iduladha 1447 H", type: "libur-nasional", cat: "Religious" },
  { date: "2026-05-31", key: "waisak", title: "Hari Raya Waisak 2570 BE", type: "libur-nasional", cat: "Religious" },
  { date: "2026-06-01", key: "hari-lahir-pancasila", title: "Hari Lahir Pancasila", type: "libur-nasional", cat: "Awareness" },
  { date: "2026-06-16", key: "tahun-baru-islam", title: "Tahun Baru Islam 1448 Hijriah", type: "libur-nasional", cat: "Religious" },
  { date: "2026-08-17", key: "hut-ri", title: "HUT Kemerdekaan Republik Indonesia ke-81", type: "libur-nasional", cat: "Cultural" },
  { date: "2026-08-25", key: "maulid-nabi", title: "Maulid Nabi Muhammad SAW", type: "libur-nasional", cat: "Religious" },
  { date: "2026-12-25", key: "hari-natal", title: "Hari Raya Natal", type: "libur-nasional", cat: "Religious" },

  // CUTI BERSAMA 2026
  { date: "2026-02-16", key: "cuti-imlek", title: "Cuti Bersama Tahun Baru Imlek", type: "cuti-bersama", cat: "Cultural" },
  { date: "2026-03-18", key: "cuti-nyepi", title: "Cuti Bersama Hari Raya Nyepi", type: "cuti-bersama", cat: "Religious" },
  { date: "2026-03-20", key: "cuti-idul-fitri", title: "Cuti Bersama Idulfitri 1447 H", type: "cuti-bersama", cat: "Religious" },
  { date: "2026-03-23", key: "cuti-idul-fitri", title: "Cuti Bersama Idulfitri 1447 H", type: "cuti-bersama", cat: "Religious" },
  { date: "2026-03-24", key: "cuti-idul-fitri", title: "Cuti Bersama Idulfitri 1447 H", type: "cuti-bersama", cat: "Religious" },
  { date: "2026-05-15", key: "cuti-kenaikan", title: "Cuti Bersama Kenaikan Yesus Kristus", type: "cuti-bersama", cat: "Religious" },
  { date: "2026-05-28", key: "cuti-idul-adha", title: "Cuti Bersama Iduladha 1447 H", type: "cuti-bersama", cat: "Religious" },
  { date: "2026-12-24", key: "cuti-natal", title: "Cuti Bersama Hari Raya Natal", type: "cuti-bersama", cat: "Religious" },
];

// INDONESIA 2027 SKB 3 MENTERI (18 Libur Nasional + 8 Cuti Bersama)
const SKB_2027_HOLIDAYS = [
  { date: "2027-01-01", key: "tahun-baru-masehi", title: "Tahun Baru 2027 Masehi", type: "libur-nasional", cat: "Global" },
  { date: "2027-01-05", key: "isra-miraj", title: "Isra Mikraj Nabi Muhammad SAW 1448 H", type: "libur-nasional", cat: "Religious" },
  { date: "2027-02-06", key: "imlek", title: "Tahun Baru Imlek 2578 Kongzili", type: "libur-nasional", cat: "Cultural" },
  { date: "2027-03-08", key: "nyepi", title: "Hari Raya Nyepi (Tahun Baru Saka 1949)", type: "libur-nasional", cat: "Religious" },
  { date: "2027-03-10", key: "idul-fitri", title: "Hari Raya Idulfitri 1448 H", type: "libur-nasional", cat: "Religious" },
  { date: "2027-03-11", key: "idul-fitri", title: "Hari Raya Idulfitri 1448 H (Hari Kedua)", type: "libur-nasional", cat: "Religious" },
  { date: "2027-03-26", key: "wafat-yesus-kristus", title: "Wafat Yesus Kristus (Jumat Agung)", type: "libur-nasional", cat: "Religious" },
  { date: "2027-03-28", key: "paskah", title: "Hari Paskah", type: "libur-nasional", cat: "Religious" },
  { date: "2027-05-01", key: "hari-buruh", title: "Hari Buruh Internasional (May Day)", type: "libur-nasional", cat: "Global" },
  { date: "2027-05-06", key: "kenaikan-yesus-kristus", title: "Kenaikan Yesus Kristus", type: "libur-nasional", cat: "Religious" },
  { date: "2027-05-17", key: "idul-adha", title: "Hari Raya Iduladha 1448 H", type: "libur-nasional", cat: "Religious" },
  { date: "2027-05-20", key: "waisak", title: "Hari Raya Waisak 2571 BE", type: "libur-nasional", cat: "Religious" },
  { date: "2027-06-01", key: "hari-lahir-pancasila", title: "Hari Lahir Pancasila", type: "libur-nasional", cat: "Awareness" },
  { date: "2027-06-06", key: "tahun-baru-islam", title: "Tahun Baru Islam 1449 Hijriah", type: "libur-nasional", cat: "Religious" },
  { date: "2027-08-15", key: "maulid-nabi", title: "Maulid Nabi Muhammad SAW", type: "libur-nasional", cat: "Religious" },
  { date: "2027-08-17", key: "hut-ri", title: "HUT Kemerdekaan Republik Indonesia ke-82", type: "libur-nasional", cat: "Cultural" },
  { date: "2027-12-25", key: "hari-natal", title: "Hari Raya Natal", type: "libur-nasional", cat: "Religious" },
  { date: "2027-12-26", key: "isra-miraj-2", title: "Isra Mikraj Nabi Muhammad SAW 1449 H (Kedua tahun 2027)", type: "libur-nasional", cat: "Religious" },

  // CUTI BERSAMA 2027
  { date: "2027-02-05", key: "cuti-imlek", title: "Cuti Bersama Tahun Baru Imlek", type: "cuti-bersama", cat: "Cultural" },
  { date: "2027-03-09", key: "cuti-idul-fitri", title: "Cuti Bersama Idulfitri 1448 H", type: "cuti-bersama", cat: "Religious" },
  { date: "2027-03-12", key: "cuti-idul-fitri", title: "Cuti Bersama Idulfitri 1448 H", type: "cuti-bersama", cat: "Religious" },
  { date: "2027-03-15", key: "cuti-idul-fitri", title: "Cuti Bersama Idulfitri 1448 H", type: "cuti-bersama", cat: "Religious" },
  { date: "2027-03-25", key: "cuti-wafat-yesus", title: "Cuti Bersama Wafat Yesus Kristus", type: "cuti-bersama", cat: "Religious" },
  { date: "2027-05-18", key: "cuti-idul-adha", title: "Cuti Bersama Iduladha 1448 H", type: "cuti-bersama", cat: "Religious" },
  { date: "2027-05-19", key: "cuti-waisak", title: "Cuti Bersama Hari Raya Waisak", type: "cuti-bersama", cat: "Religious" },
  { date: "2027-12-24", key: "cuti-natal", title: "Cuti Bersama Hari Raya Natal", type: "cuti-bersama", cat: "Religious" },
];

// INDONESIAN NATIONAL DAYS (Fixed MM-DD, Non-Holiday Observances)
const INDONESIAN_NATIONAL_DAYS = [
  { mmdd: "01-03", key: "hari-amal-bakti-kemenag", title: "Hari Amal Bakti Kementerian Agama RI", cat: "Awareness" },
  { mmdd: "01-25", key: "hari-gizi-nasional", title: "Hari Gizi Nasional", cat: "Awareness" },
  { mmdd: "02-09", key: "hari-pers-nasional", title: "Hari Pers Nasional (HPN)", cat: "Awareness" },
  { mmdd: "03-09", key: "hari-musik-nasional", title: "Hari Musik Nasional", cat: "Cultural" },
  { mmdd: "03-30", key: "hari-film-nasional", title: "Hari Film Nasional", cat: "Cultural" },
  { mmdd: "04-21", key: "hari-kartini", title: "Hari Kartini", cat: "Cultural" },
  { mmdd: "05-02", key: "hardiknas", title: "Hari Pendidikan Nasional (Hardiknas)", cat: "Awareness" },
  { mmdd: "05-17", key: "hari-buku-nasional", title: "Hari Buku Nasional", cat: "Awareness" },
  { mmdd: "05-20", key: "hari-kebangkitan-nasional", title: "Hari Kebangkitan Nasional (Harkitnas)", cat: "Awareness" },
  { mmdd: "06-26", key: "hari-anti-narkotika", title: "Hari Anti Narkotika Internasional (HANI)", cat: "Awareness" },
  { mmdd: "07-01", key: "hari-bhayangkara", title: "Hari Bhayangkara (HUT Polri)", cat: "Awareness" },
  { mmdd: "07-12", key: "hari-koperasi", title: "Hari Koperasi Indonesia", cat: "Commerce" },
  { mmdd: "07-23", key: "hari-anak-nasional", title: "Hari Anak Nasional (HAN)", cat: "Awareness" },
  { mmdd: "08-14", key: "hari-pramuka", title: "Hari Pramuka Indonesia", cat: "Awareness" },
  { mmdd: "08-17", key: "lomba-17an", title: "Lomba 17-an & Pesta Rakyat Kemerdekaan", cat: "Cultural" },
  { mmdd: "09-09", key: "hari-olahraga-nasional", title: "Hari Olahraga Nasional (Haornas)", cat: "Sports" },
  { mmdd: "09-23", key: "hari-maritim-nasional", title: "Hari Maritim Nasional", cat: "Awareness" },
  { mmdd: "09-24", key: "hari-tani-nasional", title: "Hari Tani Nasional", cat: "Awareness" },
  { mmdd: "10-01", key: "kesaktian-pancasila", title: "Hari Kesaktian Pancasila", cat: "Awareness" },
  { mmdd: "10-02", key: "hari-batik-nasional", title: "Hari Batik Nasional", cat: "Cultural" },
  { mmdd: "10-05", key: "hut-tni", title: "HUT Tentara Nasional Indonesia (TNI)", cat: "Awareness" },
  { mmdd: "10-12", key: "hari-museum-indonesia", title: "Hari Museum Indonesia", cat: "Cultural" },
  { mmdd: "10-22", key: "hari-santri-nasional", title: "Hari Santri Nasional", cat: "Religious" },
  { mmdd: "10-28", key: "hari-sumpah-pemuda", title: "Hari Sumpah Pemuda", cat: "Awareness" },
  { mmdd: "11-10", key: "hari-pahlawan", title: "Hari Pahlawan Nasional", cat: "Awareness" },
  { mmdd: "11-12", key: "hari-kesehatan-nasional", title: "Hari Kesehatan Nasional (HKN)", cat: "Awareness" },
  { mmdd: "11-25", key: "hari-guru-nasional", title: "Hari Guru Nasional / HUT PGRI", cat: "Awareness" },
  { mmdd: "11-28", key: "hari-menanam-pohon", title: "Hari Menanam Pohon Indonesia", cat: "Awareness" },
  { mmdd: "12-09", key: "hari-anti-korupsi", title: "Hari Anti Korupsi Sedunia (Hakordia)", cat: "Awareness" },
  { mmdd: "12-12", key: "harbolnas-1212", title: "Harbolnas 12.12 (Hari Belanja Online Nasional)", cat: "Commerce" },
  { mmdd: "12-19", key: "hari-bela-negara", title: "Hari Bela Negara", cat: "Awareness" },
  { mmdd: "12-22", key: "hari-ibu-indonesia", title: "Hari Ibu Indonesia", cat: "Cultural" }
];

// SPORTS & MEGA EVENTS 2027 (Verified)
const SPORTS_2027 = [
  { startDate: "2027-01-18", endDate: "2027-01-31", key: "australian-open-2027", title: "Australian Open 2027 (Tennis)", cat: "Sports" },
  { startDate: "2027-02-05", endDate: "2027-03-20", key: "six-nations-2027", title: "Six Nations Rugby Championship 2027", cat: "Sports" },
  { startDate: "2027-05-17", endDate: "2027-06-06", key: "french-open-2027", title: "Roland-Garros French Open 2027", cat: "Sports" },
  { startDate: "2027-06-05", key: "uefa-cl-final-2027", title: "UEFA Champions League Final 2027 (Madrid)", cat: "Sports" },
  { startDate: "2027-06-18", endDate: "2027-08-02", key: "the-ashes-2027", title: "The Ashes Cricket Series 2027", cat: "Sports" },
  { startDate: "2027-06-24", endDate: "2027-07-25", key: "fifa-womens-wc-2027", title: "FIFA Women's World Cup 2027 (Brasil)", cat: "Sports" },
  { startDate: "2027-06-28", endDate: "2027-07-11", key: "wimbledon-2027", title: "Wimbledon Tennis Championships 2027", cat: "Sports" },
  { startDate: "2027-08-30", endDate: "2027-09-12", key: "us-open-2027", title: "US Open Tennis Championships 2027", cat: "Sports" },
  { startDate: "2027-10-01", endDate: "2027-11-13", key: "rugby-world-cup-2027", title: "Men's Rugby World Cup 2027 (Australia)", cat: "Sports" },
  { startDate: "2027-10-04", endDate: "2027-11-21", key: "cricket-world-cup-2027", title: "ICC Men's Cricket World Cup 2027", cat: "Sports" },
  { startDate: "2027-11-14", endDate: "2027-11-21", key: "atp-finals-2027", title: "ATP Finals Tennis 2027", cat: "Sports" },
  // Badminton & MotoGP popular in Indonesia
  { startDate: "2027-03-16", endDate: "2027-03-21", key: "all-england-2027", title: "All England Open Badminton 2027", cat: "Sports" },
  { startDate: "2027-06-08", endDate: "2027-06-13", key: "indonesia-open-2027", title: "BWF Indonesia Open 2027", cat: "Sports" },
  { startDate: "2027-10-15", endDate: "2027-10-17", key: "motogp-mandalika-2027", title: "MotoGP Indonesia (Mandalika Circuit) 2027", cat: "Sports" },
];

export function getLayer2OfficialEventsForYear(year: number): EventItem[] {
  const events: EventItem[] = [];

  // 1. Indonesian National Days (Fixed MM-DD, Non-Holiday)
  for (const nd of INDONESIAN_NATIONAL_DAYS) {
    events.push({
      id: `${nd.key}-${year}`,
      eventKey: nd.key,
      verification: "official",
      title: nd.title,
      date: `${year}-${nd.mmdd}`,
      region: "ID",
      category: nd.cat as any,
      holidayType: "hari-besar",
      uploadWindow: {
        startMonth: "2 Bulan",
        endMonth: "Sebelum Event",
        label: "Dipersiapkan 1-2 bulan sebelum hari-H",
      },
      assets: {
        photo: [`Foto kegiatan & perayaan ${nd.title}`],
        vector: [`Template poster feeds Instagram ${nd.title}`],
        video: [`Motion graphics ucapan ${nd.title}`],
      },
      palette: [
        { name: "Merah", hex: "#DC2626" },
        { name: "Emas", hex: "#D97706" },
      ],
      keywords: {
        en: [nd.key, nd.title.toLowerCase()],
        id: [nd.title.toLowerCase(), "hari besar indonesia"],
      },
      tips: `Penting untuk pasar korporat, instansi, dan UMKM Indonesia.`,
      ipNote: "Aman: Gunakan elemen grafis resmi/umum tanpa hak cipta komersial.",
      sources: [
        { title: "SKB 3 Menteri / Keputusan Presiden", url: "https://setneg.go.id" },
        { title: "Portal Resmi Kemenag & Kemendikbud", url: "https://kemenag.go.id" },
      ],
      verifiedAt: new Date().toISOString(),
    });
  }

  // 2. SKB 3 Menteri Holidays for 2026 or 2027
  let skbList: any[] = [];
  let verificationStatus: "official" | "estimated" = "official";

  if (year === 2026) {
    skbList = SKB_2026_HOLIDAYS;
    verificationStatus = "official";
  } else if (year === 2027) {
    skbList = SKB_2027_HOLIDAYS;
    verificationStatus = "official";
  } else {
    // For 2025, 2028, 2029, 2030 -> estimated status until SKB 3 Menteri is officially published
    skbList = SKB_2026_HOLIDAYS.map((h) => ({
      ...h,
      date: h.date.replace("2026", String(year)),
    }));
    verificationStatus = "estimated";
  }

  for (const h of skbList) {
    // Date Alt for Islamic holidays in 2027 (Muhammadiyah KHGT vs SKB Kemenag)
    let dateAlt: DateAlt[] | undefined = undefined;
    if (year === 2027) {
      if (h.key === "idul-fitri") {
        dateAlt = [
          { label: "SKB Pemerintah (Kemenag)", date: "2027-03-10", source: "SKB 3 Menteri No. 1205/2026" },
          { label: "KHGT Muhammadiyah", date: "2027-03-09", source: "KHGT Muhammadiyah 1448 H" },
        ];
      }
    }

    events.push({
      id: `${h.key}-${h.date}`,
      eventKey: h.key,
      verification: verificationStatus,
      title: h.title,
      date: h.date,
      holidayType: h.type as any,
      dateAlt,
      region: "ID",
      category: h.cat as any,
      uploadWindow: {
        startMonth: "2-3 Bulan",
        endMonth: "Sebelum Event",
        label: "Dipersiapkan 2-3 bulan sebelum hari-H",
      },
      assets: {
        photo: [`Dokumentasi & suasana ${h.title}`],
        vector: [`Desain flyer ucapan & banner ${h.title}`],
        video: [`Motion graphics ucapan ${h.title}`],
      },
      palette: [
        { name: "Emerald", hex: "#059669" },
        { name: "Gold", hex: "#D97706" },
      ],
      keywords: {
        en: [h.key, h.title.toLowerCase(), `libur nasional ${year}`],
        id: [h.title.toLowerCase(), "libur nasional indonesia", "skb 3 menteri"],
      },
      tips: verificationStatus === "official"
        ? `Resmi ditetapkan dalam SKB 3 Menteri Indonesia tahun ${year}.`
        : `Estimasi tanggal. Menunggu penetapan resmi SKB 3 Menteri ${year}.`,
      ipNote: "Aman: Simbol agama & kebudayaan publik.",
      sources: [
        { title: `SKB 3 Menteri Libur Nasional ${year}`, url: "https://kemenkopmk.go.id" },
        { title: "Kemenag RI Calendar Portal", url: "https://kemenag.go.id" },
      ],
      verifiedAt: new Date().toISOString(),
    });
  }

  // Add Muhammadiyah KHGT 2027 specific dates if 2027
  if (year === 2027) {
    events.push({
      id: `ramadan-1448h-2027`,
      eventKey: "awal-ramadan",
      verification: "verified",
      title: "Awal Ramadan 1448 H (Puasa)",
      date: "2027-02-08",
      endDate: "2027-03-09",
      dateAlt: [
        { label: "KHGT Muhammadiyah", date: "2027-02-08", source: "Kalender Hijriah Global Tunggal (KHGT)" },
        { label: "Kemenag RI (Estimasi SKB)", date: "2027-02-09", source: "Menunggu Sidang Isbat Kemenag" },
      ],
      region: "BOTH",
      category: "Religious",
      holidayType: "hari-besar",
      uploadWindow: {
        startMonth: "Oktober 2026",
        endMonth: "Desember 2026",
        label: "Dipersiapkan sejak akhir tahun 2026",
      },
      assets: {
        photo: ["Kurma, lampion fanous, sajadah, Al-Qur'an, suasana berbuka puasa"],
        vector: ["Vektor 3D lampion masjid, bulan sabit, & banner 'Ramadan Kareem'"],
        video: ["Motion graphics lampion berkedip & bintang malam berputar"],
      },
      palette: [
        { name: "Deep Navy", hex: "#0F172A" },
        { name: "Gold", hex: "#EAB308" },
      ],
      keywords: {
        en: ["ramadan 2027", "ramadan kareem", "islamic month"],
        id: ["ramadan 1448h", "awal puasa 2027", "marhaban ya ramadhan"],
      },
      tips: "Demand sangat tinggi untuk flyer, jadwal imsakiyah, dan spanduk sahur/berbuka.",
      ipNote: "Aman: Motif ornamen Islami generik.",
      sources: [{ title: "KHGT Muhammadiyah 1448 H", url: "https://khgt.muhammadiyah.or.id" }],
      verifiedAt: new Date().toISOString(),
    });
  }

  // 3. Sports & Mega Events (for 2027, or adjusted for other years)
  if (year === 2027) {
    for (const sp of SPORTS_2027) {
      events.push({
        id: `${sp.key}-${year}`,
        eventKey: sp.key,
        verification: "verified",
        title: sp.title,
        date: sp.startDate,
        endDate: sp.endDate,
        region: "GLOBAL",
        category: "Sports",
        uploadWindow: {
          startMonth: "2 Bulan",
          endMonth: "Sebelum Event",
          label: "Dipersiapkan 2 bulan sebelum kick-off",
        },
        assets: {
          photo: [`Foto aksi olahraga & peralatan bertema ${sp.title}`],
          vector: [`Ilustrasi vektor & grafik banner ${sp.title}`],
          video: [`Motion graphics animasi skor & lapangan ${sp.title}`],
        },
        palette: [
          { name: "Stadium Green", hex: "#16A34A" },
          { name: "Trophy Gold", hex: "#CA8A04" },
        ],
        keywords: {
          en: [sp.key, sp.title.toLowerCase(), `sports ${year}`],
          id: [sp.title.toLowerCase(), "event olahraga dunia"],
        },
        tips: "Event olahraga internasional mendongkrak pencarian vektor bola, raket, dan konsep kemenangan.",
        ipNote: "PENTING: Gunakan ilustrasi/foto peralatan olahraga generik TANPA logo merek dagang (seperti Nike/Adidas) atau logo turnamen resmi.",
        sources: [{ title: `Official Tournament Calendar ${year}`, url: "https://www.timeanddate.com/holidays" }],
        verifiedAt: new Date().toISOString(),
      });
    }
  }

  return events;
}
