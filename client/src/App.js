import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Search from "./components/Search/Search";
import Weather from './components/Weather/Weather';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/weather/:city' element={
            <>
              <Search />
              <Weather />
            </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
