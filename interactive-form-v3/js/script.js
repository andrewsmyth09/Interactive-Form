// FIELD SELECTORS

const nameField = document.getElementById('name');
const otherJobField = document.getElementById('other-job-role');
const jobSelector = document.getElementById('title');
const otherJob = document.querySelector('option[value=other]');
const colorSelect = document.getElementById('color');
const designSelect = document.getElementById('design');
const activityRegister = document.getElementById('activities');
const total_cost_field = document.getElementById('activities-cost');

// Focus on the name field

nameField.focus();

// Hide the "other job" text field

otherJobField.style.display = 'none';

// Select additional input field for when user selects the "Other" option from the job role dropdown menu.

jobSelector.addEventListener('change', (event) => event.target.value === 'other' ? otherJobField.style.display = 'block' : otherJobField.style.display = 'none');

// Disable the color select element

colorSelect.disabled = true;

// Change the available options on the colorSelect menu based on the user's choice of design.

designSelect.addEventListener('change', (event) => {
    colorSelect.disabled = false;
    const userChoice = event.target.value;

    Array.from(colorSelect.options).forEach(option => {
        option.disabled = option.getAttribute('data-theme') !== userChoice;
        option.style.display = option.disabled ? 'none' : 'block';
    });
});

// Reflect the total cost of all selected items in the 'Register for Activities' section
let total_cost = 0;

activityRegister.addEventListener('change', (event) => {
    const checkedStatus = event.target.checked;
    const activityPrice = parseInt(event.target.dataset.cost);
    
    checkedStatus ? total_cost += activityPrice : total_cost -= activityPrice;
    total_cost_field.textContent = `Total: $${total_cost}`
})