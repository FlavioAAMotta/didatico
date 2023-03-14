public class ListaDuplamente{
   private NoDuplo cabecalho;
   private NoDuplo fim;
   private int tamanho;
   
   public ListaDuplamente(){
      tamanho = 0;
      cabecalho = new NoDuplo();
      fim = new NoDuplo();
      
      cabecalho.setProximo(fim);
      fim.setAnterior(cabecalho);
   }
   
   public void addFirst(double valor){
      NoDuplo novoNo = new NoDuplo();
      novoNo.setValor(valor);
      novoNo.setAnterior(cabecalho);
      novoNo.setProximo(cabecalho.getProximo());
      
      cabecalho.getProximo().setAnterior(novoNo);
      cabecalho.setProximo(novoNo);
      tamanho++;
   }
   
   public void addLast(double valor){
      NoDuplo novoNo = new NoDuplo();
      novoNo.setValor(valor);
      novoNo.setProximo(fim);
      novoNo.setAnterior(fim.getAnterior());
      
      fim.getAnterior().setProximo(novoNo);
      fim.setAnterior(novoNo);
      tamanho++;
   }
   
   public NoDuplo getAt(int index){
      if(index > tamanho){
         System.out.println("Voce sabe contar");
         return cabecalho;
      }else{
         int indiceProcurado = 0;
         NoDuplo atual = cabecalho;
         while(indiceProcurado < index){
            atual = atual.getProximo();
            indiceProcurado++;
         }
         return atual;
      }
   }
   
   /*public void addAt(int index, double valor){
      if(index > tamanho+1){
         System.out.println("Voce sabe contar");
      } //A partir daqui posso adicionar
      else{ //Adiciona na primeira
         TODO
      }
   }*/
   
   //public void removeLast(){}
   //public void removeFirst(){}
   //public void printAll(){}
   //public void printAt(int index){}
   //public void removeAt(int index){}
   //public double getTotal(){}
   
}