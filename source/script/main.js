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


document.addEventListener('DOMContentLoaded', function () {
    const signUpForm = document.querySelector('#signup-form');
    const signInForm = document.querySelector('#signin-form');
    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box'); // Ensure this class is styled in your CSS
    document.body.appendChild(messageBox);

    // Handle registration form submission
    signUpForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = this.querySelector('input[name="name"]').value;
        const pin = this.querySelector('input[name="pin"]').value;

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, pin })
        }).then(response => response.json())
            .then(data => {
                showMessage(data.message, 'success'); // Function to show message
                if (data.message.includes('Registered')) {
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('Registration failed. Please try again.', 'error');
            });
    });

    // Handle login form submission
    signInForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const pin = Array.from(document.querySelectorAll('.pin-input')).map(input => input.value).join('');

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pin })
        }).then(response => response.json())
            .then(data => {
                if (data.redirect) {
                    window.location.href = data.redirect; // Redirect on successful login
                } else {
                    showMessage(data.message, 'error'); // Show login failure message
                    shakePinCodeBox();
                }
            }).catch(error => {
                console.error('Error:', error);
                showMessage('Login failed. Please try again.', 'error');
                shakePinCodeBox();
            });
    });
});

// Function to display messages
function showMessage(msg, type) {
    const messageBox = document.querySelector('.message-box');
    messageBox.textContent = msg;
    messageBox.style.display = 'block';
    messageBox.style.backgroundColor = type === 'success' ? 'green' : 'red'; // Set color based on type

    setTimeout(() => {
        messageBox.textContent = '';
        messageBox.style.display = 'none';
    }, 3000);
}



// Function to shake the pin code box
function shakePinCodeBox() {
    const pinBox = document.querySelector('.pincode-box');
    pinBox.classList.add('shake');
    setTimeout(() => pinBox.classList.remove('shake'), 1000); // Remove class after animation
}