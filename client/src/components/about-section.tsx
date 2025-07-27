import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">
              We don't take the problem away and return with a PowerPoint
            </h2>
            <p className="text-lg text-warm-gray mb-6 leading-relaxed">
              Adaptive Edge helps organisations and leaders thrive in uncertainty
              by unlocking collective intelligence, driving purposeful
              innovation, and building adaptive capacity.
            </p>
            <p className="text-lg text-warm-gray mb-6 leading-relaxed">
              We work across strategy, culture, and capability — blending
              systems thinking, design, and facilitation with the latest in AI,
              behavioural science, and organisational learning.
            </p>
            <p className="text-lg text-warm-gray leading-relaxed">
              We partner with leaders who want their teams not just to adapt,
              but to lead the change.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.img
              src="/assets/nathan-photo.png"
              alt="Nathan Waterhouse, Founder of Adaptive Edge"
              className="asymmetric-image shadow-2xl w-full max-w-md mx-auto transition-transform duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />

            <div className="mt-8 text-center">
              <h3 className="text-2xl font-serif font-bold text-navy mb-2">
                Nathan Waterhouse
              </h3>
              <p className="text-coral font-medium mb-4">
                Founder & Principal Consultant
              </p>
              <p className="text-warm-gray leading-relaxed mb-4">
                Nathan brings a rich background in design, innovation, and
                entrepreneurship. He has worked with governments, non-profits,
                and Fortune 500 companies to help shape transformations and
                design new futures.
              </p>
              <a
                href="mailto:nathan@adaptiveedge.uk"
                className="inline-flex items-center text-coral hover:text-navy transition-colors duration-300"
              >
                <Mail size={16} className="mr-2" />
                nathan@adaptiveedge.uk
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
