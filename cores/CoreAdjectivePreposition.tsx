import React, { useState } from 'react';

// Reusing the FormulaChip component structure from other cores for consistency
type Chip = { label: string; formula: string; colors: string };
const FormulaChip: React.FC<Chip> = ({ label, formula, colors }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(formula); setCopied(true); setTimeout(()=>setCopied(false), 1200); } catch {}
  };
  return (
    <button
      onClick={copy}
      title={`Copy: ${formula}`}
      className={[
        'group relative w-full min-w-0 px-4 py-3 rounded-2xl',
        'text-white font-extrabold shadow-lg transition-[transform,box-shadow] active:scale-95',
        'ring-1 ring-white/20 bg-gradient-to-r', colors,
        'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-left'
      ].join(' ')}
    >
      <span className="truncate">{label}</span>
      <span className="hidden sm:inline ml-2 text-white/85 font-semibold">({formula})</span>
      <span className="sm:hidden text-white/85 font-semibold text-xs leading-tight">({formula})</span>
      {copied && (
        <span className="absolute -top-2 -right-2 text-[10px] px-2 py-0.5 rounded-full bg-black/70">Copied!</span>
      )}
    </button>
  );
};

// Reusing the Section component
const Section: React.FC<{id:string; title:string; emoji?:string; children: React.ReactNode}> = ({id,title,emoji,children}) => (
  <section id={id} className="scroll-mt-28">
    <h2 className="mt-10 text-2xl md:text-3xl font-extrabold tracking-tight">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-rose-600 to-orange-500">
        {emoji} {title}
      </span>
    </h2>
    <div className="mt-4 space-y-3 text-[15px] leading-7">{children}</div>
  </section>
);

export default function CoreAdjectivePreposition() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔗 <span className="underline decoration-4 decoration-amber-400">TÍNH TỪ + GIỚI TỪ</span> — <i>Adjective + Preposition</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Nhiều tính từ trong tiếng Anh đòi hỏi một giới từ cụ thể đi kèm để nối với danh từ hoặc động từ dạng V-ing theo sau. Đây là các cụm từ cố định (collocations) cần phải học thuộc.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Ví dụ 1" formula="afraid of spiders" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Ví dụ 2" formula="good at swimming" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Ví dụ 3" formula="interested in history" colors="from-indigo-500 via-purple-500 to-pink-500"/>
          <FormulaChip label="Ví dụ 4" formula="famous for its food" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#rule">Quy tắc chung</a></li>
            <li><a className="text-rose-700 hover:underline" href="#common-groups">Các cụm phổ biến (Theo giới từ)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="rule" title="Quy tắc chung" emoji="🔑">
        <p>
            Cấu trúc cơ bản là <b>Adjective + Preposition + Noun / Gerund (V-ing)</b>. Không có quy tắc logic nào để giải thích tại sao một tính từ lại đi với một giới từ cụ thể, vì vậy cách tốt nhất là học thuộc lòng chúng như một cụm từ vựng.
        </p>
      </Section>

      <Section id="common-groups" title="Các cụm phổ biến (Theo giới từ)" emoji="📚">
        <p>Dưới đây là danh sách các cụm tính từ + giới từ thường gặp, được nhóm theo giới từ để dễ học hơn.</p>
        <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div className="rounded-xl p-4 bg-gray-50 border">
                <h3 className="font-bold">ADJECTIVE + OF</h3>
                <p className="text-sm">afraid of, ashamed of, aware of, capable of, fond of, proud of, tired of, jealous of, full of, nervous of</p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <h3 className="font-bold">ADJECTIVE + TO</h3>
                <p className="text-sm">accustomed to, addicted to, allergic to, kind to, married to, similar to, loyal to, rude to, opposed to</p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <h3 className="font-bold">ADJECTIVE + FOR</h3>
                <p className="text-sm">famous for, ready for, responsible for, sorry for, grateful for, eligible for, suitable for</p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <h3 className="font-bold">ADJECTIVE + WITH</h3>
                <p className="text-sm">angry with (sb), bored with, pleased with, satisfied with, familiar with, crowded with, associated with</p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <h3 className="font-bold">ADJECTIVE + AT</h3>
                <p className="text-sm">good at, bad at, clever at, skillful at, surprised at, amazed at, angry at (sth)</p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <h3 className="font-bold">ADJECTIVE + IN</h3>
                <p className="text-sm">interested in, successful in, experienced in, involved in</p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <h3 className="font-bold">ADJECTIVE + ABOUT</h3>
                <p className="text-sm">angry about (sth), worried about, excited about, happy about, sad about, curious about</p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <h3 className="font-bold">ADJECTIVE + FROM</h3>
                <p className="text-sm">different from, safe from, absent from, free from</p>
            </div>
        </div>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng sai giới từ. Ví dụ: nói "interested for" thay vì "interested in".</li>
          <li>Dùng động từ nguyên mẫu có 'to' (to-infinitive) sau giới từ, thay vì dùng V-ing (gerund).
          <br/>❌ <i className="line-through">I'm tired of to wait.</i> → ✅ I'm tired of <b>waiting</b>.
          </li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>She is very good at playing the piano.</b> — Cô ấy rất giỏi chơi piano.</li>
          <li><b>I'm not familiar with this part of the city.</b> — Tôi không quen thuộc với khu vực này của thành phố.</li>
          <li><b>He is responsible for managing the team.</b> — Anh ấy chịu trách nhiệm quản lý đội.</li>
          <li><b>They were very proud of their son's achievements.</b> — Họ rất tự hào về thành tích của con trai mình.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền giới từ đúng vào chỗ trống:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>Are you afraid ______ spiders?</li>
            <li>She is interested ______ learning a new language.</li>
            <li>He is allergic ______ cats.</li>
            <li>I'm really worried ______ the exam tomorrow.</li>
             <li>This brand is famous ______ its high-quality products.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}