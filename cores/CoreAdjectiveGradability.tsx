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

export default function CoreAdjectiveGradability() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🌡️ <span className="underline decoration-4 decoration-amber-400">TÍNH TỪ PHÂN CẤP</span> — <i>Gradable Adjectives</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Phân biệt giữa tính từ có thể chia theo mức độ (gradable) và tính từ tuyệt đối, không thể chia mức độ (non-gradable), cũng như các trạng từ đi kèm với chúng.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Gradable" formula="very + hot/cold/big" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Non-Gradable" formula="absolutely + freezing/boiling/huge" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#gradable">Tính từ Phân cấp (Gradable)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#non-gradable">Tính từ Tuyệt đối (Non-Gradable)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">Bảng so sánh & Trạng từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="gradable" title="Tính từ Phân cấp (Gradable Adjectives)" emoji="📶">
        <p>
            Đây là những tính từ có thể được đo lường theo các mức độ khác nhau. Chúng ta có thể làm cho chúng mạnh hơn hoặc yếu hơn bằng cách sử dụng các trạng từ chỉ mức độ.
        </p>
        <ul className="list-disc pl-6">
            <li><b>Ví dụ về tính từ:</b> big, small, hot, cold, hungry, tired, interesting, beautiful, important.</li>
            <li><b>Các trạng từ đi kèm:</b> a little, a bit, slightly, quite, rather, very, really, extremely.</li>
            <li><i>e.g., The water is <b>a bit cold</b>. It's <b>very cold</b>. It's <b>extremely cold</b>.</i></li>
        </ul>
      </Section>

      <Section id="non-gradable" title="Tính từ Tuyệt đối (Non-Gradable / Absolute Adjectives)" emoji="💥">
        <p>Đây là những tính từ mô tả một trạng thái tuyệt đối hoặc cực đoan, không có mức độ. Một thứ gì đó hoặc là có tính chất đó, hoặc không.</p>
        <div className="grid md:grid-cols-2 gap-3 mt-2">
            <div className="rounded-xl p-4 bg-gray-50 border">
                <h3 className="font-bold">Tính từ Cực đoan (Extreme)</h3>
                <p className="text-sm">Là dạng "tột đỉnh" của các tính từ phân cấp.</p>
                <ul className="list-disc pl-5 mt-1 text-sm">
                    <li>hot → <b>boiling</b></li>
                    <li>cold → <b>freezing</b></li>
                    <li>big → <b>huge, enormous</b></li>
                    <li>small → <b>tiny</b></li>
                    <li>good → <b>wonderful, amazing, brilliant</b></li>
                    <li>bad → <b>terrible, awful, dreadful</b></li>
                </ul>
            </div>
            <div className="rounded-xl p-4 bg-gray-50 border">
                 <h3 className="font-bold">Tính từ Tuyệt đối (Absolute)</h3>
                 <p className="text-sm">Mô tả một trạng thái không thể chia nhỏ.</p>
                <ul className="list-disc pl-5 mt-1 text-sm">
                     <li><b>perfect, unique, impossible</b></li>
                     <li><b>dead, alive</b></li>
                     <li><b>essential, vital</b></li>
                     <li><b>digital, chemical</b></li>
                </ul>
            </div>
        </div>
      </Section>
      
      <Section id="comparison" title="Bảng so sánh & Trạng từ" emoji="⚖️">
        <p>
            Trạng từ dùng để bổ nghĩa cho tính từ phân cấp và tính từ tuyệt đối là khác nhau.
        </p>
        <div className="overflow-x-auto mt-2">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">Tiêu chí</th>
                        <th className="border p-2 text-left">Gradable Adjectives</th>
                        <th className="border p-2 text-left">Non-Gradable Adjectives</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border p-2 font-semibold">Trạng từ đi kèm</td>
                        <td className="border p-2">very, extremely, really, quite, a bit</td>
                        <td className="border p-2">absolutely, completely, totally, utterly</td>
                    </tr>
                    <tr className="bg-gray-50">
                        <td className="border p-2 font-semibold">So sánh hơn/nhất</td>
                         <td className="border p-2 text-green-600">Có (hotter, the hottest)</td>
                         <td className="border p-2 text-red-600">Không (<s>more perfect</s>, <s>the most unique</s>)</td>
                    </tr>
                     <tr>
                        <td className="border p-2 font-semibold">Ví dụ</td>
                        <td className="border p-2"><i>It's <b>very interesting</b>.</i></td>
                        <td className="border p-2"><i>It's <b>absolutely fascinating</b>.</i></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p className="mt-2 text-sm text-gray-600"><b>Lưu ý:</b> "Really" và "quite" là các trạng từ linh hoạt, có thể đi với cả hai loại tính từ trong một số trường hợp.</p>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng trạng từ chỉ mức độ (very, a bit) với tính từ tuyệt đối.
              <br/>❌ <i className="line-through">This is a very unique opportunity.</i> → ✅ This is a <b>unique</b> opportunity / a <b>truly unique</b> opportunity.
          </li>
          <li>Dùng trạng từ tuyệt đối (absolutely, completely) với tính từ phân cấp.
              <br/>❌ <i className="line-through">He was absolutely tired.</i> → ✅ He was <b>absolutely exhausted</b>. / He was <b>very tired</b>.
          </li>
          <li>Tạo dạng so sánh hơn/nhất cho tính từ tuyệt đối. (❌ <i className="line-through">This design is more perfect than that one.</i>)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>The exam was very difficult, but not impossible.</b> — Bài kiểm tra rất khó, nhưng không phải là không thể.</li>
          <li><b>It's not just cold, it's absolutely freezing!</b> — Trời không chỉ lạnh, mà là lạnh cóng!</li>
          <li><b>His performance was good, but not perfect.</b> — Màn trình diễn của anh ấy tốt, nhưng chưa hoàn hảo.</li>
          <li><b>The new skyscraper is not just big; it's enormous.</b> — Tòa nhà chọc trời mới không chỉ lớn; nó khổng lồ.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chọn trạng từ đúng để điền vào chỗ trống:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The soup is ______ hot. Be careful. (very / absolutely)</li>
            <li>After the long hike, I was ______ exhausted. (a bit / completely)</li>
            <li>His idea was ______ unique. I've never heard anything like it. (very / absolutely)</li>
            <li>I'm ______ tired, I think I'll go to bed early. (rather / utterly)</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}