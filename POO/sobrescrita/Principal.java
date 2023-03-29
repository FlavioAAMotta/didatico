public class Principal{
    public static void main(String[] args) {
        Notificacao email = new NotificacaoEmail("email@exemplo.com");
        Notificacao sms = new NotificacaoSMS("123-456-7890");
        Notificacao urgenteSms = new NotificacaoUrgenteSMS("123-456-7890");
        email.enviarNotificacao("Olá, e-mail!"); // 
        sms.enviarNotificacao("Olá, SMS!"); // Saída: 
        urgenteSms.enviarNotificacao("Olá, SMS urgente!");
    }
}