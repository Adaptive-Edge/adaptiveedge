import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { updatePageMetadata } from "@/lib/seo";

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  challenge: string;
  approach: string;
  impact: string;
  roleDescription: string;
  featured: boolean;
  treeHouseAttribution: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

const CASE_STUDY_CATEGORIES = [
  "Strategic Transformation",
  "Innovation & Design", 
  "Capability Building",
  "Culture & Change"
];

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    updatePageMetadata({
      title: "Our Work | Adaptive Edge",
      description:
        "Real transformations with global organizations including Sky, Freudenberg, Sandvik Coromant, and AstraZeneca. Work delivered in partnership with Treehouse Innovation.",
      ogTitle: "Work We've Been Part Of - Adaptive Edge",
      ogDescription:
        "Strategic transformation, innovation design, and capability building projects with Fortune 500 companies and innovative organizations.",
      ogUrl: "https://adaptiveedge.uk/work",
    });
  }, []);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/case-studies");
        
        if (response.ok) {
          const data = await response.json();
          setCaseStudies(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching case studies:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  const categories = ["All", ...CASE_STUDY_CATEGORIES];

  const filteredCaseStudies =
    selectedCategory === "All"
      ? caseStudies
      : caseStudies.filter((study) => study.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="inline-block w-8 h-8 border-4 border-coral border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-warm-gray">Loading case studies...</p>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-serif font-bold text-navy mb-4">
              Unable to Load Case Studies
            </h1>
            <p className="text-warm-gray mb-6">
              There was an error loading our work. Please try again later.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="text-coral hover:underline"
            >
              Refresh Page
            </button>
          </div>
        </section>
      </div>
    );
  }

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
                data-testid={`button-filter-${category.toLowerCase().replace(/\s+/g, "-")}`}
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
          {filteredCaseStudies.length === 0 && !loading && (
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
      <Link href={`/work/${study.slug}`} className="block">
          {/* Image */}
          {study.image && (
            <div className="relative overflow-hidden mb-6">
              <motion.img
                src={study.image}
                alt={study.title}
                className="w-full h-64 object-cover shadow-lg asymmetric-image transition-transform duration-500 group-hover:scale-110"
                data-testid={`img-case-study-${study.slug}`}
              />
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
      </Link>
    </motion.div>
  );
}
