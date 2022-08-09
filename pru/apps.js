// José Araujo
var valores = [];
var colores = [
	'blue',
	'navy',
	'fuchsia',
	'purple',
	'red',
	'maroon',
	'yellow',
	'olive',
	'lime',
	'green',
	'aqua',
	'teal',
	'black',
	'gray',
	'White',
	'silver',
];
document.getElementById('Rmaxima').disabled = true;
document.getElementById('Hmaxima').disabled = true;
let introduciodaF = document.getElementById('introducida');
let automaticaF = document.getElementById('automatica');
let cHmax = document.getElementById('Hmax');
let cRmax = document.getElementById('Rmax');
let hMax = document.getElementById('Hmax');
let rMax = document.getElementById('Rmax');

function fIntroducida() {
	document.getElementById('Rmaxima').disabled = false;
	document.getElementById('Hmaxima').disabled = false;
	document.getElementById('Hmaxima').value = document.getElementById('Hmax').innerText;
	document.getElementById('Rmaxima').value = document.getElementById('Rmax').innerText;
}

function fAutomatica() {
	document.getElementById('Rmaxima').disabled = true;
	document.getElementById('Hmaxima').disabled = true;
}

var botonCalcular = document.querySelector('#calcular');

function fx(vel, ang, time) {
	return vel * Math.cos((ang * 3.141593) / 180) * time;
}
function fy(vel, ang, time) {
	return vel * Math.sin((ang * 3.141593) / 180) * time - 0.5 * 9.81 * time * time;
}
function xp(x, xm) {
	return (580 / xm) * x + 10;
}

function yp(y, ym) {
	return (-460 / ym) * y + 470;
}
var lienzo = document.querySelector('canvas');
var pincel = lienzo.getContext('2d');
pincel.clearRect(0, 0, lienzo.width, lienzo.height);
pincel.fillStyle = '#E6E6FA';
pincel.fillRect(0, 0, 600, 500);
botonCalcular.addEventListener('click', function (event) {
	event.preventDefault();

	pincel.clearRect(0, 0, lienzo.width, lienzo.height);
	pincel.fillStyle = '#E6E6FA';
	pincel.fillRect(0, 0, 600, 500);

	let velocidad = Number(document.getElementById('velocidad').value);
	let angulo = Number(document.getElementById('angulo').value);
	if (velocidad <= 0 || angulo >= 90 || angulo <= 0) {
		window.alert('Verifique los rangos de entrada de datos');
	} else {
		valores.push([velocidad, angulo]);

		var timeV, hHmax, rRmax;
		hHmax = Number(document.getElementById('Hmax').innerText);
		rRmax = Number(document.getElementById('Rmax').innerText);

		let tiempoVuelo = document.getElementById('TiempoVuelo');

		timeV = (2 * (velocidad * Math.sin((angulo * 3.141593) / 180))) / 9.81;

		//if (hHmax === 0) {
		hHmax = (
			(velocidad * Math.sin((angulo * 3.141593) / 180) * timeV) / 2 -
			(9.81 / 8) * timeV * timeV
		).toFixed(3);
		rRmax = (velocidad * Math.cos((angulo * 3.141593) / 180) * timeV).toFixed(3);
		tiempoVuelo.innerText = ` ${timeV.toFixed(3)} (s)`;
		//if (document.getElementById('Rmaxima').disabled) {
		hMax.innerText = hHmax;
		rMax.innerText = rRmax;
		//}

		//}
		let coordX;
		let coordY;
		let paso = timeV / 100;
		if (!document.getElementById('Rmaxima').disabled) {
			rRmax = Number(document.getElementById('Rmaxima').value);
			hHmax = Number(document.getElementById('Hmaxima').value);
			pincel.strokeStyle = 'blue';
		}
		pincel.strokeStyle = '#7d3865';
		pincel.lineWidth = 1;
		// Eje x
		pincel.beginPath();
		coordX = xp(0, rRmax);
		coordY = yp(0, hHmax);
		pincel.moveTo(coordX, coordY);
		pincel.lineTo(xp(rRmax, rRmax), coordY);
		pincel.stroke();
		// Eje y
		pincel.beginPath();
		coordX = xp(0, rRmax);
		coordY = yp(0, hHmax);
		pincel.moveTo(coordX, coordY);
		pincel.lineTo(coordX, yp(hHmax, hHmax));
		pincel.stroke();

		for (let i = 0; i < valores.length; i++) {
			pincel.lineWidth = 2;
			velocidad = valores[i][0];
			angulo = valores[i][1];
			pincel.strokeStyle = colores[i]; // color de línea
			pincel.beginPath(); // indica que empezaremos a realizar trazos
			coordX = xp(0, rRmax);
			coordY = yp(0, hHmax);
			pincel.moveTo(coordX, coordY); // indica la coordenada de inicio de los trazo
			timeV = (2 * velocidad * Math.sin((angulo * 3.141593) / 180)) / 9.81;
			paso = timeV / 100;

			for (let t = paso; t <= timeV + paso / 4; t += paso) {
				coordX = xp(fx(velocidad, angulo, t), rRmax);
				coordY = yp(fy(velocidad, angulo, t), hHmax);
				pincel.lineTo(coordX, coordY);
			}
			pincel.stroke();
		}
		/*
	pincel.strokeStyle = 'blue';
	pincel.beginPath(); // indica que empezaremos a realizar trazos
	coordX = xp(0, rRmax);
	coordY = yp(0, hHmax);
	pincel.moveTo(coordX, coordY);
	for (let t = paso; t <= timeV + paso / 2; t += paso) {
		coordX = xp(fx(velocidad, angulo, t), rRmax);
		coordY = yp(fy(velocidad, angulo, t), hHmax);
		pincel.lineTo(coordX, coordY);
		sleep(paso * 10000).then(() => {
			pincel.stroke();
		});
	}

	//setTimeout(pausa(coordX, coordY, paso, velocidad, angulo, rRmax, hHmax, pincel), 10);

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	console.log('Hello');
	sleep(500).then(() => {
		pincel.stroke();
	});*/
	}
});

var X, Y;
function pausa(x, y, p, v, a, R, H, pincel) {
	pincel.moveTo(x, y);
	console.log(p);
	X = xp(fx(v, a, p + 0.3), R);
	Y = yp(fy(v, a, p + 0.3), H);
	console.log(X, Y);
	pincel.lineTo(X, Y);
}
