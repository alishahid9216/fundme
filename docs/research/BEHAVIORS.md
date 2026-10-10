# GoFundMe Interactions & Behaviors

Extracted from live target: `https://www.gofundme.com/`

## 1. Header Scroll Behavior
- **Initial state (Scroll Y = 0)**: Transparent/White background, no elevation, "Start a GoFundMe" button has solid dark green background `#005e3a` or green border.
- **Scrolled state (Scroll Y > 20)**: Background stays crisp white `#ffffff`, bottom subtle border `#e5e7eb` and soft shadow `0 2px 8px rgba(0,0,0,0.06)`, z-index 50.

## 2. Interactive Step Navigation (How GoFundMe Works)
- **Mechanism**: Click or auto-cycle through steps 1, 2, 3.
- **Active state**: Green numbered ring indicator with progress arc, active step headline is bold and shows descriptive copy + link.
- **Graphic response**: Left interactive card updates to illustrate the active phase (e.g. Prompt creation, Social sharing icons, Direct deposit).

## 3. Fundraiser Cards Hover Effects
- **Card Hover**: Image slightly zooms (`scale-[1.02]`), subtle shadow elevates (`shadow-lg`), title color deepens.
- **Progress Bar**: Smooth CSS transition showing animated progress width and percentage.

## 4. Video Player Interaction
- **Play/Pause Toggle**: Clicking center play button or bottom control bar toggles playback state.
- **Volume & Fullscreen**: Responsive controls with tooltip feedback.

## 5. Responsive Behavior
- **Desktop (1280px+)**: Full 3-column & grid layouts, tilted 5-card arch in hero.
- **Tablet (768px - 1024px)**: 2-column card layouts, 3-card visible hero arch.
- **Mobile (< 768px)**: Stacked single column, horizontal scrollable cards, mobile navigation drawer.
