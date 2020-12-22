export function toHTML() {
  return `
      <li class="db__record">
        <a href="#excel">Таблица номер 1</a>
        <strong>12.06.2020</strong>
     </li>
  `;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (!localStorage.key(i).includes('excel')) {
      continue;
    }
    keys.push(localStorage.key(i));
  }

  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();

  if (!keys.length) {
    return `<p>У вас пока что не ни одной записи</p>`;
  }

  return `
        <div class="db__list-header">
          <span>Название</span>
          <span>Дата открытия</span>
        </div>

        <ul class="db__list">
            ${keys.map(toHTML).join()}
        </ul>
  `;
}
