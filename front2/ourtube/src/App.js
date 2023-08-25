import React from "react";
import "./style.css";
import { CardVideo } from "./components/CardVideo";
import { MenuItem } from "./components/MenuItem";

export default function App() {
  const titulo = "Título do vídeo";

  function reproduzVideo() {
    alert("O vídeo está sendo reproduzido");
  }
  return (
    <div>
      <div className="tela-inteira">
        <header>
          <h1>OurTube</h1>
          <input type="text" placeholder="Busca" id="campoDeBusca" />
        </header>

        <main>
          <nav className="menu-vertical">
            <ul>
              <MenuItem texto={'Início'} />
              <MenuItem texto={'Em alta'} />
              <MenuItem texto={'Inscrições'} />
              <hr />
              <MenuItem texto={'Originais'} />
              <MenuItem texto={'Histórico'} />
            </ul>
          </nav>

          <section className="painel-de-videos">
            <CardVideo titulo={'Video 1'} src={'https://picsum.photos/400/400?a=1'}/>
            <CardVideo titulo={'Video 2'} src={'https://picsum.photos/400/400?a=2'}/>
            <CardVideo titulo={'Video 3'} src={'https://picsum.photos/400/400?a=3'}/>
            <CardVideo titulo={'Video 4'} src={'https://picsum.photos/400/400?a=4'}/>
            <CardVideo titulo={'Video 5'} src={'https://picsum.photos/400/400?a=5'}/>
            <CardVideo titulo={'Video 6'} src={'https://picsum.photos/400/400?a=6'}/>
            <CardVideo titulo={'Video 7'} src={'https://picsum.photos/400/400?a=7'}/>
            <CardVideo titulo={'Video 8'} src={'https://picsum.photos/400/400?a=8'}/>

          </section>
        </main>

        <footer>
          <h4>Oi! Eu moro no footer!</h4>
        </footer>
      </div>
    </div>
  );
}
