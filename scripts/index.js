/* ---------------- VARIABLES GLOBALES ---------------- */

let validOptions = ["A", "B", "C"];
let questions = [
  "¿Cómo llaman los magos a las personas que no tienen ninguna habilidad mágica?",
  "¿Cómo se llama la pequeña bola dorada que te hace ganar un partido de quidditch?",
  "¿Cómo murieron los padres de Harry Potter?",
  "¿Cómo se llama la lechuza de Harry?",
  "¿Cómo se llama la criatura mágica que solo pueden ver quienes han presenciado la muerte?",
  "¿Qué revista para magos dirige Xenophilius, el padre de Luna Lovegood?",
  "¿A qué casa de Hogwarts pertenece Luna Lovegood?",
  "¿Quién envía a Harry de forma anónima la capa de invisibilidad de su padre en Navidad?",
  "¿Cuál es el nombre completo de Nick Casi Decapitado?",
  "¿Qué organización fundó Hermione en su cuarto año en Hogwarts?",
  "¿Qué les pasó a los padres de Neville?",
  "¿Cómo se llama la madre de Voldemort?",
];
let options = [
  ["Cheetos", "Pringles", "Muggles"],
  ["Snitch", "Bladder", "Sprigg"],
  [
    "En un accidente de auto",
    "Los mató Voldemort",
    "Ahogados al naufragar su barco",
  ],
  ["Hippy", "Hedwig", "Houdini"],
  ["Thestral", "Manticora", "Hipogrifo"],
  ["El profeta", "El quisquilloso", "El inquisidor"],
  ["Ravenclaw", "Gryffindor", "Slytherin"],
  ["Sirius Black", "Albus Dumbledore", "Severus Snape"],
  ["Antonin Dolohov", "Vincent Crabbe", "Sir Nicholas de Mimsy-Porpington"],
  ["PEDDO", "MAGIC", "PIZZA"],
  [
    "Murieron en la primera guerra magica",
    "Fueron torturados mediante la maldición Cruciatus y luego enviados al Hospital de San Mungo",
    "Son profesores en Hogwarts",
  ],
  ["Margaret","Sylvia","Merope"],
];
let correctAnswers = [
  "C",
  "A",
  "B",
  "B",
  "A",
  "B",
  "A",
  "B",
  "C",
  "A",
  "B",
  "C",
];

/* ---------------------------------------------------- */

/* ---------------- FUNCIONES ---------------- */

const ShowQuestion = function (question, j) {

    let optionsString = "";

    for(let i=0; i < 3; i++) {
        optionsString += "\n" + validOptions[i] + ". " + options[j][i];
    }

    return (question + "\n" + optionsString);
}

const CheckOptionSelected = function (option) {

    if(option === null) {
        alert("No es posible dejar vacío el campo...");
        console.warn("No es posible dejar vacío el campo...");
        return false;
    }
    
    if (option.length != 1) {
        alert("Se ingresó más de un carácter como respuesta...");
        console.warn("Se ingresó más de un carácter como respuesta...");
        return false;
    }

    option = option.toUpperCase();

    switch(option) {
        case "A":
        case "B":
        case "C":
            return true;
        default:
            alert("Se ingresó un carácter no válido como respuesta...");
            console.warn("Se ingresó un carácter no válido como respuesta...");
            return false;
    }
}

function CheckAnswer(answer, j) {

    answer = answer.toUpperCase();

    if(answer == correctAnswers[j]) {
        score++;
    }
}

const ShowFinalMessage = function (finalScore) {

    if(finalScore >= 0 && finalScore <= 4) {
        return "Deberías leer los libros o ver las películas."
    }
    else if (finalScore >=5 && finalScore <= 9) {
        return "Muy bien, viste todas las películas."
    }
    else if (finalScore >= 10 && finalScore <= 11) {
        return "Seguro leíste todos los libros más de una vez."
    }
    else {
        return "¡¡¡Felicitaciones!!! Sos un verdadero fanático de la saga."
    }
}

/* ------------------------------------------- */

/* --------------- MAIN --------------- */

let score = 0;
let answer;

for (let i = 0; i < questions.length; i++) {

  answer = prompt(ShowQuestion(questions[i], i));
  
  while(!CheckOptionSelected(answer)) {
    answer = prompt(ShowQuestion(questions[i], i));
  }

  CheckAnswer(answer, i);
}

alert(`Tu puntaje fue de ${score}/12. ` + ShowFinalMessage(score));
console.log(`Tu puntaje fue de ${score}/12` + ShowFinalMessage(score));

/* ------------------------------------ */
