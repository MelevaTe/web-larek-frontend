import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';

export class SuccessMessage extends Component<null>{
	private _closeButton: HTMLButtonElement;
	private _total: HTMLElement;

	constructor(events: IEvents, container: HTMLElement) {
		super(container)

		this._closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
		this._total = ensureElement<HTMLElement>('.order-success__description', this.container);

		this._closeButton.addEventListener('click', () => {
			events.emit('order:Success')
		});
	}

	set total(value: number) {
		this.setText(this._total, `Списано ${value} синапсов`)
	}

}
