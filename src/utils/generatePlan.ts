import { loadNviChapters } from './loadNviChapters';

function linearPartition(numPartitions: number, arr: number[]): number[][] {
  const arrLength = arr.length;
  const dp: number[][] = Array.from({ length: arrLength + 1 }, () =>
    Array(numPartitions + 1).fill(0)
  );
  const partitionIndex: number[][] = Array.from({ length: arrLength + 1 }, () =>
    Array(numPartitions + 1).fill(0)
  );

  // DP base case
  let cumulativeSum = 0;
  for (let i = 1; i <= arrLength; i++) {
    cumulativeSum += arr[i - 1];
    dp[i][1] = cumulativeSum * cumulativeSum;
    partitionIndex[i][1] = 0;
  }

  // DP recurrence
  for (let j = 2; j <= numPartitions; j++) {
    dp[0][j] = partitionIndex[0][j] = 0;
    for (let i = 1; i <= arrLength; i++) {
      cumulativeSum = 0;
      dp[i][j] = dp[i][j - 1];
      partitionIndex[i][j] = i;
      for (let k = i - 1; k >= 0; k--) {
        cumulativeSum += arr[k];
        const cost = dp[k][j - 1] + cumulativeSum * cumulativeSum;
        if (dp[i][j] > cost) {
          dp[i][j] = cost;
          partitionIndex[i][j] = k;
        }
      }
    }
  }

  // Extract best partitions
  const partitions: number[][] = [];
  let i = arrLength;
  let j = numPartitions;

  while (j > 0) {
    const k = partitionIndex[i][j];
    partitions.push(arr.slice(k, i));
    i = k;
    j -= 1;
  }

  return partitions.reverse();
}

// Function to capitalize the first letter of the first word in a book name
function capitalizeBookAbbrev(abbrev: string): string {
  // Regular expression for matching letters
  const letterRegex = /[a-zA-Z]/;
  const match = letterRegex.exec(abbrev);

  if (match) {
    const index = match.index;

    return (
      abbrev.substring(0, index) +
      abbrev[index].toUpperCase() +
      abbrev.substring(index + 1)
    );
  }
  return abbrev;
}

// Binary search to find the leftmost index where the element should be inserted to maintain sorted order
function binarySearchLeft(array: number[], value: number): number {
  let low = 0;
  let high = array.length;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (array[mid] < value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}

// Main function to generate reading plan
export default function generatePlan(days: number, books: string[]): string[] {
  const wordCount = loadNviChapters();

  const wordCounts: number[] = [];
  const chaptersPerBook: number[] = [0];

  let totalChapters = 0;
  for (const book of books) {
    const chapters = wordCount.get(book);
    if (chapters) {
      wordCounts.push(...chapters);
      totalChapters += chapters.length;
      chaptersPerBook.push(totalChapters);
    } else {
      console.warn(`No data found for book: ${book}`);
    }
  }

  const myPlan = linearPartition(days, wordCounts);
  const capitalizedBooks = books.map(capitalizeBookAbbrev);

  const holyPlan: string[] = [];

  let chapters = 0;
  const wordsPerDay: number[] = [];
  const chaptersPerDay: number[] = [];

  myPlan.forEach((day) => {
    const numWords = day.reduce((a, b) => a + b, 0);
    wordsPerDay.push(numWords);
    chaptersPerDay.push(day.length);

    const startChapter = chapters + 1;
    const endChapter = chapters + day.length;
    const startBookIndex = binarySearchLeft(chaptersPerBook, startChapter);
    const endBookIndex = binarySearchLeft(chaptersPerBook, endChapter);

    const dailyReading: string[] = [];
    for (let book = startBookIndex; book <= endBookIndex; book++) {
      const initialChapter = Math.max(
        startChapter - chaptersPerBook[book - 1],
        1
      );
      const finalChapter = Math.min(chaptersPerBook[book], endChapter);

      if (initialChapter === finalChapter - chaptersPerBook[book - 1]) {
        dailyReading.push(`${capitalizedBooks[book - 1]} ${initialChapter}`);
      } else {
        dailyReading.push(
          `${capitalizedBooks[book - 1]} ${initialChapter}-${
            finalChapter - chaptersPerBook[book - 1]
          }`
        );
      }
    }

    holyPlan.push(dailyReading.join('; '));

    chapters += day.length;
  });

  return holyPlan;
}
