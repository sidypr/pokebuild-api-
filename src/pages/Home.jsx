import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home({ searchTerm, selectedType }) {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 40;

  useEffect(() => {
    fetch('https://pokebuildapi.fr/api/v1/pokemon')
      .then(response => response.json())
      .then(data => setPokemons(data));
  }, []);

  // Filtrer les Pokémon en fonction de la recherche et du type
  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || pokemon.types.includes(selectedType);
    return matchesSearch && matchesType;
  });

  // Calculer les Pokémon à afficher pour la page courante
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  return (
    <main className="main">
      <div className="grid">
        {currentPokemons.map(pokemon => (
          <Link 
            key={pokemon.id} 
            to={`/pokemon/${pokemon.id}`}
            className="card"
          >
            <img 
              src={pokemon.sprite} 
              alt={pokemon.name} 
              className="pokemon-image"
            />
            <h3 className="pokemon-name">{pokemon.name}</h3>
            <div className="pokemon-types">
              {pokemon.types.map(type => (
                <span 
                  key={type}
                  className="type-badge"
                  style={{ backgroundColor: getTypeColor(type) }}
                >
                  {type}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredPokemons.length / pokemonsPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </main>
  );
}

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

export default Home; 