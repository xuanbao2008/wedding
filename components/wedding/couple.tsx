'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import config from '@/lib/config'

export function Couple() {
  return (
    <section id="couple" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-sans text-3xl md:text-5xl font-bold text-foreground mb-4">
            {config.couple.bride.title} & {config.couple.groom.title}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-primary/40" />
            <Heart className="w-5 h-5 text-primary fill-primary" />
            <div className="h-px w-20 bg-primary/40" />
          </div>
        </motion.div>

        {/* Couple cards */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">
          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="relative inline-block mb-6">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl mx-auto">
                <Image
                  src="https://lh3.googleusercontent.com/d/1H9ZdFSJWxeFRipPLp1POK3NVicDi7qhs=s4000?authuser=0"
                  alt={`Chú rể - ${config.couple.groom.name}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                {config.couple.groom.title}
              </div>
            </div>
            <h3 className="font-sans text-2xl md:text-3xl font-bold text-foreground mb-2">
              {config.couple.groom.name}
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
              Huấn luyện viên Vovinam, yêu thích hoạt động cộng đồng và võ thuật.
              Người luôn sẵn sàng chia sẻ và hướng dẫn mọi người.
            </p>
          </motion.div>

          {/* Heart divider - visible on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:hidden"
          >
            <Heart className="w-12 h-12 text-primary fill-primary animate-pulse-heart" />
          </motion.div>

          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="relative inline-block mb-6">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl mx-auto">
                <Image
                  src="https://lh3.googleusercontent.com/d/14xb_eutG9K_37tgJSXGbN4QHh8-sbsJb=s4000?authuser=0"
                  alt={`Cô dâu - ${config.couple.bride.name}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                {config.couple.bride.title}
              </div>
            </div>
            <h3 className="font-sans text-2xl md:text-3xl font-bold text-foreground mb-2">
              {config.couple.bride.name}
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
              Học viên Vovinam nhiệt tình, yêu thích hoạt động thiện nguyện.
              Người luôn mang nụ cười và năng lượng tích cực.
            </p>
          </motion.div>
        </div>

        {/* Heart connection - visible on desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden md:flex justify-center mt-12"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary/40" />
            <Heart className="w-10 h-10 text-primary fill-primary animate-pulse-heart" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary/40" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
