const {flatten, scaleKeyToLength, reshapeArray, separator: nullable_value} = require('./helpers')

function getPermutationsMap(word){
    let word_array = word.split('');
    let permutations_map = [];
    let sorted_letters = [...word_array].sort();
    
    word_array.forEach((letter) => {
        const index = sorted_letters.indexOf(letter);
        permutations_map.push(index);
        sorted_letters[index] = null;
    });

    return permutations_map;
}

function permutationArray(array, permutations_map, axis=0){
    const permutationed_array = new Array(array.length);

    if(axis === 0){
        if(array.length !== permutations_map.length)
            throw new Error('Length array is not equal to length permutations map');
        
            permutations_map.forEach((element, index) =>{
            permutationed_array[element] = array[index];
        });
    }

    if(axis === 1){
        if(array[0].length !== permutations_map.length)
            throw new Error('Length sub arrays is not equal to length permutations map');
        
        for(const [key, sub_array] of array.entries()){
            const new_sub_array = new Array(permutations_map.length).fill(null);
            permutations_map.forEach((element, index) =>{
                
                new_sub_array[element] = sub_array[index];
            });

            permutationed_array[key] = new_sub_array;
        }
    }

    return permutationed_array;
}

function reflectPermutationsMap(permutations_map){
    const reflected_permutation_map = new Array(permutations_map.length);
    
    permutations_map.forEach((element, index)=>{
        reflected_permutation_map[element] = index;
    });

    return reflected_permutation_map;
}

function crypt(input_text, key){
    const row_count = Math.ceil(input_text.length / key.length);
    const text_array = reshapeArray(input_text.split(''), key.length, nullable_value);
    const second_key = scaleKeyToLength(key, row_count);
    const permutation_map = getPermutationsMap(key);
    const second_permutation_map = getPermutationsMap(second_key);
    const permutation_array = permutationArray(permutationArray(text_array, second_permutation_map), permutation_map, 1);
    
    let crypted_string = '';

    for(let i = 0; i<key.length; i++){
        for(let j = 0; j<row_count; j++){
            if(permutation_array[j][i])
            crypted_string += permutation_array[j][i];
        }
    }

    return crypted_string;
}

function decrypt(crypted_text, key){
    const row_count = Math.ceil(crypted_text.length / key.length);
    const second_key = scaleKeyToLength(key, row_count);
    const permutation_map = reflectPermutationsMap(getPermutationsMap(key));
    const second_permutation_map = reflectPermutationsMap(getPermutationsMap(second_key));
    const crypted_chars = crypted_text.split('');
    let crypted_array = new Array(row_count).fill(null);
    crypted_array = crypted_array.map(()=>new Array(key.length).fill(null));
    
    for(let j = 0; j<key.length; j++){

        for(let i = 0; i<row_count; i++){
            crypted_array[i][j] = crypted_chars.shift();
        }
    }
    
    const result_array = permutationArray(permutationArray(crypted_array, permutation_map, 1), second_permutation_map)

    return flatten(result_array).join('').split(nullable_value)[0];
}

module.exports = {getPermutationsMap, permutationArray, reflectPermutationsMap, crypt, decrypt}