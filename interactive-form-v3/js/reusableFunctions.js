// Show and hide block functions.
const hideBlock = block => block.style.display = 'none';
const showBlock = block => block.style.display = 'block';

// Function used to call when the form should not be submitted.

const preventSubmit = () => event.preventDefault();

// Helper function to test the vadility of the text input fields. 

const fieldRegexValidator = (selector, regex, hint) => {
    if(!regex.test(selector.value)) {
        inValidField(selector.parentElement, hint);
        preventSubmit();
    } else {
        validField(selector.parentElement, hint);
    }
};

// The two functions below bring out visible error messages.

const inValidField = (selector, hint) => {
    selector.classList.remove('valid');
    selector.classList.add('not-valid');
    showBlock(hint);
}

const validField = (selector, hint) => {
    selector.classList.add('valid');
    selector.classList.remove('not-valid');
    hideBlock(hint);
}