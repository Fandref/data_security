// function iss
import {crypt, decrypt} from './vizenera_logic';
import {copyButtonHandler, isAllValid} from './client_helpers';


function moveKeyValidateHandler(e){
    const field = this || e.target;
    const value = field.value;
    const fieldBlock = field.parentElement;
    const label = fieldBlock.querySelector('label');
    const labelDefault = label.dataset.label;

    const successPattern = /^[\d, ]+$/;



    if(value.length > 0 && !successPattern.test(value)){
        label.classList.add('error');
        label.innerText = 'Я приймаю лише перелік чисел через кому';
    }
    else{
        label.classList.remove('error');
        label.innerText = labelDefault;
    }
}

function inputValidateHandler(e){
    const field = this || e.target;
    const value = field.value;
    const fieldBlock = field.parentElement;
    const label = fieldBlock.querySelector('label');
    const labelDefault = label.dataset.label;

    const successPattern = /^[^\d]+$/;



    if(value.length > 0 && !successPattern.test(value)){
        label.classList.add('error');
        label.innerText = 'Я не приймаю цифри'
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
    const moveMap = document.getElementById('move-key').value.split(',');
    const key = document.getElementById('key').value;
    const operation = document.querySelector('#operation').value;
    const resultData = document.querySelector('.result-data');

    resultData.innerText = operations[operation](inputText, moveMap, key);

    document.querySelector('.result').classList.add('open');
    
}

// export default function(){
//     const runActionButton = document.querySelector('#submit-command');
//     const allInput = document.querySelectorAll('.field input');
//     const copyButton = document.querySelector('.copy');

//     allInput.forEach(input => {
//         input.addEventListener('input', inputValidateHandler);
//     });

//     runActionButton.addEventListener('click', runOperation);
//     copyButton.addEventListener('click', copyButtonHandler);
    
// }

export default function(){
    const wordInput = document.getElementById('input-text');
    const moveKey = document.getElementById('move-key');
    const keyInput = document.getElementById('key');
    const copyButton = document.querySelector('.copy');
    const runActionButton = document.querySelector('#submit-command');
    
    wordInput.addEventListener('input', inputValidateHandler);
    moveKey.addEventListener('input', moveKeyValidateHandler);
    keyInput.addEventListener('input', inputValidateHandler);
    copyButton.addEventListener('click', copyButtonHandler);
    runActionButton.addEventListener('click', runOperation);
}