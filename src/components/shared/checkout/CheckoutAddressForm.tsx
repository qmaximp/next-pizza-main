'use client'
import { FormTextarea, Input, WhiteBlock } from '@/components'
import React from 'react'

interface Props {
	className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title='3. Адрес доставки' className={className}>
			<div className='flex flex-col gap-5'>
				<Input placeholder='Введите адресс доставки...' />

				{/* <AdressInput /> */}

				<FormTextarea
					name='comment'
					className='text-base'
					placeholder='Комментарий к заказу'
					rows={5}
				/>
			</div>
		</WhiteBlock>
	)
}
