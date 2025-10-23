    // Usado quando a subárvore esquerda-esquerda está desbalanceada
    public static Node rotacaoDireita(Node y) {
        Node x = y.esquerda;
        Node T2 = x.direita;
        // Realizar rotação
        x.direita = y;
        y.esquerda = T2;
        // Atualizar alturas
        atualizarAltura(y);
        atualizarAltura(x);
        return x; // Nova raiz
    }
    // Usado quando a subárvore direita-direita está desbalanceada
    public static Node rotacaoEsquerda(Node x) {
        Node y = x.direita;
        Node T2 = y.esquerda;
        // Realizar rotação
        y.esquerda = x;
        x.direita = T2;
        // Atualizar alturas
        atualizarAltura(x);
        atualizarAltura(y);
        return y; // Nova raiz
    }
    // Usado quando a subárvore esquerda-direita está desbalanceada
    public static Node rotacaoEsquerdaDireita(Node node) {
        node.esquerda = rotacaoEsquerda(node.esquerda);
        return rotacaoDireita(node);
    }
    // Usado quando a subárvore direita-esquerda está desbalanceada
    public static Node rotacaoDireitaEsquerda(Node node) {
        node.direita = rotacaoDireita(node.direita);
        return rotacaoEsquerda(node);
    }