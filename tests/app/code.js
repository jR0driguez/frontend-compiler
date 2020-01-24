import {React} from '../react/react.development.js';
import {ReactDOM} from '../react/react-dom.development.js';

/**
* file: imports.js
*/

console.log(10);

/**
* file: app.js
*/

console.log("hola pepsicola 1")


/**
* file: Client.js
*/

function Client() {

    Object.defineProperty(this, 'algo', {'get': () => true});
}

/**
* file: user.js
*/

function User() {

}
var cssOutput = `body {
  background: red; }
`;
let styles = document.createElement('style');
styles.innerText=cssOutput;
document.body.appendChild(styles);