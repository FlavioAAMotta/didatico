public class NotificacaoUrgenteSMS extends NotificacaoSMS {
    public NotificacaoUrgenteSMS(String destinatario) {
        super(destinatario);
    }
    @Override
    public void enviarNotificacao(String mensagem) {
        String mensagemUrgente = "[URGENTE] " + mensagem;
        super.enviarNotificacao(mensagemUrgente);
    }
}