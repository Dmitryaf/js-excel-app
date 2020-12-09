import {ExcelCopmonent} from '@core/ExcelCopmonent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, matrix, shouldResize, nextSelector} from './table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelCopmonent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options,
    });
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
    this.$on('it is working', (text) => {
      this.selection.current.text(text);
    });
    this.$on('formula:focus', () => {
      this.selection.current.focus();
    });
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(this.$root, e);
    } else if (isCell(e)) {
      const $target = $(e.target);
      if (e.shiftKey) {
        const $cells = matrix( $target, this.selection.current)
            .map((id) => this.$root.find([`[data-id="${id}"]`]));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(e) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ];

    const {key} = event; // Получаем значение свойства key из event

    if (keys.includes(key) && !e.shiftKey) {
      e.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selection.select($next);
    }
  }
}
