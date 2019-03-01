// console.clear();
// const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// function makeGETRequest(url) {
//   return new Promise((resolve, reject) => {
//     var xhr;

//     if (window.XMLHttpRequest) {
//       xhr = new XMLHttpRequest();
//     } else if (window.ActiveXObject) {
//       xhr = new ActiveXObject("Microsoft.XMLHTTP");
//     }

//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         if (xhr.status !== 200)
//           reject(xhr.responseText);
//         resolve(xhr.responseText);
//       }
//     }

//     xhr.open('GET', url, true);
//     xhr.send();
//   });
// }

// class GoodsItem {
//   constructor(product_name, price) {
//     this.product_name = product_name;
//     this.price = price;
//   }
//   render() {
//     return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
//   }
// }

// class GoodsList {
//   constructor(source = '') {
//     this.goods = [];
//     this.source = source;
//     this.listHtml = '';
//     this.filteredGoods = [];
//   }

//   applyData(jsonData) {}

  // filterGoods(value) {
  //   // Здесь будем фильтровать список товаров
  //   const regexp = new RegExp(value, 'i');
  //   this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
  //   this.render();
  // }

//   fetchGoods() {
//     return makeGETRequest(`${API_URL}/${this.source}`)
//       .then((response) => {
//         this.applyData(JSON.parse(response));
//         this.render();
//       })
//       .catch((response) => {})
//   }
//   render() {}
// }

// class Catalog extends GoodsList {
//   constructor() {
//     super('catalogData.json');
//   }

//   calculateTotalPrice() {
//     let totalPrice = 0;
//     this.goods.forEach(good => {
//       totalPrice += good.price;
//     });
//     return totalPrice;
//   }

//   applyData(jsonData) {
//     this.goods = jsonData;
//     this.filteredGoods = this.goods;
//   }

//   render() {
//     this.listHtml = '';
//     this.filteredGoods.forEach(good => {
//       const goodItem = new GoodsItem(good.product_name, good.price);
//       this.listHtml += goodItem.render();
//     });
//     document.querySelector('.goods-list').innerHTML = this.listHtml;
//   }
// }

// class Basket extends GoodsList {
//   constructor() {
//     super('getBasket.json');
//     this.totalPrice = 0;
//     this.countGoods = 0;
//   }

//   applyData(jsonData) {
//     this.goods = jsonData.contents;
//     this.totalPrice = jsonData.amount;
//     this.countGoods = jsonData.countGoods;
//     this.filteredGoods = this.goods;
//   }

//   addGood(goodItem) {
//     this.goods.push(goodItem);
//     this.totalPrice += goodItem.price;
//     this.countGoods += 1;
//     this.render();
//   }

//   deleteGood(goodId) {
//     const indexToDelete = this.goods.findIndex((item) => item.id_product === goodId);
//     this.goods.splice(indexToDelete, 1);

//     this.totalPrice -= this.goods[indexToDelete].price;
//     this.countGoods -= 1;
//     this.render();
//   }

//   render() {
//     this.listHtml = '';
//     this.filteredGoods.forEach(good => {
//       const goodItem = new GoodsItem(good.product_name, good.price);
//       this.listHtml += goodItem.render();
//     });
//     this.listHtml += `<div class='basket-price'>Сумма корзины: ${this.totalPrice}</div>`;
//     this.listHtml += `<div class='basket-count'>Кол-во товаров: ${this.countGoods}</div>`;
//     document.querySelector('.basket-list').innerHTML = this.listHtml;
//   }
// }

// const catalog = new Catalog();
// const basket = new Basket();
// catalog.fetchGoods();
// basket.fetchGoods()
//   .then(() => {
//     basket.addGood({
//       id_product: 453,
//       price: 12000,
//       product_name: "Шлепки",
//       quantity: 1,
//     });
//     basket.addGood({
//       id_product: 998,
//       price: 11000,
//       product_name: "Тапки",
//       quantity: 1,
//     });
//     basket.deleteGood(456);
//   });

// const searchButton = document.querySelector('.search-button'),
//   searchInput = document.querySelector('.goods-search');

// searchButton.addEventListener('click', (e) => {
//   const value = searchInput.value;

//   catalog.filterGoods(value);
// });

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


const app = new Vue({
  el: '#app',
  data: {
    emptyBasket: true,
    totalPrice: 0,
    countGoods: 0,
    goods: [],
    filteredGoods: [],
    searchLine: ''
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