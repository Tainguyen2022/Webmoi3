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

export default function CoreVerbInversion() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔄 <span className="underline decoration-4 decoration-amber-400">ĐẢO NGỮ (NHẤN MẠNH)</span> — <i>Inversion</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là một cấu trúc ngữ pháp nâng cao, trong đó trợ động từ được đảo lên trước chủ ngữ để nhấn mạnh một trạng từ phủ định hoặc giới hạn ở đầu câu.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cấu trúc Đảo ngữ" formula="Negative Adv + Aux + S + V" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Ví dụ" formula="Never have I seen..." colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Với V thường" formula="Rarely did he say..." colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#purpose">Mục đích & Cách dùng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#rule">Quy tắc Đảo ngữ (Quan trọng!)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#adverbs">Các Cụm từ gây Đảo ngữ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="purpose" title="Mục đích & Cách dùng" emoji="🎯">
        <p>
            Đảo ngữ được sử dụng để nhấn mạnh hoặc tạo hiệu ứng tu từ, làm cho câu văn trở nên trang trọng, kịch tính hơn. Nó phổ biến trong văn viết học thuật, văn chương và các bài phát biểu trang trọng, nhưng ít dùng trong giao tiếp hàng ngày.
        </p>
      </Section>
      
      <Section id="rule" title="Quy tắc Đảo ngữ (Quan trọng!)" emoji="🔑">
        <p>
            Khi một trạng từ hoặc cụm trạng từ mang nghĩa <b>phủ định</b> hoặc <b>giới hạn</b> được chuyển lên đầu câu, trật tự của chủ ngữ (S) và trợ động từ (Aux) phải được đảo ngược, giống như trong câu hỏi.
        </p>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Cấu trúc: Negative Adverbial + Auxiliary + Subject + Main Verb...</p>
        </div>
        <p className="mt-2">Nếu câu gốc không có trợ động từ (thì hiện tại đơn/quá khứ đơn), ta phải mượn trợ động từ <b>do/does/did</b>.</p>
         <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p>Câu gốc: <i>I have <b>never</b> seen such a beautiful sight.</i></p>
            <p>Câu đảo ngữ: <i><b>Never</b> have I seen such a beautiful sight.</i></p>
             <hr className="my-2"/>
            <p>Câu gốc: <i>She <b>rarely</b> complains about anything.</i></p>
            <p>Câu đảo ngữ: <i><b>Rarely</b> does she complain about anything.</i></p>
        </div>
      </Section>
      
      <Section id="adverbs" title="Các Cụm từ gây Đảo ngữ" emoji="📚">
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Never, Rarely, Seldom, Little, Nowhere:</b>
                <br/><i>e.g., <b>Rarely do we</b> see such talent.</i>
            </li>
            <li><b>Not only ... but also ...:</b> Đảo ngữ ở vế đầu tiên.
                <br/><i>e.g., <b>Not only did he</b> arrive late, but he also forgot his ticket.</i>
            </li>
            <li><b>No sooner ... than ...:</b> (Vừa mới ... thì ...)
                 <br/><i>e.g., <b>No sooner had I</b> sat down <b>than</b> the phone rang.</i>
            </li>
            <li><b>Hardly / Scarcely / Barely ... when ...:</b> (Vừa mới ... thì ...)
                 <br/><i>e.g., <b>Hardly had the movie</b> started <b>when</b> the power went out.</i>
            </li>
            <li><b>Only ... (Only then, Only after, Only when, etc.):</b> Đảo ngữ ở mệnh đề chính.
                 <br/><i>e.g., <b>Only after finishing his homework was he</b> allowed to play.</i>
            </li>
            <li><b>Under no circumstances / In no way / On no account:</b>
                 <br/><i>e.g., <b>Under no circumstances should you</b> touch that button.</i>
            </li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Quên đảo ngữ:</b> Đưa trạng từ phủ định lên đầu nhưng giữ nguyên trật tự S + V. (❌ <i className="line-through">Never I have seen...</i>)</li>
          <li><b>Đảo ngữ sai:</b> Đưa cả động từ chính lên trước chủ ngữ. (❌ <i className="line-through">Rarely see we...</i> → ✅ Rarely <b>do we see</b>...)</li>
          <li><b>Đảo ngữ sai vế:</b> Với "Not only" và "Only after...", chỉ đảo ngữ ở một vế nhất định.</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Little did he know about the danger he was in.</b> — Anh ta biết rất ít về sự nguy hiểm mà mình đang gặp phải.</li>
          <li><b>Not until I saw the results did I believe it was possible.</b> — Mãi cho đến khi tôi thấy kết quả, tôi mới tin rằng điều đó là có thể.</li>
          <li><b>On no account are employees allowed to share confidential information.</b> — Trong bất kỳ trường hợp nào, nhân viên cũng không được phép chia sẻ thông tin bí mật.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết lại các câu sau bằng cách dùng đảo ngữ với từ cho sẵn:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>He had hardly started his speech when the power went out.
            <br/>→ Hardly ____________________________________________.</li>
            <li>She not only sings well, but she also plays the piano.
            <br/>→ Not only _________________________________________.</li>
            <li>I have seldom seen a more beautiful sunset.
            <br/>→ Seldom _________________________________________.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}