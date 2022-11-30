const _ = require('../helpers');

const numbersFromInput = [9, 0, 18, 5, 13, 5, 13, 2, 5, 18, 0, 20, 8, 1, 20, 0, 19, 5, 16, 20, 5, 13, 2, 5, 18];
const keyScaledToLength = 'leonidleonidleonidleonidl';
const input = 'i remember that september';
const key = 'leonid';

test('convert array of chars to array of numbers', ()=>{
    const chars = input.split('');
    expect(_.convertCharsToNumbers(chars)).toEqual(numbersFromInput);
});

test('convert array of numbers to array of chars', ()=>{
    const chars = input.split('');
    expect(_.convertNumbersToChars(numbersFromInput)).toEqual(chars);
});

test('scale key to input length', ()=>{
    const length = keyScaledToLength.length;
    expect(_.scaleKeyToLength(key, length)).toBe(keyScaledToLength);
});

test('sortes letters function', ()=>{
    const input = 'blabla2'.split('');
    const output = [
        ['b', 'l'],
        ['a', 'b'],
        ['l', 'a'],
        ['2', null]
    ];

    expect(_.reshapeArray(input, 2)).toEqual(output);
});