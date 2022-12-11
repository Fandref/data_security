const countRotate = 4;

function checkKeyPattern(keyPattern, size){
    if(!Array.isArray(keyPattern))
        throw new Error('Key pattern must be array');
    
    keyPattern.forEach(subarray => {
        if(!Array.isArray(subarray))
        throw new Error('In key pattern must be array');
    });

    if(Math.pow(size, 2) < keyPattern.length*countRotate){
        return keyPattern.slice(Math.ceil(keyPattern.length/countRotate));
    }
    
    
    let rotateInfomation = [...keyPattern].reverse();

    for(const cell of keyPattern){
        let rotatedCell = [cell[1], size - 1 - cell[0]];
        
        for(let i = 1; i<countRotate; i++){
            if(rotateInfomation.some((cellInfo) => cellInfo[0] === rotatedCell[0] && cellInfo[1] === rotatedCell[1]))
                return cell;
            else
                rotateInfomation.push(rotatedCell);
        
            rotatedCell = [rotatedCell[1], size - 1 - rotatedCell[0]];
        }
        
    }

    return true;
}

function getArraySize(innerText){
    const baseSize = Math.sqrt(innerText.length) > 2 ? Math.ceil(Math.sqrt(innerText.length)) : 2;

    return baseSize%2 !== 0 ? baseSize+1 : baseSize;
}


module.exports = {checkKeyPattern, getArraySize, countRotate};