const icon = header.innerHTML = 'fa-solid fa-bars';
const clickedIcon = header.innerHTML = 'fa-solid fa-x';

let ChangeIcon = function() {
    if (icon === clickedIcon) {
        document.header.innerHTML = clickedIcon
    } else {
        document.header.innerHTML = icon
    }
};