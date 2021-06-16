/* USER BUTTON */

const userButton = document.querySelector("header .icon");
const header = document.querySelector("header");
const loginBuilder = (titleText, buttonText, subtitleText, changeFUNCTION, confirmpass) => {
    const containerLOGIN = document.createElement('form');
        const titleLOGIN = document.createElement('h1');
            titleLOGIN.textContent = titleText;
            containerLOGIN.appendChild(titleLOGIN);
        const nameLOGIN = document.createElement('input');
            nameLOGIN.setAttribute("type", "text");
            nameLOGIN.setAttribute("placeholder", "Usuario");
            containerLOGIN.appendChild(nameLOGIN);
        const passwordLOGIN = document.createElement('input');
            passwordLOGIN.setAttribute("type", "password");
            passwordLOGIN.setAttribute("placeholder", "Contraseña");
            containerLOGIN.appendChild(passwordLOGIN);
        const buttonLOGIN = document.createElement("input");
            buttonLOGIN.setAttribute("type", "submit")
            buttonLOGIN.setAttribute("value", buttonText)
            buttonLOGIN.setAttribute("class", "button");
            containerLOGIN.appendChild(buttonLOGIN);
        const subtitleLOGIN = document.createElement('h2');
            subtitleLOGIN.textContent = subtitleText;
            containerLOGIN.appendChild(subtitleLOGIN);
            subtitleLOGIN.addEventListener('click', changeFUNCTION);
        if (confirmpass == 1) {
            const confirmPasswordLOGIN = document.createElement('input');
            confirmPasswordLOGIN.setAttribute("type", "password");
            confirmPasswordLOGIN.setAttribute("placeholder", "Confirma tu contraseña");
            buttonLOGIN.before(confirmPasswordLOGIN);
        }
    return containerLOGIN;
};
function addREGISTER () {
    const REGISTER = loginBuilder('Registra tu cuenta', 'Registrarme', 'Iniciar sesión', changeFORM, 1);
    const FORM = document.querySelector("body > form");
    FORM.remove();
    header.after(REGISTER);
}
function changeFORM () {
    const FORM = document.querySelector("body > form");
    FORM.remove();
    const LOGIN = loginBuilder('Entra con tu cuenta', 'Iniciar Sesión', 'Registrarme', addREGISTER);
    header.after(LOGIN);
}
function addLOGIN () {
    const LOGIN = loginBuilder('Entra con tu cuenta', 'Iniciar Sesión', 'Registrarme', addREGISTER);
    header.after(LOGIN);
    userButton.removeEventListener('click', addLOGIN);
    userButton.addEventListener("click", removeFORM);
}
function removeFORM () {
    const FORM = document.querySelector("body > form");
    FORM.remove();
    userButton.removeEventListener("click", removeFORM);
    userButton.addEventListener('click', addLOGIN);
}
userButton.addEventListener('click', addLOGIN);







const logSection = document.getElementById('logSection');
const userContainer = document.getElementById('user');
const switchButton = document.getElementById('logButton-switch');
let activeBox = 0;

const addSwitchButton = () => {
    const crossButton = document.getElementById('logButton-cross');
    userContainer.appendChild(switchButton);
    userContainer.removeChild(crossButton);
    logSection.removeChild(logSection.lastElementChild);
};
const addCrossButton = () => {
    const container = document.createElement('figure');
    container.id = "logButton-cross";
    const image = document.createElement('img');
    image.src = "/image/cross.png";
    userContainer.appendChild(container);
    userContainer.removeChild(switchButton);
    container.appendChild(image);
    container.addEventListener('click', addSwitchButton);
    addBox("login", 'Entra con tu cuenta', "iniciarSesion", 'Iniciar Sesión', 'Registrarme');
};

//Recuadro de login

const addRegisterBox = () => {
    addBox("register", 'Registra tu cuenta', "registrarme", 'Registrarme', 'Iniciar Sesión');
    const inputPassword = document.createElement('input');
    inputPassword.setAttribute("type", "password");
    inputPassword.setAttribute("placeholder", "Confirma tu Contraseña");
    inputPassword.className = "input";
    const registerButton = document.getElementById("registrarme");
    registerButton.insertAdjacentElement('beforebegin', inputPassword);
};
function changeBox() {
    if (activeBox === 0) {
        logSection.removeChild(logSection.lastElementChild);
        addRegisterBox();
        activeBox = 1;
    } else {
        logSection.removeChild(logSection.lastElementChild);
        addBox("login", 'Entra con tu cuenta', "iniciarSesion", 'Iniciar Sesión', 'Registrarme');
        activeBox = 0;
    }
}

//FetchData
const burl = "https://api.binance.com";
const currentURL = burl + "/api/v3/avgPrice?symbol=KSMUSDT";
const candlesURL = burl + "/api/v3/klines?symbol=KSMUSDT&interval=1d&limit=367";
const fetchData = (urlAPI) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', urlAPI, true);
        request.onreadystatechange = (() => {
          if(request.readyState === 4){
            (request.status === 200)
                ? resolve(JSON.parse(request.responseText))
                : reject(new Error("Error " + urlAPI))
          }
        });
        request.send();
    });
}

//Boton de Kusama
const KSMButton = document.getElementById("KSMbutton");
const currentUSBox = document.getElementById("hoyUS");
const weekUSBox = document.getElementById("1sUS");
const monthUSBox = document.getElementById("1mUS");
const anualUSBox = document.getElementById("1aUS");
const currentCLBox = document.getElementById("hoyCL");
const weekCLBox = document.getElementById("1sCL");
const monthCLBox = document.getElementById("1mCL");
const anualCLBox = document.getElementById("1aCL");
const showPrice = async () => {
    try {
        const requestCurrent = await fetchData(currentURL);
        currentUSBox.textContent = parseInt(requestCurrent.price);
        currentCLBox.textContent = parseInt(requestCurrent.price * 0.720) + "K";
        const requestCandle = await fetchData(candlesURL);
        const week = requestCandle[280];
        const month = requestCandle[250];
        const anual = requestCandle[190];
        weekUSBox.textContent = parseInt(week[1]);
        weekCLBox.textContent = parseInt(week[1] * 0.720) + "K";
        monthUSBox.textContent = parseInt(month[1]);
        monthCLBox.textContent = parseInt(month[1] * 0.720) + "K";
        anualUSBox.textContent = parseInt(anual[1]);
        anualCLBox.textContent = parseInt(anual[1] * 0.720) + "K";
        KSMButton.removeEventListener('click', showPrice);
        console.log("test");
    } catch (error) {
        console.error(error);
    }
}
KSMButton.addEventListener('click', showPrice);
console.log("After");