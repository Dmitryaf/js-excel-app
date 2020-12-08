import {ExcelCopmonent} from '@core/ExcelCopmonent';
import {TableSelection} from '@/components/table/TableSelection';

export class Formula extends ExcelCopmonent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  toHTML() {
    return `
        <div class="info">fx</div>
        <div class="input" contenteditable spellcheck="false"></div>
  `;
  }

  prepare() {
    this.selection = new TableSelection();
  }

  onInput(event) {
    const text = event.target.textContent.trim();
    this.$emit('it is working', text);
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.$emit('formula:focus');
    }
  }
}
