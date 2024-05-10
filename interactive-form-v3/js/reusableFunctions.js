// Show and hide block functions.
const hideBlock = block => block.style.display = 'none';
const showBlock = block => block.style.display = 'block';

// Function used to call when the form should not be submitted.

const preventSubmit = () => event.preventDefault();


// This function creates an empty message warning for empty input text fields.

const emptyMessage = (parentElement) => {
    const existingHint = parentElement.querySelector('#empty-hint');
    const firstChild = parentElement.firstChild.textContent.replace(/:/g, "");
    if (existingHint) {
        return existingHint; 
    } else {
        const emptyHintSpan = document.createElement('span');
        emptyHintSpan.id = 'empty-hint';
        emptyHintSpan.classList.add('empty-hint', 'hint');
        emptyHintSpan.textContent = `${firstChild}field cannot be blank`;
        return emptyHintSpan; 
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