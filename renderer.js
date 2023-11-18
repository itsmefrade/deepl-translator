(async function () {

    document.getElementById('translated-sentence').innerText = await window.actions.get()

})()

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {

    const isDarkMode = await window.actions.toggle()
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.actions.system()
    document.getElementById('theme-source').innerHTML = 'System'
})

document.getElementById('copy-to-clipboard').addEventListener('click', async () => {
    let willGetCopied = document.getElementById('translated-sentence').innerText
    await window.actions.copy(willGetCopied)
    document.getElementById('copy-thing').innerHTML = "Copied to clipboard!"
    document.getElementById('theme-source').innerHTML = 'System'
})