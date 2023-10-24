console.log("hello")

const url = "https://dog.ceo/api/breeds/image/random"
const dogCard = document.getElementById("dog-card")
const button = document.getElementById("btn")

fetch(url)
    .then(resp => resp.json())
    .then((data) => {
        // generateDog(data)
        console.log(data)
    })

button.addEventListener("click", findDog);

