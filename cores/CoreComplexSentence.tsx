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

export default function CoreComplexSentence() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          🧩 <span className="underline decoration-4 decoration-amber-400">CÂU PHỨC</span> — Complex Sentence
        </h1>
        <p className="mt-2 text-gray-700">
          Là câu chứa <b>một mệnh đề độc lập (IC)</b> và ít nhất <b>một mệnh đề phụ thuộc (DC)</b>, nối với nhau bằng liên từ phụ thuộc.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Mệnh đề phụ trước" formula="DC, IC" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Mệnh đề chính trước" formula="IC DC" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#def">Định nghĩa & Đặc điểm</a></li>
            <li><a className="text-rose-700 hover:underline" href="#conjunctions">Liên từ Phụ thuộc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#punctuation">Quy tắc dấu phẩy (Rất quan trọng!)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="def" title="Định nghĩa & Đặc điểm" emoji="📖">
        <p>
          <b>Câu phức</b> (Complex Sentence) kết hợp một ý chính (mệnh đề độc lập) với một ý phụ (mệnh đề phụ thuộc) để tạo ra mối quan hệ nguyên nhân-kết quả, điều kiện, thời gian, v.v.
        </p>
        <ul className="list-disc pl-6">
          <li><b>Mệnh đề độc lập (Independent Clause - IC):</b> Là một câu đơn hoàn chỉnh, có thể đứng một mình. <i>(e.g., I went home.)</i></li>
          <li><b>Mệnh đề phụ thuộc (Dependent Clause - DC):</b> Bắt đầu bằng một liên từ phụ thuộc, không thể đứng một mình làm câu. <i>(e.g., <u>because I was tired</u>.)</i></li>
          <li><b>Kết hợp:</b> <i>I went home because I was tired.</i></li>
        </ul>
      </Section>

      <Section id="conjunctions" title="Liên từ Phụ thuộc (Subordinating Conjunctions)" emoji="🔗">
        <p>Đây là những từ nối mệnh đề phụ thuộc vào mệnh đề chính. Một số liên từ phổ biến:</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="text-indigo-600">Thời gian:</b> when, while, before, after, since, until, as soon as</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="text-indigo-600">Nguyên nhân:</b> because, since, as</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="text-indigo-600">Điều kiện:</b> if, unless</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="text-indigo-600">Đối lập:</b> although, though, even though, while</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="text-indigo-600">Mục đích:</b> so that, in order that</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="text-indigo-600">Nơi chốn:</b> where, wherever</div>
        </div>
      </Section>

      <Section id="punctuation" title="Quy tắc dấu phẩy (Rất quan trọng!)" emoji="⚠️">
        <p>Quy tắc dấu phẩy trong câu phức rất đơn giản và nhất quán:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Khi Mệnh đề Phụ thuộc (DC) đứng TRƯỚC:</b> Dùng dấu phẩy để ngăn cách hai mệnh đề.
                <p className="pl-4 text-sm text-gray-600 rounded-lg bg-green-50 p-2 border border-green-200">
                    <b className="font-mono">DC, IC.</b><br/>
                    <i><u>Although it was raining</u><b className="text-red-500">,</b> we went for a walk.</i>
                </p>
            </li>
            <li><b>Khi Mệnh đề Độc lập (IC) đứng TRƯỚC:</b> <b>KHÔNG</b> dùng dấu phẩy.
                <p className="pl-4 text-sm text-gray-600 rounded-lg bg-red-50 p-2 border border-red-200">
                    <b className="font-mono">IC DC.</b><br/>
                    <i>We went for a walk <u>although it was raining</u>.</i>
                </p>
            </li>
        </ul>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Because he was busy,</b> he couldn't join the party. — <b>Vì bận,</b> anh ấy không thể tham gia bữa tiệc.</li>
          <li>He couldn't join the party <b>because he was busy.</b> — Anh ấy không thể tham gia bữa tiệc <b>vì anh ấy bận.</b></li>
          <li>I will call you <b>when I finish my work.</b> — Tôi sẽ gọi cho bạn <b>khi tôi làm xong việc.</b></li>
          <li><b>If you study hard,</b> you will pass the exam. — <b>Nếu bạn học chăm chỉ,</b> bạn sẽ vượt qua kỳ thi.</li>
          <li>She has been a teacher <b>since she graduated from university.</b> — Cô ấy đã là giáo viên <b>kể từ khi tốt nghiệp đại học.</b></li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Nối các cặp câu sau thành câu phức, sử dụng liên từ trong ngoặc. Chú ý dấu câu!</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>She missed the bus. She woke up late. (because)</li>
            <li>I will go to the beach. The weather is nice. (if)</li>
            <li>He is very rich. He is not happy. (although)</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}