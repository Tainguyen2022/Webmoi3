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

export default function CoreWishFuture() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🙏 <span className="underline decoration-4 decoration-amber-400">CÂU ƯỚC Ở TƯƠNG LAI</span> — <i>Wish (future)</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả mong muốn một điều gì đó xảy ra hoặc một ai đó thay đổi hành vi trong tương lai, thường mang sắc thái <b>phàn nàn</b>.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Phàn nàn" formula="S + wish(es) + S + would + V(bare)" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Mong muốn" formula="S + wish(es) + S + could + V(bare)" colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Cấu trúc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với "Hope"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <p>
            Câu ước ở tương lai được dùng để bày tỏ mong muốn về một sự thay đổi, thường là khi chúng ta không hài lòng với tình hình hiện tại và muốn nó khác đi trong tương lai.
        </p>
        <ul className="list-disc pl-6">
          <li><b>Phàn nàn về một hành động:</b> <i>I wish you would stop making so much noise.</i></li>
          <li><b>Mong muốn một sự việc xảy ra:</b> <i>I wish it would stop raining.</i></li>
          <li><b>Ước về một khả năng trong tương lai:</b> <i>I wish I could attend the party tomorrow.</i></li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Cấu trúc" emoji="🧩">
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Dùng 'would'</p>
            <p className="font-mono mt-2">S1 + wish(es) + S2 + would/wouldn't + V(bare)</p>
            <p className="mt-1">Dùng khi S1 và S2 là hai người/vật khác nhau, để phàn nàn hoặc mong muốn ai đó thay đổi hành vi.</p>
        </div>
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200 mt-3">
            <p className="font-bold text-purple-700">Dùng 'could'</p>
            <p className="font-mono mt-2">S + wish(es) + S + could/couldn't + V(bare)</p>
            <p className="mt-1">Dùng để ước về một khả năng hoặc năng lực có thể làm gì đó trong tương lai (khi S1 và S2 có thể giống nhau).</p>
        </div>
      </Section>

      <Section id="contrast" title="So sánh với &quot;Hope&quot;" emoji="⚖️">
        <ul className="list-disc pl-6">
            <li><b>Wish + would:</b> Thể hiện sự không hài lòng, mong muốn một sự thay đổi, thường là điều khó xảy ra.
                <br/><i>I wish it <b>would be</b> sunny tomorrow.</i> (Tôi chán ngấy thời tiết xấu rồi.)
            </li>
            <li><b>Hope:</b> Thể hiện hy vọng về một điều có khả năng xảy ra, không có sắc thái phàn nàn.
                <br/><i>I hope it <b>is</b> sunny tomorrow / it <b>will be</b> sunny tomorrow.</i>
            </li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng <b>will</b> thay vì <b>would</b>. (❌ <i className="line-through">I wish you will stop.</i>)</li>
          <li>Dùng "S1 + wish + S1 + would..." khi nói về bản thân. (❌ <i className="line-through">I wish I would pass the exam.</i>)
          <br/>→ Đúng: <i>I wish I <b>could</b> pass the exam</i> hoặc <i>I <b>hope</b> I pass the exam.</i></li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>I wish you would be quiet.</b> — Ước gì bạn trật tự đi.</li>
          <li><b>She wishes her children would help with the housework.</b> — Cô ấy ước các con mình sẽ phụ giúp việc nhà.</li>
          <li><b>They wish the rain would stop so they could go out.</b> — Họ ước trời sẽ tạnh mưa để họ có thể ra ngoài.</li>
          <li><b>I wish I could join you on the trip next week.</b> — Ước gì tôi có thể tham gia chuyến đi với bạn vào tuần tới.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết lại câu sử dụng cấu trúc "wish" cho tương lai:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>He is always late. I don't like it.
            <br/>→ I wish he ________________________________ so late.</li>
            <li>I can't come to your party tomorrow. It's a pity.
            <br/>→ I wish I ________________________________ to your party tomorrow.</li>
            <li>The baby is crying. I want him to stop.
            <br/>→ I wish the baby ________________________________ crying.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}