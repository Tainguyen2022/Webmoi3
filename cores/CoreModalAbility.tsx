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

export default function CoreModalAbility() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        💪 <span className="underline decoration-4 decoration-amber-400">MODALS: KHẢ NĂNG & SỰ CHO PHÉP</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng <b>can, could, be able to</b> để nói về khả năng (ability) và <b>can, could, may</b> để xin phép/cho phép (permission).
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Khả năng Hiện tại" formula="S + can + V(bare)" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Khả năng Quá khứ" formula="S + could/was able to + V(bare)" colors="from-indigo-500 via-purple-500 to-pink-500"/>
          <FormulaChip label="Khả năng Tương lai" formula="S + will be able to + V(bare)" colors="from-rose-500 via-red-500 to-orange-500"/>
           <FormulaChip label="Xin phép" formula="Can/Could/May + I + V(bare)?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#ability">Diễn tả Khả năng (Ability)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#permission">Diễn tả Sự cho phép (Permission)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">So sánh 'can', 'could', 'be able to'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="ability" title="Diễn tả Khả năng (Ability)" emoji="🏃">
        <p>
            Chúng ta dùng <b>can, could, be able to</b> để nói về việc ai đó có khả năng làm gì.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li><b>Hiện tại:</b> Dùng <b>can</b> hoặc <b>am/is/are able to</b>. 'Can' phổ biến hơn.
            <br/><i>e.g., She <b>can</b> speak French. / She <b>is able to</b> speak French.</i>
          </li>
          <li><b>Quá khứ (Năng lực chung):</b> Dùng <b>could</b>.
            <br/><i>e.g., When I was a child, I <b>could</b> climb trees.</i> (chỉ khả năng chung chung trong quá khứ)
          </li>
          <li><b>Quá khứ (Thành tựu cụ thể):</b> Dùng <b>was/were able to</b> hoặc <b>managed to</b>. 
            <br/><i>e.g., Despite the fire, they <b>were able to</b> escape.</i> (Họ đã xoay xở và thoát ra được trong một tình huống cụ thể).
            <br/><span className="text-red-600">Lưu ý: Không dùng 'could' trong trường hợp này.</span>
          </li>
          <li><b>Tương lai & Các thì khác:</b> Dùng <b>be able to</b> vì 'can' không có dạng tương lai hay hoàn thành.
             <br/><i>e.g., I <b>will be able to</b> see you tomorrow.</i> (Tương lai)
             <br/><i>e.g., She <b>hasn't been able to</b> finish the report yet.</i> (Hiện tại hoàn thành)
          </li>
        </ul>
      </Section>

      <Section id="permission" title="Diễn tả Sự cho phép (Permission)" emoji="✅">
        <p>Chúng ta dùng <b>can, could, may</b> để xin phép và cho phép.</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
            <li><b>Xin phép (Asking):</b>
                <ul className="list-circle pl-5">
                    <li><b>Can I...?</b> (Thân mật) - <i>e.g., <b>Can I</b> borrow your pen?</i></li>
                    <li><b>Could I...?</b> (Lịch sự hơn) - <i>e.g., <b>Could I</b> ask a question?</i></li>
                    <li><b>May I...?</b> (Rất trang trọng) - <i>e.g., <b>May I</b> have your attention, please?</i></li>
                </ul>
            </li>
             <li><b>Cho phép (Giving):</b>
                <ul className="list-circle pl-5">
                    <li><b>You can...</b> - <i>e.g., Yes, you <b>can</b> borrow my pen.</i></li>
                    <li><b>You may...</b> (Trang trọng) - <i>e.g., You <b>may</b> begin the exam now.</i></li>
                </ul>
            </li>
            <li><b>Từ chối (Refusing):</b>
                <ul className="list-circle pl-5">
                     <li><b>You can't... / You cannot...</b> - <i>e.g., I'm sorry, you <b>can't</b> park here.</i></li>
                     <li><b>You may not...</b> (Trang trọng) - <i>e.g., Students <b>may not</b> use calculators during the test.</i></li>
                </ul>
            </li>
        </ul>
      </Section>
      
      <Section id="comparison" title="So sánh 'can', 'could', 'be able to'" emoji="⚖️">
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 mt-2">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">Trường hợp</th>
                        <th className="border p-2 text-left">Can</th>
                         <th className="border p-2 text-left">Could</th>
                        <th className="border p-2 text-left">Be able to</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td className="border p-2">Khả năng Hiện tại</td><td className="border p-2 text-green-600 font-bold">✓ (Phổ biến)</td><td className="border p-2 text-red-600 font-bold">✗</td><td className="border p-2 text-green-600">✓ (Ít phổ biến)</td></tr>
                    <tr className="bg-gray-50"><td className="border p-2">Khả năng chung QK</td><td className="border p-2 text-red-600 font-bold">✗</td><td className="border p-2 text-green-600 font-bold">✓</td><td className="border p-2 text-green-600">✓</td></tr>
                    <tr><td className="border p-2">Thành tựu cụ thể QK</td><td className="border p-2 text-red-600 font-bold">✗</td><td className="border p-2 text-red-600 font-bold">✗ (Trừ phủ định)</td><td className="border p-2 text-green-600 font-bold">✓</td></tr>
                     <tr className="bg-gray-50"><td className="border p-2">Khả năng Tương lai</td><td className="border p-2 text-red-600 font-bold">✗</td><td className="border p-2 text-red-600 font-bold">✗</td><td className="border p-2 text-green-600 font-bold">✓ (will be able to)</td></tr>
                     <tr><td className="border p-2">Các thì khác (HTHT,...)</td><td className="border p-2 text-red-600 font-bold">✗</td><td className="border p-2 text-red-600 font-bold">✗</td><td className="border p-2 text-green-600 font-bold">✓</td></tr>
                </tbody>
            </table>
        </div>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng "to" sau "can" hoặc "could". (❌ <i className="line-through">I can to swim.</i>)</li>
          <li>Dùng "could" để nói về một hành động cụ thể đã thành công trong quá khứ. (❌ <i className="line-through">I was locked out, but I could open the door with a credit card.</i> → ... I <b>was able to open</b>...)</li>
          <li>Dùng "can" với các thì phức tạp. (❌ <i className="line-through">I have can do it.</i>)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>I can't hear you. Can you speak louder?</b> — Tôi không thể nghe bạn. Bạn có thể nói lớn hơn không?</li>
          <li><b>He could play the piano when he was five.</b> — Anh ấy có thể chơi piano khi mới năm tuổi.</li>
          <li><b>The road was blocked, but we were able to find another route.</b> — Con đường bị chặn, nhưng chúng tôi đã có thể tìm được một lộ trình khác.</li>
          <li><b>Could I possibly leave a bit early today?</b> — Liệu hôm nay tôi có thể về sớm một chút được không ạ?</li>
          <li><b>You won't be able to use your phone during the flight.</b> — Bạn sẽ không thể sử dụng điện thoại trong suốt chuyến bay.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chọn đáp án đúng:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>I'm busy now, but I ______ help you tomorrow. (can / will be able to)</li>
            <li>She's amazing. She ______ speak five languages. (can / is able to)</li>
            <li>The test was hard, but I ______ answer all the questions. (could / was able to)</li>
            <li>When she was a student, she ______ live on very little money. (could / was able to)</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}