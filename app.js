
// Hamburger Menu

var menuIcon = document.getElementById('button');
var closeButton = document.querySelector('#close-button i');
var navTab = document.getElementById('nav-tab');

navTab.style.display = 'none';

const fadeIn = (menuIcon, duration = 1000) => {
    menuIcon.style.opacity = 0;
    menuIcon.style.display = 'block';

    let opacity = 0;
    const increment = 50 / duration;

    const fade = setInterval(() => {
        opacity += increment;
        if (opacity >= 1) {
            opacity = 1;
            clearInterval(fade);
        }
        menuIcon.style.opacity = opacity;
    }, 50);
};

const fadeOut = (closeButton, duration = 10000) => {
    let opacity = 1;
    const decrement = 100 / duration;

    const fade = setInterval(() => {
        opacity -= decrement;
        if (opacity <= 0) {
            opacity = 0;
            clearInterval(fade);
            closeButton.style.display = 'none';
        }
        closeButton.style.opacity = opacity;
    }, 50);
};

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
const emailValidation = document.getElementById('email');

const errorMessages = {
    voornaam: {
        required: 'Firstname must be provided',
        invalid: 'Firstname must start with an uppercase letter',
    },
    achternaam: {
        required: 'Lastname must be provided',
        invalid: 'Lastname must start with an uppercase letter',
    },
    email: {
        required: 'Field cannot be empty',
        invalid: 'This is not a valid email address',
    },
    datum: {
        required: 'Field cannot be empty'
    }
};

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let formValid = true;

    Array.from(form.elements).forEach(input => {
        if (input.hasAttribute('required')) {
            if (!input.validity.valid) {
                setErrorFor(input, getErrorMessage(input));
                formValid = false;
            } else if (input.id === 'voornaam' || input.id === 'achternaam') {
                if (!startsWithUppercase(input.value)) {
                    setErrorFor(input, errorMessages[input.id].invalid);
                    formValid = false;
                } else {
                    capitalizeFirstLetter(input);
                    setSuccessFor(input);
                }
            } else {
                setSuccessFor(input);
            }
        }
    });

    if (formValid) {
        console.log('Form is valid! Submitting...');
        form.submit();
        window.location.reload();
    }
});

const getErrorMessage = (element) => {
    if (element.validity.valueMissing) {
        return errorMessages[element.name]?.required || 'This field is required.';
    } else if (element.validity.typeMismatch) {
        return errorMessages[element.name]?.invalid || 'Invalid value.';
    }
    return '';
}

const setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    formControl.classList.add('error');
    formControl.classList.remove('success');
    const small = formControl.querySelector('small');
    small.innerText = message;
    small.classList.add('error-message');
    updateBorder(input, false);
}

const setSuccessFor = (input) => {
    const formControl = input.parentElement;
    formControl.classList.add('success');
    formControl.classList.remove('error');
    const small = formControl.querySelector('small');
    small.innerText = '';
    updateBorder(input, true);
}

const updateBorder = (input, isValid) => {
    if (isValid) {
        input.style.borderBottom = '2px solid var(--green)';
    } else {
        input.style.borderBottom = '2px solid var(--sec)';
    }
}

const startsWithUppercase = (value) => {
    return /^[A-Z]/.test(value);
} 

const capitalizeFirstLetter = (input) => {
    let value = input.value.trim();
    input.value = value.charAt(0).toUpperCase() + value.slice(1);
}

const showError = (element) => {
    const errorMessage = getErrorMessage(element);
    const small = element.parentElement.querySelector('small');
    small.textContent = errorMessage;
    small.style.display = errorMessage ? 'block' : 'none';
    element.classList.toggle('valid', !errorMessage);
    element.classList.toggle('invalid', !!errorMessage);
    updateBorder(element, !errorMessage);
}

Array.from(form.elements).forEach(input => {
    if (input.hasAttribute('required')) {
        input.addEventListener('input', () => {
            if (input.id === 'voornaam' || input.id === 'achternaam') {
                if (!startsWithUppercase(input.value)) {
                    setErrorFor(input, errorMessages[input.id].invalid);
                } else {
                    capitalizeFirstLetter(input);
                    setSuccessFor(input);
                }
            } else {
                if (input.validity.valid) {
                    setSuccessFor(input);
                } else {
                    setErrorFor(input, getErrorMessage(input));
                }
            }
        });
    }
});

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
});
