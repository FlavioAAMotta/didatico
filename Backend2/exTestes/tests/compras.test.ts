import { performPurchase } from "../src/compras";
import { User } from "../src/User";

test("Testing balance greater than value", () => {
  const user: User = {
    name: "Fravo",
    balance: 100,
  };

  const result = performPurchase(user, 40);

  expect(result).toEqual({
    name: "Fravo",
    balance: 60,
  });
});
test("Testing balance greater than value", () => {
  const user: User = {
    name: "Fravo",
    balance: 50,
  };

  const result = performPurchase(user, 50);

  expect(result).toEqual({
    ...user,
    balance: 0,
  });
});
test("Testing balance greater than value", () => {
  const user: User = {
    name: "Fravo",
    balance: 30,
  };

  const result = performPurchase(user, 50);

  expect(result).not.toBeDefined();
});
