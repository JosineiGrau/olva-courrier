const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const app = express();

app.use(express.json());

let browserP = puppeteer.launch({
	args: ['--no-sandbox', '--disable-setuid-sandbox'],
	headless: true,
});

let json;

// app.post('/olva', (req, res) => {
// 	let page;
// 	const { documento } = req.body;
// 	// console.log(documento)
// 	(async () => {
// 		page = await (await browserP).newPage();
// 		await page.setUserAgent(
// 			'5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
// 		);
// 		await page.goto('https://tracking.olvaexpress.pe/');
// 		await page.waitForSelector('.btn');
// 		await page.type('#trackingNumber', documento);
// 		await page.click('.btn');
// 		await page.waitForTimeout(3000);
// 		let salida = await page.evaluate(() => {
// 			let elemento = document.querySelectorAll('.history tbody tr td');
// 			return [
// 				{
// 					estado: elemento[0].childNodes[2].textContent,
// 					fecha: elemento[1].innerHTML,
// 					descripción: elemento[2].innerHTML,
// 				},
// 				{
// 					estado: elemento[3].childNodes[2].textContent,
// 					fecha: elemento[4].innerHTML,
// 					descripción: elemento[5].innerHTML,
// 				},
// 				{
// 					estado: elemento[6].childNodes[2].textContent,
// 					fecha: elemento[7].innerHTML,
// 					descripción: elemento[8].innerHTML,
// 				},
// 			];
// 		});
// 		json = salida;
// 		res.json(salida);
// 	})()
// 		.catch((err) => res.sendStatus(500))
// 		.finally(async () => await page.close());
// });
// app.get('/', function (req, res) {
// 	res.sendFile(path.join(__dirname, 'index.html'));
// });
// app.get('/hola', function (req, res) {
// 	res.send('<h1>gola</h1>');
// });

// app.get('/olva/31666687', (req, res) => {
// 	res.json(json);
// });
app.get('/olva/:numRemito', (req, res) => {
	// let page;
	const { numRemito } = req.params;
	(async () => {
		page = await (await browserP).newPage();
		await page.setUserAgent(
			'5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
		);
		await page.goto('https://tracking.olvaexpress.pe/');
		await page.waitForSelector('.btn');
		await page.type('#trackingNumber', numRemito);
		await page.click('.btn');
		await page.waitForTimeout(3000);
		let salida = await page.evaluate(() => {
			let elemento = document.querySelectorAll('.history tbody tr td');
			return [
				{
					estado: elemento[0].childNodes[2].textContent,
					fecha: elemento[1].innerHTML,
					descripción: elemento[2].innerHTML,
				},
				{
					estado: elemento[3].childNodes[2].textContent,
					fecha: elemento[4].innerHTML,
					descripción: elemento[5].innerHTML,
				},
				{
					estado: elemento[6].childNodes[2].textContent,
					fecha: elemento[7].innerHTML,
					descripción: elemento[8].innerHTML,
				},
			];
		});
		res.json(salida);
	})()
		.catch((err) => res.sendStatus(500))
		.finally(async () => await page.close());
});
module.exports = app;
