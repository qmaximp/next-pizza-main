import { prisma } from 'prisma/prisma'

export interface GetSearchParams {
	query?: string
	sortBy?: string
	sizes?: string
	pizzaTypes?: string
	ingredients?: string
	priceFrom?: string
	priceTo?: string
}
const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 1000

export const findPizzas = async (params: GetSearchParams) => {
	const { ingredients, priceFrom, priceTo, pizzaTypes, sizes } = await params

	const size = sizes?.split(',').map(Number)
	const pizzaType = pizzaTypes?.split(',').map(Number)
	const ingredientsIdArr = ingredients?.split(',').map(Number)

	const minPrice = Number(priceFrom) || DEFAULT_MIN_PRICE
	const maxPrice = Number(priceTo) || DEFAULT_MAX_PRICE

	const categories = await prisma.category.findMany({
		include: {
			products: {
				orderBy: {
					id: 'desc',
				},
				where: {
					ingredients: ingredientsIdArr
						? {
								some: {
									id: {
										in: ingredientsIdArr,
									},
								},
						  }
						: undefined,
					items: {
						some: {
							size: {
								in: size,
							},
							pizzaType: {
								in: pizzaType,
							},
							price: {
								gte: minPrice, // >=
								lte: maxPrice, // <=
							},
						},
					},
				},
				include: {
					ingredients: true,
					items: {
						where: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
						orderBy: {
							price: 'asc',
						},
					},
				},
			},
		},
	})
	return categories
}
