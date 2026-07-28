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
 *
 * Los quizzes se renderizan como acordeones colapsados por defecto.
 * El h2 funciona como toggle al hacer clic.
 */

function inicializarQuizzes() {
  // Configurar comportamiento de acordeón en cada quiz
  document.querySelectorAll(".quiz-box").forEach((quizBox) => {
    const seccion = quizBox.closest(".bloque-contenido");
    if (!seccion) return;

    const h2 = seccion.querySelector("h2");
    if (!h2) return;

    const quizId = "quiz-" + Math.random().toString(36).slice(2, 8);
    quizBox.id = quizId;
    h2.setAttribute("role", "button");
    h2.setAttribute("tabindex", "0");
    h2.setAttribute("aria-expanded", "false");
    h2.setAttribute("aria-controls", quizId);

    const toggleQuiz = () => {
      const abierta = seccion.classList.toggle("quiz-abierto");
      h2.setAttribute("aria-expanded", String(abierta));
    };

    h2.addEventListener("click", toggleQuiz);
    h2.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleQuiz();
      }
    });
  });

  // Lógica de respuesta de cada pregunta
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
            resultado.textContent = "\u2713 Correcto.";
            resultado.classList.add("visible");
          }
        } else {
          opcion.classList.add("incorrecta");
          opciones[indiceCorrecta].classList.add("correcta");
          if (resultado) {
            resultado.textContent = "\u2717 Esa no es. Revisa la opci\u00f3n resaltada en verde.";
            resultado.classList.add("visible");
          }
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", inicializarQuizzes);
