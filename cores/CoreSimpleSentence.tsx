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

export default function CoreSimpleSentence() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          🧱 <span className="underline decoration-4 decoration-amber-400">CÂU ĐƠN</span> — Simple Sentence
        </h1>
        <p className="mt-2 text-gray-700">
          Là viên gạch nền tảng của ngữ pháp tiếng Anh, chứa một <b>mệnh đề độc lập duy nhất</b> để diễn đạt một ý trọn vẹn.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
          <FormulaChip label="Cơ bản" formula="S + V" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Có tân ngữ" formula="S + V + O" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="Có bổ ngữ" formula="S + V + C" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Có trạng ngữ" formula="S + V + A" colors="from-teal-500 via-cyan-500 to-blue-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#def">Định nghĩa & Đặc điểm</a></li>
            <li><a className="text-rose-700 hover:underline" href="#patterns">Các cấu trúc cơ bản</a></li>
            <li><a className="text-rose-700 hover:underline" href="#compound">Chủ ngữ/Vị ngữ ghép</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="def" title="Định nghĩa & Đặc điểm" emoji="📖">
        <p>
          <b>Câu đơn</b> (Simple Sentence) là câu chỉ chứa <b>một mệnh đề độc lập</b> (independent clause).
        </p>
        <ul className="list-disc pl-6">
          <li>Một mệnh đề độc lập phải có ít nhất một <b>chủ ngữ</b> (Subject - S) và một <b>động từ</b> (Verb - V).</li>
          <li>Nó diễn tả một ý tưởng hoàn chỉnh (a complete thought).</li>
          <li>Câu đơn có thể ngắn hoặc dài, miễn là chỉ có một cặp S-V chính.</li>
        </ul>
      </Section>

      <Section id="patterns" title="Các cấu trúc cơ bản" emoji="🧩">
        <div className="space-y-3">
          <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p><b className="font-mono text-blue-700">S + V</b> (Chủ ngữ + Động từ): Dùng với nội động từ.</p>
            <p className="pl-4"><i>e.g., The baby <u>cried</u>.</i></p>
          </div>
          <div className="rounded-xl p-4 bg-green-50 border border-green-200">
            <p><b className="font-mono text-green-700">S + V + O</b> (Chủ ngữ + Động từ + Tân ngữ): Dùng với ngoại động từ.</p>
            <p className="pl-4"><i>e.g., She <u>reads books</u>.</i></p>
          </div>
          <div className="rounded-xl p-4 bg-yellow-50 border border-yellow-200">
            <p><b className="font-mono text-yellow-700">S + V + C</b> (Chủ ngữ + Động từ + Bổ ngữ): Dùng với động từ nối (linking verbs).</p>
            <p className="pl-4"><i>e.g., He <u>is a doctor</u>.</i></p>
          </div>
          <div className="rounded-xl p-4 bg-red-50 border border-red-200">
            <p><b className="font-mono text-red-700">S + V + A</b> (Chủ ngữ + Động từ + Trạng ngữ): Trạng ngữ chỉ nơi chốn, thời gian...</p>
            <p className="pl-4"><i>e.g., They <u>live in Hanoi</u>.</i></p>
          </div>
        </div>
      </Section>

      <Section id="compound" title="Chủ ngữ & Vị ngữ ghép" emoji="🔗">
        <p>
          Một câu đơn vẫn là câu đơn ngay cả khi nó có <b>chủ ngữ ghép</b> (compound subject) hoặc <b>vị ngữ ghép</b> (compound predicate). Điều quan trọng là nó vẫn chỉ là một mệnh đề.
        </p>
        <ul className="list-disc pl-6">
          <li><b>Chủ ngữ ghép:</b> <i><u>Tom and Jerry</u> run fast.</i> (2 chủ ngữ, 1 động từ)</li>
          <li><b>Vị ngữ ghép:</b> <i>She <u>sings and dances</u> beautifully.</i> (1 chủ ngữ, 2 động từ)</li>
          <li><b>Cả hai đều ghép:</b> <i><u>My parents and I</u> <u>watch movies and eat popcorn</u> every weekend.</i></li>
        </ul>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-1">
          <li><b>The sun shines.</b> — Mặt trời tỏa nắng. (S+V)</li>
          <li><b>My cat sleeps on the sofa.</b> — Con mèo của tôi ngủ trên ghế sofa. (S+V+A)</li>
          <li><b>We study English.</b> — Chúng tôi học tiếng Anh. (S+V+O)</li>
          <li><b>The new students are intelligent and hardworking.</b> — Các sinh viên mới thì thông minh và chăm chỉ. (S+V+C, với bổ ngữ ghép)</li>
          <li><b>Jack and Jill went up the hill.</b> — Jack và Jill đã đi lên đồi. (Chủ ngữ ghép)</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Xác định Chủ ngữ (S) và Động từ (V) trong các câu đơn sau:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-1">
            <li>The old man walked slowly.</li>
            <li>Birds fly.</li>
            <li>My brother and his friend play football in the park.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}