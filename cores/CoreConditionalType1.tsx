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

export default function CoreConditionalType1(){
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🚦 <span className="underline decoration-4 decoration-amber-400">CÂU ĐIỀU KIỆN LOẠI 1</span> — Conditional Type 1
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả một điều kiện <b>có thật, có thể xảy ra</b> ở hiện tại hoặc tương lai (Real Conditional).
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cấu trúc chính" formula="If + S + V-s/es, S + will + V-bare" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Đảo mệnh đề" formula="S + will + V-bare if + S + V-s/es" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Đảo ngữ" formula="Should + S + V-bare, S + will + V-bare" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Dấu câu</a></li>
            <li><a className="text-rose-700 hover:underline" href="#variations">Các biến thể (Modals, Mệnh lệnh)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#inversion">Đảo ngữ với "Should"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <p>
            Câu điều kiện loại 1 diễn tả một giả định về một hành động hoặc sự việc có khả năng xảy ra trong hiện tại hoặc tương lai và kết quả của nó.
        </p>
        <ul className="list-disc pl-6">
          <li><b>Dự đoán:</b> <i>If it rains, we will stay home.</i> (Nếu trời mưa, chúng tôi sẽ ở nhà.)</li>
          <li><b>Lời hứa:</b> <i>If you pass the exam, I will buy you a new phone.</i> (Nếu con thi đỗ, bố sẽ mua cho con điện thoại mới.)</li>
          <li><b>Cảnh báo/Đe dọa:</b> <i>If you touch that wire, you will get an electric shock.</i> (Nếu bạn chạm vào sợi dây đó, bạn sẽ bị điện giật.)</li>
          <li><b>Đề nghị/Yêu cầu:</b> <i>If you need help, I will assist you.</i> (Nếu bạn cần giúp đỡ, tôi sẽ hỗ trợ bạn.)</li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Dấu câu" emoji="🧩">
        <p>Câu điều kiện loại 1 gồm hai mệnh đề: Mệnh đề If (điều kiện) và Mệnh đề chính (kết quả).</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Mệnh đề If: Thì Hiện tại đơn</p>
            <p className="font-bold text-blue-700 mt-2">Mệnh đề chính: Thì Tương lai đơn</p>
            <p className="font-mono mt-2">If + S + V(hiện tại đơn), S + will + V(nguyên mẫu)</p>
        </div>
        <p className="mt-2 font-semibold">Quy tắc dấu phẩy:</p>
        <ul className="list-disc pl-6">
            <li>Khi Mệnh đề If đứng đầu câu, dùng dấu phẩy (,) để ngăn cách hai mệnh đề.
                <br/><i>e.g., If we leave now, we will be on time.</i>
            </li>
            <li>Khi Mệnh đề chính đứng đầu câu, <b>KHÔNG</b> dùng dấu phẩy.
                <br/><i>e.g., We will be on time if we leave now.</i>
            </li>
        </ul>
      </Section>

      <Section id="variations" title="Các biến thể (Modals, Mệnh lệnh)" emoji="✨">
        <p>Thay vì dùng 'will', mệnh đề chính có thể dùng các động từ khuyết thiếu (modal verbs) khác hoặc câu mệnh lệnh để thay đổi sắc thái ý nghĩa.</p>
        <ul className="list-disc pl-6">
            <li><b>Dùng can/may/might:</b> <i>If it stops raining, we <b>can</b> go for a walk.</i> (chỉ khả năng)</li>
            <li><b>Dùng must/should:</b> <i>If you want to be healthy, you <b>should</b> eat more vegetables.</i> (chỉ lời khuyên)</li>
            <li><b>Dùng câu mệnh lệnh (Imperative):</b> <i>If you see her, <b>tell</b> her to call me.</i> (chỉ yêu cầu, mệnh lệnh)</li>
        </ul>
      </Section>

      <Section id="inversion" title="Đảo ngữ với &quot;Should&quot;" emoji="🔄">
        <p>Để câu văn trang trọng hơn, ta có thể dùng đảo ngữ với "Should" thay cho "If".</p>
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Công thức: <code className="font-mono">Should + S + V(nguyên mẫu), S + will + V(nguyên mẫu)</code></p>
        </div>
        <p className="mt-2"><b>Ví dụ:</b></p>
        <ul className="list-disc pl-6">
            <li><i>If he calls, please take a message.</i> → <i><b>Should he call</b>, please take a message.</i></li>
            <li><i>If you change your mind, let me know.</i> → <i><b>Should you change</b> your mind, let me know.</i></li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng <b>will</b> trong mệnh đề If. (❌ <i className="line-through">If it will rain, ...</i>)</li>
          <li>Quên chia động từ (thêm s/es) trong mệnh đề If với chủ ngữ ngôi thứ 3 số ít. (❌ <i className="line-through">If he come...</i>)</li>
          <li>Sai dấu phẩy khi đảo vị trí hai mệnh đề.</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>If you don't hurry, you will miss the train.</b> — Nếu bạn không nhanh lên, bạn sẽ lỡ chuyến tàu.</li>
          <li><b>She will be angry if I am late for the party.</b> — Cô ấy sẽ tức giận nếu tôi đến bữa tiệc muộn.</li>
          <li><b>If the weather is nice tomorrow, we can go swimming.</b> — Nếu thời tiết ngày mai đẹp, chúng ta có thể đi bơi.</li>
          <li><b>Should you need any further information, please do not hesitate to contact me.</b> — Nếu bạn cần thêm bất kỳ thông tin gì, xin đừng ngần ngại liên hệ với tôi.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">A. Hoàn thành các câu sau:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>If I see him, I ______ (give) him a message.</li>
            <li>You will get sick if you ______ (not wear) a coat.</li>
            <li>If he ______ (study) hard, he will pass the test.</li>
          </ol>
          <p className="mt-3 font-semibold">B. Viết lại câu sau dùng đảo ngữ với "Should":</p>
          <p className="pl-6">If you have any questions, ask the teacher.</p>
          <p className="pl-6">→ ____________________________________________</p>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}