// import 'fs';
// import 'path';
const fs = require('fs');
const path = require('path');

// const basePath = path.resolve(__dirname, 'src/pages');

export default class Router{
    #basePath
    #endPoints
    constructor(routes){
        const pathNow = document.location.pathname;
        const appContrainer = document.getElementById('app');
        const content = routes[pathNow];
        if(content){
            const html = require('../'+content.html);
            appContrainer.innerHTML = html.default;
            if(content.js){
                // console.log(require('../'+content.js))
                const script = require('../'+content.js);
                script.default();
            }
        }
        else{
            appContrainer.innerHTML = '<h1>404</h1>';
        }
        // console.log(document.location);

    }

}