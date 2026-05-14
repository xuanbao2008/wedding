# Wedding Website Test Cases

## 1. Main Page (Home) - `/`

### Visual & Layout
- [ ] "Save the Date" text does not overlap with navigation menu
- [ ] Hero section displays correctly with couple photo
- [ ] Floating hearts animation works
- [ ] Location selection cards display properly
- [ ] Footer displays correct dates

### Navigation
- [ ] Navigation menu appears on desktop
- [ ] Navigation menu works on mobile (hamburger menu)
- [ ] Clicking navigation links scrolls to correct sections
- [ ] Logo click scrolls to top
- [ ] Mobile menu backdrop works
- [ ] Mobile menu close button works

### Location Selection
- [ ] Hai Phòng card displays correctly
- [ ] Sài Gòn card displays correctly
- [ ] Clicking Hải Phòng navigates to /hai-phong
- [ ] Clicking Sài Gòn navigates to /sai-gon

### Responsive Design
- [ ] Page works on mobile (< 768px)
- [ ] Page works on tablet (768px - 1024px)
- [ ] Page works on desktop (> 1024px)

---

## 2. Hải Phòng Page - `/hai-phong`

### Hero Section
- [ ] Hero displays "Hải Phòng" location
- [ ] Dates display "05 - 06 . 06 . 2026"
- [ ] Couple photo displays correctly
- [ ] Names display as "Xuân Bảo & Đỗ Thảo"
- [ ] Scroll indicator works

### Navigation
- [ ] All navigation links work
- [ ] Menu works on mobile

### Countdown
- [ ] Countdown displays correct target date (2026-06-05T19:00:00+07:00)
- [ ] Countdown counts down correctly
- [ ] Countdown animation works

### Events Section
- [ ] Events section title displays "Lịch Tiệc Cưới"
- [ ] Events section subtitle displays "Hai ngày trọng đại tại Hải Phòng"
- [ ] Both events display correctly:
  - Event 1: Đám cưới nhà thờ An Quý lúc 19:00, Thứ Sáu ngày 05/06
  - Event 2: Tiệc cưới Thứ Bảy ngày 06/06, từ 08:00 sáng

### RSVP Form
- [ ] RSVP form displays
- [ ] Form has location="hai_phong"
- [ ] Name field works
- [ ] Phone field works (only when "Tham dự" selected)
- [ ] Adult count select box works (1-10)
- [ ] Child count select box works (0-5)
- [ ] Note field works with correct placeholder
- [ ] Attendance toggle works (Tham dự / Không thể tham dự)
- [ ] When "Không thể tham dự" selected: phone, guest count, event selection hidden
- [ ] When "Tham dự" selected: all fields visible
- [ ] Event checkboxes work (can select 1 or both)
- [ ] "Xác nhận tham dự" button validation:
  - Requires name
  - Requires phone (when attending)
  - Requires at least 1 event selected (when attending)
- [ ] "Không thể tham dự" button validation:
  - Requires name only
- [ ] Submit shows loading state
- [ ] Success message displays after submission
- [ ] Error message displays on failure

### Gallery
- [ ] Gallery displays 26 images
- [ ] Main slider works
- [ ] Thumbnail slider works
- [ ] Thumbnails scroll continuously
- [ ] Thumbnails pause on hover
- [ ] Manual navigation works
- [ ] Play/pause button works
- [ ] Pagination dots work
- [ ] Navigation arrows work

### Gift Box
- [ ] Gift box section displays
- [ ] Gift information displays correctly

### Footer
- [ ] Footer displays "Xuân Bảo & Đỗ Thảo"
- [ ] Footer displays dates "05 - 06 . 06 . 2026"

---

## 3. Sài Gòn Page - `/sai-gon`

### Hero Section
- [ ] Hero displays "Sài Gòn" location
- [ ] Dates display "13 . 06 . 2026"
- [ ] Couple photo displays correctly
- [ ] Names display as "Xuân Bảo & Đỗ Thảo"
- [ ] Scroll indicator works

### Navigation
- [ ] All navigation links work
- [ ] Menu works on mobile

### Countdown
- [ ] Countdown displays correct target date (2026-06-13T10:30:00+07:00)
- [ ] Countdown counts down correctly
- [ ] Countdown animation works

### Events Section
- [ ] Events section title displays "Tiệc Báo Hỷ"
- [ ] Events section subtitle displays "Mừng hạnh phúc tại Sài Gòn"
- [ ] Single event displays correctly:
  - Event: Tiệc cưới từ 10:30 đến 15:00, ngày 13/06
  - Location: Nhà hàng Vườn Quê, 38 đường D5, Phường 25, Quận Bình Thạnh

### RSVP Form
- [ ] RSVP form displays
- [ ] Form has location="sai_gon"
- [ ] Name field works
- [ ] Phone field works (only when "Tham dự" selected)
- [ ] Adult count select box works (1-10)
- [ ] Child count select box works (0-5)
- [ ] Note field works with correct placeholder
- [ ] Attendance toggle works (Tham dự / Không thể tham dự)
- [ ] When "Không thể tham dự" selected: phone, guest count, event selection hidden
- [ ] When "Tham dự" selected: all fields visible
- [ ] Single event displays (no checkboxes needed)
- [ ] "Xác nhận tham dự" button validation:
  - Requires name
  - Requires phone (when attending)
- [ ] "Không thể tham dự" button validation:
  - Requires name only
- [ ] Submit shows loading state
- [ ] Success message displays after submission
- [ ] Error message displays on failure

### Gallery
- [ ] Gallery displays 26 images
- [ ] Main slider works
- [ ] Thumbnail slider works
- [ ] Thumbnails scroll continuously
- [ ] Thumbnails pause on hover
- [ ] Manual navigation works
- [ ] Play/pause button works
- [ ] Pagination dots work
- [ ] Navigation arrows work

### Gift Box
- [ ] Gift box section displays
- [ ] Gift information displays correctly

### Footer
- [ ] Footer displays "Xuân Bảo & Đỗ Thảo"
- [ ] Footer displays dates "13 . 06 . 2026"

---

## 4. Navigation Component

### Desktop Navigation
- [ ] Logo displays "Xuân Bảo & Đỗ Thảo"
- [ ] All links display: Chuyện tình, Cô dâu & Chú rể, Đếm ngược, Sự kiện, Xác nhận, Mừng cưới
- [ ] Links hover effect works
- [ ] Links scroll to correct sections
- [ ] Navigation background changes on scroll

### Mobile Navigation
- [ ] Hamburger menu button works
- [ ] Menu opens when clicked
- [ ] Menu displays all links
- [ ] Backdrop works
- [ ] Close button works
- [ ] Links close menu when clicked
- [ ] Logo displays "Xuân Bảo & Đỗ Thảo"

---

## 5. Gallery Component (All Pages)

### Main Slider
- [ ] 26 images display
- [ ] Images load correctly from Google Drive URLs
- [ ] Navigation arrows work
- [ ] Pagination dots work
- [ ] Autoplay works (3 seconds)
- [ ] Autoplay pauses on hover
- [ ] Manual control works
- [ ] Play/pause button toggles autoplay

### Thumbnail Slider
- [ ] 26 thumbnails display
- [ ] Thumbnails scroll continuously
- [ ] Thumbnails pause on hover
- [ ] Manual sliding works
- [ ] Clicking thumbnail changes main image
- [ ] Thumbnails display correctly

### Responsive Design
- [ ] Gallery works on mobile
- [ ] Gallery works on tablet
- [ ] Gallery works on desktop

---

## 6. RSVP Form (All Pages)

### Form Fields
- [ ] Name field: required, text input
- [ ] Phone field: required when attending, text input with tel type
- [ ] Adult count: required when attending, select box 1-10
- [ ] Child count: optional, select box 0-5
- [ ] Note field: optional, text input with placeholder "Ăn chay, dị ứng món ăn, ghi chú khác..."
- [ ] Message field: optional, textarea
- [ ] Attendance toggle: buttons for "Tham dự" and "Không thể tham dự"

### Conditional Rendering
- [ ] Phone field hidden when "Không thể tham dự"
- [ ] Adult/child count hidden when "Không thể tham dự"
- [ ] Event selection hidden when "Không thể tham dự"
- [ ] All fields visible when "Tham dự"

### Validation
- [ ] Name required for both submit buttons
- [ ] Phone required when attending
- [ ] Adult count required when attending
- [ ] At least 1 event required when attending (Hải Phòng with multiple events)
- [ ] Validation error messages display

### Submission
- [ ] "Xác nhận tham dự" submits with canAttend=true
- [ ] "Không thể tham dự" submits with canAttend=false
- [ ] Loading state displays during submission
- [ ] Success message displays after successful submission
- [ ] Error message displays on failure
- [ ] Success message shows "Xuân Bảo & Đỗ Thảo"

### Data Payload
- [ ] Payload includes: form, fullName, phone, adultCount, childCount, selectedEvents, message, note, canAttend
- [ ] Payload sent to /api/rsvp endpoint
- [ ] API route forwards to Apps Script

---

## 7. Responsive Design (All Pages)

### Mobile (< 768px)
- [ ] Navigation becomes hamburger menu
- [ ] Hero text sizes adjust
- [ ] Form fields stack vertically
- [ ] Gallery thumbnails adjust
- [ ] Buttons adjust size
- [ ] No horizontal scrolling

### Tablet (768px - 1024px)
- [ ] Navigation works
- [ ] Layout adjusts appropriately
- [ ] Images scale correctly

### Desktop (> 1024px)
- [ ] Full navigation displays
- [ ] Optimal layout
- [ ] Images display at full size

---

## 8. Apps Script Integration

### Configuration
- [ ] .env file exists with APPS_SCRIPT_URL
- [ ] APPS_SCRIPT_URL is valid
- [ ] API route /api/rsvp exists

### Data Flow
- [ ] Form submits to /api/rsvp
- [ ] API route forwards to Apps Script
- [ ] Apps Script receives data correctly
- [ ] Apps Script appends to Google Sheet
- [ ] Google Sheet receives data in correct columns

### Sheet Structure
- [ ] Sheet tab named "RSVP"
- [ ] Headers in row 1: Timestamp | Form | Họ và tên | SĐT | Người lớn | Trẻ em | Tham dự tiệc nào? | Có thể tham dự | Lời nhắn | Ghi chú
- [ ] Data appears in correct columns
- [ ] Timestamp auto-generated
- [ ] Form shows "hai_phong" or "sai_gon"
- [ ] Adult count shows number
- [ ] Child count shows number
- [ ] Selected events show as " | " separated
- [ ] Can attend shows "Có" or "Không"

---

## 9. Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)

---

## 10. Performance

- [ ] Page loads quickly
- [ ] Images load efficiently (Next.js Image component)
- [ ] No console errors
- [ ] No memory leaks
- [ ] Smooth animations

---

## 11. Accessibility

- [ ] Alt text on images
- [ ] Form labels associated with inputs
- [ ] Keyboard navigation works
- [ ] Sufficient color contrast
- [ ] Screen reader friendly
