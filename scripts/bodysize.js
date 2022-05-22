window.addEventListener('DOMContentLoaded', () => {
    let backgroundHeight = window.innerHeight
    page = document.querySelector('body')

    window.addEventListener('resize', () => {
        if (window.innerHeight > backgroundHeight) {
            backgroundHeight = window.innerHeight
            page.style.height = backgroundHeight - 72 + 'px'
        }
    })
})