'use strict';

const player1El = document.querySelector('.player--1');
const player0El = document.querySelector('.player--0');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores, activePlayer, currentScore, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random number between 1 and 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //    console.log("genNumber",genNumber);
    //2. Display the result on the screen
    if (dice !== 1) {
      // add dive value to currentScore
      currentScore += dice;
      //store currentScore to active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      //current0El.textContent=currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    console.log('hold clicked');
    //   Add current score to global score array
    scores[activePlayer] += currentScore;
    console.log(scores);
    //     Update UI with new values for each player
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //hide dice image after hold button is pressed
    diceEl.classList.add('hidden');

    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //   document
      //     .querySelector(`.player--${activePlayer}`)
      //     .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
