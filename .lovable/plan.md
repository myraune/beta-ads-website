

# Fix Rough Hover Transitions on Cards

## Problem
The "Our Work", "Featured in Press", and "Ad Formats" cards all use `transition-all`, which transitions every CSS property on hover -- including backdrop-filter, border-radius, and layout properties that should not animate. This causes visible jank and a "rough" feel.

## Solution
Replace `transition-all` with targeted transition properties on each component, so only shadow, background-color, and opacity actually animate on hover.

## Changes

### 1. CaseStudiesSection.tsx (Our Work)
- Card wrapper (line 49): Replace `transition-all duration-500` with `transition-[box-shadow,background-color] duration-500`
- Section wrapper (line 97): Replace `transition-all duration-700` with `transition-[opacity,transform] duration-700`

### 2. Press.tsx (Featured in Press)
- Card outer div (line 53): Replace `transition-all duration-500` with `transition-[box-shadow,background-color] duration-500`
- Hover overlay (line 66): Replace `transition-all duration-500` with `transition-opacity duration-500`

### 3. AdFormatsCarousel.tsx (Ad Formats)
- Card wrapper (line 63): Replace `transition-all duration-300` with `transition-[box-shadow,background-color] duration-300`
- Section wrapper (line 101): Replace `transition-all duration-700` with `transition-[opacity,transform] duration-700`

## Why this works
`transition-all` forces the browser to check and interpolate every animatable property on each frame. By scoping to only `box-shadow` and `background-color` (the properties that actually change on hover), the browser does far less work, resulting in smooth, instant-feeling interactions.

