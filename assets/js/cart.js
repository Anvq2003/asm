var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

const boxCart = $('.header__buy-cart--hover');
const cart = $('.header__buy-cart');

function showIcons() {
   if (cart.classList.contains('openCart')) {
      $('.icon-cart-cart').style.display = 'none';
      $('.icon-cart-x').style.display = 'block';
      $('.header__buy-search--success__moles').style.display = 'none';
   } else {
      $('.icon-cart-cart').style.display = 'block';
      $('.icon-cart-x').style.display = 'none';
      $('.header__buy-search--success__moles').style.display = 'block';
   }
}
function showHideCart() {
   cart.classList.toggle('openCart');
}

boxCart.addEventListener('click', () => {
   showHideCart()
   showIcons()
});

cart.addEventListener('click', (e) => e.stopPropagation())

function addCart() {
   if (!cart.classList.value.includes('openCart')) {
      cart.classList.add('openCart');
   }
}
// Giỏ hàng
function products(classProduct, img, name, price) {
   this.classProduct = classProduct;
   this.img = img;
   this.name = name;
   this.price = price;
   this.amount = 1;
}

var listProduct = [];
var count = 0;
var result = 0;
var id = 0;
var nf = Intl.NumberFormat('ja-JP');

const btns = $$('.product__img-cart');
const list = $('.header__buy-search--success')
const totalMoney = $('.header__success-total-price')


btns.forEach((button) => {
   button.addEventListener('click', (e) => {
      addCart()
      count++;
      var btnItem = e.target.parentElement;
      var product = btnItem.parentElement.parentElement;
      var img = product.querySelector('.product__img img').src;
      var name = product.querySelector('.product__info-name').innerText;
      var price = product.querySelector('.price-main').innerText;
      price = price.substring(0, price.length - 1);
      var classProduct = name + id;

      btnItem.style.display = 'none';
      product.querySelector('.product__img__more-success').classList.add('active');
      $('.header__buy-search--none').style.display = 'none';
      $('.header__buy-search-heading').style.display = 'block';

      var check = true;
      for (var i of listProduct) {
         if (classProduct == i.classProduct) check = false;
      }

      if (check == true) {
         listProduct.push(new products(classProduct, img, name, price));
      }

      resetCart();
   })
})

function sum() {
   result = listProduct.reduce((a, b) => a + (Number(b.price.replace(/,/g, '')) * b.amount), 0)
   totalMoney.innerHTML = `${nf.format(result)} đ`
   result = 0;
}

function deleteItem() {
   const delCarts = $$('.success__product-close');
   const minuss = $$('.prices-amount-minus');
   const adds = $$('.prices-amount-add');

   delCarts.forEach((button, index) => {
      var minus = minuss[index];
      var add = adds[index];

      button.onclick = (e) => {
         count--;
         var classItem = e.target.parentElement.parentElement.parentElement.classList.value;
         var nameCart = classItem.substring(0, classItem.length - 1)
         for (var i = 0; i < listProduct.length; i++) {
            if (classItem == listProduct[i].classProduct) {
               listProduct.splice(i, 1);
            }
         }
         showCart(nameCart);
         resetCart();
      }

      add.onclick = (e) => {
         var classItem = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.value
         for (var i = 0; i < listProduct.length; i++) {
            if (classItem == listProduct[i].classProduct && listProduct[i].amount < 99) {
               listProduct[i].amount += 1;
            }
         }
         resetCart();
      }

      minus.onclick = (e) => {
         var classItem = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.value
         for (var i = 0; i < listProduct.length; i++) {
            if (classItem == listProduct[i].classProduct && listProduct[i].amount > 1) {
               listProduct[i].amount -= 1;
            }
         }
         resetCart();
      }
   })
}

// Hàm hiển thị lại các nút giỏ hàng khi ẩn
function showCart(name) {
   const product = $$('.product')
   for (var i = 0; i < product.length; i++) {
      if (product[i].querySelector('.product__info-name').innerText === name) {
         product[i].querySelector('.product__img-cart').style.display = 'block';
         product[i].querySelector('.product__img__more-success').classList.remove('active');
      }
   }
}

function loadList() {
   for (var i = (listProduct.length - 1); i >= 0; i--) {
      list.innerHTML += `
      <div class="${listProduct[i].classProduct}">
         <div class="success__product">
            <div class="success__product-box-img">
               <img class="success__product-img" src="${listProduct[i].img}" alt="">
            </div>
            <div class="success__product-info">
            <div class="success-info-name">${listProduct[i].name}</div>
               <div class="success-info-prices">
                  <div class="prices-amount-box">
                     <input class="prices-amount-minus prices-amount-btn" type="button" value="-">
                     <span class="prices-amount">${listProduct[i].amount}</span>
                     <input class="prices-amount-add prices-amount-btn" type="button" value="+">
                  </div>
                  <span class="prices-price">${listProduct[i].price} <u>đ</u></span>
               </div>
            </div>
            <div class="success__product-close">
               <i class="success__product-close-icon fa-solid fa-xmark"></i>
            </div>
         </div>
      </div>
      `
   }

   $('.header__buy-search--success__moles').innerText = count;
   $('.header__buy-search-heading-amount').innerText = count;
   if (listProduct.length < 1) {
      $('.header__buy-search--success__moles').style.display = 'none';
      $('.header__buy-search--none').style.display = 'block';
      $('.header__success-control').style.display = 'none';
      $('.header__buy-search-heading').style.display = 'none';
   } else {
      $('.header__buy-search--success__moles').style.display = 'block';
      $('.header__buy-search-heading').style.display = 'block';
      $('.header__buy-search--none').style.display = 'none';
      $('.header__success-control').style.display = 'block';
   }
}

function resetCart() {
   list.innerHTML = '';
   totalMoney.innerHTML = '';
   loadList();
   sum()
   deleteItem()
   showIcons()
}
const showCart2 = $$('.product__img__more-success')
showCart2.forEach(item => {
   item.addEventListener('click', () => {
      if (!cart.classList.value.includes('openCart')) {
         cart.classList.add('openCart');
      }
      showIcons()
   })
})

// // Toast message
// function showSuccessToast() {
//    toast({
//       title: "Thành công !",
//       message: "Bạn đã thêm sản phẩm vào giỏ hàng.",
//       type: "success",
//       duration: 3000
//    });
// }

// // Toast function
// function toast({ title = "", message = "", type = "info", duration = 3000 }) {
//    const main = document.getElementById("toast");
//    if (main) {
//       const toast = document.createElement("div");

//       // Auto remove toast
//       const autoRemoveId = setTimeout(function () {
//          main.removeChild(toast);
//       }, duration + 1000);

//       // Remove toast when clicked
//       toast.onclick = function (e) {
//          if (e.target.closest(".toast__close")) {
//             main.removeChild(toast);
//             clearTimeout(autoRemoveId);
//          }
//       };

//       const icons = {
//          success: "fas fa-check-circle",
//          info: "fas fa-info-circle",
//          warning: "fas fa-exclamation-circle",
//          error: "fas fa-exclamation-circle"
//       };
//       const icon = icons[type];
//       const delay = (duration / 1000).toFixed(2);

//       toast.classList.add("toast", `toast--${type}`);
//       toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

//       toast.innerHTML = `
//                      <div class="toast__icon">
//                          <i class="${icon}"></i>
//                      </div>
//                      <div class="toast__body">
//                          <h3 class="toast__title">${title}</h3>
//                          <p class="toast__msg">${message}</p>
//                      </div>
//                      <div class="toast__close">
//                          <i class="fas fa-times"></i>
//                      </div>
//                  `;
//       main.appendChild(toast);
//    }
// }

