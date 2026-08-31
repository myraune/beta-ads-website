import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

/**
 * Blog posts are prerendered, so the static HTML already shows the whole
 * article. createRoot replaces #root wholesale, and BlogPost renders an empty
 * placeholder while its locale chunk downloads. On a throttled connection that
 * gap lasted seconds: the article collapsed to zero height and came back, which
 * measured as a CLS of 0.63 on every /blog/:slug page.
 *
 * Waiting for the locale before mounting means React's first render already has
 * the post, so the prerendered markup is swapped for equivalent markup instead
 * of for nothing. Everything else mounts immediately as before.
 */
const mount = () => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>
  );
};

const slugMatch = window.location.pathname.match(/^\/blog\/([^/]+)\/?$/);
if (slugMatch) {
  Promise.all([import("./data/blogPostsMeta"), import("./data/blogPosts")])
    .then(([metaMod, postsMod]) => {
      const meta = metaMod.getBlogPostMetaBySlug(slugMatch[1]);
      return postsMod.ensureLocaleLoaded(meta?.locale ?? "en");
    })
    // A failure here must never block the app; mount and let BlogPost retry.
    .catch(() => {})
    .then(mount);
} else {
  mount();
}
