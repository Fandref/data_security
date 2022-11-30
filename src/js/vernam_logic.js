const {scaleKeyToLength, convertNumbersToChars, convertCharsToNumbers} = require('./helpers');


function xor(a, b){
    if(a.length !== b.length)
        throw new Error('a and b should be of the same length');
    
    const result = [];
    a.forEach((value, index) => {
        const bValue = b[index];
        if((value != 0 && value != 1) || (bValue != 0 && bValue != 1))
            throw new Error('a and b should be of the same length');
        result.push(value == bValue ? 0 : 1)
    })

    return result;
}

function convertDecimalToBinary(number){
    if(number === 1)
        return '1';
    if(number === 0)
        return '0';
    return convertDecimalToBinary(Math.floor(number/2)) + (number%2);
}

function convertBinaryToDecimal(binary_number){
    return parseInt(binary_number, 2);
}

function convertCharsToBinary(char_array, word_size=0){
    let result_bytes = [];
    const number_array = convertCharsToNumbers(char_array, false);
    const all_size = new Set();

    for(const number of number_array){
        let number_bytes = convertDecimalToBinary(number);
        all_size.add(number_bytes.length);
        
        result_bytes.push(number_bytes);
    }

    if(all_size.size > 1){
        
        const size = Math.max(...all_size);
        result_bytes = result_bytes.map((bytes) => {
            const added_length = size - bytes.length;

            if(added_length === 0)
                return bytes;
            return new Array(added_length).fill(0).join('')+bytes;
        });
    }

    return result_bytes;
}

function convertBinaryToChars(array_binary){
    const numbers = array_binary.map((binary_number) => {
        return convertBinaryToDecimal(binary_number);
    });
    const chars = convertNumbersToChars(numbers, false);
    return chars;
}

function alignBinaryNumbers(a, b){
    const aligner = (binary, length) => {
        const added_length = length - binary.length;
        return new Array(added_length).fill(0).join('')+binary;
    }
    if(a[0].length == b[0].length)
        return [a, b];
    
    aliged_a = a[0].length < b[0].length ? a.map((binary) => aligner(binary, b[0].length)) : a;
    aliged_b = a[0].length > b[0].length ? b.map((binary) => aligner(binary, a[0].length)) : b;

    return [aliged_a, aliged_b];
}

function vernamMethod(inputString, key){
    const binary_input = convertCharsToBinary(inputString.split(''));
    const preparedKey = scaleKeyToLength(key, inputString.length);
    const binary_key = convertCharsToBinary(preparedKey.split(''));
    const [aliged_binary_input, aliged_binary_key] = alignBinaryNumbers(binary_input, binary_key);
    const computed_binaries = [];

    aliged_binary_input.forEach((binary, index) => {
        const computed_binary = xor(binary.split(''), aliged_binary_key[index].split(''));
        computed_binaries.push(computed_binary.join(''));
    })

    return convertBinaryToChars(computed_binaries).join('');
}



module.exports = {xor, convertDecimalToBinary, convertCharsToBinary, convertBinaryToDecimal, convertBinaryToChars, vernamMethod}