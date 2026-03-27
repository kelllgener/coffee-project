import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import HeroSection from "./features/HeroSection";
import CoffeeGrid from "./components/CoffeeGrid";
import FeaturedSection from "./features/FeaturedSection";
import Footer from "./components/Footer";
import RevealSection from "./components/RevealSection";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="px-6 sm:px-8 md:px-0">
      {/* Loading screen — unmounts after animation completes */}
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Main content — fades in after loader exits */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ScrollProgress />
            <Navbar />
            <main style={{ background: "var(--color-coffee-black)" }}>
              <section id="home">
                <RevealSection>
                  <HeroSection />
                </RevealSection>
              </section>
              <section id="collection">
                <RevealSection margin="-60px">
                  <CoffeeGrid />
                </RevealSection>
              </section>
              <section id="featured">
                <RevealSection margin="-100px">
                  <FeaturedSection />
                </RevealSection>
              </section>
            </main>
            <RevealSection margin="-100px">
              <Footer />
            </RevealSection>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
