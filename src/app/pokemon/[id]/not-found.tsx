import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen font-sans bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Pokémon Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, the Pokémon you&apos;re looking for doesn&apos;t exist in our Pokédex.
        </p>
        <Link href="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
          Return to Pokédex
        </Link>
      </div>
    </div>
  );
}
