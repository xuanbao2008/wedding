'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Send, User, Phone, MessageSquare, Calendar, Check, Users, Baby, AlertCircle, Gift, Smile, Frown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import config from '@/lib/config'
import { submitRSVPOptimistic } from '@/lib/rsvp-worker'

interface RSVPProps {
  events: Array<{
    id: string
    date: string
    title: string
  }>
  location?: 'hai_phong' | 'sai_gon'
}

export function RSVP({ events, location = 'hai_phong' }: RSVPProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    adultCount: '1',
    childCount: '0',
    selectedEvents: [] as string[],
    message: '',
    note: '',
    canAttend: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null)
  const [rowId, setRowId] = useState<string | null>(null)
  const successCardRef = useRef<HTMLDivElement>(null)

  // Retrieve rowId from localStorage on mount
  useEffect(() => {
    const storedRowId = localStorage.getItem('rsvp_rowId')
    if (storedRowId) {
      setRowId(storedRowId)
    }
  }, [])

  const handleEventToggle = (eventId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedEvents: prev.selectedEvents.includes(eventId)
        ? prev.selectedEvents.filter(id => id !== eventId)
        : [...prev.selectedEvents, eventId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent, canAttend: boolean) => {
    e.preventDefault()
    setIsSubmitting(true)

    // For single event, auto-select it
    const selectedEvents = canAttend && events.length === 1
      ? [events[0].title]
      : canAttend && formData.selectedEvents.length > 0
        ? formData.selectedEvents.map(id => events.find(e => e.id === id)?.title || id)
        : []

    const payload = {
      form: location,
      fullName: formData.fullName,
      phone: canAttend ? formData.phone : '',
      adultCount: canAttend ? formData.adultCount : '0',
      childCount: canAttend ? formData.childCount : '0',
      selectedEvents,
      message: formData.message,
      note: formData.note,
      canAttend,
      rowId: rowId,
    }

    try {
      // Optimistic submission only (IndexedDB + service worker sync)
      const result = await submitRSVPOptimistic(payload)

      if (result.success) {
        setIsSubmitting(false)
        setIsSubmitted(true)
        setSubmittedData(formData)
        // Service worker will sync in background and handle rowId
      } else {
        console.error('Submission failed')
        setIsSubmitting(false)
        alert('Có lỗi xảy ra, vui lòng thử lại')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setIsSubmitting(false)
      alert('Có lỗi xảy ra, vui lòng thử lại')
    }
  }

  if (isSubmitted) {
    return (
      <section id="rsvp" className="py-20 px-4">
        <div className="max-w-lg mx-auto">
          <motion.div
            ref={successCardRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-sans text-2xl font-bold text-foreground mb-2">
              {config.rsvp.success.title}
            </h3>
            <p className="text-muted-foreground mb-6">
              {config.rsvp.success.message}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-primary mb-6">
              <Heart className="w-5 h-5 fill-current" />
              <span>{config.rsvp.success.footer}</span>
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div className="mt-4">
              <Button
                onClick={() => {
                  setIsSubmitted(false)
                  if (submittedData) {
                    setFormData(submittedData)
                  }
                  successCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                variant="outline"
                className="w-full border-2 border-primary text-primary hover:bg-primary/10 py-3 text-lg font-medium"
              >
                Chỉnh sửa xác nhận
              </Button>
            </div>

            {/* Gift suggestion */}
            <div className="mt-8 pt-8 border-t border-border/50">
              <div className="bg-primary/5 rounded-xl p-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Gift className="w-5 h-5 text-primary" />
                  <p className="font-medium text-foreground">Muốn gửi quà mừng online?</p>
                </div>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Nếu bạn không thể tham dự hoặc muốn gửi quà trước, hãy ghé qua phần Quà cưới nhé!
                </p>
                <Button
                  onClick={() => document.getElementById('gift')?.scrollIntoView({ behavior: 'smooth' })}
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10"
                >
                  <Heart className="w-4 h-4 mr-2 fill-primary" />
                  Gửi Quà Mừng
                  <Heart className="w-4 h-4 ml-2 fill-primary" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-20 px-4">
      <div className="max-w-lg mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">
            {config.rsvp.title}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-primary/40" />
            <Send className="w-5 h-5 text-primary" />
            <div className="h-px w-16 bg-primary/40" />
          </div>
          <p className="text-muted-foreground mt-4">
            Vui lòng cho chúng tôi biết bạn sẽ tham dự ngày nào
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {isSubmitting && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 text-center max-w-md mx-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">
                  Đang gửi xác nhận...
                </h3>
                <p className="text-muted-foreground mb-4">
                  Vui lòng đợi, đừng đóng trình duyệt
                </p>
                <p className="text-sm text-muted-foreground">
                  Việc này có thể mất vài giây
                </p>
              </div>
            </div>
          )}
          <form className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border/50 space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                {config.rsvp.fields.fullName.label}
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder={config.rsvp.fields.fullName.placeholder}
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                required
                className="border-border/50 focus:border-primary"
              />
            </div>

            {/* Phone - only show if canAttend */}
            {formData.canAttend && (
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  {config.rsvp.fields.phone.label}
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={config.rsvp.fields.phone.placeholder}
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required={formData.canAttend}
                  className="border-border/50 focus:border-primary"
                />
              </div>
            )}

            {/* Number of guests - only show if canAttend */}
            {formData.canAttend && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="adultCount" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    {config.rsvp.fields.adultCount.label}
                  </label>
                  <select
                    id="adultCount"
                    value={formData.adultCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, adultCount: e.target.value }))}
                    required={formData.canAttend}
                    className="w-full rounded-md border border-border/50 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {config.rsvp.fields.adultCount.options.map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="childCount" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Baby className="w-4 h-4 text-primary" />
                    {config.rsvp.fields.childCount.label}
                  </label>
                  <select
                    id="childCount"
                    value={formData.childCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, childCount: e.target.value }))}
                    className="w-full rounded-md border border-border/50 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {config.rsvp.fields.childCount.options.map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Note */}
            <div className="space-y-2">
              <label htmlFor="note" className="text-sm font-medium text-foreground flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-primary" />
                {config.rsvp.fields.note.label}
              </label>
              <Input
                id="note"
                type="text"
                placeholder={config.rsvp.fields.note.placeholder}
                value={formData.note}
                onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                className="border-border/50 focus:border-primary"
              />
            </div>

            {/* Attendance toggle */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, canAttend: true }))}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                  formData.canAttend
                    ? 'border-primary bg-primary/10 text-primary font-medium'
                    : 'border-border/50 text-muted-foreground hover:border-primary/30'
                }`}
              >
                <Smile className="w-5 h-5" />
                {config.rsvp.attendance.attending}
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, canAttend: false }))}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                  !formData.canAttend
                    ? 'border-destructive bg-destructive/10 text-destructive font-medium'
                    : 'border-border/50 text-muted-foreground hover:border-destructive/30'
                }`}
              >
                <Frown className="w-5 h-5" />
                {config.rsvp.attendance.notAttending}
              </button>
            </div>

            {/* Event selection - only show if canAttend is true */}
            {formData.canAttend && (
              <>
                {events.length === 1 ? (
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      {config.rsvp.fields.eventSelection.singleEventInfo}
                    </label>
                    <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
                      <p className="font-medium text-foreground">{events[0].title}</p>
                      <p className="text-sm text-muted-foreground">{events[0].date}</p>
                    </div>
                    <input
                      type="hidden"
                      name="selectedEvents"
                      value={events[0].id}
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      {config.rsvp.fields.eventSelection.label}
                    </label>
                    <div className="space-y-3">
                      {events.map((event) => (
                        <div
                          key={event.id}
                          className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                            formData.selectedEvents.includes(event.id)
                              ? 'border-primary bg-primary/5'
                              : 'border-border/50 hover:border-primary/30'
                          }`}
                        >
                          <Checkbox
                            id={event.id}
                            checked={formData.selectedEvents.includes(event.id)}
                            onCheckedChange={() => handleEventToggle(event.id)}
                            className="border-primary data-[state=checked]:bg-primary"
                          />
                          <label htmlFor={event.id} className="flex-1 cursor-pointer">
                            <p className="font-medium text-foreground">{event.title}</p>
                            <p className="text-sm text-muted-foreground">{event.date}</p>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                {config.rsvp.fields.message.label}
              </label>
              <textarea
                id="message"
                placeholder={config.rsvp.fields.message.placeholder}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={3}
                className="w-full rounded-md border border-border/50 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>

            {/* Submit buttons */}
            {formData.canAttend ? (
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  if (!formData.fullName) {
                    alert(config.rsvp.validation.nameRequired)
                    return
                  }
                  handleSubmit(e as any, true)
                }}
                disabled={isSubmitting || (events.length > 1 && formData.selectedEvents.length === 0)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {config.rsvp.buttons.submitting}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    {config.rsvp.buttons.confirm}
                    <Heart className="w-5 h-5 fill-current" />
                  </span>
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  if (!formData.fullName) {
                    alert(config.rsvp.validation.nameRequired)
                    return
                  }
                  handleSubmit(e as any, false)
                }}
                disabled={isSubmitting}
                variant="outline"
                className="w-full border-destructive text-destructive hover:bg-destructive/10 py-6 text-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {config.rsvp.buttons.submitting}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {config.rsvp.buttons.decline}
                  </span>
                )}
              </Button>
            )}

            {formData.canAttend && events.length > 1 && formData.selectedEvents.length === 0 && (
              <p className="text-sm text-muted-foreground text-center">
                {config.rsvp.validation.eventRequired}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
