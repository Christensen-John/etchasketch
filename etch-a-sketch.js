/* !! Nodes, Elements, and Variables */
const sketch = document.querySelector("div.sketch");
const cellContainer = document.querySelector("div.cell-container");
const resetButton = document.querySelector("button#reset");
const resizeField = document.querySelector("input#sizeInputField");
const resizeButton = document.querySelector("button#sizeInputButton");
const sketchSize = 960;
let cellCount = 16;

/* !! Functions */
//For first time setup
function setup() {
  //Setup sketch area
  sketch.style.height = `${sketchSize}px`;
  sketch.style.width = `${sketchSize}px`;

  //Attempt #2
  createCellContainer(cellCount);
}

function clear() {}

function createCellContainer(size) {
  //Create column of rowDivs, each with the same number of cells
  for (let i = 0; i < size; i++) {
    let rowDiv = createRow(i, size);
    cellContainer.appendChild(rowDiv);
  }
}

function createRow(row, size) {
  let div = document.createElement("div");
  div.classList.add("row");
  div.setAttribute("data-row", `${row}`);
  for (let i = 0; i < size; i++) {
    let cell = createCell(row, i, size);
    div.appendChild(cell);
  }
  return div;
}

/*
  sizeFactor is not named size since it only factors 
  into the size of the cell, it is not the size of the 
  cell itself.
*/
function createCell(row, col, sizeFactor) {
  let cell = document.createElement("div");
  cell.classList.add("cell"); //Give each cell a unique set of identifiers
  // cell.setAttribute(`data-row`, `${row}`); //Moved to the row div
  cell.setAttribute(`data-column`, `${col}`);
  cell.style.width = `${sketchSize / sizeFactor}px`;
  cell.style.height = `${sketchSize / sizeFactor}px`;
  addHoverListener(cell);
  return cell;
}

// function drawFrame(cellCnt) {
//   if (cellCnt > cellCount) {
//     growSketchGrid(cellCnt);
//   } else if (cellCnt < cellCount) {
//     shrinkSketchGrid(cellCnt);
//   } else {
//     console.alert("The cell count was not changed");
//   }
// }

// function resizeSketchWindow(newSize) {
//   /*
//   If size is smaller than cellCount call shrink.
//   Else, call grow
//   */
// }

// function shrinkSketchGrid(newSize) {
//   /*
//   Save a slice of the nodeList. Turn into array.
//   Clear screen.
//   Change CSS style width and height to resize existing cells to fit into sketch frame
//   add elements of array back into sketchFrame
//   */
// }

// function growSketchGrid(newSize) {
//   let cellList = document.querySelectorAll("div.cell");
//   if(cellList.length === 0) {
//     //NodeList is empty. Create a new one
//     for(let i = 0; i < newSize; i++) {
//       for(let j = 0; j < newSize; j++) {
//         let div = document.createAttribute('div');
//       }
//     }
//   } else {
//     //Node list is not empty, add to the previous one
//     //Loop from end. Every index+1 % cellCount add the required new divs
//     //Every other index, resize the cell
//   }
/*
  Loop 1: 0 up to cellCount
  Change CSS style width and height to resize existing cells to fit into sketch frame

  Loop Part 2:
  Start loop at cellCount (16 by default), loop until growthFactor - cellCount
  Create new cells
  */

//   //Loop through all previous cells
//   for (let row = 0; row < newSize; row++) {
//     for (let col = 0; col < newSize; col++) {
//       //Create a new cell
//       let cell = document.createElement("div");
//       setCellAttribute(cell, row, col);
//       sketchFrame.appendChild(div);
//     }
//   }
// }

// function setCellAttribute(cell, row, col, cellCnt) {
//   //Set the size of each cell to fit evenly in the sketch
//   //Add the mouseover listener to each cell, prevents the need to loop over all cells twice.
//   cellHoverListener(cell);
// }

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
//     createSketchWindow(sketchFrame, resolution, resolution);
//   });
// }

/* !! Listener Functions*/
function addHoverListener(cell) {
  cell.addEventListener("mouseover", () => {
    cell.classList.add("drawn");
  });
}

function addResizeListener(button) {
  button.addEventListener("click", () => {
    let newSize = resizeField.value;
    //FINISH:
    //Need to call the drawFrame with new cells added
  });
}

/* !! Execution */
setup();
