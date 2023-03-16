public class Medico extends Funcionario{
   public String CRM;
   
   public double calculaSalario(double salario, int diasTrabalhados){
      return salario + (diasTrabalhados * 100);
   }
}