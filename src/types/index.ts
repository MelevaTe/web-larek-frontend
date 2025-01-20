interface IProduct {
	name: string;
	id: string;
	category: string;
	image: string;
	price: number;
	description: string;
	getProductInfo(): TProductInfo;
}

interface IOrder {
	payment: PaymentType;
	address: string;
	email: string;
	phone: string;
	products: IProduct[];
	setPaymentInfo(paymentInfo: TOrderPayment): void
	setContactInfo(contactInfo: TOrderInfo): void
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
	getProducts(): IProduct[];
	getTotalPrice(): number;
}

type TProductInfo = Pick<IProduct, "name" | "category" | "image" | "price" | "description">;
type TOrderPayment = Pick<IOrder, "payment" | "address">;
type TOrderInfo = Pick<IOrder, "email" | "phone">;
type PaymentType = "online" | "offline";