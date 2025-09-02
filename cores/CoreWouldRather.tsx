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

export default function CoreWouldRather() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        👍 <span className="underline decoration-4 decoration-amber-400">WOULD RATHER / SOONER</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả sự ưu tiên hoặc mong muốn (preference), rằng một người muốn một điều gì đó xảy ra hoặc một người khác làm một điều gì đó.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cùng chủ ngữ" formula="S + would rather + V(bare)" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Khác CN (HT/TL)" formula="S1 + would rather + S2 + V2/Ved" colors="from-indigo-500 via-purple-500 to-pink-500"/>
          <FormulaChip label="Khác CN (Quá khứ)" formula="S1 + would rather + S2 + had + V3" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Mục đích & Cách dùng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#same-subject">Trường hợp CÙNG Chủ ngữ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#diff-subject-present">Trường hợp KHÁC Chủ ngữ (Hiện tại/Tương lai)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#diff-subject-past">Trường hợp KHÁC Chủ ngữ (Quá khứ)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Mục đích & Cách dùng" emoji="🎯">
        <p>
            <b>"Would rather"</b> và <b>"Would sooner"</b> (trang trọng hơn) được dùng để diễn tả sự lựa chọn ưu tiên. Cấu trúc của chúng thay đổi tùy thuộc vào việc có một hay hai chủ ngữ trong câu và thời điểm của sự việc.
        </p>
      </Section>

      <Section id="same-subject" title="Trường hợp CÙNG Chủ ngữ" emoji="🙋">
        <p>Đây là trường hợp đơn giản và phổ biến nhất, khi người nói diễn tả mong muốn của chính mình.</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">S + would rather + (not) + V(nguyên mẫu)</p>
            <p className="font-mono mt-2">S + would rather + V1(nguyên mẫu) + than + V2(nguyên mẫu)</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>I <b>would rather stay</b> home tonight.</i> (Tôi thà ở nhà tối nay.)</li>
            <li><i>She <b>would rather not talk</b> about it.</i> (Cô ấy thà không nói về chuyện đó.)</li>
            <li><i>They <b>would rather go</b> to the cinema <b>than stay</b> at home.</i> (Họ thà đi xem phim hơn là ở nhà.)</li>
        </ul>
      </Section>

      <Section id="diff-subject-present" title="KHÁC Chủ ngữ (Hiện tại / Tương lai)" emoji="👉👤">
        <p>Khi người nói (S1) muốn người khác (S2) làm gì đó ở hiện tại hoặc tương lai, ta dùng thì <b>Quá khứ Đơn (Past Simple)</b> trong mệnh đề sau.</p>
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Công thức:</p>
            <p className="font-mono mt-2">S1 + would rather + S2 + V2/V-ed</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>I <b>would rather you went</b> home now.</i> (Tôi muốn bạn về nhà bây giờ hơn.)</li>
            <li><i>She <b>would rather he didn't call</b> her after 10 p.m.</i> (Cô ấy muốn anh ta không gọi cho cô ấy sau 10 giờ tối.)</li>
        </ul>
      </Section>
      
      {/* Fix: Corrected broken emoji */}
      <Section id="diff-subject-past" title="KHÁC Chủ ngữ (Quá khứ)" emoji="🕰️">
        <p>Khi người nói (S1) hối tiếc về một việc người khác (S2) đã làm trong quá khứ, ta dùng thì <b>Quá khứ Hoàn thành (Past Perfect)</b>.</p>
        <div className="rounded-xl p-4 bg-red-50 border border-red-200">
            <p className="font-bold text-red-700">Công thức:</p>
            <p className="font-mono mt-2">S1 + would rather + S2 + had + V3/V-ed</p>
        </div>
         <ul className="list-disc pl-6 mt-2">
            <li><i>I <b>would rather you had told</b> me the truth yesterday.</i> (Tôi thà rằng hôm qua bạn đã nói cho tôi sự thật.)</li>
            <li><i>He <b>would rather she hadn't mentioned</b> his name.</i> (Anh ấy thà rằng cô ấy đã không đề cập đến tên anh ấy.)</li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng "to" sau "would rather" khi cùng chủ ngữ. (❌ <i className="line-through">I would rather to go.</i>)</li>
          <li>Dùng thì hiện tại thay vì quá khứ đơn khi có hai chủ ngữ. (❌ <i className="line-through">I'd rather you go now.</i>)</li>
          <li>Quên cấu trúc quá khứ hoàn thành khi nói về một sự việc trong quá khứ.</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>I'd rather not go out tonight.</b> — Tôi thà không ra ngoài tối nay.</li>
          <li><b>Would you rather have tea or coffee?</b> — Bạn muốn uống trà hay cà phê hơn?</li>
          <li><b>My parents would rather I studied medicine.</b> — Bố mẹ tôi muốn tôi học ngành y hơn.</li>
          <li><b>I'd rather you hadn't come to the party last night.</b> — Tôi thà rằng bạn đã không đến bữa tiệc tối qua.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền dạng đúng của động từ trong ngoặc:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>I would rather (stay) ______ home than go out in the rain.</li>
            <li>She would rather you (call) ______ her tomorrow.</li>
            <li>We would rather they (not make) ____________ so much noise last night.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}