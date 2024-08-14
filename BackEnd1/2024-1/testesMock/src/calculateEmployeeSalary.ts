import {
    validateEmptyProperties,
    ValidateEmptyPropertiesOutput,
} from "./validateEmptyProperties";


export interface CalculateEmployeeSalaryInput {
    employeeName: string;
    baseSalary: number;
    benefits: number[];
    extraHours: number;
}


export const calculateEmployeeSalary = (
    input: CalculateEmployeeSalaryInput,
    validator: (input: any) => ValidateEmptyPropertiesOutput
) => {
    const validationResult: ValidateEmptyPropertiesOutput = validator(input);
    if (!validationResult.isValid) {
        throw new Error("Missing Properties");
    }

    if (input.baseSalary < 0) {
        throw new Error("Invalid BaseSalary");
    }

    let fullSalary = input.baseSalary;

    for (const benefit of input.benefits) {
        if (benefit < 0) {
            throw new Error("Invalid Benefit");
        }
        fullSalary += benefit;
    }

    if (input.extraHours < 0) {
        throw new Error("Invalid ExtraHours");
    }

    fullSalary += input.extraHours;

    return fullSalary;
};
/*let fravo: CalculateEmployeeSalaryInput = {
    employeeName: "Fravo",
    baseSalary: 1200,
    benefits: [100, 50],
    extraHours: 50
}*/

//Essa seria a execução normal da função
//calculateEmployeeSalary(fravo, validateEmptyProperties)// -> 1400
