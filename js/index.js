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


  $(".about__item-title").on("click", function () {
    $(this).toggleClass('open').next().slideToggle()
  }); 
});
