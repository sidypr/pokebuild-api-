export const POKEMON_TYPES = [
  { name: 'Acier', englishName: 'steel', color: '#B8B8D0', textColor: '#000000' },
  { name: 'Combat', englishName: 'fighting', color: '#C03028', textColor: '#FFFFFF' },
  { name: 'Dragon', englishName: 'dragon', color: '#7038F8', textColor: '#FFFFFF' },
  { name: 'Eau', englishName: 'water', color: '#6890F0', textColor: '#FFFFFF' },
  { name: 'Électrik', englishName: 'electric', color: '#F8D030', textColor: '#000000' },
  { name: 'Fée', englishName: 'fairy', color: '#FFB7FA', textColor: '#000000' },
  { name: 'Feu', englishName: 'fire', color: '#F08030', textColor: '#FFFFFF' },
  { name: 'Glace', englishName: 'ice', color: '#98D8D8', textColor: '#000000' },
  { name: 'Insecte', englishName: 'bug', color: '#A8B820', textColor: '#FFFFFF' },
  { name: 'Normal', englishName: 'normal', color: '#A8A878', textColor: '#000000' },
  { name: 'Plante', englishName: 'grass', color: '#78C850', textColor: '#000000' },
  { name: 'Poison', englishName: 'poison', color: '#A040A0', textColor: '#FFFFFF' },
  { name: 'Psy', englishName: 'psychic', color: '#F85888', textColor: '#FFFFFF' },
  { name: 'Roche', englishName: 'rock', color: '#B8A038', textColor: '#FFFFFF' },
  { name: 'Sol', englishName: 'ground', color: '#E0C068', textColor: '#000000' },
  { name: 'Spectre', englishName: 'ghost', color: '#705898', textColor: '#FFFFFF' },
  { name: 'Ténèbres', englishName: 'dark', color: '#705848', textColor: '#FFFFFF' },
  { name: 'Vol', englishName: 'flying', color: '#A890F0', textColor: '#000000' }
];

export const getTypeName = (englishName) => {
  const type = POKEMON_TYPES.find(t => t.englishName === englishName.toLowerCase());
  return type ? type.name : englishName;
};

export const getTypeByName = (frenchName) => {
  return POKEMON_TYPES.find(t => t.name.toLowerCase() === frenchName.toLowerCase());
}; 