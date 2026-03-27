import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer } from "../lib/utils";
import { coffeeList } from "../data/coffeeData";
import CoffeeCard from "./CoffeeCard";

export default function CoffeeGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const isHeadingInView = useInView(headingRef, { margin: "-80px" });
  const isGridInView = useInView(sectionRef, { margin: "-60px" });

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="relative px-6 py-28"
      style={{ background: "var(--color-coffee-black)" }}
    >
      {/* ── Subtle background texture gradient ───────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 50% at 50% 0%, rgba(44,26,14,0.5) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 w-full flex justify-center">
        <div className="max-w-7xl w-full">
          {/* ── Section heading ──────────────────────────────────────────── */}
          <div ref={headingRef} className="mb-16 text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mb-3 text-xs tracking-[0.3em] uppercase"
              style={{
                color: "var(--color-coffee-accent)",
                fontFamily: "var(--font-body)",
                opacity: isHeadingInView ? undefined : 0,
              }}
            >
              The Collection
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.75,
                delay: 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "var(--color-cream-light)",
                fontWeight: 700,
              }}
            >
              Every cup tells{" "}
              <span
                style={{
                  fontStyle: "italic",
                  color: "var(--color-coffee-accent)",
                }}
              >
                a story.
              </span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isHeadingInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mx-auto mt-6 h-px w-16 origin-center"
              style={{ background: "var(--color-coffee-accent)", opacity: 0.5 }}
            />
          </div>

          {/* ── Grid ─────────────────────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isGridInView ? "visible" : "hidden"}
            className="grid gap-5"
            style={{
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            }}
          >
            {coffeeList.map((coffee) => (
              <CoffeeCard key={coffee.id} coffee={coffee} />
            ))}
          </motion.div>

          {/* ── Bottom tagline ────────────────────────────────────────────── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isGridInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 text-center text-sm"
            style={{
              color: "var(--color-cream-muted)",
              fontFamily: "var(--font-body)",
              opacity: 0.5,
              fontWeight: 300,
              letterSpacing: "0.05em",
            }}
          >
            Sourced ethically. Roasted locally. Served with care.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
