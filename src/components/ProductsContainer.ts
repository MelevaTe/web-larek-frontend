import { IEvents } from './base/events';
import { View } from './base/Component';
import { createElement, ensureElement } from '../utils/utils';

export class ProductsContainer extends View<null> {
	private productsList: HTMLElement;

	constructor(events: IEvents, container: HTMLElement) {
		super(events, container);
		this.productsList = ensureElement<HTMLElement>(".gallery", this.container);
		this.products = [];
	}

	set products(products: HTMLElement[]) {
		if (products.length) {
			this.productsList.replaceChildren(...products);
		}
		else {
			this.productsList.replaceChildren(createElement<HTMLParagraphElement>('p', {
				textContent: 'Тут как-то пусто... даже очень'
			}))
		}
	}
}