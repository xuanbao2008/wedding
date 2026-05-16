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
