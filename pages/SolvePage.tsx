import React from 'react';

// This constant holds the entire self-contained HTML application for the Solve Page.
// The embedded Javascript has been fixed to be valid and functional.
const solvePageHtml = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giải đề (Search Patterns)</title>
    <style>
        :root {
            --bg-color: #f8f9fa;
            --card-bg-color: #ffffff;
            --text-color: #212529;
            --subtle-text-color: #6c757d;
            --primary-color: #0d6efd;
            --highlight-color: #ffc107;
            --border-color: #dee2e6;
            --shadow-color: rgba(0, 0, 0, 0.05);
            --chip-bg-color: #e9ecef;
            --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            --border-radius: 12px;
        }
        html {
            scroll-behavior: smooth;
        }
        body {
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
            margin: 0;
            padding: 1.5rem;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .container {
            max-width: 960px;
            margin: 0 auto;
        }
        header {
            text-align: center;
            margin-bottom: 2rem;
        }
        h1 {
            font-size: 2.5rem;
            font-weight: 800;
            margin: 0 0 0.5rem 0;
        }
        #searchInput {
            width: 100%;
            padding: 0.75rem 1rem;
            font-size: 1rem;
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            box-shadow: 0 2px 4px var(--shadow-color);
            transition: border-color 0.2s, box-shadow 0.2s;
            box-sizing: border-box;
        }
        #searchInput:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.25);
        }
        .chips-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: center;
            margin: 1.5rem 0;
        }
        .chip {
            background-color: var(--chip-bg-color);
            color: var(--subtle-text-color);
            padding: 0.3rem 0.8rem;
            border-radius: 99px;
            font-size: 0.8rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s, color 0.2s;
            border: 1px solid transparent;
        }
        .chip:hover {
            background-color: #d3d9df;
            color: var(--text-color);
        }
        #resultsContainer {
            display: grid;
            gap: 1.5rem;
        }
        .pattern-card {
            background-color: var(--card-bg-color);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            padding: 1.5rem;
            box-shadow: 0 4px 8px var(--shadow-color);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .pattern-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.07);
        }
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        .category-chip {
            background-color: var(--primary-color);
            color: white;
            padding: 0.2rem 0.6rem;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 600;
            white-space: nowrap;
        }
        .pattern-title {
            font-size: 1.25rem;
            font-weight: 700;
            margin: 0;
        }
        .formula-container {
            position: relative;
            background-color: #f1f3f5;
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
        }
        .formula-code {
            font-family: "SF Mono", "Menlo", "Consolas", monospace;
            font-size: 0.9rem;
            white-space: pre-wrap;
            word-break: break-all;
        }
        .copy-btn {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background-color: #ced4da;
            color: #495057;
            border: none;
            padding: 0.3rem 0.6rem;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        .copy-btn:hover {
            background-color: #adb5bd;
        }
        .pattern-tip {
            font-size: 0.9rem;
            color: var(--subtle-text-color);
            margin: 1rem 0;
        }
        .pattern-tip strong {
            color: var(--text-color);
        }
        .example {
            border-left: 3px solid var(--primary-color);
            padding-left: 1rem;
            margin-top: 1rem;
        }
        .example-en, .example-vi {
            margin: 0;
        }
        .example-en {
            font-weight: 600;
        }
        .example-vi {
            font-size: 0.9rem;
            color: #495057;
        }
        mark {
            background-color: var(--highlight-color);
            padding: 0.1rem 0.2rem;
            border-radius: 3px;
            color: inherit;
        }
        .no-results {
            text-align: center;
            padding: 2rem;
            color: var(--subtle-text-color);
            background-color: var(--card-bg-color);
            border: 1px dashed var(--border-color);
            border-radius: var(--border-radius);
        }
        footer {
            text-align: center;
            margin-top: 3rem;
            font-size: 0.8rem;
            color: #adb5bd;
        }
        @media (max-width: 600px) {
            body { padding: 1rem; }
            h1 { font-size: 2rem; }
            .chips-container { justify-content: flex-start; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Giải đề (Search patterns)</h1>
            <input type="search" id="searchInput" placeholder="Gõ: mạo tính danh, giới V-ing, điều kiện 1, so sánh bằng, hở giữa…">
        </header>

        <div class="chips-container" id="chipsContainer">
            <!-- Chips will be inserted here by JS -->
        </div>

        <main id="resultsContainer">
            <!-- Results will be inserted here by JS -->
        </main>
        
        <footer>
            Made for Matcanban · No framework · Diacritic-insensitive search
        </footer>
    </div>

    <script>
        (function() {
            const PATTERNS = [
                { id:"art_core", category:"Articles", title:"Mạo — tổng quan", formula:"a/an + N (số ít đếm được); the + N (xác định); Ø + N(pl/unc.) (khái quát)", tip:"a trước phụ âm; an trước nguyên âm/âm nguyên âm; the dùng khi đã xác định/duy nhất.", examples:[{en:"She bought an umbrella.", vi:"Cô ấy mua một chiếc ô."}], triggers:["mạo","mạo từ","article","art","articles"]},
                { id:"art_n", category:"Articles", title:"Mạo danh", formula:"Article + Noun", tip:"Danh từ số ít đếm được cần mạo từ (a/an/the) hoặc hạn định từ khác.", examples:[{en:"a book", vi:"một quyển sách"}], triggers:["mạo danh","article + noun","a/an + noun","art noun"]},
                { id:"art_adj_n", category:"Articles", title:"Mạo tính danh", formula:"Article + Adj + Noun", tip:"Tính từ đứng trước danh từ: a/an + adj + noun.", examples:[{en:"an interesting book", vi:"một quyển sách thú vị"}], triggers:["mạo tính danh","article adj noun","a/an + adj + noun"]},
                { id:"art_adv_adj_n", category:"Articles", title:"Mạo trạng tính danh", formula:"Article + Adv + Adj + Noun", tip:"Adv (very, quite, extremely, …) bổ nghĩa cho adj.", examples:[{en:"a very difficult question", vi:"một câu hỏi rất khó"}], triggers:["mạo trạng tính danh","article adv adj noun"]},
                { id:"art_adj_adj_n", category:"Articles", title:"Mạo tính tính danh", formula:"Article + Adj + Adj + Noun", tip:"Thứ tự tính từ cơ bản: opinion → size → color → noun.", examples:[{en:"a small red box", vi:"một chiếc hộp đỏ nhỏ"}], triggers:["mạo tính tính danh","article adj adj noun"]},
                { id:"art_n_prep_n", category:"Articles", title:"Mạo danh giới", formula:"Article + N + Prep + N", tip:"Danh từ + cụm giới từ phía sau để làm rõ nghĩa.", examples:[{en:"the way to school", vi:"con đường đến trường"}], triggers:["mạo danh giới","article noun preposition","n prep n"]},
                { id:"prep_core", category:"Prepositions", title:"Giới — tổng quan", formula:"Prep + (N / N-phrase / V-ing / clause)", tip:"Giới từ dẫn cụm danh từ hoặc V-ing; chú ý collocations: at/on/in, by/with, for/of, from/to…", examples:[{en:"at night / in the morning", vi:"vào ban đêm / vào buổi sáng"}], triggers:["giới","giới từ","preposition","prep"]},
                { id:"prep_n", category:"Prepositions", title:"Giới danh", formula:"Prep + N", tip:"Cụm thời gian/địa điểm thường dùng: in 1999, at school, on Monday…", examples:[{en:"in the morning", vi:"vào buổi sáng"}], triggers:["giới danh","prep noun","giới + danh"]},
                { id:"prep_adj_n", category:"Prepositions", title:"Giới tính danh", formula:"Prep + Adj + N", tip:"Adj đứng trước N trong cụm giới từ.", examples:[{en:"in a difficult situation", vi:"trong một tình huống khó khăn"}], triggers:["giới tính danh","prep adj noun"]},
                { id:"prep_ving", category:"Prepositions", title:"Giới V-ing", formula:"Prep + V-ing", tip:"by/without/after/before + V-ing.", examples:[{en:"by studying", vi:"bằng cách học"}], triggers:["giới v-ing","prep ving","giới + ving"]},
                { id:"prep_ving_n", category:"Prepositions", title:"Giới V-ing danh", formula:"Prep + V-ing + N", tip:"Cụm V-ing đóng vai trò danh hoá sau giới từ.", examples:[{en:"by reading books", vi:"bằng cách đọc sách"}], triggers:["giới v-ing danh","prep ving noun"]},
                { id:"prep_adv_ving_n", category:"Prepositions", title:"Giới trạng V-ing danh", formula:"Prep + Adv + V-ing + N", tip:"Adv (carefully, slowly, …) đứng trước V-ing.", examples:[{en:"by carefully reading the text", vi:"bằng cách đọc kỹ văn bản"}], triggers:["giới trạng v-ing danh","prep adv ving noun"]},
                { id:"prep_n_prep", category:"Prepositions", title:"Giới danh giới", formula:"Prep + N + Prep (+ N)", tip:"Cấu trúc chuỗi: from A to B / between A and B.", examples:[{en:"from home to work", vi:"từ nhà đến chỗ làm"}], triggers:["giới danh giới","prep noun prep"]},
                { id:"cond1", category:"Conditionals", title:"Điều kiện 1 (hiện thực)", formula:"If + S + V(present simple), S + will + V0", tip:"Có thể dùng can/may/should thay will; mệnh đề if KHÔNG dùng will.", examples:[{en:"If you study hard, you will pass the exam.", vi:"Nếu bạn học chăm, bạn sẽ đậu kỳ thi."}], triggers:["điều kiện 1","if 1","type 1","conditional 1","if+present, will+V0"]},
                { id:"eq_adj", category:"Comparisons", title:"So sánh bằng (tính từ)", formula:"S + be + as + Adj + as + S + be", tip:"Dùng be ở cả hai vế nếu cần; có thể thêm not để phủ định.", examples:[{en:"She is as tall as her brother.", vi:"Cô ấy cao bằng anh trai."}], triggers:["so sánh bằng","as adj as","equal adj","equative adj"]},
                { id:"eq_adv", category:"Comparisons", title:"So sánh bằng (trạng từ)", formula:"S + V + as + Adv + as + S + V", tip:"Động từ thường + as + adv + as; vế sau có thể dùng trợ động do/does/did.", examples:[{en:"He runs as fast as Tom does.", vi:"Cậu ấy chạy nhanh bằng Tom."}], triggers:["so sánh bằng trạng từ","as adv as","equal adv","equative adv"]},
                { id:"gap_mid_adj", category:"Strategy", title:"Hở giữa — xài tính từ", formula:"Determiner + ___ + Noun", tip:"Ô trống giữa hạn định từ (a/an/the/this/that/my/some/…) và danh từ → 80% là **Adjective**.", examples:[{en:"a ___ book → a useful book", vi:"một ___ quyển sách → một quyển sách hữu ích"}], triggers:["hở giữa","gap giữa","gap middle","xài tính từ","sài tính từ","từ hạn định + … + noun"]},
                { id:"gap_head_v_or_adv", category:"Strategy", title:"Hở đầu — xài động từ hoặc trạng từ", formula:"___ + Determiner + Noun", tip:"Trước cụm danh từ thường là **Verb** (mệnh lệnh/kể) hoặc **Adverb** toàn mệnh đề.", examples:[{en:"Please ___ the door. → Please open the door.", vi:"Làm ơn ___ cửa. → Làm ơn mở cửa."}], triggers:["hở đầu","gap đầu","xài động từ","xài trạng từ","… + từ hạn định + danh"]},
                { id:"gap_after_adv", category:"Strategy", title:"Hở sau — ưu tiên trạng từ", formula:"Determiner + Noun + ___", tip:"Sau cụm danh từ, 80% rơi vào **Adverb** hoặc cụm giới từ bổ sung thông tin.", examples:[{en:"The train arrived ___. → The train arrived late.", vi:"Chuyến tàu đến ___ → Chuyến tàu đến trễ."}], triggers:["hở sau","gap sau","xài trạng từ đúng 80%","từ hạn định + danh + …"]},
                { id:"after_transitive", category:"Strategy", title:"Sau ngoại động từ → danh từ/tân ngữ", formula:"Transitive V + (N/NP/Pronoun)", tip:"Ngoại động từ cần **tân ngữ**: need/buy/like/make/…", examples:[{en:"She needs help.", vi:"Cô ấy cần sự giúp đỡ."}], triggers:["sau ngoại động từ","transitive","Vt","object after verb"]},
                { id:"after_intransitive", category:"Strategy", title:"Sau nội động từ → giới từ hoặc trạng từ", formula:"Intransitive V + (Prep-phrase / Adverb)", tip:"arrive/agree/happen/work/… không nhận tân ngữ trực tiếp.", examples:[{en:"He arrived at noon / He arrived late.", vi:"Anh ấy đến vào buổi trưa / Anh ấy đến trễ."}], triggers:["sau nội động từ","intransitive","Vi","giới từ hoặc trạng từ"]}
            ];
            const CHIPS = [
                "mạo", "mạo danh", "mạo tính danh", "mạo trạng tính danh", "mạo tính tính danh", "mạo danh giới",
                "giới", "giới danh", "giới tính danh", "giới V-ing", "giới V-ing danh", "giới trạng V-ing danh", "giới danh giới",
                "điều kiện 1", "so sánh bằng", "hở giữa", "hở đầu", "hở sau", "sau ngoại động từ", "sau nội động từ"
            ];

            const searchInput = document.getElementById('searchInput');
            const chipsContainer = document.getElementById('chipsContainer');
            const resultsContainer = document.getElementById('resultsContainer');
            let debounceTimer;

            function removeVietnameseDiacritics(str) {
                if (!str) return '';
                return str.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/đ/g, "d").replace(/Đ/g, "D");
            }

            function highlightText(text, query) {
                if (!query) return text;
                const normalizedText = removeVietnameseDiacritics(text).toLowerCase();
                const normalizedQuery = removeVietnameseDiacritics(query).toLowerCase();
                if (!normalizedQuery) return text;
                
                let result = '';
                let from = 0;
                let idx = normalizedText.indexOf(normalizedQuery);

                while (idx !== -1) {
                    result += text.slice(from, idx);
                    result += '<mark>' + text.slice(idx, idx + normalizedQuery.length) + '</mark>';
                    from = idx + normalizedQuery.length;
                    idx = normalizedText.indexOf(normalizedQuery, from);
                }

                result += text.slice(from);
                return result;
            }
            
            function renderResults(query) {
                const normalizedQuery = removeVietnameseDiacritics(query).toLowerCase().trim();
                const queryTerms = normalizedQuery.split(/\\s+/).filter(Boolean);

                const filtered = PATTERNS.filter(pattern => {
                    if (!normalizedQuery) return true; // Show initial suggestions if query is empty
                    const normalizedTriggers = removeVietnameseDiacritics(pattern.triggers.join(' ')).toLowerCase();
                    return queryTerms.every(term => normalizedTriggers.includes(term));
                }).sort((a, b) => {
                    if (!normalizedQuery) return 0;
                    const aTriggers = removeVietnameseDiacritics(a.triggers.join(' ')).toLowerCase();
                    const bTriggers = removeVietnameseDiacritics(b.triggers.join(' ')).toLowerCase();
                    const scoreA = normalizedQuery.length / aTriggers.length;
                    const scoreB = normalizedQuery.length / bTriggers.length;
                    const aTitle = removeVietnameseDiacritics(a.title).toLowerCase();
                    const bTitle = removeVietnameseDiacritics(b.title).toLowerCase();
                    if (aTitle.startsWith(normalizedQuery)) return -1;
                    if (bTitle.startsWith(normalizedQuery)) return 1;
                    return scoreB - scoreA;
                });

                const limitedResults = query ? filtered : filtered.slice(0, 12);

                if (limitedResults.length === 0) {
                    resultsContainer.innerHTML = '<div class="no-results"><h3>Không tìm thấy kết quả</h3><p>Hãy thử các từ khoá đơn giản hơn như "mạo", "so sánh", "điều kiện"...</p></div>';
                    return;
                }
                
                resultsContainer.innerHTML = limitedResults.map(pattern => {
                    const tipHTML = pattern.tip.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>');
                    
                    const examplesHTML = pattern.examples.map(ex => 
                        '<div class="example">' +
                            '<p class="example-en">' + highlightText(ex.en, query) + '</p>' +
                            '<p class="example-vi">' + highlightText(ex.vi, query) + '</p>' +
                        '</div>'
                    ).join('');

                    return (
                        '<div class="pattern-card">' +
                            '<div class="card-header">' +
                                '<h2 class="pattern-title">' + highlightText(pattern.title, query) + '</h2>' +
                                '<span class="category-chip">' + pattern.category + '</span>' +
                            '</div>' +
                            '<div class="formula-container">' +
                                '<code class="formula-code">' + highlightText(pattern.formula, query) + '</code>' +
                                '<button class="copy-btn" data-formula="' + pattern.formula.replace(/"/g, '&quot;') + '">Copy</button>' +
                            '</div>' +
                            '<p class="pattern-tip">' + highlightText(tipHTML, query) + '</p>' +
                            examplesHTML +
                        '</div>'
                    );
                }).join('');
            }

            function renderChips() {
                chipsContainer.innerHTML = CHIPS.map(chip => 
                    '<button class="chip">' + chip + '</button>'
                ).join('');
            }

            function handleSearch() {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    renderResults(searchInput.value);
                }, 200);
            }
            
            function handleChipClick(e) {
                if (e.target.classList.contains('chip')) {
                    searchInput.value = e.target.textContent;
                    renderResults(searchInput.value);
                    searchInput.focus();
                }
            }
            
            function handleCopyClick(e) {
                if (e.target.classList.contains('copy-btn')) {
                    const formula = e.target.dataset.formula;
                    navigator.clipboard.writeText(formula).then(() => {
                        const originalText = e.target.textContent;
                        e.target.textContent = 'Copied!';
                        setTimeout(() => {
                            e.target.textContent = originalText;
                        }, 1200);
                    }).catch(err => console.error('Failed to copy: ', err));
                }
            }

            // Init
            searchInput.addEventListener('input', handleSearch);
            chipsContainer.addEventListener('click', handleChipClick);
            resultsContainer.addEventListener('click', handleCopyClick);
            
            renderChips();
            renderResults('');
        })();
    </script>
</body>
</html>
`;

const SolvePage: React.FC = () => {
  return (
    <div className="w-full h-full">
        <iframe
            srcDoc={solvePageHtml}
            className="w-full h-full border-0"
            style={{ minHeight: '80vh' }}
            title="Solve Page"
            sandbox="allow-scripts allow-same-origin"
        />
    </div>
  );
};

export default SolvePage;
