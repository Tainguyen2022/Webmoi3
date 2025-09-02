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

export default function CorePassivePresentPerfectContinuous() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        {/* Fix: Corrected Tailwind CSS typo */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ⚠️ <span className="underline decoration-4 decoration-amber-400">BỊ ĐỘNG HTHT TIẾP DIỄN</span> — <i>Passive (PPC)</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Đây là một thì <b>cực kỳ hiếm gặp</b> trong tiếng Anh hiện đại vì cấu trúc của nó rất dài và không tự nhiên. Mặc dù đúng về mặt ngữ pháp, người bản xứ hầu như luôn tránh dùng nó.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cấu trúc (Không tự nhiên)" formula="S + has/have + been being + V3" colors="from-slate-600 via-gray-700 to-black"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Tại sao thì này hiếm gặp?</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức (để tham khảo)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#alternatives">Các cách diễn đạt thay thế tự nhiên hơn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ & Cách cải thiện</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Tại sao thì này hiếm gặp?" emoji="🤔">
        <p>
            Mục đích của thì này là để nhấn mạnh quá trình kéo dài của một hành động bị động. Tuy nhiên, cụm từ <b>"been being"</b> được cho là rất nặng nề và khó nghe. Do đó, người bản xứ gần như luôn tìm cách diễn đạt khác tự nhiên hơn.
        </p>
        <div className="mt-2 text-sm text-red-700 bg-red-50 p-3 rounded-lg border border-red-200">
            <b>Lời khuyên:</b> Hãy nhận biết thì này, nhưng <b>đừng cố gắng sử dụng nó</b> trong văn viết hay giao tiếp hàng ngày. Thay vào đó, hãy dùng các phương án thay thế.
        </div>
      </Section>

      <Section id="form" title="Công thức (để tham khảo)" emoji="🔧">
        <p>
            Về mặt lý thuyết, cấu trúc được hình thành như sau:
        </p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">Subject + has/have + been + being + Past Participle (V3/V-ed)</p>
        </div>
        <p className="mt-2"><i>e.g., The road <b>has been being repaired</b> for months.</i> (Nghe rất không tự nhiên)</p>
      </Section>
      
      <Section id="alternatives" title="Các cách diễn đạt thay thế tự nhiên hơn" emoji="👍">
        <p>
            Để diễn tả ý "một hành động đã và đang được thực hiện trong một khoảng thời gian", hãy dùng các cách sau:
        </p>
        <ol className="list-decimal pl-6 space-y-3 mt-2">
            <li><b>Dùng thể Chủ động (Active Voice):</b> Đây là cách tốt và phổ biến nhất nếu bạn biết hoặc có thể đoán người thực hiện hành động.
                <br/><i>Không tự nhiên: The road has been being repaired for months.</i>
                <br/><i>Tự nhiên hơn: <b>They have been repairing</b> the road for months.</i>
            </li>
            <li><b>Dùng Bị động Hiện tại Hoàn thành (Present Perfect Passive):</b> Cách này tập trung vào kết quả hoặc hành động đã xảy ra, thay vì quá trình.
                <br/><i>Không tự nhiên: Applications have been being accepted since last week.</i>
                <br/><i>Tự nhiên hơn: <b>Applications have been accepted</b> since last week.</i>
            </li>
             <li><b>Dùng một cấu trúc khác:</b> Sử dụng các cụm từ như "under construction", "under repair", v.v.
                <br/><i>Không tự nhiên: The bridge has been being built for two years.</i>
                <br/><i>Tự nhiên hơn: <b>The bridge has been under construction</b> for two years.</i>
            </li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ & Cách cải thiện" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Không tự nhiên:</b> The problem has been being discussed for hours.
          <br/><b>Tốt hơn (Chủ động):</b> They <b>have been discussing</b> the problem for hours.
          </li>
          <li><b>Không tự nhiên:</b> My bike has been being fixed since yesterday.
          <br/><b>Tốt hơn (Bị động HTHT):</b> My bike <b>has been fixed</b>.
           <br/><b>Hoặc (Chủ động):</b> The mechanic <b>has been fixing</b> my bike since yesterday.
          </li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết lại các câu sau theo cách tự nhiên hơn:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The book has been being read by the students all week.
            <br/>→ The students __________________________________________.</li>
            <li>This software has been being developed for three years.
            <br/>→ They __________________________________________________.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
