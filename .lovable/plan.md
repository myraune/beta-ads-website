

# Plan: Fix Blog Post Markdown Table Rendering

## Issue Identified

Markdown tables in blog posts are rendering as raw pipe-separated text instead of proper HTML tables.

Example of broken rendering:
```
| Metric | Goal | Achieved |
|--------|------|----------|
| Unique Viewers | 2M | 2.5M |
```

This affects:
- Samsung Twitch Campaign Case Study
- Kick Streaming Growth 2025
- Top Streamers 2025
- Esports Viewership 2025
- Non-Gaming Content on Twitch 2025
- All other posts with tables

## Root Cause

The `react-markdown` package (v10.1.0) does not parse GitHub Flavored Markdown features like **tables** by default. It requires the `remark-gfm` plugin.

## Solution

### Step 1: Install remark-gfm

Add the `remark-gfm` package to the project dependencies.

### Step 2: Update BlogPost.tsx

Import and configure the plugin in the ReactMarkdown component:

```tsx
import remarkGfm from 'remark-gfm';

<ReactMarkdown remarkPlugins={[remarkGfm]}>
```

## Files to Modify

| File | Change |
|------|--------|
| package.json | Add `remark-gfm` dependency |
| src/pages/BlogPost.tsx | Import `remarkGfm` and add to `remarkPlugins` prop |

## Expected Result

After this fix:
- All markdown tables render as proper HTML tables
- Tables will use the existing custom styling defined in the component
- Posts like Kick Streaming Growth 2025 and Top Streamers 2025 will display data correctly

## Technical Details

The BlogPost.tsx component already has custom table styling configured (lines 218-234), so once the plugin is added, the tables will automatically use these styles.

