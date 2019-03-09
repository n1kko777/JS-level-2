console.clear();

let productId = 1000;
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

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
      <button type="button" @click="app.addToCart(good.product_name, good.price)">В корзину</button>
    </div>
  `
});

Vue.component('cart-list', {
  props: ['cart'],
  template: `
    <div class="cart-list">
      <cart-item v-for="item in cart" :item="item"></cart-item>
    </div>
  `
});

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

Vue.component('search', {
  template: `
    <div class="search">
      <input @input="app.searchLine = $event.target.value" type="text" class="goods-search" />
      <button @click="app.filterGoods()" class="search-button" type="button">Искать</button>
    </div>
  `
});

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    cart: [],
    searchLine: '',
    isVisibleCart: false,
    isNoHaveData: true,
    serverError: false
  },
  methods: {
    makeGETRequest(url) {
      return new Promise((resolve, reject) => {
        let xhr;

        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status !== 200)
              reject(xhr.responseText);
            resolve(xhr.responseText);
          }
        };

        xhr.open('GET', url, true);
        xhr.send();
      });
    },
    deleteFromCart(id) {
      const idx = this.cart.findIndex((el) => el.id_product === id);
      this.cart.splice(idx, 1);
    },
    addToCart(name, price) {
      this.cart.push({
        id_product: productId++,
        product_name: name,
        price: +price
      });
    },
    filterGoods() {
      if (this.searchLine === 0) {
        return this.goods;
      }
      this.filteredGoods = this.goods.filter((item) => {
        return item.product_name.toLowerCase().indexOf(this.searchLine.toLowerCase()) > -1;
      });
    }
  },
  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`)
      .then((goods) => {
        this.goods = JSON.parse(goods);
        this.filteredGoods = JSON.parse(goods);
      })
      .then(this.isNoHaveData = false)
      .catch(() => {
        this.isNoHaveData = true;
        this.serverError = true;
        console.log('Нет соединения с сервером');
      })
    this.makeGETRequest(`${API_URL}/getBasket.json`)
      .then((cart) => {
        this.cart = JSON.parse(cart).contents;
      })
      .catch(() => {
        this.serverError = true;
        console.log('Нет соединения с сервером');
      });
  }
});