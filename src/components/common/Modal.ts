import { View } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';


export class Modal<T> extends View<T> {
	private content: HTMLElement;
	private closeButton: HTMLElement;

	constructor(events: IEvents, container: HTMLElement) {
		super(events, container);

		this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
		this.content = ensureElement<HTMLElement>('.modal__content', container);

		this.closeButton.addEventListener('click', () => {
			this.close();
		});
		this.container.addEventListener('click', () => this.close());
		this.content.addEventListener('click', (event) => event.stopPropagation());
	}

	set contentElement(value: HTMLElement) {
		this.content.replaceChildren(value);
	}

	open() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	close() {
		this.container.classList.remove('modal_active');
		this.contentElement = null;
		this.events.emit('modal:close');
	}

	render(data?: Partial<T>): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
