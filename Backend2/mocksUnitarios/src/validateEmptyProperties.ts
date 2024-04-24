
 //Objetos com (String vazia, number = 0, null, undefined, {name: "Flavio", idade:0})
export const validateEmptyProperties = (
    input: any
 ): ValidateEmptyPropertiesOutput => {
    {let errors: ValidateEmptyPropertiesError[] = [];
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
 };}
 
 export interface ValidateEmptyPropertiesOutput {
    isValid: boolean;
    errors: ValidateEmptyPropertiesError[];
 }
 
 interface ValidateEmptyPropertiesError {
    key: string;
    value: string;
 }
 
/* validateEmptyProperties({
   name: "",
   age: 0,
   email:"Flavio@lab.com"
})

{
   isValid: false
   errors: [
      {
         key: "name",
         value: ""
      },
      {
         key: "age",
         value: 0
      }
   ]
}


*/