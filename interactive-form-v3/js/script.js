// FIELD SELECTORS

const nameField = document.getElementById('name');
const otherJobField = document.getElementById('other-job-role');
const jobSelector = document.getElementById('title');
const otherJob = document.querySelector('option[value=other]');
const colorSelect = document.getElementById('color');
const designSelect = document.getElementById('design');
const activityRegister = document.getElementById('activities');
const total_cost_field = document.getElementById('activities-cost');
const payment_menu = document.getElementById('payment');
const form = document.querySelector('form');
const email = document.getElementById('email');
const checkbox = document.querySelectorAll('input[type="checkbox"]');

// HINT SELECTORS

const nameHint = document.getElementById('name-hint');
const emailHint = document.getElementById('email-hint');
const checkboxHint = document.getElementById('activities-hint');
const ccHint = document.getElementById('cc-hint');
const zipHint = document.getElementById('zip-hint');

// REUSABLE FUNCTIONS

const hideBlock = block => block.style.display = 'none';
const showBlock = block => block.style.display = 'block';

// Focus on the name field.

nameField.focus();

// Hide the "other job" text field.

hideBlock(otherJobField);

// Select additional input field for when user selects the "Other" option from the job role dropdown menu.

jobSelector.addEventListener('change', (event) => event.target.value === 'other' ? showBlock(otherJobField) : hideBlock(otherJobField));

// Disable the color select element

colorSelect.disabled = true;

// Change the available options on the colorSelect menu based on the user's choice of design.

designSelect.addEventListener('change', (event) => {
    colorSelect.disabled = false;
    const userChoice = event.target.value;

    Array.from(colorSelect.options).forEach(option => {
        option.disabled = option.getAttribute('data-theme') !== userChoice;
        option.disabled ? hideBlock(option) : showBlock(option);
    });
});

// Reflect the total cost of all selected items in the 'Register for Activities' section.
let total_cost = 0;

activityRegister.addEventListener('change', (event) => {
    const checkedStatus = event.target.checked;
    const activityPrice = parseInt(event.target.dataset.cost);
    
    checkedStatus ? total_cost += activityPrice : total_cost -= activityPrice;
    total_cost_field.textContent = `Total: $${total_cost}`
});

// Show the appropriate payment section for the user's chosen payment method.

const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

hideBlock(paypal);
hideBlock(bitcoin);

payment_menu.addEventListener('change', (event) => {
    const userMethod = event.target.value;
    const paymentOptions = [creditCard, paypal, bitcoin];

    paymentOptions.forEach(option => option.id === userMethod ? showBlock(option) : hideBlock(option));
});

// Validate the user's input in the form.

form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Check "Name" field is not blank or empty.
    if(nameField.value.trim() === '') {
        showBlock(nameHint);
    };

    // Check the email address is formatted correctly.
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email.value)) {
        showBlock(emailHint);
    };

    // Check at least one check box is checked in "Register for Activities"
    const checkArray = Array.from(checkbox);
    let false_checkbox_count = 0;
    checkArray.forEach(box => {
        if(!box.checked) {
            false_checkbox_count += 1;
        };

        if(false_checkbox_count === checkArray.length) {
            showBlock(checkboxHint);
        };
    });
});