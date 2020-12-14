// Объект с символами. Нужен для упрощения наименования колонок
const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_COL_WIDTH = 120;

function getWidth(state, index) {
  return (state[index] || DEFAULT_COL_WIDTH) + 'px';
}

function widthWidthState(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state, index),
    };
  };
}

// Создаёт ячейки
function toCell(state, row) {
  return function(_, col) {
    const colWidth = getWidth(state, col);
    return `
      <div 
        class="cell" 
        contenteditable 
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
        style="width:${colWidth}"
        >
      </div>
    `;
  };
}

// Создаёт колонки
function toColumn({col, index, width}) {
  return `
    <div 
    class="column" 
    data-type="resizable"
    style="width: ${width}" 
    data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

// Создаёт строки
function createRow(index, content) {
  const resize = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : '';

  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

// Преобразует символьный код в значения
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

// Генерация таблицы
export function createTable(rowsCount = 20, state= {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  // Создаем колонки(A,B,C и т.д.)
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(widthWidthState(state))
      .map(toColumn) // По мимо callback-функции сюда неявно передается и index
      .join('');

  rows.push(createRow('', cols));

  for (let row = 0; row <= rowsCount; row++) {
    // Создаем ячейки
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('');

    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
}
