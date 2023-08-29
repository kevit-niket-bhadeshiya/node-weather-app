console.log('Client side js file is loaded..!!');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', async (e) => {
    try {

        // e.preventDefault();
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

        const location = search.value

        const response = await fetch(`/weather?address=${location}`);
        const data = await response.json();
        if (data.error) {
            messageOne.innerText = data.error
        } else {
            // messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }

    } catch (error) {
        
        messageOne.innerText = error
    
    }
})