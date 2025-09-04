import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import Link from "next/link";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const getBgColor = () => {
    switch (pokemon.bgColor) {
      case "green":
        return "bg-[#4cd1a0]";
      case "red":
        return "bg-[#ff8c82]";
      case "blue":
        return "bg-[#70b7ff]";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div
        className={`${getBgColor()} rounded-2xl p-4 flex flex-col relative w-full pb-[75%] cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300 shadow-md overflow-hidden`}
        style={{ 
          backgroundImage: 'url(/pokeball-bg.svg)', 
          backgroundPosition: 'right -10px bottom -10px', 
          backgroundRepeat: 'no-repeat', 
          backgroundSize: '150px',
          backgroundBlendMode: 'soft-light' 
        }}
      >
        <div className="z-10 absolute top-4 left-4">
          <h3 className="text-base font-semibold text-white">{pokemon.name}</h3>
          <div className="flex flex-col gap-1 mt-1">
            {pokemon.types?.map((typeInfo, index) => (
              <span 
                key={index}
                className={`px-3 py-1 rounded-full bg-white/30 text-white text-xs inline-block capitalize shadow-sm backdrop-blur-sm`}
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 flex items-center justify-center">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={200}
            height={200}
            className="object-contain w-full h-full"
            priority
          />
        </div>
      </div>
    </Link>
  );
}
