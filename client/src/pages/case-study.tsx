import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { caseStudies } from "@shared/caseStudiesData";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useEffect } from "react";
import { updatePageMetadata } from "@/lib/seo";

export default function CaseStudyPage() {
  const { slug } = useParams();
  const caseStudy = caseStudies.find((study) => study.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (caseStudy) {
      updatePageMetadata({
        title: `${caseStudy.title} | Adaptive Edge`,
        description: caseStudy.challenge,
        ogTitle: `${caseStudy.title} - ${caseStudy.client}`,
        ogDescription: caseStudy.challenge,
        ogImage: caseStudy.image,
        ogUrl: `https://adaptiveedge.uk/work/${caseStudy.slug}`,
      });
    }
  }, [slug, caseStudy]);

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-navy mb-4">
            Case Study Not Found
          </h1>
          <Link href="/work">
            <a className="text-coral hover:underline">← Back to Work</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <article className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link href="/work">
              <a 
                className="inline-flex items-center text-coral hover:text-navy transition-colors duration-300"
                data-testid="link-back-to-work"
              >
                <ArrowLeft size={20} className="mr-2" />
                <span>Back to Work</span>
              </a>
            </Link>
          </motion.div>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <span 
              className="inline-block bg-light-coral text-coral px-4 py-2 rounded-full text-sm font-medium"
              data-testid="text-category"
            >
              {caseStudy.category}
            </span>
          </motion.div>

          {/* Title and Client */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h1 
              className="text-4xl md:text-5xl font-serif font-bold text-navy mb-4"
              data-testid="text-title"
            >
              {caseStudy.title}
            </h1>
            <p 
              className="text-xl text-warm-gray"
              data-testid="text-client"
            >
              Client: <span className="font-medium text-navy">{caseStudy.client}</span>
            </p>
          </motion.div>

          {/* Hero Image */}
          {caseStudy.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <img
                src={caseStudy.image}
                alt={caseStudy.title}
                className="w-full h-[400px] object-cover shadow-lg asymmetric-image"
                data-testid="img-case-study-hero"
              />
            </motion.div>
          )}

          {/* Challenge Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <h2 
              className="text-2xl md:text-3xl font-serif font-bold text-coral mb-4"
              data-testid="text-challenge-heading"
            >
              The Challenge
            </h2>
            <p 
              className="text-lg text-warm-gray leading-relaxed italic border-l-4 border-coral pl-6"
              data-testid="text-challenge-content"
            >
              {caseStudy.challenge}
            </p>
          </motion.section>

          {/* Approach Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-12"
          >
            <h2 
              className="text-2xl md:text-3xl font-serif font-bold text-navy mb-6"
              data-testid="text-approach-heading"
            >
              Our Approach
            </h2>
            <div 
              className="text-lg text-warm-gray leading-relaxed space-y-4 whitespace-pre-line"
              data-testid="text-approach-content"
            >
              {caseStudy.approach}
            </div>
          </motion.section>

          {/* Impact Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-12"
          >
            <h2 
              className="text-2xl md:text-3xl font-serif font-bold text-coral mb-6"
              data-testid="text-impact-heading"
            >
              The Impact
            </h2>
            <div 
              className="text-lg text-warm-gray leading-relaxed space-y-4 whitespace-pre-line"
              data-testid="text-impact-content"
            >
              {caseStudy.impact}
            </div>
          </motion.section>

          {/* Role and Attribution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-light-coral bg-opacity-30 p-8 rounded-lg mb-12"
          >
            <h3 
              className="text-xl font-serif font-bold text-navy mb-3"
              data-testid="text-role-heading"
            >
              Nathan's Role
            </h3>
            <p 
              className="text-warm-gray mb-6 leading-relaxed"
              data-testid="text-role-content"
            >
              {caseStudy.role}
            </p>
            <p 
              className="text-sm text-warm-gray italic flex items-center gap-2"
              data-testid="text-attribution"
            >
              <ExternalLink size={16} className="text-coral" />
              {caseStudy.treeHouseAttribution}
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center pt-8 border-t border-gray-200"
          >
            <h3 className="text-2xl font-serif font-bold text-navy mb-4">
              Interested in Working Together?
            </h3>
            <p className="text-warm-gray mb-6 max-w-2xl mx-auto">
              Let's explore how collaborative strategy and human-centered design can help your organization navigate complexity and unlock new possibilities.
            </p>
            <Link href="/#contact">
              <a 
                className="inline-block bg-coral text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition-all duration-300"
                data-testid="button-get-in-touch"
              >
                Get in Touch
              </a>
            </Link>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
