const animationDuration = 2000;

function alertElement(message){
    const element = document.createElement('div');
    element.classList.add('custom-alert');
    element.innerText = message;
    return element;
}

export default function showAlert(message, autoHideMs = 2000){
    const app = document.getElementById('app');
    const custom_alert = alertElement(message);

    app.appendChild(custom_alert);
    setTimeout(() => custom_alert.classList.add('open'), 1);

    setTimeout(() => custom_alert.classList.remove('open'), autoHideMs);
    setTimeout(()=>app.removeChild(custom_alert),  autoHideMs+animationDuration);
}