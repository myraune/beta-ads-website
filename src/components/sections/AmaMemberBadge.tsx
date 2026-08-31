import React, { useState } from "react";

/**
 * American Marketing Association member seal in the footer.
 *
 * The seal is a credential, so it has to be the real file AMA issues from the
 * member dashboard, not a redrawn approximation. It is not on a public CDN, so
 * the asset is dropped into public/lovable-uploads by hand.
 *
 * `onError` hides it if the file 404s, which is what production does for a
 * missing .png. Note this does NOT cover the dev server, which answers a
 * missing .png with the SPA fallback (200 text/html); the browser then hangs
 * decoding HTML as an image and fires neither onLoad nor onError, leaving an
 * empty box. So the guard is a production safety net, not a substitute for
 * shipping the asset.
 */

const BADGE_SRC = "/lovable-uploads/ama-member-badge.png";

export const AmaMemberBadge: React.FC = () => {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <a
      href="https://www.ama.org/"
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      title="American Marketing Association member"
    >
      <img
        src={BADGE_SRC}
        alt="Beta Agency AS is a member of the American Marketing Association"
        width={72}
        height={72}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity duration-200 mix-blend-multiply dark:mix-blend-normal"
      />
    </a>
  );
};

export default AmaMemberBadge;
