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

const form = document.querySelector('form');
let isFormValid = false;

const errorMessages = {
    name: {
        required: 'Naam is verplicht',
        invalid: 'Voor- en achternaam moeten beginnen met een hoofdletter',
    },
    email: {
        required: 'Dit veld mag niet leeg zijn',
        invalid: 'Dit is geen geldig e-mailadres',
    },
    phone: {
        required: 'Dit veld mag niet leeg zijn',
        invalid: 'Telefoonnummer moet precies 10 cijfers bevatten',
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
        if (input.id === 'name' || input.id === 'email' || input.id === 'phone') {
            if (!input.validity.valid) {
                setErrorFor(input, getErrorMessage(input));
                formValid = false;
            } else if (input.id === 'name') {
                if (!isValidName(input.value)) {
                    setErrorFor(input, errorMessages[input.id].invalid);
                    formValid = false;
                } else {
                    setSuccessFor(input);
                }
            } else if (input.id === 'email') {
                if (!isValidEmail(input.value)) {
                    setErrorFor(input, errorMessages[input.id].invalid);
                    formValid = false;
                } else {
                    setSuccessFor(input);
                }
            } else if (input.id === 'phone') {
                if (!isValidPhoneNumber(input.value)) {
                    setErrorFor(input, errorMessages[input.id].invalid);
                    formValid = false;
                } else {
                    setSuccessFor(input);
                }
            } else {
                setSuccessFor(input);
            }
        }
    });

    return formValid;
};

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
        input.style.border = '3px solid var(--green)';
    } else {
        input.style.border = '3px solid var(--red)';
    }
}

const startsWithUppercase = (value) => {
    return /^[A-Z]/.test(value);
}

const isValidName = (value) => {
    const names = value.trim().split(' ');
    if (names.length !== 2) {
        return false;
    }
    return startsWithUppercase(names[0]) && startsWithUppercase(names[1]);
}

const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value);
}

const isValidPhoneNumber = (value) => {
    return /^(?:\+31|0)\d{9}$/.test(value) || /^\d{10}$/.test(value);
}

Array.from(form.elements).forEach(input => {
    if (input.id === 'name' || input.id === 'email' || input.id === 'phone') {
        input.addEventListener('input', () => {
            if (input.id === 'name') {
                if (!isValidName(input.value)) {
                    setErrorFor(input, errorMessages[input.id].invalid);
                } else {
                    setSuccessFor(input);
                }
            } else if (input.id === 'email') {
                if (!isValidEmail(input.value)) {
                    setErrorFor(input, errorMessages[input.id].invalid);
                } else {
                    setSuccessFor(input);
                }
            } else if (input.id === 'phone') {
                if (!isValidPhoneNumber(input.value)) {
                    setErrorFor(input, errorMessages[input.id].invalid);
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
