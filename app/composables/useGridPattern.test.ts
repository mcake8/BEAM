import { describe, expect, it } from 'vitest'
import { useGridPattern } from '@/composables/useGridPattern'

describe('useGridPattern', () => {
	const { getColSpan } = useGridPattern()

	it('первый товар - большая колонка', () => {
		expect(getColSpan(0)).toBe(6)
	})

	it('второй товар - маленькая колонка', () => {
		expect(getColSpan(1)).toBe(3)
	})

	it('третий товар - маленькая колонка', () => {
		expect(getColSpan(2)).toBe(3)
	})

	it('четвертый товар - большая колонка', () => {
		expect(getColSpan(3)).toBe(6)
	})

	it('пятый товар - большая колонка', () => {
		expect(getColSpan(4)).toBe(6)
	})

	it('шестой товар - маленькая колонка', () => {
		expect(getColSpan(5)).toBe(3)
	})

	it('отрицательный индекс - большая колонка по умолчанию', () => {
		expect(getColSpan(-1)).toBe(6)
	})

	it('неизвестный индекс - большая колонка по умолчанию', () => {
		expect(getColSpan(999)).toBe(6)
	})
})
