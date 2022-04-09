// var document.querySelector = document.querySelector.bind(document);
// var document.querySelectorAll = document.querySelectorAll.bind(document);

const boxCart = document.querySelector('.header__buy-cart--hover');
const cart = document.querySelector('.header__buy-cart');
function showIcons() {
   if (cart.classList.contains('openCart')) {
      document.querySelector('.icon-cart-cart').style.display = 'none';
      document.querySelector('.icon-cart-x').style.display = 'block';
      document.querySelector('.header__buy-search--success__moles').style.display = 'none';
   } else {
      document.querySelector('.icon-cart-cart').style.display = 'block';
      document.querySelector('.icon-cart-x').style.display = 'none';
      document.querySelector('.header__buy-search--success__moles').style.display = 'block';
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
var id = 0;
var nf = Intl.NumberFormat('ja-JP');

const btns = document.querySelectorAll('.product__img-cart');
const list = document.querySelector('.header__buy-search--success')
const totalMoney = document.querySelector('.header__success-total-price')


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
      document.querySelector('.header__buy-search--none').style.display = 'none';
      document.querySelector('.header__buy-search-heading').style.display = 'block';

      var check = true;
      for (var i of listProduct) {
         if (classProduct == i.classProduct) check = false;
      }

      if (check == true) {
         listProduct.unshift(new products(classProduct, img, name, price));
      }

      resetCart();
   })
})

function sum() {
   var result = listProduct.reduce((a, b) => a + (Number(b.price.replace(/,/g, '')) * b.amount), 0)
   totalMoney.innerHTML = `${nf.format(result)} đ`
   result = 0;
}

function deleteItem() {
   const delCarts = document.querySelectorAll('.success__product-close');
   const minuss = document.querySelectorAll('.prices-amount-minus');
   const adds = document.querySelectorAll('.prices-amount-add');

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
   const product = document.querySelectorAll('.product')
   for (var i = 0; i < product.length; i++) {
      if (product[i].querySelector('.product__info-name').innerText === name) {
         product[i].querySelector('.product__img-cart').style.display = 'block';
         product[i].querySelector('.product__img__more-success').classList.remove('active');
      }
   }
}

function loadList() {
   list.innerHTML = listProduct.map((product) => {
      return `
      <div class="${product.classProduct}">
         <div class="success__product">
            <div class="success__product-box-img">
               <img class="success__product-img" src="${product.img}" alt="">
            </div>
            <div class="success__product-info">
            <div class="success-info-name">${product.name}</div>
               <div class="success-info-prices">
                  <div class="prices-amount-box">
                     <input class="prices-amount-minus prices-amount-btn" type="button" value="-">
                     <span class="prices-amount">${product.amount}</span>
                     <input class="prices-amount-add prices-amount-btn" type="button" value="+">
                  </div>
                  <span class="prices-price">${product.price} <u>đ</u></span>
               </div>
            </div>
            <div class="success__product-close">
               <i class="success__product-close-icon fa-solid fa-xmark"></i>
            </div>
         </div>
      </div>
      `
   })

   document.querySelector('.header__buy-search--success__moles').innerText = count;
   document.querySelector('.header__buy-search-heading-amount').innerText = count;
   if (listProduct.length < 1) {
      document.querySelector('.header__buy-search--success__moles').style.display = 'none';
      document.querySelector('.header__buy-search--none').style.display = 'block';
      document.querySelector('.header__success-control').style.display = 'none';
      document.querySelector('.header__buy-search-heading').style.display = 'none';
   } else {
      document.querySelector('.header__buy-search--success__moles').style.display = 'block';
      document.querySelector('.header__buy-search-heading').style.display = 'block';
      document.querySelector('.header__buy-search--none').style.display = 'none';
      document.querySelector('.header__success-control').style.display = 'block';
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

// click vào thanh xem thông tin khi đã thêm vào giỏ hàng
const showCart2 = document.querySelectorAll('.product__img__more-success')
showCart2.forEach(item => {
   item.addEventListener('click', () => {
      if (!cart.classList.value.includes('openCart')) {
         cart.classList.add('openCart');
      }
      showIcons()
   })
})


