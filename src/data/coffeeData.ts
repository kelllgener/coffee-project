export interface Coffee {
  id: number
  name: string
  origin: string
  description: string
  intensity: number   // 1–5
  tags: string[]
  accentColor: string // tailwind-compatible CSS color for glow
}

export const coffeeList: Coffee[] = [
  {
    id: 1,
    name: 'Espresso Nero',
    origin: 'Ethiopia',
    description: 'Pure, unapologetic intensity. A dark roast that opens with bitter chocolate and closes with a lingering smoky finish.',
    intensity: 5,
    tags: ['Bold', 'Dark Roast', 'Classic'],
    accentColor: '#7c4a2d',
  },
  {
    id: 2,
    name: 'Velvet Flat White',
    origin: 'Australia',
    description: 'Silky microfoam meets a ristretto double shot. Sweet, creamy, and impossibly smooth — crafted for the discerning palate.',
    intensity: 3,
    tags: ['Creamy', 'Balanced', 'Smooth'],
    accentColor: '#c17f45',
  },
  {
    id: 3,
    name: 'Cold Brew Noir',
    origin: 'Colombia',
    description: 'Steeped for 18 hours in cold water. Naturally sweet with low acidity, notes of dark caramel and toasted walnut.',
    intensity: 4,
    tags: ['Cold', 'Low Acidity', 'Sweet'],
    accentColor: '#4a2c1a',
  },
  {
    id: 4,
    name: 'Cortado Dorado',
    origin: 'Brazil',
    description: 'A perfect 1:1 harmony of espresso and warm milk. Nutty, bright, and clean — the quiet confidence of a master barista.',
    intensity: 3,
    tags: ['Balanced', 'Nutty', 'Short'],
    accentColor: '#d4956a',
  },
  {
    id: 5,
    name: 'Pour Over Reserve',
    origin: 'Kenya',
    description: 'Single origin, slow-dripped through a Hario V60. Vibrant fruit acidity — black cherry, bergamot, and a tea-like finish.',
    intensity: 2,
    tags: ['Light Roast', 'Fruity', 'Aromatic'],
    accentColor: '#8b5e3c',
  },
  {
    id: 6,
    name: 'Ristretto Oscuro',
    origin: 'Guatemala',
    description: 'Half the water, double the character. An ultra-concentrated shot with an explosive hit of dark cocoa and spice.',
    intensity: 5,
    tags: ['Intense', 'Concentrated', 'Spiced'],
    accentColor: '#5c2e0e',
  },
  {
    id: 7,
    name: 'Honey Process Latte',
    origin: 'Costa Rica',
    description: 'Honey-processed beans lend a natural sweetness. Layered with steamed oat milk for a floral, caramel-forward cup.',
    intensity: 2,
    tags: ['Floral', 'Sweet', 'Oat Milk'],
    accentColor: '#e8a94d',
  },
  {
    id: 8,
    name: 'Cascara Fizz',
    origin: 'Yemen',
    description: 'Brewed from the dried coffee cherry husk. Sparkling, hibiscus-like, and unlike anything you have tasted before.',
    intensity: 1,
    tags: ['Unique', 'Sparkling', 'Fruity'],
    accentColor: '#9b4f3f',
  },
]