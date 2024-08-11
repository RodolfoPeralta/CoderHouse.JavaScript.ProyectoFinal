/* ------------------------------------------ CLASSES ------------------------------------------ */

class User {
  // Members
  name;
  age;
  mail;
  answers;
  score;

  // Constructor
  constructor(name, age, mail, answers = [], score = 0) {
    this.name = name;
    this.age = age;
    this.mail = mail;
    this.answers = answers;
    this.score = score;
  }
}

/* --------------------------------------------------------------------------------------------- */

/* ------------------------------------------ GLOBAL VARIABLES ------------------------------------------ */

let index = 0;
let score = 0;
let user;
let users = [];

const questions = [
  {
    question:
      "¿Cómo llaman los magos a las personas que no tienen ninguna habilidad mágica?",
    options: ["Cheetos", "Pringles", "Muggles"],
    correctAnswer: "C",
  },
  {
    question:
      "¿Cómo se llama la pequeña bola dorada que te hace ganar un partido de quidditch?",
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
    question:
      "¿Cómo se llama la criatura mágica que solo pueden ver quienes han presenciado la muerte?",
    options: ["Thestral", "Manticora", "Hipogrifo"],
    correctAnswer: "A",
  },
  {
    question:
      "¿Qué revista para magos dirige Xenophilius, el padre de Luna Lovegood?",
    options: ["El profeta", "El quisquilloso", "El inquisidor"],
    correctAnswer: "B",
  },
  {
    question: "¿A qué casa de Hogwarts pertenece Luna Lovegood?",
    options: ["Ravenclaw", "Gryffindor", "Slytherin"],
    correctAnswer: "A",
  },
  {
    question:
      "¿Quién envía a Harry de forma anónima la capa de invisibilidad de su padre en Navidad?",
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

// Form and inputs nodes

const form = document.getElementById("formulario");
const username = document.getElementById("name");
const age = document.getElementById("age");
const mail = document.getElementById("mail");

// Form and trivia sections nodes

const formSection = document.getElementById("formSection");
const triviaSection = document.getElementById("triviaSection");

// Trivia section nodes

const questionTitle = document.getElementById("questionTitle");
const question = document.getElementById("question");
const buttonA = document.getElementById("buttonOptionA");
const buttonB = document.getElementById("buttonOptionB");
const buttonC = document.getElementById("buttonOptionC");

// Final section nodes

const scoreParagraph = document.getElementById("score");
const paragraph = document.getElementById("paragraph");
const tableSection = document.getElementById("tableSection");
const table = document.getElementById("table");
const final = document.getElementById("final");

// Play again node
const again = document.getElementById("again");

/* ------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------ FUNCTIONS ------------------------------------------ */

// Retrieves users from local storage
const retrieveUsers = function () {
  const retrieveUsers = JSON.parse(localStorage.getItem("users"));

  if(retrieveUsers === null) {
    return [];
  }
  else {
    const users = [];
    for(let i=0; i < retrieveUsers.length; i++) {
      users.push(new User(
        retrieveUsers[i].name, 
        retrieveUsers[i].age, 
        retrieveUsers[i].mail, 
        retrieveUsers[i].answers, 
        retrieveUsers[i].score
      ));
    }
    return users;
  }
};

// Adds an user to local storage
function addUser(user) {

  // If the user exists in local storage, it is deleted and recreated with its new score 
  users = users.filter((u) => (u.name !== user.name) && (u.age !== user.age) && (u.mail !== user.mail));

  users.push(user);
  usersJson = JSON.stringify(users);
  localStorage.setItem("users", usersJson);
}

// Show a specific question to the user
function showQuestion(index) {
  questionTitle.innerText = "Pregunta " + (index + 1);

  question.innerText = questions[index].question;

  buttonA.innerText = questions[index].options[0];
  buttonB.innerText = questions[index].options[1];
  buttonC.innerText = questions[index].options[2];
}

// Checks the answer and increase the score if is correct
function checkAnswer(answers) {
  for (let i = 0; i < questions.length; i++) {
    if (answers[i] == questions[i].correctAnswer) {
      score++;
    }
  }
}

// Show a message depending the obtained score
const showFinalMessage = function (finalScore) {
  if (finalScore >= 0 && finalScore <= 4) {
    return "Deberías leer los libros o mirar las películas.";
  } else if (finalScore >= 5 && finalScore <= 9) {
    return "Muy bien, viste todas las películas.";
  } else if (finalScore >= 10 && finalScore <= 11) {
    return "Seguro leíste todos los libros más de una vez.";
  } else {
    return "¡¡¡Felicitaciones!!! Sos un verdadero fanático de la saga.";
  }
};

// Shows user score and a final message
function showLastSection() {
  checkAnswer(user.answers);
  user.score = score;

  // Show final message
  final.classList.remove("hidden");
  scoreParagraph.innerText = `Tu puntaje fue de ${score}/12.`;
  paragraph.innerText = showFinalMessage(score);

  // Show score table and hidden trivia section
  triviaSection.classList.add("hidden");
  tableSection.classList.remove("hidden");

  // Call add user to local storage function
  addUser(user);

  // Sort about user score. If score is the same, sort about name
  users.sort((a,b) => {
    if(b.score === a.score) {
      return a.name.localeCompare(b.name);
    }
    return b.score - a.score;
  });

  // Add retrieve users in a table

  table.innerHTML = '';
  let trHeader = document.createElement("tr");
  trHeader.innerHTML = `<th>Nombre</th>
                        <th>Edad</th>
                        <th>Puntaje</th>`;
  table.appendChild(trHeader);

  for (const u of users) {
    let tr = document.createElement("tr");
    tr.innerHTML = `<th> ${u.name}  </th>
                      <th> ${u.age}   </th>
                      <th> ${u.score} </th>`;
    table.appendChild(tr);
  }
}

// Handles question change
function nextQuestion(e) {
  index++;

  if (index < questions.length) {
    // Trivia continues
    showQuestion(index);
  } else {
    // Trivia finished
    showLastSection();
  }
}

/* ----------------------------------------------------------------------------------------------- */

/* ------------------------------------------ MAIN ------------------------------------------ */

let uname, uage, umail;

// Retrieves old users saved on local storage
users = retrieveUsers();

// Obtains and validates input user data

username.addEventListener("change", (e) => {
  if (e.target.value.length === 0) {
    username.className = "error";
  } else {
    username.className = "ok";
  }

  uname = e.target.value;
});

age.addEventListener("change", (e) => {
  if (e.target.value < 0 || e.target.value > 100 || e.target.value.length == 0 || isNaN(e.target.value)) {
    age.className = "error";
  } else {
    age.className = "ok";
  }

  uage = e.target.value;
});

mail.addEventListener("change", (e) => {
  if (e.target.value.length === 0 || !e.target.value.includes("@")) {
    mail.className = "error";
  } else {
    mail.className = "ok";
  }

  umail = e.target.value;
});

// Submit form event

form.addEventListener("submit", (e) => {
  // Prevents send the form and reload the page
  e.preventDefault();

  // Show and hide sections
  formSection.classList.add("hidden");
  triviaSection.classList.remove("hidden");

  // Create a new user
  user = new User(uname, uage, umail);

  // Show question
  showQuestion(index);
});

// Next question event

buttonA.addEventListener("click", (e) => {
  user.answers.push(e.target.value);
  nextQuestion(e.target.value);
});

buttonB.addEventListener("click", (e) => {
  user.answers.push(e.target.value);
  nextQuestion(e.target.value);
});

buttonC.addEventListener("click", (e) => {
  user.answers.push(e.target.value);
  nextQuestion(e.target.value);
});

// Play again event

again.addEventListener("click", (e) => {

  // Reset variables
  index = 0;
  score = 0;
  user.answers = [];

  // Hide score table and final messages to show the trivia section again
  triviaSection.classList.remove("hidden");
  tableSection.classList.add("hidden");
  final.classList.add("hidden");

  // Show question
  showQuestion(index);

});

/* ------------------------------------------------------------------------------------------ */
