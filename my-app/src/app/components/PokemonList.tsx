'use client'; //필수 요구사항

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Pokemon = {
  id: number;
  name: string; //포켓몬 영어이름
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string }; //이미지 url
  types: { type: { name: string; korean_name: string } }[]; //타입
  abilities: { ability: { name: string; korean_name: string } }[];  //능력
  moves: { move: { name: string; korean_name: string } }[]; //기술
};

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => { //포켓몬 데이터 가져오기
      const response = await fetch('/api/pokemons');
      const data = await response.json(); //응답 데이터를 json 형식으로 반환
      setPokemons(data);
      setLoading(false);
    };
    fetchPokemons();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {pokemons.map(pokemon => (  //각 포켓몬 객체에 대해 jsx 반환
        <div key={pokemon.id} className="p-4 border rounded-lg">
          <Link href={`/pokemons/${pokemon.id}`}>  
            <div> 
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.korean_name}
                width={96}
                height={96}
              />
              <h2>{pokemon.korean_name} </h2>
              <h2>도감 번호 : {pokemon.id}</h2>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
