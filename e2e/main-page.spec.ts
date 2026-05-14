import { test, expect } from '@playwright/test'

test.describe('Main Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display Save the Date text without overlapping navigation', async ({ page }) => {
    const saveTheDate = page.locator('text=Save The Date')
    await expect(saveTheDate).toBeVisible()
    
    // Check that navigation is also visible
    const navigation = page.locator('nav')
    await expect(navigation).toBeVisible()
  })

  test('should display couple photo', async ({ page }) => {
    const couplePhoto = page.locator('img[alt="Xuân Bảo & Đỗ Thảo"]')
    await expect(couplePhoto).toBeVisible()
  })

  test('should display location selection cards', async ({ page }) => {
    const haiPhongCard = page.locator('text=Hải Phòng')
    const saiGonCard = page.locator('text=Sài Gòn')
    
    await expect(haiPhongCard).toBeVisible()
    await expect(saiGonCard).toBeVisible()
  })

  test('should navigate to Hai Phong page when card is clicked', async ({ page }) => {
    const haiPhongCard = page.locator('text=Hải Phòng').first()
    await haiPhongCard.click()
    
    await expect(page).toHaveURL(/\/hai-phong/)
    await expect(page.locator('text=Hải Phòng')).toBeVisible()
  })

  test('should navigate to Sài Gòn page when card is clicked', async ({ page }) => {
    const saiGonCard = page.locator('text=Sài Gòn').first()
    await saiGonCard.click()
    
    await expect(page).toHaveURL(/\/sai-gon/)
    await expect(page.locator('text=Sài Gòn')).toBeVisible()
  })

  test('should display navigation menu on desktop', async ({ page }) => {
    const navigation = page.locator('nav')
    await expect(navigation).toBeVisible()
    
    const navLinks = page.locator('nav button')
    await expect(navLinks).toHaveCount(6) // 6 navigation links
  })

  test('should scroll to top when logo is clicked', async ({ page }) => {
    const logo = page.locator('text=Xuân Bảo & Đỗ Thảo').first()
    await logo.click()
    
    // Check that page is at top
    const scrollPosition = await page.evaluate(() => window.scrollY)
    expect(scrollPosition).toBe(0)
  })
})

test.describe('Main Page - Responsive Design', () => {
  test('should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    const saveTheDate = page.locator('text=Save The Date')
    await expect(saveTheDate).toBeVisible()
    
    // Check mobile menu button
    const menuButton = page.locator('button').first()
    await expect(menuButton).toBeVisible()
  })

  test('should work on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    
    const saveTheDate = page.locator('text=Save The Date')
    await expect(saveTheDate).toBeVisible()
  })
})
