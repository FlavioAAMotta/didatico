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
   
   public NoDuplo getAt(int indiceProcurado){
      if(indiceProcurado > tamanho){
         System.out.println("Voce sabe contar");
         return cabecalho;
      }else{
         int indicePercorrido = 0;
         NoDuplo atual = cabecalho;
         while(indicePercorrido < indiceProcurado){
            atual = atual.getProximo();
            indicePercorrido++;
         }
         return atual;
      }
   }
   
   public void addAt(int indiceProcurado, double valor){
      if(indiceProcurado > tamanho+1){
         System.out.println("Voce sabe contar");
      } //A partir daqui posso adicionar
      else if(tamanho == 0){
         addFirst(valor);
      }else if(indiceProcurado == tamanho+1){
         addLast(valor);
      }else{
         int indicePercorrido = 0;
         NoDuplo atual = cabecalho;
         while(indicePercorrido < indiceProcurado-1){
            atual = atual.getProximo();
            indicePercorrido++;
         }
      
         NoDuplo novo = new NoDuplo();
         novo.setValor(valor);
         atual.getProximo().setAnterior(novo);
         novo.setAnterior(atual);
         novo.setProximo(atual.getProximo());
         atual.setProximo(novo);
         tamanho++;
      }
   }
   
   public void removeLast(){
      removeAt(tamanho);
   }
   
   public void removeFirst(){
      removeAt(1);
   }
   
   public void printAll(){
      for(int i = 1; i < tamanho; i++){
         printAt(i);
      }
   }
   
   public void printAt(int index){
      NoDuplo atual = getAt(index);
      System.out.println(atual.getValor());
   }
   
   public void removeAt(int index){
      if(index > tamanho){
         System.out.println("Erro");
      }else{
         NoDuplo aRemover = getAt(index);
         aRemover.getAnterior().setProximo(aRemover.getProximo());
         aRemover.getProximo().setAnterior(aRemover.getAnterior());
         tamanho--;
      }
   }
   public double getTotal(){
      double total = 0;
      for(NoDuplo atual = cabecalho.getProximo(); atual != fim ;atual = atual.getProximo()){
         total+= atual.getValor();
      }
      return total;
   }
   
}