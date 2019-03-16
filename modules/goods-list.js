const goodsList = Vue.component('goods-list', {
  props: ['goods'],
  template: `
    <div class="goods-list">
      <goods-item v-for="good in goods" :good="good"></goods-item>
    </div>
  `
});

module.exports = goodsList;