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
