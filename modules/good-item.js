const goodItem = Vue.component('goods-item', {
  props: ['good'],
  template: `
    <div class="goods-item">
      <h3>{{ good.product_name }}</h3>
      <p>{{ good.price }}</p>
      <button type="button" @click="app.addToCart()">В корзину</button>
    </div>
  `
});

module.exports = goodItem;