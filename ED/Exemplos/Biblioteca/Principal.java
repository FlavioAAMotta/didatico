public class Principal{
    public static void main(String[] args) {
        Usuario novoUsuario = new Usuario("Pedro", 80, "Fundacao");
        Biblioteca gerencial = new Biblioteca();
        gerencial.cadastrarUsuario(novoUsuario);
        // cadastrarLivro();
    }
}