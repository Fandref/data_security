const _ = require('../vernam_logic');

test('XOR bytes words', ()=>{
    expect(_.xor([0], [0])).toEqual([0]);
    expect(_.xor([0], [1])).toEqual([1]);
    expect(_.xor([1], [0])).toEqual([1]);
    expect(_.xor([1], [1])).toEqual([0]);
});

test('decimal to binary', ()=>{
    const output = '101010';
    const input = 42;

    expect(_.convertDecimalToBinary(input)).toBe(output);
});

test('convert array of char to array of bytes', ()=>{
    const output = [
        '10000110001',
        '10000110000',
        '10000111101',
        '10000110000',
        '10000111101'
    ];
    const input = ['б','а','н','а','н'];

    expect(_.convertCharsToBinary(input)).toEqual(output);
});

test('convert array of char to array of bytes', ()=>{

    expect(_.convertBinaryToDecimal('10000110001')).toBe(1073);
    expect(_.convertBinaryToDecimal(10000110001)).toBe(1073);
});


test('convert array of char to array of bytes', ()=>{
    const input = [
        '10000110001',
        '10000110000',
        '10000111101',
        '10000110000',
        '10000111101'
    ];
    const output = ['б','а','н','а','н'];

    expect(_.convertBinaryToChars(input, 6)).toEqual(output);
});

test('convert array of char to array of bytes', ()=>{
    const input = 'banan';
    const key = '111';
    const output = 'SP_P_';

    expect(_.vernamMethod(input, key)).toBe(output);
    expect(_.vernamMethod(output, key)).toBe(input);

});


