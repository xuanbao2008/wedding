import { test, expect } from '@playwright/test'

test.describe('Hải Phòng Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/hai-phong')
  })

  test('should display correct location and dates', async ({ page }) => {
    await expect(page.locator('text=Hải Phòng')).toBeVisible()
    await expect(page.locator('text=05 - 06 . 06 . 2026')).toBeVisible()
  })

  test('should display couple photo with correct alt text', async ({ page }) => {
    const couplePhoto = page.locator('img[alt="Xuân Bảo & Đỗ Thảo"]')
    await expect(couplePhoto).toBeVisible()
  })

  test('should display countdown with correct target date', async ({ page }) => {
    await expect(page.locator('text=Đếm Ngược Đến Tiệc Cưới')).toBeVisible()
    await expect(page.locator('text=Thứ Sáu, 05 Tháng 6, 2026')).toBeVisible()
  })

  test('should display events section with correct title', async ({ page }) => {
    await expect(page.locator('text=Lịch Tiệc Cưới')).toBeVisible()
    await expect(page.locator('text=Hai ngày trọng đại tại Hải Phòng')).toBeVisible()
  })

  test('should display both events', async ({ page }) => {
    await expect(page.locator('text=Đám cưới nhà thờ An Quý lúc 19:00, Thứ Sáu ngày 05/06')).toBeVisible()
    await expect(page.locator('text=Tiệc cưới Thứ Bảy ngày 06/06, từ 08:00 sáng')).toBeVisible()
  })

  test('should display RSVP form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Xác Nhận Tham Dự' })).toBeVisible()
    await expect(page.locator('text=Họ và tên')).toBeVisible()
  })

  test('should display gallery with 26 images', async ({ page }) => {
    await page.goto('/hai-phong#gallery')
    const galleryImages = page.locator('.mySwiper2 .swiper-slide img')
    await expect(galleryImages).toHaveCount(26)
  })

  test('should display footer with correct names and dates', async ({ page }) => {
    await expect(page.locator('text=Xuân Bảo & Đỗ Thảo')).toBeVisible()
    await expect(page.locator('text=05 - 06 . 06 . 2026')).toBeVisible()
  })
})

test.describe('Hải Phòng - RSVP Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/hai-phong#rsvp')
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

  test('should allow selecting multiple events', async ({ page }) => {
    const event1Checkbox = page.locator('input[type="checkbox"]').first()
    const event2Checkbox = page.locator('input[type="checkbox"]').nth(1)

    await event1Checkbox.check()
    await event2Checkbox.check()

    await expect(event1Checkbox).toBeChecked()
    await expect(event2Checkbox).toBeChecked()
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

  test('should show note field with correct placeholder', async ({ page }) => {
    const noteInput = page.locator('input[placeholder*="Ăn chay"]')
    await expect(noteInput).toBeVisible()
    await expect(noteInput).toHaveAttribute('placeholder', /Ăn chay, dị ứng món ăn, ghi chú khác/)
  })
})
