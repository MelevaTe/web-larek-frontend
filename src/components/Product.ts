import { Component } from './base/Component';
import { IProductModel } from '../types';
import { ensureElement } from '../utils/utils';

interface ProductActions {
	onClick: (event: MouseEvent) => void;
}

const categoryMap: Record<string, string> = {
	'другое': 'other',
	'софт-скил': 'soft',
	'дополнительное': 'additional',
	'кнопка': 'button',
	'хард-скил': 'hard'
};


export class Product extends Component<IProductModel>{
	_title: HTMLElement;
	_category: HTMLElement;
	_image: HTMLImageElement;
	_price: HTMLElement;
	_description: HTMLElement;
	_button: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: ProductActions) {
		super(container);

		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);

		this._category = container.querySelector('.card__category');
		this._image = container.querySelector('.card__image');
		this._description = container.querySelector('.modal__description');
		this._button = container.querySelector('.card__button');


		if (this._button) {
			this._button.addEventListener('click', actions.onClick);
		}
		else {
			container.addEventListener('click', actions.onClick);
		}
	}

	set title(value: string) {
		this.setText(this._title, value)
	}

	get title() :string{
		return this._title.textContent;
	}

	set category(value: string) {
		if (this._category) {
			this.setText(this._category, value);
			const newClass = categoryMap[value];
			this.toggleClass(this._category, `card__category_${newClass}`, true);
		} else {
			console.warn('Элемент .card__category не найден в контейнере', this.container);
		}
	}

	set image(value: string) {
		this.setImage(this._image,value, this.title)
	}

	set price(value: string) {
		this.setText(this._price, `${value} синапсов`)
	}

	get price() :string {
		return this._price.textContent;
	}

	set description(value: string) {
		this.setText(this._description, value)
	}

	set button(value: string) {
		this.setText(this._button, value)
	}

	updateButtonText(inCart: boolean) {
		this.button = inCart ? 'Удалить из корзины' : 'В корзину';
	}
}