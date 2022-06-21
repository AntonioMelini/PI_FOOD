import './App.css';
import {Route,Routes} from 'react-router-dom'
import Home from './components/Home/index'


function App() {
  return (
    <div className="App">
      <h1>Henry Food</h1>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
