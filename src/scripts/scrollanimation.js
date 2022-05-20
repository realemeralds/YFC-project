const sr = ScrollReveal(
    {
        // reset: true,
        delay: 300,
        distance: '50px',
        opacity: 0,
        duration: 1000,
    }
);

window.addEventListener('DOMContentLoaded', (event) => {
    sr.reveal('.sr-down', {origin: 'bottom'});
    sr.reveal('.sr-left', {origin: 'left'});
    sr.reveal('.sr-right', {origin: 'right'});
})


