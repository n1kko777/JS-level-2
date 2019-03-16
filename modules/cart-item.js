const cartItem =
  Vue.component('cart-item', {
    props: ['item'],
    template: `
    <div class="cart-item">
      <h3>{{ item.product_name }}</h3>
      <p>{{ item.price }}</p>
      <button type="button" @click="app.deleteFromCart(item.id_product)">Удалить</button>
    </div>
  `
  });

  module.exports = cartItem;