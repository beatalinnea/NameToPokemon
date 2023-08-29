/**
 * The main script file of the application.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */


const form = document.querySelector('#name-form')
form.addEventListener('submit', handleSubmit)
const result = document.querySelector('#result')


function handleSubmit(event) {
    event.preventDefault()
    const yourName = form.querySelector('#your-name')

    while (result.childElementCount > 0) {
        result.removeChild(result.lastElementChild)
    }

    const newP = document.createElement('p')
    newP.textContent = 'Hello, ' + yourName.value
    result.appendChild(newP)
    convertToNumber(yourName.value)
    yourName.value = ''
}

function convertToNumber(string) {
    const nameArray = string.toLowerCase().split('')
    const numberArray = []
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'å', 'ä', 'ö']
    for (let i = 0; i < nameArray.length; i++) {
        numberArray.push(letters.indexOf(nameArray[i]) + 1)
    }
    // If you want to show the numbers:
    /*
    const str = numberArray.toString().replace(/,/g, ' + ')
    const newP = document.createElement('p')
    newP.textContent = str
    result.appendChild(newP)
    */
    sumNumbers(numberArray)
}

function sumNumbers(array) {
    let sum = 0
    for (let i = 0; i < array.length; i++) {
        sum += array[i]
    }
    const newP = document.createElement('p')
    newP.textContent = 'Your number is ' + sum
    result.appendChild(newP)
    fetchPokemon(sum)
}

async function fetchPokemon(number) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${number}/`)
        if (!response.ok) {
            const error = new Error(`Fetch error ${response.status}`)
            error.message = `Fetch error ${response.status}`
        }
        const data = await response.json()
        const nameOfPokemon = data.name.charAt(0).toUpperCase() + data.name.slice(1)
        const newP = document.createElement('p')
        if (nameOfPokemon.includes('-m')) {
            const editStr = nameOfPokemon.replace('-m', ' ♂')
            newP.textContent = 'Your pokémon is ' +  editStr
        } else if (nameOfPokemon.includes('-f')) {
            const editStr = nameOfPokemon.replace('-f', ' ♀')
            newP.textContent = 'Your pokémon is ' +  editStr
        } else {
            newP.textContent = 'Your pokémon is ' + nameOfPokemon
        }
        result.appendChild(newP)
        const img = document.createElement('img')
        img.src = data.sprites.front_default
        result.appendChild(img)

    } catch (error) {
        console.log(error.message)
    }
}