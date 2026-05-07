import express, {Request, Response } from 'express';
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

export let pedidos = [
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

// Exercício 6: Remover todos pedidos de um determinado cliente que contenham produtos de uma determinada categoria
// Exemplo de uso: DELETE http://localhost:3000/pedidos/1/categoria/1 (removeria pedidos de 'Leonardo' com 'Doces')
app.delete('/pedidos/:idCliente/categoria/:idCategoria', (req : Request, res: Response) => {
    // Passo 1: Capturar os parâmetros de rota `idCliente` e `idCategoria`.
    // Lembre-se de convertê-los para números, pois eles vêm como strings.

    // Passo 2: (Opcional, mas recomendado) Validar se os IDs são números válidos.
    // Se não forem, retorne um erro 400 (Bad Request).

    // Passo 3: Encontrar todos os IDs de produtos que pertencem à categoria especificada.
    // Você vai precisar filtrar o array `produtos` e extrair os `id`s.

    // Passo 4: Identificar os IDs de todos os pedidos que devem ser removidos.
    // Um pedido deve ser removido se:
    // a) Pertence ao `idCliente` informado.
    // b) Contém na sua lista de `produtos` pelo menos um dos IDs de produto encontrados no Passo 3.

    // Passo 5: Atualizar o array `pedidos`.
    // Use o método `filter` para criar um novo array de pedidos, mantendo apenas aqueles
    // cujos IDs NÃO estão na lista de remoção criada no Passo 4.

    // Passo 6: Enviar uma resposta de sucesso.
    // Pode ser uma mensagem confirmando a remoção e, opcionalmente,
    // a lista de pedidos atualizada.
    res.status(501).json({ message: 'Endpoint não implementado.' });
});





// app.delete('/pedidos/:idCliente/categoria/:idCategoria', (req, res) => {
//     const { idCliente, idCategoria } = req.params;
//     const clienteId = parseInt(idCliente);
//     const categoriaId = parseInt(idCategoria);

//     // Validação básica dos IDs
//     if (isNaN(clienteId) || isNaN(categoriaId)) {
//         return res.status(400).json({ message: 'IDs de cliente e categoria devem ser números válidos.' });
//     }

//     // 1. Encontrar todos os IDs de produtos que pertencem à categoria especificada.
//     const produtosDaCategoriaIds = produtos
//         .filter(produto => produto.categorias.includes(categoriaId))
//         .map(produto => produto.id);

//     if (produtosDaCategoriaIds.length === 0) {
//         return res.status(404).json({ message: 'Nenhum produto encontrado para esta categoria.' });
//     }

//     // 2. Identificar os IDs dos pedidos que devem ser removidos.
//     // Um pedido é removido se ele pertence ao cliente E contém pelo menos um produto da categoria.
//     const idsDosPedidosARemover = new Set();
//     pedidos.forEach(pedido => {
//         if (pedido.cliente === clienteId) {
//             const temProdutoDaCategoria = pedido.produtos.some(produtoId => produtosDaCategoriaIds.includes(produtoId));
//             if (temProdutoDaCategoria) {
//                 idsDosPedidosARemover.add(pedido.id);
//             }
//         }
//     });
    
//     // Se nenhum pedido correspondeu aos critérios, informa o usuário.
//     if (idsDosPedidosARemover.size === 0) {
//         return res.status(404).json({ message: 'Nenhum pedido encontrado para este cliente com produtos da categoria especificada.' });
//     }

//     const totalPedidosAntes = pedidos.length;

//     // 3. Filtrar a lista de pedidos, mantendo apenas aqueles cujo ID NÃO está na lista de remoção.
//     pedidos = pedidos.filter(pedido => !idsDosPedidosARemover.has(pedido.id));

//     const totalPedidosRemovidos = totalPedidosAntes - pedidos.length;

//     // 4. Retornar a resposta com sucesso.
//     res.status(200).json({
//         message: `${totalPedidosRemovidos} pedido(s) do cliente ${clienteId} com produtos da categoria ${categoriaId} foram removidos com sucesso.`,
//         pedidosRestantes: pedidos
//     });
// });

app.listen(3000, () => console.log('API on http://localhost:3000'));

