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

// Save layout functionality
document.getElementById('save-layout').addEventListener('click', () => {
    const layout = [];
    const cells = gardenGrid.children;

    for (let cell of cells) {
        layout.push({
            image: cell.style.backgroundImage ? cell.style.backgroundImage.slice(5, -2) : '',
            cost: cell.dataset.cost || 0,
            name: cell.dataset.name || ''
        });
    }

    const layoutJSON = JSON.stringify(layout);
    const blob = new Blob([layoutJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'garden-layout.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Download layout as an image functionality
document.getElementById('download-layout').addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const cellSize = 60; // Size of each cell in pixels
    const width = gardenGrid.style.gridTemplateColumns.split(',').length; // Get grid width
    const length = gardenGrid.children.length / width; // Calculate grid length

    canvas.width = width * cellSize;
    canvas.height = length * cellSize;

    const cells = gardenGrid.children;
    let imagesLoaded = 0; // Track loaded images

    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const x = (i % width) * cellSize;
        const y = Math.floor(i / width) * cellSize;

        // Draw cell background
        if (cell.style.backgroundImage) {
            const img = new Image();
            img.src = cell.style.backgroundImage.slice(5, -2); // Extract URL
            img.onload = () => {
                context.drawImage(img, x, y, cellSize, cellSize);
                imagesLoaded++;
                if (imagesLoaded === cells.length) {
                    // Trigger download after all images are drawn
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png');
                    link.download = 'garden-layout.png';
                    link.click();
                }
            };
        } else {
            // Draw empty cell (optional)
            context.fillStyle = '#fff'; // Background color for empty cells
            context.fillRect(x, y, cellSize, cellSize);
            imagesLoaded++; // Count empty cells as loaded
        }
    }
});

// Load layout functionality
document.getElementById('load-layout').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const layout = JSON.parse(e.target.result);
            loadLayout(layout);
        };
        reader.readAsText(file);
    }
});

function loadLayout(layout) {
    // Clear existing grid
    totalCost = 0; // Reset total cost
    updateTotalCost();
    gardenGrid.innerHTML = '';

    layout.forEach((cellData, index) => {
        const cell = document.createElement('div');
        cell.setAttribute('draggable', 'false');
        gardenGrid.appendChild(cell);

        if (cellData.image) {
            cell.style.backgroundImage = `url(${cellData.image})`;
            cell.style.backgroundSize = 'cover';
            totalCost += parseInt(cellData.cost);
        }
        cell.dataset.cost = cellData.cost;
        cell.dataset.name = cellData.name;
    });

    updateTotalCost();
}

// More features (like saving/loading, suggestions) to be added here...

// Load Layout Button functionality
document.getElementById('load-layout-button').addEventListener('click', () => {
    document.getElementById('load-layout').click();
});
