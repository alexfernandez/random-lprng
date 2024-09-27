'use strict'

let width, canvasData, ctx, state

window.onload = () => {
	runGenerator()
	document.getElementById('run').onclick = () => runGenerator()
}

function runGenerator() {
	const canvas = document.getElementById('canvas')
	width = canvas.width
	const height = canvas.height
	ctx = canvas.getContext('2d')
	canvasData = ctx.getImageData(0, 0, width, height)
	ctx.clearRect(0, 0, width, height)
	generateAll(width, height)
}

function initSeed() {
	state = Math.floor(Math.random() * 256*256)
}

function generateAll(width, height) {
	initSeed()
	const multiplier = getParameter('multiplier')
	const addition = getParameter('addition')
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const red = generate(multiplier, addition)
			const green = generate(multiplier, addition)
			const blue = generate(multiplier, addition)
			//console.log(red, green, blue)
			drawPixel(x, y, red, green, blue, 255)
		}
	}
	updateCanvas()
}

function generateRandom() {
	initSeed()
	const multiplier = getParameter('multiplier')
	const addition = getParameter('addition')
	while (true) {
		for (let i = 0; i < 1000; i++) {
			const x = generate(multiplier, addition)
			const y = generate(multiplier, addition)
			const red = generate(multiplier, addition)
			const green = generate(multiplier, addition)
			const blue = generate(multiplier, addition)
			//console.log(red, green, blue)
			drawPixel(x, y, red, green, blue, 255)
		}
		updateCanvas()
	}
}

function generate(multiplier, addition) {
	const temp = state * multiplier + addition
	state = temp % (256*256)
	return Math.floor(state / 256) % 256
}

function getParameter(name) {
	return parseFloat(document.getElementById(name).value)
}

function drawPixel (x, y, r, g, b, a) {
	var index = (x + y * width) * 4

	canvasData.data[index + 0] = r
	canvasData.data[index + 1] = g
	canvasData.data[index + 2] = b
	canvasData.data[index + 3] = a
}

function updateCanvas() {
	ctx.putImageData(canvasData, 0, 0)
}

