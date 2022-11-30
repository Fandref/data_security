const _ = require('../tritemius_logic');
// im

const input = 'i remember that september';
const kriptedString = 'uefsviygteixtfhnaiayt kic';
const key = 'leonid';

test('crypt by tritemius', () =>{
    expect(_.crypt(input, key)).toBe(kriptedString);
});

test('decrypt by tritemius', () => {
    expect(_.decrypt(kriptedString, key)).toBe(input);
});