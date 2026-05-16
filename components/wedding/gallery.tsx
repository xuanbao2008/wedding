'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs, Autoplay, Pagination } from 'swiper/modules'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Play, Pause, ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'
import config from '@/lib/config'

interface GalleryImage {
  src: string
  alt: string
}

interface GalleryProps {
  images?: GalleryImage[]
  title?: string
  subtitle?: string
}

const defaultImages: GalleryImage[] = [
  { src: 'https://lh3.googleusercontent.com/d/1Tgg8GJqqK7-_ZJQwjiujitkHKb8USqYQ=s4000?authuser=0', alt: 'Ảnh cưới 1' },
  { src: 'https://lh3.googleusercontent.com/d/1fTmd7xmD3Kj89XpMAO5EW-7TWR50TeNQ=s4000?authuser=0', alt: 'Ảnh cưới 2' },
  { src: 'https://lh3.googleusercontent.com/d/1WEuQ4CIuq8XZvkwOtkzPQMIDntyXwG5p=s4000?authuser=0', alt: 'Ảnh cưới 3' },
  { src: 'https://lh3.googleusercontent.com/d/1GzkvXcOz-vF1sdQOdhNgyymc8mSY-0Be=s4000?authuser=0', alt: 'Ảnh cưới 4' },
  { src: 'https://lh3.googleusercontent.com/d/1WdePp_wJMQeOgp_ZQbgISU40TYy2A7FH=s4000?authuser=0', alt: 'Ảnh cưới 5' },
  { src: 'https://lh3.googleusercontent.com/d/1aaFv5R-NAor1INMV0wMCpr-gzDFE0nGy=s4000?authuser=0', alt: 'Ảnh cưới 6' },
  { src: 'https://lh3.googleusercontent.com/d/17QKwD6LeXtK4DmnyV_XNY9wT9MUrYC0J=s4000?authuser=0', alt: 'Ảnh cưới 7' },
  { src: 'https://lh3.googleusercontent.com/d/17XqhDLeJYg73-mrXqpaS3L0jztURtKWz=s4000?authuser=0', alt: 'Ảnh cưới 8' },
  { src: 'https://lh3.googleusercontent.com/d/1RjLszhjCFh0vRlOzTcYhFuGzBvQV4xHF=s4000?authuser=0', alt: 'Ảnh cưới 9' },
  { src: 'https://lh3.googleusercontent.com/d/1Je1IU6tz_OGCVxzq3t8O5U5j91wCL2cf=s4000?authuser=0', alt: 'Ảnh cưới 10' },
  { src: 'https://lh3.googleusercontent.com/d/1lIlEMJJJ39R2LaF3rOJXFA3YMWl_DlWA=s4000?authuser=0', alt: 'Ảnh cưới 11' },
  { src: 'https://lh3.googleusercontent.com/d/1RTorAAtK-za6nO-YXZ3Tk2ZIYOuF2rxy=s4000?authuser=0', alt: 'Ảnh cưới 12' },
  { src: 'https://lh3.googleusercontent.com/d/1SBJHDUQOGf8Y0_9d1QpZ_WCe-3KLeYGb=s4000?authuser=0', alt: 'Ảnh cưới 13' },
  { src: 'https://lh3.googleusercontent.com/d/1UXCpCwL11LJU1uG1ulM1Gs7GUDWk-vgK=s4000?authuser=0', alt: 'Ảnh cưới 14' },
  { src: 'https://lh3.googleusercontent.com/d/15pKItPNnutAI6Owm3NYHI82a3FU-fZ3c=s4000?authuser=0', alt: 'Ảnh cưới 15' },
  { src: 'https://lh3.googleusercontent.com/d/1N_W9HLXzJJV0CIA3CxY69Vta1Mu_wihV=s4000?authuser=0', alt: 'Ảnh cưới 16' },
  { src: 'https://lh3.googleusercontent.com/d/1HDvHOPl4IMD-3hW-MBxUytRKaak9760A=s4000?authuser=0', alt: 'Ảnh cưới 17' },
  { src: 'https://lh3.googleusercontent.com/d/1-iBa2JI6VgeM4vNZkyARx5XMXTtZGhYW=s4000?authuser=0', alt: 'Ảnh cưới 18' },
  { src: 'https://lh3.googleusercontent.com/d/1zkVWG8AL6KguoO8VyiUKYy_H9VM0Ifbo=s4000?authuser=0', alt: 'Ảnh cưới 19' },
  { src: 'https://lh3.googleusercontent.com/d/1CTGwCVszchFx3cRN1n_AtCOE0l1JZkw-=s4000?authuser=0', alt: 'Ảnh cưới 20' },
  { src: 'https://lh3.googleusercontent.com/d/1Irqgjink0mASWTA2T8NIEt45DzQX2r7n=s4000?authuser=0', alt: 'Ảnh cưới 21' },
  { src: 'https://lh3.googleusercontent.com/d/1Qlm_SjqKvTVnJfAqH8tV1Mw8McBcWoER=s4000?authuser=0', alt: 'Ảnh cưới 22' },
  { src: 'https://lh3.googleusercontent.com/d/1fWaVV9ZOm4szeNPe6hGxB0w68gnp9GJ1=s4000?authuser=0', alt: 'Ảnh cưới 23' },
  { src: 'https://lh3.googleusercontent.com/d/1evCmn18H4JYr_2B3xAVvGQOo1nPXT2yk=s4000?authuser=0', alt: 'Ảnh cưới 24' },
  { src: 'https://lh3.googleusercontent.com/d/1pTd9o8R6qigMgb-H6ONd0FdWrFcfOrYF=s4000?authuser=0', alt: 'Ảnh cưới 25' },
  { src: 'https://lh3.googleusercontent.com/d/1nTj9--NHJIc7_B_GFIX-Deuh6Pc6ohZ1=s4000?authuser=0', alt: 'Ảnh cưới 26' },
  { src: 'https://lh3.googleusercontent.com/d/1MMFoeFSwb4wGqYF1uvltZaxR77qXrEOG=s4000?authuser=0', alt: 'Ảnh cưới 27' },
  { src: 'https://lh3.googleusercontent.com/d/19zUVmvSpHOD9dachGWyTL0u_Dm2ujKCK=s4000?authuser=0', alt: 'Ảnh cưới 28' },
]

export function Gallery({
  images = defaultImages,
  title = config.gallery.title,
  subtitle = config.gallery.subtitle
}: GalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [mainSwiper, setMainSwiper] = useState<any>(null)
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerIndex, setViewerIndex] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1)

  const toggleAutoplay = () => {
    const newPaused = !isAutoplayPaused
    setIsAutoplayPaused(newPaused)
    if (mainSwiper?.autoplay) {
      newPaused ? mainSwiper.autoplay.stop() : mainSwiper.autoplay.start()
    }
    if (thumbsSwiper?.autoplay) {
      newPaused ? thumbsSwiper.autoplay.stop() : thumbsSwiper.autoplay.start()
    }
  }

  const openViewer = (index: number) => {
    setViewerIndex(index)
    setZoomLevel(1)
    setViewerOpen(true)
  }

  const closeViewer = () => {
    setViewerOpen(false)
    setZoomLevel(1)
  }

  const prevImage = () => {
    setViewerIndex(i => (i - 1 + images.length) % images.length)
    setZoomLevel(1)
  }

  const nextImage = () => {
    setViewerIndex(i => (i + 1) % images.length)
    setZoomLevel(1)
  }

  return (
    <section id="gallery" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-primary/40" />
            <Camera className="w-5 h-5 text-primary" />
            <div className="h-px w-16 bg-primary/40" />
          </div>
          <p className="text-muted-foreground mt-4">
            {subtitle}
          </p>
        </motion.div>

        {/* Swiper Gallery */}
        <div className="swiper-container">
          {/* Main Swiper */}
          <Swiper
            onSwiper={setMainSwiper}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay, Pagination]}
            className="mySwiper2 mb-4 rounded-xl"
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-video md:aspect-[16/9] bg-muted group">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); openViewer(index) }}
                    className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                    title="Xem ảnh phóng to"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Controls */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={toggleAutoplay}
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
            >
              {isAutoplayPaused ? (
                <>
                  <Play className="w-4 h-4" />
                  <span className="text-sm">Play</span>
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" />
                  <span className="text-sm">Pause</span>
                </>
              )}
            </button>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{images.length} ảnh</span>
              <button
                onClick={() => openViewer(mainSwiper?.activeIndex || 0)}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
                <span className="text-sm">Xem ảnh</span>
              </button>
            </div>
          </div>

          {/* Thumbs Swiper */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="mySwiper"
            autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-square cursor-pointer rounded-lg overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Photo Viewer Modal */}
      <AnimatePresence>
        {viewerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
            onClick={closeViewer}
          >
            {/* Close */}
            <button
              onClick={closeViewer}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Zoom controls */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-black/50 rounded-full px-3 py-1.5">
              <button
                onClick={(e) => { e.stopPropagation(); setZoomLevel(z => Math.max(z - 0.5, 0.5)) }}
                className="text-white hover:text-primary transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-white text-xs w-10 text-center">{Math.round(zoomLevel * 100)}%</span>
              <button
                onClick={(e) => { e.stopPropagation(); setZoomLevel(z => Math.min(z + 0.5, 4)) }}
                className="text-white hover:text-primary transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white/70 text-sm">
              {viewerIndex + 1} / {images.length}
            </div>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              className="absolute left-2 md:left-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              className="absolute right-2 md:right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={viewerIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl w-full mx-8 md:mx-16 flex items-center justify-center overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[viewerIndex].src}
                alt={images[viewerIndex].alt}
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center', transition: 'transform 0.2s ease' }}
                className="max-h-[80vh] max-w-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
