import Image from "next/image";

const pokemonTypeColor = [

  '#A8A878',
  '#F08030',
  '#6890F0',
  '#F8D030',
  '#78C850',
  '#98D8D8',
  '#C03028',
  '#A040A0',
  '#E0C068',
  '#A890F0',
  '#F85888',
  '#A8B820',
  '#B8A038',
  '#705898',
  '#7038F8',
  '#705848',
  '#B8B8D0',
  '#F0B6BC',
]

const array = new Array(2, 3);

export function PokemonCardLoader() {
  return (
    <>
      <div
        className="bg-p-orange rounded-2xl p-4 w-full cursor-pointer"
        style={{ 'boxShadow': '0px 10px 15px -3px #EF8354' }}
      >
        <div className="px-3 py-2 bg-p-gray w-8 animate-pulse rounded-full">
        </div>
        <div className="w-full h-64 bg-p-gray animate-pulse rounded-xl my-4">
        </div>
        <div>
          <div className="py-4 w-48 rounded-full bg-p-gray animate-pulse my-4">
          </div>
          <div className="flex gap-2">
            {array?.map((type: number, index: number) => (
              <div
                className={`py-3 animate-pulse w-16 rounded-full`}
                style={{ backgroundColor: pokemonTypeColor[type] }}
                key={index}
              >
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
};