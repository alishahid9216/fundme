# Header Specification

## Overview
- **Target file:** `src/components/Header.tsx`
- **Interaction model:** Scroll-driven elevation + click-driven dropdowns / mobile drawer

## Computed Styles (getComputedStyle)
- **Height**: 80px
- **Background**: `#ffffff`
- **Border-bottom**: `1px solid #e5e7eb` (or `#f3f4f6`)
- **Scrolled Shadow**: `0 2px 8px rgba(0, 0, 0, 0.06)`
- **Z-Index**: 50 (sticky)

## Children
1. **Search**: Pill button with search icon and "Search" label
2. **Nav Links**: "Donate ⌵", "Fundraise ⌵", "Giving Funds" (with purple badge `NEW`)
3. **Logo**: Centered brand logo `#005e3a`
4. **Right Actions**: "About ⌵", Bell icon with notification count `2`, "Sign in", "Start a GoFundMe" CTA button (`#024731`)
