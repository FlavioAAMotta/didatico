public class Principal{
   public static void main(String[] args){
      Paciente novo = new Paciente("Robin", "Masculino");
      Medico novoMedico = new Medico();
      System.out.println(novoMedico.calculaSalario(5000, 10));
      
   }
}