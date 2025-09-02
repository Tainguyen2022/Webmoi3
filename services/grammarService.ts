import { GrammarState, Unit, Flags, Subject, Lemma } from '../types';
import { units } from '../data/units';

// --- Type Definitions (from user suggestion) ---
type Polarity = 'affirmative' | 'negative';
type Pronoun = 'I' | 'you' | 'we' | 'they' | 'he' | 'she' | 'it';
type Aux =
  | 'do' | 'does' | 'did'
  | 'am' | 'is' | 'are'
  | 'was' | 'were'
  | 'have' | 'has' | 'had'
  | 'will' | 'would'
  | 'can' | 'could'
  | 'should' | 'may' | 'might';

// --- Lookup Tables (from user suggestion) ---
const YES: Record<Pronoun, string> = { I:'Yes, I', you:'Yes, you', we:'Yes, we', they:'Yes, they', he:'Yes, he', she:'Yes, she', it:'Yes, it' } as const;
const NO: Record<Pronoun, string> = { I:'No, I', you:'No, you', we:'No, we', they:'No, they', he:'No, he', she:'No, she', it:'No, it' } as const;

const AUX_AFFIRM: Record<Aux, Record<Pronoun, string>> = {
  do:   { I:'do',   you:'do',  we:'do',  they:'do',  he:'does', she:'does', it:'does' },
  does: { I:'do',   you:'do',  we:'do',  they:'do',  he:'does', she:'does', it:'does' },
  did:  { I:'did',  you:'did', we:'did', they:'did', he:'did',  she:'did',  it:'did'  },
  am:   { I:'am',   you:'are', we:'are', they:'are', he:'is',   she:'is',   it:'is'   },
  is:   { I:'am',   you:'are', we:'are', they:'are', he:'is',   she:'is',   it:'is'   },
  are:  { I:'am',   you:'are', we:'are', they:'are', he:'is',   she:'is',   it:'is'   },
  was:  { I:'was',  you:'were',we:'were',they:'were',he:'was', she:'was',  it:'was'  },
  were: { I:'was',  you:'were',we:'were',they:'were',he:'was', she:'was',  it:'was'  },
  have: { I:'have', you:'have',we:'have',they:'have',he:'has', she:'has',  it:'has'  },
  has:  { I:'have', you:'have',we:'have',they:'have',he:'has', she:'has',  it:'has'  },
  had:  { I:'had',  you:'had', we:'had', they:'had', he:'had',  she:'had',  it:'had'  },
  will: { I:'will', you:'will',we:'will',they:'will',he:'will',she:'will', it:'will' },
  would:{ I:'would',you:'would',we:'would',they:'would',he:'would',she:'would',it:'would' },
  can:  { I:'can',  you:'can', we:'can', they:'can', he:'can',  she:'can',  it:'can'  },
  could:{ I:'could',you:'could',we:'could',they:'could',he:'could',she:'could',it:'could' },
  should:{I:'should',you:'should',we:'should',they:'should',he:'should',she:'should',it:'should'},
  may:  { I:'may',  you:'may', we:'may', they:'may', he:'may',  she:'may',  it:'may'  },
  might:{ I:'might',you:'might',we:'might',they:'might',he:'might',she:'might',it:'might' },
} as const;

const AUX_NEG: Record<Aux, Record<Pronoun, string>> = {
  do:   { I:"don't",   you:"don't",  we:"don't",  they:"don't",  he:"doesn't", she:"doesn't", it:"doesn't" },
  does: { I:"don't",   you:"don't",  we:"don't",  they:"don't",  he:"doesn't", she:"doesn't", it:"doesn't" },
  did:  { I:"didn't",  you:"didn't", we:"didn't", they:"didn't", he:"didn't",  she:"didn't",  it:"didn't"  },
  am:   { I:"am not",  you:"aren't", we:"aren't", they:"aren't", he:"isn't",  she:"isn't",  it:"isn't"  },
  is:   { I:"am not",  you:"aren't", we:"aren't", they:"aren't", he:"isn't",  she:"isn't",  it:"isn't"  },
  are:  { I:"am not",  you:"aren't", we:"aren't", they:"aren't", he:"isn't",  she:"isn't",  it:"isn't"  },
  was:  { I:"wasn't",  you:"weren't",we:"weren't",they:"weren't",he:"wasn't",she:"wasn't", it:"wasn't" },
  were: { I:"wasn't",  you:"weren't",we:"weren't",they:"weren't",he:"wasn't",she:"wasn't", it:"wasn't" },
  have: { I:"haven't", you:"haven't",we:"haven't",they:"haven't",he:"hasn't",she:"hasn't", it:"hasn't" },
  has:  { I:"haven't", you:"haven't",we:"haven't",they:"haven't",he:"hasn't",she:"hasn't", it:"hasn't" },
  had:  { I:"hadn't",  you:"hadn't", we:"hadn't", they:"hadn't", he:"hadn't", she:"hadn't", it:"hadn't" },
  will: { I:"won't",   you:"won't",  we:"won't",  they:"won't",  he:"won't", she:"won't", it:"won't" },
  would:{ I:"wouldn't",you:"wouldn't",we:"wouldn't",they:"wouldn't",he:"wouldn't",she:"wouldn't",it:"wouldn't" },
  can:  { I:"can't",   you:"can't",  we:"can't",  they:"can't",  he:"can't", she:"can't", it:"can't" },
  could:{ I:"couldn't",you:"couldn't",we:"couldn't",they:"couldn't",he:"couldn't",she:"couldn't",it:"couldn't" },
  should:{I:"shouldn't",you:"shouldn't",we:"shouldn't",they:"shouldn't",he:"shouldn't",she:"shouldn't",it:"shouldn't"},
  may:  { I:"may not", you:"may not",we:"may not",they:"may not",he:"may not",she:"may not",it:"may not" },
  might:{ I:"might not",you:"might not",we:"might not",they:"might not",he:"might not",she:"might not",it:"might not" },
} as const;


// --- Helper Functions ---
const isThirdPersonSingular = (subject: Subject) => ['he', 'she', 'it', 'danh từ số ít'].includes(subject);

const getPronoun = (subject: Subject): string => {
    const subjectMap = {
        'I': 'I', 'you': 'you', 'we': 'we', 'they': 'they', 'he': 'he', 'she': 'she', 'it': 'it',
        'N (số nhiều)': 'the students',
        'danh từ số ít': 'the student'
    };
    return subjectMap[subject];
}

const getPronounVI = (subject: Subject): string => {
    const subjectMap = {
        'I': 'Tôi', 'you': 'Bạn', 'we': 'Chúng tôi', 'they': 'Họ', 'he': 'Anh ấy', 'she': 'Cô ấy', 'it': 'Nó',
        'N (số nhiều)': 'Các sinh viên',
        'danh từ số ít': 'Sinh viên'
    };
    return subjectMap[subject];
};

const mapSubjectToPronoun = (s: Subject): Pronoun => {
    switch (s) {
        case 'I': return 'I';
        case 'you': return 'you';
        case 'we': return 'we';
        case 'they':
        case 'N (số nhiều)': return 'they';
        case 'he': return 'he';
        case 'she': return 'she';
        case 'it':
        case 'danh từ số ít': return 'it';
        default: return 'it'; // Fallback for exhaustiveness
    }
};

// --- Conjugation Engine ---
const conjugateVerb = (lemma: Lemma, verbForm: string, subject: Subject, flags: Flags): string => {
    switch (verbForm) {
        case 'base': return lemma.base || lemma.text;
        case 'ing': return lemma.ing || `${lemma.text}ing`;
        case 'past': return lemma.past || `${lemma.text}ed`;
        case 'pp': return lemma.pp || lemma.past || `${lemma.text}ed`;
        case 's':
            const base = lemma.base || lemma.text;
             if (/(s|x|z|ch|sh)$/.test(base)) return `${base}es`;
             if (/[bcdfghjklmnpqrstvwxyz]y$/.test(base)) return `${base.slice(0, -1)}ies`;
             return `${base}s`;
        default: return lemma.text;
    }
};

const getAuxiliary = (state: GrammarState): { aux: string, verbForm: string, mainVerb: string } => {
    const { flags, subject, lemma } = state;
    const { tense, aspect, polarity, voice, near_future } = flags;
    const is3rdSg = isThirdPersonSingular(subject);
    
    let mainVerb = conjugateVerb(lemma, 'base', subject, flags); // Default verb form

    const do_not = "do not";
    const does_not = "does not";
    const did_not = "did not";
    const is_not = "is not";
    const are_not = "are not";
    const was_not = "was not";
    const were_not = "were not";
    const have_not = "have not";
    const has_not = "has not";
    const had_not = "had not";
    const will_not = "will not";

    // --- Active Voice ---
    if (voice === 'active') {
        const verb_s = conjugateVerb(lemma, 's', subject, flags);
        const verb_ing = conjugateVerb(lemma, 'ing', subject, flags);
        const verb_past = conjugateVerb(lemma, 'past', subject, flags);
        const verb_pp = conjugateVerb(lemma, 'pp', subject, flags);

        // Near Future (be going to) takes precedence
        if (near_future) {
            const be = subject === 'I' ? 'am' : is3rdSg ? 'is' : 'are';
            if (polarity === 'interrogative') return { aux: `${be}`, mainVerb: `going to ${mainVerb}`, verbForm: 'interrogative_be' };
            if (polarity === 'negative') {
                const be_not = subject === 'I' ? 'am not' : (is3rdSg ? is_not : are_not);
                return { aux: be_not, mainVerb: `going to ${mainVerb}`, verbForm: 'statement' };
            }
            return { aux: `${be}`, mainVerb: `going to ${mainVerb}`, verbForm: 'statement' };
        }

        // Tense/Aspect Logic
        if (tense === 'present') {
            if (aspect === 'simple') {
                if (polarity === 'negative') return { aux: is3rdSg ? does_not : do_not, mainVerb, verbForm: 'statement' };
                if (polarity === 'interrogative') return { aux: is3rdSg ? 'Does' : 'Do', mainVerb, verbForm: 'interrogative_do' };
                return { aux: '', mainVerb: is3rdSg ? verb_s : mainVerb, verbForm: 'statement' };
            }
            if (aspect === 'progressive') {
                const be = subject === 'I' ? 'am' : is3rdSg ? 'is' : 'are';
                if (polarity === 'interrogative') return { aux: be, mainVerb: verb_ing, verbForm: 'interrogative_be' };
                const be_not = subject === 'I' ? 'am not' : (is3rdSg ? is_not : are_not);
                return { aux: polarity === 'negative' ? be_not : be, mainVerb: verb_ing, verbForm: 'statement' };
            }
            if (aspect === 'perfect') {
                const have = is3rdSg ? 'has' : 'have';
                if (polarity === 'interrogative') return { aux: have, mainVerb: verb_pp, verbForm: 'interrogative_have' };
                return { aux: polarity === 'negative' ? (is3rdSg ? has_not : have_not) : have, mainVerb: verb_pp, verbForm: 'statement' };
            }
            if (aspect === 'perfect_progressive') {
                const have = is3rdSg ? 'has' : 'have';
                if (polarity === 'interrogative') return { aux: `${have}`, mainVerb: `been ${verb_ing}`, verbForm: 'interrogative_have' };
                return { aux: polarity === 'negative' ? (is3rdSg ? has_not : have_not) : have, mainVerb: `been ${verb_ing}`, verbForm: 'statement' };
            }
        }
        if (tense === 'past') {
            if (aspect === 'simple') {
                if (polarity === 'negative') return { aux: did_not, mainVerb, verbForm: 'statement' };
                if (polarity === 'interrogative') return { aux: 'Did', mainVerb, verbForm: 'interrogative_do' };
                return { aux: '', mainVerb: verb_past, verbForm: 'statement' };
            }
            if (aspect === 'progressive') {
                const be = is3rdSg || subject === 'I' ? 'was' : 'were';
                if (polarity === 'interrogative') return { aux: be, mainVerb: verb_ing, verbForm: 'interrogative_be' };
                const be_not = is3rdSg || subject === 'I' ? was_not : were_not;
                return { aux: polarity === 'negative' ? be_not : be, mainVerb: verb_ing, verbForm: 'statement' };
            }
            if (aspect === 'perfect') {
                if (polarity === 'interrogative') return { aux: 'Had', mainVerb: verb_pp, verbForm: 'interrogative_have' };
                return { aux: polarity === 'negative' ? had_not : 'had', mainVerb: verb_pp, verbForm: 'statement' };
            }
             if (aspect === 'perfect_progressive') {
                if (polarity === 'interrogative') return { aux: 'had', mainVerb: `been ${verb_ing}`, verbForm: 'interrogative_have' };
                return { aux: polarity === 'negative' ? had_not : 'had', mainVerb: `been ${verb_ing}`, verbForm: 'statement' };
            }
        }
        if (tense === 'future') {
            if (aspect === 'simple') {
                if (polarity === 'negative') return { aux: will_not, mainVerb, verbForm: 'statement' };
                if (polarity === 'interrogative') return { aux: 'Will', mainVerb, verbForm: 'interrogative_will' };
                return { aux: 'will', mainVerb, verbForm: 'statement' };
            }
            if (aspect === 'progressive') {
                if (polarity === 'negative') return { aux: will_not, mainVerb: `be ${verb_ing}`, verbForm: 'statement' };
                if (polarity === 'interrogative') return { aux: 'Will', mainVerb: `be ${verb_ing}`, verbForm: 'interrogative_will' };
                return { aux: 'will', mainVerb: `be ${verb_ing}`, verbForm: 'statement' };
            }
            if (aspect === 'perfect') {
                if (polarity === 'negative') return { aux: will_not, mainVerb: `have ${verb_pp}`, verbForm: 'statement' };
                if (polarity === 'interrogative') return { aux: 'Will', mainVerb: `have ${verb_pp}`, verbForm: 'interrogative_will' };
                return { aux: 'will', mainVerb: `have ${verb_pp}`, verbForm: 'statement' };
            }
            if (aspect === 'perfect_progressive') {
                if (polarity === 'negative') return { aux: will_not, mainVerb: `have been ${verb_ing}`, verbForm: 'statement' };
                if (polarity === 'interrogative') return { aux: 'Will', mainVerb: `have been ${verb_ing}`, verbForm: 'interrogative_will' };
                return { aux: 'will', mainVerb: `have been ${verb_ing}`, verbForm: 'statement' };
            }
        }
    }
    
    // --- Passive Voice ---
    if (voice === 'passive') {
        const verb_pp = conjugateVerb(lemma, 'pp', subject, flags);
        let be_aux = '';

        if (near_future) {
            const be = subject === 'I' ? 'am' : is3rdSg ? 'is' : 'are';
            be_aux = `${be} going to be`;
        } else if (tense === 'present') {
            const be = subject === 'I' ? 'am' : is3rdSg ? 'is' : 'are';
            if (aspect === 'simple') be_aux = be;
            if (aspect === 'progressive') be_aux = `${be} being`;
            if (aspect === 'perfect') be_aux = `${is3rdSg ? 'has' : 'have'} been`;
        } else if (tense === 'past') {
            const be = is3rdSg || subject === 'I' ? 'was' : 'were';
            if (aspect === 'simple') be_aux = be;
            if (aspect === 'progressive') be_aux = `${be} being`;
            if (aspect === 'perfect') be_aux = 'had been';
        } else if (tense === 'future') {
            if (aspect === 'simple') be_aux = 'will be';
            if (aspect === 'perfect') be_aux = 'will have been';
        }

        const parts = be_aux.split(' ');
        const first_aux = parts[0];
        const rest_aux = parts.slice(1).join(' ');

        if (polarity === 'interrogative') return { aux: first_aux, mainVerb: `${rest_aux} ${verb_pp}`.trim(), verbForm: 'interrogative_be' };
        if (polarity === 'negative') {
             let first_aux_not = `${first_aux} not`;
            return { aux: first_aux_not, mainVerb: `${rest_aux} ${verb_pp}`.trim(), verbForm: 'statement' };
        }
        return { aux: be_aux, mainVerb: verb_pp, verbForm: 'statement' };
    }

    // Default fallback
    return { aux: '', mainVerb: lemma.text, verbForm: 'statement' };
};

// === NEW, type-safe short answer generator (from user suggestion) ===
export function generateShortAnswer(args: {
  subject: Pronoun;
  aux: Aux;
  want: Polarity;
}): string {
  const { subject, aux, want } = args;

  // This is now type-safe and will not widen.
  const answerPolarity: Polarity = want;

  const header = answerPolarity === 'affirmative' ? YES[subject] : NO[subject];
  const word   = answerPolarity === 'affirmative' ? AUX_AFFIRM[aux][subject] : AUX_NEG[aux][subject];

  return `${header} ${word}.`;
}

const generateVietnameseSentence = (state: GrammarState): string => {
    const { subject, lemma, flags } = state;
    const pronounVI = getPronounVI(subject);
    const lemmaVI = lemma.vi || lemma.text;

    // --- Part 1: Handle non-verb lemmas ---
    if (lemma.type !== 'verb') {
        const tenseMap = { present: '', past: 'đã', future: 'sẽ' };
        const tenseVI = tenseMap[flags.tense] || '';
        let sentence = '';

        if (lemma.type === 'adj') {
            switch (flags.polarity) {
                case 'affirmative': sentence = `${pronounVI} ${tenseVI} ${lemmaVI}.`; break;
                case 'negative': sentence = `${pronounVI} ${tenseVI} không ${lemmaVI}.`; break;
                case 'interrogative': sentence = `${pronounVI} có ${tenseVI} ${lemmaVI} không?`; break;
            }
        } else if (lemma.type === 'noun') {
            switch (flags.polarity) {
                case 'affirmative': sentence = `${pronounVI} ${tenseVI} là ${lemmaVI}.`; break;
                case 'negative': sentence = `${pronounVI} ${tenseVI} không phải là ${lemmaVI}.`; break;
                case 'interrogative': sentence = `${pronounVI} có phải ${tenseVI} là ${lemmaVI} không?`; break;
            }
        } else { // Fallback for prep, conj, adv
            switch (flags.polarity) {
                case 'affirmative': sentence = `${pronounVI} ${tenseVI} ${lemmaVI}.`; break;
                case 'negative': sentence = `${pronounVI} ${tenseVI} không ${lemmaVI}.`; break;
                case 'interrogative': sentence = `${pronounVI} có ${tenseVI} ${lemmaVI} không?`; break;
            }
        }
        return `(Dịch mẫu) ${sentence.replace(/\s+/g, ' ').trim()}`;
    }

    // --- Part 2: Handle verb lemmas with a template map ---
    const { tense, aspect, voice, polarity } = flags;
    const key = `${tense}-${aspect}-${voice}-${polarity}`;
    
    const templates: { [key: string]: string } = {
        // Present Simple
        'present-simple-active-affirmative': '{S} {V}.',
        'present-simple-active-negative': '{S} không {V}.',
        'present-simple-active-interrogative': '{S} có {V} không?',
        'present-simple-passive-affirmative': '{S} được {V}.',
        'present-simple-passive-negative': '{S} không được {V}.',
        'present-simple-passive-interrogative': '{S} có được {V} không?',
        // Present Progressive
        'present-progressive-active-affirmative': '{S} đang {V}.',
        'present-progressive-active-negative': '{S} không đang {V}.',
        'present-progressive-active-interrogative': '{S} có đang {V} không?',
        'present-progressive-passive-affirmative': '{S} đang được {V}.',
        // Present Perfect
        'present-perfect-active-affirmative': '{S} đã {V}.',
        'present-perfect-active-negative': '{S} chưa {V}.',
        'present-perfect-active-interrogative': '{S} đã {V} chưa?',
        'present-perfect-passive-affirmative': '{S} đã được {V}.',
        // Present Perfect Progressive
        'present-perfect_progressive-active-affirmative': '{S} đã và đang {V}.',

        // Past Simple
        'past-simple-active-affirmative': '{S} đã {V}.',
        'past-simple-active-negative': '{S} đã không {V}.',
        'past-simple-active-interrogative': '{S} có phải đã {V} không?',
        'past-simple-passive-affirmative': '{S} đã được {V}.',
        // Past Progressive
        'past-progressive-active-affirmative': '{S} đã đang {V}.',
        'past-progressive-passive-affirmative': '{S} đã đang được {V}.',
        // Past Perfect
        'past-perfect-active-affirmative': '{S} đã {V} (trước đó).',
        'past-perfect-passive-affirmative': '{S} đã được {V} (trước đó).',
        // Past Perfect Progressive
        'past-perfect_progressive-active-affirmative': '{S} đã liên tục {V}.',

        // Future Simple
        'future-simple-active-affirmative': '{S} sẽ {V}.',
        'future-simple-active-negative': '{S} sẽ không {V}.',
        'future-simple-active-interrogative': '{S} sẽ {V} chứ?',
        'future-simple-passive-affirmative': '{S} sẽ được {V}.',
        // Future Progressive
        'future-progressive-active-affirmative': '{S} sẽ đang {V}.',
        // Future Perfect
        'future-perfect-active-affirmative': '{S} sẽ đã {V} xong.',
        'future-perfect-passive-affirmative': '{S} sẽ đã được {V} xong.',
        // Future Perfect Progressive
        'future-perfect_progressive-active-affirmative': '{S} sẽ đã liên tục {V}.',
    };

    let template = templates[key] || '{S} {V}.'; // Default fallback

    if (flags.near_future) {
        if (voice === 'active') {
             switch (polarity) {
                case 'affirmative': template = '{S} sẽ {V}.'; break;
                case 'negative': template = '{S} sẽ không {V}.'; break;
                case 'interrogative': template = '{S} sẽ {V} chứ?'; break;
            }
        } else { // passive
             switch (polarity) {
                case 'affirmative': template = '{S} sẽ được {V}.'; break;
                case 'negative': template = '{S} sẽ không được {V}.'; break;
                case 'interrogative': template = '{S} sẽ được {V} chứ?'; break;
            }
        }
    }
    
    const result = template.replace('{S}', pronounVI).replace('{V}', lemmaVI);
    return `(Dịch mẫu) ${result.replace(/\s+/g, ' ').trim()}`;
};


// --- Main Service Functions ---

export const getFlagsForUnit = (unit: Unit, currentFlags: Flags): Flags => {
    return {
        ...currentFlags,
        tense: unit.tags?.tense || currentFlags.tense,
        aspect: unit.tags?.aspect || currentFlags.aspect,
        voice: unit.tags?.voice || 'active',
        near_future: unit.tags?.near_future || false,
        polarity: 'affirmative',
    };
};

export const generateSentence = (state: GrammarState): { en: string; vi: string; error: string | null } => {
    const { subject, lemma, flags, unitId } = state;
    const unit = units.find(u => u.id === unitId);
    
    if (unit?.applicable === false) {
        return { 
            en: "N/A",
            vi: "Không áp dụng",
            error: "KHÔNG ÁP DỤNG VỚI ĐIỂM NGỮ PHÁP NÀY"
        };
    }

    if (flags.short_answer) {
        const answerPolarity: Polarity = flags.polarity === 'negative' ? 'negative' : 'affirmative';
        
        // --- Refactored short answer logic ---
        // Short answers for non-verbs (e.g., "Is he a doctor?")
        if (lemma.type !== 'verb') {
            const is3rdSg = isThirdPersonSingular(subject);
            let be = subject === 'I' ? 'am' : is3rdSg ? 'is' : 'are';
            if (flags.tense === 'past') {
                be = (subject === 'I' || is3rdSg) ? 'was' : 'were';
            }
            
            const pronounAsPronoun = mapSubjectToPronoun(subject);
            let answerSubject: Pronoun = pronounAsPronoun;
            if (pronounAsPronoun === 'you') answerSubject = 'I';
            else if (pronounAsPronoun === 'I') answerSubject = 'you';

            const pronoun = getPronoun(answerSubject);

            if (answerPolarity === 'affirmative') {
                return { en: `Yes, ${pronoun} ${be}.`, vi: `(Dịch mẫu) Vâng, đúng vậy.`, error: null };
            } else { // negative
                let be_not = `${be} not`;
                if (be === 'am') be_not = 'am not';
                else if (be === 'is') be_not = "isn't";
                else if (be === 'are') be_not = "aren't";
                else if (be === 'was') be_not = "wasn't";
                else if (be === 'were') be_not = "weren't";
                else be_not = `${be}n't`;
                return { en: `No, ${pronoun} ${be_not}.`, vi: `(Dịch mẫu) Không, không phải.`, error: null };
            }
        }

        // For verbs, we need the auxiliary of the corresponding question.
        const questionState: GrammarState = { ...state, flags: { ...flags, polarity: 'interrogative', short_answer: false } };
        const { aux: questionAuxStr, verbForm } = getAuxiliary(questionState);

        if (!verbForm.startsWith('interrogative_')) {
            return { en: 'N/A', vi: 'Không áp dụng câu trả lời ngắn', error: "Không thể tạo câu trả lời ngắn cho dạng câu này." };
        }
        
        const questionAux = questionAuxStr.toLowerCase() as Aux;
        const subjectAsPronoun = mapSubjectToPronoun(subject);

        let answerSubject: Pronoun = subjectAsPronoun;
        if (subjectAsPronoun === 'you') {
            answerSubject = 'I';
        } else if (subjectAsPronoun === 'I') {
            answerSubject = 'you';
        }
        
        const en = generateShortAnswer({
            subject: answerSubject,
            aux: questionAux,
            want: answerPolarity,
        });

        const vi = answerPolarity === 'affirmative' ? `(Dịch mẫu) Vâng, đúng vậy.` : `(Dịch mẫu) Không, không phải.`;
        return { en, vi, error: null };
    }

    if (lemma.type === 'conj') {
        let exampleEn = 'I like tea and he likes coffee.';
        let exampleVi = '(Ví dụ) Tôi thích trà và anh ấy thích cà phê.';
        switch(lemma.text) {
            case 'but':
                exampleEn = 'I like tea, but he likes coffee.';
                exampleVi = '(Ví dụ) Tôi thích trà, nhưng anh ấy thích cà phê.';
                break;
            case 'so':
                exampleEn = 'He was tired, so he went to bed.';
                exampleVi = '(Ví dụ) Anh ấy mệt, vì vậy anh ấy đã đi ngủ.';
                break;
            case 'because':
                exampleEn = 'He went to bed because he was tired.';
                exampleVi = '(Ví dụ) Anh ấy đi ngủ vì anh ấy mệt.';
                break;
            case 'although':
                exampleEn = 'Although it was raining, we went for a walk.';
                exampleVi = '(Ví dụ) Mặc dù trời mưa, chúng tôi vẫn đi dạo.';
                break;
        }
        return { en: exampleEn, vi: exampleVi, error: null };
    }
    
    // Fallback for non-verb types to generate EN sentence
     if (lemma.type !== 'verb') {
        const pronoun = getPronoun(subject);
        const is3rdSg = isThirdPersonSingular(subject);
        let be: string;
       
        if (flags.tense === 'present') {
            be = subject === 'I' ? 'am' : is3rdSg ? 'is' : 'are';
        } else if (flags.tense === 'past') {
            be = (subject === 'I' || is3rdSg) ? 'was' : 'were';
        } else { // future
            be = 'will be';
        }
        
        let enSentence = '';
      
        if (flags.polarity === 'affirmative') {
            enSentence = `${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ${be} ${lemma.text}.`;
        } else if (flags.polarity === 'negative') {
            const beParts = be.split(' ');
            enSentence = `${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ${beParts[0]} not ${beParts.slice(1).join(' ')} ${lemma.text}.`;
        } else { // interrogative
            const beParts = be.split(' ');
            const capitalizedBe = beParts[0].charAt(0).toUpperCase() + beParts[0].slice(1);
            enSentence = `${capitalizedBe} ${pronoun} ${beParts.slice(1).join(' ')} ${lemma.text}?`;
        }
        
        const vi = generateVietnameseSentence(state);
        return {
            en: enSentence.replace(/\s+/g, ' ').trim(),
            vi: vi,
            error: null
        };
    }

    // --- Generate EN and VI for VERBS ---
    const { aux, mainVerb, verbForm } = getAuxiliary(state);
    const pronoun = getPronoun(subject);
    
    let en = '';
    const capitalizedPronoun = pronoun.charAt(0).toUpperCase() + pronoun.slice(1);
    
    switch (verbForm) {
        case 'interrogative_be':
        case 'interrogative_have':
        case 'interrogative_will':
            en = `${aux.charAt(0).toUpperCase() + aux.slice(1)} ${pronoun} ${mainVerb}?`;
            break;
        case 'interrogative_do':
            en = `${aux} ${pronoun} ${mainVerb}?`;
            break;
        default: // statement
            en = `${capitalizedPronoun} ${aux} ${mainVerb}.`;
            break;
    }

    const vi = generateVietnameseSentence(state);

    return { en: en.replace(/\s+/g, ' ').trim(), vi: vi.replace(/\s+/g, ' ').trim(), error: null };
};

// === Short-form (contractions) helper ===============================
export function toContractions(s: string): string {
  return s
    // BE (affirmative)
    .replace(/\bI am\b/g, "I'm")
    .replace(/\b(He|She|It) is\b/g, (_m, p1) => `${p1}'s`)
    .replace(/\b(You|We|They) are\b/g, (_m, p1) => `${p1}'re`)
    // BE (negative)
    .replace(/\b[Ii] am not\b/g, "I'm not")
    .replace(/\b(Is|is) not\b/g, "isn't")
    .replace(/\b(Are|are) not\b/g, "aren't")
    .replace(/\b(Was|was) not\b/g, "wasn't")
    .replace(/\b(Were|were) not\b/g, "weren't")
    // DO (negative)
    .replace(/\b(Do|do) not\b/g, "don't")
    .replace(/\b(Does|does) not\b/g, "doesn't")
    .replace(/\b(Did|did) not\b/g, "didn't")
    // WILL
    .replace(/\b(Will|will) not\b/g, "won't")
    .replace(/\b(I|You|We|They|He|She|It) will\b/g, (_m, p1) => `${p1}'ll`)
    // HAVE/HAS/HAD aux
    .replace(/\b(I|i) have\b/g, "I've")
    .replace(/\b(You|you) have\b/g, "you've")
    .replace(/\b(We|we) have\b/g, "we've")
    .replace(/\b(They|they) have\b/g, "they've")
    .replace(/\b(He|he) has\b/g, "he's")
    .replace(/\b(She|she) has\b/g, "she's")
    .replace(/\b(It|it) has\b/g, "it's")
    .replace(/\b(Have|have) not\b/g, "haven't")
    .replace(/\b(Has|has) not\b/g, "hasn't")
    .replace(/\b(Had|had) not\b/g, "hadn't")
    // would/should/could have
    .replace(/\b(Would|would) have\b/g, "would've")
    .replace(/\b(Should|should) have\b/g, "should've")
    .replace(/\b(Could|could) have\b/g, "could've");
}

export function maybeShorten(text: string, shortForm?: boolean) {
  return shortForm ? toContractions(text) : text;
}
