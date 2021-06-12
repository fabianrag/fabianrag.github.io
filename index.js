//Botton de abrir login
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
switchButton.addEventListener('click', addCrossButton);

//Recuadro de login
const addBox = (tipo, encabezado, idBoton, action, retorno) => {
    const container = document.createElement('div');
    container.id = tipo;
    container.className = "form";
    logSection.appendChild(container);
        const header = document.createElement('h1');
        const headerText = document.createTextNode(encabezado);
        container.appendChild(header);
        header.appendChild(headerText);
        const form = document.createElement('form');
        container.appendChild(form);
            const inputName = document.createElement('input');
            inputName.setAttribute("type", "text");
            inputName.setAttribute("placeholder", "Usuario");
            inputName.className = "input";
            form.appendChild(inputName);
            const inputPassword = document.createElement('input');
            inputPassword.setAttribute("type", "password");
            inputPassword.setAttribute("placeholder", "Contraseña");
            inputPassword.className = "input";
            form.appendChild(inputPassword);
            const actionButton = document.createElement("BUTTON");
            actionButton.id = idBoton;
            form.appendChild(actionButton);
                const actionText = document.createElement('h1');
                actionButton.appendChild(actionText);
                    const action2Text = document.createTextNode(action);
                    actionText.appendChild(action2Text);
        const footer = document.createElement('h2');
        footer.id = "loginFooter";
        footer.addEventListener('click', changeBox);
        activeBox = 0;
        const footerText = document.createTextNode(retorno);
        footer.appendChild(footerText);
        container.appendChild(footer);
};
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
const candlesQuery = burl + "/api/v3/klines?symbol=KSMUSDT&interval=1d&limit=30";
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
const currentCLBox = document.getElementById("hoyCL");
const showPrice = async () => {
    try {
        const US1Box = await fetchData(currentURL);
        currentUSBox.textContent = parseInt(US1Box.price);
        currentCLBox.textContent = parseInt(US1Box.price * 0.720) + "K";
        console.log("Hola tarola");
    } catch (error) {
        console.error(error);
    }
}
KSMButton.addEventListener('click', showPrice);
console.log("After");