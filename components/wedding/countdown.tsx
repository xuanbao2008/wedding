'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Calendar } from 'lucide-react'
import config from '@/lib/config'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - new Date().getTime()
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-card rounded-xl shadow-lg border border-border/50 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
        <span className="font-sans text-2xl md:text-3xl font-bold text-primary">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-muted-foreground text-xs mt-2 uppercase tracking-wider">
        {label}
      </span>
    </div>
  )
}

interface CountdownProps {
  targetDate: string
  label: string
  title?: string
}

export function Countdown({ targetDate, label, title }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const target = new Date(targetDate)
    setTimeLeft(calculateTimeLeft(target))

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!mounted) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-3">
            {[0, 0, 0, 0].map((_, i) => (
              <TimeBox key={i} value={0} label={[config.countdown.days, config.countdown.hours, config.countdown.minutes, config.countdown.seconds][i]} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="countdown" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title || 'Đếm Ngược'}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-primary/40" />
            <Calendar className="w-5 h-5 text-primary" />
            <div className="h-px w-16 bg-primary/40" />
          </div>
          <p className="text-muted-foreground mt-4">
            Đến ngày trọng đại của chúng tôi
          </p>
        </motion.div>

        {/* Countdown boxes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center gap-3 md:gap-5"
        >
          <TimeBox value={timeLeft.days} label={config.countdown.days} />
          <TimeBox value={timeLeft.hours} label={config.countdown.hours} />
          <TimeBox value={timeLeft.minutes} label={config.countdown.minutes} />
          <TimeBox value={timeLeft.seconds} label={config.countdown.seconds} />
        </motion.div>

        {/* Wedding date display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full">
            <Heart className="w-4 h-4 text-primary fill-primary animate-pulse-heart" />
            <span className="text-lg md:text-xl font-medium text-foreground">
              {label}
            </span>
            <Heart className="w-4 h-4 text-primary fill-primary animate-pulse-heart" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
