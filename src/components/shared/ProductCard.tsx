import { Ingredient } from '@prisma/client'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Button, Title } from '..'

type Props = {
	id: number
	name: string
	price: number
	imageUrl: string
	className?: string
	ingredients: Ingredient[]
}
const ProductCard = ({
	id,
	name,
	price,
	imageUrl,
	ingredients,
	className,
}: Props) => {
	return (
		<div className={className}>
			<Link href={`/product/${id}`}>
				<div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
					<img width={215} height={215} src={imageUrl} alt={name} />
				</div>
				<Title text={name} size='sm' className='mb-1 mt-3 font-bold' />
				<p className='text-sm text-gray-400'>
					{ingredients.map(ingredient => ingredient.name).join(', ')}
				</p>

				<div className='flex justify-between items-center mt-4'>
					<span className='text-[20px]'>
						от <b>{price} ₽</b>
					</span>
					<Button variant='secondary'>
						<Plus size={20} className='mr-1' />
						Добавить
					</Button>
				</div>
			</Link>
		</div>
	)
}

export { ProductCard }
