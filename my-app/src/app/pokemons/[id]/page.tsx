import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
    console.error("Error fetching Pokemon data:", error);
    return null;
  }
};

export default async function PokemonDetail({
  params,
}: {
  params: { id: string };
}) {
  const pokemon = await getPokemonData(params.id);

  if (!pokemon) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl mb-4">이름 : {pokemon.korean_name}</h1>
      <h1 className="text-3xl mb-4">NO. {pokemon.id}</h1>
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.korean_name}
        width={200}
        height={200}
      />
      <p className="text-2xl mb-4">키: {pokemon.height}m, 몸무게: {pokemon.weight}kg</p>
      <h2 className="text-2xl mt-4">타입</h2>
      <ul>
        {pokemon.types.map((type) => (
          <li key={type.type.name}>
            {type.type.korean_name} ({type.type.name})
          </li>
        ))}
      </ul>
      <h2 className="text-2xl mt-4">특성</h2>
      <ul>
        {pokemon.abilities.map((ability) => (
          <li key={ability.ability.name}>
            {ability.ability.korean_name} ({ability.ability.name})
          </li>
        ))}
      </ul>
      <h2 className="text-2xl mt-4">기술</h2>
      <ul className="flex flex-wrap">
        {pokemon.moves.map((move) => (
          <li key={move.move.name} className="mr-4">
            {move.move.korean_name} ({move.move.name})
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center">
        <Link href="/">
          <button className="bg-lime-600 text-white px-4 py-2 rounded items-center">
            포켓몬 도감으로 돌아가기
          </button>
        </Link>
      </div>
    </div>
  );
}
