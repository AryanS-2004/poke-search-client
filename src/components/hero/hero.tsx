'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from 'axios';
import { PokemonCard } from "../pokemon-card/pokemon-card";
import { PokemonDetails } from "../pokemon-details/pokemon-details";
import { PokemonCardLoader } from "../loaders/pokemon-card-loader/card-loader";


export function Hero() {

  const [search, setSearch] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Stats",
        data: [],
        backgroundColor: ["rgba(255, 99, 132, 0.25)"], // Removed spaces after "rgba"
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1
      }
    ]
  })

  let loaderArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];



  useEffect(() => {
    getPokemons();
  }, [page])

  const setWithExpiry = (key: string, value: any, expiryInMinutes: number) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + expiryInMinutes * 60 * 1000,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  const getWithExpiry = (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };

  const numbersArray = [];
  for (let i = 1; i <= 109; i++) {
    numbersArray.push(i);
  }


  const getPokemons = async () => {
    try {
      const res = await axios.post(`http://localhost:3004/v1/pokemons`, { offset: (page - 1) * 12, limit: 12 });
      console.log(res.data.pokemons);
      setPokemons(res.data.pokemons);

    } catch (err) {
      console.log(err);
    }
  }

  const handlePokemonSelect = async (id: string) => {
    console.log(id);
    try {
      const res = await axios.get(`http://localhost:3004/v1/pokemons/${id}`);
      console.log(res.data.pokemon);
      setSelectedPokemon(res.data.pokemon);
      const pokemon = res.data.pokemon;
      const newLabels: any = [];
      const newData: any = [];
      pokemon.stats.forEach((stat: any) => {
        newLabels.push(stat?.stat?.name);
        newData.push(stat?.base_stat);
      });
      setBarChartData({
        labels: newLabels,
        datasets: [
          {
            label: "Stats",
            data: newData,
            backgroundColor: ["rgba (255, 99, 132, 0.2)"],
            borderColor: ["rgba(54, 162, 235, 1)"],
            borderWidth: 1
          }
        ]
      });
    } catch (err) {
      console.log(err);
    }
  }
  const handleSearch = async () => {
    console.log(search);
    if (search === "") {
      try {
        const res = await axios.post(`http://localhost:3004/v1/pokemons`, { offset: (page - 1) * 12, limit: 12 });
        console.log(res.data.pokemons);
        setPokemons(res.data.pokemons);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post(`http://localhost:3004/v1/pokemons/search/${search}`,);
      console.log(res.data.pokemons);
      setPokemons(res.data.pokemons);
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <>
      <div>
        <div className="p-8 pb-4 flex">
          <input type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Pokemon Here...."
            className="p-4 rounded-xl w-[90%]"
            style={{
              boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
              border: '2px solid #ef8354'
            }}
          />
          <div
            className="w-[8%] mx-auto flex items-center justify-center cursor-pointer"
            onClick={handleSearch}
          >
            <Image src="/search.png" className="w-[60px]" width={2000} height={2000} alt="search" />
          </div>
        </div>
        <div className="flex items-center w-[80%] mx-auto mb-4">
          <div className={`w-[10%] flex justify-center`}>
            <Image
              src={`${page === 1 ? '/left-gray.png' : '/left-orange.png'}`}
              style={{
                boxShadow: page === 1 ? '0px 10px 15px -3px #BFC0C0' : '0px 10px 15px -3px #EF8354',
              }}
              onClick={() => {
                if (page !== 1) setPokemons([]);
                setPage(page === 1 ? 1 : page - 1)
              }}
              className="w-[40px] cursor-pointer rounded-full"
              width={2000}
              height={2000}
              alt="."
            />
          </div>
          <div className={`flex w-[90%] justify-around overflow-hidden text-white`}>
            {numbersArray.slice(page > 5 ? page - 5 : 0, page > 5 ? page + 5 : 10).map((number, index: number) => (
              <div
                key={index}
                onClick={() => {
                  if (page !== number) setPokemons([]);
                  setPage(number);
                }}
                className={`p-2 rounded-lg w-12 text-center font-semibold ${page === number ? 'bg-p-orange' : 'bg-p-gray'}`}
              >{number}</div>
            ))}
          </div>
          <div className={`w-[10%] flex justify-center`}>
            <Image
              src={`${page === 109 ? '/right-gray.png' : '/right-orange.png'}`}
              className="w-[40px]  cursor-pointer rounded-full"
              style={{
                boxShadow: page === 109 ? '0px 10px 15px -3px #BFC0C0' : '0px 10px 15px -3px #EF8354',
              }}
              onClick={() => {
                if (page !== 109) setPokemons([]);
                setPage(page === 109 ? 109 : page + 1)
              }}
              width={2000}
              height={2000}
              alt="."
            />
          </div>
        </div>
        <div className="md:flex gap-4 justify-around px-6 mb-8">
          <div className={`${selectedPokemon ? 'w-[100%] md:w-[75%] lg:w-1/2' : 'w-0 p-0'} md:hidden transition-all duration-500 transform  flex flex-col mb-8`}>
            <PokemonDetails pokemon={selectedPokemon} barChartData={barChartData} setSelectedPokemon={setSelectedPokemon} />
          </div>
          <div className={`flex gap-6 flex-wrap justify-between ${selectedPokemon ? 'w-[100%] md:w-1/4 lg:w-1/2' : 'w-full'}`}>
            {pokemons.length === 0 && loaderArray.map((loader: any, index: number) => (
              <div className={`w-[100%] sm:w-[48%] md:w-[30%] lg:w-[23%] hover:scale-105 transition-all duration-300 transform`} onClick={() => {
              }}
                key={index}
              >
                <PokemonCardLoader key={index} />
              </div>
            ))
            }
            {pokemons && pokemons.map((pokemon: any, index: number) => (
              <div className={`${selectedPokemon ? 'w-[100%]  lg:w-[47%]' : 'w-[100%] sm:w-[48%] md:w-[30%] lg:w-[23%]'} flex flex-col flex-col-1 hover:scale-105 transition-all duration-300 transform`} onClick={() => {
                handlePokemonSelect(pokemon?.name)
              }}
                key={index}
              >
                <PokemonCard key={index} pokemon={pokemon} />
              </div>
            ))
            }
          </div>
          <div className={`${selectedPokemon ? 'w-[100%] md:w-[75%] lg:w-1/2' : 'w-0 p-0'} transition-all duration-500 transform  hidden md:flex flex-col`}>
            <PokemonDetails pokemon={selectedPokemon} barChartData={barChartData} setSelectedPokemon={setSelectedPokemon} />
          </div>
        </div>
      </div>
    </>
  )
};