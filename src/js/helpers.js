const upperCaseOffset = 64;
const lowerCaseOffset = 96;
const countLetters = 27;

const separator = '▌';

function convertNumberToNumberOfLimit(number, limit = null){
    const currentLimit = limit || countLetters;
    return number >= currentLimit ? number%currentLimit : number;
}

function getCharOffsetCase(asciiChar){
    return asciiChar > lowerCaseOffset ? lowerCaseOffset : upperCaseOffset
}


function reshapeArray(input_array, base_length, nullable_value = null){
    const reshaped = [];
    while(input_array.length){
        if(input_array.length < base_length){
            const conpens_array = new Array(base_length - input_array.length).fill(nullable_value);
            reshaped.push(input_array.splice(0, input_array.length).concat(conpens_array));
        }
        else{
            reshaped.push(input_array.splice(0, base_length));
        }
    }
    
    return reshaped;
}

function convertToBase(inputText, key){
    const inputTextConvertedToNumbers = convertCharsToNumbers(inputText.split(''));
    const keyScaledToLength = scaleKeyToLength(key, inputText.length);
    const scaledKeyConvertedToNumbers = convertCharsToNumbers(keyScaledToLength.split(''));
    return {
        inputTextConvertedToNumbers,
        scaledKeyConvertedToNumbers
    };
}

function convertCharsToNumbers(chars, with_latin_offset=true){
    return chars.map(char=>{
        if(char === ' ')
            return 0;
        const asciiChar = char.charCodeAt();
        const currentOffset = getCharOffsetCase(asciiChar);
        return with_latin_offset ? asciiChar - currentOffset : asciiChar;
    });
}

function convertNumbersToChars(numbers, with_latin_offset=true){
    return numbers.map(number=>{
        if(number === 0)
            return ' ';
        const code = with_latin_offset ? number+lowerCaseOffset : number;
        return String.fromCharCode(code);
    });
}

function scaleKeyToLength(key, length){
    let preparedKey = length > key.length ? key : '';
    const keyChars = key.split('');
    while(preparedKey.length !== length){
        const char = keyChars.shift();
        preparedKey += char;
        keyChars.push(char);
    }

    return preparedKey;

}

function flatten(inputArray){
    const outputArrray = [];

    if(Array.isArray(inputArray)){
        for(const element of inputArray){
            if(Array.isArray(element)){
                outputArrray.push(...flatten(element));
            }
            else{
                outputArrray.push(element);
            }
        }
    }

    return outputArrray;

}

function rotate(sourceArray){
    console.log(sourceArray);
    const lineLength = sourceArray[0].length;
    let outputArray = new Array(lineLength).fill(null);

    outputArray = outputArray.map(() => new Array(lineLength));

    for(let i = 0; i<sourceArray.length; i++){
        for(let j = 0; j<lineLength; j++){
            outputArray[j][lineLength-1-i] = sourceArray[i][j];
        }
    }


    return outputArray;


}

function getChars(length, asciiOffset = 64){
    const charArray = [];
    do{
        charArray.unshift(String.fromCharCode(asciiOffset+length));
    }while(length-- > 1);

    return charArray;
}

module.exports = {convertToBase, convertNumberToNumberOfLimit, convertNumbersToChars, scaleKeyToLength, convertCharsToNumbers, flatten, rotate, reshapeArray, getChars, separator}