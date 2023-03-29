public abstract class Notificacao {
    private String destinatario;
    public Notificacao(String destinatario) {
        this.destinatario = destinatario;
    }
    public String getDestinatario() {
        return destinatario;
    }
    public abstract void enviarNotificacao(String mensagem);
}