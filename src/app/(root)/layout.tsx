import { Headers } from '@/shared/Headers'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Next Pizza | Главная',
}

export default function HomeLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode
	modal: React.ReactNode
}>) {
	return (
		<main className='min-h-screen'>
			<Suspense>
				<Headers />
			</Suspense>
			{children}
			{modal}
		</main>
	)
}
