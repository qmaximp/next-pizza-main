import { Ingredient, ProductItem } from '@prisma/client'
import { calcPizzaPrice } from '.'
import { PizzaSize, PizzaType, mapPizzaType } from '../constants/pizza'

export const getPizzaDetails = (
	type: PizzaType,
	size: PizzaSize,
	items: ProductItem[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const totalPrice = calcPizzaPrice(
		type,
		size,
		items,
		ingredients,
		selectedIngredients
	)
	const textDetaills = `${size} см, ${mapPizzaType[type]} пицца`

	return { totalPrice, textDetaills }
}
