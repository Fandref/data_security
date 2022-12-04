
export default class Router{
    constructor(routes){
        const pathNow = document.location.pathname;
        const appContrainer = document.getElementById('app');
        const content = routes[pathNow];
        if(content){
            const html = require('../'+content.html);
            appContrainer.innerHTML = html.default;
            if(content.js){
                const script = require('../'+content.js);
                script.default();
            }
        }
        else{
            appContrainer.innerHTML = '<h1>404</h1>';
        }

    }

}