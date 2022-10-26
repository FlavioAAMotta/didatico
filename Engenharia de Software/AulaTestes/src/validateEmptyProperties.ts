// Objetos com (string vazia, number = 0, null, undefined, {name:"Flabio", idade:0})

export const validateEmptyProperties = (
  input: any
): ValidateEmptyPropertiesOutput => {
  {
    let errors: ValidateEmptyPropertiesError[] = [];
    for (const key in input) {
      if (input[key] !== false && !input[key]) {
        errors.push({
          key,
          value: input[key],
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
};

export interface ValidateEmptyPropertiesOutput {
  isValid: boolean;
  errors: ValidateEmptyPropertiesError[];
}

interface ValidateEmptyPropertiesError {
  key: string;
  value: string;
}

/* 
validateEmptyProperties({name:"", age:0, email:"flabio@fla.com"})
const input: CalculateEmployeeSalaryInput={
                employeeName: "",
                baseSalary: 55000,
                benefits: [2500,500],
                extraHours: 2000
            }
{
   isValid: false, 
    errors: [
        {
            key: "employeeName"
            value: ""
        }
    ]
}
*/
