import { createElement, lazy, type ComponentType } from "react";

/**
 * React.lazy with a preload() that main.tsx can await before mounting.
 *
 * Why: pages are prerendered, and createRoot replaces #root wholesale. With a
 * plain lazy() route, React's first commit is the Suspense fallback (a blank
 * full-screen cover), so the prerendered hero vanishes until the route chunk
 * arrives and paints again. Lighthouse counted that second paint as the LCP:
 * /pricing measured LCP 4.4 s against an FCP of 2.0 s.
 *
 * Once preload() has resolved, the component renders the module directly and
 * never suspends, so the first commit swaps the static markup for the same
 * markup. Before that it behaves exactly like lazy().
 */
export type LazyRoute<P> = ComponentType<P> & { preload: () => Promise<void> };

export function lazyRoute<P extends object>(
  load: () => Promise<{ default: ComponentType<P> }>,
): LazyRoute<P> {
  let loaded: ComponentType<P> | undefined;
  const fetchModule = () =>
    load().then((m) => {
      loaded = m.default;
      return m;
    });
  const Lazy = lazy(fetchModule);
  const Route = ((props: P) =>
    loaded ? createElement(loaded, props) : createElement(Lazy, props)) as LazyRoute<P>;
  Route.preload = () => fetchModule().then(() => undefined);
  return Route;
}
