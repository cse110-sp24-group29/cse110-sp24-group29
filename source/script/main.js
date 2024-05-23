const boxContainerElement = document.getElementById('box-container');
const signUpButtonElement = document.getElementById('register');
const signInButtonElement = document.getElementById('login');

function handleSignUpButtonClick() {
    boxContainerElement.classList.add('active');
}

function handleSignInButtonClick() {
    boxContainerElement.classList.remove('active');
}

signUpButtonElement.addEventListener('click', handleSignUpButtonClick);
signInButtonElement.addEventListener('click', handleSignInButtonClick);
