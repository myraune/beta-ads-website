/**
 * Hero player (from design 11/31): the real Samsung stream drawn into a canvas,
 * dimmed and slightly desaturated, with the overlay area spotlit and framed by
 * corner brackets. Plays the real clip only when motion is allowed; otherwise
 * the poster frame is drawn once and the page stays static.
 *
 * Returns { draw, destroy } so the page can redraw on theme change and clean up.
 */
export const HERO_POSTER = "/home/samsung-s25-stream-a.jpg";
export const HERO_VIDEO = "/home/samsung-s25-stream-a.mp4";

type G = { W: number; H: number; dx: number; dy: number; dw: number; dh: number; ox: number; oy: number; ow: number; oh: number };

export function startHeroPlayer(
  canvas: HTMLCanvasElement,
  frame: HTMLElement,
  video: HTMLVideoElement,
  motion: boolean,
) {
  const ctx = canvas.getContext("2d");
  const off = document.createElement("canvas");
  const octx = off.getContext("2d");
  if (!ctx || !octx) return { draw: () => {}, destroy: () => {} };

  const poster = new Image();
  poster.src = HERO_POSTER;
  const SRC_W = 1280, SRC_H = 720;
  const OV = { x: 62, y: 398, w: 280, h: 262 }; // overlay (badge + phones) in the source frame
  let g: G | null = null;
  let alive = true;

  const source = (): CanvasImageSource | null =>
    motion && video.readyState >= 2 ? video : poster.complete && poster.naturalWidth ? poster : null;

  const draw = () => {
    const src = source();
    if (!src || !g) return;
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(src, g.dx, g.dy, g.dw, g.dh);
    ctx.globalCompositeOperation = "saturation";
    ctx.fillStyle = "rgba(128,128,128,.4)";
    ctx.fillRect(0, 0, g.W, g.H);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(6,6,8,.42)";
    ctx.fillRect(0, 0, g.W, g.H);
    octx.globalCompositeOperation = "source-over";
    octx.clearRect(0, 0, g.W, g.H);
    octx.drawImage(src, g.dx, g.dy, g.dw, g.dh);
    octx.globalCompositeOperation = "destination-in";
    const cx = g.ox + g.ow * 0.55, cy = g.oy + g.oh * 0.56, rx = g.ow * 0.6, ry = g.oh * 0.52;
    octx.save();
    octx.translate(cx, cy);
    octx.scale(1, ry / rx);
    const grd = octx.createRadialGradient(0, 0, rx * 0.62, 0, 0, rx);
    grd.addColorStop(0, "rgba(0,0,0,1)");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    octx.fillStyle = grd;
    octx.fillRect(-rx, -rx, rx * 2, rx * 2);
    octx.restore();
    ctx.drawImage(off, 0, 0);
  };

  const layout = () => {
    const r = canvas.getBoundingClientRect();
    if (!r.width) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(r.width * dpr);
    canvas.height = Math.round(r.height * dpr);
    off.width = canvas.width;
    off.height = canvas.height;
    const W = canvas.width, H = canvas.height, phone = r.width < 600;
    let dw = phone ? W * 1.9 : W * 1.24, dh = (dw * SRC_H) / SRC_W;
    if (dh < H) { dh = H * 1.04; dw = (dh * SRC_W) / SRC_H; }
    const dx = phone ? -W * 0.03 : -W * 0.012, k = dw / SRC_W;
    const dy = Math.min(0, Math.max(H - dh, H * 0.9 - 660 * k));
    g = { W, H, dx, dy, dw, dh, ox: dx + OV.x * k, oy: dy + OV.y * k, ow: OV.w * k, oh: OV.h * k };
    const pad = 10 * dpr;
    frame.style.left = (g.ox - pad) / dpr + "px";
    frame.style.top = (g.oy - pad) / dpr + "px";
    frame.style.width = (g.ow + pad * 2) / dpr + "px";
    frame.style.height = Math.min(g.oh + pad * 2, H - g.oy + pad - 8 * dpr) / dpr + "px";
    draw();
  };

  poster.onload = () => { if (alive && g) draw(); };
  window.addEventListener("resize", layout);
  layout();

  let running = false;
  const v = video as HTMLVideoElement & { requestVideoFrameCallback?: (cb: () => void) => number };
  const loop = () => {
    if (!alive) return;
    draw();
    if (v.requestVideoFrameCallback) v.requestVideoFrameCallback(loop);
    else requestAnimationFrame(loop);
  };
  const onPlaying = () => { if (!running) { running = true; loop(); } };
  if (motion) {
    video.addEventListener("playing", onPlaying);
    video.muted = true;
    video.play().catch(() => {});
  }

  return {
    draw,
    destroy: () => {
      alive = false;
      window.removeEventListener("resize", layout);
      video.removeEventListener("playing", onPlaying);
      poster.onload = null;
    },
  };
}
