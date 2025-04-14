import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { POKEMON_TYPES, getTypeName } from '../constants/pokemonTypes';

function PokemonDetail({ onTypeSelect }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [similarPokemons, setSimilarPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 40;

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);

        // Chercher des Pokémon similaires (même type)
        const allPokemonResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const allPokemonData = await allPokemonResponse.json();
        
        const similarPokemonDetails = await Promise.all(
          allPokemonData.results.map(async (p) => {
            const res = await fetch(p.url);
            return res.json();
          })
        );

        // Filtrer pour avoir les Pokémon du même type
        const similar = similarPokemonDetails.filter(p => 
          p.id !== parseInt(id) && // Exclure le Pokémon actuel
          p.types.some(t1 => 
            data.types.some(t2 => t2.type.name === t1.type.name)
          )
        );

        setSimilarPokemons(similar);
      } catch (error) {
        console.error('Erreur lors du chargement du Pokémon:', error);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  const getTypeColor = (typeName) => {
    const type = POKEMON_TYPES.find(t => 
      t.englishName === typeName.toLowerCase()
    );
    return type ? type.color : '#777777';
  };

  const handleTypeClick = (typeName) => {
    const type = POKEMON_TYPES.find(t => t.englishName === typeName.toLowerCase());
    if (type) {
      onTypeSelect(type.name);
      navigate('/');
    }
  };

  // Pagination pour les Pokémon similaires
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = similarPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(similarPokemons.length / pokemonsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleSimilarPokemonClick = () => {
    // Faire défiler vers le haut de la page
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Pour un défilement fluide
    });
  };

  if (!pokemon) return <div>Chargement...</div>;

  return (
    <main className="main">
      <div className="pokemon-detail">
        <div className="pokemon-detail-header">
          <h1 className="pokemon-detail-name">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h1>
          <p className="pokemon-detail-number">#{pokemon.id.toString().padStart(3, '0')}</p>
        </div>
        
        <div className="pokemon-detail-content">
          <div className="pokemon-detail-images">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="pokemon-detail-image"
            />
            <img
              src={pokemon.sprites.back_default}
              alt={`${pokemon.name} dos`}
              className="pokemon-detail-image"
            />
          </div>

          <div className="pokemon-types">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="type-badge"
                style={{
                  backgroundColor: getTypeColor(type.type.name),
                  cursor: 'pointer'
                }}
                onClick={() => handleTypeClick(type.type.name)}
              >
                {getTypeName(type.type.name)}
              </span>
            ))}
          </div>

          <div className="pokemon-detail-stats">
            <h2>Statistiques</h2>
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="stat-bar">
                <span className="stat-name">
                  {stat.stat.name === 'hp' ? 'Points de vie' :
                   stat.stat.name === 'attack' ? 'Attaque' :
                   stat.stat.name === 'defense' ? 'Défense' :
                   stat.stat.name === 'special-attack' ? 'Attaque Spéciale' :
                   stat.stat.name === 'special-defense' ? 'Défense Spéciale' :
                   stat.stat.name === 'speed' ? 'Vitesse' : stat.stat.name}
                </span>
                <div className="stat-bar-bg">
                  <div 
                    className="stat-bar-fill"
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  >
                    {stat.base_stat}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link to="/" className="button">
            Retour à la liste
          </Link>
        </div>
      </div>

      <h2 className="similar-title">Pokémon similaires</h2>
      
      <div className="grid">
        {currentPokemons.map((pokemon) => (
          <Link
            key={pokemon.id}
            to={`/pokemon/${pokemon.id}`}
            className="card"
            onClick={handleSimilarPokemonClick}
          >
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

      {similarPokemons.length > pokemonsPerPage && (
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
      )}
    </main>
  );
}

export default PokemonDetail; 