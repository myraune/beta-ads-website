/**
 * BUILD-TIME ONLY. Do not import this from application code.
 *
 * blogPosts.ts loads the four localized content files as dynamic imports so a
 * reader only downloads the language they are reading. That is right for the
 * browser, but the build scripts need every post at once: generate-sitemap.mjs,
 * generate-seo-pages.mjs and prerender.mjs enumerate slugs to produce sitemap
 * entries, static shells and prerendered HTML.
 *
 * Evaluating blogPosts.ts alone now yields English posts only, which silently
 * dropped 51 localized posts out of the sitemap and left them without shells.
 * This module statically imports every locale so those scripts see the full set.
 *
 * Because no component imports it, Vite never bundles it and the runtime split
 * is unaffected.
 */
import { blogPosts, filterPublished, type BlogPost } from "./blogPosts";
import { posts_no } from "./blog/posts-no";
import { posts_sv } from "./blog/posts-sv";
import { posts_da } from "./blog/posts-da";
import { posts_fi } from "./blog/posts-fi";

export const blogPostsAll: BlogPost[] = [
  ...blogPosts,
  ...filterPublished([...posts_no, ...posts_sv, ...posts_da, ...posts_fi]),
];
