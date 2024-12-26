const cardsList1 = document.querySelector('.cards-list');

const generateCards = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '../data/persons.json');
    request.setRequestHeader('Content-type', 'application/json');
    request.send();
    request.onload = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных');
            }
            const data = JSON.parse(request.response);
            data.forEach(card => {
                const Card = document.createElement('div');
                Card.classList.add('character-card');

                Card.innerHTML = `
                    <h2>${card.name}</h2>
                    <h4>age: ${card.age}</h4>
                    <img src="${card.personPhoto}" alt="photo">
                `;

                cardsList1.append(Card);
            });
        } catch (error) {
        }
    };

    request.onerror = () => {
        console.error("Ошибка запроса. Проверьте путь к файлу или настройки сервера.");
    };
};

generateCards();


