import { Link } from 'react-router-dom';

function PokemonCard({ pokemon }) {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className="block">
      <div className="border rounded-lg p-4 hover:shadow-lg transition">
        <img 
          src={pokemon.sprites.front_default} 
          alt={pokemon.name}
          className="w-32 h-32 mx-auto"
        />
        <h2 className="text-xl font-bold text-center capitalize">{pokemon.name}</h2>
        <div className="flex justify-center gap-2 mt-2">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className={`px-2 py-1 rounded text-white bg-${type.type.name}`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard; 