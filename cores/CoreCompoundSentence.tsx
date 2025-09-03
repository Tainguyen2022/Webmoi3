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

export default function CoreCompoundSentence() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          🔗 <span className="underline decoration-4 decoration-amber-400">CÂU GHÉP</span> — Compound Sentence
        </h1>
        <p className="mt-2 text-gray-700">
          Là câu chứa từ <b>hai mệnh đề độc lập trở lên</b>, được nối với nhau bằng liên từ kết hợp (coordinators) hoặc dấu chấm phẩy (;).
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Dùng Liên từ (FANBOYS)" formula="IC, for/and/but... IC" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Dùng Dấu chấm phẩy" formula="IC; IC" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Dùng Trạng từ liên kết" formula="IC; however, IC" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#def">Định nghĩa & Đặc điểm</a></li>
            <li><a className="text-rose-700 hover:underline" href="#fanboys">7 Liên từ Kết hợp (FANBOYS)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#punctuation">Quy tắc dấu câu (Quan trọng!)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="def" title="Định nghĩa & Đặc điểm" emoji="📖">
        <p>
          <b>Câu ghép</b> (Compound Sentence) nối hai hoặc nhiều ý tưởng hoàn chỉnh (mệnh đề độc lập) có tầm quan trọng ngang nhau.
        </p>
        <ul className="list-disc pl-6">
          <li><b>Mệnh đề độc lập (Independent Clause - IC):</b> Là một câu đơn hoàn chỉnh (có S + V).</li>
          <li><b>Ví dụ:</b> <i>[I like coffee]</i> and <i>[she likes tea]</i>. Cả hai vế đều có thể đứng một mình làm câu.</li>
          <li>Câu ghép giúp tạo sự liên kết chặt chẽ về mặt ý nghĩa giữa các câu đơn.</li>
        </ul>
      </Section>

      <Section id="fanboys" title="7 Liên từ Kết hợp (FANBOYS)" emoji="🤝">
        <p>Đây là cách phổ biến nhất để tạo câu ghép. Mẹo nhớ: <b>F-A-N-B-O-Y-S</b>.</p>
        <div className="grid md:grid-cols-2 gap-3 mt-3">
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">F</b>or: giải thích nguyên nhân (tương tự 'because').</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">A</b>nd: thêm thông tin.</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">N</b>or: nối 2 ý phủ định (vế sau phải đảo ngữ).</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">B</b>ut: chỉ sự đối lập.</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">O</b>r: đưa ra lựa chọn.</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">Y</b>et: chỉ sự đối lập (tương tự 'but', trang trọng hơn).</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">S</b>o: chỉ kết quả.</div>
        </div>
      </Section>

      <Section id="punctuation" title="Quy tắc dấu câu (Quan trọng!)" emoji="⚠️">
        <ul className="list-disc pl-6 space-y-2">
            <li><b>Dùng dấu phẩy (,) trước FANBOYS:</b> Khi nối hai mệnh đề độc lập, luôn đặt dấu phẩy trước liên từ.
                <p className="pl-4 text-sm text-gray-600"><i>He studied hard<b className="text-red-500">, so</b> he passed the exam.</i></p>
            </li>
            <li><b>Dùng dấu chấm phẩy (;):</b> Có thể dùng để nối hai mệnh đề độc lập rất gần gũi về ý nghĩa mà không cần liên từ.
                <p className="pl-4 text-sm text-gray-600"><i>She is a talented musician<b className="text-red-500">;</b> she plays three instruments.</i></p>
            </li>
            <li><b>Dùng dấu chấm phẩy (;) và trạng từ liên kết:</b>
                <p className="pl-4 text-sm text-gray-600"><i>I planned to go hiking<b className="text-red-500">; however,</b> it rained all day.</i> (Lưu ý dấu phẩy sau 'however').</p>
            </li>
        </ul>
        <p className="mt-2 text-sm text-red-700 bg-red-50 p-2 rounded-lg border border-red-200">
            <b>Lỗi sai phổ biến (Comma Splice):</b> Chỉ dùng dấu phẩy để nối 2 mệnh đề độc lập mà không có liên từ. ❌ <i>I like coffee, she likes tea.</i>
        </p>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li>He wants to travel the world, <b>but</b> he doesn't have enough money. — Anh ấy muốn đi du lịch khắp thế giới, <b>nhưng</b> anh ấy không có đủ tiền.</li>
          <li>You can take the bus, <b>or</b> you can walk with us. — Bạn có thể đi xe buýt, <b>hoặc</b> bạn có thể đi bộ với chúng tôi.</li>
          <li>She didn't study for the test, <b>so</b> she failed. — Cô ấy đã không học bài cho kỳ thi, <b>vì vậy</b> cô ấy đã trượt.</li>
          <li>He doesn't like seafood, <b>nor</b> does he like spicy food. — Anh ấy không thích hải sản, <b>và cũng không</b> thích đồ cay. (Lưu ý đảo ngữ "does he like").</li>
          <li>The sun is shining<b>;</b> it is a beautiful day. — Mặt trời đang chiếu sáng<b>;</b> đó là một ngày đẹp trời.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Nối các cặp câu đơn sau thành câu ghép bằng liên từ trong ngoặc:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>I need to go to the store. We are out of milk. (for)</li>
            <li>She is a great student. She always does her homework. (and)</li>
            <li>He wants to buy a new car. He can't afford it right now. (but)</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}