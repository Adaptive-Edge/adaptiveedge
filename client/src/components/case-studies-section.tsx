import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CaseStudiesSection() {
  const caseStudies = [
    {
      title: "Global Technology Company Transformation",
      category: "Strategy & Innovation",
      description: "Led strategic planning workshops for a Fortune 500 technology company navigating market disruption. Facilitated cross-functional teams through a six-month innovation portfolio development process.",
      role: "Principal Facilitator and Strategy Designer, leading workshop design and stakeholder alignment across three global regions.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
    {
      title: "Government Agency AI Adoption",
      category: "AI-Enabled Capability Building",
      description: "Designed and delivered AI literacy workshops for senior government officials, creating frameworks for responsible AI adoption in public service delivery.",
      role: "Lead Workshop Designer and AI Strategy Consultant, developing custom training materials and implementation roadmaps.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
    {
      title: "Non-Profit Cultural Transformation",
      category: "Adaptive Organisations",
      description: "Facilitated organizational culture change for a leading international non-profit, using systems thinking approaches to align distributed teams around shared purpose.",
      role: "Culture Design Lead, developing engagement frameworks and leading executive alignment sessions across four continents.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="case-studies" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">
            Work We've Been <span className="text-coral">Part Of</span>
          </h2>
          <p className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
            Real transformations with Fortune 500 companies, governments, and
            innovative organizations.
          </p>
        </motion.div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <motion.img
                  src={study.image}
                  alt={study.title}
                  className={`shadow-lg w-full transition-transform duration-300 hover:scale-105 ${index % 2 === 0 ? 'asymmetric-image' : 'asymmetric-image-alt'}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <div className="inline-block bg-light-coral text-coral px-4 py-2 rounded-full text-sm font-medium mb-4">
                  {study.category}
                </div>
                <h3 className="text-2xl font-serif font-bold text-navy mb-4">
                  {study.title}
                </h3>
                <p className="text-warm-gray mb-4 leading-relaxed">
                  {study.description}
                </p>
                <p className="text-warm-gray leading-relaxed">
                  <strong>Nathan's Role:</strong> {study.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("contact")}
            className="inline-flex items-center bg-coral text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition-all duration-300"
          >
            <span>Let's Shape What's Next Together</span>
            <ArrowRight size={20} className="ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
