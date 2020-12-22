export interface IFilter {
	minPrice: number | null,
	maxPrice: number | null,
	startDay: string | null,
	endDay: string | null,
	categoryName: string[],
}
