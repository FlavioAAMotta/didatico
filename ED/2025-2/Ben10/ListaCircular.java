public class ListaCircular{
   private Alienigena cursor;
   
   public ListaCircular(){
      this.cursor = null;
   }
   
   public void adicionarAlien(String nome){
      Alienigena novoAlien = new Alienigena(nome);
      if(cursor == null){
         cursor = novoAlien;
         cursor.setProximo(cursor);
      }else{
         novoAlien.setProximo(cursor.getProximo());
         cursor.setProximo(novoAlien);
         cursor = cursor.getProximo();
      }
   }
   
   public void passarAlien(){
      cursor = cursor.getProximo();
   }
   
   public void mostrarAlien(){
      System.out.println(cursor.getNome());
   }

}