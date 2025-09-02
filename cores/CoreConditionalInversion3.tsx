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

export default function CoreConditionalInversion3() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔄 <span className="underline decoration-4 decoration-amber-400">ĐẢO NGỮ ĐIỀU KIỆN LOẠI 3</span> — <i>Inversion</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Một cách trang trọng để diễn đạt câu điều kiện loại 3 (giả định trái với quá khứ) bằng cách dùng <b>"Had"</b> thay cho <b>"If"</b>.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Đảo ngữ" formula="Had + S + V3, S + would have + V3" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Câu gốc (If)" formula="If + S + had + V3, S + would have + V3" colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Mục đích & Mức độ trang trọng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Cấu trúc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#negative">Đảo ngữ câu phủ định</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Mục đích & Mức độ trang trọng" emoji="👔">
        <p>
            Đảo ngữ câu điều kiện loại 3 với "Had" thường được dùng trong các ngữ cảnh trang trọng, đặc biệt là văn viết. Nó tạo ra một giọng văn nhấn mạnh hơn, mang tính văn học, phù hợp để diễn tả sự hối tiếc hoặc phân tích các tình huống giả định trong quá khứ.
        </p>
      </Section>

      <Section id="form" title="Công thức & Cấu trúc" emoji="🧩">
        <p>Để tạo câu đảo ngữ, chúng ta bỏ "If" và đảo trợ động từ "Had" lên đầu mệnh đề điều kiện.</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">Had + S + V3/V-ed, S + would have + V3/V-ed</p>
        </div>
        <p className="mt-2 font-semibold">So sánh:</p>
        <ul className="list-disc pl-6">
            <li><b>Câu gốc:</b> <i><b>If I had known</b> you were in the hospital, I would have visited you.</i></li>
            <li><b>Câu đảo ngữ:</b> <i><b>Had I known</b> you were in the hospital, I would have visited you.</i></li>
        </ul>
        <p>Mệnh đề chính (kết quả) không thay đổi cấu trúc.</p>
      </Section>

      <Section id="negative" title="Đảo ngữ câu phủ định" emoji="🚫">
        <p>Khi mệnh đề "If" ở dạng phủ định (had not), ta đặt "not" ngay sau chủ ngữ trong câu đảo ngữ.</p>
        <div className="rounded-xl p-4 bg-red-50 border border-red-200">
            <p className="font-bold text-red-700">Công thức:</p>
            <p className="font-mono mt-2">Had + S + not + V3/V-ed, ...</p>
        </div>
        <p className="mt-2 font-semibold">So sánh:</p>
        <ul className="list-disc pl-6">
            <li><b>Câu gốc:</b> <i><b>If she had not helped</b> me, I would have failed.</i></li>
            <li><b>Câu đảo ngữ:</b> <i><b>Had she not helped</b> me, I would have failed.</i></li>
        </ul>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Had I studied harder, I would have passed the exam.</b> — Nếu tôi đã học chăm chỉ hơn, tôi đã vượt qua kỳ thi.</li>
          <li><b>Had they arrived earlier, they would have seen the opening ceremony.</b> — Nếu họ đến sớm hơn, họ đã được xem lễ khai mạc.</li>
          <li><b>He would have bought the car had he had enough money.</b> — Anh ấy đã mua chiếc xe hơi đó nếu anh ấy có đủ tiền. (Đảo ngữ ở vế sau)</li>
          <li><b>Had you not reminded me, I would have forgotten the appointment.</b> — Nếu bạn đã không nhắc tôi, tôi đã quên mất cuộc hẹn.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết lại các câu sau dùng đảo ngữ với "Had":</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>If I had known about the problem, I would have helped.
            <br/>→ ____________________________________________</li>
            <li>If he had not been sick, he would have come to the party.
            <br/>→ ____________________________________________</li>
            <li>We would have won if we had played as a team.
            <br/>→ ____________________________________________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}