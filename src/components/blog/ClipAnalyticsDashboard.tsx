import React from 'react';

export default function ClipAnalyticsDashboard() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden border border-border/30 shadow-xl"
      style={{ height: 880 }}
    >
      <iframe
        src="/clip-analytics-preview/index.html"
        title="Clip Analytics Dashboard"
        className="w-full h-full border-0"
        loading="lazy"
      />
    </div>
  );
}
