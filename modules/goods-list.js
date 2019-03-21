const goodsList = Vue.component('goods-list', {
  props: ['goods', 'cart'],
  template: `
    <div class="goods-list">
      <goods-item v-for="good in goods" @add-item="addToCart()" :good="good"></goods-item>
    </div>
  `,
  methods: {

    addToCart() {
      const getData = this.goods.filter((good) => good.id_product == event.target.id);

      fetch(`http://127.0.0.1:3000/addToCart`, {
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
            'Content-Type': 'application/json'
          },
          mode: 'cors',
          body: {
            "product_name": "Колонки",
            "price": 130
          }
        })
        .then(response => response.json())
        .then(json => {
          if (json.result == 1) {
            console.log(json.result, 'success');

            // makeGETRequest(`${API_LOCAL}/getBasket`)
            //   .then((cart) => {
            //     this.cart = JSON.parse(cart)[0].contents;
            //     if (this.cart.length == 0) {
            //       this.isNoHaveDataCart = true;
            //     }
            //   })
            //   .then(this.isNoHaveDataCart = false)
            //   .catch(() => {
            //     if (this.cart === undefined) {
            //       this.serverError = true;
            //       console.log('Нет соединения с сервером');
            //     } else {
            //       if (this.cart.length == 0) {
            //         this.isNoHaveDataCart = true;
            //       }
            //     }
            //   });
          } else {

            console.log(json.result, 'error');
          }
        });
    },
  }
});

module.exports = goodsList;