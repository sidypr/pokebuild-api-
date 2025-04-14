import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { POKEMON_TYPES, getTypeName } from '../constants/pokemonTypes';

function RandomTeam() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRandomTeam();
  }, []);

  const fetchRandomTeam = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://pokebuildapi.fr/api/v1/random/team/suggest');
      const data = await response.json();
      setTeam(data[0]);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement de l\'équipe:', error);
      setLoading(false);
    }
  };

  const getTypeColor = (typeName) => {
    const type = POKEMON_TYPES.find(t => 
      t.name.toLowerCase() === typeName.toLowerCase()
    );
    return type ? type.color : '#777777';
  };

  if (loading) return <div className="loading">Chargement de votre équipe...</div>;

  return (
    <main className="main">
      <div className="team-header">
        <h1>Votre Équipe Aléatoire</h1>
        <button onClick={fetchRandomTeam} className="refresh-button">
          Générer une nouvelle équipe
        </button>
      </div>

      <div className="grid">
        {team.map((pokemon) => (
          <Link to={`/pokemon/${pokemon.pokedexId}`} key={pokemon.id} className="card">
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              className="pokemon-image"
            />
            <h2 className="pokemon-name">{pokemon.name}</h2>
            
            <div className="pokemon-types">
              {pokemon.apiTypes.map((type) => (
                <span
                  key={type.name}
                  className="type-badge"
                  style={{
                    backgroundColor: getTypeColor(type.name)
                  }}
                >
                  {type.name}
                </span>
              ))}
            </div>

            <div className="stats">
              <p>Points de vie: {pokemon.stats.HP}</p>
              <p>Attaque: {pokemon.stats.attack}</p>
              <p>Défense: {pokemon.stats.defense}</p>
            </div>

            <div className="resistances">
              <h3>Résistances :</h3>
              <div className="resistance-grid">
                {pokemon.apiResistances
                  .filter(res => res.damage_relation !== 'neutral')
                  .map((resistance) => (
                    <span 
                      key={resistance.name}
                      className={`resistance-badge ${resistance.damage_relation}`}
                    >
                      {resistance.name}
                      {resistance.damage_multiplier !== 1 && 
                        ` (x${resistance.damage_multiplier})`}
                    </span>
                  ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default RandomTeam; 