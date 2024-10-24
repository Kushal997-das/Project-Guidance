let totalCost = 0;
let undoStack = [];
let redoStack = [];
const gardenGrid = document.getElementById('garden-grid');
const totalCostElement = document.getElementById('total-cost');
const plantList = document.getElementById('plant-list');
const plants = []; // Store user-defined plants

// Handle plot size settings
document.getElementById('set-plot').addEventListener('click', () => {
    const width = parseInt(document.getElementById('plot-width').value);
    const length = parseInt(document.getElementById('plot-length').value);
    generateGrid(width, length);
});

// Generate a grid based on user-defined plot size
function generateGrid(width, length) {
    gardenGrid.innerHTML = '';
    gardenGrid.style.gridTemplateColumns = `repeat(${width}, 60px)`;

    for (let i = 0; i < width * length; i++) {
        const cell = document.createElement('div');
        cell.setAttribute('draggable', 'false');
        gardenGrid.appendChild(cell);
    }
}

// Add plant to the draggable list
document.getElementById('add-plant').addEventListener('click', () => {
    const plantName = document.getElementById('plant-name').value;
    const plantCost = parseInt(document.getElementById('plant-cost').value);
    const plantImage = document.getElementById('plant-image').files[0];

    if (plantName && plantCost) {
        const plant = { name: plantName, cost: plantCost, image: '' };

        if (plantImage) {
            const reader = new FileReader();
            reader.onload = () => {
                plant.image = reader.result;
                addPlantToList(plant);
            };
            reader.readAsDataURL(plantImage);
        } else {
            addPlantToList(plant);
        }
    }
});

function addPlantToList(plant) {
    const plantItem = document.createElement('div');
    plantItem.className = 'plant-item';
    plantItem.setAttribute('draggable', 'true');
    plantItem.dataset.cost = plant.cost;
    plantItem.dataset.name = plant.name;
    plantItem.dataset.image = plant.image;

    const plantLabel = document.createElement('div');
    plantLabel.textContent = `${plant.name} - $${plant.cost}`;

    if (plant.image) {
        const plantImg = document.createElement('img');
        plantImg.src = plant.image;
        plantImg.style.width = '50px';
        plantItem.appendChild(plantImg);
    }

    plantItem.appendChild(plantLabel);
    plantList.appendChild(plantItem);

    // Drag events
    plantItem.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', JSON.stringify(plant));
    });
}

// Handle plant drop into the garden grid
gardenGrid.addEventListener('dragover', (e) => {
    e.preventDefault();
});

gardenGrid.addEventListener('drop', (e) => {
    e.preventDefault();
    const cell = e.target;
    const plantData = JSON.parse(e.dataTransfer.getData('text/plain'));

    // Place plant in the cell
    if (plantData.image) {
        cell.style.backgroundImage = `url(${plantData.image})`;
        cell.style.backgroundSize = 'cover';
    }
    totalCost += plantData.cost;
    updateTotalCost();

    // Push state to undo stack
    undoStack.push({ action: 'add', plant: plantData, cell });
    redoStack = []; // Clear redo stack on new action
});

function updateTotalCost() {
    totalCostElement.textContent = `$${totalCost}`;
}

// Implement Undo/Redo feature
document.getElementById('undo').addEventListener('click', () => {
    if (undoStack.length > 0) {
        const lastAction = undoStack.pop();
        redoStack.push(lastAction);

        if (lastAction.action === 'add') {
            lastAction.cell.style.backgroundImage = '';
            totalCost -= lastAction.plant.cost;
            updateTotalCost();
        }
    }
});

document.getElementById('redo').addEventListener('click', () => {
    if (redoStack.length > 0) {
        const lastAction = redoStack.pop();
        undoStack.push(lastAction);

        if (lastAction.action === 'add') {
            lastAction.cell.style.backgroundImage = `url(${lastAction.plant.image})`;
            totalCost += lastAction.plant.cost;
            updateTotalCost();
        }
    }
});

// More features (like saving/loading, suggestions) to be added here...
