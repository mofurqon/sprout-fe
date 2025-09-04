/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns The capitalized string
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Capitalizes the first letter of each word in a string
 * @param str - The string to capitalize
 * @returns The title case string
 */
export function capitalizeWords(str: string): string {
  if (!str) return str;
  return str.split(' ')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Capitalizes the first letter of each word separated by hyphens
 * @param str - The string to capitalize
 * @returns The capitalized string with hyphens
 */
export function capitalizeHyphenated(str: string): string {
  if (!str) return str;
  return str.split('-')
    .map(word => capitalize(word))
    .join('-');
}

/**
 * Converts a string to title case (capitalizes first letter of each word)
 * @param str - The string to convert
 * @returns The title case string
 */
export function toTitleCase(str: string): string {
  if (!str) return str;
  return str.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Capitalizes a Pokémon name (handles special cases)
 * @param name - The Pokémon name to capitalize
 * @returns The properly capitalized Pokémon name
 */
export function capitalizePokemonName(name: string): string {
  if (!name) return name;

  // Handle special cases
  const specialCases: Record<string, string> = {
    'mr-mime': 'Mr. Mime',
    'mime-jr': 'Mime Jr.',
    'porygon-z': 'Porygon-Z',
    'ho-oh': 'Ho-Oh',
    'jangmo-o': 'Jangmo-o',
    'hakamo-o': 'Hakamo-o',
    'kommo-o': 'Kommo-o',
    'tapu-koko': 'Tapu Koko',
    'tapu-lele': 'Tapu Lele',
    'tapu-bulu': 'Tapu Bulu',
    'tapu-fini': 'Tapu Fini',
  };

  if (specialCases[name]) {
    return specialCases[name];
  }

  return capitalizeHyphenated(name);
}

/**
 * Converts kilograms to pounds
 * @param kg - Weight in kilograms
 * @returns Weight in pounds (rounded to 1 decimal place)
 */
export function kgToLbs(kg: number): number {
  return Math.round((kg * 2.20462) * 10) / 10;
}

/**
 * Formats weight display with both kg and lbs
 * @param weightStr - Weight string (e.g., "5.0kg")
 * @returns Formatted string like "11.0 lbs (5.0 kg)"
 */
export function formatWeight(weightStr: string | undefined): string {
  if (!weightStr) return 'Unknown';

  // Extract numeric value from weight string (e.g., "5.0kg" -> 5.0)
  const kgMatch = weightStr.match(/(\d+(?:\.\d+)?)/);
  if (!kgMatch) return weightStr;

  const kg = parseFloat(kgMatch[1]);
  if (isNaN(kg)) return weightStr;

  const lbs = kgToLbs(kg);
  return `${lbs} lbs (${kg} kg)`;
}

/**
 * Converts meters to feet and inches
 * @param meters - Height in meters
 * @returns Object with feet and inches
 */
export function metersToFeetInches(meters: number): { feet: number; inches: number } {
  const totalInches = meters * 39.3701;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}

/**
 * Formats height display with both meters and feet/inches
 * @param heightStr - Height string (e.g., "1.0m")
 * @returns Formatted string like "3'3\" (1.0 m)"
 */
export function formatHeight(heightStr: string | undefined): string {
  if (!heightStr) return 'Unknown';

  // Extract numeric value from height string (e.g., "1.0m" -> 1.0)
  const meterMatch = heightStr.match(/(\d+(?:\.\d+)?)/);
  if (!meterMatch) return heightStr;

  const meters = parseFloat(meterMatch[1]);
  if (isNaN(meters)) return heightStr;

  const { feet, inches } = metersToFeetInches(meters);
  return `${feet}'${inches}" (${meters} m)`;
}
