const _ = require('../combined_permutations_logic');


test('sortes letters function', ()=>{
    expect(_.getPermutationsMap('шифр')).toEqual([3, 0, 2, 1]);
});


// test('sortes letters function', ()=>{
//     expect(_.getPermutationsMap('bla')).toEqual([1, 2, 0]);
// });

test('па', ()=>{
    const input = 'перестановка';
    const key = 'шифр';
    const output = 'твенаеакрсоп';

    expect(_.crypt(input, key)).toBe(output);
})

test('па', ()=>{
    const input = 'перестановка';
    const key = 'шифр';
    const output = 'твенаеакрсоп';
    
    expect(_.decrypt(output, key)).toBe(input);
})