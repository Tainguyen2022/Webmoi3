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

export default function CoreModalPossibility() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🎲 <span className="underline decoration-4 decoration-amber-400">MODALS: KHẢ NĂNG & XÁC SUẤT</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng <b>may, might, could, can</b> để diễn tả mức độ chắc chắn về một sự việc có thể xảy ra.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="HT/TL (50%)" formula="S + may/could + V" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="HT/TL (<30%)" formula="S + might + V" colors="from-indigo-500 via-purple-500 to-pink-500"/>
          <FormulaChip label="Quá khứ" formula="S + may/might/could + have + V3" colors="from-rose-500 via-red-500 to-orange-500"/>
           <FormulaChip label="Khả năng chung" formula="S + can + V" colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Mức độ chắc chắn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#present-future">Khả năng ở Hiện tại & Tương lai</a></li>
            <li><a className="text-rose-700 hover:underline" href="#past">Khả năng trong Quá khứ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#can">"Can" cho Khả năng chung</a></li>
             <li><a className="text-rose-700 hover:underline" href="#negation">Phủ định</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Mức độ chắc chắn" emoji="🎯">
        <p>Các modal verbs này thể hiện mức độ chắc chắn khác nhau của người nói về một sự việc.</p>
        <ul className="list-disc pl-6">
            <li><b>may / could:</b> Khá chắc chắn (khoảng 50%). Đây là hai lựa chọn phổ biến.</li>
            <li><b>might:</b> Ít chắc chắn hơn (khoảng 30% hoặc thấp hơn).</li>
            <li><b>can:</b> Dùng cho khả năng mang tính lý thuyết, chung chung, không phải dự đoán cụ thể.</li>
        </ul>
      </Section>

      <Section id="present-future" title="Khả năng ở Hiện tại & Tương lai" emoji="⏰">
        <p>Dùng <b>may, might, could</b> + V(nguyên mẫu) để nói về điều có thể đúng ở hiện tại hoặc có thể xảy ra trong tương lai.</p>
        <ul className="list-disc pl-6 mt-2">
          <li><i>Where is John? - I'm not sure. He <b>may be</b> in his office.</i> (Có lẽ anh ấy đang ở trong văn phòng).</li>
          <li><i>Take an umbrella with you. It <b>might rain</b> later.</i> (Trời có thể mưa sau đó - không chắc lắm).</li>
          <li><i>This <b>could be</b> the best decision of your life.</i> (Đây có thể là quyết định tuyệt nhất đời bạn).</li>
        </ul>
      </Section>

      <Section id="past" title="Khả năng trong Quá khứ" emoji="🕰️">
        <p>Để suy đoán về một khả năng trong quá khứ, ta dùng cấu trúc modal hoàn thành.</p>
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Công thức:</p>
            <p className="font-mono mt-2">S + may/might/could + have + V3</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>She is late. She <b>might have missed</b> the bus.</i> (Cô ấy có lẽ đã lỡ chuyến xe buýt).</li>
            <li><i>I can't find my keys. I <b>could have left</b> them in the car.</i> (Tôi có thể đã để quên chúng trong xe).</li>
            <li><i>He looks happy. He <b>may have heard</b> some good news.</i> (Anh ấy có lẽ đã nghe được tin tốt).</li>
        </ul>
      </Section>
      
      <Section id="can" title="'Can' cho Khả năng chung" emoji="🌍">
        <p><b>Can</b> không dùng để dự đoán một sự việc cụ thể mà dùng để nói về một khả năng có thật, một điều có thể xảy ra về mặt lý thuyết.</p>
        <ul className="list-disc pl-6">
            <li><i>Driving in this city <b>can be</b> stressful.</i> (Việc lái xe ở thành phố này có thể rất căng thẳng - một sự thật chung).</li>
            <li><i>Compare: It <b>might be</b> stressful to drive today because of the rain.</i> (Một dự đoán cho hôm nay).</li>
        </ul>
      </Section>

      <Section id="negation" title="Phủ định: may not / might not" emoji="🚫">
        <p>Dùng <b>may not</b> hoặc <b>might not</b> (mightn't) để nói về một điều có thể sẽ không xảy ra.</p>
         <ul className="list-disc pl-6">
            <li><i>He <b>may not come</b> to the party. He said he was busy.</i> (Có lẽ anh ấy sẽ không đến).</li>
            <li><i>Don't worry, the situation <b>might not be</b> as bad as you think.</i> (Tình hình có lẽ không tệ như bạn nghĩ đâu).</li>
        </ul>
        <p className="mt-2 text-sm text-red-700 bg-red-50 p-2 rounded-lg border border-red-200">
            <b>Lưu ý:</b> <b>"Cannot" (can't)</b> thường dùng cho suy luận chắc chắn rằng điều gì đó là không thể, chứ không phải là một khả năng.
            <br/><i>e.g., That <b>can't</b> be true!</i> (Điều đó không thể nào là sự thật được!)
        </p>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng "can" để dự đoán sự việc cụ thể. (❌ <i className="line-through">It can rain tomorrow.</i> → `It may/might rain...`)</li>
          <li>Nhầm lẫn giữa "maybe" (trạng từ) và "may be" (modal verb).
             <br/><i>e.g., <b>Maybe</b> he is sick. = He <b>may be</b> sick.</i>
          </li>
          <li>Quên "have" trong cấu trúc quá khứ. (❌ <i className="line-through">He might missed the train.</i>)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>The new policy could have a significant impact on the economy.</b> — Chính sách mới có thể có tác động đáng kể đến nền kinh tế.</li>
          <li><b>She wasn't at the meeting. She might have forgotten about it.</b> — Cô ấy không có ở cuộc họp. Cô ấy có lẽ đã quên mất nó.</li>
          <li><b>Don't eat that mushroom. It can be poisonous.</b> — Đừng ăn cây nấm đó. Nó có thể có độc đấy. (khả năng chung)</li>
          <li><b>I may not have time to finish everything today.</b> — Tôi có lẽ sẽ không có thời gian để hoàn thành mọi thứ hôm nay.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền modal verb phù hợp (may, might, could, can):</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>Be careful. The floor is wet, and you ______ slip.</li>
            <li>I don't know where she is. She ______ have gone to the library.</li>
            <li>Winters in Canada ______ be extremely cold.</li>
            <li>He ______ not pass the exam. He didn't study much.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}