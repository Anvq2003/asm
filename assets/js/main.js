var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
// search 

const searchElement = document.querySelector('.header__buy-search--hover');
const subSearch = document.querySelector('.header__buy-search');
function showSearch() {
   subSearch.classList.toggle('openSearch');
}
searchElement.onclick = (e) => {
   showSearch()
   if (subSearch.classList.contains('openSearch')) {
      document.querySelector('.icon-buy-search').style.display = 'none'
      document.querySelector('.icon-buy-search-x').style.display = 'block'
   } else {
      document.querySelector('.icon-buy-search').style.display = 'block'
      document.querySelector('.icon-buy-search-x').style.display = 'none'
   }
}
subSearch.onclick = e => e.stopPropagation();
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
const userElement = $('.header__buy-box-js');
const modalElement = $('.modal-js');
const modalBodyElement = $('.modal__container-js');
const closeElement = $('.modal-header-close-js');

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
const menu = $('.header__box-menu-js');
const modalNav = $('.modal-nav-is');
const navClose = $('.modal-nav-close-js');
const containerNav = $('.header__nav-m-c');

menu.addEventListener('click', showModalNav);
navClose.addEventListener('click', showModalNav);
modalNav.addEventListener('click', showModalNav);
containerNav.addEventListener('click', (e) => e.stopPropagation());

function showModalNav() {
   modalNav.classList.toggle('open-header');
}