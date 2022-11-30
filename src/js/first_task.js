// function iss
import {crypt, decrypt} from './tritemius_logic';
import {copyButtonHandler, isAllValid} from './client_helpers';

function inputValidateHandler(e){
    const field = this || e.target;
    const value = field.value;
    const fieldBlock = field.parentElement;
    const label = fieldBlock.querySelector('label');
    const labelDefault = label.dataset.label;

    const successPattern = /^[A-z ]+$/;



    if(value.length > 0 && !successPattern.test(value)){
        label.classList.add('error');
        label.innerText = 'Я приймаю лише латинські літери'
    }
    else{
        label.classList.remove('error');
        label.innerText = labelDefault;
    }
}

function runOperation(){
    if(!isAllValid())
        return;

    const operations = {
        crypt,
        decrypt
    }

    const inputText = document.getElementById('input-text').value;
    const key = document.getElementById('key').value;
    const operation = document.querySelector('#operation').value;
    const resultData = document.querySelector('.result-data');

    console.log(resultData);
    resultData.innerText = operations[operation](inputText, key);

    document.querySelector('.result').classList.add('open');
    
}

export default function(){
    const runActionButton = document.querySelector('#submit-command');
    const allInput = document.querySelectorAll('.field input');
    const copyButton = document.querySelector('.copy');

    allInput.forEach(input => {
        input.addEventListener('input', inputValidateHandler);
    });

    runActionButton.addEventListener('click', runOperation);
    copyButton.addEventListener('click', copyButtonHandler);
    
}