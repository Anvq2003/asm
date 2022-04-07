var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

const ipElement = $$('.form-control')
const formElement = $('.form-submit')
var check = false;
var information;

formElement.addEventListener('click', e => {
   e.preventDefault();
   ipElement.forEach((ip, index) => {
      var groupElement = ip.parentElement
      var error = groupElement.querySelector('.form-message');

      ip.addEventListener('input', () => {
         groupElement.classList.remove('invalid')
         error.innerText = '';
      })

      if (!ip.value.trim()) {
         groupElement.classList.add('invalid')
         error.innerText = 'Vui lòng nhập trường này !';
      }

   })

   for (var i = 0; i < ipElement.length; i++) {
      if (ipElement[i].value.trim()) {
         information = {
            fullname: ipElement[0].value,
            email: ipElement[1].value,
            password: ipElement[2].value,
            password_confirmation: ipElement[3].value
         }
      }
   }
   console.log(information)
})


ipElement.forEach((ip) => {

   ip.addEventListener('blur', (e) => {
      const groupElement = e.target.parentElement;
      const error = e.target.parentElement.querySelector('.form-message');

      ip.addEventListener('input', () => {
         shorthand('', 'remove')
      });

      if (!ip.value.trim()) {
         shorthand('Vui lòng nhập trường này !', 'add')
      } else {
         shorthand('', 'remove')

         if (ip.classList.contains('email')) {
            let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!ip.value.match(regexEmail)) {
               shorthand('Trường này phải là email', 'add')
            } else {
               shorthand('', 'remove')
            }
         } else if (ip.classList.contains('password')) {
            if (ip.value.length < 6) {
               shorthand('Vui lòng nhập tối thiểu 6 kí tự !', 'add')
            } else {
               shorthand('', 'remove')
            }
         } else if (ip.classList.contains('password_confirmation')) {
            const valuePassword = e.target.parentElement.parentElement.querySelector('.password').value;
            if (!valuePassword.includes(ip.value)) {
               shorthand('Giá trị nhập vào không chính xác !', 'add')
            } else {
               shorthand('', 'remove')
            }
         }
      }

      function shorthand(message, type) {
         if (type == 'add') {
            error.innerText = message;
            groupElement.classList.add('invalid');
         } else {
            error.innerText = '';
            groupElement.classList.remove('invalid');
         }
      }
   })
})

