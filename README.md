<div align="center">

# ARTISANA

*A cinematic artisan portfolio — where craft becomes art.*

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=for-the-badge&logo=google&logoColor=white) ![Status](https://img.shields.io/badge/Status-Live-B85C38?style=for-the-badge) ![Design](https://img.shields.io/badge/Design-Cinematic-1E1208?style=for-the-badge)

[View Live Demo](#) · [Report Bug](#) · [Request Feature](#)

---

</div>

## ✦ The Philosophy Behind This Project

> *"Most portfolio websites present craft as a catalogue. 
> Artisana presents it as a living story — one that begins 
> before the first scroll and continues long after 
> the piece has found its home."*

Traditional artisan portfolios are flat image grids with generic product names. They communicate nothing about the maker's identity, process, or philosophy. Artisana was built to close that gap — turning a portfolio into a cinematic journey that converts visitors into genuine enquiries.

Every design decision in this project was made with one question in mind: does this feel like it was made by hand? The warm ivory color system, the Cormorant Garamond typography, the draggable process carousel, the custom cursor — each detail communicates craft before a single product is seen.

## 🎬 Live Experience

### Demo
> 🔗 **[Live Site →](#)** *(replace with actual deployed URL)*

### Preview

<div align="center">

| Hero — Split Screen | Craft DNA Scanner |
|---|---|
| ![Hero](./screenshots/hero.png) | ![DNA](./screenshots/dna.png) |

| Gallery — Bento Grid | Piece Memory Page |
|---|---|
| ![Gallery](./screenshots/gallery.png) | ![Memory](./screenshots/memory.png) |

</div>

> *Screenshots stored in `/screenshots/` directory. Run locally or visit the live demo to see all animations in full.*

## ✨ Features

### Core Portfolio Experience

- [x] **Cinematic 3-Panel Split Hero** — Portrait · Text · Craft image. Black & white artisan portrait with hover color reveal.
- [x] **Glassmorphism Navbar** — Transparent on hero, frosted blur on scroll with smooth transition.
- [x] **Custom Dual Cursor** — Terracotta dot with lagging ring. Transforms on hover states and carousel drag mode.
- [x] **Animated Preloader** — Letter-by-letter stagger reveal with percentage counter and full-screen wipe exit.
- [x] **Scroll Progress Bar** — Thin terracotta line tracking read progress across the full page.
- [x] **Draggable Process Carousel** — Touch and mouse drag support with live progress bar indicator.
- [x] **Bento Gallery Grid** — 12-column editorial grid layout with category filters and fullscreen modal.
- [x] **Editorial Story Blocks** — Alternating image + prose layout with emotional product descriptions.
- [x] **Grain Texture Overlay** — SVG fractal noise fixed layer for subconscious premium feel.
- [x] **Testimonial Auto-Slider** — 5-card carousel with dot navigation and hover-pause.
- [x] **Floating WhatsApp Button** — Pulsing ring animation with reveal label on hover. Direct enquiry link.
- [x] **Animated Contact Form** — Floating labels, validation, success state. Zero backend required.
- [x] **Scroll Reveal System** — IntersectionObserver-powered fade + slide animations on all sections.
- [x] **Marquee Ticker** — Infinite scrolling craft category strip with hover-pause.
- [x] **Fully Responsive** — Mobile-first design, tested at 375px, 768px, 1024px, 1440px.

### Three Unique Features (Never Seen Before in Artisan Portfolios)

#### 1. 🕐 The Waiting Room
> *A live commission availability board — like a Hermès waitlist made visual.*

- Shows 5 commission slots with real-time visual status (in-progress vs available)
- Hovering a taken slot reveals the piece being made and its origin city — anonymously
- Available slots open a waitlist form modal with craft type, timeline, and brief — goes straight to artisan

#### 2. 🧬 Craft DNA Scanner
> *A 5-question poetic personality quiz that matches you to the piece made for someone exactly like you.*

- Questions are emotional, not transactional: "What time of day do you feel most like yourself?"
- Scoring engine maps answers across 4 craft types (pottery, jewelry, painting, textile) and reveals a result
- Result screen shows your matched piece, your "craft archetype" identity, and a direct WhatsApp enquiry pre-filled with your match

#### 3. 📜 The Piece's Journey
> *Every sold piece receives a permanent digital provenance page — accessible by a QR code given to its owner.*

- Each piece's memory page shows: date made, time started, weather that morning, material origin, artisan's personal note
- Lives at `/piece/:id` — a standalone route separate from the portfolio, designed to feel like opening a handwritten letter
- The physical object and its digital soul are permanently linked. A purchase becomes a living heirloom.

#### 4. 🏺 The Apprentice — A Living Craft Companion
> *Not a chatbot. A small clay figure that came alive — who walks you through the studio like an actual visit.*

- **A character, not a window.** The Apprentice idles, breathes, waves, thinks, and walks across the screen.
- **Press-and-hold to talk.** No mic button — hold the Apprentice itself like a walkie-talkie. Release to send. It speaks back in a warm voice while showing captions.
- **Guided Tours (CoC-style).** Ask "explain one of your best pieces" and the Apprentice dims the page, spotlights the exact gallery item with a glowing cutout, walks over, and explains it — then moves to the next relevant section automatically.
- **Teaches, doesn't just answer.** Ask "how do I commission a piece" and the Apprentice spotlights the Waiting Room, points at an open slot, then walks you to the contact form — narrating each step like an in-person studio visit.

**Animation Engineering (Duolingo-Craft Polish):**
- **Composable Pose Library:** Data-attribute driven CSS architecture (`data-pose="walking"`) completely decouples animation logic from complex React states.
- **Idle Variations:** The character doesn't just loop one animation. It periodically cycles through subtle life-like idles (stretching, adjusting its head, settling).
- **Proximity Eye Tracking:** Sub-pixel calculations enable the Apprentice's eyes (complete with catch-light highlights) to track the user's cursor when within a 150px radius.
- **Micro-Reactions:** Contextual awareness triggers emotional states without user prompts. E.g., lingering on a gallery item triggers a *Curious* lean; completing the Craft DNA triggers *Quiet Pride*; entering the Unseen Hours journal triggers a *Hushed* state.
- **Anticipation & Follow-through:** Movement uses classic animation principles, winding up before acting (squash/anticipation) and overshooting slightly upon arrival.

**Character Design:**
A small hand-thrown clay figurine — head, torso, arms with rounded hands, legs with flat feet, all built in pure CSS with no image assets. Subtle asymmetric shapes mirror the "no two pieces alike" philosophy of the studio itself. Faint pottery-wheel throwing lines texture the torso. A hidden smile (SVG line-draw animation) appears only when the Apprentice speaks or greets — restrained, not cartoonish.

**Interaction fix:**
The chat/voice panel opens on click (not hover) and stays open via persistent state — solving the "panel disappears while moving to type" issue entirely. Closes on outside click, ESC, re-click, or when a guided tour begins.

*Tech: Web Speech API (SpeechRecognition + SpeechSynthesis, zero packages), Gemini API returns structured JSON tour scripts for navigational queries, SVG masking for the spotlight dimming effect, character built entirely in CSS (no image assets).*

## 🎨 Design System

### Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary Background | Warm Ivory | `#FAF7F2` | Default page bg |
| Secondary Background | Linen | `#F2EBE0` | Section alternation |
| Card Background | Parchment | `#EDE3D4` | Cards, modals, inputs |
| Dark Background | Deep Walnut | `#1E1208` | Hero, process, contact |
| Primary Text | Espresso Brown | `#2C1A0E` | All headings & body |
| Secondary Text | Warm Umber | `#6B4F3A` | Subtitles, paragraphs |
| Muted Text | Dusty Clay | `#9C836A` | Captions, labels |
| Primary Accent | Terracotta | `#B85C38` | CTAs, highlights, cursor |
| Secondary Accent | Raw Copper | `#A0672A` | Icons, dividers, tags |
| Soft Accent | Warm Sand | `#D4A97A` | Hover states, card borders |
| Borders | Oat | `#DDD0BC` | All dividers and edges |
| Dark Text | Cream | `#F5EFE6` | Text on dark backgrounds |

### Typography

| Font | Role | Weights | Used For |
|------|------|---------|----------|
| Cormorant Garamond | Display / Headings | 300, 400, 500, 600, Italic | All H1–H4, quotes, large numbers |
| Jost | Body / UI | 300, 400, 500, 600 | Body text, labels, buttons, nav |
| Instrument Serif | Accent Italic | Italic only | Testimonial quotes, accent phrases |

> *Font selection rationale: Cormorant Garamond brings old-world elegance with modern refinement — used by high-end publication design and luxury brand sites. Jost provides clean geometric structure for UI elements. Instrument Serif adds personality to emotional accent moments without overusing decorative type.*

### Spacing & Layout

All spacing uses CSS `clamp()` for fluid scaling between mobile and desktop. Base unit: 8px. Max content width: 1320px. Section padding: `clamp(80px, 10vw, 140px)`. No fixed pixel breakpoints for spacing — everything breathes proportionally.

## 🛠 Tech Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| React | UI framework, component architecture | 18+ |
| React Router DOM | Client-side routing (`/piece/:id`) | 6+ |
| CSS3 Custom Properties | Design token system, all styling | Native |
| CSS Animations & Keyframes | Preloader, marquee, cursor, pulses | Native |
| IntersectionObserver API | Scroll reveal animations | Native |
| CSS clamp() | Fluid responsive spacing & typography | Native |
| Unsplash (direct URLs) | All photography, no API key | Free |
| Google Fonts | Cormorant Garamond, Jost, Instrument Serif | Free |
| Shields.io | README badges | Free |

> **No build complexity.** No TypeScript (kept lean for speed). No CSS framework (full custom design system). No external animation library (pure CSS + RAF). Every animation is hand-written for performance and precision.

## 📁 Project Structure

```
artisana/
├── public/
│   └── index.html              # Root HTML, Google Fonts loaded here
│
├── screenshots/                # README preview images
│   ├── hero.png
│   ├── dna.png
│   ├── gallery.png
│   └── memory.png
│
├── src/
│   ├── App.jsx                 # Root component, React Router setup
│   │
│   ├── components/             # All UI components
│   │   ├── Preloader.jsx       # Loading animation sequence
│   │   ├── Cursor.jsx          # Custom dual cursor (dot + ring)
│   │   ├── Navbar.jsx          # Nav + hamburger + mobile overlay
│   │   ├── Hero.jsx            # 3-panel split hero orchestrator
│   │   │   ├── HeroPortrait.jsx    # Left: artisan BW portrait
│   │   │   ├── HeroText.jsx        # Center: headline + CTAs
│   │   │   └── HeroCraft.jsx       # Right: craft image + cards
│   │   ├── Marquee.jsx         # Infinite scrolling craft ticker
│   │   ├── About.jsx           # Artisan story + stats grid
│   │   ├── Process.jsx         # Drag carousel — 4 craft steps
│   │   ├── WaitingRoom.jsx     # ★ Feature 1: Commission board
│   │   ├── Gallery.jsx         # Bento grid + category filters
│   │   ├── GalleryModal.jsx    # Fullscreen piece preview
│   │   ├── Stories.jsx         # Editorial story blocks (3 pieces)
│   │   ├── CraftDNA.jsx        # ★ Feature 2: Personality quiz
│   │   ├── Philosophy.jsx      # 3-pillar craft belief section
│   │   ├── PieceJourney.jsx    # ★ Feature 3: Provenance showcase
│   │   ├── PieceMemory.jsx     # ★ Feature 3: Standalone /piece/:id
│   │   ├── Testimonials.jsx    # Auto-sliding review cards
│   │   ├── Contact.jsx         # Animated form + details
│   │   ├── Footer.jsx          # Brand footer + navigation
│   │   └── WhatsApp.jsx        # Floating enquiry button
│   │
│   ├── data/                   # All static content as JS modules
│   │   ├── galleryItems.js     # 8 portfolio pieces with metadata
│   │   ├── processSteps.js     # 4-step craft process data
│   │   ├── testimonials.js     # 5 customer testimonials
│   │   ├── stories.js          # 3 featured editorial pieces
│   │   ├── waitingRoomData.js  # Commission queue + slot config
│   │   ├── craftDNAData.js     # Quiz questions + scoring logic
│   │   └── pieceJourneyData.js # 3 sold pieces provenance records
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useScrollProgress.js      # Page scroll % tracking
│   │   ├── useIntersectionObserver.js # Scroll reveal (.rv system)
│   │   └── useCursor.js              # Cursor position + RAF loop
│   │
│   └── styles/
│       └── main.css            # Full design system (~1200 lines)
│                               # CSS custom properties at :root
│                               # All component styles
│                               # All animations & keyframes
│                               # All responsive breakpoints
│
├── package.json
├── .gitignore
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

```bash
node >= 16.0.0
npm >= 8.0.0
```

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/artisana.git

# Navigate into the project
cd artisana

# Install dependencies
npm install

# Start the development server
npm run dev
# or
npm start
```

The site will open at `http://localhost:3000`

### Build for Production

```bash
# Create optimised production build
npm run build

# Preview the production build locally
npm run preview
```

### Navigate the Unique Features

| Feature | How to access |
|---------|---------------|
| Waiting Room | Scroll past the Process carousel section |
| Craft DNA Scanner | Scroll past the Stories section, click "Discover Your Piece →" |
| Piece Journey | Scroll past the Philosophy section |
| Piece Memory Page | Click "View Memory Page →" on any piece card, or visit `/piece/AM-001` directly |

> **No environment variables required.** No API keys. No `.env` file needed. The project runs entirely with static data and free CDN resources.

## 🌟 Three Features Nobody Else Has

*These are not standard portfolio features. They were designed from scratch to solve three specific problems that no artisan website currently addresses.*

---

### 🕐 Feature 1 — The Waiting Room
**The Problem:** Artisan websites show available work but give no signal of demand, exclusivity, or process timeline. Visitors browse and leave without understanding the true nature of commission work.

**The Solution:** A live commission board showing exactly how many slots are available this month, what is currently being made (anonymously), and how long the wait would be. Like a sushi counter or a Hermès appointment — scarcity becomes visible, and that visibility creates desire.

**User Flow:**
1. Visitor sees the board — 3 taken slots + 2 available
2. Hovering a taken slot reveals the piece name + origin city
3. Clicking an available slot opens a waitlist form
4. Form captures: name, email, craft type, vision brief, timeline
5. On submit: confirmation with a reference number (SLOT-004)

---

### 🧬 Feature 2 — Craft DNA Scanner
**The Problem:** Most visitors browse a gallery and leave without finding personal relevance. They see beautiful work but don't know which piece is *for them*. Generic galleries create aesthetic appreciation but not emotional connection.

**The Solution:** A 5-question diagnostic that asks about feelings, not products. Questions like "What time of day do you feel most like yourself?" and "What do you want an object to do for you?" map to a scoring engine that matches the visitor to a specific piece — with a personalised description of why it was made for someone exactly like them.

**User Flow:**
1. Intro screen with 4 preview craft images — click "Discover Your Piece →"
2. 5 questions, one at a time, with smooth transition animation
3. "Calculating..." screen (2 seconds) with loading bar
4. Result: matched piece + headline + archetype identity + enquiry CTA
5. WhatsApp link pre-filled: *"My Craft DNA result was Pottery and I'd like to enquire about Morning Calm."*

---

### 📜 Feature 3 — The Piece's Journey
**The Problem:** When someone buys a handmade piece, the story of its making disappears. The object exists. The memory of creating it does not travel with it. There is no record, no provenance, no connection between the maker and the keeper.

**The Solution:** Every sold piece gets a permanent page at `/piece/:id` — accessible via a QR code printed and given with the piece. The page shows: date and time made, weather that morning, material origin, firing process, a mid-process photograph, and the artisan's personal handwritten note to the owner.

**User Flow:**
1. Owner scans QR code on the packaging
2. Browser opens `/piece/AM-001`
3. Standalone page loads — quiet, cinematic, letter-like
4. Full provenance record + artisan note in italic Cormorant
5. "← View Portfolio" link if they want to explore more

## ⚡ Performance & Accessibility

### Performance Decisions

- **No animation library** — All animations are CSS keyframes or `requestAnimationFrame` — zero library overhead
- **Lazy images** — All `<img>` tags below the fold use `loading="lazy"` with explicit `width` and `height`
- **Font preconnect** — Google Fonts loaded with `preconnect` hints to eliminate render-blocking
- **CSS custom properties** — Single source of truth for all design tokens — no repeated values, easy to maintain
- **IntersectionObserver** — Used instead of scroll listeners for reveal animations — far better performance at scale
- **clamp() everywhere** — Eliminates most breakpoint-specific overrides — fewer CSS rules, faster paint
- **Static data** — No API calls on page load — everything renders immediately from JS data files

### Accessibility Decisions

- All images have descriptive `alt` text
- All interactive elements have `aria-label` attributes
- Keyboard navigation supported: `Escape` closes all modals
- Custom cursor hidden on touch devices (`@media (hover: none)`) with `cursor: auto` restored
- `body.locked` prevents scroll trap on open modals
- Color contrast ratios meet WCAG AA for all text on their respective backgrounds
- Decorative elements use `aria-hidden="true"`
- Form inputs all have associated `<label>` elements

## 🗺 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `MainPortfolio` | Full portfolio — all sections in sequence |
| `/piece/AM-001` | `PieceMemory` | Morning Calm provenance record |
| `/piece/AM-002` | `PieceMemory` | Ember Ring provenance record |
| `/piece/AM-003` | `PieceMemory` | Rainy Season provenance record |
| `/piece/:id` | `PieceMemory` | Any piece by ID (graceful 404 if not found) |

> All routes are client-side via React Router. For deployment, configure your host to redirect all routes to `index.html` (standard SPA setup).
> 
> **Vercel:** Works automatically.  
> **Netlify:** Add a `_redirects` file: `/* /index.html 200`  
> **GitHub Pages:** Add a `404.html` redirect.

## 📐 Full Page Structure

1. 🎬 **Preloader** — Letter stagger + counter + full-screen wipe
2. 🧭 **Navbar** — Transparent → frosted glass on scroll
3. 🖼 **Hero** — 3-panel: BW portrait · headline · craft image
4. 📢 **Marquee** — Infinite craft category ticker (terracotta)
5. 📖 **About** — Artisan story, timeline, 4-stat grid
6. ⚙️ **Process** — Draggable 4-step craft carousel
7. ⭐ **The Waiting Room** — Commission slots board + waitlist
8. 🖼 **Gallery** — Bento grid + filters + fullscreen modal
9. ✍️ **Stories** — 3 editorial piece stories, alternating layout
10. ⭐ **Craft DNA Scanner** — 5-question personality → piece match
11. 🌿 **Philosophy** — 3 craft pillars + closing quote
12. ⭐ **The Piece's Journey** — Provenance cards + QR codes
13. 💬 **Testimonials** — 5-card auto-slider
14. 📬 **Contact** — Animated form + studio details
15. 🏷 **Footer** — Brand wordmark + navigation + social

*⭐ marks the three features unique to this portfolio*

## 🌐 Deployment

### Deploy to Vercel (Recommended — 2 minutes)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project root
vercel

# Follow prompts — defaults work for React projects
# Your site will be live at https://artisana.vercel.app
```

### Deploy to Netlify

```bash
# Build the project
npm run build

# Drag and drop the /build folder to netlify.com/drop
# OR connect your GitHub repository for auto-deploy
```

Important: add a `_redirects` file in `/public`:
```
/* /index.html 200
```
This ensures `/piece/:id` routes work correctly.

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"

npm run deploy
```

Note: add a `homepage` field to `package.json`:
```json
"homepage": "https://yourusername.github.io/artisana"
```

## 🔧 Customizing for a Real Artisan

> *This project is built to be handed to a real artisan or adapted for a real studio. Here's exactly what to change.*

| What to change | Where to find it | What to update |
|----------------|-----------------|----------------|
| Artisan name / brand | `src/components/Navbar.jsx`, `Footer.jsx` | Replace "ARTISANA" |
| Hero portrait image | `src/components/HeroPortrait.jsx` | Replace Unsplash URL with real photo |
| Hero craft image | `src/components/HeroCraft.jsx` | Replace Unsplash URL |
| About text & story | `src/components/About.jsx` | Edit paragraphs directly |
| Timeline milestones | `src/data/galleryItems.js` | Edit year/title/desc array |
| Gallery pieces | `src/data/galleryItems.js` | Replace images + metadata |
| Commission slots | `src/data/waitingRoomData.js` | Update taken/available counts |
| Craft DNA results | `src/data/craftDNAData.js` | Replace piece names + images |
| Sold piece records | `src/data/pieceJourneyData.js` | Add real provenance data |
| WhatsApp number | All `wa.me/` links | Replace `919999999999` |
| Contact details | `src/components/Contact.jsx` | Update email, phone, city |
| Color accent | `src/styles/main.css` | Change `--terra` and `--sand` |
| Social links | `Footer.jsx`, `Contact.jsx` | Add real profile URLs |

## 🔭 Future Scope

### What could be added next

- [ ] **Backend integration** — Replace mock commission data with a real CMS (Sanity, Contentful) so slot counts update in real time
- [ ] **Real QR code generation** — Use `qrcode.react` library to generate functional QR codes for each piece
- [ ] **Email notifications** — Connect waitlist form to Resend or EmailJS for instant artisan notification
- [ ] **Admin panel** — Simple password-protected page to update commission slot availability
- [ ] **Piece registry expansion** — Add more sold pieces to the provenance database over time
- [ ] **Ambient sound toggle** — Optional background pottery wheel / studio sound
- [ ] **Dark/light mode** — Toggle between walnut-dominant and cream-dominant color scheme

## 🏆 Hackathon Context

This project was built as a hackathon submission under the theme of **premium artisan digital presence**. The brief was to create a portfolio website that does what no artisan portfolio currently does — communicate process, identity, and philosophy with the same level of care that goes into the physical craft itself.

Three features were conceived specifically for this context: The Waiting Room, The Craft DNA Scanner, and The Piece's Journey. None of these features exist on any artisan portfolio website today. Each one was designed to solve a real conversion or connection problem that artisans face when selling their work online.

> *"The goal was not to build a website about craft. The goal was to build a website that is itself an act of craft."*

## 📄 License

MIT License — Free to use, modify, and distribute. See [LICENSE](file:///e:/Vanji/artisana-—-handcrafted-with-soul/LICENSE) file for details.

## 🙏 Credits & Attributions

- **Photography** — [Unsplash](https://unsplash.com) (free, no attribution required but credited here)
- **Typography** — [Google Fonts](https://fonts.google.com) — Cormorant Garamond, Jost, Instrument Serif
- **Badges** — [Shields.io](https://shields.io)
- **Icons** — CSS symbols and Unicode characters (no library)
- **Design Inspiration** — High-end editorial design, craft studio aesthetics, luxury brand digital presence

---

<div align="center">

<br/>

**ARTISANA**

*Handcrafted with intention. Built with the same care.*

<br/>

Made with ♥ · Chennai, India · 2024

<br/>

[⬆ Back to top](#artisana)

</div>
