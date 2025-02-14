import { Container } from '@/components'
import { ProductForm } from '@/components/shared/ProductForm'
import { notFound } from 'next/navigation'
import { prisma } from 'prisma/prisma'
type Params = Promise<{ id: string }>
export default async function ProductPage({ params }: { params: Params }) {
	const { id } = await params

	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
		include: {
			ingredients: true,
			category: {
				include: {
					products: {
						include: {
							items: true,
						},
					},
				},
			},
			items: true,
		},
	})
	if (!product) {
		return notFound()
	}
	if (id) {
		return (
			<Container className='flex flex-col my-10'>
				<ProductForm product={product} />
			</Container>
		)
	} else {
		return notFound()
	}
}
