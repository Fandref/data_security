import Router from 's/core/router';
import routes from 's/routes/routes'
import bindInputHandlers from 's/js/input_handler'
import toogleHandler from 's/js/program_toggle'


new Router(routes);

bindInputHandlers();
toogleHandler();


// let programtoggle
// 
// charCodeAt