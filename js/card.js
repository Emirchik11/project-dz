const cardsList1 = document.querySelector('.cards-list');



const generateCards = async () => {
    try {
        const [postsResponse, photosResponse] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/posts/'),
            fetch('../data/persons.json')
        ]);
        const posts = await postsResponse.json();
        const photos = await photosResponse.json();

        posts.forEach((post, index) => {
            const photoIndex = index % photos.length;
            const {title, body} = post;
            const {personPhoto} = photos[photoIndex];

            cardsList1.innerHTML += `
            <div class="character-card">
                <img src="${personPhoto}" alt="character">
                <h4>${title}</h4>
                <p>${body}</p>
            </div>
            `
        });

    }catch (error) {
        console.log(error)
    }






};

generateCards();


