import { IEvents } from './base/events';
import { Form } from './common/Form';

export class Contacts extends Form<void> {
	constructor(events: IEvents, container: HTMLElement) {
		super(events, container);
	}

	set email(value: string) {
		this.setInputValues('email', value);
		this.validateNotEmpty('email', value);
	}

	set phone(value: string) {
		this.setInputValues('phone', value);
		this.validateNotEmpty('phone', value);
	}
}