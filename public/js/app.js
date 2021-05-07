console.log('Clientside javaScript :)')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const getForecast = (location) => {
    return new Promise(resolve => {
        fetch('/weather?address='+location).then((response) => {
            response.json().then((data) => {
                resolve(data)
            })
        })
    })
    
}

weatherForm.addEventListener('submit', async(e) => {
    e.preventDefault()

    const location = search.value

    const data = await getForecast(location)

    if(data.error)
        return messageOne.textContent = data.error

    messageOne.textContent = data.location
    messageTwo.textContent = data.forecast
})