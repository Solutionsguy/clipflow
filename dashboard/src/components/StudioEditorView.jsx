import React, { useState, useRef, useEffect } from 'react';

export default function StudioEditorView({
  project,
  clips,
  activeClip,
  setActiveClip,
  onExportClip,
  onBurnSubtitles,
  onDubbing,
  onSocialPost,
}) {
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [showFaceTrack, setShowFaceTrack] = useState(true);
  const [captionStyle, setCaptionStyle] = useState('hormozi');
  const [showHookText, setShowHookText] = useState(true);
  const [hookText, setHookText] = useState('THIS WILL CHANGE EVERYTHING IN 2026');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(48);
  const [reframeMode, setReframeMode] = useState('Active Speaker Dual-Cam');
  const [filterMinScore, setFilterMinScore] = useState(0);
  const videoRef = useRef(null);

  // When activeClip changes, update duration and hook
  useEffect(() => {
    if (activeClip) {
      if (activeClip.hook) setHookText(activeClip.hook.toUpperCase());
      if (activeClip.duration) setDuration(activeClip.duration);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        setCurrentTime(0);
      }
    }
  }, [activeClip]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (e) => {
    const target = parseFloat(e.target.value);
    setCurrentTime(target);
    if (videoRef.current) {
      videoRef.current.currentTime = target;
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Filter clips
  const filteredClips = clips.filter((c) => (c.virality || 85) >= filterMinScore);

  return (
    <div className="relative w-full px-space-md lg:px-space-lg py-space-md">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-container/10 blur-[130px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/10 blur-[120px] pointer-events-none rounded-full"></div>

      {/* Workspace Header Context Bar */}
      <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-md bg-surface-container-low/90 backdrop-blur-md px-space-md py-space-sm rounded-xl border border-white/5 shadow-md">
        <div className="flex items-center gap-space-md min-w-0">
          <div className="flex items-center gap-space-xs">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_10px_rgba(78,222,163,0.8)] animate-pulse"></span>
            <span className="font-label-mono text-label-mono text-tertiary uppercase tracking-wider font-semibold">
              AI Pipeline Active
            </span>
          </div>
          <div className="h-3.5 w-px bg-surface-container-highest"></div>
          <div className="flex items-center gap-2 truncate">
            <span className="material-symbols-outlined text-outline text-[18px]">podcasts</span>
            <span className="font-headline-md text-headline-md text-on-surface truncate font-semibold">
              {project?.title || 'Lex_Fridman_Ep418_SamAltman_FullMaster.mp4'}
            </span>
          </div>
          <span className="font-label-pill text-[10px] bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded border border-white/5">
            {project?.duration || '02:14:50 Raw'}
          </span>
        </div>

        <div className="flex items-center gap-space-sm">
          <div className="flex items-center bg-surface-container-highest/80 px-space-sm py-1 rounded-lg gap-2 border border-white/5">
            <span className="font-label-mono text-[10px] text-outline uppercase">AUTO-REFRAME:</span>
            <span className="font-label-pill text-label-pill text-secondary font-semibold">
              {reframeMode}
            </span>
          </div>
          <button
            onClick={() => setShowFaceTrack(!showFaceTrack)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-body-sm text-xs transition-all ${
              showFaceTrack
                ? 'bg-secondary/15 border-secondary/40 text-secondary'
                : 'bg-surface-container-high border-white/5 text-on-surface-variant'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">tune</span>
            <span>Face Track:</span>
            <span className="font-readout-num font-bold">99.4%</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Split Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md lg:gap-space-lg items-start">
        {/* LEFT COLUMN: 9:16 Video Player Stage & Styling Deck (7 Cols Desktop) */}
        <div className="xl:col-span-7 flex flex-col gap-space-md">
          {/* Player Glass Stage */}
          <div className="relative bg-surface-container-lowest rounded-2xl p-space-md flex flex-col items-center justify-center shadow-2xl border border-white/5 overflow-hidden">
            {/* Top Floating Canvas Toolbar */}
            <div className="w-full flex items-center justify-between pb-space-sm z-20">
              <div className="flex items-center gap-1 bg-surface-container-high/90 backdrop-blur-md p-1 rounded-lg border border-white/5">
                {['9:16', '1:1', '4:5', '16:9'].map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`px-2.5 py-1 rounded font-label-mono text-[11px] font-semibold transition-all ${
                      aspectRatio === ratio
                        ? 'bg-primary-container text-on-primary-container shadow-[0_0_12px_rgba(124,58,237,0.4)]'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                    }`}
                    type="button"
                  >
                    {ratio} {ratio === '9:16' ? 'REEL' : ratio === '1:1' ? 'SQUARE' : ratio === '4:5' ? 'FEED' : 'FULL'}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="font-label-mono text-[10px] text-tertiary bg-tertiary-container/30 border border-tertiary/40 px-2 py-0.5 rounded font-bold">
                  {activeClip?.virality || 98} VIRAL SCORE
                </span>
              </div>
            </div>

            {/* Viewport Frame with Aspect Ratio Controls */}
            <div
              className={`relative bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-300 flex items-center justify-center ${
                aspectRatio === '9:16'
                  ? 'w-full max-w-[340px] aspect-[9/16]'
                  : aspectRatio === '1:1'
                  ? 'w-full max-w-[420px] aspect-square'
                  : aspectRatio === '4:5'
                  ? 'w-full max-w-[380px] aspect-[4/5]'
                  : 'w-full max-w-[560px] aspect-video'
              }`}
            >
              {/* Video Element */}
              <video
                ref={videoRef}
                src={activeClip?.videoUrl || "/demo.mp4"}
                className="w-full h-full object-cover"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => {
                  if (videoRef.current) setDuration(videoRef.current.duration);
                }}
                loop
                playsInline
              />

              {/* Hook Text Overlay Preview */}
              {showHookText && hookText && (
                <div className="absolute top-6 inset-x-3 z-30 pointer-events-none flex justify-center">
                  <div className="bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/20 shadow-2xl max-w-[90%] text-center">
                    <span className="font-headline-xl text-yellow-300 font-extrabold tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] text-xs sm:text-sm uppercase leading-tight block">
                      {hookText}
                    </span>
                  </div>
                </div>
              )}

              {/* Dynamic Face Tracking Laser Bounding Box Overlay */}
              {showFaceTrack && (
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-44 h-48 rounded-xl pointer-events-none border-2 border-secondary/70 shadow-[0_0_20px_rgba(76,215,246,0.4)] flex flex-col justify-between p-1.5 transition-all z-20">
                  <div className="flex justify-between items-center">
                    <span className="w-2.5 h-2.5 border-t-2 border-l-2 border-secondary"></span>
                    <span className="font-label-mono text-[8px] bg-black/80 px-1 rounded text-secondary font-bold">
                      ACTIVE SPEAKER
                    </span>
                    <span className="w-2.5 h-2.5 border-t-2 border-r-2 border-secondary"></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="w-2.5 h-2.5 border-b-2 border-l-2 border-secondary"></span>
                    <span className="w-2.5 h-2.5 border-b-2 border-r-2 border-secondary"></span>
                  </div>
                </div>
              )}

              {/* Subtitles Overlay Preview (Karaoke Style) */}
              <div className="absolute bottom-12 inset-x-4 z-30 pointer-events-none flex justify-center text-center">
                {captionStyle === 'hormozi' && (
                  <div className="bg-black/80 px-3 py-1 rounded-lg border border-yellow-400/40">
                    <span className="font-headline-xl font-extrabold text-white text-base tracking-wide uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                      BUILDING <span className="text-yellow-400 font-extrabold underline decoration-yellow-400 decoration-2">AUTONOMOUS</span> MEDIA
                    </span>
                  </div>
                )}
                {captionStyle === 'beast' && (
                  <div className="bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                    <span className="font-headline-xl font-extrabold text-white text-base uppercase">
                      THIS CHANGES <span className="text-cyan-400">EVERYTHING</span>
                    </span>
                  </div>
                )}
                {captionStyle === 'minimal' && (
                  <span className="font-body-md font-medium text-white text-sm bg-black/60 px-3 py-1 rounded backdrop-blur-sm">
                    Autonomous media systems operating at scale
                  </span>
                )}
                {captionStyle === 'clean' && (
                  <span className="font-headline-md font-bold text-white text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                    Autonomous media systems
                  </span>
                )}
              </div>

              {/* Center Play/Pause button on hover */}
              <button
                type="button"
                onClick={togglePlay}
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-primary/90 text-on-primary flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.6)] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </div>
              </button>
            </div>

            {/* Timeline Scrubber */}
            <div className="w-full mt-space-sm pt-space-xs z-20">
              <div className="flex items-center justify-between font-label-mono text-xs text-outline mb-1">
                <span>{formatTime(currentTime)}</span>
                <span className="text-secondary font-semibold">Clip Segment: {formatTime(duration)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-secondary focus:outline-none"
              />
            </div>
          </div>

          {/* Styling Deck: Subtitle & Hook Controls */}
          <div className="bg-surface-container-low rounded-xl p-space-md border border-white/5 space-y-space-md shadow-xl">
            {/* Subtitle Style Presets */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[18px]">subtitles</span>
                  <span className="font-label-pill text-label-pill text-on-surface font-semibold uppercase">
                    Animated Subtitles Preset
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onBurnSubtitles(activeClip)}
                  className="font-label-mono text-[10px] text-primary hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[13px]">tune</span>
                  Burn Captions
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'hormozi', label: 'Hormozi Yellow', color: 'border-yellow-400 text-yellow-300' },
                  { id: 'beast', label: 'MrBeast Cyan', color: 'border-cyan-400 text-cyan-300' },
                  { id: 'minimal', label: 'Devon Minimal', color: 'border-white/30 text-white' },
                  { id: 'clean', label: 'Clean White', color: 'border-primary/40 text-primary' },
                ].map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setCaptionStyle(preset.id)}
                    className={`py-2 px-2.5 rounded-lg border text-center font-label-pill text-xs font-semibold transition-all ${
                      captionStyle === preset.id
                        ? 'bg-surface-container-high border-secondary text-on-surface shadow-[0_0_12px_rgba(76,215,246,0.3)]'
                        : 'bg-surface-container-lowest border-white/5 text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hook Text Overlay Controller */}
            <div className="pt-2 border-t border-white/5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">text_fields</span>
                  <span className="font-label-pill text-label-pill text-on-surface font-semibold uppercase">
                    Viral Hook Text Banner
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowHookText(!showHookText)}
                  className={`font-label-mono text-[10px] px-2 py-0.5 rounded border transition-colors ${
                    showHookText
                      ? 'bg-primary/20 border-primary/40 text-primary'
                      : 'bg-surface-container border-white/5 text-outline'
                  }`}
                >
                  {showHookText ? 'HOOK ENABLED' : 'HOOK DISABLED'}
                </button>
              </div>

              <input
                type="text"
                value={hookText}
                onChange={(e) => setHookText(e.target.value)}
                placeholder="Enter attention-grabbing hook text..."
                className="w-full bg-surface-container-lowest text-on-surface font-headline-md text-sm px-3.5 py-2.5 rounded-lg border border-white/5 focus:outline-none focus:border-primary/50 transition-all font-bold"
              />
            </div>

            {/* Action Bar (Export, Dub, Syndication) */}
            <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onExportClip(activeClip)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-container to-secondary-container text-white font-label-pill text-xs font-bold shadow-md hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  Export 1080p MP4
                </button>
                <button
                  type="button"
                  onClick={() => onDubbing(activeClip)}
                  className="px-3 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-pill text-xs font-semibold border border-white/5 transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">translate</span>
                  AI Voice Dub
                </button>
              </div>

              <button
                type="button"
                onClick={() => onSocialPost(activeClip)}
                className="px-3.5 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-pill text-xs font-semibold border border-white/5 transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px] text-tertiary">share</span>
                Publish to TikTok & Reels
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Extracted Clips Drawer (5 Cols Desktop) */}
        <div className="xl:col-span-5 flex flex-col gap-space-md">
          <div className="bg-surface-container-low rounded-xl p-space-md border border-white/5 shadow-xl">
            <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">content_cut</span>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Extracted Viral Shorts
                </h2>
                <span className="font-label-mono text-[11px] bg-surface-container-high px-2 py-0.5 rounded text-on-surface-variant">
                  {clips.length}
                </span>
              </div>

              {/* Filter pills */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setFilterMinScore(0)}
                  className={`font-label-mono text-[10px] px-2 py-0.5 rounded transition-colors ${
                    filterMinScore === 0 ? 'bg-primary-container text-white' : 'bg-surface-container text-outline'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMinScore(90)}
                  className={`font-label-mono text-[10px] px-2 py-0.5 rounded transition-colors ${
                    filterMinScore === 90 ? 'bg-tertiary-container text-tertiary font-bold' : 'bg-surface-container text-outline'
                  }`}
                >
                  90+ Viral
                </button>
              </div>
            </div>

            {/* Clips List */}
            <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
              {filteredClips.map((clip, index) => {
                const isSelected = activeClip?.id === clip.id;
                const score = clip.virality || 88;
                return (
                  <div
                    key={clip.id || index}
                    onClick={() => setActiveClip(clip)}
                    className={`p-space-sm rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-surface-container-high border-secondary shadow-[0_0_18px_rgba(76,215,246,0.25)]'
                        : 'bg-surface-container hover:bg-surface-container-high border-white/5'
                    }`}
                  >
                    <div className="flex items-start gap-space-sm">
                      {/* Thumbnail with Play Icon */}
                      <div className="relative w-20 h-28 rounded-lg overflow-hidden shrink-0 bg-surface-container-highest">
                        <img
                          src={clip.thumbnail || "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&auto=format&fit=crop&q=80"}
                          alt={clip.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-[20px]">
                            {isSelected && isPlaying ? 'pause_circle' : 'play_circle'}
                          </span>
                        </div>
                        <span className="absolute bottom-1 right-1 font-label-mono text-[8px] bg-black/90 px-1 rounded text-white">
                          {clip.duration ? `${clip.duration}s` : '00:45'}
                        </span>
                      </div>

                      {/* Clip Info */}
                      <div className="min-w-0 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span
                              className={`font-label-mono text-[9px] px-2 py-0.5 rounded font-extrabold uppercase border ${
                                score >= 90
                                  ? 'bg-tertiary-container/40 text-tertiary border-tertiary/40'
                                  : 'bg-primary/20 text-primary border-primary/40'
                              }`}
                            >
                              🔥 {score} VIRAL SCORE
                            </span>
                            <span className="font-label-mono text-[10px] text-outline">
                              #{index + 1}
                            </span>
                          </div>

                          <h3 className="font-headline-md text-sm text-on-surface font-bold line-clamp-1">
                            {clip.title}
                          </h3>
                          <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 mt-1">
                            {clip.reason || clip.hook || 'High retention moment detected by Gemini AI.'}
                          </p>
                        </div>

                        {/* Quick Action bar inside clip card */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                          <span className="font-label-mono text-[10px] text-secondary">
                            {clip.timecode || '01:14 – 01:59'}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onExportClip(clip);
                              }}
                              className="p-1 rounded hover:bg-surface-bright text-outline hover:text-on-surface transition-colors"
                              title="Download MP4"
                            >
                              <span className="material-symbols-outlined text-[15px]">download</span>
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSocialPost(clip);
                              }}
                              className="p-1 rounded hover:bg-surface-bright text-outline hover:text-on-surface transition-colors"
                              title="Syndicate"
                            >
                              <span className="material-symbols-outlined text-[15px]">share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
