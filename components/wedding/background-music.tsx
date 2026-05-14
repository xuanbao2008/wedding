'use client'

import { useState, useEffect, useRef } from 'react'
import { Music, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import config from '@/lib/config'

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const getRandomTrackIndex = () => {
    const urls = config.music.urls
    if (urls.length === 0) return 0
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * urls.length)
    } while (urls.length > 1 && newIndex === currentTrackIndex)
    return newIndex
  }

  const playNextTrack = () => {
    const newIndex = getRandomTrackIndex()
    setCurrentTrackIndex(newIndex)
    const audio = audioRef.current
    if (audio) {
      audio.src = config.music.urls[newIndex]
      audio.volume = isMuted ? 0 : config.music.defaultVolume
      audio.play()
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      // Set initial random track
      const initialIndex = Math.floor(Math.random() * config.music.urls.length)
      setCurrentTrackIndex(initialIndex)
      audio.src = config.music.urls[initialIndex]
      audio.volume = isMuted ? 0 : config.music.defaultVolume

      // Attempt to autoplay
      const attemptAutoplay = async () => {
        try {
          await audio.play()
          setIsPlaying(true)
        } catch (error) {
          // Autoplay was blocked, user interaction required
          console.log('Autoplay blocked, waiting for user interaction')
        }
      }

      attemptAutoplay()

      // Add scroll/touch trigger
      const handleInteraction = async () => {
        if (!isPlaying && audio) {
          try {
            await audio.play()
            setIsPlaying(true)
            // Remove listeners after successful play
            window.removeEventListener('scroll', handleInteraction)
            window.removeEventListener('touchstart', handleInteraction)
            window.removeEventListener('click', handleInteraction)
          } catch (error) {
            console.log('Play failed on interaction:', error)
          }
        }
      }

      window.addEventListener('scroll', handleInteraction, { once: true })
      window.addEventListener('touchstart', handleInteraction, { once: true })
      window.addEventListener('click', handleInteraction, { once: true })

      // Handle track end
      const handleEnded = () => {
        playNextTrack()
      }

      audio.addEventListener('ended', handleEnded)

      return () => {
        window.removeEventListener('scroll', handleInteraction)
        window.removeEventListener('touchstart', handleInteraction)
        window.removeEventListener('click', handleInteraction)
        audio.removeEventListener('ended', handleEnded)
      }
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = isMuted ? 0 : config.music.defaultVolume
    }
  }, [isMuted])

  const togglePlay = () => {
    const audio = audioRef.current
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <>
      <audio
        ref={audioRef}
        preload="auto"
      >
        <source src={config.music.urls[currentTrackIndex]} type="audio/mpeg" />
      </audio>

      {/* Music Control Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={togglePlay}
          size="icon"
          className="rounded-full w-12 h-12 bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg backdrop-blur-md"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? <Music className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>

        {/* Mute Button */}
        <Button
          onClick={toggleMute}
          size="icon"
          variant="ghost"
          className={`fixed bottom-20 right-6 rounded-full w-10 h-10 bg-card/90 hover:bg-card text-foreground shadow-lg backdrop-blur-md transition-all ${
            isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
      </div>
    </>
  )
}
