import { useState, useEffect } from 'react';
import { POKEMON_TYPES } from '../constants/pokemonTypes';

function TypesGuide() {
  const [typeExamples, setTypeExamples] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemonExamples();
  }, []);

  const fetchPokemonExamples = async () => {
    try {
      const examples = {};
      for (const type of POKEMON_TYPES) {
        const response = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/type/${type.name}`);
        const data = await response.json();
        examples[type.name] = data.slice(0, 3); // Prendre 3 exemples par type
      }
      setTypeExamples(examples);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des exemples:', error);
      setLoading(false);
    }
  };

  const getTypeColor = (typeName) => {
    const type = POKEMON_TYPES.find(t => 
      t.name.toLowerCase() === typeName.toLowerCase()
    );
    return type ? type.color : '#777777';
  };

  if (loading) return <div className="loading">Chargement du guide des types...</div>;

  return (
    <main className="main">
      <h1 className="types-guide-title">Guide des Types Pokémon</h1>
      
      <div className="types-container">
        {POKEMON_TYPES.map((type) => (
          <div 
            key={type.name} 
            className="type-section"
            style={{ borderColor: type.color }}
          >
            <h2 
              className="type-title"
              style={{ backgroundColor: type.color, color: type.textColor }}
            >
              {type.name}
            </h2>

            <div className="type-info">
              <div className="type-relations">
                <div className="type-weakness">
                  <h3>Faiblesses</h3>
                  {/* À compléter avec les faiblesses */}
                </div>
                <div className="type-strength">
                  <h3>Résistances</h3>
                  {/* À compléter avec les résistances */}
                </div>
              </div>

              <div className="type-examples">
                <h3>Exemples de Pokémon</h3>
                <div className="examples-grid">
                  {typeExamples[type.name]?.map((pokemon) => (
                    <div key={pokemon.id} className="example-card">
                      <img 
                        src={pokemon.sprite} 
                        alt={pokemon.name}
                        className="example-image"
                      />
                      <p className="example-name">{pokemon.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default TypesGuide; 