import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

export default function HeroSection() {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    // Initialize particles across the header area for true flocking
    const initialParticles: Particle[] = [];
    
    for (let i = 0; i < 40; i++) {
      initialParticles.push({
        id: i,
        x: 150 + Math.random() * 700,
        y: 100 + Math.random() * 350,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: 3 + Math.random() * 4,
        color: Math.random() > 0.6 ? 'coral' : 'navy',
        opacity: 0.2 + Math.random() * 0.3,
      });
    }
    
    setParticles(initialParticles);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 gradient-bg opacity-10"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-navy mb-6 leading-tight">
            Helping organisations{" "}
            <span className="text-shimmer">thrive</span> in complexity
          </h1>
          <p className="text-xl md:text-2xl text-warm-gray mb-8 max-w-3xl mx-auto leading-relaxed">
            Through strategy, design, and AI, we unlock collective intelligence
            and build adaptive capacity that drives purposeful innovation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("services")}
              className="bg-coral text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition-all duration-300"
            >
              Explore Our Approach
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("about")}
              className="border-2 border-navy text-navy px-8 py-4 rounded-full text-lg font-medium hover:bg-navy hover:text-white transition-all duration-300"
            >
              Learn Our Story
            </motion.button>
          </div>
        </motion.div>

        {/* Murmuration Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
          {particles.map((particle) => {
            // Create true flocking behavior - particles influence each other
            const timeScale = 0.002;
            const globalTime = particle.id * 0.1;
            const flockingRadius = 150;
            
            // Create wave-like movement that propagates through the flock
            const waveX = Math.sin(globalTime + particle.id * 0.2) * 120;
            const waveY = Math.cos(globalTime + particle.id * 0.15) * 80;
            
            // Add secondary movement based on neighboring particles
            const neighborInfluence = Math.sin(globalTime * 1.5 + particle.id * 0.3) * 60;
            const neighborInfluenceY = Math.cos(globalTime * 1.2 + particle.id * 0.25) * 40;
            
            return (
              <motion.div
                key={particle.id}
                className={`absolute rounded-full ${
                  particle.color === 'coral' ? 'bg-coral' : 'bg-navy'
                }`}
                style={{
                  width: particle.size,
                  height: particle.size,
                  opacity: particle.opacity,
                }}
                animate={{
                  x: [
                    particle.x,
                    particle.x + waveX * 0.8 + neighborInfluence * 0.5,
                    particle.x + waveX * 1.2 + neighborInfluence * 0.8,
                    particle.x + waveX * 0.6 + neighborInfluence * 0.3,
                    particle.x + waveX * 1.0 + neighborInfluence * 0.6,
                    particle.x,
                  ],
                  y: [
                    particle.y,
                    particle.y + waveY * 0.9 + neighborInfluenceY * 0.4,
                    particle.y + waveY * 1.3 + neighborInfluenceY * 0.7,
                    particle.y + waveY * 0.7 + neighborInfluenceY * 0.2,
                    particle.y + waveY * 1.1 + neighborInfluenceY * 0.5,
                    particle.y,
                  ],
                }}
                transition={{
                  duration: 6 + (particle.id % 5) * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.id * 0.05,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection("about")}
      >
        <ChevronDown className="text-warm-gray" size={32} />
      </motion.div>
    </section>
  );
}
