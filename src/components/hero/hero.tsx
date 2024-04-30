'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from 'axios';
import { PokemonCard } from "../pokemon-card/pokemon-card";
import { PokemonDetails } from "../pokemon-details/pokemon-details";


export function Hero() {

  const [search, setSearch] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
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


  useEffect(() => {
    getPokemons();
  }, [])

  const setWithExpiry = (key: string, value: any, expiryInMinutes: number) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + expiryInMinutes * 60 * 1000, // Convert minutes to milliseconds
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
      localStorage.removeItem(key); // Remove the item if it has expired
      return null;
    }
    return item.value;
  };


  const getPokemons = async () => {
    try {
      const res = await axios.post(`http://localhost:3004/v1/pokemons`, { offset: page * 12, limit: page * 12 + 12 });
      console.log(res.data.pokemons);
      setPokemons(res.data.pokemons);
      // setWithExpiry('allPokemons', res.data.allPokemons, 30);
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
        const res = await axios.post(`http://localhost:3004/v1/pokemons`, { offset: page * 12, limit: page * 12 + 12 });
        console.log(res.data.pokemons);
        setPokemons(res.data.pokemons);
        // setWithExpiry('allPokemons', res.data.allPokemons, 30);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post(`http://localhost:3004/v1/pokemons/search/${search}`, { offset: page * 12, limit: page * 12 + 12 });
      console.log(res.data.pokemons);
      setPokemons(res.data.pokemons);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div>
        <div className="p-8 flex">
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
        <div className="flex gap-4 justify-around px-6 mb-8">
          <div className={`flex gap-6 flex-wrap justify-between ${selectedPokemon ? 'w-1/2' : 'w-full'}`}>
            {pokemons && pokemons.map((pokemon: any, index: number) => (
              <div className={`${selectedPokemon ? 'w-[48%]' : 'w-[23%]'}`} onClick={() => {
                handlePokemonSelect(pokemon?.name)
              }}
                key={index}
              >
                <PokemonCard key={index} pokemon={pokemon} />
              </div>
            ))
            }
          </div>
          <div className={`${selectedPokemon ? 'w-1/2' : 'w-0 p-0'} transition-all duration-500 transform  flex flex-col`}>
            <PokemonDetails pokemon={selectedPokemon} barChartData={barChartData} setSelectedPokemon={setSelectedPokemon} />
          </div>
        </div>
      </div>
    </>
  )
};