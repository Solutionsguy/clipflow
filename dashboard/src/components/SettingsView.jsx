import React, { useState } from 'react';

export default function SettingsView({
  userSettings,
  setUserSettings,
  onSaveSettings,
  onNavigateToAdmin,
}) {
  const [name, setName] = useState(userSettings?.name || 'Alex Rivera');
  const [email, setEmail] = useState(userSettings?.email || 'alex@clipflow.ai');
  const [defaultRatio, setDefaultRatio] = useState(userSettings?.defaultRatio || '9:16');
  const [captionPreset, setCaptionPreset] = useState(userSettings?.captionPreset || 'hormozi');
  const [webhookUrl, setWebhookUrl] = useState(userSettings?.webhookUrl || 'https://api.mybrand.com/webhooks/clipflow');
  const [apiKey] = useState(userSettings?.apiKey || 'cf_live_99a82e71bb30f81c4');
  const [copiedKey, setCopiedKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Social account connections
  const [socials, setSocials] = useState({
    tiktok: { connected: true, handle: '@alex_content' },
    instagram: { connected: true, handle: '@alexrivera.clips' },
    youtube: { connected: false, handle: '' },
  });

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleToggleSocial = (platform) => {
    setSocials((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        connected: !prev[platform].connected,
        handle: !prev[platform].connected ? `@${name.toLowerCase().replace(/\s+/g, '_')}` : '',
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSaveSettings) {
      onSaveSettings({
        name,
        email,
        defaultRatio,
        captionPreset,
        webhookUrl,
        apiKey,
      });
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="relative w-full px-space-md lg:px-space-xl py-space-md max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-xl text-2xl lg:text-3xl font-bold text-on-surface">
              Account & Workspace Settings
            </h1>
            <span className="font-label-pill text-[10px] bg-tertiary-container/40 text-tertiary border border-tertiary/30 px-2 py-0.5 rounded-full font-bold">
              CLOUD COMPUTE ACTIVE
            </span>
          </div>
          <p className="font-body-md text-sm text-on-surface-variant mt-1">
            Manage your creator profile, video export defaults, connected social channels, and developer API keys.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 bg-tertiary-container/30 border border-tertiary/50 rounded-xl text-tertiary text-xs font-semibold flex items-center gap-2 shadow-lg">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          Workspace preferences and social integration settings saved successfully.
        </div>
      )}

      {/* Infrastructure Note Card */}
      <div className="bg-primary-container/20 border border-primary/30 rounded-2xl p-4 lg:p-5 flex items-start gap-3.5 shadow-md">
        <span className="material-symbols-outlined text-primary text-[24px] shrink-0 mt-0.5">bolt</span>
        <div className="flex flex-col gap-1">
          <span className="font-headline-md text-sm font-bold text-on-surface">
            Fully Autonomous Compute Engine
          </span>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            ClipFlow manages all underlying GPU inference clusters, Whisper transcription, and Gemini AI models directly. You do not need to provide personal API keys to process videos or burn subtitles. Compute is billed seamlessly from your credit balance.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Creator Profile */}
        <div className="bg-surface-container-low rounded-2xl p-6 border border-white/5 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/5">
            <span className="material-symbols-outlined text-secondary text-[22px]">person</span>
            <h2 className="font-headline-md text-base font-bold text-on-surface">Creator Profile</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1.5">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-sm px-3.5 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-sm px-3.5 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>
        </div>

        {/* Video & Caption Defaults */}
        <div className="bg-surface-container-low rounded-2xl p-6 border border-white/5 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/5">
            <span className="material-symbols-outlined text-primary text-[22px]">tune</span>
            <h2 className="font-headline-md text-base font-bold text-on-surface">Export & Caption Presets</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1.5">
                Default Aspect Ratio
              </label>
              <select
                value={defaultRatio}
                onChange={(e) => setDefaultRatio(e.target.value)}
                className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-sm px-3.5 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-primary/50 cursor-pointer"
              >
                <option value="9:16">9:16 Vertical (TikTok, Reels, Shorts)</option>
                <option value="1:1">1:1 Square (Instagram, LinkedIn)</option>
                <option value="16:9">16:9 Landscape (YouTube)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1.5">
                Default Subtitle Style Preset
              </label>
              <select
                value={captionPreset}
                onChange={(e) => setCaptionPreset(e.target.value)}
                className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-sm px-3.5 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-primary/50 cursor-pointer"
              >
                <option value="hormozi">Alex Hormozi (Yellow & White Bouncing)</option>
                <option value="neon">Neon Cyber Glow (Violet & Cyan)</option>
                <option value="minimal">Clean Minimalist (Black Box & White Text)</option>
                <option value="beast">MrBeast High Impact (Bold Outline)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Connected Social Publishing Accounts */}
        <div className="bg-surface-container-low rounded-2xl p-6 border border-white/5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-tertiary text-[22px]">share</span>
              <h2 className="font-headline-md text-base font-bold text-on-surface">Connected Social Channels</h2>
            </div>
            <span className="font-label-mono text-xs text-outline">Auto-Syndication Ready</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* TikTok */}
            <div className="bg-surface-container p-4 rounded-xl border border-white/5 flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> TikTok
                </span>
                <span className="font-label-pill text-[10px] px-2 py-0.5 rounded bg-surface-container-high text-on-surface">
                  {socials.tiktok.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <p className="text-xs text-outline">
                {socials.tiktok.connected ? socials.tiktok.handle : 'Not connected'}
              </p>
              <button
                type="button"
                onClick={() => handleToggleSocial('tiktok')}
                className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  socials.tiktok.connected
                    ? 'bg-surface-container-high text-on-surface-variant hover:text-white'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {socials.tiktok.connected ? 'Disconnect' : 'Connect TikTok'}
              </button>
            </div>

            {/* Instagram */}
            <div className="bg-surface-container p-4 rounded-xl border border-white/5 flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Instagram Reels
                </span>
                <span className="font-label-pill text-[10px] px-2 py-0.5 rounded bg-surface-container-high text-on-surface">
                  {socials.instagram.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <p className="text-xs text-outline">
                {socials.instagram.connected ? socials.instagram.handle : 'Not connected'}
              </p>
              <button
                type="button"
                onClick={() => handleToggleSocial('instagram')}
                className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  socials.instagram.connected
                    ? 'bg-surface-container-high text-on-surface-variant hover:text-white'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {socials.instagram.connected ? 'Disconnect' : 'Connect Instagram'}
              </button>
            </div>

            {/* YouTube Shorts */}
            <div className="bg-surface-container p-4 rounded-xl border border-white/5 flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-500"></span> YouTube Shorts
                </span>
                <span className="font-label-pill text-[10px] px-2 py-0.5 rounded bg-surface-container-high text-on-surface">
                  {socials.youtube.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <p className="text-xs text-outline">
                {socials.youtube.connected ? socials.youtube.handle : 'Not connected'}
              </p>
              <button
                type="button"
                onClick={() => handleToggleSocial('youtube')}
                className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  socials.youtube.connected
                    ? 'bg-surface-container-high text-on-surface-variant hover:text-white'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {socials.youtube.connected ? 'Disconnect' : 'Connect YouTube'}
              </button>
            </div>
          </div>
        </div>

        {/* Developer API & Webhooks */}
        <div className="bg-surface-container-low rounded-2xl p-6 border border-white/5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-secondary text-[22px]">code</span>
              <h2 className="font-headline-md text-base font-bold text-on-surface">Developer API & Webhooks</h2>
            </div>
            <span className="font-label-mono text-xs text-secondary bg-surface-container-high px-2 py-0.5 rounded">
              REST v2.4
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1.5">
              Personal API Key (Send Programmatic Clipping Requests)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={apiKey}
                className="w-full bg-surface-container-lowest text-secondary font-label-mono text-xs px-3.5 py-2.5 rounded-xl border border-white/5 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopyKey}
                className="bg-surface-container-high hover:bg-surface-bright text-on-surface px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 border border-white/5"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {copiedKey ? 'check' : 'content_copy'}
                </span>
                {copiedKey ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1.5">
              Webhook Completion URL
            </label>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://yourserver.com/webhooks/clipflow"
              className="w-full bg-surface-container-lowest text-on-surface font-label-mono text-xs px-3.5 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-primary/50"
            />
            <span className="text-[11px] text-outline mt-1 block">
              We'll send a POST payload when video extraction or voice dubbing completes.
            </span>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-on-primary px-8 py-3 rounded-xl font-bold transition-all active:scale-[0.98] shadow-lg shadow-primary/25 flex items-center gap-2 text-sm"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
