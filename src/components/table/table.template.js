// Объект с символами. Нужен для упрощения наименования колонок
const CODES = {
  A: 65,
  Z: 90,
};

// Создаёт ячейки
function toCell() {
  return `
    <div class="cell" contenteditable></div>
  `;
}

// Создаёт колонки
function toColumn(col) {
  return `
    <div class="column">
        ${col}
        <div class="col-resize"></div>
    </div>
  `;
}

// Создаёт строки
function createRow(index, content) {
  const resize = index ? `<div class="row-resize"></div>` : '';
  return `
    <div class="row">
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
      .map(toColumn)
      .join('');

  // Создаем ячейки
  const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('');


  rows.push(createRow('', cols));

  for (let i = 1; i <= rowsCount; i++) {
    rows.push(createRow(i, cells));
  }

  return rows.join('');
}
