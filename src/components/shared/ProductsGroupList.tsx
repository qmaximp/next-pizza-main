'use client'
import { ProductWithRelations } from '@/app/@types/prisma'
import { useCategoryStore } from '@/store/category'
import { useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'
import { ProductCard, Title } from '..'

type Props = {
	title: string
	items: ProductWithRelations[]
	className?: string
	categoryId: number
	listClassName?: string
}
const ProductsGroupList = ({ title, items, className, categoryId }: Props) => {
	const setActiveCategoryId = useCategoryStore(state => state.setActiveId)
	const intersectionRef = useRef(null)
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.8,
	})
	useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId)
		}
	}, [categoryId, intersection?.isIntersecting, setActiveCategoryId])
	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} size='lg' className=' mb-5 font-extrabold' />
			<div className='grid grid-cols-3 gap-[50px]'>
				{items.map(product => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						imageUrl={product.imageUrl}
						price={product.items[0].price}
						ingredients={product.ingredients}
					/>
				))}
			</div>
		</div>
	)
}

export { ProductsGroupList }
