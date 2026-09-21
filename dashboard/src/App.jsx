import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OverviewView from './components/OverviewView';
import StudioEditorView from './components/StudioEditorView';
import BillingView from './components/BillingView';
import ProjectsLibraryView from './components/ProjectsLibraryView';
import SettingsView from './components/SettingsView';
import AdminConsoleView from './components/AdminConsoleView';
import AdminAuth from './components/AdminAuth';
import Auth from './components/Auth.jsx';
import Landing from './Landing.jsx';
import { getApiUrl } from './config';

// ─── Simple XOR encryption for localStorage ───────────────────────────────────
const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'ClipFlow-Static-Salt';
const ENC_PREFIX = 'ENC:';
const encrypt = (text) => {
  if (!text) return '';
  try {
    const xor = text.split('').map((c, i) =>
      String.fromCharCode(c.charCodeAt(0) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length))
    ).join('');
    return ENC_PREFIX + btoa(xor);
  } catch { return text; }
};
const decrypt = (text) => {
  if (!text || !text.startsWith(ENC_PREFIX)) return text || '';
  try {
    const raw = atob(text.slice(ENC_PREFIX.length));
    return raw.split('').map((c, i) =>
      String.fromCharCode(c.charCodeAt(0) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length))
    ).join('');
  } catch { return ''; }
};

// ─── Demo data ──────────────────────────────────────────────────────────────
const DEMO_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Lex Fridman & Sam Altman — Scaling Laws & Superintelligence',
    description: 'Deep-dive podcast on AI consciousness, autonomous media agents, and the future of content velocity.',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80',
    duration: '02:14:50',
    virality: 96,
    clipsCount: 14,
    date: 'Today',
  },
  {
    id: 'proj-2',
    title: 'Andrew Huberman — Master Your Sleep & Optimize Your Energy',
    description: 'Neuroscience of peak performance, circadian rhythms, and the science of viral health content.',
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&auto=format&fit=crop&q=80',
    duration: '01:48:22',
    virality: 91,
    clipsCount: 11,
    date: 'Yesterday',
  },
  {
    id: 'proj-3',
    title: 'All-In Podcast Ep. 180 — Venture Capital & AI Product Growth',
    description: 'Candid analysis of AI product market fit, content flywheels, and distribution at scale.',
    thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&auto=format&fit=crop&q=80',
    duration: '01:22:10',
    virality: 88,
    clipsCount: 9,
    date: '2 days ago',
  },
];

const DEMO_CLIPS = [
  { id: 'c1', title: 'The AI That Replaced 5 Studios Overnight', reason: 'Explosive hook with contrarian opener — high CTR signal detected.', timecode: '00:04 – 00:49', duration: 45, virality: 98, hook: 'THIS CHANGED THE ENTIRE INDUSTRY', thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&auto=format&fit=crop&q=80' },
  { id: 'c2', title: 'Nobody Is Talking About This Content Strategy', reason: 'Curiosity gap headline creates scrolling pause — peak viral retention curve.', timecode: '02:14 – 03:02', duration: 48, virality: 95, hook: 'NO ONE TALKS ABOUT THIS', thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&auto=format&fit=crop&q=80' },
  { id: 'c3', title: 'Why Every Creator Should Use AI Clipping Now', reason: 'Direct audience address with urgency trigger — tested for watch completion.', timecode: '05:30 – 06:18', duration: 48, virality: 94, hook: 'DO THIS NOW OR STAY BROKE', thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&auto=format&fit=crop&q=80' },
  { id: 'c4', title: 'The Secret Podcast Formula Going Viral in 2026', reason: 'Mystery + trend signaling — optimal shareability score for discovery algo.', timecode: '08:44 – 09:29', duration: 45, virality: 91, hook: 'THE FORMULA NO ONE SHARES', thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&auto=format&fit=crop&q=80' },
  { id: 'c5', title: 'I Built An Autonomous Content Engine in 48 Hours', reason: 'Story-driven opener with aspirational outcome — strong sub-30sec retention.', timecode: '12:05 – 12:55', duration: 50, virality: 89, hook: '48 HOURS CHANGED EVERYTHING', thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&auto=format&fit=crop&q=80' },
  { id: 'c6', title: 'The Attention Economy Just Fundamentally Shifted', reason: 'Trend moment framing with cultural urgency — high share-trigger probability.', timecode: '18:32 – 19:14', duration: 42, virality: 86, hook: 'ATTENTION IS THE NEW CURRENCY', thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&auto=format&fit=crop&q=80' },
];

export default function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('cf_is_admin') === 'true';
  });

  // Check URL parameters for dedicated admin entry (e.g. ?admin=true)
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const isDirectAdmin = window.location.search.includes('admin') || window.location.pathname.startsWith('/admin') || window.location.hash.includes('admin');
      if (isDirectAdmin) {
        return localStorage.getItem('cf_is_admin') === 'true' ? 'admin-console' : 'admin-auth';
      }
    }
    return 'auth';
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [credits, setCredits] = useState(45);
  const [user] = useState({ name: 'Alex Rivera', plan: 'Pro Plan', email: 'alex@clipflow.ai' });

  // Projects + Clips state
  const [projects, setProjects] = useState(DEMO_PROJECTS);
  const [clips] = useState(DEMO_CLIPS);
  const [activeProject, setActiveProject] = useState(null);
  const [activeClip, setActiveClip] = useState(DEMO_CLIPS[0]);

  // Active processing job state
  const [activeJob, setActiveJob] = useState(null);

  // Master API Keys (Admin only)
  const [masterKeys, setMasterKeys] = useState(() => ({
    gemini: decrypt(localStorage.getItem('cf_admin_gemini') || ''),
    eleven: decrypt(localStorage.getItem('cf_admin_eleven') || ''),
    fal: decrypt(localStorage.getItem('cf_admin_fal') || ''),
    s3Bucket: decrypt(localStorage.getItem('cf_admin_s3_bucket') || 'clipflow-production-renders'),
    s3Region: decrypt(localStorage.getItem('cf_admin_s3_region') || 'us-east-1'),
    uploadPost: decrypt(localStorage.getItem('cf_admin_uploadpost') || ''),
  }));

  // Creator Workspace Settings
  const [userSettings, setUserSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('cf_user_settings');
      return saved ? JSON.parse(saved) : {
        name: 'Alex Rivera',
        email: 'alex@clipflow.ai',
        defaultRatio: '9:16',
        captionPreset: 'hormozi',
        webhookUrl: 'https://api.mybrand.com/webhooks/clipflow',
        apiKey: 'cf_live_99a82e71bb30f81c4',
      };
    } catch {
      return {
        name: 'Alex Rivera',
        email: 'alex@clipflow.ai',
        defaultRatio: '9:16',
        captionPreset: 'hormozi',
        webhookUrl: 'https://api.mybrand.com/webhooks/clipflow',
        apiKey: 'cf_live_99a82e71bb30f81c4',
      };
    }
  });

  // Simulate job polling when a job is active
  useEffect(() => {
    if (!activeJob) return;
    let progress = activeJob.progress || 10;
    const timer = setInterval(() => {
      progress = Math.min(progress + Math.random() * 8, 100);
      const eta = Math.max(0, Math.round(((100 - progress) / 8)));
      setActiveJob((prev) => prev ? { ...prev, progress: Math.round(progress), eta: `${eta}s` } : null);
      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setActiveJob(null);
          // Add new dummy project
          setProjects((prev) => [
            {
              id: `proj-${Date.now()}`,
              title: activeJob.title || 'Newly Processed Video',
              description: 'AI-extracted viral clips ready in your studio.',
              thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80',
              duration: '01:00:00',
              virality: Math.floor(Math.random() * 10 + 88),
              clipsCount: Math.floor(Math.random() * 8 + 6),
              date: 'Just now',
            },
            ...prev,
          ]);
          setActiveTab('studio-editor');
        }, 1500);
      }
    }, 1200);
    return () => clearInterval(timer);
  }, [activeJob?.id]);

  const handleStartJob = ({ type, url, filename, engine, cost }) => {
    const requiredCost = cost || 5;
    if (credits < requiredCost) {
      alert(`Insufficient credits. You need ${requiredCost} credits. Please top up.`);
      setActiveTab('billing-and-compute-credits');
      return;
    }
    setCredits((prev) => prev - requiredCost);
    const jobId = `JOB-${Math.floor(Math.random() * 9000 + 1000)}-AI`;
    setActiveJob({
      id: jobId,
      title: filename || (url && url.includes('v=') ? url.split('v=')[1] : 'YouTube Ingest Video'),
      progress: 0,
      eta: '90s',
      step: 'Step 1/4: Downloading & Transcribing Audio...',
      type,
      url,
      engine,
    });
  };

  const handleCancelJob = () => {
    setActiveJob(null);
  };

  const handleSaveMasterKeys = (newKeys) => {
    setMasterKeys(newKeys);
    localStorage.setItem('cf_admin_gemini', encrypt(newKeys.gemini));
    localStorage.setItem('cf_admin_eleven', encrypt(newKeys.eleven));
    localStorage.setItem('cf_admin_fal', encrypt(newKeys.fal));
    localStorage.setItem('cf_admin_s3_bucket', encrypt(newKeys.s3Bucket));
    localStorage.setItem('cf_admin_s3_region', encrypt(newKeys.s3Region));
    localStorage.setItem('cf_admin_uploadpost', encrypt(newKeys.uploadPost));
  };

  const handleSaveUserSettings = (newSettings) => {
    setUserSettings(newSettings);
    localStorage.setItem('cf_user_settings', JSON.stringify(newSettings));
  };

  const handleDeleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleOpenProjectInStudio = (proj) => {
    setActiveProject(proj);
    setActiveClip(clips[0]);
    setActiveTab('studio-editor');
  };

  const handleExportClip = (clip) => {
    if (!clip) return;
    alert(`✅ Exporting "${clip.title}" as 1080p MP4 — added to download queue.`);
  };

  const handleBurnSubtitles = (clip) => {
    if (!clip) return;
    alert(`🎬 Burning animated captions into "${clip.title}"...`);
  };

  const handleDubbing = (clip) => {
    if (!clip) return;
    alert(`🎙️ AI voice dubbing queued for "${clip.title}" via ClipFlow Multi-Language Engine.`);
  };

  const handleSocialPost = (clip) => {
    if (!clip) return;
    alert(`📲 Queued "${clip.title}" for TikTok, Instagram Reels & YouTube Shorts syndication.`);
  };

  const handleAddCredits = (amount) => {
    setCredits((prev) => prev + amount);
  };

  const handleOpenBilling = () => setActiveTab('billing-and-compute-credits');
  const handleOpenAuth = () => setActiveTab('settings');
  const handleOpenLogs = () => alert('Live job logs would appear here in production.');
  const handleToggleLanding = () => setActiveTab((prev) => (prev === 'landing' ? 'overview' : 'landing'));

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    localStorage.setItem('cf_is_admin', 'true');
    setActiveTab('admin-console');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('cf_is_admin');
    setActiveTab('auth');
  };

  const renderView = () => {
    // Isolated Admin Auth portal
    if (activeTab === 'admin-auth') {
      return (
        <AdminAuth
          onAdminLogin={handleAdminLoginSuccess}
          onBackToUserApp={() => setActiveTab('auth')}
        />
      );
    }

    // Public Creator Auth and Marketing Landing pages render full-screen
    if (activeTab === 'auth') {
      return <Auth onSignIn={() => setActiveTab('overview')} />;
    }
    if (activeTab === 'landing') {
      return <Landing onLaunchApp={() => setActiveTab('overview')} />;
    }

    // All other views use the standard sidebar + header layout
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewView
            onStartJob={handleStartJob}
            activeJob={activeJob}
            onCancelJob={handleCancelJob}
            projects={projects}
            onOpenProjectInStudio={handleOpenProjectInStudio}
            credits={credits}
            onOpenBilling={handleOpenBilling}
            onOpenLogs={handleOpenLogs}
          />
        );
      case 'studio-editor':
        return (
          <StudioEditorView
            project={activeProject || projects[0]}
            clips={clips}
            activeClip={activeClip}
            setActiveClip={setActiveClip}
            onExportClip={handleExportClip}
            onBurnSubtitles={handleBurnSubtitles}
            onDubbing={handleDubbing}
            onSocialPost={handleSocialPost}
          />
        );
      case 'projects-and-library':
        return (
          <ProjectsLibraryView
            projects={projects}
            onOpenProject={handleOpenProjectInStudio}
            onDeleteProject={handleDeleteProject}
          />
        );
      case 'billing-and-compute-credits':
        return (
          <BillingView
            credits={credits}
            onAddCredits={handleAddCredits}
            user={user}
          />
        );
      case 'admin-console':
        if (!isAdminAuthenticated) {
          return (
            <AdminAuth
              onAdminLogin={handleAdminLoginSuccess}
              onBackToUserApp={() => setActiveTab('overview')}
            />
          );
        }
        return (
          <AdminConsoleView
            masterKeys={masterKeys}
            setMasterKeys={setMasterKeys}
            onSaveMasterKeys={handleSaveMasterKeys}
          />
        );
      case 'api-and-integrations':
      case 'settings':
        return (
          <SettingsView
            userSettings={userSettings}
            setUserSettings={setUserSettings}
            onSaveSettings={handleSaveUserSettings}
          />
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 text-on-surface-variant">
            <span className="material-symbols-outlined text-[48px] text-outline mb-4">construction</span>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
              Coming Soon
            </h2>
            <p className="font-body-sm text-sm mt-1">This view is under active construction.</p>
          </div>
        );
    }
  };

  // Full-screen pages without workspace shell
  if (activeTab === 'auth' || activeTab === 'landing' || activeTab === 'admin-auth') {
    return renderView();
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
        isAdmin={isAdminAuthenticated}
        onAdminLogout={handleAdminLogout}
      />

      {/* Main content area pushed right on desktop */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <Header
          credits={credits}
          user={user}
          onOpenBilling={handleOpenBilling}
          onOpenAuth={handleOpenAuth}
          onToggleLanding={handleToggleLanding}
          isLanding={activeTab === 'landing'}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Page Content */}
        <main className="flex-1 pt-16">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
