export type PaymentType = "online" | "offline";
export type TUserPayment = Pick<IUserModel, "payment" | "address">;
export type TUserContact = Pick<IUserModel, "email" | "phone">;


export interface IProductModel {
	id: string;
	title: string;
	category: string;
	image: string;
	price: number | null;
	description: string;
}

export interface IProductList {
	products: IProductModel[];
	preview: string | null;
	addProduct(product: IProductModel): void;
	deleteProduct(productId: string): void;
	getProduct(productId: string): IProductModel;
}

export interface IUserModel {
	payment: PaymentType;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}


export interface IBasket {
	products: IProductModel[];
	addProduct(product: IProductModel): void;
	deleteProduct(productId: string): void;
	clearCart(): void;
	getProducts(): IProductModel[];
	getTotalPrice(): number;
}

export interface IApiClient {
	getProductById(productId: string): Promise<IProductModel>;
	getProducts(): Promise<IProductModel[]>;
	createOrder(order: IUserModel): Promise<IUserModel>;
}

export type IOrderResult = IOrderSuccess | IOrderError;

export interface IOrderSuccess {
	id: string;
	total: number;
}

export interface IOrderError {
	error: string;
}