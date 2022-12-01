type Cliente = {
    id: number | string,
    nome: string,
    email: string,
    telefone: string | undefined
}


type Professor ={
    nome: string,
    salario: number,
    disciplinas: string
}

type Coordenador = {
    nome: string,
    salario: string,
    curso: string
}

type funcionario ={
    cargo: Coordenador | Professor 
}

enum cargo{
    ADMIN = "admin",
    NORMAL = "normal"
}

type usuario = {
    email:string,
    senha: string,
    cargo: cargo
}

const user1: usuario ={
    email: "",
    senha: "",
    cargo: cargo.NORMAL
} 
















const aluno1 : Aluno = {
    nome: "Flávio",
    matricula: "123",
    altura: 1.8
}

function imprimeNascimento(nome: string, nascimento: string): void {
    console.log(`Olá, meu nome é ${nome}, e nasci no dia ${nascimento}`)
}

function calculaSalario(salarioBase:number, bonus:boolean) : number{
    let salarioFinal = 0;
    salarioFinal += salarioBase;
    if(bonus){
        salarioFinal *= 1.1
    }
    return salarioFinal
}

function imprimeSalario(nome:string, salarioBase:number, bonus:boolean): void{

}