const {convertToBase, convertNumberToNumberOfLimit, convertNumbersToChars} = require('./helpers');

const countLetters = 27;

function crypt(inputText, key){
    const {inputTextConvertedToNumbers, scaledKeyConvertedToNumbers} = convertToBase(inputText, key);

    const cryptedNumbers = inputTextConvertedToNumbers.map((number, index)=>{
        const numbersSum = number+scaledKeyConvertedToNumbers[index];
        return convertNumberToNumberOfLimit(numbersSum);
    });

    const cryptedChar = convertNumbersToChars(cryptedNumbers);

    return cryptedChar.join('');
}

function decrypt(cryptedText, key){
    const {inputTextConvertedToNumbers, scaledKeyConvertedToNumbers} = convertToBase(cryptedText, key);

    const cryptedNumbers = inputTextConvertedToNumbers.map((number, index)=>{
        const numbersSum = number-scaledKeyConvertedToNumbers[index];

        const newNumber = numbersSum > 0 ? convertNumberToNumberOfLimit(numbersSum) : countLetters + numbersSum;

        return convertNumberToNumberOfLimit(newNumber);   
    });

    const cryptedChar = convertNumbersToChars(cryptedNumbers);
    
    return cryptedChar.join('');
}


module.exports = {crypt, decrypt}
