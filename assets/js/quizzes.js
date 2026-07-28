/**
 * quizzes.js — motor mínimo para los quizzes de repaso de cada módulo.
 * Marcado esperado por pregunta:
 * <div class="quiz-pregunta" data-correcta="1">
 *   <div class="quiz-opciones">
 *     <button class="quiz-opcion">...</button>  (índice 0)
 *     <button class="quiz-opcion">...</button>  (índice 1) <- correcta aquí
 *   </div>
 *   <div class="quiz-resultado"></div>
 * </div>
 */

function inicializarQuizzes() {
  document.querySelectorAll(".quiz-pregunta").forEach((pregunta) => {
    const indiceCorrecta = parseInt(pregunta.dataset.correcta, 10);
    const opciones = Array.from(pregunta.querySelectorAll(".quiz-opcion"));
    const resultado = pregunta.querySelector(".quiz-resultado");

    opciones.forEach((opcion, indice) => {
      opcion.addEventListener("click", () => {
        opciones.forEach((o) => (o.disabled = true));

        if (indice === indiceCorrecta) {
          opcion.classList.add("correcta");
          if (resultado) {
            resultado.textContent = "✓ Correcto.";
            resultado.classList.add("visible");
          }
        } else {
          opcion.classList.add("incorrecta");
          opciones[indiceCorrecta].classList.add("correcta");
          if (resultado) {
            resultado.textContent = "✗ Esa no es. Revisa la opción resaltada en verde.";
            resultado.classList.add("visible");
          }
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", inicializarQuizzes);
