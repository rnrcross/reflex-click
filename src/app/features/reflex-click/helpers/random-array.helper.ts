export  function getRandomArray(length: number, limit: number): number[] {
  const randomSet = new Set<number>();

  while (randomSet.size < length) {
    const randomNumber = Math.floor(Math.random() * limit);

    randomSet.add(randomNumber);
  }

  return Array.from(randomSet);
}
