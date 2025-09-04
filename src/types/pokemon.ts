export type Pokemon = {
  id: number;
  name: string;
  types: {
    slot: number;
    type: {
      name: string;
    }
  }[];
  image: string;
  bgColor: 'green' | 'red' | 'blue';
  species?: string;
  height?: string;
  weight?: string;
  abilities?: string[];
  stats?: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  moves?: {
    move: {
      name: string;
    };
  }[];
  evolutions?: {
    id: number;
    name: string;
    image: string;
  }[];
};
