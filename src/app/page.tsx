'use client';

import PokemonCard from "@/components/PokemonCard";
import BackToTop from "@/components/BackToTop";
import { usePokemonList } from "@/hooks/usePokemon";
import { useEffect, useState, useRef, useCallback } from "react";
import { Pokemon } from "@/types/pokemon";

export default function Home() {
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const loadingRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const initialLoadRef = useRef(true);

  const { formattedPokemon, isLoading, isError } = usePokemonList(limit, offset);
  
  useEffect(() => {
    if (formattedPokemon?.length) {
      setPokemonList(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const newPokemon = formattedPokemon.filter(p => !existingIds.has(p.id));
        console.log('Adding new unique Pokemon:', newPokemon.length);
        return [...prev, ...newPokemon];
      });
      
      setIsLoadingMore(false);
      
      if (initialLoadRef.current) {
        initialLoadRef.current = false;
      }
    }
  }, [formattedPokemon]);
  
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isLoading && !isLoadingMore && hasMore) {
        console.log('Loading more Pokemon, new offset:', offset + limit);
        setIsLoadingMore(true);
        setOffset(prevOffset => prevOffset + limit);
      }
    },
    [isLoading, isLoadingMore, hasMore, limit, offset]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '0px 0px 300px 0px',
      threshold: 0.1
    });
    
    const currentLoadingRef = loadingRef.current;
    
    if (currentLoadingRef) {
      observer.observe(currentLoadingRef);
    }

    return () => {
      if (currentLoadingRef) {
        observer.unobserve(currentLoadingRef);
      }
    };
  }, [observerCallback]);
  
  useEffect(() => {
    if (formattedPokemon?.length < limit && formattedPokemon?.length > 0) {
      console.log('Reached the end of available Pokemon');
      setHasMore(false);
    }
  }, [formattedPokemon, limit]);

  return (
    <div className="font-sans min-h-screen p-5 sm:p-6 bg-gray-100">
      <main className="max-w-md mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-600">Pokédex</h1>
        
        {(isLoading && offset === 0) && (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {isError && (
          <div className="text-center py-8 text-red-500">
            Error loading Pokémon data. Please try again later.
          </div>
        )}
        
        {pokemonList.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {pokemonList.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
        
        {(isLoading || isLoadingMore) && offset > 0 && (
          <div className="flex justify-center py-6">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Loading more Pokémon...</span>
          </div>
        )}
        
        {!hasMore && pokemonList.length > 0 && (
          <div className="text-center py-6 text-gray-500">
            No more Pokémon to load
          </div>
        )}

        <div ref={loadingRef} className="h-10 mt-4"></div>
      </main>
      <BackToTop />
    </div>
  );
}
