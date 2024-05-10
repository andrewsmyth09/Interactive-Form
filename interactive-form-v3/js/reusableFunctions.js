// Show and hide block functions.
const hideBlock = block => block.style.display = 'none';
const showBlock = block => block.style.display = 'block';

// Function used to call when the form should not be submitted.

const preventSubmit = () => event.preventDefault();


// This function creates an empty message warning for empty input text fields.

const emptyMessage = (parentElement) => {
    // Check if the parent element already contains a child with id 'empty-hint'
    const existingHint = parentElement.querySelector('#empty-hint');
    if (existingHint) {
        return existingHint; // Return the existing span element
    } else {
        // Create a new span element
        const emptyHintSpan = document.createElement('span');
        emptyHintSpan.id = 'empty-hint';
        emptyHintSpan.classList.add('empty-hint', 'hint');
        emptyHintSpan.textContent = 'Please fill in the blank space.';
        return emptyHintSpan; // Return the created span element
    }
};


// Helper function to test the vadility of the text input fields. 

const fieldRegexValidator = (selector, regex, hint) => {
    const parentElement = selector.parentElement;
    if(selector.value.trim() === '') {
        inValidField(parentElement, parentElement.appendChild(emptyMessage(parentElement)));
        preventSubmit();
    } else if(!regex.test(selector.value)) {
        hideBlock(emptyMessage(parentElement));
        inValidField(parentElement, hint);
        preventSubmit();
    } else {
        hideBlock(emptyMessage(parentElement));
        validField(parentElement, hint);
    }
};



// Bring out a visible error message if the field is invalid.

const inValidField = (selector, hint) => {
    selector.classList.remove('valid');
    selector.classList.add('not-valid');
    showBlock(hint);
};

// Bring out a visible approval message if the field is valid.

const validField = (selector, hint) => {
    selector.classList.add('valid');
    selector.classList.remove('not-valid');
    hideBlock(hint);
};