var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

// Auto slicer
var bannerList = [
   './assets/img/slide2.jpg',
   './assets/img/slide3.jpg',
   './assets/img/slide1.jpg'
]
var index = 0;
setInterval(change, 2000)

function change() {
   var element = $('.container__img');
   if (index == 0) {
      element.src = bannerList[0]
   } else if (index == 1) {
      element.src = bannerList[1]
   } else {
      element.src = bannerList[2]
   }
   index++;
   if (index > 2) {
      index = 0;
   }
}

// Back to top 
window.addEventListener('scroll', backToTop);
var bttElement = $('.back-to-top');

function backToTop() {
   if (document.documentElement.scrollTop > 50) {
      bttElement.style.display = 'flex';
   }
   else {
      bttElement.style.display = 'none';
   }
}
// nav
window.addEventListener('scroll', nav);
var navElementBox = $('.header-box');
var navElement = $('.header');
var boxLogoElement = $('.header__box-logo');
var logoElement = $('.header__logo');

function nav() {
   if (document.documentElement.scrollTop > 50) {
      navElementBox.classList.add('opennav');
      navElement.style.height = '70px'
      logoElement.style.height = '30px';
      logoElement.style.width = 'auto';
      boxLogoElement.style.width = '152px';
   } else {
      navElementBox.classList.remove('opennav');
      logoElement.style.height = 'Auto';
      logoElement.style.width = '100%';
   }
}


// modal
var userElement = $('.header__buy-box-js');
var modalElement = $('.modal-js');
var modalBodyElement = $('.modal__container-js');
var closeElement = $('.modal-header-close-js');

userElement.addEventListener('click', moreModal)
modalElement.addEventListener('click', moreModal)
closeElement.addEventListener('click', moreModal)
modalBodyElement.addEventListener('click', (e) => e.stopPropagation())

function moreModal() {
   modalElement.classList.toggle('open')
}
