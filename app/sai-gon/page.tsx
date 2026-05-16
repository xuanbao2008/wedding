import type { Metadata } from 'next'
import { Navigation } from '@/components/wedding/navigation'
import { Hero } from '@/components/wedding/hero'
import { Couple } from '@/components/wedding/couple'
import { Countdown } from '@/components/wedding/countdown'
import { EventsSection } from '@/components/wedding/events-section'
import { RSVP } from '@/components/wedding/rsvp'
import { GiftBox } from '@/components/wedding/gift-box'
import { Gallery } from '@/components/wedding/gallery'
import { Footer } from '@/components/wedding/footer'
import config from '@/lib/config'

export const metadata: Metadata = {
  title: 'Tiệc Báo Hỷ Sài Gòn | Xuân Bảo & Đỗ Thảo',
  description: 'Trân trọng kính mời tham dự Tiệc Báo Hỷ Xuân Bảo & Đỗ Thảo tại Nhà hàng Vườn Quê, Quận Bình Thạnh, TP. Hồ Chí Minh - 13/06/2026',
  openGraph: {
    title: 'Tiệc Báo Hỷ Sài Gòn 🎉 | Xuân Bảo & Đỗ Thảo',
    description: 'Trân trọng kính mời tham dự Tiệc Báo Hỷ Xuân Bảo & Đỗ Thảo tại Nhà hàng Vườn Quê, 38 đường D5, Quận Bình Thạnh, TP. HCM - 13/06/2026',
    url: 'https://wedding-baothao.pages.dev/sai-gon',
    images: [
      {
        url: 'https://wedding-baothao.pages.dev/og-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Tiệc Báo Hỷ Xuân Bảo & Đỗ Thảo - Sài Gòn 13/06/2026',
        type: 'image/jpeg',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tiệc Báo Hỷ Sài Gòn 🎉 | Xuân Bảo & Đỗ Thảo',
    description: 'Trân trọng kính mời tham dự Tiệc Báo Hỷ Xuân Bảo & Đỗ Thảo tại Nhà hàng Vườn Quê, TP. HCM - 13/06/2026',
    images: ['https://wedding-baothao.pages.dev/og-preview.jpg'],
  },
}

export default function SaiGonPage() {
  const events = config.events.saiGon.events
  const rsvpEvents = config.events.saiGon.rsvpEvents
  const countdown = config.events.saiGon.countdown
  const dates = config.events.saiGon.dates

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero
        location="Sài Gòn"
        dates={dates}
      />
      <Couple />
      <Countdown
        targetDate={countdown.targetDate}
        label={countdown.label}
        title={countdown.title}
      />
      <EventsSection
        events={events}
        title={config.events.saiGon.title}
        subtitle={config.events.saiGon.subtitle}
      />
      <RSVP events={rsvpEvents} location="sai_gon" />
      <GiftBox />
      <Gallery />
      <Footer dates={dates} />
    </main>
  )
}
