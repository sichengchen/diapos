import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Transition } from '../types'
import '../styles/transitions.css'

interface TransitionWrapperProps {
  children: ReactNode
  transition: Transition
  slideKey: number
  duration?: number
  direction: 'forward' | 'backward'
}

export function TransitionWrapper({
  children,
  transition,
  slideKey,
  duration = 300,
  direction,
}: TransitionWrapperProps) {
  const [isActive, setIsActive] = useState(true)
  const prevKeyRef = useRef(slideKey)

  useEffect(() => {
    if (transition === 'none') {
      setIsActive(true)
      return
    }

    if (slideKey !== prevKeyRef.current) {
      setIsActive(false)
      prevKeyRef.current = slideKey

      // Trigger enter animation on next frame
      const raf = requestAnimationFrame(() => {
        setIsActive(true)
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [slideKey, transition])

  if (transition === 'none') {
    return <div style={{ width: '100%', height: '100%' }}>{children}</div>
  }

  const enterClass =
    transition === 'fade'
      ? 'diapo-transition-fade-enter'
      : direction === 'forward'
        ? 'diapo-transition-slide-enter-forward'
        : 'diapo-transition-slide-enter-backward'

  const activeClass =
    transition === 'fade' ? 'diapo-transition-fade-active' : 'diapo-transition-slide-active'

  return (
    <div
      className={isActive ? activeClass : enterClass}
      style={{
        width: '100%',
        height: '100%',
        ['--diapo-transition-duration' as string]: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}
