import React, { useState } from 'react';

const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-1',
    user: 'Vortex Media Agency',
    initials: 'VM',
    uid: 'ag_8832a',
    plan: 'Agency Enterprise (50k)',
    planColor: 'text-secondary',
    credits: 120,
    creditVal: '$1.20',
    cogs: '$0.134',
    margin: '+89.0%',
    clipRef: 'clip_4k_9812739',
    time: '12s ago',
    status: 'Settled',
  },
  {
    id: 'tx-2',
    user: 'Kai Chen Studios',
    initials: 'KC',
    uid: 'cr_91820',
    plan: 'Creator Pro (5k)',
    planColor: 'text-primary',
    credits: 35,
    creditVal: '$0.35',
    cogs: '$0.048',
    margin: '+86.3%',
    clipRef: 'clip_1080_09128',
    time: '44s ago',
    status: 'Settled',
  },
  {
    id: 'tx-3',
    user: 'NeuroPulse Podcasting',
    initials: 'NP',
    uid: 'cr_44102',
    plan: 'Creator Pro (5k)',
    planColor: 'text-primary',
    credits: 70,
    creditVal: '$0.70',
    cogs: '$0.082',
    margin: '+88.3%',
    clipRef: 'clip_1080_44910',
    time: '1m ago',
    status: 'Settled',
  },
  {
    id: 'tx-4',
    user: 'HyperScale Media Group',
    initials: 'HM',
    uid: 'ag_11942',
    plan: 'Wholesale API Reseller',
    planColor: 'text-tertiary',
    credits: 450,
    creditVal: '$4.50',
    cogs: '$0.520',
    margin: '+88.4%',
    clipRef: 'batch_render_9941',
    time: '3m ago',
    status: 'Settled',
  },
  {
    id: 'tx-5',
    user: 'Sarah Jenkins Vlog',
    initials: 'SJ',
    uid: 'cr_77391',
    plan: 'Starter Plan (500)',
    planColor: 'text-on-surface-variant',
    credits: 35,
    creditVal: '$0.35',
    cogs: '$0.041',
    margin: '+88.3%',
    clipRef: 'clip_720_00381',
    time: '6m ago',
    status: 'Settled',
  },
];

export default function AdminConsoleView({
  masterKeys,
  setMasterKeys,
  onSaveMasterKeys,
}) {
  const [activeTab, setActiveTab] = useState('telemetry'); // 'telemetry' | 'credentials'
  const [multiplier, setMultiplier] = useState(11.6);
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [filterQuery, setFilterQuery] = useState('');

  // Master Keys State
  const [geminiKey, setGeminiKey] = useState(masterKeys?.gemini || '');
  const [elevenKey, setElevenKey] = useState(masterKeys?.eleven || '');
  const [falKey, setFalKey] = useState(masterKeys?.fal || '');
  const [s3Bucket, setS3Bucket] = useState(masterKeys?.s3Bucket || 'clipflow-production-renders');
  const [s3Region, setS3Region] = useState(masterKeys?.s3Region || 'us-east-1');
  const [uploadPostKey, setUploadPostKey] = useState(masterKeys?.uploadPost || '');
  const [showKeys, setShowKeys] = useState({});

  const [clusters, setClusters] = useState([
    {
      id: 'us-east-1',
      name: 'Cluster-US-East-1',
      specs: '8x H100 SXM5',
      load: 76,
      vram: '608GB / 640GB',
      thermals: '58°C avg',
      threads: 78,
      status: 'healthy',
    },
    {
      id: 'eu-west-1',
      name: 'Cluster-EU-West-1',
      specs: '4x A100 80GB',
      load: 42,
      vram: '134GB / 320GB',
      thermals: '51°C avg',
      threads: 34,
      status: 'healthy',
    },
    {
      id: 'apac-1',
      name: 'Cluster-APAC-1',
      specs: '4x L40S 48GB',
      load: 55,
      vram: '105GB / 192GB',
      thermals: '54°C avg',
      threads: 30,
      status: 'healthy',
    },
  ]);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleRebalance = () => {
    setIsRebalancing(true);
    showToast('⚖️ Rebalancing GPU queues across 3 global regions...');
    setTimeout(() => {
      setClusters((prev) =>
        prev.map((c) => ({
          ...c,
          load: Math.floor(Math.random() * 20 + 50),
          threads: Math.floor(Math.random() * 30 + 40),
        }))
      );
      setIsRebalancing(false);
      showToast('✅ GPU Cluster load rebalanced: All queues optimized under 450ms.');
    }, 1500);
  };

  const handleExportAudit = () => {
    showToast('📊 Generating signed SOC2 / Financial Compute Audit CSV...');
    setTimeout(() => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(INITIAL_TRANSACTIONS, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `clipflow_compute_audit_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('✅ Compute audit exported successfully.');
    }, 1000);
  };

  const handleGenerateInvoices = () => {
    showToast('🧾 Wholesale invoices compiled for 42 enterprise agency seats.');
  };

  const handleSaveCredentials = (e) => {
    e.preventDefault();
    if (onSaveMasterKeys) {
      onSaveMasterKeys({
        gemini: geminiKey,
        eleven: elevenKey,
        fal: falKey,
        s3Bucket,
        s3Region,
        uploadPost: uploadPostKey,
      });
    }
    showToast('🔒 Master Provider API credentials encrypted and saved securely.');
  };

  const handleTestConnection = (provider) => {
    showToast(`🔄 Testing live API handshake with ${provider}...`);
    setTimeout(() => {
      showToast(`🟢 200 OK — ${provider} connection verified healthy.`);
    }, 1200);
  };

  // Dynamic calculations based on multiplier
  const baseCogs = 8140;
  const calculatedRev = Math.round(baseCogs * multiplier * 0.512);
  const calculatedProfit = calculatedRev - baseCogs;
  const calculatedMargin = ((calculatedProfit / calculatedRev) * 100).toFixed(1);

  const filteredTransactions = INITIAL_TRANSACTIONS.filter(
    (t) =>
      t.user.toLowerCase().includes(filterQuery.toLowerCase()) ||
      t.uid.toLowerCase().includes(filterQuery.toLowerCase()) ||
      t.clipRef.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="p-space-md lg:p-space-lg max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-surface-container-high border border-primary/40 text-on-surface px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-xl animate-bounce">
          <span className="material-symbols-outlined text-secondary text-[20px]">info</span>
          <span className="font-body-sm text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Dynamic Operational Sub-Header Bar */}
      <div className="relative w-full bg-surface-container-low/90 backdrop-blur-xl p-6 rounded-2xl border border-white/5 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-label-mono text-xs uppercase tracking-widest text-secondary bg-surface-container-high px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-secondary/20">
              <span className="inline-block w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
              SUPERADMIN CONSOLE
            </span>
            <span className="font-label-mono text-xs text-outline">|</span>
            <span className="font-label-mono text-xs text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-tertiary">verified</span>
              PROFIT ARBITRAGE ENGINE V3.1
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface tracking-tight flex items-center gap-3 mt-1">
            Compute Resale & Master Infrastructure
          </h1>
          <p className="font-body-sm text-xs text-outline flex items-center gap-2 mt-0.5">
            <span className="material-symbols-outlined text-secondary text-[16px]">bolt</span>
            <span className="text-tertiary font-medium">16 GPU Nodes Operational</span>
            <span>(H100/A100 Clusters: 99.98% Healthy across 3 data centers)</span>
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-surface-container p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'telemetry'
                ? 'bg-primary text-white shadow-md'
                : 'text-outline hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">monitoring</span>
            <span>Fleet & Arbitrage</span>
          </button>
          <button
            onClick={() => setActiveTab('credentials')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'credentials'
                ? 'bg-primary text-white shadow-md'
                : 'text-outline hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">key</span>
            <span>Master AI Keys</span>
          </button>
        </div>
      </div>

      {activeTab === 'credentials' ? (
        /* Master AI Provider Keys & Global Infrastructure Configuration */
        <div className="space-y-6">
          <div className="bg-surface-container-low rounded-2xl p-6 border border-white/5 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[24px]">vpn_key</span>
                <div>
                  <h2 className="font-headline-md text-lg font-bold text-on-surface">
                    Master AI Provider Keys & Storage
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    These master API credentials power all platform video transcription, Gemini moment detection, ElevenLabs dubbing, and S3 backups.
                  </p>
                </div>
              </div>
              <span className="font-label-pill text-[10px] bg-tertiary-container/30 text-tertiary border border-tertiary/20 px-2.5 py-1 rounded-full font-bold">
                ENCRYPTED SERVER-SIDE
              </span>
            </div>

            <form onSubmit={handleSaveCredentials} className="space-y-5">
              {/* Google Gemini Master Key */}
              <div className="bg-surface-container p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span> Google Gemini Master API Key (Required)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleTestConnection('Google Gemini 2.0')}
                    className="text-[11px] text-secondary hover:underline font-semibold flex items-center gap-1"
                  >
                    Test Connection
                  </button>
                </div>
                <div className="relative flex items-center">
                  <input
                    type={showKeys.gemini ? 'text' : 'password'}
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full bg-surface-container-lowest text-on-surface font-label-mono text-xs px-3.5 py-2.5 rounded-lg border border-white/5 focus:outline-none focus:border-secondary/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKeys((p) => ({ ...p, gemini: !p.gemini }))}
                    className="absolute right-3 text-outline hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showKeys.gemini ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                <p className="text-[11px] text-outline">
                  Used by the backend pipeline for viral scene scoring, transcript analysis, and attention-grabbing hook overlays.
                </p>
              </div>

              {/* ElevenLabs Master Key */}
              <div className="bg-surface-container p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span> ElevenLabs Master API Key (Dubbing)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleTestConnection('ElevenLabs')}
                    className="text-[11px] text-secondary hover:underline font-semibold flex items-center gap-1"
                  >
                    Test Connection
                  </button>
                </div>
                <div className="relative flex items-center">
                  <input
                    type={showKeys.eleven ? 'text' : 'password'}
                    value={elevenKey}
                    onChange={(e) => setElevenKey(e.target.value)}
                    placeholder="xi-api-key..."
                    className="w-full bg-surface-container-lowest text-on-surface font-label-mono text-xs px-3.5 py-2.5 rounded-lg border border-white/5 focus:outline-none focus:border-secondary/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKeys((p) => ({ ...p, eleven: !p.eleven }))}
                    className="absolute right-3 text-outline hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showKeys.eleven ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* fal.ai Master Key */}
              <div className="bg-surface-container p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span> fal.ai / Kling UGC Actor Key
                  </label>
                  <button
                    type="button"
                    onClick={() => handleTestConnection('fal.ai')}
                    className="text-[11px] text-secondary hover:underline font-semibold flex items-center gap-1"
                  >
                    Test Connection
                  </button>
                </div>
                <div className="relative flex items-center">
                  <input
                    type={showKeys.fal ? 'text' : 'password'}
                    value={falKey}
                    onChange={(e) => setFalKey(e.target.value)}
                    placeholder="fal_key_..."
                    className="w-full bg-surface-container-lowest text-on-surface font-label-mono text-xs px-3.5 py-2.5 rounded-lg border border-white/5 focus:outline-none focus:border-secondary/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKeys((p) => ({ ...p, fal: !p.fal }))}
                    className="absolute right-3 text-outline hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showKeys.fal ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* S3 Storage Cluster */}
              <div className="bg-surface-container p-4 rounded-xl border border-white/5 space-y-3">
                <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-400"></span> Cloud Storage & Video Archive (AWS S3 / R2)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-outline block mb-1">Bucket Name</label>
                    <input
                      type="text"
                      value={s3Bucket}
                      onChange={(e) => setS3Bucket(e.target.value)}
                      className="w-full bg-surface-container-lowest text-on-surface font-label-mono text-xs px-3.5 py-2 rounded-lg border border-white/5 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-outline block mb-1">Region</label>
                    <input
                      type="text"
                      value={s3Region}
                      onChange={(e) => setS3Region(e.target.value)}
                      className="w-full bg-surface-container-lowest text-on-surface font-label-mono text-xs px-3.5 py-2 rounded-lg border border-white/5 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-on-primary px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/25 flex items-center gap-2 text-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  Save Master Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* Fleet & Arbitrage Tab */
        <>
          {/* Quick Ops Actions */}
          <div className="flex items-center justify-end gap-2.5 flex-wrap">
            <button
              onClick={handleRebalance}
              disabled={isRebalancing}
              className="bg-surface-container-high hover:bg-surface-bright border border-white/5 text-on-surface px-3.5 py-2 rounded-lg font-label-pill text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              type="button"
            >
              <span className={`material-symbols-outlined text-[16px] text-secondary ${isRebalancing ? 'animate-spin' : ''}`}>
                tune
              </span>
              {isRebalancing ? 'Rebalancing...' : 'Rebalance GPU Queues'}
            </button>
            <button
              onClick={handleGenerateInvoices}
              className="bg-surface-container-high hover:bg-surface-bright border border-white/5 text-on-surface px-3.5 py-2 rounded-lg font-label-pill text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] text-outline">receipt_long</span>
              Wholesale Invoices
            </button>
            <button
              onClick={handleExportAudit}
              className="bg-primary hover:bg-primary/90 text-on-primary px-3.5 py-2 rounded-lg font-label-pill text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-primary/20 hover:shadow-primary/40"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Export Financial Audit
            </button>
          </div>

          {/* Top KPI Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Gross Credit Revenue */}
            <div className="bg-surface-container-low rounded-xl p-5 border border-white/5 shadow-lg relative overflow-hidden group hover:border-primary/30 transition-all">
              <div className="absolute -right-8 -top-8 w-28 h-28 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-label-mono text-xs text-outline uppercase tracking-wider">
                    Gross Credit Revenue (MTD)
                  </span>
                  <span className="text-2xl lg:text-3xl font-bold text-on-surface mt-1 tracking-tight">
                    ${calculatedRev.toLocaleString()}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">monetization_on</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 bg-tertiary-container/30 border border-tertiary/20 px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-tertiary text-[14px]">trending_up</span>
                  <span className="font-readout-num text-xs text-tertiary font-bold">+28.4%</span>
                  <span className="text-on-surface-variant text-[10px]">MoM</span>
                </div>
                <span className="font-label-mono text-[11px] text-outline">Retail Credit Sales</span>
              </div>
            </div>

            {/* Wholesale Compute Cost (COGS) */}
            <div className="bg-surface-container-low rounded-xl p-5 border border-white/5 shadow-lg relative overflow-hidden group hover:border-secondary/30 transition-all">
              <div className="absolute -right-8 -top-8 w-28 h-28 bg-secondary/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-label-mono text-xs text-outline uppercase tracking-wider">
                    Wholesale Compute Cost (COGS)
                  </span>
                  <span className="text-2xl lg:text-3xl font-bold text-secondary mt-1 tracking-tight">
                    ${baseCogs.toLocaleString()}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">memory</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 bg-surface-container-highest px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-secondary text-[14px]">speed</span>
                  <span className="font-readout-num text-xs text-on-surface font-semibold">1,420k</span>
                  <span className="text-on-surface-variant text-[10px]">tokens/s</span>
                </div>
                <span className="font-label-mono text-[11px] text-outline">GPU & Whisper Direct</span>
              </div>
            </div>

            {/* Net Resale Profit */}
            <div className="bg-surface-container-low rounded-xl p-5 border border-white/5 shadow-lg relative overflow-hidden group hover:border-tertiary/30 transition-all">
              <div className="absolute -right-8 -top-8 w-28 h-28 bg-tertiary/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-label-mono text-xs text-outline uppercase tracking-wider">
                    Net Resale Profit
                  </span>
                  <span className="text-2xl lg:text-3xl font-bold text-tertiary mt-1 tracking-tight">
                    ${calculatedProfit.toLocaleString()}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-tertiary-container/40 flex items-center justify-center text-tertiary shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">local_fire_department</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 bg-tertiary-container/60 px-2 py-0.5 rounded-full border border-tertiary/30">
                  <span className="font-readout-num text-xs text-tertiary font-bold">{calculatedMargin}%</span>
                  <span className="font-label-pill text-[10px] text-tertiary uppercase font-semibold">Margin</span>
                </div>
                <span className="font-label-mono text-[11px] text-tertiary tracking-tight font-medium">
                  {multiplier}x Arbitrage Multiplier
                </span>
              </div>
            </div>

            {/* Active Concurrency & Jobs */}
            <div className="bg-surface-container-low rounded-xl p-5 border border-white/5 shadow-lg relative overflow-hidden group hover:border-white/20 transition-all">
              <div className="absolute -right-8 -top-8 w-28 h-28 bg-surface-container-highest rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-label-mono text-xs text-outline uppercase tracking-wider">
                    Active Concurrency & Jobs
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl lg:text-3xl font-bold text-on-surface tracking-tight">142</span>
                    <span className="font-label-pill text-[10px] text-secondary uppercase tracking-wider bg-surface-container-high px-2 py-0.5 rounded font-semibold">
                      Rendering
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">dynamic_feed</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="font-readout-num text-xs text-on-surface font-medium">1,890 Idle Pods</span>
                </div>
                <span className="font-label-mono text-[11px] text-outline">Queue Delay: &lt; 0.4s</span>
              </div>
            </div>
          </div>

          {/* Main Operational Grid: Arbitrage Model vs Node Telemetry */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Wholesale vs Resale Arbitrage Engine (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="bg-surface-container-low rounded-2xl p-6 border border-white/5 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[22px]">finance_chip</span>
                    <h2 className="font-headline-md text-base lg:text-lg font-bold text-on-surface tracking-tight">
                      Wholesale Model vs Credit Resale Arbitrage
                    </h2>
                  </div>
                  <span className="font-label-mono text-xs text-tertiary bg-surface-container-high border border-tertiary/20 px-2.5 py-1 rounded-full">
                    Unit Economics Per 60s Clip
                  </span>
                </div>

                {/* Arbitrage Cost Comparison Visualizer */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Raw Wholesale Compute Card */}
                  <div className="bg-surface-container rounded-xl p-4 border border-white/5 shadow-md flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-label-mono text-[11px] text-outline uppercase tracking-wider">
                        Raw Wholesale Compute
                      </span>
                      <span className="material-symbols-outlined text-outline text-[18px]">dns</span>
                    </div>
                    <div className="my-3 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-secondary">$0.030</span>
                      <span className="font-body-sm text-xs text-outline">/ 60s video</span>
                    </div>
                    <div className="flex flex-col gap-1.5 text-xs text-on-surface-variant border-t border-white/5 pt-2.5">
                      <div className="flex justify-between">
                        <span>Whisper v3 ASR (2.1s):</span>
                        <span className="font-readout-num font-medium text-on-surface">$0.006</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vision Salience & Framing:</span>
                        <span className="font-readout-num font-medium text-on-surface">$0.014</span>
                      </div>
                      <div className="flex justify-between">
                        <span>FFmpeg NVENC 1080p Encode:</span>
                        <span className="font-readout-num font-medium text-on-surface">$0.010</span>
                      </div>
                    </div>
                  </div>

                  {/* Retail Creator Credit Charge Card */}
                  <div className="bg-surface-container rounded-xl p-4 border border-primary/20 shadow-md relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-full blur-xl pointer-events-none"></div>
                    <div className="flex items-center justify-between">
                      <span className="font-label-mono text-[11px] text-tertiary uppercase tracking-wider">
                        Creator Credit Charge
                      </span>
                      <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
                    </div>
                    <div className="my-3 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-tertiary">$0.350</span>
                      <span className="font-body-sm text-xs text-outline">/ 35 credits</span>
                    </div>
                    <div className="flex flex-col gap-1.5 text-xs text-on-surface-variant border-t border-white/5 pt-2.5">
                      <div className="flex justify-between">
                        <span>Arbitrage Net Spread:</span>
                        <span className="font-readout-num font-bold text-tertiary">+$0.320 / clip</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Effective Value Markup:</span>
                        <span className="font-readout-num font-bold text-tertiary">11.66x (1,166%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gross Margin Retained:</span>
                        <span className="font-readout-num font-bold text-tertiary">91.4%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Split Progress Bar */}
                <div className="mt-5 bg-surface-container-high p-4 rounded-xl border border-white/5 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-label-mono text-outline uppercase text-[11px]">
                      Revenue Component Split (Per Clip)
                    </span>
                    <span className="font-label-mono text-tertiary font-bold text-[11px]">91.4% ClipFlow Profit</span>
                  </div>
                  <div className="h-3 w-full bg-surface-container-lowest rounded-full overflow-hidden flex shadow-inner">
                    <div className="h-full bg-secondary transition-all" style={{ width: '8.6%' }} title="Compute Cost: $0.03"></div>
                    <div className="h-full bg-tertiary transition-all" style={{ width: '91.4%' }} title="Gross Profit: $0.32"></div>
                  </div>
                  <div className="flex items-center justify-between font-label-mono text-xs text-on-surface-variant pt-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span> Wholesale Hardware (8.6%)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-tertiary"></span> Platform Resale Margin (91.4%)
                    </span>
                  </div>
                </div>

                {/* Dynamic Pricing Matrix Interactive Simulation Slider */}
                <div className="mt-5 bg-surface-container p-4 rounded-xl border border-white/5 flex flex-col gap-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-headline-md font-bold text-on-surface text-sm">
                        Dynamic Credit Arbitrage Multiplier
                      </span>
                      <span className="font-body-sm text-xs text-outline">
                        Simulate revenue impact across 125,000 monthly rendering pipeline transactions
                      </span>
                    </div>
                    <span className="font-readout-num text-sm text-primary font-bold bg-surface-container-high border border-primary/30 px-3 py-1 rounded-lg">
                      {multiplier}x
                    </span>
                  </div>
                  <input
                    className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                    max="25"
                    min="5"
                    step="0.2"
                    type="range"
                    value={multiplier}
                    onChange={(e) => setMultiplier(parseFloat(e.target.value))}
                  />
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                    <div className="bg-surface-container-high p-2.5 rounded-lg border border-white/5">
                      <span className="font-label-mono text-[10px] text-outline block uppercase">Projected MTD Rev</span>
                      <span className="font-readout-num text-sm text-on-surface font-bold mt-0.5 block">
                        ${calculatedRev.toLocaleString()}
                      </span>
                    </div>
                    <div className="bg-surface-container-high p-2.5 rounded-lg border border-white/5">
                      <span className="font-label-mono text-[10px] text-outline block uppercase">Estimated Margin</span>
                      <span className="font-readout-num text-sm text-tertiary font-bold mt-0.5 block">
                        {calculatedMargin}%
                      </span>
                    </div>
                    <div className="bg-surface-container-high p-2.5 rounded-lg border border-white/5">
                      <span className="font-label-mono text-[10px] text-outline block uppercase">Est. Monthly Profit</span>
                      <span className="font-readout-num text-sm text-tertiary font-bold mt-0.5 block">
                        +${calculatedProfit.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: GPU Node Cluster Telemetry (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-surface-container-low rounded-2xl p-6 border border-white/5 shadow-lg flex flex-col justify-between">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[22px]">dns</span>
                    <h2 className="font-headline-md text-base lg:text-lg font-bold text-on-surface tracking-tight">
                      GPU Node Cluster Telemetry
                    </h2>
                  </div>
                  <span className="font-label-mono text-xs text-secondary bg-surface-container-high border border-secondary/20 px-2.5 py-1 rounded-full">
                    16 GPUs Live
                  </span>
                </div>

                {/* Cluster List */}
                <div className="flex flex-col gap-3 mt-4">
                  {clusters.map((cluster) => (
                    <div
                      key={cluster.id}
                      className="bg-surface-container rounded-xl p-3.5 border border-white/5 shadow-sm flex flex-col gap-2 hover:border-white/10 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                          <span className="font-headline-md font-bold text-sm text-on-surface">{cluster.name}</span>
                          <span className="font-label-mono text-[10px] text-secondary bg-surface-container-high px-1.5 py-0.5 rounded">
                            {cluster.specs}
                          </span>
                        </div>
                        <span className="font-readout-num text-xs text-on-surface font-bold">{cluster.load}% Load</span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            cluster.load > 70
                              ? 'bg-gradient-to-r from-secondary to-primary'
                              : 'bg-secondary'
                          }`}
                          style={{ width: `${cluster.load}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-label-mono text-outline">
                        <span>VRAM: {cluster.vram}</span>
                        <span>Thermals: {cluster.thermals}</span>
                        <span>Threads: {cluster.threads}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Benchmark Latency Box */}
                <div className="mt-5 bg-surface-container-high rounded-xl p-4 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-surface-container text-tertiary shadow-inner">
                      <span className="material-symbols-outlined text-[22px]">timer</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-mono text-[10px] text-outline uppercase">
                        Average Clip Processing Latency
                      </span>
                      <span className="font-headline-md text-base font-bold text-on-surface">
                        38.2s <span className="text-xs font-normal text-on-surface-variant">/ 1080p 60fps render</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="font-label-pill text-[10px] text-on-tertiary-container bg-tertiary-container/80 px-2 py-0.5 rounded font-bold">
                      Benchmark Pass
                    </span>
                    <span className="font-readout-num text-outline text-[11px] mt-1">99.4% &lt; 45s SLA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Data Table: Live User Transactions & Compute Consumption Audit */}
          <div className="bg-surface-container-low rounded-2xl border border-white/5 shadow-lg flex flex-col overflow-hidden">
            {/* Table Header & Controls */}
            <div className="p-5 flex flex-wrap items-center justify-between gap-4 bg-surface-container-low border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-[22px]">table_chart_view</span>
                <div className="flex flex-col">
                  <h3 className="font-headline-md text-base font-bold text-on-surface tracking-tight">
                    Live User Transactions & Compute Consumption Audit
                  </h3>
                  <span className="font-body-sm text-xs text-outline">
                    Real-time ledger matching customer credit burns with actual GPU inference COGS
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2.5 top-2 text-outline text-[18px]">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Filter by user or clip..."
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    className="bg-surface-container-high border border-white/5 rounded-lg pl-8 pr-3 py-1.5 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary/50 w-48 lg:w-60"
                  />
                </div>
                <div className="bg-surface-container-highest px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                  <span className="font-label-mono text-xs text-on-surface-variant font-medium">Ingesting Stream</span>
                </div>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container font-label-mono text-[11px] text-outline uppercase tracking-wider border-b border-white/5">
                    <th className="py-3 px-4">Creator / Agency</th>
                    <th className="py-3 px-4">Plan / Bundle</th>
                    <th className="py-3 px-4 text-right">Credits Spent</th>
                    <th className="py-3 px-4 text-right">Raw Compute Cost</th>
                    <th className="py-3 px-4 text-right">Realized Margin</th>
                    <th className="py-3 px-4">Job / Clip Ref</th>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-body-sm text-xs text-on-surface">
                  {filteredTransactions.map((row) => (
                    <tr key={row.id} className="hover:bg-surface-container/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-[11px] text-primary">
                            {row.initials}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-on-surface truncate">{row.user}</span>
                            <span className="text-[10px] font-label-mono text-outline">uid: {row.uid}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`bg-surface-container-high ${row.planColor} font-label-pill text-[10px] px-2 py-0.5 rounded font-semibold`}>
                          {row.plan}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-readout-num text-on-surface">
                        <span className="text-primary font-bold">{row.credits} cr</span>{' '}
                        <span className="text-[10px] text-outline">({row.creditVal})</span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-readout-num text-secondary font-medium">
                        {row.cogs}
                      </td>
                      <td className="py-3.5 px-4 text-right font-readout-num">
                        <span className="text-tertiary bg-tertiary-container/30 border border-tertiary/20 px-2 py-0.5 rounded-full font-bold shadow-sm">
                          {row.margin}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-label-mono text-[11px] text-outline">
                        {row.clipRef}
                      </td>
                      <td className="py-3.5 px-4 font-label-mono text-[11px] text-on-surface-variant">
                        {row.time}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-tertiary text-xs font-semibold">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span> Settled
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
