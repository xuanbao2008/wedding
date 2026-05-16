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

// Direct fetch submission (fallback for browsers without Service Worker support)
const submitRSVPDirect = async (data: any): Promise<{ success: boolean; rowId?: string }> => {
  try {
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return {
      success: true,
      rowId: result.rowId,
    }
  } catch (error) {
    console.error('Direct submission failed:', error)
    return {
      success: false,
    }
  }
}

// Submit RSVP with optimistic update or direct fetch fallback
export const submitRSVPOptimistic = async (data: any): Promise<{ success: boolean; rowId?: string; optimistic: boolean }> => {
  // Check if Service Worker and IndexedDB are supported
  const hasServiceWorker = 'serviceWorker' in navigator
  const hasIndexedDB = 'indexedDB' in window

  // If not supported, use direct fetch
  if (!hasServiceWorker || !hasIndexedDB) {
    console.log('Service Worker or IndexedDB not supported, using direct fetch')
    const result = await submitRSVPDirect(data)
    return {
      ...result,
      optimistic: false,
    }
  }

  // Use optimistic approach with Service Worker
  try {
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
  } catch (error) {
    console.error('Optimistic submission failed, falling back to direct fetch:', error)
    // Fallback to direct fetch if optimistic approach fails
    const result = await submitRSVPDirect(data)
    return {
      ...result,
      optimistic: false,
    }
  }
}
