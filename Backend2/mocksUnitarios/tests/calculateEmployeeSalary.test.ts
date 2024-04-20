import { calculateEmployeeSalary, CalculateEmployeeSalaryInput } from "../src/calculateEmployeeSalary"

describe("Testing calculateEmployeeSalary", () => {
    //#region testes de valores inválidos
    test("Should return error message 'Missing Properties'", () => {
        try {
            //Criei um input para testar propriedade vazia
            const input: CalculateEmployeeSalaryInput = {
                employeeName: "",
                baseSalary: 12000,
                benefits: [1000, 2000],
                extraHours: 20
            }
            //Criar um mock para retornar um objeto com isValid: false
            const validatorMock = jest.fn(() => {
                return {
                    isValid: false,
                    errors: [
                        {
                            key: "employeeName",
                            value: ""
                        }
                    ]
                }
            });
            calculateEmployeeSalary(input, validatorMock as any)
        } catch (err) {
            expect(err.message).toContain("Missing Properties")
        }finally {
            expect.assertions(1)
        }
    })

    test("Should return error message 'Invalid BaseSalary'", () => {
        try {
            //Criei um input para testar propriedade vazia
            const input: CalculateEmployeeSalaryInput = {
                employeeName: "Flavio",
                baseSalary: -12000,
                benefits: [1000, 2000],
                extraHours: 20
            }
            //Criar um mock para retornar um objeto com isValid: false
            const validatorMock = jest.fn(() => {
                return {
                    isValid: true,
                    errors: []
                }
            });
            calculateEmployeeSalary(input, validatorMock as any)
        } catch (err) {
            expect(err.message).toContain("Invalid BaseSalary")
        }finally {
            expect.assertions(1)
        }
    })

    test("Should return error message 'Invalid Benefit'", () => {
        try {
            //Criei um input para testar propriedade vazia
            const input: CalculateEmployeeSalaryInput = {
                employeeName: "Flavio",
                baseSalary: 12000,
                benefits: [1000, -2000],
                extraHours: 20
            }
            //Criar um mock para retornar um objeto com isValid: false
            const validatorMock = jest.fn(() => {
                return {
                    isValid: true,
                    errors: []
                }
            });
            calculateEmployeeSalary(input, validatorMock as any)
        } catch (err) {
            expect(err.message).toContain("Invalid Benefit")
        }finally {
            expect.assertions(1)
        }
    })

    test("Should return error message 'Invalid ExtraHours'", () => {
        try {
            //Criei um input para testar propriedade vazia
            const input: CalculateEmployeeSalaryInput = {
                employeeName: "Flavio",
                baseSalary: 12000,
                benefits: [1000, 2000],
                extraHours: -20
            }
            //Criar um mock para retornar um objeto com isValid: false
            const validatorMock = jest.fn(() => {
                return {
                    isValid: true,
                    errors: []
                }
            });
            calculateEmployeeSalary(input, validatorMock as any)
        } catch (err) {
            expect(err.message).toContain("Invalid ExtraHours")
        }finally {
            expect.assertions(1)
        }
    })
    //#endregion

    
    test("Should return 14000", () => {
        try {
            //Criei um input para testar propriedade vazia
            const input: CalculateEmployeeSalaryInput = {
                employeeName: "Flaivo",
                baseSalary: 12000,
                benefits: [1000, 500],
                extraHours: 500
            }
            //Criar um mock para retornar um objeto com isValid: false
            const validatorMock = jest.fn(() => {
                return {
                    isValid: true,
                    errors: []
                }
            });

            const result = calculateEmployeeSalary(input, validatorMock as any)
            expect(result).toBe(14000)
            expect(validatorMock).toHaveBeenCalledTimes(1)
            expect(validatorMock).toHaveBeenCalledWith(input)
        } catch (err) {
            expect(err.message).toContain("Invalid ExtraHours")
        }finally {
            expect.assertions(3)
        }
    })
})