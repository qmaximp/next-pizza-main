import { useCart } from '@/hooks'

const { totalAmount } = useCart()

const VAT = 15
export const DELIVERY_PRICE = 250

export const vatPrice = (totalAmount * VAT) / 100
export const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice
