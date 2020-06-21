const weatherForm = document.querySelector('#forecastForm')
const search = document.querySelector('#searchData')
const messageOne = document.querySelector('#p1')
const messageTwo = document.querySelector('#p2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

