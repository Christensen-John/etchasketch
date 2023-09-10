/* !! Nodes, Elements, and Variables */
const sketch = document.querySelector("div.sketch");
const rowContainer = document.querySelector("div.row-container");
const eraseButton = document.querySelector("button#erase");
const resizeField = document.querySelector("input#sizeInputField");
const resizeButton = document.querySelector("button#sizeInputButton");
const sketchSize = 960;
const defaultCellCount = 16;
let cellCount = defaultCellCount;

/* !! Functions */
//For first time setup
function setup() {
  //Setup sketch area
  sketch.style.height = `${sketchSize}px`;
  sketch.style.width = `${sketchSize}px`;

  //setup Menu functionality
  addEraserListener(eraseButton);
  addResizeListener(resizeButton);

  //Setup sketch area
  setupRowContainer(defaultCellCount);
}

function clear() {
  let cells = document.querySelectorAll("div.cell");
  cells.forEach((cell) => {
    cell.classList.remove("drawn");
  });
}

function setupRowContainer(size) {
  //Create column of rowDivs, each with the same number of cells
  for (let i = 0; i < size; i++) {
    let rowDiv = createRow(i, size);
    rowContainer.appendChild(rowDiv);
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

  //Moved cell size to a custom function
  cell.style.width = `${sketchSize / sizeFactor}px`;
  cell.style.height = `${sketchSize / sizeFactor}px`;
  addHoverListener(cell);
  return cell;
}

function increaseSketchSize(newSize) {
  newSize = Number(newSize);
  //Get the info:
  let newCellSize = sketchSize / newSize;

  //Loop from 0 up to newSize. This goes through all rows
  for (let rowLoopVariable = 0; rowLoopVariable < newSize; rowLoopVariable++) {
    //If there is an old row
    if (newSize === cellCount) {
      console.warn(`No change was made to size since the value is the same`);
    } else if (rowLoopVariable < cellCount) {
      //Get the cells to update the sizes:
      let currentRow = document.querySelector(
        `[data-row="${rowLoopVariable}"]`
      );

      //Loop through each of the cells and update the size
      currentRow.childNodes.forEach((cell) => {
        cell.style.width = `${newCellSize}px`;
        cell.style.height = `${newCellSize}px`;
      });

      //2-b append new cells
      for (
        let additionalColumns = cellCount;
        additionalColumns < newSize;
        additionalColumns++
      ) {
        currentRow.appendChild(
          createCell(rowLoopVariable, additionalColumns, newSize)
        );
      }
    }
    //else a new one needs to be created
    else {
      let row = createRow(rowLoopVariable, newSize);
      rowContainer.appendChild(row);
    }
  }

  //Update cellCount to match the new size
  cellCount = newSize;
}

function shrinkSketchSize(newSize) {
  newSize = Number(newSize);
  //calculate new cellSize
  let newCellSize = sketchSize / newSize;

  //Loop from the last row to the first, removing rows and cells as needed
  for (
    let rowLoopVariable = cellCount - 1;
    rowLoopVariable >= 0;
    rowLoopVariable--
  ) {
    //Get parent row. It will either be removed or have child nodes removed from it
    let currentRow = document.querySelector(`[data-row="${rowLoopVariable}"]`);
    if (rowLoopVariable < newSize) {
      //update size of cells in the row
      //Remove cells from end of row
      let cellArray = Array.from(currentRow.childNodes).slice(0, newSize);
      currentRow.innerHTML = "";
      cellArray.forEach((cell) => {
        cell.style.width = `${newCellSize}px`;
        cell.style.height = `${newCellSize}px`;
        currentRow.appendChild(cell);
      });
    } else {
      rowContainer.removeChild(currentRow);
    }
  }
  //Update cellCount to match the new size
  cellCount = newSize;
}

/* !! Listener Functions*/
function addHoverListener(cell) {
  cell.addEventListener("mouseover", () => {
    cell.classList.add("drawn");
  });
}

function addResizeListener(button) {
  button.addEventListener("click", () => {
    //Get the value from the field
    let newSize = Number(resizeField.value);

    //Choose correct action based on input value
    if (newSize === cellCount) {
      console.warn("New size value needs to be different from current size");
    } else if (newSize > cellCount) {
      increaseSketchSize(newSize);
    } else {
      shrinkSketchSize(newSize);
    }
  });
}

function addEraserListener(button) {
  button.addEventListener("click", clear);
}

function addResetSizeListener(button) {
  button.addEventListener("click", () => {
    if (cellCount === defaultCellCount) {
      console.warn("Sketch is already at the default size!");
    } else if (cellCount < defaultCellCount) {
      increaseSketchSize(defaultCellCount);
    } else {
      shrinkSketchSize(defaultCellCount);
    }
  });
}

/* !! Execution */
setup();
