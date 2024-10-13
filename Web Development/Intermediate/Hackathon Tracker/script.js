// Initialize an empty array to hold hackathon data
const hackathons = [];
let editMode = false; // Flag to determine if the form is in edit mode
let currentCard = null; // Store the current card being edited

// Event listener for form submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve values from the form
    const name = document.getElementById('name').value;
    const registrationDate = document.getElementById('registration-date').value;
    const deadline = document.getElementById('deadline').value;
    const status = document.getElementById('status').value;

    // Check if in edit mode
    if (editMode) {
        // Update existing hackathon card
        updateHackathonCard(currentCard, name, registrationDate, deadline, status);
        editMode = false; // Reset edit mode
        currentCard = null; // Clear the current card reference
    } else {
        // Create a new hackathon card and add it to the appropriate category
        const card = createHackathonCard(name, registrationDate, deadline, status);
        addCardToCategory(card, status);
        hackathons.push({ name, registrationDate, deadline, status }); // Add to hackathons array
        updateCalendar(); // Update calendar with new event
    }

    this.reset(); // Reset the form fields
});

// Function to create a new hackathon card element
function createHackathonCard(name, registrationDate, deadline, status) {
    const card = document.createElement('div'); // Create a new div for the card
    card.className = 'hackathon-card'; // Set class for styling

    // Create and append the hackathon name
    const h3 = document.createElement('h3');
    h3.textContent = name;
    card.appendChild(h3);

    // Create and append registration date
    const regDateP = document.createElement('p');
    regDateP.textContent = `Registration Date: ${registrationDate}`;
    card.appendChild(regDateP);

    // Create and append deadline
    const deadlineP = document.createElement('p');
    deadlineP.textContent = `Deadline: ${deadline}`;
    card.appendChild(deadlineP);

    // Create and append status
    const statusP = document.createElement('p');
    statusP.className = 'status'; // Set class for status
    statusP.textContent = `Status: ${status}`;
    card.appendChild(statusP);

    // Create and append edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn'; // Set class for styling
    editBtn.textContent = 'Edit'; // Set button text
    card.appendChild(editBtn);

    // Create and append delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn'; // Set class for styling
    deleteBtn.textContent = 'Delete'; // Set button text
    card.appendChild(deleteBtn);

    // Event listener for edit button
    editBtn.addEventListener('click', () => {
        populateFormForEdit(name, registrationDate, deadline, status); // Populate form for editing
        editMode = true; // Set edit mode
        currentCard = card; // Set current card being edited
    });

    // Event listener for delete button
    deleteBtn.addEventListener('click', () => {
        const parentCategory = card.parentElement; // Get parent category of the card
        parentCategory.removeChild(card); // Remove card from DOM
        // Find and remove hackathon data from the array
        const index = hackathons.findIndex(h => h.name === name && h.deadline === deadline);
        if (index > -1) {
            hackathons.splice(index, 1); // Remove from hackathons array
            updateCalendar(); // Update calendar after deletion
        }
    });

    return card; // Return the created card element
}

// Function to update an existing hackathon card with new values
function updateHackathonCard(card, name, registrationDate, deadline, status) {
    const oldStatus = card.querySelector('.status').textContent.split(': ')[1]; // Get current status
    // Update card elements with new values
    card.querySelector('h3').textContent = name;
    card.querySelector('p:nth-of-type(1)').textContent = `Registration Date: ${registrationDate}`;
    card.querySelector('p:nth-of-type(2)').textContent = `Deadline: ${deadline}`;
    card.querySelector('.status').textContent = `Status: ${status}`;

    // Find the index of the hackathon in the array and update it
    const index = hackathons.findIndex(h => h.name === name && h.deadline === deadline);
    if (index > -1) {
        hackathons[index] = { name, registrationDate, deadline, status }; // Update hackathon data
        updateCalendar(); // Update calendar
    }

    // If the status has changed, remove the card and re-add it to the new category
    if (oldStatus !== status) {
        card.parentElement.removeChild(card);
        addCardToCategory(card, status);
    }
}

// Function to add a hackathon card to the appropriate category in the dashboard
function addCardToCategory(card, status) {
    const category = document.getElementById(status); // Get category by status
    const dashboard = category.querySelector('.hackathon-dashboard'); // Get dashboard for that category
    dashboard.appendChild(card); // Append the card to the dashboard
    toggleCategoryHeadings(); // Update category headings visibility
}

// Function to toggle the visibility of category headings based on the presence of hackathon cards
function toggleCategoryHeadings() {
    const statuses = ['in-progress', 'submitted', 'completed'];
    statuses.forEach(status => {
        const category = document.getElementById(status);
        const dashboard = category.querySelector('.hackathon-dashboard');
        const heading = category.querySelector('h2');
        // Show heading if there are cards, otherwise hide it
        if (dashboard.children.length > 0) {
            heading.style.display = 'block';
        } else {
            heading.style.display = 'none';
        }
    });
}

// Initialize category headings visibility on page load
toggleCategoryHeadings();

// Function to populate the form with existing hackathon data for editing
function populateFormForEdit(name, registrationDate, deadline, status) {
    document.getElementById('name').value = name; // Set name field
    document.getElementById('registration-date').value = registrationDate; // Set registration date
    document.getElementById('deadline').value = deadline; // Set deadline
    document.getElementById('status').value = status; // Set status dropdown
}

// Object to map status to corresponding colors for calendar events
const statusColors = {
    'completed': 'blue',
    'in-progress': 'red',
    'submitted': 'green'
};

// Function to update the calendar with hackathon events
function updateCalendar() {
    const events = hackathons.map(hackathon => {
        const color = statusColors[hackathon.status] || 'black'; // Get color based on status
        console.log(`Hackathon: ${hackathon.name}, Status: ${hackathon.status}, Color: ${color}`); // Log hackathon info
        return {
            title: `${hackathon.name} (${hackathon.status})`, // Event title
            start: hackathon.deadline, // Start date (deadline)
            end: hackathon.deadline, // End date (same as start date)
            color: color // Set event color
        };
    });

    $('#calendar').fullCalendar('removeEvents'); // Clear existing events
    $('#calendar').fullCalendar('addEventSource', events); // Add new events
}

// Initialize FullCalendar with options
$(document).ready(function() {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today', // Navigation buttons
            center: 'title', // Title
            right: 'month,agendaWeek,agendaDay' // View options
        },
        editable: true, // Allow event editing
        eventLimit: true // Enable event limit
    });
});

// Another initialization of FullCalendar (can be consolidated)
$(document).ready(function() {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: false, // Prevent editing
        events: [] // Initialize with no events
    });
});
