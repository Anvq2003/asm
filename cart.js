function products(classProduct, img, name, price) {
   this.classProduct = classProduct;
   this.img = img;
   this.name = name;
   this.price = price;
   this.amount = 1;
}

var count = 0;
var result = 0;
var listProduct = [];
var nf = Intl.NumberFormat('ja-JP');
var cart = $('.header__buy-cart');
var id = 0;

const btns = $$('.product__img-cart');
const list = $('.header__buy-search--success')
const totalMoney = $('.header__success-total-price')


btns.forEach((button) => {
   button.addEventListener('click', (e) => {
      cart.style.display = 'block';
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
      for (var i = 0; i < listProduct.length; i++) {
         if (classProduct == listProduct[i].classProduct) check = false;
      }

      if (check == true) {
         listProduct.push(new products(classProduct, img, name, price));
      } else
         list.innerHTML = '';
      totalMoney.innerHTML = '';
      loadList();
      sum()
      deleteItem()
   })
})

function sum() {
   for (var i = 0; i < listProduct.length; i++) {
      result += Number(listProduct[i].price.replace(/,/g, '') * listProduct[i].amount);
   }
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
         list.innerHTML = '';
         totalMoney.innerHTML = '';
         loadList();
         sum()
         deleteItem()
      }

      add.onclick = (e) => {
         var classItem = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.value
         for (var i = 0; i < listProduct.length; i++) {
            if (classItem == listProduct[i].classProduct && listProduct[i].amount < 99) {
               listProduct[i].amount += 1;
            }
         }
         list.innerHTML = '';
         totalMoney.innerHTML = '';
         loadList();
         sum()
         deleteItem()
      }

      minus.onclick = (e) => {
         var classItem = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.value
         for (var i = 0; i < listProduct.length; i++) {
            if (classItem == listProduct[i].classProduct && listProduct[i].amount > 1) {
               listProduct[i].amount -= 1;
            }
         }
         list.innerHTML = '';
         totalMoney.innerHTML = '';
         loadList();
         sum()
         deleteItem()
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
   for (var i = listProduct.length - 1; i >= 0; i--) {
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


