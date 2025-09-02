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

export default function CoreReportedImperatives() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        📣 <span className="underline decoration-4 decoration-amber-400">TƯỜNG THUẬT CÂU MỆNH LỆNH</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Tường thuật lại một mệnh lệnh, yêu cầu, lời khuyên, cảnh báo,... bằng cách sử dụng cấu trúc <b>(not) to + V(nguyên mẫu)</b>.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Mệnh lệnh khẳng định" formula="S + verb + O + to + V(bare)" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Mệnh lệnh phủ định" formula="S + verb + O + not to + V(bare)" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng & Thay đổi chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#structure">Công thức & Cấu trúc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#verbs">Động từ tường thuật phổ biến</a></li>
            <li><a className="text-rose-700 hover:underline" href="#changes">Thay đổi Đại từ & Trạng từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng & Thay đổi chính" emoji="🔑">
        <p>
            Khi tường thuật câu mệnh lệnh, yêu cầu hoặc lời khuyên, chúng ta không dùng mệnh đề "that" và không lùi thì động từ chính. Thay vào đó, chúng ta chuyển động từ chính thành dạng <b>nguyên mẫu có "to" (to-infinitive)</b>.
        </p>
        <ul className="list-disc pl-6">
            <li><b>Mệnh lệnh khẳng định:</b> "Open the door." → <b>to open</b> the door.</li>
            <li><b>Mệnh lệnh phủ định:</b> "Don't touch it." → <b>not to touch</b> it.</li>
        </ul>
      </Section>

      <Section id="structure" title="Công thức & Cấu trúc" emoji="🧩">
        <p>Cấu trúc chung rất đơn giản và nhất quán.</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">S + Động từ Tường thuật + Object + (not) + to + V(nguyên mẫu).</p>
        </div>
        <p className="mt-2 font-semibold">Ví dụ phân tích:</p>
        <ul className="list-disc pl-6">
            <li><b>Direct:</b> The teacher said to the students, "Be quiet."</li>
            <li><b>Reported:</b> The teacher <b>told the students to be quiet</b>.</li>
            <br/>
            <li><b>Direct:</b> "Please don't tell anyone," she said to me.</li>
            <li><b>Reported:</b> She <b>asked me not to tell anyone</b>.</li>
        </ul>
      </Section>

      <Section id="verbs" title="Động từ tường thuật phổ biến" emoji="🗣️">
        <p>Việc lựa chọn động từ tường thuật giúp làm rõ sắc thái của lời nói gốc. Các động từ phổ biến bao gồm:</p>
        <ul className="list-disc pl-6">
            <li><b>tell:</b> yêu cầu, ra lệnh (yêu cầu mạnh) - <i>He told me to wait.</i></li>
            <li><b>ask:</b> yêu cầu, nhờ vả (lịch sự) - <i>She asked him to help her.</i></li>
            <li><b>advise:</b> khuyên bảo - <i>The doctor advised me to rest.</i></li>
            <li><b>warn:</b> cảnh báo - <i>They warned us not to go there.</i></li>
            <li><b>order:</b> ra lệnh (trang trọng, quyền uy) - <i>The officer ordered the soldiers to fire.</i></li>
            <li><b>remind:</b> nhắc nhở - <i>She reminded me to buy milk.</i></li>
            <li><b>invite:</b> mời - <i>He invited me to come to his party.</i></li>
        </ul>
      </Section>
      
      <Section id="changes" title="Thay đổi Đại từ & Trạng từ" emoji="🔄">
        <p>Các đại từ (I, you, my, your...) và các trạng từ chỉ thời gian/nơi chốn (here, now, tomorrow...) vẫn thay đổi theo quy tắc chung của câu tường thuật.</p>
         <ul className="list-disc pl-6">
             <li><b>Direct:</b> "Please bring <b>your</b> book <b>tomorrow</b>," the teacher said to <b>me</b>.</li>
             <li><b>Reported:</b> The teacher asked <b>me</b> to bring <b>my</b> book <b>the next day</b>.</li>
         </ul>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Direct:</b> "Don't be late for the meeting," my boss said.
          <br/><b>Reported:</b> My boss <b>told me not to be late</b> for the meeting.
          </li>
          <li><b>Direct:</b> "You should exercise regularly," the doctor said.
          <br/><b>Reported:</b> The doctor <b>advised me to exercise</b> regularly.
          </li>
          <li><b>Direct:</b> "Remember to lock the door," my mom said.
          <br/><b>Reported:</b> My mom <b>reminded me to lock</b> the door.
          </li>
           <li><b>Direct:</b> "Stop making noise!" she said to the children.
          <br/><b>Reported:</b> She <b>ordered the children to stop</b> making noise.
          </li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chuyển các câu trực tiếp sau sang câu gián tiếp, dùng động từ gợi ý:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The teacher said to us: "Submit your assignments on Monday." (tell)
            <br/>→ The teacher ____________________________________________</li>
            <li>"Please don't make a mess," my mother said to me. (ask)
            <br/>→ My mother ____________________________________________</li>
            <li>"You should see a dentist," my friend said to him. (advise)
            <br/>→ My friend ____________________________________________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
