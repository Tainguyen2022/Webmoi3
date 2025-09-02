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

export default function CoreConditionalInversion1() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔄 <span className="underline decoration-4 decoration-amber-400">ĐẢO NGỮ ĐIỀU KIỆN LOẠI 1</span> — <i>Inversion</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Một cách trang trọng để diễn đạt câu điều kiện loại 1 bằng cách dùng <b>"Should"</b> thay cho <b>"If"</b>.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cấu trúc đảo ngữ" formula="Should + S + V(bare), S + will + V(bare)" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Câu gốc (If)" formula="If + S + V(s/es), S + will + V(bare)" colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Mục đích & Mức độ trang trọng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Cấu trúc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#variations">Biến thể ở Mệnh đề chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lưu ý quan trọng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Mục đích & Mức độ trang trọng" emoji="👔">
        <p>
            Đảo ngữ câu điều kiện loại 1 với "Should" được dùng chủ yếu trong văn viết trang trọng (email công việc, văn bản học thuật) hoặc trong văn nói lịch sự.
        </p>
        <ul className="list-disc pl-6">
          <li>Nó làm cho điều kiện nghe có vẻ ít khả năng xảy ra hơn một chút so với dùng "If".</li>
          <li>Thể hiện sự lịch sự, đặc biệt khi đưa ra đề nghị hoặc yêu cầu.</li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Cấu trúc" emoji="🧩">
        <p>Để tạo câu đảo ngữ, chúng ta bỏ "If", đưa "Should" lên đầu, và chuyển động từ về dạng nguyên mẫu không "to" (bare infinitive).</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">Should + S + V(nguyên mẫu), Mệnh đề chính</p>
        </div>
        <p className="mt-2 font-semibold">So sánh:</p>
        <ul className="list-disc pl-6">
            <li><b>Câu gốc:</b> <i><b>If he comes</b> late, we will start without him.</i></li>
            <li><b>Câu đảo ngữ:</b> <i><b>Should he come</b> late, we will start without him.</i></li>
            <li className="text-red-600">Lưu ý: "comes" chuyển thành "come" (nguyên mẫu).</li>
        </ul>
      </Section>

      <Section id="variations" title="Biến thể ở Mệnh đề chính" emoji="✨">
        <p>Mệnh đề chính trong câu đảo ngữ loại 1 vẫn giữ nguyên cấu trúc như trong câu điều kiện loại 1 thông thường. Nó có thể là:</p>
        <ul className="list-disc pl-6">
            <li><b>Tương lai đơn:</b> <i>Should it rain, the match <b>will be cancelled</b>.</i></li>
            <li><b>Modal Verbs:</b> <i>Should you need assistance, you <b>can contact</b> customer service.</i></li>
            <li><b>Câu mệnh lệnh:</b> <i>Should you see her, <b>tell</b> her I called.</i></li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lưu ý quan trọng" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Động từ sau chủ ngữ trong mệnh đề "Should" <b>luôn ở dạng nguyên mẫu không 'to'</b>, kể cả với chủ ngữ ngôi thứ ba số ít. (❌ <i className="line-through">Should he calls...</i>)</li>
          <li>Không dùng "If" và "Should" cùng lúc. (❌ <i className="line-through">If should you need...</i>)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Should you have any questions, please do not hesitate to ask.</b> — Nếu bạn có bất kỳ câu hỏi nào, xin đừng ngần ngại hỏi.</li>
          <li><b>Should the package arrive while I am out, please sign for it.</b> — Nếu gói hàng đến trong lúc tôi đi vắng, làm ơn ký nhận nó.</li>
          <li><b>He will be promoted should he meet the sales target.</b> — Anh ấy sẽ được thăng chức nếu anh ấy đạt được mục tiêu doanh số.</li>
          <li><b>Should there be any problem, we will inform you immediately.</b> — Nếu có bất kỳ vấn đề gì, chúng tôi sẽ thông báo cho bạn ngay lập tức.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết lại các câu sau dùng đảo ngữ với "Should":</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>If you change your mind, let me know.
            <br/>→ ____________________________________________</li>
            <li>If she needs a ride, I can pick her up.
            <br/>→ ____________________________________________</li>
            <li>If the company offers him the job, he will take it.
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