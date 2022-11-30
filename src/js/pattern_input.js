function changeValue(e){
    const changeEvent = new Event('change');
    const cell = this;
    
    const value = JSON.parse(cell.dataset.value);
    const parentElement = cell.parentElement;
    // debugger;
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
    debugger
    const changeEvent = new Event('change');
    let mainValue = JSON.parse(target.dataset.value) || [];
    const cells = target.querySelectorAll(`.cell`);
    console.log(mainValue)
    cells.forEach((cell) => {
        cell.classList.remove('error');
        cell.classList.remove('active');
    })

    mainValue.forEach((cellPosition) => {
        const cell = document.querySelector(`.cell[data-value='${JSON.stringify(cellPosition)}']`);
        cell.classList.add('active');
            
    })
    

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
        // childList: true,
        // subtree: true
    };
    const {size, value} = element.dataset;
    
    element.appendChild(renderCells(size, value));
    element.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    element.value = value ? JSON.parse(value) : [];
    element.dataset.value = value || '[]';
    observer.observe(element, config);
}

export function compilePatternInput(classElements){
    const elements = document.querySelectorAll('.'+classElements);

    elements.forEach((element)=>{createPatternInput(element)})
}