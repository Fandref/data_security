function changeValue(e){
    const changeEvent = new Event('change');
    const cell = this;
    const value = JSON.parse(cell.dataset.value);
    const parentElement = cell.parentElement;
    let mainValue = parentElement.value;

    if(cell.classList.contains('active')){
        mainValue = mainValue.filter((val) => val[0] !== value[0] || val[1] !== value[1]);
        cell.classList.remove('active');
    }
    else{
        mainValue[mainValue.length] = value;
        cell.classList.add('active');
        
    }
    
    parentElement.value = mainValue;
    
    parentElement.dispatchEvent(changeEvent);
}

function changeSize(targetInput){
    const {size, value} = targetInput.dataset;
    targetInput.innerHTML = '';
    targetInput.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    targetInput.appendChild(renderCells(size, value));
}

function mutationValue(target){
    const changeEvent = new Event('change');
    let mainValue = JSON.parse(target.dataset.value) || [];
    const cells = target.querySelectorAll(`.cell`);

    cells.forEach((cell) => {
        cell.classList.remove('error');
        cell.classList.remove('active');
    });

    mainValue.forEach((cellPosition) => {
        const cell = document.querySelector(`.cell[data-value='${JSON.stringify(cellPosition)}']`);
        cell.classList.add('active');
            
    });
    

    target.value = mainValue;
    
    target.dispatchEvent(changeEvent);
}

function mutationHandler(mutationsList, obs){
    for (let mutation of mutationsList) {
        if (mutation.type === 'attributes') {
            
            if(mutation.attributeName === 'data-size'){
                changeSize(mutation.target);
            }
            if(mutation.attributeName === 'data-value'){
                mutationValue(mutation.target);
            }
        }
    }
}

function renderCells(size, value){
    const parsedValue = value ? JSON.parse(value) : [];
    const fragment = document.createDocumentFragment();
    for(let i = 0; i<size; i++){
        for(let j = 0; j<size; j++){
            const cell = document.createElement('div');
            const value = [i, j];
            cell.dataset.value = JSON.stringify(value);
            cell.classList.add('cell');
            if(parsedValue.some((val) => val[0] === value[0] && val[1] === value[1])){
                cell.classList.add('active');
            }
            cell.addEventListener('click', changeValue);
            fragment.appendChild(cell);
        }
    }

    return fragment;
}

function createPatternInput(element){
    const observer = new MutationObserver(mutationHandler);
    const config = {
        attributes: true,
        attributeFilter: ['data-size', 'data-value'],
        attributeOldValue: true,
    };
    const {size, value} = element.dataset;
    
    element.appendChild(renderCells(size, value));
    element.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    element.value = value ? JSON.parse(value) : [];
    element.dataset.value = value || '[]';
    observer.observe(element, config);
}

function compilePatternInput(classElements){
    const elements = document.querySelectorAll('.'+classElements);

    elements.forEach((element)=>{createPatternInput(element)})
}

function disablePatternError(patternInput){
    const label = document.querySelector(`label[for='${patternInput.id}']`);
    const oldErrorCells = document.querySelectorAll('.cell.error');
        if(oldErrorCells){
            oldErrorCells.forEach((oldErrorCell) => oldErrorCell.classList.remove('error'));
        }
        if(patternInput.error){
            label.innerText = label.dataset.label;
            label.classList.remove('error');
            patternInput.error = false;
        }
        
}

function activatePatternError(patternInput, errorText, errorCells=[]){
    const label = document.querySelector(`label[for='${patternInput.id}']`);
    if(!Array.isArray(errorCells))
        throw new Error('errorCells must be array')
    
    disablePatternError(patternInput);
    
    errorCells.forEach((error) => {
        const errorCell = document.querySelector(`.cell.active[data-value='${JSON.stringify(error)}']`);
        if(errorCell)
            errorCell.classList.add('error');
    });

    patternInput.error = true;
    label.innerHTML = errorText;
    label.classList.add('error');
}

module.exports = {compilePatternInput, activatePatternError, disablePatternError};