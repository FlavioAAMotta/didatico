export type Cliente = {
    id: string;
    email: string;
    nome: string;
    sobrenome: string | undefined;
    senha: string;
    carrinho_id: string;
}