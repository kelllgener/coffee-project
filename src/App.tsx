import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import HeroSection from './components/HeroSection'
import CoffeeGrid from './components/CoffeeGrid'
import FeaturedSection from './components/FeaturedSection'
import Footer from './components/Footer'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* Loading screen — unmounts after animation completes */}
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Main content — fades in after loader exits */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <ScrollProgress />
            <Navbar />
            <main style={{ background: 'var(--color-coffee-black)' }}>
              <HeroSection />
              <CoffeeGrid />
              <FeaturedSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}