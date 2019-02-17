// const goods = [{
//     title: 'Shirt',
//     price: 150
//   },
//   {
//     title: 'Socks',
//     price: 50
//   },
//   {
//     title: 'Jacket',
//     price: 350
//   },
//   {
//     title: 'Shoes',
//     price: 250
//   },
// ];

// const renderGoodsItem = (title = "title", price = 0) => {
//   return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
// };

// const renderGoodsList = (list = []) => {
//   let goodsList = list.map(item => renderGoodsItem(item.title, item.price));

//   document.querySelector('.goods-list').innerHTML = goodsList.join('');;
// }

// renderGoodsList(goods);

console.clear();
class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [{
        title: 'Shirt',
        price: 150
      },
      {
        title: 'Socks',
        price: 50
      },
      {
        title: 'Jacket',
        price: 350
      },
      {
        title: 'Shoes',
        price: 250
      },
    ];
  }
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
  total() {
    let totalPrice = 0;
    this.goods.forEach(good => {
      totalPrice += good.price;
    });
    return totalPrice;
  }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
console.log(list.total());