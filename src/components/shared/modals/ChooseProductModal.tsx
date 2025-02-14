'use client'
import { ProductWithRelations } from '@/app/@types/prisma'
import { ProductForm, Title } from '@/components'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface Props {
	product: ProductWithRelations
	className?: string
}
export const ChooseProductModal = ({ className, product }: Props) => {
	const router = useRouter()

	return (
		<Dialog
			open={Boolean(product)}
			onOpenChange={() => {
				router.back()
			}}
		>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[600px]  bg-white overflow-hidden',
					className
				)}
			>
				<DialogTitle className='hidden'></DialogTitle>
				<Title text={product.name} />
				<ProductForm product={product} onSubmit={() => router.back()} />
			</DialogContent>
		</Dialog>
	)
}
