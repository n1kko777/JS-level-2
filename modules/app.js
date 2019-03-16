let productId = 100;
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API_LOCAL = 'http://127.0.0.1:3000'

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
    deleteFromCart(delete_id) {
      const goodId = delete_id;
      fetch(`${API_LOCAL}/removeFromCart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: goodId,
          })
        })
        .then(response => response.json())
        .then(json => {
          if (json.result == 1) {
            makeGETRequest(`${API_LOCAL}/getBasket`)
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
    },
    addToCart() {
      const getData = this.goods.filter((good) => good.id_product == event.target.id);
      fetch(`${API_LOCAL}/addToCart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(getData[0])
        })
        .then(response => response.json())
        .then(json => {
          if (json.result == 1) {
            makeGETRequest(`${API_LOCAL}/getBasket`)
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

module.exports = app;