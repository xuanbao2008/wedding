'use client'

import { motion } from 'framer-motion'
import { Heart, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import config from '@/lib/config'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
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
        className="absolute top-40 right-16 text-primary/20"
        animate={{ y: [0, -20, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Heart className="w-6 h-6 fill-current" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-20 text-primary/25"
        animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Heart className="w-5 h-5 fill-current" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Save the date */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-muted-foreground tracking-[0.3em] uppercase text-sm mb-6 mt-20"
        >
          {config.hero.saveTheDate}
        </motion.p>

        {/* Couple photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mx-auto mb-8"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl mx-auto relative">
            <Image
              src="https://lh3.googleusercontent.com/d/1C9TLedwVzp9XkyZIaPgixR9SlI6i1u-q=s4000?authuser=0"
              alt="Xuân Bảo & Đỗ Thảo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-background rounded-full p-2 shadow-lg"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-8 h-8 text-primary fill-primary" />
          </motion.div>
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="font-sans text-4xl md:text-6xl font-bold text-primary">
            {config.site.title}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-muted-foreground mt-6 text-lg"
        >
          Trân trọng kính mời bạn đến dự lễ cưới của chúng tôi
        </motion.p>

        {/* Location selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-8">
            {config.home.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {config.home.locations.map((location, index) => (
              <motion.div
                key={location.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
              >
                <Link href={`/${location.slug}`}>
                  <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <MapPin className="w-5 h-5 text-primary" />
                      <h3 className="font-sans text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {location.name}
                      </h3>
                    </div>
                    <p className="text-primary font-medium mb-2">{location.description}</p>
                    <p className="text-muted-foreground text-sm mb-2">{location.dates}</p>
                    <p className="text-muted-foreground text-sm">{location.address}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-primary text-sm font-medium">
                      {location.cta}
                      <Heart className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
