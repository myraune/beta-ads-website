// Adds `aria-hidden="true"` to decorative SVGs and decorative <video> elements.
//
// lucide-react v0.462 renders <svg class="lucide ..."> with no ARIA attributes,
// and the codebase has many hand-rolled inline <svg> icons that are equally
// unlabeled. AudioEye flags every one as "SVG accessible name missing".
//
// Similarly, the marketing pages embed many muted, autoplay/loop product
// preview videos with no native `controls` attribute. AudioEye flags those as
// "Video control is missing". Since they convey no audio information and have
// no user-facing playback affordances, the correct fix is to mark them as
// decorative so assistive tech can skip them.
//
// We never override an element the author has explicitly labeled — aria-label,
// aria-labelledby, role="img", or a child <title> are all signals that the
// element is meaningful and should be exposed.

const SVG_SELECTOR = "svg";
const VIDEO_SELECTOR = "video";

function hideIfDecorativeSvg(svg: Element) {
  if (svg.hasAttribute("aria-hidden")) return;
  if (svg.hasAttribute("aria-label")) return;
  if (svg.hasAttribute("aria-labelledby")) return;
  if (svg.getAttribute("role") === "img") return;
  // <title> as the first child gives the SVG an accessible name.
  const firstEl = svg.firstElementChild;
  if (firstEl && firstEl.tagName.toLowerCase() === "title") return;
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
}

function hideIfDecorativeVideo(video: Element) {
  if (!(video instanceof HTMLVideoElement)) return;
  if (video.hasAttribute("aria-hidden")) return;
  if (video.hasAttribute("aria-label")) return;
  if (video.hasAttribute("aria-labelledby")) return;
  // If the author wired up native controls or a caption track, this video is
  // interactive content the user is meant to engage with — leave it alone.
  if (video.controls) return;
  if (video.querySelector("track")) return;
  // Only hide silent autoplay/loop previews. Audible videos may carry meaning.
  if (!video.muted) return;
  video.setAttribute("aria-hidden", "true");
  video.setAttribute("tabindex", "-1");
}

function processSubtree(root: ParentNode) {
  if (root instanceof Element) {
    if (root.matches(SVG_SELECTOR)) hideIfDecorativeSvg(root);
    if (root.matches(VIDEO_SELECTOR)) hideIfDecorativeVideo(root);
  }
  root.querySelectorAll(SVG_SELECTOR).forEach(hideIfDecorativeSvg);
  root.querySelectorAll(VIDEO_SELECTOR).forEach(hideIfDecorativeVideo);
}

let observer: MutationObserver | null = null;

export function installLucideA11yPatch() {
  if (typeof window === "undefined") return;
  if (observer) return; // already installed

  // Initial sweep over whatever is already in the DOM.
  processSubtree(document.body);

  // Watch for icons added later (route changes, modal opens, hover states).
  observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          processSubtree(node as Element);
        }
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
