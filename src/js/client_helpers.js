import showAlert from 's/js/custom_alert.js'; 

export function copy(text){
    navigator.clipboard.writeText(text).then(
        () => {
            showAlert('Cкопійовано');
        },
        () => {
            showAlert('Не cкопійовано');
        }
      );
}

export function copyButtonHandler(){
    const button = this;
    button.style.poinerEvents = 'none';
    const resultData = document.querySelector('.result-data');
    const result = resultData.innerText;

    copy(result);
    button.style.removeProperty('pointer-events')
    // setTimeout(()=> , 2000)

}

export function isAllValid(){
    const fields = document.querySelectorAll('.program .field');

    return Object.values(fields).every(field => {
        const label = field.querySelector('label');
        const value = field.querySelector('input').value;
        
        return label.innerText === label.dataset.label && value.length > 0;
    });
}
