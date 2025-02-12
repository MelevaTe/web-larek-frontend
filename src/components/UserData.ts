import { IUserModel, PaymentType, TUserContact, TUserPayment } from '../types';

export class UserData implements IUserModel{
	payment: PaymentType;
	address: string;
	email: string;
	phone: string;
	total: number;
	items: string[];


	setPaymentInfo(paymentInfo: TUserPayment): void {
		this.payment = paymentInfo.payment;
		this.address = paymentInfo.address;
	}

	setContactInfo(contactInfo: TUserContact): void {
		this.email = contactInfo.email;
		this.phone = contactInfo.phone;
	}

	setItemsInfo(total: number, items: string[]): void {
		this.total = total;
		this.items = items;
	}

	getUserData(): IUserModel {
		return {
			payment: this.payment,
			address: this.address,
			email: this.email,
			phone: this.phone,
			total: this.total,
	 		items: this.items,
		};
	}
}

