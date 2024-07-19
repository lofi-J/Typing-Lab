export const converMsToMinSec = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor(ms % 60000 / 1000);
  
  return {minutes, seconds};
}

export const calculateAccuracy = (totalCount: number, mistake: number) => {
  if (totalCount === 0) return 0;
  
  const accuracy = ((totalCount - mistake) / totalCount) * 100;
  return Math.round(accuracy);
}