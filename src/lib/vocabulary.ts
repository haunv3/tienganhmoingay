import type { Vocab } from "./types";
// Keep distinct meanings apart: book (a book) and book (reserve a room).
export function vocabularyId(vocab: Pick<Vocab, "en" | "vi">): string {
  return `${vocab.en.trim().toLowerCase()}::${vocab.vi.trim().toLowerCase()}`;
}
