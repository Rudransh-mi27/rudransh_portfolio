'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/sections/Hero/Hero';
import About from '@/sections/About/About';
import Projects from '@/sections/Projects/Projects';
import Skills from '@/sections/Skills/Skills';
import Experience from '@/sections/Experience/Experience';
import Achievements from '@/sections/Achievements/Achievements';
import Contact from '@/sections/Contact/Contact';
import Footer from '@/components/Footer/Footer';
import { useLenis } from '@/hooks/useLenis';

// Dynamically import Three.js canvas to prevent SSR hydration mismatches
const BackgroundCanvas = dynamic(
  () => import('@/components/ThreeCanvas/BackgroundCanvas'),
  { ssr: false }
);

export default function Home() {
  // Initialize smooth scroll with Lenis & GSAP ScrollTrigger
  useLenis();

  return (
    <>
      {/* Interactive WebGL particle wave canvas */}
      <BackgroundCanvas />

      {/* Persistent dynamic navbar */}
      <Navbar />

      {/* Main Portfolio Sections */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Achievements />
        <Contact />
      </main>

      {/* Comprehensive footer */}
      <Footer />
    </>
  );
}

