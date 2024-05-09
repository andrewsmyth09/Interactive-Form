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

hideBlock(paypal);
hideBlock(bitcoin);

payment_menu.addEventListener('change', (event) => {
    const userMethod = event.target.value;
    const paymentOptions = [creditCard, paypal, bitcoin];

    paymentOptions.forEach(option => option.id === userMethod ? showBlock(option) : hideBlock(option));
});

// Validate the user's input in the form.

form.addEventListener('submit', (event) => {
    // Check "Name" field is not blank or empty.
    fieldRegexValidator(nameField, /\S/, nameHint);

    // Check the email address is formatted correctly.
    fieldRegexValidator(email, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, emailHint);

    // Check at least one check box is checked in "Register for Activities".
    const checkArray = Array.from(checkbox);
    let falseCheckboxCount = 0;
    checkArray.forEach(box => {
        if(!box.checked) {
            falseCheckboxCount += 1;
        };

        if(falseCheckboxCount === checkArray.length) {
            showBlock(checkboxHint);
            preventSubmit();
        };
    });

    // Check the credit card is the selected payment option.
    if(payment_menu.value === 'credit-card') {
        // Check the credit card number is between 13 and 16 digits.
        fieldRegexValidator(cardNumberField, /^\d{13,16}$/, ccHint);

        // Check the zip code is 5 digits.
        fieldRegexValidator(zipCodeField, /^\d{5}$/, zipHint);

        // Check the CVV code is 3 digits.
        fieldRegexValidator(cvvField, /^\d{3}$/, cvvHint);
    };
});