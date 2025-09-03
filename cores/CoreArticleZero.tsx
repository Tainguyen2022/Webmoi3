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
        'group relative w-full min-w-0 px-4 py-3 rounded-2xl text-white font-extrabold shadow-lg',
        'transition-[transform,box-shadow] active:scale-95 ring-1 ring-white/20',
        'bg-gradient-to-r', colors,
        // Bố cục 2 dòng, label ở trên, formula ở dưới
        'flex flex-col items-start gap-1 text-left'
      ].join(' ')}
    >
      {/* Chú giải (nhỏ hơn) */}
      <span className="text-sm font-semibold text-white/80 truncate">{label}</span>
      
      {/* Công thức (lớn hơn, kế thừa extrabold) */}
      <span className="truncate">{formula}</span>

      {/* toast nhỏ khi copy */}
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
        🚫 <span className="underline decoration-4 decoration-amber-400">MẠO TỪ ZERO (KHÔNG DÙNG MẠO TỪ)</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Tìm hiểu các trường hợp chúng ta <b>không</b> sử dụng mạo từ (a, an, the) trước danh từ, đặc biệt khi nói về các khái niệm chung chung.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Danh từ chung chung" formula="I like ∅ music." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Danh từ số nhiều" formula="∅ Cats are cute." colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Tên riêng" formula="This is ∅ John." colors="from-rose-500 via-red-500 to-orange-500"/>
           <FormulaChip label="Bữa ăn" formula="We had ∅ breakfast." colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#general">1. Khái niệm chung (General Sense)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#proper-nouns">2. Tên riêng & Danh hiệu</a></li>
            <li><a className="text-rose-700 hover:underline" href="#common-cases">3. Các trường hợp phổ biến khác</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">4. So sánh Zero Article và 'The'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">5. Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">6. Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="general" title="1. Khái niệm chung (General Sense)" emoji="🌍">
        <p>
            Khi nói về một danh từ một cách chung chung, không chỉ một đối tượng cụ thể nào, ta không dùng mạo từ.
        </p>
        <ul className="list-disc pl-6">
            <li><b>Danh từ không đếm được:</b> <i><b>Information</b> is important. / I need <b>advice</b>. / He loves <b>music</b>.</i></li>
            <li><b>Danh từ đếm được số nhiều:</b> <i><b>Cats</b> are independent animals. / She is afraid of <b>spiders</b>.</i></li>
        </ul>
      </Section>
      
      <Section id="proper-nouns" title="2. Tên riêng & Danh hiệu" emoji="👤">
        <p>
            Hầu hết các tên riêng không dùng mạo từ.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><b>Tên người:</b> <i><b>John</b> is my friend.</i></li>
            <li><b>Tên công ty, trường đại học:</b> <i>He works for <b>Microsoft</b>. / She studies at <b>Harvard University</b>.</i></li>
            <li><b>Tên hầu hết các quốc gia, thành phố, châu lục:</b> <i>I live in <b>Vietnam</b>. / They visited <b>Paris</b>.</i> (Xem bài về 'the' để biết các ngoại lệ).</li>
            <li><b>Tên hồ, núi đơn lẻ:</b> <i><b>Lake Superior</b>, <b>Mount Everest</b>.</i></li>
            <li><b>Danh hiệu + Tên riêng:</b> <i><b>President Lincoln</b>, <b>Queen Elizabeth</b>, <b>Dr. Smith</b>.</i></li>
        </ul>
      </Section>
      
       <Section id="common-cases" title="3. Các trường hợp phổ biến khác" emoji="📌">
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Bữa ăn:</b> <i>What time do you have <b>breakfast</b>? / We had <b>lunch</b> at noon.</i></li>
            <li><b>Ngôn ngữ:</b> <i>She speaks <b>Japanese</b> fluently.</i></li>
            <li><b>Môn học:</b> <i>My favorite subject is <b>history</b>.</i></li>
            <li><b>Môn thể thao:</b> <i>He plays <b>football</b> and <b>tennis</b>.</i></li>
            <li><b>Các phương tiện đi lại (trong cụm "by +..."):</b> <i>I go to work <b>by bus</b>. / They traveled <b>by train</b>.</i></li>
        </ul>
      </Section>
      
      <Section id="comparison" title="4. So sánh Zero Article và 'The'" emoji="⚖️">
        <p>
            Một danh từ có thể không dùng mạo từ khi nói chung chung, nhưng phải dùng 'the' khi nó trở nên xác định.
        </p>
        <div className="grid md:grid-cols-2 gap-3 mt-2">
            <div className="rounded-xl p-4 bg-red-50 border border-red-200">
                <p className="font-bold text-red-700">Zero Article (Chung chung)</p>
                <p><i>I like <b>dogs</b>.</i> (loài chó nói chung)</p>
                <p><i><b>Water</b> is essential for life.</i> (nước nói chung)</p>
            </div>
            <div className="rounded-xl p-4 bg-green-50 border border-green-200">
                <p className="font-bold text-green-700">'The' (Cụ thể)</p>
                <p><i><b>The dogs</b> next door are noisy.</i> (những con chó cụ thể ở nhà bên cạnh)</p>
                <p><i><b>The water</b> in this bottle is dirty.</i> (lượng nước cụ thể trong chai này)</p>
            </div>
        </div>
      </Section>

      <Section id="pitfalls" title="5. Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng 'the' với các khái niệm chung chung. (❌ <i className="line-through">I love the music.</i>)</li>
          <li>Dùng 'a/an' với danh từ không đếm được. (❌ <i className="line-through">She gave me an advice.</i>)</li>
          <li>Quên 'the' khi danh từ chung chung đã được xác định bởi một cụm từ theo sau. (❌ <i className="line-through">Information in this report is useful.</i> → ✅ <b>The</b> information...)</li>
        </ol>
      </Section>

      <Section id="drill" title="6. Bài tập nhanh" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền 'the' hoặc không điền gì (∅) vào chỗ trống:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>I'm learning ______ Japanese.</li>
            <li>______ Japanese language is difficult to learn.</li>
            <li>We had ______ dinner at a restaurant last night.</li>
            <li>______ dinner we had last night was delicious.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
