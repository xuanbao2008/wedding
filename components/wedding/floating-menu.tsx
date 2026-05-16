'use client'

import { useState } from 'react'
import { Gift, QrCode, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function FloatingMenu() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)

  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById('rsvp')
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Fixed Menu */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {/* Gift Box Button */}
        <motion.button
          onClick={() => setIsQRModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-gradient-to-br from-pink-500 to-rose-500 text-white p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow"
        >
          <div className="flex flex-col items-center gap-1">
            <div className="relative">
              <Gift className="w-8 h-8" />
              <QrCode className="w-6 h-6 absolute -top-2 -right-2 bg-white text-pink-500 rounded-full p-0.5" />
            </div>
            <span className="text-xs font-medium">Mừng cưới</span>
          </div>
        </motion.button>

        {/* RSVP Button */}
        <motion.button
          onClick={scrollToRSVP}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-medium leading-tight">
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setIsQRModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Mừng Cưới
                </h3>
                <p className="text-gray-600 mb-6">
                  Sự hiện diện của bạn là món quà ý nghĩa nhất. Nếu bạn muốn gửi quà cưới, xin quét mã QR bên dưới:
                </p>

                {/* QR Codes for Groom and Bride */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Groom QR Code */}
                  <div className="bg-gray-100 rounded-2xl p-4">
                    <div className="aspect-square bg-white rounded-xl flex items-center justify-center">
                      <img
                        src="/img/moneybox/doan-xuan-bao.png"
                        alt="QR Code Chú Rể"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-xs font-medium text-gray-700 mt-2">Chú Rể</p>
                    <p className="text-xs text-gray-500">Đoàn Xuân Bảo</p>
                  </div>

                  {/* Bride QR Code */}
                  <div className="bg-gray-100 rounded-2xl p-4">
                    <div className="aspect-square bg-white rounded-xl flex items-center justify-center">
                      <img
                        src="/img/moneybox/do-thi-thao.png"
                        alt="QR Code Cô Dâu"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-xs font-medium text-gray-700 mt-2">Cô Dâu</p>
                    <p className="text-xs text-gray-500">Đỗ Thị Thảo</p>
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  Cảm ơn sự quan tâm và tình cảm của bạn!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
