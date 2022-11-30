// function iss
import {crypt, decrypt} from './square_kardano';
import {copyButtonHandler} from './client_helpers';
import {compilePatternInput} from './pattern_input';
import { checkKeyPattern, getArraySize } from './square_kardano_helpers';

const inputTextInput = document.getElementById('input-text');
const patternInput = document.getElementById('pattern');

function isAllValid(){
    return !patternInput.error && inputTextInput.value.length > 0;
}

function runOperation(){
    if(!isAllValid())
        return;

    const operations = {
        crypt,
        decrypt
    }

    const inputText = document.getElementById('input-text').value;
    const key = document.getElementById('pattern').value;
    const operation = document.querySelector('#operation').value;
    const resultData = document.querySelector('.result-data');

    console.log(resultData);
    resultData.innerText = operations[operation](inputText, key);

    document.querySelector('.result').classList.add('open');
    
}

function checkPatternInput(e){
    const value = this.value;
    const validateResult = checkKeyPattern(value, this.dataset.size);
    const label = document.querySelector(`label[for='${this.id}']`)
    if(typeof validateResult !== 'boolean'){
        const oldErrorCell = document.querySelector('.cell.error');
        if(oldErrorCell){
            oldErrorCell.classList.remove('error');
        }

        if(Array.isArray(validateResult[0])){
            validateResult.forEach((error) => {
                const errorCell = document.querySelector(`.cell[data-value='${JSON.stringify(error)}']`);
                errorCell.classList.add('error');
            });
            
            label.innerText ='Ключ-трафарет більший за тексту';
            

        }
        else{
            console.log(validateResult);
            const errorCell = document.querySelector(`.cell[data-value='${JSON.stringify(validateResult)}']`);
            errorCell.classList.add('error');
            label.innerText ='Ключ-трафарет містить накладку';
        }
        this.error = true;
        label.classList.add('error');
        
        
    }
    else{
        const oldErrorCell = document.querySelector('.cell.error');
        if(oldErrorCell){
            oldErrorCell.classList.remove('error');
        }
        label.innerText = label.dataset.label;
        label.classList.remove('error');
        this.error = false;
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
    // const textInput = document.getElementById('')
    compilePatternInput('pattern-input');

    patternInput.addEventListener('change', checkPatternInput);

    inputTextInput.addEventListener('input', changeSizePatternInput);
    const runActionButton = document.querySelector('#submit-command');
    // const allInput = document.querySelectorAll('.field input');
    const copyButton = document.querySelector('.copy');

    // allInput.forEach(input => {
    //     input.addEventListener('input', inputValidateHandler);
    // });

    runActionButton.addEventListener('click', runOperation);
    copyButton.addEventListener('click', copyButtonHandler);
    
}