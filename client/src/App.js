import './App.css';
import {Route,Routes} from 'react-router-dom'
import Home from './components/Home/Home'
import CardDetail from './components/CardDetail/CardDetail';
import Create from './components/Creation/Creation';
import LandingPage from './components/LandingPage/LandingPage';
import Error from './components/Error/Error';



function App() {
  return (
    <div className="App">
      <Routes>
          <Route exact path='/'           element={<LandingPage/>}/>
          <Route exact path='/home'       element={<Home/>}/>
          <Route exact path='/create'     element={<Create/>}/>
          <Route path='/detail/:Id'       element={<CardDetail/>}/>
          <Route path='*'                 element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
