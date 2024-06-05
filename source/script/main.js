/**
 * Get the container element from the DOM.
 */
const boxContainerElement = document.getElementById('box-container');

/**
 * Get the register button element from the DOM.
 */
const signUpButtonElement = document.getElementById('register');

/**
 * Get the login button element from the DOM.
 */
const signInButtonElement = document.getElementById('login');

/**
 * Handles the event when the sign-up button is clicked.
 * Adds 'active' class to the box container element to show the sign-up form.
 */
function handleSignUpButtonClick() {
    boxContainerElement.classList.add('active');
}

/**
 * Handles the event when the sign-in button is clicked.
 * Removes 'active' class from the box container element to hide the sign-up form.
 */
function handleSignInButtonClick() {
    boxContainerElement.classList.remove('active');
}

/**
 * Adds event listeners to sign-up and sign-in buttons.
 */
signUpButtonElement.addEventListener('click', handleSignUpButtonClick);
signInButtonElement.addEventListener('click', handleSignInButtonClick);