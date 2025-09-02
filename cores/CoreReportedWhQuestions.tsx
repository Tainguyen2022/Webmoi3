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

export default function CoreReportedWhQuestions() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🧐 <span className="underline decoration-4 decoration-amber-400">TƯỜNG THUẬT CÂU HỎI WH-</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Tường thuật lại câu hỏi bắt đầu bằng <b>What, Where, When, Why, Who, How</b> bằng cách giữ lại từ hỏi và chuyển câu về dạng trần thuật.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cấu trúc chính" formula="S + asked + Wh- + S + V(lùi thì)" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Có tân ngữ" formula="S + asked + O + Wh- + S + V(lùi thì)" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Quy tắc 4 thay đổi chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#structure">Cấu trúc & Trật tự từ (Rất quan trọng!)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#backshift">Quy tắc lùi thì (nhắc lại)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Quy tắc 4 thay đổi chính" emoji="🔑">
        <p>
            Khi chuyển từ câu hỏi Wh- trực tiếp sang gián tiếp, có 4 thay đổi quan trọng:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li><b>Giữ lại từ hỏi (Wh-word):</b> Từ hỏi (What, Where,...) được dùng làm từ nối.</li>
            <li><b>Thay đổi trật tự từ:</b> Chuyển từ dạng câu hỏi (Wh- + trợ động từ + S) sang dạng câu trần thuật (Wh- + S + V).</li>
            <li><b>Bỏ dấu chấm hỏi:</b> Thay dấu chấm hỏi (?) bằng dấu chấm (.).</li>
            <li><b>Lùi thì, đổi đại từ & trạng từ:</b> Áp dụng các quy tắc tương tự như câu trần thuật.</li>
        </ol>
      </Section>

      <Section id="structure" title="Cấu trúc & Trật tự từ (Rất quan trọng!)" emoji="🧩">
        <p>Đây là quy tắc quan trọng và dễ sai nhất. Mệnh đề sau từ hỏi phải có cấu trúc của một câu khẳng định (S + V).</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">S + asked (+ Object) + Wh-word + S + V(lùi thì).</p>
        </div>
        <p className="mt-2 font-semibold">Ví dụ về thay đổi trật tự từ:</p>
        <ul className="list-disc pl-6">
            <li><b>Direct:</b> "Where <b>are you</b> going?" he asked.</li>
            <li><b>Reported:</b> He asked where <b>I was</b> going.</li>
            <li className="text-red-600">❌ KHÔNG VIẾT: He asked where <b>was I</b> going.</li>
            <br/>
            <li><b>Direct:</b> "What <b>do you</b> want?" she asked.</li>
            <li><b>Reported:</b> She asked what <b>I wanted</b>. (Trợ động từ 'do/does/did' bị loại bỏ).</li>
            <li className="text-red-600">❌ KHÔNG VIẾT: She asked what <b>did I want</b>.</li>
        </ul>
      </Section>

      <Section id="backshift" title="Quy tắc lùi thì (nhắc lại)" emoji="🕰️">
        <p>Các quy tắc lùi thì, thay đổi đại từ và trạng từ thời gian/nơi chốn được áp dụng giống hệt như khi tường thuật câu trần thuật và câu hỏi Yes/No.</p>
        <ul className="list-disc pl-5 mt-1">
            <li><b>Hiện tại đơn (V/Vs)</b> → <b>Quá khứ đơn (V2/Ved)</b></li>
            <li><b>Quá khứ đơn (V2/Ved)</b> → <b>Quá khứ hoàn thành (had + V3)</b></li>
            <li><b>will</b> → <b>would</b></li>
            <li><b>can</b> → <b>could</b></li>
        </ul>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Direct:</b> "What is your name?" she asked me.
          <br/><b>Reported:</b> She asked me <b>what my name was</b>.
          </li>
          <li><b>Direct:</b> "When did you finish your homework?" my teacher asked.
          <br/><b>Reported:</b> My teacher asked <b>when I had finished my homework</b>.
          </li>
          <li><b>Direct:</b> "Why are you crying?" he asked.
          <br/><b>Reported:</b> He asked <b>why I was crying</b>.
          </li>
          <li><b>Direct:</b> "How will you solve this problem?" they asked.
          <br/><b>Reported:</b> They asked <b>how I would solve that problem</b>.
          </li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chuyển các câu hỏi trực tiếp sau sang câu gián tiếp:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>She asked me: "Where do you live?"
            <br/>→ She asked me ____________________________________________</li>
            <li>He asked: "What are you talking about?"
            <br/>→ He asked ____________________________________________</li>
            <li>My mother asked me: "Why did you come home so late last night?"
            <br/>→ My mother asked me ____________________________________________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}