import Image from "next/image";
import type { Lesson } from "@/lib/types";
export default function LessonMaterials({lesson}:{lesson:Lesson}) {
  return <>{lesson.visual && <figure className="learning-panel mb-5"><Image unoptimized src={lesson.visual.src} alt={lesson.visual.alt} width={800} height={420} className="w-full h-auto rounded-xl" /><figcaption className="text-xs text-slate-500 mt-3">{lesson.visual.caption}</figcaption></figure>}{lesson.table && <div className="learning-panel mb-5 overflow-x-auto"><table className="lesson-table"><caption>{lesson.table.caption}</caption><thead><tr>{lesson.table.headers.map(header=><th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{lesson.table.rows.map((row,i)=><tr key={i}>{row.map((cell,j)=>j===0?<th key={j} scope="row">{cell}</th>:<td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>}</>;
}
