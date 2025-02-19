'use client'
import { useEffect, useState } from 'react'

import 'react-dadata/dist/react-dadata.css'
interface Props {
	onChange?: (value?: string) => void
}
export const AdressInput = ({ onChange }: Props) => {
	const [isClient, setIsClient] = useState(false)
	useEffect(() => {
		setIsClient(true)
	}, [])
	return (
		<>
			{isClient ? (
				// <AddressSuggestions
				// 	token='1914854afcecce241bef1af5157a2694eda9a351'
				// 	onChange={(data: { value: string | undefined }) =>
				// 		onChange?.(data?.value)
				// 	}
				// />
				<input type='text' />
			) : null}
		</>
	)
}
