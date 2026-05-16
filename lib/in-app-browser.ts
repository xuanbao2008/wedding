// Utility to detect and handle in-app browsers

export function isInAppBrowser(): boolean {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera

  // Common in-app browser signatures
  const inAppBrowsers = [
    'FBAN', // Facebook
    'FBAV', // Facebook
    'Instagram',
    'Twitter',
    'Line',
    'MicroMessenger', // WeChat
    'WhatsApp',
    'Telegram',
    'Viber',
    'Snapchat',
    'LinkedIn',
    'Pinterest',
    'TikTok',
    'KAKAOTALK', // KakaoTalk
    'NAVER', // Naver
    'Daum', // Daum
    'SamsungBrowser', // Samsung Internet
    'UCBrowser', // UC Browser
  ]

  return inAppBrowsers.some(browser => userAgent.includes(browser))
}

export function forceOpenInExternalBrowser(url: string): void {
  if (isInAppBrowser()) {
    // Force open in system browser
    window.open(url, '_system')
  } else {
    // Normal behavior
    window.open(url, '_blank')
  }
}

// For map links specifically - force external browser
export function openMapInExternalBrowser(url: string, e?: React.MouseEvent): void {
  if (e) {
    e.preventDefault()
  }

  if (isInAppBrowser()) {
    // Show confirmation for map links
    const confirmed = confirm(
      'Để xem bản đồ tốt hơn, bạn có muốn mở trong trình duyệt chính không?'
    )

    if (confirmed) {
      forceOpenInExternalBrowser(url)
    } else {
      // Fallback: open in current window
      window.location.href = url
    }
  } else {
    // Normal behavior: open in new tab
    window.open(url, '_blank')
  }
}
