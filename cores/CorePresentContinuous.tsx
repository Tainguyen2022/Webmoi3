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

const Section: React.FC<{id:string; title:string; emoji?:string; children: React.ReactNode;}> = ({id,title,emoji,children}) => (
  <section id={id} className="scroll-mt-28">
    <h2 className="mt-10 text-2xl md:text-3xl font-extrabold tracking-tight">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-rose-600 to-orange-500">
        {emoji} {title}
      </span>
    </h2>
    <div className="mt-4 space-y-3 text-[15px] leading-7">{children}</div>
  </section>
);

export default function CorePresentContinuous() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          💧 <span className="underline decoration-4 decoration-amber-400">THÌ HIỆN TẠI TIẾP DIỄN</span> — Present Continuous
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả hành động <b>đang diễn ra</b> ngay lúc nói hoặc <b>quanh hiện tại</b>; ngoài ra còn dùng cho <b>kế hoạch đã sắp xếp</b> (near-future arrangements).
        </p>

        {/* CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="AFFIRMATIVE" formula="S + am/is/are + V-ing" colors="from-indigo-500 via-sky-500 to-cyan-500" />
          <FormulaChip label="NEGATIVE"    formula="S + am/is/are + not + V-ing" colors="from-rose-500 via-pink-500 to-fuchsia-600" />
          <FormulaChip label="YES/NO Q."   formula="Am/Is/Are + S + V-ing ?" colors="from-emerald-500 via-lime-500 to-amber-500" />
          <FormulaChip label="WH-QUESTION" formula="Wh + am/is/are + S + V-ing ?" colors="from-teal-500 via-cyan-500 to-blue-500" />
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Chính tả -ing</a></li>
            <li><a className="text-rose-700 hover:underline" href="#signals">Dấu hiệu nhận biết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN-VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <ul className="list-disc pl-6">
          <li>Hành động <b>đang xảy ra</b> ngay lúc nói: <i>She is studying now.</i></li>
          <li>Hành động <b>tạm thời</b> quanh hiện tại: <i>I'm staying with my aunt this week.</i></li>
          <li><b>Kế hoạch đã sắp xếp</b> (near future arrangements): <i>We're meeting the dean tomorrow.</i></li>
          <li>Tình huống <b>thay đổi dần</b>: <i>It is getting colder.</i></li>
        </ul>
      </Section>

      <Section id="form" title="Chính tả với V-ing (rất hay sai)" emoji="✍️">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="rounded-xl p-4 bg-amber-50 border border-amber-200">
            <div className="font-bold text-amber-700">Quy tắc cơ bản</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Động từ + ing</b>: play → <b>playing</b>.</li>
              <li><b>+ing, bỏ -e</b>: make → <b>making</b> (giữ <i>ee</i>: <b>see → seeing</b>, <b>agree → agreeing</b>).</li>
              <li><b>-ie → -ying</b>: die → <b>dying</b>; lie → <b>lying</b>.</li>
              <li><b>CVC gấp đôi phụ âm</b> (âm tiết nhấn/đơn âm): run → <b>running</b>, sit → <b>sitting</b>. Không gấp đôi với <i>w/x/y</i>.</li>
              <li><b>-c → -cking</b>: panic → <b>panicking</b>, picnic → <b>picnicking</b>.</li>
            </ul>
          </div>
          <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
            <div className="font-bold text-indigo-700">Cấu trúc</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Khẳng định:</b> <i>S + am/is/are + V-ing</i>.</li>
              <li><b>Phủ định:</b> <i>S + am/is/are + not + V-ing</i>.</li>
              <li><b>Yes/No:</b> <i>Am/Is/Are + S + V-ing ?</i></li>
              <li><b>Wh-:</b> <i>Wh + am/is/are + S + V-ing ?</i></li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="signals" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p>now, right now, at the moment, currently, today, this morning/afternoon, this week, <i>Look!</i>, <i>Listen!</i>, tomorrow (arrangements)</p>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng với <i>stative verbs</i> (know, like, love, want, believe…) ❌.</li>
          <li>Nhầm với <b>Present Simple</b> khi diễn tả <b>thói quen</b>.</li>
          <li>Quên <b>am/is/are</b> hoặc chia sai chủ ngữ: <i>She are…</i> ❌.</li>
          <li>Viết sai đuôi <b>-ing</b> (quên quy tắc -e, -ie, CVC…).</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN-VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-1">
          <li>She <b>is studying</b> now. — Cô ấy <b>đang học</b> bây giờ.</li>
          <li>We <b>are meeting</b> our supervisor tomorrow. — Chúng tôi <b>gặp</b> giảng viên hướng dẫn vào ngày mai.</li>
          <li>Prices <b>are rising</b> quickly. — Giá cả <b>đang tăng</b> nhanh.</li>
          <li>He <b>is not working</b> today. — Hôm nay anh ấy <b>không làm việc</b>.</li>
          <li><b>Are</b> you <b>listening</b>? — Bạn <b>đang nghe</b> chứ?</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">A. Điền dạng đúng của động từ:</p>
          <ol className="list-decimal pl-6">
            <li>He ______ (write) an email now.</li>
            <li>They ______ (prepare) for the test this week.</li>
            <li>I ______ (meet) Lan tomorrow.</li>
          </ol>
          <p className="mt-3 font-semibold">B. Viết lại câu phủ định:</p>
          <ol className="list-decimal pl-6">
            <li>She is studying in the library. → _______________________</li>
            <li>They are working today. → _______________________</li>
          </ol>
          <p className="mt-3 font-semibold">C. Đặt câu hỏi Yes/No:</p>
          <ol className="list-decimal pl-6">
            <li>You are waiting for the bus. → _______________________?</li>
            <li>He is playing the guitar. → _______________________?</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}