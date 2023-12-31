import { toggleCartStatus } from './toggleCartStatus.js';
import calcCartPriceAndDelivery from './calcCartPrice.js';

function counter() {
    window.addEventListener('click', function (event) {
        let counter;
        if (
            event.target.dataset.action === 'plus' ||
            event.target.dataset.action === 'minus'
        ) {
            const counterWrapper = event.target.closest('.counter-wrapper');
            counter = counterWrapper.querySelector('[data-counter]');
        }

        if (event.target.dataset.action === 'plus') {
            counter.innerText = ++counter.innerText;
        }

        if (event.target.dataset.action === 'minus') {
            // проверяем чтобы счетчик был больше 1
            if (parseInt(counter.innerText) > 1) {
                counter.innerText = --counter.innerText;
            } else if (
                // проверка на товар который находится в корзине:
                event.target.closest('.cart-wrapper') &&
                parseInt(counter.innerText) === 1
            ) {
                event.target.closest('.cart-item').remove();

                // Статус корзины пустая / полная:
                toggleCartStatus();

                // Перерасчет стоимости товаров в корзине:
                calcCartPriceAndDelivery();
            }
        }
        // Проверка на клик на +/- внутри корзины:
        if (
            event.target.hasAttribute('data-action') &&
            event.target.closest('.cart-wrapper')
        ) {
            calcCartPriceAndDelivery();
        }
    });
}

export { counter };
