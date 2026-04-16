/**
 * Beta Ads loader — ported from deck.beta-ads.no
 *
 * Rotating pink/red orb (inset box-shadow) with the Beta Ads brandmark
 * pulsing in the center. Used as the Suspense fallback for lazy routes.
 *
 * The structure, CSS, and animations match the deck one-to-one — see
 * index.html lines 1078–1156 in /Users/myraune/Desktop/beta-ads-deck.
 *
 * Two brandmark images are rendered and CSS swaps between them based on
 * `html.dark`, so the logo stays visible in either theme.
 */
export const Component = () => {
  return (
    <div className="loader-wrapper" role="status" aria-label="Loading">
      <div className="loader-spinner" aria-hidden="true" />
      <img
        src="/lovable-uploads/brandmark-black.png"
        alt=""
        aria-hidden="true"
        className="loader-brandmark loader-brandmark--light"
      />
      <img
        src="/lovable-uploads/brandmark-white.png"
        alt=""
        aria-hidden="true"
        className="loader-brandmark loader-brandmark--dark"
      />
      <span className="sr-only">Loading</span>
    </div>
  );
};

export default Component;
