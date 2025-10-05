import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { featuredCaseStudies } from "@shared/caseStudiesData";

export default function CaseStudiesSection() {
  const caseStudies = featuredCaseStudies;

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
            <Link key={study.slug} href={`/work/${study.slug}`}>
              <a data-testid={`link-case-study-${study.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`grid md:grid-cols-2 gap-12 items-center group cursor-pointer ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "md:order-2" : ""}>
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={study.image}
                        alt={study.title}
                        className={`shadow-lg w-full transition-transform duration-500 group-hover:scale-110 ${index % 2 === 0 ? 'asymmetric-image' : 'asymmetric-image-alt'}`}
                        data-testid={`img-case-study-${study.slug}`}
                      />
                      <div className="absolute inset-0 bg-navy bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                    </div>
                  </div>
                  <div className={index % 2 === 1 ? "md:order-1" : ""}>
                    <div 
                      className="inline-block bg-light-coral text-coral px-4 py-2 rounded-full text-sm font-medium mb-4"
                      data-testid={`text-category-${study.slug}`}
                    >
                      {study.category}
                    </div>
                    <h3 
                      className="text-2xl font-serif font-bold text-navy mb-4 group-hover:text-coral transition-colors duration-300"
                      data-testid={`text-title-${study.slug}`}
                    >
                      {study.title}
                    </h3>
                    <p 
                      className="text-warm-gray mb-4 leading-relaxed italic"
                      data-testid={`text-challenge-${study.slug}`}
                    >
                      {study.challenge}
                    </p>
                    <div className="inline-flex items-center text-coral font-medium group-hover:gap-3 transition-all duration-300">
                      <span>Read the full story</span>
                      <ArrowRight
                        size={20}
                        className="ml-2 group-hover:translate-x-2 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </motion.div>
              </a>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/work">
            <a data-testid="link-view-all-work">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-coral text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition-all duration-300 mb-4"
              >
                <span>View All Work</span>
                <ArrowRight size={20} className="ml-2" />
              </motion.button>
            </a>
          </Link>
          <p className="text-warm-gray text-sm">
            or{" "}
            <button
              onClick={() => scrollToSection("contact")}
              className="text-coral hover:underline"
              data-testid="button-get-in-touch"
            >
              get in touch to discuss your project
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
