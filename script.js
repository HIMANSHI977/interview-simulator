const intro = {
  q: "Tell me about yourself",
  keywords: ["student","skills","experience","learning"]
};

const categories = {
  frontend: [
    { q: "What is CSS Flexbox?", keywords: ["layout","flex","row","column"] },
    { q: "Explain event bubbling", keywords: ["event","propagation"] },
    { q: "What is responsive design?", keywords: ["mobile","adapt"] }
  ],
  backend: [
    { q: "What is API?", keywords: ["request","response"] },
    { q: "What is database?", keywords: ["data","store"] },
    { q: "Explain REST API", keywords: ["http","methods"] }
  ],
  aiml: [
    { q: "What is Machine Learning?", keywords: ["data","model"] },
    { q: "What is AI?", keywords: ["intelligence"] },
    { q: "What is overfitting?", keywords: ["model","training"] }
  ],
  other: [
    { q: "Why do you want to be a teacher?", keywords: ["teach","students"] },
    { q: "What are your strengths?", keywords: ["communication","patience"] },
    { q: "How do you handle weak students?", keywords: ["support","help"] }
  ]
};

let questions = [];
let index = 0;
let score = 0;
let time = 30;
let timer;

const startCard = document.getElementById("start");
const interviewCard = document.getElementById("interview");
const resultCard = document.getElementById("result");

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const progressEl = document.getElementById("progress");
const timerEl = document.getElementById("timer");

document.getElementById("startBtn").onclick = () => {
  const selected = document.getElementById("category").value;
  const shuffled = categories[selected].sort(() => Math.random() - 0.5);
  questions = [intro, ...shuffled.slice(0, 3)];
  switchCard(startCard, interviewCard);
  loadQuestion();
};

document.getElementById("nextBtn").onclick = nextQuestion;
document.getElementById("restartBtn").onclick = () => location.reload();

function switchCard(from, to) {
  from.classList.remove("active");
  to.classList.add("active");
}

function loadQuestion() {
  questionEl.innerText = questions[index].q;
  progressEl.innerText = `${index + 1}/${questions.length}`;
  answerEl.value = "";
  startTimer();
}

function startTimer() {
  time = 30;
  timerEl.innerText = time + "s";
  clearInterval(timer);

  timer = setInterval(() => {
    time--;
    timerEl.innerText = time + "s";

    if (time === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function nextQuestion() {
  clearInterval(timer);

  const answer = answerEl.value.toLowerCase();
  const keywords = questions[index].keywords;

  let matchCount = keywords.filter(k => answer.includes(k)).length;

  if (matchCount >= 1) score++;

  index++;

  if (index < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  switchCard(interviewCard, resultCard);

  let total = questions.length;
  let percent = (score / total) * 100;

  let feedback = "";

  if (percent >= 75) {
    feedback = "Excellent work! You performed really well.";
  } else if (percent >= 50) {
    feedback = "Good job! You can improve further.";
  } else {
    feedback = "You need to improve. Practice more.";
  }

  document.getElementById("finalScore").innerText = `Score: ${score}/${total}`;
  document.getElementById("feedback").innerText = feedback;
}







