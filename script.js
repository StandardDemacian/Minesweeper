
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
let minesFound = 0
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
        tile.addEventListener("click", clickTile)
        tile.addEventListener('contextmenu', function (e) { //removes that annoying menu while right clicking on the board
            e.preventDefault();
        })
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


function clickTile () {
    let tile = this
    // if (tile.innerHTML = `<i class="fa-solid fa-flag"></i>`){
    //     tile.innerHTML = ""
    //     // tile.style.backgroundColor = "lightgray"
    //     }
    if(minesLocation.includes(tile.id)) {
        alert("KABOOM")
        revealMines()
        return
    }
    
    let coordinates = tile.id.split("-") // takes in tile.id and removes the "-" and converts it to a an array
    let r = parseInt(coordinates[0])
    let c = parseInt(coordinates[1])
    console.log(r,c)
    checkMine(r,c)
}


// //Reveal Mines Function

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

 function checkMine(r,c) {

    if (r < 0 || r >= rows || c  < 0 || c >= columns) {
        return
    }
// this is to prevent my checkTile from going infinite
    if(board[r][c].classList.contains("tile-clicked")) {
        return
    }
    
    board[r][c].classList.add("tile-clicked")
    tilesClicked += 1
//Checks for mines in spaces, above, below and side to side of "clicked" tile
    let minesFound = 0 
   minesFound += checkTile(r-1 , c-1)
   minesFound += checkTile(r-1 , c)
   minesFound += checkTile(r-1, c+1)
   minesFound += checkTile(r , c-1)
   minesFound += checkTile(r , c+1)
   minesFound += checkTile(r+1 , c-1)
   minesFound += checkTile(r+1 , c)
   minesFound += checkTile(r+1 , c+1)
  
   if(minesFound > 0) {
    board[r][c].innerText = minesFound
    board[r][c].classList.add("x" + minesFound.toString())
   }
   else{
   checkMine(r-1,c-1)
   checkMine(r-1,c)
   checkMine(r-1,c+1)
   checkMine(r,c-1)
   checkMine(r,c+1)
   checkMine(r+1,c-1)
   checkMine(r+1,c)
   checkMine(r+1,c+1)
   }
   //win condition met (when area of space minus the mines total equals the "clicked" tiles)
   if(tilesClicked == rows*columns - minesCount) {
    alert("You Win")
   }
 }

//Check tile function goes here
//Checks to makes sure area clicked is on the board
 function checkTile(r,c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1
    }
    return 0
 }