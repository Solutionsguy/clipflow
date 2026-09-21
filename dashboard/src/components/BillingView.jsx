import React, { useState } from 'react';

export default function BillingView({ credits, onAddCredits, user, onUpdatePlan }) {
  const [tab, setTab] = useState('plans'); // 'plans' | 'bundles'
  const [autoRefill, setAutoRefill] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(user?.plan || 'Pro Studio');

  const handlePurchasePlan = (planName, creditAmount) => {
    setSelectedPlan(planName);
    onAddCredits(creditAmount);
    if (onUpdatePlan) onUpdatePlan(planName);
  };

  const handlePurchaseBundle = (creditsCount) => {
    onAddCredits(creditsCount);
  };

  return (
    <div className="relative w-full px-space-md lg:px-space-xl py-space-md max-w-5xl mx-auto">
      {/* Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Balance Card */}
      <div className="relative bg-surface-container-low rounded-2xl p-space-md sm:p-space-lg border border-white/5 shadow-2xl mb-space-lg overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-primary opacity-70"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md mb-space-md">
          <div>
            <span className="font-label-mono text-label-mono text-outline uppercase tracking-wider flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Available Render Balance
            </span>
            <div className="flex items-baseline gap-space-xs mt-1">
              <span className="material-symbols-outlined text-secondary text-[32px]">bolt</span>
              <span className="font-display-mobile text-display-mobile text-on-surface font-extrabold tracking-tight">
                {credits}
              </span>
              <span className="font-headline-md text-headline-md text-primary font-bold ml-1">Credits</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-space-sm py-1 rounded-full bg-surface-container-high text-secondary flex items-center gap-1.5 border border-white/5 shadow-inner">
              <span className="material-symbols-outlined text-[15px]">auto_videocam</span>
              <span className="font-label-pill text-label-pill font-bold">{selectedPlan}</span>
            </div>
            <button
              type="button"
              onClick={() => handlePurchaseBundle(50)}
              className="px-3.5 py-1.5 rounded-full bg-primary-container hover:bg-inverse-primary text-white font-label-pill text-xs font-bold transition-all shadow-md"
            >
              + Quick 50 CR
            </button>
          </div>
        </div>

        {/* Equivalence Callout */}
        <div className="bg-surface-container rounded-lg p-space-sm flex items-center gap-space-sm mb-space-md border border-white/5">
          <div className="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">movie_filter</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-body-sm text-on-surface font-semibold truncate">
              ≈ {Math.floor(credits / 2)} High-Definition 9:16 Viral Shorts remaining
            </span>
            <span className="font-label-mono text-[10px] text-outline">
              Includes Dual-Cam Face Tracking, Gemini Viral Hooks & 1080p 60fps
            </span>
          </div>
        </div>

        {/* Consumption Progress Bar */}
        <div className="space-y-1.5 mb-space-md">
          <div className="flex justify-between items-center font-label-mono text-[11px]">
            <span className="text-on-surface-variant">Monthly Cycle Usage</span>
            <span className="text-on-surface font-semibold">55 / 100 Used (55%)</span>
          </div>
          <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden relative">
            <div className="h-full bg-gradient-to-r from-primary-container via-primary to-secondary rounded-full w-[55%]"></div>
          </div>
        </div>

        {/* Auto-Refill toggle */}
        <div className="flex items-center justify-between pt-space-xs bg-surface-container-lowest/50 -mx-space-md -mb-space-md sm:-mx-space-lg sm:-mb-space-lg px-space-md sm:px-space-lg py-space-sm border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">sync_saved_locally</span>
            <div className="flex flex-col">
              <span className="font-label-pill text-xs text-on-surface font-semibold">
                Auto-refill when below 10 credits
              </span>
              <span className="font-label-mono text-[10px] text-outline">
                Triggers 50-credit instant top-up
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAutoRefill(!autoRefill)}
            className={`w-11 h-6 rounded-full relative p-0.5 transition-colors ${
              autoRefill ? 'bg-primary-container' : 'bg-surface-container-highest'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                autoRefill ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Switcher Tab (Monthly Plans vs Bundles) */}
      <div className="w-full bg-surface-container-lowest p-1 rounded-xl border border-white/5 flex gap-1 mb-space-md">
        <button
          type="button"
          onClick={() => setTab('plans')}
          className={`flex-1 py-2 rounded-lg font-label-pill text-label-pill font-bold transition-all flex items-center justify-center gap-1.5 ${
            tab === 'plans'
              ? 'bg-surface-container-high text-on-surface shadow-md'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[16px] text-primary">calendar_month</span>
          Monthly Plans
        </button>
        <button
          type="button"
          onClick={() => setTab('bundles')}
          className={`flex-1 py-2 rounded-lg font-label-pill text-label-pill font-bold transition-all flex items-center justify-center gap-1.5 ${
            tab === 'bundles'
              ? 'bg-surface-container-high text-on-surface shadow-md'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[16px] text-secondary">token</span>
          Credit Bundles
          <span className="bg-tertiary-container/30 text-tertiary font-label-mono text-[9px] px-1.5 py-0.5 rounded-full uppercase border border-tertiary/40">
            No Expiry
          </span>
        </button>
      </div>

      {/* Monthly Plans View */}
      {tab === 'plans' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {/* Plan 1 */}
          <div className="bg-surface-container-low rounded-xl p-space-md border border-white/5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-headline-md text-headline-md font-bold text-on-surface">Creator Pass</span>
                <span className="font-headline-lg font-extrabold text-white">$19<span className="text-xs text-outline font-normal">/mo</span></span>
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-mono text-[10px] mb-space-sm border border-white/5">
                <span className="material-symbols-outlined text-[13px]">bolt</span>
                120 Credits / month (~60 shorts)
              </div>
              <ul className="space-y-2 text-xs text-on-surface-variant mb-space-md">
                <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-tertiary text-[14px]">check</span> Dual-Cam Face Tracking</li>
                <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-tertiary text-[14px]">check</span> 1080p 60fps MP4 Exports</li>
                <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-tertiary text-[14px]">check</span> Gemini AI Viral Moment Scoring</li>
                <li className="flex items-center gap-1.5 text-outline"><span className="material-symbols-outlined text-[14px]">close</span> Priority GPU Compute Queue</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => handlePurchasePlan('Creator Pass', 120)}
              className="w-full py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-pill text-xs font-bold border border-white/5 transition-all"
            >
              Select Creator Pass
            </button>
          </div>

          {/* Plan 2: Pro Studio (Featured) */}
          <div className="bg-surface-container-low rounded-xl p-space-md border-2 border-primary shadow-[0_0_24px_rgba(124,58,237,0.3)] flex flex-col justify-between relative">
            <div className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-gradient-to-r from-primary-container to-secondary-container text-white font-label-mono text-[9px] font-extrabold uppercase tracking-wider">
              Most Popular
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-headline-md text-headline-md font-bold text-on-surface">Pro Studio</span>
                <span className="font-headline-lg font-extrabold text-white">$49<span className="text-xs text-outline font-normal">/mo</span></span>
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/20 text-primary font-label-mono text-[10px] mb-space-sm border border-primary/30">
                <span className="material-symbols-outlined text-[13px]">bolt</span>
                360 Credits / month (~180 shorts)
              </div>
              <ul className="space-y-2 text-xs text-on-surface-variant mb-space-md">
                <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-tertiary text-[14px]">check</span> Everything in Creator Pass</li>
                <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-tertiary text-[14px]">check</span> Priority Dedicated GPU Queue</li>
                <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-tertiary text-[14px]">check</span> AI Multi-Voice Dubbing (30+ langs)</li>
                <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-tertiary text-[14px]">check</span> 1-Click Social Syndication (TikTok, Reels, Shorts)</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => handlePurchasePlan('Pro Studio', 360)}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-primary-container to-secondary-container text-white font-label-pill text-xs font-bold shadow-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.6)] transition-all"
            >
              Active Plan (Upgrade/Renew)
            </button>
          </div>

          {/* Plan 3: Agency Scale */}
          <div className="bg-surface-container-low rounded-xl p-space-md border border-white/5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-headline-md text-headline-md font-bold text-on-surface">Agency Scale</span>
                <span className="font-headline-lg font-extrabold text-white">$149<span className="text-xs text-outline font-normal">/mo</span></span>
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-secondary font-label-mono text-[10px] mb-space-sm border border-white/5">
                <span className="material-symbols-outlined text-[13px]">bolt</span>
                1,200 Credits / month (~600 shorts)
              </div>
              <ul className="space-y-2 text-xs text-on-surface-variant mb-space-md">
                <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-tertiary text-[14px]">check</span> Everything in Pro Studio</li>
                <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-tertiary text-[14px]">check</span> Unlimited Team Seats & Workspaces</li>
                <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-tertiary text-[14px]">check</span> Custom Subtitle Fonts & Branding</li>
                <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-tertiary text-[14px]">check</span> Webhook & Automated Ingestion API</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => handlePurchasePlan('Agency Scale', 1200)}
              className="w-full py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-pill text-xs font-bold border border-white/5 transition-all"
            >
              Select Agency Scale
            </button>
          </div>
        </div>
      )}

      {/* Credit Bundles View */}
      {tab === 'bundles' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          <div className="bg-surface-container-low rounded-xl p-space-md border border-white/5 shadow-lg flex flex-col justify-between">
            <div>
              <span className="font-headline-md font-bold text-white block mb-1">Starter Pack</span>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-headline-lg font-extrabold text-white">$15</span>
                <span className="text-xs text-outline font-label-mono">one-time</span>
              </div>
              <p className="text-xs text-on-surface-variant mb-4">50 Render Credits (~25 viral clips). No expiration date.</p>
            </div>
            <button
              type="button"
              onClick={() => handlePurchaseBundle(50)}
              className="w-full py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-pill text-xs font-bold border border-white/5 transition-all"
            >
              Buy 50 Credits ($15)
            </button>
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-md border-2 border-secondary/50 shadow-xl flex flex-col justify-between">
            <div>
              <span className="font-headline-md font-bold text-white block mb-1">Creator Pack</span>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-headline-lg font-extrabold text-white">$39</span>
                <span className="text-xs text-outline font-label-mono">one-time</span>
              </div>
              <p className="text-xs text-on-surface-variant mb-4">150 Render Credits (~75 viral clips). Save 15%.</p>
            </div>
            <button
              type="button"
              onClick={() => handlePurchaseBundle(150)}
              className="w-full py-2.5 rounded-lg bg-secondary-container hover:bg-secondary text-on-secondary-container font-label-pill text-xs font-bold transition-all shadow-md"
            >
              Buy 150 Credits ($39)
            </button>
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-md border border-white/5 shadow-lg flex flex-col justify-between">
            <div>
              <span className="font-headline-md font-bold text-white block mb-1">Power Studio</span>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-headline-lg font-extrabold text-white">$99</span>
                <span className="text-xs text-outline font-label-mono">one-time</span>
              </div>
              <p className="text-xs text-on-surface-variant mb-4">500 Render Credits (~250 viral clips). Maximum savings.</p>
            </div>
            <button
              type="button"
              onClick={() => handlePurchaseBundle(500)}
              className="w-full py-2.5 rounded-lg bg-primary-container hover:bg-inverse-primary text-white font-label-pill text-xs font-bold transition-all shadow-md"
            >
              Buy 500 Credits ($99)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
