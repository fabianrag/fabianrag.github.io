const targetDate = new Date("Oct 19, 2024 00:00:00").getTime();

const countdownFunction = () =>
  setInterval(function () {
    const now = new Date().getTime();
    let distance = targetDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("dias").innerHTML = days;
    document.getElementById("horas").innerHTML = hours;
    document.getElementById("minutos").innerHTML = minutes;
    document.getElementById("segundos").innerHTML = seconds;

    if (distance < 0) {
      clearInterval(countdownFunction);
      document.getElementById("countdownTitle").innerHTML = "¡Es hoy!¡Es hoy!";
      document.getElementById("dias").innerHTML = 0;
      document.getElementById("horas").innerHTML = 0;
      document.getElementById("minutos").innerHTML = 0;
      document.getElementById("segundos").innerHTML = 0;
    }
  }, 1000);

countdownFunction();
