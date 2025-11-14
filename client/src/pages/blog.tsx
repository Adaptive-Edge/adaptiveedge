import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { blogPosts } from "@shared/blogPostsData";
import type { BlogPost } from "@shared/types";
import { BLOG_POST_CATEGORIES } from "@shared/types";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { ArrowRight, Calendar } from "lucide-react";
import { updatePageMetadata } from "@/lib/seo";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    updatePageMetadata({
      title: "Blog | Adaptive Edge",
      description:
        "Insights on AI, innovation, strategy, and organisational culture. Weekly reflections on navigating complexity in an era of constant change.",
      ogTitle: "The Adaptive Edge - Blog",
      ogDescription:
        "Weekly insights on AI, innovation, strategy, and organisational culture from Nathan Waterhouse.",
      ogUrl: "https://adaptiveedge.uk/blog",
    });
  }, []);

  const categories = ["All", ...BLOG_POST_CATEGORIES];

  const filteredBlogPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

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
              The <span className="text-coral">Adaptive Edge</span>
            </h1>
            <p
              className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed"
              data-testid="text-page-description"
            >
              Weekly insights on AI, innovation, and strategy. Guidance for navigating complexity in an era of constant change.
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

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredBlogPosts.map((post, index) => (
              <BlogPostCard key={post.slug} post={post} index={index} />
            ))}
          </div>

          {/* No Results */}
          {filteredBlogPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-warm-gray text-lg">
                No blog posts found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function BlogPostCard({
  post,
  index,
}: {
  post: BlogPost;
  index: number;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
      data-testid={`card-blog-post-${post.slug}`}
    >
      <Link href={`/blog/${post.slug}`} className="block">
          {/* Image */}
          {post.image && (
            <div className="relative overflow-hidden mb-6">
              <motion.img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover shadow-lg asymmetric-image transition-transform duration-500 group-hover:scale-110"
                data-testid={`img-blog-post-${post.slug}`}
              />
            </div>
          )}

          {/* Category Badge & Date */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="inline-block bg-light-coral text-coral px-4 py-2 rounded-full text-sm font-medium"
              data-testid={`text-category-${post.slug}`}
            >
              {post.category}
            </span>
            <div className="flex items-center text-warm-gray text-sm">
              <Calendar size={16} className="mr-1" />
              <span data-testid={`text-date-${post.slug}`}>
                {formatDate(post.date)}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3
            className="text-2xl font-serif font-bold text-navy mb-4 group-hover:text-coral transition-colors duration-300"
            data-testid={`text-title-${post.slug}`}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p
            className="text-warm-gray mb-4 leading-relaxed line-clamp-3"
            data-testid={`text-excerpt-${post.slug}`}
          >
            {post.excerpt}
          </p>

          {/* Read More Link */}
          <div
            className="inline-flex items-center text-coral font-medium group-hover:gap-3 transition-all duration-300"
            data-testid={`link-read-more-${post.slug}`}
          >
            <span>Read more</span>
            <ArrowRight
              size={20}
              className="ml-2 group-hover:translate-x-2 transition-transform duration-300"
            />
          </div>
      </Link>
    </motion.div>
  );
}
