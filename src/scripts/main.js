/* eslint-disable indent */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const inputName = document.querySelector('.login__control');
  const btnStartGame = document.querySelector('.login__btn');
  const blockLogin = document.querySelector('.login');
  const blockGame = document.querySelector('.game');
  const blockWinner = document.querySelector('.winner');
  const blockEnd = document.querySelector('.end');
  let intervalId;

  const img = [
    'https://i.ibb.co/tYNfpth/deadpool.png',
    'https://i.ibb.co/vd5GDDG/artage.png',
    'https://i.ibb.co/5cHbJPm/unnamed.png',
    'https://i.ibb.co/Sd4tC6G/captain.png',
    'https://i.ibb.co/L938tDx/Miles.png',
    'https://i.ibb.co/tYNfpth/deadpool.png',
    'https://i.ibb.co/xjBsfnX/hulk.png',
    'https://i.ibb.co/Sd4tC6G/captain.png',
    'https://i.ibb.co/5cHbJPm/unnamed.png',
    'https://i.ibb.co/xjBsfnX/hulk.png',
    'https://i.ibb.co/vd5GDDG/artage.png',
    'https://i.ibb.co/L938tDx/Miles.png',
  ];
  let name = '';

  inputName.addEventListener('input', () => {
    name = inputName.value;
  });

  btnStartGame.addEventListener('click', (event) => {
    event.preventDefault();

    blockGame.setAttribute('class', 'game');

    blockGame.innerHTML = '';

    let sec = 45;

    if (name.length >= 3) {
      // eslint-disable-next-line no-inner-declarations
      function init() {
        // document.getElementById('timer').innerHTML = '';
        clearInterval(intervalId);

        intervalId = setInterval(tick, 1000);
      };

      init();

      // eslint-disable-next-line no-inner-declarations
      function tick() {
        sec--;

        if (sec === -1) {
          clearInterval(intervalId);

          blockGame.removeAttribute('class');
          blockGame.setAttribute('class', 'close');

          blockEnd.innerHTML = '';

          if (blockWinner.querySelector('.winner__inner')) {
            return;
          }

          blockEnd.setAttribute('class', 'open');

          blockEnd.insertAdjacentHTML('beforeend', `
            <img
              class="end__game-over"
              src="https://i.ibb.co/Mct4NCP/game.png"
            >

            <div class="end__inner">
              <button class="end__start-again">Return home</button>
            </div>
          `);

          return;
        }

        document.getElementById('timer')
          .childNodes[0].nodeValue = sec;
      }

      blockLogin.removeAttribute('class');

      blockLogin.setAttribute('class', 'login close');

      blockWinner.innerHTML = '';
      blockGame.innerHTML = '';

      blockGame.insertAdjacentHTML('beforeend', `
      <div class="game__name">Name: ${name}</div>
      <div class="game__text">Timer</div>
      <div id="timer">45</div>

      ${img.sort(() => Math.random() - 0.5).map((el, i) => {
    return `
              <a href="" class="game__inner">
                <img
                  id = "${i + 12}"
                  src="${el}"
                  alt=""
                  class="game__cart close"
                >
                <img
                  id = "${i}"
                  src="https://i.ibb.co/X2mjHFv/preview.png"
                  alt=""
                  class="game__buter"
                >
              </a>
            `;
  })
}`);

      const block = blockGame.innerHTML.replace(/,/g, '');

      blockGame.innerHTML = `${block}`;
    } else {
      if (!document.querySelector('.login__error')) {
        blockLogin.insertAdjacentHTML('beforeend', `
        <div class="login__error">Please, enter a name</div>
        `);
      }
    }
  });

  blockGame.addEventListener('click', (event) => {
    event.preventDefault();

    blockWinner.innerHTML = '';

    const character = event.target;
    const tweisCart = event.target.previousElementSibling;

    if (event.target.matches('.game')) {
      return;
    }

    if (event.target.classList.contains('open')
      && event.target.classList.contains('game__cart')) {
      return;
    }

    if ((event.target.classList.contains('check')
      && event.target.classList.contains('game__cart'))
      || event.target.classList.contains('game__inner')) {
      return;
    }

    character.setAttribute('class', 'game__buter close');

    tweisCart.setAttribute('class', 'game__cart open');

    const openCart = document.querySelectorAll('.game__cart.open');
    const cartButer = document.querySelectorAll('.game__buter.close');

    if (openCart.length === 2) {
      if (openCart[0].src === openCart[1].src) {
        openCart[0].removeAttribute('class');
        openCart[1].removeAttribute('class');
        openCart[0].setAttribute('class', 'game__cart check');
        openCart[1].setAttribute('class', 'game__cart check');
        cartButer[0].setAttribute('class', 'game__buter checkedClose');
        cartButer[1].setAttribute('class', 'game__buter checkedClose');

        const all = document.querySelectorAll('.check');

        if (all.length === 12) {
          blockGame.removeAttribute('class');

          blockGame.setAttribute('class', 'close');

          blockWinner.setAttribute('class', 'open');

          blockWinner.insertAdjacentHTML('beforeend', `
            <div class="winner__title">
            ${name} is the winner!
            </div>
            <div class="winner__inner">
              <button class="winner__start-again">Return home</button>
            </div>
          `);
        }
      } else {
        setTimeout(function() {
          openCart[0].setAttribute('class', 'game__cart close');
          openCart[1].setAttribute('class', 'game__cart close');

          cartButer[0].setAttribute('class', 'game__buter open');
          cartButer[1].setAttribute('class', 'game__buter open');
        },
        500
        );
      }
    }
  });

  blockEnd.addEventListener('click', (event) => {
    clearInterval(intervalId);

    if (event.target.classList.contains('end__start-again')) {
      blockLogin.setAttribute('class', 'login open');
      blockEnd.setAttribute('class', 'close');
    }
  });

  blockWinner.addEventListener('click', (event) => {
    clearInterval(intervalId);

    if (event.target.classList.contains('winner__start-again')) {
      blockLogin.setAttribute('class', 'login open');
      blockWinner.setAttribute('class', 'close');
    }
  });
});
