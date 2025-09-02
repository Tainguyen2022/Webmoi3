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

export default function CoreFuturePerfectContinuous(){
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🏃‍♂️ <span className="underline decoration-4 decoration-amber-400">TƯƠNG LAI HOÀN THÀNH TIẾP DIỄN</span> — Future Perfect Continuous
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để nhấn mạnh <b>quá trình kéo dài</b> của một hành động cho đến một thời điểm hoặc một hành động khác trong tương lai.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="AFFIRMATIVE" formula="S + will have been + V-ing" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="NEGATIVE" formula="S + won't have been + V-ing" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="YES/NO QUESTION" formula="Will + S + have been + V-ing ?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="WH-QUESTION" formula="Wh + will + S + have been + V-ing ?" colors="from-teal-500 via-cyan-500 to-blue-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Ghi chú</a></li>
            <li><a className="text-rose-700 hover:underline" href="#signals">Dấu hiệu nhận biết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với Tương lai Hoàn thành</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <ul className="list-disc pl-6">
          <li><b>Nhấn mạnh sự liên tục của hành động đến một mốc tương lai:</b> <i>By the time he retires, he <u>will have been working</u> here for 30 years.</i></li>
          <li><b>Chỉ nguyên nhân của một tình huống trong tương lai:</b> <i>Next week, I will be tired because I <u>will have been studying</u> for my exams all week.</i></li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Ghi chú" emoji="🧩">
        <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
            <div className="font-bold text-indigo-700">Cấu trúc</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Khẳng định:</b> <i>S + will + have + been + V-ing</i>.</li>
              <li><b>Phủ định:</b> <i>S + will not (won't) + have + been + V-ing</i>.</li>
              <li><b>Yes/No:</b> <i>Will + S + have + been + V-ing ?</i></li>
              <li><b>Ghi chú:</b> Dùng <b>will have been</b> cho tất cả các chủ ngữ.</li>
            </ul>
        </div>
      </Section>

      <Section id="signals" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p><b>by... for + [khoảng thời gian]</b> (e.g., <i>by tomorrow for three hours</i>), <b>by the time + S + V(hiện tại đơn)</b>.</p>
      </Section>

      <Section id="contrast" title="So sánh với Tương lai Hoàn thành" emoji="⚖️">
        <ul className="list-disc pl-6">
          <li><b>TLHT Tiếp diễn</b>: Nhấn mạnh <u>quá trình, sự kéo dài</u>. — <i>By 9 p.m., I <u>will have been watching</u> TV for three hours.</i></li>
          <li><b>TL Hoàn thành</b>: Nhấn mạnh <u>kết quả, sự hoàn tất</u>. — <i>By 9 p.m., I <u>will have watched</u> three episodes.</i></li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng với <i>stative verbs</i> (know, like, want…) ❌.</li>
          <li>Thiếu <b>been</b> hoặc <b>have</b>.</li>
          <li>Nhầm lẫn với Tương lai Hoàn thành.</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-1">
          <li>By next month, we <b>will have been living</b> here for a year. — Đến tháng sau, chúng tôi <b>sẽ sống</b> ở đây được một năm rồi.</li>
          <li>When you arrive, I <b>will have been studying</b> for hours. — Khi bạn đến, tôi <b>sẽ đang học</b> được hàng giờ rồi.</li>
          <li>He <b>won't have been waiting</b> for long when her plane arrives. — Anh ấy <b>sẽ không phải đợi</b> lâu khi máy bay của cô ấy đến.</li>
          <li>How long <b>will</b> you <b>have been working</b> here by the end of this year? — Bạn <b>sẽ làm việc</b> ở đây được bao lâu tính đến cuối năm nay?</li>
          <li>By 5 PM, the team <b>will have been practicing</b> for three hours. — Đến 5 giờ chiều, cả đội <b>sẽ tập luyện</b> được ba tiếng đồng hồ.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">A. Điền dạng đúng (will have been + V-ing):</p>
          <ol className="list-decimal pl-6">
            <li>By the time we meet, she ______ (travel) for three weeks.</li>
            <li>In September, he ______ (teach) for twenty years.</li>
            <li>They are late. We ______ (wait) for an hour by the time they arrive.</li>
          </ol>
          <p className="mt-3 font-semibold">B. Viết lại câu phủ định:</p>
          <ol className="list-decimal pl-6">
            <li>She will have been driving for ten hours by then. → _______________________</li>
          </ol>
          <p className="mt-3 font-semibold">C. Đặt câu hỏi Yes/No:</p>
          <ol className="list-decimal pl-6">
            <li>He will have been working here for a year next month. → _______________________?</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}