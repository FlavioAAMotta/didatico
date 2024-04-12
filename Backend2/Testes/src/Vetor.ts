export class Vetor{
    private vetor: number[];
    private tamanho: number;
    constructor(){
        this.vetor = [];
        this.tamanho = 0;
    }

    public adicionar(numero: number): void{
        this.vetor[this.tamanho++] = numero;
    }

    public imprimir(): void{
        console.log(this.vetor);
    }

    public somarVetor(): number{
        let soma: number = 0;
        for(let i = 0; i < this.vetor.length; i++){
            soma += this.vetor[i];
        }
        return soma;
    }

    public buscarMaior(): number{
        let maior: number = this.vetor[0];
        for(let i = 1; i < this.vetor.length; i++){
            if(this.vetor[i] > maior){
                maior = this.vetor[i];
            }
        }
        return maior;
    }

    public buscarMedia(): number{
        let soma: number = 0;
        for(let i = 0; i < this.vetor.length; i++){
            soma += this.vetor[i];
        }
        return soma / this.vetor.length;
    }
}