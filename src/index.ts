import './scss/styles.scss';
import { IProductModel, TUserContact, TUserPayment } from './types';
import { ProductsData } from './components/ProductsData';
import { BasketData } from './components/BasketData';
import { UserData } from './components/UserData';
import { ApiLarek } from './components/ApiLarek';
import { API_URL, CDN_URL } from './utils/constants';
import { Modal } from './components/common/Modal';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Product } from './components/Product';
import { Basket } from './components/Basket';
import { ProductsContainer } from './components/ProductsContainer';
import { PaymentForm } from './components/PaymentForm';
import { Contacts } from './components/ContactsForm';
import { SuccessMessage } from './components/Success';
import { Page } from './components/Page';


const api = new ApiLarek(CDN_URL, API_URL);
const events = new EventEmitter();

events.onAll(({ eventName, data }) => {
	console.log("ЛОГИРОВАНИЕ СОБЫТИЙ eventname + data",eventName, data);
})



const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const productCatalogTemplate= ensureElement<HTMLTemplateElement>('#card-catalog');
const productPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const productBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate= ensureElement<HTMLTemplateElement>('#contacts');



const page = new Page(document.body, events);
const productList = new ProductsContainer(events, ensureElement('.page'));
const modal = new Modal(events, ensureElement('#modal-container'));

const productsData = new ProductsData([], null ,events);
const userData = new UserData();
const basketData = new BasketData(events);
const basket = new Basket(events, cloneTemplate(basketTemplate));


events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});



events.on('basket:open', () => {
	modal.render({
		contentElement: basket.render()
	})
});


events.on('products:loaded', (products: IProductModel[]) => {
	productList.products = products.map(item => {
		const productCard = new Product(cloneTemplate(productCatalogTemplate), {
			onClick: () => events.emit('product:preview', item)
		});
		return productCard.render(item);
	});
});


events.on('product:preview', (product: IProductModel) => {
	if (product.price === null) {
		return ;
	}

	const inCart = basketData.findProduct(product.id);
	const productPreview = new Product(cloneTemplate(productPreviewTemplate), {
		onClick: () => {
			if (inCart) {
				events.emit('basket:deleteProduct', product);
			} else {
				events.emit('basket:addProduct', product);
			}
			productPreview.updateButtonText(!inCart);
			events.emit('product:preview', product);
		}
	});
	productPreview.updateButtonText(inCart);
	modal.render({
		contentElement: productPreview.render(product)
	});
});



events.on('basket:addProduct', (product: IProductModel) => {
	basketData.addProduct(product);
	events.emit('basket:update');
});

events.on('basket:deleteProduct', (product: IProductModel) => {
	basketData.deleteProduct(product.id);
	events.emit('basket:update');
});


events.on('counter:update', () => {
	page.updateCartCount(basketData.getTotalCount());
});

events.on('basket:update', () => {
	basket.items = basketData.getProducts().map((item, index) => {
		const productInBasket = new Product(cloneTemplate(productBasketTemplate), {
			onClick: () => events.emit('basket:deleteProduct', item)
		});
		productInBasket.index = index + 1;
		return productInBasket.render(item);
	});
	basket.total = basketData.getTotalPrice();
	basket.render();
});




events.on('order:open', () => {
	const order = new PaymentForm(events, cloneTemplate(orderTemplate));
	modal.render({
		contentElement: order.render()
	})
});

events.on('form:submit:order', (formData : TUserPayment) => {
	const contact = new Contacts(events, cloneTemplate(contactsTemplate));
	modal.render({
		contentElement: contact.render()
	})

	userData.setPaymentInfo(formData);
})

events.on('form:submit:contacts', (formData :TUserContact) => {
	userData.setContactInfo(formData);
	userData.setItemsInfo(basketData.getTotalPrice(),basketData.getProductIds())

	api.orderProducts(userData.getUserData())
		.then((data) => {
			const success = new SuccessMessage(events, cloneTemplate(successTemplate));
			if ('total' in data) {
				success.total = data.total;
			}
			modal.render({
				contentElement: success.render()
			});
		})
		.catch((error) => {
			console.error("Ошибка при создании заказа", error);
		});
});

events.on('order:Success', () => {
	basketData.clearCart()
	basket.items = [];
	basket.total = 0;
	basket.render();
	modal.close();
})

api.getProductList()
	.then(productsData.setCatalog.bind(productsData))
	.catch(err => {
		console.error(err);
	});



