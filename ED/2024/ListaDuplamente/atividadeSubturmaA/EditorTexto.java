class EditorTexto {
    ListaDuplamenteEncadeada documento;
    ListaDuplamenteEncadeada historicoRefazer;

    public EditorTexto() {
        this.documento = new ListaDuplamenteEncadeada();
        this.historicoRefazer = new ListaDuplamenteEncadeada();
    }

    public void inserirTexto(String texto) {
        documento.inserirNoFinal(texto);
    }

    public void ctrlZ() {
        if (!documento.isEmpty()) {
            String removida = documento.removerDoFinal();
            historicoRefazer.inserirNoFinal(removida);
        }
    }

    public void ctrlY() {
        if (!historicoRefazer.isEmpty()) {
            String refeita = historicoRefazer.removerDoFinal();
            documento.inserirNoFinal(refeita);
        }
    }

    public void imprimirDocumento() {
        System.out.println(documento);
    }
}
