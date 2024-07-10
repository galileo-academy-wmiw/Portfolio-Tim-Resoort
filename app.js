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

const form = document.querySelector('form');
const emailValidation = document.getElementById('email');

const errorMessages = {
    name: {
        required: 'Naam is verplicht',
        invalid: 'Naam moet beginnen met een hoofdletter',
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
    let formValid = validateForm();
    if (formValid) {
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
                if (!startsWithUppercase(input.value)) {
                    setErrorFor(input, errorMessages[input.id].invalid);
                    formValid = false;
                } else {
                    capitalizeFirstLetter(input);
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

const isValidPhoneNumber = (value) => {
    return /^\d{10}$/.test(value);
}

Array.from(form.elements).forEach(input => {
    if (input.id === 'name' || input.id === 'email' || input.id === 'phone') {
        input.addEventListener('input', () => {
            if (input.id === 'name') {
                if (!startsWithUppercase(input.value)) {
                    setErrorFor(input, errorMessages[input.id].invalid);
                } else {
                    capitalizeFirstLetter(input);
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

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
});
