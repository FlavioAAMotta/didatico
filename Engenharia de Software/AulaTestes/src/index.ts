export const isEven = (n: number): boolean => {
  if (n !== 0 && !n) {
    throw new Error("Invalid number");
  }
  const mod = n % 2;
  if (mod == 0) {
    return true;
  } else {
    return false;
  }
};
