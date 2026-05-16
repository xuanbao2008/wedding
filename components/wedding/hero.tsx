'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import config from '@/lib/config'

interface HeroProps {
  location: string
  dates: string
}

export function Hero({ location, dates }: HeroProps) {
  const couplePhotos: Record<string, string> = {
    'Hải Phòng': 'https://lh3.googleusercontent.com/d/1KxDwEG1D0TpCMQMzfaN_PW6yc8sIu4v3=s4000',
    'Sài Gòn': 'https://lh3.googleusercontent.com/d/1KxDwEG1D0TpCMQMzfaN_PW6yc8sIu4v3=s4000',
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 floral-border opacity-20" />

      {/* Floating hearts */}
      <motion.div
        className="absolute top-20 left-10 text-primary/30"
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart className="w-8 h-8 fill-current" />
      </motion.div>

      <motion.div
        className="absolute top-40 right-20 text-primary/20"
        animate={{ y: [0, -20, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart className="w-12 h-12 fill-current" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-20 text-primary/25"
        animate={{ y: [0, -18, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart className="w-10 h-10 fill-current" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-muted-foreground tracking-[0.3em] uppercase text-sm mb-6 mt-20"
        >
          {config.hero.saveTheDate}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-5xl md:text-7xl font-bold text-primary mb-8"
        >
          {location}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans text-2xl md:text-3xl text-primary mb-12 tracking-wider"
        >
          {dates}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative w-80 h-80 md:w-96 md:h-96 mx-auto mb-12"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
            <Image
              src={couplePhotos[location] || couplePhotos['Hải Phòng']}
              alt={`Cặp đôi ${location}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-4 text-muted-foreground"
        >
          <Heart className="w-5 h-5 fill-primary" />
          <span className="font-sans text-lg">{config.hero.invitation}</span>
          <Heart className="w-5 h-5 fill-primary" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer"
            onClick={() => document.getElementById('love-story')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="w-6 h-10 border-2 border-primary/40 rounded-full mx-auto flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-3 bg-primary/60 rounded-full"
              />
            </div>
            <p className="text-muted-foreground text-sm mt-2">Cuộn xuống</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
