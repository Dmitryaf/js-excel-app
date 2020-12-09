// Объект с символами. Нужен для упрощения наименования колонок
const CODES = {
  A: 65,
  Z: 90,
};

// Создаёт ячейки
function toCell(row) {
  return function(_, col) {
    return `
      <div 
        class="cell" 
        contenteditable 
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}">
      </div>
    `;
  };
}

// Создаёт колонки
function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
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
export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  // Создаем колонки(A,B,C и т.д.)
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn) // По мимо callback-функции сюда неявно передается и index
      .join('');

  rows.push(createRow('', cols));

  for (let row = 0; row <= rowsCount; row++) {
    // Создаем ячейки
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('');

    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
}
