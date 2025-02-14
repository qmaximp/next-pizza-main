import {
	Container,
	Filters,
	ProductsGroupList,
	Title,
	TopBar,
} from '@/components'
import { findPizzas, GetSearchParams } from '@/lib/findPizzas'
import { Suspense } from 'react'
type Params = Promise<GetSearchParams>
export default async function Home({ searchParams }: { searchParams: Params }) {
	const params = await searchParams
	const categories = await findPizzas(params)
	return (
		<>
			<Container className='mt-10'>
				<Title text='Все пиццы' size='lg' className='font-extrabold' />
			</Container>
			<TopBar
				categories={categories.filter(category => category.products.length > 0)}
			/>
			<Container className='mt-10 mb-10'>
				<div className='flex gap-[60px]'>
					{/* filter */}
					<div className='w-[250px]'>
						<Suspense>
							<Filters />
						</Suspense>
					</div>
					{/* product list */}
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							{categories.map(
								category =>
									category.products.length > 0 && (
										<ProductsGroupList
											key={category.id}
											title={category.name}
											categoryId={category.id}
											items={category.products}
										/>
									)
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	)
}
