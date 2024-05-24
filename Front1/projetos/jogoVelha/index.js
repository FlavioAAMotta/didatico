const divTable = document.getElementById("table");
const divPoints = document.getElementById("points");
const divStatus = document.getElementById("status");


let currentPlayer = "❌";
const sCol = 3, sLin = 3;
let xWins = 0, oWins = 0, drawWins = 0;
let hasWinner = false;
let table = [];



createTable(3, 3);

function createTable() {
    for (let col = 0; col < sCol; col++) {
        for (let lin = 0; lin < sLin; lin++) {

            if (!table[col + lin * 3]) {
                table[col + lin * 3] = "";
            }

            const block = document.createElement("div");
            block.textContent = table[col + lin * 3];
            block.setAttribute("class", "block");

            block.addEventListener("click", () => blockClick(currentPlayer, block, col, lin));

            divTable.appendChild(block);
        }
    }
    divStatus.textContent = `Vez do ${currentPlayer}`;
    divPoints.textContent = `Pontos -- X: ${xWins} | O: ${oWins} | Empate: ${drawWins}`;
}


function blockClick(player, grid, x, y) {

    if (grid.textContent == "" && !hasWinner) {
        grid.textContent = player;
        table[x + y * 3] = player;
        currentPlayer = currentPlayer == "❌" && "⭕" || "❌";
        divStatus.textContent = `Vez do ${currentPlayer}`;
        checkWin(player);
    }
}


function checkWin(player) {
    let winText = "";
    for (let w = 0; w < winsForms.length; w++) {
        if (table[winsForms[w][0] - 1] == player &&
            table[winsForms[w][1] - 1] == player &&
            table[winsForms[w][2] - 1] == player) {
            console.log("PLAYER: ", player, "GANHOU!!");

            if (player == "❌") {
                xWins++;
                winText = "❌ Ganhou";
            } else if (player == "⭕") {
                oWins++;
                winText = "⭕ Ganhou";

            }
            hasWinner = true;

            divStatus.textContent = winText;
        }
    }

    if (!table.includes("") && !hasWinner) {
        hasWinner = true;
        drawWins++;
        winText = "EMPATE";

        divStatus.textContent = winText;
    }
    divPoints.textContent = `Pontos -- X: ${xWins} | O: ${oWins} | Empate: ${drawWins}`;

}

function resetGame() {
    table = [];
    for (let col = 0; col < sCol; col++) {
        for (let lin = 0; lin < sLin; lin++) {

            table[col + lin * 3] = "";
        }
    }

    const blocks = document.getElementsByClassName("block");
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].textContent = "";
    }

    hasWinner = false;
    currentPlayer = "❌";
    divStatus.textContent = `Vez do ${currentPlayer}`;
}

// Validar vitórias
const winsForms = [

    // Linhas
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],

    // Colunas
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3],

    // Diagonais
    [1, 5, 9],
    [3, 5, 7]
];