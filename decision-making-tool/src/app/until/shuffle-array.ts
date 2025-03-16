export function shuffleArray<T>(array: T[]): T[] {
  const shuffleArray: T[] = [...array];
  for (let index: number = shuffleArray.length - 1; index > 0; index--) {
    const k: number = Math.floor(Math.random() * (index + 1));
    [shuffleArray[index], shuffleArray[k]] = [
      shuffleArray[k],
      shuffleArray[index],
    ];
  }
  return shuffleArray;
}
