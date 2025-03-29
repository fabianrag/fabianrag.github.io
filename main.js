/**
 * main.js - Versión 1.1 (Refactor)
 * --------------------------------
 * Mejora y organización del contador regresivo:
 * - Se usa Date.now() en lugar de new Date().getTime().
 * - Se define una función 'updateCountdown' que calcula y muestra el tiempo faltante.
 * - Se almacena el intervalo en una variable para poder limpiarlo.
 * - Se emplea textContent en lugar de innerHTML, para mayor eficiencia.
 */

// Encerramos todo en una IIFE para evitar contaminar el ámbito global
(() => {
  const TARGET_DATE_STRING = "Oct 19, 2024 00:00:00";
  const targetDate = new Date(TARGET_DATE_STRING).getTime();

  // Función que actualiza los elementos del DOM con el tiempo restante
  function updateCountdown() {
    const now = Date.now(); // Tiempo actual en milisegundos
    const distance = targetDate - now;

    // Si la fecha ya pasó
    if (distance <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("countdownTitle").textContent =
        "¡Es hoy!¡Es hoy!";

      // Recorremos cada campo y lo ponemos a 0
      ["dias", "horas", "minutos", "segundos"].forEach((id) => {
        document.getElementById(id).textContent = 0;
      });
      return; // Salimos de la función
    }

    // Cálculo de Días, Horas, Minutos y Segundos faltantes
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Inyección de valores al DOM
    document.getElementById("dias").textContent = days;
    document.getElementById("horas").textContent = hours;
    document.getElementById("minutos").textContent = minutes;
    document.getElementById("segundos").textContent = seconds;
  }

  // Creamos un intervalo que se ejecute cada segundo
  const countdownInterval = setInterval(updateCountdown, 1000);
  // Llamamos una vez para actualizar al instante (no esperar 1 seg)
  updateCountdown();
})();
