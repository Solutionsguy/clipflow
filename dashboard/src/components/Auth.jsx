import React, { useState } from 'react';
import { getApiUrl } from '../config';

// Authentication component (sign‑in / sign‑up toggle)
// Mirrors the design from stitch_ui/clipflow_authentication/code.html
// Props:
//   onSignIn – optional callback called after a successful login/signup
//              (used when rendered inside the SPA; otherwise redirects to /dashboard.html)
export default function Auth({ onSignIn }) {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isSignup = mode === 'signup';

  // Navigate to dashboard — use in‑SPA callback if available
  const goToDashboard = (targetTab = 'overview') => {
    if (onSignIn) {
      onSignIn(targetTab);
    } else {
      window.location.href = '/dashboard.html';
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const payload = { email, password, remember_me: remember };
    try {
      if (isSignup) {
        payload.full_name = fullName;
        const signupRes = await fetch(getApiUrl('/api/auth/signup'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!signupRes.ok) {
          const data = await signupRes.json().catch(() => ({}));
          throw new Error(data.detail || 'Signup failed — please check your details.');
        }
        // Auto‑login after successful signup
        const loginRes = await fetch(getApiUrl('/api/auth/login'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, remember_me: remember }),
        });
        if (!loginRes.ok) throw new Error('Signup succeeded but login failed. Please sign in manually.');
        goToDashboard();
      } else {
        const loginRes = await fetch(getApiUrl('/api/auth/login'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!loginRes.ok) throw new Error('Invalid email or password. Please try again.');
        goToDashboard();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-surface flex items-center justify-center p-space-md">
      <div className="w-full max-w-7xl mx-auto rounded-xl overflow-hidden bg-surface-container-lowest shadow-2xl relative">
        {/* Background blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary-container/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[780px] w-full relative z-10">
          {/* ── Left side – illustration ── */}
          <div className="lg:col-span-6 p-space-lg lg:p-space-xl flex flex-col justify-between relative bg-gradient-to-br from-surface-container-low/90 via-surface-container-lowest/80 to-surface-container-low/40 backdrop-blur-xl">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-primary-container via-primary to-secondary flex items-center justify-center shadow-lg shadow-primary-container/30">
                  <span className="material-symbols-outlined text-surface-container-lowest text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>movie_filter</span>
                </div>
                <div>
                  <span className="font-headline-md text-headline-md tracking-tight text-on-surface font-extrabold flex items-center gap-1">
                    ClipFlow<span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  </span>
                  <span className="font-label-mono text-label-mono text-outline uppercase tracking-widest block -mt-1">Neural Studio v3.4</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-space-sm py-1 rounded-full bg-surface-container-high/80 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-tertiary" />
                <span className="font-label-mono text-label-mono text-on-surface-variant font-medium">GPU Ready</span>
              </div>
            </div>

            {/* Hero copy */}
            <div className="my-space-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/15 text-primary text-label-pill font-label-pill mb-space-md">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                AUTONOMOUS SHORT-FORM SYNTHESIS
              </div>
              <h1 className="font-display text-display leading-tight text-on-surface font-extrabold mb-space-md">
                Automate your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">short-form empire.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mb-space-lg">
                ClipFlow turns long‑form podcasts, webinars, and streams into high‑converting viral reels with auto‑framing, dynamic kinetic captions, and algorithmic hook detection.
              </p>
            </div>

            {/* Stats chips */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3">
              <div className="bg-surface-container-lowest/70 p-2 rounded-lg text-center">
                <span className="block font-headline-md text-headline-md font-bold text-on-surface">10M+</span>
                <span className="font-label-mono text-[10px] text-outline">Shorts Rendered</span>
              </div>
              <div className="bg-surface-container-lowest/70 p-2 rounded-lg text-center">
                <span className="block font-headline-md text-headline-md font-bold text-tertiary">94%</span>
                <span className="font-label-mono text-[10px] text-outline">Avg Viral Score</span>
              </div>
              <div className="bg-surface-container-lowest/70 p-2 rounded-lg text-center">
                <span className="block font-headline-md text-headline-md font-bold text-secondary">40s</span>
                <span className="font-label-mono text-[10px] text-outline">Avg Gen Time</span>
              </div>
            </div>
          </div>

          {/* ── Right side – auth form ── */}
          <div className="lg:col-span-6 p-space-lg lg:p-space-xl flex flex-col justify-center bg-surface-container/40 backdrop-blur-2xl">
            <div className="w-full max-w-md mx-auto">
              {/* Tab selector */}
              <div className="p-1 rounded-xl bg-surface-container-low flex items-center mb-space-lg">
                <button
                  className={mode === 'signin'
                    ? 'flex-1 py-2.5 px-4 rounded-lg font-headline-md text-xs text-center transition-all bg-primary-container text-white shadow-md'
                    : 'flex-1 py-2.5 px-4 rounded-lg font-headline-md text-xs text-center transition-all text-on-surface-variant hover:text-on-surface'}
                  onClick={() => switchMode('signin')}
                >
                  Sign In to Workspace
                </button>
                <button
                  className={mode === 'signup'
                    ? 'flex-1 py-2.5 px-4 rounded-lg font-headline-md text-xs text-center transition-all bg-primary-container text-white shadow-md flex items-center justify-center gap-1.5'
                    : 'flex-1 py-2.5 px-4 rounded-lg font-headline-md text-xs text-center transition-all text-on-surface-variant hover:text-on-surface flex items-center justify-center gap-1.5'}
                  onClick={() => switchMode('signup')}
                >
                  Create Account <span className="px-1.5 py-0.5 rounded bg-tertiary/20 text-tertiary font-label-mono text-[10px] font-bold">+5 FREE</span>
                </button>
              </div>

              {/* Title / subtitle */}
              <h2 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight">
                {mode === 'signin' ? 'Welcome back, creator' : 'Start 7‑Day Studio Trial'}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 mb-space-lg">
                {mode === 'signin'
                  ? 'Access your cloud studio & AI‑rendered short pipelines.'
                  : 'Claim your 5 free cloud render credits instantly.'}
              </p>

              {/* Inline error banner */}
              {error && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-error/10 border border-error/30 text-error font-body-sm text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">error</span>
                  {error}
                </div>
              )}

              {/* Form */}
              <form className="space-y-space-md" onSubmit={handleSubmit}>
                {isSignup && (
                  <div className="mb-4">
                    <label className="block font-headline-md text-xs text-on-surface mb-1.5 font-medium" htmlFor="full-name">Full Name</label>
                    <div className="relative">
                      <input
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-sm outline-none focus:ring-2 focus:ring-secondary/50 transition-all shadow-inner"
                        id="full-name"
                        placeholder="Alex Morgan"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                      <span className="material-symbols-outlined absolute right-3.5 top-3.5 text-outline text-lg">badge</span>
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <label className="block font-headline-md text-xs text-on-surface mb-1.5 font-medium" htmlFor="email-address">Creator / Work Email</label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-sm outline-none focus:ring-2 focus:ring-secondary/50 transition-all shadow-inner"
                      id="email-address"
                      placeholder="creator@media-empire.com"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="material-symbols-outlined absolute right-3.5 top-3.5 text-outline text-lg">alternate_email</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block font-headline-md text-xs text-on-surface font-medium" htmlFor="password-input">Workspace Password</label>
                    <a className="font-headline-md text-xs text-primary hover:text-primary-fixed transition-colors font-medium" href="#">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-sm outline-none focus:ring-2 focus:ring-secondary/50 transition-all shadow-inner pr-11"
                      id="password-input"
                      placeholder="••••••••••••"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3.5 top-3 text-outline hover:text-on-surface transition-colors"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="w-4 h-4 rounded bg-surface-container-lowest text-primary-container focus:ring-0 focus:ring-offset-0 accent-primary-container"
                    />
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Remember this workstation for 30 days</span>
                  </label>
                </div>

                {/* Primary CTA */}
                <button
                  className="w-full py-3.5 px-6 rounded-xl font-headline-md text-sm text-white font-bold bg-gradient-to-r from-primary-container via-inverse-primary to-secondary hover:opacity-95 transform active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-container/25 disabled:opacity-60"
                  type="submit"
                  disabled={loading}
                >
                  {loading && (
                    <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                  )}
                  <span>{mode === 'signin' ? 'Sign In to Workspace' : 'Claim 5 Free Credits & Register'}</span>
                  {!loading && <span className="material-symbols-outlined text-base">arrow_forward</span>}
                </button>

                {/* Demo bypass — skip auth and go straight to creator workspace */}
                <button
                  type="button"
                  className="w-full py-2.5 px-6 rounded-xl font-headline-md text-xs text-on-surface-variant border border-surface-container-highest hover:bg-surface-container-low transition-all flex items-center justify-center gap-2 mt-1"
                  onClick={() => goToDashboard('overview')}
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">play_circle</span>
                  Explore Studio (Demo Mode)
                </button>
              </form>

              {/* Footer */}
              <div className="mt-space-lg pt-space-md border-t border-surface-container-highest/60 flex items-center justify-between text-on-surface-variant">
                <div className="flex items-center gap-2 font-label-mono text-[11px]">
                  <span className="material-symbols-outlined text-sm text-tertiary">lock</span>
                  <span>256‑Bit TLS End‑to‑End Encryption</span>
                </div>
                <span className="font-label-mono text-[11px] text-outline">No CC required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
