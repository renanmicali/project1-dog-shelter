const url = "https://dog.ceo/api/breeds/list/all"
let list = document.getElementById('breed')
// APP
let btn = document.getElementById("gen-button");
let dogNameInput = document.getElementById("uNameInput");
let imgFinal = document.querySelector('#myImg')
let dogName = document.querySelector('.randomName');
let arrows = document.querySelector(".up_pic")
// modal
let modal = document.getElementById('myModal');
let divPic = document.querySelector('#pic');
let modalImg = document.getElementById("img01");
let captionText = document.getElementById("caption");
let span = document.querySelector("#close");

//fetchinh API data
fetch(url)
    .then(resp => resp.json())
    .then((data) => {
        createBreedList(data.message)

    })

// using map to show list and allow all breeds
function createBreedList(breedList) {
    list.innerHTML = `
            <select name="" id="opt">
            <option>Browse by Dog Breed</option>
            ${Object.keys(breedList).map((breed) => {
        return `<option>${breed}</option>`

    })}
            </select>`
    // !! 'this' will point to element in question when no other parameter can be used !!
    // changing the HTML ==> onchange="loadBreed(this.value)" 
    let selectedOpt = document.querySelector("#opt")
    selectedOpt.addEventListener("change", (e) => {
        loadBreedPic(e.target.value)
    })
}

// londing images by breed
function loadBreedPic(breed) {
    if (breed != "Browse by Dog Breed") {
        fetch(`https://dog.ceo/api/breed/${breed}/images`)
            .then(resp => resp.json())
            .then(data => {
                let imageArray = data.message
                loadPic(imageArray[0])
                keyDownEvent(imageArray)


            })
    }

}

function keyDownEvent(array) {
    document.addEventListener('keydown', (e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            //avoiding arrows to loop select menu
            e.preventDefault();
            loadPic(randonArrayNumber(array))
        }

    })
}

let picDiv = document.getElementById('pic')

function loadPic(imgUrl) {
    // for (let i = 0 ; i < 3 ; i++) {
    //     let newdivs = document.createElement("div")
    //     let newImages = document.createElement("img")
    //     newImages.id = "myImg"
    //     newdivs.className = "pic_pic"
    //     newImages.src = imgUrl[i]
    //     newdivs.appendChild(newImages)
    //     picDiv.append(newdivs)
        
    // }
    picDiv.innerHTML = `
    <div class="pic_pic" >
        <img id="myImg" src="${imgUrl}" alt="">
    </div>
   
    `
    if (imgUrl !== imgFinal.src) {
        clearDogName()
        arrows.style.display = "block"
    }
}

// random pic generator
function randonArrayNumber(imgArr) {
    return imgArr[(Math.floor(Math.random() * imgArr.length))]
}

//give dog name

btn.addEventListener("click", generate);

function generate() {
    if (dogNameInput.value !== "Type Name Here" && dogNameInput.value !== "") {
        dogName.textContent = dogNameInput.value
        dogNameInput.value = ""
    } else {
        alert('Please give your Pet a name')
    }
};

//clearing name

function clearDogName() {
    return dogName.textContent = ""
}



// modal 

divPic.addEventListener("click", () => {
    imgFinal = document.querySelector('#myImg')
    modal.style.display = "block";
    modalImg.src = imgFinal.src;
    captionText.innerHTML = `Your BEST Friend   ${dogName.innerHTML}`;
}
)
// x button to close modal
span.addEventListener('click', () => {
    modal.style.display = "none";
})