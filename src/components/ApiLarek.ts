import { IProductModel, IOrderResult, IUserModel } from '../types';
import { Api, ApiListResponse } from './base/api';

export class ApiLarek extends Api {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: any) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductList(): Promise<IProductModel[]> {
		return this.get('/product').then((data: ApiListResponse<IProductModel>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image
			}))
		);
	}

	getProductItem(id: string): Promise<IProductModel> {
		return this.get(`/product/${id}`).then(
			(data: IProductModel) => ({
				...data,
				image: this.cdn + data.image
			})
		);
	}

	orderProducts(order: IUserModel): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => {
			if ('id' in data) {
				return data;
			} else {
				return Promise.reject(data.error);
			}
		});
	}
}
