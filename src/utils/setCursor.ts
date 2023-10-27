export const setCursor = (cursor: string) => {
  const content = document.getElementById("content");
  if (!content) return;
  content.style.cursor = cursor;
};
