let productId = 100;
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API_LOCAL = 'http://127.0.0.1:3000'

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
    isNoHaveDataCart: true,
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

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
              reject(xhr.responseText);
            } else {
              resolve(xhr.responseText);
            }
          }
        };

        xhr.open('GET', url, true);
        xhr.send();
      });
    },
    makePOSTRequest(url, name, price, productId) {
      return new Promise((resolve, reject) => {
        let xhr;

        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        const body = {
          'product_name': name,
          'price': price
        };


        xhr.onreadystatechange = () => {
          // resolve()
          if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
              console.log(xhr, "error");
            } else {
              console.log(xhr, "done");
            }
          }


        };

        console.log(body);


        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(body);
      });
    },
    deleteFromCart(id) {

      // const idx = this.cart.findIndex((el) => el.id_product === id);
      // this.cart.splice(idx, 1);
    },
    addToCart(name, price) {
      this.makePOSTRequest(`${API_LOCAL}/addToCart`, name, price, productId++)
        .then(() => {
          this.cart.push({
            id_product: productId,
            product_name: name,
            price: price
          });
        })
        .catch((error) => {
          console.log(error);
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
    this.makeGETRequest(`${API_LOCAL}/catalogData`)
      .then((goods) => {
        this.goods = JSON.parse(goods);
        this.filteredGoods = JSON.parse(goods);
        if (this.filteredGoods.length == 0) {
          this.isNoHaveData = true;
        }
      })
      .then(this.isNoHaveData = false)
      .catch(() => {
        if (this.filteredGoods.length == 0) {
          this.isNoHaveData = true;
        } else {
          this.serverError = true;
          console.log('Нет соединения с сервером');
        }
        this.isNoHaveData = true;
        this.serverError = true;
        console.log('Нет соединения с сервером');
      })
    this.makeGETRequest(`${API_LOCAL}/getBasket`)
      .then((cart) => {
        this.cart = JSON.parse(cart)[0].contents;
        if (this.cart.length == 0) {
          this.isNoHaveDataCart = true;
        }
      })
      .then(this.isNoHaveDataCart = false)
      .catch(() => {
        if (this.cart === undefined) {
          this.serverError = true;
          console.log('Нет соединения с сервером');
        } else {
          if (this.cart.length == 0) {
            this.isNoHaveDataCart = true;
          }
        }
      });
  }
});