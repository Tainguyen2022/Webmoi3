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

export default function CoreCleftSentence() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          🎯 <span className="underline decoration-4 decoration-amber-400">CÂU CHẺ</span> — Cleft Sentence
        </h1>
        <p className="mt-2 text-gray-700">
          Là một cấu trúc câu phức dùng để <b>nhấn mạnh</b> một thành phần cụ thể (chủ ngữ, tân ngữ, trạng ngữ) bằng cách "chẻ" một câu đơn thành hai mệnh đề.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="It-Cleft" formula="It is/was + [part] + that..." colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Wh-Cleft" formula="What... + is/was + [part]" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#def">Định nghĩa & Mục đích</a></li>
            <li><a className="text-rose-700 hover:underline" href="#it-cleft">Câu chẻ với "It" (It-cleft)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#wh-cleft">Câu chẻ với "Wh-" (Wh-cleft)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="def" title="Định nghĩa & Mục đích" emoji="📖">
        <p>
          <b>Câu chẻ</b> (Cleft Sentence) được dùng khi người nói muốn thu hút sự chú ý vào một phần thông tin nào đó, xem nó là phần quan trọng nhất, đáng chú ý nhất trong câu.
        </p>
        <ul className="list-disc pl-6">
          <li><b>Câu gốc:</b> <i>My mother bought me this book yesterday.</i></li>
          <li><b>Nhấn mạnh chủ ngữ:</b> <i><b>It was my mother</b> who bought me this book yesterday.</i> (Chính là mẹ tôi...)</li>
          <li><b>Nhấn mạnh tân ngữ:</b> <i><b>It was this book</b> that my mother bought me yesterday.</i> (Chính là cuốn sách này...)</li>
        </ul>
      </Section>

      <Section id="it-cleft" title="Câu chẻ với &quot;It&quot; (It-cleft)" emoji="👉">
        <p>Đây là dạng câu chẻ phổ biến nhất, dùng để nhấn mạnh chủ ngữ, tân ngữ, hoặc trạng ngữ.</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức: <code className="font-mono">It + be + [Thành phần nhấn mạnh] + who/that + ...</code></p>
            <ul className="list-disc pl-5 mt-2">
                <li>Dùng <b>who</b> khi nhấn mạnh chủ ngữ chỉ người.</li>
                <li>Dùng <b>that</b> cho các trường hợp còn lại (vật, nơi chốn, thời gian...).</li>
                <li>Thì của động từ <b>be</b> (is/was) phải tương ứng với thì của động từ trong câu gốc.</li>
            </ul>
        </div>
        <p className="mt-2"><b>Ví dụ:</b> <i>David broke the vase last night.</i></p>
        <ul className="list-disc pl-6">
          <li>Nhấn mạnh S (người): <i><b>It was David who</b> broke the vase last night.</i></li>
          <li>Nhấn mạnh O (vật): <i><b>It was the vase that</b> David broke last night.</i></li>
          <li>Nhấn mạnh Trạng ngữ (thời gian): <i><b>It was last night that</b> David broke the vase.</i></li>
        </ul>
      </Section>
      
      <Section id="wh-cleft" title="Câu chẻ với &quot;Wh-&quot; (Wh-cleft)" emoji="🤔">
        <p>Dạng này còn gọi là <b>pseudo-cleft</b>, thường dùng để nhấn mạnh hành động hoặc một ý tưởng, thông tin mới.</p>
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Công thức: <code className="font-mono">What-clause + be + [Thành phần nhấn mạnh]</code></p>
            <p>Mệnh đề bắt đầu bằng <b>What</b> đóng vai trò chủ ngữ, theo sau là động từ <b>be</b>, rồi đến phần thông tin được nhấn mạnh.</p>
        </div>
        <p className="mt-2"><b>Ví dụ:</b> <i>I need a holiday.</i></p>
        <ul className="list-disc pl-6">
            <li>→ <i><b>What I need is</b> a holiday.</i> (Điều tôi cần là một kỳ nghỉ.)</li>
        </ul>
        <p className="mt-2"><b>Ví dụ khác:</b> <i>She said something interesting.</i></p>
        <ul className="list-disc pl-6">
            <li>→ <i><b>What she said was</b> interesting.</i> (Điều cô ấy nói thì thú vị.)</li>
        </ul>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>It is his attitude that</b> I don't like. — <b>Chính là thái độ của anh ta</b> mà tôi không thích.</li>
          <li><b>It was in this restaurant that</b> we first met. — <b>Chính tại nhà hàng này</b> chúng ta đã gặp nhau lần đầu.</li>
          <li><b>What I want to do now is</b> to sleep. — <b>Điều tôi muốn làm bây giờ là</b> đi ngủ.</li>
          <li><b>What happened was that</b> our car broke down. — <b>Chuyện đã xảy ra là</b> xe của chúng tôi bị hỏng.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết lại các câu sau thành câu chẻ để nhấn mạnh phần in đậm:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li><b>The manager</b> made the final decision. (Dùng It-cleft)
            <br/>→ ____________________________________________</li>
            <li>He forgot <b>the keys</b>. (Dùng It-cleft)
            <br/>→ ____________________________________________</li>
            <li>We need <b>more investment</b>. (Dùng Wh-cleft)
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