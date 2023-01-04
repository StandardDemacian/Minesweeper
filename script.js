
/* <i class="fa-solid fa-land-mine-on"></i>

// <i class="fa-solid fa-flag"></i> */

const startButton = document.getElementById("start")
const gameBoard = document.getElementById("board")

let board = []
let rows = 8
let columns = 8 

let minesCount = 8
let minesLocation = []

let tilesClicked = 0

let gameOver = false


window.onload = function() {
    gameStart()
}
function setMines() {
     let minesLeft = minesCount
         while(minesLeft > 0) {
            let r = Math.floor(Math.random() * rows)
            let c = Math.floor(Math.random() * columns)
            let id = r.toString() + "-" + c.toString()
        
        if(!minesLocation.includes(id)) {
            minesLocation.push(id)
            minesLeft -= 1
        }
    }
}

function gameStart () {
    setMines() 

    for (let r = 0; r < rows; r++){
    let row = []
    for (let c =0; c < columns; c++){
        let tile = document.createElement("div")
        tile.id = r.toString() + "-" + c.toString()
        tile.addEventListener("contextmenu", placeFlag)
        tile.addEventListener("click", checkTile)
        gameBoard.append(tile)
        row.push(tile)
        }
        board.push(row)
    }
    console.log(board)
}
console.log(minesLocation)
function placeFlag () {
 let tile = this
 tile.innerHTML = `<i class="fa-solid fa-flag"></i>`
 tile.style.backgroundColor = `blue`
}

function checkTile () {
    let tile = this
    if (tile.innerHTML= `<i class="fa-solid fa-flag"></i>`){
         tile.innerHTML = ""
         tile.style.backgroundColor = "lightgray"
        }
    if (minesLocation.includes(tile.id)){
        alert("KABOOM")
        revealMines()
        return
    }
}
//Reveal Mines Function
function revealMines() {
    for(let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c]
            if(minesLocation.includes(tile.id)){
                tile.innerHTML = `<i class="fa-solid fa-land-mine-on"></i>`
                 tile.style.backgroundColor = "red"
            }
        }
    }
}


 //Make check Mine function