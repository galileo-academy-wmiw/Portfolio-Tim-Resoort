
// Hamburger Menu

var menuIcon = document.getElementById('button');
var closeButton = document.querySelector('#close-button i');
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
let isFormValid = false;

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
        invalid: 'Afspraak kan niet in het verleden gepland worden'
    }
};

form.addEventListener('submit', function(e) {
    e.preventDefault();
    isFormValid = validateForm();
    if (isFormValid) {
        console.log('Form is valid! Submitting...');
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
                if (!isValidEmail(input.value)) {
                    setErrorFor(input, errorMessages[input.id].invalid);
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
        return errorMessages[element.id]?.required || 'This field is required.';
    } else if (element.validity.typeMismatch) {
        return errorMessages[element.id]?.invalid || 'Invalid value.';
    }
    return '';
}

const setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    let small = formControl.querySelector('small');
    if (!small) {
        small = document.createElement('small');
        formControl.appendChild(small);
    }
    small.innerText = message;
    small.classList.add('error-message');
    updateBorder(input, false);
}

const setSuccessFor = (input) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    if (small) {
        small.innerText = '';
    }
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

const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value);
}

const isValidDate = (date) => {
    const today = new Date().toISOString().split('T')[0];
    return date >= today;
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
                if (!isValidEmail(input.value)) {
                    setErrorFor(input, errorMessages[input.id].invalid);
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
                if (input.validity.valid) {
                    setSuccessFor(input);
                } else {
                    setErrorFor(input, getErrorMessage(input));
                }
            }
        });
    }
});