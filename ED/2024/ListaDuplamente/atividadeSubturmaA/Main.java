public class Main {
    public static void main(String[] args) {
        EditorTexto editor = new EditorTexto();
        editor.inserirTexto("Hello");
        editor.imprimirDocumento(); // Deve imprimir "Hello"
        editor.inserirTexto(", ");
        editor.inserirTexto("there");
        editor.imprimirDocumento(); // Deve imprimir "Hello, there"
        editor.ctrlZ();
        editor.imprimirDocumento(); // Deve imprimir "Hello, "
        editor.ctrlZ();
        editor.imprimirDocumento(); // Deve imprimir "Hello"
        editor.ctrlY();
        editor.imprimirDocumento(); // Deve voltar a imprimir "Hello, "
        editor.ctrlY();
        editor.imprimirDocumento(); // Deve voltar a imprimir "Hello, there"
    }
}
