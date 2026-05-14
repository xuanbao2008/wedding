# Wedding Website - Context Document

**Project Name:** Bao Thao Wedding  
**Repository Path:** /Users/dothao/wedding  
**Last Updated:** May 14, 2026  
**Purpose:** Wedding invitation website for Đoàn Xuân Bảo & Đỗ Thị Thảo

---

## Project Overview

This is a Next.js 16 wedding invitation website built with React 19, TypeScript, and Tailwind CSS. The site features multiple location pages (Hải Phòng and Sài Gòn) for wedding events scheduled in June 2026.

**Wedding Details:**
- **Couple:** Đoàn Xuân Bảo & Đỗ Thị Thảo
- **Main Wedding:** Hải Phòng - 05-06/06/2026
- **Celebration:** Sài Gòn - 13/06/2026
- **Theme:** Soft pink/rose palette with elegant typography

---

## Technology Stack

### Core Framework
- **Next.js:** 16.2.4 (App Router)
- **React:** 19
- **TypeScript:** 5.7.3

### Styling
- **Tailwind CSS:** 4.2.0
- **shadcn/ui:** New York style component library
- **Framer Motion:** 12.38.0 (animations)
- **next-themes:** 0.4.6 (theme support)

### Key Dependencies
- **Lucide React:** 0.564.0 (icons)
- **date-fns:** 4.1.0 (date handling)
- **react-hook-form:** 7.54.1 (form management)
- **@hookform/resolvers:** 3.9.1
- **zod:** 3.24.1 (validation)
- **@vercel/analytics:** 1.6.1 (analytics)

### UI Components (shadcn/ui)
- 57 UI components including: button, card, dialog, input, checkbox, etc.
- Custom wedding-specific components in `/components/wedding/`

---

## Project Structure

```
/Users/dothao/wedding/
├── app/
│   ├── globals.css          # Global styles with custom CSS variables
│   ├── layout.tsx           # Root layout with fonts and metadata
│   ├── page.tsx             # Landing page with location selection
│   ├── hai-phong/
│   │   └── page.tsx         # Hải Phòng wedding page
│   └── sai-gon/
│       └── page.tsx         # Sài Gòn celebration page
├── components/
│   ├── theme-provider.tsx  # Theme context provider
│   ├── ui/                  # shadcn/ui components (57 files)
│   └── wedding/             # Custom wedding components (10 files)
│       ├── navigation.tsx
│       ├── hero.tsx
│       ├── couple.tsx
│       ├── countdown.tsx
│       ├── events-section.tsx
│       ├── rsvp.tsx
│       ├── gift-box.tsx
│       ├── gallery.tsx
│       ├── love-story.tsx
│       └── footer.tsx
├── hooks/
│   ├── use-mobile.ts        # Mobile detection hook
│   └── use-toast.ts        # Toast notification hook
├── lib/
│   └── utils.ts             # Utility functions (cn helper)
├── public/                  # Static assets (icons, images)
├── styles/
│   └── globals.css          # Additional global styles
├── package.json
├── next.config.mjs
├── tsconfig.json
├── components.json
└── README.md
```

---

## Configuration Files

### package.json
- **Name:** my-project
- **Version:** 0.1.0
- **Scripts:** dev, build, start, lint
- **Package Manager:** pnpm (based on pnpm-lock.yaml presence)

### next.config.mjs
- **TypeScript:** ignoreBuildErrors: true
- **Images:** unoptimized: true
- **Remote Patterns:** i.postimg.cc (for external images)

### tsconfig.json
- **Target:** ES6
- **Module:** esnext
- **Path Alias:** @/* maps to ./*
- **Strict Mode:** enabled

### components.json
- **Style:** new-york
- **RSC:** true
- **Base Color:** neutral
- **CSS Variables:** enabled
- **Icon Library:** lucide

---

## Page Routes

### `/` - Landing Page
- **File:** `app/page.tsx`
- **Purpose:** Location selection page
- **Features:**
  - Animated hearts background
  - Couple photo display
  - Location cards for Hải Phòng and Sài Gòn
  - Links to respective location pages

### `/hai-phong` - Hải Phòng Wedding Page
- **File:** `app/hai-phong/page.tsx`
- **Events:**
  - Tiệc Cưới Tối: 05/06/2026 at 19:00
  - Tiệc Cưới Trưa: 06/06/2026 at 12:00
- **Location:** Thôn Linh Đông 1, Xã Vĩnh Hải, Vĩnh Bảo, Hải Phòng
- **Components:** Navigation, Hero, Couple, Countdown, EventsSection, RSVP, GiftBox, Gallery, Footer

### `/sai-gon` - Sài Gòn Celebration Page
- **File:** `app/sai-gon/page.tsx`
- **Events:**
  - Tiệc Báo Hỷ Sài Gòn: 13/06/2026 at 13:00
- **Location:** Nhà hàng Vườn Quê, Quận Bình Thạnh, TP. Hồ Chí Minh
- **Components:** Same as Hải Phòng page

---

## Wedding Components

### Navigation (`components/wedding/navigation.tsx`)
- Fixed top navigation bar
- Smooth scroll to sections
- Mobile responsive with hamburger menu
- Links: Chuyện tình, Cô dâu & Chú rể, Đếm ngược, Sự kiện, Xác nhận, Mừng cưới
- Logo: "XB & T" with heart icon

### Hero (`components/wedding/hero.tsx`)
- Full-screen hero section
- Props: location, dates
- Features:
  - Floating animated hearts
  - Couple photo with circular frame
  - Location badge
  - Wedding date display
  - Scroll indicator

### Couple (`components/wedding/couple.tsx`)
- Bride and groom section
- Circular profile photos
- Biographies:
  - **Groom (Đoàn Xuân Bảo):** Vovinam trainer, community activities
  - **Bride (Đỗ Thị Thảo):** Vovinam student, volunteer work
- Heart connection animation

### Countdown (`components/wedding/countdown.tsx`)
- Real-time countdown timer
- Props: targetDate, label, title
- Displays: Days, Hours, Minutes, Seconds
- Updates every second

### EventsSection (`components/wedding/events-section.tsx`)
- Event cards with details
- Props: events array, title, subtitle
- Event info structure:
  - id, title, date, dayOfWeek, time, location, address, mapUrl, description, isMain
- Map links for each event

### RSVP (`components/wedding/rsvp.tsx`)
- Guest confirmation form
- Fields:
  - Name (required)
  - Phone (required)
  - Number of guests (1-10)
  - Date selection (checkboxes)
  - Message (optional)
- Form validation
- Success state with thank you message
- Currently simulates submission (logs to console)

### GiftBox (`components/wedding/gift-box.tsx`)
- Wedding gift section
- Bank account modal
- Accounts:
  - **Vietcombank:** DOAN XUAN BAO - 0123456789 (Hải Phòng)
  - **Techcombank:** DO THI THAO - 9876543210 (TP.HCM)
- Copy to clipboard functionality
- Modal with bank details

### Gallery (`components/wedding/gallery.tsx`)
- Photo gallery with lightbox
- Props: images array, title, subtitle
- Features:
  - Grid layout (first image larger)
  - Hover effects
  - Lightbox with navigation
  - Image counter
- Default: 6 placeholder images (same URL)

### LoveStory (`components/wedding/love-story.tsx`)
- Timeline of love story
- 6 story milestones:
  1. Khởi đầu từ Vovinam
  2. Những cuộc trò chuyện
  3. Từ đi chơi chung đến riêng
  4. Yêu thương và giận hờn
  5. Sự ủng hộ từ mọi người
  6. Về chung một nhà
- Alternating timeline layout on desktop
- Icons for each milestone

### Footer (`components/wedding/footer.tsx`)
- Props: dates
- Features:
  - Couple names
  - Wedding dates
  - Navigation links
  - Back to home link
  - Copyright notice

---

## Styling & Theme

### Color Palette (app/globals.css)
**Light Mode:**
- Background: oklch(0.98 0.01 350) - Soft cream
- Primary: oklch(0.65 0.18 350) - Rose pink
- Secondary: oklch(0.95 0.03 350) - Light pink
- Accent: oklch(0.75 0.15 20) - Warm accent

**Dark Mode:**
- Background: oklch(0.15 0.01 350) - Dark cream
- Primary: oklch(0.75 0.15 350) - Lighter rose
- Secondary: oklch(0.25 0.02 350) - Dark pink

### Typography
- **Font Sans:** Playfair Display (Vietnamese support)
- **Font Serif:** Cormorant Garamond (Vietnamese support, weights 300-700)
- **Font Mono:** Geist Mono

### Custom Animations
- `float`: Floating animation (3s)
- `pulse-heart`: Heart pulse (1.5s)
- `fade-up`: Fade up animation (0.8s)
- `floral-border`: Decorative SVG pattern

---

## Hooks

### use-mobile.ts
- Detects mobile viewport (< 768px)
- Uses matchMedia API
- Responsive to window resize

### use-toast.ts
- Toast notification system
- Inspired by react-hot-toast
- Actions: ADD_TOAST, UPDATE_TOAST, DISMISS_TOAST, REMOVE_TOAST
- Configurable: TOAST_LIMIT, TOAST_REMOVE_DELAY

---

## Utilities

### lib/utils.ts
- `cn()` function: Combines clsx and tailwind-merge
- Purpose: Merge Tailwind classes intelligently

---

## Public Assets

- Icons: apple-icon.png, icon-dark-32x32.png, icon-light-32x32.png, icon.svg
- Placeholders: placeholder-logo.png, placeholder-logo.svg, placeholder-user.jpg, placeholder.jpg, placeholder.svg

---

## External Services

### Image Hosting
- **Domain:** i.postimg.cc
- **Main Couple Photo:** https://i.postimg.cc/brMKxRrT/20260329-164112.jpg
- **Allowed in next.config.mjs**

### Analytics
- **Vercel Analytics:** Integrated in production
- **Component:** @vercel/analytics/next

---

## Current State & Notes

### RSVP Form
- Currently simulates submission (console.log)
- No backend integration
- Form validation implemented
- Success state functional

### Gallery
- Using placeholder images (all same URL)
- Note: "Album ảnh sẽ được cập nhật sau"
- Lightbox fully functional

### Bank Accounts
- Placeholder account numbers (0123456789, 9876543210)
- Need to be updated with real account numbers

### Love Story
- Timeline describes actual relationship journey
- Mentions: Vovinam, Hải Phòng, Cam Ranh, Sài Gòn, Japan
- Japan celebration mentioned: "tiệc tại Nhật cuối tháng 7"

### Build Configuration
- TypeScript build errors ignored (ignoreBuildErrors: true)
- Images unoptimized (unoptimized: true)

---

## Development Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

---

## Known Issues / TODO

1. **RSVP Backend:** Need to integrate with a backend service for form submissions
2. **Real Images:** Gallery needs actual wedding photos
3. **Bank Accounts:** Update with real account numbers
4. **TypeScript Errors:** Consider fixing TypeScript build errors instead of ignoring
5. **Image Optimization:** Consider enabling image optimization

---

## Future Enhancements

- Add music player
- Add countdown to Japan celebration
- Add photo upload for guests
- Add guestbook/wishes section
- Add weather widget for event locations
- Add QR code for bank accounts
- Multi-language support (Vietnamese/English)
- Admin panel for RSVP management

---

**Document Version:** 1.0  
**Created:** May 14, 2026  
**Status:** Active Development
