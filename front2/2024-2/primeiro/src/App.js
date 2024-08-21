import { CardVideo } from './CardVideo';
import { MenuItem } from './MenuItem';

function App() {
  return (
    <div>
      <CardVideo />
      <CardVideo />
      <CardVideo />

      <MenuItem texto={'Menu'} />
      <MenuItem texto={'Opções'}/>
      <MenuItem texto={'Em alta'}/>
      <MenuItem texto={'Inscrições'}/>
      <MenuItem texto={'Originais'}/>
      <MenuItem texto={'Histórico'}/>
      
    </div>
  );
}

export default App;
