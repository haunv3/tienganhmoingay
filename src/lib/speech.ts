// Đọc to từ tiếng Anh bằng Web Speech API (miễn phí, có sẵn trong trình duyệt).

export function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  // Đọc chậm hơn bình thường để người mới nghe rõ từng âm
  utter.rate = 0.85;
  const voice = window.speechSynthesis
    .getVoices()
    .find((v) => v.lang.startsWith("en"));
  if (voice) utter.voice = voice;
  window.speechSynthesis.speak(utter);
}
