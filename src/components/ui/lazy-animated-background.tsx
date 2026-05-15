/**
 * Lazy wrapper for AnimatedShaderBackground.
 * Three.js (~488 kB) loads only when this component mounts, keeping it
 * out of the initial page bundle for all hero sections.
 */
import React, { lazy, Suspense } from "react";

const Inner = lazy(() => import("./animated-shader-background"));

const LazyAnimatedBackground: React.FC<{ heightFactor?: number }> = (props) => (
  <Suspense fallback={null}>
    <Inner {...props} />
  </Suspense>
);

export default LazyAnimatedBackground;
