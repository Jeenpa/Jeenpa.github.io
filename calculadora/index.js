const d = document;
let result = d.querySelector(".result");
const botones = document.querySelectorAll("button");
let expresion = "";

// Agrega un evento de clic a cada botón
botones.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    if (e.target.matches(".equals")) {
      return (result.innerHTML = calculator());
    }

    if (e.target.matches("#danger")) {
      expresion = "";
      return (result.innerHTML = "0");
    }

    if (e.target.matches("#del")) {
      expresion = expresion.slice(0, -1);
      return (result.innerHTML = expresion);
    }

    expresion += e.target.id;
    result.innerHTML = expresion;
  });
});

// Verifica la operacion aritmetica a ejecutar en la expresion (+ - * /) y la resuelve
function calculator() {
  let partes;
  let result = 0;
  let operando1 = 0;
  let operando2 = 0;

  switch (true) {
    case expresion.includes("+"):
      partes = expresion.split("+");
      operando1 = parseFloat(partes[0]);
      operando2 = parseFloat(partes[1]);
      result = operando1 + operando2;
      expresion = result.toString();
      return expresion;
    case expresion.includes("-"):
      partes = expresion.split("-");
      operando1 = parseFloat(partes[0]);
      operando2 = parseFloat(partes[1]);
      result = operando1 - operando2;
      expresion = result.toString();
      return expresion;
    case expresion.includes("*"):
      partes = expresion.split("*");
      operando1 = parseFloat(partes[0]);
      operando2 = parseFloat(partes[1]);
      result = operando1 * operando2;
      expresion = result.toString();
      return expresion;
    case expresion.includes("/"):
      partes = expresion.split("/");
      operando1 = parseFloat(partes[0]);
      operando2 = parseFloat(partes[1]);
      if (operando1 === 0 || operando2 === 0) {
        return "Error";
      } else {
        result = operando1 / operando2;
        expresion = result.toFixed(1).toString();
        return expresion;
      }
  }

  console.log(result);
  return result;
}
