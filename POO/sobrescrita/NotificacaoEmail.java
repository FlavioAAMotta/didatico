public class NotificacaoEmail extends Notificacao {
    public NotificacaoEmail(String destinatario){
        super(destinatario);
    }
    @Override
    public void enviarNotificacao(String mensagem){
        System.out.println("Enviando e-mail para " + getDestinatario() + ": " + mensagem);
    }
}