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

export default function CoreArticleZero() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ∅ <span className="underline decoration-4 decoration-amber-400">MẠO TỪ ZERO (KHÔNG DÙNG MẠO TỪ)</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Trong nhiều trường hợp, chúng ta <b>không</b> dùng mạo từ (a, an, the) trước danh từ, đặc biệt khi nói về những khái niệm chung chung hoặc tên riêng.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Danh từ chung chung" formula="∅ + N(plural/uncount)" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Tên riêng" formula="∅ + Proper Nouns" colors="from-emerald-500 via-lime-500 to-amber-500"/>
           <FormulaChip label="Bữa ăn, Thể thao" formula="∅ + breakfast, ∅ + football" colors="from-indigo-500 via-purple-500 to-pink-500"/>
            <FormulaChip label="Địa danh (hầu hết)" formula="∅ + Vietnam, ∅ + Hanoi" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#general">Nói chung chung (Generalizations)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#proper">Tên riêng (Proper Nouns)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#institutions">Các địa điểm công cộng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#common-nouns">Các danh từ chung khác</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="general" title="Nói chung chung (Generalizations)" emoji="🌍">
        <p>
            Không dùng mạo từ khi nói về một danh từ theo nghĩa chung nhất, áp dụng cho tất cả.
        </p>
        <ul className="list-disc pl-6">
            <li><b>Danh từ không đếm được:</b> <i>I love <b>music</b>. / <b>Information</b> is power.</i></li>
            <li><b>Danh từ đếm được số nhiều:</b> <i><b>Cats</b> are independent animals. / She is afraid of <b>spiders</b>.</i></li>
        </ul>
        <p className="mt-2 text-sm text-gray-600 p-2 rounded-lg bg-gray-50 border">
            <b>So sánh:</b><br/>
            - <i>I like <b>dogs</b>.</i> (Nói chung)<br/>
            - <i><b>The dogs</b> in my neighborhood are very noisy.</i> (Những con chó cụ thể ở khu tôi)
        </p>
      </Section>

      <Section id="proper" title="Tên riêng (Proper Nouns)" emoji="👤">
        <p>Không dùng mạo từ trước hầu hết các tên riêng:</p>
        <ul className="list-disc pl-6 space-y-1">
            <li><b>Tên người:</b> <i><b>John Lennon</b> was a musician.</i></li>
            <li><b>Châu lục, quốc gia, thành phố, bang:</b> <i><b>Asia</b>, <b>Vietnam</b>, <b>Paris</b>, <b>California</b></i> (trừ các trường hợp đặc biệt như <b>the</b> USA, <b>the</b> UK).</li>
            <li><b>Đường phố, quảng trường:</b> <i>Wall Street, Ba Dinh Square</i>.</li>
            <li><b>Hồ, núi đơn lẻ:</b> <i>Lake Michigan, Mount Fuji</i>.</li>
        </ul>
      </Section>

      <Section id="institutions" title="Các địa điểm công cộng" emoji="🏫">
        <p>Không dùng mạo từ với các danh từ như <b>school, university, prison, hospital, church, bed, home</b> khi nói về chúng với mục đích chính.</p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>He goes to <b>school</b> every day.</i> (Anh ấy là học sinh)</li>
            <li>So sánh: <i>His mother went to <b>the school</b> to meet his teacher.</i> (Mẹ anh ấy đến trường với mục đích khác - không phải để học).</li>
            <br/>
            <li><i>She is in <b>hospital</b>.</i> (Cô ấy là bệnh nhân)</li>
            <li>So sánh: <i>I visited him in <b>the hospital</b>.</i> (Tôi là khách thăm).</li>
        </ul>
      </Section>
      
      <Section id="common-nouns" title="Các danh từ chung khác" emoji="📌">
         <ul className="list-disc pl-6 space-y-1">
            <li><b>Bữa ăn:</b> <i>What time do you have <b>breakfast</b>?</i></li>
            <li><b>Môn thể thao, trò chơi:</b> <i>They are playing <b>tennis</b>.</i></li>
            <li><b>Ngôn ngữ, môn học:</b> <i>She speaks <b>Japanese</b> fluently. / He is studying <b>History</b>.</i></li>
            <li><b>Phương tiện đi lại (trong cụm từ 'by'):</b> <i>I go to work <b>by bus</b>.</i></li>
             <li><b>Các ngày lễ, tháng, mùa:</b> <i><b>Christmas</b> is in <b>December</b>. / I love <b>summer</b>.</i></li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng 'the' khi nói về một khái niệm chung chung. (❌ <i className="line-through">The life is beautiful.</i> → ✅ <b>Life</b> is beautiful.)</li>
          <li>Dùng 'the' trước tên quốc gia, thành phố không thuộc trường hợp đặc biệt. (❌ <i className="line-through">the Vietnam</i>)</li>
          <li>Dùng 'the' khi nói về bữa ăn hoặc môn thể thao. (❌ <i className="line-through">I play the football.</i>)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Health is more important than money.</b> — Sức khỏe quan trọng hơn tiền bạc.</li>
          <li><b>She was in prison for two years.</b> — Cô ấy đã ở tù hai năm.</li>
          <li><b>We usually have dinner at 7 p.m.</b> — Chúng tôi thường ăn tối lúc 7 giờ.</li>
          <li><b>Creativity is essential for this job.</b> — Sự sáng tạo là thiết yếu cho công việc này.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền 'the' hoặc không điền gì (∅) vào chỗ trống:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>______ children learn very quickly.</li>
            <li>My favorite subject at school was ______ history.</li>
            <li>______ president of ______ United States lives in ______ White House.</li>
            <li>I went to ______ bed late last night.</li>
             <li>Can you pass me ______ salt, please?</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}