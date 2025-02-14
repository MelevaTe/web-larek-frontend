import { IBasket, IProductModel } from '../types';
import { EventEmitter } from './base/events';

export class BasketData implements IBasket {
	products: IProductModel[];
	events: EventEmitter;

	constructor(events: EventEmitter) {
		this.products = [];
		this.events = events;
	}

	private updatecounter(): void {
		this.events.emit('counter:update');
	}

	addProduct(product: IProductModel): void {
		this.products.push(product);
		this.updatecounter();
	}

	deleteProduct(productId: string): void {
		this.products = this.products.filter((product) => product.id !== productId);
		this.updatecounter();
	}

	getProducts(): IProductModel[] {
		return this.products;
	}

	clearCart(): void {
		this.products = [];
		this.updatecounter();
	}

	getProductIds(): string[] {
		return this.products.map(product => product.id);
	}

	getTotalPrice(): number {
		return this.products.reduce((total, product) => total + (product.price || 0), 0);
	}

	getTotalCount(): number {
		return this.products.length;
	}

	findProduct(productId: string): boolean {
		return this.products.filter((product) => product.id === productId).length > 0 ;
	}
}
