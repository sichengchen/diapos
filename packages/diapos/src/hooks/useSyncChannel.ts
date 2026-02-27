import { useCallback, useEffect, useRef } from 'react'
import type { DeckState } from '../context/DeckContext'

type SyncMessage =
  | { type: 'navigate'; index: number }
  | { type: 'sync-request' }

const CHANNEL_NAME = 'diapos-sync'
const STORAGE_EVENT_KEY = 'diapos-sync:event'

interface StoragePayload {
  message: SyncMessage
  nonce: string
}

function postStorageMessage(message: SyncMessage) {
  try {
    const payload: StoragePayload = {
      message,
      nonce: `${Date.now()}-${Math.random()}`,
    }
    localStorage.setItem(STORAGE_EVENT_KEY, JSON.stringify(payload))
  } catch {
    // localStorage may be unavailable in some browser contexts
  }
}

function parseStorageMessage(value: string): SyncMessage | null {
  try {
    const parsed = JSON.parse(value) as StoragePayload
    if (!parsed || typeof parsed !== 'object' || !('message' in parsed)) return null
    return parsed.message
  } catch {
    return null
  }
}

export function useSyncChannel(
  deckState: DeckState | null,
  role: 'presenter' | 'projector',
) {
  const channelRef = useRef<BroadcastChannel | null>(null)
  const lastBroadcastRef = useRef<number>(-1)
  const deckStateRef = useRef(deckState)
  deckStateRef.current = deckState

  useEffect(() => {
    if (!deckStateRef.current) return

    let channel: BroadcastChannel | null = null
    try {
      channel = new BroadcastChannel(CHANNEL_NAME)
      channelRef.current = channel
    } catch {
      channel = null
      channelRef.current = null
    }

    const handleIncoming = (msg: SyncMessage) => {
      const state = deckStateRef.current
      if (!state) return

      if (msg.type === 'navigate') {
        lastBroadcastRef.current = msg.index
        state.goTo(msg.index)
      } else if (msg.type === 'sync-request' && role === 'presenter') {
        postMessage({ type: 'navigate', index: state.currentIndex })
      }
    }

    const postMessage = (message: SyncMessage) => {
      channel?.postMessage(message)
      postStorageMessage(message)
    }

    const requestSync = () => {
      postMessage({ type: 'sync-request' })
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_EVENT_KEY || !event.newValue) return
      const message = parseStorageMessage(event.newValue)
      if (!message) return
      handleIncoming(message)
    }

    if (channel) {
      channel.onmessage = (event: MessageEvent<SyncMessage>) => {
        handleIncoming(event.data)
      }
    }
    window.addEventListener('storage', handleStorage)

    const handleFocus = () => {
      requestSync()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        requestSync()
      }
    }

    if (role === 'projector') {
      requestSync()
      window.addEventListener('focus', handleFocus)
      document.addEventListener('visibilitychange', handleVisibilityChange)
    }

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      channel?.close()
      channelRef.current = null
    }
  }, [deckState === null, role]) // eslint-disable-line react-hooks/exhaustive-deps

  const broadcast = useCallback((index: number) => {
    if (channelRef.current && lastBroadcastRef.current !== index) {
      lastBroadcastRef.current = index
      channelRef.current.postMessage({ type: 'navigate', index })
    }
  }, [])

  useEffect(() => {
    if (role === 'presenter' && deckState) {
      broadcast(deckState.currentIndex)
    }
  }, [role, deckState?.currentIndex, broadcast]) // eslint-disable-line react-hooks/exhaustive-deps

  return { broadcast }
}
