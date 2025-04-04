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

## Versión 1.2 (Galería y ajustes visuales)

**Fecha:** 2025-04-04

**Objetivo:**  
Implementar la nueva galería de fotos y preparar la estructura para futuras secciones como agradecimientos.

### Cambios Principales

1. **Galería de Fotos (prototipo funcional):**

   - Componente `GallerySection.astro` con soporte modular para múltiples secciones.
   - Modal funcional para cada sección con navegación de imágenes (← →).
   - Botón de “Me gusta” con persistencia en `localStorage` y diseño mejorado.
   - Eliminada la caja de comentarios del modal.

2. **Estilizado:**

   - Mejoras visuales en miniaturas, centrado de secciones y estilos responsivos.
   - Ajustes en `styles.css` para secciones `.photo`, `.section`, `.card`.

3. **Infraestructura:**

   - Se prepara el sistema para carga de múltiples imágenes desde `/public/photos`.
   - Preparación de estructura para separar componentes y lógica (`galleryScript.js`).

4. **Limpieza:**
   - Eliminación de lógica no usada (comentarios, formularios).
   - Se cierra la etapa de prototipado con una sola imagen (`1.jpg`) para galería inicial.

### Resultado

- Galería funcional, modular y lista para escalar con más fotos y secciones.
- Sitio visualmente más coherente y con mejor experiencia en desktop.

---
