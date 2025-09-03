import React, { useState } from 'react';

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
        'group relative w-full min-w-0 px-4 py-3 rounded-2xl text-white font-extrabold shadow-lg',
        'transition-[transform,box-shadow] active:scale-95 ring-1 ring-white/20',
        'bg-gradient-to-r', colors,
        // Bố cục 2 dòng, label ở trên, formula ở dưới
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

export default function CoreAdjectiveEdIng() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🎭 <span className="underline decoration-4 decoration-amber-400">TÍNH TỪ -ED / -ING</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Phân biệt cách dùng của hai loại tính từ được thành lập từ động từ: <b>-ing</b> (mô tả bản chất, gây ra cảm xúc) và <b>-ed</b> (mô tả cảm xúc bị tác động).
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Gây ra cảm xúc (-ing)" formula="The film is boring." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Cảm thấy (-ed)" formula="I am bored." colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#rule">Quy tắc cốt lõi</a></li>
            <li><a className="text-rose-700 hover:underline" href="#ing">Tính từ -ING (Chủ động)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#ed">Tính từ -ED (Bị động)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp (Rất quan trọng!)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="rule" title="Quy tắc cốt lõi" emoji="🔑">
        <p>
            Để phân biệt, hãy luôn tự hỏi: Tính từ này đang mô tả <b>nguyên nhân gây ra cảm xúc</b> hay <b>cảm xúc mà ai đó cảm thấy</b>?
        </p>
        <ul className="list-disc pl-6">
            <li><b>-ING:</b> Dùng cho người, vật, hoặc tình huống <b>gây ra</b> cảm xúc. Nó mô tả bản chất (active).</li>
            <li><b>-ED:</b> Dùng để mô tả cảm xúc của một người (hoặc động vật) <b>bị tác động</b> bởi điều gì đó (passive).</li>
        </ul>
      </Section>

      <Section id="ing" title="Tính từ -ING (Chủ động)" emoji="👉">
        <p>Mô tả bản chất của một sự vật, sự việc, hoặc một người. Nó trả lời cho câu hỏi: "Nó/Anh ấy/Cô ấy có tính chất như thế nào?"</p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>The book is very <b>interesting</b>.</i> (Bản chất cuốn sách là thú vị, nó làm cho người đọc thấy thú vị).</li>
            <li><i>His speech was <b>inspiring</b>.</i> (Bài phát biểu có tính truyền cảm hứng).</li>
            <li><i>He is a <b>boring</b> person.</i> (Anh ta là một người nhàm chán, anh ta làm người khác thấy chán).</li>
        </ul>
      </Section>
      
      <Section id="ed" title="Tính từ -ED (Bị động)" emoji="🧘">
        <p>Mô tả cảm giác, cảm xúc của một người hoặc con vật. Nó trả lời cho câu hỏi: "Bạn/Họ cảm thấy như thế nào?"</p>
         <ul className="list-disc pl-6 mt-2">
            <li><i>I am <b>interested</b> in the book.</i> (Tôi cảm thấy thú vị về cuốn sách).</li>
            <li><i>The audience felt <b>inspired</b> by his speech.</i> (Khán giả cảm thấy được truyền cảm hứng).</li>
            <li><i>I am <b>bored</b>.</i> (Tôi cảm thấy chán).</li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp (Rất quan trọng!)" emoji="⚠️">
        <p>Lỗi sai phổ biến nhất là nhầm lẫn giữa việc mô tả bản thân và cảm xúc của bản thân.</p>
        <div className="grid md:grid-cols-2 gap-3 mt-2">
            <div className="rounded-xl p-4 bg-red-50 border border-red-200">
                <p className="font-bold text-red-700">SAI: I am interesting.</p>
                <p>Câu này có nghĩa là "Tôi là một người thú vị", mô tả bản chất của bạn. Nếu bạn chỉ muốn nói bạn cảm thấy thú vị về một điều gì đó, đây là câu sai.</p>
            </div>
            <div className="rounded-xl p-4 bg-green-50 border border-green-200">
                <p className="font-bold text-green-700">ĐÚNG: I am interested.</p>
                <p>Câu này có nghĩa là "Tôi cảm thấy hứng thú/quan tâm (đến một cái gì đó)".</p>
            </div>
        </div>
         <p className="mt-3">Tương tự:</p>
         <ul className="list-disc pl-6">
            <li><i>I am <b>boring</b>.</i> (Tôi là người nhàm chán) vs. <i>I am <b>bored</b>.</i> (Tôi đang cảm thấy chán).</li>
         </ul>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li>The journey was <b>exhausting</b>, so we were all <b>exhausted</b>.
          <br/><i>Chuyến đi thật mệt mỏi, vì vậy tất cả chúng tôi đều kiệt sức.</i>
          </li>
          <li>I found the movie quite <b>disappointing</b>. I was <b>disappointed</b> with the ending.
          <br/><i>Tôi thấy bộ phim khá đáng thất vọng. Tôi đã thất vọng với cái kết.</i>
          </li>
           <li>It's so <b>frustrating</b>! I'm getting really <b>frustrated</b> with this computer.
          <br/><i>Thật là bực bội! Tôi đang thực sự bực mình với cái máy tính này.</i>
          </li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chọn dạng đúng của tính từ:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>This is the most (exciting/excited) game I've ever played.</li>
            <li>She was very (surprising/surprised) to see him there.</li>
            <li>I find his lectures really (boring/bored).</li>
            <li>Are you (interesting/interested) in art?</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}