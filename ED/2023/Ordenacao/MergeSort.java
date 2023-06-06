public class MergeSort {

  public static void mergeSort(int[] vetor) {
    if (vetor.length <= 1) {
      return;
    }

    int meio = vetor.length / 2;
    int[] vetorEsquerda = new int[meio];
    int[] vetorDireita = new int[vetor.length - meio];

    for (int i = 0; i < meio; i++) {
      vetorEsquerda[i] = vetor[i];
    }
    for (int i = 0; i < vetor.length-meio; i++) {
      vetorDireita[i] = vetor[i+meio];
    }

    mergeSort(vetorEsquerda);
    mergeSort(vetorDireita);

    merge(vetorEsquerda, vetorDireita, vetor);
  }

  public static void merge(
    int[] vetorEsquerda,
    int[] vetorDireita,
    int[] vetor
  ) {
    int indiceEsq = 0;
    int indiceDir = 0;
    int indiceVetor = 0;

    while (
      indiceEsq < vetorEsquerda.length && indiceDir < vetorDireita.length
    ) {
      if (vetorEsquerda[indiceEsq] < vetorDireita[indiceDir]) {
        vetor[indiceVetor++] = vetorEsquerda[indiceEsq++];
      }else{
        vetor[indiceVetor++] = vetorDireita[indiceDir++];
      }
    }
    
    while(indiceEsq < vetorEsquerda.length){
      vetor[indiceVetor++] = vetorEsquerda[indiceEsq++];
    }
    while(indiceDir < vetorDireita.length){
      vetor[indiceVetor++] = vetorDireita[indiceDir++];
    }
  }

  public static void main(String[] args) {
    int[] vetor = new int[2000000];
    for(int i = 0; i < vetor.length; i++){
      vetor[i] = vetor.length-i; 
    }
    long inicio = System.currentTimeMillis();
    mergeSort(vetor);
    long fim = System.currentTimeMillis();
    System.out.println("Merge: "+ (fim-inicio));
    
    for(int i = 0; i < vetor.length; i++){
      vetor[i] = vetor.length-i; 
    }
    inicio = System.currentTimeMillis();
    SelectionSort.selectionSort(vetor);
    fim = System.currentTimeMillis();
    System.out.println("Selection: "+ (fim-inicio));
  }
}
