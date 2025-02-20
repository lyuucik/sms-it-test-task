import JsFolder from "./intefaces/JsFolder";

export default function splitIntoChunks(arr: JsFolder[], N: number): JsFolder[][] {
  if (N <= 0) {
    throw new Error('N must be more 0');
  }

  const sorted = [...arr].sort((a, b) => b.count - a.count);
  const chunks: JsFolder[][] = [...Array(N)].map(() => []);
  const sums: number[] = Array(N).fill(0);

  for (const item of sorted) {
    let minIndex = 0;
    let minSum = sums[0];

    // определяем чанк с мин суммой
    for (let i = 1; i < N; i++) {
      if (sums[i] < minSum) {
        minSum = sums[i];
        minIndex = i;
      }
    }

    chunks[minIndex].push(item);
    sums[minIndex] += item.count;
  }

  return chunks.map(chunk => chunk.sort((a, b) => a.path.localeCompare(b.path)));
}