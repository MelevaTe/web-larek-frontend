import { Form } from './common/Form';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

export class PaymentForm extends Form<void> {

	protected _card: HTMLButtonElement;
	protected _cash: HTMLButtonElement;
	private paymentMethod: string | null = null;

	constructor(events: IEvents, container: HTMLFormElement) {
		super(events, container);

		this._card = ensureElement<HTMLButtonElement>('.button_alt[name=card]', this.container);
		this._cash = ensureElement<HTMLButtonElement>('.button_alt[name=cash]', this.container);

		this._card.addEventListener('click', () => {
			this.paymentMethod = 'online';
		});

		this._cash.addEventListener('click', () => {
			this.paymentMethod = 'offline';
		});
	}

	getInputValues() {
		const formData: Record<string, string> = super.getInputValues();
		if (this.paymentMethod) {
			formData['payment'] = this.paymentMethod;
		}
		return formData;
	}

	set adress(value: string) {
		this.setInputValues('address', value);
		this.validateNotEmpty('address', value);
	}
}