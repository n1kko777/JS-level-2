const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    isVisible: true,
    totalPrice: 0,
    countGoods: 0,
    goods: [],
    filteredGoods: [],
    searchLine: '',
    basket: []
  },
  methods: {
    makeGETRequest(url, callback) {
      var xhr;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(xhr.responseText);
        }
      }
      xhr.open('GET', url, true);
      xhr.send();
    },
    filterGoods(value) {
      // Здесь будем фильтровать список товаров
      const regexp = new RegExp(value, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    }
  },
  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      this.filteredGoods = JSON.parse(goods);
    });
  }
});

Vue.component('goods-list', {
  props: ['goods'],
  template: `
    <div class="goods-list">
      <goods-item v-for="good in goods" :good="good"></goods-item>
    </div>
  `
});

Vue.component('goods-item', {
  props: ['good'],
  template: `
    <div class="goods-item">
      <h3>{{ good.product_name }}</h3>
      <p>{{ good.price }}</p>
    </div>
  `
});

Vue.component('basket-list', {
  props: ['basket'],
  template: `
  <div class="basket-list">
    <p v-if="app.countGoods === 0" class="empty">Корзина пуста!</p>
    <basket-item v-else></basket-item>
  </div>
  `
});

Vue.component('basket-item', {
  props: ['good'],
  template: `
    <div class="basket-item">
      <h3>{{ good.product_name }}</h3>
      <p>{{ good.price }}</p>
    </div>
  `
});

Vue.component('goods-search', {
  template: `
    <div class="search">
      <input v-model="app.searchLine" type="text" class="goods-search" />
      <button v-on:click="app.filterGoods(app.searchLine)" class="search-button" type="button">Искать</button>
    </div>
  `
});