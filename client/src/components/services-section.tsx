import { motion } from "framer-motion";
import { Lightbulb, Users, Bot, Check } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: Lightbulb,
      title: "Strategy & Innovation",
      color: "bg-coral",
      items: [
        "Strategic planning",
        "Portfolio innovation (incremental to disruptive)",
        "New business or brand model exploration",
      ],
    },
    {
      icon: Users,
      title: "Adaptive Organisations",
      color: "bg-navy",
      items: [
        "Team alignment & culture shaping",
        "Systems thinking workshops",
        "Cross-functional collaboration experiences",
      ],
    },
    {
      icon: Bot,
      title: "AI-Enabled Capability Building",
      color: "bg-coral",
      items: [
        "AI adoption workshops for leaders",
        "Embedding AI into creative and decision-making processes",
        "Tools and frameworks to build long-term organisational capacity",
      ],
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">
            Three Pillars of <span className="text-coral">Transformation</span>
          </h2>
          <p className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
            We work across strategy, culture, and capability to create lasting
            organizational change.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300"
            >
              <motion.div
                className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <service.icon className="text-white" size={24} />
              </motion.div>
              <h3 className="text-2xl font-serif font-bold text-navy mb-4">
                {service.title}
              </h3>
              <ul className="space-y-3 text-warm-gray">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <Check className="text-coral mr-3 mt-1 flex-shrink-0" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
