class ProductList {
  constructor(cart) {
    this.cart = cart;
    this.productOpenTesk = document.getElementById("openTesk");
    this.productSalamander = document.getElementById("salamander");
    this.productService = new ProductsService();
    this.productService
      .getProducts()
      .then(() => this.renderProducts())
      .then(() => this.addEventListeners());
  }
  async renderProducts() {
    let productListOpenTesk = "";
    let productListSalamander = "";
    const products = await this.productService.getProducts();
    products.forEach((product, index) => {
      if (index < 2) {
        productListOpenTesk += cargo(product);
      } else {
        productListSalamander += cargo(product);
      }
    });
    this.productOpenTesk.innerHTML = productListOpenTesk;
    this.productSalamander.innerHTML = productListSalamander;
  }
  addEventListeners() {
    document
      .querySelectorAll(".cargo__goods-card button.buy")
      .forEach((button) =>
        button.addEventListener("click", (event) =>
          this.handleProductBuyClick(event)
        )
      );
  }
  handleProductBuyClick(event) {
    const button = event.target;
    const id = button.dataset.id;
    this.cart.addProduct(id);
    window.showAlert('Товар уже в кошику');
  }
}

function cargo(goods) {
  return `
              <div class="cargo__goods-card">
                <div class="goods__picture">
                  <img
                    class="goods__img"
                    src="${goods.img}"
                    alt="Віконний профіль саламандер стрімлайн"
                  />
                </div>
                <div class="goods__info">
                  <h4 class="goods__title">${goods.title}</h4>
                  <p class="goods__item">
                    Монтажна ширина:
                    <span class="goods__item-value">${goods.mountingWidth}</span>
                  </p>
                  <p class="goods__item">
                    Кількість камер:
                    <span class="goods__item-value">${goods.numberCameras}</span>
                  </p>
                  <p class="goods__item">
                    Теплоізоляція:
                    <span class="goods__item-value">${goods.thermalInsulation}</span>
                  </p>
                  <p class="goods__item">
                    Звукоізоляція: <span class="goods__item-value">${goods.soundInsulation}</span>
                  </p>
                  <p class="goods__item">
                    Товщина склопакета:
                    <span class="goods__item-value">${goods.glassThickness}</span>
                  </p>
                  <div class="goods-prices">
                    <div class="goods__inner">
                      <div class="goods__old-price">
                        <span>${goods.oldPrice} грн</span>
                      </div>
                      <div class="goods__new-price">
                        <span>${goods.newPrice} грн</span>
                      </div>
                    </div>
                    <div class="box__btn">
                      <button 
                        type="button" 
                        class="btn btn-outline-success buy" 
                        data-id="${goods.id}">
                        Купити
                      </button>
                    </div>
                  </div>
                </div>
              </div>
`;
}
