/*
 * Button click event
*/
document.querySelector('#login')
    .addEventListener('submit', (e) => {
        e.preventDefault();

        if (isLoginAttemptSpam()) {
            onBotDetected();
            indicate('danger');
            return;
        }

        if (!verifyMinTime(1000) || !isMouseMoved) {
            onBotDetected();
            indicate('danger');
            return;
        }

        indicate('loading');

        const username = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        if (!username || !password) {
            indicate('danger');
            return;
        }

        fetch('/', {
            method: 'post',
            body: JSON.stringify({ username, password }),
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res => indicate(res.status === 200 ? 'success' : 'danger'))
            .catch(() => indicate('danger'))
    });

/*
 *  Indicate failure or success of a login attempt
*/
const indicate = (value) => {
    const elem = document.querySelector('#button-submit');
    elem.classList.remove('is-danger');
    elem.classList.remove('is-success');
    elem.classList.remove('is-loading');

    switch (value) {
        case 'danger':
            elem.classList.add('is-danger');
            break;

        case 'success':
            elem.classList.add('is-success');
            break;

        case 'loading':
            elem.classList.add('is-loading');
            break;
    }
}

/*
 * Bot detection helpers
*/
const onBotDetected = (reason) => {
    console.error('Bot detected');
    // Ban the user and redirect to error 500
}

const verifyMinTime = (minTime) => new Date() - readyTime > minTime;

const setBotTraps = () => {
    const botTrapButton = document.querySelector('#button-bot-trap');
    botTrapButton.style.color = "#fff";
    botTrapButton.style.fontSize = "1px";
    botTrapButton.style.cursor = "auto";
    botTrapButton.classList.add('is-unselectable');
    botTrapButton.addEventListener('click', onBotDetected);

    const botTrapField = document.querySelector('#field-bot-trap');
    botTrapField.style.visibility = "collapse";
    botTrapField.addEventListener('input', onBotDetected);
}

const onMouseMove = () => {
    document.removeEventListener('mousemove', onMouseMove);
    isMouseMoved = true;
}

const isLoginAttemptSpam = () => {
    let result = lastSubmitTime && (new Date() - lastSubmitTime) < 5000 && textChangedSinceSubmit;

    lastSubmitTime = new Date();
    textChangedSinceSubmit = false;

    return result;
}

/*
*   Main
*/
const readyTime = new Date();
let lastSubmitTime;
let textChangedSinceSubmit = false;
let isMouseMoved = false;
setBotTraps();
document.addEventListener('mousemove', onMouseMove);

document.querySelectorAll('.input')
    .forEach(elem => {
        elem.addEventListener('input', () => textChangedSinceSubmit = true && verifyMinTime(500) || onBotDetected());
        elem.addEventListener('focus', () => verifyMinTime(500) || onBotDetected());
    });