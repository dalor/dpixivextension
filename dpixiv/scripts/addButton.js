const sessionKey = 'dPixivSession';
const siteUrl = 'https://dpixiv.herokuapp.com';
const mainPage = siteUrl + '/'

// This part of code is installed into page to load recaptcha_token
const globalEvent = () =>
    setTimeout(() => {
        grecaptcha.enterprise.ready(() => {
            grecaptcha.enterprise.execute(0, { action: 'accounts/login' }).then((recaptcha_enterprise_score_token) => {
                let token = document.getElementsByClassName("recaptcha_enterprise_score_token")[0];
                if (!token) {
                    token = document.createElement("input");
                    token.setAttribute("class", "recaptcha_enterprise_score_token");
                    token.setAttribute("type", "hidden");
                    token.setAttribute("name", "recaptcha_enterprise_score_token");
                    document.forms[0].appendChild(token);
                };
                token.setAttribute("value", recaptcha_enterprise_score_token);
            });
        });
    }, 1000)
// END

const addScript = (func) => {
    const script = document.createElement("script");
    script.innerText = `(${func.toString().replace('').replace(/\n/g, ';').replace(/[\ ;]{2,}/g, ' ').replace('undefined', '')})()`
    document.body.appendChild(script);
}

const saveSession = (session) => {
    window.localStorage.setItem(sessionKey, session);
}

const loadSession = () => {
    window.localStorage.getItem(sessionKey);
}

const getLoginButton = () => document.getElementsByClassName('signup-form__submit')[1];

const toQueryString = (data) => {
    const params = new URLSearchParams();
    for (const p in data) {
        params.append(p, data[p])
    }
    return params.toString()
}

const getFormData = () => {
    const form = new FormData(document.forms[0]);
    const data = Object.fromEntries(form);
    const loginComponent = document.getElementById('LoginComponent');
    const inputs = loginComponent.getElementsByTagName('input');
    return Object.assign(data, {
        pixiv_id: inputs[0]?.value,
        password: inputs[1]?.value
    })
}

const buttonEvent = (e) => {
    const data = getFormData();
    const pic = document.createElement('img');
    pic.onload = () => {
        window.location.replace(mainPage)
    }
    pic.setAttribute('src', `${siteUrl}/loginPic/${(new Date()).getTime()}?${toQueryString(data)}`)
    document.body.appendChild(pic)
}

const createNewButton = () => {
    const dpixivButton = document.createElement('button');
    dpixivButton.className = 'signup-form__submit';
    dpixivButton.innerHTML = 'Login to bot';
    dpixivButton.type = 'button';
    dpixivButton.style.cssText = 'margin-bottom:8px;'
    dpixivButton.addEventListener('click', buttonEvent)
    return dpixivButton
}

const putNewButton = (loginButton, NewButton) => {
    loginButton.parentNode.insertBefore(NewButton, loginButton);
}

const newButton = createNewButton()

window.addEventListener('load', () => {
    const loginButton = getLoginButton()
    if (loginButton) {
        addScript(globalEvent)
        putNewButton(loginButton, newButton)
    }
})
