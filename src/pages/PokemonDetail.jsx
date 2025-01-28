import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { POKEMON_TYPES, getTypeName } from '../constants/pokemonTypes';

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
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
                  backgroundColor: getTypeColor(type.type.name)
                }}
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
    </main>
  );
}

export default PokemonDetail; 