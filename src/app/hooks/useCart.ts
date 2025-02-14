import { CartStateItem } from '@/lib/getCartDetails'
import { CreateCartItemValues } from '@/services/dto/cart.dto'
import { useCartStore } from '@/store/cart'
import { useEffect } from 'react'

type ReturnProps = {
	totalAmount: number
	items: CartStateItem[]
	loading: boolean
	updateItemQuantity: (id: number, quantity: number) => void
	removeCartItem: (id: number) => void
	addCartItem: (values: CreateCartItemValues) => void
}

export const useCart = (): ReturnProps => {
	const cartState = useCartStore(state => state)

	useEffect(() => {
		cartState.fetchCartItems()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return cartState
}
