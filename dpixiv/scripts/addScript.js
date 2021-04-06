const siteUrl = 'http://localhost:8080';

window.addEventListener('load', () => {
    const script = document.createElement("script");
    script.crossorigin = "Anonymous"
    script.defer = true
    script.src = siteUrl + '/script.js'
    document.body.appendChild(script)
})
