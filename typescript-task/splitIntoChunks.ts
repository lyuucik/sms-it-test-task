import JsFolder from "./JsFolder";

export default function splitIntoChunks(arr: JsFolder[], N: number): JsFolder[][] {
  if (N <= 0) {
    throw new Error('N должно быть больше 0');
  }

  const sorted = [...arr].sort((a, b) => b.count - a.count);
  const chunks: JsFolder[][] = Array.from({ length: N }, () => []);
  const sums: number[] = Array(N).fill(0);

  for (const item of sorted) {
    let minIndex = 0;
    let minSum = sums[0];
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