import React from 'react';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: 'grid_view' },
  { id: 'studio-editor', label: 'Studio Editor', icon: 'movie_edit' },
  { id: 'projects-and-library', label: 'Projects & Library', icon: 'video_library' },
  { id: 'billing-and-compute-credits', label: 'Billing & Compute', icon: 'toll' },
  { id: 'api-and-integrations', label: 'API & Integrations', icon: 'hub' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

export default function Sidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen, isAdmin, onAdminLogout }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-surface-container-low z-50 flex flex-col justify-between border-r border-white/5 transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Logo Brand Header */}
          <div className="h-16 flex items-center justify-between px-space-md border-b border-white/5 bg-surface-container-low">
            <div className="flex items-center gap-space-sm cursor-pointer" onClick={() => setActiveTab('overview')}>
              <img
                src="/clipflow-logo.svg"
                alt="ClipFlow Logo"
                className="h-8 w-8 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md text-on-surface leading-none tracking-tight font-bold bg-gradient-to-r from-primary via-primary-fixed to-secondary bg-clip-text text-transparent">
                  ClipFlow
                </span>
                <span className="font-label-mono text-[10px] text-secondary tracking-widest uppercase mt-0.5 font-semibold">
                  {isAdmin ? 'Superadmin Ops' : 'AI Clipping Studio'}
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              className="lg:hidden p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-space-md py-space-sm">
            <div className="flex items-center justify-between px-space-sm py-space-xs mb-space-xs">
              <span className="font-label-mono text-label-mono text-outline uppercase tracking-wider">
                {isAdmin ? 'Superadmin Mode' : 'Workspace'}
              </span>
              <span className="font-label-pill text-label-pill text-on-tertiary-container bg-tertiary-container/40 border border-tertiary/30 px-1.5 py-0.5 rounded">
                v2.4
              </span>
            </div>

            <nav className="flex flex-col gap-1">
              {isAdmin && (
                <button
                  onClick={() => {
                    setActiveTab('admin-console');
                    setMobileOpen(false);
                  }}
                  className={`flex items-center gap-space-sm px-space-md py-2.5 rounded-lg transition-all text-left group ${
                    activeTab === 'admin-console'
                      ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_0_16px_-4px_rgba(124,58,237,0.5)]'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] transition-colors ${
                      activeTab === 'admin-console'
                        ? 'text-on-primary-container'
                        : 'text-secondary group-hover:text-on-surface'
                    }`}
                  >
                    admin_panel_settings
                  </span>
                  <span className="font-body-md text-body-md font-bold text-secondary">
                    Admin Fleet Console
                  </span>
                </button>
              )}

              {NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileOpen(false);
                    }}
                    className={`flex items-center gap-space-sm px-space-md py-2.5 rounded-lg transition-all text-left group ${
                      isActive
                        ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_0_16px_-4px_rgba(124,58,237,0.5)]'
                        : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] transition-colors ${
                        isActive
                          ? 'text-on-primary-container'
                          : 'text-outline group-hover:text-on-surface'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="font-body-md text-body-md">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer info strip */}
        <div className="p-space-md flex flex-col gap-space-sm border-t border-white/5">
          {isAdmin && onAdminLogout && (
            <button
              onClick={onAdminLogout}
              className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-outline hover:text-white bg-surface-container hover:bg-surface-container-high border border-white/5 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[15px]">logout</span>
              Exit Superadmin Mode
            </button>
          )}

          <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-high/80 border border-white/5">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-secondary text-[18px]">dns</span>
              <span className="font-label-mono text-label-mono text-on-surface-variant font-medium">
                GPU NODE-04
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(78,222,163,0.8)] animate-pulse"></span>
              <span className="font-label-mono text-[9px] text-tertiary uppercase">READY</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
