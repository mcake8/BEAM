const COL = {
	LARGE: 6,
	SMALL: 3
} as const

// prettier-ignore
const colPattern = [
  COL.LARGE, COL.SMALL, COL.SMALL, // ряд 1
  COL.LARGE, COL.LARGE,            // ряд 2
  COL.SMALL, COL.SMALL, COL.LARGE, // ряд 3
  COL.LARGE, COL.SMALL, COL.SMALL, // ряд 4
]

export const useGridPattern = () => {
	const getColSpan = (index: number): number =>
		colPattern[index % colPattern.length] ?? COL.LARGE

	return { getColSpan }
}
