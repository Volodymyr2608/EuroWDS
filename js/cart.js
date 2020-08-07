class Cart {
  constructor() {
    this.cartContainer = document.querySelector("#modal-cart");
    this.cart = JSON.parse(localStorage["cart"] || "{}");
    this.addEventListeners();
    this.updateBadge();
    this.productService = new ProductsService();
  }
  addEventListeners() {
    document
      .querySelector(".openCartLink")
      .addEventListener("click", () => this.renderCart());
  }
  saveCart() {
    localStorage["cart"] = JSON.stringify(this.cart);
  }
  async renderCart() {
    let total = 0;
    let saving = 0;
    let cartDomSting = "";
    let isEmpty = true;
    if (this.cartLength()) {
      isEmpty = false;
      for (const id in this.cart) {
        const product = await this.productService.getProductById(id);
        total += product.newPrice * this.cart[id];
        saving += (product.oldPrice - product.newPrice) * this.cart[id];
        cartDomSting += `<div class="card" data-id="${id}">
                <div class="card__img">
                  <img src="${product.img}" alt="" />
                </div>
                <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">
                    Продавець: EuroWDS
                  </h6>
                  <div class="cart-quantity">
                    <div class="cart-product__counter">
                      <div class="cart__counter">
                        <button class="button minus" data-id=${id}>
                          -
                        </button>
                        <input type="text" class="cart__counter-input" data-id=${id} value="${this.cart[id]}"/>
                        <button class="button plus" data-id=${id}>
                          +
                        </button>
                      </div>
                      <div class="cart-product__coast">
                        <p class="cart-product__price">
                          ${product.newPrice}
                          <span class="cart-product__price-currency">грн</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
      }
      cartDomSting += `
                <div class="row saving">
                    <div class="col-5"><span>Економія</span></div>
                    <div class="col-3"><span>${saving} грн</span></div>
                </div>
                <div class="row total">
                    <div class="col-5"><strong>Разом</strong></div>
                    <div class="col-3"><strong>${total} грн</strong></div>
                </div>            
        </div>
        <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary btn-close"
              data-dismiss="modal"
            >
              Скасувати
            </button>
            <button class="btn btn-success order">Підтвердити</button>
          </div>
        `;
    } else {
      cartDomSting += `
        <div class="cart-dummy">
          <img 
            alt=порожній кошик 
            class="cart-dummy__illustration" 
            src="img/modal-cart-dummy.svg">
          <h4 class="cart-dummy__heading"> Кошик порожній </h4>
          <p class="cart-dummy__caption"> Але це ніколи не пізно виправити :) </p>
        </div>
        <div class="modal-footer">
            <button
              type="button"
              class="btn btn-success btn-lg btn-block start-order"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">Почати покупки</span>
            </button>
        </div>`;
    }

    this.cartContainer.querySelector(
      ".cart-product-list-container"
    ).innerHTML = cartDomSting;

    if (!isEmpty) {
      this.cartContainer
        .querySelectorAll(".plus")
        .forEach((el) =>
          el.addEventListener("click", (ev) =>
            this.changeQuantity(ev, this.addProduct)
          )
        );
      this.cartContainer
        .querySelectorAll(".minus")
        .forEach((el) =>
          el.addEventListener("click", (ev) =>
            this.changeQuantity(ev, this.deleteProduct)
          )
        );
      this.cartContainer
        .querySelectorAll(".cart__counter-input")
        .forEach((el) =>
          el.addEventListener("change", (ev) => this.checkCount(ev))
        );
      this.cartContainer
        .querySelector('.order')
        .addEventListener('click', ev => this.order(ev));
    } else {
      this.cartContainer
        .querySelector(".start-order")
        .addEventListener("click", (ev) =>
          document.querySelector('.catalog').click()
        )
    }

  }
  changeQuantity(ev, operation) {
    const button = ev.target;
    const id = button.dataset.id;
    operation.call(this, id);
    this.renderCart();
  }
  addProduct(id) {
    this.cart[id] = (+this.cart[id] || 0) + 1;
    this.saveCart();
    this.updateBadge();
  }
  deleteProduct(id) {
    if (this.cart[id] > 1) {
      this.cart[id] -= 1;
    } else {
      delete this.cart[id];
    }
    this.saveCart();
    this.updateBadge();
  }
  checkCount(ev) {
    const input = ev.target;
    if (input.value < 1 || input.value.match(/\D/g)) {
      this.cart[input.dataset.id] = 1;
      this.saveCart();
      this.renderCart();
    } else {
      this.cart[input.dataset.id] = input.value;
      this.saveCart();
      this.renderCart();
    }
  }
  updateBadge() {
    document
      .querySelectorAll(".cart__number")
      .forEach((el) => (el.innerText = this.cartLength()));
  }
  cartLength() {
    return Object.keys(this.cart).length;
  }
  order(ev) {
    this.cart = {};
    this.saveCart();
    this.updateBadge();
    this.renderCart();
    this.cartContainer.querySelector(".close").click();
    window.showAlert("Дякуємо за покупку :)", true);
  }
}
