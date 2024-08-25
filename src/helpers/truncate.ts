export const truncate = (string: string, length = 30) => {
  return string?.length > length ? string.slice(0, length) + "..." : string;
};
