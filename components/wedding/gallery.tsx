'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs, Autoplay, Pagination } from 'swiper/modules'
import { motion } from 'framer-motion'
import { Camera, Play, Pause } from 'lucide-react'
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
  { src: 'https://lh3.googleusercontent.com/d/12UthXg5MCyeM8CDzN2Kdv3YBa1aTfz-P=s4000?authuser=0', alt: 'Ảnh cưới 1' },
  { src: 'https://lh3.googleusercontent.com/d/130bGomq_LDkS0XpP3mE7C_ZXqPE0gZuK=s4000?authuser=0', alt: 'Ảnh cưới 2' },
  { src: 'https://lh3.googleusercontent.com/d/1AsvQtCSztRubml0B4zd4HaRu4iZGd7wx=s4000?authuser=0', alt: 'Ảnh cưới 3' },
  { src: 'https://lh3.googleusercontent.com/d/1SKJrfYdli0OaLx_BtZfc29QgD4sIYhJA=s4000?authuser=0', alt: 'Ảnh cưới 4' },
  { src: 'https://lh3.googleusercontent.com/d/1u0x3bZLPj3TRZXERltIfm_yg6oP-GVjz=s4000?authuser=0', alt: 'Ảnh cưới 5' },
  { src: 'https://lh3.googleusercontent.com/d/17ebT_OAJ31HcKQGENXDFbrSH5zvwWtgb=s4000?authuser=0', alt: 'Ảnh cưới 6' },
  { src: 'https://lh3.googleusercontent.com/d/142B394XPFBMriQBzZt2RwFEB8Z14xSnx=s4000?authuser=0', alt: 'Ảnh cưới 7' },
  { src: 'https://lh3.googleusercontent.com/d/1PZFvTXiPyuYV2z0xTzlVKtXIw_zdliGx=s4000?authuser=0', alt: 'Ảnh cưới 8' },
  { src: 'https://lh3.googleusercontent.com/d/14dx0LDZ1otANFoemuEH2nLkaqcaQGjV_=s4000?authuser=0', alt: 'Ảnh cưới 9' },
  { src: 'https://lh3.googleusercontent.com/d/1wnTid_BITkGaCmHwUvDPnHelDbx06s0N=s4000?authuser=0', alt: 'Ảnh cưới 10' },
  { src: 'https://lh3.googleusercontent.com/d/1lEMfVwYL6QVPT7Hl4dQIq-6WQLODWBno=s4000?authuser=0', alt: 'Ảnh cưới 11' },
  { src: 'https://lh3.googleusercontent.com/d/1lFEiL9_EYMMHidDNBRrFqvw_EF4TJRc2=s4000?authuser=0', alt: 'Ảnh cưới 12' },
  { src: 'https://lh3.googleusercontent.com/d/1kFvnN43V0eXnx73113GfgAo10c0mo9cJ=s4000?authuser=0', alt: 'Ảnh cưới 13' },
  { src: 'https://lh3.googleusercontent.com/d/1aca1CYBLRbP-B-dlxfT9rHOF-2XtxbhV=s4000?authuser=0', alt: 'Ảnh cưới 14' },
  { src: 'https://lh3.googleusercontent.com/d/1uF-WuTpGcC_065iTpsrWhDYwmRX0pM7X=s4000?authuser=0', alt: 'Ảnh cưới 15' },
  { src: 'https://lh3.googleusercontent.com/d/1V7bHU3vHrN3UOKyA630Jhw_ZK4_NfQar=s4000?authuser=0', alt: 'Ảnh cưới 16' },
  { src: 'https://lh3.googleusercontent.com/d/1CkP7NjgP1Me7hqykEdC7soJqDSbMhjFr=s4000?authuser=0', alt: 'Ảnh cưới 17' },
  { src: 'https://lh3.googleusercontent.com/d/16Vd3EvYsvpIkl_3hmUZFl5i8f5ag5KsZ=s4000?authuser=0', alt: 'Ảnh cưới 18' },
  { src: 'https://lh3.googleusercontent.com/d/1-qUrTjG3jgxx0MTPEJlt4m07qDM5brCl=s4000?authuser=0', alt: 'Ảnh cưới 19' },
  { src: 'https://lh3.googleusercontent.com/d/1xfGQ4uwJTXe_iNYcZMwGubr3mllHD9gB=s4000?authuser=0', alt: 'Ảnh cưới 20' },
  { src: 'https://lh3.googleusercontent.com/d/17JGlPQcjdJ0jyts74rBZ79emNmmNQugM=s4000?authuser=0', alt: 'Ảnh cưới 21' },
  { src: 'https://lh3.googleusercontent.com/d/14xb_eutG9K_37tgJSXGbN4QHh8-sbsJb=s4000?authuser=0', alt: 'Ảnh cưới 22' },
  { src: 'https://lh3.googleusercontent.com/d/1PjWLXq5dZVD16Sbr8rYhefZjDyVruLsB=s4000?authuser=0', alt: 'Ảnh cưới 23' },
  { src: 'https://lh3.googleusercontent.com/d/1nGnatJTE48rY_QTMDG2hNpozha_YRiDC=s4000?authuser=0', alt: 'Ảnh cưới 24' },
  { src: 'https://lh3.googleusercontent.com/d/1H9ZdFSJWxeFRipPLp1POK3NVicDi7qhs=s4000?authuser=0', alt: 'Ảnh cưới 25' },
  { src: 'https://lh3.googleusercontent.com/d/1C9TLedwVzp9XkyZIaPgixR9SlI6i1u-q=s4000?authuser=0', alt: 'Ảnh cưới 26' },
]

export function Gallery({
  images = defaultImages,
  title = config.gallery.title,
  subtitle = config.gallery.subtitle
}: GalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false)

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
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay, Pagination]}
            className="mySwiper2 mb-4 rounded-xl"
            navigation
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-video md:aspect-[16/9] bg-muted">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Controls */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setIsAutoplayPaused(!isAutoplayPaused)}
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
            <div className="text-sm text-muted-foreground">
              {images.length} ảnh
            </div>
          </div>

          {/* Thumbs Swiper with continuous scrolling */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="mySwiper"
            autoplay={
              isAutoplayPaused 
                ? false 
                : {
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
            }
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
    </section>
  )
}
