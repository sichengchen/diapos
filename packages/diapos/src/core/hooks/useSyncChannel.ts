import { useCallback, useEffect, useRef } from 'react'
import type { DeckState } from '../context/DeckContext'

type SyncMessage =
  | { type: 'navigate'; index: number }
  | { type: 'sync-request' }

const CHANNEL_NAME = 'diapos-sync'

export function useSyncChannel(
  deckState: DeckState | null,
  role: 'presenter' | 'projector',
) {
  const channelRef = useRef<BroadcastChannel | null>(null)
  const lastBroadcastRef = useRef<number>(-1)
  const hasReceivedSyncRef = useRef(false)
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
        hasReceivedSyncRef.current = true
        lastBroadcastRef.current = msg.index
        state.goTo(msg.index)
      } else if (msg.type === 'sync-request' && role === 'presenter') {
        postMessage({ type: 'navigate', index: state.currentIndex })
      }
    }

    const postMessage = (message: SyncMessage) => {
      channel?.postMessage(message)
    }

    const requestSync = () => {
      postMessage({ type: 'sync-request' })
    }

    if (channel) {
      channel.onmessage = (event: MessageEvent<SyncMessage>) => {
        handleIncoming(event.data)
      }
    }

    let retryTimer: number | null = null

    const handleFocus = () => {
      requestSync()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        requestSync()
      }
    }

    if (role === 'projector') {
      hasReceivedSyncRef.current = false
      requestSync()
      window.addEventListener('focus', handleFocus)
      document.addEventListener('visibilitychange', handleVisibilityChange)

      retryTimer = window.setInterval(() => {
        if (!hasReceivedSyncRef.current) {
          requestSync()
        }
      }, 1000)
    }

    return () => {
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (retryTimer != null) {
        window.clearInterval(retryTimer)
      }
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
