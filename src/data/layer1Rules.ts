import { EventItem, SeasonalRange, Region } from "../types";

function formatDateStr(year: number, monthIndex: number, day: number): string {
  const m = String(monthIndex + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

// Pure function: Anonymous Gregorian Computus algorithm for Easter
export function getEasterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3=March, 4=April
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day));
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date.getTime());
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function toISOStringDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

export function getMardiGras(year: number): string {
  const easter = getEasterDate(year);
  return toISOStringDate(addDays(easter, -47));
}

export function getAshWednesday(year: number): string {
  const easter = getEasterDate(year);
  return toISOStringDate(addDays(easter, -46));
}

export function getGoodFriday(year: number): string {
  const easter = getEasterDate(year);
  return toISOStringDate(addDays(easter, -2));
}

export function getEasterSunday(year: number): string {
  const easter = getEasterDate(year);
  return toISOStringDate(easter);
}

export function getAscensionDay(year: number): string {
  const easter = getEasterDate(year);
  return toISOStringDate(addDays(easter, 39));
}

export function getPentecost(year: number): string {
  const easter = getEasterDate(year);
  return toISOStringDate(addDays(easter, 49));
}

export function getNthWeekdayOfMonth(year: number, monthIndex: number, weekday: number, n: number): string {
  let count = 0;
  const date = new Date(Date.UTC(year, monthIndex, 1));
  while (date.getUTCMonth() === monthIndex) {
    if (date.getUTCDay() === weekday) {
      count++;
      if (count === n) {
        return toISOStringDate(date);
      }
    }
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return formatDateStr(year, monthIndex, 1);
}

export function getLastWeekdayOfMonth(year: number, monthIndex: number, weekday: number): string {
  const date = new Date(Date.UTC(year, monthIndex + 1, 0));
  while (date.getUTCMonth() === monthIndex) {
    if (date.getUTCDay() === weekday) {
      return toISOStringDate(date);
    }
    date.setUTCDate(date.getUTCDate() - 1);
  }
  return formatDateStr(year, monthIndex, 28);
}

export function getMothersDayUS(year: number): string {
  return getNthWeekdayOfMonth(year, 4, 0, 2); // 2nd Sunday of May (month index 4)
}

export function getFathersDayUS(year: number): string {
  return getNthWeekdayOfMonth(year, 5, 0, 3); // 3rd Sunday of June (month index 5)
}

export function getMemorialDayUS(year: number): string {
  return getLastWeekdayOfMonth(year, 4, 1); // Last Monday of May
}

export function getLaborDayUS(year: number): string {
  return getNthWeekdayOfMonth(year, 8, 1, 1); // 1st Monday of September
}

export function getThanksgivingUS(year: number): string {
  return getNthWeekdayOfMonth(year, 10, 4, 4); // 4th Thursday of November
}

export function getBlackFriday(year: number): string {
  const tg = new Date(`${getThanksgivingUS(year)}T00:00:00Z`);
  return toISOStringDate(addDays(tg, 1));
}

export function getCyberMonday(year: number): string {
  const tg = new Date(`${getThanksgivingUS(year)}T00:00:00Z`);
  return toISOStringDate(addDays(tg, 4));
}

export function getPresidentsDay(year: number): string {
  return getNthWeekdayOfMonth(year, 1, 1, 3); // 3rd Monday of Feb
}

export function getMLKDay(year: number): string {
  return getNthWeekdayOfMonth(year, 0, 1, 3); // 3rd Monday of Jan
}

// Fixed MM-DD Global & International Rules (Section 4A)
const FIXED_MMDD_RULES = [
  // JANUARI
  { mmdd: "01-01", eventKey: "new-years-day", title: "New Year's Day", category: "Global" },
  { mmdd: "01-04", eventKey: "world-braille-day", title: "World Braille Day", category: "Awareness" },
  { mmdd: "01-06", eventKey: "epiphany-three-kings", title: "Epiphany / Three Kings' Day", category: "Religious" },
  { mmdd: "01-13", eventKey: "lohri-festival", title: "Lohri Festival", category: "Cultural" },
  { mmdd: "01-24", eventKey: "int-day-of-education", title: "International Day of Education", category: "Awareness" },
  { mmdd: "01-26", eventKey: "australia-republic-day", title: "Australia Day & India Republic Day", category: "Global" },
  { mmdd: "01-27", eventKey: "holocaust-remembrance", title: "International Holocaust Remembrance Day", category: "Awareness" },
  { mmdd: "01-28", eventKey: "data-privacy-day", title: "Data Privacy Day", category: "Awareness" },

  // FEBRUARI
  { mmdd: "02-02", eventKey: "groundhog-wetlands-day", title: "Groundhog Day & World Wetlands Day", category: "Fun" },
  { mmdd: "02-04", eventKey: "world-cancer-day", title: "World Cancer Day", category: "Awareness" },
  { mmdd: "02-09", eventKey: "national-pizza-day", title: "National Pizza Day", category: "Fun" },
  { mmdd: "02-11", eventKey: "women-girls-in-science", title: "Women and Girls in Science Day", category: "Awareness" },
  { mmdd: "02-13", eventKey: "world-radio-day", title: "World Radio Day", category: "Awareness" },
  { mmdd: "02-14", eventKey: "valentines-day", title: "Valentine's Day", category: "Fun" },
  { mmdd: "02-20", eventKey: "world-day-social-justice", title: "World Day of Social Justice", category: "Awareness" },
  { mmdd: "02-21", eventKey: "mother-language-day", title: "International Mother Language Day", category: "Cultural" },

  // MARET
  { mmdd: "03-01", eventKey: "zero-discrimination-day", title: "Zero Discrimination Day", category: "Awareness" },
  { mmdd: "03-03", eventKey: "world-wildlife-day", title: "World Wildlife Day", category: "Awareness" },
  { mmdd: "03-08", eventKey: "international-womens-day", title: "International Women's Day", category: "Awareness" },
  { mmdd: "03-14", eventKey: "pi-day", title: "Pi Day (3.14)", category: "Fun" },
  { mmdd: "03-17", eventKey: "st-patricks-day", title: "St. Patrick's Day", category: "Cultural" },
  { mmdd: "03-20", eventKey: "day-of-happiness", title: "International Day of Happiness", category: "Fun" },
  { mmdd: "03-21", eventKey: "world-poetry-forests-day", title: "World Poetry & Forests Day", category: "Awareness" },
  { mmdd: "03-22", eventKey: "world-water-day", title: "World Water Day", category: "Awareness" },
  { mmdd: "03-23", eventKey: "meteorological-day", title: "World Meteorological Day", category: "Awareness" },

  // APRIL
  { mmdd: "04-01", eventKey: "april-fools-day", title: "April Fools' Day", category: "Fun" },
  { mmdd: "04-02", eventKey: "autism-awareness-day", title: "World Autism Awareness Day", category: "Awareness" },
  { mmdd: "04-07", eventKey: "world-health-day", title: "World Health Day", category: "Awareness" },
  { mmdd: "04-22", eventKey: "earth-day", title: "Earth Day", category: "Awareness" },
  { mmdd: "04-23", eventKey: "world-book-day", title: "World Book & Copyright Day", category: "Awareness" },
  { mmdd: "04-30", eventKey: "international-jazz-day", title: "International Jazz Day", category: "Cultural" },

  // MEI
  { mmdd: "05-01", eventKey: "may-labour-day", title: "International Labour Day", category: "Global" },
  { mmdd: "05-03", eventKey: "press-freedom-day", title: "World Press Freedom Day", category: "Awareness" },
  { mmdd: "05-04", eventKey: "star-wars-day", title: "Star Wars Day (May the 4th)", category: "Fun" },
  { mmdd: "05-05", eventKey: "cinco-de-mayo", title: "Cinco de Mayo", category: "Cultural" },
  { mmdd: "05-08", eventKey: "red-cross-day", title: "World Red Cross Day", category: "Awareness" },
  { mmdd: "05-12", eventKey: "international-nurses-day", title: "International Nurses Day", category: "Awareness" },
  { mmdd: "05-15", eventKey: "day-of-families", title: "International Day of Families", category: "Awareness" },
  { mmdd: "05-20", eventKey: "world-bee-day", title: "World Bee Day", category: "Awareness" },
  { mmdd: "05-21", eventKey: "cultural-diversity-day", title: "World Day for Cultural Diversity", category: "Cultural" },
  { mmdd: "05-22", eventKey: "biological-diversity-day", title: "International Day for Biological Diversity", category: "Awareness" },
  { mmdd: "05-31", eventKey: "no-tobacco-day", title: "World No Tobacco Day", category: "Awareness" },

  // JUNI
  { mmdd: "06-01", eventKey: "childrens-day-global", title: "International Children's Day", category: "Awareness" },
  { mmdd: "06-05", eventKey: "world-environment-day", title: "World Environment Day", category: "Awareness" },
  { mmdd: "06-08", eventKey: "world-oceans-day", title: "World Oceans Day", category: "Awareness" },
  { mmdd: "06-12", eventKey: "against-child-labour", title: "World Day Against Child Labour", category: "Awareness" },
  { mmdd: "06-14", eventKey: "blood-donor-day", title: "World Blood Donor Day", category: "Awareness" },
  { mmdd: "06-20", eventKey: "world-refugee-day", title: "World Refugee Day", category: "Awareness" },
  { mmdd: "06-21", eventKey: "yoga-and-music-day", title: "International Yoga Day & World Music Day", category: "Awareness" },
  { mmdd: "06-30", eventKey: "social-media-day", title: "World Social Media Day", category: "Commerce" },

  // JULI
  { mmdd: "07-01", eventKey: "canada-day", title: "Canada Day", category: "Global" },
  { mmdd: "07-04", eventKey: "us-independence-day", title: "US Independence Day (4th of July)", category: "Global" },
  { mmdd: "07-07", eventKey: "world-chocolate-day", title: "World Chocolate Day", category: "Fun" },
  { mmdd: "07-11", eventKey: "world-population-day", title: "World Population Day", category: "Awareness" },
  { mmdd: "07-14", eventKey: "bastille-day", title: "Bastille Day (France)", category: "Cultural" },
  { mmdd: "07-17", eventKey: "world-emoji-day", title: "World Emoji Day", category: "Fun" },
  { mmdd: "07-18", eventKey: "mandela-day", title: "Nelson Mandela International Day", category: "Awareness" },
  { mmdd: "07-20", eventKey: "international-chess-day", title: "International Chess Day", category: "Fun" },
  { mmdd: "07-28", eventKey: "nature-conservation-day", title: "World Nature Conservation Day", category: "Awareness" },
  { mmdd: "07-29", eventKey: "international-tiger-day", title: "International Tiger Day", category: "Awareness" },
  { mmdd: "07-30", eventKey: "international-friendship-day", title: "International Friendship Day", category: "Fun" },

  // AGUSTUS
  { mmdd: "08-08", eventKey: "international-cat-day", title: "International Cat Day", category: "Fun" },
  { mmdd: "08-09", eventKey: "indigenous-peoples-day", title: "International Day of the World's Indigenous Peoples", category: "Cultural" },
  { mmdd: "08-12", eventKey: "youth-elephant-day", title: "International Youth Day & World Elephant Day", category: "Awareness" },
  { mmdd: "08-13", eventKey: "left-handers-day", title: "International Left-Handers Day", category: "Fun" },
  { mmdd: "08-15", eventKey: "india-independence-day", title: "India Independence Day", category: "Global" },
  { mmdd: "08-19", eventKey: "photography-humanitarian-day", title: "World Photography Day & Humanitarian Day", category: "Awareness" },
  { mmdd: "08-26", eventKey: "womens-equality-day", title: "Women's Equality Day", category: "Awareness" },

  // SEPTEMBER
  { mmdd: "09-08", eventKey: "literacy-day", title: "International Literacy Day", category: "Awareness" },
  { mmdd: "09-15", eventKey: "day-of-democracy", title: "International Day of Democracy", category: "Awareness" },
  { mmdd: "09-16", eventKey: "ozone-layer-day", title: "International Ozone Layer Preservation Day", category: "Awareness" },
  { mmdd: "09-19", eventKey: "talk-like-pirate-day", title: "Talk Like a Pirate Day", category: "Fun" },
  { mmdd: "09-21", eventKey: "international-day-of-peace", title: "International Day of Peace", category: "Awareness" },
  { mmdd: "09-22", eventKey: "world-car-free-day", title: "World Car-Free Day", category: "Awareness" },
  { mmdd: "09-27", eventKey: "world-tourism-day", title: "World Tourism Day", category: "Global" },
  { mmdd: "09-29", eventKey: "world-heart-day", title: "World Heart Day", category: "Awareness" },

  // OKTOBER
  { mmdd: "10-01", eventKey: "coffee-older-persons-day", title: "International Coffee Day & Older Persons Day", category: "Fun" },
  { mmdd: "10-02", eventKey: "non-violence-day", title: "International Day of Non-Violence", category: "Awareness" },
  { mmdd: "10-04", eventKey: "world-animal-day", title: "World Animal Day", category: "Awareness" },
  { mmdd: "10-05", eventKey: "world-teachers-day", title: "World Teachers' Day", category: "Awareness" },
  { mmdd: "10-10", eventKey: "mental-health-day", title: "World Mental Health Day", category: "Awareness" },
  { mmdd: "10-11", eventKey: "day-of-the-girl", title: "International Day of the Girl Child", category: "Awareness" },
  { mmdd: "10-15", eventKey: "handwashing-day", title: "Global Handwashing Day", category: "Awareness" },
  { mmdd: "10-16", eventKey: "world-food-day", title: "World Food Day", category: "Awareness" },
  { mmdd: "10-17", eventKey: "poverty-eradication-day", title: "International Day for Eradication of Poverty", category: "Awareness" },
  { mmdd: "10-24", eventKey: "united-nations-day", title: "United Nations Day", category: "Global" },
  { mmdd: "10-31", eventKey: "halloween-day", title: "Halloween", category: "Fun" },

  // NOVEMBER
  { mmdd: "11-01", eventKey: "all-saints-day-of-dead", title: "All Saints' Day & Day of the Dead (Dia de los Muertos)", category: "Cultural" },
  { mmdd: "11-05", eventKey: "guy-fawkes-night", title: "Guy Fawkes Night", category: "Cultural" },
  { mmdd: "11-11", eventKey: "singles-day-remembrance", title: "Singles' Day (11.11) & Remembrance Day", category: "Commerce" },
  { mmdd: "11-13", eventKey: "world-kindness-day", title: "World Kindness Day", category: "Awareness" },
  { mmdd: "11-14", eventKey: "world-diabetes-day", title: "World Diabetes Day", category: "Awareness" },
  { mmdd: "11-16", eventKey: "day-for-tolerance", title: "International Day for Tolerance", category: "Awareness" },
  { mmdd: "11-19", eventKey: "mens-and-toilet-day", title: "International Men's Day & World Toilet Day", category: "Awareness" },
  { mmdd: "11-20", eventKey: "universal-childrens-day", title: "Universal Children's Day", category: "Awareness" },
  { mmdd: "11-25", eventKey: "elimination-violence-women", title: "Day for Elimination of Violence against Women", category: "Awareness" },

  // DESEMBER
  { mmdd: "12-01", eventKey: "world-aids-day", title: "World AIDS Day", category: "Awareness" },
  { mmdd: "12-03", eventKey: "persons-with-disabilities", title: "International Day of Persons with Disabilities", category: "Awareness" },
  { mmdd: "12-05", eventKey: "volunteer-day", title: "International Volunteer Day", category: "Awareness" },
  { mmdd: "12-10", eventKey: "human-rights-day", title: "Human Rights Day", category: "Awareness" },
  { mmdd: "12-18", eventKey: "migrants-day", title: "International Migrants Day", category: "Awareness" },
  { mmdd: "12-24", eventKey: "christmas-eve", title: "Christmas Eve", category: "Cultural" },
  { mmdd: "12-25", eventKey: "christmas-day", title: "Christmas Day", category: "Cultural" },
  { mmdd: "12-26", eventKey: "boxing-day-kwanzaa", title: "Boxing Day & Kwanzaa Start", category: "Cultural" },
  { mmdd: "12-31", eventKey: "new-years-eve", title: "New Year's Eve", category: "Global" }
];

export function getLayer1RulesForYear(year: number): EventItem[] {
  const events: EventItem[] = [];

  // 1. Add Fixed MM-DD Rules
  for (const rule of FIXED_MMDD_RULES) {
    const date = `${year}-${rule.mmdd}`;
    events.push({
      id: `${rule.eventKey}-${year}`,
      eventKey: rule.eventKey,
      verification: "rule",
      title: rule.title,
      date,
      region: "GLOBAL",
      category: rule.category as any,
      uploadWindow: {
        startMonth: "2-3 Bulan",
        endMonth: "Sebelum Event",
        label: "Dipersiapkan 2-3 bulan sebelum hari-H",
      },
      assets: {
        photo: [`Konsep foto komersial bertema ${rule.title}`],
        vector: [`Desain vektor dan pola seamless ${rule.title}`],
        video: [`Animasi loop 5-10 detik ${rule.title}`],
      },
      palette: [
        { name: "Primary", hex: "#3B82F6" },
        { name: "Accent", hex: "#10B981" },
        { name: "Neutral", hex: "#6B7280" },
      ],
      keywords: {
        en: [rule.eventKey, rule.title.toLowerCase(), `${year} celebration`],
        id: [rule.title.toLowerCase()],
      },
      tips: `Event rutin tahunan. Unggah aset 2-3 bulan lebih awal untuk terindeks baik.`,
      ipNote: "Aman: Gunakan simbol umum tanpa merek dagang.",
      sources: [{ title: "TimeAndDate / UN Observances", url: "https://www.timeanddate.com" }],
      verifiedAt: new Date().toISOString(),
    });
  }

  // 2. Add Calculated Formula Events
  const easterDate = getEasterDate(year);
  const mardiGras = getMardiGras(year);
  const ashWed = getAshWednesday(year);
  const goodFriday = getGoodFriday(year);
  const easterSunday = getEasterSunday(year);
  const ascensionDay = getAscensionDay(year);
  const pentecost = getPentecost(year);

  const calculatedEvents = [
    { key: "mardi-gras", title: "Mardi Gras / Carnival", date: mardiGras, cat: "Cultural" },
    { key: "ash-wednesday", title: "Ash Wednesday (Rabu Abu)", date: ashWed, cat: "Religious" },
    { key: "good-friday", title: "Good Friday (Jumat Agung)", date: goodFriday, cat: "Religious" },
    { key: "easter-sunday", title: "Easter Sunday (Hari Raya Paskah)", date: easterSunday, cat: "Religious" },
    { key: "ascension-day", title: "Ascension Day (Kenaikan Yesus Kristus)", date: ascensionDay, cat: "Religious" },
    { key: "pentecost", title: "Pentecost (Pentakosta)", date: pentecost, cat: "Religious" },

    { key: "mothers-day-us", title: "Mother's Day (US / Global)", date: getMothersDayUS(year), cat: "Fun" },
    { key: "fathers-day-us", title: "Father's Day (US / Global)", date: getFathersDayUS(year), cat: "Fun" },
    { key: "memorial-day", title: "Memorial Day (US)", date: getMemorialDayUS(year), cat: "Global" },
    { key: "labor-day-us", title: "Labor Day (US)", date: getLaborDayUS(year), cat: "Global" },
    { key: "thanksgiving-us", title: "Thanksgiving Day (US)", date: getThanksgivingUS(year), cat: "Cultural" },
    { key: "black-friday", title: "Black Friday Sale", date: getBlackFriday(year), cat: "Commerce" },
    { key: "cyber-monday", title: "Cyber Monday Sale", date: getCyberMonday(year), cat: "Commerce" },
    { key: "presidents-day", title: "Presidents' Day (US)", date: getPresidentsDay(year), cat: "Global" },
    { key: "mlk-day", title: "Martin Luther King Jr. Day", date: getMLKDay(year), cat: "Awareness" },

    // Equinoxes and Solstices
    { key: "vernal-equinox", title: "Spring Equinox (Awal Musim Semi Utara)", date: `${year}-03-20`, cat: "Global" },
    { key: "summer-solstice", title: "Summer Solstice (Hari Terpanjang Tahun Ini)", date: `${year}-06-21`, cat: "Global" },
    { key: "autumnal-equinox", title: "Autumn Equinox (Awal Musim Gugur Utara)", date: `${year}-09-22`, cat: "Global" },
    { key: "winter-solstice", title: "Winter Solstice (Awal Musim Dingin Utara)", date: `${year}-12-21`, cat: "Global" },
  ];

  for (const calc of calculatedEvents) {
    events.push({
      id: `${calc.key}-${year}`,
      eventKey: calc.key,
      verification: "rule",
      title: calc.title,
      date: calc.date,
      region: "GLOBAL",
      category: calc.cat as any,
      uploadWindow: {
        startMonth: "2-3 Bulan",
        endMonth: "Sebelum Event",
        label: "Dipersiapkan 2-3 bulan sebelum hari-H",
      },
      assets: {
        photo: [`Foto bertema ${calc.title}`],
        vector: [`Vektor & desain promo ${calc.title}`],
        video: [`Motion graphics ${calc.title}`],
      },
      palette: [
        { name: "Primary", hex: "#2563EB" },
        { name: "Secondary", hex: "#F59E0B" },
      ],
      keywords: {
        en: [calc.key, calc.title.toLowerCase(), `${year}`],
        id: [calc.title.toLowerCase()],
      },
      tips: `Dihitung menggunakan rumus matematika astronomi / kalender standar.`,
      ipNote: "Aman: Tema umum tanpa elemen bermerek.",
      sources: [{ title: "Computus & Standard Calendar Rules", url: "https://en.wikipedia.org/wiki/Computus" }],
      verifiedAt: new Date().toISOString(),
    });
  }

  // 3. E-commerce Double Dates (1.1, 2.2 ... 12.12) & Payday (25th)
  for (let m = 1; m <= 12; m++) {
    const monthStr = String(m).padStart(2, "0");
    const doubleDateKey = `ecommerce-${m}-${m}`;
    const doubleDateTitle = `Promo Belanja Tanggal Kembar ${m}.${m}`;
    events.push({
      id: `${doubleDateKey}-${year}`,
      eventKey: doubleDateKey,
      verification: "rule",
      title: doubleDateTitle,
      date: `${year}-${monthStr}-${monthStr}`,
      region: "BOTH",
      category: "Commerce",
      uploadWindow: {
        startMonth: "1 Bulan",
        endMonth: "Sebelum Event",
        label: "Dipersiapkan 1-2 minggu sebelum hari-H",
      },
      assets: {
        photo: [`Foto transaksi online & paket belanja ${m}.${m}`],
        vector: [`Banner 3D flash sale ${m}.${m} dan kupon cashback`],
        video: [`Animation loop banner diskon ${m}.${m}`],
      },
      palette: [
        { name: "Flash Red", hex: "#EF4444" },
        { name: "Gold Voucher", hex: "#EAB308" },
      ],
      keywords: {
        en: [`${m}.${m} sale`, "ecommerce promo", "flash sale"],
        id: [`promo ${m}.${m}`, "harbolnas", "diskon online"],
      },
      tips: `Festivitas e-commerce bulanan. Banner, ikon voucher, dan troli belanja laris manis.`,
      ipNote: "Aman: Tanpa logo e-commerce tertentu.",
      sources: [{ title: "E-commerce Calendar Guide", url: "https://stock.adobe.com" }],
      verifiedAt: new Date().toISOString(),
    });

    // Payday Sale on 25th
    const paydayKey = `payday-sale-${m}`;
    events.push({
      id: `${paydayKey}-${year}`,
      eventKey: "payday-sale",
      verification: "rule",
      title: `Payday Sale (Promo Gajian Bulan ${monthStr})`,
      date: `${year}-${monthStr}-25`,
      region: "BOTH",
      category: "Commerce",
      uploadWindow: {
        startMonth: "2 Minggu",
        endMonth: "Sebelum Event",
        label: "1-2 minggu sebelum tanggal 25",
      },
      assets: {
        photo: ["Foto dompet, kartu kredit, dan belanja gajian"],
        vector: ["Banner Payday Sale & promo gajian"],
        video: ["Motion graphics gajian sale"],
      },
      palette: [
        { name: "Money Green", hex: "#22C55E" },
        { name: "Gold", hex: "#F59E0B" },
      ],
      keywords: {
        en: ["payday sale", "discount banner", "monthly sale"],
        id: ["promo gajian", "payday sale", "diskon gajian"],
      },
      tips: "Promo rutin bulanan saat masyarakat menerima gaji.",
      ipNote: "Aman: Bebas merek.",
      sources: [{ title: "Retail Payday Guide", url: "https://www.shutterstock.com" }],
      verifiedAt: new Date().toISOString(),
    });
  }

  return events;
}

// Seasonal Date Ranges (Section 4B)
export function getSeasonalRangesForYear(year: number): SeasonalRange[] {
  return [
    {
      id: `back-to-school-${year}`,
      eventKey: "back-to-school-season",
      title: "Musim Back to School Global",
      startDate: `${year}-08-01`,
      endDate: `${year}-09-15`,
      region: "GLOBAL",
      category: "Commerce",
      description: "Musim belanja perlengkapan sekolah, kampus, dan alat tulis.",
    },
    {
      id: `autumn-season-${year}`,
      eventKey: "autumn-season",
      title: "Musim Gugur (Autumn/Fall)",
      startDate: `${year}-09-22`,
      endDate: `${year}-12-21`,
      region: "GLOBAL",
      category: "Global",
      description: "Tema dedaunan merah/oranye, labu, hangat kopi, dan sweater fashion.",
    },
    {
      id: `winter-season-${year}`,
      eventKey: "winter-season",
      title: "Musim Dingin (Winter)",
      startDate: `${year}-12-21`,
      endDate: `${year + 1}-03-20`,
      region: "GLOBAL",
      category: "Global",
      description: "Salju, liburan natal & tahun baru, olahraga es, dan minuman hangat.",
    },
    {
      id: `spring-season-${year}`,
      eventKey: "spring-season",
      title: "Musim Semi (Spring)",
      startDate: `${year}-03-20`,
      endDate: `${year}-06-21`,
      region: "GLOBAL",
      category: "Global",
      description: "Bunga bermekaran, paskah, aktivitas luar ruangan, dan kesegaran warna pastel.",
    },
    {
      id: `summer-vacation-${year}`,
      eventKey: "summer-vacation",
      title: "Musim Panas & Liburan Pantai",
      startDate: `${year}-06-21`,
      endDate: `${year}-08-31`,
      region: "GLOBAL",
      category: "Global",
      description: "Pantai, kacamata hitam, es krim, liburan keluarga, dan petualangan.",
    },
    {
      id: `pride-month-${year}`,
      eventKey: "pride-month-season",
      title: "Pride Month (Bulan Inklusivitas)",
      startDate: `${year}-06-01`,
      endDate: `${year}-06-30`,
      region: "GLOBAL",
      category: "Awareness",
      description: "Tema pelangi, keragaman, inklusivitas sosial, dan kesetaraan.",
    },
    {
      id: `breast-cancer-awareness-${year}`,
      eventKey: "breast-cancer-season",
      title: "Breast Cancer Awareness Month",
      startDate: `${year}-10-01`,
      endDate: `${year}-10-31`,
      region: "GLOBAL",
      category: "Awareness",
      description: "Pita merah muda (pink ribbon), kesehatan wanita, dan pemeriksaan dini.",
    },
    {
      id: `movember-${year}`,
      eventKey: "movember-season",
      title: "Movember (Men's Health Month)",
      startDate: `${year}-11-01`,
      endDate: `${year}-11-30`,
      region: "GLOBAL",
      category: "Awareness",
      description: "Kumis, kesehatan pria, dan kesadaran mental pria.",
    },
    {
      id: `black-friday-season-${year}`,
      eventKey: "black-friday-season",
      title: "Black Friday & Cyber Monday Season",
      startDate: `${year}-11-15`,
      endDate: `${year}-12-01`,
      region: "GLOBAL",
      category: "Commerce",
      description: "Puncak belanja diskon terbesar tahunan.",
    },
    {
      id: `holiday-season-${year}`,
      eventKey: "holiday-season",
      title: "Year-End Holiday Season",
      startDate: `${year}-12-01`,
      endDate: `${year}-12-31`,
      region: "GLOBAL",
      category: "Commerce",
      description: "Natal, kado, pesta tahun baru, keluarga, dan liburan akhir tahun.",
    },
  ];
}
