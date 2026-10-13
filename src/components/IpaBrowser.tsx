"use client";
import { useState } from "react";
import type { ReferenceEntry } from "@/lib/library";
import SpeakButton from "./SpeakButton";

const normalise = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
export default function IpaBrowser({ entries }: { entries: ReferenceEntry[] }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const groups = [...new Set(entries.map(entry => entry.topic).filter((topic): topic is string => Boolean(topic)))];
  const filtered = entries.filter(entry => (!group || entry.topic === group) && normalise(`${entry.title} ${entry.en} ${entry.topic}`).includes(normalise(query.trim())));
  const selected = filtered.find(entry => entry.id === selectedId);
  return <div className="ipa-browser">
    <div className="ipa-toolbar"><label className="flex-1"><span className="sr-only">Tìm âm IPA hoặc từ ví dụ</span><input type="search" className="reference-search" placeholder="Tìm âm hoặc từ ví dụ…" value={query} onChange={event => setQuery(event.target.value)} /></label><p role="status" className="text-xs text-slate-500">{filtered.length} / {entries.length} âm</p></div>
    <div role="group" aria-label="Lọc nhóm âm IPA" className="ipa-filters">{["",...groups].map(topic => <button type="button" key={topic} onClick={() => setGroup(topic)} aria-pressed={group === topic} className={group === topic ? "ipa-filter active" : "ipa-filter"}>{topic || "Tất cả"}</button>)}</div>
    {groups.map((topic, groupIndex) => {
      const detailId = `ipa-detail-${groupIndex}`;
      const sounds = filtered.filter(entry => entry.topic === topic);
      if (!sounds.length) return null;
      const detail = selected?.topic === topic ? selected : undefined;
      return <section className="ipa-group" aria-label={topic} key={topic}><div className="ipa-group-heading"><h2>{topic}</h2><span>{sounds.length} âm</span></div>
        <div className="ipa-grid">{sounds.map(entry => <button type="button" key={entry.id} className={selectedId === entry.id ? "ipa-tile selected" : "ipa-tile"} aria-label={`Âm ${entry.title}, ví dụ ${entry.en}`} aria-expanded={selectedId === entry.id} aria-controls={selectedId === entry.id ? detailId : undefined} onClick={() => setSelectedId(selectedId === entry.id ? null : entry.id)}><span className="ipa-symbol">{entry.title}</span><span className="ipa-example-word">{entry.en}</span></button>)}</div>
        {detail && <div id={detailId} className="ipa-detail" role="region" aria-label={`Chi tiết âm ${detail.title}`}><div className="ipa-detail-top"><div><span className="ipa-symbol">{detail.title}</span><span className="font-semibold ml-3">{detail.en}</span></div><div className="flex items-center gap-2">{detail.en && <SpeakButton text={detail.en} />}<button type="button" className="ipa-close" onClick={() => setSelectedId(null)} aria-label="Đóng chi tiết âm">×</button></div></div><p>{detail.tip || detail.description}</p></div>}
      </section>;
    })}
    {!filtered.length && <div className="ipa-empty"><p>Chưa tìm thấy âm phù hợp.</p><button type="button" className="text-button mt-3" onClick={() => {setQuery("");setGroup("");}}>Xóa tìm kiếm và bộ lọc</button></div>}
    <p className="text-xs text-slate-500 mt-5">Chọn một ô để xem hướng dẫn và nghe từ ví dụ.</p>
  </div>;
}
