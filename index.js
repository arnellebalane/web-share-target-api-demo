const form = document.querySelector('form');
const messages = document.querySelector('ul');

form.addEventListener('submit', e => {
    e.preventDefault();

    const message = e.target.message.value.trim();
    e.target.message.value = '';

    if (message) {
        postMessage(message);
    }
});

messages.addEventListener('click', async e => {
    if (e.target.matches('li')) {
        const message = e.target.textContent;
        await navigator.share({text: message});
    }
});

function postMessage(message) {
    const li = document.createElement('li');
    li.textContent = message;
    messages.appendChild(li);
}



if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js');
}
