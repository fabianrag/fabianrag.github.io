# Historial de Cambios - Proyecto Matrimonio

A continuación, se detallan los cambios realizados en cada versión del proyecto:

---

## Versión 1.1 (Refactorización Inicial)

**Fecha:** _(agrega la fecha real de la actualización)_

**Objetivo:**  
Refactorizar y simplificar la estructura de archivos, manteniendo el mismo diseño y funcionalidad de la versión 1.0.

### Cambios Principales

1. **`index.html`:**

   - Se reorganizaron secciones utilizando etiquetas `<section>` semánticas y comentarios.
   - Se unificaron las llamadas a Google Fonts en un solo enlace.
   - Se corrigió un ID duplicado en las imágenes (`foto1` y ahora `foto2`).
   - Se agregaron comentarios descriptivos para cada sección.

2. **`styles.css`:**

   - Se agruparon estilos en bloques con comentarios (Global, Secciones, Responsivo).
   - Se eliminaron comentarios y reglas redundantes o duplicadas.
   - Se mantuvo la misma apariencia visual y clases/IDs principales para no romper el diseño.

3. **`main.js`:**

   - Se encapsuló la lógica del contador en una función `updateCountdown`.
   - Se usa `Date.now()` en lugar de `new Date().getTime()`.
   - Se emplea `textContent` en lugar de `innerHTML`.
   - Se organizó el código dentro de una IIFE para evitar contaminar el scope global.

4. **Limpieza de imágenes:**

   - Se eliminó cualquier imagen no referenciada en el código (por ejemplo, `ruta.png`).
   - Se confirmaron todas las imágenes necesarias en el HTML y CSS.

5. **Archivo de cambios:**
   - Se creó este documento (`CHANGELOG.md` o `HISTORIAL_VERSIONES.md`) para registrar los avances de cada versión.

### Resultado

- **Código más ordenado y fácil de mantener** sin alterar la experiencia de usuario.
- **Listo para futuras actualizaciones**, como la adición de secciones de agradecimiento, galería de fotos y comentarios.

---

> **Nota:** Mantén este archivo actualizado cada vez que hagas una nueva versión. Agrega fecha, objetivos principales y la lista de cambios realizados. ¡Así llevarás un control claro de la evolución del proyecto!

---
