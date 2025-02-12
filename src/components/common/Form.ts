import { View } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement, ensureAllElements } from '../../utils/utils';

export abstract class Form<T> extends View<T> {
	protected submitButton: HTMLButtonElement;
	protected inputs: HTMLInputElement[];
	protected buttons: HTMLButtonElement[];
	protected errors: Record<string, HTMLElement> = {};

	constructor(events: IEvents, container: HTMLElement) {
		super(events, container);

		this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', container);
		this.inputs = ensureAllElements<HTMLInputElement>('input', container);
		this.buttons = ensureAllElements<HTMLButtonElement>('button', container);

		this.collectErrors();
		this.container.addEventListener('submit', (e) => this.handleSubmit(e));

		this.inputs.forEach((input) => {
			input.addEventListener('input', (e) => this.handleInputChange(e));
		});
	}

	private collectErrors() {
		this.errors['form'] = this.container.querySelector('.form__errors') as HTMLElement;
	}

	getInputValues(): Record<string, string> {
		const values: Record<string, string> = {};
		this.inputs.forEach((input) => {
			values[input.name] = input.value;
		});
		return values;
	}

	private handleInputChange(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input) {
			this.setInputValues(input.name, input.value);
			this.validateNotEmpty(input.name, input.value);
		}
	}

	protected validateNotEmpty(field: string, value: string): void {
		const isValid = value.trim().length > 0;
		this.setValid(isValid);
		this.setError({ field, value, validInformation: 'Это поле не может быть пустым' })
	}

	setInputValues(fieldName: string, value: string) {
		const input = this.inputs.find((input) => input.name === fieldName);
		if (input) {
			input.value = value;
		}
	}

	setValid(isValid: boolean): void {
		this.submitButton.disabled = !isValid;
	}

	setError({ field, value, validInformation }: { field: string; value: string; validInformation: string }): void {
		if (!value) {
			this.showInputError(field, validInformation);
		} else {
			this.hideInputError(field);
		}
	}

	showInputError(_field: string, errorMessage: string): void {
		const errorElement = this.errors['form'];
		if (errorElement) {
			errorElement.textContent = errorMessage;
			this.setVisible(errorElement);
		}
	}

	hideInputError(_field: string): void {
		const errorElement = this.errors['form'];
		if (errorElement) {
			errorElement.textContent = '';
			errorElement.style.display = 'none';
		}
	}

	close(): void {
		this.inputs.forEach((input) => {
			this.setInputValues(input.name, '');
		});
		this.setValid(false);
	}

	protected handleSubmit(event: Event) {
		event.preventDefault();
		const formData = this.getInputValues();
		this.events.emit(`form:submit:${this.container.getAttribute('name')}`, formData);
	}
}