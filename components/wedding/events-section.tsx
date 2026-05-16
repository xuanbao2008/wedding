'use client'

import { motion } from 'framer-motion'
import { Heart, MapPin, Clock, Calendar, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { openMapInExternalBrowser } from '@/lib/in-app-browser'

export interface EventInfo {
  id: string
  title: string
  date: string
  dayOfWeek: string
  time: string
  location: string
  address: string
  mapUrl: string
  description: string
  isMain?: boolean
}

interface EventCardProps {
  event: EventInfo
  index: number
}

function EventCard({ event, index }: EventCardProps) {
  const handleMapClick = (e: React.MouseEvent) => {
    openMapInExternalBrowser(event.mapUrl, e)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 hover:border-primary/30 transition-all duration-300"
    >
      {event.isMain && (
        <div className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full mb-4">
          <Heart className="w-3 h-3 fill-current" />
          Sự kiện chính
        </div>
      )}

      <h3 className="font-sans text-xl md:text-2xl font-bold text-foreground mb-4">
        {event.title}
      </h3>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-foreground">{event.date}</p>
            <p className="text-muted-foreground text-sm">{event.dayOfWeek}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <p className="text-foreground">{event.time}</p>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-foreground">{event.location}</p>
            <p className="text-muted-foreground text-sm">{event.address}</p>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground mt-4 text-sm">{event.description}</p>

      <Button
        onClick={handleMapClick}
        variant="outline"
        className="mt-4 w-full border-primary/30 text-primary hover:bg-primary/10"
      >
        <MapPin className="w-4 h-4 mr-2" />
        Xem bản đồ
        <ExternalLink className="w-3 h-3 ml-2" />
      </Button>
    </motion.div>
  )
}

interface EventsSectionProps {
  events: EventInfo[]
  title?: string
  subtitle?: string
}

export function EventsSection({ events, title = 'Sự Kiện', subtitle }: EventsSectionProps) {
  return (
    <section id="events" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-sans text-3xl md:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-primary/40" />
            <MapPin className="w-5 h-5 text-primary" />
            <div className="h-px w-20 bg-primary/40" />
          </div>
          {subtitle && (
            <p className="text-muted-foreground mt-4 text-lg">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Events grid */}
        <div className={`grid gap-6 ${events.length === 1 ? 'max-w-lg mx-auto' : 'md:grid-cols-2'}`}>
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
