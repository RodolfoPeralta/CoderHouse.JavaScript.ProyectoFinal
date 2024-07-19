/* ---------------- VARIABLES GLOBALES ---------------- */

const validOptions = ["A", "B", "C"];

const questions = [
  {
    question: "¿Cómo llaman los magos a las personas que no tienen ninguna habilidad mágica?",
    options: ["Cheetos", "Pringles", "Muggles"],
    correctAnswer: "C",
  },
  {
    question: "¿Cómo se llama la pequeña bola dorada que te hace ganar un partido de quidditch?",
    options: ["Snitch", "Bladder", "Sprigg"],
    correctAnswer: "A",
  },
  {
    question: "¿Cómo murieron los padres de Harry Potter?",
    options: [
      "En un accidente de auto",
      "Los mató Voldemort",
      "Ahogados al naufragar su barco",
    ],
    correctAnswer: "B",
  },
  {
    question: "¿Cómo se llama la lechuza de Harry?",
    options: ["Hippy", "Hedwig", "Houdini"],
    correctAnswer: "B",
  },
  {
    question: "¿Cómo se llama la criatura mágica que solo pueden ver quienes han presenciado la muerte?",
    options: ["Thestral", "Manticora", "Hipogrifo"],
    correctAnswer: "A",
  },
  {
    question: "¿Qué revista para magos dirige Xenophilius, el padre de Luna Lovegood?",
    options: ["El profeta", "El quisquilloso", "El inquisidor"],
    correctAnswer: "B",
  },
  {
    question: "¿A qué casa de Hogwarts pertenece Luna Lovegood?",
    options: ["Ravenclaw", "Gryffindor", "Slytherin"],
    correctAnswer: "A",
  },
  {
    question: "¿Quién envía a Harry de forma anónima la capa de invisibilidad de su padre en Navidad?",
    options: ["Sirius Black", "Albus Dumbledore", "Severus Snape"],
    correctAnswer: "B",
  },
  {
    question: "¿Cuál es el nombre completo de Nick Casi Decapitado?",
    options: [
      "Antonin Dolohov",
      "Vincent Crabbe",
      "Sir Nicholas de Mimsy-Porpington",
    ],
    correctAnswer: "C",
  },
  {
    question: "¿Qué organización fundó Hermione en su cuarto año en Hogwarts?",
    options: ["Peddo", "Magic", "Leviosa"],
    correctAnswer: "A",
  },
  {
    question: "¿Qué les pasó a los padres de Neville?",
    options: [
      "Murieron en la primera guerra magica",
      "Fueron torturados mediante la maldición Cruciatus y luego enviados al Hospital de San Mungo",
      "Son profesores en Hogwarts",
    ],
    correctAnswer: "B",
  },
  {
    question: "¿Cómo se llama la madre de Voldemort?",
    options: ["Margaret", "Sylvia", "Merope"],
    correctAnswer: "C",
  },
];

/* ---------------------------------------------------- */

/* --------------------- FUNCIONES --------------------- */

const ShowQuestion = function (question, j) {

  let optionsString = "";

  for (let i = 0; i < validOptions.length; i++) {
    optionsString += "\n" + validOptions[i] + " | " + questions[j].options[i];
  }

  return question + "\n" + optionsString;
};

const CheckOptionSelected = function (option) {

  if (option === null) {
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

  switch (option) {
    case "A":
    case "B":
    case "C":
      return true;
    default:
      alert("Se ingresó un carácter no válido como respuesta...");
      console.warn("Se ingresó un carácter no válido como respuesta...");
      return false;
  }
};

function CheckAnswer(answer, j) {

  answer = answer.toUpperCase();

  if (answer == questions[j].correctAnswer) {
    score++;
  }
}

const ShowFinalMessage = function (finalScore) {

  if (finalScore >= 0 && finalScore <= 4) {
    return "Deberías leer los libros o ver las películas.";
  } else if (finalScore >= 5 && finalScore <= 9) {
    return "Muy bien, viste todas las películas.";
  } else if (finalScore >= 10 && finalScore <= 11) {
    return "Seguro leíste todos los libros más de una vez.";
  } else {
    return "¡¡¡Felicitaciones!!! Sos un verdadero fanático de la saga.";
  }
};

/* ----------------------------------------------------- */

/* -------------------- MAIN -------------------- */

let score = 0;
let answer;
let choice = false;
let iteration = 1;

do {
  for (let i = 0; i < questions.length; i++) {
    answer = prompt(ShowQuestion(questions[i].question, i));
  
    while (!CheckOptionSelected(answer)) {
      answer = prompt(ShowQuestion(questions[i].question, i));
    }
  
    CheckAnswer(answer, i);
  }
  
  alert(`Tu puntaje fue de ${score}/12. ` + ShowFinalMessage(score));
  console.log(`intento ${iteration} | Tu puntaje fue de ${score}/12. ` + ShowFinalMessage(score));
  
  choice = confirm("¿Volver a jugar?");

  if(choice) {
    iteration++;
    score = 0;
  }

} while(choice);

/* ---------------------------------------------- */
