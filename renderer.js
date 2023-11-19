(async function () {

    document.getElementById('translated-sentence').innerText =  await window.actions.get()

})()

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {

    const isDarkMode = await window.actions.toggle()
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})


document.getElementById('refresh').addEventListener('click', async () => {
    document.getElementById('translated-sentence').innerText =  await window.actions.get()

})

document.getElementById('copy-to-clipboard').addEventListener('click', async () => {

    let willGetCopied = document.getElementById('translated-sentence').innerText

    await window.actions.copy(willGetCopied)
    document.getElementById('copy-to-clipboard').innerText = "Copied!"

})
