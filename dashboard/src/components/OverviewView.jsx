import React, { useState, useRef } from 'react';

export default function OverviewView({
  onStartJob,
  activeJob,
  onCancelJob,
  projects,
  onOpenProjectInStudio,
  credits,
  onOpenBilling,
  onOpenLogs,
}) {
  const [streamUrl, setStreamUrl] = useState('https://youtube.com/watch?v=kYvH5Q_Wz98');
  const [inferenceEngine, setInferenceEngine] = useState('ultra');
  const [durationPref, setDurationPref] = useState('30-60');
  const [reframeMode, setReframeMode] = useState('dual-cam');
  const [audioTrack, setAudioTrack] = useState('both');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleInspect = () => {
    // Quick URL inspection preview
    if (!streamUrl) return;
  };

  const handleStartExtraction = () => {
    if (!streamUrl) return;
    onStartJob({
      type: 'url',
      url: streamUrl,
      engine: inferenceEngine,
      duration: durationPref,
      reframe: reframeMode,
      cost: 5,
    });
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onStartJob({
        type: 'file',
        file: file,
        filename: file.name,
        engine: inferenceEngine,
        duration: durationPref,
        reframe: reframeMode,
        cost: 5,
      });
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onStartJob({
        type: 'file',
        file: file,
        filename: file.name,
        engine: inferenceEngine,
        duration: durationPref,
        reframe: reframeMode,
        cost: 5,
      });
    }
  };

  return (
    <div className="relative w-full overflow-hidden px-space-md lg:px-space-lg pb-space-xl pt-space-md">
      {/* Dynamic Atmospheric Glow Underlay */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="pointer-events-none absolute top-60 left-10 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"></div>

      {/* Creator Welcome & Mission Control Status */}
      <div className="relative z-10 mb-space-lg flex flex-col gap-space-md lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-space-xs">
            <span className="inline-flex h-2 w-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(78,222,163,0.8)]"></span>
            <span className="font-label-mono text-label-mono text-tertiary uppercase tracking-wider">
              Neural Engine v3.2 Online
            </span>
            <span className="font-label-mono text-label-mono text-outline">/ NODE-US-EAST-04</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mt-1 font-bold">
            Welcome back, Alex Rivera <span className="text-primary font-normal text-headline-md">⚡</span>
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            AI Clipping Engine active. Auto-detect high-retention hooks, reframe 9:16 and score viral potential.
          </p>
        </div>

        {/* Quick Fast-Stats HUD Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-surface-container-low p-2 rounded-xl border border-white/5 shadow-xl">
          <div className="bg-surface-container px-space-md py-2.5 rounded-lg flex flex-col justify-center">
            <div className="flex items-center justify-between gap-2">
              <span className="font-label-mono text-[10px] text-outline uppercase">Active Queues</span>
              <span className="material-symbols-outlined text-secondary text-[16px]">sync</span>
            </div>
            <span className="font-readout-num text-headline-md text-on-surface font-semibold">
              {activeJob ? '01' : '00'}
            </span>
          </div>
          <div className="bg-surface-container px-space-md py-2.5 rounded-lg flex flex-col justify-center">
            <div className="flex items-center justify-between gap-2">
              <span className="font-label-mono text-[10px] text-outline uppercase">Clips Extracted</span>
              <span className="material-symbols-outlined text-tertiary text-[16px]">content_cut</span>
            </div>
            <span className="font-readout-num text-headline-md text-on-surface font-semibold">128</span>
          </div>
          <div className="bg-surface-container px-space-md py-2.5 rounded-lg flex flex-col justify-center">
            <div className="flex items-center justify-between gap-2">
              <span className="font-label-mono text-[10px] text-outline uppercase">Viral Reach</span>
              <span className="material-symbols-outlined text-primary text-[16px]">trending_up</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-readout-num text-headline-md text-on-surface font-semibold">1.4M</span>
              <span className="font-label-mono text-[10px] text-tertiary font-bold">+34%</span>
            </div>
          </div>
          <div className="bg-surface-container-high px-space-md py-2 rounded-lg flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-mono text-[10px] text-outline uppercase">Compute CR</span>
              <span className="inline-flex items-center gap-1 font-readout-num text-label-pill text-secondary font-semibold">
                <span className="material-symbols-outlined text-[12px]">bolt</span> {credits} CR
              </span>
            </div>
            <button
              onClick={onOpenBilling}
              className="mt-1 w-full bg-primary-container hover:bg-inverse-primary text-on-primary-container py-1 rounded font-label-pill text-[11px] font-semibold shadow-md transition-all flex items-center justify-center gap-1"
              type="button"
            >
              <span className="material-symbols-outlined text-[13px]">add_circle</span>
              Top Up
            </button>
          </div>
        </div>
      </div>

      {/* Active Real-Time Render Banner (Shown when processing) */}
      {activeJob && (
        <div className="relative z-10 mb-space-lg bg-surface-container-low rounded-xl p-space-md border border-secondary/30 shadow-xl overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary shadow-[0_0_12px_rgba(76,215,246,0.8)]"></div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
            <div className="flex items-start sm:items-center gap-space-md min-w-0">
              <div className="relative shrink-0 w-16 h-12 rounded-lg overflow-hidden bg-surface-container-highest">
                <img
                  src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&auto=format&fit=crop&q=80"
                  alt="Job Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-surface-container-lowest/50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary animate-spin text-[20px]">
                    motion_photos_on
                  </span>
                </div>
              </div>
              <div className="min-w-0 flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-label-pill text-[10px] uppercase bg-secondary/15 text-secondary px-2 py-0.5 rounded font-bold tracking-wide">
                    Job In Progress
                  </span>
                  <span className="font-readout-num text-body-sm text-outline">{activeJob.id || 'JOB-8941-AI'}</span>
                  <span className="font-label-mono text-label-mono text-tertiary flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                    {activeJob.step || 'Step 3/4: Semantic Voice Detection & Face-Tracking Reframe'}
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface truncate mt-0.5 font-bold">
                  {activeJob.title || 'Lex Fridman & Sam Altman — Autonomous Media & AI Horizons'}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-space-md shrink-0">
              <div className="flex flex-col items-end min-w-[140px]">
                <div className="flex items-baseline gap-2">
                  <span className="font-readout-num text-headline-md text-secondary font-bold">
                    {activeJob.progress || 74}%
                  </span>
                  <span className="font-label-mono text-label-mono text-outline">
                    ETA: {activeJob.eta || '38s'}
                  </span>
                </div>
                <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden mt-1 shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                    style={{ width: `${activeJob.progress || 74}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenLogs}
                  className="bg-surface-container hover:bg-surface-container-high text-on-surface px-3 py-2 rounded-lg font-body-sm text-body-sm transition-colors flex items-center gap-1.5 border border-white/5"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">terminal</span>
                  Logs
                </button>
                <button
                  onClick={onCancelJob}
                  className="bg-surface-container hover:bg-error-container text-outline hover:text-on-error-container p-2 rounded-lg transition-colors border border-white/5"
                  type="button"
                  title="Cancel Job"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN EXTRACTION WORKBENCH */}
      <section className="relative z-10 mb-space-xl bg-surface-container-low rounded-2xl p-space-md lg:p-space-lg border border-white/5 shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-space-md mb-space-md border-b border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[24px]">auto_videocam</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
                AI Viral Ingestion Console
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              ClipFlow multithreaded engine extracts speech cadences, emotional hooks, and generates viral 9:16 vertical cuts.
            </p>
          </div>
          <div className="flex items-center gap-space-sm mt-3 lg:mt-0">
            <span className="font-label-pill text-label-pill text-on-surface-variant bg-surface-container px-3 py-1 rounded-full border border-white/5">
              Autonomous Cut Precision: <span className="text-tertiary font-readout-num font-semibold">99.4%</span>
            </span>
          </div>
        </div>

        {/* Ingestion Matrix: URL vs Direct Upload */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md mb-space-lg">
          {/* Left: Universal URL Fetcher (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container rounded-xl p-space-md flex flex-col justify-between border border-white/5 shadow-md">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">link</span>
                  <label className="font-label-pill text-label-pill text-on-surface uppercase tracking-wide font-semibold">
                    Paste Stream / Video URL
                  </label>
                </div>
                <div className="flex items-center gap-1.5 opacity-80">
                  <span className="font-label-mono text-[10px] bg-surface-container-highest text-on-surface-variant px-1.5 py-0.5 rounded">
                    YouTube
                  </span>
                  <span className="font-label-mono text-[10px] bg-surface-container-highest text-on-surface-variant px-1.5 py-0.5 rounded">
                    Twitch
                  </span>
                  <span className="font-label-mono text-[10px] bg-surface-container-highest text-on-surface-variant px-1.5 py-0.5 rounded">
                    Kick
                  </span>
                  <span className="font-label-mono text-[10px] bg-surface-container-highest text-on-surface-variant px-1.5 py-0.5 rounded">
                    Vimeo
                  </span>
                </div>
              </div>

              <div className="relative flex items-center">
                <input
                  type="text"
                  value={streamUrl}
                  onChange={(e) => setStreamUrl(e.target.value)}
                  placeholder="Paste YouTube, Twitch, Kick or Vimeo stream link..."
                  className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-4 py-3 rounded-lg border border-white/5 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/30 transition-all pr-24 shadow-inner"
                />
                <button
                  type="button"
                  onClick={handleInspect}
                  className="absolute right-2 bg-surface-container-highest hover:bg-surface-bright text-on-surface font-label-pill text-label-pill px-3 py-1.5 rounded transition-colors flex items-center gap-1 border border-white/5"
                >
                  <span className="material-symbols-outlined text-[15px] text-secondary">cached</span>
                  Inspect
                </button>
              </div>

              {/* Sample Chips */}
              <div className="flex items-center gap-space-xs overflow-x-auto pt-2 pb-1 scrollbar-none">
                <span className="font-label-mono text-[10px] text-outline uppercase flex-shrink-0">
                  Try Sample:
                </span>
                <button
                  type="button"
                  onClick={() => setStreamUrl('https://youtube.com/watch?v=kYvH5Q_Wz98')}
                  className="px-2 py-0.5 rounded-full bg-surface-container-highest hover:bg-surface-bright text-on-surface-variant hover:text-secondary font-label-pill text-[11px] whitespace-nowrap transition-colors"
                >
                  Lex & Sam Altman
                </button>
                <button
                  type="button"
                  onClick={() => setStreamUrl('https://youtube.com/watch?v=huberman_sleep_mastery')}
                  className="px-2 py-0.5 rounded-full bg-surface-container-highest hover:bg-surface-bright text-on-surface-variant hover:text-secondary font-label-pill text-[11px] whitespace-nowrap transition-colors"
                >
                  Huberman Sleep
                </button>
                <button
                  type="button"
                  onClick={() => setStreamUrl('https://youtube.com/watch?v=all_in_podcast_ep180')}
                  className="px-2 py-0.5 rounded-full bg-surface-container-highest hover:bg-surface-bright text-on-surface-variant hover:text-secondary font-label-pill text-[11px] whitespace-nowrap transition-colors"
                >
                  All-In Ep. 180
                </button>
              </div>

              {/* Auto-Fetched Metadata Card Preview */}
              <div className="mt-space-sm p-space-sm bg-surface-container-lowest rounded-lg flex items-center gap-space-md border border-white/5">
                <div className="relative w-28 h-16 rounded overflow-hidden shrink-0 bg-surface-container-high">
                  <img
                    src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&auto=format&fit=crop&q=80"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 font-label-mono text-[9px] bg-surface-container-lowest/90 px-1 rounded text-on-surface font-semibold">
                    02:14:50
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-[9px] bg-tertiary-container/50 text-tertiary px-1.5 py-0.5 rounded font-bold border border-tertiary/30">
                      METADATA SYNCED
                    </span>
                    <span className="font-label-mono text-label-mono text-outline">1080p60 • Stereo</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface truncate font-medium mt-0.5">
                    Autonomous Media Agents & Continuous Viral Repurposing
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="font-readout-num text-[11px] text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-outline">timer</span>
                      134 detected scene cuts
                    </span>
                    <span className="font-readout-num text-[11px] text-tertiary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">magic_button</span>
                      ~14 viral candidate moments
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-space-sm mt-space-sm border-t border-white/5">
              <span className="font-label-mono text-label-mono text-outline">
                Instant Ingest Engine v3.2 active
              </span>
              <span className="font-label-mono text-label-mono text-secondary">Bandwidth: 10 Gbps</span>
            </div>
          </div>

          {/* Right: Direct Raw Master Upload (5 cols) */}
          <div className="lg:col-span-5 bg-surface-container rounded-xl p-space-md flex flex-col justify-between border border-white/5 shadow-md">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">cloud_upload</span>
                  <span className="font-label-pill text-label-pill text-on-surface uppercase tracking-wide font-semibold">
                    Upload Raw Video (MP4 / MOV)
                  </span>
                </div>
                <span className="font-label-mono text-[10px] text-outline">Up to 8GB 4K</span>
              </div>

              {/* Drag and Drop Dropzone */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="video/*"
                className="hidden"
              />
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`group cursor-pointer bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg flex flex-col items-center justify-center text-center transition-all border border-dashed ${
                  dragActive
                    ? 'border-secondary bg-surface-container-high'
                    : 'border-white/10 hover:border-primary/50 hover:bg-surface-container-high'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-2">
                  <span className="material-symbols-outlined text-[26px]">upload_file</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface font-medium">
                  Drag master file here or <span className="text-primary hover:underline font-bold">browse</span>
                </p>
                <p className="font-body-sm text-body-sm text-outline mt-1 text-xs">
                  Supports MP4, MOV, MKV, WebM. Auto face & voice demuxing.
                </p>
              </div>
            </div>

            {/* Multi-Audio Channel Selector */}
            <div className="mt-space-md pt-space-xs border-t border-white/5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-label-mono text-[10px] text-outline uppercase">
                  Speaker Channel Detection
                </span>
                <span className="font-label-mono text-[10px] text-secondary">
                  Auto Voice Isolation On
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAudioTrack('host')}
                  className={`font-label-pill text-label-pill py-1 px-2 rounded flex items-center justify-center gap-1 transition-colors ${
                    audioTrack === 'host'
                      ? 'bg-surface-bright text-on-surface border border-secondary/40'
                      : 'bg-surface-container-highest text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[13px] text-tertiary">check_circle</span>
                  Ch 1: Host
                </button>
                <button
                  type="button"
                  onClick={() => setAudioTrack('guest')}
                  className={`font-label-pill text-label-pill py-1 px-2 rounded flex items-center justify-center gap-1 transition-colors ${
                    audioTrack === 'guest'
                      ? 'bg-surface-bright text-on-surface border border-secondary/40'
                      : 'bg-surface-container-highest text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[13px] text-tertiary">check_circle</span>
                  Ch 2: Guest
                </button>
                <button
                  type="button"
                  onClick={() => setAudioTrack('both')}
                  className={`font-label-pill text-label-pill py-1 px-2 rounded flex items-center justify-center gap-1 transition-colors ${
                    audioTrack === 'both'
                      ? 'bg-surface-bright text-on-surface border border-secondary/40'
                      : 'bg-surface-container-highest text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[13px] text-secondary">group</span>
                  Both
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline Configuration Bar & Compute Fire Trigger */}
        <div className="bg-surface-container-highest/60 rounded-xl p-space-md flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-space-md border border-white/5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md flex-1">
            {/* Parameter 1: Engine Choice */}
            <div className="flex flex-col">
              <span className="font-label-mono text-[10px] text-outline uppercase mb-1">
                Inference Engine
              </span>
              <div className="relative">
                <select
                  value={inferenceEngine}
                  onChange={(e) => setInferenceEngine(e.target.value)}
                  className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg appearance-none focus:outline-none border border-white/5 cursor-pointer"
                >
                  <option value="ultra">ClipFlow NeuralHook v3.2 Ultra (Max Retention)</option>
                  <option value="fast">ClipFlow FastCut v2.8 (High Throughput)</option>
                  <option value="punch">ClipFlow Punchline v1.9 (Comedy & Banter)</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-outline pointer-events-none text-[16px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Parameter 2: Duration Preference */}
            <div className="flex flex-col">
              <span className="font-label-mono text-[10px] text-outline uppercase mb-1">
                Clip Target Length
              </span>
              <div className="relative">
                <select
                  value={durationPref}
                  onChange={(e) => setDurationPref(e.target.value)}
                  className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg appearance-none focus:outline-none border border-white/5 cursor-pointer"
                >
                  <option value="30-60">30 – 60s (Recommended for Reels & Shorts)</option>
                  <option value="15-30">15 – 30s (Ultra-Fast TikTok Cadence)</option>
                  <option value="60-90">60 – 90s (In-Depth Thought Leadership)</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-outline pointer-events-none text-[16px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Parameter 3: Auto-Reframe Mode */}
            <div className="flex flex-col">
              <span className="font-label-mono text-[10px] text-outline uppercase mb-1">
                AI 9:16 Reframe Mode
              </span>
              <div className="relative">
                <select
                  value={reframeMode}
                  onChange={(e) => setReframeMode(e.target.value)}
                  className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg appearance-none focus:outline-none border border-white/5 cursor-pointer"
                >
                  <option value="dual-cam">Active Speaker Dual-Cam (Heavy Tripod)</option>
                  <option value="single">Single Subject Face Tracking</option>
                  <option value="blurred">Blurred Canvas Background</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-outline pointer-events-none text-[16px]">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Ignite Button */}
          <div className="flex items-center gap-space-sm xl:self-end">
            <button
              type="button"
              onClick={handleStartExtraction}
              className="w-full xl:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-primary-container via-inverse-primary to-secondary-container text-on-primary font-headline-md text-headline-md font-bold shadow-[0_0_20px_rgba(124,58,237,0.45)] hover:shadow-[0_0_28px_rgba(76,215,246,0.6)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">bolt</span>
              <span>Ignite Neural Extraction</span>
              <span className="px-2 py-0.5 rounded-full bg-black/30 font-label-mono text-label-mono text-on-primary">
                5 CREDITS
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* RECENT EXTRACTION JOBS / LIBRARY HIGHLIGHTS */}
      <section className="relative z-10">
        <div className="flex items-center justify-between mb-space-md">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">video_library</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Recent Ingestion Projects
            </h2>
          </div>
          <span className="font-label-mono text-label-mono text-outline">
            {projects?.length || 3} Active Repositories
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-md">
          {projects && projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-surface-container-low rounded-xl overflow-hidden border border-white/5 hover:border-primary/40 transition-all p-space-sm flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface-container-highest mb-space-sm">
                  <img
                    src={proj.thumbnail || "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80"}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-tertiary font-label-mono text-[10px] font-bold border border-tertiary/40">
                      {proj.virality || 94} VIRAL
                    </span>
                  </div>
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 font-label-mono text-[10px] text-white">
                    {proj.duration || '01:24:12'}
                  </span>
                </div>

                <h3 className="font-headline-md text-body-lg text-on-surface font-semibold truncate group-hover:text-primary transition-colors">
                  {proj.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                  {proj.description || 'Full podcast analysis with speaker tracking and viral moment detection.'}
                </p>

                <div className="flex items-center gap-3 mt-3 text-xs text-outline font-label-mono">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">movie_filter</span>
                    {proj.clipsCount || 10} viral shorts ready
                  </span>
                  <span>•</span>
                  <span>{proj.date || 'Today'}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onOpenProjectInStudio(proj)}
                  className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-primary-container text-on-surface hover:text-on-primary font-label-pill text-label-pill font-medium transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">movie_edit</span>
                  Open in Studio
                </button>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
                    title="Download All Clips"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
                    title="Share Project"
                  >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
