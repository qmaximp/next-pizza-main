'use client'

import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
	AuthModal,
	CartButton,
	Container,
	ProfileButton,
	SearchInput,
} from '..'

interface Props {
	hasSearch?: boolean
	hasCart?: boolean
	className?: string
}

export const Headers = ({
	hasSearch = true,
	hasCart = true,
	className,
}: Props) => {
	const router = useRouter()
	const [openAuthModal, setOpenAuthModal] = useState(false)
	const searchParams = useSearchParams()
	const { data: session } = useSession()
	console.log(session)
	useEffect(() => {
		let toastMessage = ''

		if (searchParams.has('paid')) {
			toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.'
		}

		if (searchParams.has('verified')) {
			toastMessage = 'Почта успешно подтверждена!'
		}

		if (toastMessage) {
			setTimeout(() => {
				router.replace('/')
				toast.success(toastMessage, {
					duration: 3000,
				})
			}, 1000)
		}
	}, [router, searchParams])
	return (
		<header className={cn(' border-b', className)}>
			<Container className='flex items-center justify-between py-8'>
				{/* left part */}
				<Link href={'/'}>
					<div className='flex items-center gap-4'>
						<Image src='/logo.png' width={35} height={35} alt='Logo' />
						<div>
							<h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
							<p className='text-sm text-gray-400 leading-3'>
								вкусней уже некуда
							</p>
						</div>
					</div>
				</Link>

				{hasSearch && (
					<div className='mx-10 flex-1'>
						<SearchInput />
					</div>
				)}

				{/* right  part */}
				<div className='flex items-center gap-3'>
					<AuthModal
						open={openAuthModal}
						onClose={() => setOpenAuthModal(false)}
					/>
					<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

					{hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	)
}

export default Headers
