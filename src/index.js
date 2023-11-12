const url = "https://dog.ceo/api/breeds/list/all"
const list = document.getElementById('breed')
// Get a reference to the element that needs an event handler
let btn = document.getElementById("gen-button");
let output = document.getElementById("uNameInput");  
let output2 = document.querySelector(".randomName");

//fetchinh API data
fetch(url)
    .then(resp => resp.json())
    .then((data) => {
        createBreedList(data.message)


    })
// using map to show list and allow all breeds
function createBreedList(breedList) {
    // !! 'this' will point to element in question when no other parameter can be used !!
    // using onchange event to select breed
    // next step ------ > !!! instead of using onchange, try to use an eventListener function//

    list.innerHTML = `
            <select onchange="loadBreed(this.value)" name="" id="opt">
            <option>Browse by Breed and Name Your Favorite Dog</option>
            ${Object.keys(breedList).map((breed) => {
        return `<option>${breed}</option>`
    // creates new strings when used in an array and separate them using ('')
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
                // event when key down
                document.addEventListener('keydown', (e) => {
                    if (e.key === "ArrowLeft") {
                        //avoiding arrows to loop select menu
                        e.preventDefault();
                        pressedKey(changePic(data.message))
                        
                        
                    }
                    if (e.key === "ArrowRight") {
                        //avoiding arrows to loop select menu
                        e.preventDefault()
                        pressedKey(changePic(data.message));
                    }
                })

            })
    }

}

// Last Listener added
btn.addEventListener("click", generate);


// !!!!! grab array of images to be changed when event is actioned !!!!!!
function pressedKey(img) {
    document.getElementById('pic').innerHTML = `
    <div class="pic_pic" style="background-image: url('${img}');"></div>
   
    `
}

// generating pic on card
function createPic(img) {

    document.getElementById('pic').innerHTML = `
    <div class="pic_pic" style="background-image: url('${img[0]}');"></div>
   
    `

}

// random pic generator
function changePic(img) {
    
    return img[(Math.floor(Math.random() * img.length))]

}

function generate() {
    if (output !== "Type Name Here" && true){
        output2.textContent = output.value
    } else {
        alert('Please give your Pet a name')
    }
  // doesn't need to "return" anything. It just needs
  // to set the value of the text field the provided value.
};