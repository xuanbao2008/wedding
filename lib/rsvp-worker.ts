// Client-side utility for RSVP submission with service worker
const RSVP_DB_NAME = 'WeddingRSVP'
const RSVP_STORE_NAME = 'pendingSubmissions'

export interface RSVPSubmission {
  id: string
  data: any
  timestamp: number
}

// Open IndexedDB
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(RSVP_DB_NAME, 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(RSVP_STORE_NAME)) {
        const store = db.createObjectStore(RSVP_STORE_NAME, { keyPath: 'id' })
        store.createIndex('timestamp', 'timestamp', { unique: false })
      }
    }
  })
}

// Save submission to IndexedDB
export const saveSubmission = async (submission: RSVPSubmission): Promise<void> => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([RSVP_STORE_NAME], 'readwrite')
    const store = transaction.objectStore(RSVP_STORE_NAME)
    const request = store.add(submission)
    
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

// Register service worker
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('Service Worker registered:', registration)
      
      // Wait for service worker to be active before registering sync
      await registration.active
      
      // Register background sync if supported
      if ('sync' in ServiceWorkerRegistration.prototype) {
        try {
          await (registration as any).sync.register('rsvp-submission')
          console.log('Background sync registered')
        } catch (syncError) {
          console.log('Background sync not available:', syncError)
        }
      }
      
      return registration
    } catch (error) {
      console.error('Service Worker registration failed:', error)
      return null
    }
  }
  return null
}

// Trigger sync manually
export const triggerSync = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready
    if ('sync' in ServiceWorkerRegistration.prototype) {
      await (registration as any).sync.register('rsvp-submission')
    } else {
      // Fallback: send message to service worker
      registration.active?.postMessage({ type: 'SYNC_RSVP' })
    }
  }
}

// Submit RSVP with optimistic update
export const submitRSVPOptimistic = async (data: any): Promise<{ success: boolean; rowId?: string; optimistic: boolean }> => {
  const submissionId = `${Date.now()}-${Math.random()}`
  const submission: RSVPSubmission = {
    id: submissionId,
    data,
    timestamp: Date.now(),
  }
  
  // Save to IndexedDB first (optimistic)
  await saveSubmission(submission)
  
  // Register service worker if not already registered
  await registerServiceWorker()
  
  // Trigger background sync
  await triggerSync()
  
  // Return optimistic success
  return {
    success: true,
    optimistic: true,
  }
}
