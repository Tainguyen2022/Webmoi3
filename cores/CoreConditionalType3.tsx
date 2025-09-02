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

export default function CoreConditionalType3() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
         😥 <span className="underline decoration-4 decoration-amber-400">CÂU ĐIỀU KIỆN LOẠI 3</span> — Conditional Type 3
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả một điều kiện <b>không có thật, trái với quá khứ</b>, và kết quả tưởng tượng của nó. Thường dùng để nói về sự hối tiếc hoặc chỉ trích.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cấu trúc chính" formula="If + S + had + V3, S + would have + V3" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Đảo mệnh đề" formula="S + would have + V3 if + S + had + V3" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Đảo ngữ" formula="Had + S + V3, S + would have + V3" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Cấu trúc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#variations">Biến thể (could/might have)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#inversion">Đảo ngữ với "Had"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với Loại 2</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <p>
            Câu điều kiện loại 3 diễn tả một giả định về quá khứ mà đã không xảy ra, và kết quả tưởng tượng cũng đã không xảy ra.
        </p>
        <ul className="list-disc pl-6">
          <li><b>Hối tiếc (Regret):</b> <i>If I had studied harder, I would have passed the exam.</i> (Sự thật: Tôi đã không học chăm hơn, và tôi đã trượt.)</li>
          <li><b>Chỉ trích (Criticism):</b> <i>If you had listened to me, you wouldn't have made that mistake.</i> (Sự thật: Bạn đã không nghe tôi và đã mắc lỗi đó.)</li>
          <li><b>Suy diễn về một quá khứ khác:</b> <i>If we had left earlier, we would have caught the train.</i> (Sự thật: Chúng tôi đã không đi sớm hơn và đã lỡ tàu.)</li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Cấu trúc" emoji="🧩">
        <p>Câu điều kiện loại 3 dùng thì Quá khứ Hoàn thành trong mệnh đề If, và 'would have' + V3 trong mệnh đề chính.</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Mệnh đề If: Thì Quá khứ Hoàn thành (Past Perfect)</p>
            <p className="font-bold text-blue-700 mt-2">Mệnh đề chính: S + would have + V3/V-ed</p>
            <p className="font-mono mt-2">If + S + had + V3, S + would have + V3</p>
        </div>
      </Section>

      <Section id="variations" title="Biến thể (could/might have)" emoji="✨">
        <p>Trong mệnh đề chính, có thể dùng <b>could have</b> (chỉ khả năng đã có thể xảy ra) hoặc <b>might have</b> (chỉ xác suất không chắc chắn đã có thể xảy ra) thay cho 'would have'.</p>
        <ul className="list-disc pl-6">
            <li><b>Could have:</b> <i>If I had known you were coming, I <b>could have baked</b> a cake.</i> (Tôi đã có thể làm bánh...)</li>
            <li><b>Might have:</b> <i>If she had applied for the job, she <b>might have gotten</b> it.</i> (Cô ấy có lẽ đã nhận được việc.)</li>
        </ul>
      </Section>

      <Section id="inversion" title="Đảo ngữ với &quot;Had&quot;" emoji="🔄">
        <p>Để câu văn trang trọng hơn, ta có thể bỏ "If" và đảo "Had" lên đầu câu.</p>
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Công thức: <code className="font-mono">Had + S + V3, S + would have + V3</code></p>
        </div>
        <p className="mt-2"><b>Ví dụ:</b></p>
        <ul className="list-disc pl-6">
            <li><i>If I had known the truth, I would have acted differently.</i> → <i><b>Had I known</b> the truth, I would have acted differently.</i></li>
            <li><i>If you had been there, you would have seen it.</i> → <i><b>Had you been</b> there, you would have seen it.</i></li>
        </ul>
      </Section>
      
      <Section id="contrast" title="So sánh với Loại 2" emoji="⚖️">
        <ul className="list-disc pl-6">
            <li><b>Loại 2 (Trái với hiện tại):</b> <i>If I <b>knew</b> her number, I <b>would call</b> her.</i> (Sự thật là bây giờ tôi không biết số của cô ấy).</li>
            <li><b>Loại 3 (Trái với quá khứ):</b> <i>If I <b>had known</b> her number yesterday, I <b>would have called</b> her.</i> (Sự thật là hôm qua tôi đã không biết số của cô ấy).</li>
        </ul>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>If you had told me about the meeting, I would not have missed it.</b> — Nếu bạn đã nói cho tôi về cuộc họp, tôi đã không bỏ lỡ nó.</li>
          <li><b>She would have been here earlier if she hadn't been stuck in traffic.</b> — Cô ấy đã có thể ở đây sớm hơn nếu cô ấy không bị kẹt xe.</li>
          <li><b>Had we known you were in town, we would have invited you for dinner.</b> — Nếu chúng tôi đã biết bạn đang ở trong thị trấn, chúng tôi đã mời bạn đi ăn tối.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">A. Hoàn thành các câu sau:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>If I ______ (know) you were coming, I ______ (bake) a cake.</li>
            <li>He would have been on time if he ______ (not miss) the bus.</li>
            <li>What ______ you ______ (do) if you had been in my position?</li>
          </ol>
           <p className="font-semibold mt-3">B. Viết lại câu sau dùng đảo ngữ với "Had":</p>
          <p className="pl-6">If they had invested in that company, they would be rich now.</p>
          <p className="pl-6">→ ____________________________________________</p>
        </div>
      </Section>
      
      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}