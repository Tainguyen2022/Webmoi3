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

export default function CoreFutureSimple(){
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          🚀 <span className="underline decoration-4 decoration-amber-400">THÌ TƯƠNG LAI ĐƠN</span> — Future Simple (will)
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả <b>quyết định tức thời</b>, <b>dự đoán</b> không có căn cứ, <b>lời hứa</b>, <b>lời đề nghị</b>, và các sự kiện trong tương lai không có kế hoạch trước.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="AFFIRMATIVE" formula="S + will + V(bare)" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="NEGATIVE" formula="S + will not (won't) + V(bare)" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="YES/NO QUESTION" formula="Will + S + V(bare) ?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="WH-QUESTION" formula="Wh + will + S + V(bare) ?" colors="from-teal-500 via-cyan-500 to-blue-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Ghi chú</a></li>
            <li><a className="text-rose-700 hover:underline" href="#signals">Dấu hiệu nhận biết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với "Be going to"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <ul className="list-disc pl-6">
          <li><b>Quyết định tức thời (Spontaneous Decision):</b> <i>I'm thirsty. I think I <u>will buy</u> a drink.</i></li>
          <li><b>Dự đoán không căn cứ (Prediction):</b> <i>I think it <u>will rain</u> tomorrow.</i></li>
          <li><b>Lời hứa (Promise):</b> <i>I <u>will help</u> you with your homework.</i></li>
          <li><b>Lời đề nghị/yêu cầu (Offer/Request):</b> <i>I <u>will carry</u> your bag for you. / <u>Will</u> you <u>open</u> the door?</i></li>
          <li><b>Lời đe dọa (Threat):</b> <i>Stop it or I <u>will tell</u> your mom.</i></li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Ghi chú" emoji="🧩">
        <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
            <div className="font-bold text-indigo-700">Cấu trúc</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Khẳng định:</b> <i>S + will + V(bare)</i>. (Dùng <i>will</i> cho mọi chủ ngữ).</li>
              <li><b>Phủ định:</b> <i>S + will not (won't) + V(bare)</i>.</li>
              <li><b>Yes/No:</b> <i>Will + S + V(bare) ?</i></li>
              <li><b>Wh-:</b> <i>Wh + will + S + V(bare) ?</i></li>
              <li><b>V(bare)</b> là động từ nguyên mẫu không "to".</li>
            </ul>
        </div>
      </Section>

      <Section id="signals" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p><b>tomorrow</b>, <b>next week/month/year</b>, <b>in the future</b>, <b>soon</b>. Thường đi kèm với các động từ chỉ quan điểm như: <b>think</b>, <b>believe</b>, <b>hope</b>, <b>expect</b>, <b>suppose</b>, hoặc trạng từ <b>perhaps</b>, <b>probably</b>.</p>
      </Section>

      <Section id="contrast" title="So sánh với &quot;Be going to&quot;" emoji="⚖️">
        <ul className="list-disc pl-6">
          <li><b>will</b>: Quyết định tức thời, dự đoán cá nhân. — <i>The phone is ringing. I'<u>ll get</u> it.</i></li>
          <li><b>be going to</b>: Kế hoạch, dự định đã có từ trước; dự đoán có căn cứ. — <i>Look at those clouds! It'<u>s going to rain</u>.</i></li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Nhầm lẫn với "be going to".</li>
          <li>Dùng động từ thêm "to" hoặc "-s" sau "will". (❌ <i>He will to go / He will goes</i>).</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-1">
          <li>I think she <b>will win</b> the competition. — Tôi nghĩ cô ấy <b>sẽ thắng</b> cuộc thi.</li>
          <li>We <b>will probably visit</b> our grandparents next weekend. — Chúng tôi <b>có lẽ sẽ thăm</b> ông bà vào cuối tuần tới.</li>
          <li>Don't worry, I <b>won't tell</b> anyone your secret. — Đừng lo, tôi <b>sẽ không nói</b> bí mật của bạn cho ai đâu.</li>
          <li><b>Will</b> you <b>help</b> me with this exercise? — Bạn <b>sẽ giúp</b> tôi bài tập này chứ?</li>
          <li>He <b>will be</b> 20 years old next month. — Anh ấy <b>sẽ</b> 20 tuổi vào tháng tới.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">A. Chọn "will" hoặc "be going to":</p>
          <ol className="list-decimal pl-6">
            <li>A: The bag looks heavy. B: I ______ (help) you.</li>
            <li>Look at the sky! It ______ (rain).</li>
            <li>We ______ (travel) to Japan next year. We've already bought the tickets.</li>
          </ol>
          <p className="mt-3 font-semibold">B. Viết lại câu phủ định:</p>
          <ol className="list-decimal pl-6">
            <li>They will arrive tomorrow. → _______________________</li>
          </ol>
          <p className="mt-3 font-semibold">C. Đặt câu hỏi Yes/No:</p>
          <ol className="list-decimal pl-6">
            <li>He will join the party. → _______________________?</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}