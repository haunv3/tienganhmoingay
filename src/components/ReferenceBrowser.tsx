"use client";
import { useState } from "react";
import type { ReferenceEntry } from "@/lib/library";
import { SITUATIONS } from "@/lib/library-topics";
import SpeakButton from "./SpeakButton";

const normalize = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g,"d");
const entryTopics = (entry: ReferenceEntry) => entry.topics ?? (entry.topic ? [entry.topic] : []);
export default function ReferenceBrowser({ entries }: { entries: ReferenceEntry[] }) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("");
  const [topic, setTopic] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const topics = [...new Set(entries.flatMap(entryTopics))].sort((a,b)=>Object.keys(SITUATIONS).indexOf(a)-Object.keys(SITUATIONS).indexOf(b));
  const filtered = entries.filter(e => (!level || e.level === level || e.levels?.some(item => item === level)) && (!topic || entryTopics(e).includes(topic)) && normalize([e.title,e.description,e.en,e.vi,e.formula,e.context,...entryTopics(e)].join(" ")).includes(normalize(query.trim())));
  const groups = topic ? [topic] : [...new Set(filtered.flatMap(e => [entryTopics(e)[0] ?? 'Tra cứu']))];
  function reset() { setQuery(''); setTopic(''); setLevel(''); setSelected(null); }
  return <div className="compact-reference">
    <div className="reference-toolbar"><label className="flex-1"><span className="sr-only">Tìm trong mục này</span><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Tìm từ, câu hoặc tình huống…" className="reference-search" /></label>{entries.some(e=>e.level) && <label><span className="sr-only">Lọc theo mức gợi ý</span><select value={level} onChange={e=>setLevel(e.target.value)} className="reference-search"><option value="">Tất cả mức</option>{['foundation','A1','A2','B1','B2','TOEIC','IELTS','extension'].map(l=><option value={l} key={l}>{l==='foundation'?'Nền tảng':l==='extension'?'Mở rộng':l}</option>)}</select></label>}</div>
    {topics.length > 0 && <div className="reference-topics" role="group" aria-label="Chọn chủ đề"><button type="button" aria-pressed={!topic} onClick={()=>setTopic('')}>Tất cả <span>{entries.length}</span></button>{topics.map(t=><button type="button" key={t} aria-pressed={topic===t} onClick={()=>{setTopic(t);setSelected(null);}}>{t} <span>{entries.filter(e=>entryTopics(e).includes(t)).length}</span></button>)}</div>}
    {topic && SITUATIONS[topic] && <p className="situation-note"><strong>{topic}</strong> · {SITUATIONS[topic]}</p>}
    <p role="status" className="reference-count">{filtered.length} mục phù hợp · Chọn một mục để xem cách dùng và nghe ví dụ.</p>
    {groups.map(group=>{
      const items = filtered.filter(e=>topic || (entryTopics(e)[0] ?? 'Tra cứu') === group);
      return <section key={group} className="reference-section" aria-label={group}><h2>{group} <span>{items.length}</span></h2>{!topic && SITUATIONS[group] && <p className="reference-group-note">{SITUATIONS[group]}</p>}<div className="compact-reference-grid">{items.map(entry=><article key={entry.id} className={`reference-item ${selected===entry.id?'is-open':''}`}><button type="button" className="reference-summary" aria-expanded={selected===entry.id} aria-controls={`detail-${entry.id}`} onClick={()=>setSelected(selected===entry.id?null:entry.id)}><span><strong>{entry.title}</strong>{entry.description!==entry.title && <span className="reference-meaning">{entry.description}</span>}</span><span className="reference-row-end">{entry.level && <small>{entry.level==='foundation'?'Nền tảng':entry.level==='extension'?'Mở rộng':entry.level}</small>}<span aria-hidden="true">{selected===entry.id?'−':'+'}</span></span></button>{selected===entry.id && <div className="reference-body" id={`detail-${entry.id}`}>{entry.context && <p className="reference-context"><strong>Dùng khi:</strong> {entry.context}</p>}{entry.formula && <p className="reference-formula">{entry.formula}</p>}{entry.en && <div className="reference-example"><SpeakButton text={entry.en} /><div><p className="font-semibold">{entry.en}</p>{entry.vi && <p className="text-sm text-slate-500">{entry.vi}</p>}</div></div>}{entry.levels && entry.levels.length>1 && <p className="reference-count">Có trong bài: {entry.levels.map(l=>l==='foundation'?'Nền tảng':l).join(' · ')}</p>}{entry.tip && <p className="reference-tip">{entry.tip}</p>}</div>}</article>)}</div></section>;
    })}
    {!filtered.length && <div className="learning-panel text-center"><h2>Chưa tìm thấy mục phù hợp.</h2><p className="mt-2 text-slate-500">Thử một từ ngắn hơn hoặc bỏ bộ lọc.</p><button type="button" onClick={reset} className="text-button mt-4">Xóa tìm kiếm và bộ lọc</button></div>}
  </div>;
}
