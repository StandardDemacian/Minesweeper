
/* <i class="fa-solid fa-land-mine-on"></i>

// <i class="fa-solid fa-flag"></i> */

const startButton = document.getElementById("start")
const gameBoard = document.getElementById("board")

let board = []
let rows = 8
let columns = 8 

let minesCount = 5
let minesLocation = []

let tilesClicked = 0

let gameOver = false

// startButton.addEventListener("click",gameStart())
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

function placeFlag () {
 let tile = this
 tile.innerHTML = `<i class="fa-solid fa-flag"></i>`
}

function checkTile () {
    let tile = this
    if(tile.innerHTML == `<i class="fa-solid fa-flag"></i>`) {
        return
    }
    if (minesLocation.includes(tile.id)) {
        //alert("GAME OVER")
        gameOver = true
        revealMines()
        return
    }

    let coordinates = tile.id.split("-")
    let r = parseInt(coordinates[0])
    let c = parseInt(coordinates[1])
    checkMine(r,c)

}

