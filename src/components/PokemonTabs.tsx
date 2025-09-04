'use client';

import React, { useState } from "react";
import TabContent from "@/components/TabContent";
import Image from "next/image";
import Link from "next/link";
import { Pokemon } from "@/types/pokemon";
import { capitalizePokemonName, formatWeight, formatHeight } from "@/utils/stringUtils";

interface PokemonTabsProps {
  pokemon: Pokemon;
}

export default function PokemonTabs({ pokemon }: PokemonTabsProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'baseStats' | 'evolution' | 'moves'>('about');
  console.log({ pokemon: pokemon.evolutions });

  return (
    <>
      <div className="flex border-b border-gray-200 -mx-2">
        <button 
          onClick={() => setActiveTab('about')} 
          className={`px-4 py-3 ${activeTab === 'about' ? 'border-b-2 border-indigo-500 text-gray-700 font-medium' : 'text-gray-500'}`}
        >
          About
        </button>
        <button 
          onClick={() => setActiveTab('baseStats')} 
          className={`px-4 py-3 ${activeTab === 'baseStats' ? 'border-b-2 border-indigo-300 text-gray-700 font-medium' : 'text-gray-500'}`}
        >
          Base Stats
        </button>
        <button 
          onClick={() => setActiveTab('evolution')} 
          className={`px-4 py-3 ${activeTab === 'evolution' ? 'border-b-2 border-indigo-300 text-gray-700 font-medium' : 'text-gray-500'}`}
        >
          Evolution
        </button>
        <button 
          onClick={() => setActiveTab('moves')} 
          className={`px-4 py-3 ${activeTab === 'moves' ? 'border-b-2 border-indigo-300 text-gray-700 font-medium' : 'text-gray-500'}`}
        >
          Moves
        </button>
      </div>
      
      <TabContent isActive={activeTab === 'about'}>
        <div className="py-6">
          <div className="grid grid-cols-2 gap-y-4">
            <div className="text-gray-500">Species</div>
            <div className="font-medium text-gray-500">{pokemon.species || 'Unknown'}</div>
            
            <div className="text-gray-500">Height</div>
            <div className="font-medium text-gray-500">{formatHeight(pokemon.height)}</div>
            
            <div className="text-gray-500">Weight</div>
            <div className="font-medium text-gray-500">{formatWeight(pokemon.weight)}</div>
            
            <div className="text-gray-500">Abilities</div>
            <div className="font-medium text-gray-500">{pokemon.abilities?.map(ability => capitalizePokemonName(ability)).join(', ') || 'Unknown'}</div>
          </div>
        </div>
      </TabContent>
      
      <TabContent isActive={activeTab === 'baseStats'}>
        <div className="py-6">
          <div className="space-y-3">
            {pokemon.stats ? (
              <>
                <div className="flex items-center">
                  <span className="w-24 text-gray-500">HP</span>
                  <span className="w-8 text-right font-medium mr-4">{pokemon.stats.hp}</span>
                  <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${pokemon.stats.hp >= 70 ? 'bg-green-500' : (pokemon.stats.hp >= 40 ? 'bg-yellow-500' : 'bg-red-500')} rounded-full`} 
                      style={{ width: `${Math.max(1, Math.min(100, pokemon.stats.hp))}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="w-24 text-gray-500">Attack</span>
                  <span className="w-8 text-right font-medium mr-4">{pokemon.stats.attack}</span>
                  <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${pokemon.stats.attack >= 70 ? 'bg-green-500' : (pokemon.stats.attack >= 40 ? 'bg-yellow-500' : 'bg-red-500')} rounded-full`} 
                      style={{ width: `${Math.max(1, Math.min(100, pokemon.stats.attack))}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="w-24 text-gray-500">Defense</span>
                  <span className="w-8 text-right font-medium mr-4">{pokemon.stats.defense}</span>
                  <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${pokemon.stats.defense >= 70 ? 'bg-green-500' : (pokemon.stats.defense >= 40 ? 'bg-yellow-500' : 'bg-red-500')} rounded-full`} 
                      style={{ width: `${Math.max(1, Math.min(100, pokemon.stats.defense))}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="w-24 text-gray-500">Sp. Atk</span>
                  <span className="w-8 text-right font-medium mr-4">{pokemon.stats.specialAttack}</span>
                  <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${pokemon.stats.specialAttack >= 70 ? 'bg-green-500' : (pokemon.stats.specialAttack >= 40 ? 'bg-yellow-500' : 'bg-red-500')} rounded-full`} 
                      style={{ width: `${Math.max(1, Math.min(100, pokemon.stats.specialAttack))}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="w-24 text-gray-500">Sp. Def</span>
                  <span className="w-8 text-right font-medium mr-4">{pokemon.stats.specialDefense}</span>
                  <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${pokemon.stats.specialDefense >= 70 ? 'bg-green-500' : (pokemon.stats.specialDefense >= 40 ? 'bg-yellow-500' : 'bg-red-500')} rounded-full`} 
                      style={{ width: `${Math.max(1, Math.min(100, pokemon.stats.specialDefense))}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="w-24 text-gray-500">Speed</span>
                  <span className="w-8 text-right font-medium mr-4">{pokemon.stats.speed}</span>
                  <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${pokemon.stats.speed >= 70 ? 'bg-green-500' : (pokemon.stats.speed >= 40 ? 'bg-yellow-500' : 'bg-red-500')} rounded-full`} 
                      style={{ width: `${Math.max(1, Math.min(100, pokemon.stats.speed))}%` }}
                    ></div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500">No stats available</div>
            )}
          </div>
        </div>
      </TabContent>
      
      <TabContent isActive={activeTab === 'evolution'}>
        <div className="py-6 flex justify-center">
          {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
            <div className="flex items-center flex-wrap justify-center">
              {pokemon.evolutions.map((evolution, index) => (
                <React.Fragment key={evolution.id}>
                  <Link href={`/pokemon/${evolution.id}`} className="flex flex-col items-center">
                    <Image 
                      src={evolution.image} 
                      alt={evolution.name} 
                      width={80} 
                      height={80} 
                      className="object-contain"
                    />
                    <span className="mt-1 font-medium text-gray-500">{capitalizePokemonName(evolution.name)}</span>
                  </Link>
                  
                  {pokemon.evolutions && index < pokemon.evolutions.length - 1 && (
                    <div className="mx-4 text-gray-700">→</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">No evolution data available</div>
          )}
        </div>
      </TabContent>
      
      <TabContent isActive={activeTab === 'moves'}>
        <div className="py-6">
          <div className="space-y-3">
            {pokemon.moves && pokemon.moves.length > 0 ? (
              pokemon.moves.map((move, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-500">
                    {capitalizePokemonName(move.move.name)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No moves available</div>
            )}
          </div>
        </div>
      </TabContent>
    </>
  );
}
