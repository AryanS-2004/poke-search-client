import Image from "next/image";

// const pokemon: any =
// {
//   "id": 1,
//   "name": "bulbasaur",
//   "order": 1,
//   "imgFront": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
//   "imgBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
//   "types": [
//     {
//       "slot": 1,
//       "type": {
//         "name": "grass",
//         "url": "https://pokeapi.co/api/v2/type/12/"
//       }
//     },
//     {
//       "slot": 2,
//       "type": {
//         "name": "poison",
//         "url": "https://pokeapi.co/api/v2/type/4/"
//       }
//     }
//   ]
// }

const pokemonTypeColor = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#F0B6BC',
}

export function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <>
      <div
        className="bg-p-orange rounded-2xl p-4 w-full cursor-pointer"
        style={{ 'boxShadow': '0px 10px 15px -3px #EF8354' }}
      >
        <div className="text-p-gray font-bold">
          #{pokemon?.id}
        </div>
        <div>
          <Image src={pokemon?.imgFront} className="w-full" width={2000} height={2000} alt="" />
        </div>
        <div>
          <div className="text-white text-3xl font-semibold py-2">
            {pokemon?.name.toUpperCase()}
          </div>
          <div className="flex gap-2">
            {pokemon?.types?.map((type: PokemonType, index: number) => (
              <div
                className={`p-[2px] px-3 rounded-full text-white`}
                style={{ backgroundColor: pokemonTypeColor[type.type.name as keyof typeof pokemonTypeColor] }}
                key={index}
              >
                {type.type.name}
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
};