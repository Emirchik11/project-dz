// PHONE BLOCK //

const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = "Ok"
        phoneResult.style.color = "green"
    } else {
        phoneResult.innerHTML = "Invalid phone number"
        phoneResult.style.color = "red"
    }
}

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
