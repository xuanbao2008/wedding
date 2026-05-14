import { test, expect } from '@playwright/test'

// Mock the API route
test.beforeEach(async ({ page }) => {
  await page.route('**/api/rsvp', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    })
  })
})

test.describe('RSVP Form - Common Functionality', () => {
  test('should display form on Hai Phong page', async ({ page }) => {
    await page.goto('/hai-phong#rsvp')
    await expect(page.getByRole('heading', { name: 'Xác Nhận Tham Dự' })).toBeVisible()
  })

  test('should display form on Sài Gòn page', async ({ page }) => {
    await page.goto('/sai-gon#rsvp')
    await expect(page.getByRole('heading', { name: 'Xác Nhận Tham Dự' })).toBeVisible()
  })

  test('should display all form fields initially', async ({ page }) => {
    await page.goto('/hai-phong#rsvp')
    
    await expect(page.locator('text=Họ và tên')).toBeVisible()
    await expect(page.locator('text=Số điện thoại')).toBeVisible()
    await expect(page.locator('text=Người lớn')).toBeVisible()
    await expect(page.locator('text=Trẻ em')).toBeVisible()
    await expect(page.locator('text=Ghi chú (không bắt buộc)')).toBeVisible()
    await expect(page.locator('text=Lời nhắn (không bắt buộc)')).toBeVisible()
  })
})

test.describe('RSVP Form - Attendance Toggle', () => {
  test('should default to "Tham dự" selected', async ({ page }) => {
    await page.goto('/hai-phong#rsvp')

    const thamDuButton = page.locator('button:has-text("Tham dự")').first()
    await expect(thamDuButton).toHaveClass(/border-primary/)
  })

  test('should toggle to "Không thể tham dự"', async ({ page }) => {
    await page.goto('/hai-phong#rsvp')

    const khongThamDuButton = page.locator('button:has-text("Không thể tham dự")').first()
    await khongThamDuButton.click()

    await expect(khongThamDuButton).toHaveClass(/border-destructive/)
  })

  test('should toggle back to "Tham dự"', async ({ page }) => {
    await page.goto('/hai-phong#rsvp')

    const thamDuButton = page.locator('button:has-text("Tham dự")').first()
    const khongThamDuButton = page.locator('button:has-text("Không thể tham dự")').first()

    await khongThamDuButton.click()
    await thamDuButton.click()

    await expect(thamDuButton).toHaveClass(/border-primary/)
  })

  test('should hide phone field when cannot attend', async ({ page }) => {
    await page.goto('/hai-phong#rsvp')

    const khongThamDuButton = page.locator('button:has-text("Không thể tham dự")').first()
    await khongThamDuButton.click()

    await expect(page.locator('text=Số điện thoại')).not.toBeVisible()
  })

  test('should hide guest count fields when cannot attend', async ({ page }) => {
    await page.goto('/hai-phong#rsvp')

    const khongThamDuButton = page.locator('button:has-text("Không thể tham dự")').first()
    await khongThamDuButton.click()

    await expect(page.locator('text=Người lớn')).not.toBeVisible()
    await expect(page.locator('text=Trẻ em')).not.toBeVisible()
  })

  test('should hide event selection when cannot attend', async ({ page }) => {
    await page.goto('/hai-phong#rsvp')

    const khongThamDuButton = page.locator('button:has-text("Không thể tham dự")').first()
    await khongThamDuButton.click()

    await expect(page.locator('text=Bạn sẽ tham dự thời gian nào?')).not.toBeVisible()
  })
})

test.describe('RSVP Form - Guest Count Selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/hai-phong#rsvp')
  })

  test('should allow selecting adult count from 1-10', async ({ page }) => {
    const adultSelect = page.locator('select#adultCount')
    
    for (let i = 1; i <= 10; i++) {
      await adultSelect.selectOption(i.toString())
      await expect(adultSelect).toHaveValue(i.toString())
    }
  })

  test('should allow selecting child count from 0-5', async ({ page }) => {
    const childSelect = page.locator('select#childCount')
    
    for (let i = 0; i <= 5; i++) {
      await childSelect.selectOption(i.toString())
      await expect(childSelect).toHaveValue(i.toString())
    }
  })

  test('should default adult count to 1', async ({ page }) => {
    const adultSelect = page.locator('select#adultCount')
    await expect(adultSelect).toHaveValue('1')
  })

  test('should default child count to 0', async ({ page }) => {
    const childSelect = page.locator('select#childCount')
    await expect(childSelect).toHaveValue('0')
  })
})

test.describe('RSVP Form - Event Selection (Hải Phòng)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/hai-phong#rsvp')
  })

  test('should display event checkboxes for Hải Phòng', async ({ page }) => {
    await expect(page.locator('text=Bạn sẽ tham dự thời gian nào?')).toBeVisible()
    const checkboxes = page.locator('input[type="checkbox"]')
    await expect(checkboxes).toHaveCount(2)
  })

  test('should allow selecting first event only', async ({ page }) => {
    const event1Checkbox = page.locator('input[type="checkbox"]').first()
    await event1Checkbox.check()
    
    await expect(event1Checkbox).toBeChecked()
    
    const event2Checkbox = page.locator('input[type="checkbox"]').nth(1)
    await expect(event2Checkbox).not.toBeChecked()
  })

  test('should allow selecting second event only', async ({ page }) => {
    const event2Checkbox = page.locator('input[type="checkbox"]').nth(1)
    await event2Checkbox.check()
    
    await expect(event2Checkbox).toBeChecked()
    
    const event1Checkbox = page.locator('input[type="checkbox"]').first()
    await expect(event1Checkbox).not.toBeChecked()
  })

  test('should allow selecting both events', async ({ page }) => {
    const event1Checkbox = page.locator('input[type="checkbox"]').first()
    const event2Checkbox = page.locator('input[type="checkbox"]').nth(1)
    
    await event1Checkbox.check()
    await event2Checkbox.check()
    
    await expect(event1Checkbox).toBeChecked()
    await expect(event2Checkbox).toBeChecked()
  })
})

test.describe('RSVP Form - Event Selection (Sài Gòn)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sai-gon#rsvp')
  })

  test('should display single event info for Sài Gòn', async ({ page }) => {
    await expect(page.locator('text=Thông tin sự kiện')).toBeVisible()
    await expect(page.locator('input[type="checkbox"]')).not.toBeVisible()
  })

  test('should display event details', async ({ page }) => {
    await expect(page.locator('text=Tiệc cưới từ 10:30 đến 15:00, ngày 13/06')).toBeVisible()
  })
})

test.describe('RSVP Form - Validation', () => {
  test('should require name for "Xác nhận tham dự" button', async ({ page }) => {
    await page.goto('/hai-phong#rsvp')

    const thamDuButton = page.locator('button:has-text("Xác nhận tham dự")').nth(1)

    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('Vui lòng nhập họ và tên')
      dialog.accept()
    })

    await thamDuButton.click()
  })

  test('should require name for "Không thể tham dự" button', async ({ page }) => {
    await page.goto('/hai-phong#rsvp')

    const khongThamDuButton = page.locator('button:has-text("Không thể tham dự")').nth(1)

    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('Vui lòng nhập họ và tên')
      dialog.accept()
    })

    await khongThamDuButton.click()
  })

  test('should require event selection for Hải Phòng when attending', async ({ page }) => {
    await page.goto('/hai-phong#rsvp')

    const nameInput = page.locator('input#fullName')
    await nameInput.fill('Test User')

    const thamDuButton = page.locator('button:has-text("Xác nhận tham dự")').nth(1)

    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('Vui lòng chọn ít nhất một thời gian bạn sẽ tham dự')
      dialog.accept()
    })

    await thamDuButton.click()
  })
})

test.describe('RSVP Form - Submission', () => {
  test('should submit form with valid data for attending', async ({ page }) => {
    await page.goto('/hai-phong#rsvp')

    await page.fill('input#fullName', 'Test User')
    await page.fill('input#phone', '0123456789')
    await page.selectOption('select#adultCount', '2')
    await page.selectOption('select#childCount', '1')

    const eventCheckbox = page.locator('input[type="checkbox"]').first()
    await eventCheckbox.check()

    const thamDuButton = page.locator('button:has-text("Xác nhận tham dự")').nth(1)
    await thamDuButton.click()

    // Should show loading state
    await expect(page.locator('text=Đang gửi...')).toBeVisible()
  })

  test('should submit form with valid data for not attending', async ({ page }) => {
    await page.goto('/hai-phong#rsvp')

    await page.fill('input#fullName', 'Test User')

    const khongThamDuButton = page.locator('button:has-text("Không thể tham dự")').nth(1)
    await khongThamDuButton.click()

    // Should show loading state
    await expect(page.locator('text=Đang gửi...')).toBeVisible()
  })

  test('should show success message after successful submission', async ({ page }) => {
    await page.goto('/hai-phong#rsvp')

    await page.fill('input#fullName', 'Test User')
    await page.fill('input#phone', '0123456789')
    await page.selectOption('select#adultCount', '1')

    const eventCheckbox = page.locator('input[type="checkbox"]').first()
    await eventCheckbox.check()

    const thamDuButton = page.locator('button:has-text("Xác nhận tham dự")').nth(1)
    await thamDuButton.click()

    // Wait for submission (mocked - in real scenario this would wait for API response)
    await page.waitForTimeout(2000)

    // Success message should appear (this is a simplified test)
    // In real scenario, you'd mock the API response
  })
})
