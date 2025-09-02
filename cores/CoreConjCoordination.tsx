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

export default function CoreConjCoordination() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔗 <span className="underline decoration-4 decoration-amber-400">LIÊN TỪ PHỐI HỢP & LỖI COMMA SPLICE</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Học cách nối hai mệnh đề độc lập (hai câu đơn) một cách chính xác bằng liên từ kết hợp (FANBOYS) và tránh lỗi "comma splice" - một trong những lỗi ngữ pháp phổ biến nhất.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="ĐÚNG" formula="IC, and IC." colors="from-green-500 to-emerald-500"/>
          <FormulaChip label="SAI (Comma Splice)" formula="IC, IC." colors="from-red-600 to-rose-600"/>
          <FormulaChip label="SỬA (Chấm phẩy)" formula="IC; IC." colors="from-sky-500 to-blue-500"/>
          <FormulaChip label="SỬA (Tách câu)" formula="IC. IC." colors="from-indigo-500 to-purple-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">1. Phối hợp là gì?</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comma-splice">2. Lỗi Comma Splice (Quan trọng!)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#how-to-fix">3. Bốn cách sửa lỗi Comma Splice</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">4. Ví dụ Phân tích</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">5. Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="1. Phối hợp là gì?" emoji="🎯">
        <p>
            <b>Phối hợp (Coordination)</b> là việc kết nối hai hoặc nhiều mệnh đề độc lập (Independent Clauses - IC). Một mệnh đề độc lập là một câu đơn hoàn chỉnh, có thể tự đứng một mình.
        </p>
        <p className="mt-2">Cách phổ biến nhất để phối hợp là dùng <b>Dấu phẩy (,) + Liên từ Kết hợp (FANBOYS)</b>.</p>
        <p><i>e.g., [<u>The weather was beautiful</u>]<b>, so</b> [<u>we went to the beach</u>].</i></p>
      </Section>
      
      <Section id="comma-splice" title="2. Lỗi Comma Splice (Quan trọng!)" emoji="🚫">
        <p>
            <b>Comma Splice</b> là một lỗi ngữ pháp nghiêm trọng, xảy ra khi bạn nối hai mệnh đề độc lập chỉ bằng một dấu phẩy. Dấu phẩy không đủ mạnh để làm việc này một mình.
        </p>
         <div className="rounded-xl p-4 bg-red-50 border border-red-200 mt-2">
            <p className="font-bold text-red-700">Ví dụ về Comma Splice:</p>
            <p>❌ <i>The presentation was long<b className="text-red-700">,</b> it was also very informative.</i></p>
            <p className="text-sm">(Cả "The presentation was long" và "it was also very informative" đều là câu hoàn chỉnh, không thể nối bằng mỗi dấu phẩy).</p>
        </div>
      </Section>

      <Section id="how-to-fix" title="3. Bốn cách sửa lỗi Comma Splice" emoji="🔧">
        <p>Có bốn cách chính để sửa lỗi này:</p>
        <ol className="list-decimal pl-6 space-y-3 mt-2">
            <li><b>Dùng dấu phẩy và một Liên từ Kết hợp (FANBOYS):</b>
                <br/><i>→ The presentation was long<b className="text-green-600">, but</b> it was also very informative.</i>
            </li>
            <li><b>Dùng dấu chấm phẩy (;):</b> Dùng khi hai ý có liên quan rất chặt chẽ.
                 <br/><i>→ The presentation was long<b className="text-green-600">;</b> it was also very informative.</i>
            </li>
            <li><b>Dùng dấu chấm (.):</b> Tách thành hai câu riêng biệt.
                 <br/><i>→ The presentation was long<b className="text-green-600">.</b> It was also very informative.</i>
            </li>
             <li><b>Dùng Liên từ Phụ thuộc:</b> Biến một mệnh đề thành mệnh đề phụ thuộc.
                 <br/><i>→ <b>Although</b> the presentation was long, it was also very informative.</i>
            </li>
        </ul>
      </Section>
      
      <Section id="examples" title="4. Ví dụ Phân tích" emoji="🔬">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Sai (Comma Splice):</b> <i>He is a talented musician, he plays the piano beautifully.</i>
          <br/><b>Đúng:</b> He is a talented musician<b>, and</b> he plays the piano beautifully.
          </li>
          <li><b>Sai (Comma Splice):</b> <i>I have to work late tonight, I can't join you for dinner.</i>
          <br/><b>Đúng:</b> I have to work late tonight<b>; therefore,</b> I can't join you for dinner. (Dùng trạng từ liên kết)
          </li>
        </ol>
      </Section>

      <Section id="drill" title="5. Bài tập nhanh" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Xác định câu nào đúng, câu nào bị lỗi Comma Splice. Sửa lại các câu sai.</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The class was difficult, however, I learned a lot.
            <br/>→ ____________________________________________</li>
            <li>She went to the library, and she studied for three hours.
            <br/>→ ____________________________________________</li>
            <li>My phone battery is low, I need to charge it.
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