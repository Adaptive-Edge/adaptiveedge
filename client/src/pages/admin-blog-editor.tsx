import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'wouter';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { ArrowLeft, Save, Eye, Upload } from 'lucide-react';
import { BLOG_POST_CATEGORIES } from '@shared/types';
import RichTextEditor from "@/components/rich-text-editor";

export default function AdminBlogEditor() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAdminAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [uploadingHeader, setUploadingHeader] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    date: new Date().toISOString().split('T')[0],
    author: 'Nathan Waterhouse',
    category: 'AI & Technology',
    excerpt: '',
    content: '',
    headerImage: '',
    linkedinUrl: '',
    featured: false,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/admin/login');
      return;
    }

    if (id) {
      loadBlogPost(id);
    }
  }, [id, isAuthenticated, setLocation]);

  const loadBlogPost = async (postId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blog-posts/by-id/${postId}`);
      if (response.ok) {
        const post = await response.json();
        setFormData({
          title: post.title,
          slug: post.slug,
          date: new Date(post.date).toISOString().split('T')[0],
          author: post.author,
          category: post.category,
          excerpt: post.excerpt,
          content: post.content,
          headerImage: post.image || '',
          linkedinUrl: post.linkedinUrl || '',
          featured: post.featured,
        });
      }
    } catch (error) {
      console.error('Failed to load blog post:', error);
      alert('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleHeaderImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHeader(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/blog-images', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, headerImage: data.url }));
      }
    } catch (error) {
      console.error('Failed to upload header image:', error);
      alert('Failed to upload header image');
    } finally {
      setUploadingHeader(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = id ? `/api/blog-posts/${id}` : '/api/blog-posts';
      const method = id ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({          title: formData.title,          slug: formData.slug,          excerpt: formData.excerpt,          content: formData.content,          author: formData.author,          category: formData.category,          image: formData.headerImage,          linkedinUrl: formData.linkedinUrl,          featured: formData.featured,          date: formData.date,        }),
      });

      if (response.ok) {
        alert(id ? 'Blog post updated!' : 'Blog post created!');
        setLocation('/admin/blog');
      } else {
        const error = await response.json();
        alert(`Failed to save: ${error.message}`);
      }
    } catch (error) {
      console.error('Failed to save blog post:', error);
      alert('Failed to save blog post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-warm-gray">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation('/admin/blog')}
            className="flex items-center text-warm-gray hover:text-navy transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog List
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPreview(!preview)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Eye size={18} />
              {preview ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center gap-2 bg-coral text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50"
            >
              <Save size={18} />
              {saving ? 'Saving...' : id ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {preview ? (
          /* Preview Mode */
          <div className="bg-white p-8 rounded-lg shadow-sm">
            {formData.headerImage && (
              <img
                src={formData.headerImage}
                alt={formData.title}
                className="w-full h-[400px] object-cover rounded-lg mb-8"
              />
            )}
            <div className="mb-4">
              <span className="inline-block bg-light-coral text-coral px-4 py-2 rounded-full text-sm font-medium">
                {formData.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-4">
              {formData.title || 'Untitled Post'}
            </h1>
            <p className="text-xl text-warm-gray italic mb-8">{formData.excerpt}</p>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: formData.content }}
            />
          </div>
        ) : (
          /* Edit Mode */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header Image */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <label className="block text-sm font-medium text-navy mb-2">
                Header Image
              </label>
              {formData.headerImage && (
                <img
                  src={formData.headerImage}
                  alt="Header"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              <div className="flex gap-4">
                <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <Upload size={18} />
                  {uploadingHeader ? 'Uploading...' : 'Upload Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleHeaderImageUpload}
                    className="hidden"
                    disabled={uploadingHeader}
                  />
                </label>
                <input
                  type="url"
                  value={formData.headerImage}
                  onChange={(e) => setFormData({ ...formData, headerImage: e.target.value })}
                  placeholder="Or paste image URL"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                />
              </div>
            </div>

            {/* Basic Fields */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      title: e.target.value,
                      slug: generateSlug(e.target.value),
                    });
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Slug * (URL-friendly)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                  required
                  pattern="[a-z0-9\-]+"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                    required
                  >
                    {BLOG_POST_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Excerpt * (Short description for listings)
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  LinkedIn URL (optional)
                </label>
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  placeholder="https://www.linkedin.com/pulse/..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-coral border-gray-300 rounded focus:ring-coral"
                />
                <label htmlFor="featured" className="ml-2 text-sm font-medium text-navy">
                  Feature this post on homepage
                </label>
              </div>
            </div>

            {/* Content Editor */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <label className="block text-sm font-medium text-navy mb-4">
                Content *
              </label>
              <RichTextEditor
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                placeholder="Write your blog post content here..."
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
