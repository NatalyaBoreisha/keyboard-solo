const words = ["apple", "pencil", "million", "problem", "wheel", "moon", "summer"];
const wordContainer = document.querySelector(".word");
const correctCountEl = document.querySelector(".correct-count");
const wrongCountEl = document.querySelector(".wrong-count");
const wordMistakesEl = document.querySelector(".word-mistakes");
const timerEl = document.getElementById("timer");
let correctCount = 0;
let wrongCount = 0;
let wordMistakes = 0;
let currentWord = "";
let currentIndex = 0;
let startTime;
let timerInterval;

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function renderWord() {
    wordContainer.innerHTML = "";
    currentWord.split("").forEach(letter => {
        const span = document.createElement("span");
        span.textContent = letter;
        wordContainer.appendChild(span);
    });
    currentIndex = 0;
    wordMistakes = 0;
    wordMistakesEl.textContent = wordMistakes;
}

function startNewWord() {
    if (correctCount >= 5) {
        alert("Поздравляю!");
        resetGame();
        return;
    } else if (wrongCount >= 5) {
        alert("Ты проиграл:(");
        resetGame();
        return;
    }
    currentWord = getRandomWord();
    renderWord();
}

function handleKeydown(event) {
    const key = event.key;
    const spans = wordContainer.querySelectorAll("span");
    
    if (currentIndex < currentWord.length) {
        if (key === currentWord[currentIndex]) {
            spans[currentIndex].classList.add("c");
        } else {
            spans[currentIndex].classList.add("w");
            wordMistakes++;
            wordMistakesEl.textContent = wordMistakes;
        }
        currentIndex++;
    }
    
    if (currentIndex === currentWord.length) {
        if (wordMistakes > 0) {
            wrongCount++;
            wrongCountEl.textContent = wrongCount;
        } else {
            correctCount++;
            correctCountEl.textContent = correctCount;
        }
        setTimeout(startNewWord, 0);
    }
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timerEl.textContent = `Время: ${elapsedTime} сек`;
    }, 1000);
}

function resetGame() {
    correctCount = 0;
    wrongCount = 0;
    wordMistakes = 0;
    correctCountEl.textContent = correctCount;
    wrongCountEl.textContent = wrongCount;
    wordMistakesEl.textContent = wordMistakes;
    clearInterval(timerInterval);
    startTimer();
    startNewWord();
}

document.addEventListener("keydown", handleKeydown);

startTimer();
startNewWord();