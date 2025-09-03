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
        'flex flex-col items-start gap-1 text-left'
      ].join(' ')}
    >
      <span className="text-sm font-semibold text-white/80 truncate">{label}</span>
      <span className="truncate">{formula}</span>
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

export default function CorePastPerfect() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          ⏮️ <span className="underline decoration-4 decoration-amber-400">THÌ QUÁ KHỨ HOÀN THÀNH</span> — Past Perfect
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả một hành động <b>đã xảy ra và hoàn tất TRƯỚC</b> một hành động khác hoặc một thời điểm khác trong quá khứ.
        </p>

        {/* CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="AFFIRMATIVE"         formula="S + had + V3"                      colors="from-indigo-500 via-sky-500 to-cyan-500" />
          <FormulaChip label="NEGATIVE"            formula="S + had not + V3"                  colors="from-rose-500 via-pink-500 to-fuchsia-600" />
          <FormulaChip label="YES/NO QUESTION"     formula="Had + S + V3 ?"                    colors="from-emerald-500 via-lime-500 to-amber-500" />
          <FormulaChip label="WH-QUESTION"         formula="Wh + had + S + V3 ?"               colors="from-teal-500 via-cyan-500 to-blue-500" />
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Ghi chú</a></li>
            <li><a className="text-rose-700 hover:underline" href="#signals">Dấu hiệu nhận biết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với Quá khứ đơn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <ul className="list-disc pl-6">
          <li><b>Hành động xảy ra trước hành động khác trong quá khứ:</b> When I arrived, the train <u>had already left</u>.</li>
          <li><b>Hành động xảy ra trước một mốc thời gian quá khứ:</b> She <u>had finished</u> her homework <i>by 9 p.m. last night</i>.</li>
          <li><b>Câu điều kiện loại 3:</b> If he <u>had studied</u> harder, he would have passed the exam.</li>
          <li><b>Câu tường thuật (Reported Speech):</b> He said he <u>had seen</u> that movie.</li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Ghi chú" emoji="🧩">
        <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
            <div className="font-bold text-indigo-700">Cấu trúc</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Khẳng định:</b> <i>S + had + V3</i>. (<i>had</i> dùng cho mọi chủ ngữ)</li>
              <li><b>Phủ định:</b> <i>S + had not (hadn't) + V3</i>.</li>
              <li><b>Yes/No:</b> <i>Had + S + V3 ?</i></li>
              <li><b>Wh-:</b> <i>Wh + had + S + V3 ?</i></li>
              <li><b>V3</b> là động từ ở cột thứ 3 trong bảng động từ bất quy tắc, hoặc thêm <i>-ed</i> với động từ có quy tắc.</li>
            </ul>
        </div>
      </Section>

      <Section id="signals" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p><b>before</b>, <b>after</b>, <b>already</b>, <b>just</b>, <b>when</b>, <b>by the time</b>, <b>as soon as</b>, <b>until then</b>.</p>
      </Section>

      <Section id="contrast" title="So sánh với Quá khứ đơn" emoji="⚖️">
        <ul className="list-disc pl-6">
          <li><b>Quá khứ hoàn thành (Past Perfect)</b>: hành động xảy ra <u>trước</u>. — <i>The film <b>had started</b> when we arrived.</i></li>
          <li><b>Quá khứ đơn (Past Simple)</b>: hành động xảy ra <u>sau</u>, hoặc kể theo trình tự. — <i>The film started <b>when</b> we arrived.</i> (Hành động nối tiếp nhau).</li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Lạm dụng khi chỉ có một hành động duy nhất trong quá khứ (phải dùng Quá khứ đơn).</li>
          <li>Chia sai V3 đối với động từ bất quy tắc.</li>
          <li>Nhầm lẫn thứ tự trước-sau của hành động.</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-1">
          <li>I <b>had finished</b> my work before he came. — Tôi <b>đã làm xong</b> việc trước khi anh ấy đến.</li>
          <li>She told me she <b>had met</b> him before. — Cô ấy nói với tôi rằng cô ấy <b>đã gặp</b> anh ta trước đây.</li>
          <li>By the time we got to the cinema, the movie <b>had already begun</b>. — Lúc chúng tôi đến rạp, phim <b>đã bắt đầu rồi</b>.</li>
          <li>They <b>had not eaten</b>, so we went to a restaurant. — Họ <b>chưa ăn gì</b>, nên chúng tôi đã đi đến một nhà hàng.</li>
          <li><b>Had</b> you <b>ever visited</b> London before your trip in 2022? — Bạn <b>đã bao giờ thăm</b> London trước chuyến đi năm 2022 chưa?</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">A. Điền dạng đúng (had + V3):</p>
          <ol className="list-decimal pl-6">
            <li>When I arrived, they ______ (already/leave).</li>
            <li>He told me he ______ (not/see) the file.</li>
            <li>She ______ (live) in Paris before she moved to New York.</li>
          </ol>
          <p className="mt-3 font-semibold">B. Viết lại câu:</p>
          <ol className="list-decimal pl-6">
            <li>First, he did his homework. Then, he watched TV. → Before he watched TV, he ________________.</li>
          </ol>
          <p className="mt-3 font-semibold">C. Đặt câu hỏi Yes/No:</p>
          <ol className="list-decimal pl-6">
            <li>She had finished the project. → _______________________?</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}