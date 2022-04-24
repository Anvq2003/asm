// slicer
$(document).ready(function () {
   $('.container__list-img').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 1000,
      arrows: true,
      prevArrow: '<i class="slick-slide-icon slick-slide-iconprevArrow fa-solid fa-angle-left"></i>',
      nextArrow: '<i class="slick-slide-icon slick-slide-iconnextArrow fa-solid fa-angle-right"></i>',
      pauseOnHover: false,
      pauseOnFocus: false,
      dots: true,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 1,
            }
         },
         {
            breakpoint: 769,
            settings: {
               slidesToShow: 1,
               arrows: false
            }
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               arrows: false,
               dots: false
            }
         }
      ]
   })
})

// slick sản phẩm
$(document).ready(function () {
   $('.slicks').slick({
      slidesToShow: 4,
      slidesToScroll: 2,
      infinite: true,
      arrows: true,
      prevArrow: '<i class="slick-iconArrow slick-iconprevArrow fa-solid fa-angle-left"></i>',
      nextArrow: '<i class="slick-iconArrow slick-iconnextArrow fa-solid fa-angle-right"></i>',
      autoplay: true,
      autoplaySpeed: 2500,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 4,
            }
         },
         {
            breakpoint: 769,
            settings: {
               slidesToShow: 3,
            }
         },
         {
            breakpoint: 376,
            settings: {
               slidesToShow: 2,
            }
         }
      ]
   });
})

