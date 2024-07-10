
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

const errorMessages = {
    voornaam: {
        required: 'Voornaam is verplicht',
        invalid: 'Voornaam moet beginnen met een hoofdletter',
    },
    achternaam: {
        required: 'Achternaam is verplicht',
        invalid: 'Achternaam moet beginnen met een hoofdletter',
    },
    email: {
        required: 'Dit veld mag niet leeg zijn',
        invalid: 'Dit is geen geldig e-mailadres',
    },
    datum: {
        required: 'Dit veld mag niet leeg zijn',
        invalid: 'Datum mag niet verleden tijd zijn'
    }
};

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let formValid = validateForm();
    if (formValid) {
        console.log('Formulier is geldig! Verzenden...');
        form.submit();
        window.location.reload();
    }
});

const validateForm = () => {
    let formValid = true;

    Array.from(form.elements).forEach(input => {
        if (input.hasAttribute('required')) {
            if (input.id === 'voornaam' || input.id === 'achternaam') {
                if (input.value.trim() === '') {
                    setErrorFor(input, errorMessages[input.id].required);
                    formValid = false;
                } else if (!startsWithUppercase(input.value)) {
                    setErrorFor(input, errorMessages[input.id].invalid);
                    formValid = false;
                } else {
                    capitalizeFirstLetter(input);
                    setSuccessFor(input);
                }
            } else if (input.id === 'email') {
                if (!input.validity.valid) {
                    setErrorFor(input, getErrorMessage(input));
                    formValid = false;
                } else {
                    setSuccessFor(input);
                }
            } else if (input.id === 'datum') {
                if (input.value.trim() === '') {
                    setErrorFor(input, errorMessages.datum.required);
                    formValid = false;
                } else if (!isValidDate(input.value)) {
                    setErrorFor(input, errorMessages.datum.invalid);
                    formValid = false;
                } else {
                    setSuccessFor(input);
                }
            } else {
                if (!input.validity.valid) {
                    setErrorFor(input, getErrorMessage(input));
                    formValid = false;
                } else {
                    setSuccessFor(input);
                }
            }
        }
    });

    return formValid;
}

const getErrorMessage = (element) => {
    if (element.validity.valueMissing) {
        return errorMessages[element.name]?.required || 'Dit veld is verplicht.';
    } else if (element.validity.typeMismatch) {
        return errorMessages[element.name]?.invalid || 'Ongeldige waarde.';
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

const isValidDate = (date) => {
    const today = new Date().toISOString().split('T')[0];
    return date >= today;
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
                if (input.value.trim() === '') {
                    setErrorFor(input, errorMessages[input.id].required);
                } else if (!startsWithUppercase(input.value)) {
                    setErrorFor(input, errorMessages[input.id].invalid);
                } else {
                    capitalizeFirstLetter(input);
                    setSuccessFor(input);
                }
            } else if (input.id === 'email') {
                if (!input.validity.valid) {
                    setErrorFor(input, getErrorMessage(input));
                } else {
                    setSuccessFor(input);
                }
            } else if (input.id === 'datum') {
                if (input.value.trim() === '') {
                    setErrorFor(input, errorMessages.datum.required);
                } else if (!isValidDate(input.value)) {
                    setErrorFor(input, errorMessages.datum.invalid);
                } else {
                    setSuccessFor(input);
                }
            } else {
                if (!input.validity.valid) {
                    setErrorFor(input, getErrorMessage(input));
                } else {
                    setSuccessFor(input);
                }
            }
        });
    }
});

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
});
