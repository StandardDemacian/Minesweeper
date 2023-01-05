

const restartButton = document.getElementById("restart")
const gameBoard = document.getElementById("board")


let board = []
let rows = 8
let columns = 8 

let minesCount = 8
let minesLocation = []

let tilesClicked = 0
let minesFound = 0
let gameOver = false
let flag = false



function initilize(){
    restartButton.style.visibility = 'hidden'
    gameStart()
}

initilize()

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
}


//placing flag function that is called in the tile event listener

function placeFlag () {
 flag = true
 let tile = this
 tile.innerHTML = `<i class="fa-solid fa-flag"></i>`
 tile.style.backgroundColor = "blue"
 tile.classList.add("tile-flagged")
 tile.classList.add("tile-clicked")
 
}


function clickTile () {
    let tile = this
    if (tile.classList.contains("tile-flagged"))
    {return}
        
    if(minesLocation.includes(tile.id)) {
        alert("KABOOM")
        revealMines()
        gameOver=true
        endGame()
        return
    }
    
    let coordinates = tile.id.split("-") // takes in tile.id and removes the "-" and converts it to a an array
    let r = parseInt(coordinates[0])
    let c = parseInt(coordinates[1])
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
// this is to prevent my checkTile from rechecking tiles
    if(board[r][c].classList.contains("tile-clicked")) {
        return
    }
    
    board[r][c].classList.add("tile-clicked")
    tilesClicked += 1

//Checks for mines in spaces, above, below and side to side of "clicked" tile
    let minesFound = 0 
   minesFound += checkSquare(r-1 , c-1)
   minesFound += checkSquare(r-1 , c)
   minesFound += checkSquare(r-1, c+1)
   minesFound += checkSquare(r , c-1)
   minesFound += checkSquare(r , c+1)
   minesFound += checkSquare(r+1 , c-1)
   minesFound += checkSquare(r+1 , c)
   minesFound += checkSquare(r+1 , c+1)
  
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
    gameOver=true
    endGame()
   }
 }

//Check tile function goes here
//Checks to makes sure area clicked is on the board
 function checkSquare(r,c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1
    }
    return 0
 }


function reloadScreen() {
    window.location.reload()
}

 //Create End Game function that unhides reset button(which will have a listener to rerun gamesetup)
 // it needs to reveal the board and give the ability to reset the game

 function endGame() {
    if(gameOver == true) {
        
        restartButton.style.visibility = "visible"
        restartButton.addEventListener("click", reloadScreen)
        
        
    }
    
 }

