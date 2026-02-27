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
  const deckStateRef = useRef(deckState)
  deckStateRef.current = deckState

  useEffect(() => {
    if (!deckStateRef.current) return

    const channel = new BroadcastChannel(CHANNEL_NAME)
    channelRef.current = channel

    channel.onmessage = (event: MessageEvent<SyncMessage>) => {
      const state = deckStateRef.current
      if (!state) return

      const msg = event.data
      if (msg.type === 'navigate') {
        lastBroadcastRef.current = msg.index
        state.goTo(msg.index)
      } else if (msg.type === 'sync-request' && role === 'presenter') {
        channel.postMessage({ type: 'navigate', index: state.currentIndex })
      }
    }

    if (role === 'projector') {
      channel.postMessage({ type: 'sync-request' })
    }

    return () => {
      channel.close()
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
