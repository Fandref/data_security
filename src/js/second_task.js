import {vernamMethod} from './vernam_logic';
import {copyButtonHandler, isAllValid} from './client_helpers';

function vernamOperation(){
    if(!isAllValid())
        return;
    
    const inputText = document.getElementById('input-text').value;
    const key = document.getElementById('key').value;
    const resultData = document.querySelector('.result-data');

    resultData.innerText = vernamMethod(inputText, key);

    document.querySelector('.result').classList.add('open');
}

export default function(){
    const runActionButton = document.querySelector('#submit-command');
    const copyButton = document.querySelector('.copy');

    runActionButton.addEventListener('click', vernamOperation);
    copyButton.addEventListener('click', copyButtonHandler);
}