document.addEventListener("DOMContentLoaded", () => {

    const scoreboard = document.getElementById("quizScoreboard");
    const circles = scoreboard.querySelectorAll(".score-circle");
    const resultBlock = scoreboard.querySelector(".scoreboard__result");
    const correctCountEl = scoreboard.querySelector(".scoreboard__correct");
    const wrongCountEl = scoreboard.querySelector(".scoreboard__wrong");

    let correctCount = 0;
    let wrongCount = 0;

    const correctAnswers = {
        1: "quest1_2",
        2: "quest2_3",
        3: "quest3_2",
        4: "quest4_3",
        5: "quest5_1",
        6: "quest6_3",
    };

    let currentQuestion = 1;
    const answeredQuestions = new Set();

    const answerButtons = document.querySelectorAll(".Button2-DDOYo");

    // ===== МОДАЛКА =====
    const modal = document.createElement("div");
    modal.classList.add("quiz-modal");

    Object.assign(modal.style, {
    position: "fixed",
    left: "50%",
    top: "30%",
    transform: "translate(-50%, -50%)",
    zIndex: "9999",
    opacity: 0
    });

    document.body.appendChild(modal);

    function showModal(text) {
        modal.textContent = text;
        modal.style.display = "flex";
        requestAnimationFrame(() => modal.style.opacity = 1);

        setTimeout(() => {
            modal.style.opacity = 0;
            setTimeout(() => modal.style.display = "none", 300);
        }, 1500);
    }

    function getQuestionNumber(btnId) {
        const match = btnId.match(/^quest(\d+)_/);
        return match ? parseInt(match[1]) : null;
    }

    function scrollToNextQuestion(nextQuestionNumber) {
    const titles = document.querySelectorAll(".Survey__titleWrapper-ViBFM");
    const title = titles[nextQuestionNumber - 1]; // вопросы идут с 1

    if (!title) return;

    const desiredTop =
        title.getBoundingClientRect().top +
        window.pageYOffset -
        60;

    const maxScrollTop =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const scrollTop = Math.min(desiredTop, maxScrollTop);

    window.scrollTo({
        top: scrollTop,
        behavior: "smooth"
    });
}

    // ===== ОБРАБОТКА КЛИКОВ =====
answerButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        const qNum = getQuestionNumber(btn.id);
        if (!qNum || !correctAnswers[qNum]) return;

        if (answeredQuestions.has(qNum)) {
            showModal("Этот вопрос уже отвечен");
            return;
        }

        if (qNum !== currentQuestion) {
            showModal("Ответьте на предыдущий вопрос");
            return;
        }

        // показать табло после первого ответа
        scoreboard.classList.remove("hidden");
        resultBlock.classList.remove("hidden");

        const circle = circles[qNum - 1];

        const correctBtnId = correctAnswers[qNum];
        const correctBtn = document.getElementById(correctBtnId);

        let isCorrect = false;

        if (btn.id === correctBtnId) {
            isCorrect = true;
            btn.style.background = "#4caf4fc9";
            btn.style.color = "#fff";
            showModal("Правильно!");
        } else {
            btn.style.background = "#b23c3acb";
            btn.style.color = "#fff";
            correctBtn.style.background = "#4CAF50";
            correctBtn.style.color = "#fff";
            showModal("Неправильно!");
        }

        // ===== обновление табло =====
        circle.classList.add("active");

        if (isCorrect) {
            circle.classList.add("correct");
            correctCount++;
        } else {
            circle.classList.add("wrong");
            wrongCount++;
        }

        correctCountEl.textContent = correctCount;
        wrongCountEl.textContent = wrongCount;

        answeredQuestions.add(qNum);
        currentQuestion++;

        setTimeout(() => {
            scrollToNextQuestion(currentQuestion);
        }, 1000);
    });
});

})
