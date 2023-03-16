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

function isEqual(a: any, b: any): string {
  if(a === b){
    return "true";
  }else if (a !== b){
    return "false";
  }
  if(a == b){
    return "Igual mas diferente"
  }
  return "Não sei o que dizer"
}

describe("Testes unitários da funcao isEqual", () => {
  
})