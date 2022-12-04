const { rotate, flatten, reshapeArray, getChars, separator} = require("./helpers");
const { checkKeyPattern, getArraySize, countRotate } = require("./square_kardano_helpers");

function isCyrillicAlpabet(text){
    const сyrillicPattern = /[А-ієїя]/i;
    const latinPattern = /[A-z]/i;

    if(сyrillicPattern.test(text) && !latinPattern.test(text)){
        return true;
    }

    return false;
}


function crypt(inputText, keyPattern){
    const arraySize = getArraySize(inputText);

    if(typeof(checkKeyPattern(keyPattern, arraySize)) !== 'boolean'){
        return;
    }

    const asciiOffset = isCyrillicAlpabet(inputText) ? 'А'.charCodeAt() : 'A'.charCodeAt();
    const countAddedToBase = keyPattern.length*countRotate - inputText.length-1;
    
    let inputChars = inputText.split('');
    inputChars.push(separator);
    inputChars = inputChars.concat(getChars(countAddedToBase, asciiOffset-1));
    
    let cryptedArray = new Array(arraySize).fill(null);
    
    cryptedArray = cryptedArray.map(a => new Array(arraySize).fill(null));

    for(let i = 0; i<countRotate; i++){
        keyPattern.forEach((pattern) => {
            cryptedArray[pattern[0]][pattern[1]] = inputChars.shift();
        });
        if(i<countRotate-1)
            cryptedArray = rotate(cryptedArray);
    }
    // if(countRotate > 1)
    //     cryptedArray = rotate(cryptedArray);

    if(Math.pow(arraySize, 2) !== inputText.length){
        
        const addedChars = getChars(Math.pow(arraySize, 2) - inputChars.length, asciiOffset);

        for(let [indexRow, row] of cryptedArray.entries()){
            for(let [indexCell, cell] of row.entries()){
                if(!cell)
                    cryptedArray[indexRow][indexCell] = addedChars.shift();
            }
        }
    }
    console.log(flatten(cryptedArray).join(''));
    return flatten(cryptedArray).join('');

}

function decrypt(cryptedText, keyPattern){
    if(typeof(checkKeyPattern(keyPattern, getArraySize(cryptedText), countRotate)) !== 'boolean'){
        return;
    }
    
    const arraySize = getArraySize(cryptedText);
    let cryptedArray = reshapeArray(cryptedText.split(''), arraySize);
    let decrypt = '';

    cryptedArray = rotate(cryptedArray);

    for(let i = 0; i<countRotate; i++){
        keyPattern.forEach((pattern) => {
            decrypt += cryptedArray[pattern[0]][pattern[1]];
        });
        cryptedArray = rotate(cryptedArray);
    }

    return decrypt.split(separator)[0];
}

module.exports = {crypt, decrypt}