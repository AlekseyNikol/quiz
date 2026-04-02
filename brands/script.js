    // --- Данные вопросов ---
    // Замените пути к картинкам на реальные (например, ваши PNG).
    const questions = [
      {
        // Вопрос 1 — по вашей первой картинке (логотип Chery)
        question:
          "Начнем с простого и знакомого. Какой марке принадлежит этот логотип?",
        image: "img/dilers.webp",
        answers: ["Chery", "Hennessey", "Fisker"],
        correctIndex: 0,
      },
      {
        question:
          "Этот логотип с перекрещивающимися овалами установлен на большинстве автомобилей какого бренда?",
        image: "img/toyota.webp",
        answers: ["Nissan", "Toyota", "Mazda"],
        correctIndex: 1,
      },
      {
        question:
          "Какой марке принадлежит логотип с трезубцем, часто встречающийся на спортивных седанах и купе?",
        image: "img/1280.webp",
        answers: ["Lamborghini", "Maserati", "Bugatti"],
        correctIndex: 0,
      },
      {
        question:
          "Этот бренд хорошо известен российским автомобилистам. Что это за марка?",
        image: "img/1000.webp",
        answers: ["Baic", "Changan", "Livan"],
        correctIndex: 2,
      },
      {
        question:
          "Что-то новенькое для наших дорог. Какой бренд?",
        image: "img/780.webp",
        answers: ["Knewstar", "Saipa", "Ravon"],
        correctIndex: 1,
      },
      {
        question:
          "На фото эмблема с четырехлистником из колец. Какому концерну она принадлежит?",
        image: "img/121.webp",
        answers: ["Audi", "Alfa Romeo", "Subaru"],
        correctIndex: 0,
      },
      {
        question:
          "Этот логотип можно увидеть на китайских кроссоверах в России. Что это за марка?",
        image: "img/1020.webp",
        answers: ["Geely", "Great Wall", "GAC"],
        correctIndex: 1,
      },
    ];

    // --- Состояние квиза ---
    const totalQuestions = questions.length;
    let currentQuestionIndex = 0;
    let selectedAnswerIndex = null;
    let correctAnswersCount = 0;
    const answersStatus = []; // true/false по каждому вопросу

    // --- Элементы DOM ---
    const quizScreen = document.getElementById("quiz-screen");
    const resultScreen = document.getElementById("result-screen");

    const questionNumberEl = document.getElementById("question-number");
    const questionTotalEl = document.getElementById("question-total");
    const progressFillEl = document.getElementById("progress-bar-fill");

    const questionImageEl = document.getElementById("question-image");
    const questionTextEl = document.getElementById("question-text");
    const optionButtons = document.querySelectorAll(".quiz-option");
    const submitBtn = document.getElementById("submit-btn");

    const resultTitleEl = document.getElementById("result-title");
    const resultDescriptionEl = document.getElementById("result-description");
    const answersSummaryRowEl = document.getElementById("answers-summary-row");
    const restartBtn = document.getElementById("restart-btn");

    const resultImageId = document.getElementById ("result-image-wrapper-id")

    // --- Инициализация ---
    questionTotalEl.textContent = totalQuestions;

    function loadQuestion(index) {
      const q = questions[index];

      questionNumberEl.textContent = index + 1;
      questionTextEl.textContent = q.question;
      questionImageEl.src = q.image;
      questionImageEl.alt = `Изображение вопроса ${index + 1}`;

      optionButtons.forEach((btn, i) => {
        btn.textContent = q.answers[i];
        btn.classList.remove("selected");
      });

      selectedAnswerIndex = null;
      submitBtn.disabled = true;

      const progressPercent = ((index) / (totalQuestions - 1)) * 100;
      progressFillEl.style.width = `${progressPercent}%`;
    }

    // Выбор варианта
    optionButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = Number(btn.dataset.index);
        selectedAnswerIndex = index;

        optionButtons.forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");

        submitBtn.disabled = false;
      });
    });

    // Нажатие "Ответить"
    submitBtn.addEventListener("click", () => {
      if (selectedAnswerIndex === null) return;

      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = selectedAnswerIndex === currentQuestion.correctIndex;

      answersStatus[currentQuestionIndex] = isCorrect;
      if (isCorrect) correctAnswersCount++;

      const isLast = currentQuestionIndex === totalQuestions - 1;
      if (isLast) {
        showResultScreen();
      } else {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
      }
    });

    // Показ экрана результатов
    function showResultScreen() {
        quizScreen.classList.add("hidden");
        resultScreen.classList.remove("hidden");

        resultTitleEl.textContent = `Правильных ответов: ${correctAnswersCount} из ${totalQuestions}`;

        // 👉 берём текст и картинку из getStatusData
        const statusData = getStatusData(correctAnswersCount, totalQuestions);

        resultDescriptionEl.textContent = statusData.text;
        resultImageId.src = statusData.image;

        answersSummaryRowEl.innerHTML = "";
        for (let i = 0; i < totalQuestions; i++) {
            const pill = document.createElement("div");
            pill.classList.add("answer-pill");
            pill.classList.add(answersStatus[i] ? "correct" : "incorrect");
            pill.textContent = i + 1;
            answersSummaryRowEl.appendChild(pill);
  }

  // Финальный прогресс — 100%
  progressFillEl.style.width = "100%";
}


    // Текст статуса игрока по количеству правильных ответов
    function getStatusData(correct, total) {
    const ratio = correct / total;

    if (ratio === 0) {
        return {
        text: "Похоже, автомобильная реальность России вас пока мало интересует. Попробуйте пройти тест еще раз — можно улучшить результат!",
        image: "img/5.webp"
        };
    } else if (ratio <= 0.3) {
        return {
        text: "Вы только начинаете разбираться в автобрендах.",
        image: "img/4.webp"
        };
    } else if (ratio <= 0.7) {
        return {
        text: "Неплохо! Вы уже уверенно ориентируетесь в логотипах популярных марок.",
        image: "img/3.webp"
        };
    } else if (ratio < 1) {
        return {
        text: "Отличный результат! Остался всего шаг до идеального прохождения.",
        image: "img/2.webp"
        };
    } else {
        return {
        text: "Абсолютный чемпион! 100% правильных ответов!",
        image: "img/1.webp"
        };
    }
    }


    // Перезапуск теста
    restartBtn.addEventListener("click", () => {
      currentQuestionIndex = 0;
      selectedAnswerIndex = null;
      correctAnswersCount = 0;
      answersStatus.length = 0;

      resultScreen.classList.add("hidden");
      quizScreen.classList.remove("hidden");

      loadQuestion(currentQuestionIndex);
    });

    // Старт
    loadQuestion(currentQuestionIndex);