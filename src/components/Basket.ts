import { createElement, ensureElement } from '../utils/utils';
import { View } from './base/Component';
import { EventEmitter } from './base/events';

interface IBasketView {
	_list: HTMLElement;
	_total: HTMLElement;
	_button: HTMLElement;
}

export class Basket extends View<IBasketView> {
		protected _list: HTMLElement;
		protected _total: HTMLElement;
		protected _button: HTMLElement;

		constructor(events: EventEmitter, container: HTMLElement) {
			super(events, container);

			this._list = ensureElement<HTMLElement>('.basket__list', this.container);
			this._total = ensureElement<HTMLElement>('.basket__price', this.container);
			this._button = ensureElement<HTMLElement>('.basket__button', this.container);

			this._button.addEventListener('click', () =>{
					events.emit('order:open')
			})

			this.items = [];
		}

		set items(items: HTMLElement[]) {
			if (items.length) {
				this._list.replaceChildren(...items);
				this._button.removeAttribute('disabled')
			}
			else {
				this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
					textContent: 'Тут как-то пусто... даже очень'
				}))
				this._button.setAttribute('disabled', 'disabled');
			}
			}

		set total(total: number) {
			if (this._total.textContent !== `${total} синапсов`) {
			this.setText(this._total, `${total} синапсов`);
			}
		}
}