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
        'flex flex-col items-start gap-1 text-left'
      ].join(' ')}
    >
      {/* Chú giải (nhỏ hơn) */}
      <span className="text-sm font-semibold text-white/80 truncate">{label}</span>
      
      {/* Công thức (lớn hơn, kế thừa extrabold) */}
      <span className="truncate">{formula}</span>

      {/* toast nhỏ khi copy */}
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

export default function CoreConditionalInversion2() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔄 <span className="underline decoration-4 decoration-amber-400">ĐẢO NGỮ ĐIỀU KIỆN LOẠI 2</span> — <i>Inversion</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Một cách trang trọng để diễn đạt câu điều kiện loại 2 (giả định trái với hiện tại) bằng cách dùng <b>"Were"</b> thay cho <b>"If"</b>.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Đảo ngữ (V thường)" formula="Were + S + to V-bare, S + would + V-bare" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Đảo ngữ (to be)" formula="Were + S + ..., S + would + V-bare" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="Câu gốc (If)" formula="If + S + V2/were, S + would + V-bare" colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Mục đích & Mức độ trang trọng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Cấu trúc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lưu ý quan trọng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Mục đích & Mức độ trang trọng" emoji="👔">
        <p>
            Đảo ngữ câu điều kiện loại 2 với "Were" làm cho câu văn trở nên rất trang trọng, mang tính văn học hoặc giả thuyết cao.
        </p>
        <ul className="list-disc pl-6">
          <li>Thường được sử dụng trong các ngữ cảnh học thuật, văn chương hoặc khi muốn nhấn mạnh tính chất giả định của điều kiện.</li>
          <li>Đặc biệt phổ biến với cấu trúc "Were I you..." thay cho "If I were you...".</li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Cấu trúc" emoji="🧩">
        <p>Có hai trường hợp chính để đảo ngữ câu điều kiện loại 2:</p>
        <div className="grid md:grid-cols-2 gap-3">
            <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
                <p className="font-bold text-blue-700">1. Với động từ "to be"</p>
                <p>Bỏ "If", đảo "Were" lên đầu câu.</p>
                <p className="font-mono mt-2">Were + S + (Cụm danh từ/tính từ)...</p>
                <p className="mt-2"><i>If I were rich... → <b>Were I rich...</b></i></p>
                <p><i>If he were the leader... → <b>Were he the leader...</b></i></p>
            </div>
            <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
                <p className="font-bold text-purple-700">2. Với động từ thường</p>
                <p>Bỏ "If", dùng "Were" + "to V(bare)".</p>
                <p className="font-mono mt-2">Were + S + to V(nguyên mẫu)...</p>
                <p className="mt-2"><i>If she studied more... → <b>Were she to study</b> more...</i></p>
                <p><i>If they knew the answer... → <b>Were they to know</b> the answer...</i></p>
            </div>
        </div>
      </Section>

      <Section id="pitfalls" title="Lưu ý quan trọng" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Mệnh đề chính (mệnh đề kết quả) giữ nguyên: <b>S + would/could/might + V(bare)</b>.</li>
          <li>Luôn dùng <b>"Were"</b> cho đảo ngữ loại 2, không bao giờ dùng <b>"Was"</b>.</li>
          <li>Đối với động từ thường, bắt buộc phải có <b>"to V(bare)"</b> sau chủ ngữ.</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Were I you, I would accept the job offer immediately.</b> — Nếu tôi là bạn, tôi sẽ chấp nhận lời mời làm việc đó ngay lập tức.</li>
          <li><b>Were he to have more time, he would learn another language.</b> — Nếu anh ấy có nhiều thời gian hơn, anh ấy sẽ học một ngôn ngữ khác.</li>
          <li><b>She would travel the world were she not afraid of flying.</b> — Cô ấy sẽ đi du lịch khắp thế giới nếu cô ấy không sợ bay.</li>
          <li><b>Were the sun to rise in the west, I would not change my decision.</b> — Dù cho mặt trời có mọc ở phía tây, tôi cũng sẽ không thay đổi quyết định của mình. (ví dụ mang tính văn học)</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết lại các câu sau dùng đảo ngữ với "Were":</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>If I were a billionaire, I would donate to charity.
            <br/>→ ____________________________________________</li>
            <li>If he knew the secret, he would tell us.
            <br/>→ ____________________________________________</li>
            <li>If she lived closer, we could meet more often.
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