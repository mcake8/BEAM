interface useSwipeProps {
  onNext: () => void
  onPrev: () => void
  onGrabStart?: () => void
  onGrabEnd?: () => void
  threshold?: number
  axis?: 'x' | 'y'
}

export function useSwipe({
  onNext,
  onPrev,
  onGrabStart,
  onGrabEnd,
  threshold = 30,
  axis = 'x'
}: useSwipeProps) {
  let start = 0
  let isDragging = false
  let hasMoved = false

  const clientCoord = (event: PointerEvent) =>
    axis === 'y' ? event.clientY : event.clientX

  const onPointerdown = (event: PointerEvent) => {
    start = clientCoord(event)
    isDragging = true
    hasMoved = false
    onGrabStart?.()
  }

  const onPointermove = (event: PointerEvent) => {
    if (!isDragging) return
    if (Math.abs(clientCoord(event) - start) > 5) hasMoved = true
  }

  const onPointerup = (event: PointerEvent) => {
    if (!isDragging) return
    isDragging = false
    onGrabEnd?.()
    const diff = start - clientCoord(event)
    if (!hasMoved || Math.abs(diff) < threshold) return
    if (diff > 0) {
      onNext()
    } else {
      onPrev()
    }
  }

  const onPointercancel = () => {
    isDragging = false
    hasMoved = false
    onGrabEnd?.()
  }

  return {
    swipeHandlers: {
      onPointerdown,
      onPointermove,
      onPointerup,
      onPointerleave: onPointercancel,
      onPointercancel
    }
  }
}
