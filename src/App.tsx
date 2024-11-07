// import WorldMap from './Components/WorldMap';
// import BucketList from './Components/BucketList';
import Minesweeper from './Components/Minesweeper/Minesweeper';

import './App.css'

function App() {
  return (
    <>
      <h1 className='Name'>Tomás Ernst</h1>
      {/* <WorldMap/>
      <BucketList/> */}
      <p>
        My name is Tomás Ernst and i'm an Engineering student @ PUC
      </p>
      <p>
        This is another paragraph
      </p>
      <p>
        Hey, this is the third paragraph!!
      </p>
      <Minesweeper/>
    </>
  );
}

export default App