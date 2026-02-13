// // // // import {somarElementos, API_URL} from './utils.js'

// // // // const soma = somarElementos(1,2,3,4,5);

// // // // console.log(`A soma dos elementos é igual a: ${soma}`);
// // // // console.log(`Acessando API na pagina ${API_URL}`)

// // // const pessoa = {
// // //     nome: "Ana",
// // //     idade: 30,
// // //     cpf: '032484328-22'
// // // }

// // // const {nome, idade, cpf} = pessoa;

// // // console.log(nome);

// // // const vetor = [1,2,3,55,6]

// // // const [n1,n2,n3,n4,n5] = vetor

// // // console.log(n3)

// // const somarElementos = (...numeros) => {
// //     console.log(numeros)
// //     return numeros.reduce((total,atual)=> total + atual, 0);
// // }

// // console.log(somarElementos(1,2)); // 3
// // console.log(somarElementos(1,2,3)); // 3

// // const frutas = ['uva', 'maçã', 'melão', 'abacaxi'];

// // const [primeira, ...outras] = frutas

// // console.log(primeira)
// // console.log(outras)


// // const alunos = [
// //     {nome: "José Arnaldo", idade: 19, altura: '1,8'},
// //     {nome: "Erick", idade: 18, altura: '1,8 poucos'},
// // ]
// // const alunosCopia = alunos;

// // console.log(`Alunos: ${alunos}`);
// // console.log(`Copia: ${alunosCopia}`);

// // alunosCopia.push({nome: "Cristhian", idade: 22, altura:"1,82"})

// // console.log(`Alunos: ${alunos}`);
// // console.log(`Copia: ${alunosCopia}`);


// // const frutas = ['uva', 'maçã', 'melão', 'abacaxi'];
// // const copia = frutas;

// // console.log(`frutas: ${frutas}`);
// // console.log(`Copia: ${copia}`);

// // copia.push('Melancia');

// // console.log(`frutas: ${frutas}`);
// // console.log(`Copia: ${copia}`);

// const frutas = ['uva', 'maçã', 'melão', 'abacaxi'];
// const frutas2 = ['banana', 'morango']
// const copia = [...frutas, ...frutas2];

// console.log(`frutas: ${frutas}`);
// console.log(`Copia: ${copia}`);

// copia.push('Melancia');

// console.log(`frutas: ${frutas}`);
// console.log(`Copia: ${copia}`);

const alunos = [
    {nome: "José Arnaldo", idade: 19, altura: '1,8'},
    {nome: "Erick", idade: 18, altura: '1,8 poucos'},
]

// alunosCopia.push({nome: "Cristhian", idade: 22, altura:"1,82"})
const novo = {nome: "Cristhian", idade: 22, altura:"1,82"}

const novaLista = [...alunos, novo]