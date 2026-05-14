'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import config from '@/lib/config'

interface FooterProps {
  dates: string
}

export function Footer({ dates }: FooterProps) {
  return (
    <footer className="py-12 px-4 bg-primary/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        {/* Names */}
        <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">
          {config.footer.coupleNames}
        </h2>

        {/* Date */}
        <p className="text-muted-foreground text-lg mb-6">
          {dates}
        </p>

        {/* Heart divider */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-primary/40" />
          <Heart className="w-6 h-6 text-primary fill-primary animate-pulse-heart" />
          <div className="h-px w-16 bg-primary/40" />
        </div>

        {/* Thank you message */}
        <p className="text-foreground text-lg mb-4 max-w-md mx-auto">
          {config.footer.madeWithLove}
        </p>
        <p className="text-foreground text-lg mb-8 max-w-md mx-auto font-semibold">
          {config.footer.coupleNames}
        </p>

        {/* Navigation links */}
        <nav className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm text-muted-foreground mb-8">
          <a href="#love-story" className="hover:text-primary transition-colors">
            Chuyện tình yêu
          </a>
          <a href="#couple" className="hover:text-primary transition-colors">
            Cô dâu & Chú rể
          </a>
          <a href="#countdown" className="hover:text-primary transition-colors">
            Đếm ngược
          </a>
          <a href="#events" className="hover:text-primary transition-colors">
            Sự kiện
          </a>
          <a href="#rsvp" className="hover:text-primary transition-colors">
            Xác nhận
          </a>
          <a href="#gift" className="hover:text-primary transition-colors">
            Mừng cưới
          </a>
        </nav>

        {/* Back to home */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm mb-6"
        >
          <Heart className="w-4 h-4" />
          Xem các địa điểm khác
        </Link>

        {/* Copyright */}
        <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
          Made with <Heart className="w-4 h-4 text-primary fill-primary" /> in 2026
        </p>
      </motion.div>
    </footer>
  )
}
