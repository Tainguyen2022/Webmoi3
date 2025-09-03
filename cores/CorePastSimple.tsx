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

export default function CorePastSimple(){
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          🕰️ <span className="underline decoration-4 decoration-amber-400">THÌ QUÁ KHỨ ĐƠN</span> — Past Simple
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả một hành động <b>đã bắt đầu và kết thúc</b> hoàn toàn trong quá khứ, thường có thời gian xác định.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="AFFIRMATIVE (V THƯỜNG)" formula="S + V2/V-ed" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="NEGATIVE (V THƯỜNG)" formula="S + did not + V(bare)" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="YES/NO QUESTION" formula="Did + S + V(bare) ?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="AFFIRMATIVE (TO BE)" formula="S + was/were + N/Adj" colors="from-purple-500 via-violet-500 to-indigo-600"/>
          <FormulaChip label="NEGATIVE (TO BE)" formula="S + was/were + not" colors="from-orange-500 via-amber-500 to-yellow-500"/>
          <FormulaChip label="WH-QUESTION" formula="Wh + did + S + V(bare) ?" colors="from-teal-500 via-cyan-500 to-blue-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Chính tả -ed</a></li>
            <li><a className="text-rose-700 hover:underline" href="#neg">Phủ định & Câu hỏi</a></li>
            <li><a className="text-rose-700 hover:underline" href="#signals">Dấu hiệu nhận biết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <ul className="list-disc pl-6">
          <li><b>Hành động đã kết thúc trong quá khứ:</b> <i>I <u>visited</u> Paris last year.</i></li>
          <li><b>Chuỗi hành động xảy ra liên tiếp:</b> <i>He <u>came</u> in, <u>took</u> off his coat, and <u>sat</u> down.</i></li>
          <li><b>Thói quen trong quá khứ (thường với "used to"):</b> <i>She <u>played</u> the piano when she was a child.</i></li>
          <li><b>Câu chuyện kể:</b> <i>Once upon a time, there <u>lived</u> a king...</i></li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Chính tả -ed" emoji="🧩">
        <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
          <div className="font-bold text-indigo-700 uppercase text-sm mb-1">Động từ thường</div>
          <p><b>Khẳng định:</b> <i>S + V2/V-ed</i>. (V2 là cột 2 Bảng Động từ Bất quy tắc).</p>
          <div className="font-bold text-indigo-700 uppercase text-sm mt-2 mb-1">Động từ "to be"</div>
          <p><i>S + was/were</i>. (I/He/She/It + <b>was</b>; You/We/They + <b>were</b>).</p>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="rounded-xl p-4 bg-amber-50 border border-amber-200">
            <div className="font-bold text-amber-700">Quy tắc thêm <u>-ed</u></div>
            <ul className="list-disc pl-5 mt-1">
              <li>+<b>ed</b>: watch → watched</li>
              <li>Tận cùng -e, +<b>d</b>: like → liked</li>
              <li>Phụ âm + y → <b>ied</b>: study → studied</li>
              <li>CVC (1 âm tiết): <b>gấp đôi</b> phụ âm + ed: stop → stopped</li>
            </ul>
          </div>
          <div className="rounded-xl p-4 bg-emerald-50 border border-emerald-200">
            <div className="font-bold text-emerald-700">Phát âm đuôi -ed</div>
            <ul className="list-disc pl-5 mt-1">
              <li>/t/ sau /p, k, f, s, ʃ, tʃ/: stopped, looked</li>
              <li>/d/ sau nguyên âm & phụ âm hữu thanh: played, lived</li>
              <li>/ɪd/ sau /t, d/: wanted, needed</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="neg" title="Phủ định & Câu hỏi" emoji="❓">
        <div className="rounded-xl p-4 bg-rose-50 border border-rose-200">
            <div className="font-bold text-rose-700">Động từ thường</div>
            <p><b>Phủ định:</b> <i>S + did not (didn't) + V(bare)</i>.</p>
            <p><b>Yes/No:</b> <i>Did + S + V(bare)?</i></p>
            <p><b>Short answers:</b> Yes, I <b>did</b>. / No, I <b>didn’t</b>.</p>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          <b className="uppercase">Lưu ý:</b> Khi đã dùng trợ động từ <b>did</b> hoặc <b>didn't</b>, động từ chính luôn ở dạng <b>nguyên mẫu không "to" (V-bare)</b>.
        </p>
      </Section>
      
      <Section id="signals" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p><b>yesterday</b>, <b>last night/week/month/year</b>, <b>... ago</b> (e.g., <i>two days ago</i>), <b>in + [năm quá khứ]</b> (e.g., <i>in 1990</i>), <b>when I was a child</b>.</p>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng <b>V-ed</b> trong câu phủ định/nghi vấn có <b>did</b>. (❌ <i>I didn't went</i>).</li>
          <li>Chia sai động từ bất quy tắc (dùng V3 thay vì V2).</li>
          <li>Nhầm lẫn giữa <b>was</b> và <b>were</b>.</li>
          <li>Thêm -ed vào động từ bất quy tắc. (❌ <i>I buyed a car</i>).</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-1">
          <li>I <b>watched</b> a movie yesterday. — Tôi <b>đã xem</b> một bộ phim ngày hôm qua.</li>
          <li>She <b>went</b> to the supermarket last night. — Cô ấy <b>đã đi</b> siêu thị tối qua.</li>
          <li>They <b>didn't finish</b> their homework. — Họ <b>đã không làm xong</b> bài tập về nhà.</li>
          <li><b>Did</b> you <b>see</b> the match on TV? — Bạn <b>có xem</b> trận đấu trên TV không?</li>
          <li>He <b>was</b> a doctor. — Ông ấy <b>từng là</b> một bác sĩ.</li>
          <li>We <b>were</b> very busy last week. — Chúng tôi <b>rất bận</b> vào tuần trước.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">A. Điền dạng đúng của động từ trong ngoặc:</p>
          <ol className="list-decimal pl-6">
            <li>My sister ______ (get) married last year.</li>
            <li>He ______ (not/come) to the party.</li>
            <li>What time ______ you ______ (go) to bed last night?</li>
          </ol>
          <p className="mt-3 font-semibold">B. Viết lại câu phủ định:</p>
          <ol className="list-decimal pl-6">
            <li>They visited their grandparents. → _______________________</li>
          </ol>
          <p className="mt-3 font-semibold">C. Đặt câu hỏi Yes/No:</p>
          <ol className="list-decimal pl-6">
            <li>She bought a new dress. → _______________________?</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}