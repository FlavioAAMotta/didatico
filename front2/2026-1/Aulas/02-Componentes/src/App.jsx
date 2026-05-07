import './App.css'
import { VideoCard } from './components/VideoCard'
function App() {

  return (
    <>
      <h1>Página principal</h1>
      <p className="bg-green-500">Teste de home page</p>

      <VideoCard img={'https://picsum.photos/id/247/200'} titulo={'Veneza'}/>
      <VideoCard  img={'https://picsum.photos/id/24/200'}/>
      <VideoCard  img={'https://picsum.photos/id/27/200'} titulo={'Ponte Quebrada'}/>
      <VideoCard  titulo={'Ponte'} img={'https://picsum.photos/id/47/200'}/>

      {/* <div>
        <h4>Veneza</h4>
        <img src='https://picsum.photos/200'></img>
      </div>
      <div>
        <h4>Cachorro</h4>
        <img src='https://picsum.photos/id/237/200'></img>
      </div>
      <div>
        <h4>Ponte quebrada</h4>
        <img src='https://picsum.photos/id/217/200'></img>
      </div> */}
    </>
  )
}

export default App
