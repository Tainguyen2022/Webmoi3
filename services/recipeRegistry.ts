// services/recipeRegistry.ts
export type Slot = 'ART'|'ADJ'|'ADV'|'N'|'PREP'|'GER'|'N_MOD'|'N_HEAD';
export type RecipeDef = { id: string; title: string; slots: Slot[]; tags: string[] };

let autoId = 1;
const mkId = (p:string) => `${p}-${autoId++}`;
export const normalize = (s:string) =>
  (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();

// ——— KEYWORD → GROUP (đủ cho Part 5; có alias tiếng Việt/không dấu/EN)
type Group = 'ARTICLE'|'PREP'|'GERUND'|'COMPOUND'|'OF_PHRASE'|'ADJ_NP'|'PART5';
const ALIASES: Record<Group, string[]> = {
  ARTICLE:  ['mạo','mao','mạo từ','mao tu','article','art','determiner'],
  PREP:     ['giới','gioi','giới từ','gioi tu','prep','preposition'],
  GERUND:   ['v-ing','ving','gerund','danh hóa','danh hoa'],
  COMPOUND: ['danh ghép','danh ghep','n-n','danh phụ','danh phu','compound noun'],
  OF_PHRASE:['of','of-phrase','n of n','cụm of','cum of'],
  ADJ_NP:   ['tính','adj + n','adjective + noun','so sánh','so sanh','comparative','superlative'],
  PART5:    ['giải toeic','giai toeic','giải đề','giai de','toeic part 5','part 5']
};

// ——— THAM SỐ NỞ MẪU
const MAX_ADJ = 2;             // số tính tối đa
const PREP_COMPLEMENTS = 1;    // số cụm PREP bổ nghĩa sau danh
const INCLUDE_PREP_CHAIN = true; // cho phép PREP + N + PREP + N

// ——— FACTORIES
const adjSlots = (n:number)=> Array.from({length:n}, ()=> 'ADJ' as Slot);

function genDetNP(): RecipeDef[] {
  const out: RecipeDef[] = [];
  for (let a=0;a<=MAX_ADJ;a++){
    out.push({ id: mkId('DET'),
      title: `ART + ${a?`ADJ ×${a} + `:''}N`,
      slots: (['ART'] as Slot[]).concat(adjSlots(a),['N']),
      tags:['article','np']
    });
    if (PREP_COMPLEMENTS>0){
      out.push({ id: mkId('DET_PP'),
        title:`ART + ${a?`ADJ ×${a} + `:''}N + PREP + N`,
        slots:(['ART'] as Slot[]).concat(adjSlots(a),['N','PREP','N']),
        tags:['article','np','pp']
      });
    }
  }
  return out;
}

function genPrepNP(): RecipeDef[] {
  const out: RecipeDef[] = [];
  // PREP + N ; PREP + ADJ*N ; PREP + ART (+ ADJ*N)
  for (let a=0;a<=MAX_ADJ;a++){
    out.push({ id: mkId('PREP_N'), title:`PREP + ${a?`ADJ ×${a} + `:''}N`,
      slots:(['PREP'] as Slot[]).concat(adjSlots(a),['N']), tags:['prep','pp'] });
    out.push({ id: mkId('PREP_ART_N'), title:`PREP + ART + ${a?`ADJ ×${a} + `:''}N`,
      slots:(['PREP','ART'] as Slot[]).concat(adjSlots(a),['N']), tags:['prep','pp'] });
  }
  if (INCLUDE_PREP_CHAIN){
    out.push({ id: mkId('PREP_CHAIN'), title:'PREP + N + PREP + N',
      slots:['PREP','N','PREP','N'], tags:['prep','pp'] });
  }
  return out;
}

function genGerund(): RecipeDef[] {
  return [
    { id: mkId('GER_N'),        title:'GER (V-ing) + N',           slots:['GER','N'],              tags:['gerund','np'] },
    { id: mkId('ADV_GER_N'),    title:'ADV + GER + N',             slots:['ADV','GER','N'],        tags:['gerund','np'] },
    { id: mkId('PREP_GER_N'),   title:'PREP + GER (V-ing) + N',    slots:['PREP','GER','N'],       tags:['gerund','prep','pp'] },
    { id: mkId('P_ADV_GER_N'),  title:'PREP + ADV + GER + N',      slots:['PREP','ADV','GER','N'], tags:['gerund','prep','pp'] },
  ];
}

function genCompound(): RecipeDef[] {
  return [
    { id: mkId('NN'),         title:'N-MOD + N-HEAD',          slots:['N_MOD','N_HEAD'],       tags:['compound','np'] },
    { id: mkId('PREP_NN'),    title:'PREP + N-MOD + N-HEAD',   slots:['PREP','N_MOD','N_HEAD'], tags:['compound','prep','pp'] },
  ];
}

function genOfPhrase(): RecipeDef[] {
  return [
    { id: mkId('N_OF_N'),      title:'N + PREP(of) + N',        slots:['N','PREP','N'],        tags:['of','pp','np'] },
    { id: mkId('ADJ_N_OF_N'),  title:'ADJ + N + PREP(of) + N',  slots:['ADJ','N','PREP','N'],  tags:['of','pp','np'] },
  ];
}

function genAdjNP(): RecipeDef[] {
  return [
    { id: mkId('ADJ_N'),       title:'ADJ + N',                  slots:['ADJ','N'],            tags:['adj-n','np'] },
    { id: mkId('ADV_ADJ_N'),   title:'ADV + ADJ + N',            slots:['ADV','ADJ','N'],      tags:['adj-n','np'] },
  ];
}

function resolveGroups(q:string): Group[] {
  const nq = normalize(q);
  const hits: Group[] = [];
  (Object.keys(ALIASES) as Group[]).forEach(g=>{
    if (ALIASES[g].some(a=>normalize(a).includes(nq) || nq.includes(normalize(a)))) hits.push(g);
  });
  if (!hits.length) return ['ARTICLE']; // fallback để luôn có kết quả
  if (hits.includes('PART5')) return ['ARTICLE','PREP','GERUND','OF_PHRASE','COMPOUND','ADJ_NP'];
  return hits;
}

function buildByGroup(g:Group): RecipeDef[] {
  switch(g){
    case 'ARTICLE':   return genDetNP();
    case 'PREP':      return [...genPrepNP(), ...genGerund(), ...genOfPhrase()];
    case 'GERUND':    return genGerund();
    case 'COMPOUND':  return genCompound();
    case 'OF_PHRASE': return genOfPhrase();
    case 'ADJ_NP':    return genAdjNP();
    case 'PART5':     return []; // đã expand ở resolveGroups
  }
}

export function searchRecipesByKeyword(q:string, page=1, pageSize=30){
  autoId = 1;
  const groups = resolveGroups(q);
  let pool: RecipeDef[] = [];
  groups.forEach(g => pool = pool.concat(buildByGroup(g)));
  // uniq theo (title+slots)
  const seen = new Set<string>(), uniq: RecipeDef[] = [];
  for (const r of pool){
    const key = r.title + '|' + r.slots.join(',');
    if (!seen.has(key)){ seen.add(key); uniq.push(r); }
  }
  const total = uniq.length;
  const start = (page-1)*pageSize;
  return { recipes: uniq.slice(start, start+pageSize), total };
}
