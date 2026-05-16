import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { BackgroundMusic } from '@/components/wedding/background-music'
import { FloatingMenu } from '@/components/wedding/floating-menu'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin', 'vietnamese'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Xuân Bảo & Đỗ Thảo | Wedding Invitation',
  description: 'Trân trọng kính mời bạn đến dự Lễ Cưới của Đoàn Xuân Bảo & Đỗ Thị Thảo - 05-06/06/2026 tại Hải Phòng và 13/06/2026 tại Sài Gòn.',
  metadataBase: new URL('https://wedding-baothao.pages.dev'),
  openGraph: {
    title: 'Xuân Bảo & Đỗ Thảo 💍 | Thiệp Mời Đám Cưới',
    description: 'Trân trọng kính mời bạn đến dự Lễ Cưới Xuân Bảo & Đỗ Thảo - 05 & 06/06/2026 tại Hải Phòng và 13/06/2026 tại Sài Gòn.',
    url: 'https://wedding-baothao.pages.dev',
    siteName: 'Xuân Bảo & Đỗ Thảo Wedding',
    images: [
      {
        url: '/og-preview.jpg',
        secureUrl: 'https://wedding-baothao.pages.dev/og-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Đám cưới Xuân Bảo & Đỗ Thảo - 06/06/2026',
        type: 'image/jpeg',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xuân Bảo & Đỗ Thảo 💍 | Thiệp Mời Đám Cưới',
    description: 'Trân trọng kính mời bạn đến dự Lễ Cưới Xuân Bảo & Đỗ Thảo - 05 & 06/06/2026 tại Hải Phòng và 13/06/2026 tại Sài Gòn.',
    images: ['https://wedding-baothao.pages.dev/og-preview.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#e879a0',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${cormorant.variable} bg-background`}>
      <body className="font-serif antialiased">
        <BackgroundMusic />
        <FloatingMenu />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
