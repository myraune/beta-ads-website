import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

const defaultProps = { size: 24 };

/* ── Feature section icons — clean geometric style ── */

export const IconStreamers: React.FC<IconProps> = ({ className, size = defaultProps.size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 19c0-3.3 2.7-6 6-6h2c3.3 0 6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 14c2.2 0 4 1.8 4 4v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconTarget: React.FC<IconProps> = ({ className, size = defaultProps.size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconLaunch: React.FC<IconProps> = ({ className, size = defaultProps.size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M13 3l7 7-4 4-7-7 4-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M6 14l4 4-3 3-4-4 3-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M16 6l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19 3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconAnalytics: React.FC<IconProps> = ({ className, size = defaultProps.size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="14" width="4" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="10" y="9" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="17" y="4" width="4" height="17" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 11l5-4 4 2 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconReports: React.FC<IconProps> = ({ className, size = defaultProps.size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 3h8l5 5v13H6V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 13h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ── Ad format icons ── */

export const IconVideo: React.FC<IconProps> = ({ className, size = defaultProps.size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="4" width="15" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M17 9l5-3v12l-5-3V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const IconSnipe: React.FC<IconProps> = ({ className, size = defaultProps.size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M2 8h20v8H2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="17" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const IconSidebar: React.FC<IconProps> = ({ className, size = defaultProps.size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 3v18" stroke="currentColor" strokeWidth="1.5" />
    <path d="M18 8h2M18 12h2M18 16h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconRichMedia: React.FC<IconProps> = ({ className, size = defaultProps.size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 15l5-4 3 2 5-5 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="8" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const IconPoll: React.FC<IconProps> = ({ className, size = defaultProps.size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 9h7M7 13h10M7 17h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="18" cy="9" r="1" fill="currentColor" />
  </svg>
);

export const IconInteractive: React.FC<IconProps> = ({ className, size = defaultProps.size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 3l14 9-14 9V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M15 15l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 18v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ── Misc icons ── */

export const IconAI: React.FC<IconProps> = ({ className, size = defaultProps.size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const IconOverlay: React.FC<IconProps> = ({ className, size = defaultProps.size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <rect x="8" y="8" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const IconLive: React.FC<IconProps> = ({ className, size = defaultProps.size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="4" fill="currentColor" />
    <path d="M7 7a7 7 0 010 10M17 7a7 7 0 000 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 4a12 12 0 010 16M20 4a12 12 0 000 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconGlobe: React.FC<IconProps> = ({ className, size = defaultProps.size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 12h20" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 7h16M4 17h16" stroke="currentColor" strokeWidth="1" opacity="0.5" />
  </svg>
);
