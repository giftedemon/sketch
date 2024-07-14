const canvas = document.querySelector('.canvas');
const slider = document.querySelector('.slider');
const gridValue = document.querySelector('.grid-value');
const clearCanvasButton = document.querySelector('.clear');
const rainbowMode = document.querySelector('.rainbow');
const colorPicker = document.querySelector('.color');
const eraser = document.querySelector('.eraser');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

let isHolding = false;
let color = colorPicker.value

// Adding grids
const drawCanvas = (userGrid) => {
    canvas.innerHTML = ``;

    for (let i = 0; i < userGrid; i++) {
        const gridRow = document.createElement('div');
        gridRow.classList.add('gridRow');
    
        for (let j = 0; j < userGrid; j++){
            const gridDiv = document.createElement('div');
            gridDiv.classList.add('gridDiv');
            gridDiv.setAttribute('draggable', 'false');
            gridDiv.style.cssText = `flex-grow: 1`;
            gridRow.appendChild(gridDiv);
        }
    
        canvas.appendChild(gridRow);
    }
}

// Clearing other checkboxes
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            checkboxes.forEach((otherCheckbox) => {
                if (otherCheckbox !== checkbox) {
                    otherCheckbox.checked = false;
                }
            })
        }
    })
})


// Clearing canvas
clearCanvasButton.addEventListener('click', () => {
    drawCanvas(slider.value);
});


// Painting the canvas
canvas.addEventListener('mousedown', () => {
    isHolding = true;
})

canvas.addEventListener('mousemove', (event) => {
    if (isHolding && event.target.classList.contains('gridDiv') && event.target.style.backgroundColor !== color){
            if (eraser.checked) {
                color = 'rgb(255, 255, 255)'
                rainbowMode.checked = false;
            }
            else if (rainbowMode.checked){
                changeColor();
            }
            else {
                color = colorPicker.value;
            }

        event.target.style['background-color'] = color;
    }
});

canvas.addEventListener('mouseup', () => {
    isHolding = false;
});


// Changing canvas resolution
slider.oninput = () => {
    gridValue.innerHTML = `${slider.value}x${slider.value}`;

    drawCanvas(slider.value);
}


// Change color
const changeColor = () => {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    color = `rgb(${red}, ${green}, ${blue})`;
}

// Starting the code
drawCanvas(slider.value);