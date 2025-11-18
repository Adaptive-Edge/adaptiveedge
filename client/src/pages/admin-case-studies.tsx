import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { Plus, Edit, Trash2, LogOut, Eye } from 'lucide-react';
import type { CaseStudy } from '@shared/schema';

export default function AdminCaseStudies() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, logout } = useAdminAuth();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/admin/login');
      return;
    }
    loadCaseStudies();
  }, [isAuthenticated, setLocation]);

  const loadCaseStudies = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/case-studies');
      if (response.ok) {
        const data = await response.json();
        setCaseStudies(data);
      }
    } catch (error) {
      console.error('Failed to load blog caseStudies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/case-studies/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCaseStudies(caseStudies.filter(p => p.id !== id));
        setDeleteConfirm(null);
      } else {
        alert('Failed to delete blog caseStudy');
      }
    } catch (error) {
      console.error('Failed to delete blog caseStudy:', error);
      alert('Failed to delete blog caseStudy');
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
            <h1 className="text-2xl font-serif font-bold text-navy">Blog Management</h1>
            <p className="text-sm text-warm-gray">Manage your blog caseStudies</p>
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
              onClick={() => setLocation('/admin/case-studies/new')}
              className="flex items-center gap-2 bg-coral text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300"
            >
              <Plus size={18} />
              New Post
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
        ) : caseStudies.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h2 className="text-2xl font-serif font-bold text-navy mb-4">
              No blog caseStudies yet
            </h2>
            <p className="text-warm-gray mb-6">
              Get started by creating your first blog caseStudy
            </p>
            <button
              onClick={() => setLocation('/admin/case-studies/new')}
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
                {caseStudies.map((caseStudy) => (
                  <tr key={caseStudy.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-navy">{caseStudy.title}</div>
                        <div className="text-sm text-warm-gray truncate max-w-md">
                          {caseStudy.excerpt}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-light-coral text-coral px-3 py-1 rounded-full text-xs font-medium">
                        {caseStudy.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-warm-gray">
                      {formatDate(caseStudy.date)}
                    </td>
                    <td className="px-6 py-4">
                      {caseStudy.featured && (
                        <span className="inline-block bg-coral text-white px-3 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setLocation(`/admin/case-studies/edit/${caseStudy.id}`)}
                          className="p-2 text-warm-gray hover:text-navy hover:bg-gray-100 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(caseStudy.id)}
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
            <div className="text-3xl font-bold text-navy">{caseStudies.length}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm text-warm-gray mb-1">Featured Posts</div>
            <div className="text-3xl font-bold text-coral">
              {caseStudies.filter(p => p.featured).length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm text-warm-gray mb-1">Categories</div>
            <div className="text-3xl font-bold text-navy">
              {new Set(caseStudies.map(p => p.category)).size}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-bold text-navy mb-4">Delete Blog Post?</h3>
            <p className="text-warm-gray mb-6">
              Are you sure you want to delete this blog caseStudy? This action cannot be undone.
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
