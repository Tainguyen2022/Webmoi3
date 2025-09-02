import React, { useState } from 'react';

type Chip = { label: string; formula: string; colors: string };

const FormulaChip: React.FC<Chip> = ({ label, formula, colors }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(formula); setCopied(true); setTimeout(()=>setCopied(false), 1200);} catch {} };
  return (
    <button
      onClick={copy}
      title={`Copy: ${formula}`}
      className={[
        'group relative w-full min-w-0 px-4 py-3 rounded-2xl text-white font-extrabold shadow-lg',
        'transition-[transform,box-shadow] active:scale-95 ring-1 ring-white/20',
        'bg-gradient-to-r', colors,
        'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-left'
      ].join(' ')}
    >
      <span className="truncate">{label}</span>
      <span className="hidden sm:inline ml-2 text-white/85 font-semibold">({formula})</span>
      <span className="sm:hidden text-white/85 font-semibold text-xs leading-tight">({formula})</span>
      {copied && <span className="absolute -top-2 -right-2 text-[10px] px-2 py-0.5 rounded-full bg-black/70">Copied!</span>}
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

export default function CorePastPerfectContinuous() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          🌊 <span className="underline decoration-4 decoration-amber-400">QUÁ KHỨ HOÀN THÀNH TIẾP DIỄN</span> — Past Perfect Continuous
        </h1>
        <p className="mt-2 text-gray-700">
          Nhấn mạnh <b>quá trình</b> của một hành động đã xảy ra và kéo dài liên tục <b>TRƯỚC</b> một hành động hoặc một thời điểm khác trong quá khứ.
        </p>

        {/* CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="AFFIRMATIVE"         formula="S + had + been + V-ing"            colors="from-indigo-500 via-sky-500 to-cyan-500" />
          <FormulaChip label="NEGATIVE"            formula="S + had not + been + V-ing"      colors="from-rose-500 via-pink-500 to-fuchsia-600" />
          <FormulaChip label="YES/NO QUESTION"     formula="Had + S + been + V-ing ?"          colors="from-emerald-500 via-lime-500 to-amber-500" />
          <FormulaChip label="WH-QUESTION"         formula="Wh + had + S + been + V-ing ?"     colors="from-teal-500 via-cyan-500 to-blue-500" />
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Ghi chú</a></li>
            <li><a className="text-rose-700 hover:underline" href="#signals">Dấu hiệu nhận biết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với QK Hoàn thành</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <ul className="list-disc pl-6">
          <li><b>Nhấn mạnh quá trình:</b> She <u>had been waiting</u> for two hours before the bus arrived.</li>
          <li><b>Giải thích nguyên nhân cho một tình huống quá khứ:</b> He was tired because he <u>had been working</u> all day.</li>
          <li><b>Kéo dài trước một mốc thời gian quá khứ:</b> They <u>had been living</u> in that city for ten years <i>before 2010</i>.</li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Ghi chú" emoji="🧩">
        <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
            <div className="font-bold text-indigo-700">Cấu trúc</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Khẳng định:</b> <i>S + had + been + V-ing</i>.</li>
              <li><b>Phủ định:</b> <i>S + had not (hadn't) + been + V-ing</i>.</li>
              <li><b>Yes/No:</b> <i>Had + S + been + V-ing ?</i></li>
              <li><b>Wh-:</b> <i>Wh + had + S + been + V-ing ?</i></li>
            </ul>
        </div>
      </Section>

      <Section id="signals" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p><b>for</b>, <b>since</b>, <b>how long</b>, <b>before</b>, <b>after</b>, <b>by the time</b>, <b>until then</b>.</p>
      </Section>

      <Section id="contrast" title="So sánh với Quá khứ Hoàn thành" emoji="⚖️">
        <ul className="list-disc pl-6">
          <li><b>QK Hoàn thành Tiếp diễn</b>: nhấn <u>quá trình</u>, sự liên tục, kéo dài. — <i>She <b>had been writing</b> the report for 3 hours when he called.</i></li>
          <li><b>QK Hoàn thành</b>: nhấn <u>kết quả</u>, sự hoàn tất. — <i>She <b>had written</b> the report when he called.</i> (Báo cáo đã xong).</li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng với <i>stative verbs</i> (know, like, want…) ❌.</li>
          <li>Thiếu <b>been</b> hoặc <b>had</b>.</li>
          <li>Nhầm với QK Hoàn thành khi muốn nhấn mạnh kết quả.</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-1">
          <li>He was tired because he <b>had been studying</b> all night. — Anh ấy mệt vì <b>đã học</b> cả đêm.</li>
          <li>They <b>had been playing</b> tennis for an hour before it started to rain. — Họ <b>đã chơi</b> tennis được một tiếng trước khi trời bắt đầu mưa.</li>
          <li>I <b>had been waiting</b> for 45 minutes when the train finally arrived. — Tôi <b>đã đợi</b> 45 phút khi tàu cuối cùng cũng đến.</li>
          <li>She <b>hadn't been feeling</b> well for a few days before she went to the doctor. — Cô ấy <b>đã cảm thấy không khỏe</b> vài ngày trước khi đi khám.</li>
          <li>How long <b>had you been working</b> there before you quit? — Bạn <b>đã làm việc</b> ở đó bao lâu trước khi nghỉ việc?</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">A. Điền dạng đúng (had been + V-ing):</p>
          <ol className="list-decimal pl-6">
            <li>We ______ (play) football for only ten minutes before it started raining.</li>
            <li>He was out of breath because he ______ (run).</li>
            <li>They ______ (drive) for hours before they finally reached the coast.</li>
          </ol>
          <p className="mt-3 font-semibold">B. Viết lại câu phủ định:</p>
          <ol className="list-decimal pl-6">
            <li>She had been working on the project all day. → _______________________</li>
          </ol>
          <p className="mt-3 font-semibold">C. Đặt câu hỏi Yes/No:</p>
          <ol className="list-decimal pl-6">
            <li>They had been arguing before you arrived. → _______________________?</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}