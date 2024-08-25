export const convertTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor((timeInSeconds % 3600) % 60);
  return `${hours > 0 ? hours.toString().padStart(2, "0") + ":" : ""}${
    minutes > 0 ? minutes.toString().padStart(2, "0") + ":" : ""
  }${seconds.toString().padStart(2, "0")}`;
};

export const formatTime = (millis: number): string => {
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
