import {
  calculateEmployeeSalary,
  CalculateEmployeeSalaryInput,
} from "../src/calculateEmployeeSalary";

describe("Teste unitário da função de calculo de salário", () => {
  test("Deve retornar 'Missing Properties'", () => {
    try {
      const input: CalculateEmployeeSalaryInput = {
        employeeName: "",
        baseSalary: 55000,
        benefits: [2500, 500],
        extraHours: 2000,
      };

      const validatorMock = jest.fn(() => {
        return {
          isValid: false,
          errors: [
            {
              key: "employeeName",
              value: "",
            },
          ],
        };
      });

      calculateEmployeeSalary(input, validatorMock);
    } catch (error) {
      expect(error.message).toContain("Missing Properties");
    } finally {
      expect.assertions(1);
    }
  });
  test("Deve retornar 'Invalid BaseSalary'", () => {
    try {
      const input: CalculateEmployeeSalaryInput = {
        employeeName: "Flavio",
        baseSalary: -55000,
        benefits: [2500, 500],
        extraHours: 2000,
      };

      const validatorMock = jest.fn(() => {
        return {
          isValid: true,
          errors: [],
        };
      });
      calculateEmployeeSalary(input, validatorMock);
    } catch (error) {
      expect(error.message).toContain("Invalid BaseSalary");
    } finally {
      expect.assertions(1);
    }
  });
  test("Deve retornar 'Invalid Benefit'", () => {
    try {
      const input: CalculateEmployeeSalaryInput = {
        employeeName: "Flavio",
        baseSalary: 55000,
        benefits: [2500, -500],
        extraHours: 2000,
      };

      const validatorMock = jest.fn(() => {
        return {
          isValid: true,
          errors: [],
        };
      });
      calculateEmployeeSalary(input, validatorMock);
    } catch (error) {
      expect(error.message).toContain("Invalid Benefit");
    } finally {
      expect.assertions(1);
    }
  });
  test("Deve retornar 'Invalid ExtraHours'", () => {
    try {
      const input: CalculateEmployeeSalaryInput = {
        employeeName: "Flavio",
        baseSalary: 55000,
        benefits: [2500, 500],
        extraHours: -2000,
      };

      const validatorMock = jest.fn(() => {
        return {
          isValid: true,
          errors: [],
        };
      });
      calculateEmployeeSalary(input, validatorMock);
    } catch (error) {
      expect(error.message).toContain("Invalid ExtraHours");
    } finally {
      expect.assertions(1);
    }
  });
  test("Deve retornar 60000", () => {
    try {
      const input: CalculateEmployeeSalaryInput = {
        employeeName: "Flavio",
        baseSalary: 55000,
        benefits: [2500, 500],
        extraHours: 2000,
      };

      const validatorMock = jest.fn(() => {
        return {
          isValid: true,
          errors: [],
        };
      });
      const result = calculateEmployeeSalary(input, validatorMock);
      expect(result).toBe(60000)
      expect(validatorMock).toHaveBeenCalledTimes(1)
      expect(validatorMock).toHaveBeenCalledWith(input)
    } catch (error) {
      
    }
  });
});
