import './App.css';
import { CardGrid } from './components/CardGrid';

/**********************************************************************************/

const App = () => 
{
  
  return (
    <div className="App">

        <div className="header">
          <h1>CDIP Development Tool</h1>
        </div>
      
        <CardGrid />
    </div>
  );
}

export default App;
