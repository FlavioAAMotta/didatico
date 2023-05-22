import java.util.ArrayList;
import java.util.List;

public class GenericsExample {
    public class Cat {
    }

    public static void printList(List<?> myList) {
        System.out.println();
    }
    public static void main(String[] args) {
        List<Integer> myList = new ArrayList<>();
        myList.add(1);
        printList(myList); // in the type List<Integer> is not applicable for the arguments (List<Object>)
    }
}
