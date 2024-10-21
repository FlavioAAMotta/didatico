import express, { Request, Response } from 'express';
import cors from 'cors';
import { produtos } from './data';
import { Produto } from './produto';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/produtos', (req: Request, res: Response) => {
    return res.status(200).send(produtos);
})

app.put('/produtos/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    let price = req.body.price;

    const index = produtos.findIndex((produto)=>{
        return produto.id == id;
    })
    produtos[index].price = price;
    res.send("uhul")
})

app.post('/produtos', (req: Request, res: Response) => {
    try {
        let {name, price} = req.body;

        // - erro caso um ou nenhum deles forem recebidos
        if(!name || !price){
            res.status(402);
            throw new Error("Campos obrigatórios não preenchidos");
        }

        let novoProduto: Produto = {
            id: "",
            name: '',
            price: 0
        }
        // - erro caso `name` seja diferente de `string`
        if(Number(name)){
            res.status(422);
            throw new Error("Name não pode ser um numero");
        }
        
        price = Number(price);
        // - erro caso `price` seja diferente de `number`
        if(isNaN(price)){
            res.status(422);
            throw new Error("Price deve ser um numero");
        }
        
        // - erro caso `price` seja igual ou menor que `0`
        if(price <= 0){
            res.status(422);
            throw new Error("Price deve ser um numero maior que zero");
        }
        novoProduto.id = Math.random().toString(8);
        novoProduto.name = name;
        novoProduto.price = price;

        produtos.push(novoProduto);

        res.status(201).send({ "Message": "Produto adicionado com sucesso!", id: novoProduto.id })
    } catch (error: any) {
        res.send(error.message);
    }
})






// app.post('/produtos', (req: Request, res: Response) => {
//     const novoProduto: Produto ={
//         id: Math.random().toString(8),
//         name: "",
//         price: 0
//     };
//     const { name, price } = req.body;
//     novoProduto.name = name;
//     novoProduto.price = price;

//     produtos[produtos.length] = novoProduto;

//     return res.status(201).send("Product added successfully");
// })

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
