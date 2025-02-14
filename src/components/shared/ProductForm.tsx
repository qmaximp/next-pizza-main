'use client'

import { ProductWithRelations } from '@/app/@types/prisma'
import { useCartStore } from '@/store/cart'
import toast from 'react-hot-toast'
import { ChoosePizzaForm, ChooseProductForm } from '..'

interface Props {
	product: ProductWithRelations
	onSubmit?: VoidFunction
}

export const ProductForm = ({ product, onSubmit: _onSubmit }: Props) => {
	const state = useCartStore(state => state)
	const firstItem = product.items[0]
	const isPizzaForm = Boolean(firstItem.pizzaType)

	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try {
			const itemId = productItemId ?? firstItem.id
			await state.addCartItem({
				productItemId: itemId,
				ingredients,
			})
			toast.success(product.name + ' добавлена в корзину')
			_onSubmit?.()
		} catch (err) {
			toast.error('Не удалось добавить товар в корзину')
			console.error(err)
		}
	}

	if (isPizzaForm) {
		return (
			<ChoosePizzaForm
				imageUrl={product.imageUrl}
				name={product.name}
				ingredients={product.ingredients}
				items={product.items}
				onSubmit={onSubmit}
				loading={state.loading}
			/>
		)
	}

	return (
		<ChooseProductForm
			imageUrl={product.imageUrl}
			name={product.name}
			onSubmit={onSubmit}
			price={firstItem.price}
			loading={state.loading}
		/>
	)
}
