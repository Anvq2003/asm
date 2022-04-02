var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

// Auto slicer
var bannerList = [];
var index = 0;
var x;

document.body.onload = Loadimg;

function Loadimg() {
   for (var i = 0; i < 3; i++) {
      bannerList[i] = {};
      bannerList[i].src = `./assets/img/slide${i}.jpg`
      bannerList[i].href = `./introduce${i}.html`
   }
   play()
}

function play() {
   x = setInterval(() => nextplay(), 2000);
}

function nextplay() {
   if (index < 2) {
      index++;
      document.querySelector('.container__img').src = bannerList[index].src;
      document.querySelector('.container__link').href = bannerList[index].href;
   }
   if (index == 2) {
      index = 0;
   }
}
// back
$('.container-left').addEventListener('click', (e) => {
   e.preventDefault();
   back();
})

function back() {
   clearInterval(x);

   if (index > 0) {
      index--;
      document.querySelector('.container__img').src = bannerList[index].src;
      document.querySelector('.container__link').href = bannerList[index].href;
   }
   if (index == 0) {
      index = 2;
   }
   play();
}

// next
$('.container-right').addEventListener('click', (e) => {
   e.preventDefault();
   next();
})
function next() {
   clearInterval(x);
   if (index < 2) {
      index++;
      document.querySelector('.container__img').src = bannerList[index].src;
      document.querySelector('.container__link').href = bannerList[index].href;
   }
   if (index == 2) {
      index = 0;
   }
   play();
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

// nav tablet moble
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

// ///////////////////// Cart

// const btn = $$('.product__img-cart');
// const cart = $('.header__buy-cart');
// var count = 0;

// btn.forEach((button, index) => {
//    button.addEventListener('click', (e) => {
//       cart.style.display = 'block';
//       count++;
//       var btnItem = e.target.parentElement;
//       var product = btnItem.parentElement.parentElement;
//       var productImg = product.querySelector('.product__img img').src;
//       var productName = product.querySelector('.product__info-name').innerText;
//       var productPrice = product.querySelector('.price-main').innerText;
//       productPrice = productPrice.substring(0, productPrice.length - 1);
//       btnItem.style.display = 'none';
//       $('.header__buy-search--none').style.display = 'none';
//       $('.header__buy-search-heading').style.display = 'block';
//       addcart(productImg, productName, productPrice);
//       reload();
//       // setTimeout(() => {
//       //    cart.style.display = 'none';
//       // }, 3000);
//    })
// })

// function addcart(productImg, productName, productPrice) {
//    var addSuccess = document.createElement('div');
//    addSuccess.setAttribute('class', 'success__product')

//    var content = `<div class="success__product-box-img">
//                      <img class="success__product-img" src="${productImg}" alt="">
//                   </div>
//                   <div class="success__product-info">
//                   <div class="success-info-name">${productName}</div>
//                      <div class="success-info-prices">
//                         <div class="prices-amount-box">
//                            <input class="prices-amount-add prices-amount-btn" type="button" value="-">
//                            <input class="prices-amount" type="number" size="2" pattern="[0-9]*" inputmode="numeric" step="1" value="1" min="0" max="99">
//                            <input class="prices-amount-minus prices-amount-btn" type="button" value="+">
//                         </div>
//                         <span class="prices-price">${productPrice} <u>đ</u></span>
//                      </div>
//                   </div>
//                   <div class="success__product-close">
//                      <i class="success__product-close-icon fa-solid fa-xmark"></i>
//                   </div>
//    `
//    addSuccess.innerHTML = content;
//    var cart = $('.header__buy-search--success');

//    cart.appendChild(addSuccess)

//    carttotal();
//    deleteCart();
// }
// ////////////////////// total price
// function carttotal() {
//    var carItem = $$('.success__product');
//    var result = 0;
//    for (var i = 0; i < carItem.length; i++) {
//       var inputValue = carItem[i].querySelector('.prices-amount').value;
//       var productPrice = carItem[i].querySelector('.prices-price').innerText;
//       productPrice.substring(0, productPrice.length - 1);
//       productPrice = Number.parseInt(productPrice.replace(/,/g, '').trim());
//       var totalmultiply = inputValue * productPrice;
//       var result = result + totalmultiply;
//    }

//    document.querySelector('.header__success-total-price').innerText = result.toLocaleString("de-DE");
// }
// //////////////delete cart
// function deleteCart() {
//    const deleteCart = $$('.success__product-close');
//    const carItem = $$('.success__product');
//    deleteCart.forEach((close, index) => {
//       const item = carItem[index];
//       close.addEventListener('click', (e) => {
//          count--;
//          item.remove()
//          reload()
//          const name = e.target.parentElement.parentElement.querySelector('.success-info-name').innerText;
//          showCart(name);
//       });
//    })
// }
// function showCart(name) {
//    const nameProduct = $$('.product__info-name');
//    const product = $$('.product')
//    for (var i = 0; i < product.length; i++) {
//       if (product[i].querySelector('.product__info-name').innerText == name) {
//          product[i].querySelector('.product__img-cart').style.display = 'block';
//       }
//    }
// }
// function reload() {
//    const carItem = $$('.success__product');
//    $('.header__buy-search--success__moles').innerText = carItem.length;
//    $('.header__buy-search-heading-amount').innerText = carItem.length;
//    if (carItem.length < 1) {
//       $('.header__buy-search--none').style.display = 'block';
//       $('.header__success-control').style.display = 'none';
//       $('.header__buy-search-heading').style.display = 'none';
//    } else {
//       $('.header__buy-search-heading').style.display = 'block';
//       $('.header__buy-search--none').style.display = 'none';
//       $('.header__success-control').style.display = 'block';
//    }
// }