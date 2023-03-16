public abstract class Funcionario extends Pessoa{
   public String dataAdmissao;
   public String matricula;
   
   public abstract double calculaSalario(double salario, int diasTrabalhados);
}