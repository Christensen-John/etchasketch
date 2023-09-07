/* !! Nodes, Elements, and Variables */
const sketchContainer = document.querySelector("div.sketch");

/* !! Functions */
function createSketchWindow(parentElem, numRows, numCol) {
  createRow(parentElem, numRows);
  createCol(parentElem, numCol);
}

function createRow(parentElem, numRows) {
  for (let row = 0; row < numRows; row++) {
    let div = document.createElement("div");
    div.setAttribute("data-row", `${row}`);
  }
}

/* !! Execution */
