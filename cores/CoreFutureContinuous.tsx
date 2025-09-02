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

export default function CoreFutureContinuous(){
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🕛 <span className="underline decoration-4 decoration-amber-400">THÌ TƯƠNG LAI TIẾP DIỄN</span> — Future Continuous
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả một hành động <b>sẽ đang diễn ra</b> tại một thời điểm cụ thể trong tương lai.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="AFFIRMATIVE" formula="S + will be + V-ing" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="NEGATIVE" formula="S + won't be + V-ing" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="YES/NO QUESTION" formula="Will + S + be + V-ing ?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="WH-QUESTION" formula="Wh + will + S + be + V-ing ?" colors="from-teal-500 via-cyan-500 to-blue-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Ghi chú</a></li>
            <li><a className="text-rose-700 hover:underline" href="#signals">Dấu hiệu nhận biết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với Tương lai đơn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <ul className="list-disc pl-6">
          <li><b>Hành động đang diễn ra tại một thời điểm cụ thể trong tương lai:</b> <i>This time next week, I <u>will be relaxing</u> on the beach.</i></li>
          <li><b>Hành động đang diễn ra thì có hành động khác xen vào (trong tương lai):</b> <i>I <u>will be waiting</u> for you when your bus arrives.</i></li>
          <li><b>Dự đoán một hành động sẽ đang xảy ra (chắc chắn):</b> <i>Don't call him now, he'<u>ll be sleeping</u>.</i></li>
          <li><b>Hỏi lịch sự về kế hoạch của ai đó:</b> <i><u>Will</u> you <u>be using</u> the printer later?</i></li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Ghi chú" emoji="🧩">
        <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
            <div className="font-bold text-indigo-700">Cấu trúc</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Khẳng định:</b> <i>S + will + be + V-ing</i>.</li>
              <li><b>Phủ định:</b> <i>S + will not (won't) + be + V-ing</i>.</li>
              <li><b>Yes/No:</b> <i>Will + S + be + V-ing ?</i></li>
              <li><b>Ghi chú:</b> Dùng <b>will be</b> cho tất cả các chủ ngữ.</li>
            </ul>
        </div>
      </Section>

      <Section id="signals" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p><b>at this time tomorrow</b>, <b>at this moment next year</b>, <b>at + [giờ] + tomorrow</b>, <b>when + S + V(hiện tại đơn)</b>.</p>
      </Section>

      <Section id="contrast" title="So sánh với Tương lai đơn" emoji="⚖️">
        <ul className="list-disc pl-6">
          <li><b>Tương lai tiếp diễn</b>: Nhấn mạnh hành động <u>đang diễn ra</u> tại một điểm trong tương lai. — <i>At 8 p.m. tonight, I <u>will be watching</u> a movie.</i></li>
          <li><b>Tương lai đơn</b>: Nói về hành động sẽ xảy ra (có thể bắt đầu hoặc kết thúc tại điểm đó). — <i>The movie <u>will start</u> at 8 p.m.</i></li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng với <i>stative verbs</i> (know, like, want…) ❌.</li>
          <li>Quên động từ "be" sau "will". (❌ <i>I will studying</i>).</li>
          <li>Sử dụng khi không có mốc thời gian cụ thể.</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-1">
          <li>At 10 a.m. tomorrow, I <b>will be attending</b> a meeting. — Vào 10 giờ sáng mai, tôi <b>sẽ đang tham dự</b> một cuộc họp.</li>
          <li>This time next month, we <b>will be flying</b> to Paris. — Giờ này tháng sau, chúng tôi <b>sẽ đang bay</b> đến Paris.</li>
          <li>Don't phone me between 7 and 8. We'<b>ll be having</b> dinner then. — Đừng gọi cho tôi từ 7 đến 8 giờ. Lúc đó chúng tôi <b>sẽ đang ăn tối</b>.</li>
          <li>She <b>won't be working</b> when you arrive. — Cô ấy <b>sẽ không đang làm việc</b> khi bạn đến đâu.</li>
          <li>What <b>will</b> you <b>be doing</b> at midnight tonight? — Bạn <b>sẽ đang làm gì</b> vào nửa đêm nay?</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">A. Điền dạng đúng (will be + V-ing):</p>
          <ol className="list-decimal pl-6">
            <li>At this time tomorrow, I ______ (sit) on a beach.</li>
            <li>When you arrive, I ______ (cook) dinner.</li>
            <li>He ______ (not/sleep) at 11 p.m. tonight.</li>
          </ol>
          <p className="mt-3 font-semibold">B. Viết lại câu phủ định:</p>
          <ol className="list-decimal pl-6">
            <li>They will be traveling in Europe next month. → _______________________</li>
          </ol>
          <p className="mt-3 font-semibold">C. Đặt câu hỏi Yes/No:</p>
          <ol className="list-decimal pl-6">
            <li>She will be studying for her exam tonight. → _______________________?</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}