//const fetchData = require("./src/utils/fetchData");
const API = 'https://rickandmortyapi.com/api/character/';

const  fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', url_api, true);
        xhttp.onreadystatechange = (() => {
          if(xhttp.readyState === 4){
            (xhttp.status === 200)
                ? resolve(JSON.parse(xhttp.responseText))
                : reject(new Error("Error " + url_api)) 
          }
        });
        xhttp.send();
    });
}

const anotherFunction = async (url_api) => {
    try {
        const data = await fetchData(url_api);
        const character = await fetchData(`${url_api}${data.results[0].id}`);
        const origin = await fetchData(character.origin.url);
        console.log(data.info.count);
        console.log(character.name);
        console.log(origin.dimension);
    } catch (error) {
        console.error(error);
    }
}

console.log("Before");
anotherFunction(API);
console.log("After");
/* Sección de log */


//const deployLog = () => {
//    logBox.removeChild(registerForm);
//    logBox.appendChild(logForm);
//}
const deployRegister = () => {
    logBox.removeChild(logForm);
    logBox.appendChild(registerForm);
}
const anError = () => {
    alert("Aún falta agregar esta función");
}

const logSection_div = document.getElementsByClassName('logItem');
const logSection_login_aButton = document.getElementById('iniciarSesion');
const logSection_register_aButton = document.getElementById('registrarme');
const returnLog = document.getElementById('returnLog');
const returnRegister = document.getElementById('returnRegister');

//returnLog.addEventListener("click", deployLog);
returnRegister.addEventListener("click", deployRegister);

//logSection_user_crossButton.addEventListener("click", startLog);
iniciarSesion.addEventListener("click", anError);
registrarme.addEventListener("click", anError);

//Proceso de inicio de la página
const logSection = document.getElementById('logSection');
const logSection_user = document.getElementById('user');
const logSection_user_crossButton = document.getElementById('logButton-cross');
const logSection_login = document.getElementById("login");
const logSection_register = document.getElementById("register");
const start = () => {
    logSection_user.removeChild(logSection_user_crossButton);
    logSection.removeChild(logSection_login);
    logSection.removeChild(logSection_register);
}
start();

//Boton de Switch
const logSection_user_switchButton = document.getElementById('logButton-switch');
const deployLog = () => {
    logSection.appendChild(logSection_login);
    logSection_user.appendChild(logSection_user_crossButton);
    logSection_user.removeChild(logSection_user_switchButton);
}
logSection_user_switchButton.addEventListener("click", deployLog);

//Boton de cerrar
const closeLog = () => {
    logSection.removeChild(logSection_login);
    logSection_user.appendChild(logSection_user_switchButton);
    logSection_user.removeChild(logSection_user_crossButton);
}
logSection_user_crossButton.addEventListener("click", closeLog);