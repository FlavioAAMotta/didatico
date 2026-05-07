public class Rotacoes{
    public void balancear(No no){
        int balanceamento = calcularBalanceamento(no);
        if(balanceamento > 1){
            if(calcularBalanceamento(no.getDireita()) >= 0){
                no = rotacaoEsquerda(no);
            }else{
                no.setDireita(rotacaoDireita(no.getDireita()));
                no = rotacaoEsquerda(no);
            }
        }else if(balanceamento < -1){
            if(calcularBalanceamento(no.getEsquerda()) <= 0){
                no = rotacaoDireita(no);
            }else{
                no.setEsquerda(rotacaoEsquerda(no.getEsquerda()));
                no = rotacaoDireita(no);
            }
        }
        return no;
    }

    public No rotacaoDireita(No x){
        No y = x.getEsquerda();
        No z = y.getDireita();
        y.setDireita(x);
        x.setEsquerda(z);
        return y;
    }
    public No rotacaoEsquerda(No x){
        No y = x.getDireita();
        No z = y.getEsquerda();
        y.setEsquerda(x);
        x.setDireita(z);
        
        return y;
    }
    public No rotacaoEsquerdaDireita(No no){
        no.setEsquerda(rotacaoEsquerda(no.getEsquerda()));
        return rotacaoDireita(no);
    }
    public No rotacaoDireitaEsquerda(No no){
        no.setDireita(rotacaoDireita(no.getDireita()));
        return rotacaoEsquerda(no);
    }
}