const search = Vue.component('search', {
  template: `
    <div class="search">
      <input @input="app.searchLine = $event.target.value" type="text" class="goods-search" />
      <button @click="app.filterGoods()" class="search-button" type="button">Искать</button>
    </div>
  `
});

module.exports = search;