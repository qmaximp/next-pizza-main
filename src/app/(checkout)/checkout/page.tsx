'use client'
import {
	CheckoutAddressForm,
	CheckoutCart,
	CheckoutPersonalForm,
	CheckoutSidebar,
	Container,
	Title,
} from '@/components'
import {
	checkoutFormSchema,
	CheckoutFormValues,
} from '@/constants/checkoutFormSchema'
import { useCart } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

const page = () => {
	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
		updateItemQuantity(id, newQuantity)
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart()

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	})
	const onSubmit = (data: CheckoutFormValues) => {
		console.log(data)
	}

	return (
		<Container className='mt-10'>
			<Title
				className='font-extrabold mb-8 text-[36px]'
				text={'Оформление заказа'}
				size='lg'
			/>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex gap-10'>
						<div className='flex flex-col gap-10 flex-1 mb-20'>
							{/* 1) cart */}
							<CheckoutCart
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								items={items}
							/>
							{/* 2) personal data */}
							<CheckoutPersonalForm />
							{/* 3) delivery address */}
							<CheckoutAddressForm />
						</div>
						{/* -------------- */}
						<div className='w-[450px]'>
							<CheckoutSidebar totalAmount={totalAmount} />
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	)
}

export default page
