import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Globe, FileVideo, Subtitles, Youtube, Instagram, Shield, Github, ArrowRight, Play, Pause, Check, ChevronDown, Monitor, Cpu, Languages, Type, Upload, Scissors, DollarSign, Flame, Layers } from 'lucide-react';

const TikTokIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
  </svg>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="group bg-surface-container-low/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
      <Icon size={24} className="text-primary" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-sm shadow-md shadow-primary/20">
      {number}
    </div>
    <div>
      <h3 className="text-white font-bold mb-1">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const ComparisonRow = ({ feature, clipflow, opusclip, kapwing }) => (
  <tr className="border-b border-white/5">
    <td className="py-3.5 px-4 text-sm font-medium text-zinc-300">{feature}</td>
    <td className="py-3.5 px-4 text-center bg-primary/5 border-x border-primary/10">{clipflow}</td>
    <td className="py-3.5 px-4 text-center text-zinc-400">{opusclip}</td>
    <td className="py-3.5 px-4 text-center text-zinc-400">{kapwing}</td>
  </tr>
);

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border border-white/10 rounded-xl overflow-hidden bg-surface-container-low/40">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors"
    >
      <span className="text-white font-semibold pr-4">{question}</span>
      <ChevronDown size={18} className={`text-zinc-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
    </button>
    {isOpen && (
      <div className="px-6 pb-5 pt-1 border-t border-white/5">
        <p className="faq-answer text-zinc-400 text-sm leading-relaxed">{answer}</p>
      </div>
    )}
  </div>
);

export default function Landing({ onLaunchApp }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(35);
  const [monthlyHours, setMonthlyHours] = useState(25);

  // Animated subtitle words simulation
  const subtitleWords = ['THIS', 'CHANGES', 'THE', 'ENTIRE', 'MEDIA', 'INDUSTRY'];
  const [activeWordIdx, setActiveWordIdx] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setVideoProgress((prev) => (prev >= 100 ? 0 : prev + 2));
      setActiveWordIdx((prev) => (prev + 1) % subtitleWords.length);
    }, 600);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Savings Calculations
  const rawCostClipflow = Math.round(monthlyHours * 60 * 0.03);
  const opusClipCost = Math.round(monthlyHours * 60 * 0.45);
  const savings = opusClipCost - rawCostClipflow;

  const features = [
    {
      icon: Sparkles,
      title: "AI Viral Moment Detection",
      description: "Google Gemini 2.0 / 3.0 Flash analyzes your video transcript and scene boundaries to detect the 3-15 most engaging moments. Each clip is scored for viral potential based on emotional impact and hook strength."
    },
    {
      icon: Scissors,
      title: "Smart 9:16 Vertical Cropping",
      description: "Dual-mode AI reframing: TRACK mode follows active speakers with MediaPipe face detection + YOLOv8 fallback. GENERAL mode creates blurred backgrounds for group shots and landscapes."
    },
    {
      icon: Subtitles,
      title: "Animated Dynamic Subtitles",
      description: "Powered by faster-whisper with word-level timestamps. Subtitles are auto-styled with Hormozi-style bouncing captions, glow effects, and burned directly into 1080p MP4 exports."
    },
    {
      icon: Languages,
      title: "AI Voice Dubbing in 30+ Languages",
      description: "ElevenLabs AI dubbing translates your video audio while preserving the original speaker's voice timbre and emotional cadence for frictionless international distribution."
    },
    {
      icon: Type,
      title: "Hook Text Overlays",
      description: "Add attention-grabbing text overlays with styled fonts. AI-generated hook titles capture viewers in the first 3 seconds — critical for TikTok and Instagram Reels retention."
    },
    {
      icon: Zap,
      title: "Superadmin Compute Resale",
      description: "Direct access to wholesale GPU clusters (H100/A100). Run your own video processing fleet with 91.4% gross profit margin and live node telemetry."
    },
    {
      icon: Upload,
      title: "Local & YouTube Ingestion",
      description: "Drop local high-bitrate files or paste YouTube URLs. Full 4K resolution support with zero cloud compression."
    },
    {
      icon: Shield,
      title: "100% Private & Self-Hostable",
      description: "Deploy with Docker on your local workstation or private cloud. Your content and API keys remain encrypted and strictly under your control."
    },
    {
      icon: Globe,
      title: "Multi-Platform Direct Syndication",
      description: "Post directly to TikTok, Instagram Reels, and YouTube Shorts from the studio dashboard with asynchronous background uploads."
    }
  ];

  const steps = [
    { title: "Upload Long-Form Content", description: "Drop any video file or podcast URL. ClipFlow accepts podcasts, webinars, interviews, and gameplay footage." },
    { title: "Multimodal AI Scoring", description: "Gemini 2.0 Flash pinpoints the top viral segments (15–60s) and generates engagement rationale and high-CTR hooks." },
    { title: "Dual-Mode AI Reframing", description: "Intelligent horizontal-to-vertical conversion with face tracking and stabilized camera panning." },
    { title: "Style Captions & Voice Dubbing", description: "Customize animated karaoke captions, hook overlays, and optionally dub into 30+ languages." },
    { title: "Export 1080p or Direct Publish", description: "Download crisp 1080p 60fps MP4s or syndicate instantly to TikTok, Reels, and YouTube Shorts." }
  ];

  const faqs = [
    {
      question: "What is ClipFlow AI and how does it work?",
      answer: "ClipFlow AI is an autonomous vertical video studio that transforms long videos (podcasts, webinars, interviews, streams) into viral 9:16 clips for TikTok, Instagram Reels, and YouTube Shorts. It uses a high-throughput pipeline: faster-whisper for word-level transcription, PySceneDetect for boundary cuts, and Google Gemini 2.0 Flash for virality ranking."
    },
    {
      question: "How does ClipFlow's Compute Arbitrage model work?",
      answer: "Unlike traditional SaaS clipping tools that charge $0.40–$0.80 per minute, ClipFlow's wholesale compute pipeline costs approximately $0.030 per 60s video (Whisper ASR + Gemini Vision + NVENC encode). This yields over 85–91% profit margins for agencies and creators reselling clipping services."
    },
    {
      question: "Can I self-host ClipFlow on my own machine?",
      answer: "Yes! ClipFlow is built with Docker and Docker Compose. You can run the entire backend and React dashboard locally with zero subscription fees, utilizing your own Gemini, ElevenLabs, and social API keys."
    },
    {
      question: "How does the smart vertical cropping work?",
      answer: "ClipFlow offers dual-mode reframing: TRACK Mode uses MediaPipe face tracking with YOLOv8 fallback and 'Heavy Tripod' stabilization to smoothly follow speakers. GENERAL Mode provides dynamic blurred padding for group discussions and landscape shots."
    },
    {
      question: "What languages are supported for AI Voice Dubbing?",
      answer: "Over 30 languages are supported through ElevenLabs AI integration, including Spanish, French, German, Japanese, Portuguese, Hindi, and Mandarin, while cloning the original speaker's vocal characteristics."
    }
  ];

  const checkIcon = <Check size={16} className="text-emerald-400 mx-auto" />;

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md selection:bg-primary/30 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onLaunchApp}>
            <img src="/clipflow-logo.svg" alt="ClipFlow Logo" className="w-8 h-8 object-contain" />
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-primary via-primary-fixed to-secondary bg-clip-text text-transparent">
                ClipFlow
              </span>
              <span className="text-[9px] font-label-mono text-secondary tracking-widest uppercase -mt-1 font-semibold">
                AI Studio
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400 font-medium">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#demo" className="hover:text-white transition-colors">Interactive Demo</a>
            <a href="#calculator" className="hover:text-white transition-colors">ROI Calculator</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#comparison" className="hover:text-white transition-colors">Comparison</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onLaunchApp}
              className="bg-primary hover:bg-primary/90 text-on-primary px-5 py-2 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] shadow-lg shadow-primary/25 flex items-center gap-1.5"
            >
              <span>Launch Studio</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Interactive 9:16 Mockup */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Value Prop */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-xs text-primary mb-6 w-max font-semibold shadow-sm">
              <Sparkles size={14} />
              <span>Next-Gen Autonomous Video Clipping & Compute Resale</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight text-white">
              Turn 1 Long Video Into <br />
              <span className="bg-gradient-to-r from-primary via-purple-300 to-secondary bg-clip-text text-transparent">
                10 Viral Shorts in 60s
              </span> <br />
              with Autonomous AI
            </h1>

            <p className="text-lg text-zinc-300 max-w-2xl mb-8 leading-relaxed">
              ClipFlow automatically transcribes, isolates viral hooks with <strong className="text-white">Gemini 2.0 Flash</strong>, reframes to 9:16 with face tracking, styles Hormozi captions, and publishes across TikTok, Reels, and Shorts.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onLaunchApp}
                className="flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-on-primary px-8 py-4 rounded-xl font-bold transition-all active:scale-[0.98] shadow-xl shadow-primary/30 text-base"
              >
                Launch ClipFlow Studio
                <ArrowRight size={20} />
              </button>
              <a
                href="#demo"
                className="flex items-center justify-center gap-2 bg-surface-container-high border border-white/10 text-white px-6 py-4 rounded-xl font-semibold transition-all hover:bg-surface-bright text-base"
              >
                <Play size={18} className="text-secondary" />
                View Live Mockup
              </a>
            </div>

            {/* Social Distribution Strip */}
            <div className="flex items-center gap-6 text-zinc-400 text-xs">
              <span className="font-label-mono uppercase tracking-wider text-outline">Auto-Syndicate to:</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-white"><TikTokIcon size={16} /> TikTok</span>
                <span className="flex items-center gap-1.5 text-white"><Instagram size={16} /> Reels</span>
                <span className="flex items-center gap-1.5 text-white"><Youtube size={16} /> Shorts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive 9:16 Video Phone Preview */}
          <div id="demo" className="lg:col-span-5 flex justify-center">
            <div className="relative w-[300px] h-[540px] rounded-[36px] bg-black border-4 border-white/15 shadow-[0_0_50px_-10px_rgba(124,58,237,0.4)] overflow-hidden flex flex-col justify-between p-4 group">
              {/* Fake Background Video/Image */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-zinc-950 to-black z-0">
                <img
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80"
                  alt="Video frame"
                  className="w-full h-full object-cover opacity-70 scale-105 group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Top Bar inside Phone */}
              <div className="relative z-10 flex items-center justify-between pt-2">
                <div className="bg-black/60 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-label-mono text-[10px] text-emerald-400 font-bold uppercase">98 Virality Score</span>
                </div>
                <div className="bg-primary/90 text-white font-label-mono text-[10px] px-2 py-0.5 rounded-full font-semibold">
                  TRACK Mode
                </div>
              </div>

              {/* Hook Text Overlay Preview */}
              <div className="relative z-10 text-center px-2">
                <span className="inline-block bg-yellow-400 text-black font-extrabold text-xs px-3 py-1.5 rounded-md shadow-2xl uppercase tracking-wider transform -rotate-1 animate-pulse">
                  THIS CHANGED THE ENTIRE INDUSTRY
                </span>
              </div>

              {/* Center Animated Karaoke Caption Preview */}
              <div className="relative z-10 text-center my-auto">
                <div className="bg-black/75 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 shadow-lg inline-block">
                  <div className="flex flex-wrap items-center justify-center gap-1 font-black text-sm">
                    {subtitleWords.map((word, i) => (
                      <span
                        key={i}
                        className={`transition-all duration-200 ${
                          i === activeWordIdx
                            ? 'text-yellow-400 scale-125 underline decoration-2'
                            : 'text-white opacity-80'
                        }`}
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Phone Player Controls */}
              <div className="relative z-10 flex flex-col gap-2 pb-1">
                {/* Progress bar */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${videoProgress}%` }}></div>
                </div>

                <div className="flex items-center justify-between text-xs text-white">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                  <span className="font-label-mono text-[11px] text-zinc-300">00:18 / 00:52</span>
                  <span className="font-label-pill text-[10px] text-zinc-300 bg-white/10 px-2 py-0.5 rounded">1080p 60fps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/5 bg-surface-container-low/40">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-extrabold text-white">100%</div>
            <div className="text-xs font-label-mono text-zinc-400 uppercase tracking-wider mt-1">Docker Self-Hostable</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-tertiary">91.4%</div>
            <div className="text-xs font-label-mono text-zinc-400 uppercase tracking-wider mt-1">Resale Margin Potential</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">30+</div>
            <div className="text-xs font-label-mono text-zinc-400 uppercase tracking-wider mt-1">Dubbing Languages</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-secondary">&lt; 40s</div>
            <div className="text-xs font-label-mono text-zinc-400 uppercase tracking-wider mt-1">Average Render Time</div>
          </div>
        </div>
      </section>

      {/* Interactive Compute Arbitrage & Savings Calculator */}
      <section id="calculator" className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-surface-container-low/80 border border-primary/20 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 bg-tertiary-container/30 border border-tertiary/30 px-3 py-1 rounded-full text-xs font-bold text-tertiary mb-3 uppercase tracking-wider">
              <DollarSign size={14} /> Compute Arbitrage Economics
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Calculate Your Monthly Cost Savings</h2>
            <p className="text-zinc-400 text-sm mt-2">See how much you save with ClipFlow compared to legacy cloud platforms ($0.45/min).</p>
          </div>

          {/* Slider Control */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">Monthly Long-Form Video Input:</span>
              <span className="font-readout-num text-lg font-bold text-primary bg-surface-container-high px-4 py-1.5 rounded-xl border border-primary/30">
                {monthlyHours} Hours / Month
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              step="5"
              value={monthlyHours}
              onChange={(e) => setMonthlyHours(parseInt(e.target.value))}
              className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs font-label-mono text-zinc-500">
              <span>5 hrs (Indie Creator)</span>
              <span>50 hrs (Pro Studio)</span>
              <span>150 hrs (High-Volume Agency)</span>
            </div>
          </div>

          {/* Cost Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/5 text-center">
            <div className="bg-surface-container p-4 rounded-2xl border border-white/5">
              <span className="text-xs font-label-mono text-zinc-400 uppercase block">OpusClip / Kapwing Cost</span>
              <span className="text-2xl font-bold text-zinc-300 mt-1 block">${opusClipCost.toLocaleString()}</span>
              <span className="text-[11px] text-zinc-500">At ~$0.45 / minute</span>
            </div>
            <div className="bg-surface-container p-4 rounded-2xl border border-primary/30 relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-primary text-[9px] font-bold px-1.5 py-0.5 rounded text-white">CLIPFLOW</div>
              <span className="text-xs font-label-mono text-primary uppercase block">ClipFlow Wholesale Cost</span>
              <span className="text-2xl font-bold text-primary mt-1 block">${rawCostClipflow.toLocaleString()}</span>
              <span className="text-[11px] text-zinc-400">At ~$0.030 / minute</span>
            </div>
            <div className="bg-tertiary-container/20 p-4 rounded-2xl border border-tertiary/40">
              <span className="text-xs font-label-mono text-tertiary uppercase block font-semibold">Your Net Monthly Savings</span>
              <span className="text-2xl font-extrabold text-tertiary mt-1 block">+${savings.toLocaleString()}</span>
              <span className="text-[11px] text-tertiary font-medium">Over 93% cost reduction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Autonomous Video Pipeline Features</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Engineered from the ground up for high retention, automated syndication, and private infrastructure.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-surface-container-low/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">How ClipFlow Generates Viral Content</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">From raw multi-hour media to formatted shorts in 5 automated steps.</p>
          </div>
          <div className="space-y-8">
            {steps.map((step, i) => (
              <StepCard key={i} number={i + 1} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Why Creators & Agencies Choose ClipFlow</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Compare ClipFlow against standard cloud subscription services.</p>
          </div>
          <div className="overflow-x-auto bg-surface-container-low/60 rounded-2xl border border-white/10 shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs font-label-mono text-zinc-400 uppercase tracking-wider">
                  <th className="py-4 px-4">Feature</th>
                  <th className="py-4 px-4 text-center text-primary font-bold bg-primary/10">ClipFlow AI</th>
                  <th className="py-4 px-4 text-center">Opus Clip</th>
                  <th className="py-4 px-4 text-center">Kapwing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <ComparisonRow feature="Self-Hosted / Private Cloud" clipflow={checkIcon} opusclip={<span className="text-zinc-500 text-sm">No (Cloud only)</span>} kapwing={<span className="text-zinc-500 text-sm">No (Cloud only)</span>} />
                <ComparisonRow feature="AI Multimodal Viral Scorer" clipflow={<span className="text-emerald-400 font-semibold text-sm">Gemini 2.0 Flash</span>} opusclip={<span className="text-zinc-400 text-sm">Proprietary</span>} kapwing={<span className="text-zinc-500 text-sm">Basic</span>} />
                <ComparisonRow feature="Compute Cost Arbitrage Engine" clipflow={checkIcon} opusclip={<span className="text-zinc-500 text-sm">No</span>} kapwing={<span className="text-zinc-500 text-sm">No</span>} />
                <ComparisonRow feature="Voice Dubbing (30+ Languages)" clipflow={checkIcon} opusclip={<span className="text-zinc-500 text-sm">No</span>} kapwing={<span className="text-zinc-500 text-sm">Extra fee</span>} />
                <ComparisonRow feature="Dual-Mode Smart 9:16 Crop" clipflow={checkIcon} opusclip={checkIcon} kapwing={<span className="text-zinc-500 text-sm">Manual</span>} />
                <ComparisonRow feature="Direct Multi-Social Publishing" clipflow={checkIcon} opusclip={checkIcon} kapwing={<span className="text-zinc-500 text-sm">Manual</span>} />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-surface-container-low/30 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-zinc-400">Everything you need to know about ClipFlow AI.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-primary/15 via-surface-container-low to-surface-container-low p-10 lg:p-16 rounded-3xl border border-primary/30 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to Automate Your Video Studio?</h2>
          <p className="text-zinc-300 mb-8 max-w-xl mx-auto text-sm lg:text-base">
            Launch ClipFlow now to test AI viral clipping, animated captions, and compute resale margins.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLaunchApp}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-on-primary px-8 py-4 rounded-xl font-bold transition-all active:scale-[0.98] shadow-xl shadow-primary/30 text-lg"
            >
              Launch ClipFlow Studio
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/clipflow-logo.svg" alt="ClipFlow" className="w-6 h-6 object-contain" />
            <span className="text-sm text-zinc-400">ClipFlow AI — Autonomous Video Clipping & Compute Resale Studio</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#calculator" className="hover:text-white transition-colors">Economics</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
