/* !! Nodes, Elements, and Variables */
const sketch = document.querySelector("div.sketch");
const rowContainer = document.querySelector("div.row-container");
const eraseButton = document.querySelector("button#erase");
const resizeField = document.querySelector("input#sizeInputField");
const resizeButton = document.querySelector("button#sizeInputButton");
const resetButton = document.querySelector("button#reset");
const sketchSize = 960;
const defaultCellCount = 16;
let cellCount = defaultCellCount;
const drawnCells = {};

//CSS Stylesheet test and creation
let stylesheet = new CSSStyleSheet();
document.adoptedStyleSheets = [stylesheet];
stylesheet.insertRule(
  `div.cell{width: ${sketchSize / cellCount}px; height: ${
    sketchSize / cellCount
  }px;}`
);
// TODO:
// Create an object of to hold drawn cells. Keys are rows, values are arrays and hold the columns.
// This way only looping through the drawn cell object arrays is necessary when changing size
// Update cell creation to remove the size. Only set row column information

/* !! Functions */
//For first time setup
function setup() {
  //Setup sketch area
  sketch.style.height = `${sketchSize}px`;
  sketch.style.width = `${sketchSize}px`;

  //setup Menu functionality
  addEraserListener(eraseButton);
  addResizeListener(resizeButton);
  addResetListener(resetButton);

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

function updateCellSizeCSS() {
  stylesheet.deleteRule(0);
  stylesheet.insertRule(
    `div.cell{width: ${sketchSize / cellCount}px; height: ${
      sketchSize / cellCount
    }px;}`
  );
}

function createRow(row, size) {
  let div = document.createElement("div");
  div.classList.add("row");
  div.setAttribute("data-row", `${row}`);
  for (let i = 0; i < size; i++) {
    let cell = createCell(i);
    div.appendChild(cell);
  }
  return div;
}

/*
  sizeFactor is not named size since it only factors 
  into the size of the cell, it is not the size of the 
  cell itself.
*/
function createCell(col) {
  let cell = document.createElement("div");
  cell.classList.add("cell"); //Give each cell a unique set of identifiers
  // cell.setAttribute(`data-row`, `${row}`); //Moved to the row div
  cell.setAttribute(`data-column`, `${col}`);

  //Moved cell size to a custom function
  //cell.style.width = `${sketchSize / sizeFactor}px`;
  //cell.style.height = `${sketchSize / sizeFactor}px`;
  addHoverListener(cell);
  return cell;
}

function increaseSketchSize(newSize) {
  newSize = Number(newSize);

  for (let i = 0; i < newSize; i++) {
    let currentRow = document.querySelector(`[data-row="${i}"]`);
    if (i < cellCount) {
      for (let i = cellCount; i < newSize; i++) {
        currentRow.appendChild(createCell(i));
      }
    } else {
      rowContainer.appendChild(createRow(i, newSize));
    }
  }
  cellCount = newSize;
  updateCellSizeCSS();

  /*
  Old version
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
          createCell(additionalColumns)
        );
      }
    }
    //else a new one needs to be created
    else {
      let row = createRow(rowLoopVariable, newSize);
      rowContainer.appendChild(row);
    }
  }
  */

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

function resize(newSize) {
  if (newSize === cellCount) {
    console.warn("New size value needs to be different from current size");
  } else if (newSize > cellCount) {
    increaseSketchSize(newSize);
  } else {
    shrinkSketchSize(newSize);
  }
  updateCellSizeCSS();
}

/* !! Listener Functions*/
function addHoverListener(cell) {
  cell.addEventListener("mouseover", () => {
    // console.log(cell.parentElement.attributes["data-row"].nodeValue);
    // console.log(cell.attributes["data-column"].nodeValue);
    let currRow = cell.parentElement.attributes["data-row"].nodeValue;
    let currCol = cell.attributes["data-column"].nodeValue;
    if (!(currRow in drawnCells)) {
      drawnCells[currRow] = [currCol];
    } else {
      drawnCells[currRow].push(currCol);
    }
    cell.classList.add("drawn");
  });
}

function addResizeListener(button) {
  button.addEventListener("click", () => {
    //Get the value from the field
    let newSize = Number(resizeField.value);

    resize(newSize);
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

function addResetListener(button) {
  button.addEventListener("click", () => {
    resize(defaultCellCount);
    clear();
    resizeField.value = "";
  });
}
/* !! Execution */
setup();
