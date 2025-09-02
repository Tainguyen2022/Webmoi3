import { Token, TokenType, AdjectiveCategory, NounCountability, DeterminerConstraint } from '../types';

// ====== Data Store (Tokens) =========================================
const ADJECTIVE_CATEGORY_ORDER: Record<AdjectiveCategory, number> = {
  opinion: 1, size: 2, age: 3, shape: 4, color: 5, origin: 6, material: 7, purpose: 8
};

// Gerunds (from common verbs)
const GERUND_TOKENS: Token[] = [
  { id:'ger-accept', type:'GER', vi:'danh động từ (chấp nhận)', en:'accepting', keywords:['gerund','ving','chấp nhận','accept'] },
  { id:'ger-achieve', type:'GER', vi:'danh động từ (đạt được)', en:'achieving', keywords:['gerund','ving','đạt được','achieve'] },
  { id:'ger-add', type:'GER', vi:'danh động từ (thêm)', en:'adding', keywords:['gerund','ving','thêm','add'] },
  { id:'ger-admire', type:'GER', vi:'danh động từ (ngưỡng mộ)', en:'admiring', keywords:['gerund','ving','ngưỡng mộ','admire'] },
  { id:'ger-admit', type:'GER', vi:'danh động từ (thừa nhận)', en:'admitting', keywords:['gerund','ving','thừa nhận','admit'] },
  { id:'ger-advise', type:'GER', vi:'danh động từ (khuyên)', en:'advising', keywords:['gerund','ving','khuyên','advise'] },
  { id:'ger-agree', type:'GER', vi:'danh động từ (đồng ý)', en:'agreeing', keywords:['gerund','ving','đồng ý','agree'] },
  { id:'ger-allow', type:'GER', vi:'danh động từ (cho phép)', en:'allowing', keywords:['gerund','ving','cho phép','allow'] },
  { id:'ger-answer', type:'GER', vi:'danh động từ (trả lời)', en:'answering', keywords:['gerund','ving','trả lời','answer'] },
  { id:'ger-ask', type:'GER', vi:'danh động từ (hỏi)', en:'asking', keywords:['gerund','ving','hỏi','ask'] },
  { id:'ger-become', type:'GER', vi:'danh động từ (trở thành)', en:'becoming', keywords:['gerund','ving','trở thành','become'] },
  { id:'ger-begin', type:'GER', vi:'danh động từ (bắt đầu)', en:'beginning', keywords:['gerund','ving','bắt đầu','begin'] },
  { id:'ger-believe', type:'GER', vi:'danh động từ (tin tưởng)', en:'believing', keywords:['gerund','ving','tin tưởng','believe'] },
  { id:'ger-bring', type:'GER', vi:'danh động từ (mang)', en:'bringing', keywords:['gerund','ving','mang','bring'] },
  { id:'ger-build', type:'GER', vi:'danh động từ (xây dựng)', en:'building', keywords:['gerund','ving','xây dựng','build'] },
  { id:'ger-buy', type:'GER', vi:'danh động từ (mua)', en:'buying', keywords:['gerund','ving','mua','buy'] },
  { id:'ger-call', type:'GER', vi:'danh động từ (gọi)', en:'calling', keywords:['gerund','ving','gọi','call'] },
  { id:'ger-change', type:'GER', vi:'danh động từ (thay đổi)', en:'changing', keywords:['gerund','ving','thay đổi','change'] },
  { id:'ger-choose', type:'GER', vi:'danh động từ (chọn)', en:'choosing', keywords:['gerund','ving','chọn','choose'] },
  { id:'ger-clean', type:'GER', vi:'danh động từ (dọn dẹp)', en:'cleaning', keywords:['gerund','ving','dọn dẹp','clean'] },
  { id:'ger-close', type:'GER', vi:'danh động từ (đóng)', en:'closing', keywords:['gerund','ving','đóng','close'] },
  { id:'ger-come', type:'GER', vi:'danh động từ (đến)', en:'coming', keywords:['gerund','ving','đến','come'] },
  { id:'ger-cook', type:'GER', vi:'danh động từ (nấu ăn)', en:'cooking', keywords:['gerund','ving','nấu ăn','cook'] },
  { id:'ger-create', type:'GER', vi:'danh động từ (tạo ra)', en:'creating', keywords:['gerund','ving','tạo ra','create'] },
  { id:'ger-decide', type:'GER', vi:'danh động từ (quyết định)', en:'deciding', keywords:['gerund','ving','quyết định','decide'] },
  { id:'ger-develop', type:'GER', vi:'danh động từ (phát triển)', en:'developing', keywords:['gerund','ving','phát triển','develop'] },
  { id:'ger-discuss', type:'GER', vi:'danh động từ (thảo luận)', en:'discussing', keywords:['gerund','ving','thảo luận','discuss'] },
  { id:'ger-do', type:'GER', vi:'danh động từ (làm)', en:'doing', keywords:['gerund','ving','làm','do'] },
  { id:'ger-drink', type:'GER', vi:'danh động từ (uống)', en:'drinking', keywords:['gerund','ving','uống','drink'] },
  { id:'ger-drive', type:'GER', vi:'danh động từ (lái xe)', en:'driving', keywords:['gerund','ving','lái xe','drive'] },
  { id:'ger-eat', type:'GER', vi:'danh động từ (ăn)', en:'eating', keywords:['gerund','ving','ăn','eat'] },
  { id:'ger-enjoy', type:'GER', vi:'danh động từ (thích)', en:'enjoying', keywords:['gerund','ving','thích','enjoy'] },
  { id:'ger-explain', type:'GER', vi:'danh động từ (giải thích)', en:'explaining', keywords:['gerund','ving','giải thích','explain'] },
  { id:'ger-feel', type:'GER', vi:'danh động từ (cảm thấy)', en:'feeling', keywords:['gerund','ving','cảm thấy','feel'] },
  { id:'ger-find', type:'GER', vi:'danh động từ (tìm thấy)', en:'finding', keywords:['gerund','ving','tìm thấy','find'] },
  { id:'ger-finish', type:'GER', vi:'danh động từ (hoàn thành)', en:'finishing', keywords:['gerund','ving','hoàn thành','finish'] },
  { id:'ger-follow', type:'GER', vi:'danh động từ (theo dõi)', en:'following', keywords:['gerund','ving','theo dõi','follow'] },
  { id:'ger-forget', type:'GER', vi:'danh động từ (quên)', en:'forgetting', keywords:['gerund','ving','quên','forget'] },
  { id:'ger-get', type:'GER', vi:'danh động từ (nhận)', en:'getting', keywords:['gerund','ving','nhận','get'] },
  { id:'ger-give', type:'GER', vi:'danh động từ (đưa)', en:'giving', keywords:['gerund','ving','đưa','give'] },
  { id:'ger-go', type:'GER', vi:'danh động từ (đi)', en:'going', keywords:['gerund','ving','đi','go'] },
  { id:'ger-have', type:'GER', vi:'danh động từ (có)', en:'having', keywords:['gerund','ving','có','have'] },
  { id:'ger-hear', type:'GER', vi:'danh động từ (nghe)', en:'hearing', keywords:['gerund','ving','nghe','hear'] },
  { id:'ger-help', type:'GER', vi:'danh động từ (giúp đỡ)', en:'helping', keywords:['gerund','ving','giúp đỡ','help'] },
  { id:'ger-hold', type:'GER', vi:'danh động từ (cầm, giữ)', en:'holding', keywords:['gerund','ving','cầm','giữ','hold'] },
  { id:'ger-hope', type:'GER', vi:'danh động từ (hy vọng)', en:'hoping', keywords:['gerund','ving','hy vọng','hope'] },
  { id:'ger-improve', type:'GER', vi:'danh động từ (cải thiện)', en:'improving', keywords:['gerund','ving','cải thiện','improve'] },
  { id:'ger-keep', type:'GER', vi:'danh động từ (giữ)', en:'keeping', keywords:['gerund','ving','giữ','keep'] },
  { id:'ger-know', type:'GER', vi:'danh động từ (biết)', en:'knowing', keywords:['gerund','ving','biết','know'] },
  { id:'ger-learn', type:'GER', vi:'danh động từ (học)', en:'learning', keywords:['gerund','ving','học','learn'] },
  { id:'ger-leave', type:'GER', vi:'danh động từ (rời đi)', en:'leaving', keywords:['gerund','ving','rời đi','leave'] },
  { id:'ger-listen', type:'GER', vi:'danh động từ (lắng nghe)', en:'listening', keywords:['gerund','ving','lắng nghe','listen'] },
  { id:'ger-live', type:'GER', vi:'danh động từ (sống)', en:'living', keywords:['gerund','ving','sống','live'] },
  { id:'ger-look', type:'GER', vi:'danh động từ (nhìn)', en:'looking', keywords:['gerund','ving','nhìn','look'] },
  { id:'ger-lose', type:'GER', vi:'danh động từ (mất)', en:'losing', keywords:['gerund','ving','mất','lose'] },
  { id:'ger-love', type:'GER', vi:'danh động từ (yêu)', en:'loving', keywords:['gerund','ving','yêu','love'] },
  { id:'ger-make', type:'GER', vi:'danh động từ (làm, tạo)', en:'making', keywords:['gerund','ving','làm','tạo','make'] },
  { id:'ger-meet', type:'GER', vi:'danh động từ (gặp)', en:'meeting', keywords:['gerund','ving','gặp','meet'] },
  { id:'ger-move', type:'GER', vi:'danh động từ (di chuyển)', en:'moving', keywords:['gerund','ving','di chuyển','move'] },
  { id:'ger-need', type:'GER', vi:'danh động từ (cần)', en:'needing', keywords:['gerund','ving','cần','need'] },
  { id:'ger-open', type:'GER', vi:'danh động từ (mở)', en:'opening', keywords:['gerund','ving','mở','open'] },
  { id:'ger-pay', type:'GER', vi:'danh động từ (trả tiền)', en:'paying', keywords:['gerund','ving','trả tiền','pay'] },
  { id:'ger-play', type:'GER', vi:'danh động từ (chơi)', en:'playing', keywords:['gerund','ving','chơi','play'] },
  { id:'ger-practice', type:'GER', vi:'danh động từ (luyện tập)', en:'practicing', keywords:['gerund','ving','luyện tập','practice'] },
  { id:'ger-prepare', type:'GER', vi:'danh động từ (chuẩn bị)', en:'preparing', keywords:['gerund','ving','chuẩn bị','prepare'] },
  { id:'ger-protect', type:'GER', vi:'danh động từ (bảo vệ)', en:'protecting', keywords:['gerund','ving','bảo vệ','protect'] },
  { id:'ger-provide', type:'GER', vi:'danh động từ (cung cấp)', en:'providing', keywords:['gerund','ving','cung cấp','provide'] },
  { id:'ger-put', type:'GER', vi:'danh động từ (đặt, để)', en:'putting', keywords:['gerund','ving','đặt','để','put'] },
  { id:'ger-read', type:'GER', vi:'danh động từ (đọc)', en:'reading', keywords:['gerund','ving','đọc','read'] },
  { id:'ger-receive', type:'GER', vi:'danh động từ (nhận)', en:'receiving', keywords:['gerund','ving','nhận','receive'] },
  { id:'ger-remember', type:'GER', vi:'danh động từ (nhớ)', en:'remembering', keywords:['gerund','ving','nhớ','remember'] },
  { id:'ger-run', type:'GER', vi:'danh động từ (chạy)', en:'running', keywords:['gerund','ving','chạy','run'] },
  { id:'ger-say', type:'GER', vi:'danh động từ (nói)', en:'saying', keywords:['gerund','ving','nói','say'] },
  { id:'ger-see', type:'GER', vi:'danh động từ (thấy)', en:'seeing', keywords:['gerund','ving','thấy','see'] },
  { id:'ger-sell', type:'GER', vi:'danh động từ (bán)', en:'selling', keywords:['gerund','ving','bán','sell'] },
  { id:'ger-send', type:'GER', vi:'danh động từ (gửi)', en:'sending', keywords:['gerund','ving','gửi','send'] },
  { id:'ger-show', type:'GER', vi:'danh động từ (cho xem)', en:'showing', keywords:['gerund','ving','cho xem','show'] },
  { id:'ger-sing', type:'GER', vi:'danh động từ (hát)', en:'singing', keywords:['gerund','ving','hát','sing'] },
  { id:'ger-sit', type:'GER', vi:'danh động từ (ngồi)', en:'sitting', keywords:['gerund','ving','ngồi','sit'] },
  { id:'ger-sleep', type:'GER', vi:'danh động từ (ngủ)', en:'sleeping', keywords:['gerund','ving','ngủ','sleep'] },
  { id:'ger-speak', type:'GER', vi:'danh động từ (nói)', en:'speaking', keywords:['gerund','ving','nói','speak'] },
  { id:'ger-spend', type:'GER', vi:'danh động từ (dành, tiêu)', en:'spending', keywords:['gerund','ving','dành','tiêu','spend'] },
  { id:'ger-stand', type:'GER', vi:'danh động từ (đứng)', en:'standing', keywords:['gerund','ving','đứng','stand'] },
  { id:'ger-start', type:'GER', vi:'danh động từ (bắt đầu)', en:'starting', keywords:['gerund','ving','bắt đầu','start'] },
  { id:'ger-stop', type:'GER', vi:'danh động từ (dừng lại)', en:'stopping', keywords:['gerund','ving','dừng lại','stop'] },
  { id:'ger-study', type:'GER', vi:'danh động từ (học)', en:'studying', keywords:['gerund','ving','học','study'] },
  { id:'ger-suggest', type:'GER', vi:'danh động từ (đề nghị)', en:'suggesting', keywords:['gerund','ving','đề nghị','suggest'] },
  { id:'ger-take', type:'GER', vi:'danh động từ (lấy, cầm)', en:'taking', keywords:['gerund','ving','lấy','cầm','take'] },
  { id:'ger-talk', type:'GER', vi:'danh động từ (nói chuyện)', en:'talking', keywords:['gerund','ving','nói chuyện','talk'] },
  { id:'ger-teach', type:'GER', vi:'danh động từ (dạy)', en:'teaching', keywords:['gerund','ving','dạy','teach'] },
  { id:'ger-tell', type:'GER', vi:'danh động từ (kể, bảo)', en:'telling', keywords:['gerund','ving','kể','bảo','tell'] },
  { id:'ger-think', type:'GER', vi:'danh động từ (nghĩ)', en:'thinking', keywords:['gerund','ving','nghĩ','think'] },
  { id:'ger-travel', type:'GER', vi:'danh động từ (du lịch)', en:'traveling', keywords:['gerund','ving','du lịch','travel'] },
  { id:'ger-try', type:'GER', vi:'danh động từ (thử)', en:'trying', keywords:['gerund','ving','thử','try'] },
  { id:'ger-understand', type:'GER', vi:'danh động từ (hiểu)', en:'understanding', keywords:['gerund','ving','hiểu','understand'] },
  { id:'ger-use', type:'GER', vi:'danh động từ (sử dụng)', en:'using', keywords:['gerund','ving','sử dụng','use'] },
  { id:'ger-wait', type:'GER', vi:'danh động từ (đợi)', en:'waiting', keywords:['gerund','ving','đợi','wait'] },
  { id:'ger-walk', type:'GER', vi:'danh động từ (đi bộ)', en:'walking', keywords:['gerund','ving','đi bộ','walk'] },
  { id:'ger-want', type:'GER', vi:'danh động từ (muốn)', en:'wanting', keywords:['gerund','ving','muốn','want'] },
  { id:'ger-watch', type:'GER', vi:'danh động từ (xem)', en:'watching', keywords:['gerund','ving','xem','watch'] },
  { id:'ger-wear', type:'GER', vi:'danh động từ (mặc)', en:'wearing', keywords:['gerund','ving','mặc','wear'] },
  { id:'ger-win', type:'GER', vi:'danh động từ (thắng)', en:'winning', keywords:['gerund','ving','thắng','win'] },
  { id:'ger-work', type:'GER', vi:'danh động từ (làm việc)', en:'working', keywords:['gerund','ving','làm việc','work'] },
  { id:'ger-write', type:'GER', vi:'danh động từ (viết)', en:'writing', keywords:['gerund','ving','viết','write'] },
];

export const TOKENS: Token[] = [
  ...GERUND_TOKENS,
  // Articles & Determiners
  { id:'art-a',   type:'ART', vi:'mạo từ (a/an)', en:'a',  keywords:['mạo','article','a','an'], constraint: 'singular' },
  { id:'art-the', type:'ART', vi:'mạo từ (the)',  en:'the',keywords:['mạo','article','the','đích danh'] },
  { id:'art-zero',type:'ART', vi:'mạo từ rỗng (Ø)', en:'', keywords:['mạo','rỗng', 'zero', 'không mạo từ']},
  { id:'art-this',type:'ART', vi:'chỉ định (this)', en:'this', keywords:['chỉ định', 'this', 'này'], constraint: 'singular'},
  { id:'art-that',type:'ART', vi:'chỉ định (that)', en:'that', keywords:['chỉ định', 'that', 'đó', 'kia'], constraint: 'singular'},
  { id:'art-these',type:'ART', vi:'chỉ định (these)', en:'these', keywords:['chỉ định', 'these', 'những này'], constraint: 'plural'},
  { id:'art-those',type:'ART', vi:'chỉ định (those)', en:'those', keywords:['chỉ định', 'those', 'những đó', 'những kia'], constraint: 'plural'},

  // Quantifiers
  { id:'quant-many', type:'ART', vi:'lượng (many)', en:'many', keywords:['lượng', 'nhiều', 'many'], constraint: 'plural'},
  { id:'quant-much', type:'ART', vi:'lượng (much)', en:'much', keywords:['lượng', 'nhiều', 'much'], constraint: 'uncountable'},
  { id:'quant-few', type:'ART', vi:'lượng (few)', en:'few', keywords:['lượng', 'ít', 'few'], constraint: 'plural'},
  { id:'quant-little', type:'ART', vi:'lượng (little)', en:'little', keywords:['lượng', 'ít', 'little'], constraint: 'uncountable'},
  { id:'quant-a-few', type:'ART', vi:'lượng (a few)', en:'a few', keywords:['lượng', 'một vài', 'a few'], constraint: 'plural'},
  { id:'quant-a-little', type:'ART', vi:'lượng (a little)', en:'a little', keywords:['lượng', 'một chút', 'a little'], constraint: 'uncountable'},
  
  // Adverbs of Degree
  { id:'adv-very', type:'ADV', vi:'trạng (rất)', en:'very', keywords:['trạng','rất','very','degree'] },

  // Adjectives with categories
  { id:'adj-big',       type:'ADJ', vi:'tính (to/lớn)', en:'big',       keywords:['tính','to','lớn','big'], category: 'size' },
  { id:'adj-handsome',  type:'ADJ', vi:'tính (đẹp trai)', en:'handsome', keywords:['tính','đẹp trai','handsome'], category: 'opinion' },
  { id:'adj-beautiful', type:'ADJ', vi:'tính (đẹp)', en:'beautiful', keywords:['tính','đẹp','beautiful'], category: 'opinion' },
  { id:'adj-old',       type:'ADJ', vi:'tính (cũ/già)', en:'old', keywords:['tính','cũ', 'già', 'old'], category: 'age'},
  { id:'adj-red',       type:'ADJ', vi:'tính (đỏ)', en:'red', keywords:['tính','đỏ', 'red'], category: 'color'},


  // Nouns with countability
  { id:'n-man',   type:'N', vi:'danh (người đàn ông)', en:'man',   keywords:['danh','người đàn ông','man'], countability: 'C', irregularPlural: 'men' },
  { id:'n-woman', type:'N', vi:'danh (người phụ nữ)',  en:'woman', keywords:['danh','người phụ nữ','woman'], countability: 'C', irregularPlural: 'women' },
  { id:'n-apple', type:'N', vi:'danh (quả táo)',       en:'apple', keywords:['danh','quả táo','apple'], countability: 'C' },
  { id:'n-information', type:'N', vi:'danh (thông tin)', en:'information', keywords:['danh','thông tin', 'information'], countability: 'U'},
];

// ====== Search Helpers ==============================================
export const SUGGESTIONS = [
  'mạo','danh','tính','trạng','động','giới','liên',
  'số ít','số nhiều','rút gọn','so sánh','đảo ngữ',
  'loại 1','loại 2','loại 3','giả định','nhất','hơn','bằng',
  'Gerund','V chính','V phụ','sở hữu','of','khiếm khuyết'
];

function removeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
}

export function searchTokens(q: string): Token[] {
  const s = removeAccents((q || '').trim().toLowerCase());
  if (!s) return TOKENS;
  return TOKENS.filter(t => {
    const hay = removeAccents([t.vi, t.en, ...(t.keywords||[])].join(' ').toLowerCase());
    return hay.includes(s);
  });
}

// ====== Composition Engine Helpers ==================================
function chooseIndefiniteArticle(nextWord: string): 'a'|'an' {
  if (!nextWord) return 'a';
  const lowerWord = nextWord.toLowerCase();
  // Handle exceptions first
  if (['university', 'user', 'european', 'one', 'ufo'].some(ex => lowerWord.startsWith(ex))) {
    return 'a';
  }
  if (['hour', 'honest', 'honor', 'heir'].some(ex => lowerWord.startsWith(ex))) {
    return 'an';
  }
  // General rule
  return /^[aeiou]/i.test(lowerWord) ? 'an' : 'a';
}

function pluralize(noun: Token): string {
    if (noun.countability === 'U') return noun.en;
    if (noun.irregularPlural) return noun.irregularPlural;
    
    const word = noun.en;
    if (/(s|x|z|ch|sh)$/.test(word)) return `${word}es`;
    if (/[bcdfghjklmnpqrstvwxyz]y$/.test(word)) return `${word.slice(0, -1)}ies`;
    return `${word}s`;
}

function sortAdjectives(adjs: Token[]): Token[] {
    return [...adjs].sort((a, b) => {
        const orderA = a.category ? ADJECTIVE_CATEGORY_ORDER[a.category] : 99;
        const orderB = b.category ? ADJECTIVE_CATEGORY_ORDER[b.category] : 99;
        return orderA - orderB;
    });
}

// ====== Composition Engine ==========================================
export type ComposeArgs = { article: Token|null, adjs: Token[], advs: Token[], noun: Token|null };
export type ValidationResult = { warnings: string[], explanations: string[] };

export function composeEN({ article, adjs, advs, noun }: ComposeArgs): string {
  if (!noun) return '';
  
  let finalNoun = noun.en;
  if (article && (article.constraint === 'plural')) {
      finalNoun = pluralize(noun);
  }

  const sortedAdjs = sortAdjectives(adjs);
  const adjWords = sortedAdjs.map(a => a.en);
  const advWords = advs.map(a => a.en);

  if (advWords.length && adjWords.length) {
    adjWords[0] = `${advWords.join(' ')} ${adjWords[0]}`.trim();
  }

  const head = adjWords[0] || finalNoun;
  const art = article?.en === 'a' ? chooseIndefiniteArticle(head) : article?.en;

  const phrase = [
    art,
    ...adjWords,
    finalNoun,
  ].filter(w => w != null && w !== '').join(' ');

  return phrase.replace(/\s+/g,' ').trim();
}

function viArticleFromEnArt(enArt?: string): string {
  if (!enArt) return '';
  if (enArt === 'a' || enArt === 'an') return 'một';
  if (enArt === 'the') return '';
  if (['this', 'that'].includes(enArt)) return 'này/đó';
  if (['these', 'those'].includes(enArt)) return 'những... này/đó';
  return enArt;
}

export function composeVI({ article, adjs, advs, noun }: ComposeArgs): string {
  if (!noun) return '';
  
  const nounVI = noun.vi.match(/\((.*?)\)/)?.[1] || noun.en;
  const sortedAdjs = sortAdjectives(adjs);
  const adjVI = sortedAdjs.map(a => a.vi.match(/\((.*?)\)/)?.[1] || a.en);

  const degree = advs.length ? 'rất ' : '';
  const maybeDegree = (!advs.length && adjVI.length >= 2) ? 'rất ' : degree;

  const viAdj = adjVI.length
    ? (maybeDegree + adjVI[0]) + (adjVI.slice(1).length ? ' ' + adjVI.slice(1).join(' ') : '')
    : '';

  const artVI = viArticleFromEnArt(article?.en);
  const isPlural = article && article.constraint === 'plural';

  let parts: string[] = [];
  if (artVI === 'một') {
      parts = [artVI, nounVI, viAdj];
  } else if (artVI.startsWith('những')) {
      parts = [artVI.split('...')[0], nounVI, viAdj, artVI.split('...')[1]];
  } else if (artVI === 'này/đó') {
      parts = [nounVI, viAdj, artVI];
  } else {
      parts = [(isPlural ? 'những ' : ''), nounVI, viAdj];
  }

  return parts.filter(Boolean).join(' ').replace(/\s+/g,' ').trim();
}

// ====== Validator & Explanations ===================================
export function validator({ article, adjs, advs, noun }: ComposeArgs): ValidationResult {
    const warnings: string[] = [];
    const explanations: string[] = [];
    
    if (!noun) return { warnings: ['Vui lòng chọn một danh từ.'], explanations: [] };

    if (article) {
        if (article.constraint === 'singular' && noun.countability === 'U') {
            warnings.push(`'${article.en}' không thể đi với danh từ không đếm được '${noun.en}'.`);
        }
        if (article.constraint === 'plural' && noun.countability !== 'C') {
            warnings.push(`'${article.en}' chỉ đi với danh từ đếm được số nhiều. '${noun.en}' không phù hợp.`);
        }
        if (article.constraint === 'uncountable' && noun.countability !== 'U') {
             warnings.push(`'${article.en}' chỉ đi với danh từ không đếm được. '${noun.en}' không phù hợp.`);
        }
    }
    
    if (article?.en === 'a') {
        const nextWord = adjs.length > 0 ? adjs[0].en : noun.en;
        const correctArticle = chooseIndefiniteArticle(nextWord);
        explanations.push(`Dùng '${correctArticle}' vì từ tiếp theo '${nextWord}' bắt đầu bằng một ${correctArticle === 'an' ? 'nguyên âm' : 'phụ âm'}.`);
    }

    if (adjs.length > 1) {
        const sorted = sortAdjectives(adjs).map(a => a.en).join(', ');
        explanations.push(`Các tính từ được sắp xếp theo trật tự OSASCOMP: ${sorted}.`);
    }

    return { warnings, explanations };
}

// Stub for TOEIC patterns
export function composePattern(sel: any): { en: string; vi: string } {
    return { en: 'Pattern not implemented yet.', vi: 'Mẫu câu chưa được cài đặt.' };
}