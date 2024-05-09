// REUSABLE FUNCTIONS

const hideBlock = block => block.style.display = 'none';
const showBlock = block => block.style.display = 'block';
const isBlockDisplayed = block => block.style.display === 'block';
const preventSubmit = () => event.preventDefault();
const fieldRegexValidator = (selector, regex, hint) => {
    if(!regex.test(selector.value)) {
        showBlock(hint);
        preventSubmit();
    }
};