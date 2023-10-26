console.log("hello")

const url = "https://dog.ceo/api/breeds/list/all"
const dogCard = document.getElementById("dog-card")
const button = document.getElementById("btn")
const img = document.getElementById("dog-pic")

// looping thourgh array to get a radnon index number
// retrive the data
// const test = "https://dog.ceo/api/breed/${loop here}/images/random"

let findDog = () => {

    fetch(url)
        .then(resp => resp.json())
        .then((data) => {
            let dogArr = Object.keys(data.message)

            const finalUrl = `https://dog.ceo/api/breed/${dogArr[randomBreedIndex()]}/images/random`

            //fetching final URL for img
            fetch(finalUrl)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data.message)
                })
        })
}

button.addEventListener("click", findDog);


// random number for dog array 
function randomBreedIndex() {
    return Math.floor(Math.random() * 99)
}
