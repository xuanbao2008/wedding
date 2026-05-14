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
