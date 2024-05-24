let questions = [
  {
    question: "Was ist der chemische Symbol für Wasser?",
    answer_1: "H2O",
    answer_2: "CO2",
    answer_3: "O2",
    answer_4: "H2SO4",
    right_answer: 1,
  },
  {
    question: "Welcher ist der größte Kontinent der Welt?",
    answer_1: "Afrika",
    answer_2: "Nordamerika",
    answer_3: "Asien",
    answer_4: "Australien",
    right_answer: 4,
  },
  {
    question: "Welches ist das größte Lebewesen der Welt?",
    answer_1: "Elefant",
    answer_2: "Blauwal",
    answer_3: "Sequoia-Baum",
    answer_4: "Grizzlybär",
    right_answer: 2,
  },
  {
    question: "Welcher ist der längste Fluss der Welt?",
    answer_1: "Nil",
    answer_2: "Amazonas",
    answer_3: "Mississippi",
    answer_4: "Jangtsekiang",
    right_answer: 2,
  },
  {
    question: "Welcher Planet ist der nächste zur Sonne?",
    answer_1: "Venus",
    answer_2: "Mars",
    answer_3: "Merkur",
    answer_4: "Jupiter",
    right_answer: 3,
  },

  {
    question: "Was ist der höchste Berg der Welt?",
    answer_1: "Mount Everest",
    answer_2: "K2",
    answer_3: "Kangchenjunga",
    answer_4: "Makalu",
    right_answer: 1,
  },
  {
    question: "Welches ist das größte Riff der Welt?",
    answer_1: "Great Barrier Reef",
    answer_2: "Belize Barrier Reef",
    answer_3: "Red Sea Coral Reef",
    answer_4: "Andros Barrier Reef",
    right_answer: 1,
  },
  {
    question: "Welches ist das schnellste Tier der Welt?",
    answer_1: "Gepard",
    answer_2: "Falken",
    answer_3: "Antilope",
    answer_4: "Schnecke",
    right_answer: 1,
  },
  {
    question: "Wie nennt man die Bewegung von Gestein oder Boden an einem Hang?",
    answer_1: "Erosion",
    answer_2: "Abtragung",
    answer_3: "Verwitterung",
    answer_4: "Hangrutschung",
    right_answer: 4,
  },
  {
    question: "Welches ist das längste Tier der Welt?",
    answer_1: "Blauwal",
    answer_2: "Riesenkalmar",
    answer_3: "Giraffe",
    answer_4: "Anakonda",
    right_answer: 2,
  },
];

let currentQuestion = 0;
let rightAnswer = 0;

let audioSuccess = new Audio("source/sounds/correct.mp3");
let audioFail = new Audio("source/sounds/fail.mp3");

// render card

function renderCard() {
  let question = questions[currentQuestion];

  // render question
  document.getElementById("question-text").innerHTML = question["question"];

  // render answers
  document.getElementById("answer1").innerHTML = question["answer_1"];
  document.getElementById("answer2").innerHTML = question["answer_2"];
  document.getElementById("answer3").innerHTML = question["answer_3"];
  document.getElementById("answer4").innerHTML = question["answer_4"];

  // render all questions text
  document.getElementById("all-questions").innerHTML = questions.length;

  // current question
  document.getElementById("current-question").innerHTML = currentQuestion + 1;
}

// answer

function answer(answerNumber) {
  let answerID = document.getElementById("answer" + answerNumber);
  let rightAnswerID = document.getElementById(
    "answer" + questions[currentQuestion]["right_answer"]
  );

  if (answerNumber === questions[currentQuestion]["right_answer"]) {
    if (rightAnswerID.parentNode.classList.contains("text-bg-success")) {
      alert('Klicke auf "Nächste Frage", um weiterzugehen.');
    } else {
      audioSuccess.play();
      answerID.parentNode.classList.add("text-bg-success");
      rightAnswer++;
    }
  } else {
    if (rightAnswerID.parentNode.classList.contains("text-bg-success")) {
      alert('Klicke auf "Nächste Frage", um weiterzugehen.');
    } else {
      audioFail.play();
      answerID.parentNode.classList.add("text-bg-danger");
      rightAnswerID.parentNode.classList.add("text-bg-success");
    }
  }
  document.getElementById("next-button").disabled = false;
}

// next question

function nextQuestion() {
  let quizAnswerCards = document.getElementsByClassName("quiz-answer-card");

  currentQuestion++;

  stopAdios();

  if (currentQuestion >= questions.length) {
    document.getElementById("endscreen").style.display = "";
    document.getElementById("quiz-card").style.display = "none";
    document.getElementById("all-questions-endscreen").innerHTML = questions.length;
    document.getElementById("right-answers").innerHTML = rightAnswer;
  } else {
    let percent = currentQuestion / questions.length;
    percent = Math.round(percent * 100);

    document.getElementById("progress-bar").style.width = percent + "%";
    document.getElementById("progress-bar").innerHTML = percent + "%";

    for (let i = 0; i < quizAnswerCards.length; i++) {
      let quizAnswerCard = quizAnswerCards[i];

      quizAnswerCard.parentNode.classList.remove("text-bg-success");
      quizAnswerCard.parentNode.classList.remove("text-bg-danger");
    }

    document.getElementById("next-button").disabled = true;

    renderCard();
  }
}

function stopAdios() {
  audioFail.pause();
  audioFail.currentTime = 0;

  audioSuccess.pause();
  audioSuccess.currentTime = 0;
}

function resetQuiz() {
  currentQuestion = -1;
  rightAnswer = 0;

  document.getElementById("quiz-card").style.display = "";
  document.getElementById("endscreen").style.display = "none";

  nextQuestion();
}
