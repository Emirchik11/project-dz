const cardsList1 = document.querySelector('.cards-list');

let cardId = 0;
let blueLock = 0


const generateCards = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        const {title, body} = data[cardId]

        const respon = await fetch('../data/persons.json')
        const info = await respon.json()
        const {name, age, personPhoto}  = info[blueLock]



        data.forEach(() => {
            cardsList1.innerHTML +=`
                <div class="character-card">
                 <img src=${personPhoto} alt="">
                    <h4>${title}</h4>
                    <p>${body}</p>
                </div>
            `
        })

    }catch (error) {
        console.log(error)
    }






};

generateCards();

const generateImg = async () => {
        const response = await fetch('../data/persons.json')
        const data = await response.json()
        const {personPhoto} = data[blueLock]
        data.forEach(() => {
            const img = document.createElement('img')
            img.src = personPhoto


        })
}


