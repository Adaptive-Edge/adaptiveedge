import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { caseStudies } from "@shared/caseStudiesData";
import type { CaseStudy } from "@shared/types";
import { CASE_STUDY_CATEGORIES } from "@shared/types";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { ArrowRight } from "lucide-react";

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...CASE_STUDY_CATEGORIES];

  const filteredCaseStudies =
    selectedCategory === "All"
      ? caseStudies
      : caseStudies.filter((study) => study.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy mb-6"
              data-testid="text-page-title"
            >
              Work We've Been <span className="text-coral">Part Of</span>
            </h1>
            <p 
              className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed"
              data-testid="text-page-description"
            >
              Real transformations with global organizations, delivered in
              partnership with Treehouse Innovation.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                data-testid={`button-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-coral text-white shadow-lg scale-105"
                    : "bg-light-coral text-coral hover:bg-coral hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Case Studies Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredCaseStudies.map((study, index) => (
              <CaseStudyCard key={study.slug} study={study} index={index} />
            ))}
          </div>

          {/* No Results */}
          {filteredCaseStudies.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-warm-gray text-lg">
                No case studies found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
      data-testid={`card-case-study-${study.slug}`}
    >
      <Link href={`/work/${study.slug}`}>
        <a className="block">
          {/* Image */}
          {study.image && (
            <div className="relative overflow-hidden mb-6">
              <motion.img
                src={study.image}
                alt={study.title}
                className="w-full h-64 object-cover shadow-lg asymmetric-image transition-transform duration-500 group-hover:scale-110"
                data-testid={`img-case-study-${study.slug}`}
              />
              <div className="absolute inset-0 bg-navy bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
            </div>
          )}

          {/* Category Badge */}
          <div className="mb-4">
            <span 
              className="inline-block bg-light-coral text-coral px-4 py-2 rounded-full text-sm font-medium"
              data-testid={`text-category-${study.slug}`}
            >
              {study.category}
            </span>
          </div>

          {/* Client */}
          <p 
            className="text-sm text-coral font-medium mb-2"
            data-testid={`text-client-${study.slug}`}
          >
            {study.client}
          </p>

          {/* Title */}
          <h3 
            className="text-2xl font-serif font-bold text-navy mb-4 group-hover:text-coral transition-colors duration-300"
            data-testid={`text-title-${study.slug}`}
          >
            {study.title}
          </h3>

          {/* Challenge */}
          <p 
            className="text-warm-gray mb-4 leading-relaxed line-clamp-3"
            data-testid={`text-challenge-${study.slug}`}
          >
            {study.challenge}
          </p>

          {/* Read More Link */}
          <div 
            className="inline-flex items-center text-coral font-medium group-hover:gap-3 transition-all duration-300"
            data-testid={`link-read-more-${study.slug}`}
          >
            <span>Read the full story</span>
            <ArrowRight
              size={20}
              className="ml-2 group-hover:translate-x-2 transition-transform duration-300"
            />
          </div>
        </a>
      </Link>
    </motion.div>
  );
}
