import { updateCartTotalAmount } from '@/lib'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'prisma/prisma'
type Params = Promise<{ id: number }>

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
	try {
		const { id } = await params
		const data = (await req.json()) as { quantity: number }
		const token = req.cookies.get('cartToken')?.value
		if (!token) {
			return NextResponse.json({ error: 'Cart token not found' })
		}
		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: Number(id),
			},
		})
		if (!cartItem) {
			return NextResponse.json({ error: 'Cart item not found' })
		}
		await prisma.cartItem.update({
			where: {
				id: Number(id),
			},
			data: {
				quantity: data.quantity,
			},
		})
		const updatedUserCart = await updateCartTotalAmount(token)
		return NextResponse.json(updatedUserCart)
	} catch (error) {
		console.log('[CART_PATCH] server error', error)
		return NextResponse.json({ message: 'Server error' }, { status: 500 })
	}
}
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
	try {
		const { id } = await params
		const token = req.cookies.get('cartToken')?.value
		if (!token) {
			return NextResponse.json({ error: 'Cart token not found' })
		}
		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: Number(id),
			},
		})
		if (!cartItem) {
			return NextResponse.json({ error: 'Cart item not found' })
		}
		await prisma.cartItem.delete({
			where: {
				id: Number(id),
			},
		})
		const updatedUserCart = await updateCartTotalAmount(token)
		return NextResponse.json(updatedUserCart)
	} catch (error) {
		console.log('[CART_PATCH] server error', error)
		return NextResponse.json({ message: 'Server error' }, { status: 500 })
	}
}
