import Image from "next/image";
import { useEffect, useState } from "react";


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

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export function PokemonDetails({ pokemon, setSelectedPokemon }: { pokemon: SinglePokemon | null, setSelectedPokemon: any, }) {

  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (pokemon) {
      const data = pokemon.stats.map((stat: any) => ({
        base_stat: stat.base_stat,
        name: stat.stat.name,
        rank: 0,
        width: '0%',
      }));

      data.sort((a: any, b: any) => b.base_stat - a.base_stat);

      let currentRank = 1;
      let previousStat = data[0].base_stat;

      data.forEach((item: any, index: number) => {
        if (item.base_stat !== previousStat) {
          currentRank = currentRank + 1;
        }
        item.rank = currentRank;
        item.width = `${58 - (currentRank - 1) * 6}%`
        previousStat = item.base_stat;
      });

      setChartData(data);
    }
  }, [pokemon]);

  const getWidth = (name: string) => {
    let ans = '0%';
    chartData.map((data: any) => {
      if (data.name === name) {
        ans = data.width
      }
    })
    return ans;
  }
  return (
    <>
      {pokemon &&
        <div className={`w-full relative bg-p-blue p-6 rounded-xl`}>
          <div className="absolute top-3 left-3 cursor-pointer" onClick={() => setSelectedPokemon(null)}>
            <Image src='/cross.png' className={`w-[40px]`} width={2000} height={2000} alt="cross" />
          </div>
          <div className="w-[60%] mx-auto">
            <Image src={pokemon?.imgFront} className={`w-full`} width={2000} height={2000} alt="pokemom" />
          </div>
          <div>
            <div className="text-4xl text-p-orange font-bold text-center">{pokemon?.name.toUpperCase()}</div>
            <div className="flex justify-around my-4 text-lg">
              <div className="text-white">Height: <span className="">{pokemon?.height} cm</span></div>
              <div className="text-white">Weight: <span>{pokemon?.height} kg</span></div>
            </div>
            <div className="flex gap-4 my-4 justify-around">
              {pokemon?.types?.map((type: PokemonType, index: number) => (
                <div
                  className={`py-1 px-8 rounded-xl text-white text-lg`}
                  style={{ backgroundColor: pokemonTypeColor[type.type.name as keyof typeof pokemonTypeColor] }}
                  key={index}
                >
                  {type.type.name}
                </div>
              ))}
            </div>
            <div className="h-[1px] bg-p-gray w-[90%] mx-auto my-8 "></div>
            <div className="my-4">
              <div className="text-white text-2xl font-semibold my-2 text-center">ABILITIES</div>
              <div className="flex gap-6 my-2 justify-around">
                {pokemon.abilities.map((ability: PokemonAbility, index: number) => (
                  <div key={index} className="text-p-gray font-semibold" > {ability.ability.name.toUpperCase()}</div>
                ))}
              </div>
            </div>
            <div className="h-[1px] bg-p-gray w-[90%] mx-auto my-8 "></div>
            <div className="my-4">
              <div className="text-white text-2xl font-semibold my-2 text-center">STATS</div>
              <div className="w-full">
                {pokemon.stats.map((stat: PokemonStat, index: number) => (
                  <div className={`flex items-center`} key={index}>
                    <div className="text-xs text-p-gray w-[30%]">{stat?.stat?.name?.toUpperCase()}</div>
                    <div className="bg-p-orange h-2 mr-1"
                      style={{
                        width: getWidth(stat.stat.name)
                      }}
                    ></div>
                    <div className="text-xs text-white w-[10%]">{stat.base_stat}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div >
      }
    </>
  )
}