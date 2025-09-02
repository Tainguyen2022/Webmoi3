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

export default function CoreAdverbTypes() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🏃 <span className="underline decoration-4 decoration-amber-400">TRẠNG TỪ: LOẠI & CHỨC NĂNG</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Giới thiệu các loại trạng từ chính (Cách thức, Nơi chốn, Thời gian, Tần suất, Mức độ) và cách chúng bổ nghĩa cho động từ, tính từ, và các trạng từ khác.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cách thức" formula="walks slowly" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Mức độ" formula="very tall" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Tần suất" formula="always busy" colors="from-indigo-500 via-purple-500 to-pink-500"/>
          <FormulaChip label="Thời gian" formula="arrived yesterday" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">Định nghĩa & Chức năng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#formation">Sự hình thành (Adjective + ly)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#types">5 Loại Trạng từ chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">Phân biệt Trạng từ & Tính từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="Định nghĩa & Chức năng" emoji="🎯">
        <p>
            <b>Trạng từ (Adverb)</b> là từ dùng để bổ nghĩa, cung cấp thêm thông tin cho:
        </p>
        <ul className="list-disc pl-6">
            <li><b>Động từ (Verb):</b> <i>He runs <b>quickly</b>.</i> (Bổ nghĩa cho 'runs')</li>
            <li><b>Tính từ (Adjective):</b> <i>She is <b>very</b> smart.</i> (Bổ nghĩa cho 'smart')</li>
            <li><b>Một trạng từ khác:</b> <i>He runs <b>extremely</b> quickly.</i> (Bổ nghĩa cho 'quickly')</li>
            <li><b>Cả một câu:</b> <i><b>Fortunately</b>, I passed the exam.</i></li>
        </ul>
      </Section>

       <Section id="formation" title="Sự hình thành (Adjective + ly)" emoji="🔧">
        <p>
            Hầu hết các trạng từ chỉ cách thức được hình thành bằng cách thêm đuôi <b>-ly</b> vào sau tính từ.
        </p>
        <ul className="list-disc pl-6">
            <li>slow → slow<b>ly</b></li>
            <li>beautiful → beautiful<b>ly</b></li>
            <li><b>Quy tắc đặc biệt:</b>
                <ul className="list-circle pl-5">
                    <li>-y → -ily: happy → happ<b>ily</b></li>
                    <li>-le → -ly: simple → simp<b>ly</b></li>
                    <li>-ic → -ically: basic → basical<b>ly</b></li>
                </ul>
            </li>
            <li><b>Trạng từ bất quy tắc:</b> good → <b>well</b>; fast → <b>fast</b>; hard → <b>hard</b>.</li>
        </ul>
      </Section>

      <Section id="types" title="5 Loại Trạng từ chính" emoji="📚">
        <p>Trạng từ thường được phân loại dựa trên câu hỏi mà chúng trả lời:</p>
        <div className="space-y-3">
            <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>1. Trạng từ chỉ Cách thức (Manner) - How?</b></p>
                <p className="text-sm text-gray-600">carefully, slowly, quickly, beautifully, well, badly</p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>2. Trạng từ chỉ Nơi chốn (Place) - Where?</b></p>
                <p className="text-sm text-gray-600">here, there, everywhere, outside, upstairs, nearby</p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>3. Trạng từ chỉ Thời gian (Time) - When?</b></p>
                <p className="text-sm text-gray-600">now, then, yesterday, tomorrow, soon, later</p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>4. Trạng từ chỉ Tần suất (Frequency) - How often?</b></p>
                <p className="text-sm text-gray-600">always, usually, often, sometimes, rarely, never</p>
            </div>
            <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>5. Trạng từ chỉ Mức độ (Degree) - To what extent?</b></p>
                <p className="text-sm text-gray-600">very, extremely, quite, almost, really, too</p>
            </div>
        </div>
      </Section>
      
      <Section id="comparison" title="Phân biệt Trạng từ & Tính từ" emoji="⚖️">
        <p>
            Tính từ bổ nghĩa cho danh từ, trong khi trạng từ bổ nghĩa cho động từ, tính từ, hoặc trạng từ khác.
        </p>
        <ul className="list-disc pl-6">
          <li><b>Tính từ:</b> <i>He is a <b>careful</b> driver.</i> ('careful' bổ nghĩa cho danh từ 'driver')</li>
          <li><b>Trạng từ:</b> <i>He drives <b>carefully</b>.</i> ('carefully' bổ nghĩa cho động từ 'drives')</li>
        </ul>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>She sings beautifully.</b> — Cô ấy hát rất hay. (Cách thức)</li>
          <li><b>Let's meet there tomorrow.</b> — Hãy gặp nhau ở đó vào ngày mai. (Nơi chốn, Thời gian)</li>
          <li><b>I am extremely tired today.</b> — Hôm nay tôi cực kỳ mệt. (Mức độ)</li>
          <li><b>He almost never arrives on time.</b> — Anh ấy hầu như không bao giờ đến đúng giờ. (Mức độ, Tần suất)</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Xác định trạng từ trong câu và cho biết nó thuộc loại nào:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The children played happily outside.
            <br/>→ Trạng từ: ____________, ____________. Loại: ____________, ____________.</li>
            <li>We will probably finish the project soon.
            <br/>→ Trạng từ: ____________, ____________. Loại: ____________, ____________.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}