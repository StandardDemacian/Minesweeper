

const restartButton = document.getElementById("restart")
const gameBoard = document.getElementById("board")
const title = document.getElementById("title")
const clock = document.getElementById("timer")


let board = []
let rows = 8
let columns = 8 
// inconsistent horizontal whitespace
let minesCount = 8
let minesLocation = []

let tilesClicked = 0 //will be how we check win condition
let minesFound = 0
let gameOver = false


let seconds = 0
let timer = setInterval(upTimer, 1000)


function initilize(){ // miss spelled
    restartButton.style.visibility = "hidden"
    gameStart()
}

initilize() // see 25

function setMines() {
     let minesLeft = minesCount // bad indentation ( off a space )
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
    // inconsistent horizontal whitespace
    for (let r = 0; r < rows; r++){
    let row = [] // incorrect indentation, we are within the for loop of 49
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
        } // incorrect indentation, closes for loop of 51, as written should be to the left 1 tab( but should actually stay right where it is because the 51 for loop needs to move itself )
        board.push(row)
    }
}

function upTimer() {
	// inconsistent horizontal whitespace
	++seconds // indented an extra space
	let hour = Math.floor(seconds / 3600)
	let minute = Math.floor((seconds - hour * 3600) / 60)
	let updSecond = seconds - (hour * 3600 + minute * 60)
	clock.innerHTML = hour + ':' + minute + ':' + updSecond
	if ((gameOver = true)) {
		return // return what
	}

	// inconsistent horizontal whitespace
}

//placing flag function that is called in the tile event listener

function placeFlag () {

    let tile = this
    tile.innerHTML = `<i class="fa-solid fa-flag"></i>`
    tile.style.backgroundColor = "blue"
    tile.classList.add("tile-flagged")
    tile.classList.add("tile-clicked")

}


function clickTile () {
    let tile = this
    if (tile.classList.contains("tile-flagged")) // inconsistent styling choice here- match the rest of your if conditions 
    {return} // if i click on the tile flag shouldn't i be able to remove a the flag ?
    // would this make more sense as an else if below ?     
    if(minesLocation.includes(tile.id)) {
        title.innerText = "Kaboom! You've lost!"
        revealMines()
        gameOver=true
        endGame()
        return
    }
    // i like this solution a lot ! AND the comment <3
    let coordinates = tile.id.split("-") // takes in tile.id and removes the "-" and converts it to a an array that can be parseInt 
    let r = parseInt(coordinates[0])
    let c = parseInt(coordinates[1])
    checkMine(r,c)
}


// //Reveal Mines Function

function revealMines() {
    for(let r = 0; r < rows; r++) { // aren't we going about this the long way ? we already have an array with the mines locations, why not loop through that array and only get the tiles we need instead of checking every tile in the game
        for (let c = 0; c < columns; c++) { 
            let tile = board[r][c]
            if(minesLocation.includes(tile.id)){
                tile.innerHTML = `<i class="fa-solid fa-land-mine-on"></i>`
                 tile.style.backgroundColor = "red" // indented an extra space
            }
        }
    }
}

 //Make check Mine function

 function checkMine(r,c) {// indentation is off
// inconsistent horizontal whitespace
    if (r < 0 || r >= rows || c  < 0 || c >= columns) {
        return // love me some input validation 
    }
// this is to prevent my checkTile from rechecking tiles
    if(board[r][c].classList.contains("tile-clicked")) {
        return
    }
    
    board[r][c].classList.add("tile-clicked")
    tilesClicked += 1
// inconsistent horizontal whitespace
//Checks for mines in spaces, above, below and side to side of "clicked" tile
    let minesFound = 0 
   minesFound += checkSquare(r-1 , c-1) // indentation is off
   minesFound += checkSquare(r-1 , c)
   minesFound += checkSquare(r-1, c+1)
   minesFound += checkSquare(r , c-1)
   minesFound += checkSquare(r , c+1)
   minesFound += checkSquare(r+1 , c-1)
   minesFound += checkSquare(r+1 , c)
   minesFound += checkSquare(r+1 , c+1)
  
   if(minesFound > 0) {// indentation is off
    board[r][c].innerText = minesFound
    board[r][c].classList.add("x" + minesFound.toString())
   }
   else{// indentation is off
    checkMine(r-1,c-1) // consider a check adjacent higher order function to reduce the number of times you have to write out these function calls 8 times... function checkAdjacent(targetCell, checkFunction){ do the stuff...}
    checkMine(r-1,c)
    checkMine(r-1,c+1)
    checkMine(r,c-1)
    checkMine(r,c+1)
    checkMine(r+1,c-1)
    checkMine(r+1,c)
    checkMine(r+1,c+1)
   }// indentation is off
   //win condition met (when area of space minus the mines total equals the "clicked" tiles)
   if(tilesClicked == rows*columns - minesCount) {// indentation is off
    title.innerText = "Congratulations! You WIN!"
    gameOver=true
    endGame()
   }// indentation is off
 }// indentation is off

//Check tile function goes here
//Checks to makes sure area clicked is on the board
 function checkSquare(r,c) { // 175 says this should be check tile and i agree- you referenced the game cells as tiles throughout the app , don't change it up now! 
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1
    }
    return 0
 } // extra space


function reloadScreen() {
    window.location.reload() // this will do you NO favors in the future as it is ANATHEMA to SPA's : it's a fancy way of hitting the refresh button which is exactly what we want to avoid. write a reset function instead that leverages your initialize and resets the game with new clean values etc. 
}

 //Create End Game function that unhides reset button(which will have a listener to rerun gamesetup)
 // it needs to reveal the board and give the ability to reset the game

 function endGame() { // extra space
    if(gameOver == true) {
        clearInterval(timer)
        restartButton.style.visibility = "visible"
        restartButton.addEventListener("click", reloadScreen)
        // inconsistent white space
        
    }
    
 } // extra space
