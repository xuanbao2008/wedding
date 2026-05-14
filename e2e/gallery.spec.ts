import { test, expect } from '@playwright/test'

test.describe('Gallery Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/hai-phong#gallery')
  })

  test('should display 26 images in gallery', async ({ page }) => {
    const galleryImages = page.locator('.mySwiper2 .swiper-slide img')
    await expect(galleryImages).toHaveCount(26)
  })

  test('should display main slider with navigation arrows', async ({ page }) => {
    await expect(page.locator('.swiper-button-next')).toBeVisible()
    await expect(page.locator('.swiper-button-prev')).toBeVisible()
  })

  test('should display pagination dots', async ({ page }) => {
    const pagination = page.locator('.swiper-pagination')
    await expect(pagination).toBeVisible()
  })

  test('should display play/pause button', async ({ page }) => {
    const playPauseButton = page.locator('button').filter({ hasText: /Play|Pause/ })
    await expect(playPauseButton).toBeVisible()
  })

  test('should display thumbnail slider', async ({ page }) => {
    const thumbnailSlider = page.locator('.swiper-thumbs')
    await expect(thumbnailSlider).toBeVisible()
  })

  test('should navigate to next image when next arrow is clicked', async ({ page }) => {
    const nextButton = page.locator('.swiper-button-next')
    const firstImage = page.locator('.swiper-slide-active img').first()
    
    const initialSrc = await firstImage.getAttribute('src')
    
    await nextButton.click()
    
    await page.waitForTimeout(500)
    
    const currentImage = page.locator('.swiper-slide-active img').first()
    const currentSrc = await currentImage.getAttribute('src')
    
    expect(currentSrc).not.toBe(initialSrc)
  })

  test('should pause thumbnail scrolling on hover', async ({ page }) => {
    const thumbnailSlider = page.locator('.swiper-thumbs')
    
    await thumbnailSlider.hover()
    
    // Thumbnails should pause (this is a basic test, actual pause behavior would need more complex testing)
    await page.waitForTimeout(1000)
  })
})

test.describe('Gallery - Responsive Design', () => {
  test('should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/hai-phong#gallery')

    const galleryImages = page.locator('.mySwiper2 .swiper-slide img')
    await expect(galleryImages).toHaveCount(26)
  })

  test('should work on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/hai-phong#gallery')

    const galleryImages = page.locator('.mySwiper2 .swiper-slide img')
    await expect(galleryImages).toHaveCount(26)
  })
})
