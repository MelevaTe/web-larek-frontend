import { IProductList, IProductModel } from '../types';
import { EventEmitter } from "./base/events";

export class ProductsData implements IProductList {
	products: IProductModel[];
	preview: string | null;

	constructor(products: IProductModel[], preview: string | null = null, protected events: EventEmitter ) {
		this.products = products;
		this.preview = preview;
	}

	addProduct(product: IProductModel): void {
		this.products.push(product);
	}

	deleteProduct(productId: string): void {
		this.products = this.products.filter(product => product.id !== productId);
	}

	getProduct(productId: string): IProductModel {
		const product = this.products.find(product => product.id === productId);
		if (!product) {
			throw new Error(`Товар с id ${productId} не найден`);
		}
		return product;
	}

	getPreview(): string | null {
		return this.preview;
	}

	setPreview(productId: string): void {
		this.preview = productId;
	}

	setCatalog(products: IProductModel[]): void {
		this.products = products;
		this.events.emit('products:loaded', products);
	}
}
