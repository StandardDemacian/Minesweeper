

const restartButton = document.getElementById("restart")
const gameBoard = document.getElementById("board")
const title = document.getElementById("title")
const clock = document.getElementById("timer")


let board = []
let rows = 8
let columns = 8 

let minesCount = 8
let minesLocation = []

let tilesClicked = 0 //will be how we check win condition
let minesFound = 0
let gameOver = false


let seconds = 0
let timer = setInterval(upTimer, 1000)


function initilize(){
    restartButton.style.visibility = "hidden"
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
        tile.addEventListener("contextmenu", function (e) { //removes that annoying menu while right clicking on the board
            e.preventDefault()
        })
        gameBoard.append(tile)
        row.push(tile)
        }
        board.push(row)
    }
}

function upTimer() {
    
     ++seconds
    let hour = Math.floor(seconds / 3600)
    let minute = Math.floor((seconds - hour * 3600) / 60)
    let updSecond = seconds - (hour * 3600 + minute * 60)
    clock.innerHTML = hour + ":" + minute + ":" + updSecond
    if(gameOver=true){
        return 
    }

    
    
}

//placing flag function that is called in the tile event listener

function placeFlag () {

    let tile = this
    tile.innerHTML = `<i class="fa-solid fa-flag"></i>`
    tile.classList.add("tile-flagged")
    tile.classList.add("tile-clicked")

}


function clickTile () {
    let tile = this
    if (tile.classList.contains("tile-flagged")){ 
        tile.innerHTML = ''
        tile.classList.remove("tile-flagged")
        tile.classList.remove("tile-clicked")
        return 
}
        
    if(minesLocation.includes(tile.id)) {
        title.innerText = "Kaboom! You've lost!"
        revealMines()
        gameOver=true
        endGame()
        return
    }
    
    let coordinates = tile.id.split("-") // takes in tile.id and removes the "-" and converts it to a an array that can be parseInt 
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
    title.innerText = "Congratulations! You WIN!"
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
        clearInterval(timer)
        restartButton.style.visibility = "visible"
        restartButton.addEventListener("click", reloadScreen)
       
        
    }
    
 }

