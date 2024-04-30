import Image from "next/image";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

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

export function PokemonDetails({ pokemon, setSelectedPokemon, barChartData }: { pokemon: any, setSelectedPokemon: any, barChartData: any }) {

  // const [barChartData, setBarChartData] = useState({
  //   labels: [],
  //   datasets: [
  //     {
  //       label: "Stats",
  //       data: [],
  //       backgroundColor: ["rgba(255, 99, 132, 0.25)"], // Removed spaces after "rgba"
  //       borderColor: ["rgba(54, 162, 235, 1)"],
  //       borderWidth: 1
  //     }
  //   ]
  // })
  // const barChartData = {
  //   labels: [],
  //   datasets: [
  //     {
  //       label: "Stats",
  //       data: [],
  //       backgroundColor: ["rgba (255, 99, 132, 0.2)"],
  //       borderColor: ["rgba(54, 162, 235, 1)"],
  //       borderWidth: 1
  //     }
  //   ]
  // }
  // console.log(barChartData)
  // useEffect(() => {
  //   if (pokemon && pokemon?.id > 0) {
  //     const newLabels: any = [];
  //     const newData: any = [];
  //     pokemon.stats.forEach((stat: any) => {
  //       newLabels.push(stat?.stat?.name);
  //       newData.push(stat?.base_stat);
  //     });
  //     setBarChartData({
  //       labels: newLabels,
  //       datasets: [
  //         {
  //           label: "Stats",
  //           data: newData,
  //           backgroundColor: ["rgba (255, 99, 132, 0.2)"],
  //           borderColor: ["rgba(54, 162, 235, 1)"],
  //           borderWidth: 1
  //         }
  //       ]
  //     });
  //   }
  // }, [pokemon]);

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
              {pokemon?.types?.map((type: any, index: number) => (
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
                {pokemon.abilities.map((ability: any, index: number) => (
                  <div key={index} className="text-p-gray font-semibold" > {ability.ability.name.toUpperCase()}</div>
                ))}
              </div>
            </div>
            <div className="h-[1px] bg-p-gray w-[90%] mx-auto my-8 "></div>
            <div className="my-4">
              <div className="text-white text-2xl font-semibold my-2 text-center">STATS</div>
              <div className="w-full">
                <Bar options={options} data={barChartData} />
              </div>
            </div>
          </div>
        </div >
      }
    </>
  )
}