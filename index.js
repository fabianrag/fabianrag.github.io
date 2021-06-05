//userButton
const userContainer = document.getElementById('user');
const switchButton = document.getElementById('logButton-switch');
const addSwitchButton = () => {
    const crossButton = document.getElementById('logButton-cross');
    userContainer.removeChild(crossButton);
    userContainer.appendChild(switchButton);
};
const addCrossButton = () => {
    const container = document.createElement('figure');
    container.id = "logButton-cross";

    const image = document.createElement('img');
    image.src = "/image/cross.png";

    container.appendChild(image);
    container.addEventListener('click', addSwitchButton);

    userContainer.appendChild(container);
    userContainer.removeChild(switchButton);
};
switchButton.addEventListener('click', addCrossButton);