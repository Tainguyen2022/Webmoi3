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

export default function CoreWishPresent() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🤞 <span className="underline decoration-4 decoration-amber-400">CÂU ƯỚC Ở HIỆN TẠI</span> — <i>Wish (present)</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả một mong ước về một điều gì đó <b>không có thật, trái với thực tế ở hiện tại</b>.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Động từ thường" formula="S + wish(es) + S + V2/V-ed" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Động từ 'to be'" formula="S + wish(es) + S + were..." colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Nhấn mạnh (If only)" formula="If only + S + V2/V-ed" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & "Were"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với "Hope"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <p>
            Câu ước ở hiện tại được dùng để bày tỏ sự tiếc nuối hoặc mong muốn một tình huống ở hiện tại khác đi. Về bản chất, nó nói về một điều không có thật.
        </p>
        <ul className="list-disc pl-6">
          <li><b>Ước một điều trái với sự thật:</b> <i>I wish I had a car.</i> (Sự thật: I don't have a car now.)</li>
          <li><b>Bày tỏ sự tiếc nuối:</b> <i>He wishes he were taller.</i> (Sự thật: He is not taller.)</li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & 'Were'" emoji="🧩">
        <p>Mệnh đề theo sau "wish" luôn được lùi về một thì. Đối với ước muốn ở hiện tại, chúng ta dùng thì <b>Quá khứ đơn (Past Simple)</b>.</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">S1 + wish(es) + S2 + V2/V-ed</p>
            <p className="font-mono mt-2">S1 + wish(es) + S2 + were + (Adj/N)</p>
        </div>
        <p className="mt-2 font-semibold">Lưu ý đặc biệt với động từ "to be":</p>
        <ul className="list-disc pl-6">
            <li>Tương tự câu điều kiện loại 2, trong văn viết trang trọng, ta dùng <b>were</b> cho tất cả các chủ ngữ.
                <br/><i>e.g., I wish he <b>were</b> here.</i> (Ước gì anh ấy ở đây.)
            </li>
        </ul>
      </Section>

      <Section id="contrast" title="So sánh với &quot;Hope&quot;" emoji="⚖️">
        <p>Sự khác biệt cơ bản giữa "wish" và "hope" nằm ở tính khả thi của sự việc.</p>
        <ul className="list-disc pl-6">
            <li><b>Wish (trái với hiện tại):</b> Dùng cho điều không có thật.
                <br/><i>I wish I <b>knew</b> the answer.</i> (Thực tế là tôi không biết.)
            </li>
            <li><b>Hope (có thể xảy ra):</b> Dùng cho điều có khả năng xảy ra trong tương lai.
                <br/><i>I hope I <b>know</b> the answer for the test tomorrow.</i> (Việc này có thể xảy ra.)
            </li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng thì hiện tại đơn sau "wish". (❌ <i className="line-through">I wish I have more money.</i>)</li>
          <li>Sử dụng "was" thay vì "were" trong các ngữ cảnh trang trọng.</li>
          <li>Nhầm lẫn với "hope" khi nói về một khả năng trong tương lai.</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>I wish I could play the guitar.</b> — Ước gì tôi có thể chơi guitar. (Sự thật: I can't play the guitar).</li>
          <li><b>She wishes she didn't have to work today.</b> — Cô ấy ước cô ấy không phải làm việc hôm nay. (Sự thật: She has to work).</li>
          <li><b>They wish it weren't so cold.</b> — Họ ước trời không lạnh như vậy. (Sự thật: It is very cold).</li>
          <li><b>If only we knew what to do!</b> — Giá như chúng ta biết phải làm gì!</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết lại câu sử dụng cấu trúc "wish":</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>I can't swim.
            <br/>→ I wish ____________________________________________</li>
            <li>He is not very tall.
            <br/>→ He wishes ____________________________________________</li>
            <li>We live in the city, but we don't like it.
            <br/>→ We wish we ____________________________________________ in the city.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
