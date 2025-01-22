type PaymentType = "online" | "offline";
type TProductInfo = Pick<IProductModel, "name" | "category" | "image" | "price" | "description">;
type TOrderPayment = Pick<IOrderModel, "payment" | "address">;
type TOrderInfo = Pick<IOrderModel, "email" | "phone">;



interface IProductModel {
	id: string;
	name: string;
	category: string;
	image: string;
	price: number | null;
	description: string;
}

interface IProduct {
	data: IProductModel;
	getProductInfo(): TProductInfo;
}

interface IOrderModel {
	payment: PaymentType;
	address: string;
	email: string;
	phone: string;
	total: number;
	items: string[];
}

interface IOrder {
	data: IOrderModel;
	setPaymentInfo(paymentInfo: TOrderPayment): void;
	setContactInfo(contactInfo: TOrderInfo): void;
	getTotalPrice(): number;
	validateOrder(): boolean;
}

interface IProductList {
	products: IProduct[];
	preview: string | null;
	addProduct(product: IProduct): void;
	deleteProduct(productId: string): void;
	getProduct(productId: string): IProduct;
}

interface ICart {
	products: IProduct[];
	addProduct(product: IProduct): void;
	deleteProduct(productId: string): void;
	clearCart(): void;
	getProducts(): IProduct[];
	getTotalPrice(): number;
}

interface IApiClient {
	getProductById(productId: string): Promise<IProductModel>;
	getProducts(): Promise<IProductModel[]>;
	createOrder(order: IOrderModel): Promise<IOrderModel>;
}