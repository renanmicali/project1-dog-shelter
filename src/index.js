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
   
    list.innerHTML = `
            <select onchange="loadBreed(this.value)" name="" id="opt">
            <option>Browse by Dog Breed</option>
            ${Object.keys(breedList).map((breed) => { 
        return `<option>${breed}</option>`
        
    })}
            </select>`
}
// londing images by breed
function loadBreed(breed) {
    if (breed != "Choose a Dog Breed To Adopt") {
        fetch(`https://dog.ceo/api/breed/${breed}/images`)
            .then(resp => resp.json())
            .then(data => {
                let imageArray = data.message
                loadPic(data.message[0])
                keyDownEvent(imageArray)               
            })
    }

}

function keyDownEvent(array) {
    document.addEventListener('keydown', (e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            //avoiding arrows to loop select menu
            e.preventDefault();
            loadPic(changePic(array))
        }
      
    })
}

// Last Listener added


function loadPic(imgUrl) {

    document.getElementById('pic').innerHTML = `
    <div class="pic_pic" >
        <img id="myImg" src="${imgUrl}" alt="">
    </div>
   
    `}

// random pic generator
function changePic(img) {
    return img[(Math.floor(Math.random() * img.length))]
}

//give dog name

btn.addEventListener("click", generate);

function generate() {
    if (output.value !== "Type Name Here" && output.value !== "") {
        output2.textContent = output.value
    } else {
        alert('Please give your Pet a name')
    }
};

//clearing name

function clearDogName(){
    return output2.textContent = ""
}


////////////////// !! modal !! ////////////////////////////////////
let modal = document.getElementById('myModal');
let divPic = document.querySelector('#pic');
let imgFinal = document.querySelector('#myImg')
let modalImg = document.getElementById("img01");
let captionText = document.getElementById("caption");
let span = document.getElementsByClassName("close")[0];
let dogName = document.querySelector('.randomName')

divPic.addEventListener("click", () => {
    imgFinal = document.querySelector('#myImg')
    modal.style.display = "block";
    modalImg.src = imgFinal.src;
    modalImg.alt = imgFinal.alt;
    captionText.innerHTML = `Your BEST Friend   ${dogName.innerHTML}`;
}
)
// x button to close modal
span.addEventListener('click', () => {
    modal.style.display = "none";
})