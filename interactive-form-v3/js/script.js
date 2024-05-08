// FIELD SELECTORS

const nameField = document.getElementById('name');
const otherJobField = document.getElementById('other-job-role');
const jobSelector = document.getElementById('title');
const otherJob = document.querySelector('option[value=other]');
const colorSelect = document.getElementById('color');
const designSelect = document.getElementById('design');

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