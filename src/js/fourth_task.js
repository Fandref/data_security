// function iss
import {crypt, decrypt} from './square_kardano';
import {copyButtonHandler} from './client_helpers';
import {activatePatternError, compilePatternInput, disablePatternError} from './pattern_input';
import { checkKeyPattern, countRotate, getArraySize } from './square_kardano_helpers';

const inputTextInput = document.getElementById('input-text');
const patternInput = document.getElementById('pattern');

function isAllValid(){
    return (!patternInput.error && patternInput.value.length > 0) && inputTextInput.value.length > 0;
}

function runOperation(){
    if(!isAllValid())
        return;

    const operations = {
        crypt,
        decrypt
    }

    const inputText = document.getElementById('input-text').value;
    const patternInput = document.getElementById('pattern');
    const key = patternInput.value;
    const operation = document.querySelector('#operation').value;
    const resultData = document.querySelector('.result-data');

    if(operation === 'crypt'){
        if(inputText.length > key.length*countRotate){
            console.log(Math.ceil(inputText.length/countRotate));
            activatePatternError(patternInput, `Ключ-трафарет не покриває вхідний текст.<br>
            Має бути принаймні ${Math.ceil(inputText.length/countRotate)} позначок в трафареті`);

            return;
        }
        else{
            disablePatternError(patternInput);
        }
    }


    resultData.innerText = operations[operation](inputText, key);

    document.querySelector('.result').classList.add('open');
    
}

function checkPatternInput(e){
    const value = this.value;
    const validateResult = checkKeyPattern(value, this.dataset.size);
    const label = document.querySelector(`label[for='${this.id}']`);

    if(typeof validateResult !== 'boolean'){
        const errorText = Array.isArray(validateResult[0]) ? 'Ключ-трафарет більший трафарету' : 'Ключ-трафарет містить накладку';
        
        activatePatternError(this, errorText, validateResult);
        this.error = true;
        label.classList.add('error');
    }
    else{
        disablePatternError(this);
    }
}

function changeSizePatternInput(e){
    const value = this.value;

    if(value.length>0){
        patternInput.dataset.size = getArraySize(value);
    }
    else if(patternInput.dataset.size != 2){
        patternInput.dataset.size = 2;
    }
    
    if(patternInput.value.length !== 0)
        patternInput.value = [];
}

export default function(){
    const copyButton = document.querySelector('.copy');
    const runActionButton = document.querySelector('#submit-command');

    compilePatternInput('pattern-input');

    patternInput.addEventListener('change', checkPatternInput);

    inputTextInput.addEventListener('input', changeSizePatternInput);

    runActionButton.addEventListener('click', runOperation);
    copyButton.addEventListener('click', copyButtonHandler);
    
}