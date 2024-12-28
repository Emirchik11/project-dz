// PHONE BLOCK //

const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = "ты теперь должен шаурму"
        phoneResult.style.color = "green"
    } else {
        phoneResult.innerHTML = "Invalid phone number"
        phoneResult.style.color = "red"
    }
}
// TAB SLIDERS
const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');

let currentTab = 0;
let tabSwitchInterval;

const hideTabContent = () => {
    tabContentBlocks.forEach((block) => (block.style.display = 'none'));
    tabs.forEach((tab) => tab.classList.remove('tab_content_item_active'));
};

const showTabContent = (id = 0) => {
    tabContentBlocks[id].style.display = 'block';
    tabs[id].classList.add('tab_content_item_active');
};

const switchTab = () => {
    currentTab = (currentTab + 1) % tabs.length; // Переключаем индекс
    hideTabContent();
    showTabContent(currentTab);
};

const startAutoSwitch = () => {
    tabSwitchInterval = setInterval(switchTab, 3000);
};

const stopAutoSwitch = () => {
    clearInterval(tabSwitchInterval);
};

hideTabContent();
showTabContent();
startAutoSwitch();

tabsParent.addEventListener('click', (event) => {
    const clickedTab = event.target.closest('.tab_content_item');
    if (clickedTab) {
        const clickedTabIndex = Array.from(tabs).indexOf(clickedTab);
        if (clickedTabIndex !== -1) {
            stopAutoSwitch();
            hideTabContent();
            currentTab = clickedTabIndex;
            showTabContent(currentTab);
            setTimeout(startAutoSwitch, 3000);
        }
    }
});




// CONVERTER

const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const converter = (element, targetElement1, targetElement2) => {
    element.oninput = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '../data/converter.json');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send();

        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.response);
                const usd = data.usd;
                const eur = data.eur;

                if (element.id === 'som') {
                    targetElement1.value = (element.value / usd).toFixed(2);
                    targetElement2.value = (element.value / eur).toFixed(2);
                } else if (element.id === 'usd') {
                    targetElement1.value = (element.value * usd).toFixed(2);
                    targetElement2.value = ((element.value * usd) / eur).toFixed(2);
                } else if (element.id === 'eur') {
                    targetElement1.value = (element.value * eur).toFixed(2);
                    targetElement2.value = ((element.value * eur) / usd).toFixed(2);
                }

                if (element.value === '') {
                    targetElement1.value = '';
                    targetElement2.value = '';
                }
            }
        };
    };
};

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, somInput, usdInput);



// Card Switcher

const cardBlock = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');

const total_card = 200;
let cardId = 1;

const loadCard = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(res => {
            if (!res.ok) throw new Error(`Card with ID ${id} not found`);
            return res.json();
        })
        .then(data => {
            const { title, completed, id } = data;
            cardBlock.innerHTML = `
                <p>${title}</p>
                <p>${completed}</p>
                <span>${id}</span>
            `;
        })
        .catch(err => {
            cardBlock.innerHTML = `<p>${err.message}</p>`;
        });
};

btnNext.onclick = () => {
    cardId = cardId < total_card ? cardId + 1 : 1;
    loadCard(cardId);
};

btnPrev.onclick = () => {
    cardId = cardId > 1 ? cardId - 1 : total_card;
    loadCard(cardId);
};

loadCard(cardId);

// Fetch запрос

const loadPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => {
            if (!res.ok) throw new Error('FAIL LOL');
            return res.json();
        })
        .then(posts => {
            console.log('Posts:', posts);
        })
        .catch(err => {
            console.error('Error FETCH LOL:', err.message);
        });
};

loadPosts();


// WEATHER


const inputSearch = document.querySelector('.cityName');
const buttonSearch = document.querySelector('#search');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp')
const weatherIcon = document.querySelector('#weather-icon')

const API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY =  'e417df62e04d3b1b111abeab19cea714'

buttonSearch.onclick = () => {
    fetch(`${API_URL}?appid=${API_KEY}&q=${inputSearch.value}&units=metric&lang=RU`)
        .then(response => response.json())
        .then(data => {
            city.innerHTML = data.name || 'Город не найден'
            temp.innerHTML = data.main?.temp ? Math.round(data.main?.temp) + '&deg;C' : '-/-/-/-'
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        })
    inputSearch.value = ''
}

// buttonSearch.onclick = () => {
//     fetch(`${API_URL}?appid=${API_KEY}&q=bishkek`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//         })
// }
// query params

