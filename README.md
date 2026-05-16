# Xuân Bảo & Đỗ Thảo - Wedding Website

Website đám cưới của Xuân Bảo và Đỗ Thảo với thông tin về hai lễ cưới tại Hải Phòng và Sài Gòn.

## 🎉 Tính năng

- **Trang chủ**: Chọn địa điểm tham dự (Hải Phòng hoặc Sài Gòn)
- **Trang Hải Phòng**: Thông tin lễ cưới 05-06/06/2026
- **Trang Sài Gòn**: Thông tin tiệc báo hỷ 13/06/2026
- **Countdown**: Đếm ngược đến ngày cưới
- **RSVP Form**: Xác nhận tham dự với phân loại người lớn/trẻ em, hỗ trợ chỉnh sửa sau khi gửi, offline submission với Service Worker
- **Gallery**: Bộ ảnh cưới với 26 hình, có navigation và thumbnail slider
- **Gift Box**: Mừng cưới online với thông tin tài khoản ngân hàng và QR code
- **Background Music**: Nhạc nền tự động phát với random rotation giữa nhiều track
- **Navigation**: Menu điều hướng responsive với mobile support

## 🚀 Cách chạy dự án

### Yêu cầu

- Node.js 18+
- pnpm

### Cài đặt

```bash
# Clone repository
git clone <your-repo-url>
cd wedding

# Cài đặt dependencies
pnpm install
```

### Cấu hình Environment Variables

Tạo file `.env` trong thư mục gốc:

```env
APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbz_IgMNaCr_bUGn5CfQD82sy-Zf5dz7OCpqHY7WrjWtkrphACBC5LJUXRlmH2x_IWfx/exec
```

### Chạy Development Server

```bash
pnpm dev
```

Mở browser tại http://localhost:3000

### Production Domain

Website sẽ được deploy tại: https://wedding-baothao.vercel.app/

## 📝 Cấu hình Google Apps Script cho RSVP

Để form RSVP hoạt động, cần setup Google Sheet và Apps Script:

### Bước 1: Tạo Google Sheet

1. Truy cập https://sheets.google.com
2. Tạo spreadsheet mới
3. Đổi tên tab đầu tiên thành "RSVP" (chính xác, phân biệt hoa thường)

### Bước 2: Thêm Headers

Trong row 1, thêm các headers theo thứ tự (mỗi ô một header):

- A1: Timestamp
- B1: Form
- C1: Họ và tên
- D1: SĐT
- E1: Người lớn
- F1: Trẻ em
- G1: Tham dự tiệc nào?
- H1: Có thể tham dự
- I1: Lời nhắn
- J1: Ghi chú

### Bước 3: Thêm Apps Script

1. Trong Google Sheet, đi đến Extensions → Apps Script
2. Xóa code hiện có (nếu có)
3. Copy nội dung từ file `apps-script-template.gs` trong dự án
4. Paste vào Apps Script editor
5. Lưu script (Ctrl+S hoặc Cmd+S)

### Bước 4: Deploy Web App

1. Click "Deploy" → "New deployment"
2. Click icon bánh răng (Select type) → "Web app"
3. Description: "Wedding RSVP v1"
4. Execute as: "Me"
5. Who has access: "Anyone" (QUAN TRỌNG: phải là Anyone để public access)
6. Click "Deploy"

### Bước 5: Lấy Web App URL

1. Sau khi deploy, copy "Web app URL" hiển thị
2. URL sẽ có dạng: https://script.google.com/macros/s/XXXX/exec
3. Cập nhật vào file `.env` với key `APPS_SCRIPT_URL`

## 🧪 Testing

### E2E Tests với Playwright

```bash
# Cài đặt Playwright browsers
pnpm exec playwright install

# Chạy tất cả tests
pnpm test:e2e

# Chạy tests với UI mode
pnpm test:e2e:ui

# Chạy test file cụ thể
pnpm exec playwright test e2e/main-page.spec.ts
```

## 📦 Build cho Production

```bash
# Build
pnpm build

# Start production server
pnpm start
```

## 🎨 Tùy chỉnh

### Service Worker cho Offline RSVP

Website sử dụng Service Worker để hỗ trợ offline RSVP submission:
- Submission được lưu vào IndexedDB ngay lập tức
- Optimistic UI - user thấy success ngay lập tức
- Background Sync API tự động retry khi có mạng
- Browser tắt vẫn sync khi mở lại
- Cần HTTPS để hoạt động (production đã có)

### Cấu hình tập trung (config/site.json)

Hầu hết text và cấu hình được tập trung trong file `config/site.json`:
- Thông tin cặp đôi
- Menu navigation
- Text cho các section (hero, events, rsvp, gallery, gift-box, footer)
- Thông tin sự kiện cho cả 2 địa điểm
- Thông tin tài khoản ngân hàng cho quà cưới

### Thay đổi ảnh

- Ảnh đại diện main page: Update trong `app/page.tsx`
- Ảnh đại diện sub pages (Hải Phòng, Sài Gòn): Update trong `components/wedding/hero.tsx`
- Gallery: Update URLs trong `components/wedding/gallery.tsx`
- Ảnh cặp đôi: Update URLs trong `components/wedding/couple.tsx`

### Thay đổi thông tin sự kiện

- Hải Phòng: Update trong `config/site.json` (section events.haiPhong)
- Sài Gòn: Update trong `config/site.json` (section events.saiGon)

### Thay đổi nhạc nền

Update URLs trong `config/site.json` (section music.urls) - hỗ trợ nhiều track với random rotation

## 📁 Cấu trúc dự án

```
wedding/
├── app/
│   ├── page.tsx              # Trang chủ
│   ├── hai-phong/
│   │   └── page.tsx         # Trang Hải Phòng
│   ├── sai-gon/
│   │   └── page.tsx         # Trang Sài Gòn
│   └── api/
│       └── rsvp/
│           └── route.ts     # API route cho RSVP
├── components/
│   └── wedding/
│       ├── navigation.tsx
│       ├── hero.tsx
│       ├── couple.tsx
│       ├── countdown.tsx
│       ├── events-section.tsx
│       ├── rsvp.tsx
│       ├── gift-box.tsx
│       ├── gallery.tsx
│       ├── footer.tsx
│       └── background-music.tsx
├── e2e/                      # E2E tests
├── apps-script-template.gs   # Apps Script template
├── next.config.mjs
├── package.json
└── .env                      # Environment variables
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Playwright

## 📄 License

Dự án dành riêng cho đám cưới của Xuân Bảo & Đỗ Thảo.

---

💕 Hẹn gặp bạn trong ngày trọng đại!
