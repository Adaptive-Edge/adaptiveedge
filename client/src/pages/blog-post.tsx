import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { blogPosts } from "@shared/blogPostsData";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useEffect } from "react";
import { updatePageMetadata } from "@/lib/seo";

export default function BlogPostPage() {
  const { slug } = useParams();
  const blogPost = blogPosts.find((post) => post.slug === slug);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (blogPost) {
      updatePageMetadata({
        title: `${blogPost.title} | Adaptive Edge`,
        description: blogPost.excerpt,
        ogTitle: blogPost.title,
        ogDescription: blogPost.excerpt,
        ogImage: blogPost.image,
        ogUrl: `https://adaptiveedge.uk/blog/${blogPost.slug}`,
      });
    }
  }, [slug, blogPost]);

  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-navy mb-4">
            Blog Post Not Found
          </h1>
          <Link href="/blog" className="text-coral hover:underline">
            ← Back to Blog
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
            <Link
              href="/blog"
              className="inline-flex items-center text-coral hover:text-navy transition-colors duration-300"
              data-testid="link-back-to-blog"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span>Back to Blog</span>
            </Link>
          </motion.div>

          {/* Category Badge & Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <span
              className="inline-block bg-light-coral text-coral px-4 py-2 rounded-full text-sm font-medium"
              data-testid="text-category"
            >
              {blogPost.category}
            </span>
            <div className="flex items-center text-warm-gray text-sm">
              <Calendar size={16} className="mr-1" />
              <span data-testid="text-date">
                {formatDate(blogPost.date)}
              </span>
            </div>
          </motion.div>

          {/* Title and Author */}
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
              {blogPost.title}
            </h1>
            <p
              className="text-xl text-warm-gray"
              data-testid="text-author"
            >
              By <span className="font-medium text-navy">{blogPost.author}</span>
            </p>
          </motion.div>

          {/* Hero Image */}
          {blogPost.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <img
                src={blogPost.image}
                alt={blogPost.title}
                className="w-full h-[400px] object-cover shadow-lg asymmetric-image"
                data-testid="img-blog-post-hero"
              />
            </motion.div>
          )}

          {/* Excerpt */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <p
              className="text-xl text-warm-gray leading-relaxed italic border-l-4 border-coral pl-6"
              data-testid="text-excerpt"
            >
              {blogPost.excerpt}
            </p>
          </motion.div>

          {/* Content */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-12"
          >
            <div
              className="prose prose-lg max-w-none text-warm-gray leading-relaxed space-y-4 whitespace-pre-line"
              data-testid="text-content"
            >
              {blogPost.content}
            </div>
          </motion.section>

          {/* LinkedIn Link */}
          {blogPost.linkedinUrl && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-light-coral bg-opacity-30 p-8 rounded-lg mb-12"
            >
              <h3 className="text-xl font-serif font-bold text-navy mb-3">
                Continue Reading on LinkedIn
              </h3>
              <p className="text-warm-gray mb-4 leading-relaxed">
                This post was originally published as part of The Adaptive Edge newsletter on LinkedIn.
              </p>
              <a
                href={blogPost.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-coral font-medium hover:text-navy transition-colors duration-300"
                data-testid="link-linkedin"
              >
                <ExternalLink size={18} className="mr-2" />
                Read the full article on LinkedIn
              </a>
            </motion.div>
          )}

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center pt-8 border-t border-gray-200"
          >
            <h3 className="text-2xl font-serif font-bold text-navy mb-4">
              Want More Insights?
            </h3>
            <p className="text-warm-gray mb-6 max-w-2xl mx-auto">
              Subscribe to The Adaptive Edge newsletter on LinkedIn for weekly reflections on AI, innovation, and strategy.
            </p>
            <a
              href="https://www.linkedin.com/newsletters/the-adaptive-edge-7274474196389310465/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-coral text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition-all duration-300"
              data-testid="button-subscribe-newsletter"
            >
              Subscribe on LinkedIn
            </a>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
