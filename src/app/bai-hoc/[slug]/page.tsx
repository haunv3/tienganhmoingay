import type { Metadata } from "next";
import { COURSE_LESSONS, nextLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";
import { getLesson, LESSONS } from "@/lib/lessons";
import LessonView from "@/components/LessonView";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [...COURSE_LESSONS, ...LESSONS].map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  return { title: lesson ? `${lesson.title} — Tiếng Anh Mỗi Ngày` : "Bài học" };
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const collection = COURSE_LESSONS.some(l => l.slug === slug) ? COURSE_LESSONS : LESSONS;
  const index = collection.findIndex((l) => l.slug === slug);
  const next = lesson.level ? nextLesson(slug) : collection[index + 1];

  return <LessonView key={lesson.slug} lesson={lesson} nextSlug={next?.slug ?? null} />;
}
