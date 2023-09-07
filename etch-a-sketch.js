/* !! Nodes, Elements, and Variables */
const sketchContainer = document.querySelector("div.sketch");
const resetButton = document.querySelector("button#reset");
const resInField = document.querySelector("input#sizeInputField");
const resInButton = document.querySelector("button#sizeInputButton");
const defaultCellSize = 16;
const sketchSize = 960;

/* !! Functions */
function setup() {
  //Setup sketch area
  sketchContainer.style.height = `${sketchSize}px`;
  sketchContainer.style.width = `${sketchSize}px`;
  drawWindow(defaultCellSize, defaultCellSize);

  //Setup Listeners
  cellHoverListener(document.querySelectorAll(".cell"));
}

function drawWindow(numRows, numCol) {
  sketchContainer.innerHTML = "";
  for (let rows = 0; rows < numRows; rows++) {
    for (let cols = 0; cols < numCol; cols++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute(`data-row`, `${rows}`);
      cell.setAttribute(`data-column`, `${cols}`);
      cell.style.width = `${sketchSize / numRows}px`;
      cell.style.height = `${sketchSize / numCol}px`;
      sketchContainer.appendChild(cell);
    }
  }
}

// function createRows(parentElem, numRows) {
//   for (let row = 0; row < numRows; row++) {
//     let div = document.createElement("div");
//     div.setAttribute("data-row", `${row}`);
//     div.style.height = `${100 / numRows}%`;
//     parentElem.appendChild(div);
//   }
// }

// //parentElems is a nodelist of multiple rows
// function createCols(parentElems, numCol) {
//   parentElems.forEach((row) => {
//     for (let col = 0; col < numCol; col++) {
//       let div = document.createElement("div");
//       div.setAttribute("data-column", `${col}`);
//       row.appendChild(div);
//     }
//   });
// }

// function createListeners() {
//   const rows = document.querySelectorAll("div[data-row]"); //Nodelist of all rows
//   rows.forEach((row) => {
//     createHoverListener(row.childNodes);
//   });
//   resetButton.addEventListener("click", () => {
//     let cells = document.querySelectorAll("div[data-column");
//     cells.forEach((cell) => {
//       cell.style.backgroundColor = "white";
//     });
//   });
//   resInButton.addEventListener("click", () => {
//     let resolution = resInField.value;
//     console.log(resolution);
//     createSketchWindow(sketchContainer, resolution, resolution);
//   });
// }

/* !! Listeners */
function cellHoverListener(cellList) {
  cellList.forEach((cell) => {
    cell.addEventListener("mouseover", (e) => {
      cell.classList.add("drawn");
    });
  });
}

/* !! Execution */
setup();
