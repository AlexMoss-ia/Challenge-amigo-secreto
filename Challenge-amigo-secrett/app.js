// Función para agregar un amigo a la lista
function agregarAmigo() {
  const nombreInput = document.getElementById("amigo");
  const nombre = nombreInput.value.trim();

  if (nombre === "") {
    alert("Por favor, ingresa un nombre.");
    return;
  }

  const listaAmigos = document.getElementById("listaAmigos");
  const nuevoItem = document.createElement("li");
  nuevoItem.textContent = nombre;
  listaAmigos.appendChild(nuevoItem);

  nombreInput.value = ""; // Limpia el campo de entrada
}

// Función para realizar el sorteo
function sortearAmigo() {
  const listaAmigos = document.getElementById("listaAmigos");
  const nombres = Array.from(listaAmigos.querySelectorAll("li")).map(item => item.textContent);

  if (nombres.length < 2) {
    alert("Necesitas al menos dos amigos para sortear.");
    return;
  }

  const resultados = realizarSorteo(nombres);
  mostrarResultados(resultados);
}

// Función para realizar el sorteo aleatorio (mejorada para evitar que alguien sea su propio amigo secreto)
function realizarSorteo(nombres) {
  if (nombres === null) return; // Maneja el caso donde no hay nombres válidos

  const nombresCopia = [...nombres];
  const asignaciones = {};
  const errores = []; // Almacena errores de asignación (si alguien es su propio amigo secreto)

  for (let i = 0; i < nombres.length; i++) {
    let amigoSecreto;
    do {
      const indiceAleatorio = Math.floor(Math.random() * nombresCopia.length);
      amigoSecreto = nombresCopia[indiceAleatorio];
    } while (amigoSecreto === nombres[i] || (asignaciones[nombres[i]] !== undefined && asignaciones[nombres[i]] === amigoSecreto)); // Evita auto-asignación y asignaciones duplicadas


    if (amigoSecreto === undefined){
        errores.push(`No se pudo asignar un amigo secreto para ${nombres[i]}.`);
        continue;
    }

    asignaciones[nombres[i]] = amigoSecreto;
    nombresCopia.splice(nombresCopia.indexOf(amigoSecreto), 1);
  }

  return { asignaciones, errores };
}

// Función para mostrar los resultados
function mostrarResultados(resultados) {
    const resultadosDiv = document.getElementById("resultado");
    resultadosDiv.innerHTML = ""; // Limpia resultados anteriores

    if(resultados.errores.length > 0){
        resultadosDiv.innerHTML += "<p><b>Hubo errores en la asignación:</b></p><ul>";
        resultados.errores.forEach(error => resultadosDiv.innerHTML += `<li>${error}</li>`);
        resultadosDiv.innerHTML += "</ul>";
        return;
    }

    resultadosDiv.innerHTML += "<p><b>Asignaciones de Amigo Secreto:</b></p><ul>";
    for (const persona in resultados.asignaciones) {
      resultadosDiv.innerHTML += `<li>${persona}: ${resultados.asignaciones[persona]}</li>`;
    }
    resultadosDiv.innerHTML += "</ul>";
}