import { notFound } from 'next/navigation';
import Image from 'next/image';

type Pokemon = {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: { type: { name: string; korean_name: string } }[];
  abilities: { ability: { name: string; korean_name: string } }[];
  moves: { move: { name: string; korean_name: string } }[];
};

const getPokemonData = async (id: string): Promise<Pokemon | null> => {
  try {
    const response = await fetch(`http://localhost:3000/api/pokemons/${id}`);
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    return null;
  }
};

export default async function PokemonDetail({ params }: { params: { id: string } }) {
  const pokemon = await getPokemonData(params.id);

  if (!pokemon) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.korean_name}
        width={200}
        height={200}
      />
      <h1 className="text-3xl mb-4">{pokemon.korean_name} ({pokemon.name})</h1>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <h2 className="text-2xl mt-4">Types</h2>
      <ul>
        {pokemon.types.map(type => (
          <li key={type.type.name}>{type.type.korean_name} ({type.type.name})</li>
        ))}
      </ul>
      <h2 className="text-2xl mt-4">Abilities</h2>
      <ul>
        {pokemon.abilities.map(ability => (
          <li key={ability.ability.name}>{ability.ability.korean_name} ({ability.ability.name})</li>
        ))}
      </ul>
      <h2 className="text-2xl mt-4">Moves</h2>
      <ul>
        {pokemon.moves.map(move => (
          <li key={move.move.name}>{move.move.korean_name} ({move.move.name})</li>
        ))}
      </ul>
      <div className="mt-4">
        <a href="/" className="text-blue-500">Back to List</a>
      </div>
    </div>
  );
}
