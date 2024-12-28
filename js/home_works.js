// Homework 1 part 1


const gmailInput = document.getElementById('gmail_input');
const gmailButton = document.getElementById('gmail_button');
const gmailResult = document.getElementById('gmail_result');


const gmailRegExp = /^[a-zA-Z0-9._%]+@gmail\.com$/;



gmailButton.onclick = () => {
    if (gmailRegExp.test(gmailInput.value)) {
        gmailResult.textContent = 'OK';
        gmailResult.style.color = 'green';
    } else {

        gmailResult.textContent = 'Invalid gmail';
        gmailResult.style.color = 'red';
    }
};

// HOME WORK 1 party 2

const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

const moveBlock = (x, y, direction) => {
    const parentWidth = parentBlock.clientWidth;
    const parentHeight = parentBlock.clientHeight;

    const childWidth = childBlock.clientWidth;
    const childHeight = childBlock.clientHeight;


    childBlock.style.left = `${x}px`;
    childBlock.style.top = `${y}px`;


    if (direction === 'right' && x < parentWidth - childWidth) {
        requestAnimationFrame(() => moveBlock(x + 1, y, 'right'));
    } else if (direction === 'down' && y < parentHeight - childHeight) {
        requestAnimationFrame(() => moveBlock(x, y + 1, 'down'));
    } else if (direction === 'left' && x > 0) {
        requestAnimationFrame(() => moveBlock(x - 1, y, 'left'));
    } else if (direction === 'up' && y > 0) {
        requestAnimationFrame(() => moveBlock(x, y - 1, 'up'));
    } else {

        if (direction === 'right') {
            requestAnimationFrame(() => moveBlock(x, y, 'down'));
        } else if (direction === 'down') {
            requestAnimationFrame(() => moveBlock(x, y, 'left'));
        } else if (direction === 'left') {
            requestAnimationFrame(() => moveBlock(x, y, 'up'));
        } else if (direction === 'up') {
            requestAnimationFrame(() => moveBlock(x, y, 'right'));
        }
    }
};

moveBlock(0, 0, 'right');

// Home work 2

const secondsBlock = document.querySelector('#seconds');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const resetBtn = document.querySelector('#reset');

let seconds = 0;
let interval = null;

const updateSeconds = () => {
    secondsBlock.textContent = seconds;
};

const startTimer = () => {
    // Перенаправление на новую страницу
    window.location.href = 'http://localhost:63342/project%20dz/pages/game.html?_ijt=mulfcobcj1r3n1u87n1hb2dhqk&_ij_reload=RELOAD_ON_SAVE';
};

const stopTimer = () => {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
};

const resetTimer = () => {
    seconds = 0;
    updateSeconds();
    stopTimer();
};

// Привязываем обработчики к кнопкам
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);




startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);


// CHARACTERS

const charactersList = document.querySelector('.characters-list');

const generateCharactersCards = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '../data/homework4Ex2.json');
    request.setRequestHeader('Content-type', 'application/json');
    request.send();
    request.onload = () => {
        try {

            const data = JSON.parse(request.response);
            data.forEach(character => {
                const characterCard = document.createElement('div');
                characterCard.classList.add('character-card');

                characterCard.innerHTML =  `
                    <h2>${character.name}</h2>
                    <h4>age: ${character.age}</h4>
                    <img src="${character.photo}" alt="photo">
                `;

                charactersList.append(characterCard);
            });
        } catch (error) {
            console.error("Ошибка при обработке данных:", error);
            console.error("Ответ сервера:", request.response);
        }
    };

    request.onerror = () => {
        console.error("Ошибка запроса. Проверьте путь к файлу или настройки сервера.");
    };
};

generateCharactersCards();

// Home work 4 ex 2


const loadData = () => {
    const request = new XMLHttpRequest();
    const filePath = '../data/homework4Ex2.json';

    request.open('GET', filePath);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();

    request.onload = () => {
        if (request.status === 200) {
            try {
                const data = JSON.parse(request.response);
                console.log( data);
            } catch (error) {
                console.error("Ошибка при парсинге JSON:", error);
            }
        } else {
            console.error(`Ошибка загрузки файла: ${request.status} ${request.statusText}`);
        }
    };

    request.onerror = () => {
        console.error("Ошибка сети. Проверьте подключение.");
    };
};

loadData();
