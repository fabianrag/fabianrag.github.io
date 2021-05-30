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
const start = () => {
    logBox.removeChild(logForm);
    logBox.removeChild(registerForm);
}
const startLog = () => {
    logBox.appendChild(logForm);
}
const deployLog = () => {
    logBox.removeChild(registerForm);
    logBox.appendChild(logForm);
}
const deployRegister = () => {
    logBox.removeChild(logForm);
    logBox.appendChild(registerForm);
}
const anError = () => {
    alert("Aún falta agregar esta función");
}
const iniciarSesion = document.getElementById('iniciarSesion');
const registrarme = document.getElementById('registrarme');
const returnLog = document.getElementById('returnLog');
const returnRegister = document.getElementById('returnRegister');
const logBox = document.getElementById('logBox');
const logForm = document.getElementById("logForm");
const registerForm = document.getElementById("registerForm");
const logButton = document.getElementById("logButton");
returnLog.addEventListener("click", deployLog);
returnRegister.addEventListener("click", deployRegister);
logButton.addEventListener("click", startLog);
iniciarSesion.addEventListener("click", anError);
registrarme.addEventListener("click", anError);
start();