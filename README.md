# Pokédex - A Next.js Application

A modern, responsive Pokédex web application built with Next.js and TypeScript. This application leverages the [PokéAPI](https://pokeapi.co/) to display information about various Pokémon, including their types, stats, evolutions, and moves.

![Pokémon Application Screenshot](https://via.placeholder.com/800x400?text=Pok%C3%A9dex+Screenshot)

## Features

- **Responsive Design**: Works on all device sizes with optimized layouts
- **Infinite Scroll**: Load more Pokémon as you scroll down the page
- **Detailed View**: View detailed information about each Pokémon
- **Type Color Coding**: Visual indication of Pokémon types
- **Stat Visualization**: Colorful bars representing Pokémon stats
- **Evolution Chains**: See the evolutionary progression of each Pokémon
- **Move Lists**: View a list of moves for each Pokémon
- **Smooth Navigation**: Back-to-top button and navigation between pages
- **Pokéball UI Theme**: Stylish Pokéball backgrounds and design elements

## Tech Stack

- **Framework**: [Next.js 15.5](https://nextjs.org/) with App Router and React 19.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Data Fetching**: SWR with Axios
- **Icons**: Custom SVG elements
- **Image Optimization**: Next.js Image component

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the Pokédex in action.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Homepage with Pokémon list
│   ├── pokemon/[id]/       # Dynamic routes for Pokémon details
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── PokemonCard.tsx     # Card component for Pokémon list
│   ├── PokemonTabs.tsx     # Tabs for Pokémon details
│   ├── TabContent.tsx      # Tab content container
│   └── BackToTop.tsx       # Back to top button
├── hooks/                  # Custom React hooks
│   └── usePokemon.ts       # Hooks for fetching Pokémon data
├── types/                  # TypeScript type definitions
│   └── pokemon.ts          # Pokémon type definitions
└── utils/                  # Utility functions
    └── api.ts              # API client and helper functions
```

## API Integration

This project uses the [PokéAPI](https://pokeapi.co/), a free RESTful Pokémon API. The application fetches data including:

- Basic Pokémon information
- Type details
- Stats
- Evolution chains
- Moves

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [PokéAPI](https://pokeapi.co/) for providing the Pokémon data
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Pokémon](https://www.pokemon.com/) for the inspiration
