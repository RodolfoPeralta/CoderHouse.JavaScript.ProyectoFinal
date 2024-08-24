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
let timer;
let count;
let user;
let users = [];
let questions = [];

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
const time = document.getElementById("time");

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

  if (retrieveUsers === null) {
    return [];
  } else {
    const users = [];
    for (let i = 0; i < retrieveUsers.length; i++) {
      users.push(
        new User(
          retrieveUsers[i].name,
          retrieveUsers[i].age,
          retrieveUsers[i].mail,
          retrieveUsers[i].answers,
          retrieveUsers[i].score
        )
      );
    }
    return users;
  }
};

// Adds an user to local storage
function addUser(user) {
  // If the user exists in local storage, it is deleted and recreated with its new score
  users = users.filter(
    (u) => u.name !== user.name && u.age !== user.age && u.mail !== user.mail
  );

  users.push(user);
  usersJson = JSON.stringify(users);
  localStorage.setItem("users", usersJson);
}

// Updates question timer
function updateTimer() {
  count--;

  if(count <= 0) {
    user.answers.push("");
    clearInterval(timer);
    nextQuestion();
  }
  else {
    time.innerText = count;
  }
}

// Show a specific question to the user
async function showQuestion(index) {
  questionTitle.innerText = "Pregunta " + (index + 1);

  question.innerText = await questions[index].question;

  buttonA.innerText = await questions[index].options[0];
  buttonB.innerText = await questions[index].options[1];
  buttonC.innerText = await questions[index].options[2];

  // Starts countdown timer

  count = 5;
  time.innerText = count;

  // Cleans any old timer
  if(timer) {
    clearInterval(timer);
  }

  // Sets timer
  timer = setInterval(updateTimer, 1000);
}

// Checks the answer and increase the score if is correct
const checkAnswer = function (answer, index) {
  if (answer == questions[index].correctAnswer) {
    score++;
    return true;
  } else {
    return false;
  }
};

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
  users.sort((a, b) => {
    if (b.score === a.score) {
      return a.name.localeCompare(b.name);
    }
    return b.score - a.score;
  });

  // Add retrieve users in a table

  table.innerHTML = "";
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

// Retrieves fetchs questions from json file
async function retrieveQuestions() {
  try {
    const url = "./questions.json";
    const questionJson = await fetch(url);
    questions = await questionJson.json();
  } catch (error) {
    Swal.fire({
      title: "Error cargando la trivia",
      text: "En estos momentos la trivia no está disponible.",
      icon: "error",
    });
  }
}

/* ----------------------------------------------------------------------------------------------- */

/* ------------------------------------------ MAIN ------------------------------------------ */

let uname, uage, umail;

// Retrieves old users saved on local storage
users = retrieveUsers();

// Retrieves trivia questions
retrieveQuestions();

// Obtains and validates input user data

username.addEventListener("change", (e) => {
  if (e.target.value.length === 0 || e.target.value == undefined) {
    username.className = "error";
  } else {
    username.className = "ok";
  }

  uname = e.target.value;
});

age.addEventListener("change", (e) => {
  if (e.target.value < 0 || e.target.value > 100 || e.target.value.length == 0 || isNaN(e.target.value) || e.target.value == undefined) {
    age.className = "error";
  } else {
    age.className = "ok";
  }

  uage = e.target.value;
});

mail.addEventListener("change", (e) => {
  if (e.target.value.length === 0 || !e.target.value.includes("@") || e.target.value == undefined) {
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

  // Checks input user data
  if (uname != undefined && uage != undefined && umail != undefined) {
    // Create a new user
    user = new User(uname, uage, umail);

    // Show question
    showQuestion(index);
  } 
  else {
    Swal.fire({
      title: "Datos de usuario no válidos",
      text: "Existen campos vacios que debes completar.",
      icon: "error",
    });

    // Show and hide sections
    formSection.classList.remove("hidden");
    triviaSection.classList.add("hidden");
  }
});

// Next question event

buttonA.addEventListener("click", (e) => {

  clearInterval(timer);

  user.answers.push(e.target.value);

  // Checks user answer and show if it was correct or not
  if (checkAnswer(e.target.value, index)) {
    buttonA.classList.add("correctAnswer");
  } else {
    buttonA.classList.add("incorrectAnswer");
  }

  // Timeout that enables see the user answer on screen
  setTimeout(() => {
    buttonA.classList.remove("correctAnswer");
    buttonA.classList.remove("incorrectAnswer");
    nextQuestion(e.target.value);
  }, 1000);
});

buttonB.addEventListener("click", (e) => {

  clearInterval(timer);

  user.answers.push(e.target.value);

  // Checks user answer and show if it was correct or not
  if (checkAnswer(e.target.value, index)) {
    buttonB.classList.add("correctAnswer");
  } else {
    buttonB.classList.add("incorrectAnswer");
  }

  // Timeout that enables see the user answer on screen
  setTimeout(() => {
    buttonB.classList.remove("correctAnswer");
    buttonB.classList.remove("incorrectAnswer");
    nextQuestion(e.target.value);
  }, 1000);
});

buttonC.addEventListener("click", (e) => {

  clearInterval(timer);

  user.answers.push(e.target.value);

  // Checks user answer and show if it was correct or not
  if (checkAnswer(e.target.value, index)) {
    buttonC.classList.add("correctAnswer");
  } else {
    buttonC.classList.add("incorrectAnswer");
  }

  // Timeout that enables see the user answer on screen
  setTimeout(() => {
    buttonC.classList.remove("correctAnswer");
    buttonC.classList.remove("incorrectAnswer");
    nextQuestion(e.target.value);
  }, 1000);
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
