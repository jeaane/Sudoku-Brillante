// Crear el tablero
const tabla = document.getElementById("sudoku-board");

for (let i = 0; i < 9; i++) {
  const fila = document.createElement("tr");
  for (let j = 0; j < 9; j++) {
    const celda = document.createElement("td");
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("maxlength", "1");
    input.dataset.row = i;
    input.dataset.col = j;
    celda.appendChild(input);
    fila.appendChild(celda);
  }
  tabla.appendChild(fila);
}

// Obtener la matriz desde inputs
function obtenerTablero() {
  const tablero = Array.from({ length: 9 }, () => Array(9).fill(""));
  document.querySelectorAll("input").forEach(input => {
    const r = Number(input.dataset.row);
    const c = Number(input.dataset.col);
    tablero[r][c] = input.value.trim();
  });
  return tablero;
}

// Validar y mostrar errores
function validarTablero() {
  const tablero = obtenerTablero();
  const errores = [];

  // Limpiar colores anteriores
  document.querySelectorAll("input").forEach(input => {
    input.style.backgroundColor = "transparent";
  });

  // Validar filas
  for (let i = 0; i < 9; i++) {
    const contador = {};
    for (let j = 0; j < 9; j++) {
      const val = tablero[i][j];
      if (val) {
        contador[val] = (contador[val] || 0) + 1;
      }
    }
    for (const val in contador) {
      if (contador[val] > 1) {
        errores.push(`Fila ${i + 1}`);
        marcarFila(i, val);
        break;
      }
    }
  }

  // Validar columnas
  for (let j = 0; j < 9; j++) {
    const contador = {};
    for (let i = 0; i < 9; i++) {
      const val = tablero[i][j];
      if (val) {
        contador[val] = (contador[val] || 0) + 1;
      }
    }
    for (const val in contador) {
      if (contador[val] > 1) {
        errores.push(`Columna ${j + 1}`);
        marcarColumna(j, val);
        break;
      }
    }
  }

  // Validar regiones 3x3
  for (let br = 0; br < 3; br++) {
    for (let bc = 0; bc < 3; bc++) {
      const contador = {};
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const r = br * 3 + i;
          const c = bc * 3 + j;
          const val = tablero[r][c];
          if (val) {
            contador[val] = (contador[val] || 0) + 1;
          }
        }
      }
      for (const val in contador) {
        if (contador[val] > 1) {
          errores.push(`Región ${br + 1},${bc + 1}`);
          marcarRegion(br, bc, val);
          break;
        }
      }
    }
  }

  if (errores.length === 0) {
    alert("✅ Sudoku válido. ¡Bien hecho!");
  } else {
    alert("❌ Error en: " + errores.join(", "));
  }
}

// Funciones auxiliares para marcar errores visualmente
function marcarFila(fila, valor) {
  document.querySelectorAll(`input[data-row='${fila}']`).forEach(input => {
    if (input.value === valor) input.style.backgroundColor = "#ffe6e6";
  });
}

function marcarColumna(col, valor) {
  document.querySelectorAll(`input[data-col='${col}']`).forEach(input => {
    if (input.value === valor) input.style.backgroundColor = "#ffe6e6";
  });
}

function marcarRegion(bloqueFila, bloqueCol, valor) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const r = bloqueFila * 3 + i;
      const c = bloqueCol * 3 + j;
      const input = document.querySelector(`input[data-row='${r}'][data-col='${c}']`);
      if (input && input.value === valor) {
        input.style.backgroundColor = "#ffe6e6";
      }
    }
  }
}

