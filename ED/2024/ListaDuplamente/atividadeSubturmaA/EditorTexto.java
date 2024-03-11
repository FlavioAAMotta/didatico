import java.util.Stack;

class EditorTexto {
    ListaDuplamenteEncadeada documento;
    ListaDuplamenteEncadeada historicoRefazer;

    public EditorTexto() {
        this.documento = new ListaDuplamenteEncadeada();
        this.historicoRefazer = new ListaDuplamenteEncadeada();
    }

    public void inserirTexto(String texto) {
        //Trecho Faltante
    }

    public void ctrlZ() {
        if (!documento.isEmpty()) {
            //Trecho Faltante
            //Trecho Faltante
        }
    }

    public void ctrlY() {
        if (!historicoRefazer.isEmpty()) {
            //Trecho Faltante
            //Trecho Faltante
        }
    }

    public void imprimirDocumento() {
        System.out.println(documento);
    }
}
