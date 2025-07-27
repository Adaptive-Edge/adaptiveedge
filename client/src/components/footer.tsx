import { Mail } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-navy text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <img
              src="/assets/adaptive-edge-logo.png"
              alt="Adaptive Edge"
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 leading-relaxed">
              Strategy & Innovation Consultancy helping organizations thrive in
              complexity through collaborative, AI-native approaches.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-coral transition-colors duration-300"
                >
                  Strategy & Innovation
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-coral transition-colors duration-300"
                >
                  Adaptive Organisations
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-coral transition-colors duration-300"
                >
                  AI-Enabled Capability Building
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("tools")}
                  className="hover:text-coral transition-colors duration-300"
                >
                  Tools & Frameworks
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="hover:text-coral transition-colors duration-300"
                >
                  About Nathan
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("case-studies")}
                  className="hover:text-coral transition-colors duration-300"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-coral transition-colors duration-300"
                >
                  Get in Touch
                </button>
              </li>
              <li>
                <a
                  href="mailto:nathan@adaptiveedge.uk"
                  className="hover:text-coral transition-colors duration-300 inline-flex items-center"
                >
                  <Mail size={16} className="mr-2" />
                  nathan@adaptiveedge.uk
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 Adaptive Edge. All rights reserved. Helping
            organizations lead change in an uncertain world.
          </p>
        </div>
      </div>
    </footer>
  );
}
