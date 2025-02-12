import { IBasket, IProductModel } from '../types';

export class BasketData implements IBasket {
	products: IProductModel[];

	constructor() {
		this.products = [];
	}

	addProduct(product: IProductModel): void {
		this.products.push(product);
	}

	deleteProduct(productId: string): void {
		this.products = this.products.filter((product) => product.id !== productId);
	}

	getProducts(): IProductModel[] {
		return this.products;
	}

	clearCart(): void {
		this.products = [];
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
