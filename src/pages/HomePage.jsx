import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { POKEMON_TYPES, getTypeName, getTypeByName } from '../constants/pokemonTypes';

function HomePage({ searchTerm, selectedType }) {
  const [allPokemons, setAllPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
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

  const filterPokemons = () => {
    let filtered = allPokemons;

    if (searchTerm) {
      filtered = filtered.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      const selectedTypeData = getTypeByName(selectedType);
      filtered = filtered.filter(pokemon => 
        pokemon.types.some(t => t.type.name === selectedTypeData.englishName)
      );
    }

    setDisplayedPokemons(filtered);
  };

  const getTypeColor = (typeName) => {
    const type = POKEMON_TYPES.find(t => 
      t.englishName === typeName.toLowerCase()
    );
    return type ? type.color : '#777777';
  };

  return (
    <main className="main">
      <div className="grid">
        {displayedPokemons.map((pokemon) => (
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
    </main>
  );
}

export default HomePage; 