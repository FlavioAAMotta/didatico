export const validateEmptyProperties = (
    input: any
 ): ValidateEmptyPropertiesOutput => {
    {let errors: validateEmptyPropertiesError[] = [];
    for (const field in input) {
       if (input[field] !== false && !input[field]) {
          errors.push({
            field,
             value: input[field],
          });
       }
    }
 
    return {
       isValid: errors.length === 0,
       errors,
    };
 };}


export interface ValidateEmptyPropertiesOutput {
    isValid: boolean;
    errors: validateEmptyPropertiesError[];
}

interface validateEmptyPropertiesError {
    field: string;
    value: string;
}