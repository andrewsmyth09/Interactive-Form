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
    colorSelect.selectedIndex = 0;
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
    const checkBoxTime = event.target.getAttribute('data-day-and-time');

    checkedStatus ? total_cost += activityPrice : total_cost -= activityPrice; // Update total cost for checked and unchecked checkboxes
    total_cost_field.textContent = `Total: $${total_cost}`;

    // Enable/disable activites that are on the same day and time as a checked box.
    checkArray.forEach(box => {
        if(box !== event.target && box.getAttribute('data-day-and-time') === checkBoxTime) { // Check if the checkbox is not the event target
            if (checkedStatus) {
                box.disabled = true;
                box.parentElement.classList.add('disabled');
            } else {
                box.disabled = false;
                box.parentElement.classList.remove('disabled');
            }
        }
    });
});

// Show the appropriate payment section for the user's chosen payment method.
payment_menu.selectedIndex = 1;
hideBlock(paypal);
hideBlock(bitcoin);

payment_menu.addEventListener('change', (event) => {
    const userMethod = event.target.value;
    const paymentOptions = [creditCard, paypal, bitcoin];

    paymentOptions.forEach(option => option.id === userMethod ? showBlock(option) : hideBlock(option));
});

// Validate the user's input in the form.

form.addEventListener('submit', () => {
    // Check "Name" field is not blank or empty.
    fieldRegexValidator(nameField, /\S/, nameHint);

    // Check the email address is formatted correctly.
    fieldRegexValidator(email, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, emailHint);

    // Check at least one check box is checked in "Register for Activities".
    let falseCheckboxCount = 0;
    checkArray.forEach(box => {
        if(!box.checked) {
            falseCheckboxCount += 1;
        };

        if(falseCheckboxCount === checkArray.length) {
            inValidField(activityRegister, checkboxHint);
            preventSubmit();
        } else {
            validField(activityRegister, checkboxHint);
        }
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

// Focus and blur out of each checkbox that the user tabs on with the keyboard.

checkArray.forEach((checkbox) => {
    const label = checkbox.closest('label');
    checkbox.addEventListener('focus', () => label.classList.add('focus'));
    checkbox.addEventListener('blur', () => label.classList.remove('focus'));
  });

  // Real-Time error message for the name input field.

  nameField.addEventListener('keyup', () => {
    fieldRegexValidator(nameField, /\S/, nameHint);
  });