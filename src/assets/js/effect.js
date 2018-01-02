window.onload = function () {
  const $coupon = document.querySelector('#coupon');
  const $nav = document.querySelector('#nav');

  if ($coupon) {
    const $coupon_close = $coupon.querySelector('.close');
    $coupon_close.addEventListener('click', () => {
      $coupon.style.height = 0;
    });
  }

  if ($nav) {
    const $sections = document.querySelectorAll('section');
    const $nav_box = $nav.querySelector('nav');
    const $nav_items = $nav_box.querySelectorAll('a');

    const navTop = $nav.offsetTop;
    // let isFixed = false
    let sectionTopArray = Array.from($sections).map((item) => item.offsetTop);
    let selectedIdx = 0;

    if (window.scrollY > navTop) {
      $nav_box.getAttribute('class') || $nav_box.setAttribute('class', 'fixed');
      selectedIdx = setNavSeleted(window.scrollY, sectionTopArray, undefined, $nav_items);
    }

    window.addEventListener('scroll', () => {
      let y = window.scrollY;
      if (y >= navTop) {
        $nav_box.getAttribute('class') || $nav_box.setAttribute('class', 'fixed');
        selectedIdx = setNavSeleted(y, sectionTopArray, selectedIdx, $nav_items);
      } else {
        $nav_box.removeAttribute('class');
      }
    });

    $nav_items.forEach((item, idx) => item.addEventListener('click', () => { window.scroll(0, sectionTopArray[idx]); }));
  }
};

function setNavSeleted(y, arr, idx, dom) {
  let _idx = idx;
  for (let i = 0; i < arr.length; i++) {
    if (y >= arr[arr.length - 1] && _idx !== arr.length - 1) {
      loopNavItem(dom, _idx, arr.length - 1);
      _idx = arr.length - 1;
    } else if (y >= arr[i] && y < arr[i + 1] && _idx !== i) {
      loopNavItem(dom, _idx, i);
      _idx = i;
    }
  }
  return _idx;
}

function loopNavItem(dom, firstIdx = 0, endIdx) {
  dom[firstIdx].removeAttribute('class');
  dom[endIdx].setAttribute('class', 'selected');
}
