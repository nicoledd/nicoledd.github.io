let numTurns = 0;
let numRedPieces = 2;
let numBlackPieces = 2;
let turn = 'red';

const delay = ms => new Promise(res => setTimeout(res, ms));

function hoverOn(id){
    const cell = document.getElementById(id);
    cell.style.borderRadius='14px'
    cell.style.transform='scale(1.1) perspective(1px)'
    if (cell.childNodes.length != 0){
        return
    }
    const b = document.createElement("span");
    b.setAttribute("class","red-piece-hover");
    document.getElementById(id).appendChild(b);
}

function hoverOff(id){
    const cell = document.getElementById(id);
    cell.style.borderRadius='0px'
    cell.style.transform='none'
    const child = cell.firstChild
    if(child.getAttribute('class') == 'red-piece-hover'){
        document.getElementById(id).removeChild(child)
    }
}


function move(id){
    moveAsync(id);
}

const moveAsync = async(id) => {
    const cell = document.getElementById(id);
    const child = cell.firstChild;
    if(child.getAttribute('class') != 'red-piece-hover'){
        return
    }
    if(turn == 'black'){
        return
    }
    document.getElementById(id).removeChild(child)
    redTurn(id)
    numTurns++;
    numRedPieces++;
    document.getElementById('red-score').innerHTML = numRedPieces.toString();
    document.getElementById('black-score').innerHTML = numBlackPieces.toString();
    if (numTurns == 60){
        computeWinner();
    }
    turn = 'black';
    document.getElementById('turn-text').innerHTML = "It is the opponent's turn";
    await delay(500)
    document.getElementById('turn-text').innerHTML = "It is the opponent's turn.";
    await delay(500)
    document.getElementById('turn-text').innerHTML = "It is the opponent's turn..";
    await delay(500)
    document.getElementById('turn-text').innerHTML = "It is the opponent's turn...";
    await delay(500)
    blackTurn()
    numTurns++;
    numBlackPieces++;
    document.getElementById('black-score').innerHTML = numBlackPieces.toString();
    document.getElementById('red-score').innerHTML = numRedPieces.toString();
    document.getElementById('turn-text').innerHTML = 'It is your turn! Go ahead!';
    if (numTurns == 60){
        computeWinner();
    }
    turn = 'red';
}



function redTurn(id){
    const b = document.createElement("span");
    b.setAttribute("class","red-piece");
    document.getElementById(id).appendChild(b);
    let env = getSurroundingCells(id);
    for (let i=0; i<env.length; i++){
        let id = env[i];
        const cell = document.getElementById(id);
        if (cell.childNodes.length == 0){
            continue
        }
        if(cell.firstChild.getAttribute('class') == 'red-piece'){
            continue
        }
        document.getElementById(id).firstElementChild.setAttribute("class", "red-piece");
        numBlackPieces--;
        numRedPieces++;
    }
}


function blackTurn(){
    id = computeBlackMove()
    const b = document.createElement("span");
    b.setAttribute("class","black-piece");
    if(document.getElementById(id).childNodes.length != 0){
        let child = document.getElementById(id).firstChild
        document.getElementById(id).removeChild(child)
    }
    document.getElementById(id).appendChild(b);
    let env = getSurroundingCells(id);
    for (let i=0; i<env.length; i++){
        let id = env[i];
        const cell = document.getElementById(id);
        if (cell.childNodes.length == 0){
            continue
        }
        if (cell.firstChild.getAttribute('class') == 'black-piece'){
            continue;
        }
        numRedPieces--;
        numBlackPieces++;
        document.getElementById(id).firstElementChild.setAttribute("class", "black-piece");
    }
}


function getSurroundingCells(id){
    let env = [];
    if (id%8 != 0){
        env.push(id-1);
    }
    if ((id+1)%8 != 0){
        env.push(id+1);
    }
    if (id >= 8){
        env.push(id-8);
    }
    if (id <= 63-8){
        env.push(id+8);
    }
    return env;
}



const computeWinner = async() => {
    let statement = ''
    if(numRedPieces > numBlackPieces){
        statement = "Red wins! Click out of this box and reload page to replay"
    }
    else if(numBlackPieces > numRedPieces){
        statement = "Black wins! Click out of this box and reload page to replay"
    }
    else{
        statement = "It's a tie!";
    } "It's a tie!"
    await delay(500);
    alert(statement)
}







function computeBlackMove(){
    let probability = []

    for(let id=0; id<64; id++){
        cell = document.getElementById(id);
        if (cell.childNodes.length > 0 && cell.firstChild.getAttribute('class') == 'black-piece'){
            probability.push(0)
            continue
        }
        if (cell.childNodes.length > 0 && cell.firstChild.getAttribute('class') == 'red-piece'){
            probability.push(0)
            continue
        }
        let env = getSurroundingCells(id);
        let numRedCells = getNumRedCells(env);
        probability.push(numRedCells)
    }
    //let retId = sampleFromDistribution(probability);
    let retId = 0;
    let allMaxArr = []
    let maxNum = 0;
    for (let id=0; id<64; id++){
        if(probability[id] > maxNum){
            maxNum = probability[id]
        }
    }
    for (let id=0; id<64; id++){
        if(probability[id] == maxNum){
            allMaxArr.push(id)
        }
    }
    let min = 0
    let max = allMaxArr.length-1
    let randNum = Math.floor(Math.random() * (max - min + 1)) + min
    retId = allMaxArr[randNum]
    return retId
}

/*
function sampleFromDistribution(arr){
    let cumulative = [0]
    let sum = 0
    for (let i=0; i<arr.length; i++){
        sum += arr[i]
        cumulative.push(sum)
    }
    min = 0
    max = cumulative[cumulative.length - 1]
    let randNum = Math.random() * (max - min) + min;
    let idx = computeRange(randNum,cumulative)
    return idx
}


function computeRange(val, arr){
    for (let i=0; i<arr.length; i++){
        if (i == arr.length - 1){
            return i
        }
        if(val >= arr[i] && val < arr[i+1]){
            return i
        }
    }
}*/

function getNumRedCells(env){
    let num = 0
    for(let i=0; i<env.length; i++){
        let id = env[i];
        const cell = document.getElementById(id)
        if (cell.childNodes.length == 0){
            continue
        }
        if (cell.firstChild.getAttribute('class') == 'red-piece'){
            num++;
        }
    }
    return num
}