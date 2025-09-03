import React, { useState } from 'react';

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

export default function CorePresentSimple(){
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          🌞 <span className="underline decoration-4 decoration-amber-400">THÌ HIỆN TẠI ĐƠN</span> — Present Simple
        </h1>
        <p className="mt-2 text-gray-600">
          Dùng để diễn tả <b>thói quen</b>, <b>sự thật</b>, <b>lịch trình</b>, <b>trạng thái</b> và các sự kiện lặp lại theo chu kỳ.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="AFFIRMATIVE (V THƯỜNG)" formula="S + V(s/es)" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="NEGATIVE (V THƯỜNG)" formula="S + do/does + not + V" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="YES/NO QUESTION" formula="Do/Does + S + V ?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="AFFIRMATIVE (TO BE)" formula="S + am/is/are + N/Adj" colors="from-purple-500 via-violet-500 to-indigo-600"/>
          <FormulaChip label="NEGATIVE (TO BE)" formula="S + am/is/are + not + N/Adj" colors="from-orange-500 via-amber-500 to-yellow-500"/>
          <FormulaChip label="WH-QUESTION" formula="Wh-word + do/does + S + V ?" colors="from-teal-500 via-cyan-500 to-blue-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Chính tả ngôi 3</a></li>
            <li><a className="text-rose-700 hover:underline" href="#neg">Phủ định & Câu hỏi</a></li>
            <li><a className="text-rose-700 hover:underline" href="#adv">Trạng từ tần suất & Vị trí</a></li>
            <li><a className="text-rose-700 hover:underline" href="#time">Dấu hiệu nhận biết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ mẫu (EN-VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập ngắn</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <ul className="list-disc pl-6">
          <li><b>Thói quen:</b> I <u>get up</u> at 6 a.m.</li>
          <li><b>Sự thật:</b> Water <u>boils</u> at 100°C.</li>
          <li><b>Lịch trình:</b> The train <u>leaves</u> at 9:00.</li>
          <li><b>Trạng thái:</b> She <u>knows</u> the answer.</li>
          <li><b>Nhận xét/Review:</b> In the film, the hero <u>rescues</u> the city.</li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Chính tả ngôi 3" emoji="🧩">
        <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
          <div className="font-bold text-indigo-700 uppercase text-sm mb-1">Động từ thường</div>
          <p><b>Khẳng định:</b> <i>S + V(s/es)</i>. Với <b>He/She/It</b> thêm <b>-s/-es</b>.</p>
          <p className="mt-1"><b>To be:</b> <i>S + am/is/are + N/Adj</i> (I <b>am</b>, He/She/It <b>is</b>, You/We/They <b>are</b>).</p>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="rounded-xl p-4 bg-amber-50 border border-amber-200">
            <div className="font-bold text-amber-700">Quy tắc thêm <u>-s/-es</u> (ngôi 3 số ít)</div>
            <ul className="list-disc pl-5 mt-1">
              <li>+<b>s</b>: play → plays; read → reads</li>
              <li>+<b>es</b> sau -o/-s/-x/-z/-sh/-ch: go → <b>goes</b>; watch → <b>watches</b></li>
              <li>Phụ âm + y → <b>ies</b>: study → studies (nhưng <i>play → plays</i>)</li>
              <li>Bất quy tắc: have → <b>has</b>; do → <b>does</b></li>
            </ul>
          </div>
          <div className="rounded-xl p-4 bg-emerald-50 border border-emerald-200">
            <div className="font-bold text-emerald-700">Phát âm đuôi -s</div>
            <ul className="list-disc pl-5 mt-1">
              <li>/s/: hits, walks</li>
              <li>/z/: runs, loves</li>
              <li>/ɪz/: watches, fixes</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="neg" title="Phủ định & Câu hỏi" emoji="❓">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="rounded-xl p-4 bg-rose-50 border border-rose-200">
            <div className="font-bold text-rose-700">Động từ thường</div>
            <p><b>Phủ định:</b> <i>S + do/does + not + V</i>.</p>
            <p><b>Yes/No:</b> <i>Do/Does + S + V?</i></p>
            <p><b>Wh-:</b> <i>Wh + do/does + S + V?</i></p>
            <p><b>Short answers:</b> Yes, he <b>does</b>. / No, he <b>doesn’t</b>.</p>
          </div>
          <div className="rounded-xl p-4 bg-violet-50 border border-violet-200">
            <div className="font-bold text-violet-700">Động từ “to be”</div>
            <p><b>Phủ định:</b> <i>S + am/is/are + not …</i></p>
            <p><b>Yes/No:</b> <i>Am/Is/Are + S … ?</i></p>
            <p><b>Wh-:</b> <i>Wh + am/is/are + S … ?</i></p>
            <p><b>Short answers:</b> Yes, she <b>is</b>. / No, she <b>isn’t</b>.</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          <b className="uppercase">Lưu ý:</b> Không dùng <u>do/does</u> với <i>to be</i>. Không viết <i>don’t has</i> — đúng là <i>doesn’t have</i>.
        </p>
      </Section>

      <Section id="adv" title="Trạng từ tần suất & Vị trí" emoji="📊">
        <ul className="list-disc pl-6">
          <li><b>always, usually, often, sometimes, rarely, never</b> đứng <b>trước</b> động từ thường: She <u>often plays</u> tennis.</li>
          <li>Với <i>to be</i>, trạng từ đứng <b>sau</b> động từ: He <u>is usually</u> busy.</li>
        </ul>
      </Section>

      <Section id="time" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p><b>every day/week/month</b>, <b>on Mondays</b>, <b>usually/often/sometimes</b>, <b>rarely/never</b>, <b>always</b>, <b>once/twice a week</b>…</p>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Quên <b>-s/-es</b> với <b>He/She/It</b>.</li>
          <li>Dùng <i>do/does</i> với <i>to be</i>.</li>
          <li>Viết <i>don’t has</i> (đúng: <i>doesn’t have</i>).</li>
          <li>Lạm dụng tiếp diễn với <i>stative verbs</i> (know, like, want…).</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ mẫu (EN-VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-1">
          <li>I <b>wake up</b> at six. — Tôi <b>dậy</b> lúc 6 giờ.</li>
          <li>She <b>teaches</b> English at HUTECH. — Cô ấy <b>dạy</b> tiếng Anh ở HUTECH.</li>
          <li>He <b>has</b> breakfast at 7. — Anh ấy <b>ăn sáng</b> lúc 7 giờ.</li>
          <li>The museum <b>opens</b> at 9. — Bảo tàng <b>mở cửa</b> lúc 9 giờ.</li>
          <li>Do you <b>play</b> badminton? — Bạn có <b>chơi</b> cầu lông không?</li>
          <li>She <b>doesn’t like</b> spicy food. — Cô ấy <b>không thích</b> đồ cay.</li>
          <li>Water <b>boils</b> at 100°C. — Nước <b>sôi</b> ở 100°C.</li>
          <li>Where do they <b>live</b>? — Họ <b>sống</b> ở đâu?</li>
          <li>He <b>is</b> very patient. — Anh ấy <b>rất</b> kiên nhẫn.</li>
          <li>They <b>are not</b> at home. — Họ <b>không</b> ở nhà.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập ngắn (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">A. Điền động từ đúng dạng (He/She/It thêm -s/-es):</p>
          <ol className="list-decimal pl-6">
            <li>My father ____ (go) to work at 7 a.m.</li>
            <li>She ____ (watch) TV every night.</li>
            <li>Tom ____ (have) two brothers.</li>
          </ol>
          <p className="mt-3 font-semibold">B. Viết lại câu phủ định:</p>
          <ol className="list-decimal pl-6">
            <li>They play football on Sundays. → _______________________</li>
            <li>He likes coffee. → _______________________</li>
          </ol>
          <p className="mt-3 font-semibold">C. Đặt câu hỏi Yes/No:</p>
          <ol className="list-decimal pl-6">
            <li>She studies French. → _______________________?</li>
            <li>You live in Da Nang. → _______________________?</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}