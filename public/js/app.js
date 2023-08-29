console.log('Client side js file is loaded..!!');

// fetch('https://puzzle.mead.io/puzzle')
// .then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })


// fetch('http://localhost:3000/weather?address=!')
//     .then((response) => {
//         console.log(response);
//         response.json().then((data) => {

//             if (data.error) {
//                 console.log(data.error);
//             } else {
//                 console.log(data.forecast);
//                 console.log(data.location);
//                 // console.log(data.);
//             }

//         })
//     })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', async (e) => {
    try {
        
        e.preventDefault();
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

        const location = search.value

        // fetch(`http://localhost:3000/weather?address=${location}`)
        //     .then((response) => {
        //         response.json().then((data) => {

        //             if (data.error) {
        //                 messageOne.innerText = data.error
        //             } else {
        //                 messageOne.textContent = data.location
        //                 messageTwo.textContent = data.forecast
        //             }

        //         })
        //     })
        const response = await fetch(`http://localhost:3000/weather?address=${location}`);
        const data = await response.json();
        if (data.error) {
            messageOne.innerText = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }

    } catch (error) {
        
        messageOne.innerText = error
    
    }
})