const questions = [
  {
    question: "Электромобили не требуют технического обслуживания.",
    explanation: "💡 Нет масла, свечей и коробки передач, но контроль батареи и подвески всё равно нужен.",
    correct: false,
    image: "img/4.webp"
  },
  {
    question: "Основатель компании Mercedes-Benz назвал свое детище по имени дочери Мерседес",
    explanation: "💡 У Бенца никогда не было дочки и он не был основателям.",
    correct: false,
    image: "img/3.png"
  },
  {
    question: "Использование кондиционера увеличивает расход топлива.",
    explanation: "💡 Компрессор кондиционера создаёт дополнительную нагрузку на двигатель.",
    correct: true,
    image: "img/6.webp"
  },
  {
    question: "Если автомобиль долго стоит без движения, аккумулятор всё равно разряжается.",
    explanation: "💡 Системы охраны и электроника продолжают потреблять энергию.",
    correct: true,
    image: "img/6.webp"
  },
  {
    question: "Полный привод всегда делает автомобиль безопаснее.",
    explanation: "💡 Он улучшает проходимость, но не сокращает тормозной путь.",
    correct: false,
    image: "img/6.webp"
  },
  {
    question: "Первый электроавтомобиль появился ещё в XIX веке.",
    explanation: "💡 Первые электромобили были созданы в 1830–1840-х годахв Европе и США.",
    correct: true,
    image: "img/6.webp"
  }
];

const start = document.querySelector(".startScreen");
const blockOll = document.querySelector(".card_4jhtv_21");
const plug = document.querySelector(".plug")

const card = document.querySelector(".card_y1q7j_11");
const front = card.querySelector(".gameCard_4jhtv_1:not(._faceBack_y1q7j_36)");
const back = card.querySelector("._faceBack_y1q7j_36");

const questionEl = front.querySelector(".t-heading-5");
const imageEl = front.querySelector(".image_4jhtv_51 img");
const trueBtn = front.querySelectorAll(".tenet-ui-btn")[0];
const falseBtn = front.querySelectorAll(".tenet-ui-btn")[1];

const successEl = back.querySelector(".t-heading-3");
const errorEl = back.querySelector(".t-heading-4");
const explanationEl = back.querySelector(".t-small-text");
const nextBtn = back.querySelector("._nextBtn");

const finish = document.querySelector(".finishBlock");

let currentIndex = 0;

start.addEventListener("click", () => {
  plug.style.display = "none";
});

/* ---------- Загрузка вопроса ---------- */
function loadQuestion(index) {
  const q = questions[index];

  questionEl.textContent = q.question;
  imageEl.src = q.image;

  successEl.style.display = "none";
  errorEl.style.display = "none";
  explanationEl.style.display = "none";

  card.classList.remove("is-flipped", "show-next");

  // показываем кнопки ответа при загрузке нового вопроса
  front.querySelector(".actions_4jhtv_108").style.display = "flex";
}

/* ---------- Проверка ответа ---------- */
function answer(isTrue) {
  const q = questions[currentIndex];

  card.classList.add("is-flipped", "show-next");

  if (isTrue === q.correct) {
    successEl.style.display = "block";
  } else {
    errorEl.style.display = "block";
    explanationEl.textContent = q.explanation;
    explanationEl.style.display = "block";
  }
}

/* ---------- Следующий вопрос ---------- */
function nextQuestion() {
  card.classList.remove("is-flipped");
  // показываем кнопки ответа при загрузке нового вопроса
  front.querySelector(".actions_4jhtv_108").style.display = "flex";

  setTimeout(() => {
    currentIndex++;

    if (currentIndex < questions.length) {
      loadQuestion(currentIndex);
    } else {
      blockOll.style.display = "none";
      finish.style.display = "block";
      
    }
  }, 600);
}

/* ---------- События ---------- */
trueBtn.addEventListener("click", () => answer(true));
falseBtn.addEventListener("click", () => answer(false));
nextBtn.addEventListener("click", nextQuestion);

/* ---------- Старт ---------- */
loadQuestion(currentIndex);
