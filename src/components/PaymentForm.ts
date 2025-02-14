import { Form } from './common/Form';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

export class PaymentForm extends Form<void> {
	protected _card: HTMLButtonElement;
	protected _cash: HTMLButtonElement;
	private _paymentInput: HTMLInputElement;
	private paymentMethod: string | null = null;

	constructor(events: IEvents, container: HTMLFormElement) {
		super(events, container);

		this._card = ensureElement<HTMLButtonElement>('.button_alt[name=card]', this.container);
		this._cash = ensureElement<HTMLButtonElement>('.button_alt[name=cash]', this.container);

		this._paymentInput = document.createElement('input');
		this._paymentInput.type = 'hidden';
		this._paymentInput.name = 'payment';
		this.container.appendChild(this._paymentInput);
		this.inputs.push(this._paymentInput);

		this._card.addEventListener('click', () => this.handlePayment(this._card, 'online'));
		this._cash.addEventListener('click', () => this.handlePayment(this._cash, 'offline'));
	}

	private handlePayment(button: HTMLButtonElement, method: string): void {
		this.setActivePaymentButton(button);
		this.paymentMethod = method;
		this._paymentInput.value = this.paymentMethod;
		this.checkFormValidity();
	}

	private setActivePaymentButton(activeButton: HTMLButtonElement): void {
		this.toggleClass(this._card, 'button_alt-active', this._card === activeButton);
		this.toggleClass(this._cash, 'button_alt-active', this._cash === activeButton);
	}

	set adress(value: string) {
		this.setInputValues('address', value);
		this.validateNotEmpty('address', value);
	}
}