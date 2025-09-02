export interface Group {
  id: number;
  code: string;
  vi: string;
  en: string;
}

export interface Unit {
  id: string;
  group_id: number;
  vi: string;
  en: string;
  tags: Record<string, any>;
  canonKey: string;
  coreRef: string;
  applicable?: boolean;
}

export type Subject = 'I' | 'you' | 'we' | 'they' | 'he' | 'she' | 'it' | 'N (số nhiều)' | 'danh từ số ít';

export interface Lemma {
  type: 'verb' | 'adj' | 'adv' | 'noun' | 'prep';
  text: string;
  base?: string;
  past?: string;
  pp?: string;
  ing?: string;
  article?: string;
}

export interface Flags {
  tense: 'present' | 'past' | 'future';
  aspect: 'simple' | 'progressive' | 'perfect' | 'perfect_progressive';
  voice: 'active' | 'passive';
  polarity: 'affirmative' | 'negative' | 'interrogative';
  near_future: boolean;
  short_answer: boolean;
  contractions: boolean;
}

export interface GrammarState {
  subject: Subject;
  lemma: Lemma;
  flags: Flags;
  unitId: string | null;
}

export interface VocabItem {
    base?: string;
    past?: string;
    pp?: string;
    ing?: string;
    word?: string;
    type?: string;
    article?: string;
}

export type VocabPack = Record<string, VocabItem[]>;

export interface NewsArticle {
    id: string;
    title_en: string;
    title_vi: string;
    thumbnail: string;
    content_en: string;
    content_vi: string;
    date?: string;
    updated_at?: string;
    published?: boolean;
    category_vi?: string;
    category_en?: string;
}

export interface BugReport {
    time: string;
    route: string;
    state: GrammarState;
    message: string;
    userAgent: string;
}

// --- Types for Solve Engine ---
// Fix: Added 'GER' to TokenType to support Gerunds.
export type TokenType = 'ART' | 'ADJ' | 'ADV' | 'N' | 'V' | 'PREP' | 'CONJ' | 'EXTRA' | 'PATTERN' | 'GER';
export type AdjectiveCategory = 'opinion' | 'size' | 'age' | 'shape' | 'color' | 'origin' | 'material' | 'purpose';
export type NounCountability = 'C' | 'U' | 'B'; // Countable, Uncountable, Both
export type DeterminerConstraint = 'singular' | 'plural' | 'uncountable';

export interface Token {
  id: string;
  type: TokenType;
  vi: string;
  en: string;
  keywords?: string[];
  // Optional, type-specific properties
  category?: AdjectiveCategory; // For ADJ
  countability?: NounCountability; // For N
  irregularPlural?: string; // For N
  constraint?: DeterminerConstraint; // For ART
}

export interface PatternToken extends Token {
    type: 'PATTERN';
    templateEN: string;
    templateVI: string;
}