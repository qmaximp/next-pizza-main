import { ChooseProductModal } from '@/components'
import { notFound } from 'next/navigation'
import { prisma } from 'prisma/prisma'
type Params = Promise<{ id: number }>
export default async function ProductModalPage({ params }: { params: Params }) {
	const { id } = await params

	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			items: true,
		},
	})

	if (!product) {
		return notFound()
	}
	if (id) {
		return <ChooseProductModal product={product} />
	} else {
		return notFound()
	}
}
