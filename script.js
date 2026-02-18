let teams = [];
let scores = [0, 0];
let currentTeam = 0;
let words = [
    "Ашьха",
    "Аӡиас",
    "Абна",
    "Аӡиа",
    "Амра",
    "Ақәа",
    "Ахаҳә",
    "Аҩны",
    "Асы"
];

let usedWords = [];
let currentWord = "";
let timer;
let timeLeft = 60;

const wordElement = document.getElementById("word");
const timerElement = document.getElementById("timer");
const currentTeamElement = document.getElementById("currentTeam");
const score1Element = document.getElementById("score1");
const score2Element = document.getElementById("score2");

// Запуск игры
document.getElementById("startGame").addEventListener("click", async () => {
    teams = [
        document.getElementById("team1").value || "Команда 1",
        document.getElementById("team2").value || "Команда 2"
    ];
    scores = [0, 0];
    currentTeam = 0;
    usedWords = [];
    document.getElementById("setup").style.display = "none";
    document.getElementById("game").style.display = "block";
    // words = await fetchWords();
    startRound();
});

// Кнопки Угадано / Пропустить
document.getElementById("guessed").addEventListener("click", () => {
    scores[currentTeam]++;
    nextWord();
});

document.getElementById("skip").addEventListener("click", () => {
    nextWord();
});

document.getElementById("restart").addEventListener("click", () => {
    document.getElementById("end").style.display = "none";
    document.getElementById("setup").style.display = "block";
});

// // Загрузка слов из файла
// async function fetchWords() {
//     const response = await fetch("words.json");
//     const data = await response.json();
//     return shuffle(data);
// }

// Перемешивание слов
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Начало раунда для текущей команды
function startRound() {
    timeLeft = 60;
    currentTeamElement.textContent = `Ход: ${teams[currentTeam]}`;
    updateScore();
    nextWord();

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            // Ход переходит к другой команде
            currentTeam = (currentTeam + 1) % 2;

            if (usedWords.length >= words.length) {
                endGame();
            } else {
                alert(`Время закончилось! Ход ${teams[currentTeam]}`);
                startRound();
            }
        }
    }, 1000);
}

// Показ следующего слова
function nextWord() {
    const remaining = words.filter(w => !usedWords.includes(w));
    if (remaining.length === 0) {
        endGame();
        return;
    }
    const index = Math.floor(Math.random() * remaining.length);
    currentWord = remaining[index];
    wordElement.textContent = currentWord;
    usedWords.push(currentWord);
}

// Обновление счёта
function updateScore() {
    score1Element.textContent = `${teams[0]}: ${scores[0]}`;
    score2Element.textContent = `${teams[1]}: ${scores[1]}`;
}

// Конец игры
function endGame() {
    clearInterval(timer);
    document.getElementById("game").style.display = "none";
    document.getElementById("end").style.display = "block";
    const winnerText = scores[0] === scores[1] ? "Ничья!" :
        scores[0] > scores[1] ? `${teams[0]} победила!` : `${teams[1]} победила!`;
    document.getElementById("winner").textContent = winnerText;
}
