$(function () {
  $(".header__btn-menu").on("click", function () {
    $(".menu ul").slideToggle();
    console.log('click')
  });

  $('.slider__inner').slick({
    nextArrow: '<div class="slick-btn slick-next"></div>',
    prevArrow: '<div class="slick-btn slick-prev"></div>',
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerPadding: '40px',
          slidesToShow: 1,
          autoplay: true,
          autoplaySpeed: 4000,
        }
      }
    ]
  });

  /* $(".slider__items").slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
  });

  $(".slider__quote").slick({
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: ".slider__person-img",
  });

  $(".slider__person-img").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".slider__quote",
    focusOnSelect: true,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: "20px",
    initialSlide: 2,
  });

  $('.footer__title').on("click", function () {
    $(this).toggleClass('open').next().slideToggle();
  }); */
});

console.log('hello')
