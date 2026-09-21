import React from 'react';

export default function Header({
  credits,
  user,
  onOpenBilling,
  onOpenAuth,
  onToggleLanding,
  isLanding,
  onOpenMobileMenu,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-surface/85 backdrop-blur-xl border-b border-white/5 z-40 flex items-center justify-between px-space-md lg:px-space-lg">
      <div className="flex items-center gap-space-md flex-1 max-w-xl">
        {/* Mobile menu hamburger */}
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
          aria-label="Toggle Navigation"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        {/* Global Search Bar */}
        <div className="relative w-full flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-outline pointer-events-none text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search viral moments, transcripts, or render jobs..."
            className="w-full bg-surface-container-lowest border border-white/5 text-on-surface placeholder:text-outline/70 pl-9 pr-4 py-2 rounded-lg font-body-sm text-body-sm focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/30 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-space-sm lg:gap-space-md">
        {/* Toggle Landing View */}
        <button
          onClick={onToggleLanding}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-pill text-label-pill border border-white/5 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px] text-primary">
            {isLanding ? 'dashboard' : 'web'}
          </span>
          <span>{isLanding ? 'App Studio' : 'Showcase'}</span>
        </button>

        {/* Credit Counter Pill */}
        <div className="flex items-center gap-2 bg-surface-container-high border border-white/5 px-2.5 py-1 rounded-full shadow-inner">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-secondary text-[16px] animate-pulse">
              bolt
            </span>
            <span className="font-readout-num text-body-sm text-on-surface font-bold">
              {credits}
            </span>
            <span className="font-label-mono text-[10px] text-outline uppercase hidden xs:inline">
              Credits
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenBilling}
            className="bg-primary-container hover:bg-inverse-primary text-on-primary-container px-2 py-0.5 rounded-full font-label-pill text-[11px] font-semibold transition-all flex items-center gap-0.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-[12px]">add</span>
            Top Up
          </button>
        </div>

        <div className="h-6 w-px bg-surface-container-highest hidden sm:block"></div>

        {/* User Profile */}
        {user ? (
          <div
            onClick={onOpenAuth}
            className="flex items-center gap-space-xs sm:gap-space-sm cursor-pointer group p-1 rounded-lg hover:bg-surface-container transition-colors"
          >
            <img
              src="/avatar.png"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-primary/40 shadow-[0_0_10px_rgba(124,58,237,0.35)]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";
              }}
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="font-label-pill text-label-pill text-on-surface group-hover:text-primary transition-colors leading-tight truncate max-w-[110px]">
                {user.name || 'Alex Rivera'}
              </span>
              <span className="font-label-mono text-[10px] text-secondary font-medium leading-tight">
                {user.plan || 'Pro Plan'}
              </span>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:text-on-surface text-[16px] transition-colors hidden sm:block">
              expand_more
            </span>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary-container font-label-pill text-label-pill font-semibold shadow-md hover:bg-inverse-primary transition-all"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
