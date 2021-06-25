'use strict';
// Selecting elements
const playerEl = document.querySelectorAll('.player');
const scoreEl = document.querySelectorAll('.score');
const currentEl = document.querySelectorAll(
	'.current-score'
);
const diceEl = document.querySelector('.dice');
const btnNem = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

/* Variables */
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

/* Starting conditions */
scoreEl[0].textContent = scores[0];
scoreEl[1].textContent = scores[1];
diceEl.classList.add('hidden');

/* Secondary functions */
const switchActivePlayer = () => {
	playerEl[0].classList.toggle('player--active');
	playerEl[1].classList.toggle('player--active');
	currentEl[activePlayer].textContent = 0;
	activePlayer = (activePlayer + 1) % 2;
	currentScore = 0;
};

const resetValues = () => {
	scores[0] = 0;
	scores[1] = 0;
	currentScore = 0;
	activePlayer = 0;
	playing = true;

	scoreEl[0].textContent = 0;
	scoreEl[1].textContent = 0;
	currentEl[0].textContent = 0;
	currentEl[1].textContent = 0;
	diceEl.classList.add('hidden');
};

/* Rolling button functionality */
btnRoll.addEventListener('click', function () {
	if (playing) {
		// 1. Generating a random dice roll
		const dice = Math.trunc(Math.random() * 6) + 1;

		// 2. Display dice
		diceEl.classList.remove('hidden');
		diceEl.src = `img/dice-${dice}.png`;

		//3. Check for rolled 1
		if (dice !== 1) {
			currentScore += dice;
			currentEl[activePlayer].textContent = currentScore;
		} else {
			switchActivePlayer();
		}
	}
});

/* Holding button functionality */
btnHold.addEventListener('click', function () {
	if (playing) {
		// 1. Add current score to active player`s score
		scores[activePlayer] += currentScore;
		scoreEl[activePlayer].textContent =
			scores[activePlayer];
		// 2. Check if player`s score is >= 100
		if (scores[activePlayer] >= 100) {
			// Finish the game
			playing = false;
			playerEl[activePlayer].classList.add(
				'player--winner'
			);
		} else {
			// Switch to the next player
			switchActivePlayer();
		}
	}
});

/* Reset button functionality */
btnNem.addEventListener('click', function () {
	playerEl[activePlayer].classList.remove('player--winner');
	if (activePlayer) switchActivePlayer();
	resetValues();
});
