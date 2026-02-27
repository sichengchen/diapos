import { useContext } from 'react'
import { DeckContext, type DeckState } from '../context/DeckContext'

export function useDeck(): DeckState {
  const context = useContext(DeckContext)
  if (!context) {
    throw new Error('useDeck must be used within a <Deck> component')
  }
  return context
}
