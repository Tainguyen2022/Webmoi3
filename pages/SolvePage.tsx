import React from 'react';
import { TOKENS, searchTokens } from '../services/solveEngine';
import { searchRecipesByKeyword, RecipeDef, Slot } from '../services/recipeRegistry';
import { Token } from '../types';

// ===== VIỆT HOÁ =====
const VI_SLOT: Record<Slot,string> = {
  ART:'MẠO', ADJ:'TÍNH', ADV:'TRẠNG', N:'DANH', PREP:'GIỚI', GER:'V-ING', N_MOD:'DANH PHỤ', N_HEAD:'DANH CHÍNH'
};
const titleVIFromSlots = (slots:Slot[]) => slots.map(s=>VI_SLOT[s]).join(' + ');

// ===== Helper sinh câu (song ngữ) theo SLOT (giữ logic gọn cho NP/PP/GER)
const AN = ['hour','honest','honor','heir'];
const A  = ['university','user','european','one','once','ufo','url','unicorn'];
const aOrAn = (w:string)=> AN.some(x=>w?.toLowerCase().startsWith(x)) ? 'an'
  : A.some(x=>w?.toLowerCase().startsWith(x)) ? 'a'
  : /^[aeiou]/i.test(w||'') ? 'an' : 'a';
const viPrep = (p:string)=>({of:'của',in:'trong',on:'trên',at:'tại',with:'với',for:'cho',by:'bằng',to:'đến',from:'từ'} as any)[p]||p;
const viNoun = (n:string)=>({man:'người đàn ông',woman:'người phụ nữ',apple:'quả táo',report:'báo cáo',team:'đội',information:'thông tin',work:'công việc'} as any)[n]||n;

type RecipeUI = { id:string; title:string; slots:Slot[]; picks:(Token|null)[]; open:boolean; outEN?:string; outVI?:string };

function buildOutputsBySlots(r:RecipeUI){
  const get=(slot:Slot,nth=1)=>{let c=0;for(let i=0;i<r.slots.length;i++){if(r.slots[i]===slot){c++;if(c===nth)return r.picks[i]}}return null};
  const ART=get('ART')?.en, ADJ1=get('ADJ',1)?.en, ADJ2=get('ADJ',2)?.en, ADV=get('ADV')?.en, PREP=get('PREP')?.en;
  const GER=get('GER')?.en, N1=get('N',1)?.en, N2=get('N',2)?.en, NMOD=get('N_MOD')?.en, NHEAD=get('N_HEAD')?.en;
  const ADJvi1=get('ADJ',1)?.vi, ADJvi2=get('ADJ',2)?.vi, ADVvi=get('ADV')?.vi, n1vi=N1?viNoun(N1):'', n2vi=N2?viNoun(N2):'', nmodvi=NMOD?viNoun(NMOD):'', nheadvi=NHEAD?viNoun(NHEAD):'';
  if (r.slots.some((_,i)=>!r.picks[i])) return {en:'',vi:''};
  const S=r.slots.join(',');
  switch(S){
    case 'ART,N':{
      const det=ART==='a'?aOrAn(N1||''):ART==='Ø'?'':ART||'';
      return { en:[det,N1].filter(Boolean).join(' '), vi:[(ART==='a'||ART==='an')?'1':'',n1vi].filter(Boolean).join(' ') };
    }
    case 'ART,ADJ,N':
    case 'ART,ADJ,ADJ,N':
    case 'ART,ADV,ADJ,N':{
      const head=ADJ1||N1||''; const det=ART==='a'?aOrAn(head):ART==='Ø'?'':ART||'';
      const en=[det,ADV,ADJ1,ADJ2,N1].filter(Boolean).join(' ').replace(/\s+/g,' ');
      const vi=[(ART==='a'||ART==='an')?'1':'',n1vi, ((ADVvi?ADVvi+' ':'')+[ADJvi1,ADJvi2].filter(Boolean).join(' ')).trim()].filter(Boolean).join(' ');
      return {en,vi};
    }
    case 'ART,N,PREP,N':
    case 'ADJ,N,PREP,N':{
      const det=ART==='a'?aOrAn(N1||''):ART==='Ø'?'':ART||'';
      const left=ART?[det,N1]:[ADJ1,N1];
      return { en:[...left,PREP,N2].filter(Boolean).join(' '), vi:[ART?((ART==='a'||ART==='an')?'1':''):'',n1vi,ADJvi1||'',viPrep(PREP||''),n2vi].filter(Boolean).join(' ').replace(/\s+/g,' ') };
    }
    case 'PREP,N':{ return {en:[PREP,N1].join(' '), vi:[viPrep(PREP||''),n1vi].join(' ')} }
    case 'PREP,ADJ,N':{ return {en:[PREP,ADJ1,N1].join(' '), vi:[viPrep(PREP||''),n1vi,ADJvi1||''].filter(Boolean).join(' ')} }
    case 'PREP,ADV,ADJ,N':{ return {en:[PREP,ADV,ADJ1,N1].join(' '), vi:[viPrep(PREP||''),n1vi,((ADVvi?ADVvi+' ':'')+(ADJvi1||'')).trim()].join(' ')} }
    case 'PREP,ART,N':{
      const det=ART==='a'?aOrAn(N1||''):ART==='Ø'?'':ART||'';
      return {en:[PREP,det,N1].filter(Boolean).join(' '), vi:[viPrep(PREP||''),(ART==='a'||ART==='an')?'1':'',n1vi].filter(Boolean).join(' ')}
    }
    case 'PREP,ART,ADJ,N':{
      const head=ADJ1||N1||''; const det=ART==='a'?aOrAn(head):ART==='Ø'?'':ART||'';
      return {en:[PREP,det,ADJ1,N1].filter(Boolean).join(' '), vi:[viPrep(PREP||''),(ART==='a'||ART==='an')?'1':'',n1vi,ADJvi1||''].filter(Boolean).join(' ')}
    }
    case 'GER,N':{ return {en:[GER,N1].join(' '), vi:[(GER?`việc ${viNoun((GER||'').replace(/ing$/,''))}`:''),n1vi].filter(Boolean).join(' ')} }
    case 'ADV,GER,N':{ return {en:[ADV,GER,N1].join(' '), vi:[((ADVvi?ADVvi+' ':'')+(GER?`việc ${viNoun((GER||'').replace(/ing$/,''))}`:'')).trim(),n1vi].filter(Boolean).join(' ')} }
    case 'PREP,GER,N':{ return {en:[PREP,GER,N1].join(' '), vi:[viPrep(PREP||''),(GER?`việc ${viNoun((GER||'').replace(/ing$/,''))}`:''),n1vi].filter(Boolean).join(' ')} }
    case 'PREP,ADV,GER,N':{ return {en:[PREP,ADV,GER,N1].join(' '), vi:[viPrep(PREP||''),((ADVvi?ADVvi+' ':'')+(GER?`việc ${viNoun((GER||'').replace(/ing$/,''))}`:'')).trim(),n1vi].filter(Boolean).join(' ')} }
    case 'PREP,N,PREP,N':{ return {en:[PREP,N1,PREP,N2].join(' '), vi:[viPrep(PREP||''),n1vi,viPrep(PREP||''),n2vi].join(' ')} }
    case 'N_MOD,N_HEAD':{ return {en:[NMOD,NHEAD].join(' '), vi:[nheadvi,nmodvi].join(' ')} }
    case 'PREP,N_MOD,N_HEAD':{ return {en:[PREP,NMOD,NHEAD].join(' '), vi:[viPrep(PREP||''),nheadvi,nmodvi].join(' ')} }
    default:{ const en=r.picks.map(p=>p?.en||'').filter(Boolean).join(' '); const vi=r.picks.map(p=>p?.vi||'').filter(Boolean).join(' '); return {en,vi}; }
  }
}

export default function SolvePage(){
  // chips (viết tắt) bên trái
  const [query,setQuery]=React.useState(''); const [tab,setTab]=React.useState<'ALL'|'ART'|'N'|'ADJ'|'ADV'|'PREP'|'GER'>('ALL');
  const [results,setResults]=React.useState<Token[]>(TOKENS as Token[]);
  React.useEffect(()=>{ let list=searchTokens(query); if(tab!=='ALL') list=list.filter(t=>t.type===tab); setResults(list); },[query,tab]);

  // recipes by keyword
  const [kw,setKw]=React.useState('mạo'); const [page,setPage]=React.useState(1); const [total,setTotal]=React.useState(0);
  const [recipes,setRecipes]=React.useState<RecipeUI[]>([]);
  React.useEffect(()=>{ loadByKeyword(kw,1,true); },[]);

  function loadByKeyword(keyword:string,p=1,reset=false){
    const {recipes:defs,total}=searchRecipesByKeyword(keyword,p,30);
    const data:RecipeUI[]=defs.map((d,i)=>({id:d.id,title:titleVIFromSlots(d.slots),slots:d.slots,picks:d.slots.map(()=>null),open:reset?i===0:false}));
    setTotal(total); setPage(p); setKw(keyword