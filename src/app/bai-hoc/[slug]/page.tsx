import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLesson, LESSONS } from "@/lib/lessons";
import LessonView from "@/components/LessonView";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
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

  const index = LESSONS.findIndex((l) => l.slug === slug);
  const next = LESSONS[index + 1];

  return <LessonView lesson={lesson} nextSlug={next?.slug ?? null} />;
}
