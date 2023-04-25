public class NotificacaoUrgenteSMS extends NotificacaoSMS {
   public String mensagem1; 
    public NotificacaoUrgenteSMS(String destinatario) {
        super(destinatario);
    }
    @Override
    public void enviarNotificacao(String mensagem) {
        mensagem = mensagem + "oi";
        String mensagemUrgente = "[URGENTE] " + mensagem;
        super.enviarNotificacao(mensagemUrgente);
    }
    
    public void imprime(String mensagem){
      System.out.println(mensagem);
    }
    
    public void imprime(double valor){
      System.out.println(valor + mensagem);
    }
}