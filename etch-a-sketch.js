/* !! Nodes, Elements, and Variables */
const sketch = document.querySelector("div.sketch");
const rowContainer = document.querySelector("div.row-container");
const eraseButton = document.querySelector("button#erase");
const resizeField = document.querySelector("input#sizeInputField");
const resetButton = document.querySelector("button#reset");
const sketchSize = 960;
const defaultCellCount = 16;
const stylesheet = new CSSStyleSheet();
let cellCount = defaultCellCount;

/* !! Functions */
//For first time setup
function setup() {
  //Link cell size defining stylesheet
  document.adoptedStyleSheets = [stylesheet];
  stylesheet.insertRule(
    ` div.cell {width: ${sketchSize / cellCount}px; height: ${
      sketchSize / cellCount
    }px;}`
  );

  //Setup sketch area
  sketch.style.height = `${sketchSize}px`;
  sketch.style.width = `${sketchSize}px`;

  //setup Menu functionality
  addEraserListener(eraseButton);
  addResizeListener(resizeField);
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

function createCell(col) {
  let cell = document.createElement("div");
  cell.classList.add("cell"); //Give each cell a unique set of identifiers
  cell.setAttribute(`data-column`, `${col}`);
  addHoverListener(cell);
  return cell;
}

function increaseSketchSize(newSize) {
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
}

function shrinkSketchSize(newSize) {
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
      //Remove cells from end of row
      let cellArray = Array.from(currentRow.childNodes).slice(0, newSize);
      currentRow.innerHTML = "";
      currentRow.append(...cellArray);
    } else {
      rowContainer.removeChild(currentRow);
    }
  }
}

function resize(newSize) {
  newSize = Number(newSize);
  if (newSize === cellCount) {
    console.warn("New size value needs to be different from current size");
  } else if (newSize > cellCount) {
    increaseSketchSize(newSize);
  } else {
    shrinkSketchSize(newSize);
  }
  cellCount = newSize;
  updateCellSizeCSS();
}

function updateSizeLabel(newSize) {
  let label = document.querySelector("h2#resolution-label");
  label.innerHTML = `${newSize} x ${newSize}`;
}

/* !! Listener Functions*/
function addHoverListener(cell) {
  cell.addEventListener("mouseover", () => {
    cell.classList.add("drawn");
  });
}

function addResizeListener(slider) {
  slider.addEventListener("input", () => {
    //Get the value from the field
    let newSize = Number(resizeField.value);
    resize(newSize);
    updateSizeLabel(newSize);
  });
}

// function addResizeListener(button) {
//   button.addEventListener("click", () => {
//     //Get the value from the field
//     let newSize = Number(resizeField.value);

//     resize(newSize);
//   });
// }

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
    resizeField.value = `${defaultCellCount}`;
    updateSizeLabel(defaultCellCount);
    clear();
  });
}

/* !! Execution */
setup();
