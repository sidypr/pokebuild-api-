import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PokemonDetail from './pages/PokemonDetail';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState(null);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type === selectedType ? null : type);
  };

  return (
    <Router>
      <Layout 
        onSearch={handleSearch} 
        onTypeSelect={handleTypeSelect}
        selectedType={selectedType}
      >
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                searchTerm={searchTerm} 
                selectedType={selectedType}
                onTypeSelect={handleTypeSelect}
              />
            } 
          />
          <Route 
            path="/pokemon/:id" 
            element={
              <PokemonDetail 
                onTypeSelect={handleTypeSelect}
              />
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 