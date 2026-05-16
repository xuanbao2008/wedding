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
  title: 'Lễ Cưới Hải Phòng | Xuân Bảo & Đỗ Thảo',
  description: 'Trân trọng kính mời tham dự Lễ Cưới Xuân Bảo & Đỗ Thảo tại Nhà thờ An Quý, Cộng Hiền, Vĩnh Bảo, TP. Hải Phòng - 05/06/2026',
  openGraph: {
    title: 'Lễ Cưới Hải Phòng 💒 | Xuân Bảo & Đỗ Thảo',
    description: 'Trân trọng kính mời tham dự Lễ Cưới Xuân Bảo & Đỗ Thảo tại Nhà thờ An Quý, Cộng Hiền, Vĩnh Bảo, TP. Hải Phòng - 05 & 06/06/2026',
    url: 'https://wedding-baothao.pages.dev/hai-phong',
    images: [
      {
        url: 'https://wedding-baothao.pages.dev/og-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Lễ Cưới Xuân Bảo & Đỗ Thảo - Hải Phòng 05/06/2026',
        type: 'image/jpeg',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lễ Cưới Hải Phòng 💒 | Xuân Bảo & Đỗ Thảo',
    description: 'Trân trọng kính mời tham dự Lễ Cưới Xuân Bảo & Đỗ Thảo tại Nhà thờ An Quý, TP. Hải Phòng - 05/06/2026',
    images: ['https://wedding-baothao.pages.dev/og-preview.jpg'],
  },
}

export default function HaiPhongPage() {
  const events = config.events.haiPhong.events
  const rsvpEvents = config.events.haiPhong.rsvpEvents
  const countdown = config.events.haiPhong.countdown
  const dates = config.events.haiPhong.dates

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero
        location="Hải Phòng"
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
        title={config.events.haiPhong.title}
        subtitle={config.events.haiPhong.subtitle}
      />
      <RSVP events={rsvpEvents} location="hai_phong" />
      <GiftBox />
      <Gallery />
      <Footer dates={dates} />
    </main>
  )
}
