import React, { useState } from 'react';

export default function ProjectsLibraryView({ projects, onOpenProject, onDeleteProject }) {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="relative w-full px-space-md lg:px-space-lg py-space-md max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-lg">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold">
            Projects & Extracted Library
          </h1>
          <p className="font-body-md text-sm text-on-surface-variant mt-0.5">
            Manage your long-form video ingestion history, extracted viral clips, and syndication calendars.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects..."
              className="bg-surface-container-low border border-white/5 rounded-lg pl-9 pr-4 py-2 text-xs text-on-surface focus:outline-none focus:border-secondary/50 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="bg-surface-container-low rounded-xl overflow-hidden border border-white/5 hover:border-primary/40 transition-all p-space-sm flex flex-col justify-between group shadow-xl"
          >
            <div>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface-container-highest mb-space-sm">
                <img
                  src={proj.thumbnail || "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80"}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-tertiary font-label-mono text-[10px] font-bold border border-tertiary/40">
                    {proj.virality || 94} VIRAL
                  </span>
                </div>
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 font-label-mono text-[10px] text-white">
                  {proj.duration || '01:24:12'}
                </span>
              </div>

              <h3 className="font-headline-md text-sm text-on-surface font-bold truncate group-hover:text-primary transition-colors">
                {proj.title}
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 mt-1">
                {proj.description || 'Auto-clipped with multi-speaker face tracking and caption burn.'}
              </p>

              <div className="flex items-center gap-3 mt-3 text-xs text-outline font-label-mono">
                <span className="flex items-center gap-1 text-secondary">
                  <span className="material-symbols-outlined text-[14px]">movie_filter</span>
                  {proj.clipsCount || 10} Shorts Extracted
                </span>
                <span>•</span>
                <span>{proj.date || 'Today'}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onOpenProject(proj)}
                className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-primary-container text-on-surface hover:text-white font-label-pill text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[15px]">movie_edit</span>
                Open in Studio
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onDeleteProject(proj.id)}
                  className="p-1.5 rounded-lg text-outline hover:text-red-400 hover:bg-surface-container transition-colors"
                  title="Delete Project"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
