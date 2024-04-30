import { Hero } from "@/components/hero/hero";
import { Navbar } from "@/components/navbar/navbar";
import { PokemonCard } from "@/components/pokemon-card/pokemon-card";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <div className="w-1/4 p-8" >
        <PokemonCard />
      </div> */}
    </>
  );
}
