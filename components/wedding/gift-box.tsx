'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Gift, CreditCard, Copy, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import config from '@/lib/config'

const bankAccounts = [
  {
    bank: 'MBBank',
    name: 'DO THI THAO',
    number: '0367999476',
    branch: '',
    qrImage: '/img/moneybox/do-thi-thao.png',
  },
  {
    bank: 'VCB',
    name: 'DOAN XUAN BAO',
    number: '0381000389563',
    branch: '',
    qrImage: '/img/moneybox/doan-xuan-bao.png',
  },
]

export function GiftBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    }
  }

  return (
    <section id="gift" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-sans text-3xl md:text-5xl font-bold text-foreground mb-4">
            {config.giftBox.title}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-primary/40" />
            <Gift className="w-5 h-5 text-primary" />
            <div className="h-px w-20 bg-primary/40" />
          </div>
          <p className="text-muted-foreground mt-4 text-lg max-w-lg mx-auto">
            {config.giftBox.description}
          </p>
        </motion.div>

        {/* Gift box button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-lg"
          >
            <Gift className="w-5 h-5 mr-2" />
            Gửi Lời Chúc
            <Heart className="w-5 h-5 ml-2 fill-current" />
          </Button>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-foreground/50 z-50"
                onClick={() => setIsOpen(false)}
              />

              {/* Modal content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full bg-card rounded-2xl shadow-2xl z-50 overflow-auto max-h-[90vh]"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-sans text-2xl font-bold text-foreground flex items-center gap-2">
                      <Gift className="w-6 h-6 text-primary" />
                      Mừng Cưới
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Bank accounts */}
                  <div className="space-y-6">
                    {bankAccounts.map((account, index) => (
                      <Card key={index} className="border-primary/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-primary" />
                            {account.bank}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">{config.giftBox.bankInfo.accountName}:</span>
                            <span className="font-medium">{account.name}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">{config.giftBox.bankInfo.accountNumber}:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-medium">{account.number}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => copyToClipboard(account.number, index)}
                              >
                                {copiedIndex === index ? (
                                  <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                          {account.qrImage && (
                            <div className="mt-4">
                              <p className="text-muted-foreground text-sm mb-2">QR Code:</p>
                              <div className="relative w-full aspect-square max-w-[200px] mx-auto">
                                <Image
                                  src={account.qrImage}
                                  alt={`QR Code ${account.bank}`}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Thank you message */}
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                      <Heart className="w-4 h-4 text-primary fill-primary" />
                      <span className="text-sm text-foreground">
                        Vợ chồng mình chân thành cảm ơn món quà mừng cưới của mọi người!
                      </span>
                      <Heart className="w-4 h-4 text-primary fill-primary" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
