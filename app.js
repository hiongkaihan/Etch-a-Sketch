const DEFAULT_SIZE = 30;
const DEFAULT_MODE = "default";

let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;

const grid = document.querySelector(".grid");
const slider = document.querySelector(".slider");
const sliderValue = document.querySelector(".slider-value");
const clearButton = document.querySelector(".clear")
const normalButton = document.querySelector(".normal")
const rainbowButton = document.querySelector(".rainbow")

slider.onchange = (e) => updateGridSize(e.target.value);
slider.onmousemove = (e) => updateSizeValue(e.target.value);
clearButton.onclick = () => clearGrid();
normalButton.classList.add("bold");
normalButton.onclick = () => setMode("normal");
rainbowButton.onclick = () => setMode("rainbow");

/*
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)
*/

function makeGrid(size) {

    grid.style.gridTemplateColumns = `repeat(${size}, 2fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 2fr)`

    for (let i = 0; i < size * size; i++) {
        const div = document.createElement("div");
        div.classList.add("square");
        div.addEventListener("mouseover", highlight);
        //div.addEventListener("mousedown", highlight);
        grid.appendChild(div);
    }
}

function highlight(e) {
    //if (e.type === 'mouseover' && !mouseDown) return

    if (currentMode === "rainbow") {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`        
    } else {
        e.target.style.backgroundColor = "grey"
    }
}

function updateSizeValue(value) {
    sliderValue.textContent = `${value} x ${value}`
}

function updateGridSize(value) {
    updateSizeValue(value);
    deleteGrid();
    makeGrid(value);
}

function clearGrid() {
    squares = document.querySelectorAll(".square")

    squares.forEach((square) => {
        square.style.backgroundColor = "white"
    });
}

function deleteGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function setMode(mode) {
    currentMode = mode;
    if (currentMode === "rainbow") {
        rainbowButton.classList.add("bold")
        normalButton.classList.remove("bold")
    } else {
        normalButton.classList.add("bold")
        rainbowButton.classList.remove("bold")
    }
}
window.onload = () => {
    makeGrid(currentSize);
}