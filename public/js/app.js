console.log('Clientside javaScript :)')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')

const getForecast = (location) => {
    return new Promise(resolve => {
        fetch('http://localhost:3000/weather?address='+location).then((response) => {
            response.json().then((data) => {
                if(data.error)
                    resolve(data.error)

                resolve(data.forecast)
            })
        })
    })
    
}

weatherForm.addEventListener('submit', async(e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = await getForecast(location)
})