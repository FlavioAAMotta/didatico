public class No {

  private No esq;
  private No dir;
  private int val;

  public No(int val) {
    this.val = val;
  }

  public No getEsq() {
    return this.esq;
  }

  public No getDir() {
    return this.dir;
  }

  public int getVal() {
    return this.val;
  }

  public void setEsq(No esq) {
    this.esq = esq;
  }

  public void setDir(No dir) {
    this.dir = dir;
  }

  public void setVal(int val) {
    this.val = val;
  }
}
