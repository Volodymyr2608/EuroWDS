$(function () {
/*   $(".header__btn-menu").on("click", function () {
    $(".menu ul").slideToggle();
    console.log('click')
  }); */

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

  function showSlider() {
    if (window.innerWidth <= 670) {
      $(".cargo__goods-inner").not('.slick-initialized').slick({
        responsive: [
          {
            breakpoint: 2048,
            settings: "unslick"
          },
          {
            breakpoint: 670,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              arrows: false
            }
          }
        ]
      })
    }
  }

  window.onload = showSlider;
  window.addEventListener("resize", showSlider);


  $(".about__item-title").on("click", function () {
    $(this).toggleClass('open').next().slideToggle()
  }); 
});

const menuBtn = document.getElementById("menu__btn");

const closeBtn = document.getElementById('close-btn');
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => menu.classList.add("show"));
closeBtn.addEventListener("click", () => menu.classList.remove("show"));
