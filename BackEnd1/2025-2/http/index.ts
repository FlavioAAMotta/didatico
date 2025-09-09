import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// MVC
// index.ts -> inicia o servidor e o app
// PedidosRoutes.ts -> Aqui entram apenas o roteamento
// PedidosController.ts -> Pega dados da req e envia para a o método correspondente da camada de business
// PedidosBusiness.ts -> Validação, verificação, regras de negócio e chamada dos métodos da camada de model
// PedidosModel.ts -> queries (no caso serão acessos direto aos vetores do bd, funções de vetores)
// bd.ts -> Vetores (lembrando de exportar)

const clientes = [
  {id: 1, nome: 'Leonardo'},
  {id: 2, nome: 'Phillipe'},
  {id: 3, nome: 'Pablo'},
  {id: 4, nome: 'Ana'},
  {id: 5, nome: 'Marina'},
  {id: 6, nome: 'Carlos'}
]

export const pedidos = [
  // id, name = cliente, produtos = ids dos produtos
  { id: 1, cliente: 1, produtos: [1, 2] },
  { id: 2, cliente: 2, produtos: [3] },
  { id: 3, cliente: 3, produtos: [2, 3] },
  { id: 4, cliente: 4, produtos: [4] },
  { id: 5, cliente: 3, produtos: [5, 2, 1] },
  { id: 6, cliente: 1, produtos: [3] },
  { id: 7, cliente: 5, produtos: [2] },
  { id: 8, cliente: 4, produtos: [2, 4] },
  { id: 9, cliente: 6, produtos: [6] },
];

const produtos = [
  // id, nome, categorias (strings)
  { id: 1, nome: 'Chocolate Ate', categorias: [1, 2] },
  { id: 2, nome: 'Chiclete Doido', categorias: [2, 3] },
  { id: 3, nome: 'Bala Encontrada', categorias: [2, 4] },
  { id: 4, nome: 'Amendoim Crocante', categorias: [5] },
  { id: 5, nome: 'Pimenta Turbo', categorias: [3] },
  { id: 6, nome: 'Água com Gás', categorias: [6, 4] },
];

const categoria = [
  {id: 1, nome:'Doces'},
  {id: 2, nome:'Guloseimas'},
  {id: 3, nome:'Apimentados'},
  {id: 4, nome:'Refrescantes'},
  {id: 5, nome:'Salgados'},
  {id: 6, nome:'Bebidas'},
]

// Hello, Express!
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


// Exercício 1: Retornar os produtos comprados por um cliente em específico

// Exercício 2: Retornar os clientes que compraram produtos de uma categoria em específico

//Exercício 3: Retornar os clientes com apenas um item no pedido

//Exercício 4: Retornar um relatório por cliente: total de pedidos, itens distintos e categorias distintas

//Exercício 5: Retornar produtos que contenham um trecho de uma busca em suas categorias (com query params)

//Exercicio 6: Remover todos pedidos de um determinado cliente de uma determinada categoria
//Exemplo, remover todos doces de Leonardo
// '/pedidos/:idCliente/categoria/:idCategoria'

app.listen(3000, () => console.log('API on http://localhost:3000'));

