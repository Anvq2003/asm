var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
// nav
window.addEventListener('scroll', nav);
var navElementBox = $('.header-box');
var navElement = $('.header');
var logoElement = $('.header__logo');

function nav() {
   if (document.documentElement.scrollTop > 50) {
      navElementBox.classList.add('opennav');
      logoElement.style.width = '96px';
   } else {
      navElementBox.classList.remove('opennav');
      logoElement.style.width = '154px';
   }
}


// modal user
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

// nav tablet mobile
var menu = $('.header__box-menu-js');
var modalNav = $('.modal-nav-is');
var navClose = $('.modal-nav-close-js');
var containerNav = $('.header__nav-m-c');

menu.addEventListener('click', showModalNav);
navClose.addEventListener('click', showModalNav);
modalNav.addEventListener('click', showModalNav);
containerNav.addEventListener('click', (e) => e.stopPropagation());

function showModalNav() {
   modalNav.classList.toggle('open-header');
}
