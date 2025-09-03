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

export default function CorePastContinuous(){
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🎬 <span className="underline decoration-4 decoration-amber-400">THÌ QUÁ KHỨ TIẾP DIỄN</span> — Past Continuous
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả một hành động <b>đang diễn ra</b> tại một thời điểm cụ thể trong quá khứ, hoặc một hành động đang diễn ra thì có hành động khác xen vào.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="AFFIRMATIVE" formula="S + was/were + V-ing" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="NEGATIVE" formula="S + wasn't/weren't + V-ing" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="YES/NO QUESTION" formula="Was/Were + S + V-ing ?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="WH-QUESTION" formula="Wh + was/were + S + V-ing ?" colors="from-teal-500 via-cyan-500 to-blue-500"/>
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
          <li><b>Hành động đang xảy ra tại một thời điểm cụ thể trong quá khứ:</b> <i>At 8 p.m. last night, I <u>was watching</u> TV.</i></li>
          <li><b>Hành động đang xảy ra thì có hành động khác xen vào (dùng Quá khứ đơn):</b> <i>I <u>was walking</u> home when it <u>started</u> to rain.</i></li>
          <li><b>Hai hành động xảy ra song song trong quá khứ (dùng 'while'):</b> <i>While I <u>was cooking</u>, he <u>was reading</u> a book.</i></li>
          <li><b>Mô tả bối cảnh, không khí của một câu chuyện:</b> <i>The sun <u>was shining</u> and the birds <u>were singing</u>.</i></li>
          <li><b>Hành động lặp đi lặp lại gây khó chịu (với 'always', 'constantly'):</b> <i>He <u>was always losing</u> his keys.</i></li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Ghi chú" emoji="🧩">
        <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
            <div className="font-bold text-indigo-700">Cấu trúc</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Khẳng định:</b> <i>S + was/were + V-ing</i>.</li>
              <li><b>Phủ định:</b> <i>S + was/were + not + V-ing</i>.</li>
              <li><b>Yes/No:</b> <i>Was/Were + S + V-ing ?</i></li>
              <li><b>Chia 'to be':</b> <b>was</b> (I, he, she, it) / <b>were</b> (you, we, they).</li>
            </ul>
        </div>
      </Section>

      <Section id="signals" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p><b>at + [giờ] + [thời gian quá khứ]</b> (e.g., <i>at 8 p.m. yesterday</i>), <b>at this time + [thời gian quá khứ]</b>, <b>while</b>, <b>when</b>, <b>as</b>.</p>
      </Section>

      <Section id="contrast" title="So sánh với Quá khứ đơn" emoji="⚖️">
        <ul className="list-disc pl-6">
          <li><b>Quá khứ tiếp diễn</b>: Hành động nền, kéo dài, bối cảnh. — <i>I <u>was reading</u> a book.</i></li>
          <li><b>Quá khứ đơn</b>: Hành động xen vào, ngắn gọn, dứt điểm. — <i>The phone <u>rang</u>.</i></li>
          <li><b>Kết hợp:</b> <i>I <u>was reading</u> a book when the phone <u>rang</u>.</i></li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng với <i>stative verbs</i> (know, like, want…) ❌.</li>
          <li>Nhầm lẫn giữa <b>was</b> và <b>were</b>.</li>
          <li>Sử dụng khi không có yếu tố "đang diễn ra", chỉ là hành động đã kết thúc (phải dùng Quá khứ đơn).</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-1">
          <li>At 7 PM yesterday, we <b>were having</b> dinner. — Vào 7 giờ tối qua, chúng tôi <b>đang ăn tối</b>.</li>
          <li>While I <b>was studying</b>, my brother <b>was playing</b> video games. — Trong khi tôi <b>đang học</b>, anh trai tôi <b>đang chơi</b> game.</li>
          <li>It started to rain while we <b>were walking</b> to the park. — Trời bắt đầu mưa trong khi chúng tôi <b>đang đi bộ</b> đến công viên.</li>
          <li>She <b>wasn't listening</b> when the teacher explained the lesson. — Cô ấy <b>đã không lắng nghe</b> khi giáo viên giải thích bài học.</li>
          <li>What <b>were</b> you <b>doing</b> when I called you? — Bạn <b>đang làm gì</b> khi tôi gọi bạn vậy?</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">A. Điền dạng đúng của động từ:</p>
          <ol className="list-decimal pl-6">
            <li>He ______ (sleep) when the alarm rang.</li>
            <li>At this time last year, we ______ (travel) in Japan.</li>
            <li>They ______ (not/play) football at 3 p.m. yesterday.</li>
          </ol>
          <p className="mt-3 font-semibold">B. Viết lại câu phủ định:</p>
          <ol className="list-decimal pl-6">
            <li>She was watching TV all evening. → _______________________</li>
          </ol>
          <p className="mt-3 font-semibold">C. Đặt câu hỏi Yes/No:</p>
          <ol className="list-decimal pl-6">
            <li>They were talking about the project. → _______________________?</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}