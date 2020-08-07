function showAlert(message, isCart=false) {
  const alertTemplate = `<div class="alert alert-dismissible alert-success
  " role="alert">
          <strong class="message">${message}</strong> 
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
          </button>
          ${ isCart ? '' : '<div class="goToCart"><button type="button" class="btn btn-success go__btn">Перейти до кошика</button></div>'}
        </div>`;
  const alertElement = $("body").append(alertTemplate);
  alertElement.alert();
  if(!isCart) {
    document.querySelector('.go__btn').addEventListener('click', () => {
      $(".alert").alert("close");
      document.querySelector('.openCartLink').click()
    })
  }
  setTimeout(() => {
    $(".alert").alert("close");
  }, 3000);
}
