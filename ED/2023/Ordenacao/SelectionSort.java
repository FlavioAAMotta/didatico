public class SelectionSort {

  public static void selectionSort(int[] vetor) {
    for (int i = 0; i < vetor.length; i++) {
      int menor = vetor[i];
      int indiceMenor = i;
      for (int j = i; j < vetor.length; j++) {
        if (menor > vetor[j]) {
          menor = vetor[j];
          indiceMenor = j;
        }
      }
      vetor[indiceMenor] = vetor[i];
      vetor[i] = menor;
    }
  }

  public static void main(String[] args) {
    int[] vetor = { 12, 11, 13, 5, 6, 7 };
    selectionSort(vetor);
    for (int i = 0; i < vetor.length; i++) {
      System.out.println(vetor[i]);
    }
  }
}
