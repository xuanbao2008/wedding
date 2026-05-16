'use client'

import { useState } from 'react'
import { Gift, QrCode, X, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function FloatingMenu() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const pathname = usePathname()

  const scrollToRSVP = () => {
    // If on homepage, show event selection modal
    if (pathname === '/') {
      setIsEventModalOpen(true)
      return
    }

    // On sub-pages, scroll to RSVP section
    const rsvpSection = document.getElementById('rsvp')
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navigateToEvent = (event: 'hai-phong' | 'sai-gon') => {
    setIsEventModalOpen(false)
    // Navigate to the page and then scroll to RSVP
    window.location.href = `/${event === 'hai-phong' ? 'hai-phong' : 'sai-gon'}#rsvp`
  }

  return (
    <>
      {/* Fixed Menu */}
      <div className="fixed right-2 md:right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 md:gap-4">
        {/* Gift Box Button */}
        <motion.button
          onClick={() => setIsQRModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-gradient-to-br from-pink-500 to-rose-500 text-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-shadow"
        >
          <div className="flex flex-col items-center gap-1">
            <div className="relative">
              <Gift className="w-6 h-6 md:w-8 md:h-8" />
              <QrCode className="w-5 h-5 md:w-6 md:h-6 absolute -top-2 -right-2 md:-top-2 md:-right-2 bg-white text-pink-500 rounded-full p-0.5" />
            </div>
            <span className="text-[10px] md:text-xs font-medium">Mừng cưới</span>
          </div>
        </motion.button>

        {/* RSVP Button */}
        <motion.button
          onClick={scrollToRSVP}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-shadow"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] md:text-xs font-medium leading-tight text-center">
              <div>Đồng ý</div>
              <div>tham dự</div>
            </span>
          </div>
        </motion.button>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {isQRModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsQRModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-2 md:p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 max-w-md w-full shadow-2xl relative mx-2"
            >
              <button
                onClick={() => setIsQRModalOpen(false)}
                className="absolute top-2 md:top-4 right-2 md:right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Mừng Cưới
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                  Sự hiện diện của bạn là món quà ý nghĩa nhất. Nếu bạn muốn gửi quà cưới, xin quét mã QR bên dưới:
                </p>

                {/* QR Codes for Groom and Bride */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                  {/* Groom QR Code */}
                  <div className="bg-gray-100 rounded-xl md:rounded-2xl p-3 md:p-4">
                    <div className="aspect-square bg-white rounded-lg md:rounded-xl flex items-center justify-center">
                      <img
                        src="/img/moneybox/doan-xuan-bao.png"
                        alt="QR Code Chú Rể"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-[10px] md:text-xs font-medium text-gray-700 mt-2">Chú Rể</p>
                    <p className="text-[10px] md:text-xs text-gray-500">Đoàn Xuân Bảo</p>
                  </div>

                  {/* Bride QR Code */}
                  <div className="bg-gray-100 rounded-xl md:rounded-2xl p-3 md:p-4">
                    <div className="aspect-square bg-white rounded-lg md:rounded-xl flex items-center justify-center">
                      <img
                        src="/img/moneybox/do-thi-thao.png"
                        alt="QR Code Cô Dâu"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-[10px] md:text-xs font-medium text-gray-700 mt-2">Cô Dâu</p>
                    <p className="text-[10px] md:text-xs text-gray-500">Đỗ Thị Thảo</p>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-gray-500">
                  Cảm ơn sự quan tâm và tình cảm của bạn!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event Selection Modal (for homepage) */}
      <AnimatePresence>
        {isEventModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEventModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-2 md:p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 max-w-md w-full shadow-2xl relative mx-2"
            >
              <button
                onClick={() => setIsEventModalOpen(false)}
                className="absolute top-2 md:top-4 right-2 md:right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Chọn Địa Điểm
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-6">
                  Bạn muốn tham dự tiệc tại đâu?
                </p>

                <div className="space-y-3 md:space-y-4">
                  <motion.button
                    onClick={() => navigateToEvent('hai-phong')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-br from-pink-500 to-rose-500 text-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                      <div className="text-left">
                        <p className="font-bold text-base md:text-lg">Hải Phòng</p>
                        <p className="text-xs md:text-sm opacity-90">05-06/06/2026</p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={() => navigateToEvent('sai-gon')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                      <div className="text-left">
                        <p className="font-bold text-base md:text-lg">Sài Gòn</p>
                        <p className="text-xs md:text-sm opacity-90">13/06/2026</p>
                      </div>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
