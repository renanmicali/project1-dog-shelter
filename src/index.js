const url = "https://dog.ceo/api/breeds/list/all"
const list = document.getElementById('breed')

const nameList = [
	"Max","Buddy","Charlie","Jack","Cooper","Rocky","Toby","Tucker","Jake","Bear",
	"Duke","Teddy","Oliver","Riley","Bailey","Bentley","Milo","Buster","Cody","Dexter",
	"Winston","Murphy","Leo","Lucky","Oscar","Louie","Zeus","Henry","Sam","Harley",
	"Baxter","Gus","Sammy","Jackson","Bruno","Diesel","Jax","Gizmo","Bandit","Rusty",
	"Marley","Jasper","Brody","Roscoe","Hank","Otis","Bo","Joey","Beau","Ollie","Tank",
	"Shadow","Peanut","Hunter","Scout","Blue","Rocco","Simba","Tyson","Ziggy","Boomer",
	"Romeo","Apollo","Ace","Luke","Rex","Finn","Chance","Rudy","Loki","Moose","George",
	"Samson","Coco","Benny","Thor","Rufus","Prince","Chester","Brutus","Scooter","Chico",
	"Spike","Gunner","Sparky","Mickey","Kobe","Chase","Oreo","Frankie","Mac","Benji","Bubba",
	"Champ","Brady","Elvis","Copper","Cash","Archie","Walter"
]


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
            <option>Choose a Dog Breed To Adopt</option>
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
                    console.log("keydown")
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

