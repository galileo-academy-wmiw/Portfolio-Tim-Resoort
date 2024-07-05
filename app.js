
// Hamburger Menu

var menuIcon = document.getElementById('button');
var closeButton = document.getElementById('close-button');
var navTab = document.getElementById('nav-tab');

navTab.style.display = 'none';

menuIcon.addEventListener('click', function() {
    if (navTab.style.display == 'none' || navTab.style.display === '') {
        navTab.style.display = 'block';
        menuIcon.classList.toggle("close");
        document.body.style.overflow = 'hidden';
    } else {
        navTab.style.display = 'none';
        menuIcon.classList.remove("close");
        document.body.style.overflow = '';
    }
});

closeButton.addEventListener('click', function() {
    navTab.style.display = 'none';
    menuIcon.classList.remove("close");
    document.body.style.overflow = '';
});
 

// Form falidation

const form = document.getElementById('contactform');
const inputs = form.querySelectorAll('input[required], textarea[required]');

const errorMessages = {
    voornaam: 'Veld mag niet leeg zijn',
    achternaam: 'Veld mag niet leeg zijn',
    email: {
        required: 'Veld mag niet leeg zijn',
        invalid: 'Email niet geldig'
    },
    datum: 'Veld mag niet leeg zijn'
};

form.addEventListener('submit', e => {
    e.preventDefault();
    let formValid = true;

    inputs.forEach(input => {
        if (!input.validity.valid) {
            setErrorFor(input, getErrorMessage(input));
            formValid = false;
        } else {
            setSuccessFor(input);
        }
    });

    if (formValid) {
        console.log('Form valid!');
    }
});

const getErrorMessage = (input) => {
    if (input.id === 'email') {
        if (input.validity.valueMissing) {
            return errorMessages.email.required;
        } else if (input.validity.typeMismatch) {
            return errorMessages.email.invalid;
        }
    }
    return errorMessages.email[input.id];
}

const setSuccesFor = (input) => {
    const formControl = input.parentElement;
    formControl.classList.add('success');
    formControl.classList.remove('error');
    const small = formControl.querySelector('small');
    small.innerText = '';
}

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
});