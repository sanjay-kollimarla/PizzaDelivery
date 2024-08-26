import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home/home';
import Default from './layouts/default';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Default/>}>
            <Route path="" element={<Home/>}/>
          </Route>
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
