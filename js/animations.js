'use strict';

/* В отзывах +5000 анимация */

const INCREASE_NUMBER_ANIMATION_SPEED = 50;

function increaseNumberAnimationStep(i, element, endNumber) {
	if (i <= endNumber) {
		if (i === endNumber) {
			element.innerText = i + '+';
		} else {
			element.innerText = i;
		}
		i += 200;

		setTimeout(function () {
			increaseNumberAnimationStep(i, element, endNumber);
		}, INCREASE_NUMBER_ANIMATION_SPEED);
	}

};

function initIncreaseNumberAnimation() {
	const element = document.querySelector(".features__clients-count");
	increaseNumberAnimationStep(0, element, 5000)

}

// initIncreaseNumberAnimation();// перенесли в функцию updateScroll

/* В форме доп строка */

document.querySelector("#budget").addEventListener("change", function handleSelectChange(event) {
	// console.log(event);

	if (event.target.value === "other") {
		const formContainer = document.createElement("div");
		formContainer.classList.add("form__group");
		formContainer.classList.add("form__other-input");

		const input = document.createElement("input");
		input.placeholder = "Введите ваш вариант";
		input.type = "text";

		formContainer.appendChild(input);

		document.querySelector("#form form").insertBefore(formContainer, document.querySelector(".form__submit"));
	}

	const otherInput = document.querySelector(".form__other-input");

	if (event.target.value !== "other" && Boolean(otherInput)) {

		document.querySelector("#form form").removeChild(otherInput);
	}
});

/* Изменение шапки header при скроле и запуск анимации счетчика*/

function updateScroll() {
	// для шапки
	if (window.scrollY > 0) {
		document.querySelector('header').classList.add('header__scrolled');
	} else {
		document.querySelector('header').classList.remove('header__scrolled');
	}

	// для счетчика
	let windowBottomPosition = window.scrollY + window.innerHeight;
	let countElementPosition = document.querySelector('.features__clients-count').offsetTop;

	if (windowBottomPosition >= countElementPosition && !animationInited) {
		animationInited = true;
		initIncreaseNumberAnimation();
	}
}
let animationInited = false;
window.addEventListener("scroll", updateScroll)

/*Добавляем плавный переход к якорю*/

function addSmoothScroll(anchor) {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth'
		});
	});
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	addSmoothScroll(anchor);
});

addSmoothScroll(document.querySelector('.more-button'));