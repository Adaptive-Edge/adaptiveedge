import { motion } from "framer-motion";
import { Target, Layers, Gamepad2, Search, GitBranch, Settings } from "lucide-react";

interface Tool {
  icon: any;
  title: string;
  description: string;
  color: string;
  link?: string;
}

export default function ToolsSection() {
  const tools: Tool[] = [
    {
      icon: Target,
      title: "IMPACT Prompting Framework",
      description: "A structured approach to AI interaction that maximizes output quality and strategic relevance.",
      color: "bg-coral",
    },
    {
      icon: Layers,
      title: "Operational Excellence Cards",
      description: "Interactive tools for identifying and addressing operational inefficiencies across organizations.",
      color: "bg-navy",
    },
    {
      icon: Gamepad2,
      title: "Innovation Priorities Card Game",
      description: "Gamified workshop tool for collaborative prioritization and strategic decision-making.",
      color: "bg-coral",
      link: "https://innovationpriorities.com/",
    },
    {
      icon: Search,
      title: "Power Canvas",
      description: "A tool that helps spot power dynamics issues based on the structure of your organisation, enabling more effective collaboration and decision-making.",
      color: "bg-navy",
      link: "/tools/powercanvas",
    },
    {
      icon: GitBranch,
      title: "Interactive Strategy Canvas",
      description: "Digital tools that go beyond static deliverables to create living strategy documents.",
      color: "bg-coral",
    },
    {
      icon: Settings,
      title: "Systems Thinking Toolkit",
      description: "Comprehensive frameworks for understanding complex organizational dynamics and relationships.",
      color: "bg-navy",
    },
  ];

  return (
    <section id="tools" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">
            Tools & <span className="text-coral">Frameworks</span>
          </h2>
          <p className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
            Unique methodologies and AI-powered tools designed to support
            collaborative strategy creation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => {
            const ToolWrapper = tool.link ? 'a' : 'div';
            const wrapperProps = tool.link ? {
              href: tool.link,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "block"
            } : {};
            
            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ToolWrapper {...wrapperProps}>
                  <motion.div
                    className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center mb-4`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <tool.icon className="text-white" size={20} />
                  </motion.div>
                  <h3 className="text-xl font-serif font-bold text-navy mb-3">
                    {tool.title}
                  </h3>
                  <p className="text-warm-gray text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </ToolWrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
