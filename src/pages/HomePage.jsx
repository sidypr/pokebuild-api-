import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { POKEMON_TYPES, getTypeName, getTypeByName } from '../constants/pokemonTypes';

function HomePage({ searchTerm, selectedType, onTypeSelect }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [allPokemons, setAllPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 40;

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await response.json();
        
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
        
        setAllPokemons(pokemonDetails);
        setDisplayedPokemons(pokemonDetails);
      } catch (error) {
        console.error('Erreur lors du chargement des Pokémon:', error);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    filterPokemons();
  }, [searchTerm, selectedType, allPokemons]);

  useEffect(() => {
    if (location.state?.selectedType) {
      onTypeSelect(location.state.selectedType);
      navigate('/', { replace: true });
    }
  }, [location.state, onTypeSelect, navigate]);

  const filterPokemons = () => {
    let filtered = allPokemons;

    if (searchTerm) {
      filtered = filtered.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      const selectedTypeData = getTypeByName(selectedType);
      if (selectedTypeData) {
        filtered = filtered.filter(pokemon => 
          pokemon.types.some(t => t.type.name === selectedTypeData.englishName)
        );
      }
    }

    setDisplayedPokemons(filtered);
    setCurrentPage(1);
  };

  const getTypeColor = (typeName) => {
    const type = POKEMON_TYPES.find(t => 
      t.englishName === typeName.toLowerCase()
    );
    return type ? type.color : '#777777';
  };

  // Calcul pour la pagination
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = displayedPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(displayedPokemons.length / pokemonsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Retour en haut de la page
  };

  return (
    <main className="main">
      <div className="grid">
        {currentPokemons.map((pokemon) => (
          <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id} className="card">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="pokemon-image"
            />
            <h2 className="pokemon-name">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h2>
            <div className="pokemon-types">
              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className="type-badge"
                  style={{
                    backgroundColor: getTypeColor(type.type.name)
                  }}
                >
                  {getTypeName(type.type.name)}
                </span>
              ))}
            </div>
            <div className="stats">
              <p>Points de vie: {pokemon.stats[0].base_stat}</p>
              <p>Attaque: {pokemon.stats[1].base_stat}</p>
              <p>Défense: {pokemon.stats[2].base_stat}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
          className="page-button"
        >
          Précédent
        </button>
        
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          // Afficher seulement quelques numéros de page
          if (
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
          ) {
            return (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`page-button ${currentPage === pageNumber ? 'active' : ''}`}
              >
                {pageNumber}
              </button>
            );
          }
          // Afficher des points de suspension pour les pages cachées
          if (pageNumber === currentPage - 3 || pageNumber === currentPage + 3) {
            return <span key={pageNumber}>...</span>;
          }
          return null;
        })}

        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className="page-button"
        >
          Suivant
        </button>
      </div>
    </main>
  );
}

export default HomePage; 