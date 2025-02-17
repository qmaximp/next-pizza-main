import { CheckoutItem, WhiteBlock } from '@/components'
import { PizzaSize, PizzaType } from '@/constants/pizza'
import { getCartItemDetails } from '@/lib'
import { CartStateItem } from '@/lib/getCartDetails'
import React from 'react'
import { CheckoutItemSkeleton } from '../CheckoutItemSkeleton'

interface Props {
	items: CartStateItem[]
	onClickCountButton: (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => void
	removeCartItem: (id: number) => void
	loading?: boolean
	className?: string
}

export const CheckoutCart: React.FC<Props> = ({
	items,
	onClickCountButton,
	removeCartItem,
	loading,
	className,
}) => {
	return (
		<WhiteBlock title='1. Корзина' className={className}>
			<div className='flex flex-col gap-5'>
				{items.length > 0
					? items.map(item => (
							<CheckoutItem
								key={item.id}
								id={item.id}
								imageUrl={item.imageUrl}
								details={getCartItemDetails(
									item.ingredients,
									item.pizzaType as PizzaType,
									item.pizzaSize as PizzaSize
								)}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
								disabled={item.disabled}
								onClickCountButton={type =>
									onClickCountButton(item.id, item.quantity, type)
								}
								onClickRemove={() => removeCartItem(item.id)}
							/>
					  ))
					: loading &&
					  [...Array(4)].map((_, index) => (
							<CheckoutItemSkeleton key={index} />
					  ))}
			</div>
		</WhiteBlock>
	)
}
