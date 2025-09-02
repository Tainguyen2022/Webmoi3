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

export default function CoreWishPast() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
         😥 <span className="underline decoration-4 decoration-amber-400">CÂU ƯỚC Ở QUÁ KHỨ</span> — <i>Wish (past)</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả sự <b>hối tiếc</b> về một điều gì đó <b>đã hoặc không đã xảy ra trong quá khứ</b>.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cấu trúc chính" formula="S + wish(es) + S + had + V3" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Nhấn mạnh (If only)" formula="If only + S + had + V3" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Cấu trúc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với Ước ở Hiện tại</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <p>
            Câu ước ở quá khứ diễn tả một mong muốn rằng quá khứ đã diễn ra theo một cách khác. Nó luôn luôn nói về sự hối tiếc.
        </p>
        <ul className="list-disc pl-6">
          <li><b>Hối tiếc về một việc đã làm:</b> <i>I wish I hadn't said that.</i> (Sự thật: I said that.)</li>
          <li><b>Hối tiếc về một việc chưa làm:</b> <i>She wishes she had studied harder for the test.</i> (Sự thật: She didn't study hard.)</li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Cấu trúc" emoji="🧩">
        <p>Để diễn tả ước muốn trái với quá khứ, chúng ta dùng thì <b>Quá khứ Hoàn thành (Past Perfect)</b> trong mệnh đề sau "wish".</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">S1 + wish(es) + S2 + had + V3/V-ed</p>
            <p className="font-mono mt-2">S1 + wish(es) + S2 + had not (hadn't) + V3/V-ed</p>
        </div>
        <p className="mt-2 font-semibold">Cấu trúc nhấn mạnh "If only":</p>
        <ul className="list-disc pl-6">
            <li><i>If only I had known!</i> (Giá như tôi đã biết!)</li>
        </ul>
      </Section>

      <Section id="contrast" title="So sánh với Ước ở Hiện tại" emoji="⚖️">
        <p>Sự khác biệt nằm ở thời điểm của sự việc mà chúng ta đang ước.</p>
        <ul className="list-disc pl-6">
            <li><b>Ước ở Hiện tại (trái với hiện tại):</b> Dùng thì Quá khứ đơn.
                <br/><i>I wish I <b>knew</b> the answer now.</i> (Thực tế: Bây giờ tôi không biết.)
            </li>
            <li><b>Ước ở Quá khứ (trái với quá khứ):</b> Dùng thì Quá khứ Hoàn thành.
                <br/><i>I wish I <b>had known</b> the answer on the test yesterday.</i> (Thực tế: Hôm qua tôi đã không biết.)
            </li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng thì Quá khứ đơn thay vì Quá khứ Hoàn thành. (❌ <i className="line-through">I wish I studied harder yesterday.</i>)</li>
          <li>Chia sai động từ V3 (Past Participle).</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>I wish I had listened to your advice.</b> — Ước gì tôi đã lắng nghe lời khuyên của bạn.</li>
          <li><b>He wishes he hadn't spent so much money last night.</b> — Anh ấy ước rằng tối qua anh ấy đã không tiêu nhiều tiền như vậy.</li>
          <li><b>They wish they had bought the tickets earlier.</b> — Họ ước họ đã mua vé sớm hơn.</li>
          <li><b>If only she had been more careful!</b> — Giá như cô ấy đã cẩn thận hơn!</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết lại câu sử dụng cấu trúc "wish" để diễn tả sự hối tiếc:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>I didn't study for the exam.
            <br/>→ I wish ____________________________________________</li>
            <li>She lost her phone yesterday.
            <br/>→ She wishes ____________________________________________</li>
            <li>We didn't go to the concert.
            <br/>→ We wish we ____________________________________________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}