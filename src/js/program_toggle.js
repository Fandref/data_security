function programToggleHandler(e){
    const activeToggle = this || e.target;
    const programToggle = activeToggle.parentElement;
    // const programToggle = programToggle.querySelector('.toggle-item.active');
    programToggle.querySelector('.toggle-item.active').classList.remove('active');
    activeToggle.classList.add('active');
    
    const input = programToggle.querySelector('input');
    const s = activeToggle.dataset.value;

    input.value = s;

}


export default function bindProgramToggleHandler(){
    const programToggles = document.querySelectorAll('.program-toggle .toggle-item');
    
    programToggles.forEach(programToggle => {
        programToggle.addEventListener('click', programToggleHandler);
    });
}

