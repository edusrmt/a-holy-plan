import { loadNviChapters } from './loadNviChapters';

export function getChaptersCount(books: string[]) {
  const nviChapters = loadNviChapters();
  const chaptersCount = books.map((book) => nviChapters.get(book)?.length ?? 0);

  return chaptersCount.reduce((a, b) => a + b, 0);
}
