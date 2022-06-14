/*
 ! PROJECT FUNCTIONS
 */

const refreshClock = (ampm) => {
	const date = new Date(Date.now());
	let hours = `${date.getHours()}`;
	let minutes = `${date.getMinutes()}`;
	let seconds = `${date.getSeconds()}`;

	hours = hours.length > 1 ? hours : '0' + hours;
	minutes = minutes.length > 1 ? minutes : '0' + minutes;
	seconds = seconds.length > 1 ? seconds : '0' + seconds;

	if (ampm) {
		if (!document.querySelector('.ampm')) {
			const ampm_ = hours >= 12 ? 'PM' : 'AM';

			const span = document.createElement('span')
			span.classList.add('ampm')
			span.textContent = ampm_

			document.querySelector('.clock').insertAdjacentElement('beforeend', span);
		}

		hours = hours % 12;
		hours = hours ? hours : 12;
		hours = hours < 10 ? '0' + hours : hours;
	} else {
		if (document.querySelector('.ampm')) {
			document.querySelector('.ampm').remove();
		}
	}

	const clock = document.querySelector('#clock');
	clock.textContent = `${hours}:${minutes}:${seconds}`;
}

const refreshDate = (config) => {
	const date = new Date(Date.now());

	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	day = day < 10 ? '0' + day : day;
	month = month < 10 ? '0' + month : month;

	const dateElement = document.querySelector('.date');
	dateElement.textContent = `${day}/${month}/${year}`;
}

/*
 ? UTILS
 */

const getCookie = (name) => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
	return undefined;
}

const existCookie = (name) => {
	return getCookie(name) ? true : false;
}

const createCookie = (name, value) => {
	return document.cookie = `${name}=${value}`;
}

/*
 ! STARTUP
 */
if (!existCookie('ampm')) {
	createCookie('ampm', 'false')
}

let ampm = getCookie('ampm') === 'true' ? true : false;

document.querySelector('.toggle').textContent = ampm ? 'EN' : 'FR';

refreshClock(ampm);
refreshDate(ampm);

document.querySelector('.toggle').addEventListener('click', () => {
	document.querySelector('.toggle').classList.toggle('rot');
	setTimeout(() => {
		document.querySelector('.toggle').textContent = ampm ? 'EN' : 'FR';
	}, 400)

	ampm = !ampm;
	createCookie('ampm', !ampm);
	refreshClock(ampm);
	refreshDate(ampm);
})

setInterval(() => {
	refreshClock(ampm);
	refreshDate(ampm);
}, 500);