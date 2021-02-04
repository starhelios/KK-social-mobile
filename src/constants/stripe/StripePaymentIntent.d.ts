export interface IStripePaymentIntent {
	id: string,
	object: string, // payment_intent,
	amount: number,
	amount_capturable: number,
	amount_received: number,
	application: null,
	application_fee_amount: null,
	canceled_at: null,
	cancellation_reason: null,
	capture_method: string, // automatic
	charges: {
			object: string, // list,
			data: [],
			has_more: boolean,
			total_count: number,
			url: string, // /v1/charges?payment_intent=pi_1IEX8wBSC3KohNVtcKTWsy9b
	},
	client_secret: string,
	confirmation_method: string, // automatic
	created: number,
	currency: string,
	customer: null,
	description: null,
	invoice: null,
	last_payment_error: null,
	livemode: boolean,
	metadata: {},
	next_action: null,
	on_behalf_of: null,
	payment_method: null,
	payment_method_options: {
			card: {
					installments: null,
					network: null,
					request_three_d_secure: string, // automatic
			}
	},
	payment_method_types: string[], // [card]
	receipt_email: null,
	review: null,
	setup_future_usage: null,
	shipping: null,
	source: null,
	statement_descriptor: null,
	statement_descriptor_suffix: null,
	status: string, 								// requires_payment_method
	transfer_data: null,
	transfer_group: null,
}
