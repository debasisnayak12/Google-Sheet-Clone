const header = document.getElementById("header");
const sno = document.getElementById("sno");
const cellContainer = document.getElementById("body-container");

const columns = 26, rows = 50;

for(let i = 1; i <= columns; i++){
    const headCell = document.createElement("div");
    headCell.className = "head-cell";
    headCell.innerText = String.fromCharCode(64 + i);
    header.appendChild(headCell);
} 

for(let j = 1; j <= rows; j++){
    const snoCell = document.createElement("div");
    snoCell.innerText = j;
    snoCell.className = "sno-cell";
    sno.appendChild(snoCell);
}

for(let row = 1; row <= rows; row++){
    const rowElement = document.createElement("div");
    rowElement.className = "row";

    for(let col = 1; col <= columns; col++){
        const colElement = document.createElement("div");
        colElement.className = "cell";
        colElement.contentEditable = true;
        colElement.id = `${String.fromCharCode(64+col)}${row}`;
        rowElement.appendChild(colElement);
        colElement.addEventListener('focus',onFocusCellId);
        colElement.addEventListener('input', onChangeCellText);
    }
    cellContainer.appendChild(rowElement);
}