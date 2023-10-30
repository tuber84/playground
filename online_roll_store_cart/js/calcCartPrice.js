export default function cartCalcPriceAndDelivery() {
    const cartItems = document.querySelectorAll('.cart-item');
    const totalPriceEl = document.querySelector('.total-price');
    const deliveryCost = document.querySelector('.delivery-cost');
    const cartDelivery = document.querySelector('[data-cart-delivery]');

    let totalPrice = 0;

    cartItems.forEach(function (item) {
        const amountEl = item.querySelector('[data-counter]');
        const priceEl = item.querySelector('.price__currency');

        const currentPrice =
            parseInt(amountEl.innerText) * parseInt(priceEl.innerText);

        totalPrice += currentPrice;
    });

    // Показываем цену товара на странице:
    totalPriceEl.innerText = totalPrice;

    // Тоглим блок стоиомсти заказа:
    if (totalPrice > 0) {
        cartDelivery.classList.remove('none');
    } else {
        cartDelivery.classList.add('none');
    }

    // Показываем стоимость доставки:
    if (totalPrice >= 600) {
        deliveryCost.classList.add('free');
        deliveryCost.innerText = 'free';
    } else {
        deliveryCost.classList.remove('free');
        deliveryCost.innerText = '250p';
    }
}
