import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Calendar } from "lucide-react";
import { featuredBlogPosts } from "@shared/blogPostsData";

export default function BlogSection() {
  const blogPosts = featuredBlogPosts;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-20 bg-gradient-to-b from-white to-light-coral to-opacity-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">
            From The <span className="text-coral">Adaptive Edge</span>
          </h2>
          <p className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
            Weekly insights on AI, innovation, and strategy. Guidance for navigating complexity in an era of constant change.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.slice(0, 3).map((post, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} data-testid={`link-blog-post-${post.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {post.image && (
                  <div className="relative overflow-hidden h-48">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      data-testid={`img-blog-post-${post.slug}`}
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="inline-block bg-light-coral text-coral px-3 py-1 rounded-full text-xs font-medium"
                      data-testid={`text-category-${post.slug}`}
                    >
                      {post.category}
                    </span>
                    <div className="flex items-center text-warm-gray text-xs">
                      <Calendar size={14} className="mr-1" />
                      <span data-testid={`text-date-${post.slug}`}>
                        {formatDate(post.date)}
                      </span>
                    </div>
                  </div>
                  <h3
                    className="text-lg font-serif font-bold text-navy mb-3 group-hover:text-coral transition-colors duration-300 line-clamp-2"
                    data-testid={`text-title-${post.slug}`}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="text-warm-gray text-sm mb-4 leading-relaxed line-clamp-3"
                    data-testid={`text-excerpt-${post.slug}`}
                  >
                    {post.excerpt}
                  </p>
                  <div className="inline-flex items-center text-coral text-sm font-medium group-hover:gap-2 transition-all duration-300">
                    <span>Read more</span>
                    <ArrowRight
                      size={16}
                      className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center bg-coral text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition-all duration-300"
              data-testid="link-view-all-blog"
            >
              <span>View All Posts</span>
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
