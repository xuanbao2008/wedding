// Service Worker for offline RSVP submission
const CACHE_NAME = 'wedding-rsvp-v1'
const RSVP_DB_NAME = 'WeddingRSVP'
const RSVP_STORE_NAME = 'pendingSubmissions'

// Open IndexedDB
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(RSVP_DB_NAME, 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains(RSVP_STORE_NAME)) {
        const store = db.createObjectStore(RSVP_STORE_NAME, { keyPath: 'id' })
        store.createIndex('timestamp', 'timestamp', { unique: false })
      }
    }
  })
}

// Save submission to IndexedDB
const saveSubmission = async (submission) => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([RSVP_STORE_NAME], 'readwrite')
    const store = transaction.objectStore(RSVP_STORE_NAME)
    const request = store.add(submission)
    
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// Get all pending submissions
const getPendingSubmissions = async () => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([RSVP_STORE_NAME], 'readonly')
    const store = transaction.objectStore(RSVP_STORE_NAME)
    const request = store.getAll()
    
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// Delete submission from IndexedDB
const deleteSubmission = async (id) => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([RSVP_STORE_NAME], 'readwrite')
    const store = transaction.objectStore(RSVP_STORE_NAME)
    const request = store.delete(id)
    
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

// Send submission to API
const sendSubmission = async (submission) => {
  try {
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission.data),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    
    // Delete from IndexedDB on success
    await deleteSubmission(submission.id)
    
    return result
  } catch (error) {
    console.error('Failed to send submission:', error)
    throw error
  }
}

// Sync all pending submissions
const syncPendingSubmissions = async () => {
  try {
    const submissions = await getPendingSubmissions()
    
    for (const submission of submissions) {
      try {
        await sendSubmission(submission)
        console.log('Successfully synced submission:', submission.id)
      } catch (error) {
        console.error('Failed to sync submission:', submission.id, error)
        // Continue with next submission
      }
    }
  } catch (error) {
    console.error('Error syncing submissions:', error)
  }
}

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/hai-phong',
        '/sai-gon',
      ])
    })
  )
  self.skipWaiting()
})

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event
self.addEventListener('fetch', (event) => {
  // Only cache GET requests
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response
        }
        return fetch(event.request).then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }
          
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })
          
          return response
        })
      })
    )
  }
})

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'rsvp-submission') {
    event.waitUntil(syncPendingSubmissions())
  }
})

// Handle messages from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SYNC_RSVP') {
    event.waitUntil(syncPendingSubmissions())
  }
})
