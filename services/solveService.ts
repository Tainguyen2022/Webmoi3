// React + TS service: dữ liệu mặc định, tìm kiếm thông minh (EN–VI, bỏ dấu), CRUD, localStorage

export type Pattern = {
  id: string;
  label_vi: string;
  formula_en: string;
  desc_vi: string;
  examples: string[];
  tags: string[];
  confidence?: number; // cho heuristic
};

export type Category = {
  id: string;
  title_vi: string;
  synonyms: string[]; // từ đồng nghĩa/ từ khóa kích hoạt
  patterns: Pattern[];
};

export type GiaideDB = {
  version: string;
  categories: Category[];
};

const DB_KEY = "giaideDB";
const RECENT_KEY = "giaideRecent";

export const DEFAULT_DB: GiaideDB = {
  version: "1.0.0",
  categories: [
    {
      id: "articles",
      title_vi: "Mạo từ (Articles)",
      synonyms: ["mạo", "mao", "mạo từ", "article", "art", "articles"],
      patterns: [
        {
          id: "art-n",
          label_vi: "mạo danh",
          formula_en: "Det (a/an/the) + N",
          desc_vi:
            "Dùng mạo từ trước danh từ đếm được số ít hoặc danh từ đã xác định.",
          examples: ["a book", "an apple", "the car"],
          tags: ["articles", "det+n"],
        },
        {
          id: "art-adj-n",
          label_vi: "mạo tính danh",
          formula_en: "Det + Adj + N",
          desc_vi: "Tính từ đứng trước danh từ; mạo từ đứng đầu cụm.",
          examples: ["a big house", "the new student"],
          tags: ["articles", "det+adj+n"],
        },
        {
          id: "art-adv-adj-n",
          label_vi: "mạo trạng tính danh",
          formula_en: "Det + Adv + Adj + N",
          desc_vi: "Trạng từ bổ nghĩa cho tính từ.",
          examples: ["a really big problem", "the very first day"],
          tags: ["articles", "det+adv+adj+n"],
        },
        {
          id: "art-adj-adj-n",
          label_vi: "mạo tính tính danh",
          formula_en: "Det + Adj + Adj + N",
          desc_vi:
            "Hai tính từ trước danh từ (thường theo trật tự opinion→size→age→shape→color...).",
          examples: ["a small red car", "the beautiful old town"],
          tags: ["articles", "det+adj+adj+n"],
        },
        {
          id: "art-n-prep-n",
          label_vi: "mạo danh giới",
          formula_en: "Det + N + Prep + N",
          desc_vi: "Danh từ theo sau mạo từ, rồi đến cụm giới từ.",
          examples: ["the key to success", "a guide for beginners"],
          tags: ["articles", "det+n+prep+n"],
        },
      ],
    },
    {
      id: "prepositions",
      title_vi: "Giới từ (Prepositions)",
      synonyms: ["giới", "gioi", "giới từ", "preposition", "prep", "prepositions"],
      patterns: [
        {
          id: "prep-n",
          label_vi: "giới danh",
          formula_en: "Prep + N",
          desc_vi: "Giới từ đi với danh từ/cụm danh từ.",
          examples: ["at home", "in class", "on time"],
          tags: ["prepositions", "prep+n"],
        },
        {
          id: "prep-adj-n",
          label_vi: "giới tính danh",
          formula_en: "Prep + Adj + N",
          desc_vi: "Có tính từ trước danh từ trong cụm giới từ.",
          examples: ["in big cities", "on busy streets"],
          tags: ["prepositions", "prep+adj+n"],
        },
        {
          id: "prep-adv-ving-n",
          label_vi: "giới trạng V-ing danh",
          formula_en: "Prep + Adv + V-ing + N",
          desc_vi: "Trạng từ bổ nghĩa cho V-ing trong cụm giới từ.",
          examples: ["by carefully reading books"],
          tags: ["prepositions", "prep+adv+ving+n"],
        },
        {
          id: "prep-ving",
          label_vi: "giới V-ing",
          formula_en: "Prep + V-ing",
          desc_vi: "Giới từ + V-ing (danh động từ).",
          examples: ["by studying", "without saying"],
          tags: ["prepositions", "prep+ving"],
        },
        {
          id: "prep-ving-n",
          label_vi: "giới V-ing danh",
          formula_en: "Prep + V-ing + N",
          desc_vi: "Giới từ + V-ing + bổ ngữ danh từ.",
          examples: ["by reading books"],
          tags: ["prepositions", "prep+ving+n"],
        },
        {
          id: "prep-n-prep-n",
          label_vi: "giới danh giới",
          formula_en: "Prep + N + Prep + N",
          desc_vi: "Chuỗi 2 cụm giới từ.",
          examples: ["from day to day", "from time to time"],
          tags: ["prepositions", "prep+n+prep+n"],
        },
        {
          id: "det-n-prep-n",
          label_vi: "mạo danh giới",
          formula_en: "Det + N + Prep + N",
          desc_vi: "Biến thể có mạo từ đứng trước danh từ.",
          examples: ["the way to school", "an introduction to linguistics"],
          tags: ["prepositions", "articles", "det+n+prep+n"],
        },
      ],
    },
    {
      id: "conditionals_type1",
      title_vi: "Câu điều kiện loại 1 (First Conditional)",
      synonyms: [
        "điều kiện 1",
        "câu điều kiện loại 1",
        "if loại 1",
        "condition 1",
        "first conditional",
        "real conditional",
      ],
      patterns: [
        {
          id: "if-pres-will",
          label_vi: "If + HTĐ, will + V0",
          formula_en: "If + S + V(s/es) + O, S + will + V0 (+ O)",
          desc_vi: "Diễn tả khả năng có thật ở hiện tại/tương lai.",
          examples: ["If it rains, we will stay home.", "If you study, you will pass."],
          tags: ["conditional1", "if+present,will"],
        },
        {
          id: "if-pres-imper",
          label_vi: "If + HTĐ, (please) V0",
          formula_en: "If + S + V(s/es), V0 (imperative)",
          desc_vi: "Mệnh lệnh ở mệnh đề chính.",
          examples: ["If you see him, call me.", "If you finish early, please email me."],
          tags: ["conditional1", "imperative"],
        },
        {
          id: "unless-pres-will",
          label_vi: "Unless + HTĐ, will + V0",
          formula_en: "Unless + S + V(s/es), S + will + V0",
          desc_vi: "‘Trừ khi…’ tương đương ‘If…not’.",
          examples: ["Unless you hurry, you will miss the bus."],
          tags: ["conditional1", "unless"],
        },
        {
          id: "aslongas-provided",
          label_vi: "As long as / Provided (that) + HTĐ, will + V0",
          formula_en:
            "(As long as | Provided that) + S + V(s/es), S + will + V0",
          desc_vi: "Điều kiện đủ.",
          examples: ["As long as you try, you will improve."],
          tags: ["conditional1", "linkers"],
        },
      ],
    },
    {
      id: "equal_comparison",
      title_vi: "So sánh bằng (as...as)",
      synonyms: ["so sánh bằng", "as...as", "so sanh bang", "equal comparison"],
      patterns: [
        {
          id: "be-as-adj-as",
          label_vi: "S + tobe + as + Adj + as + S + tobe",
          formula_en: "S + be + as + Adj + as + S + be",
          desc_vi: "So sánh bằng với tính từ sau động từ be.",
          examples: [
            "She is as tall as her brother.",
            "The task is as easy as it looks.",
          ],
          tags: ["comparison", "as...as", "adj"],
        },
        {
          id: "v-as-adv-as",
          label_vi: "S + V + as + Adv + as + S + V",
          formula_en: "S + V + as + Adv + as + S + V",
          desc_vi: "So sánh bằng với trạng từ.",
          examples: [
            "He runs as quickly as I do.",
            "They work as carefully as we do.",
          ],
          tags: ["comparison", "as...as", "adv"],
        },
      ],
    },
    {
      id: "heuristics",
      title_vi: "Heuristics (mẹo điền chỗ trống)",
      synonyms: [
        "hở giữa",
        "ho giua",
        "blank giữa",
        "gap giữa",
        "hở đầu",
        "ho dau",
        "hở sau",
        "ho sau",
        "blank head",
        "blank tail",
      ],
      patterns: [
        {
          id: "gap-middle-adj",
          label_vi: "hở giữa – sài tính từ",
          formula_en: "Det + ___ + N  → (Adj)",
          desc_vi:
            "Khoảng trống giữa mạo từ và danh từ thường là tính từ.",
          examples: ["the ___ book → the red book", "an ___ day → an important day"],
          tags: ["heuristic", "gap-middle"],
          confidence: 0.9,
        },
        {
          id: "gap-head-adv-verb",
          label_vi: "hở đầu – sài động từ hoặc trạng từ",
          formula_en: "___ + Det + N  → (Adv | Verb)",
          desc_vi:
            "Vị trí trước cụm danh có thể là trạng từ/động từ tùy câu.",
          examples: [
            "___ the answer is obvious → Perhaps the answer is obvious",
            "___ the students arrived → Suddenly the students arrived",
          ],
          tags: ["heuristic", "gap-head"],
          confidence: 0.7,
        },
        {
          id: "gap-tail-adv",
          label_vi: "hở sau – sài trạng từ (~80%)",
          formula_en: "Det + N + ___  → (Adv)",
          desc_vi:
            "Sau cụm danh, thường cần trạng từ để bổ nghĩa cho động từ/câu.",
          examples: [
            "He answered the question ___ → correctly",
            "They finished the task ___ → quickly",
          ],
          tags: ["heuristic", "gap-tail"],
          confidence: 0.8,
        },
      ],
    },
    {
      id: "verb_patterns",
      title_vi: "Mẫu theo sau động từ",
      synonyms: [
        "sau ngoại động từ",
        "sau nội động từ",
        "transitive",
        "intransitive",
        "vt",
        "vi",
        "tân ngữ",
        "object",
      ],
      patterns: [
        {
          id: "after-transitive",
          label_vi: "sau ngoại động từ → danh từ / tân ngữ",
          formula_en: "Vt + (N/Pronoun/that-clause)",
          desc_vi: "Ngoại động từ cần tân ngữ.",
          examples: ["buy a book", "consider it", "believe that ..."],
          tags: ["verb", "transitive", "object"],
        },
        {
          id: "after-intransitive",
          label_vi: "sau nội động từ → giới từ / trạng từ",
          formula_en: "Vi + (Prep | Adv)",
          desc_vi: "Nội động từ không cần tân ngữ trực tiếp.",
          examples: ["sleep well", "arrive at", "depend on"],
          tags: ["verb", "intransitive", "prep/adv"],
        },
      ],
    },
  ],
};

// ========= Utils =========
export function removeDiacritics(input: string): string {
  if (!input) return "";
  return input
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}
export function normalize(s: string): string {
  return removeDiacritics(s).toLowerCase().trim();
}
function tokenize(q: string): string[] {
  return normalize(q)
    .split(/[\s,;|/]+/g)
    .filter(Boolean);
}

// ========= Persistence =========
export function loadDB(): GiaideDB {
  if (typeof window === "undefined") return DEFAULT_DB;
  const raw = localStorage.getItem(DB_KEY);
  if (!raw) return structuredClone(DEFAULT_DB);
  try {
    const parsed = JSON.parse(raw) as GiaideDB;
    if (!parsed?.categories?.length) throw new Error("Invalid DB");
    return parsed;
  } catch {
    // Nếu lỗi, quay về default
    return structuredClone(DEFAULT_DB);
  }
}
export function saveDB(db: GiaideDB) {
  if (typeof window === "undefined") return;
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}
export function resetDB(): GiaideDB {
  const fresh = structuredClone(DEFAULT_DB);
  saveDB(fresh);
  return fresh;
}

// ========= Recent boost =========
function getRecent(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || "{}");
  } catch {
    return {};
  }
}
function setRecent(map: Record<string, number>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(RECENT_KEY, JSON.stringify(map));
}
export function bumpRecent(patternId: string) {
  const m = getRecent();
  m[patternId] = (m[patternId] || 0) + 1;
  setRecent(m);
}

// ========= Search =========
export type SearchResult = {
  categoryId: string;
  categoryTitle: string;
  pattern: Pattern;
  score: number;
};

function fieldScore(text: string, tokens: string[]): number {
  const norm = normalize(text);
  let score = 0;
  for (const t of tokens) {
    if (!t) continue;
    if (norm === t) score += 3; // exact
    else if (norm.startsWith(t)) score += 2; // prefix
    else if (norm.includes(t)) score += 1; // substring
  }
  return score;
}

export function search(q: string, db: GiaideDB): SearchResult[] {
  const tokens = tokenize(q);
  if (!tokens.length) return [];

  const recents = getRecent();
  const results: SearchResult[] = [];

  for (const cat of db.categories) {
    const synScore = fieldScore(cat.synonyms.join(" "), tokens); // đồng nghĩa
    for (const p of cat.patterns) {
      // tính điểm dựa trên nhiều trường
      let s = 0;
      s += synScore > 0 ? 1 : 0; // boost nếu trúng synonyms của category
      s += fieldScore(p.label_vi, tokens);
      s += fieldScore(p.formula_en, tokens);
      s += Math.min(1, fieldScore(p.desc_vi, tokens)); // desc chỉ cộng nhẹ

      // tags cũng cho điểm nhẹ
      s += Math.min(1, fieldScore(p.tags.join(" "), tokens));

      // recent boost
      const r = recents[p.id] || 0;
      if (r > 0) s += Math.log(1 + r) * 0.5;

      if (s > 0) {
        results.push({
          categoryId: cat.id,
          categoryTitle: cat.title_vi,
          pattern: p,
          score: s,
        });
      }
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

// ========= CRUD =========
export function addCategory(db: GiaideDB, cat: Category): GiaideDB {
  const exists = db.categories.some((c) => c.id === cat.id);
  if (exists) throw new Error("Category id đã tồn tại");
  const next = structuredClone(db);
  next.categories.push(cat);
  saveDB(next);
  return next;
}

export function updateCategory(
  db: GiaideDB,
  catId: string,
  updater: (draft: Category) => void
): GiaideDB {
  const next = structuredClone(db);
  const idx = next.categories.findIndex((c) => c.id === catId);
  if (idx === -1) throw new Error("Không tìm thấy category");
  updater(next.categories[idx]);
  saveDB(next);
  return next;
}

export function deleteCategory(db: GiaideDB, catId: string): GiaideDB {
  const next = structuredClone(db);
  next.categories = next.categories.filter((c) => c.id !== catId);
  saveDB(next);
  return next;
}

export function upsertPattern(
  db: GiaideDB,
  catId: string,
  pattern: Pattern
): GiaideDB {
  const next = structuredClone(db);
  const cat = next.categories.find((c) => c.id === catId);
  if (!cat) throw new Error("Không tìm thấy category");
  const idx = cat.patterns.findIndex((p) => p.id === pattern.id);
  if (idx === -1) cat.patterns.push(pattern);
  else cat.patterns[idx] = pattern;
  saveDB(next);
  return next;
}

export function deletePattern(
  db: GiaideDB,
  catId: string,
  patternId: string
): GiaideDB {
  const next = structuredClone(db);
  const cat = next.categories.find((c) => c.id === catId);
  if (!cat) throw new Error("Không tìm thấy category");
  cat.patterns = cat.patterns.filter((p) => p.id !== patternId);
  saveDB(next);
  return next;
}

// ========= Import/Export =========
export function exportJSON(db: GiaideDB): string {
  return JSON.stringify(db, null, 2);
}
export function importJSON(input: string): GiaideDB {
  const parsed = JSON.parse(input) as GiaideDB;
  if (!parsed?.categories?.length) throw new Error("JSON không hợp lệ");
  saveDB(parsed);
  return parsed;
}

// ========= Chips gợi ý =========
export const SUGGESTED_QUERIES: { label: string; query: string }[] = [
  { label: "Articles", query: "mạo" },
  { label: "Prepositions", query: "giới" },
  { label: "ĐK Loại 1", query: "điều kiện 1" },
  { label: "So sánh bằng", query: "so sánh bằng" },
  { label: "Heuristics", query: "hở giữa" },
  { label: "Verb patterns", query: "sau ngoại động từ" },
];

// ========= Hook tích hợp GrammarTag bên ngoài =========
// Nếu window.currentGrammarTag (string) tồn tại và KHÔNG nằm trong pattern.tags
// → hiển thị badge “KHÔNG KHẢ DỤNG VỚI ĐIỂM NGỮ PHÁP NÀY” (logic render ở UI).
export function isPatternInCurrentGrammar(p: Pattern): boolean {
  if (typeof window === "undefined") return true;
  const tag = (window as any)?.currentGrammarTag;
  if (!tag) return true;
  const normTag = normalize(String(tag));
  return p.tags.some((t) => normalize(t) === normTag);
}
