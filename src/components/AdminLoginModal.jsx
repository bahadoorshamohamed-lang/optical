import React, { useState } from 'react';
import { Lock, User, KeyRound, X, ShieldAlert, Sparkles } from 'lucide-react';

const AdminLoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      // Validate credentials specified: username = 'admin', password = 'admin123'
      if (username.trim() === 'admin' && password === 'admin123') {
        setLoading(false);
        onLoginSuccess();
      } else {
        setLoading(false);
        setError('Invalid admin credentials. Please check your username and password.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center mx-auto shadow-lg border border-slate-700">
            <Lock className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-optom-green text-[11px] font-extrabold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admin Authentication</span>
          </div>

          <h3 className="text-2xl font-serif font-extrabold text-optom-slate-heading">
            Admin Portal Login
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Sign in to manage Open Posters, store banners, and catalogue items.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
            <ShieldAlert className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Username Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">
              Admin Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-optom-slate-heading placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-optom-green/50 focus:border-optom-green transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">
              Admin Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-optom-slate-heading placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-optom-green/50 focus:border-optom-green transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-optom-green text-white text-xs font-extrabold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Log In To Dashboard</span>
              </>
            )}
          </button>

        </form>

        {/* Preset Hint Footer */}
        <div className="text-center pt-2 border-t border-slate-100 text-[11px] text-slate-400">
          Demo Admin Credentials: <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-bold">admin</code> / <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-bold">admin123</code>
        </div>

      </div>

    </div>
  );
};

export default AdminLoginModal;
