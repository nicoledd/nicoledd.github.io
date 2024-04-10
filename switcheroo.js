const cells = document.querySelectorAll('button.buttonbox');

let gameOver = false;
let winner = "it's a tie!";
let turn = "red";

function move(id){
    const cell = document.getElementById(id);
    if (cell.childNodes.length == 0){
        if (turn == "red"){
            const b = document.createElement("span");
            b.setAttribute("class","red-piece");
            document.getElementById(id).appendChild(b);
            let env = getEnv(id);
            for (let i=0; i<env.length; i++){
                let envId = env[i];
                setColor(envId, turn);
            }
            turn = "black";
        }
        else if (turn == "black"){
            const b = document.createElement("span");
            b.setAttribute("class","black-piece");
            document.getElementById(id).appendChild(b);
            let env = getEnv(id);
            for (let i=0; i<env.length; i++){
                let envId = env[i];
                setColor(envId, turn);
            }
            turn = "red";
        }
    }
}



if (gameOver){
    winner = computeWinner(cells);
    alert("the winner is " + winner + "! Click out of this box to restart the game.")
    gameOver = false;
}


function setColor(id, turn){
    const cell = document.getElementById(id);
    if (cell.childNodes.length != 0){
        if (turn == "red"){
            document.getElementById(id).firstElementChild.setAttribute("class", "red-piece");
        }
        else if (turn == "black"){
            document.getElementById(id).firstElementChild.setAttribute("class", "black-piece");
        }
    }
}



function getEnv(id){
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

function computeWinner(cells){
    let numRedPieces = 0;
    let numBlackPieces = 0;
    for(let i=0; i<cells.length; i++){
        if (cells[i].getAttribute("class") == "red-piece"){
            numRedPieces++;
        }
        else if (cells[i].getAttribute("class") == "red-piece"){
            numBlackPieces++;
        }
    }
    if(numRedPieces > numBlackPieces){
        return "red"
    }
    else if(numBlackPieces > numRedPieces){
        return "black"
    }
    return "it's a tie!"
}