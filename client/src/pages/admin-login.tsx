import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdminAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      setLocation('/admin/blog');
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-warm-gray flex items-center justify-center px-6">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-coral p-3 rounded-full">
            <Lock size={32} className="text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-serif font-bold text-navy text-center mb-2">
          Admin Access
        </h1>
        <p className="text-warm-gray text-center mb-6">
          Enter your password to access the blog CMS
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-navy mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
              placeholder="Enter admin password"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-coral text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-xs text-warm-gray text-center">
          Adaptive Edge CMS v1.0
        </p>
      </div>
    </div>
  );
}
