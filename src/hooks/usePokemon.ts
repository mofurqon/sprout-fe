import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { apiClient, PokemonListResponse, PokemonDetailResponse, PokemonSpeciesResponse, EvolutionChainResponse, getPokemonIdFromUrl, getPokemonTypeColor, formatPokemonStats, getPokemonIdFromSpeciesUrl } from '@/utils/api';
import { Pokemon } from '@/types/pokemon';
import { capitalizePokemonName } from '@/utils/stringUtils';

const fetcher = async (url: string) => {
  const response = await apiClient.get(url);
  return response.data;
};

export function usePokemonList(limit: number = 20, offset: number = 0) {
  const cacheKey = `/pokemon?limit=${limit}&offset=${offset}`;
  
  const { data, error, isLoading, mutate } = useSWR<PokemonListResponse>(
    cacheKey, 
    fetcher,
    { 
      revalidateOnFocus: false, 
      dedupingInterval: 60000, 
      shouldRetryOnError: true 
    }
  );
  
  const [pokemonWithTypes, setPokemonWithTypes] = useState<Pokemon[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [currentOffset, setCurrentOffset] = useState<number>(-1);
  
  useEffect(() => {
    if (data?.results && currentOffset !== offset) {
      setCurrentOffset(offset);
      const fetchPokemonTypes = async () => {
        setIsLoadingDetails(true);
        try {
          const formattedPokemon: Pokemon[] = await Promise.all(
            data.results.map(async (pokemon) => {
              const id = getPokemonIdFromUrl(pokemon.url);
              try {
                const details = await apiClient.get(`/pokemon/${id}`);
                const types = details.data.types;
                return {
                  id,
                  name: capitalizePokemonName(pokemon.name),
                  types: types.map((t: { slot: number, type: { name: string } }) => ({
                    slot: t.slot,
                    type: { name: t.type.name }
                  })),
                  image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                  bgColor: getPokemonTypeColor(types[0].type.name)
                };
              } catch {
                // Fallback for any failed requests
                return {
                  id,
                  name: capitalizePokemonName(pokemon.name),
                  types: [{ slot: 1, type: { name: "unknown" } }],
                  image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                  bgColor: 'blue' as 'green' | 'red' | 'blue'
                };
              }
            })
          );
          setPokemonWithTypes(formattedPokemon);
        } finally {
          setIsLoadingDetails(false);
        }
      };
      
      fetchPokemonTypes();
    }
  }, [data, offset, currentOffset]);
  
  return {
    pokemonList: data,
    formattedPokemon: pokemonWithTypes,
    isLoading: isLoading || isLoadingDetails,
    isError: error,
    mutate,
    currentOffset: offset
  };
}

export function usePokemonDetail(idOrName: number | string) {
  const { data: pokemon, error: pokemonError, isLoading: pokemonLoading } = 
    useSWR<PokemonDetailResponse>(
      idOrName ? `/pokemon/${idOrName}` : null, 
      fetcher
    );
  
  const { data: species, error: speciesError, isLoading: speciesLoading } = 
    useSWR<PokemonSpeciesResponse>(
      pokemon?.species.url ? pokemon.species.url : null, 
      fetcher
    );
  
  const { data: evolutionChain, error: evolutionError, isLoading: evolutionLoading } = 
    useSWR<EvolutionChainResponse>(
      species?.evolution_chain?.url ? species.evolution_chain.url : null, 
      fetcher
    );
  
  const isLoading = pokemonLoading || speciesLoading || evolutionLoading;
  const error = pokemonError || speciesError || evolutionError;
  
  const formattedPokemon: Pokemon | undefined = pokemon ? {
    id: pokemon.id,
    name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
    types: pokemon.types.map((t: { slot: number, type: { name: string } }) => ({
      slot: t.slot,
      type: { name: t.type.name }
    })),
    image: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
    bgColor: getPokemonTypeColor(pokemon.types[0].type.name),
    species: capitalizePokemonName(pokemon.species.name),
    height: `${(pokemon.height / 10).toFixed(1)}m`,
    weight: `${(pokemon.weight / 10).toFixed(1)}kg`,
    abilities: pokemon.abilities.map(a => capitalizePokemonName(a.ability.name)),
    stats: formatPokemonStats(pokemon.stats) as Pokemon['stats'],
    moves: pokemon.moves.slice(0, 4).map(m => ({
      move: {
        name: m.move.name
      }
    })),
    evolutions: []
  } : undefined;

  if (formattedPokemon && evolutionChain) {
    const evolutions = [];
    
    const firstForm = evolutionChain.chain.species;
    const firstFormId = getPokemonIdFromSpeciesUrl(firstForm.url);
    evolutions.push({
      id: firstFormId,
      name: capitalizePokemonName(firstForm.name),
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${firstFormId}.png`
    });
    
    if (evolutionChain.chain.evolves_to.length > 0) {
      const secondForm = evolutionChain.chain.evolves_to[0].species;
      const secondFormId = getPokemonIdFromSpeciesUrl(secondForm.url);
      evolutions.push({
        id: secondFormId,
        name: capitalizePokemonName(secondForm.name),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${secondFormId}.png`
      });
      

      if (evolutionChain.chain.evolves_to[0].evolves_to.length > 0) {
        const thirdForm = evolutionChain.chain.evolves_to[0].evolves_to[0].species;
        const thirdFormId = getPokemonIdFromSpeciesUrl(thirdForm.url);
        evolutions.push({
          id: thirdFormId,
          name: capitalizePokemonName(thirdForm.name),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${thirdFormId}.png`
        });
      }
    }
    
    formattedPokemon.evolutions = evolutions;
  }
  
  return {
    pokemon: formattedPokemon,
    isLoading,
    isError: error
  };
}
