import React, { useState, useEffect, useCallback } from 'react';
import { Unit, Group, GrammarState, Subject, Flags, Lemma, VocabItem } from '../types';
import { units } from '../data/units';
import { groups } from '../data/groups';
import { INITIAL_LEMMA } from '../constants';
import { generateSentence, maybeShorten, getFlagsForUnit } from '../services/grammarService';
import CoreHost from '../components/CoreHost';
import { vocab } from '../data/vocab';

// --- Icon Components ---
const ArrowsPointingOutIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
);

const XMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


// --- Re-styled & New Components ---

const VocabModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    wordType: string;
    vocabPack: VocabItem[];
    onSelect: (item: VocabItem) => void;
}> = ({ isOpen, onClose, wordType, vocabPack, onSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (isOpen) {
            setSearchQuery(''); // Reset search when modal opens
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const filteredVocab = vocabPack.filter(item => {
        const searchTerm = searchQuery.toLowerCase();
        const english = (item.base || item.word || '').toLowerCase();
        const vietnamese = (item.vi || '').toLowerCase();
        return english.includes(searchTerm) || vietnamese.includes(searchTerm);
    });
    

    const handleSelect = (item: VocabItem) => {
        onSelect(item);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div 
                className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <header className="p-4 border-b flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
                    <h3 className="text-lg font-bold">Chọn {wordType}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
                </header>
                <div className="p-4">
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Tìm kiếm từ..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        autoFocus
                    />
                </div>
                <div className="flex-grow overflow-y-auto p-4 pt-0">
                    <ul className="space-y-1">
                        {filteredVocab.map((item, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handleSelect(item)}
                                    className="w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors flex justify-between items-center"
                                >
                                    <span className="font-semibold text-gray-800">{item.base || item.word}</span>
                                    <span className="text-sm text-gray-500">{item.vi}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const TopBar: React.FC<{
    onButtonClick: (type: string) => void;
    activeType: string | null;
}> = ({ onButtonClick, activeType }) => {
    const wordTypes = ['Động từ', 'Động từ BQT', 'Tính từ', 'Trạng từ', 'Danh từ', 'Giới từ', 'Liên từ'];
    
    const getButtonClass = (type: string) => {
        const base = "px-4 py-2 rounded-lg shadow-sm text-sm font-semibold transition-colors";
        if (type === activeType) {
            return `${base} bg-gray-800 text-white`;
        }
        return `${base} bg-white border border-gray-200 text-gray-700 hover:bg-gray-100`;
    };

    return (
        <div className="flex items-center flex-wrap gap-2">
            {wordTypes.map(type => (
                <button key={type} className={getButtonClass(type)} onClick={() => onButtonClick(type)}>
                    {type}
                </button>
            ))}
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-sm text-sm font-semibold hover:bg-gray-900 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Nhập dữ liệu
            </button>
        </div>
    );
};

const SubjectVerbSelector: React.FC<{
    subject: Subject;
    onSubjectChange: (s: Subject) => void;
    lemma: Lemma;
    onLemmaChange: (l: Lemma) => void;
}> = ({ subject, onSubjectChange, lemma, onLemmaChange }) => {
    const subjects: Subject[] = ['I', 'you', 'we', 'they', 'he', 'she', 'it', 'N (số nhiều)', 'danh từ số ít'];
    const subjectMap = {
        'I': 'I (Tôi)', 'you': 'You (Bạn)', 'we': 'We (Chúng tôi)', 'they': 'They (Họ)', 'he': 'He (Anh ấy)', 'she': 'She (Cô ấy)', 'it': 'It (Nó)', 'N (số nhiều)': 'N (số nhiều)', 'danh từ số ít': 'N (số ít)'
    }
    
    const getLemmaLabel = () => {
        switch(lemma.type) {
            case 'adj': return 'TÍNH TỪ';
            case 'adv': return 'TRẠNG TỪ';
            case 'noun': return 'DANH TỪ';
            case 'prep': return 'GIỚI TỪ';
            case 'conj': return 'LIÊN TỪ';
            case 'verb':
            default:
                return 'ĐỘNG TỪ';
        }
    };

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500 font-bold uppercase">CHỦ NGỮ</label>
                <select 
                    value={subject} 
                    onChange={(e) => onSubjectChange(e.target.value as Subject)}
                    className="h-11 px-3 rounded-xl border border-gray-200 bg-white text-base shadow-sm focus:ring-2 focus:ring-indigo-500"
                >
                    {subjects.map(s => <option key={s} value={s}>{subjectMap[s] || s}</option>)}
                </select>
             </div>
             <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500 font-bold uppercase">{getLemmaLabel()}</label>
                <input 
                    type="text" 
                    value={lemma.text}
                    onChange={(e) => onLemmaChange({ ...lemma, text: e.target.value, base: e.target.value, vi: undefined })}
                    className="h-11 w-36 px-3 rounded-xl border border-gray-200 bg-white text-base shadow-sm focus:ring-2 focus:ring-indigo-500" 
                />
             </div>
        </div>
    );
};


const HeroZone: React.FC<{ en: string; vi: string; debug: string; error: string | null; lemma: Lemma }> = ({ en, vi, debug, error, lemma }) => {
    if (error) {
        return (
             <div className="text-center p-6 bg-white rounded-lg shadow-sm min-h-[180px] flex flex-col justify-center items-center">
                <div className="px-4 py-3 bg-yellow-100 text-yellow-800 rounded-lg border border-yellow-300">
                    <p className="font-bold text-lg">{error}</p>
                </div>
            </div>
        );
    }
    
    // If the lemma is not a verb, or sentence is empty, just display it without highlighting.
    if (lemma.type !== 'verb' || !en) {
         return (
            <div className="text-center p-6 bg-white rounded-lg shadow-sm min-h-[180px] flex flex-col justify-center items-center">
                <p className="text-4xl md:text-5xl font-bold text-gray-800 break-words">{en}</p>
                <p className="text-lg text-gray-600 mt-4">{vi}</p>
                <p className="text-xs text-gray-400 mt-4 absolute bottom-3 right-4">{debug}</p>
            </div>
        );
    }
    
    // --- New, more robust highlighting logic ---
    const baseForm = lemma.base || lemma.text;

    // Helper to generate the 's' form of a verb to ensure it's included in the search.
    const getSForm = (base: string): string => {
        if (base === 'have') return 'has';
        if (base === 'do') return 'does';
        if (/(s|x|z|ch|sh)$/.test(base)) return `${base}es`;
        if (/[bcdfghjklmnpqrstvwxyz]y$/.test(base)) return `${base.slice(0, -1)}ies`;
        return `${base}s`;
    };

    // Create a comprehensive list of all possible verb forms.
    // Sorting by length descending ensures we match "working" before "work".
    const forms = [...new Set([
        lemma.ing,
        lemma.pp,
        lemma.past,
        getSForm(baseForm),
        baseForm,
    ].filter(Boolean) as string[])].sort((a, b) => b.length - a.length);

    const regex = new RegExp(`\\b(${forms.join('|')})\\b`, 'i');
    const match = en.match(regex);
    
    let sentenceHtml = en;

    if (match) {
        const matchedWord = match[0];
        const title = `Base form: ${baseForm}`;
        const replacement = `<span class="text-orange-500 inline-block border-b-4 border-orange-500 pb-1" title="${title}">${matchedWord}</span>`;
        sentenceHtml = en.replace(regex, replacement);
    }
    
    return (
        <div className="text-center p-6 bg-white rounded-lg shadow-sm min-h-[180px] flex flex-col justify-center items-center">
            <p 
                className="text-5xl md:text-7xl font-bold text-gray-800 break-words" 
                dangerouslySetInnerHTML={{ __html: sentenceHtml }} 
            />
            <p className="text-xl text-gray-600 mt-4">{vi}</p>
            <p className="text-xs text-gray-400 mt-4 absolute bottom-3 right-4">{debug}</p>
        </div>
    );
};

const Controls: React.FC<{
    flags: Flags;
    onFlagChange: <K extends keyof Flags>(key: K, value: Flags[K]) => void;
    shortForm: boolean;
    setShortForm: React.Dispatch<React.SetStateAction<boolean>>;
    compact: boolean;
    setCompact: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ flags, onFlagChange, shortForm, setShortForm, compact, setCompact }) => {
    const getBtnClass = (group: string, isActive: boolean) => {
        // Base styles for all buttons, including smooth transitions for animations
        const base = `flex-shrink-0 appearance-none px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ease-in-out transform whitespace-nowrap leading-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`;

        if (isActive) {
            // Active state styles: colorful gradient, scaled up, and a prominent shadow.
            // On click (active), it scales down slightly for a "press" effect.
            let activeGradient = '';
            switch (group) {
                case 'tense':
                    activeGradient = 'from-sky-400 to-blue-500';
                    break;
                case 'aspect':
                    activeGradient = 'from-emerald-400 to-green-500';
                    break;
                case 'polarity':
                    activeGradient = 'from-amber-400 to-orange-500';
                    break;
                case 'voice':
                    activeGradient = 'from-slate-400 to-gray-500';
                    break;
                case 'utils':
                    activeGradient = 'from-violet-400 to-purple-500';
                    break;
                default:
                    activeGradient = 'from-gray-400 to-slate-500';
            }
            const activeClasses = `
                bg-gradient-to-r ${activeGradient} text-white ring-2 ring-white/75 ring-offset-2 ring-offset-gray-100 scale-105 shadow-lg
                active:scale-100 active:shadow-md
            `;
            return `${base} ${activeClasses}`;
        } else {
            // Non-active state styles: neutral white, with subtle hover and active (click) animations.
            const nonActiveClasses = `
                bg-white text-gray-700 border border-gray-300 shadow-sm
                hover:bg-gray-50 hover:shadow-md hover:scale-[1.03] hover:-translate-y-px
                active:scale-95 active:bg-gray-100
            `;
            return `${base} ${nonActiveClasses}`;
        }
    };
    
    const divider = <span className="w-px h-5 bg-gray-300 inline-block mx-1" />;

    return (
        <div className="toolbar flex flex-nowrap items-center gap-2 p-2 rounded-2xl bg-gray-100 border border-gray-200 overflow-x-auto">
            {/* Tense */}
            <button title="Thì Hiện tại: Diễn tả hành động ở hiện tại." className={getBtnClass('tense', flags.tense === 'present')} onClick={() => onFlagChange('tense', 'present')}>Hiện tại</button>
            <button title="Thì Quá khứ: Diễn tả hành động đã xảy ra trong quá khứ." className={getBtnClass('tense', flags.tense === 'past')} onClick={() => onFlagChange('tense', 'past')}>Quá khứ</button>
            <button title="Thì Tương lai: Diễn tả hành động sẽ xảy ra trong tương lai." className={getBtnClass('tense', flags.tense === 'future')} onClick={() => onFlagChange('tense', 'future')}>Tương lai</button>
            {divider}
            {/* Aspect */}
            <button title="Thể Đơn: Diễn tả hành động như một sự thật hoàn chỉnh." className={getBtnClass('aspect', flags.aspect === 'simple')} onClick={() => onFlagChange('aspect', 'simple')}>Đơn</button>
            <button title="Thể Tiếp diễn: Diễn tả hành động đang diễn ra." className={getBtnClass('aspect', flags.aspect === 'progressive')} onClick={() => onFlagChange('aspect', 'progressive')}>Tiếp diễn</button>
            <button title="Thể Hoàn thành: Diễn tả hành động hoàn tất trước một thời điểm khác." className={getBtnClass('aspect', flags.aspect === 'perfect')} onClick={() => onFlagChange('aspect', 'perfect')}>Hoàn thành</button>
            <button title="Thể Hoàn thành Tiếp diễn: Nhấn mạnh sự kéo dài của một hành động." className={getBtnClass('aspect', flags.aspect === 'perfect_progressive')} onClick={() => onFlagChange('aspect', 'perfect_progressive')}>HT Tiếp diễn</button>
            {divider}
            {/* Polarity */}
            <button title="Dạng Khẳng định: Một câu trần thuật dương tính (VD: I work)." className={getBtnClass('polarity', flags.polarity === 'affirmative')} onClick={() => onFlagChange('polarity', 'affirmative')}>Khẳng định</button>
            <button title="Dạng Phủ định: Một câu trần thuật âm tính (VD: I do not work)." className={getBtnClass('polarity', flags.polarity === 'negative')} onClick={() => onFlagChange('polarity', 'negative')}>Phủ định</button>
            <button title="Dạng Nghi vấn: Một câu hỏi (VD: Do you work?)." className={getBtnClass('polarity', flags.polarity === 'interrogative')} onClick={() => onFlagChange('polarity', 'interrogative')}>Nghi vấn</button>
            {divider}
             {/* Voice */}
            <button title="Dạng Chủ động: Chủ ngữ thực hiện hành động." className={getBtnClass('voice', flags.voice === 'active')} onClick={() => onFlagChange('voice', 'active')}>Chủ động</button>
            <button title="Dạng Bị động: Chủ ngữ nhận hành động." className={getBtnClass('voice', flags.voice === 'passive')} onClick={() => onFlagChange('voice', 'passive')}>Bị động</button>
            {divider}
            {/* Utilities */}
            <button title="Tương lai gần: Dùng 'be going to' cho kế hoạch, dự định." className={getBtnClass('utils', flags.near_future)} onClick={() => onFlagChange('near_future', !flags.near_future)}>Dự định</button>
            <button title="Rút gọn câu: Bật/tắt việc sử dụng các dạng rút gọn (VD: I'm vs I am)." className={getBtnClass('utils', shortForm)} onClick={() => setShortForm(v => !v)}>Câu ngắn</button>
            <button title="Thu gọn giao diện: Ẩn/hiện phần kiến thức cốt lõi." className={getBtnClass('utils', compact)} onClick={() => setCompact(v => !v)}>Thu gọn</button>
        </div>
    );
};

const ColumnCard: React.FC<{ title: string; count: number; children: React.ReactNode }> = ({ title, count, children }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm h-full flex flex-col">
        <div className="flex items-center justify-between mb-2 pb-2 border-b">
            <h2 className="text-md font-bold text-gray-800">{title}</h2>
            {count > 0 && <span className="bg-blue-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">{count}</span>}
        </div>
        <div className="flex-grow overflow-y-auto pr-2 -mr-2" style={{ scrollbarWidth: 'thin' }}>
             {children}
        </div>
    </div>
);

const GroupsColumn: React.FC<{ onSelect: (groupId: number) => void; selectedId: number | null }> = ({ onSelect, selectedId }) => (
    <ColumnCard title="Nhóm Ngữ pháp" count={groups.length}>
        <ul className="space-y-1">
            {groups.map((g, index) => ( 
                <li key={g.id} 
                    onClick={() => onSelect(g.id)}
                    className={`cursor-pointer p-2 rounded-lg transition-colors text-sm flex items-start gap-3 ${selectedId === g.id ? 'bg-blue-100 border border-blue-300 font-semibold text-blue-800' : 'hover:bg-gray-100'}`}>
                    <span className="flex-shrink-0 mt-0.5 text-xs text-gray-500">{index + 1}.</span>
                    <span>{g.vi}<br/><span className="text-xs text-gray-500">{g.en}</span></span>
                </li>
            ))}
        </ul>
    </ColumnCard>
);

const UnitsColumn: React.FC<{ selectedGroupId: number | null; onSelect: (unit: Unit) => void; selectedId: string | null }> = ({ selectedGroupId, onSelect, selectedId }) => {
    const filteredUnits = selectedGroupId ? units.filter(u => u.group_id === selectedGroupId) : [];
    return (
        <ColumnCard title="Đơn vị Ngữ pháp" count={filteredUnits.length}>
            <ul className="space-y-1">
                {filteredUnits.map((u, index) => (
                    <li key={u.id} 
                        onClick={() => onSelect(u)}
                        className={`cursor-pointer p-2 rounded-lg transition-colors text-sm flex items-start gap-3 ${selectedId === u.id ? 'bg-blue-100 border border-blue-300 font-semibold text-blue-800' : 'hover:bg-gray-100'}`}>
                        <span className="flex-shrink-0 mt-0.5 text-xs text-gray-500">{index + 1}.</span>
                        <span>{u.vi}<br/><span className="text-xs text-gray-500">{u.en}</span></span>
                    </li>
                ))}
            </ul>
        </ColumnCard>
    )
};

const CoreKnowledgeColumn: React.FC<{ 
    unit: Unit | null;
    fontSize: number;
    onIncrease: () => void;
    onDecrease: () => void;
    onToggleFullScreen: () => void;
}> = ({ unit, fontSize, onIncrease, onDecrease, onToggleFullScreen }) => {
    
    const controls = (
        <div className="flex items-center space-x-1">
            <button onClick={onDecrease} className="px-2 py-0.5 text-lg rounded-md hover:bg-gray-200 transition-colors">-</button>
            <span className="text-sm font-semibold w-6 text-center">{fontSize}</span>
            <button onClick={onIncrease} className="px-2 py-0.5 text-lg rounded-md hover:bg-gray-200 transition-colors">+</button>
            <button onClick={onToggleFullScreen} className="p-1 rounded-md hover:bg-gray-200 transition-colors ml-2" title="Full Screen">
                <ArrowsPointingOutIcon className="w-5 h-5 text-gray-600" />
            </button>
        </div>
    );
    
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-2 pb-2 border-b">
                <h2 className="text-md font-bold text-gray-800">Kiến Thức Cốt Lõi</h2>
                {controls}
            </div>
            <div 
                className="flex-grow overflow-y-auto pr-2 -mr-2 text-gray-800" 
                style={{ scrollbarWidth: 'thin', fontSize: `${fontSize}px` }}
            >
                {!unit ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-500" style={{fontSize: '16px'}}>
                        <h3 className="font-bold text-lg">Chưa chọn đơn vị ngữ pháp</h3>
                        <p className="text-sm">Chọn một đơn vị để xem kiến thức cốt lõi</p>
                    </div>
                ) : (
                    <CoreHost canonKey={unit?.canonKey} />
                )}
            </div>
        </div>
    );
};

const FullScreenCoreKnowledge: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    unit: Unit | null;
    fontSize: number;
    onIncrease: () => void;
    onDecrease: () => void;
}> = ({ isOpen, onClose, unit, fontSize, onIncrease, onDecrease }) => {
    if (!isOpen) return null;

    const controls = (
        <div className="flex items-center space-x-2">
            <button onClick={onDecrease} className="px-3 py-1 text-lg rounded-md hover:bg-gray-200 transition-colors">-</button>
            <span className="text-sm font-semibold w-8 text-center">{fontSize}</span>
            <button onClick={onIncrease} className="px-3 py-1 text-lg rounded-md hover:bg-gray-200 transition-colors">+</button>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-white z-[60] p-4 sm:p-6 lg:p-8 flex flex-col">
            <header className="flex-shrink-0 flex justify-between items-center mb-4 pb-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">{unit?.vi || 'Kiến Thức Cốt Lõi'}</h2>
                <div className="flex items-center gap-4">
                    {controls}
                    <button onClick={onClose} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                        <XMarkIcon className="w-5 h-5" />
                        Thu gọn
                    </button>
                </div>
            </header>
            <div 
                className="flex-grow overflow-y-auto pr-4 -mr-4" 
                style={{ scrollbarWidth: 'thin', fontSize: `${fontSize}px` }}
            >
                <CoreHost canonKey={unit?.canonKey} />
            </div>
        </div>
    );
};


// --- Main Page ---
const GrammarPage: React.FC = () => {
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(1);
    const [shortForm, setShortForm] = useState(true);
    const [compact, setCompact] = useState(false);
    const [coreFontSize, setCoreFontSize] = useState(16);
    
    const [isVocabModalOpen, setIsVocabModalOpen] = useState(false);
    const [activeVocabType, setActiveVocabType] = useState<string | null>(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const [_state, _setState] = useState<GrammarState>({
        subject: 'I',
        lemma: { type: 'verb', text: 'work', base: 'work', past: 'worked', pp: 'worked', ing: 'working', vi: 'làm việc' },
        flags: {
            tense: 'present',
            aspect: 'simple',
            voice: 'active',
            polarity: 'affirmative',
            near_future: false,
            short_answer: false,
            contractions: true,
        },
        unitId: '1-1',
    });

    const [hero, setHero] = useState({ en: '', vi: '', error: null as string | null });
    const [debugInfo, setDebugInfo] = useState('');

    useEffect(() => {
        const { en, vi, error } = generateSentence(_state);
        setHero({ en, vi, error });
        setDebugInfo(`Debug: ${_state.flags.tense} | ${_state.flags.aspect} | ${_state.flags.voice} | ${_state.flags.polarity} | NF: ${_state.flags.near_future}`);
    }, [_state]);

    const handleUnitSelect = useCallback((unit: Unit) => {
        const newFlags = getFlagsForUnit(unit, _state.flags);
        _setState(prev => ({ ...prev, unitId: unit.id, flags: newFlags }));
    }, [_state.flags]);

    const handleFlagChange = <K extends keyof Flags>(key: K, value: Flags[K]) => {
        _setState(prev => {
            const flags = { ...prev.flags };
            
            if (key === 'near_future') {
                const val = value as boolean;
                flags.near_future = val;
                if (val) {
                    flags.aspect = 'simple';
                }
            } else if (key === 'aspect') {
                const val = value as Flags['aspect'];
                flags.aspect = val;
                if (val !== 'simple') {
                    flags.near_future = false;
                }
            } else {
                flags[key] = value;
            }
            
            return { ...prev, flags };
        });
    };
    
    const handleSubjectChange = (subject: Subject) => {
         _setState(prev => ({ ...prev, subject }));
    };

    const handleLemmaChange = (lemma: Lemma) => {
         _setState(prev => ({ ...prev, lemma }));
    };
    
    const handleGroupSelect = (groupId: number) => {
        setSelectedGroupId(groupId);
        const firstUnit = units.find(u => u.group_id === groupId);
        if (firstUnit) {
            handleUnitSelect(firstUnit);
        } else {
             _setState(prev => ({ ...prev, unitId: null }));
        }
    }

    const handleVocabButtonClick = (type: string) => {
        setActiveVocabType(type);
        setIsVocabModalOpen(true);
    };

    const handleVocabSelect = (item: VocabItem) => {
        let newLemma: Lemma;
        switch (activeVocabType) {
            case 'Động từ':
            case 'Động từ BQT':
                newLemma = {
                    type: 'verb',
                    text: item.base || '',
                    base: item.base,
                    past: item.past,
                    pp: item.pp,
                    ing: item.ing,
                    vi: item.vi,
                };
                break;
            case 'Tính từ':
                newLemma = { type: 'adj', text: item.word || '', vi: item.vi };
                break;
            case 'Trạng từ':
                newLemma = { type: 'adv', text: item.word || '', vi: item.vi };
                break;
            case 'Danh từ':
                 newLemma = { type: 'noun', text: (item.article ? `${item.article} ${item.word}` : item.word) || '', article: item.article, vi: item.vi };
                break;
            case 'Giới từ':
                newLemma = { type: 'prep', text: item.word || '', vi: item.vi };
                break;
            case 'Liên từ':
                newLemma = { type: 'conj', text: item.word || '', vi: item.vi };
                break;
            default:
                newLemma = _state.lemma;
        }
        _setState(prev => ({ ...prev, lemma: newLemma }));
    };

    const getVocabPack = () => {
        const typeMap: Record<string, keyof typeof vocab.packs> = {
            'Động từ': 'verb',
            'Động từ BQT': 'irregular',
            'Tính từ': 'adj',
            'Trạng từ': 'adv',
            'Danh từ': 'noun_sg',
            'Giới từ': 'prep',
            'Liên từ': 'conj',
        };
        const key = activeVocabType ? typeMap[activeVocabType] : null;
        return key ? vocab.packs[key] : [];
    };

    const selectedUnit = units.find(u => u.id === _state.unitId);

    return (
        <div className="space-y-4 relative">
            <VocabModal
                isOpen={isVocabModalOpen}
                onClose={() => setIsVocabModalOpen(false)}
                wordType={activeVocabType || ''}
                vocabPack={getVocabPack()}
                onSelect={handleVocabSelect}
            />
            
            <FullScreenCoreKnowledge
                isOpen={isFullScreen}
                onClose={() => setIsFullScreen(false)}
                unit={selectedUnit || null}
                fontSize={coreFontSize}
                onIncrease={() => setCoreFontSize(s => s + 1)}
                onDecrease={() => setCoreFontSize(s => Math.max(12, s - 1))}
            />

            <div className="absolute top-[-24px] left-[-24px] right-[-24px] h-1.5 bg-teal-200" />
            
            <header className="grid grid-cols-[1fr_auto] gap-4 items-center">
                <TopBar onButtonClick={handleVocabButtonClick} activeType={activeVocabType} />
                <SubjectVerbSelector 
                    subject={_state.subject} 
                    onSubjectChange={handleSubjectChange}
                    lemma={_state.lemma}
                    onLemmaChange={handleLemmaChange}
                />
            </header>

            <HeroZone 
                en={maybeShorten(hero.en, shortForm)} 
                vi={hero.vi} 
                debug={debugInfo} 
                error={hero.error}
                lemma={_state.lemma}
            />
            <Controls
                flags={_state.flags}
                onFlagChange={handleFlagChange}
                shortForm={shortForm}
                setShortForm={setShortForm}
                compact={compact}
                setCompact={setCompact}
            />

            <div className={`grid ${compact ? 'lg:grid-cols-2 xl:grid-cols-2' : 'grid-cols-1 lg:grid-cols-4 xl:grid-cols-5'} gap-6`} style={{height: '600px'}}>
                <div className="lg:col-span-1 xl:col-span-1 h-full">
                    <GroupsColumn onSelect={handleGroupSelect} selectedId={selectedGroupId} />
                </div>
                <div className="lg:col-span-1 xl:col-span-1 h-full">
                    <UnitsColumn selectedGroupId={selectedGroupId} onSelect={handleUnitSelect} selectedId={_state.unitId} />
                </div>
                {!compact && (
                    <div className="lg:col-span-2 xl:col-span-3 h-full">
                        <CoreKnowledgeColumn 
                            unit={selectedUnit || null}
                            fontSize={coreFontSize}
                            onIncrease={() => setCoreFontSize(s => s + 1)}
                            onDecrease={() => setCoreFontSize(s => Math.max(12, s - 1))}
                            onToggleFullScreen={() => setIsFullScreen(true)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default GrammarPage;