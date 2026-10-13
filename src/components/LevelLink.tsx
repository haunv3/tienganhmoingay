"use client";
import Link from "next/link";
import { useLearningLevel } from "@/lib/learning-level";
import type { LearningLevel } from "@/lib/types";
export default function LevelLink({level, className, children}:{level:LearningLevel;className?:string;children:React.ReactNode}) {
  const [, setLevel] = useLearningLevel();
  return <Link href="/lo-trinh" onClick={() => setLevel(level)} className={className}>{children}</Link>;
}
