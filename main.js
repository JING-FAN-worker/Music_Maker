const samples = []
samples.push({src:"audio/choir.mp3", name:"choir"})
samples.push({src:"audio/gun.mp3", name:"gun"})
samples.push({src:"audio/lower.mp3", name:"lower"})
samples.push({src:"audio/meow.mp3", name:"meow"})
samples.push({src:"audio/popang.mp3", name:"popang"})
samples.push({src:"audio/spit.mp3", name:"spit"})

let tracks = []
tracks.push([])
tracks.push([])
tracks.push([])
tracks.push([])

tracksDiv = document.getElementById("tracks")

for(let i = 0; i < tracks.length; i++) {
    let trackDiv = document.createElement("div")
    trackDiv.setAttribute("id", "trackDiv" + i)
    let trackDivHeader = document.createElement("h2")
    trackDivHeader.innerText = "Track" + (i + 1)
    trackDiv.appendChild(trackDivHeader)
    tracksDiv.appendChild(trackDiv)
}

const addButtons = document.getElementById("addButtons")
let id = 0

samples.forEach((sample) => {
    console.log(sample.name)
    let newButton = document.createElement("button")
    newButton.setAttribute("data-id", id++)
    newButton.addEventListener("click", () => addSample(newButton))
    newButton.innerText = sample.name
    addButtons.appendChild(newButton)
})

function addSample(addButton) {
    const sampleNumber = addButton.dataset.id
    const trackNumber = document.querySelector("input[name='track']:checked").value
    console.log("Sample number: " + sampleNumber)
    console.log("Track number: " + trackNumber)
    tracks[trackNumber].push(samples[sampleNumber])
    let trackDiv = document.getElementById("trackDiv" + trackNumber)
    let newItem = document.createElement("div")
    newItem.innerText = samples[sampleNumber].name
    trackDiv.appendChild(newItem)
}
const playButton = document.getElementById("play")
playButton.addEventListener("click", () => playsong())

function playsong(){
    let i = 0
    tracks.forEach((track) => {
        if(track.length > 0){
            playTrack(track, i)
        }
        i++
    })
}

function playTrack(track, trackNumber){
    let audio = new Audio()
    let i = 0
    audio.addEventListener("ended", () => {
        i = ++i <track.length ? i : 0
        audio.src = track[i].src
        audio.play()
        console.log("Starting: Track " + trackNumber + ", music " + track[i].name)
    }, true)
    audio.volume = 1.0
    audio.loop = false
    audio.src = track[0].src
    audio.play()
    console.log("Starting: Track " + trackNumber + ", music " + track[i].name)

}