import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'
import Myprofile from './components/Myprofile';
import Indprofile from './components/Indprofile';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Home/>} />
      </Routes>

      <Routes>
      <Route path = '/login' element = {<Login/>} />
      </Routes>

      <Routes>
        <Route path = '/register' element = {<Register/>}/>
      </Routes>

      <Routes>
        <Route path='/dashboard' element = {<Dashboard/>}/>
      </Routes>

      <Routes>
        <Route path='/myprofile' element = {<Myprofile/>}/>
      </Routes>

      {/* /:fullname/:email/:skill/:id */}
      <Routes>
        <Route path='/indprofile/:fullname/:email/:skill' element = {<Indprofile/>}/>
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}



export default App;

