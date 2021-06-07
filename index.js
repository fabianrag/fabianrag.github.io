//Botton de abrir login
const logSection = document.getElementById('logSection');
const userContainer = document.getElementById('user');
const switchButton = document.getElementById('logButton-switch');

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
let activeBox = 0;
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