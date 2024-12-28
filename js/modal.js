

// MODAL
const  modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const modalCloseButton = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

modalTrigger.onclick = openModal
modalCloseButton.onclick = closeModal

modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal()
    }
}
const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', handleScroll);
    }
};

window.addEventListener('scroll', handleScroll);

setTimeout(() => {
    openModal()
}, 10000)


// Post data

const token =
    '7600541677:AAGRDEZXWjZkdLK8R76_D6ohUGOAandWf70'
const form = document.querySelector('form')
const chat_id = '@emir_groop_bot'
const URL_API = `https://api.telegram.org/bot${token}/sendMessage`

form.onsubmit = (event) => {
    event.preventDefault()

    const {name, phone} = Object.fromEntries(new FormData(form).entries())

    const text =  `Имя: ${name}\nНомер: ${phone}`

    fetch(URL_API, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            chat_id: chat_id,
            text: text,
        })
    })
}