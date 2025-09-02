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

export default function CoreCompoundComplexSentence() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
           🧩 <span className="underline decoration-4 decoration-amber-400">CÂU PHỨC HỢP</span> — Compound-Complex Sentence
        </h1>
        <p className="mt-2 text-gray-700">
          Là loại câu cao cấp nhất, kết hợp giữa câu ghép và câu phức, chứa ít nhất <b>hai mệnh đề độc lập (IC)</b> và ít nhất <b>một mệnh đề phụ thuộc (DC)</b>.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cấu trúc 1" formula="DC, IC, and IC" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Cấu trúc 2" formula="IC, but IC DC" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#def">Định nghĩa & Thành phần</a></li>
            <li><a className="text-rose-700 hover:underline" href="#structure">Cấu trúc & Sắp xếp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#punctuation">Quy tắc dấu câu Nâng cao</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="def" title="Định nghĩa & Thành phần" emoji="📖">
        <p>
          <b>Câu phức hợp</b> (Compound-Complex Sentence) dùng để diễn đạt những ý tưởng phức tạp, đa chiều trong cùng một câu. Nó được tạo thành từ:
        </p>
        <ul className="list-disc pl-6">
          <li><b>Ít nhất hai Mệnh đề độc lập (IC):</b> Đây là phần "Compound" (ghép).</li>
          <li><b>Ít nhất một Mệnh đề phụ thuộc (DC):</b> Đây là phần "Complex" (phức).</li>
        </ul>
        <p className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <b>Ví dụ phân tích:</b> <span className="text-blue-600">[<u>Although I was tired</u>]</span>, <span className="text-green-600">[I went to the gym]</span>, <span className="text-red-600">and</span> <span className="text-green-600">[I had a great workout]</span>.
          <br/>→ Mệnh đề phụ thuộc (DC) + Mệnh đề độc lập 1 (IC1) + Liên từ + Mệnh đề độc lập 2 (IC2).
        </p>
      </Section>

      <Section id="structure" title="Cấu trúc & Sắp xếp" emoji="🏗️">
        <p>Các mệnh đề có thể được sắp xếp theo nhiều cách khác nhau. Dưới đây là một vài cấu trúc phổ biến:</p>
        <div className="space-y-3">
            <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
                <p><b className="font-mono text-gray-700">DC, IC, coordinator IC.</b></p>
                <p className="pl-4"><i><span className="text-blue-600">When the movie ended</span>, <span className="text-green-600">we left the cinema</span>, <span className="text-red-600">and</span> <span className="text-green-600">we went for a coffee</span>.</i></p>
            </div>
            <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
                <p><b className="font-mono text-gray-700">IC, coordinator IC DC.</b></p>
                <p className="pl-4"><i><span className="text-green-600">She missed her flight</span>, <span className="text-red-600">so</span> <span className="text-green-600">she had to rebook</span> <span className="text-blue-600">because she had an important meeting</span>.</i></p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
                <p><b className="font-mono text-gray-700">IC DC, coordinator IC.</b></p>
                <p className="pl-4"><i><span className="text-green-600">The team celebrated</span> <span className="text-blue-600">after they won the championship</span>, <span className="text-red-600">but</span> <span className="text-green-600">they still had one more game to play</span>.</i></p>
            </div>
        </div>
      </Section>

      <Section id="punctuation" title="Quy tắc dấu câu Nâng cao" emoji="⚠️">
        <p>Dấu câu trong câu phức hợp tuân theo sự kết hợp của các quy tắc từ câu ghép và câu phức:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Luôn đặt dấu phẩy (,) trước liên từ FANBOYS</b> khi nó nối hai mệnh đề độc lập.</li>
            <li><b>Đặt dấu phẩy (,) sau mệnh đề phụ thuộc</b> khi nó đứng đầu câu.</li>
            <li><b>Không dùng dấu phẩy</b> khi mệnh đề phụ thuộc đứng sau mệnh đề độc lập mà nó bổ nghĩa.</li>
        </ul>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Kate doesn't like cartoons because they are loud, so she doesn't watch them.</b> — Kate không thích phim hoạt hình vì chúng ồn ào, vì vậy cô ấy không xem chúng.</li>
          <li><b>Even though he was tired, he finished his project, and he submitted it on time.</b> — Mặc dù đã mệt, anh ấy vẫn hoàn thành dự án của mình, và anh ấy đã nộp nó đúng hạn.</li>
          <li><b>The dog barks when he hears a noise, but he is usually very quiet.</b> — Con chó sủa khi nó nghe thấy tiếng động, nhưng nó thường rất im lặng.</li>
          <li><b>Because the situation is urgent, you should call me as soon as you can, or we will miss the deadline.</b> — Vì tình hình khẩn cấp, bạn nên gọi cho tôi ngay khi có thể, nếu không chúng ta sẽ lỡ hạn chót.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Phân tích câu sau, chỉ ra các mệnh đề độc lập (IC) và mệnh đề phụ thuộc (DC):</p>
          <p className="mt-2 pl-4"><i>While I was studying, my brother was playing games, and my parents were watching TV.</i></p>
          <ul className="list-disc pl-10 mt-2">
              <li>DC: _______________________</li>
              <li>IC 1: _______________________</li>
              <li>IC 2: _______________________</li>
          </ul>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}