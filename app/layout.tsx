import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { BackgroundMusic } from '@/components/wedding/background-music'
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
  description: 'Thiệp mời đám cưới của Đoàn Xuân Bảo và Đỗ Thị Thảo - 06/06/2026',
  generator: 'v0.app',
  metadataBase: new URL('https://baothao.run.place'),
  openGraph: {
    title: 'Xuân Bảo & Đỗ Thảo | Wedding Invitation',
    description: 'Chúng tôi trân trọng kính mời bạn đến dự lễ cưới của chúng tôi',
    url: 'https://baothao.run.place',
    siteName: 'Xuân Bảo & Đỗ Thảo Wedding',
    images: ['https://i.postimg.cc/brMKxRrT/20260329-164112.jpg'],
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
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
