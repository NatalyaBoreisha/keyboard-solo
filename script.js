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
    currentWord.split("" ).forEach(letter => {
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
        alert("ты проиграл:(");
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
            currentIndex++;
            if (currentIndex === currentWord.length) {
                correctCount++;
                correctCountEl.textContent = correctCount;
                setTimeout(startNewWord, 1000);
            }
        } else {
            spans[currentIndex].classList.add("w");
            wordMistakes++;
            wordMistakesEl.textContent = wordMistakes;
            if (wordMistakes >= currentWord.length) {
                wrongCount++;
                wrongCountEl.textContent = wrongCount;
                setTimeout(startNewWord, 1000);
            }
        }
    }
}

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
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

document.addEventListener("keydown", debounce(handleKeydown, 100));

startTimer();
startNewWord();