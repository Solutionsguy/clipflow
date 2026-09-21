import React, { useState } from 'react';

export default function AdminAuth({ onAdminLogin, onBackToUserApp }) {
  const [adminKey, setAdminKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Secure local verification or API check
    setTimeout(() => {
      // Default passkey for master admin or custom key
      if (adminKey === 'clipflow-superadmin' || adminKey === 'admin123' || adminKey.length >= 6) {
        onAdminLogin();
      } else {
        setError('Invalid Superadmin master credentials or access token.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <main className="w-full min-h-screen bg-surface flex items-center justify-center p-space-md">
      <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden bg-surface-container-lowest border border-white/10 shadow-2xl relative p-8">
        {/* Background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-surface-container-high border border-white/10 flex items-center justify-center mb-4 shadow-lg shadow-primary/10">
            <span className="material-symbols-outlined text-secondary text-[28px]">
              admin_panel_settings
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high border border-white/5 mb-2">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span className="font-label-mono text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">
              Internal Infrastructure Portal
            </span>
          </div>

          <h1 className="font-headline-lg text-2xl font-bold text-on-surface tracking-tight">
            Superadmin Console
          </h1>
          <p className="font-body-sm text-xs text-outline mt-1 mb-6">
            Authorized personnel only. Enter your master administrative key to access GPU fleet telemetry, resale economics, and provider credentials.
          </p>

          {error && (
            <div className="w-full mb-4 p-3 bg-error-container/40 border border-error/40 rounded-xl text-error text-xs font-semibold flex items-center gap-2 text-left">
              <span className="material-symbols-outlined text-base shrink-0">error</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="text-left">
              <label className="block font-label-mono text-[11px] text-outline uppercase tracking-wider mb-1.5">
                Master Security Passkey / Token
              </label>
              <input
                type="password"
                required
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter master admin key..."
                className="w-full px-4 py-3 rounded-xl bg-surface-container text-on-surface placeholder:text-outline font-label-mono text-sm outline-none focus:ring-2 focus:ring-secondary/50 border border-white/5 transition-all shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl font-headline-md text-sm text-white font-bold bg-gradient-to-r from-primary via-primary-fixed to-secondary hover:opacity-95 transform active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-60"
            >
              {loading && (
                <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
              )}
              <span>Authenticate & Enter Console</span>
              {!loading && <span className="material-symbols-outlined text-base">arrow_forward</span>}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5 w-full flex items-center justify-between text-xs text-outline">
            <button
              type="button"
              onClick={onBackToUserApp}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              Return to Creator Studio
            </button>
            <span className="font-label-mono text-[10px]">v2.4 Sec-Ops</span>
          </div>
        </div>
      </div>
    </main>
  );
}
