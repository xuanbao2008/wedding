# E2E Testing with Playwright

## Setup Instructions

### Step 1: Install Playwright
```bash
pnpm install
pnpm exec playwright install
```

### Step 2: Start Development Server
```bash
pnpm dev
```

Keep the dev server running in a separate terminal.

### Step 3: Run Tests

#### Run all tests
```bash
pnpm test:e2e
```

#### Run tests with UI (interactive mode)
```bash
pnpm test:e2e:ui
```

#### Run specific test file
```bash
pnpm exec playwright test e2e/main-page.spec.ts
```

#### Run tests in specific browser
```bash
pnpm exec playwright test --project=chromium
pnpm exec playwright test --project=firefox
pnpm exec playwright test --project=webkit
```

#### Run tests in headless mode (default)
```bash
pnpm exec playwright test
```

#### Run tests in headed mode (show browser)
```bash
pnpm exec playwright test --headed
```

## Test Coverage

### Main Page (`main-page.spec.ts`)
- ✅ Save the Date text visibility and non-overlapping
- ✅ Couple photo display
- ✅ Location selection cards
- ✅ Navigation to Hải Phòng and Sài Gòn pages
- ✅ Navigation menu functionality
- ✅ Logo click scrolls to top
- ✅ Responsive design (mobile, tablet)

### Hải Phòng Page (`hai-phong-page.spec.ts`)
- ✅ Correct location and dates display
- ✅ Couple photo with correct alt text
- ✅ Countdown with correct target date
- ✅ Events section with correct title
- ✅ Both events display correctly
- ✅ RSVP form display
- ✅ Gallery with 26 images
- ✅ Footer with correct names and dates
- ✅ RSVP attendance toggle
- ✅ Conditional field visibility
- ✅ Event selection (checkboxes)
- ✅ Form validation
- ✅ Note field placeholder

### Sài Gòn Page (`sai-gon-page.spec.ts`)
- ✅ Correct location and dates display
- ✅ Couple photo with correct alt text
- ✅ Countdown with correct target date
- ✅ Events section with correct title
- ✅ Single event display
- ✅ RSVP form display
- ✅ Gallery with 26 images
- ✅ Footer with correct names and dates
- ✅ RSVP attendance toggle
- ✅ Conditional field visibility
- ✅ Single event (no checkboxes)
- ✅ Form validation

### Gallery Component (`gallery.spec.ts`)
- ✅ 26 images display
- ✅ Navigation arrows
- ✅ Pagination dots
- ✅ Play/pause button
- ✅ Thumbnail slider
- ✅ Image navigation
- ✅ Responsive design

### RSVP Form (`rsvp.spec.ts`)
- ✅ Form display on both pages
- ✅ All form fields display
- ✅ Attendance toggle functionality
- ✅ Conditional field rendering
- ✅ Guest count selection (1-10 adults, 0-5 children)
- ✅ Event selection (Hải Phòng with checkboxes)
- ✅ Event display (Sài Gòn single event)
- ✅ Form validation (name required)
- ✅ Event selection validation (Hải Phòng)
- ✅ Form submission
- ✅ Loading state
- ✅ Success message

## Test Configuration

Playwright is configured to test on:
- Chromium (Chrome)
- Firefox
- WebKit (Safari)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

## Viewing Test Results

After running tests, view the HTML report:
```bash
pnpm exec playwright show-report
```

## Troubleshooting

### Tests fail because dev server is not running
Make sure to run `pnpm dev` in a separate terminal before running tests.

### Tests fail with timeout errors
Increase timeout in `playwright.config.ts` if needed.

### Browser not installed
Run `pnpm exec playwright install` to install all browsers.

### TypeScript errors during test development
These are expected until Playwright is installed. Run `pnpm install` to resolve.
