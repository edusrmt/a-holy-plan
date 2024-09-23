import nviChapters from '../data/nvi_chapters.json';

export function loadNviChapters(): Map<string, number[]> {
  // Convert JSON data to a Map
  const map = new Map<string, number[]>();
  for (const [key, value] of Object.entries(nviChapters)) {
    map.set(key, value);
  }

  return map;
}
