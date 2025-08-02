const CACHE_NAME = "love-story-v1"
const urlsToCache = [
  "/",
  "/manifest.json",
  "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap",
]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request)
    }),
  )
})

// Push notification handling
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "New memory added to your love story! 💕",
    icon: "/placeholder.svg?height=64&width=64&text=💕",
    badge: "/placeholder.svg?height=32&width=32&text=💕",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "View Memory",
        icon: "/placeholder.svg?height=32&width=32&text=👀",
      },
      {
        action: "close",
        title: "Close",
        icon: "/placeholder.svg?height=32&width=32&text=❌",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("Love Story 💕", options))
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"))
  }
})
