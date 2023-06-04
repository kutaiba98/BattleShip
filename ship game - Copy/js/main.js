//part 1 //Global variables to create a primary board
let defaultFieldSize = document.querySelector('input[type="radio"]:checked').value;
let displayGrid = document.querySelector(`#displayGrid`);
CreateDefaultField(defaultFieldSize);

//part2 //Global variables to create a board According to the user's choice
const btn = document.querySelector('#startBattle');
const fieldSize = document.querySelectorAll('input[name="gridSize"]');
let selecteFieldSize;

//part3 //Global variables for ship size and information.
let sumOfShips;//
let sumOfShipsPerSizeArray = new Array(4);//
let sumOfShipsArray = [];//
let size2 = document.querySelector('#size2');
let size3 = document.querySelector('#size3');
let size4 = document.querySelector('#size4');
let size5 = document.querySelector('#size5');

let sumOfShipsSize2 = document.querySelector('#sumShipsSize2');
let sumOfShipsSize3 = document.querySelector('#sumShipsSize3');
let sumOfShipsSize4 = document.querySelector('#sumShipsSize4');
let sumOfShipsSize5 = document.querySelector('#sumShipsSize5');
///////
let counter= 0;
btn.addEventListener("click", () => {
    if (counter > 0)
    {
        document.location.reload(true);
    }
});

btn.addEventListener("click", () => {
    counter++;
    sumOfShips =(parseInt(size2.value)+parseInt(size3.value)+parseInt(size4.value)+parseInt(size5.value));
    if (sumOfShips < 1 || sumOfShips > 11)
    {
        alert(`You must enter a proper number of ships. There must be at least one ship and no more than 11 ships.`);
        document.location.reload(true);
        return;
    }
    sumOfShipsSize2.innerHTML = size2.value;
    sumOfShipsSize3.innerHTML = size3.value;
    sumOfShipsSize4.innerHTML = size4.value;
    sumOfShipsSize5.innerHTML = size5.value;
    console.log(`sum Of Ships ${sumOfShips}`);
    sumOfShipsPerSizeArray = [parseInt(size2.value),parseInt(size3.value),parseInt(size4.value),parseInt(size5.value)];
    console.log(sumOfShipsPerSizeArray);
    let i = 0;//
    let temp =0;//
    for (let index = 0; index < sumOfShips; ) {
        while((sumOfShipsPerSizeArray[i] + temp) > index  )
        {
            sumOfShipsArray[index] = i+2;
            index++;
        }
        temp += sumOfShipsPerSizeArray[i];
        i++;
    }
    console.log(sumOfShipsArray);
});


btn.addEventListener("click", () => {
    if (sumOfShips < 1 || sumOfShips > 11)
    {        
        return;
    }
    displayGrid.innerHTML= "";
    for (const item of fieldSize) {
        if (item.checked) {
            selecteFieldSize = item.value;   
            console.log(selecteFieldSize)
            CreateBattleField(selecteFieldSize)      
            break;
        }
    }
})


//part 4
let cells;

//part5

btn.addEventListener("click",CreatField);

let boomAudio = new Audio('audio/Atom Bomb Sound.mp3');
let finalAudio = new Audio('audio/Rifle-Automatic-Fire-A-www.fesliyanstudios.com.mp3');

let shipSunk = document.querySelector(`#shipSunk`);
let gameIsOver = document.querySelector(`#gameOver`);

