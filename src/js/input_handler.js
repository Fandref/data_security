function inputBlurHandler(e){
    const input = this || e.target;
    const field = input.parentElement;
    const value = input.value;

    if(value.length > 0)
        field.classList.add('label-freez');
    else
        field.classList.remove('label-freez');

    field.classList.remove('focus');
}

function inputFocusHandler(e){
    const input = this || e.target;
    const field = input.parentElement;

    field.classList.add('focus')
}

function bindInputHandlers(){
    const inputs = document.querySelectorAll('.field input');

    inputs.forEach(element => {
        element.addEventListener('focus', inputFocusHandler);
        element.addEventListener('blur', inputBlurHandler);
    })
}

module.exports = bindInputHandlers;