import { isEven } from "../src/isEven";

test('isEven should return true for even numbers', () => {
  expect(isEven(2)).toBe(true);
  expect(isEven(4)).toBe(true);
  expect(isEven(6)).toBe(true);
  expect(isEven(8)).toBe(true);
});

test('isEven should return false for odd numbers', () => {
  expect(isEven(1)).toBe(false);
  expect(isEven(3)).toBe(false);
  expect(isEven(5)).toBe(false);
  expect(isEven(7)).toBe(false);
});