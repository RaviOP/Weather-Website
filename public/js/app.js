const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    messageOne.textContent = ''
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.Error) {
                messageOne.textContent = data.Error
            }
            else {
                messageOne.textContent = data.Location
                messageTwo.textContent = data.Data
                messageThree.textContent = "LATITUDE : " + data.Latitude
                messageFour.textContent = "LONGITUDE : " + data.Longitude
            }
        })
    })
})
