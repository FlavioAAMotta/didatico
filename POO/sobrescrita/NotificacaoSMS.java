public class NotificacaoSMS extends Notificacao {
    public NotificacaoSMS(String destinatario) {
        super(destinatario);
    }
    @Override
    public void enviarNotificacao(String mensagem) {
        System.out.println("Enviando SMS para " + getDestinatario() + ": " + mensagem);
    }
}
