import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar({ onSearch, onTypeSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
    // Rediriger vers la page d'accueil si on n'est pas déjà dessus
    navigate('/');
  };

  const types = [
    "Normal", "Combat", "Vol", "Poison", "Sol", "Roche", "Insecte", "Spectre", "Acier",
    "Feu", "Eau", "Plante", "Électrik", "Psy", "Glace", "Dragon", "Ténèbres", "Fée"
  ];

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="top-bar">
          <Link to="/" className="logo">Pokédex</Link>
          
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher un Pokémon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-button">Rechercher</button>
          </form>

          <div className="nav-links">
            <Link to="/" className="nav-link">Accueil</Link>
            <Link to="/random-team" className="nav-link">Équipe Aléatoire</Link>
            <Link to="/types-guide" className="nav-link">Guide des Types</Link>
            <Link to="/about" className="nav-link">À Propos</Link>
          </div>
        </div>

        <div className="type-container">
          {types.map((type) => (
            <button
              key={type}
              className="type-button"
              style={{
                backgroundColor: getTypeColor(type)
              }}
              onClick={() => {
                if (onTypeSelect) {
                  onTypeSelect(type);
                  navigate('/');
                }
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// Fonction pour obtenir la couleur du type
function getTypeColor(type) {
  const colors = {
    Normal: '#A8A878',
    Combat: '#C03028',
    Vol: '#A890F0',
    Poison: '#A040A0',
    Sol: '#E0C068',
    Roche: '#B8A038',
    Insecte: '#A8B820',
    Spectre: '#705898',
    Acier: '#B8B8D0',
    Feu: '#F08030',
    Eau: '#6890F0',
    Plante: '#78C850',
    Électrik: '#F8D030',
    Psy: '#F85888',
    Glace: '#98D8D8',
    Dragon: '#7038F8',
    Ténèbres: '#705848',
    Fée: '#EE99AC'
  };
  return colors[type] || '#777';
}

export default Navbar; 