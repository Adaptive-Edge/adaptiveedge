import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { Plus, Edit, Trash2, LogOut, Eye } from 'lucide-react';
import type { BlogPost, CaseStudy } from '@shared/schema';

export default function AdminBlogList() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, logout } = useAdminAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/admin/login');
      return;
    }
    loadPosts();
    loadCaseStudies();
  }, [isAuthenticated, setLocation]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/blog-posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Failed to load blog posts:', error);
    } finally {
      setLoading(false);
    }
  };
  const loadCaseStudies = async () => {
    try {
      const response = await fetch("/api/case-studies");
      if (response.ok) {
        const data = await response.json();
        setCaseStudies(data);
      }
    } catch (error) {
      console.error("Failed to load case studies:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/blog-posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(p => p.id !== id));
        setDeleteConfirm(null);
      } else {
        alert('Failed to delete blog post');
      }
    } catch (error) {
      console.error('Failed to delete blog post:', error);
      alert('Failed to delete blog post');
    }
  };

  const handleLogout = () => {
    logout();
    setLocation('/admin/login');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-navy">Content Management</h1>
            <p className="text-sm text-warm-gray">Manage blog posts and case studies</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLocation('/blog')}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Eye size={18} />
              View Blog
            </button>
            <button
              onClick={() => setLocation('/admin/blog/new')}
              className="flex items-center gap-2 bg-coral text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300"
            >
              <Plus size={18} />
              New Post
            </button>
            <button
              onClick={() => setLocation("/admin/case-study/new")}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              <Plus size={18} />
              New Case Study
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl text-warm-gray">Loading...</div>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h2 className="text-2xl font-serif font-bold text-navy mb-4">
              No blog posts yet
            </h2>
            <p className="text-warm-gray mb-6">
              Get started by creating your first blog post
            </p>
            <button
              onClick={() => setLocation('/admin/blog/new')}
              className="inline-flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300"
            >
              <Plus size={20} />
              Create First Post
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-navy">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-navy">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-navy">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-navy">Featured</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-navy">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-navy">{post.title}</div>
                        <div className="text-sm text-warm-gray truncate max-w-md">
                          {post.excerpt}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-light-coral text-coral px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-warm-gray">
                      {formatDate(post.date)}
                    </td>
                    <td className="px-6 py-4">
                      {post.featured && (
                        <span className="inline-block bg-coral text-white px-3 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setLocation(`/admin/blog/edit/${post.id}`)}
                          className="p-2 text-warm-gray hover:text-navy hover:bg-gray-100 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(post.id)}
                          className="p-2 text-warm-gray hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm text-warm-gray mb-1">Total Posts</div>
            <div className="text-3xl font-bold text-navy">{posts.length}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm text-warm-gray mb-1">Featured Posts</div>
            <div className="text-3xl font-bold text-coral">
              {posts.filter(p => p.featured).length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm text-warm-gray mb-1">Categories</div>
            <div className="text-3xl font-bold text-navy">
              {new Set(posts.map(p => p.category)).size}
            </div>
          </div>
        </div>
      </div>

n      {/* Case Studies Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif font-bold text-navy">Case Studies</h2>
        </div>
        {caseStudies.length > 0 ? (
          <div className="space-y-4">
            {caseStudies.map((caseStudy) => (
              <div key={caseStudy.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-navy">{caseStudy.title}</h3>
                      {caseStudy.featured && (
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Featured</span>
                      )}
                      {caseStudy.treeHouseAttribution && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">TreeHouse</span>
                      )}
                    </div>
                    <p className="text-sm text-warm-gray mt-1">{caseStudy.client} • {caseStudy.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.open(`/work/${caseStudy.slug}`, "_blank")}
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setLocation(`/admin/case-study/edit/${caseStudy.id}`)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h3 className="text-lg font-semibold text-navy mb-2">No case studies yet</h3>
            <p className="text-warm-gray mb-4">Create your first case study to get started</p>
            <button
              onClick={() => setLocation("/admin/case-study/new")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Case Study
            </button>
          </div>
        )}
      </div>
      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-bold text-navy mb-4">Delete Blog Post?</h3>
            <p className="text-warm-gray mb-6">
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
