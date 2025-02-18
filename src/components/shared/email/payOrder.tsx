import { calcCartItemTotalPrice } from '@/lib'

interface Props {
	orderId: number
	totalAmount: number
	paymentUrl: string
}

export const PayOrderTemplate = ({
	orderId,
	totalAmount,
	paymentUrl,
}: Props) => (
	<div>
		<h1>Заказ #{orderId}</h1>

		<p>
			Оплатите заказ на сумму <b>{} ₽</b>. Перейдите{' '}
			<a href={paymentUrl}>по этой ссылке</a> для оплаты заказа.
		</p>
	</div>
)
