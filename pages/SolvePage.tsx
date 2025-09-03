// React component + Tailwind UI cho tab “Giải đề” + Admin (password MCB01111110)

import React, { useEffect, useMemo, useState } from "react";
import {
  GiaideDB,
  loadDB,
  saveDB,
  resetDB,
  search,
  SearchResult,
  SUGGESTED_QUERIES,
  bumpRecent,
  exportJSON,
  importJSON,
  addCategory,
  updateCategory,
  deleteCategory,
  upsertPattern,
  deletePattern,
  removeDiacritics,
  isPatternInCurrentGrammar,
} from "../services/solveService";

const ADMIN_PASSWORD = "MCB01111110";

function classNames(...xs: (string | false | undefined)[]) {
  return xs.filter(Boolean).join(" ");
}

function useDBState() {
  const [db, setDb] = useState<GiaideDB>(() => loadDB());
  const hardReset = () => setDb(resetDB());
  const setAndSave = (next: GiaideDB) => {
    setDb(next);
    saveDB(next);
  };
  return { db, setDb: setAndSave, hardReset };
}

function useSearch(db: GiaideDB, q: string) {
  const [results, setResults] = useState<SearchResult[]>([]);
  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setResults(search(q, db));
  }, [q, db]);
  return results;
}

// highlight đơn giản (diacritics-insensitive): tô đậm token dài nhất trùng
function Highlight({ text, query }: { text: string; query: string }) {
  const tokens = useMemo(() => {
    return removeDiacritics(query.toLowerCase())
      .split(/[\s,;|/]+/g)
      .filter(Boolean)
      .sort((a, b) => b.length - a.length);
  }, [query]);

  if (!tokens.length) return <>{text}</>;

  const norm = removeDiacritics(text.toLowerCase());
  let bestIdx = -1;
  let bestLen = 0;

  for (const t of tokens) {
    const i = norm.indexOf(t);
    if (i >= 0 && t.length > bestLen) {
      bestIdx = i;
      bestLen = t.length;
    }
  }

  if (bestIdx === -1) return <>{text}</>;

  // cắt theo vị trí trong chuỗi gốc
  const start = text.slice(0, bestIdx);
  const mid = text.slice(bestIdx, bestIdx + bestLen);
  const end = text.slice(bestIdx + bestLen);

  return (
    <>
      {start}
      <mark className="bg-yellow-200 rounded px-0.5">{mid}</mark>
      {end}
    </>
  );
}

export default function SolvePage() {
  const { db, setDb, hardReset } = useDBState();
  const [q, setQ] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const results = useSearch(db, q);

  // Admin
  const [adminOpen, setAdminOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);

  useEffect(() => {
    if (db.categories.length && !selectedCatId) {
      setSelectedCatId(db.categories[0].id);
    }
  }, [db, selectedCatId]);

  const selectedCat = useMemo(
    () => db.categories.find((c) => c.id === selectedCatId) || null,
    [db, selectedCatId]
  );

  function onCopyFormula(f: string, patternId: string) {
    navigator.clipboard.writeText(f);
    setCopied(patternId);
    bumpRecent(patternId);
    setTimeout(() => setCopied(null), 1200);
  }

  function onRunChip(query: string) {
    setQ(query);
  }

  return (
    <div className="min-h-[100dvh] bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧩</span>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Giải đề
              </h1>
              <p className="text-sm text-slate-500">
                Tìm theo từ khóa EN–VI (bỏ dấu): “mạo”, “giới”, “điều kiện 1”, “so
                sánh bằng”, “hở giữa”, “sau ngoại động từ”…
              </p>
            </div>
          </div>

          <button
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-lg hover:bg-slate-100"
            onClick={() => {
              if (!authed) {
                const pw = prompt("Nhập mật khẩu quản trị");
                if (pw === ADMIN_PASSWORD) {
                  setAuthed(true);
                  setAdminOpen(true);
                } else if (pw !== null) {
                  alert("Sai mật khẩu.");
                }
              } else {
                setAdminOpen(true);
              }
            }}
            title="Quản trị"
          >
            <span className="text-xl">🔧</span>
            <span>Quản trị</span>
          </button>
        </div>
      </header>

      {/* Search bar + chips */}
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="relative">
          <input
            className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập từ khóa… (vd: 'mạo', 'giới', 'điều kiện 1', 'so sánh bằng', 'hở giữa'...)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setQ("");
            }}
          />
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
            ⌘K
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTED_QUERIES.map((c) => (
            <button
              key={c.label}
              className="rounded-full bg-slate-100 text-slate-700 px-3 py-1.5 text-lg hover:bg-slate-200"
              onClick={() => onRunChip(c.query)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <main className="mx-auto max-w-6xl px-4 pb-12">
        {q.trim() && results.length === 0 && (
          <div className="text-center text-slate-500 py-16 text-xl">
            Không có kết quả. Thử từ khóa khác hoặc dùng các chip gợi ý.
          </div>
        )}

        {!q.trim() && (
          <div className="text-center text-slate-500 py-16 text-xl">
            Nhập từ khóa ở ô trên, hoặc chọn một chip để xem mẫu.
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((r) => {
            const p = r.pattern;
            const available = isPatternInCurrentGrammar(p);
            return (
              <article
                key={p.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-2 text-base text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                    📚 {r.categoryTitle}
                  </span>
                  {!available && (
                    <span className="text-sm text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                      KHÔNG KHẢ DỤNG VỚI ĐIỂM NGỮ PHÁP NÀY
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-slate-900">
                  <Highlight text={p.label_vi} query={q} />
                </h3>

                <code className="mt-1 block font-mono text-base text-blue-800 bg-blue-50 border border-blue-200 rounded px-2 py-1">
                  <Highlight text={p.formula_en} query={q} />
                </code>

                <p className="mt-2 text-base text-slate-700">
                  <Highlight text={p.desc_vi} query={q} />
                </p>

                {p.examples?.length > 0 && (
                  <ul className="mt-2 space-y-1 text-base text-slate-700 list-disc pl-5">
                    {p.examples.slice(0, 3).map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                )}

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-sm text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full"
                    >
                      #{t}
                    </span>
                  ))}
                  {typeof p.confidence === "number" && (
                    <span className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full ml-auto">
                      confidence: {(p.confidence * 100).toFixed(0)}%
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => onCopyFormula(p.formula_en, p.id)}
                    className={classNames(
                      "inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-lg",
                      copied === p.id
                        ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    {copied === p.id ? "✓ Copied" : "Copy công thức"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* ADMIN MODAL */}
      {adminOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setAdminOpen(false)}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h2 className="font-semibold text-xl">Quản trị “Giải đề”</h2>
                <button
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-lg hover:bg-slate-100"
                  onClick={() => setAdminOpen(false)}
                >
                  Đóng
                </button>
              </div>

              {!authed ? (
                <div className="p-6 text-slate-600 text-xl">
                  Bạn chưa đăng nhập. Đóng và bấm 🔧 ở header để nhập mật khẩu.
                </div>
              ) : (
                <div className="grid grid-cols-12 gap-0">
                  {/* Sidebar */}
                  <aside className="col-span-4 border-r p-4 max-h-[75vh] overflow-auto">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-medium text-slate-800">
                        Categories ({db.categories.length})
                      </h3>
                      <button
                        className="text-lg rounded-lg border border-slate-300 px-2 py-1 hover:bg-slate-50"
                        onClick={() => {
                          const id = prompt("Nhập id (không dấu, duy nhất)");
                          const title = id
                            ? prompt("Tên hiển thị (vi):")
                            : null;
                          if (!id || !title) return;
                          try {
                            const next = addCategory(db, {
                              id,
                              title_vi: title,
                              synonyms: [],
                              patterns: [],
                            });
                            setDb(next);
                            setSelectedCatId(id);
                          } catch (e: any) {
                            alert(e?.message || "Lỗi thêm category");
                          }
                        }}
                      >
                        + Thêm
                      </button>
                    </div>

                    <ul className="space-y-1">
                      {db.categories.map((c) => (
                        <li key={c.id}>
                          <button
                            onClick={() => setSelectedCatId(c.id)}
                            className={classNames(
                              "w-full text-left px-3 py-2 rounded-lg border",
                              selectedCatId === c.id
                                ? "bg-blue-50 border-blue-200 text-blue-800"
                                : "bg-white border-slate-200 hover:bg-slate-50"
                            )}
                          >
                            <div className="font-medium text-lg">{c.title_vi}</div>
                            <div className="text-base text-slate-500">
                              {c.id} • {c.patterns.length} mẫu
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </aside>

                  {/* Editor */}
                  <section className="col-span-8 p-4 max-h-[75vh] overflow-auto">
                    {!selectedCat ? (
                      <div className="text-slate-600 text-xl">Chọn 1 category ở trái.</div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <div className="grow">
                            <label className="text-base text-slate-500">ID</label>
                            <input
                              className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-lg"
                              value={selectedCat.id}
                              readOnly
                            />
                          </div>
                          <div className="grow">
                            <label className="text-base text-slate-500">Tên (vi)</label>
                            <input
                              className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-lg"
                              value={selectedCat.title_vi}
                              onChange={(e) =>
                                setDb(
                                  updateCategory(db, selectedCat.id, (draft) => {
                                    draft.title_vi = e.target.value;
                                  })
                                )
                              }
                            />
                          </div>
                          <button
                            className="self-end rounded-lg border border-rose-300 bg-rose-50 text-rose-800 px-3 py-1.5 text-lg hover:bg-rose-100"
                            onClick={() => {
                              if (
                                !confirm(
                                  `Xóa category "${selectedCat.title_vi}"?`
                                )
                              )
                                return;
                              setDb(deleteCategory(db, selectedCat.id));
                              setSelectedCatId(null);
                            }}
                          >
                            Xóa category
                          </button>
                        </div>

                        <div className="mt-3">
                          <label className="text-base text-slate-500">
                            Synonyms (từ khóa, cách nhau bởi dấu phẩy)
                          </label>
                          <input
                            className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-lg"
                            value={selectedCat.synonyms.join(", ")}
                            onChange={(e) => {
                              const arr = e.target.value
                                .split(",")
                                .map((x) => x.trim())
                                .filter(Boolean);
                              setDb(
                                updateCategory(db, selectedCat.id, (d) => {
                                  d.synonyms = arr;
                                })
                              );
                            }}
                          />
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <h4 className="text-lg font-medium">
                            Patterns ({selectedCat.patterns.length})
                          </h4>
                          <button
                            className="text-lg rounded-lg border border-slate-300 px-2 py-1 hover:bg-slate-50"
                            onClick={() => {
                              const id = prompt("ID pattern (duy nhất):");
                              if (!id) return;
                              setDb(
                                upsertPattern(db, selectedCat.id, {
                                  id,
                                  label_vi: "nhãn (vi)",
                                  formula_en: "formula",
                                  desc_vi: "mô tả",
                                  examples: [],
                                  tags: [],
                                })
                              );
                            }}
                          >
                            + Thêm pattern
                          </button>
                        </div>

                        <div className="mt-2 space-y-3">
                          {selectedCat.patterns.map((p) => (
                            <div
                              key={p.id}
                              className="rounded-xl border border-slate-200 p-3"
                            >
                              <div className="flex items-center justify-between">
                                <div className="font-medium text-lg">{p.id}</div>
                                <button
                                  className="text-lg rounded-lg border border-rose-300 bg-rose-50 text-rose-800 px-2 py-1 hover:bg-rose-100"
                                  onClick={() =>
                                    setDb(
                                      deletePattern(db, selectedCat.id, p.id)
                                    )
                                  }
                                >
                                  Xóa
                                </button>
                              </div>

                              <div className="grid grid-cols-2 gap-2 mt-2">
                                <label className="text-base text-slate-500 col-span-2">
                                  Nhãn (vi)
                                  <input
                                    className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-lg"
                                    value={p.label_vi}
                                    onChange={(e) =>
                                      setDb(
                                        upsertPattern(db, selectedCat.id, {
                                          ...p,
                                          label_vi: e.target.value,
                                        })
                                      )
                                    }
                                  />
                                </label>

                                <label className="text-base text-slate-500">
                                  Công thức (en)
                                  <input
                                    className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-lg"
                                    value={p.formula_en}
                                    onChange={(e) =>
                                      setDb(
                                        upsertPattern(db, selectedCat.id, {
                                          ...p,
                                          formula_en: e.target.value,
                                        })
                                      )
                                    }
                                  />
                                </label>

                                <label className="text-base text-slate-500">
                                  Confidence (0–1, tùy chọn)
                                  <input
                                    type="number"
                                    step="0.05"
                                    min={0}
                                    max={1}
                                    className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-lg"
                                    value={
                                      typeof p.confidence === "number"
                                        ? p.confidence
                                        : ""
                                    }
                                    onChange={(e) =>
                                      setDb(
                                        upsertPattern(db, selectedCat.id, {
                                          ...p,
                                          confidence:
                                            e.target.value === ""
                                              ? undefined
                                              : Number(e.target.value),
                                        })
                                      )
                                    }
                                  />
                                </label>

                                <label className="text-base text-slate-500 col-span-2">
                                  Mô tả (vi)
                                  <textarea
                                    rows={2}
                                    className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-lg"
                                    value={p.desc_vi}
                                    onChange={(e) =>
                                      setDb(
                                        upsertPattern(db, selectedCat.id, {
                                          ...p,
                                          desc_vi: e.target.value,
                                        })
                                      )
                                    }
                                  />
                                </label>

                                <label className="text-base text-slate-500 col-span-2">
                                  Ví dụ (mỗi dòng 1 ví dụ)
                                  <textarea
                                    rows={2}
                                    className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-lg"
                                    value={p.examples.join("\n")}
                                    onChange={(e) =>
                                      setDb(
                                        upsertPattern(db, selectedCat.id, {
                                          ...p,
                                          examples: e.target.value
                                            .split("\n")
                                            .map((x) => x.trim())
                                            .filter(Boolean),
                                        })
                                      )
                                    }
                                  />
                                </label>

                                <label className="text-base text-slate-500 col-span-2">
                                  Tags (phân tách bởi dấu phẩy)
                                  <input
                                    className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-lg"
                                    value={p.tags.join(", ")}
                                    onChange={(e) =>
                                      setDb(
                                        upsertPattern(db, selectedCat.id, {
                                          ...p,
                                          tags: e.target.value
                                            .split(",")
                                            .map((x) => x.trim())
                                            .filter(Boolean),
                                        })
                                      )
                                    }
                                  />
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Import / Export / Reset */}
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <button
                            className="rounded-lg border border-slate-300 px-3 py-1.5 text-lg hover:bg-slate-50"
                            onClick={() => {
                              const data = exportJSON(db);
                              const blob = new Blob([data], {
                                type: "application/json;charset=utf-8",
                              });
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement("a");
                              a.href = url;
                              a.download = "giaide.json";
                              a.click();
                              URL.revokeObjectURL(url);
                            }}
                          >
                            ⬇️ Export JSON
                          </button>

                          <button
                            className="rounded-lg border border-slate-300 px-3 py-1.5 text-lg hover:bg-slate-50"
                            onClick={() => {
                              const raw = prompt(
                                "Dán JSON vào đây (sẽ thay thế DB hiện tại):"
                              );
                              if (!raw) return;
                              try {
                                const next = importJSON(raw);
                                setDb(next);
                                alert("Import thành công!");
                              } catch (e: any) {
                                alert(e?.message || "JSON không hợp lệ");
                              }
                            }}
                          >
                            ⬆️ Import JSON
                          </button>

                          <button
                            className="rounded-lg border border-amber-300 bg-amber-50 text-amber-900 px-3 py-1.5 text-lg hover:bg-amber-100"
                            onClick={() => {
                              if (
                                confirm(
                                  "Reset về dữ liệu mặc định? (Mất mọi chỉnh sửa)"
                                )
                              ) {
                                hardReset();
                                alert("Đã reset về mặc định.");
                              }
                            }}
                          >
                            ♻️ Reset mặc định
                          </button>
                        </div>
                      </>
                    )}
                  </section>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}