import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PokemonDetail from './pages/PokemonDetail';
import RandomTeam from './pages/RandomTeam';
import TypesGuide from './pages/TypesGuide';
import About from './pages/About';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  return (
    <Router>
      <div className="app">
        <Navbar 
          onSearch={setSearchTerm} 
          onTypeSelect={setSelectedType}
        />
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                searchTerm={searchTerm} 
                selectedType={selectedType}
              />
            } 
          />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/random-team" element={<RandomTeam />} />
          <Route path="/types-guide" element={<TypesGuide />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 