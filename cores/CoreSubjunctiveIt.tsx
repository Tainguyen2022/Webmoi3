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

export default function CoreSubjunctiveIt() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ✨ <span className="underline decoration-4 decoration-amber-400">GIẢ ĐỊNH: It is important that...</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Cấu trúc giả định trang trọng dùng sau các cụm từ "It is + adj/noun" để diễn tả sự cần thiết, yêu cầu hoặc đề nghị. Động từ trong mệnh đề 'that' luôn ở dạng <b>nguyên mẫu (V-bare)</b>.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Với Tính từ" formula="It is + adj + that + S + V(bare)" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Với Danh từ" formula="It is + a Noun + that + S + V(bare)" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Mục đích & Cách dùng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#adjectives">Cấu trúc với Tính từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#nouns">Cấu trúc với Danh từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#notes">Lưu ý (Phủ định, Bị động)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Mục đích & Cách dùng" emoji="🎯">
        <p>
            Tương tự như thể giả định với các động từ (suggest, demand,...), cấu trúc "It is... that" cũng được dùng để nhấn mạnh một yêu cầu hoặc sự cần thiết, chứ không phải để mô tả một sự thật.
        </p>
        <ul className="list-disc pl-6">
          <li>Nó trang trọng và thường được sử dụng trong văn viết học thuật hoặc công việc.</li>
          <li>Điểm ngữ pháp quan trọng nhất là động từ trong mệnh đề "that" không chia và không có "to".</li>
        </ul>
      </Section>

      <Section id="adjectives" title="Cấu trúc với Tính từ" emoji="🗣️">
        <p>Cấu trúc này theo sau các tính từ chỉ sự quan trọng, cần thiết.</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức: <code className="font-mono">It is + Adjective + that + S + V(bare)</code></p>
        </div>
        <p className="mt-2">Các tính từ thường gặp: <b>essential, important, necessary, vital, crucial, imperative, advisable, recommended, best</b>.</p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>It is vital that you <b>be</b> present at the meeting.</i> (Không phải `are`)</li>
            <li><i>It was important that he <b>submit</b> the report on time.</i> (Không phải `submitted`)</li>
        </ul>
      </Section>

      <Section id="nouns" title="Cấu trúc với Danh từ" emoji="📚">
        <p>Cấu trúc này cũng có thể được dùng sau một số danh từ có ý nghĩa tương tự.</p>
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Công thức: <code className="font-mono">It is + a Noun + that + S + V(bare)</code></p>
        </div>
        <p className="mt-2">Các danh từ thường gặp: <b>a necessity, a requirement, a good idea, a recommendation, a regulation</b>.</p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>It is a requirement that every employee <b>wear</b> a uniform.</i> (Không phải `wears`)</li>
            <li><i>It was a good idea that we <b>start</b> early.</i></li>
        </ul>
      </Section>
      
      <Section id="notes" title="Lưu ý (Phủ định, Bị động)" emoji="⚠️">
        <ol className="list-decimal pl-6 space-y-2">
            <li><b>Dạng phủ định:</b> Thêm "not" trước động từ nguyên mẫu.
                <br/><i>It is crucial that he <b>not be</b> disturbed.</i>
            </li>
            <li><b>Dạng bị động:</b> Dùng "be + V3/V-ed".
                <br/><i>It is necessary that all equipment <b>be checked</b> regularly.</i>
            </li>
            <li><b>Thay thế bằng "should" (ít trang trọng hơn):</b>
                 <br/><i>It is important that you <b>should arrive</b> on time.</i>
            </li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>It is important that she be informed of the changes.</b> — Điều quan trọng là cô ấy phải được thông báo về những thay đổi.</li>
          <li><b>It was necessary that we book the tickets in advance.</b> — Việc chúng ta đặt vé trước là cần thiết.</li>
          <li><b>It is a recommendation from the board that the project be postponed.</b> — Đó là một đề nghị từ hội đồng quản trị rằng dự án nên được hoãn lại.</li>
          <li><b>It is essential that he not arrive late.</b> — Điều cốt yếu là anh ta không được đến muộn.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền dạng đúng của động từ trong ngoặc:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>It is essential that every student (have) ______ a library card.</li>
            <li>It was a requirement that all participants (register) ______ online.</li>
            <li>It is advisable that she (not travel) ______ alone at night.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
