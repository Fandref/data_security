const { getChars, scaleKeyToLength } = require("./helpers");

const countLetterEnglish = 26;

const ukrainianAlphabet = [
    "А",
    "Б",
    "В",
    "Г",
    "Ґ",
    "Д",
    "Е",
    "Є",
    "Ж",
    "З",
    "И",
    "І",
    "Ї",
    "Й",
    "К",
    "Л",
    "М",
    "Н",
    "О",
    "П",
    "Р",
    "С",
    "Т",
    "У",
    "Ф",
    "Х",
    "Ц",
    "Ч",
    "Ш",
    "Щ",
    "Ь",
    "Ю",
    "Я",
    "а",
    "б",
    "в",
    "г",
    "ґ ",
    "д",
    "е",
    "є",
    "ж",
    "з",
    "и",
    "і",
    "ї",
    "й",
    "к",
    "л",
    "м",
    "н",
    "о",
    "п",
    "р",
    "с",
    "т",
    "у",
    "ф",
    "х",
    "ц",
    "ч",
    "ш",
    "щ",
    'ь',
    "ю",
    "я",
];
const generatedBase = generateBase(); 

function createSquare(base, moveMap){
    const square = {};
    const copiedBase = [...base];
    const movedBase = [];

    moveMap.forEach((index) => {
        movedBase.push(copiedBase[index]);
        delete copiedBase[index];
    })

    while(copiedBase.length > 0){
        const shiftedChar = copiedBase.shift();
        if(shiftedChar) 
            movedBase.push(shiftedChar);
    }

    base.forEach((row) => {
        square[row] = {};
        base.forEach((column, index) => {
            square[row][column] = movedBase[index];
        })
        movedBase.push(movedBase.shift());
    })
    return square;
}


function generateBase(){
    const englishASCIOffsetCaps = 'A'.charCodeAt() - 1;
    const englishASCIOffset = 'a'.charCodeAt() - 1;
    const englishAlphabetCaps = getChars(countLetterEnglish, englishASCIOffsetCaps);
    const englishAlphabet = getChars(countLetterEnglish, englishASCIOffset);
    const base = [...englishAlphabetCaps, ...englishAlphabet, ...ukrainianAlphabet, ' '];
    
    return base;
}

function crypt(inputText, moveKey, key){
    const inputChars = inputText.split('');
    const scaledKey = scaleKeyToLength(key, inputChars.length).split('');

    const squareForCrypt = createSquare(generatedBase, moveKey);

    const cryptedChars = inputChars.map((char) => {
        const keyChar = scaledKey.shift();
        
        return squareForCrypt[char][keyChar];
    });

    return cryptedChars.join('');
}

function decrypt(cryptedText, moveKey, key){
    const cryptedChars = cryptedText.split('');
    const scaledKey = scaleKeyToLength(key, cryptedChars.length).split('');
    const squareForCrypt = createSquare(generatedBase, moveKey);

    const decryptChars = cryptedChars.map((char) => {
        const keyChar = scaledKey.shift();

        for(const squareRow of generatedBase){
            if(squareForCrypt[squareRow][keyChar] === char)
                return squareRow;
        }

        return '!';
    });

    return decryptChars.join('');
}

module.exports = {createSquare, generateBase, crypt, decrypt}
