console.log("hello")

const url = "https://dog.ceo/api/breeds/list/all"
const dogCard = document.getElementById("dog-card")
const button = document.getElementById("btn")
const img = document.getElementById("dog-pic")
const card = document.getElementsByClassName("container")
const form = document.querySelector('form')
const yourDog = document.getElementById('your-dog')
const list = document.getElementById('breed')
console.log(img)

fetch(url)
    .then(resp => resp.json())
    .then((data) => {
        createBreedList(data.message)
     
       
    })

function createBreedList (breedList) {
    // 'this' will point to element in question
    list.innerHTML =`
            <select onchange="loadBreed(this.value)" name="" id="">
            <option>Choose a Dog Breed To Adopt</option>
            ${Object.keys(breedList).map((breed) => {
                return `<option>${breed}</option>`
            }).join('')}
            </select>`
}
// londing images by breed
function loadBreed(breed) {
    if (breed != "Choose a Dog Breed To Adopt") {
        fetch(`https://dog.ceo/api/breed/${breed}/images`)
        .then(resp => resp.json())
        .then(data => {
            createPic(data.message)
        })
    }
}

function createPic(img) {
    document.getElementById('pic').innerHTML = `
    <div class="pic_pic" style="background-image: url('${img[0]}');"></div>
   
    `
    addEventListener('keydown', () =>{
        for (const i in img){
            console.log(img[i])
            
        }
    } )
}
