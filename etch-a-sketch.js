/* !! Nodes, Elements, and Variables */
const sketchContainer = document.querySelector("div.sketch");
const cellSize = 16;

/* !! Functions */
function createSketchWindow(parentElem, numRows, numCol) {
  createRows(parentElem, numRows);
  const sketchRows = document.querySelectorAll("div.sketch>div");
  createCols(sketchRows, numCol);
  createListeners();
}

function createRows(parentElem, numRows) {
  for (let row = 0; row < numRows; row++) {
    let div = document.createElement("div");
    div.setAttribute("data-row", `${row}`);
    div.style.height = `${100 / numRows}%`;
    parentElem.appendChild(div);
  }
}

//parentElems is a nodelist of multiple rows
function createCols(parentElems, numCol) {
  parentElems.forEach((row) => {
    for (let col = 0; col < numCol; col++) {
      let div = document.createElement("div");
      div.setAttribute("data-column", `${col}`);
      row.appendChild(div);
    }
  });
}

function createListeners() {
  const rows = document.querySelectorAll("div[data-row]"); //Nodelist of all rows
  rows.forEach((row) => {
    createHoverListener(row.childNodes);
  });
}

function createHoverListener(rowList) {
  rowList.forEach((cell) => {
    cell.addEventListener("mouseover", (e) => {
      cell.style.backgroundColor = "black";
    });
  });
}

/* !! Execution */
createSketchWindow(sketchContainer, cellSize, cellSize);
