const cartList = Vue.component('cart-list', {
  props: ['cart'],
  template: `
    <div class="cart-list">
      <cart-item v-for="item in cart" :item="item"></cart-item>
    </div>
  `
});

module.exports = cartList;
