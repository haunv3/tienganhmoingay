"use client";

import { useProgress, hasStudiedToday } from "@/lib/progress";

// Huy hiệu chuỗi ngày học liên tiếp.
// useProgress trả về dữ liệu mặc định ở lần render đầu (SSR/hydration)
// rồi tự cập nhật từ localStorage — không lệch hydration.
export default function StreakBadge() {
  const progress = useProgress();
  const todayDone = hasStudiedToday() && progress.lastDate !== null;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-sm font-bold text-amber-800">
      🔥 {progress.streak} ngày
      <span className="font-medium text-amber-600">
        {todayDone ? "· hôm nay đã học ✓" : "· chưa học hôm nay"}
      </span>
    </span>
  );
}
