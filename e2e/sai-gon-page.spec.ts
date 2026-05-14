import { test, expect } from '@playwright/test'

test.describe('Sài Gòn Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sai-gon')
  })

  test('should display correct location and dates', async ({ page }) => {
    await expect(page.locator('text=Sài Gòn')).toBeVisible()
    await expect(page.locator('text=13 . 06 . 2026')).toBeVisible()
  })

  test('should display couple photo with correct alt text', async ({ page }) => {
    const couplePhoto = page.locator('img[alt="Xuân Bảo & Đỗ Thảo"]')
    await expect(couplePhoto).toBeVisible()
  })

  test('should display countdown with correct target date', async ({ page }) => {
    await expect(page.locator('text=Đếm Ngược Đến Tiệc Báo Hỷ')).toBeVisible()
    await expect(page.locator('text=Thứ Bảy, 13 Tháng 6, 2026')).toBeVisible()
  })

  test('should display events section with correct title', async ({ page }) => {
    await expect(page.locator('text=Tiệc Báo Hỷ')).toBeVisible()
    await expect(page.locator('text=Mừng hạnh phúc tại Sài Gòn')).toBeVisible()
  })

  test('should display single event with correct details', async ({ page }) => {
    await expect(page.locator('text=Tiệc cưới từ 10:30 đến 15:00, ngày 13/06')).toBeVisible()
    await expect(page.locator('text=Nhà hàng Vườn Quê')).toBeVisible()
    await expect(page.locator('text=38 đường D5, Phường 25, Quận Bình Thạnh')).toBeVisible()
  })

  test('should display RSVP form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Xác Nhận Tham Dự' })).toBeVisible()
    await expect(page.locator('text=Họ và tên')).toBeVisible()
  })

  test('should display gallery with 26 images', async ({ page }) => {
    await page.goto('/sai-gon#gallery')
    const galleryImages = page.locator('.mySwiper2 .swiper-slide img')
    await expect(galleryImages).toHaveCount(26)
  })

  test('should display footer with correct names and dates', async ({ page }) => {
    await expect(page.locator('text=Xuân Bảo & Đỗ Thảo')).toBeVisible()
    await expect(page.locator('text=13 . 06 . 2026')).toBeVisible()
  })
})

test.describe('Sài Gòn - RSVP Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sai-gon#rsvp')
  })

  test('should toggle attendance status', async ({ page }) => {
    const thamDuButton = page.locator('button:has-text("Tham dự")').first()
    const khongThamDuButton = page.locator('button:has-text("Không thể tham dự")').first()

    await expect(thamDuButton).toHaveClass(/border-primary/)
    await expect(khongThamDuButton).not.toHaveClass(/border-destructive/)

    await khongThamDuButton.click()

    await expect(khongThamDuButton).toHaveClass(/border-destructive/)
    await expect(thamDuButton).not.toHaveClass(/border-primary/)
  })

  test('should hide phone and guest count when cannot attend', async ({ page }) => {
    const khongThamDuButton = page.locator('button:has-text("Không thể tham dự")').first()
    await khongThamDuButton.click()

    await expect(page.locator('text=Số điện thoại')).not.toBeVisible()
    await expect(page.locator('text=Người lớn')).not.toBeVisible()
    await expect(page.locator('text=Trẻ em')).not.toBeVisible()
  })

  test('should show phone and guest count when attending', async ({ page }) => {
    const thamDuButton = page.locator('button:has-text("Tham dự")').first()
    await thamDuButton.click()

    await expect(page.locator('text=Số điện thoại')).toBeVisible()
    await expect(page.locator('text=Người lớn')).toBeVisible()
    await expect(page.locator('text=Trẻ em')).toBeVisible()
  })

  test('should display single event without checkboxes', async ({ page }) => {
    await expect(page.locator('text=Thông tin sự kiện')).toBeVisible()
    await expect(page.locator('input[type="checkbox"]')).not.toBeVisible()
  })

  test('should validate name is required for both submit buttons', async ({ page }) => {
    const thamDuButton = page.locator('button:has-text("Xác nhận tham dự")').nth(1)
    await thamDuButton.click()

    // Should show alert for missing name
    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('Vui lòng nhập họ và tên')
      dialog.accept()
    })
  })
})
