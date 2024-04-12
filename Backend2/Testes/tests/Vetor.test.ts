import { Vetor } from '../src/Vetor';

describe('Vetor', () => {
    let vetor: Vetor;
    beforeEach(() => {
        vetor = new Vetor();
    });
    it('deve somar os elementos do vetor', () => {
        vetor.adicionar(1);
        vetor.adicionar(2);
        expect(vetor.somarVetor()).toEqual(3);
    });
    it('deve buscar o maior elemento do vetor', () => {
        vetor.adicionar(1);
        vetor.adicionar(2);
        vetor.adicionar(3);
        expect(vetor.buscarMaior()).toEqual(3);
    });
    it('deve buscar a média dos elementos do vetor', () => {
        vetor.adicionar(1);
        vetor.adicionar(2);
        vetor.adicionar(3);
        expect(vetor.buscarMedia()).toEqual(2);
    });
});