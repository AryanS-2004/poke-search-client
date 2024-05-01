type Pokemon = {
  id: number,
  name: string,
  order: number,
  imgFront: string,
  imgBack: string,
  types: PokemonType[],
};

type PokemonType = {
  slot: string,
  type: {
    name: string,
    url: string
  }
}

type PokemonAbility = {
  ability: {
    name: string,
    url: string
  },
  is_hidden: boolean,
  slot: number

}

type PokemonStat = {
  base_stat: number,
  effort: number,
  stat: {
    name: string,
    url: string
  }
}

type SinglePokemon = {
  id: number,
  name: string,
  height: number,
  order: number,
  imgFront: string,
  imgBack: string,
  abilities: PokemonAbility[],
  stats: PokemonStat[],
  types: PokemonType[],
  weight: number,
}

type ChartData = {
  base_stat: number,
  name: string,
  rank: number,
  width: string
}