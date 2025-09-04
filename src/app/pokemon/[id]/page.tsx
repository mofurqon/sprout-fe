'use client';

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import PokemonTabs from "@/components/PokemonTabs";
import { usePokemonDetail } from "@/hooks/usePokemon";

interface PokemonDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PokemonDetail({ params }: PokemonDetailProps) {
  const unwrappedParams = React.use(params);
  const { pokemon, isLoading, isError } = usePokemonDetail(unwrappedParams.id);
  
  useEffect(() => {
    if (isError) {
      notFound();
    }
  }, [isError]);
  
  if (isLoading || !pokemon) {
    return (
      <div className="min-h-screen font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Pokémon data...</p>
        </div>
      </div>
    );
  }
  
  const getBgColor = () => {
    switch(pokemon.bgColor) {
      case 'green':
        return 'bg-[#4cd1a0]';
      case 'red':
        return 'bg-[#ff8c82]';
      case 'blue':
        return 'bg-[#70b7ff]';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col bg-gray-100">
      <div 
        className={`${getBgColor()} pt-10 pb-32 px-6 relative overflow-hidden flex-shrink-0`}
        style={{ 
          backgroundImage: 'url(/pokeball-bg.svg)', 
          backgroundPosition: 'right -30px top -30px', 
          backgroundRepeat: 'no-repeat', 
          backgroundSize: '300px',
          backgroundBlendMode: 'soft-light' 
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <Link href="/?reset=true" className="text-white font-semibold">
            &lt; Back
          </Link>
          <div className="text-white/80 font-semibold">#{pokemon.id.toString().padStart(3, '0')}</div>
        </div>
        
        <h1 className="text-3xl font-bold text-white">{pokemon.name}</h1>
        
        <div className="flex gap-2 mt-2">
          {pokemon.types?.map((typeInfo, index) => (
            <span 
              key={index}
              className={`px-3 py-1 rounded-full bg-white/30 text-white text-xs capitalize shadow-sm backdrop-blur-sm`}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>
        
        <div className="absolute left-1/2 bottom-20 transform -translate-x-1/2 translate-y-1/2 z-10 drop-shadow-lg">
          <div className="w-[200px] h-[200px] flex items-center justify-center">
            <Image 
              src={pokemon.image} 
              alt={pokemon.name} 
              width={200} 
              height={200} 
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-t-3xl px-6 pt-16 pb-8 -mt-8 relative flex-grow shadow-inner">
        <PokemonTabs pokemon={pokemon} />
      </div>
    </div>
  );
}
