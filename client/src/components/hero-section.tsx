import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
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
          {Array.from({ length: 15 }).map((_, i) => {
            const size = Math.random() > 0.5 ? 'w-2 h-2' : 'w-1.5 h-1.5';
            const color = Math.random() > 0.6 ? 'bg-coral' : 'bg-navy';
            const opacity = Math.random() > 0.5 ? 'opacity-20' : 'opacity-30';
            const startX = 100 + Math.random() * 800;
            const startY = 100 + Math.random() * 400;
            
            return (
              <motion.div
                key={i}
                className={`absolute ${size} ${color} rounded-full ${opacity}`}
                initial={{
                  x: startX,
                  y: startY,
                }}
                animate={{
                  x: [
                    startX,
                    startX + (Math.random() - 0.5) * 300,
                    startX + (Math.random() - 0.5) * 400,
                    startX,
                  ],
                  y: [
                    startY,
                    startY + (Math.random() - 0.5) * 200,
                    startY + (Math.random() - 0.5) * 300,
                    startY,
                  ],
                }}
                transition={{
                  duration: 12 + Math.random() * 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
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
