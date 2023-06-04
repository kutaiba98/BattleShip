
//Create default field
const CreateDefaultField = (defaultFieldSize) => {

    for (let i = 0; i < defaultFieldSize; i++) {
        let tr = document.createElement(`tr`)
        for (let j = 0; j < defaultFieldSize; j++) {
            let td = document.createElement(`td`)
            tr.append(td);
            tr.style.backgroundColor = "grey";
        }
        displayGrid.append(tr)
    }
}


//part 1 
//Create Battle Field According to the user's choice
let gameOver;

const CreateBattleField = (selecteFieldSize) => {
    if (gameOver == undefined) {
        btn.removeEventListener(`click`, CreateBattleField);
    }
    console.log(gameOver);
    gameOver = false;
    displayGrid.innerHTML = "";
    for (let i = 0; i < selecteFieldSize; i++) {
        let tr = document.createElement(`tr`)
        for (let j = 0; j < selecteFieldSize; j++) {
            let td = document.createElement(`td`)
            td.classList.add("cell");
            // tr.style.backgroundColor = "grey";        
            td.classList.toggle("bgTdStyle")
            td.value = i;
            tr.append(td);
        }
        displayGrid.append(tr)
    }
    cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener(`click`, HitTheTarget);
    });
}



//Global Variables
let shipPositions = new Array();
let tableArray;
let numOfShipsSunk = 0;
let bulletsLeft = 60;
let numOfShipsPlaced;


//Creating a matrix + creating randim valuse for the position of the ship random row and random column
// and random direction (up/down/left/right).

const CreatField = () => {
    if (sumOfShips < 1 || sumOfShips > 11) {
        return;
    }
    let rows = selecteFieldSize;
    let cols = selecteFieldSize;
    tableArray = new Array(selecteFieldSize);
    console.log(selecteFieldSize);
    for (let i = 0; i < rows; i++) {
        tableArray[i] = new Array(selecteFieldSize)
        for (let j = 0; j < cols; j++) {
            tableArray[i][j] = "w";
        }

    }
    numOfShipsPlaced = 0;
    shipPositions[numOfShipsPlaced] = new Array(4);
    while (numOfShipsPlaced != sumOfShips) {
        let randomRow = Math.floor(Math.random() * ((rows - 1)));// גודל הלוח פחות 1
        let randomCol = Math.floor(Math.random() * ((cols - 1)));
        let direction = RandomDirection();
        shipSize = sumOfShipsArray[numOfShipsPlaced];//
        if (PlaceShipUpOrDown(randomRow, randomCol, direction, shipSize)) {
            numOfShipsPlaced += 1;//
        }
    }
    console.log(tableArray);
}

//creating random direction for the position of the ship (up/down/left/right)
const RandomDirection = () => {
    let randomPlace = new Array("up", "down", "right", "left");
    let place = randomPlace[Math.floor(Math.random() * 4)];
    return place;
}


//The function checks that there is no deviation in the position we want to place the ship.
const PlaceShipUpOrDown = (row, col, direction, length) => {
    let startRow = row;//
    let endRow = row + 1;
    let startCol = col;//
    let endCol = col + 1;
    //
    if (direction == "left") {
        if (col - length < 0) {
            return false
        }
        startCol = col - length + 1;
    }
    else if (direction == "right") {
        if (col + length >= selecteFieldSize) {
            return false
        }
        endCol = col + length;
    }
    else if (direction == "up") {
        if (row - length < 0) {
            return false
        }
        startRow = row - length + 1;
    }
    else if (direction == "down") {
        if (row + length >= selecteFieldSize) {
            return false
        }
        endRow = row + length;
    }
    // console.log(startRow)
    // console.log(endRow)
    // console.log(startCol)
    // console.log(endCol)
    return PlaceShip(startRow, endRow, startCol, endCol)///
}


//בודק שאין ספינות מוצבות במיקום שנשלח לו
//Placing the ships in the matrix 
let placeIndex = 0;
const PlaceShip = (startRow, endRow, startCol, endCol) => {
    let allValid = true;
    console.log(allValid);
    for (let indexR = startRow; indexR < endRow; indexR++) {
        for (let indexC = startCol; indexC < endCol; indexC++) {
            if (tableArray[indexR][indexC] != "w") {
                allValid = false;
                // console.log(allValid);
                break;
            }
            else if (startRow + 1 == endRow && startCol > 0 && tableArray[indexR][indexC - 1] != "w") {
                allValid = false;
                // console.log(allValid);
                break;
            }
            else if (startRow + 1 == endRow && startCol < tableArray.length - 1 && tableArray[indexR][indexC + 1] != "w") {
                allValid = false;
                // console.log(allValid);
                break;
            }
            else if (startCol + 1 == endCol && startRow > 0 && tableArray[indexR - 1][indexC] != "w") {
                allValid = false;
                // console.log(allValid);
                break;
            }
            else if (startCol + 1 == endCol && startRow < tableArray.length - 1 && tableArray[indexR + 1][indexC + 1] != "w") {
                allValid = false;
                // console.log(allValid);
                break;
            }
        }

    }
    if (allValid) {
        shipPositions[placeIndex++] = [startRow, endRow, startCol, endCol]
        for (let indexR = startRow; indexR < endRow; indexR++) {
            for (let indexC = startCol; indexC < endCol; indexC++) {
                tableArray[indexR][indexC] = "s";
                console.log(tableArray[indexR][indexC]);
            }
        }
    }
    console.log(tableArray);
    console.log(shipPositions);
    return allValid;
}

//part 2

//Function that checks if we hit a ship
const HitTheTarget = (event) => {
    console.log(gameOver);
    let hitRow = event.target.value;;//
    let hitCol = event.target.cellIndex;//
    event.target.removeEventListener(`click`, HitTheTarget)
    console.log(`balalalalal`)
    if (tableArray[hitRow][hitCol] == "w") {
        tableArray[hitRow][hitCol] = "m"; //miss the target
        event.target.style.backgroundColor = 'blue';
    }
    else if (tableArray[hitRow][hitCol] == "s")//
    {
        console.log(tableArray[hitRow][hitCol])
        tableArray[hitRow][hitCol] = "h"; //hit the target
        console.log(tableArray[hitRow][hitCol])
        event.target.style.backgroundColor = 'orange';
        //console.log(CheckIfShipSunk(hitRow, hitCol));////////////////
        if (CheckIfShipSunk(hitRow, hitCol)) {
            numOfShipsSunk += 1;
            shipSunk.src = "gif/Burnnnn.gif";
            boomAudio.play();
            setTimeout(() => {
                shipSunk.src = "#";
            }, 1000);
            CheckIfGameIsOver();
        }
    }
    bulletsLeft -= 1;
}

//function that checks if the entire ship sunk.
const CheckIfShipSunk = (row, col) => {
    let shipLength = 0;
    for (let i = 0; i < sumOfShips; i++) {

        let startingRow = shipPositions[i][0];
        let endingRow = shipPositions[i][1];
        let startingCol = shipPositions[i][2];
        let endingCol = shipPositions[i][3];
        // console.log(`r = ${row}: c = ${col}`)
        // console.log(`sr = ${startingRow} er = ${endingRow} sc = ${startingCol} ec = ${endingCol}`)
        // console.log(startingRow <= row && row <= endingRow && startingCol <= col && col <= endingCol)
        if (startingRow <= row && row < endingRow && startingCol <= col && col < endingCol)///
        {
            for (let j = startingRow; j < endingRow; j++) {
                for (let k = startingCol; k < endingCol; k++) {
                    // console.log(tableArray[j][k] != "h")
                    if (tableArray[j][k] != "h") {
                        return false;
                    }
                    shipLength++;
                }
            }
        }
    }
    console.log(`boםm  =  ${shipLength}`)
    UpdateRemainingShips(shipLength)
    return true;
}



//function that updates the amount of ships sunk according to the size of the ship
const UpdateRemainingShips = (sizOfShip) => {
    console.log(`length:${sizOfShip}`);
    switch (sizOfShip) {
        case 2:
            sumOfShipsSize2.innerHTML -= 1;
            break;
        case 3:
            sumOfShipsSize3.innerHTML -= 1;
            break;
        case 4:
            sumOfShipsSize4.innerHTML -= 1;
            break;
        case 5:
            sumOfShipsSize5.innerHTML -= 1;
            break;
    }
}


//Function that checks if we have sunk all the ships
const CheckIfGameIsOver = () => {
    console.log(`${numOfShipsSunk} == ${numOfShipsPlaced}`);
    if (numOfShipsPlaced == numOfShipsSunk) {
        gameOver = true;///////////////////////////
        cells.forEach((cell) => {
            cell.removeEventListener(`click`, HitTheTarget);
        });
        setTimeout(() => {
            shipSunk.src = "gif/download.gif";
            finalAudio.play();
        }, 3000);
        setTimeout(() => {
            shipSunk.src = "#";
        }, 8500);
        setTimeout(() => {
            gameIsOver.innerHTML = "GAME OVER";
        }, 8800);
        // gameIsOver.src="gif/download.gif";
        // finalAudio.play();
    }
    else if (bulletsLeft == 0) {
        gameOver = true;
    }
    // shipSunk.src="#";
}


