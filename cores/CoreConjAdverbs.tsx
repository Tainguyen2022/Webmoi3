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

export default function CoreConjAdverbs() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        {/* Fix: Corrected broken emoji and Tailwind CSS typo */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
         🔄 <span className="underline decoration-4 decoration-amber-400">TRẠNG TỪ LIÊN KẾT</span> — <i>Conjunctive Adverbs</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là những trạng từ (however, therefore,...) được dùng để nối hai mệnh đề độc lập, thể hiện mối quan hệ logic giữa chúng. Chúng đòi hỏi quy tắc dấu câu rất nghiêm ngặt.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Dùng Dấu chấm phẩy" formula="IC; however, IC." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Dùng Dấu chấm" formula="IC. However, IC." colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="SAI (Comma Splice)" formula="IC, however, IC." colors="from-red-600 to-rose-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">1. Định nghĩa & Chức năng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#types">2. Các loại Trạng từ phổ biến</a></li>
            <li><a className="text-rose-700 hover:underline" href="#punctuation">3. Quy tắc Dấu câu (Rất quan trọng!)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">4. So sánh với các Liên từ khác</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">5. Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">6. Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="1. Định nghĩa & Chức năng" emoji="🎯">
        <p>
            <b>Trạng từ liên kết (Conjunctive Adverb)</b>, còn gọi là trạng từ nối, là cầu nối giữa hai ý tưởng hoàn chỉnh (hai mệnh đề độc lập). Chức năng của chúng là làm rõ mối quan hệ logic giữa hai câu đó.
        </p>
      </Section>

      <Section id="types" title="2. Các loại Trạng từ phổ biến" emoji="📚">
        <p>Chúng thường được nhóm theo chức năng:</p>
        <div className="grid md:grid-cols-2 gap-3 mt-3">
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">Tương phản (Contrast):</b> however, nevertheless, on the other hand, in contrast.</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">Kết quả (Result):</b> therefore, consequently, as a result, thus.</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">Bổ sung (Addition):</b> moreover, furthermore, in addition, also.</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">Thời gian (Time):</b> meanwhile, then, next, subsequently.</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">Nhấn mạnh (Emphasis):</b> indeed, in fact, certainly.</div>
        </div>
      </Section>

      <Section id="punctuation" title="3. Quy tắc Dấu câu (Rất quan trọng!)" emoji="✍️">
        <p>Đây là điểm khác biệt lớn nhất giữa trạng từ liên kết và các loại liên từ khác. Chúng không thể nối hai câu chỉ bằng một dấu phẩy.</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Cách 1: Dùng Dấu chấm phẩy (;).</b> Đây