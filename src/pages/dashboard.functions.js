import {storage} from '@core/utils';

export function toHTML(key) {
  const model = storage(key);
  const id = key.split(':')[1];
  return `
      <li class="db__record">
        <a href="#excel/${id}">${model.tableTitle}</a>
        <strong>
            ${new Date(model.openedDate).toLocaleDateString()}
            ${new Date(model.openedDate).toLocaleTimeString()}
        </strong>
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
            ${keys.map(toHTML).join('')}
        </ul>
  `;
}
