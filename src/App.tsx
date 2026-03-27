import HeroSection from './components/HeroSection'
import CoffeeGrid from './components/CoffeeGrid'
import FeaturedSection from './components/FeaturedSection'

export default function App() {
  return (
    <main style={{ background: 'var(--color-coffee-black)' }}>
      <HeroSection />
      <CoffeeGrid />
      <FeaturedSection />
      {/* Phase 5 — Polish goes here */}
    </main>
  )
}