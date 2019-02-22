const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


const makeGETRequest = new Promise((resolve, reject) => {
  let xhr,
    url = `${API_URL}/catalogData.json`;

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      resolve(xhr.responseText);
    }
    /**else 
    {
      reject();
    }
     */
  }

  xhr.open('GET', url, true);
  xhr.send();
});

class GoodsItem {
  constructor(product_name, price) {
    this.product_name = product_name;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
  }
}


class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods(cb) {

    // не понял как реализовать reject, то есть как отловить ошибку
    makeGETRequest
      .then((goods) => {
        this.goods.push(...JSON.parse(goods));
        cb();
      })
    /**.catch((error) => {
      // this.goods = JSON.parse(goods);
      console.log(error);
      
      
      cb();
    }) */
    ;
  }
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price);

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

  remove(product_id) {
    this.goods.forEach((good) => {
      if (good.id_product === product_id) {
        console.log(good);
      }
    });;
  }
}

const list = new GoodsList();
list.fetchGoods(() => {
  list.render();
  console.log(list.total());
});

// cart
const cart = [];

class AddToCart {
  constructor(id_product, product_name, price) {
    this.id_product = id_product;
    this.product_name = product_name;
    this.price = price;
  }

  addItem() {
    const goodItem = {
      id_product: this.id_product,
      product_name: this.product_name,
      price: this.price
    };
    cart.push(goodItem);
  }

}

class RemoveFromCart {
  constructor(id_product) {
    this.id_product = id_product;
  }

  removeItem() {
    cart.forEach((item) => {
      if (item.id_product === this.id_product) {
        cart.splice(cart.indexOf(item), 1);
      }
    });
  }
}

class GetAllFromCart {
  constructor() {}

  getItems() {
    cart.forEach(item => console.log(item));
  }
}

let addToCart = new AddToCart(234, "Монитор", 10000);

addToCart.addItem();

console.log(cart);

let removeFromCart = new RemoveFromCart(236);

removeFromCart.removeItem();

console.log(cart);

let getAllFromCart = new GetAllFromCart();
getAllFromCart.getItems();