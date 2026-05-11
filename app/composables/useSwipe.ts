interface UseSwipeOptions {
	onNext: () => void
	onPrev: () => void
	threshold?: number
}

export function useSwipe({ onNext, onPrev, threshold = 30 }: UseSwipeOptions) {
	let startX = 0
	let isDragging = false
	let hasMoved = false

	const onPointerdown = (event: PointerEvent) => {
		startX = event.clientX
		isDragging = true
		hasMoved = false
	}

	const onPointermove = (event: PointerEvent) => {
		if (!isDragging) return
		if (Math.abs(event.clientX - startX) > 5) hasMoved = true
	}

	const onPointerup = (event: PointerEvent) => {
		if (!isDragging) return
		isDragging = false
		const diff = startX - event.clientX
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
