import { useState } from 'react';
import { Link } from 'react-router-dom';
import { POKEMON_TYPES } from '../constants/pokemonTypes';

function Navbar({ onSearch, onTypeSelect, selectedType }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="top-bar">
          <Link to="/" className="logo">Pokédex</Link>
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              className="search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un Pokémon (ex: Salamèche, Pikachu)..."
            />
            <button type="submit" className="search-button">
              Rechercher
            </button>
          </form>
        </div>
        <div className="type-container">
          {POKEMON_TYPES.map((type) => (
            <button
              key={type.name}
              className={`type-button ${selectedType === type.name ? 'active' : ''}`}
              onClick={() => onTypeSelect(type.name)}
              style={{
                backgroundColor: type.color,
                color: type.textColor,
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                opacity: selectedType && selectedType !== type.name ? 0.5 : 1
              }}
              title={type.name}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 