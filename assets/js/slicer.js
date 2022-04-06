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
   x = setInterval(() => nextplay(), 3000);
}

function nextplay() {
   if (index < 2) {
      index++;
      $('.container__img').src = bannerList[index].src;
      $('.container__link').href = bannerList[index].href;
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
      $('.container__img').src = bannerList[index].src;
      $('.container__link').href = bannerList[index].href;
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
      $('.container__img').src = bannerList[index].src;
      $('.container__link').href = bannerList[index].href;
   }
   if (index == 2) {
      index = 0;
   }
   play();
}

