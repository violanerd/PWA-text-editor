const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    butInstall.style.visibility = 'visible'



butInstall.addEventListener('click', () => {
    event.prompt();
    butInstall.setAttribute('disabled', true);
    butInstall.textContent = 'Installed!'
});
});

window.addEventListener('appinstalled', (event) => {
    console.log('appinstalled', event);
});
