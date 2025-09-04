import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  species: {
    name: string;
    url: string;
  };
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
}

export interface PokemonSpeciesResponse {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }[];
  evolution_chain: {
    url: string;
  };
}

export interface EvolutionChainResponse {
  chain: {
    species: {
      name: string;
      url: string;
    };
    evolves_to: {
      species: {
        name: string;
        url: string;
      };
      evolves_to: {
        species: {
          name: string;
          url: string;
        };
      }[];
    }[];
  };
}

export const getPokemonIdFromUrl = (url: string): number => {
  const matches = url.match(/\/pokemon\/(\d+)\//);
  return matches ? parseInt(matches[1], 10) : 0;
};

export const getPokemonIdFromSpeciesUrl = (url: string): number => {
  const matches = url.match(/\/pokemon-species\/(\d+)\//);
  return matches ? parseInt(matches[1], 10) : 0;
};

export const getPokemonTypeColor = (type: string): 'green' | 'red' | 'blue' => {
  const typeColors: { [key: string]: 'green' | 'red' | 'blue' } = {
    grass: 'green',
    bug: 'green',
    poison: 'green',
    fire: 'red',
    dragon: 'red',
    fighting: 'red',
    water: 'blue',
    ice: 'blue',
    electric: 'blue',
  };

  return typeColors[type.toLowerCase()] || 'blue';
};

export const formatPokemonStats = (stats: PokemonDetailResponse['stats']) => {
  const statsMap: { [key: string]: string } = {
    hp: 'hp',
    attack: 'attack',
    defense: 'defense',
    'special-attack': 'specialAttack',
    'special-defense': 'specialDefense',
    speed: 'speed',
  };

  const formattedStats: { [key: string]: number } = {};
  stats.forEach((stat) => {
    const statName = statsMap[stat.stat.name];
    if (statName) {
      formattedStats[statName] = stat.base_stat;
    }
  });

  return formattedStats;
};
