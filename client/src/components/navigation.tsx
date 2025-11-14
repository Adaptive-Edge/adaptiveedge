import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const isHomePage = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: "Home", id: "home", isSection: true },
    { label: "About", id: "about", isSection: true },
    { label: "Services", id: "services", isSection: true },
    { label: "Tools", id: "tools", isSection: true },
    { label: "Work", href: "/work", isSection: false },
    { label: "Blog", href: "/blog", isSection: false },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-effect shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <img
              src="/assets/adaptive-edge-logo.png"
              alt="Adaptive Edge"
              className="h-10 w-auto"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item, index) => (
              item.isSection ? (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.id!)}
                  className="text-warm-gray hover:text-coral transition-colors duration-300 relative group"
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-coral transition-all duration-300 group-hover:w-full"></span>
                </motion.button>
              ) : (
                <Link key={item.label} href={item.href!} data-testid={`nav-${item.label.toLowerCase()}`}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-warm-gray hover:text-coral transition-colors duration-300 relative group cursor-pointer"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-coral transition-all duration-300 group-hover:w-full"></span>
                  </motion.div>
                </Link>
              )
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-coral text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300"
              data-testid="nav-contact"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-warm-gray"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isOpen ? 1 : 0,
              height: isOpen ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="mt-4 space-y-4">
              {navItems.map((item) => (
                item.isSection ? (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id!)}
                    className="block w-full text-left text-warm-gray hover:text-coral transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link key={item.label} href={item.href!} className="block w-full text-left text-warm-gray hover:text-coral transition-colors duration-300">
                    {item.label}
                  </Link>
                )
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full bg-coral text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 text-center"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
