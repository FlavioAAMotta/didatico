public class Gerente extends Funcionario{
   public String CRA;
   
   public double calculaSalario(double salario, int diasTrabalhados){
      return salario * diasTrabalhados;
   }
}