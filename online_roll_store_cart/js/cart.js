import { toggleCartStatus } from './toggleCartStatus.js';
import calcCartPrice from './calcCartPrice.js';

function cart() {
    const cartWrapper = document.querySelector('.cart-wrapper');

    window.addEventListener('click', function (event) {
        if (event.target.hasAttribute('data-cart')) {
            const cart = event.target.closest('.card');

            const productInfo = {
                id: cart.dataset.id,
                imgSrc: cart.querySelector('.product-img').getAttribute('src'),
                title: cart.querySelector('.item-title').innerText,
                itemsInBox: cart.querySelector('[data-items-in-box]').innerText,
                weight: cart.querySelector('.price__weight').innerText,
                price: cart.querySelector('.price__currency').innerText,
                counter: cart.querySelector('[data-counter]').innerText,
            };
            const itemInCart = cartWrapper.querySelector(
                `[data-id="${productInfo.id}"]`
            );

            // Если есть товар в корзине, суммируем их:
            if (itemInCart) {
                const counterElement =
                    itemInCart.querySelector('[data-counter]');
                counterElement.innerText =
                    parseInt(counterElement.innerText) +
                    parseInt(productInfo.counter);

                // Добавляем новый товар в пустую корзину:
            } else {
                const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
								<div class="cart-item__top">
									<div class="cart-item__img">
										<img src="${productInfo.imgSrc}" alt="${productInfo.title}">
									</div>
									<div class="cart-item__desc">
										<div class="cart-item__title">${productInfo.title}</div>
										<div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>

										<!-- cart-item__details -->
										<div class="cart-item__details">

											<div class="items items--small counter-wrapper">
												<div class="items__control" data-action="minus">-</div>
												<div class="items__current" data-counter="">${productInfo.counter}</div>
												<div class="items__control" data-action="plus">+</div>
											</div>

											<div class="price">
												<div class="price__currency">${productInfo.price}</div>
											</div>

										</div>
										<!-- // cart-item__details -->

									</div>
								</div>
							</div>`;

                cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
            }
            cart.querySelector('[data-counter]').innerText = '1';

            // Статус корзины пустая / полная:
            toggleCartStatus();

            // Подсчет общей стоимости в корзине:
            calcCartPrice();
        }
    });
}

export { cart };
