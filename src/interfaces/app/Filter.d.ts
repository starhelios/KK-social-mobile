export interface IFilter {
	minPrice: number | null,
	maxPrice: number | null,
	startDay: Date | null,
	endDay: Date | null,
	categoryName: string[],
}
