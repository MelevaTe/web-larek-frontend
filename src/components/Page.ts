import {Component} from "./base/Component";
import {IEvents} from "./base/events";
import {ensureElement} from "../utils/utils";

interface IPage {
	locked: boolean;
}

export class Page extends Component<IPage> {
	private cartCount: HTMLElement;
	protected _catalog: HTMLElement;
	protected _wrapper: HTMLElement;
	protected cartButton: HTMLButtonElement;


	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this.cartButton = ensureElement<HTMLButtonElement>(".header__basket", this.container);
		this.cartCount = ensureElement<HTMLElement>(".header__basket-counter", this.container);

		this.cartButton.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	updateCartCount(count: number): void {
		this.setText(this.cartCount, count);
	}

	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	set locked(value: boolean) {
		this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
	}
}